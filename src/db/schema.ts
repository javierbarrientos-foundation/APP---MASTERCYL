import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const usuarios = sqliteTable('usuarios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  nombre: text('nombre').notNull(),
  rol: text('rol').notNull().default('gestor'),
  activo: integer('activo').notNull().default(1),
  createdAt: text('created_at').notNull(),
});

export const solicitudes = sqliteTable('solicitudes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  codigo: text('codigo').notNull().unique(),
  nombre: text('nombre').notNull(),
  apellidos: text('apellidos').notNull(),
  dniPasaporte: text('dni_pasaporte').notNull(),
  email: text('email').notNull(),
  paisResidencia: text('pais_residencia').notNull(),
  telefono: text('telefono'),
  masterInteres: text('master_interes'),
  masterOpcion2: text('master_opcion_2'),
  masterOpcion3: text('master_opcion_3'),
  vinculoCyl: text('vinculo_cyl'),
  direccionHispanoamerica: text('direccion_hispanoamerica'),
  direccionCyl: text('direccion_cyl'),
  titulacionAcceso: text('titulacion_acceso'),
  cuentaBancaria: text('cuenta_bancaria'),
  composicionFamiliar: text('composicion_familiar'),
  datosCompletos: text('datos_completos'),
  estado: text('estado').notNull().default('Preinscrito'),
  createdAt: text('created_at').notNull(),
});

export const mensajesContacto = sqliteTable('mensajes_contacto', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  email: text('email').notNull(),
  pais: text('pais').notNull(),
  asunto: text('asunto').notNull(),
  mensaje: text('mensaje').notNull(),
  leido: integer('leido').notNull().default(0),
  createdAt: text('created_at').notNull(),
});

export type Usuario = typeof usuarios.$inferSelect;
export type NuevoUsuario = typeof usuarios.$inferInsert;
export type Solicitud = typeof solicitudes.$inferSelect;
export type NuevaSolicitud = typeof solicitudes.$inferInsert;
export type MensajeContacto = typeof mensajesContacto.$inferSelect;
export type NuevoMensajeContacto = typeof mensajesContacto.$inferInsert;
