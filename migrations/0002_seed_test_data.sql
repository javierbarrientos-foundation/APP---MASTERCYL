-- Migración 0002: Inyección de datos ficticios de prueba para validación de endpoints
-- Entorno pre-apertura (Datos simulados, sin carácter vinculante)

-- Usuarios gestores de prueba
INSERT OR IGNORE INTO usuarios (email, nombre, rol, activo, created_at) VALUES 
('ahgudino@usal.es', 'Alberto Hernández Gudino', 'admin', 1, '2026-10-23T10:00:00Z'),
('ppoveda@usal.es', 'Pilar Poveda Bueno', 'gestor', 1, '2026-10-23T10:00:00Z'),
('javier.barrientos@fundacionusal.es', 'Javier Barrientos', 'admin', 1, '2026-10-23T10:00:00Z');

-- Solicitud de prueba 1 (Descendiente de nacido en Castilla y León - Argentina)
INSERT OR IGNORE INTO solicitudes (
  codigo, nombre, apellidos, dni_pasaporte, email, pais_residencia, telefono,
  master_interes, master_opcion_2, master_opcion_3,
  vinculo_cyl, direccion_hispanoamerica, direccion_cyl,
  titulacion_acceso, cuenta_bancaria, composicion_familiar,
  datos_completos, estado, created_at
) VALUES (
  'MCYL-2026-DEMO1',
  'María Valentina',
  'González López',
  'AR-41982736',
  'maria.gonzalez.demo@ejemplo.com',
  'Argentina',
  '+54 9 11 4567 8901',
  'Máster Universitario en Biología y Conservación de la Biodiversidad',
  'Máster Universitario en Biotecnología',
  'Máster Universitario en Física y Tecnología de los Láseres',
  'Descendiente de nacido en la Comunidad de Castilla y León.',
  'Av. Corrientes 1234, 4º B, Buenos Aires (Argentina)',
  'C/ Zamora, 15, 37002 Salamanca (España)',
  'Licenciatura en Ciencias Biológicas (Universidad de Buenos Aires)',
  'ES76 0049 1500 0512 3456 7890',
  'La persona solicitante y otras personas (padre y/o madre, tutor o persona encargada de la guarda)',
  '{"familiares":[{"relacion":"Solicitante","apellidos":"González López","nombre":"María Valentina","dniPasaporte":"AR-41982736","haPercibidoIngresos":"SI","ingresosBrutos":"850000 ARS"},{"relacion":"Padre","apellidos":"González Pérez","nombre":"Carlos","dniPasaporte":"AR-18239012","haPercibidoIngresos":"SI","ingresosBrutos":"1200000 ARS"}]}',
  'Preinscrito',
  '2026-10-23T11:00:00Z'
);

-- Solicitud de prueba 2 (Nacido en Castilla y León - Colombia)
INSERT OR IGNORE INTO solicitudes (
  codigo, nombre, apellidos, dni_pasaporte, email, pais_residencia, telefono,
  master_interes, master_opcion_2, master_opcion_3,
  vinculo_cyl, direccion_hispanoamerica, direccion_cyl,
  titulacion_acceso, cuenta_bancaria, composicion_familiar,
  datos_completos, estado, created_at
) VALUES (
  'MCYL-2026-DEMO2',
  'Andrés Felipe',
  'Martín Herrera',
  'CO-1029384756',
  'andres.martin.demo@ejemplo.com',
  'Colombia',
  '+57 310 987 6543',
  'Máster Universitario en Inteligencia Artificial',
  'Máster Universitario en Sistemas Inteligentes',
  'Máster Universitario en Ciencia de Datos',
  'Nacido en la Comunidad de Castilla y León.',
  'Carrera 15 # 85-30, Bogotá (Colombia)',
  'Av. Villamayor 42, 37007 Salamanca (España)',
  'Ingeniería de Sistemas y Computación (Universidad Nacional de Colombia)',
  'ES21 2100 0418 4502 0005 1234',
  'Únicamente la persona solicitante',
  '{"familiares":[{"relacion":"Solicitante","apellidos":"Martín Herrera","nombre":"Andrés Felipe","dniPasaporte":"CO-1029384756","haPercibidoIngresos":"SI","ingresosBrutos":"4500000 COP"}]}',
  'Preinscrito',
  '2026-10-23T11:30:00Z'
);

-- Mensaje de contacto de prueba
INSERT OR IGNORE INTO mensajes_contacto (
  nombre, email, pais, asunto, mensaje, leido, created_at
) VALUES (
  'Laura Camila Sánchez',
  'laura.sanchez.demo@ejemplo.com',
  'México',
  'documentos',
  'Consulta de prueba sobre la legalización de notas académicas ante la convocatoria de becas MásterCyL.',
  0,
  '2026-10-23T12:00:00Z'
);
