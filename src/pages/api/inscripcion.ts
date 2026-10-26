import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getDatabase } from '../../db';
import { enviarNotificacion } from '../../utils/mailer';

export const prerender = false;

/**
 * Función auxiliar para sanitizar nombres de archivo y almacenar en Cloudflare R2
 */
async function guardarArchivoR2(
  bucket: any,
  file: unknown,
  etiqueta: string,
  baseUrl: string
): Promise<string> {
  if (!file || !(file instanceof File) || file.size === 0) {
    return '';
  }

  const extension = file.name.split('.').pop() || 'pdf';
  const nombreLimpio = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const clave = `inscripciones/${etiqueta}_${Date.now()}_${crypto.randomUUID().slice(0, 8)}_${nombreLimpio}`;

  if (bucket && typeof bucket.put === 'function') {
    const arrayBuffer = await file.arrayBuffer();
    await bucket.put(clave, arrayBuffer, {
      httpMetadata: {
        contentType: file.type || 'application/pdf',
      },
      customMetadata: {
        nombreOriginal: file.name,
        tamanoBytes: String(file.size),
        fechaSubida: new Date().toISOString()
      }
    });
  } else {
    console.warn(`[R2] Bucket BUCKET_ARCHIVOS no disponible en runtime actual. Clave simulada: ${clave}`);
  }

  // Generar URL absoluta para que los enlaces en el correo sean clicables directamente
  const path = `/api/archivo?key=${encodeURIComponent(clave)}`;
  return baseUrl ? `${baseUrl.replace(/\/$/, '')}${path}` : path;
}

export const POST: APIRoute = async (context) => {
  try {
    const formData = await context.request.formData();

    // Campos de texto requeridos
    const nombreApellidos = String(formData.get('nombre_apellidos') || '').trim();
    const correo = String(formData.get('correo') || '').trim().toLowerCase();
    const telefono = String(formData.get('telefono') || '').trim();
    const vinculoCyl = String(formData.get('vinculo_cyl') || '').trim();
    const politicaPrivacidad = formData.get('politica_privacidad') === 'true' || formData.get('politica_privacidad') === 'on';

    // Validación de Política de Privacidad (RGPD)
    if (!politicaPrivacidad) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Debes leer y aceptar la Política de Privacidad para formalizar la inscripción.'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validación de campos de texto obligatorios
    if (!nombreApellidos || !correo || !telefono || !vinculoCyl) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Por favor, cumplimenta todos los campos personales obligatorios (Nombre y apellidos, Correo, Teléfono y Vínculo).'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El formato de correo electrónico no es válido.'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Archivos obligatorios
    const fileImpreso = formData.get('archivo_impreso');
    const fileVinculo = formData.get('archivo_vinculo');
    const fileTitulo = formData.get('archivo_titulo');
    const fileMatricula = formData.get('archivo_matricula');
    const fileCuenta = formData.get('archivo_cuenta_corriente');

    if (
      !(fileImpreso instanceof File) || fileImpreso.size === 0 ||
      !(fileVinculo instanceof File) || fileVinculo.size === 0 ||
      !(fileTitulo instanceof File) || fileTitulo.size === 0 ||
      !(fileMatricula instanceof File) || fileMatricula.size === 0 ||
      !(fileCuenta instanceof File) || fileCuenta.size === 0
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Faltan documentos obligatorios requeridos (Impreso firmado, Acreditación de vínculo, Título universitario, Resguardo de matrícula y Certificado bancario).'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Archivos opcionales
    const fileResidencia = formData.get('archivo_residencia');
    const fileMeritoAsociacion = formData.get('archivo_merito_asociacion');
    const fileMeritoExpediente = formData.get('archivo_merito_expediente');
    const fileMeritoRenta = formData.get('archivo_merito_renta');

    // Obtener binding de Cloudflare R2
    const bucket = (env as any).BUCKET_ARCHIVOS || (context.locals as any)?.runtime?.env?.BUCKET_ARCHIVOS;
    const requestOrigin = new URL(context.request.url).origin;

    // Subir cada archivo a Cloudflare R2 y obtener su URL de descarga
    const urlImpreso = await guardarArchivoR2(bucket, fileImpreso, 'impreso', requestOrigin);
    const urlVinculo = await guardarArchivoR2(bucket, fileVinculo, 'vinculo', requestOrigin);
    const urlResidencia = await guardarArchivoR2(bucket, fileResidencia, 'residencia', requestOrigin);
    const urlTitulo = await guardarArchivoR2(bucket, fileTitulo, 'titulo', requestOrigin);
    const urlMatricula = await guardarArchivoR2(bucket, fileMatricula, 'matricula', requestOrigin);
    const urlCuenta = await guardarArchivoR2(bucket, fileCuenta, 'cuenta', requestOrigin);
    const urlMeritoAsoc = await guardarArchivoR2(bucket, fileMeritoAsociacion, 'merito_asoc', requestOrigin);
    const urlMeritoExp = await guardarArchivoR2(bucket, fileMeritoExpediente, 'merito_exp', requestOrigin);
    const urlMeritoRenta = await guardarArchivoR2(bucket, fileMeritoRenta, 'merito_renta', requestOrigin);

    const fechaRegistro = new Date().toISOString();

    // Guardar registro en Cloudflare D1
    const dbHandle = getDatabase(context);
    if (!dbHandle) {
      console.error('Base de datos D1 no disponible: no se pudo persistir la inscripción.');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'El servicio de base de datos no está disponible temporalmente. Inténtalo de nuevo más tarde.'
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { d1 } = dbHandle;

    await d1.prepare(`
      INSERT INTO inscripciones (
        fecha_registro,
        nombre_apellidos,
        correo,
        telefono,
        vinculo_cyl,
        archivo_impreso,
        archivo_vinculo,
        archivo_residencia,
        archivo_titulo,
        archivo_matricula,
        archivo_merito_asociacion,
        archivo_merito_expediente,
        archivo_merito_renta,
        archivo_cuenta_corriente
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      fechaRegistro,
      nombreApellidos,
      correo,
      telefono,
      vinculoCyl,
      urlImpreso,
      urlVinculo,
      urlResidencia || null,
      urlTitulo,
      urlMatricula,
      urlMeritoAsoc || null,
      urlMeritoExp || null,
      urlMeritoRenta || null,
      urlCuenta
    ).run();

    // Despacho de correo con enlaces limpios a Cloudflare R2
    try {
      await enviarNotificacion({
        tipo: 'inscripcion',
        datos: {
          nombreApellidos,
          correo,
          telefono,
          vinculoCyl,
          fechaRegistro: new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' }),
          archivos: {
            impreso: urlImpreso,
            vinculo: urlVinculo,
            residencia: urlResidencia || undefined,
            titulo: urlTitulo,
            matricula: urlMatricula,
            meritoAsociacion: urlMeritoAsoc || undefined,
            meritoExpediente: urlMeritoExp || undefined,
            meritoRenta: urlMeritoRenta || undefined,
            cuentaCorriente: urlCuenta
          }
        },
        env
      });
    } catch (mailErr) {
      console.warn('Aviso: error no bloqueante al enviar correo de notificación:', mailErr);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: '¡Tu inscripción y documentación oficial han sido registradas con éxito en el sistema de la Fundación General (FGUSAL)!',
        fecha: fechaRegistro
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error al procesar inscripción con archivos:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || 'Ocurrió un error inesperado al procesar la inscripción y subir la documentación.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
