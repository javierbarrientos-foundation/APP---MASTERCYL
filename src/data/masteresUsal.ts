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
  {
    "id": "m-estudios-avanzados-de-lenguas-literaturas-y-culturas-de-asia-oriental",
    "titulo": "Máster Universitario en Estudios Avanzados de Lenguas, Literaturas y Culturas de Asia Oriental",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios Avanzados de Lenguas, Literaturas y Culturas de Asia Oriental impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/estudios-avanzados-de-lenguas-literaturas-y-culturas-de-asia-oriental"
  },
  {
    "id": "m-master-estudios-avanzados-e-investigacion-en-historia-sociedades-poderes-e-identidades",
    "titulo": "Máster Universitario en Estudios Avanzados e Investigación en Historia (Sociedades, Poderes, Identidades)",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios Avanzados e Investigación en Historia (Sociedades, Poderes, Identidades) impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estudios-avanzados-e-investigacion-en-historia-sociedades-poderes-e-identidades"
  },
  {
    "id": "m-master-estudios-avanzados-en-filosofia",
    "titulo": "Máster Universitario en Estudios Avanzados en Filosofía",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios Avanzados en Filosofía impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estudios-avanzados-en-filosofia"
  },
  {
    "id": "m-master-estudios-avanzados-en-historia-del-arte",
    "titulo": "Máster Universitario en Estudios Avanzados en Historia del Arte",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios Avanzados en Historia del Arte impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estudios-avanzados-en-historia-del-arte"
  },
  {
    "id": "m-estudios-avanzados-en-produccion-y-practicas-artisticas",
    "titulo": "Máster Universitario en Estudios Avanzados en Producción y Prácticas Artísticas",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios Avanzados en Producción y Prácticas Artísticas impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/estudios-avanzados-en-produccion-y-practicas-artisticas"
  },
  {
    "id": "m-master-estudios-ingleses-avanzados-lenguas-y-culturas-en-contacto",
    "titulo": "Máster Universitario en Estudios Ingleses Avanzados: Lenguas y Culturas en Contacto",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios Ingleses Avanzados: Lenguas y Culturas en Contacto impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estudios-ingleses-avanzados-lenguas-y-culturas-en-contacto"
  },
  {
    "id": "m-master-evaluacion-y-gestion-del-patrimonio-cultural",
    "titulo": "Máster Universitario en Evaluación y Gestión del Patrimonio Cultural",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Evaluación y Gestión del Patrimonio Cultural impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-evaluacion-y-gestion-del-patrimonio-cultural"
  },
  {
    "id": "m-investigacion-linguistica",
    "titulo": "Máster Universitario en Investigación Lingüística",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Investigación Lingüística impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/investigacion-linguistica"
  },
  {
    "id": "m-master-la-ensenanza-del-espanol-como-lengua-extranjera",
    "titulo": "Máster Universitario en La Enseñanza del Español como Lengua Extranjera",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en La Enseñanza del Español como Lengua Extranjera impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-la-ensenanza-del-espanol-como-lengua-extranjera"
  },
  {
    "id": "m-lenguas-culturas-y-sociedades-europeas-en-contacto",
    "titulo": "Máster Universitario en Lenguas, Culturas y Sociedades Europeas en Contacto / European Languages, Cultures and Societies in Contact",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Lenguas, Culturas y Sociedades Europeas en Contacto / European Languages, Cultures and Societies in Contact impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/lenguas-culturas-y-sociedades-europeas-en-contacto"
  },
  {
    "id": "m-master-literatura-espanola-e-hispanoamericana-teoria-de-la-literatura-y-literatura-comparada",
    "titulo": "Máster Universitario en Literatura Española e Hispanoamericana, Teoría de la Literatura y Literatura Comparada",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Literatura Española e Hispanoamericana, Teoría de la Literatura y Literatura Comparada impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-literatura-espanola-e-hispanoamericana-teoria-de-la-literatura-y-literatura-comparada"
  },
  {
    "id": "m-master-musica-hispana",
    "titulo": "Máster Universitario en Música Hispana",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Música Hispana impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-musica-hispana"
  },
  {
    "id": "m-master-textos-de-la-antiguedad-clasica-y-su-pervivencia",
    "titulo": "Máster Universitario en Textos de la Antigüedad Clásica y su Pervivencia",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Textos de la Antigüedad Clásica y su Pervivencia impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-textos-de-la-antiguedad-clasica-y-su-pervivencia"
  },
  {
    "id": "m-master-traduccion-y-mediacion-intercultural",
    "titulo": "Máster Universitario en Traducción y Mediación Intercultural",
    "area": "Artes y Humanidades",
    "areaCode": "humanidades",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Traducción y Mediación Intercultural impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-traduccion-y-mediacion-intercultural"
  },
  {
    "id": "m-aceleradores-y-laseres-gran-escalamaster-large-scale-accelerators-and-lasers-lascala",
    "titulo": "Máster Universitario en Aceleradores y Láseres a Gran Escala/Master in Large Scale Accelerators and Lasers (LASCALA)",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Aceleradores y Láseres a Gran Escala/Master in Large Scale Accelerators and Lasers (LASCALA) impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/aceleradores-y-laseres-gran-escalamaster-large-scale-accelerators-and-lasers-lascala"
  },
  {
    "id": "m-master-agrobiotecnologia",
    "titulo": "Máster Universitario en Agrobiotecnología",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Agrobiotecnología impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-agrobiotecnologia"
  },
  {
    "id": "m-master-analisis-avanzado-de-datos-multivariantes-y-big-data",
    "titulo": "Máster Universitario en Análisis Avanzado de Datos Multivariantes y Big Data",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Análisis Avanzado de Datos Multivariantes y Big Data impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-analisis-avanzado-de-datos-multivariantes-y-big-data"
  },
  {
    "id": "m-master-biologia-celular-y-molecular",
    "titulo": "Máster Universitario en Biología Celular y Molecular",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Biología Celular y Molecular impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-biologia-celular-y-molecular"
  },
  {
    "id": "m-master-biologia-y-conservacion-de-la-biodiversidad",
    "titulo": "Máster Universitario en Biología y Conservación de la Biodiversidad",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Biología y Conservación de la Biodiversidad impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-biologia-y-conservacion-de-la-biodiversidad"
  },
  {
    "id": "m-master-ciencias-ambientales",
    "titulo": "Máster Universitario en Ciencias Ambientales",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Ciencias Ambientales impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-ciencias-ambientales"
  },
  {
    "id": "m-master-ciencias-de-la-tierra-geologia-ambiental-y-aplicada",
    "titulo": "Máster Universitario en Ciencias de la Tierra: Geología Ambiental y Aplicada",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Ciencias de la Tierra: Geología Ambiental y Aplicada impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-ciencias-de-la-tierra-geologia-ambiental-y-aplicada"
  },
  {
    "id": "m-enologia-y-su-adaptacion-al-cambio-climatico",
    "titulo": "Máster Universitario en Enología y su Adaptación al Cambio Climático",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Enología y su Adaptación al Cambio Climático impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/enologia-y-su-adaptacion-al-cambio-climatico"
  },
  {
    "id": "m-master-fisica-nuclear",
    "titulo": "Máster Universitario en Física Nuclear",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Física Nuclear impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-fisica-nuclear"
  },
  {
    "id": "m-master-fisica-y-matematicas",
    "titulo": "Máster Universitario en Física y Matemáticas",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Física y Matemáticas impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-fisica-y-matematicas"
  },
  {
    "id": "m-master-fisica-y-tecnologia-de-los-laseres",
    "titulo": "Máster Universitario en Física y Tecnología de los Láseres",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Física y Tecnología de los Láseres impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-fisica-y-tecnologia-de-los-laseres"
  },
  {
    "id": "m-modelizacion-matematica",
    "titulo": "Máster Universitario en Modelización Matemática",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Modelización Matemática impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/modelizacion-matematica"
  },
  {
    "id": "m-quimica-experimental",
    "titulo": "Máster Universitario en Química Experimental",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Química Experimental impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/quimica-experimental"
  },
  {
    "id": "m-master-quimica-teorica-y-modelizacion-computacional",
    "titulo": "Máster Universitario en Química Teórica y Modelización Computacional",
    "area": "Ciencias",
    "areaCode": "ciencias",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Química Teórica y Modelización Computacional impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-quimica-teorica-y-modelizacion-computacional"
  },
  {
    "id": "m-bienestar-lo-largo-de-la-vida-y-envejecimiento-saludablelifelong-well-being-and-healthy-ageing",
    "titulo": "Máster Universitario en Bienestar a lo largo de la Vida y Envejecimiento Saludable/Lifelong Well-being and Healthy Ageing",
    "area": "Ciencias de la Salud",
    "areaCode": "salud",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Bienestar a lo largo de la Vida y Envejecimiento Saludable/Lifelong Well-being and Healthy Ageing impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/bienestar-lo-largo-de-la-vida-y-envejecimiento-saludablelifelong-well-being-and-healthy-ageing"
  },
  {
    "id": "m-master-biologia-y-clinica-del-cancer",
    "titulo": "Máster Universitario en Biología y Clínica del Cáncer",
    "area": "Ciencias de la Salud",
    "areaCode": "salud",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Biología y Clínica del Cáncer impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-biologia-y-clinica-del-cancer"
  },
  {
    "id": "m-master-enfermedades-tropicales",
    "titulo": "Máster Universitario en Enfermedades Tropicales",
    "area": "Ciencias de la Salud",
    "areaCode": "salud",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Enfermedades Tropicales impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-enfermedades-tropicales"
  },
  {
    "id": "m-master-evaluacion-y-desarrollo-de-medicamentos",
    "titulo": "Máster Universitario en Evaluación y Desarrollo de Medicamentos",
    "area": "Ciencias de la Salud",
    "areaCode": "salud",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Evaluación y Desarrollo de Medicamentos impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-evaluacion-y-desarrollo-de-medicamentos"
  },
  {
    "id": "m-master-fisiopatologia-y-farmacologia-celular-y-molecular",
    "titulo": "Máster Universitario en Fisiopatología y Farmacología Celular y Molecular",
    "area": "Ciencias de la Salud",
    "areaCode": "salud",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Fisiopatología y Farmacología Celular y Molecular impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-fisiopatologia-y-farmacologia-celular-y-molecular"
  },
  {
    "id": "m-master-intervencion-personas-con-enfermedad-de-alzheimer",
    "titulo": "Máster Universitario en Intervención a Personas con Enfermedad de Alzheimer",
    "area": "Ciencias de la Salud",
    "areaCode": "salud",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Intervención a Personas con Enfermedad de Alzheimer impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-intervencion-personas-con-enfermedad-de-alzheimer"
  },
  {
    "id": "m-master-neurociencias",
    "titulo": "Máster Universitario en Neurociencias",
    "area": "Ciencias de la Salud",
    "areaCode": "salud",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Neurociencias impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-neurociencias"
  },
  {
    "id": "m-master-neuropsicologia",
    "titulo": "Máster Universitario en Neuropsicología",
    "area": "Ciencias de la Salud",
    "areaCode": "salud",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Neuropsicología impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-neuropsicologia"
  },
  {
    "id": "m-master-psicogerontologia",
    "titulo": "Máster Universitario en Psicogerontología",
    "area": "Ciencias de la Salud",
    "areaCode": "salud",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Psicogerontología impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-psicogerontologia"
  },
  {
    "id": "m-master-psicologia-general-sanitaria",
    "titulo": "Máster Universitario en Psicología General Sanitaria",
    "area": "Ciencias de la Salud",
    "areaCode": "salud",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Psicología General Sanitaria impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-psicologia-general-sanitaria"
  },
  {
    "id": "m-master-trastornos-de-la-comunicacion-neurociencia-de-la-audicion-y-lenguaje",
    "titulo": "Máster Universitario en Trastornos de la Comunicación: Neurociencia de la Audición y Lenguaje",
    "area": "Ciencias de la Salud",
    "areaCode": "salud",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Trastornos de la Comunicación: Neurociencia de la Audición y Lenguaje impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-trastornos-de-la-comunicacion-neurociencia-de-la-audicion-y-lenguaje"
  },
  {
    "id": "m-master-analisis-economico-del-derecho-y-las-politicas-publicas",
    "titulo": "Máster Universitario en Análisis Económico del Derecho y las Políticas Públicas",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Análisis Económico del Derecho y las Políticas Públicas impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-analisis-economico-del-derecho-y-las-politicas-publicas"
  },
  {
    "id": "m-cibercriminalidad",
    "titulo": "Máster Universitario en Cibercriminalidad",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Cibercriminalidad impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/cibercriminalidad"
  },
  {
    "id": "m-master-ciencia-politica",
    "titulo": "Máster Universitario en Ciencia Política",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Ciencia Política impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-ciencia-politica"
  },
  {
    "id": "m-master-comunicacion-audiovisual-investigacion-e-innovacion",
    "titulo": "Máster Universitario en Comunicación Audiovisual: Investigación e Innovación",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Comunicación Audiovisual: Investigación e Innovación impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-comunicacion-audiovisual-investigacion-e-innovacion"
  },
  {
    "id": "m-master-democracia-y-buen-gobierno",
    "titulo": "Máster Universitario en Democracia y Buen Gobierno",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Democracia y Buen Gobierno impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-democracia-y-buen-gobierno"
  },
  {
    "id": "m-master-derecho-del-trabajo-y-relaciones-laborales",
    "titulo": "Máster Universitario en Derecho del Trabajo y Relaciones Laborales",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Derecho del Trabajo y Relaciones Laborales impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-derecho-del-trabajo-y-relaciones-laborales"
  },
  {
    "id": "m-master-derecho-penal",
    "titulo": "Máster Universitario en Derecho Penal",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Derecho Penal impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-derecho-penal"
  },
  {
    "id": "m-master-derecho-privado-patrimonial",
    "titulo": "Máster Universitario en Derecho Privado Patrimonial",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Derecho Privado Patrimonial impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-derecho-privado-patrimonial"
  },
  {
    "id": "m-master-estrategias-anticorrupcion-y-politicas-de-integridad",
    "titulo": "Máster Universitario en Estrategias Anticorrupción y Políticas de Integridad",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estrategias Anticorrupción y Políticas de Integridad impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estrategias-anticorrupcion-y-politicas-de-integridad"
  },
  {
    "id": "m-master-estudios-avanzados-en-educacion-en-la-sociedad-global",
    "titulo": "Máster Universitario en Estudios Avanzados de Educación en la Sociedad Global",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios Avanzados de Educación en la Sociedad Global impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estudios-avanzados-en-educacion-en-la-sociedad-global"
  },
  {
    "id": "m-master-estudios-avanzados-en-dificultades-de-aprendizaje",
    "titulo": "Máster Universitario en Estudios Avanzados en Dificultades de Aprendizaje",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios Avanzados en Dificultades de Aprendizaje impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estudios-avanzados-en-dificultades-de-aprendizaje"
  },
  {
    "id": "m-master-estudios-avanzados-sobre-el-lenguaje-la-comunicacion-y-sus-patologias",
    "titulo": "Máster Universitario en Estudios Avanzados sobre el Lenguaje, la Comunicación y sus Patologías",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios Avanzados sobre el Lenguaje, la Comunicación y sus Patologías impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estudios-avanzados-sobre-el-lenguaje-la-comunicacion-y-sus-patologias"
  },
  {
    "id": "m-master-estudios-de-la-union-europea",
    "titulo": "Máster Universitario en Estudios de la Unión Europea",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios de la Unión Europea impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estudios-de-la-union-europea"
  },
  {
    "id": "m-master-estudios-en-asia-oriental",
    "titulo": "Máster Universitario en Estudios en Asia Oriental",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios en Asia Oriental impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estudios-en-asia-oriental"
  },
  {
    "id": "m-master-estudios-interdisciplinares-de-genero",
    "titulo": "Máster Universitario en Estudios Interdisciplinares de Género",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios Interdisciplinares de Género impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estudios-interdisciplinares-de-genero"
  },
  {
    "id": "m-master-estudios-latinoamericanos",
    "titulo": "Máster Universitario en Estudios Latinoamericanos",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Estudios Latinoamericanos impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-estudios-latinoamericanos"
  },
  {
    "id": "m-master-investigacion-en-administracion-y-economia-de-la-empresa",
    "titulo": "Máster Universitario en Investigación en Administración y Economía de la Empresa",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Investigación en Administración y Economía de la Empresa impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-investigacion-en-administracion-y-economia-de-la-empresa"
  },
  {
    "id": "m-master-investigacion-en-discapacidad",
    "titulo": "Máster Universitario en Investigación en Discapacidad",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Investigación en Discapacidad impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-investigacion-en-discapacidad"
  },
  {
    "id": "m-master-tic-en-educacion-analisis-y-diseno-de-procesos-recursos-y-practicas-formativas",
    "titulo": "Máster Universitario en Las TIC en Educación: Análisis y Diseño de Procesos, Recursos y Prácticas Formativas",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Las TIC en Educación: Análisis y Diseño de Procesos, Recursos y Prácticas Formativas impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-tic-en-educacion-analisis-y-diseno-de-procesos-recursos-y-practicas-formativas"
  },
  {
    "id": "m-master-profesor-de-educacion-secundaria-obligatoria-y-bachillerato-formacion-profesional-y-ensenanzas",
    "titulo": "Máster Universitario en Profesor de Educación Secundaria Obligatoria y Bachillerato, Formación Profesional y Enseñanzas de Idiomas",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Profesor de Educación Secundaria Obligatoria y Bachillerato, Formación Profesional y Enseñanzas de Idiomas impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-profesor-de-educacion-secundaria-obligatoria-y-bachillerato-formacion-profesional-y-ensenanzas"
  },
  {
    "id": "m-seguridad-y-funcion-policial-0",
    "titulo": "Máster Universitario en Seguridad y Función Policial",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Seguridad y Función Policial impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/seguridad-y-funcion-policial-0"
  },
  {
    "id": "m-master-servicios-publicos-y-politicas-sociales",
    "titulo": "Máster Universitario en Servicios Públicos y Políticas Sociales",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Servicios Públicos y Políticas Sociales impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-servicios-publicos-y-politicas-sociales"
  },
  {
    "id": "m-master-sistemas-de-informacion-digital",
    "titulo": "Máster Universitario en Sistemas de Información Digital",
    "area": "Ciencias Sociales y Jurídicas",
    "areaCode": "sociales",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Sistemas de Información Digital impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-sistemas-de-informacion-digital"
  },
  {
    "id": "m-master-ingenieria-agronomica",
    "titulo": "Máster Universitario en Ingeniería Agronómica",
    "area": "Ingeniería y Arquitectura",
    "areaCode": "ingenieria",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Ingeniería Agronómica impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-ingenieria-agronomica"
  },
  {
    "id": "m-master-ingenieria-industrial",
    "titulo": "Máster Universitario en Ingeniería Industrial",
    "area": "Ingeniería y Arquitectura",
    "areaCode": "ingenieria",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Ingeniería Industrial impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-ingenieria-industrial"
  },
  {
    "id": "m-ingenieria-mecatronica",
    "titulo": "Máster Universitario en Ingeniería Mecatrónica",
    "area": "Ingeniería y Arquitectura",
    "areaCode": "ingenieria",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Ingeniería Mecatrónica impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/ingenieria-mecatronica"
  },
  {
    "id": "m-master-ingenieria-quimica",
    "titulo": "Máster Universitario en Ingeniería Química",
    "area": "Ingeniería y Arquitectura",
    "areaCode": "ingenieria",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Ingeniería Química impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-ingenieria-quimica"
  },
  {
    "id": "m-master-sistemas-inteligentes",
    "titulo": "Máster Universitario en Sistemas Inteligentes",
    "area": "Ingeniería y Arquitectura",
    "areaCode": "ingenieria",
    "creditos": 60,
    "modalidad": "Presencial",
    "centro": "Universidad de Salamanca",
    "descripcion": "Enseñanza oficial de postgrado en Sistemas Inteligentes impartida por la Universidad de Salamanca, con profesorado de excelencia y orientación investigadora y profesional.",
    "link": "https://usal.es/master-sistemas-inteligentes"
  }
];
