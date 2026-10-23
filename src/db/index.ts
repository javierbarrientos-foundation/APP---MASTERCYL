import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import fs from 'node:fs';
import path from 'node:path';

// Asegurar existencia del directorio de la base de datos
const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'mastercyl.db');
const sqlite = new Database(dbPath);

// Habilitar modo WAL para mejor rendimiento de lecturas/escrituras concurrentes
sqlite.pragma('journal_mode = WAL');

// Crear tablas automáticamente si no existen
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS solicitudes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT NOT NULL UNIQUE,
    nombre TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    dni_pasaporte TEXT NOT NULL,
    email TEXT NOT NULL,
    pais_residencia TEXT NOT NULL,
    telefono TEXT,
    master_interes TEXT,
    vinculo_cyl TEXT,
    estado TEXT NOT NULL DEFAULT 'Preinscrito',
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS mensajes_contacto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    pais TEXT NOT NULL,
    asunto TEXT NOT NULL,
    mensaje TEXT NOT NULL,
    leido INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
`);

export const db = drizzle(sqlite, { schema });
export { schema };
