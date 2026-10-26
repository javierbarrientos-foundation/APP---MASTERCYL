import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDatabase } from '../../db';
import { enviarNotificacion } from '../../utils/mailer';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const data = await context.request.json();
    const { nombre, email, pais, asunto, mensaje } = data;

    // Validación de campos
    if (!nombre || !email || !pais || !asunto || !mensaje) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Por favor, cumplimenta todos los campos requeridos del formulario.' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

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

    const timestamp = new Date().toISOString();
    const dbHandle = getDatabase(context);

    if (dbHandle) {
      await dbHandle.d1.prepare(`
        INSERT INTO mensajes_contacto (nombre, email, pais, asunto, mensaje, leido, created_at)
        VALUES (?, ?, ?, ?, ?, 0, ?)
      `).bind(
        nombre.trim(),
        email.trim().toLowerCase(),
        pais.trim(),
        asunto.trim(),
        mensaje.trim(),
        timestamp
      ).run();
    }

    // Despacho de notificación por correo a:
    // 1. Alberto Hernández Gudino (ahgudino@usal.es)
    // 2. Pilar Poveda Bueno (ppoveda@usal.es)
    // 3. Javier Barrientos (javier.barrientos@fundacionusal.es)
    try {
      await enviarNotificacion({
        tipo: 'contacto',
        datos: {
          nombre: nombre.trim(),
          email: email.trim().toLowerCase(),
          pais: pais.trim(),
          asunto: asunto.trim(),
          mensaje: mensaje.trim(),
          fecha: new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
        },
        env
      });
    } catch (mailError) {
      console.warn('Aviso: no se pudo despachar el correo (no bloqueante):', mailError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Tu consulta ha sido registrada con éxito en el sistema de la Fundación General de la Universidad de Salamanca (FGUSAL).',
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al procesar mensaje de contacto:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Ocurrió un error en el servidor al enviar el mensaje.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
