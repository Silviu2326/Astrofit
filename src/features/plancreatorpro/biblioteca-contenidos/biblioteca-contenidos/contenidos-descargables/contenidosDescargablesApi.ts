// API para contenidos descargables con datos mockeados completos

export const CATEGORIAS = {
  PDF: 'pdf',
  EBOOK: 'ebook',
  PLANTILLA: 'plantilla',
  GUIA: 'guia',
  INFOGRAFIA: 'infografia',
  WORKBOOK: 'workbook',
  CHECKLIST: 'checklist'
};

export const TIPOS_ARCHIVO = {
  PDF: 'PDF',
  DOCX: 'DOCX',
  XLSX: 'XLSX',
  PPTX: 'PPTX'
};

interface Recurso {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  tipo: string;
  tamano: string;
  descargas: number;
  rating: number;
  numReviews: number;
  autor: string;
  autorBio: string;
  fecha: string;
  numPaginas?: number;
  isPremium: boolean;
  precio?: number;
  thumbnailUrl: string;
  tags: string[];
  previewPages?: number;
  queIncluye: string[];
  paraQuien: string[];
}

// Datos mockeados - 50 recursos descargables
const RECURSOS_MOCK: Recurso[] = [
  // PDFs y eBooks
  {
    id: '1',
    titulo: 'Guía Completa de Nutrición Deportiva',
    descripcion: 'Todo lo que necesitas saber sobre nutrición para maximizar tu rendimiento deportivo',
    categoria: 'guia',
    tipo: 'PDF',
    tamano: '3.2',
    descargas: 1245,
    rating: 4.8,
    numReviews: 156,
    autor: 'Dr. Carlos Méndez',
    autorBio: 'Nutricionista deportivo con 15 años de experiencia',
    fecha: '2024-12-15',
    numPaginas: 85,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
    tags: ['nutrición', 'deportes', 'salud', 'rendimiento'],
    previewPages: 5,
    queIncluye: [
      'Plan de nutrición pre-entrenamiento',
      'Guía de suplementación',
      'Recetas saludables',
      'Tablas de macronutrientes',
      'Consejos de hidratación'
    ],
    paraQuien: [
      'Atletas que buscan mejorar su rendimiento',
      'Entrenadores personales',
      'Nutricionistas deportivos',
      'Personas interesadas en fitness'
    ]
  },
  {
    id: '2',
    titulo: 'eBook: Marketing Digital para Principiantes',
    descripcion: 'Aprende las bases del marketing digital desde cero con ejemplos prácticos',
    categoria: 'ebook',
    tipo: 'PDF',
    tamano: '5.8',
    descargas: 2341,
    rating: 4.9,
    numReviews: 289,
    autor: 'Laura Fernández',
    autorBio: 'Especialista en Marketing Digital y Social Media',
    fecha: '2024-12-10',
    numPaginas: 120,
    isPremium: true,
    precio: 29.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=400&h=300&fit=crop',
    tags: ['marketing', 'digital', 'negocios', 'redes sociales'],
    previewPages: 5,
    queIncluye: [
      '120 páginas de contenido práctico',
      'Casos de estudio reales',
      'Plantillas de estrategia',
      'Checklist de implementación',
      'Recursos adicionales'
    ],
    paraQuien: [
      'Emprendedores que inician su negocio',
      'Pequeñas empresas',
      'Estudiantes de marketing',
      'Profesionales en transición'
    ]
  },
  {
    id: '3',
    titulo: 'Planificación de Menús Semanales',
    descripcion: '12 semanas de menús equilibrados con lista de compras incluida',
    categoria: 'pdf',
    tipo: 'PDF',
    tamano: '2.1',
    descargas: 856,
    rating: 4.6,
    numReviews: 92,
    autor: 'Ana García',
    autorBio: 'Chef especializada en cocina saludable',
    fecha: '2024-12-08',
    numPaginas: 45,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1506368083636-6defb67639a7?w=400&h=300&fit=crop',
    tags: ['menú', 'cocina', 'planificación', 'salud'],
    previewPages: 3,
    queIncluye: [
      '12 semanas de menús diferentes',
      'Listas de compras organizadas',
      'Información nutricional',
      'Tips de preparación',
      'Alternativas vegetarianas'
    ],
    paraQuien: [
      'Familias ocupadas',
      'Personas que quieren comer saludable',
      'Principiantes en la cocina',
      'Quienes buscan ahorrar tiempo'
    ]
  },

  // Plantillas
  {
    id: '4',
    titulo: 'Plantilla de Plan de Entrenamiento',
    descripcion: 'Plantilla Excel para crear y seguir programas de entrenamiento personalizados',
    categoria: 'plantilla',
    tipo: 'XLSX',
    tamano: '0.8',
    descargas: 3421,
    rating: 4.7,
    numReviews: 412,
    autor: 'Miguel Ruiz',
    autorBio: 'Entrenador personal certificado',
    fecha: '2024-12-12',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
    tags: ['entrenamiento', 'fitness', 'excel', 'planificación'],
    queIncluye: [
      'Plantilla Excel editable',
      'Fórmulas automáticas',
      'Seguimiento de progreso',
      'Gráficos de evolución',
      'Instrucciones de uso'
    ],
    paraQuien: [
      'Entrenadores personales',
      'Gimnasios y centros deportivos',
      'Atletas autodidactas',
      'Personas que quieren organizarse'
    ]
  },
  {
    id: '5',
    titulo: 'Plantilla de Calendario Editorial',
    descripcion: 'Organiza tu contenido en redes sociales con esta plantilla completa',
    categoria: 'plantilla',
    tipo: 'XLSX',
    tamano: '1.2',
    descargas: 1876,
    rating: 4.8,
    numReviews: 203,
    autor: 'Sofía Martínez',
    autorBio: 'Community Manager y creadora de contenido',
    fecha: '2024-12-05',
    isPremium: true,
    precio: 19.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    tags: ['contenido', 'redes sociales', 'planificación', 'marketing'],
    queIncluye: [
      'Calendario anual editable',
      'Plantillas de posts',
      'Tracking de métricas',
      'Paleta de colores',
      'Guía de uso'
    ],
    paraQuien: [
      'Community Managers',
      'Emprendedores digitales',
      'Agencias de marketing',
      'Creadores de contenido'
    ]
  },
  {
    id: '6',
    titulo: 'Plantilla de Presupuesto Personal',
    descripcion: 'Controla tus finanzas personales con esta plantilla fácil de usar',
    categoria: 'plantilla',
    tipo: 'XLSX',
    tamano: '0.5',
    descargas: 4512,
    rating: 4.9,
    numReviews: 531,
    autor: 'Roberto Sánchez',
    autorBio: 'Asesor financiero personal',
    fecha: '2024-12-01',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    tags: ['finanzas', 'presupuesto', 'ahorro', 'excel'],
    queIncluye: [
      'Plantilla Excel automática',
      'Categorías predefinidas',
      'Gráficos de gastos',
      'Metas de ahorro',
      'Dashboard visual'
    ],
    paraQuien: [
      'Personas que quieren ahorrar',
      'Familias organizadas',
      'Jóvenes independizándose',
      'Quienes buscan control financiero'
    ]
  },

  // Guías y Manuales
  {
    id: '7',
    titulo: 'Manual de Ejercicios con Bandas Elásticas',
    descripcion: 'Más de 50 ejercicios ilustrados para entrenar en casa',
    categoria: 'guia',
    tipo: 'PDF',
    tamano: '6.3',
    descargas: 1632,
    rating: 4.7,
    numReviews: 187,
    autor: 'Patricia López',
    autorBio: 'Fisioterapeuta y entrenadora fitness',
    fecha: '2024-11-28',
    numPaginas: 95,
    isPremium: true,
    precio: 24.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    tags: ['ejercicio', 'bandas', 'home gym', 'fitness'],
    previewPages: 5,
    queIncluye: [
      '50+ ejercicios ilustrados',
      'Rutinas por nivel',
      'Videos complementarios (links)',
      'Plan de 8 semanas',
      'Consejos de seguridad'
    ],
    paraQuien: [
      'Personas que entrenan en casa',
      'Viajeros frecuentes',
      'Principiantes en fitness',
      'Quienes buscan variedad'
    ]
  },
  {
    id: '8',
    titulo: 'Guía de Suplementación Deportiva',
    descripcion: 'Aprende qué suplementos tomar, cuándo y en qué dosis',
    categoria: 'guia',
    tipo: 'PDF',
    tamano: '4.1',
    descargas: 2145,
    rating: 4.6,
    numReviews: 276,
    autor: 'Dr. Juan Ramírez',
    autorBio: 'Médico especialista en medicina deportiva',
    fecha: '2024-11-25',
    numPaginas: 68,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=300&fit=crop',
    tags: ['suplementos', 'nutrición', 'deportes', 'salud'],
    previewPages: 5,
    queIncluye: [
      'Análisis de 30+ suplementos',
      'Protocolos de uso',
      'Evidencia científica',
      'Efectos secundarios',
      'Recomendaciones por deporte'
    ],
    paraQuien: [
      'Atletas de competición',
      'Entrenadores',
      'Personas activas',
      'Profesionales de la salud'
    ]
  },

  // Infografías
  {
    id: '9',
    titulo: 'Infografía: Macronutrientes Esenciales',
    descripcion: 'Visualización clara de proteínas, carbohidratos y grasas',
    categoria: 'infografia',
    tipo: 'PDF',
    tamano: '1.5',
    descargas: 3876,
    rating: 4.8,
    numReviews: 421,
    autor: 'Elena Torres',
    autorBio: 'Diseñadora gráfica especializada en salud',
    fecha: '2024-11-20',
    numPaginas: 2,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop',
    tags: ['infografía', 'nutrición', 'macros', 'visual'],
    previewPages: 2,
    queIncluye: [
      'Infografía a color de alta resolución',
      'Versión imprimible',
      'Datos respaldados científicamente',
      'Ejemplos de alimentos',
      'Proporciones recomendadas'
    ],
    paraQuien: [
      'Estudiantes de nutrición',
      'Coaches de salud',
      'Gimnasios y centros deportivos',
      'Personas aprendiendo nutrición'
    ]
  },
  {
    id: '10',
    titulo: 'Infografía: Ejercicios por Grupo Muscular',
    descripcion: 'Mapa visual de ejercicios organizados por músculo objetivo',
    categoria: 'infografia',
    tipo: 'PDF',
    tamano: '2.3',
    descargas: 2987,
    rating: 4.7,
    numReviews: 312,
    autor: 'David Morales',
    autorBio: 'Entrenador y diseñador de programas',
    fecha: '2024-11-18',
    numPaginas: 3,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=300&fit=crop',
    tags: ['ejercicio', 'músculos', 'infografía', 'entrenamiento'],
    previewPages: 3,
    queIncluye: [
      '3 infografías detalladas',
      'Ilustraciones anatómicas',
      'Más de 40 ejercicios',
      'Versión para imprimir',
      'Códigos QR a videos'
    ],
    paraQuien: [
      'Entrenadores personales',
      'Estudiantes de educación física',
      'Gimnasios',
      'Atletas en formación'
    ]
  },

  // Workbooks
  {
    id: '11',
    titulo: 'Workbook: 30 Días de Hábitos Saludables',
    descripcion: 'Cuaderno de trabajo interactivo para transformar tu estilo de vida',
    categoria: 'workbook',
    tipo: 'PDF',
    tamano: '7.2',
    descargas: 1543,
    rating: 4.9,
    numReviews: 198,
    autor: 'María Gonzalez',
    autorBio: 'Coach de bienestar y cambio de hábitos',
    fecha: '2024-11-15',
    numPaginas: 35,
    isPremium: true,
    precio: 34.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    tags: ['hábitos', 'bienestar', 'workbook', 'transformación'],
    previewPages: 5,
    queIncluye: [
      'Workbook de 35 páginas',
      'Ejercicios diarios',
      'Seguimiento de progreso',
      'Reflexiones guiadas',
      'Herramientas de motivación'
    ],
    paraQuien: [
      'Personas que quieren cambiar hábitos',
      'Coaches de vida',
      'Grupos de apoyo',
      'Quienes buscan transformación'
    ]
  },
  {
    id: '12',
    titulo: 'Workbook: Plan de Negocios en 7 Pasos',
    descripcion: 'Completa tu plan de negocios con este workbook paso a paso',
    categoria: 'workbook',
    tipo: 'PDF',
    tamano: '4.8',
    descargas: 2234,
    rating: 4.8,
    numReviews: 267,
    autor: 'Ricardo Vega',
    autorBio: 'Consultor de negocios y emprendimiento',
    fecha: '2024-11-10',
    numPaginas: 52,
    isPremium: true,
    precio: 49.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    tags: ['negocios', 'emprendimiento', 'plan', 'workbook'],
    previewPages: 5,
    queIncluye: [
      'Workbook completo de 52 páginas',
      'Templates rellenables',
      'Ejemplos reales',
      'Checklist de validación',
      'Recursos adicionales'
    ],
    paraQuien: [
      'Emprendedores',
      'Startups en fase inicial',
      'Consultores de negocios',
      'Estudiantes de administración'
    ]
  },

  // Checklists
  {
    id: '13',
    titulo: 'Checklist: Preparación para Competencia',
    descripcion: 'Lista completa de todo lo que necesitas antes de competir',
    categoria: 'checklist',
    tipo: 'PDF',
    tamano: '0.6',
    descargas: 1876,
    rating: 4.7,
    numReviews: 154,
    autor: 'Fernando Castro',
    autorBio: 'Atleta profesional y coach deportivo',
    fecha: '2024-11-08',
    numPaginas: 8,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
    tags: ['competencia', 'checklist', 'preparación', 'deportes'],
    previewPages: 3,
    queIncluye: [
      'Checklist imprimible',
      'Timeline de preparación',
      'Lista de equipamiento',
      'Nutrición pre-competencia',
      'Aspectos mentales'
    ],
    paraQuien: [
      'Atletas competidores',
      'Entrenadores',
      'Organizadores de eventos',
      'Equipos deportivos'
    ]
  },
  {
    id: '14',
    titulo: 'Checklist: Lanzamiento de Producto Digital',
    descripcion: 'No olvides ningún detalle en el lanzamiento de tu producto',
    categoria: 'checklist',
    tipo: 'PDF',
    tamano: '0.9',
    descargas: 3421,
    rating: 4.9,
    numReviews: 387,
    autor: 'Valeria Ruiz',
    autorBio: 'Product Manager y experta en lanzamientos',
    fecha: '2024-11-05',
    numPaginas: 12,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    tags: ['lanzamiento', 'producto', 'checklist', 'marketing'],
    previewPages: 3,
    queIncluye: [
      'Checklist completa de lanzamiento',
      'Timeline sugerido',
      'Tareas por equipo',
      'KPIs a monitorear',
      'Plan de contingencia'
    ],
    paraQuien: [
      'Product Managers',
      'Emprendedores digitales',
      'Equipos de marketing',
      'Startups'
    ]
  },

  // Más PDFs
  {
    id: '15',
    titulo: 'Recetario: 50 Smoothies Proteicos',
    descripcion: 'Deliciosas recetas de smoothies para antes y después del entrenamiento',
    categoria: 'pdf',
    tipo: 'PDF',
    tamano: '8.4',
    descargas: 2765,
    rating: 4.8,
    numReviews: 334,
    autor: 'Claudia Romero',
    autorBio: 'Nutricionista y chef de cocina saludable',
    fecha: '2024-11-01',
    numPaginas: 62,
    isPremium: true,
    precio: 19.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
    tags: ['recetas', 'smoothies', 'proteína', 'nutrición'],
    previewPages: 5,
    queIncluye: [
      '50 recetas únicas',
      'Fotos a color de cada smoothie',
      'Información nutricional',
      'Tips de preparación',
      'Variaciones veganas'
    ],
    paraQuien: [
      'Atletas y deportistas',
      'Personas activas',
      'Veganos y vegetarianos',
      'Amantes de los smoothies'
    ]
  },
  {
    id: '16',
    titulo: 'Guía SEO para Principiantes 2024',
    descripcion: 'Aprende a posicionar tu sitio web en Google paso a paso',
    categoria: 'guia',
    tipo: 'PDF',
    tamano: '5.6',
    descargas: 4321,
    rating: 4.9,
    numReviews: 512,
    autor: 'Javier Moreno',
    autorBio: 'Especialista SEO con 10 años de experiencia',
    fecha: '2024-10-28',
    numPaginas: 98,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=400&h=300&fit=crop',
    tags: ['SEO', 'marketing', 'web', 'google'],
    previewPages: 5,
    queIncluye: [
      'Fundamentos de SEO',
      'Estrategias actualizadas 2024',
      'Herramientas recomendadas',
      'Casos de estudio',
      'Checklist de optimización'
    ],
    paraQuien: [
      'Dueños de negocios online',
      'Bloggers',
      'Marketers digitales',
      'Desarrolladores web'
    ]
  },
  {
    id: '17',
    titulo: 'Plantilla de Tracker de Hábitos',
    descripcion: 'Hoja de cálculo para seguir tus hábitos diarios y mensuales',
    categoria: 'plantilla',
    tipo: 'XLSX',
    tamano: '0.7',
    descargas: 5432,
    rating: 4.7,
    numReviews: 623,
    autor: 'Andrea Silva',
    autorBio: 'Coach de productividad y hábitos',
    fecha: '2024-10-25',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    tags: ['hábitos', 'tracker', 'productividad', 'excel'],
    queIncluye: [
      'Tracker diario y mensual',
      'Gráficos automáticos',
      'Análisis de consistencia',
      'Múltiples categorías',
      'Plantilla personalizable'
    ],
    paraQuien: [
      'Personas trabajando en hábitos',
      'Coaches de vida',
      'Estudiantes',
      'Profesionales organizados'
    ]
  },
  {
    id: '18',
    titulo: 'Infografía: Pirámide de Entrenamiento',
    descripcion: 'Jerarquía visual de prioridades en el entrenamiento deportivo',
    categoria: 'infografia',
    tipo: 'PDF',
    tamano: '1.8',
    descargas: 2134,
    rating: 4.6,
    numReviews: 201,
    autor: 'Pablo Jiménez',
    autorBio: 'Preparador físico y educador deportivo',
    fecha: '2024-10-20',
    numPaginas: 2,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=300&fit=crop',
    tags: ['entrenamiento', 'infografía', 'prioridades', 'fitness'],
    previewPages: 2,
    queIncluye: [
      'Infografía detallada',
      'Explicación de cada nivel',
      'Ejemplos prácticos',
      'Versión imprimible',
      'Formato para redes sociales'
    ],
    paraQuien: [
      'Entrenadores personales',
      'Atletas',
      'Gimnasios',
      'Estudiantes de deporte'
    ]
  },
  {
    id: '19',
    titulo: 'Workbook: Planificación Financiera Personal',
    descripcion: 'Ejercicios prácticos para tomar control de tus finanzas',
    categoria: 'workbook',
    tipo: 'PDF',
    tamano: '6.1',
    descargas: 1987,
    rating: 4.8,
    numReviews: 234,
    autor: 'Luis Hernández',
    autorBio: 'Asesor financiero certificado',
    fecha: '2024-10-15',
    numPaginas: 48,
    isPremium: true,
    precio: 39.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop',
    tags: ['finanzas', 'workbook', 'planificación', 'dinero'],
    previewPages: 5,
    queIncluye: [
      'Ejercicios de autoevaluación',
      'Plantillas de presupuesto',
      'Metas financieras',
      'Plan de ahorro',
      'Estrategias de inversión'
    ],
    paraQuien: [
      'Personas que quieren ordenar finanzas',
      'Jóvenes profesionales',
      'Familias',
      'Emprendedores'
    ]
  },
  {
    id: '20',
    titulo: 'Checklist: Rutina Matutina Productiva',
    descripcion: 'Optimiza tus mañanas con esta rutina científicamente probada',
    categoria: 'checklist',
    tipo: 'PDF',
    tamano: '0.5',
    descargas: 6543,
    rating: 4.9,
    numReviews: 721,
    autor: 'Gabriela Ramos',
    autorBio: 'Coach de productividad y bienestar',
    fecha: '2024-10-10',
    numPaginas: 6,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    tags: ['rutina', 'mañana', 'productividad', 'hábitos'],
    previewPages: 3,
    queIncluye: [
      'Checklist paso a paso',
      'Tiempos sugeridos',
      'Variaciones por estilo de vida',
      'Tracker de 30 días',
      'Consejos científicos'
    ],
    paraQuien: [
      'Profesionales ocupados',
      'Personas que quieren mejorar',
      'Estudiantes',
      'Emprendedores'
    ]
  },

  // Más recursos variados
  {
    id: '21',
    titulo: 'Guía de Meditación para Deportistas',
    descripcion: 'Técnicas de mindfulness para mejorar el rendimiento mental',
    categoria: 'guia',
    tipo: 'PDF',
    tamano: '3.7',
    descargas: 1432,
    rating: 4.7,
    numReviews: 167,
    autor: 'Teresa Navarro',
    autorBio: 'Psicóloga deportiva y coach mental',
    fecha: '2024-10-05',
    numPaginas: 56,
    isPremium: true,
    precio: 27.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=300&fit=crop',
    tags: ['meditación', 'mindfulness', 'mental', 'deportes'],
    previewPages: 5,
    queIncluye: [
      '15 técnicas de meditación',
      'Audio guías (links)',
      'Plan de 8 semanas',
      'Diario de práctica',
      'Casos de atletas exitosos'
    ],
    paraQuien: [
      'Atletas de alto rendimiento',
      'Competidores nerviosos',
      'Entrenadores mentales',
      'Equipos deportivos'
    ]
  },
  {
    id: '22',
    titulo: 'Plantilla de Plan de Contenidos',
    descripcion: 'Organiza tu estrategia de contenido para todo el año',
    categoria: 'plantilla',
    tipo: 'XLSX',
    tamano: '1.4',
    descargas: 3654,
    rating: 4.8,
    numReviews: 421,
    autor: 'Daniela Cruz',
    autorBio: 'Estratega de contenidos digitales',
    fecha: '2024-09-30',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    tags: ['contenido', 'planificación', 'marketing', 'excel'],
    queIncluye: [
      'Plantilla anual completa',
      'Ideas de contenido por mes',
      'Tracking de performance',
      'Calendario editorial',
      'Dashboard de métricas'
    ],
    paraQuien: [
      'Creadores de contenido',
      'Marketers',
      'Agencias digitales',
      'Emprendedores online'
    ]
  },
  {
    id: '23',
    titulo: 'eBook: Psicología del Éxito Deportivo',
    descripcion: 'Descubre los secretos mentales de los atletas de élite',
    categoria: 'ebook',
    tipo: 'PDF',
    tamano: '7.9',
    descargas: 2876,
    rating: 4.9,
    numReviews: 341,
    autor: 'Dr. Martín Sosa',
    autorBio: 'Psicólogo deportivo con 20 años de experiencia',
    fecha: '2024-09-25',
    numPaginas: 142,
    isPremium: true,
    precio: 44.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=300&fit=crop',
    tags: ['psicología', 'éxito', 'deportes', 'mente'],
    previewPages: 5,
    queIncluye: [
      '142 páginas de contenido',
      'Entrevistas a atletas',
      'Ejercicios prácticos',
      'Casos de estudio',
      'Técnicas aplicables'
    ],
    paraQuien: [
      'Atletas competitivos',
      'Psicólogos deportivos',
      'Entrenadores',
      'Equipos profesionales'
    ]
  },
  {
    id: '24',
    titulo: 'Infografía: Tipos de Proteína',
    descripcion: 'Comparativa visual de diferentes fuentes de proteína',
    categoria: 'infografia',
    tipo: 'PDF',
    tamano: '2.1',
    descargas: 4321,
    rating: 4.7,
    numReviews: 487,
    autor: 'Mónica Delgado',
    autorBio: 'Nutricionista clínica',
    fecha: '2024-09-20',
    numPaginas: 3,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&h=300&fit=crop',
    tags: ['proteína', 'nutrición', 'infografía', 'comparativa'],
    previewPages: 3,
    queIncluye: [
      'Comparativa de 20+ fuentes',
      'Valores nutricionales',
      'Biodisponibilidad',
      'Recomendaciones de uso',
      'Versión imprimible'
    ],
    paraQuien: [
      'Nutricionistas',
      'Atletas',
      'Personas activas',
      'Estudiantes de nutrición'
    ]
  },
  {
    id: '25',
    titulo: 'Workbook: Establecimiento de Metas SMART',
    descripcion: 'Define y alcanza tus metas con esta metodología probada',
    categoria: 'workbook',
    tipo: 'PDF',
    tamano: '4.3',
    descargas: 3210,
    rating: 4.8,
    numReviews: 376,
    autor: 'Sandra Blanco',
    autorBio: 'Coach ejecutiva y de desarrollo personal',
    fecha: '2024-09-15',
    numPaginas: 38,
    isPremium: true,
    precio: 29.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    tags: ['metas', 'SMART', 'workbook', 'objetivos'],
    previewPages: 5,
    queIncluye: [
      'Framework SMART completo',
      'Ejercicios guiados',
      'Templates de metas',
      'Plan de acción',
      'Seguimiento trimestral'
    ],
    paraQuien: [
      'Profesionales ambiciosos',
      'Emprendedores',
      'Equipos de trabajo',
      'Coaches'
    ]
  },

  // Continuamos con más variedad...
  {
    id: '26',
    titulo: 'Checklist: Setup de Home Gym',
    descripcion: 'Todo lo que necesitas para montar tu gimnasio en casa',
    categoria: 'checklist',
    tipo: 'PDF',
    tamano: '0.8',
    descargas: 2987,
    rating: 4.6,
    numReviews: 298,
    autor: 'Rodrigo Paz',
    autorBio: 'Entrenador especializado en home training',
    fecha: '2024-09-10',
    numPaginas: 10,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    tags: ['home gym', 'equipamiento', 'checklist', 'fitness'],
    previewPages: 3,
    queIncluye: [
      'Lista completa de equipamiento',
      'Presupuesto por niveles',
      'Recomendaciones de marcas',
      'Layout de espacio',
      'Links de compra'
    ],
    paraQuien: [
      'Personas que entrenan en casa',
      'Nuevos en fitness',
      'Quienes buscan privacidad',
      'Viajeros frecuentes'
    ]
  },
  {
    id: '27',
    titulo: 'Guía de Meal Prep para Deportistas',
    descripcion: 'Prepara tus comidas de la semana en solo 2 horas',
    categoria: 'guia',
    tipo: 'PDF',
    tamano: '9.2',
    descargas: 2543,
    rating: 4.9,
    numReviews: 312,
    autor: 'Carla Medina',
    autorBio: 'Chef y nutricionista deportiva',
    fecha: '2024-09-05',
    numPaginas: 78,
    isPremium: true,
    precio: 32.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
    tags: ['meal prep', 'cocina', 'nutrición', 'deportes'],
    previewPages: 5,
    queIncluye: [
      '12 menús semanales',
      'Listas de compras',
      'Paso a paso fotográfico',
      'Tips de conservación',
      'Recetas batch cooking'
    ],
    paraQuien: [
      'Atletas ocupados',
      'Personas que ahorran tiempo',
      'Familias activas',
      'Meal preppers principiantes'
    ]
  },
  {
    id: '28',
    titulo: 'Plantilla de Gestión de Proyectos',
    descripcion: 'Administra tus proyectos con esta plantilla Gantt en Excel',
    categoria: 'plantilla',
    tipo: 'XLSX',
    tamano: '1.9',
    descargas: 4765,
    rating: 4.7,
    numReviews: 543,
    autor: 'Alberto Vargas',
    autorBio: 'Project Manager certificado PMP',
    fecha: '2024-08-30',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    tags: ['proyectos', 'gestión', 'gantt', 'excel'],
    queIncluye: [
      'Diagrama Gantt automático',
      'Tracking de tareas',
      'Dashboard ejecutivo',
      'Alertas de vencimiento',
      'Plantilla personalizable'
    ],
    paraQuien: [
      'Project Managers',
      'Equipos de trabajo',
      'Freelancers',
      'Emprendedores'
    ]
  },
  {
    id: '29',
    titulo: 'Infografía: Anatomía del Ejercicio',
    descripcion: 'Visualiza qué músculos trabaja cada ejercicio popular',
    categoria: 'infografia',
    tipo: 'PDF',
    tamano: '3.4',
    descargas: 3876,
    rating: 4.8,
    numReviews: 421,
    autor: 'Dr. Felipe Ortiz',
    autorBio: 'Médico deportivo y anatomista',
    fecha: '2024-08-25',
    numPaginas: 5,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&h=300&fit=crop',
    tags: ['anatomía', 'ejercicio', 'músculos', 'infografía'],
    previewPages: 5,
    queIncluye: [
      '5 infografías detalladas',
      '30+ ejercicios analizados',
      'Ilustraciones médicas',
      'Explicaciones técnicas',
      'Versión para imprimir'
    ],
    paraQuien: [
      'Estudiantes de fisioterapia',
      'Entrenadores',
      'Atletas curiosos',
      'Profesionales de la salud'
    ]
  },
  {
    id: '30',
    titulo: 'Workbook: Estrategia de Redes Sociales',
    descripcion: 'Crea tu estrategia completa de social media en 7 días',
    categoria: 'workbook',
    tipo: 'PDF',
    tamano: '5.7',
    descargas: 2109,
    rating: 4.7,
    numReviews: 254,
    autor: 'Natalia Rivas',
    autorBio: 'Estratega de redes sociales',
    fecha: '2024-08-20',
    numPaginas: 44,
    isPremium: true,
    precio: 36.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    tags: ['redes sociales', 'estrategia', 'marketing', 'workbook'],
    previewPages: 5,
    queIncluye: [
      'Plan de 7 días',
      'Templates de estrategia',
      'Análisis de competencia',
      'Calendario de contenido',
      'Métricas clave'
    ],
    paraQuien: [
      'Emprendedores digitales',
      'Community Managers',
      'Marcas personales',
      'Pequeños negocios'
    ]
  },

  // Últimos 20 recursos para completar 50
  {
    id: '31',
    titulo: 'Recetario Vegano para Atletas',
    descripcion: '40 recetas plant-based altas en proteína',
    categoria: 'pdf',
    tipo: 'PDF',
    tamano: '6.8',
    descargas: 1876,
    rating: 4.8,
    numReviews: 203,
    autor: 'Lucía Verde',
    autorBio: 'Chef vegana y nutricionista',
    fecha: '2024-08-15',
    numPaginas: 58,
    isPremium: true,
    precio: 24.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    tags: ['vegano', 'recetas', 'proteína', 'plant-based'],
    previewPages: 5,
    queIncluye: [
      '40 recetas veganas',
      'Información nutricional completa',
      'Fotos de alta calidad',
      'Tips de sustituciones',
      'Lista de compras veganas'
    ],
    paraQuien: [
      'Atletas veganos',
      'Personas en transición vegana',
      'Curiosos del plant-based',
      'Quienes buscan variedad'
    ]
  },
  {
    id: '32',
    titulo: 'Checklist: Preparación de Maratón',
    descripcion: 'Todo lo que necesitas cubrir para tu primer maratón',
    categoria: 'checklist',
    tipo: 'PDF',
    tamano: '0.7',
    descargas: 2234,
    rating: 4.9,
    numReviews: 267,
    autor: 'Carlos Runner',
    autorBio: 'Corredor de maratones y entrenador',
    fecha: '2024-08-10',
    numPaginas: 9,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=400&h=300&fit=crop',
    tags: ['maratón', 'running', 'checklist', 'preparación'],
    previewPages: 3,
    queIncluye: [
      'Checklist de 16 semanas',
      'Equipamiento necesario',
      'Nutrición específica',
      'Descanso y recuperación',
      'Día de la carrera'
    ],
    paraQuien: [
      'Corredores principiantes',
      'Quienes buscan su primer 42K',
      'Entrenadores de running',
      'Clubes de atletismo'
    ]
  },
  {
    id: '33',
    titulo: 'Guía de Estiramientos Dinámicos',
    descripcion: 'Prepara tu cuerpo antes del ejercicio con estos estiramientos',
    categoria: 'guia',
    tipo: 'PDF',
    tamano: '4.5',
    descargas: 3210,
    rating: 4.7,
    numReviews: 354,
    autor: 'Beatriz Flexible',
    autorBio: 'Instructora de yoga y movilidad',
    fecha: '2024-08-05',
    numPaginas: 52,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    tags: ['estiramientos', 'movilidad', 'calentamiento', 'flexibilidad'],
    previewPages: 5,
    queIncluye: [
      '30+ estiramientos ilustrados',
      'Rutinas por deporte',
      'Secuencias de 5-15 min',
      'Errores comunes',
      'Videos complementarios (links)'
    ],
    paraQuien: [
      'Atletas de todos los niveles',
      'Personas con rigidez',
      'Entrenadores',
      'Fisioterapeutas'
    ]
  },
  {
    id: '34',
    titulo: 'Plantilla de Dashboard Financiero',
    descripcion: 'Visualiza la salud financiera de tu negocio en tiempo real',
    categoria: 'plantilla',
    tipo: 'XLSX',
    tamano: '2.3',
    descargas: 1987,
    rating: 4.8,
    numReviews: 221,
    autor: 'Ernesto Finanzas',
    autorBio: 'Contador público y consultor financiero',
    fecha: '2024-07-30',
    isPremium: true,
    precio: 44.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    tags: ['finanzas', 'dashboard', 'negocios', 'excel'],
    queIncluye: [
      'Dashboard interactivo',
      'Gráficos automáticos',
      'KPIs financieros',
      'Proyecciones',
      'Análisis de rentabilidad'
    ],
    paraQuien: [
      'Emprendedores',
      'Pequeños negocios',
      'Freelancers',
      'Contadores'
    ]
  },
  {
    id: '35',
    titulo: 'Infografía: Hidratación Deportiva',
    descripcion: 'Cuándo, cuánto y qué beber antes, durante y después',
    categoria: 'infografia',
    tipo: 'PDF',
    tamano: '1.9',
    descargas: 4123,
    rating: 4.9,
    numReviews: 478,
    autor: 'Dra. Agua Vital',
    autorBio: 'Especialista en medicina deportiva',
    fecha: '2024-07-25',
    numPaginas: 2,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1550572017-4fa21e2b87a7?w=400&h=300&fit=crop',
    tags: ['hidratación', 'deportes', 'agua', 'rendimiento'],
    previewPages: 2,
    queIncluye: [
      'Infografía colorida',
      'Protocolos de hidratación',
      'Señales de deshidratación',
      'Opciones de bebidas',
      'Versión imprimible'
    ],
    paraQuien: [
      'Atletas de resistencia',
      'Entrenadores',
      'Organizadores de eventos',
      'Personas activas'
    ]
  },
  {
    id: '36',
    titulo: 'Workbook: Marca Personal en LinkedIn',
    descripcion: 'Construye tu presencia profesional en 30 días',
    categoria: 'workbook',
    tipo: 'PDF',
    tamano: '5.2',
    descargas: 2765,
    rating: 4.7,
    numReviews: 298,
    autor: 'Mauricio Network',
    autorBio: 'Experto en LinkedIn y marca personal',
    fecha: '2024-07-20',
    numPaginas: 41,
    isPremium: true,
    precio: 31.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=400&h=300&fit=crop',
    tags: ['LinkedIn', 'marca personal', 'networking', 'workbook'],
    previewPages: 5,
    queIncluye: [
      'Plan de 30 días',
      'Templates de posts',
      'Estrategia de contenido',
      'Optimización de perfil',
      'Networking efectivo'
    ],
    paraQuien: [
      'Profesionales en búsqueda',
      'Emprendedores',
      'Freelancers',
      'Ejecutivos'
    ]
  },
  {
    id: '37',
    titulo: 'Checklist: Apertura de Negocio Online',
    descripcion: 'Todos los pasos legales y técnicos para abrir tu tienda online',
    categoria: 'checklist',
    tipo: 'PDF',
    tamano: '1.1',
    descargas: 3421,
    rating: 4.8,
    numReviews: 387,
    autor: 'Diana Ecommerce',
    autorBio: 'Consultora de comercio electrónico',
    fecha: '2024-07-15',
    numPaginas: 14,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    tags: ['ecommerce', 'negocio online', 'checklist', 'emprendimiento'],
    previewPages: 3,
    queIncluye: [
      'Checklist completa paso a paso',
      'Requisitos legales',
      'Setup técnico',
      'Proveedores recomendados',
      'Timeline estimado'
    ],
    paraQuien: [
      'Emprendedores digitales',
      'Negocios tradicionales digitalizando',
      'Dropshippers',
      'Consultores de negocios'
    ]
  },
  {
    id: '38',
    titulo: 'Guía de Fotografía de Alimentos',
    descripcion: 'Toma fotos profesionales de tus platos con tu smartphone',
    categoria: 'guia',
    tipo: 'PDF',
    tamano: '7.4',
    descargas: 1654,
    rating: 4.6,
    numReviews: 178,
    autor: 'Francisco Lente',
    autorBio: 'Fotógrafo gastronómico',
    fecha: '2024-07-10',
    numPaginas: 64,
    isPremium: true,
    precio: 26.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    tags: ['fotografía', 'comida', 'smartphone', 'food styling'],
    previewPages: 5,
    queIncluye: [
      'Técnicas de iluminación',
      'Composición y encuadre',
      'Apps de edición',
      'Food styling básico',
      'Ejemplos antes/después'
    ],
    paraQuien: [
      'Bloggers de comida',
      'Chefs',
      'Restaurantes',
      'Influencers gastronómicos'
    ]
  },
  {
    id: '39',
    titulo: 'Plantilla de Análisis FODA',
    descripcion: 'Analiza fortalezas, oportunidades, debilidades y amenazas',
    categoria: 'plantilla',
    tipo: 'PPTX',
    tamano: '1.6',
    descargas: 5234,
    rating: 4.7,
    numReviews: 589,
    autor: 'Estratega Pro',
    autorBio: 'Consultor estratégico de negocios',
    fecha: '2024-07-05',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    tags: ['FODA', 'estrategia', 'análisis', 'negocios'],
    queIncluye: [
      'Plantilla PowerPoint editable',
      'Diseño profesional',
      'Ejemplos completados',
      'Guía de uso',
      'Múltiples variantes visuales'
    ],
    paraQuien: [
      'Empresas en planificación',
      'Consultores',
      'Emprendedores',
      'Equipos directivos'
    ]
  },
  {
    id: '40',
    titulo: 'Infografía: Superfoods y sus Beneficios',
    descripcion: 'Conoce los 20 superalimentos más poderosos',
    categoria: 'infografia',
    tipo: 'PDF',
    tamano: '2.7',
    descargas: 3987,
    rating: 4.8,
    numReviews: 434,
    autor: 'Nutricionista Súper',
    autorBio: 'Especialista en nutrición funcional',
    fecha: '2024-06-30',
    numPaginas: 4,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=300&fit=crop',
    tags: ['superfoods', 'nutrición', 'salud', 'infografía'],
    previewPages: 4,
    queIncluye: [
      'Infografía de 4 páginas',
      '20 superalimentos analizados',
      'Beneficios respaldados',
      'Cómo incorporarlos',
      'Versión para redes'
    ],
    paraQuien: [
      'Amantes de la alimentación saludable',
      'Nutricionistas',
      'Health coaches',
      'Tiendas de alimentos naturales'
    ]
  },
  {
    id: '41',
    titulo: 'Workbook: Gestión del Tiempo',
    descripcion: 'Domina tu tiempo y multiplica tu productividad',
    categoria: 'workbook',
    tipo: 'PDF',
    tamano: '4.9',
    descargas: 2876,
    rating: 4.9,
    numReviews: 321,
    autor: 'Maestro del Tiempo',
    autorBio: 'Coach de productividad certificado',
    fecha: '2024-06-25',
    numPaginas: 46,
    isPremium: true,
    precio: 33.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=300&fit=crop',
    tags: ['tiempo', 'productividad', 'gestión', 'workbook'],
    previewPages: 5,
    queIncluye: [
      'Análisis de uso del tiempo',
      'Técnicas probadas (Pomodoro, etc)',
      'Plantillas de planificación',
      'Eliminación de ladrones de tiempo',
      'Hábitos de productividad'
    ],
    paraQuien: [
      'Profesionales ocupados',
      'Emprendedores',
      'Estudiantes',
      'Quienes se sienten abrumados'
    ]
  },
  {
    id: '42',
    titulo: 'Checklist: Setup de Podcast',
    descripcion: 'Todo lo que necesitas para lanzar tu podcast exitoso',
    categoria: 'checklist',
    tipo: 'PDF',
    tamano: '0.9',
    descargas: 1543,
    rating: 4.7,
    numReviews: 167,
    autor: 'Voz Podcast',
    autorBio: 'Productor de podcasts con 5 años de experiencia',
    fecha: '2024-06-20',
    numPaginas: 11,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop',
    tags: ['podcast', 'audio', 'checklist', 'contenido'],
    previewPages: 3,
    queIncluye: [
      'Checklist de equipamiento',
      'Software recomendado',
      'Plataformas de distribución',
      'Setup técnico',
      'Promoción y crecimiento'
    ],
    paraQuien: [
      'Aspirantes a podcasters',
      'Creadores de contenido',
      'Marcas personales',
      'Comunicadores'
    ]
  },
  {
    id: '43',
    titulo: 'Guía de Email Marketing Efectivo',
    descripcion: 'Escribe emails que convierten y generan ventas',
    categoria: 'guia',
    tipo: 'PDF',
    tamano: '5.3',
    descargas: 3654,
    rating: 4.8,
    numReviews: 412,
    autor: 'Email Master',
    autorBio: 'Especialista en email marketing y copywriting',
    fecha: '2024-06-15',
    numPaginas: 72,
    isPremium: true,
    precio: 38.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop',
    tags: ['email', 'marketing', 'copywriting', 'ventas'],
    previewPages: 5,
    queIncluye: [
      'Fórmulas de copywriting',
      'Líneas de asunto ganadoras',
      'Secuencias automatizadas',
      'A/B testing',
      'Casos de estudio'
    ],
    paraQuien: [
      'Marketers digitales',
      'Emprendedores online',
      'Dueños de ecommerce',
      'Coaches y consultores'
    ]
  },
  {
    id: '44',
    titulo: 'Plantilla de Reporte Mensual',
    descripcion: 'Presenta resultados profesionales a tu equipo o clientes',
    categoria: 'plantilla',
    tipo: 'PPTX',
    tamano: '2.1',
    descargas: 2109,
    rating: 4.6,
    numReviews: 234,
    autor: 'Presentador Pro',
    autorBio: 'Diseñador de presentaciones ejecutivas',
    fecha: '2024-06-10',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop',
    tags: ['reporte', 'presentación', 'PowerPoint', 'negocios'],
    queIncluye: [
      'Plantilla PowerPoint moderna',
      'Múltiples layouts',
      'Gráficos editables',
      'Iconografía incluida',
      'Guía de personalización'
    ],
    paraQuien: [
      'Ejecutivos y gerentes',
      'Freelancers',
      'Agencias',
      'Consultores'
    ]
  },
  {
    id: '45',
    titulo: 'Infografía: Ciclo del Sueño',
    descripcion: 'Entiende y optimiza tu descanso para mejor rendimiento',
    categoria: 'infografia',
    tipo: 'PDF',
    tamano: '1.7',
    descargas: 2345,
    rating: 4.9,
    numReviews: 267,
    autor: 'Dr. Sueño Reparador',
    autorBio: 'Especialista en medicina del sueño',
    fecha: '2024-06-05',
    numPaginas: 2,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop',
    tags: ['sueño', 'descanso', 'recuperación', 'salud'],
    previewPages: 2,
    queIncluye: [
      'Infografía del ciclo del sueño',
      'Fases explicadas',
      'Impacto en rendimiento',
      'Tips de higiene del sueño',
      'Calculadora de ciclos'
    ],
    paraQuien: [
      'Atletas',
      'Personas con insomnio',
      'Profesionales de la salud',
      'Quienes buscan optimizar descanso'
    ]
  },
  {
    id: '46',
    titulo: 'Workbook: Comunicación Efectiva',
    descripcion: 'Mejora tus habilidades de comunicación en 21 días',
    categoria: 'workbook',
    tipo: 'PDF',
    tamano: '5.8',
    descargas: 1765,
    rating: 4.7,
    numReviews: 189,
    autor: 'Comunicadora Experta',
    autorBio: 'Coach de comunicación y oratoria',
    fecha: '2024-05-30',
    numPaginas: 50,
    isPremium: true,
    precio: 35.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    tags: ['comunicación', 'habilidades', 'workbook', 'desarrollo'],
    previewPages: 5,
    queIncluye: [
      'Ejercicios diarios por 21 días',
      'Técnicas de escucha activa',
      'Comunicación no verbal',
      'Presentaciones efectivas',
      'Retroalimentación y mejora'
    ],
    paraQuien: [
      'Líderes y gerentes',
      'Profesionales en desarrollo',
      'Personas tímidas',
      'Oradores'
    ]
  },
  {
    id: '47',
    titulo: 'Checklist: Onboarding de Empleados',
    descripcion: 'Integra nuevos talentos de forma profesional y efectiva',
    categoria: 'checklist',
    tipo: 'PDF',
    tamano: '1.3',
    descargas: 2876,
    rating: 4.8,
    numReviews: 312,
    autor: 'HR Profesional',
    autorBio: 'Especialista en recursos humanos',
    fecha: '2024-05-25',
    numPaginas: 13,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop',
    tags: ['onboarding', 'RH', 'empleados', 'checklist'],
    previewPages: 3,
    queIncluye: [
      'Checklist de 90 días',
      'Timeline estructurado',
      'Documentos necesarios',
      'Actividades de integración',
      'Evaluación de progreso'
    ],
    paraQuien: [
      'Departamentos de RH',
      'Gerentes y líderes',
      'Startups creciendo',
      'Consultores de RH'
    ]
  },
  {
    id: '48',
    titulo: 'Guía de Instagram para Negocios',
    descripcion: 'Convierte Instagram en tu mejor vendedor',
    categoria: 'guia',
    tipo: 'PDF',
    tamano: '6.7',
    descargas: 4321,
    rating: 4.9,
    numReviews: 498,
    autor: 'Insta Guru',
    autorBio: 'Especialista en Instagram marketing',
    fecha: '2024-05-20',
    numPaginas: 88,
    isPremium: true,
    precio: 42.99,
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=300&fit=crop',
    tags: ['Instagram', 'redes sociales', 'ventas', 'marketing'],
    previewPages: 5,
    queIncluye: [
      'Estrategia completa de contenido',
      'Reels que venden',
      'Stories estratégicas',
      'Hashtags efectivos',
      'Análisis de métricas'
    ],
    paraQuien: [
      'Negocios online',
      'Marcas personales',
      'Ecommerce',
      'Emprendedores'
    ]
  },
  {
    id: '49',
    titulo: 'Plantilla de Propuesta Comercial',
    descripcion: 'Cierra más ventas con propuestas profesionales',
    categoria: 'plantilla',
    tipo: 'DOCX',
    tamano: '1.8',
    descargas: 3210,
    rating: 4.7,
    numReviews: 354,
    autor: 'Vendedor Experto',
    autorBio: 'Consultor de ventas B2B',
    fecha: '2024-05-15',
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    tags: ['propuesta', 'ventas', 'negocios', 'Word'],
    queIncluye: [
      'Plantilla Word editable',
      'Estructura ganadora',
      'Secciones esenciales',
      'Diseño profesional',
      'Ejemplos completados'
    ],
    paraQuien: [
      'Equipos de ventas',
      'Freelancers',
      'Agencias',
      'Consultores'
    ]
  },
  {
    id: '50',
    titulo: 'Infografía: Mindset de Crecimiento',
    descripcion: 'Diferencias entre mindset fijo y de crecimiento',
    categoria: 'infografia',
    tipo: 'PDF',
    tamano: '1.4',
    descargas: 2987,
    rating: 4.8,
    numReviews: 321,
    autor: 'Coach Mindset',
    autorBio: 'Psicólogo y coach de desarrollo personal',
    fecha: '2024-05-10',
    numPaginas: 2,
    isPremium: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop',
    tags: ['mindset', 'crecimiento', 'psicología', 'desarrollo'],
    previewPages: 2,
    queIncluye: [
      'Infografía comparativa',
      'Características de cada mindset',
      'Cómo desarrollar crecimiento',
      'Ejemplos prácticos',
      'Versión para imprimir y compartir'
    ],
    paraQuien: [
      'Personas en desarrollo',
      'Coaches',
      'Educadores',
      'Equipos de trabajo'
    ]
  }
];

// Función principal de la API
export const fetchDownloadableContent = async (): Promise<Recurso[]> => {
  // Simulación de llamada a API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(RECURSOS_MOCK);
    }, 800);
  });
};

// Función para registrar descarga
export const recordDownload = async (contentId: string): Promise<boolean> => {
  console.log(`Descarga registrada para el recurso: ${contentId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
};

// Función para obtener un recurso específico
export const getRecursoById = async (id: string): Promise<Recurso | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recurso = RECURSOS_MOCK.find(r => r.id === id);
      resolve(recurso || null);
    }, 300);
  });
};

// Función para filtrar por categoría
export const getRecursosByCategoria = async (categoria: string): Promise<Recurso[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = RECURSOS_MOCK.filter(r => r.categoria === categoria);
      resolve(filtered);
    }, 500);
  });
};

// Función para buscar recursos
export const searchRecursos = async (query: string): Promise<Recurso[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = RECURSOS_MOCK.filter(r =>
        r.titulo.toLowerCase().includes(query.toLowerCase()) ||
        r.descripcion.toLowerCase().includes(query.toLowerCase()) ||
        r.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      resolve(results);
    }, 400);
  });
};
