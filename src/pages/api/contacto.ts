import type { APIRoute } from 'astro';
import { db, schema } from '../../db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
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

    const insertado = db
      .insert(schema.mensajesContacto)
      .values({
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        pais: pais.trim(),
        asunto: asunto.trim(),
        mensaje: mensaje.trim(),
        leido: 0,
        createdAt: timestamp,
      })
      .returning()
      .get();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Tu consulta ha sido registrada con éxito en el sistema de FGULEM.',
        id: insertado.id,
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
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
