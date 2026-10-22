import {
  ApprenticeProfile,
  ApprenticeRecord,
  Badge,
  InductionPlanPhase,
  ModuleItem,
  QuizQuestion,
  SimulationCase,
} from '../types/induction';

export const DEFAULT_APPRENTICE: ApprenticeProfile = {
  name: 'Carolina Gómez Restrepo',
  documentType: 'C.C.',
  documentNumber: '1020498765',
  trainingProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
  groupCode: '2837491',
  regional: 'Regional Distrito Capital',
  trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
  email: 'carolina.gomez@misena.edu.co',
};

export const INITIAL_APPRENTICES_ROSTER: ApprenticeRecord[] = [
  {
    id: 'app-01',
    registrationDate: '2026-10-21',
    documentType: 'C.C.',
    documentNumber: '1020498765',
    name: 'Carolina Gómez Restrepo',
    email: 'carolina.gomez@misena.edu.co',
    trainingProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    groupCode: '2837491',
    trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    regional: 'Regional Distrito Capital',
    completedModulesCount: 5,
    completedModuleIds: ['mod-1', 'mod-2', 'mod-3', 'mod-4', 'mod-5'],
    resolvedCasesCount: 5,
    resolvedCaseIds: ['case-1', 'case-2', 'case-3', 'case-4', 'case-5'],
    quizScore: 90,
    totalXp: 1150,
    status: 'APROBADO',
    verificationCode: 'SENA-IND-2026-7491-8765',
  },
  {
    id: 'app-02',
    registrationDate: '2026-10-20',
    documentType: 'C.C.',
    documentNumber: '1035987123',
    name: 'Mateo Alejandro Valencia',
    email: 'mateo.valencia@misena.edu.co',
    trainingProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    groupCode: '2837491',
    trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    regional: 'Regional Distrito Capital',
    completedModulesCount: 5,
    completedModuleIds: ['mod-1', 'mod-2', 'mod-3', 'mod-4', 'mod-5'],
    resolvedCasesCount: 4,
    resolvedCaseIds: ['case-1', 'case-2', 'case-3', 'case-4'],
    quizScore: 85,
    totalXp: 1020,
    status: 'APROBADO',
    verificationCode: 'SENA-IND-2026-7491-7123',
  },
  {
    id: 'app-03',
    registrationDate: '2026-10-19',
    documentType: 'T.I.',
    documentNumber: '1088492014',
    name: 'Valentina Puentes Herrera',
    email: 'valentina.puentes@misena.edu.co',
    trainingProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    groupCode: '2837491',
    trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    regional: 'Regional Distrito Capital',
    completedModulesCount: 3,
    completedModuleIds: ['mod-1', 'mod-2', 'mod-3'],
    resolvedCasesCount: 2,
    resolvedCaseIds: ['case-1', 'case-2'],
    quizScore: 70,
    totalXp: 650,
    status: 'EN CURSO',
    verificationCode: 'PENDIENTE_REINTENTO',
  },
  {
    id: 'app-04',
    registrationDate: '2026-10-18',
    documentType: 'C.C.',
    documentNumber: '1014295831',
    name: 'Andrés Felipe Ruiz Mendoza',
    email: 'andres.ruiz@misena.edu.co',
    trainingProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    groupCode: '2837491',
    trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    regional: 'Regional Distrito Capital',
    completedModulesCount: 5,
    completedModuleIds: ['mod-1', 'mod-2', 'mod-3', 'mod-4', 'mod-5'],
    resolvedCasesCount: 5,
    resolvedCaseIds: ['case-1', 'case-2', 'case-3', 'case-4', 'case-5'],
    quizScore: 100,
    totalXp: 1350,
    status: 'APROBADO',
    verificationCode: 'SENA-IND-2026-7491-5831',
  },
  {
    id: 'app-05',
    registrationDate: '2026-10-17',
    documentType: 'C.C.',
    documentNumber: '1047291844',
    name: 'Laura Tatiana Castro Dávila',
    email: 'laura.castro@misena.edu.co',
    trainingProgram: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    groupCode: '2837491',
    trainingCenter: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    regional: 'Regional Distrito Capital',
    completedModulesCount: 1,
    completedModuleIds: ['mod-1'],
    resolvedCasesCount: 0,
    resolvedCaseIds: [],
    quizScore: null,
    totalXp: 200,
    status: 'EN CURSO',
    verificationCode: 'PENDIENTE_EVALUACION',
  },
];

export const INDUCTION_PLAN: InductionPlanPhase[] = [
  {
    phaseNumber: 1,
    title: 'Contextualización Institucional y Mística SENA',
    durationHours: 8,
    objective:
      'Apropiar el sentido de pertenencia institucional, la historia, misión, visión y los símbolos patrios y corporativos que identifican a la entidad más querida por los colombianos.',
    competencies: [
      'Identificar la estructura organizacional y los servicios de bienestar al aprendiz.',
      'Comprender el modelo de Formación Profesional Integral con enfoque por competencias.',
      'Reconocer los canales institucionales oficiales (SOFIA Plus, Zajuna, MiSENA).',
    ],
    activities: [
      {
        name: 'Taller de Símbolos y Misión Institucional',
        deliverable: 'Mapa conceptual de la historia y valores del SENA',
        duration: '2 Horas',
      },
      {
        name: 'Presentación del Portafolio de Bienestar al Aprendiz',
        deliverable: 'Ruta de acceso a apoyos de sostenimiento, salud y cultura',
        duration: '3 Horas',
      },
      {
        name: 'Configuración y acceso al correo MiSENA y plataformas LMS',
        deliverable: 'Perfil activo y verificación de matrícula en SOFIA Plus',
        duration: '3 Horas',
      },
    ],
  },
  {
    phaseNumber: 2,
    title: 'Derechos Fundamentales del Aprendiz',
    durationHours: 8,
    objective:
      'Reconocer las garantías académicas, formativas y administrativas que el SENA otorga a cada aprendiz desde el momento de su matrícula.',
    competencies: [
      'Ejercer con criterio los derechos de petición, debido proceso y libertad de expresión.',
      'Exigir planes de mejoramiento concertados ante dificultades en resultados de aprendizaje.',
      'Aprovechar adecuadamente los ambientes de aprendizaje y recursos didácticos.',
    ],
    activities: [
      {
        name: 'Análisis de los Derechos del Aprendiz (Capítulo II del Reglamento)',
        deliverable: 'Matriz de derechos aplicados a la vida académica',
        duration: '3 Horas',
      },
      {
        name: 'Mesa redonda: El derecho al Debido Proceso y la evaluación justa',
        deliverable: 'Infografía sobre la concertación de planes de mejoramiento',
        duration: '3 Horas',
      },
      {
        name: 'Uso de bibliotecas físicas y digitales del Sistema de Bibliotecas SENA',
        deliverable: 'Búsqueda bibliográfica aplicada al proyecto formativo',
        duration: '2 Horas',
      },
    ],
  },
  {
    phaseNumber: 3,
    title: 'Deberes, Carné, Asistencia y Convivencia',
    durationHours: 8,
    objective:
      'Interiorizar los deberes cívicos, éticos y formativos que garantizan un clima de convivencia armónica, seguridad laboral y excelencia técnica.',
    competencies: [
      'Cumplir con el protocolo estricto de justificación de inasistencias en el término de 3 días hábiles.',
      'Portar adecuadamente el carné institucional visible y los Elementos de Protección Personal (EPP).',
      'Custodiar los bienes, herramientas y equipos entregados para el aprendizaje.',
    ],
    activities: [
      {
        name: 'Protocolo de Novedades y Justificación de Inasistencias',
        deliverable: 'Simulación de radicación formal de soporte médico / laboral',
        duration: '3 Horas',
      },
      {
        name: 'Taller de Seguridad y Salud en el Trabajo y uso de EPP',
        deliverable: 'Checklist de seguridad para talleres y laboratorios',
        duration: '3 Horas',
      },
      {
        name: 'Pacto de Aula y Convivencia para la ficha de formación',
        deliverable: 'Acuerdo firmado de convivencia y respeto mutuo',
        duration: '2 Horas',
      },
    ],
  },
  {
    phaseNumber: 4,
    title: 'Prohibiciones, Clasificación de Faltas y Debido Proceso',
    durationHours: 8,
    objective:
      'Diferenciar con precisión las faltas académicas y disciplinarias, su gravedad (leves, graves, gravísimas) y el procedimiento del Comité de Evaluación y Seguimiento.',
    competencies: [
      'Identificar conductas prohibidas como plagio, adulteración y porte de sustancias ilícitas.',
      'Comprender la ruta procedimental: queja, descargos, comités y recurso de reposición.',
      'Distinguir entre medidas formativas pedagógicas y sanciones administrativas.',
    ],
    activities: [
      {
        name: 'Estudio de casos sobre faltas académicas vs. faltas disciplinarias',
        deliverable: 'Dilemas éticos resueltos con fundamento en el Reglamento',
        duration: '3 Horas',
      },
      {
        name: 'Simulacro de Audiencia de Comité de Evaluación y Seguimiento',
        deliverable: 'Acta de descargos y análisis del derecho de contradicción',
        duration: '3 Horas',
      },
      {
        name: 'Ruta del Recurso de Reposición ante el Subdirector de Centro',
        deliverable: 'Flujograma del debido proceso sancionatorio',
        duration: '2 Horas',
      },
    ],
  },
  {
    phaseNumber: 5,
    title: 'Etapa Práctica, Evaluación y Certificación de Inducción',
    durationHours: 8,
    objective:
      'Conocer las 7 alternativas para el desarrollo de la etapa productiva en el sector productivo y superar la evaluación diagnóstica para certificar la inducción.',
    competencies: [
      'Seleccionar oportunamente la alternativa de etapa productiva más idónea.',
      'Verificar el cumplimiento de resultados de aprendizaje en etapa lectiva.',
      'Obtener la certificación oficial de apropiación del Reglamento del Aprendiz.',
    ],
    activities: [
      {
        name: 'Feria de Alternativas de Etapa Práctica (Contrato, Proyecto, Pasantía, etc.)',
        deliverable: 'Ficha de proyección y postulación a etapa productiva',
        duration: '3 Horas',
      },
      {
        name: 'Retos adaptativos de simulación del Reglamento',
        deliverable: 'Registro de resolución de situaciones complejas',
        duration: '2 Horas',
      },
      {
        name: 'Evaluación de Salida y Generación del Certificado de Inducción',
        deliverable: 'Certificado oficial emitido con código de verificación QR',
        duration: '3 Horas',
      },
    ],
  },
];

export const MODULES_DATA: ModuleItem[] = [
  {
    id: 'mod-1',
    number: '01',
    title: 'Identidad, Principios y Formación Profesional Integral',
    subtitle: 'Naturaleza jurídica, misión del SENA, símbolos y estructura formativa',
    regulationReference: 'Acuerdo 009 de 2024 / Ley 119 de 1994',
    summary:
      'El Servicio Nacional de Aprendizaje (SENA) es un establecimiento público del orden nacional encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral.',
    keyArticles: [
      {
        article: 'Art. 1 - Ámbito de Aplicación',
        title: 'Comunidad de Aprendizaje',
        content:
          'El Reglamento se aplica a todas las personas matriculadas en los programas de formación titulada y complementaria, en modalidades presencial, virtual o combinada, en todo el territorio nacional.',
        keyTakeaway: 'Todo aprendiz formalmente matriculado adquiere los derechos y asume los deberes institucionales.',
      },
      {
        article: 'Art. 2 - Formación Profesional Integral (FPI)',
        title: 'Desarrollo en el Ser, Saber y Hacer',
        content:
          'Proceso educativo teórico-práctico de carácter integral, orientado al desarrollo de conocimientos técnicos, habilidades tecnológicas y actitudes y valores para el desempeño productivo y la convivencia solidaria.',
        keyTakeaway: 'El SENA no solo entrena para el empleo, forma ciudadanos íntegros y transformadores sociales.',
      },
      {
        article: 'Art. 3 - Etapas de la Formación',
        title: 'Etapa Lectiva y Etapa Práctica',
        content:
          'La formación en programas titulados comprende la etapa lectiva (adquisición de competencias en ambientes de aprendizaje) y la etapa productiva (aplicación en el sector real).',
        keyTakeaway: 'Ambas etapas son de obligatorio cumplimiento y evaluación para acceder a la certificación.',
      },
    ],
    rights: [
      'Recibir inducción integral al inicio del proceso formativo.',
      'Contar con carné institucional que lo acredite como aprendiz SENA.',
      'Recibir formación con instructores calificados y metodologías activas.',
      'Acceder a servicios de bienestar: deportes, arte, salud, liderazgo y apoyos socioeconómicos.',
    ],
    interactiveQuickCheck: {
      question: '¿Qué dimensiones articula la Formación Profesional Integral (FPI) en el SENA?',
      options: [
        'Únicamente memorización teórica de normas y leyes vigentes.',
        'El Ser (actitudes/valores), el Saber (conocimiento) y el Hacer (habilidades técnicas).',
        'Exclusivamente trabajo en planta sin acompañamiento pedagógico.',
        'Solo asistencia a clases magistrales sin prácticas.',
      ],
      answerIndex: 1,
      rationale:
        'La FPI en el SENA se fundamenta en el desarrollo holístico del individuo: el Ser (valores ciudadanos), el Saber (competencias cognitivas) y el Hacer (desempeño técnico en el trabajo).',
    },
    xpReward: 150,
  },
  {
    id: 'mod-2',
    number: '02',
    title: 'Derechos Fundamentales del Aprendiz',
    subtitle: 'Garantías académicas, de bienestar, representación y debido proceso',
    regulationReference: 'Reglamento del Aprendiz - Capítulo II (Derechos)',
    summary:
      'El aprendiz SENA es el centro del proceso formativo. Sus derechos aseguran un trato digno, acceso transparente a evaluaciones, planes de mejoramiento concertados y canales democráticos de representación.',
    keyArticles: [
      {
        article: 'Art. 7 Numeral 1 - Inducción y Orientación',
        title: 'Derecho a la Inducción Oportuna',
        content:
          'Recibir una inducción completa al iniciar el programa sobre la estructura institucional, reglamento, metodología por proyectos y el diseño curricular respectivo.',
        keyTakeaway: 'La inducción es un derecho irrenunciable garantizado al 100% de los matriculados.',
      },
      {
        article: 'Art. 7 Numeral 4 - Evaluación Transparente',
        title: 'Conocimiento Oportuno de Resultados',
        content:
          'Ser evaluado con criterios objetivos y conocer los resultados de sus evidencias de aprendizaje dentro de los términos estipulados (máximo 8 días hábiles siguientes a la entrega).',
        keyTakeaway: 'El instructor debe retroalimentar y justificar el juicio evaluativo (Aprobado o No Aprobado).',
      },
      {
        article: 'Art. 7 Numeral 6 - Plan de Mejoramiento',
        title: 'Oportunidad de Superación Académica',
        content:
          'Solicitar y concertar un Plan de Mejoramiento pedagógico cuando una evidencia o resultado de aprendizaje no sea alcanzado en primera instancia.',
        keyTakeaway: 'Antes de cualquier sanción académica, el aprendiz tiene derecho a superar sus brechas mediante un plan formativo.',
      },
      {
        article: 'Art. 7 Numeral 9 - Debido Proceso',
        title: 'Garantía Constitucional en Todo Procedimiento',
        content:
          'Ser escuchado en descargos, aportar pruebas, controvertir las que se presenten en su contra y presentar recursos legales en cualquier queja o proceso disciplinario.',
        keyTakeaway: 'Nadie puede ser sancionado sin haber tenido la oportunidad real y legal de defenderse.',
      },
    ],
    rights: [
      'Elegir y ser elegido democráticamente como Vocero de Ficha o Representante de Aprendices.',
      'Hacer uso de la infraestructura tecnológica, talleres, laboratorios y bibliotecas.',
      'Recibir estímulos e incentivos institucionales por excelencia académica, deportiva o de innovación.',
      'Expresar libremente sus ideas y opiniones dentro del marco del respeto hacia la comunidad educativa.',
    ],
    interactiveQuickCheck: {
      question:
        'Si un aprendiz no aprueba una evidencia formativa, ¿cuál es el derecho inmediato que le asiste según el Reglamento?',
      options: [
        'Expulsión inmediata del Centro de Formación.',
        'Concertar un Plan de Mejoramiento pedagógico con su instructor para alcanzar el resultado.',
        'Pagar una multa pecuniaria para recuperar la nota.',
        'Repetir todo el año lectivo desde el inicio sin opción de revisión.',
      ],
      answerIndex: 1,
      rationale:
        'El artículo 7 establece el derecho a concertar un Plan de Mejoramiento pedagógico que determine actividades complementarias para subsanar deficiencias en el aprendizaje antes de cualquier medida sancionatoria.',
    },
    xpReward: 200,
  },
  {
    id: 'mod-3',
    number: '03',
    title: 'Deberes, Carné, Asistencia y Convivencia',
    subtitle: 'Obligaciones formativas, justificación de inasistencias y protocolos de seguridad',
    regulationReference: 'Reglamento del Aprendiz - Capítulo III (Deberes)',
    summary:
      'El ejercicio responsable de los deberes asegura la convivencia pacífica, la seguridad ocupacional y el cumplimiento exitoso del perfil de egreso exigido por los sectores económicos.',
    keyArticles: [
      {
        article: 'Art. 9 Numeral 2 - Asistencia y Puntualidad',
        title: 'Cumplimiento del Horario Formativo',
        content:
          'Cumplir con las actividades curriculares presenciales y virtuales programadas para su formación y justificar oportunamente las inasistencias dentro de los 3 días hábiles siguientes.',
        keyTakeaway: 'El plazo legal improrrogable para justificar una inasistencia con soporte es de 3 días hábiles.',
      },
      {
        article: 'Art. 9 Numeral 5 - Porte del Carné Institucional',
        title: 'Identificación Obligatoria',
        content:
          'Portar visiblemente el carné de aprendiz durante la permanencia en las instalaciones del SENA o en actividades externas autorizadas, y no cederlo a terceros bajo ninguna circunstancia.',
        keyTakeaway: 'El carné es personal e intransferible; prestarlo constituye falta disciplinaria grave.',
      },
      {
        article: 'Art. 9 Numeral 8 - Seguridad, Salud y EPP',
        title: 'Uso de Elementos de Protección Personal',
        content:
          'Utilizar la dotación, uniforme y EPP requeridos para cada ambiente de formación y taller técnico, respetando las normas de bioseguridad y señalización.',
        keyTakeaway: 'Ingresar a talleres de maquinaria sin EPP está terminantemente prohibido por seguridad propia y colectiva.',
      },
      {
        article: 'Art. 9 Numeral 12 - Trámite de Novedades',
        title: 'Reporte Formal de Novedades',
        content:
          'Radicar a través de SOFIA Plus o ante la Coordinación Académica solicitudes de traslado, aplazamiento, reingreso o retiro voluntario en los plazos normativos.',
        keyTakeaway: 'El abandono de la formación sin aviso previo formal genera sanción de inhabilidad de hasta 6 meses para volver a inscribirse.',
      },
    ],
    duties: [
      'Tratar con respeto y dignidad a compañeros, instructores, directivos, contratistas y personal de apoyo.',
      'Custodiar y cuidar los equipos, herramientas, muebles y software asignados.',
      'Revisar permanentemente el correo institucional @misena y la plataforma de aprendizaje LMS.',
      'Cumplir a cabalidad con el cronograma y compromisos suscritos en la matrícula.',
    ],
    interactiveQuickCheck: {
      question:
        '¿Cuál es el plazo reglamentario que tiene el aprendiz para presentar los soportes de una inasistencia ante el instructor o coordinador?',
      options: [
        'Al finalizar el semestre académico.',
        'Dentro de los 3 días hábiles siguientes a la ocurrencia del hecho que motivó la falta.',
        '15 días calendario posteriores.',
        'No es necesario justificar las inasistencias.',
      ],
      answerIndex: 1,
      rationale:
        'El Reglamento fija con exactitud un término de tres (3) días hábiles siguientes a la fecha del evento fortuito (médico, calamidad doméstica, legal) para radicar la justificación formal con su soporte probatorio.',
    },
    xpReward: 200,
  },
  {
    id: 'mod-4',
    number: '04',
    title: 'Prohibiciones, Clasificación de Faltas y Debido Proceso',
    subtitle: 'Faltas académicas vs. disciplinarias, escala de gravedad y comité',
    regulationReference: 'Reglamento del Aprendiz - Capítulos IV, V y VI',
    summary:
      'El régimen disciplinario y sancionatorio protege la comunidad educativa. Se rige por el principio constitucional del debido proceso, presunción de inocencia y derecho a la contradicción.',
    keyArticles: [
      {
        article: 'Art. 10 - Prohibiciones Expresas',
        title: 'Conductas Vedadas en el SENA',
        content:
          'Está expresamente prohibido: ingresar o consumir bebidas alcohólicas o sustancias psicoactivas; portar armas; plagiar trabajos; falsificar documentos; comercializar bienes no autorizados o alterar la convivencia.',
        keyTakeaway: 'Cometer plagio o falsificar certificaciones acarrea cancelación inmediata de matrícula e investigaciones legales.',
      },
      {
        article: 'Art. 11 y 12 - Clasificación de las Faltas',
        title: 'Académicas y Disciplinarias',
        content:
          'Las faltas se clasifican en: Académicas (incumplimiento en evidencias y competencias) y Disciplinarias (conductas que vulneran normas de convivencia, bienes o derechos ajenos). Ambas pueden ser Leves, Graves o Gravísimas.',
        keyTakeaway: 'La gravedad se determina por el impacto, reiteración, premeditación y grado de perturbación en el centro.',
      },
      {
        article: 'Art. 18 - Comité de Evaluación y Seguimiento',
        title: 'Órgano Asesor Colegiado',
        content:
          'Instancia encargada de analizar los casos de aprendices que incurran en faltas o dificultades formativas, garantizando la audiencia de descargos y recomendando medidas al Subdirector.',
        keyTakeaway: 'El Comité está integrado por instructores, coordinador académico, vocero de ficha y profesional de bienestar.',
      },
    ],
    prohibitions: [
      {
        category: 'Académica',
        rule: 'Plagiar evidencias de aprendizaje, código fuente o investigaciones de internet o compañeros.',
        impact: 'Calificación No Aprobado, condicionamiento o cancelación de matrícula.',
      },
      {
        category: 'Disciplinaria',
        rule: 'Ingreso o consumo de alcohol o estupefacientes en ambientes presenciales o virtuales del SENA.',
        impact: 'Falta Gravísima con apertura inmediata de procedimiento disciplinario.',
      },
      {
        category: 'Disciplinaria',
        rule: 'Prestar, adulterar o usar de manera fraudulenta el carné institucional para ingreso indebido.',
        impact: 'Falta Grave que amerita llamado de atención con copia a la hoja de vida.',
      },
      {
        category: 'Académica',
        rule: 'Incumplir reiteradamente con los planes de mejoramiento concertados sin justa causa.',
        impact: 'Cancelación de matrícula por insuficiencia de rendimiento académico.',
      },
    ],
    dueProcessSteps: [
      {
        step: 1,
        title: 'Informe o Queja Formal',
        desc: 'El instructor o miembro de la comunidad radica el reporte detallado con pruebas documentales ante la Coordinación Académica.',
        deadline: 'Máximo 5 días hábiles tras el hecho',
      },
      {
        step: 2,
        title: 'Citación a Comité y Descargos',
        desc: 'Se notifica al aprendiz formalmente con mínimo 3 días de antelación para que prepare su defensa, aporte testigos o documentos.',
        deadline: '3 días hábiles antes de la sesión',
      },
      {
        step: 3,
        title: 'Sesión del Comité de Evaluación',
        desc: 'El aprendiz expone sus descargos, se deliberan las pruebas y el comité elabora una recomendación motivada al Subdirector de Centro.',
        deadline: 'Acta formal de la sesión',
      },
      {
        step: 4,
        title: 'Acto Administrativo Sancionatorio',
        desc: 'El Subdirector de Centro emite la Resolución motivada que absuelve o impone la medida correspondiente.',
        deadline: 'Dentro de los términos de ley',
      },
      {
        step: 5,
        title: 'Recurso de Reposición',
        desc: 'El aprendiz tiene derecho a interponer Recurso de Reposición por escrito ante el mismo Subdirector para solicitar revisión de la decisión.',
        deadline: '5 días hábiles tras la notificación',
      },
    ],
    interactiveQuickCheck: {
      question:
        'Si un aprendiz recibe una resolución de cancelación de matrícula por parte del Subdirector de Centro, ¿qué recurso legal puede interponer y en qué término?',
      options: [
        'Ninguno, las decisiones del Subdirector son inapelables de forma inmediata.',
        'Recurso de Reposición por escrito dentro de los 5 días hábiles siguientes a la notificación.',
        'Demandar penalmente a los compañeros de ficha al día siguiente.',
        'Solicitar cambio de jornada formativa sin responder la notificación.',
      ],
      answerIndex: 1,
      rationale:
        'El debido proceso garantiza el derecho de defensa mediante el Recurso de Reposición, el cual debe interponerse por escrito dentro de los cinco (5) días hábiles siguientes a la notificación formal del acto administrativo.',
    },
    xpReward: 250,
  },
  {
    id: 'mod-5',
    number: '05',
    title: 'Medidas Formativas, Sanciones y Alternativas de Etapa Práctica',
    subtitle: 'Llamados de atención, condicionamiento, cancelación y opciones productivas',
    regulationReference: 'Reglamento del Aprendiz - Capítulos VII y VIII',
    summary:
      'El SENA prioriza las medidas pedagógicas sobre las punitivas. Asimismo, ofrece diversas alternativas para la etapa práctica que permiten al aprendiz insertarse con éxito en el tejido empresarial colombiano.',
    keyArticles: [
      {
        article: 'Art. 27 - Medidas Formativas',
        title: 'Llamado de Atención Verbal y Plan de Mejoramiento',
        content:
          'Medidas pedagógicas para prevenir faltas mayores o corregir deficiencias tempranas en el aprendizaje y la conducta.',
        keyTakeaway: 'Tienen carácter formativo y buscan el fortalecimiento de competencias antes de sancionar.',
      },
      {
        article: 'Art. 28 - Medidas Sancionatorias',
        title: 'Llamado Escrito, Condicionamiento y Cancelación',
        content:
          'Sanciones impuestas por Resolución: Llamado de atención escrito con copia a hoja de vida; Condicionamiento de matrícula (suspende estímulos); Cancelación de matrícula (conlleva inhabilidad de 6 a 24 meses).',
        keyTakeaway: 'La cancelación de matrícula es la sanción máxima e inhabilita para matricularse en el SENA en todo el país.',
      },
      {
        article: 'Art. 30 - Alternativas de Etapa Práctica',
        title: 'Opciones de Cumplimiento Productivo',
        content:
          'El aprendiz puede elegir entre 7 modalidades avaladas institucionalmente para acreditar su etapa productiva y obtener el título.',
        keyTakeaway: 'Se puede gestionar desde el inicio de la formación según disponibilidad y perfil ocupacional.',
      },
    ],
    practicalAlternatives: [
      {
        name: 'Contrato de Aprendizaje',
        desc: 'Vinculación formal formativa con empresa patrocinadora; otorga apoyo de sostenimiento mensual y afiliación a EPS y ARL.',
        requirements: 'Estar registrado en Caprendizaje (SGVA), no tener inhabilidad previa ni contrato anterior del mismo nivel.',
      },
      {
        name: 'Proyecto Productivo (SENA Emprende)',
        desc: 'Creación y sustentación de un modelo de negocio o unidad productiva innovadora asesorada por el Fondo Emprender.',
        requirements: 'Formular plan de negocio avalado por instructores de emprendimiento y comité técnico.',
      },
      {
        name: 'Pasantía o Vínculo Laboral',
        desc: 'Desempeño de funciones directamente relacionadas con el perfil del programa en una entidad pública o privada o empresa propia.',
        requirements: 'Concertación previa de plan de trabajo y supervisión por parte del instructor de seguimiento.',
      },
      {
        name: 'Monitoría Institucional',
        desc: 'Apoyo técnico o pedagógico calificado a ambientes de formación o áreas estratégicas dentro del mismo SENA.',
        requirements: 'Excelente rendimiento académico, postulación en convocatorias de bienestar y no tener sanciones.',
      },
    ],
    interactiveQuickCheck: {
      question:
        '¿Cuál de las siguientes afirmaciones sobre el Contrato de Aprendizaje como alternativa de etapa práctica es correcta?',
      options: [
        'Es un contrato laboral indefinido que no requiere validación del perfil formativo.',
        'Es una forma especial dentro del Derecho Laboral orientada a la formación, con apoyo de sostenimiento y afiliaciones de ley.',
        'El aprendiz debe pagar a la empresa por permitirle practicar en sus oficinas.',
        'Solo aplica para carreras universitarias de medicina.',
      ],
      answerIndex: 1,
      rationale:
        'El Contrato de Aprendizaje (Ley 789 de 2002) es una relación especial reglada donde la empresa patrocina al aprendiz, brindando apoyo de sostenimiento (mínimo el 75% o 100% de un SMLV según desempleo) y cobertura de seguridad social en salud y riesgos laborales.',
    },
    xpReward: 200,
  },
];

export const SIMULATION_CASES: SimulationCase[] = [
  {
    id: 'case-1',
    title: 'Inasistencia imprevista por quebranto de salud y entrega de evidencias',
    category: 'Deberes e Inasistencias',
    difficulty: 'Básico',
    character: {
      name: 'Andrés Felipe',
      role: 'Aprendiz ADSO de 2º Trimestre',
      badgeLabel: 'Caso Clínico & Términos',
    },
    narrative:
      'Andrés sufre una intoxicación alimentaria un martes y el médico de su EPS le prescribe 3 días de incapacidad médica certificada (miércoles a viernes). Casualmente, el jueves la ficha tenía programada la entrega y sustentación del proyecto formativo de base de datos.',
    dilemma:
      'Andrés teme que le califiquen "No Aprobado" o le abran proceso disciplinario por inasistencia. ¿Cuál es el procedimiento correcto que debe seguir conforme al Reglamento?',
    hint: 'Recuerda el plazo en días hábiles que estipula el Reglamento para radicar justificaciones de inasistencia formalmente.',
    regulationBasis: 'Reglamento del Aprendiz, Capítulo III, Artículo 9 (Deberes de Asistencia y Justificación)',
    options: [
      {
        id: 'opt-1a',
        label:
          'No decir nada hasta el final del trimestre y presentar todos los certificados médicos juntos en la última semana.',
        isCorrect: false,
        feedback:
          'Incorrecto. Si dejas pasar más de 3 días hábiles sin radicar la justificación, la inasistencia se considera injustificada y genera reporte por deserción.',
        consequenceSummary: 'Riesgo de deserción del programa y calificación deficiente.',
        xpDelta: -20,
      },
      {
        id: 'opt-1b',
        label:
          'Enviar copia legible de la incapacidad oficial de EPS a los instructores y radicarla formalmente dentro de los 3 días hábiles siguientes al reintegro.',
        isCorrect: true,
        feedback:
          '¡Excelente decisión! Conforme al artículo 9, el aprendiz cuenta con 3 días hábiles para radicar formalmente su soporte. Al hacerlo, el instructor reprogramará la entrega y sustentación sin sanción.',
        consequenceSummary: 'Inasistencia justificada y garantía de reprogramación de evidencias.',
        xpDelta: 100,
      },
      {
        id: 'opt-1c',
        label:
          'Pedirle a un compañero de ficha que firme la planilla de asistencia por él el jueves para que nadie note su ausencia.',
        isCorrect: false,
        feedback:
          'Grave error. Falsificar firmas o suplantar la identidad en listas de asistencia es una Falta Gravísima disciplinaria con sanción de cancelación de matrícula.',
        consequenceSummary: 'Falta gravísima con proceso disciplinario inminente.',
        xpDelta: -50,
      },
    ],
  },
  {
    id: 'case-2',
    title: 'Detección de copia no autorizada y derechos de autor en el proyecto',
    category: 'Faltas y Sanciones',
    difficulty: 'Intermedio',
    character: {
      name: 'Mariana y Camilo',
      role: 'Equipo de Proyecto Formativo',
      badgeLabel: 'Integridad Académica',
    },
    narrative:
      'Durante la revisión del módulo de software, el instructor técnico descubre que el 85% del código presentado por Mariana y Camilo fue copiado idénticamente de un repositorio de un aprendiz egresado de 2023, sin citar la fuente y borrando los créditos originales de autoría.',
    dilemma:
      'El instructor los cita a una reunión. ¿Cuál es la tipificación de esta conducta en el Reglamento y qué garantía tienen los aprendices?',
    hint: 'El plagio atenta contra la propiedad intelectual y está expresamente contemplado en las prohibiciones del SENA.',
    regulationBasis: 'Reglamento del Aprendiz, Artículo 10 (Prohibiciones) y Artículos 11-12 (Faltas Académicas Graves)',
    options: [
      {
        id: 'opt-2a',
        label:
          'Es una Falta Académica Grave por plagio y violación de derechos de autor. Tienen derecho a ser escuchados en descargos antes de definir la medida o plan correctivo.',
        isCorrect: true,
        feedback:
          '¡Correcto y preciso! El plagio está prohibido y constituye falta grave. No obstante, el debido proceso exige que el instructor formule el informe motivado y los aprendices tengan la oportunidad de brindar sus explicaciones en descargos.',
        consequenceSummary: 'Se activa el debido proceso respetando el derecho de defensa y la ética formativa.',
        xpDelta: 100,
      },
      {
        id: 'opt-2b',
        label:
          'El instructor puede expulsarlos verbalmente en ese mismo instante del aula sin hacer ningún trámite ni acta escrita.',
        isCorrect: false,
        feedback:
          'Incorrecto. Ningún instructor tiene potestad de expulsar de forma unilateral o inmediata a un aprendiz. Toda sanción requiere procedimiento administrativo formal del Subdirector con comité.',
        consequenceSummary: 'Violación del debido proceso institucional.',
        xpDelta: -30,
      },
      {
        id: 'opt-2c',
        label:
          'Como el software es código libre en internet, no existe ninguna falta y el instructor está obligado a calificarlos con 100 puntos.',
        isCorrect: false,
        feedback:
          'Falso. Aunque sea código abierto, apropiarse de trabajos ajenos haciéndolos pasar como propios en evidencias formativas del SENA constituye fraude y plagio.',
        consequenceSummary: 'Falta ética y académica grave no justificada.',
        xpDelta: -40,
      },
    ],
  },
  {
    id: 'case-3',
    title: 'Ingreso a talleres de maquinaria sin Elementos de Protección Personal (EPP)',
    category: 'Convivencia y EPP',
    difficulty: 'Básico',
    character: {
      name: 'Sebastián',
      role: 'Aprendiz de Mantenimiento Mecatrónico',
      badgeLabel: 'Seguridad en el Taller',
    },
    narrative:
      'Sebastián olvidó sus botas de seguridad dieléctricas y gafas de protección en su casa. Se le hace tarde para la práctica de mecanizado en torno industrial. Para no perder la clase, le pide prestado a otro aprendiz unos tenis de tela y entra corriendo al taller sin avisar al instructor.',
    dilemma:
      'El instructor de taller advierte a Sebastián operando la máquina en tenis y sin gafas protectoras. ¿Cómo debe procederse según las normas de seguridad del SENA?',
    hint: 'La integridad física es prioritaria en todos los ambientes de aprendizaje del SENA.',
    regulationBasis: 'Reglamento del Aprendiz, Artículos 9 y 10 (Deberes de Seguridad e Higiene Ocupacional)',
    options: [
      {
        id: 'opt-3a',
        label:
          'El instructor debe suspender de inmediato la operación de la máquina por inminente riesgo de accidente, retirarlo del ambiente de riesgo e imponer medida formativa preventiva.',
        isCorrect: true,
        feedback:
          '¡Exacto! La prioridad es preservar la vida y la integridad física. El aprendiz no puede operar maquinaria sin EPP bajo ninguna circunstancia por normatividad de SST y del Reglamento.',
        consequenceSummary: 'Mitigación inmediata del riesgo y formación pedagógica en autocuidado.',
        xpDelta: 100,
      },
      {
        id: 'opt-3b',
        label:
          'Dejar que trabaje bajo su propia responsabilidad si firma una servilleta diciendo que el SENA no responde en caso de amputación.',
        isCorrect: false,
        feedback:
          'Absurdo e ilegal. Las normas de seguridad y salud en el trabajo del SENA son de obligatorio cumplimiento y no son negociables bajo ningún documento informal.',
        consequenceSummary: 'Peligro mortal e incumplimiento flagrante de la normativa de SST.',
        xpDelta: -50,
      },
      {
        id: 'opt-3c',
        label:
          'Obligar a Sebastián a comprarle los zapatos al instructor por el doble del precio para poder continuar.',
        isCorrect: false,
        feedback:
          'Totalmente indebido. Ningún funcionario puede comercializar elementos de uso personal o cobrar a los aprendices en el aula.',
        consequenceSummary: 'Conducta contraria a la ética pública y el reglamento.',
        xpDelta: -30,
      },
    ],
  },
  {
    id: 'case-4',
    title: 'Elección y formalización de la Etapa Práctica en el sector productivo',
    category: 'Etapa Práctica',
    difficulty: 'Intermedio',
    character: {
      name: 'Laura Tatiana',
      role: 'Aprendiz de Gestión Empresarial',
      badgeLabel: 'Transición al Sector Real',
    },
    narrative:
      'Laura culmina su etapa lectiva con todas sus competencias aprobadas. Una empresa de logística local le ofrece un Contrato de Aprendizaje, mientras que la junta de acción comunal de su barrio le propone asesorar un emprendimiento comunitario como Proyecto Productivo.',
    dilemma:
      'Laura tiene dudas sobre cómo validar cualquiera de las dos alternativas y cuáles son los requisitos ante la Coordinación Académica del SENA.',
    hint: 'Todas las modalidades de etapa práctica requieren aval institucional y asignación de un instructor de seguimiento.',
    regulationBasis: 'Reglamento del Aprendiz, Capítulo VIII (Alternativas para la Etapa Práctica)',
    options: [
      {
        id: 'opt-4a',
        label:
          'Firmar con la empresa y no avisar al SENA hasta después de 2 años cuando quiera graduarse sin ningún reporte.',
        isCorrect: false,
        feedback:
          'Incorrecto. La etapa práctica tiene un plazo máximo de inicio y ejecución tras finalizar la etapa lectiva; no concertar seguimiento a tiempo genera deserción y vencimiento de términos.',
        consequenceSummary: 'Pérdida del derecho a certificación por extemporaneidad.',
        xpDelta: -40,
      },
      {
        id: 'opt-4b',
        label:
          'Presentar la propuesta a la Coordinación Académica para verificación de pertinencia, registro en el aplicativo oficial y designación de instructor de seguimiento y bitácoras.',
        isCorrect: true,
        feedback:
          '¡Decisión impecable! Sin importar si es Contrato de Aprendizaje, Proyecto Productivo o Pasantía, la alternativa debe ser radicada y validada por el SENA, con registro de bitácoras quincenales y visitas concertadas.',
        consequenceSummary: 'Formalización legal, seguimiento garantizado y certificación transparente.',
        xpDelta: 100,
      },
      {
        id: 'opt-4c',
        label:
          'Pedirle a un primo que le falsifique una carta de recomendación de una empresa que cerró hace 5 años para no tener que hacer ninguna práctica.',
        isCorrect: false,
        feedback:
          'Falsedad en documento privado y fraude académico. Implica cancelación inmediata de matrícula e inhabilidad de hasta 24 meses.',
        consequenceSummary: 'Cancelación de matrícula y denuncia penal por falsedad.',
        xpDelta: -50,
      },
    ],
  },
  {
    id: 'case-5',
    title: 'Inconformidad con un juicio evaluativo y trámite del debido proceso',
    category: 'Derechos',
    difficulty: 'Avanzado',
    character: {
      name: 'Diego',
      role: 'Aprendiz de Producción Agropecuaria',
      badgeLabel: 'Derecho a la Contradicción',
    },
    narrative:
      'Diego entregó en el plazo pactado su informe de laboratorio de suelos. El instructor emite un juicio de "No Aprobado" en el sistema sin ingresar comentarios explicativos ni retroalimentación técnica. Diego considera que su trabajo cumple todos los criterios de la rúbrica.',
    dilemma:
      'Diego está frustrado. ¿Cuál es el conducto regular y pacífico que debe utilizar según el Reglamento del Aprendiz para hacer valer su derecho?',
    hint: 'Existe una escala jerárquica de conducto regular: primero el instructor evaluador, luego el Coordinador Académico.',
    regulationBasis: 'Reglamento del Aprendiz, Capítulo II (Derecho a la Evaluación Transparente y Conducto Regular)',
    options: [
      {
        id: 'opt-5a',
        label:
          'Solicitar respetuosamente por escrito al instructor la revisión y retroalimentación motivada; de persistir el desacuerdo en 2 días hábiles, elevar la solicitud formal ante el Coordinador Académico solicitando un segundo evaluador.',
        isCorrect: true,
        feedback:
          '¡Conducto regular perfecto! El aprendiz tiene derecho a conocer la motivación de su evaluación. Si no hay acuerdo o respuesta objetiva, puede acudir en segunda instancia ante el Coordinador Académico para que designe un segundo evaluador si aplica.',
        consequenceSummary: 'Respeto a las instancias institucionales y resolución pacífica del diferendo.',
        xpDelta: 100,
      },
      {
        id: 'opt-5b',
        label:
          'Bloquear el portón del Centro de Formación con cadenas para que ningún instructor pueda ingresar a dar clases.',
        isCorrect: false,
        feedback:
          'Grave falta disciplinaria. Afectar el normal funcionamiento de las instalaciones o coartar la libre movilidad de la comunidad amerita apertura de comité por falta gravísima.',
        consequenceSummary: 'Falta gravísima disciplinaria y posible proceso policivo.',
        xpDelta: -50,
      },
      {
        id: 'opt-5c',
        label:
          'Crear un perfil anónimo en redes sociales para difamar al instructor con insultos personales.',
        isCorrect: false,
        feedback:
          'Acoso y vulneración al buen nombre. Usar medios digitales para agredir a miembros de la comunidad educativa es causal de sanción disciplinaria severa.',
        consequenceSummary: 'Acoso digital sancionado por el régimen disciplinario.',
        xpDelta: -40,
      },
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    category: 'Principios & Generalidades',
    question: '¿Cuál es la naturaleza jurídica fundamental del Servicio Nacional de Aprendizaje - SENA?',
    options: [
      'Una empresa privada con fines de lucro encargada de cobrar matrículas semestrales.',
      'Un establecimiento público del orden nacional con personería jurídica, patrimonio propio e independencia administrativa.',
      'Una organización no gubernamental internacional sin vinculación con el Estado colombiano.',
      'Un sindicato de trabajadores con funciones bancarias.',
    ],
    correctIndex: 1,
    explanation:
      'El SENA fue creado por la Ley 119 de 1994 y normas reglamentarias como un establecimiento público del orden nacional adscrito al Ministerio del Trabajo, con la misión de impartir formación profesional integral y gratuita.',
    articleReference: 'Estatuto del SENA & Ley 119 de 1994',
  },
  {
    id: 'q-2',
    category: 'Derechos del Aprendiz',
    question:
      '¿Dentro de qué plazo reglamentario tiene derecho el aprendiz a conocer los resultados de sus evaluaciones y retroalimentación?',
    options: [
      'Al año siguiente después del grado.',
      'Máximo a los ocho (8) días hábiles siguientes a la entrega de la evidencia.',
      'El instructor no tiene obligación de retroalimentar las notas.',
      'Treinta días calendario después de terminar el trimestre.',
    ],
    correctIndex: 1,
    explanation:
      'El Reglamento establece que el aprendiz debe recibir retroalimentación oportuna en un término no superior a ocho (8) días hábiles para garantizar la mejora continua.',
    articleReference: 'Capítulo II, Artículo 7 (Derechos)',
  },
  {
    id: 'q-3',
    category: 'Deberes e Inasistencias',
    question:
      'En caso de inasistencia por fuerza mayor o caso fortuito (médico, calamidad doméstica), ¿cuántos días hábiles tiene el aprendiz para presentar los soportes?',
    options: [
      'Quince (15) días hábiles.',
      'Tres (3) días hábiles siguientes a la ocurrencia del hecho.',
      'Treinta (30) días calendario.',
      'No se exige ningún soporte ni plazo.',
    ],
    correctIndex: 1,
    explanation:
      'El artículo 9 del Reglamento determina que el aprendiz debe justificar sus inasistencias allegando los soportes respectivos dentro de los tres (3) días hábiles posteriores al suceso.',
    articleReference: 'Capítulo III, Artículo 9 (Deberes)',
  },
  {
    id: 'q-4',
    category: 'Uso de Identificación',
    question: '¿Qué norma rige el porte del carné de aprendiz del SENA en los centros y ambientes formativos?',
    options: [
      'Es de porte visible y obligatorio, de carácter personal e intransferible.',
      'Se puede prestar a amigos o familiares para que ingresen a la biblioteca.',
      'Solo se debe llevar en la billetera sin mostrarlo nunca.',
      'Es opcional y no tiene ninguna validez institucional.',
    ],
    correctIndex: 0,
    explanation:
      'El carné institucional debe portarse en un lugar visible en todo momento. Cederlo a terceros es una falta grave que afecta la seguridad del centro.',
    articleReference: 'Capítulo III, Artículo 9 (Deber de Identificación)',
  },
  {
    id: 'q-5',
    category: 'Clasificación de Faltas',
    question: '¿Cómo se clasifican las faltas en el Reglamento del Aprendiz SENA?',
    options: [
      'Solo en financieras y mercantiles.',
      'En Académicas y Disciplinarias; y según su gravedad en Leves, Graves y Gravísimas.',
      'En presenciales y telefónicas únicamente.',
      'No existen clasificaciones de faltas en el SENA.',
    ],
    correctIndex: 1,
    explanation:
      'El Reglamento tipifica las conductas en dos grandes grupos: Académicas (afectan el proceso de aprendizaje) y Disciplinarias (afectan la convivencia o bienes), graduándolas en leves, graves o gravísimas.',
    articleReference: 'Capítulo V, Artículos 11 a 14',
  },
  {
    id: 'q-6',
    category: 'Prohibiciones Expresas',
    question:
      '¿Cuál de las siguientes acciones constituye una prohibición taxativa de carácter GRAVÍSIMO dentro del SENA?',
    options: [
      'Preguntar dudas al instructor durante la sesión de clase.',
      'Portar armas, ingresar bajo el efecto o consumir sustancias psicoactivas o bebidas alcohólicas en ambientes de aprendizaje.',
      'Participar en los torneos deportivos de bienestar al aprendiz.',
      'Consultar libros en la biblioteca digital del SENA.',
    ],
    correctIndex: 1,
    explanation:
      'El ingreso o consumo de alcohol, estupefacientes o porte de armas en cualquier sede del SENA es una falta gravísima que vulnera la seguridad y la convivencia.',
    articleReference: 'Capítulo IV, Artículo 10 (Prohibiciones)',
  },
  {
    id: 'q-7',
    category: 'Comité de Seguimiento',
    question: '¿Cuál es la función del Comité de Evaluación y Seguimiento de Centro?',
    options: [
      'Imponer penas de cárcel a los aprendices sin juicio.',
      'Analizar los casos de aprendices con dificultades académicas o disciplinarias, garantizar el debido proceso y recomendar medidas al Subdirector.',
      'Cobrar multas de dinero a los aprendices por llegar tarde.',
      'Vender los uniformes y carnés institucionales.',
    ],
    correctIndex: 1,
    explanation:
      'El Comité de Evaluación y Seguimiento es el órgano colegiado que revisa informes, escucha descargos y aconseja al Subdirector de Centro sobre la aplicación justa de medidas.',
    articleReference: 'Capítulo VI, Artículo 18',
  },
  {
    id: 'q-8',
    category: 'Debido Proceso & Recursos',
    question:
      'Frente a un acto administrativo sancionatorio expedido por el Subdirector de Centro, ¿qué recurso legal le asiste al aprendiz?',
    options: [
      'Ninguno, las decisiones son irrevocables en el mismo momento.',
      'Recurso de Reposición por escrito radicado dentro de los cinco (5) días hábiles siguientes a la notificación.',
      'Huelga de hambre en la portería del centro.',
      'Solicitar traslado inmediato a otra ciudad para anular la sanción.',
    ],
    correctIndex: 1,
    explanation:
      'El debido proceso garantiza el derecho de contradicción mediante el Recurso de Reposición, presentado formalmente dentro de los 5 días hábiles posteriores a la notificación formal.',
    articleReference: 'Capítulo VII, Artículo 25 (Recursos)',
  },
  {
    id: 'q-9',
    category: 'Medidas Formativas',
    question: '¿Qué es un Plan de Mejoramiento en el contexto del SENA?',
    options: [
      'Un castigo físico obligatorio para los aprendices con bajo rendimiento.',
      'Una medida formativa pedagógica concertada entre instructor y aprendiz para superar deficiencias y lograr resultados de aprendizaje pendientes.',
      'Un examen extraordinario con costo económico.',
      'Una solicitud para retirarse del programa definitivamente.',
    ],
    correctIndex: 1,
    explanation:
      'El Plan de Mejoramiento es una oportunidad pedagógica que fija actividades complementarias y plazos claros para que el aprendiz alcance sus competencias antes de una sanción.',
    articleReference: 'Capítulo VII, Artículo 27',
  },
  {
    id: 'q-10',
    category: 'Etapa Práctica',
    question:
      '¿Cuál de las siguientes es una alternativa oficial válida para desarrollar la Etapa Práctica en el SENA?',
    options: [
      'Pagar a un tercero para que firme las planillas sin asistir a la empresa.',
      'Contrato de Aprendizaje, Proyecto Productivo, Pasantía o Vínculo Laboral relacionado con el programa.',
      'Trabajar en cualquier actividad informal que no tenga ninguna relación con el programa de formación.',
      'Quedarse en casa viendo televisión sin reportar al centro.',
    ],
    correctIndex: 1,
    explanation:
      'El SENA contempla diversas alternativas que vinculan al aprendiz con el sector productivo de manera coherente con su perfil técnico y tecnológico.',
    articleReference: 'Capítulo VIII, Artículo 30 (Alternativas de Etapa Práctica)',
  },
];

export const BADGES_LIST: Badge[] = [
  {
    id: 'badge-1',
    name: 'Mística SENA',
    description: 'Completó el Módulo 01 sobre Misión, Símbolos e Identidad Institucional.',
    requirement: 'Finalizar Módulo 1',
    icon: 'Compass',
  },
  {
    id: 'badge-2',
    name: 'Defensor de Derechos',
    description: 'Comprendió los derechos fundamentales y la concertación de planes de mejoramiento.',
    requirement: 'Finalizar Módulo 2',
    icon: 'ShieldCheck',
  },
  {
    id: 'badge-3',
    name: 'Convivencia Ejemplar',
    description: 'Dominó las normas de asistencia, justificaciones en 3 días hábiles y uso de EPP.',
    requirement: 'Finalizar Módulo 3',
    icon: 'Users',
  },
  {
    id: 'badge-4',
    name: 'Maestro del Debido Proceso',
    description: 'Superó los retos de simulación de comités de evaluación y recursos de reposición.',
    requirement: 'Resolver los casos adaptativos',
    icon: 'Scale',
  },
  {
    id: 'badge-5',
    name: 'Aprendiz Certificado',
    description: 'Aprobó la evaluación con más del 80% y desbloqueó el Certificado Oficial de Inducción.',
    requirement: 'Aprobar Evaluación del Reglamento',
    icon: 'Award',
  },
];

export const REGULATION_QUICK_SEARCH = [
  {
    tag: 'Asistencia e Inasistencias',
    article: 'Art. 9 Numeral 2',
    summary: 'Plazo improrrogable de 3 días hábiles para radicar soporte médico o legal ante el instructor/coordinador.',
  },
  {
    tag: 'Planes de Mejoramiento',
    article: 'Art. 7 Numeral 6 & Art. 27',
    summary: 'Derecho a concertar actividades complementarias cuando no se alcanza un resultado de aprendizaje.',
  },
  {
    tag: 'Uso del Carné Institucional',
    article: 'Art. 9 Numeral 5',
    summary: 'Porte visible y obligatorio; es personal e intransferible. Prestarlo acarrea falta disciplinaria grave.',
  },
  {
    tag: 'Plagio y Fraude',
    article: 'Art. 10 Numeral 4',
    summary: 'Prohibición expresa de copia o apropiación no citada de proyectos o código fuente. Sanción académica severa.',
  },
  {
    tag: 'Comité de Evaluación y Seguimiento',
    article: 'Art. 18',
    summary: 'Órgano consultivo colegiado con representación de vocero estudiantil que vela por el debido proceso en quejas.',
  },
  {
    tag: 'Recurso de Reposición',
    article: 'Art. 25',
    summary: 'Mecanismo legal interpuesto dentro de los 5 días hábiles siguientes para controvertir sanciones del Subdirector.',
  },
  {
    tag: 'Alternativas de Etapa Práctica',
    article: 'Art. 30',
    summary: 'Contrato de aprendizaje, Proyecto productivo, Pasantía, Monitoría o Vínculo laboral con seguimiento oficial.',
  },
  {
    tag: 'Sustancias Ilícitas y Armas',
    article: 'Art. 10 Numeral 1 y 2',
    summary: 'Falta gravísima inmediata. Prohibido consumo, porte o comercialización en ambientes presenciales o virtuales.',
  },
];
