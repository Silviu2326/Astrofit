
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

export interface WorkoutDay {
  day: string;
  exercises: Exercise[];
}

export type Objective = 'hipertrofia' | 'perdida_grasa' | 'preparacion_fisica';
export type Level = 'principiante' | 'intermedio' | 'avanzado';
export type Modality = 'gimnasio' | 'casa' | 'outdoor';

export interface TrainingTemplate {
  id: string;
  name: string;
  description: string;
  objective: Objective;
  level: Level;
  modality: Modality;
  duration: string; // e.g., "60-90 min"
  frequency: string; // e.g., "3-4 veces/semana"
  materialNeeded: string[];
  isFavorite: boolean;
  rating: number;
  commentsCount: number;
  isSystemTemplate: boolean;
  author: string; // "Sistema" or user ID/name
  workoutDays: WorkoutDay[];
}

export const mockTrainingTemplates: TrainingTemplate[] = [
  {
    id: 'tpl-001',
    name: 'Rutina Full Body Principiante',
    description: 'Ideal para quienes se inician en el gimnasio, enfocada en hipertrofia y fuerza general.',
    objective: 'hipertrofia',
    level: 'principiante',
    modality: 'gimnasio',
    duration: '45-60 min',
    frequency: '3 veces/semana',
    materialNeeded: ['Mancuernas', 'Barra', 'Máquinas de gimnasio'],
    isFavorite: false,
    rating: 4.5,
    commentsCount: 12,
    isSystemTemplate: true,
    author: 'Sistema',
    workoutDays: [
      {
        day: 'Día 1',
        exercises: [
          { id: 'ex-001', name: 'Sentadilla con barra', sets: 3, reps: '8-12', rest: '90s' },
          { id: 'ex-002', name: 'Press de banca', sets: 3, reps: '8-12', rest: '90s' },
          { id: 'ex-003', name: 'Remo con barra', sets: 3, reps: '8-12', rest: '90s' },
          { id: 'ex-004', name: 'Press militar con mancuernas', sets: 3, reps: '10-15', rest: '60s' },
          { id: 'ex-005', name: 'Curl de bíceps', sets: 3, reps: '10-15', rest: '60s' },
          { id: 'ex-006', name: 'Extensiones de tríceps', sets: 3, reps: '10-15', rest: '60s' },
        ],
      },
      {
        day: 'Día 2',
        exercises: [
          { id: 'ex-007', name: 'Peso muerto rumano', sets: 3, reps: '8-12', rest: '90s' },
          { id: 'ex-008', name: 'Press inclinado con mancuernas', sets: 3, reps: '8-12', rest: '90s' },
          { id: 'ex-009', name: 'Jalón al pecho', sets: 3, reps: '8-12', rest: '90s' },
          { id: 'ex-010', name: 'Elevaciones laterales', sets: 3, reps: '10-15', rest: '60s' },
          { id: 'ex-011', name: 'Extensiones de cuádriceps', sets: 3, reps: '10-15', rest: '60s' },
          { id: 'ex-012', name: 'Curl femoral', sets: 3, reps: '10-15', rest: '60s' },
        ],
      },
    ],
  },
  {
    id: 'tpl-002',
    name: 'Entrenamiento HIIT en Casa',
    description: 'Sesiones cortas e intensas para quemar grasa y mejorar la resistencia cardiovascular sin material.',
    objective: 'perdida_grasa',
    level: 'intermedio',
    modality: 'casa',
    duration: '20-30 min',
    frequency: '4-5 veces/semana',
    materialNeeded: ['Ninguno'],
    isFavorite: true,
    rating: 4.8,
    commentsCount: 25,
    isSystemTemplate: true,
    author: 'Sistema',
    workoutDays: [
      {
        day: 'Sesión A',
        exercises: [
          { id: 'ex-013', name: 'Burpees', sets: 4, reps: '10-12', rest: '30s' },
          { id: 'ex-014', name: 'Saltos de tijera', sets: 4, reps: '20-30', rest: '30s' },
          { id: 'ex-015', name: 'Flexiones', sets: 4, reps: 'Máx', rest: '30s' },
          { id: 'ex-016', name: 'Mountain climbers', sets: 4, reps: '30s', rest: '30s' },
        ],
      },
      {
        day: 'Sesión B',
        exercises: [
          { id: 'ex-017', name: 'Sentadilla con salto', sets: 4, reps: '10-15', rest: '30s' },
          { id: 'ex-018', name: 'Zancadas alternas', sets: 4, reps: '10-12/pierna', rest: '30s' },
          { id: 'ex-019', name: 'Plancha', sets: 4, reps: '45-60s', rest: '30s' },
          { id: 'ex-020', name: 'Fondos de tríceps en silla', sets: 4, reps: 'Máx', rest: '30s' },
        ],
      },
    ],
  },
  {
    id: 'tpl-003',
    name: 'Preparación para Maratón (Intermedio)',
    description: 'Plan de entrenamiento progresivo para corredores que buscan completar un maratón.',
    objective: 'preparacion_fisica',
    level: 'avanzado',
    modality: 'outdoor',
    duration: '60-120 min',
    frequency: '4-6 veces/semana',
    materialNeeded: ['Zapatillas de running', 'Reloj GPS'],
    isFavorite: false,
    rating: 4.7,
    commentsCount: 8,
    isSystemTemplate: true,
    author: 'Sistema',
    workoutDays: [
      {
        day: 'Lunes',
        exercises: [{ id: 'ex-021', name: 'Carrera suave', sets: 1, reps: '60 min', rest: '0', notes: 'Ritmo conversacional' }],
      },
      {
        day: 'Martes',
        exercises: [{ id: 'ex-022', name: 'Entrenamiento de series', sets: 1, reps: '45 min', rest: '0', notes: '6x800m a ritmo rápido' }],
      },
      {
        day: 'Miércoles',
        exercises: [{ id: 'ex-023', name: 'Descanso activo / Yoga', sets: 1, reps: '30 min', rest: '0' }],
      },
      {
        day: 'Jueves',
        exercises: [{ id: 'ex-024', name: 'Carrera de ritmo', sets: 1, reps: '50 min', rest: '0', notes: 'Ritmo de maratón' }],
      },
      {
        day: 'Viernes',
        exercises: [{ id: 'ex-025', name: 'Fuerza en gimnasio', sets: 1, reps: '60 min', rest: '0' }],
      },
      {
        day: 'Sábado',
        exercises: [{ id: 'ex-026', name: 'Tirada larga', sets: 1, reps: '90-120 min', rest: '0', notes: 'Aumentar 10% cada semana' }],
      },
    ],
  },
  {
    id: 'tpl-004',
    name: 'Mi Rutina Personal de Brazos',
    description: 'Rutina personalizada para el desarrollo de bíceps y tríceps.',
    objective: 'hipertrofia',
    level: 'intermedio',
    modality: 'gimnasio',
    duration: '45 min',
    frequency: '2 veces/semana',
    materialNeeded: ['Mancuernas', 'Barra Z', 'Máquina de poleas'],
    isFavorite: true,
    rating: 4.9,
    commentsCount: 5,
    isSystemTemplate: false,
    author: 'Usuario123',
    workoutDays: [
      {
        day: 'Día de Brazos',
        exercises: [
          { id: 'ex-027', name: 'Curl de bíceps con barra', sets: 4, reps: '8-10', rest: '60s' },
          { id: 'ex-028', name: 'Curl martillo con mancuernas', sets: 3, reps: '10-12', rest: '60s' },
          { id: 'ex-029', name: 'Extensiones de tríceps en polea alta', sets: 4, reps: '10-15', rest: '60s' },
          { id: 'ex-030', name: 'Press francés con mancuernas', sets: 3, reps: '10-12', rest: '60s' },
          { id: 'ex-031', name: 'Curl concentrado', sets: 3, reps: '12-15', rest: '45s' },
        ],
      },
    ],
  },
  {
    id: 'tpl-005',
    name: 'Definición Muscular 6 semanas',
    description: 'Programa de entrenamiento combinando pesas y cardio para definir y reducir grasa corporal',
    objective: 'perdida_grasa',
    level: 'avanzado',
    modality: 'gimnasio',
    duration: '60-75 min',
    frequency: '5 veces/semana',
    materialNeeded: ['Mancuernas', 'Barra', 'Cinta de correr', 'Remo'],
    isFavorite: true,
    rating: 4.6,
    commentsCount: 18,
    isSystemTemplate: true,
    author: 'Sistema',
    workoutDays: [
      {
        day: 'Lunes - Tren Superior',
        exercises: [
          { id: 'ex-032', name: 'Press de banca inclinado', sets: 4, reps: '12-15', rest: '45s' },
          { id: 'ex-033', name: 'Remo con mancuernas', sets: 4, reps: '12-15', rest: '45s' },
          { id: 'ex-034', name: 'Press militar', sets: 3, reps: '15', rest: '45s' },
          { id: 'ex-035', name: 'Curl de bíceps 21s', sets: 3, reps: '21', rest: '30s' },
          { id: 'ex-036', name: 'Fondos de tríceps', sets: 3, reps: 'Máx', rest: '30s' },
        ],
      },
      {
        day: 'Martes - HIIT Cardio',
        exercises: [
          { id: 'ex-037', name: 'Sprints en cinta', sets: 8, reps: '30s', rest: '30s', notes: '90% esfuerzo máximo' },
          { id: 'ex-038', name: 'Burpees', sets: 5, reps: '15', rest: '45s' },
          { id: 'ex-039', name: 'Battle ropes', sets: 5, reps: '45s', rest: '30s' },
        ],
      },
    ],
  },
  {
    id: 'tpl-006',
    name: 'Calistenia Básica - Peso Corporal',
    description: 'Entrenamiento funcional con el peso corporal para desarrollar fuerza y control',
    objective: 'preparacion_fisica',
    level: 'principiante',
    modality: 'outdoor',
    duration: '30-40 min',
    frequency: '3-4 veces/semana',
    materialNeeded: ['Barra de dominadas', 'Paralelas'],
    isFavorite: false,
    rating: 4.4,
    commentsCount: 14,
    isSystemTemplate: true,
    author: 'Sistema',
    workoutDays: [
      {
        day: 'Día 1 - Empuje',
        exercises: [
          { id: 'ex-040', name: 'Flexiones regulares', sets: 4, reps: '8-12', rest: '60s' },
          { id: 'ex-041', name: 'Flexiones en diamante', sets: 3, reps: '6-10', rest: '60s' },
          { id: 'ex-042', name: 'Pike push-ups', sets: 3, reps: '8-12', rest: '60s' },
          { id: 'ex-043', name: 'Fondos en paralelas', sets: 3, reps: '6-10', rest: '90s' },
        ],
      },
      {
        day: 'Día 2 - Tracción',
        exercises: [
          { id: 'ex-044', name: 'Dominadas asistidas', sets: 4, reps: '5-8', rest: '90s' },
          { id: 'ex-045', name: 'Remo invertido', sets: 4, reps: '8-12', rest: '60s' },
          { id: 'ex-046', name: 'Face pulls con banda', sets: 3, reps: '15', rest: '45s' },
        ],
      },
    ],
  },
  {
    id: 'tpl-007',
    name: 'Push/Pull/Legs - Hipertrofia Avanzada',
    description: 'Rutina clásica PPL para maximizar la hipertrofia muscular',
    objective: 'hipertrofia',
    level: 'avanzado',
    modality: 'gimnasio',
    duration: '75-90 min',
    frequency: '6 veces/semana',
    materialNeeded: ['Barra', 'Mancuernas', 'Máquinas', 'Poleas'],
    isFavorite: true,
    rating: 4.9,
    commentsCount: 32,
    isSystemTemplate: true,
    author: 'Sistema',
    workoutDays: [
      {
        day: 'Push - Pecho/Hombros/Tríceps',
        exercises: [
          { id: 'ex-047', name: 'Press de banca plano', sets: 4, reps: '6-8', rest: '2min' },
          { id: 'ex-048', name: 'Press inclinado con mancuernas', sets: 4, reps: '8-10', rest: '90s' },
          { id: 'ex-049', name: 'Aperturas en máquina', sets: 3, reps: '12-15', rest: '60s' },
          { id: 'ex-050', name: 'Press militar', sets: 4, reps: '8-10', rest: '90s' },
          { id: 'ex-051', name: 'Elevaciones laterales', sets: 4, reps: '12-15', rest: '45s' },
          { id: 'ex-052', name: 'Press francés', sets: 3, reps: '10-12', rest: '60s' },
          { id: 'ex-053', name: 'Extensiones en polea', sets: 3, reps: '15', rest: '45s' },
        ],
      },
      {
        day: 'Pull - Espalda/Bíceps',
        exercises: [
          { id: 'ex-054', name: 'Peso muerto', sets: 4, reps: '5-6', rest: '3min' },
          { id: 'ex-055', name: 'Dominadas', sets: 4, reps: '8-10', rest: '90s' },
          { id: 'ex-056', name: 'Remo con barra', sets: 4, reps: '8-10', rest: '90s' },
          { id: 'ex-057', name: 'Jalón al pecho', sets: 3, reps: '12-15', rest: '60s' },
          { id: 'ex-058', name: 'Face pulls', sets: 4, reps: '15-20', rest: '45s' },
          { id: 'ex-059', name: 'Curl con barra Z', sets: 4, reps: '10-12', rest: '60s' },
          { id: 'ex-060', name: 'Curl martillo', sets: 3, reps: '12-15', rest: '45s' },
        ],
      },
      {
        day: 'Legs - Piernas',
        exercises: [
          { id: 'ex-061', name: 'Sentadilla trasera', sets: 5, reps: '6-8', rest: '3min' },
          { id: 'ex-062', name: 'Prensa de piernas', sets: 4, reps: '10-12', rest: '90s' },
          { id: 'ex-063', name: 'Peso muerto rumano', sets: 4, reps: '8-10', rest: '90s' },
          { id: 'ex-064', name: 'Curl femoral', sets: 4, reps: '12-15', rest: '60s' },
          { id: 'ex-065', name: 'Extensiones de cuádriceps', sets: 4, reps: '12-15', rest: '60s' },
          { id: 'ex-066', name: 'Elevación de gemelos', sets: 5, reps: '15-20', rest: '45s' },
        ],
      },
    ],
  },
  {
    id: 'tpl-008',
    name: 'Acondicionamiento Funcional',
    description: 'Entrenamiento funcional y acondicionamiento metabólico para mejorar el rendimiento general',
    objective: 'preparacion_fisica',
    level: 'intermedio',
    modality: 'gimnasio',
    duration: '45-60 min',
    frequency: '4 veces/semana',
    materialNeeded: ['Kettlebells', 'Battle ropes', 'Caja pliométrica', 'Mancuernas'],
    isFavorite: false,
    rating: 4.5,
    commentsCount: 11,
    isSystemTemplate: false,
    author: 'CoachMartinez',
    workoutDays: [
      {
        day: 'Día 1 - MetCon',
        exercises: [
          { id: 'ex-067', name: 'Kettlebell swings', sets: 5, reps: '20', rest: '45s' },
          { id: 'ex-068', name: 'Box jumps', sets: 5, reps: '12', rest: '60s' },
          { id: 'ex-069', name: 'Battle ropes', sets: 5, reps: '30s', rest: '30s' },
          { id: 'ex-070', name: 'Burpees over box', sets: 4, reps: '10', rest: '60s' },
        ],
      },
    ],
  },
];

export const getTrainingTemplates = (): Promise<TrainingTemplate[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTrainingTemplates);
    }, 500); // Simulate API call
  });
};

export const getTrainingTemplateById = (id: string): Promise<TrainingTemplate | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTrainingTemplates.find(template => template.id === id));
    }, 300);
  });
};
