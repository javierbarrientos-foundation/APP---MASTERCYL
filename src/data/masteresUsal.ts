export interface Master {
  id: string;
  titulo: string;
  area: string;
  areaCode: string;
  creditos: number;
  modalidad: string;
  centro: string;
  descripcion: string;
  link: string;
}

export const areas = [
  { code: "todas", label: "Todas las áreas" },
  { code: "humanidades", label: "Artes y Humanidades" },
  { code: "ciencias", label: "Ciencias" },
  { code: "salud", label: "Ciencias de la Salud" },
  { code: "sociales", label: "Ciencias Sociales y Jurídicas" },
  { code: "ingenieria", label: "Ingeniería y Arquitectura" }
];

export const masteresUsal: Master[] = [
  // --- ARTES Y HUMANIDADES ---
  {
    id: "master-linguistica-y-ensenanza-del-espanol-como-lengua-extranjera",
    titulo: "Máster Universitario en Lingüística y Enseñanza del Español como Lengua Extranjera",
    area: "Artes y Humanidades",
    areaCode: "humanidades",
    creditos: 90,
    modalidad: "Presencial",
    centro: "Facultad de Filosofía y Letras (León)",
    descripcion: "Formación avanzada en lingüística aplicada y metodología didáctica para la enseñanza profesional del español como lengua extranjera.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/b6da9716-36ce-f111-b4d9-0050568d8d59"
  },

  // --- CIENCIAS ---
  {
    id: "master-fermentaciones-aplicadas-industria-alimentaria-y-biotecnologica",
    titulo: "Máster Universitario en Fermentaciones Aplicadas a la Industria Alimentaria y Biotecnológica",
    area: "Ciencias",
    areaCode: "ciencias",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Veterinaria (León)",
    descripcion: "Especialización científica y tecnológica en procesos fermentativos industriales, optimización microbiológica y biotecnología agroalimentaria.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/a7da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-investigacion-diversidad-botanica-y-zoologica",
    titulo: "Máster Universitario en Investigación de la Diversidad Botánica y Zoológica",
    area: "Ciencias",
    areaCode: "ciencias",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Ciencias Biológicas y Ambientales (León)",
    descripcion: "Estudio avanzado de biodiversidad animal y vegetal, taxonomía, biogeografía, ecología y conservación de ecosistemas terrestres y acuáticos.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/b1da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-investigacion-en-biotecnologia-y-biomedicina",
    titulo: "Máster Universitario en Investigación en Biotecnología y Biomedicina",
    area: "Ciencias",
    areaCode: "ciencias",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Ciencias Biológicas y Ambientales (León)",
    descripcion: "Capacitación investigadora en biomedicina molecular, biología celular avanzada, ingeniería genética y aplicaciones biotecnológicas en salud.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/b3da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-riesgos-naturales",
    titulo: "Máster Universitario en Riesgos Naturales",
    area: "Ciencias",
    areaCode: "ciencias",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Ciencias Biológicas y Ambientales (León)",
    descripcion: "Análisis, modelización, predicción y gestión integral de riesgos geológicos, hidrológicos, climáticos y ambientales en el territorio.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/b9da9716-36ce-f111-b4d9-0050568d8d59"
  },

  // --- CIENCIAS DE LA SALUD ---
  {
    id: "master-enfermeria-cuidados-criticos-y-urgencias",
    titulo: "Máster Universitario en Enfermería en Cuidados Críticos y Urgencias",
    area: "Ciencias de la Salud",
    areaCode: "salud",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Ciencias de la Salud (León)",
    descripcion: "Especialización clínica avanzada para la atención integral y soporte vital de pacientes en estado crítico, urgencias y emergencias sanitarias.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/a5da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-innovacion-ciencias-biomedicas-y-de-la-salud",
    titulo: "Máster Universitario en Innovación en Ciencias Biomédicas y de la Salud (presencial)",
    area: "Ciencias de la Salud",
    areaCode: "salud",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Veterinaria (León)",
    descripcion: "Desarrollo de proyectos de I+D+i biomédica, farmacología traslacional, tecnologías diagnósticas de vanguardia y terapias innovadoras.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/b0da9716-36ce-f111-b4d9-0050568d8d59"
  },

  // --- CIENCIAS SOCIALES Y JURÍDICAS ---
  {
    id: "master-abogacia-y-procura",
    titulo: "Máster Universitario en Abogacía y Procura",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 90,
    modalidad: "Presencial",
    centro: "Facultad de Derecho (León)",
    descripcion: "Formación jurídica especializada y habilitante para el ejercicio profesional de la abogacía y la procura conforme a la normativa estatal.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/a2da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-ciencias-actuariales-y-financieras",
    titulo: "Máster Universitario en Ciencias Actuariales y Financieras por la Universidad de León y la Universidad de Oviedo",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 120,
    modalidad: "Presencial",
    centro: "Facultad de Ciencias Económicas y Empresariales (León)",
    descripcion: "Capacitación superior en cálculo actuarial, análisis cuantitativo de riesgos financieros, seguros y modelización económica.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/a3da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-derecho-ciberseguridad-y-entorno-digital",
    titulo: "Máster Universitario en Derecho de la Ciberseguridad y Entorno Digital (presencial)",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Derecho (León)",
    descripcion: "Regulación jurídica de la ciberseguridad, protección de datos, gobernanza digital, cibercrimen y cumplimiento normativo tecnológico.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/a4da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-entrenamiento-y-rendimiento-deportivo",
    titulo: "Máster Universitario en Entrenamiento y Rendimiento Deportivo",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Ciencias de la Actividad Física y del Deporte (León)",
    descripcion: "Optimización fisiológica y biomecánica del entrenamiento, análisis del rendimiento deportivo de élite y prevención de lesiones.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/a6da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-profesorado-secundaria-bachillerato-fp-idiomas",
    titulo: "Máster Universitario en Formación del Profesorado de Educación Secundaria Obligatoria y Bachillerato, Formación Profesional y Enseñanzas de Idiomas",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Educación (León)",
    descripcion: "Título oficial habilitante para el ejercicio de la docencia en educación secundaria, bachillerato, formación profesional y centros de idiomas.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/a8da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-gestion-personal-y-practica-laboral",
    titulo: "Máster Universitario en Gestión de Personal y Práctica Laboral",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Ciencias del Trabajo (León)",
    descripcion: "Dirección estratégica de recursos humanos, gestión laboral avanzada, negociación colectiva y relaciones laborales en la empresa.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/a9da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-gestion-prevencion-riesgos-laborales",
    titulo: "Máster Universitario en Gestión de Prevención de Riesgos Laborales",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Ciencias del Trabajo (León)",
    descripcion: "Capacitación como técnico superior en prevención en las tres especialidades: seguridad en el trabajo, higiene industrial y ergonomía/psicosociología.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/aada9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-investigacion-administracion-y-economia-de-la-empresa",
    titulo: "Máster Universitario en Investigación en Administración y Economía de la Empresa",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Ciencias Económicas y Empresariales (Salamanca)",
    descripcion: "Metodologías avanzadas de investigación en organización empresarial, finanzas corporativas, marketing estratégico y análisis económico.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/b2da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-investigacion-psicologia-y-ciencias-educacion",
    titulo: "Máster Universitario en Investigación en Psicología y Ciencias de la Educación",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Educación (León)",
    descripcion: "Diseño y desarrollo de proyectos de investigación científica en procesos cognitivos, intervención psicoeducativa y contextos de aprendizaje.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/b5da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-orientacion-educativa",
    titulo: "Máster Universitario en Orientación Educativa",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Facultad de Educación (León)",
    descripcion: "Diagnóstico, asesoramiento y orientación psicopedagógica y vocacional en centros educativos y gabinetes de atención a la diversidad.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/b7da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-europeo-direccion-empresas-embs",
    titulo: "Máster Universitario Europeo en Dirección de Empresas (European Master in Business Studies, EMBS)",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 120,
    modalidad: "Presencial",
    centro: "Facultad de Ciencias Económicas y Empresariales (León)",
    descripcion: "Programa internacional conjunto de dirección de empresas con estancias lectivas en cuatro universidades europeas (España, Francia, Alemania e Italia).",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/bbda9716-36ce-f111-b4d9-0050568d8d59"
  },

  // --- INGENIERÍA Y ARQUITECTURA ---
  {
    id: "master-ingenieria-aeronautica",
    titulo: "Máster Universitario en Ingeniería Aeronáutica",
    area: "Ingeniería y Arquitectura",
    areaCode: "ingenieria",
    creditos: 90,
    modalidad: "Presencial",
    centro: "Escuela de Ingenierías Industrial, Informática y Aeroespacial (León)",
    descripcion: "Título profesional habilitante para la profesión de Ingeniero Aeronáutico en diseño, cálculo, fabricación y certificación aeroespacial.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/abda9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-ingenieria-agronomica",
    titulo: "Máster Universitario en Ingeniería Agronómica",
    area: "Ingeniería y Arquitectura",
    areaCode: "ingenieria",
    creditos: 90,
    modalidad: "Presencial",
    centro: "Escuela de Ingeniería Agraria y Forestal (León)",
    descripcion: "Título habilitante para el ejercicio de la profesión regulada de Ingeniero Agrónomo en sistemas de producción vegetal, animal e industrias agroalimentarias.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/acda9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-ingenieria-industrial",
    titulo: "Máster Universitario en Ingeniería Industrial",
    area: "Ingeniería y Arquitectura",
    areaCode: "ingenieria",
    creditos: 90,
    modalidad: "Presencial",
    centro: "Escuela de Ingenierías Industrial, Informática y Aeroespacial (León)",
    descripcion: "Título habilitante multidisciplinar para la profesión de Ingeniero Industrial con competencias en diseño, plantas industriales, energía y gestión de operaciones.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/adda9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-ingenieria-informatica",
    titulo: "Máster Universitario en Ingeniería Informática",
    area: "Ingeniería y Arquitectura",
    areaCode: "ingenieria",
    creditos: 90,
    modalidad: "Presencial",
    centro: "Escuela de Ingenierías Industrial, Informática y Aeroespacial (León)",
    descripcion: "Título profesional de Ingeniero en Informática: arquitectura de software avanzada, inteligencia artificial, computación distribuida y dirección de TI.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/aeda9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-ingenieria-minera-y-recursos-energeticos",
    titulo: "Máster Universitario en Ingeniería Minera y de Recursos Energéticos",
    area: "Ingeniería y Arquitectura",
    areaCode: "ingenieria",
    creditos: 90,
    modalidad: "Presencial",
    centro: "Escuela Superior y Técnica de Ingenieros de Minas (León)",
    descripcion: "Título habilitante para la profesión de Ingeniero de Minas en prospección, explotación sostenible de recursos minerales, energía y obras subterráneas.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/afda9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-investigacion-en-ciberseguridad",
    titulo: "Máster Universitario en Investigación en Ciberseguridad (presencial)",
    area: "Ingeniería y Arquitectura",
    areaCode: "ingenieria",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Escuela de Ingenierías Industrial, Informática y Aeroespacial (León)",
    descripcion: "Investigación puntera en seguridad de redes, criptografía avanzada, análisis forense digital y protección de infraestructuras críticas.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/b4da9716-36ce-f111-b4d9-0050568d8d59"
  },
  {
    id: "master-produccion-en-industrias-farmaceuticas",
    titulo: "Máster Universitario en Producción en Industrias Farmacéuticas",
    area: "Ingeniería y Arquitectura",
    areaCode: "ingenieria",
    creditos: 60,
    modalidad: "Presencial",
    centro: "Escuela de Ingenierías Industrial, Informática y Aeroespacial (León)",
    descripcion: "Gestión de procesos de manufactura farmacéutica, buenas prácticas de fabricación (GMP), aseguramiento de calidad y tecnología de formulación.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/b8da9716-36ce-f111-b4d9-0050568d8d59"
  },

  // --- MULTIDISCIPLINAR / INTERDISCIPLINAR ---
  {
    id: "master-europeo-derecho-datos-e-inteligencia-artificial-emildai",
    titulo: "Máster Universitario Europeo en Derecho, Datos e Inteligencia Artificial (EMILDAI). Título conjunto internacional",
    area: "Ciencias Sociales y Jurídicas",
    areaCode: "sociales",
    creditos: 120,
    modalidad: "Presencial",
    centro: "Facultad de Derecho y Escuela de Ingenierías (León)",
    descripcion: "Máster conjunto europeo pionero que integra aspectos jurídicos, éticos y técnicos del Big Data, ciberseguridad e Inteligencia Artificial.",
    link: "https://www.fgulem.es/mcyl/convocatorias/MASTERCYL-2026/masteres/bada9716-36ce-f111-b4d9-0050568d8d59"
  }
];
