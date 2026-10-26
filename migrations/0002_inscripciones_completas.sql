-- Migración 0002: Tabla de inscripciones completas con almacenamiento de documentos en R2
-- Convocatoria Becas MásterCyL 2026-2027 (FGUSAL / Junta CyL)

CREATE TABLE IF NOT EXISTS inscripciones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha_registro TEXT NOT NULL,
  nombre_apellidos TEXT NOT NULL,
  correo TEXT NOT NULL,
  telefono TEXT NOT NULL,
  vinculo_cyl TEXT NOT NULL,
  archivo_impreso TEXT NOT NULL,
  archivo_vinculo TEXT NOT NULL,
  archivo_residencia TEXT,
  archivo_titulo TEXT NOT NULL,
  archivo_matricula TEXT NOT NULL,
  archivo_merito_asociacion TEXT,
  archivo_merito_expediente TEXT,
  archivo_merito_renta TEXT,
  archivo_cuenta_corriente TEXT NOT NULL
);

-- Índices para optimizar consultas por correo y fecha
CREATE INDEX IF NOT EXISTS idx_inscripciones_correo ON inscripciones(correo);
CREATE INDEX IF NOT EXISTS idx_inscripciones_fecha ON inscripciones(fecha_registro);
