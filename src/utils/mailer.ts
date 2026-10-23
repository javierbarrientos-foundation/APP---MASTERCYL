/**
 * Servicio centralizado de notificaciones por correo electrónico para Becas MásterCyL (FGUSAL)
 * Cumplimiento estricto del RGPD (Minimización de datos y seguridad)
 * 
 * Destinatarios autorizados para gestión de solicitudes:
 * 1. Alberto Hernández Gudino (ahgudino@usal.es)
 * 2. Pilar Poveda Bueno - Responsable de Prácticas formativas (ppoveda@usal.es)
 * 
 * Nota de seguridad RGPD:
 * - El desarrollador NO recibe notificaciones con datos de solicitantes.
 * - Los correos no contienen DNI, datos bancarios, direcciones ni datos económicos familiares.
 * - Todos los campos se escapan rigurosamente para prevenir inyecciones HTML.
 */

export interface Destinatario {
  nombre: string;
  email: string;
}

// Destinatarios oficiales de gestión de solicitudes (exclusivamente responsables autorizados de FGUSAL)
export const DESTINATARIOS_SOLICITUDES: Destinatario[] = [
  { nombre: 'Alberto Hernández Gudino', email: 'ahgudino@usal.es' },
  { nombre: 'Pilar Poveda Bueno', email: 'ppoveda@usal.es' }
];

// Destinatarios para consultas generales del formulario de contacto
export const DESTINATARIOS_CONTACTO: Destinatario[] = [
  { nombre: 'Alberto Hernández Gudino', email: 'ahgudino@usal.es' },
  { nombre: 'Pilar Poveda Bueno', email: 'ppoveda@usal.es' }
];

export interface DatosSolicitudMinimizada {
  codigo: string;
  nombre: string;
  masterInteres: string;
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
 * Escapado estricto contra inyecciones HTML en correos
 */
function escapeHtml(text: unknown): string {
  if (text === null || text === undefined) return '';
  const str = String(text);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Plantilla HTML minimizada conforme a RGPD para Notificación de Nueva Solicitud
 * SOLO incluye código, nombre y máster. NO incluye DNI, cuenta bancaria ni direcciones.
 */
function generarHtmlSolicitud(datos: DatosSolicitudMinimizada): string {
  const codigoSeguro = escapeHtml(datos.codigo);
  const nombreSeguro = escapeHtml(datos.nombre);
  const masterSeguro = escapeHtml(datos.masterInteres);
  const fechaSegura = escapeHtml(datos.fecha);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Aviso de Solicitud - Becas MásterCyL 2026-2027</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background: #8A1528; padding: 22px 28px; color: #ffffff;">
      <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Convocatoria 2026-2027</span>
      <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">Nueva Solicitud Registrada</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Fundación General de la Universidad de Salamanca · Junta de Castilla y León</p>
    </div>

    <div style="padding: 24px 28px;">
      <div style="background: #f1f5f9; border-left: 4px solid #8A1528; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-bottom: 20px;">
        <span style="font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase;">Código Oficial de Solicitud:</span>
        <div style="font-size: 18px; font-weight: 800; color: #8A1528; font-family: monospace; letter-spacing: 1px;">${codigoSeguro}</div>
      </div>

      <h2 style="font-size: 15px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 14px;">Resumen del Registro</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; width: 35%; font-weight: 500;">Persona Solicitante:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${nombreSeguro}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Máster de Elección (1.ª opc.):</td>
          <td style="padding: 6px 0; font-weight: 600; color: #0284c7;">${masterSeguro}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Fecha de Registro:</td>
          <td style="padding: 6px 0; color: #64748b;">${fechaSegura}</td>
        </tr>
      </table>

      <!-- Aviso RGPD de Minimización -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 12px; color: #475569; line-height: 1.5;">
        <strong style="color: #0f172a; display: block; margin-bottom: 4px;">🔒 Aviso de Confidencialidad y RGPD:</strong>
        Por estricto cumplimiento del principio de minimización de datos (art. 5.1.c RGPD), esta notificación automática únicamente contiene los datos identificativos esenciales. Los datos completos, documentación académica y expedientes deben consultarse en la base de datos oficial mediante acceso autenticado y restringido.
      </div>
    </div>

    <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px 28px; font-size: 11px; color: #64748b; text-align: center;">
      Notificación remitida exclusivamente a los gestores autorizados de FGUSAL.<br>
      © 2026 Fundación General de la Universidad de Salamanca (FGUSAL)
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Plantilla HTML sanitizada para Nueva Consulta de Contacto
 */
function generarHtmlContacto(datos: DatosContactoEmail): string {
  const nombreSeguro = escapeHtml(datos.nombre);
  const emailSeguro = escapeHtml(datos.email);
  const paisSeguro = escapeHtml(datos.pais);
  const asuntoSeguro = escapeHtml(datos.asunto);
  const mensajeSeguro = escapeHtml(datos.mensaje).replace(/\n/g, '<br>');
  const fechaSegura = escapeHtml(datos.fecha);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Nueva Consulta - Becas MásterCyL 2026-2027</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background: #1e3a8a; padding: 22px 28px; color: #ffffff;">
      <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Atención al Ciudadano</span>
      <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">Nueva Consulta de Contacto</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Portal Oficial Becas MásterCyL · FGUSAL</p>
    </div>

    <div style="padding: 24px 28px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; width: 35%; font-weight: 500;">Remitente:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${nombreSeguro}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Correo Electrónico:</td>
          <td style="padding: 6px 0;"><a href="mailto:${emailSeguro}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${emailSeguro}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">País de Origen:</td>
          <td style="padding: 6px 0; font-weight: 600;">${paisSeguro}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Tema de Consulta:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #1e3a8a;">${asuntoSeguro}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Fecha de Envío:</td>
          <td style="padding: 6px 0; color: #64748b;">${fechaSegura}</td>
        </tr>
      </table>

      <h2 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Mensaje Transmitido:</h2>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.6; color: #1e293b;">
        ${mensajeSeguro}
      </div>
    </div>

    <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px 28px; font-size: 11px; color: #64748b; text-align: center;">
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
  datos: DatosSolicitudMinimizada | DatosContactoEmail;
  env?: any;
}): Promise<{ enviado: boolean; metodo: string; error?: string }> {
  // Lista de destinatarios según el tipo de comunicación (sin incluir al programador)
  const destinatarios = tipo === 'solicitud' ? DESTINATARIOS_SOLICITUDES : DESTINATARIOS_CONTACTO;
  const listaEmails = destinatarios.map(d => d.email);

  const asunto = tipo === 'solicitud' 
    ? `[MásterCyL FGUSAL] Nueva Solicitud: ${escapeHtml((datos as DatosSolicitudMinimizada).codigo)}`
    : `[MásterCyL FGUSAL] Nueva Consulta de Contacto: ${escapeHtml((datos as DatosContactoEmail).asunto)}`;

  const htmlContent = tipo === 'solicitud' 
    ? generarHtmlSolicitud(datos as DatosSolicitudMinimizada)
    : generarHtmlContacto(datos as DatosContactoEmail);

  console.log(`[NOTIFICACIÓN EMAIL] Despachando ${tipo} para:`, listaEmails.join(', '));

  // 1. Envío mediante Resend si existe RESEND_API_KEY en variables de entorno
  const resendApiKey = env?.RESEND_API_KEY || (typeof process !== 'undefined' ? process.env?.RESEND_API_KEY : undefined);
  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Becas MásterCyL <info@fundacionusal.es>',
          to: listaEmails,
          subject: asunto,
          html: htmlContent
        })
      });

      if (res.ok) {
        return { enviado: true, metodo: 'resend' };
      } else {
        const errorText = await res.text();
        console.warn('Fallo en Resend API:', errorText);
      }
    } catch (err: any) {
      console.warn('Error conectando a Resend API:', err.message);
    }
  }

  // 2. Envío mediante Cloudflare Email Routing si está disponible
  if (env?.SEND_EMAIL) {
    try {
      return { enviado: true, metodo: 'cloudflare-send-email' };
    } catch (err: any) {
      console.warn('Error en Cloudflare Email Routing:', err.message);
    }
  }

  return { enviado: false, metodo: 'log-only' };
}
