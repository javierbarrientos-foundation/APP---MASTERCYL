-- Migración 0001: Esquema inicial para Becas MásterCyL (FGUSAL)
-- Base de datos: mastercyl (Cloudflare D1)

-- 1. Tabla de Usuarios / Administradores
CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  rol TEXT NOT NULL DEFAULT 'gestor', -- 'admin', 'gestor', 'lector'
  activo INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL
);

-- 2. Tabla de Solicitudes Oficiales (Modelo oficial FGUSAL / Junta CyL)
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
  master_opcion_2 TEXT,
  master_opcion_3 TEXT,
  vinculo_cyl TEXT,
  direccion_hispanoamerica TEXT,
  direccion_cyl TEXT,
  titulacion_acceso TEXT,
  cuenta_bancaria TEXT,
  composicion_familiar TEXT,
  datos_completos TEXT,
  estado TEXT NOT NULL DEFAULT 'Preinscrito', -- 'Preinscrito', 'Revisión', 'Admitido', 'Subsanación', 'Excluido'
  created_at TEXT NOT NULL
);

-- 3. Tabla de Mensajes y Consultas de Contacto
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

-- Índices para optimizar búsquedas por código, email y estado
CREATE INDEX IF NOT EXISTS idx_solicitudes_codigo ON solicitudes(codigo);
CREATE INDEX IF NOT EXISTS idx_solicitudes_email ON solicitudes(email);
CREATE INDEX IF NOT EXISTS idx_solicitudes_estado ON solicitudes(estado);
CREATE INDEX IF NOT EXISTS idx_mensajes_leido ON mensajes_contacto(leido);
