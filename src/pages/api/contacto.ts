import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDatabase } from '../../db';
import { enviarNotificacion } from '../../utils/mailer';
import { verificarTurnstile } from '../../utils/turnstile';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    let turnstileToken = '';
    let nombre = '';
    let email = '';
    let pais = '';
    let asunto = '';
    let mensaje = '';

    const contentType = context.request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await context.request.json().catch(() => ({}));
      turnstileToken = data['cf-turnstile-response'] || '';
      nombre = data.nombre || '';
      email = data.email || '';
      pais = data.pais || '';
      asunto = data.asunto || '';
      mensaje = data.mensaje || '';
    } else {
      const formData = await context.request.formData();
      turnstileToken = String(formData.get('cf-turnstile-response') || '');
      nombre = String(formData.get('nombre') || '');
      email = String(formData.get('email') || '');
      pais = String(formData.get('pais') || '');
      asunto = String(formData.get('asunto') || '');
      mensaje = String(formData.get('mensaje') || '');
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
