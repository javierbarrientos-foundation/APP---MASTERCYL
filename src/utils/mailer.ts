/**
 * Servicio centralizado de notificaciones por correo electrónico para Becas MásterCyL (FGUSAL)
 * Cumplimiento estricto del RGPD (Minimización de datos y seguridad)
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

export interface DatosInscripcionEmail {
  nombreApellidos: string;
  correo: string;
  telefono: string;
  vinculoCyl: string;
  fechaRegistro: string;
  archivos: {
    impreso: string;
    vinculo: string;
    residencia?: string;
    titulo: string;
    matricula: string;
    meritoAsociacion?: string;
    meritoExpediente?: string;
    meritoRenta?: string;
    cuentaCorriente: string;
  };
}

/**
 * Escapado estricto contra inyecciones HTML en correos
 */
export function escapeHtml(text: unknown): string {
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
 * Plantilla HTML para Notificación de Nueva Inscripción con Enlaces a R2
 */
export function generarHtmlInscripcion(datos: DatosInscripcionEmail): string {
  const esc = escapeHtml;
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Nueva Inscripción Completa - Becas MásterCyL 2026-2027</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
    <div style="background: #8A1528; padding: 24px 30px; color: #ffffff;">
      <span style="display: inline-block; background: rgba(255,255,255,0.2); padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">Convocatoria 2026-2027</span>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">Nueva Inscripción con Documentación</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Fundación General de la Universidad de Salamanca · Junta de Castilla y León</p>
    </div>

    <div style="padding: 24px 30px;">
      <h2 style="font-size: 15px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 14px;">1. Datos Personales del Solicitante</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; width: 35%; font-weight: 500;">Nombre y Apellidos:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${esc(datos.nombreApellidos)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Correo Electrónico:</td>
          <td style="padding: 6px 0;"><a href="mailto:${esc(datos.correo)}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${esc(datos.correo)}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Teléfono de Contacto:</td>
          <td style="padding: 6px 0; font-weight: 500;">${esc(datos.telefono)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Vínculo con CyL:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #8A1528;">${esc(datos.vinculoCyl)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Fecha de Registro:</td>
          <td style="padding: 6px 0; color: #64748b;">${esc(datos.fechaRegistro)}</td>
        </tr>
      </table>

      <h2 style="font-size: 15px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 14px;">2. Documentos Adjuntos (Cloudflare R2)</h2>
      <p style="font-size: 13px; color: #64748b; margin-top: 0;">Haz clic en cada enlace para descargar o revisar el documento correspondiente:</p>
      
      <ul style="padding-left: 20px; font-size: 14px; line-height: 1.8; margin-bottom: 24px;">
        <li><strong>Impreso oficial rellenado y firmado:</strong> <a href="${esc(datos.archivos.impreso)}" target="_blank" style="color: #0284c7; font-weight: 600;">Descargar archivo</a></li>
        <li><strong>Acreditación de vínculo con CyL:</strong> <a href="${esc(datos.archivos.vinculo)}" target="_blank" style="color: #0284c7; font-weight: 600;">Descargar archivo</a></li>
        ${datos.archivos.residencia ? `<li><strong>Acreditación de residencia en Hispanoamérica:</strong> <a href="${esc(datos.archivos.residencia)}" target="_blank" style="color: #0284c7; font-weight: 600;">Descargar archivo</a></li>` : ''}
        <li><strong>Título de acceso al máster:</strong> <a href="${esc(datos.archivos.titulo)}" target="_blank" style="color: #0284c7; font-weight: 600;">Descargar archivo</a></li>
        <li><strong>Resguardo de matrícula en máster oficial:</strong> <a href="${esc(datos.archivos.matricula)}" target="_blank" style="color: #0284c7; font-weight: 600;">Descargar archivo</a></li>
        <li><strong>Certificado bancario (cuenta en España):</strong> <a href="${esc(datos.archivos.cuentaCorriente)}" target="_blank" style="color: #0284c7; font-weight: 600;">Descargar archivo</a></li>
        ${datos.archivos.meritoAsociacion ? `<li><strong>Mérito - Comunidad CyL exterior:</strong> <a href="${esc(datos.archivos.meritoAsociacion)}" target="_blank" style="color: #0284c7;">Descargar archivo</a></li>` : ''}
        ${datos.archivos.meritoExpediente ? `<li><strong>Mérito - Expediente académico:</strong> <a href="${esc(datos.archivos.meritoExpediente)}" target="_blank" style="color: #0284c7;">Descargar archivo</a></li>` : ''}
        ${datos.archivos.meritoRenta ? `<li><strong>Mérito - Renta familiar:</strong> <a href="${esc(datos.archivos.meritoRenta)}" target="_blank" style="color: #0284c7;">Descargar archivo</a></li>` : ''}
      </ul>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 12px; color: #475569; line-height: 1.5;">
        🔒 <strong>Almacenamiento Seguro:</strong> Los archivos se custodian de forma segura en Cloudflare R2 sin saturar el buzón de correo electrónico.
      </div>
    </div>

    <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px 30px; font-size: 11px; color: #64748b; text-align: center;">
      © 2026 Fundación General de la Universidad de Salamanca (FGUSAL)
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Plantilla HTML para Notificación de Nueva Solicitud Minimizada
 */
function generarHtmlSolicitud(datos: DatosSolicitudMinimizada): string {
  const esc = escapeHtml;
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
        <div style="font-size: 18px; font-weight: 800; color: #8A1528; font-family: monospace; letter-spacing: 1px;">${esc(datos.codigo)}</div>
      </div>

      <h2 style="font-size: 15px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 14px;">Resumen del Registro</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; width: 35%; font-weight: 500;">Persona Solicitante:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${esc(datos.nombre)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Máster de Elección (1.ª opc.):</td>
          <td style="padding: 6px 0; font-weight: 600; color: #0284c7;">${esc(datos.masterInteres)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Fecha de Registro:</td>
          <td style="padding: 6px 0; color: #64748b;">${esc(datos.fecha)}</td>
        </tr>
      </table>
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
 * Plantilla HTML sanitizada para Nueva Consulta de Contacto
 */
function generarHtmlContacto(datos: DatosContactoEmail): string {
  const esc = escapeHtml;
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
          <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">${esc(datos.nombre)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Correo Electrónico:</td>
          <td style="padding: 6px 0;"><a href="mailto:${esc(datos.email)}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${esc(datos.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">País de Origen:</td>
          <td style="padding: 6px 0; font-weight: 600;">${esc(datos.pais)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Tema de Consulta:</td>
          <td style="padding: 6px 0; font-weight: 600; color: #1e3a8a;">${esc(datos.asunto)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 500;">Fecha de Envío:</td>
          <td style="padding: 6px 0; color: #64748b;">${esc(datos.fecha)}</td>
        </tr>
      </table>

      <h2 style="font-size: 14px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Mensaje Transmitido:</h2>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.6; color: #1e293b;">
        ${esc(datos.mensaje).replace(/\n/g, '<br>')}
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
  tipo: 'solicitud' | 'contacto' | 'inscripcion';
  datos: DatosSolicitudMinimizada | DatosContactoEmail | DatosInscripcionEmail;
  env?: any;
}): Promise<{ enviado: boolean; metodo: string; error?: string }> {
  // Configuración temporal del destinatario a Javier Barrientos para validación de la refactorización (Paso 5)
  // o a los gestores según corresponda
  const listaEmails = tipo === 'inscripcion'
    ? ['javier.barrientos@fundacionusal.es']
    : (tipo === 'solicitud' ? DESTINATARIOS_SOLICITUDES.map(d => d.email) : DESTINATARIOS_CONTACTO.map(d => d.email));

  const asunto = tipo === 'inscripcion'
    ? `[MásterCyL FGUSAL] Nueva Inscripción: ${(datos as DatosInscripcionEmail).nombreApellidos}`
    : (tipo === 'solicitud'
        ? `[MásterCyL FGUSAL] Nueva Solicitud: ${(datos as DatosSolicitudMinimizada).codigo}`
        : `[MásterCyL FGUSAL] Nueva Consulta: ${(datos as DatosContactoEmail).asunto}`);

  let htmlContent = '';
  if (tipo === 'inscripcion') {
    htmlContent = generarHtmlInscripcion(datos as DatosInscripcionEmail);
  } else if (tipo === 'solicitud') {
    htmlContent = generarHtmlSolicitud(datos as DatosSolicitudMinimizada);
  } else {
    htmlContent = generarHtmlContacto(datos as DatosContactoEmail);
  }

  console.log(`[NOTIFICACIÓN EMAIL] Despachando ${tipo} para:`, listaEmails.join(', '));

  // 1. Envío mediante Cloudflare Email Service (send_email binding)
  if (env?.EMAIL?.send) {
    try {
      // Import dinámico de EmailMessage si está en worker runtime
      const { EmailMessage } = await import('cloudflare:email');
      const fromEmail = 'avisos@mastercyl.fundacionusal.es';
      
      for (const toEmail of listaEmails) {
        const rawMsg = [
          `From: "Becas MasterCyL" <${fromEmail}>`,
          `To: ${toEmail}`,
          `Subject: =?UTF-8?B?${Buffer.from(asunto).toString('base64')}?=`,
          'MIME-Version: 1.0',
          'Content-Type: text/html; charset=UTF-8',
          'Content-Transfer-Encoding: base64',
          '',
          Buffer.from(htmlContent).toString('base64'),
        ].join('\r\n');

        const message = new EmailMessage(fromEmail, toEmail, rawMsg);
        await env.EMAIL.send(message);
      }
      return { enviado: true, metodo: 'cloudflare-send-email' };
    } catch (err: any) {
      console.warn('Aviso Cloudflare Email Service:', err.message);
    }
  }

  // 2. Envío mediante Resend si existe RESEND_API_KEY
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
      }
    } catch (err: any) {
      console.warn('Error Resend API:', err.message);
    }
  }

  return { enviado: false, metodo: 'log-only' };
}
