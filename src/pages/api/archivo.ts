import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

/**
 * Endpoint para visualización y descarga segura de documentos almacenados en Cloudflare R2
 * Permite a los administradores y gestores abrir los enlaces generados en las notificaciones
 */
export const GET: APIRoute = async (context) => {
  try {
    const url = new URL(context.request.url);
    const key = url.searchParams.get('key');

    if (!key) {
      return new Response('Parámetro "key" no proporcionado.', { status: 400 });
    }

    const bucket = (env as any).BUCKET_ARCHIVOS || (context.locals as any)?.runtime?.env?.BUCKET_ARCHIVOS;

    if (!bucket || typeof bucket.get !== 'function') {
      return new Response(
        'El almacenamiento de archivos Cloudflare R2 (BUCKET_ARCHIVOS) no está disponible en este entorno.',
        { status: 503 }
      );
    }

    const object = await bucket.get(key);

    if (!object) {
      return new Response('El documento solicitado no existe o ha expirado.', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'private, max-age=3600');

    return new Response(object.body, {
      status: 200,
      headers
    });
  } catch (error: any) {
    console.error('Error al recuperar archivo de R2:', error);
    return new Response('Error al recuperar el archivo del almacenamiento R2.', { status: 500 });
  }
};
