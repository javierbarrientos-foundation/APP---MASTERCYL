import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDatabase(context?: any) {
  const d1 = env?.DB 
    || context?.locals?.runtime?.env?.DB 
    || context?.locals?.env?.DB 
    || (globalThis as any).DB;

  if (d1) {
    return {
      d1,
      db: drizzle(d1, { schema }),
    };
  }

  return null;
}

export { schema };
