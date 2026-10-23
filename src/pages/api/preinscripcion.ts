import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDatabase } from '../../db';
import { enviarNotificacion } from '../../utils/mailer';

export const prerender = false;

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
      familiares = [],
      lugarFirma = ''
    } = data;

    // Validación de campos obligatorios
    if (!nombre || !apellidos || !dniPasaporte || !email || !vinculoCyl || !titulacionAcceso || !masterInteres) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Faltan campos obligatorios. Asegúrate de cumplimentar nombre, apellidos, DNI/pasaporte, email, vínculo con CyL, titulación y al menos la 1.ª opción de máster presencial.' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validación básica de formato de email
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
    // Código de registro no adivinable (8 caracteres hexadecimales aleatorios)
    const codigo = `MCYL-2026-${crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()}`;
    const timestamp = new Date().toISOString();
    const datosJson = JSON.stringify(data);

    const dbHandle = getDatabase(context);
    if (dbHandle) {
      const { d1 } = dbHandle;

      // Comprobar existente
      const existente: any = await d1.prepare(
        'SELECT * FROM solicitudes WHERE dni_pasaporte = ? OR email = ? LIMIT 1'
      ).bind(dniLimpio, emailLimpio).first();

      if (existente) {
        // Seguridad (RGPD): nunca devolver datos de una solicitud ya registrada.
        // Cualquiera que conozca un DNI o un correo podría obtener datos personales ajenos.
        return new Response(
          JSON.stringify({
            success: false,
            existente: true,
            error: 'Ya existe una solicitud registrada con este DNI/Pasaporte o correo electrónico. Si necesitas modificarla o consultar su estado, escribe a fonseca@usal.es indicando tu nombre completo.'
          }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Insertar en Cloudflare D1
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

      // Notificación automática por email a:
      // 1. Alberto Hernández Gudino (ahgudino@usal.es)
      // 2. Pilar Poveda Bueno (ppoveda@usal.es)
      // 3. Javier Barrientos (javier.barrientos@fundacionusal.es)
      try {
        await enviarNotificacion({
          tipo: 'solicitud',
          datos: {
            codigo,
            nombre: nombre.trim(),
            apellidos: apellidos.trim(),
            dniPasaporte: dniLimpio,
            email: emailLimpio,
            telefono: telefono ? telefono.trim() : undefined,
            paisResidencia: paisResidencia.trim() || direccionHispanoamerica.trim(),
            masterInteres: masterInteres ? masterInteres.trim() : undefined,
            vinculoCyl: vinculoCyl ? vinculoCyl.trim() : undefined,
            fecha: new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
          },
          env
        });
      } catch (mailError) {
        console.warn('Aviso: no se pudo despachar el correo de solicitud (no bloqueante):', mailError);
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Solicitud oficial registrada con éxito en el sistema de Becas MásterCyL de la FGUSAL.',
          codigo,
          estado: 'Preinscrito',
          fecha: timestamp,
          datos: data
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Sin base de datos no se puede guardar la solicitud: avisar en lugar de simular un registro.
      console.error('Base de datos D1 no disponible: solicitud NO registrada.');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El sistema de registro no está disponible en este momento. Inténtalo de nuevo más tarde.'
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: any) {
    console.error('Error al procesar solicitud oficial:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Ocurrió un error en el servidor al registrar la solicitud.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
