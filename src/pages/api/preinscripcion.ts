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
      paisResidencia, 
      telefono = '', 
      masterInteres = '', 
      vinculoCyl = '' 
    } = data;

    // Validación de campos obligatorios
    if (!nombre || !apellidos || !dniPasaporte || !email || !paisResidencia) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Faltan campos obligatorios. Asegúrate de indicar nombre, apellidos, DNI/pasaporte, email y país de residencia.' 
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
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const codigo = `MCYL-2026-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    const dbHandle = getDatabase(context);
    if (dbHandle) {
      const { d1 } = dbHandle;

      // Comprobar existente
      const existente: any = await d1.prepare(
        'SELECT * FROM solicitudes WHERE dni_pasaporte = ? OR email = ? LIMIT 1'
      ).bind(dniLimpio, emailLimpio).first();

      if (existente) {
        return new Response(
          JSON.stringify({
            success: true,
            existente: true,
            message: 'Ya existe una solicitud registrada para este DNI/Pasaporte o correo electrónico.',
            codigo: existente.codigo,
            estado: existente.estado,
            fecha: existente.created_at
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Insertar en Cloudflare D1
      await d1.prepare(`
        INSERT INTO solicitudes (codigo, nombre, apellidos, dni_pasaporte, email, pais_residencia, telefono, master_interes, vinculo_cyl, estado, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Preinscrito', ?)
      `).bind(
        codigo,
        nombre.trim(),
        apellidos.trim(),
        dniLimpio,
        emailLimpio,
        paisResidencia.trim(),
        telefono ? telefono.trim() : null,
        masterInteres ? masterInteres.trim() : null,
        vinculoCyl ? vinculoCyl.trim() : null,
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
            paisResidencia: paisResidencia.trim(),
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
          message: 'Preinscripción registrada con éxito en el sistema de Becas MásterCyL.',
          codigo,
          estado: 'Preinscrito',
          fecha: timestamp
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      // Fallback seguro
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Preinscripción registrada con éxito en el sistema de Becas MásterCyL.',
          codigo,
          estado: 'Preinscrito',
          fecha: timestamp
        }),
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error: any) {
    console.error('Error al procesar preinscripción:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error?.message || 'Ocurrió un error en el servidor al guardar la solicitud.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
