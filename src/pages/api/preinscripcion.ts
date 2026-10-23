import type { APIRoute } from 'astro';
import { db, schema } from '../../db';
import { eq, or } from 'drizzle-orm';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
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

    // Comprobar si ya existe una preinscripción activa con el mismo DNI o Email
    const existente = db
      .select()
      .from(schema.solicitudes)
      .where(
        or(
          eq(schema.solicitudes.dniPasaporte, dniPasaporte.trim().toUpperCase()),
          eq(schema.solicitudes.email, email.trim().toLowerCase())
        )
      )
      .get();

    if (existente) {
      return new Response(
        JSON.stringify({
          success: true,
          existente: true,
          message: 'Ya existe una solicitud registrada para este DNI/Pasaporte o correo electrónico.',
          codigo: existente.codigo,
          estado: existente.estado,
          fecha: existente.createdAt
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generar código único de seguimiento de la convocatoria 2026-2027
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const codigo = `MCYL-2026-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    const resultado = db
      .insert(schema.solicitudes)
      .values({
        codigo,
        nombre: nombre.trim(),
        apellidos: apellidos.trim(),
        dniPasaporte: dniPasaporte.trim().toUpperCase(),
        email: email.trim().toLowerCase(),
        paisResidencia: paisResidencia.trim(),
        telefono: telefono ? telefono.trim() : null,
        masterInteres: masterInteres ? masterInteres.trim() : null,
        vinculoCyl: vinculoCyl ? vinculoCyl.trim() : null,
        estado: 'Preinscrito',
        createdAt: timestamp,
      })
      .returning()
      .get();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Preinscripción registrada con éxito en el sistema de Becas MásterCyL.',
        codigo: resultado.codigo,
        id: resultado.id,
        estado: resultado.estado,
        fecha: resultado.createdAt
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al procesar preinscripción:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Ocurrió un error interno en el servidor al guardar la solicitud.' 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Endpoint GET opcional para consultar estado por DNI o código
export const GET: APIRoute = async ({ url }) => {
  try {
    const q = url.searchParams.get('q');
    if (!q) {
      return new Response(
        JSON.stringify({ success: false, error: 'Parámetro de búsqueda q requerido (DNI o código)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const item = db
      .select({
        codigo: schema.solicitudes.codigo,
        nombre: schema.solicitudes.nombre,
        estado: schema.solicitudes.estado,
        createdAt: schema.solicitudes.createdAt
      })
      .from(schema.solicitudes)
      .where(
        or(
          eq(schema.solicitudes.codigo, q.trim().toUpperCase()),
          eq(schema.solicitudes.dniPasaporte, q.trim().toUpperCase())
        )
      )
      .get();

    if (!item) {
      return new Response(
        JSON.stringify({ success: false, error: 'No se encontró ninguna solicitud con ese identificador.' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, solicitud: item }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: 'Error al consultar la solicitud.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
