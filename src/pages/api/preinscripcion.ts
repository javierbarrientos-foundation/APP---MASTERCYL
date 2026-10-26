import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDatabase } from '../../db';
import { enviarNotificacion } from '../../utils/mailer';
import { verificarTurnstile } from '../../utils/turnstile';

export const prerender = false;

// Control de apertura del plazo telemático oficial
const CONVOCATORIA_EN_PRUEBAS_BLOQUEADA = false;

export const POST: APIRoute = async (context) => {
  try {
    let data: any = {};
    let turnstileToken = '';

    const contentType = context.request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await context.request.json().catch(() => ({}));
      turnstileToken = data['cf-turnstile-response'] || '';
    } else {
      const formData = await context.request.formData();
      turnstileToken = String(formData.get('cf-turnstile-response') || '');
      data = {
        nombre: formData.get('nombre'),
        apellidos: formData.get('apellidos'),
        dniPasaporte: formData.get('dniPasaporte') || formData.get('dni_pasaporte'),
        email: formData.get('email'),
        paisResidencia: formData.get('paisResidencia') || formData.get('pais_residencia') || '',
        telefono: formData.get('telefono') || '',
        vinculoCyl: formData.get('vinculoCyl') || formData.get('vinculo_cyl') || '',
        direccionHispanoamerica: formData.get('direccionHispanoamerica') || formData.get('direccion_hispanoamerica') || '',
        direccionCyl: formData.get('direccionCyl') || formData.get('direccion_cyl') || '',
        titulacionAcceso: formData.get('titulacionAcceso') || formData.get('titulacion_acceso') || '',
        masterInteres: formData.get('masterInteres') || formData.get('master_interes') || '',
        masterOpcion2: formData.get('masterOpcion2') || formData.get('master_opcion_2') || '',
        masterOpcion3: formData.get('masterOpcion3') || formData.get('master_opcion_3') || '',
        cuentaBancaria: formData.get('cuentaBancaria') || formData.get('cuenta_bancaria') || '',
        composicionFamiliar: formData.get('composicionFamiliar') || formData.get('composicion_familiar') || '',
        politicaPrivacidad: formData.get('politicaPrivacidad') === 'true' || formData.get('politica_privacidad') === 'true' || formData.get('politica_privacidad') === 'on',
      };
    }

    // Verificación de Cloudflare Turnstile
    const secretKey = (context.locals as any)?.env?.TURNSTILE_SECRET_KEY || (context.locals as any)?.runtime?.env?.TURNSTILE_SECRET_KEY;
    const clientIp = context.request.headers.get('cf-connecting-ip') || undefined;
    const esTurnstileValido = await verificarTurnstile(turnstileToken, secretKey, clientIp);

    if (!esTurnstileValido) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Error de verificación de seguridad Turnstile. Por favor, verifica el captcha e inténtalo de nuevo.' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
      politicaPrivacidad = false
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
    const codigo = `MCYL-2026-${crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const dbHandle = getDatabase(context);
    if (!dbHandle) {
      console.error('Base de datos D1 no disponible: solicitud NO registrada.');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El sistema de registro no está disponible en este momento. Inténtalo de nuevo más tarde.'
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { d1 } = dbHandle;

    // 4. PREVENCIÓN DE FUGA DE DATOS:
    const existente: any = await d1.prepare(
      'SELECT id FROM solicitudes WHERE dni_pasaporte = ? OR email = ? LIMIT 1'
    ).bind(dniLimpio, emailLimpio).first();

    if (existente) {
      return new Response(
        JSON.stringify({
          success: false,
          existente: true,
          error: 'Ya existe una solicitud registrada con este DNI/Pasaporte o correo electrónico. Si necesitas consultar o subsanar tu expediente, contacta con info@fundacionusal.es.'
        }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
