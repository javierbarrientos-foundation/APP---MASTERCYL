import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDatabase(context?: any) {
  let d1: any = null;
  try {
    d1 = env?.DB;
  } catch {}

  if (!d1) {
    try {
      d1 = (globalThis as any).DB;
    } catch {}
  }

  if (d1) {
    return {
      d1,
      db: drizzle(d1, { schema }),
    };
  }

  return null;
}

export { schema };
