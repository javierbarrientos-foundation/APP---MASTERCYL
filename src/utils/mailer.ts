/**
 * Servicio centralizado de notificaciones por correo electrónico para Becas MásterCyL (FGUSAL)
 * Destinatarios oficiales configurados:
 * 1. Alberto Hernández Gudino (ahgudino@usal.es)
 * 2. Pilar Poveda Bueno - Responsable de Prácticas formativas (ppoveda@usal.es)
 *
 * Envío: Cloudflare Email Service (binding `EMAIL` en wrangler.toml), remitente mastercyl@fundacionusal.es.
 * En el plan gratuito solo se puede enviar a direcciones verificadas en Email Routing:
 * si se añade un destinatario aquí, hay que añadirlo también en wrangler.toml y verificarlo en Cloudflare.
 */

export interface Destinatario {
  nombre: string;
  email: string;
}

export const DESTINATARIOS_OFICIALES: Destinatario[] = [
  { nombre: 'Alberto Hernández Gudino', email: 'ahgudino@usal.es' },
  { nombre: 'Pilar Poveda Bueno', email: 'ppoveda@usal.es' }
];

export const REMITENTE = { email: 'mastercyl@fundacionusal.es', name: 'Becas MásterCyL (FGUSAL)' };

export interface DatosSolicitudEmail {
  codigo: string;
  nombre: string;
  apellidos: string;
  dniPasaporte: string;
  email: string;
  telefono?: string;
  paisResidencia: string;
  vinculoCyl?: string;
  direccionHispanoamerica?: string;
  direccionCyl?: string;
  titulacionAcceso?: string;
  masterInteres?: string;
  masterOpcion2?: string;
  masterOpcion3?: string;
  cuentaBancaria?: string;
  composicionFamiliar?: string;
  fecha: string;
}

export interface DatosContactoEmail {
  nombre: string;
  email: string;
  pais: string;
  asunto: string;
  mensaje: string;
  fecha: string;
}

/**
 * Escapa texto introducido por el usuario antes de insertarlo en el HTML del correo
 * (evita inyección de HTML/enlaces en los avisos que recibe la Comisión).
 */
function esc(valor: unknown): string {
  return String(valor ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Plantilla HTML para Nueva Solicitud / Preinscripción
 */
function generarHtmlSolicitud(datos: DatosSolicitudEmail): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Nueva Preinscripción - Becas MásterCyL 2026-2027</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background: linear-gradient(135deg, #800020 0%, #4a0013 100%); padding: 24px 32px; color: #ffffff;">
      <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Convocatoria 2026-2027</span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">Nueva Preinscripción Registrada</h1>
      <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Fundación General de la Universidad de Salamanca · Junta de Castilla y León</p>
    </div>

    <div style="padding: 28px 32px;">
      <div style="background: #f1f5f9; border-left: 4px solid #800020; padding: 14px 18px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
        <span style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase;">Código Oficial de Registro:</span>
        <div style="font-size: 20px; font-weight: 800; color: #800020; font-family: monospace; letter-spacing: 1px;">${esc(datos.codigo)}</div>
      </div>

      <h2 style="font-size: 16px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 16px;">Datos del Solicitante</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 35%; font-weight: 500;">Nombre Completo:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${esc(datos.nombre)} ${esc(datos.apellidos)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">DNI / Pasaporte:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a; font-family: monospace;">${esc(datos.dniPasaporte)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Correo Electrónico:</td>
          <td style="padding: 8px 0;"><a href="mailto:${esc(datos.email)}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${esc(datos.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Teléfono Móvil:</td>
          <td style="padding: 8px 0; font-weight: 500;">${esc(datos.telefono || 'No facilitado')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">País de Residencia:</td>
          <td style="padding: 8px 0; font-weight: 600;">${esc(datos.paisResidencia)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Vinculación con CyL:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #9e1b32;">${esc(datos.vinculoCyl || 'No indicada')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Dirección Hispanoamérica:</td>
          <td style="padding: 8px 0; font-weight: 500;">${esc(datos.direccionHispanoamerica || datos.paisResidencia)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Dirección en CyL:</td>
          <td style="padding: 8px 0; font-weight: 500;">${esc(datos.direccionCyl || 'No indicada')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Titulación de Acceso:</td>
          <td style="padding: 8px 0; font-weight: 600;">${esc(datos.titulacionAcceso || 'No indicada')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Máster (Opción 1 - Preferente):</td>
          <td style="padding: 8px 0; font-weight: 700; color: #9e1b32;">${esc(datos.masterInteres || 'No indicado')}</td>
        </tr>
        ${datos.masterOpcion2 ? `
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Máster (Opción 2):</td>
          <td style="padding: 8px 0; font-weight: 500;">${esc(datos.masterOpcion2)}</td>
        </tr>` : ''}
        ${datos.masterOpcion3 ? `
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Máster (Opción 3):</td>
          <td style="padding: 8px 0; font-weight: 500;">${esc(datos.masterOpcion3)}</td>
        </tr>` : ''}
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Cuenta Bancaria en España:</td>
          <td style="padding: 8px 0; font-family: monospace;">${esc(datos.cuentaBancaria || 'Pendiente de apertura')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Composición Familiar:</td>
          <td style="padding: 8px 0;">${esc(datos.composicionFamiliar || 'Únicamente la persona solicitante')}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Fecha de Registro:</td>
          <td style="padding: 8px 0; font-size: 13px; color: #475569;">${esc(datos.fecha)}</td>
        </tr>
      </table>

      <div style="background: #e0f2fe; border: 1px solid #bae6fd; padding: 14px 18px; border-radius: 8px; font-size: 13px; color: #0369a1;">
        <strong>Información para la Comisión:</strong> Esta solicitud queda guardada en la base de datos de Cloudflare D1 de Becas MásterCyL con estado inicial «Preinscrito».
      </div>
    </div>

    <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center;">
      Notificación automática remitida a: Alberto Hernández Gudino · Pilar Poveda Bueno<br>
      © 2026 Fundación General de la Universidad de Salamanca (FGUSAL)
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Plantilla HTML para Consulta de Contacto
 */
function generarHtmlContacto(datos: DatosContactoEmail): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Nueva Consulta de Contacto - Becas MásterCyL</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%); padding: 24px 32px; color: #ffffff;">
      <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Buzón de Consultas FGUSAL</span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">Nueva Consulta Recibida</h1>
      <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Formulario web · Becas MásterCyL 2026-2027</p>
    </div>

    <div style="padding: 28px 32px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; width: 30%; font-weight: 500;">Remitente:</td>
          <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${esc(datos.nombre)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email de Contacto:</td>
          <td style="padding: 8px 0;"><a href="mailto:${esc(datos.email)}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${esc(datos.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">País:</td>
          <td style="padding: 8px 0; font-weight: 500;">${esc(datos.pais)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Asunto:</td>
          <td style="padding: 8px 0; font-weight: 700; color: #1e3a8a;">${esc(datos.asunto)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Fecha y Hora:</td>
          <td style="padding: 8px 0; font-size: 13px; color: #475569;">${esc(datos.fecha)}</td>
        </tr>
      </table>

      <h3 style="font-size: 14px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">Mensaje / Consulta:</h3>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${esc(datos.mensaje)}</div>

      <div style="margin-top: 24px; text-align: center;">
        <a href="mailto:${esc(datos.email)}?subject=RE: ${encodeURIComponent(datos.asunto)} - Becas MásterCyL FGUSAL" style="display: inline-block; background: #1e3a8a; color: #ffffff; padding: 10px 22px; border-radius: 6px; font-weight: 600; font-size: 14px; text-decoration: none;">Responder al Remitente</a>
      </div>
    </div>

    <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center;">
      Notificación automática remitida a: Alberto Hernández Gudino · Pilar Poveda Bueno<br>
      © 2026 Fundación General de la Universidad de Salamanca (FGUSAL)
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Función principal para despachar correos electrónicos de notificación
 */
export async function enviarNotificacion({
  tipo,
  datos,
  env
}: {
  tipo: 'solicitud' | 'contacto';
  datos: DatosSolicitudEmail | DatosContactoEmail;
  env?: any;
}): Promise<{ enviado: boolean; metodo: string; error?: string }> {
  const listaEmails = DESTINATARIOS_OFICIALES.map(d => d.email);
  const asunto = tipo === 'solicitud' 
    ? `[MásterCyL FGUSAL] Nueva Solicitud: ${(datos as DatosSolicitudEmail).codigo} - ${(datos as DatosSolicitudEmail).nombre} ${(datos as DatosSolicitudEmail).apellidos}`
    : `[MásterCyL FGUSAL] Nueva Consulta de Contacto: ${(datos as DatosContactoEmail).asunto} (${(datos as DatosContactoEmail).nombre})`;

  const htmlContent = tipo === 'solicitud' 
    ? generarHtmlSolicitud(datos as DatosSolicitudEmail)
    : generarHtmlContacto(datos as DatosContactoEmail);

  // Registro en consola de la recepción y datos para auditoría
  console.log(`[NOTIFICACIÓN EMAIL] Despachando ${tipo} para:`, listaEmails.join(', '));

  // Envío mediante Cloudflare Email Service (binding EMAIL). No se usan servicios externos (RGPD).
  if (env?.EMAIL?.send) {
    let enviados = 0;
    for (const dest of DESTINATARIOS_OFICIALES) {
      try {
        await env.EMAIL.send({
          from: REMITENTE,
          to: dest.email,
          subject: asunto,
          text: `Se ha recibido una nueva ${tipo} en la web de Becas MásterCyL. Abra este correo en un cliente compatible con HTML para ver el detalle.`,
          html: htmlContent
        });
        enviados++;
      } catch (e: any) {
        console.warn(`[NOTIFICACIÓN EMAIL] Fallo al enviar a ${dest.email}:`, e?.message);
      }
    }
    if (enviados > 0) {
      console.log(`[NOTIFICACIÓN EMAIL] Enviado a ${enviados}/${DESTINATARIOS_OFICIALES.length} destinatarios.`);
      return { enviado: true, metodo: 'cloudflare-email' };
    }
  }

  // 4. Registro y trazabilidad asegurada
  console.log(`[NOTIFICACIÓN EMAIL REGISTRADA EN LOGS] Datos listos para envío a: ${listaEmails.join(', ')}`);
  return { 
    enviado: false, 
    metodo: 'log-audit', 
    error: 'No se pudo enviar: revise el binding EMAIL y los destinatarios verificados en Cloudflare' 
  };
}
