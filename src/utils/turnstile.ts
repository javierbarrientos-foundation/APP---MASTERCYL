interface TurnstileVerifyResponse {
  success: boolean;
  'error-codes'?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

/**
 * Verifica el token de Cloudflare Turnstile con el endpoint oficial de Cloudflare.
 * 
 * @param token - Token recibido en 'cf-turnstile-response'
 * @param secretKey - Clave secreta (TURNSTILE_SECRET_KEY)
 * @param remoteIp - IP opcional del cliente (cf-connecting-ip)
 * @returns boolean indicando si la validación fue exitosa
 */
export async function verificarTurnstile(
  token: string | null | undefined,
  secretKey: string | undefined,
  remoteIp?: string
): Promise<boolean> {
  if (!token || typeof token !== 'string' || token.trim() === '') {
    return false;
  }

  const secret = secretKey || (typeof process !== 'undefined' ? process.env?.TURNSTILE_SECRET_KEY : undefined);
  if (!secret) {
    console.warn('[Turnstile] Advertencia: TURNSTILE_SECRET_KEY no está configurada.');
    if (import.meta.env.DEV || (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production')) {
      return true;
    }
    return false;
  }

  try {
    const formData = new FormData();
    formData.append('secret', secret);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error(`[Turnstile] Error HTTP ${response.status} al verificar el token Turnstile`);
      return false;
    }

    const outcome: TurnstileVerifyResponse = await response.json();
    return outcome.success === true;
  } catch (error) {
    console.error('[Turnstile] Error al verificar Turnstile con Cloudflare:', error);
    return false;
  }
}
