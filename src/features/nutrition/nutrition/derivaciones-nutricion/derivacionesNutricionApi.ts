// Tipos extendidos para el sistema de derivaciones
export interface NutricionistaExtendido {
  id: string;
  nombre: string;
  credenciales: string;
  especialidades: string[];
  email: string;
  telefono: string;
  avatar: string;
  rating: number;
  totalReviews: number;
  disponibilidad: 'Disponible' | 'Limitada' | 'No Disponible';
  ubicacion: string;
  bio: string;
  experiencia: number;
  certificaciones: string[];
  clientesExitosos: number;
  tarifas?: string;
  horarios: string;
}

export interface DerivacionExtendida {
  id: string;
  clienteId: string;
  clienteNombre: string;
  clienteAvatar: string;
  nutricionistaId: string;
  nutricionistaNombre: string;
  fechaDerivacion: string;
  estado: 'Pendiente' | 'Aceptada' | 'En Proceso' | 'Completada' | 'Rechazada';
  urgencia: 'Normal' | 'Alta' | 'Urgente';
  motivo: string;
  objetivo?: string;
  restricciones?: string;
  condicionesMedicas?: string;
  medicamentos?: string;
  documentos?: string[];
  notas?: string;
  ultimaActualizacion: string;
  timeline: TimelineEvent[];
  mensajes?: Mensaje[];
}

export interface TimelineEvent {
  id: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  tipo: 'derivacion' | 'aceptacion' | 'consulta' | 'plan' | 'actualizacion';
  icono: string;
}

export interface Mensaje {
  id: string;
  remitente: 'entrenador' | 'nutricionista';
  nombre: string;
  avatar: string;
  mensaje: string;
  fecha: string;
  adjuntos?: string[];
}

export interface Cliente {
  id: string;
  nombre: string;
  avatar: string;
  email: string;
}

// Mock data - Nutricionistas
const mockNutricionistas: NutricionistaExtendido[] = [
  {
    id: 'nut1',
    nombre: 'Dra. Ana García',
    credenciales: 'Lic. en Nutrición, MSc. Nutrición Deportiva',
    especialidades: ['Nutrición Deportiva', 'Alto Rendimiento', 'Suplementación'],
    email: 'ana.garcia@nutricion.com',
    telefono: '+34 612 345 678',
    avatar: '👩‍⚕️',
    rating: 4.9,
    totalReviews: 127,
    disponibilidad: 'Disponible',
    ubicacion: 'Madrid, España',
    bio: 'Especialista en nutrición deportiva con más de 10 años de experiencia trabajando con atletas de élite. Enfoque en optimización del rendimiento y composición corporal.',
    experiencia: 10,
    certificaciones: ['ISAK Nivel 2', 'NSCA-CPT', 'Nutrición Deportiva Avanzada'],
    clientesExitosos: 450,
    tarifas: '€80-120/consulta',
    horarios: 'Lun-Vie: 9:00-20:00'
  },
  {
    id: 'nut2',
    nombre: 'Dr. Carlos Méndez',
    credenciales: 'Dr. en Nutrición Clínica',
    especialidades: ['Pérdida de Peso', 'Nutrición Clínica', 'Diabetes'],
    email: 'carlos.mendez@nutricion.com',
    telefono: '+34 623 456 789',
    avatar: '👨‍⚕️',
    rating: 4.8,
    totalReviews: 98,
    disponibilidad: 'Disponible',
    ubicacion: 'Barcelona, España',
    bio: 'Doctor especializado en manejo de peso y condiciones metabólicas. Enfoque holístico e individualizado para cada paciente.',
    experiencia: 12,
    certificaciones: ['Endocrinología Nutricional', 'Nutrición Bariátrica'],
    clientesExitosos: 380,
    tarifas: '€70-100/consulta',
    horarios: 'Lun-Vie: 10:00-19:00'
  },
  {
    id: 'nut3',
    nombre: 'Lic. Laura Pérez',
    credenciales: 'Lic. en Nutrición Pediátrica',
    especialidades: ['Nutrición Infantil', 'Lactancia', 'Alergias Alimentarias'],
    email: 'laura.perez@nutricion.com',
    telefono: '+34 634 567 890',
    avatar: '👩‍🔬',
    rating: 5.0,
    totalReviews: 156,
    disponibilidad: 'Limitada',
    ubicacion: 'Valencia, España',
    bio: 'Especialista en nutrición infantil con certificación en lactancia materna. Apasionada por la educación nutricional familiar.',
    experiencia: 8,
    certificaciones: ['IBCLC', 'Nutrición Pediátrica Avanzada'],
    clientesExitosos: 290,
    tarifas: '€60-90/consulta',
    horarios: 'Lun-Jue: 9:00-14:00'
  },
  {
    id: 'nut4',
    nombre: 'Lic. Roberto Silva',
    credenciales: 'Lic. en Nutrición, Esp. en Vegetarianismo',
    especialidades: ['Nutrición Vegetariana/Vegana', 'Sostenibilidad', 'Ética Alimentaria'],
    email: 'roberto.silva@nutricion.com',
    telefono: '+34 645 678 901',
    avatar: '🧑‍⚕️',
    rating: 4.7,
    totalReviews: 89,
    disponibilidad: 'Disponible',
    ubicacion: 'Sevilla, España',
    bio: 'Experto en dietas basadas en plantas con enfoque en nutrición completa y equilibrada sin productos animales.',
    experiencia: 6,
    certificaciones: ['Plant-Based Nutrition Certificate', 'Nutrición Holística'],
    clientesExitosos: 215,
    tarifas: '€65-85/consulta',
    horarios: 'Mar-Sáb: 10:00-18:00'
  },
  {
    id: 'nut5',
    nombre: 'Dra. Patricia Romero',
    credenciales: 'Dra. en Nutrición Deportiva',
    especialidades: ['CrossFit', 'Powerlifting', 'Composición Corporal'],
    email: 'patricia.romero@nutricion.com',
    telefono: '+34 656 789 012',
    avatar: '💪',
    rating: 4.9,
    totalReviews: 134,
    disponibilidad: 'Disponible',
    ubicacion: 'Málaga, España',
    bio: 'Atleta y nutricionista especializada en deportes de fuerza. Enfoque científico y práctico para máximos resultados.',
    experiencia: 9,
    certificaciones: ['CSCS', 'Nutrición Deportiva Elite', 'Body Composition Specialist'],
    clientesExitosos: 325,
    tarifas: '€75-110/consulta',
    horarios: 'Lun-Vie: 8:00-20:00'
  },
  {
    id: 'nut6',
    nombre: 'Lic. Miguel Ángel Torres',
    credenciales: 'Lic. en Nutrición Geriátrica',
    especialidades: ['Nutrición Geriátrica', 'Prevención', 'Longevidad'],
    email: 'miguel.torres@nutricion.com',
    telefono: '+34 667 890 123',
    avatar: '👴',
    rating: 4.8,
    totalReviews: 76,
    disponibilidad: 'No Disponible',
    ubicacion: 'Bilbao, España',
    bio: 'Especialista en nutrición para adultos mayores, enfocado en mantener calidad de vida y prevenir enfermedades.',
    experiencia: 15,
    certificaciones: ['Nutrición Geriátrica', 'Prevención de Sarcopenia'],
    clientesExitosos: 410,
    tarifas: '€70-95/consulta',
    horarios: 'Lun-Mie: 9:00-15:00'
  },
  {
    id: 'nut7',
    nombre: 'Lic. Sandra Ortiz',
    credenciales: 'Lic. en Nutrición Oncológica',
    especialidades: ['Nutrición Oncológica', 'Inmunonutrición', 'Cuidados Paliativos'],
    email: 'sandra.ortiz@nutricion.com',
    telefono: '+34 678 901 234',
    avatar: '🎗️',
    rating: 5.0,
    totalReviews: 67,
    disponibilidad: 'Limitada',
    ubicacion: 'Zaragoza, España',
    bio: 'Nutricionista especializada en acompañamiento nutricional durante tratamientos oncológicos y recuperación.',
    experiencia: 7,
    certificaciones: ['Nutrición Oncológica', 'Soporte Nutricional Avanzado'],
    clientesExitosos: 180,
    tarifas: '€80-120/consulta',
    horarios: 'Lun-Vie: 10:00-18:00'
  },
  {
    id: 'nut8',
    nombre: 'Lic. Fernando Blanco',
    credenciales: 'Lic. en Nutrición Deportiva',
    especialidades: ['Running', 'Triatlón', 'Resistencia'],
    email: 'fernando.blanco@nutricion.com',
    telefono: '+34 689 012 345',
    avatar: '🏃',
    rating: 4.8,
    totalReviews: 103,
    disponibilidad: 'Disponible',
    ubicacion: 'Granada, España',
    bio: 'Triatleta Ironman y nutricionista deportivo. Especializado en deportes de resistencia y ultra-distancia.',
    experiencia: 11,
    certificaciones: ['ISSN Sports Nutrition', 'Endurance Training Specialist'],
    clientesExitosos: 265,
    tarifas: '€70-100/consulta',
    horarios: 'Lun-Sáb: 7:00-21:00'
  }
];

// Mock data - Clientes
const mockClientes: Cliente[] = [
  { id: 'cli1', nombre: 'María López Sánchez', avatar: '👩', email: 'maria.lopez@email.com' },
  { id: 'cli2', nombre: 'Juan Martínez García', avatar: '👨', email: 'juan.martinez@email.com' },
  { id: 'cli3', nombre: 'Carmen Rodríguez', avatar: '👩‍🦰', email: 'carmen.rodriguez@email.com' },
  { id: 'cli4', nombre: 'Pedro Fernández', avatar: '👨‍🦱', email: 'pedro.fernandez@email.com' },
  { id: 'cli5', nombre: 'Isabel García', avatar: '👱‍♀️', email: 'isabel.garcia@email.com' },
  { id: 'cli6', nombre: 'Alberto Ruiz', avatar: '🧔', email: 'alberto.ruiz@email.com' },
  { id: 'cli7', nombre: 'Sofía Jiménez', avatar: '👩‍🦳', email: 'sofia.jimenez@email.com' },
  { id: 'cli8', nombre: 'Diego Moreno', avatar: '👨‍🦲', email: 'diego.moreno@email.com' }
];

// Mock data - Derivaciones
const mockDerivaciones: DerivacionExtendida[] = [
  {
    id: 'der1',
    clienteId: 'cli1',
    clienteNombre: 'María López Sánchez',
    clienteAvatar: '👩',
    nutricionistaId: 'nut1',
    nutricionistaNombre: 'Dra. Ana García',
    fechaDerivacion: '2024-03-15',
    estado: 'En Proceso',
    urgencia: 'Alta',
    motivo: 'Optimización de rendimiento para maratón',
    objetivo: 'Mejorar tiempos y resistencia para competencia en 3 meses',
    restricciones: 'Intolerancia a la lactosa',
    condicionesMedicas: 'Ninguna relevante',
    medicamentos: 'Suplemento multivitamínico',
    documentos: ['analisis_sangre_2024.pdf', 'historial_deportivo.pdf'],
    notas: 'Cliente con historial de maratones. Actualmente entrenando 5 días/semana.',
    ultimaActualizacion: '2024-03-20',
    timeline: [
      {
        id: 't1',
        fecha: '2024-03-15',
        titulo: 'Derivación enviada',
        descripcion: 'Entrenador envió derivación a la nutricionista',
        tipo: 'derivacion',
        icono: '📤'
      },
      {
        id: 't2',
        fecha: '2024-03-16',
        titulo: 'Derivación aceptada',
        descripcion: 'Dra. García aceptó la derivación',
        tipo: 'aceptacion',
        icono: '✅'
      },
      {
        id: 't3',
        fecha: '2024-03-18',
        titulo: 'Primera consulta',
        descripcion: 'Consulta inicial completada - Evaluación nutricional',
        tipo: 'consulta',
        icono: '👥'
      },
      {
        id: 't4',
        fecha: '2024-03-20',
        titulo: 'Plan nutricional creado',
        descripcion: 'Plan personalizado de nutrición deportiva entregado',
        tipo: 'plan',
        icono: '📋'
      }
    ],
    mensajes: [
      {
        id: 'm1',
        remitente: 'entrenador',
        nombre: 'Coach López',
        avatar: '🏋️',
        mensaje: 'Hola Dra. García, le derivo a María para optimizar su nutrición de cara al maratón de junio. Está entrenando muy bien pero necesita ajustar la alimentación.',
        fecha: '2024-03-15 10:30'
      },
      {
        id: 'm2',
        remitente: 'nutricionista',
        nombre: 'Dra. Ana García',
        avatar: '👩‍⚕️',
        mensaje: 'Perfecto, muchas gracias por la derivación. Ya agendé cita con María para el lunes. Le enviaré el plan completo esta semana.',
        fecha: '2024-03-16 14:20'
      },
      {
        id: 'm3',
        remitente: 'nutricionista',
        nombre: 'Dra. Ana García',
        avatar: '👩‍⚕️',
        mensaje: 'Plan nutricional entregado. María está muy motivada. Le recomendé incrementar carbohidratos en días de entrenamientos largos. Próxima revisión en 2 semanas.',
        fecha: '2024-03-20 16:45'
      }
    ]
  },
  {
    id: 'der2',
    clienteId: 'cli2',
    clienteNombre: 'Juan Martínez García',
    clienteAvatar: '👨',
    nutricionistaId: 'nut2',
    nutricionistaNombre: 'Dr. Carlos Méndez',
    fechaDerivacion: '2024-02-28',
    estado: 'Completada',
    urgencia: 'Normal',
    motivo: 'Pérdida de peso saludable y sostenible',
    objetivo: 'Reducir 12kg en 6 meses de forma saludable',
    restricciones: 'Ninguna',
    condicionesMedicas: 'Pre-diabetes (HbA1c: 6.2%)',
    medicamentos: 'Metformina 500mg',
    documentos: ['analisis_completo.pdf'],
    notas: 'Cliente motivado pero con historial de efecto rebote. Requiere enfoque sostenible.',
    ultimaActualizacion: '2024-03-28',
    timeline: [
      {
        id: 't1',
        fecha: '2024-02-28',
        titulo: 'Derivación enviada',
        descripcion: 'Solicitud de apoyo nutricional para pérdida de peso',
        tipo: 'derivacion',
        icono: '📤'
      },
      {
        id: 't2',
        fecha: '2024-03-01',
        titulo: 'Derivación aceptada',
        descripcion: 'Dr. Méndez aceptó el caso',
        tipo: 'aceptacion',
        icono: '✅'
      },
      {
        id: 't3',
        fecha: '2024-03-05',
        titulo: 'Evaluación inicial',
        descripcion: 'Mediciones y análisis completo realizado',
        tipo: 'consulta',
        icono: '📊'
      },
      {
        id: 't4',
        fecha: '2024-03-08',
        titulo: 'Plan nutricional',
        descripcion: 'Plan de alimentación personalizado entregado',
        tipo: 'plan',
        icono: '📋'
      },
      {
        id: 't5',
        fecha: '2024-03-28',
        titulo: 'Seguimiento completado',
        descripcion: 'Objetivo alcanzado: -5kg en primer mes. Cliente derivado de vuelta con pautas de mantenimiento.',
        tipo: 'actualizacion',
        icono: '🎉'
      }
    ],
    mensajes: [
      {
        id: 'm1',
        remitente: 'nutricionista',
        nombre: 'Dr. Carlos Méndez',
        avatar: '👨‍⚕️',
        mensaje: 'Hola colega, Juan ha completado exitosamente el programa de 8 semanas. Perdió 5kg de forma saludable y sus valores de glucosa mejoraron. Le entregué pautas de mantenimiento. Pueden continuar con el entrenamiento normalmente.',
        fecha: '2024-03-28 11:15'
      }
    ]
  },
  {
    id: 'der3',
    clienteId: 'cli3',
    clienteNombre: 'Carmen Rodríguez',
    clienteAvatar: '👩‍🦰',
    nutricionistaId: 'nut5',
    nutricionistaNombre: 'Dra. Patricia Romero',
    fechaDerivacion: '2024-03-22',
    estado: 'Aceptada',
    urgencia: 'Normal',
    motivo: 'Optimización de composición corporal para CrossFit',
    objetivo: 'Aumentar masa muscular y reducir grasa corporal',
    restricciones: 'Alergia a frutos secos',
    condicionesMedicas: 'Ninguna',
    medicamentos: 'Ninguno',
    notas: 'Atleta de nivel intermedio buscando competir',
    ultimaActualizacion: '2024-03-23',
    timeline: [
      {
        id: 't1',
        fecha: '2024-03-22',
        titulo: 'Derivación enviada',
        descripcion: 'Solicitud para optimización de composición corporal',
        tipo: 'derivacion',
        icono: '📤'
      },
      {
        id: 't3',
        fecha: '2024-03-23',
        titulo: 'Derivación aceptada',
        descripcion: 'Dra. Romero aceptó la derivación. Primera cita: 25 de marzo.',
        tipo: 'aceptacion',
        icono: '✅'
      }
    ],
    mensajes: []
  },
  {
    id: 'der4',
    clienteId: 'cli4',
    clienteNombre: 'Pedro Fernández',
    clienteAvatar: '👨‍🦱',
    nutricionistaId: 'nut4',
    nutricionistaNombre: 'Lic. Roberto Silva',
    fechaDerivacion: '2024-03-20',
    estado: 'En Proceso',
    urgencia: 'Normal',
    motivo: 'Transición a dieta vegana deportiva',
    objetivo: 'Mantener rendimiento deportivo con alimentación 100% vegetal',
    restricciones: 'Vegano estricto',
    condicionesMedicas: 'Ninguna',
    medicamentos: 'Suplemento B12',
    documentos: ['analisis_vitaminas.pdf'],
    notas: 'Cliente comprometido con veganismo por motivos éticos',
    ultimaActualizacion: '2024-03-25',
    timeline: [
      {
        id: 't1',
        fecha: '2024-03-20',
        titulo: 'Derivación enviada',
        descripcion: 'Apoyo para transición vegana',
        tipo: 'derivacion',
        icono: '📤'
      },
      {
        id: 't2',
        fecha: '2024-03-21',
        titulo: 'Derivación aceptada',
        descripcion: 'Lic. Silva aceptó el caso',
        tipo: 'aceptacion',
        icono: '✅'
      },
      {
        id: 't3',
        fecha: '2024-03-23',
        titulo: 'Consulta inicial',
        descripcion: 'Evaluación de estado nutricional y diseño de plan',
        tipo: 'consulta',
        icono: '👥'
      },
      {
        id: 't4',
        fecha: '2024-03-25',
        titulo: 'Plan vegano entregado',
        descripcion: 'Plan completo con recetas y suplementación',
        tipo: 'plan',
        icono: '📋'
      }
    ],
    mensajes: [
      {
        id: 'm1',
        remitente: 'nutricionista',
        nombre: 'Lic. Roberto Silva',
        avatar: '🧑‍⚕️',
        mensaje: 'Pedro está muy bien orientado. Le entregué plan completo con recetas y lista de compras. Seguimiento en 3 semanas para ajustes.',
        fecha: '2024-03-25 17:30'
      }
    ]
  },
  {
    id: 'der5',
    clienteId: 'cli5',
    clienteNombre: 'Isabel García',
    clienteAvatar: '👱‍♀️',
    nutricionistaId: 'nut1',
    nutricionistaNombre: 'Dra. Ana García',
    fechaDerivacion: '2024-03-25',
    estado: 'Pendiente',
    urgencia: 'Urgente',
    motivo: 'Preparación para competencia de triatlón en 6 semanas',
    objetivo: 'Maximizar rendimiento para competencia Ironman 70.3',
    restricciones: 'Ninguna',
    condicionesMedicas: 'Ninguna',
    medicamentos: 'Ninguno',
    documentos: ['plan_entrenamiento.pdf'],
    notas: 'Competencia importante. Requiere protocolo de carga y descarga',
    ultimaActualizacion: '2024-03-25',
    timeline: [
      {
        id: 't1',
        fecha: '2024-03-25',
        titulo: 'Derivación urgente enviada',
        descripcion: 'Solicitud urgente para preparación de competencia',
        tipo: 'derivacion',
        icono: '🚨'
      }
    ],
    mensajes: []
  },
  {
    id: 'der6',
    clienteId: 'cli6',
    clienteNombre: 'Alberto Ruiz',
    clienteAvatar: '🧔',
    nutricionistaId: 'nut2',
    nutricionistaNombre: 'Dr. Carlos Méndez',
    fechaDerivacion: '2024-03-10',
    estado: 'Completada',
    urgencia: 'Alta',
    motivo: 'Control de diabetes tipo 2 y pérdida de peso',
    objetivo: 'Mejorar control glucémico y reducir peso',
    restricciones: 'Bajo en azúcares simples',
    condicionesMedicas: 'Diabetes tipo 2, Hipertensión',
    medicamentos: 'Metformina, Enalapril',
    notas: 'Requiere coordinación con médico endocrinólogo',
    ultimaActualizacion: '2024-03-24',
    timeline: [
      {
        id: 't1',
        fecha: '2024-03-10',
        titulo: 'Derivación enviada',
        descripcion: 'Caso prioritario de manejo metabólico',
        tipo: 'derivacion',
        icono: '📤'
      },
      {
        id: 't2',
        fecha: '2024-03-11',
        titulo: 'Derivación aceptada',
        descripcion: 'Dr. Méndez aceptó caso de alta prioridad',
        tipo: 'aceptacion',
        icono: '✅'
      },
      {
        id: 't3',
        fecha: '2024-03-13',
        titulo: 'Evaluación completa',
        descripcion: 'Análisis exhaustivo realizado',
        tipo: 'consulta',
        icono: '📊'
      },
      {
        id: 't4',
        fecha: '2024-03-15',
        titulo: 'Plan terapéutico',
        descripcion: 'Plan nutricional para diabetes entregado',
        tipo: 'plan',
        icono: '📋'
      },
      {
        id: 't5',
        fecha: '2024-03-24',
        titulo: 'Objetivos alcanzados',
        descripcion: 'HbA1c mejorada a 6.8%. Cliente estabilizado.',
        tipo: 'actualizacion',
        icono: '✅'
      }
    ],
    mensajes: []
  },
  {
    id: 'der7',
    clienteId: 'cli7',
    clienteNombre: 'Sofía Jiménez',
    clienteAvatar: '👩‍🦳',
    nutricionistaId: 'nut8',
    nutricionistaNombre: 'Lic. Fernando Blanco',
    fechaDerivacion: '2024-03-18',
    estado: 'En Proceso',
    urgencia: 'Normal',
    motivo: 'Preparación nutricional para ultramaratón',
    objetivo: 'Estrategia nutricional para carrera de 100km',
    restricciones: 'Ninguna',
    condicionesMedicas: 'Ninguna',
    medicamentos: 'Ninguno',
    notas: 'Corredora experimentada, primera ultra',
    ultimaActualizacion: '2024-03-22',
    timeline: [
      {
        id: 't1',
        fecha: '2024-03-18',
        titulo: 'Derivación enviada',
        descripcion: 'Preparación para ultramaratón',
        tipo: 'derivacion',
        icono: '📤'
      },
      {
        id: 't2',
        fecha: '2024-03-19',
        titulo: 'Derivación aceptada',
        descripcion: 'Lic. Blanco aceptó la derivación',
        tipo: 'aceptacion',
        icono: '✅'
      },
      {
        id: 't3',
        fecha: '2024-03-22',
        titulo: 'Consulta especializada',
        descripcion: 'Protocolo de nutrición para ultra-distancia iniciado',
        tipo: 'consulta',
        icono: '👥'
      }
    ],
    mensajes: [
      {
        id: 'm1',
        remitente: 'nutricionista',
        nombre: 'Lic. Fernando Blanco',
        avatar: '🏃',
        mensaje: 'Sofía está muy bien preparada físicamente. Vamos a trabajar la estrategia de hidratación y nutrición durante la carrera. Le mandé protocolo de prueba para entrenamientos largos.',
        fecha: '2024-03-22 19:20'
      }
    ]
  },
  {
    id: 'der8',
    clienteId: 'cli8',
    clienteNombre: 'Diego Moreno',
    clienteAvatar: '👨‍🦲',
    nutricionistaId: 'nut5',
    nutricionistaNombre: 'Dra. Patricia Romero',
    fechaDerivacion: '2024-03-24',
    estado: 'Pendiente',
    urgencia: 'Normal',
    motivo: 'Nutrición para powerlifting y aumento de fuerza',
    objetivo: 'Aumentar fuerza máxima manteniendo categoría de peso',
    restricciones: 'Ninguna',
    condicionesMedicas: 'Ninguna',
    medicamentos: 'Creatina monohidrato',
    notas: 'Competidor nivel nacional',
    ultimaActualizacion: '2024-03-24',
    timeline: [
      {
        id: 't1',
        fecha: '2024-03-24',
        titulo: 'Derivación enviada',
        descripcion: 'Optimización para powerlifting',
        tipo: 'derivacion',
        icono: '📤'
      }
    ],
    mensajes: []
  }
];

// API Functions
export const getNutricionistas = async (): Promise<NutricionistaExtendido[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNutricionistas), 500);
  });
};

export const getDerivaciones = async (): Promise<DerivacionExtendida[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDerivaciones), 500);
  });
};

export const getClientes = async (): Promise<Cliente[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockClientes), 300);
  });
};

export const createDerivacion = async (derivacion: Omit<DerivacionExtendida, 'id' | 'estado' | 'ultimaActualizacion' | 'timeline' | 'mensajes'>): Promise<DerivacionExtendida> => {
  return new Promise((resolve) => {
    const newDerivacion: DerivacionExtendida = {
      id: `der${mockDerivaciones.length + 1}`,
      ...derivacion,
      estado: 'Pendiente',
      ultimaActualizacion: new Date().toISOString().split('T')[0],
      timeline: [
        {
          id: 't1',
          fecha: new Date().toISOString().split('T')[0],
          titulo: 'Derivación enviada',
          descripcion: 'Solicitud de derivación creada por el entrenador',
          tipo: 'derivacion',
          icono: '📤'
        }
      ],
      mensajes: []
    };
    mockDerivaciones.push(newDerivacion);
    setTimeout(() => resolve(newDerivacion), 500);
  });
};

export const updateDerivacionStatus = async (id: string, estado: DerivacionExtendida['estado']): Promise<DerivacionExtendida | undefined> => {
  return new Promise((resolve) => {
    const derivacion = mockDerivaciones.find((d) => d.id === id);
    if (derivacion) {
      derivacion.estado = estado;
      derivacion.ultimaActualizacion = new Date().toISOString().split('T')[0];
    }
    setTimeout(() => resolve(derivacion), 500);
  });
};

export const addMensaje = async (derivacionId: string, mensaje: Omit<Mensaje, 'id'>): Promise<DerivacionExtendida | undefined> => {
  return new Promise((resolve) => {
    const derivacion = mockDerivaciones.find((d) => d.id === derivacionId);
    if (derivacion) {
      const newMensaje: Mensaje = {
        id: `m${(derivacion.mensajes?.length || 0) + 1}`,
        ...mensaje
      };
      if (!derivacion.mensajes) {
        derivacion.mensajes = [];
      }
      derivacion.mensajes.push(newMensaje);
      derivacion.ultimaActualizacion = new Date().toISOString().split('T')[0];
    }
    setTimeout(() => resolve(derivacion), 300);
  });
};
