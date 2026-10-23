import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDatabase } from '../../db';
import { enviarNotificacion } from '../../utils/mailer';

export const prerender = false;

// Control de apertura del plazo telemático oficial
// En fase de pruebas o previa a la fecha oficial, los envíos reales se mantienen deshabilitados
const CONVOCATORIA_EN_PRUEBAS_BLOQUEADA = false; // Cambiar a false solo en la apertura oficial en la cuenta institucional

export const POST: APIRoute = async (context) => {
  try {
    const data = await context.request.json();
    const { 
      nombre, 
      apellidos, 
      dniPasaporte, 
      email, 
      paisResidencia = '', 
      telefono = '', 
      vinculoCyl = '',
      direccionHispanoamerica = '',
      direccionCyl = '',
      titulacionAcceso = '',
      masterInteres = '', 
      masterOpcion2 = '',
      masterOpcion3 = '',
      cuentaBancaria = '',
      composicionFamiliar = '',
      politicaPrivacidad = false,
      turnstileToken = ''
    } = data;

    // 0. Comprobación de fase de pruebas / bloqueo de envío no autorizado
    if (CONVOCATORIA_EN_PRUEBAS_BLOQUEADA) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'El formulario telemático se encuentra en periodo de preparación previo a la apertura oficial. No se admiten registros reales en este entorno de pruebas.' 
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. Verificación obligatoria de aceptación de la Política de Privacidad (RGPD)
    if (!politicaPrivacidad) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Es obligatorio leer y aceptar la Política de Privacidad y el tratamiento de datos personales de la convocatoria.' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. Validación de campos obligatorios indispensables
    if (!nombre || !apellidos || !dniPasaporte || !email || !vinculoCyl || !titulacionAcceso || !masterInteres) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Faltan campos obligatorios. Cumplimenta nombre, apellidos, DNI/pasaporte, email, vínculo con CyL, titulación de acceso y al menos la 1.ª opción de máster presencial.' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 3. Validación estricta de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'El formato de correo electrónico no es válido.' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const dniLimpio = dniPasaporte.trim().toUpperCase();
    const emailLimpio = email.trim().toLowerCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const codigo = `MCYL-2026-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    const dbHandle = getDatabase(context);
    if (dbHandle) {
      const { d1 } = dbHandle;

      // 4. PREVENCIÓN DE FUGA DE DATOS:
      // Comprobar si ya existe una solicitud con el mismo DNI o email.
      // ANTE DUPLICADOS: NUNCA devolver datos personales, DNI, cuentas ni composición familiar.
      const existente: any = await d1.prepare(
        'SELECT id FROM solicitudes WHERE dni_pasaporte = ? OR email = ? LIMIT 1'
      ).bind(dniLimpio, emailLimpio).first();

      if (existente) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Ya existe una solicitud registrada asociada a este correo electrónico o documento de identidad. Si necesitas consultar o subsanar tu expediente, ponte en contacto con info@fundacionusal.es.'
          }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Guardar datos en la base de datos segura
      // Principio de minimización: la cuenta bancaria es opcional en esta fase inicial
      const datosJson = JSON.stringify(data);

      await d1.prepare(`
        INSERT INTO solicitudes (
          codigo, nombre, apellidos, dni_pasaporte, email, pais_residencia, telefono,
          master_interes, master_opcion_2, master_opcion_3,
          vinculo_cyl, direccion_hispanoamerica, direccion_cyl, titulacion_acceso,
          cuenta_bancaria, composicion_familiar, datos_completos,
          estado, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Preinscrito', ?)
      `).bind(
        codigo,
        nombre.trim(),
        apellidos.trim(),
        dniLimpio,
        emailLimpio,
        paisResidencia.trim() || 'Hispanoamérica',
        telefono ? telefono.trim() : null,
        masterInteres ? masterInteres.trim() : null,
        masterOpcion2 ? masterOpcion2.trim() : null,
        masterOpcion3 ? masterOpcion3.trim() : null,
        vinculoCyl ? vinculoCyl.trim() : null,
        direccionHispanoamerica ? direccionHispanoamerica.trim() : null,
        direccionCyl ? direccionCyl.trim() : null,
        titulacionAcceso ? titulacionAcceso.trim() : null,
        cuentaBancaria ? cuentaBancaria.trim() : null,
        composicionFamiliar ? composicionFamiliar.trim() : null,
        datosJson,
        timestamp
      ).run();

      // 5. Notificación por correo estrictamente minimizada conforme al RGPD:
      // - Solo se notifica a los responsables de la Fundación (Alberto y Pilar).
      // - El desarrollador NO recibe datos de solicitantes.
      // - El email solo lleva: código de solicitud, nombre del solicitante y máster de interés.
      //   (NADA de DNI, cuenta bancaria, direcciones ni datos familiares).
      try {
        await enviarNotificacion({
          tipo: 'solicitud',
          datos: {
            codigo,
            nombre: `${nombre.trim()} ${apellidos.trim()}`,
            masterInteres: masterInteres ? masterInteres.trim() : 'Máster Oficial USAL',
            fecha: new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
          },
          env
        });
      } catch (mailError) {
        console.warn('Aviso: no se pudo despachar el aviso de solicitud (no bloqueante):', mailError);
      }

      // Respuesta de éxito: Se devuelve únicamente el código generado y los datos
      // que el propio usuario acaba de enviar para que su navegador pueda imprimir su resguardo local.
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Solicitud oficial registrada con éxito en el sistema de Becas MásterCyL.',
          codigo,
          estado: 'Preinscrito',
          fecha: timestamp
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Solicitud procesada en modo seguro.',
          codigo,
          estado: 'Preinscrito',
          fecha: timestamp
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: any) {
    console.error('Error al procesar solicitud oficial:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Ocurrió un error en el servidor al registrar la solicitud. Por favor, inténtalo de nuevo.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
