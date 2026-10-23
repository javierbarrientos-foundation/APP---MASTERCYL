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
