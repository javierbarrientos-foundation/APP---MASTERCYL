import type { APIRoute } from 'astro';
import { getDatabase } from '../../db';

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
        error: error?.message || 'Ocurrió un error en el servidor al enviar el mensaje.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
