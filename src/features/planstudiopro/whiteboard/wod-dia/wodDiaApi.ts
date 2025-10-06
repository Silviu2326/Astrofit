export type WodType = 'AMRAP' | 'For Time' | 'EMOM' | 'Chipper' | 'Strength' | 'Hero WOD' | 'Girl WOD';

export type ScalingLevel = 'RX' | 'Scaled' | 'Beginner';

export interface Equipment {
  id: string;
  name: string;
  icon?: string;
}

export interface Movement {
  id: string;
  name: string;
  aliases?: string[];
  videoUrl?: string;
  description?: string;
  technicalCues?: string[];
  commonErrors?: string[];
  scalingOptions?: string[];
}

export interface Scaling {
  rx: string;
  scaled: string;
  beginner: string;
}

export interface CoachNotes {
  warmup?: string;
  strategy?: string[];
  technicalFocus?: string[];
  cooldown?: string;
}

export interface WodMedia {
  videoUrl?: string;
  imageUrls?: string[];
}

export interface Wod {
  id: string;
  date: string; // ISO date string
  name?: string; // "Fran", "Murph", or custom name
  type: WodType;
  description: string;
  stimulus?: string; // Objetivo del WOD
  estimatedDuration?: number; // en minutos
  timeCap?: number; // en minutos
  targetHeartRate?: { min: number; max: number }; // % de FC máxima
  equipmentNeeded: string[]; // IDs de equipamiento
  scaling: Scaling;
  media?: WodMedia;
  coachNotes?: CoachNotes;
  isPublished: boolean;
  publishedAt?: string;
  scheduledFor?: string;
  visibleToCoachesOnly?: boolean;
  isBenchmark?: boolean;
  benchmarkType?: 'Girl' | 'Hero';
  heroStory?: string; // Para Hero WODs
  lastPerformed?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WodResult {
  id: string;
  wodId: string;
  userId: string;
  userName: string;
  result: string; // Time for "For Time", Reps for "AMRAP", etc.
  scalingUsed: ScalingLevel;
  weight?: number; // Para Strength WODs
  notes?: string;
  submittedAt: string;
  validatedByCoach?: boolean;
}

export interface WodComment {
  id: string;
  wodId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  comment: string;
  reactions: { [emoji: string]: number };
  createdAt: string;
}

export interface WodStats {
  wodId: string;
  completedBy: number;
  averageTime?: number;
  averageReps?: number;
  rxPercentage: number;
  scaledPercentage: number;
  beginnerPercentage: number;
  previousPerformance?: {
    date: string;
    averageTime?: number;
    averageReps?: number;
  };
}

// Equipamiento común
export const mockEquipment: Equipment[] = [
  { id: 'barbell', name: 'Barbell' },
  { id: 'pullup-bar', name: 'Pull-up Bar' },
  { id: 'rower', name: 'Rower' },
  { id: 'assault-bike', name: 'Assault Bike' },
  { id: 'box', name: 'Box' },
  { id: 'kettlebell', name: 'Kettlebell' },
  { id: 'dumbbells', name: 'Dumbbells' },
  { id: 'rings', name: 'Rings' },
  { id: 'wall-ball', name: 'Wall Ball' },
  { id: 'rope', name: 'Jump Rope' },
  { id: 'slam-ball', name: 'Slam Ball' },
];

// Movimientos básicos
export const mockMovements: Movement[] = [
  {
    id: 'thruster',
    name: 'Thruster',
    videoUrl: 'https://www.youtube.com/watch?v=L219ltL15zk',
    description: 'Front squat combinado con push press',
    technicalCues: ['Codos altos', 'Peso en talones', 'Extensión completa arriba'],
    scalingOptions: ['Peso reducido', 'Front Squat + Press separados', 'Goblet Squat + Press'],
  },
  {
    id: 'pullup',
    name: 'Pull-up',
    videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
    description: 'Jalón hasta barbilla sobre la barra',
    scalingOptions: ['Banda asistida', 'Jumping Pull-ups', 'Ring Rows'],
  },
  {
    id: 'box-jump',
    name: 'Box Jump',
    description: 'Salto sobre caja',
    scalingOptions: ['Box altura reducida', 'Step-ups', 'Saltos al suelo'],
  },
];

// 30 días de WODs variados
const today = new Date();
const mockWods: Wod[] = [
  // Girl WOD: Fran
  {
    id: 'wod-fran',
    date: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'Fran',
    type: 'Girl WOD',
    description: `21-15-9 (For Time)
• Thrusters (95/65 lbs)
• Pull-ups

Time Cap: 10 minutes`,
    stimulus: 'Uno de los WODs más icónicos de CrossFit. Debe ser rápido e intenso. Mantén movimientos fluidos y minimiza el descanso.',
    estimatedDuration: 8,
    timeCap: 10,
    targetHeartRate: { min: 85, max: 95 },
    equipmentNeeded: ['barbell', 'pullup-bar'],
    scaling: {
      rx: '21-15-9 • Thrusters (95/65 lbs) • Pull-ups',
      scaled: '21-15-9 • Thrusters (65/45 lbs) • Banded Pull-ups',
      beginner: '15-12-9 • Thrusters (45/35 lbs) • Ring Rows',
    },
    media: {
      videoUrl: 'https://www.youtube.com/watch?v=MdACw9V_U0c',
    },
    coachNotes: {
      warmup: 'Movilidad de hombros y caderas. Práctica de thrusters con barra vacía.',
      strategy: [
        'Romper los 21s en sets pequeños (7-7-7 o 11-10)',
        'No ir al fallo en pull-ups',
        'Respiración controlada en transiciones',
      ],
      technicalFocus: [
        'Codos altos en thrusters',
        'Kipping eficiente en pull-ups',
        'Transiciones rápidas entre movimientos',
      ],
      cooldown: 'Estiramiento de hombros y espalda baja. 5min easy row.',
    },
    isPublished: true,
    publishedAt: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    isBenchmark: true,
    benchmarkType: 'Girl',
    lastPerformed: new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Coach Mike',
    createdAt: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000).toISOString(),
  },
  // Hero WOD: Murph
  {
    id: 'wod-murph',
    date: new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'Murph',
    type: 'Hero WOD',
    description: `For Time (con chaleco 20/14 lbs):
1 Mile Run
100 Pull-ups
200 Push-ups
300 Air Squats
1 Mile Run

Time Cap: 60 minutes`,
    stimulus: 'Un WOD de resistencia mental y física. Ritmo constante es clave.',
    estimatedDuration: 45,
    timeCap: 60,
    targetHeartRate: { min: 70, max: 85 },
    equipmentNeeded: ['pullup-bar'],
    scaling: {
      rx: 'Como se describe con chaleco',
      scaled: 'Sin chaleco. Partición permitida (5 rounds: 20 pull-ups, 40 push-ups, 60 squats)',
      beginner: 'Media Murph: 800m run, 50-100-150, 800m run. Sin chaleco.',
    },
    media: {
      videoUrl: 'https://www.youtube.com/watch?v=4dtkPIzZGV8',
    },
    coachNotes: {
      warmup: 'Calentamiento extenso. 10min easy run + movilidad dinámica.',
      strategy: [
        'Primer run controlado (no más de 80% esfuerzo)',
        'Particionar gimnásticos: 5 rounds de 20-40-60 o 10 rounds de 10-20-30',
        'Mantener ritmo constante, no sprint final',
      ],
      technicalFocus: [
        'Economía de movimiento en gimnásticos',
        'Respiración profunda y controlada',
        'Hidratación durante el WOD',
      ],
      cooldown: 'Caminata ligera 5min. Estiramiento completo 10min.',
    },
    isPublished: true,
    publishedAt: new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    isBenchmark: true,
    benchmarkType: 'Hero',
    heroStory: 'En honor al Teniente Michael Murphy, Navy SEAL, fallecido en Afganistán el 28 de junio de 2005.',
    lastPerformed: new Date(today.getTime() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    createdBy: 'Coach Sarah',
    createdAt: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000).toISOString(),
  },
  // AMRAP de piernas
  {
    id: 'wod-leg-burner',
    date: new Date(today.getTime() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'Leg Burner',
    type: 'AMRAP',
    description: `AMRAP 20 minutes:
15 Wall Balls (20/14 lbs)
12 Box Jumps (24/20")
9 Kettlebell Swings (53/35 lbs)
6 Burpees`,
    stimulus: 'Trabajo de piernas con acondicionamiento metabólico. Ritmo sostenible.',
    estimatedDuration: 20,
    targetHeartRate: { min: 75, max: 85 },
    equipmentNeeded: ['wall-ball', 'box', 'kettlebell'],
    scaling: {
      rx: 'Como se describe',
      scaled: 'Wall Ball (14/10 lbs), Box (20/16"), KB (35/26 lbs)',
      beginner: 'Wall Ball (10 lbs a 9ft), Step-ups, KB (26/18 lbs), 4 Burpees',
    },
    media: {
      videoUrl: 'https://www.youtube.com/watch?v=fpUD0ad9hWE',
    },
    coachNotes: {
      warmup: 'Movilidad de cadera y tobillos. 2 rounds de 10 wall balls, 5 box jumps, 10 KB swings.',
      strategy: [
        'Buscar 4-5 rounds completos',
        'Wall balls sin romper en primeros rounds',
        'Box jumps controlados (evitar lesiones)',
      ],
      technicalFocus: [
        'Profundidad en squat de wall ball',
        'Extensión completa de cadera en KB swings',
        'Aterrizaje suave en box jumps',
      ],
    },
    isPublished: true,
    publishedAt: new Date(today.getTime() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    isBenchmark: false,
    createdBy: 'Coach Mike',
    createdAt: new Date(today.getTime() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 27 * 24 * 60 * 60 * 1000).toISOString(),
  },
  // Strength Focus
  {
    id: 'wod-squat-strength',
    date: new Date(today.getTime() - 26 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'Squat Strength',
    type: 'Strength',
    description: `Back Squat
5-5-5-5-5 @ 75-80% 1RM

Rest 2-3min between sets

Then:
3 rounds NOT for time:
20 Walking Lunges
15 GHD Sit-ups
10 Box Step-ups (heavy)`,
    stimulus: 'Desarrollo de fuerza en patrón de squat. Volumen moderado-alto.',
    estimatedDuration: 35,
    targetHeartRate: { min: 60, max: 75 },
    equipmentNeeded: ['barbell', 'box'],
    scaling: {
      rx: 'Como se describe',
      scaled: 'Front Squat 5x5 @ 70%, Lunges sin peso, Abmat Sit-ups',
      beginner: 'Goblet Squat 5x8, Lunges cortos, Sit-ups normales',
    },
    coachNotes: {
      warmup: 'Movilidad extensiva de cadera. Ramp up gradual en squats (barra vacía → 50% → 65%).',
      strategy: [
        'Mantener mismo peso en todas las series si es posible',
        'Priorizar técnica sobre peso',
        'Trabajo accesorio NO es para tiempo, controlar movimientos',
      ],
      technicalFocus: [
        'Profundidad completa en squats',
        'Espalda neutra todo el rango',
        'Control excéntrico (bajada de 2-3 segundos)',
      ],
      cooldown: 'Foam roll quads y glúteos. Estiramiento de hip flexors.',
    },
    isPublished: true,
    publishedAt: new Date(today.getTime() - 26 * 24 * 60 * 60 * 1000).toISOString(),
    isBenchmark: false,
    createdBy: 'Coach Sarah',
    createdAt: new Date(today.getTime() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 26 * 24 * 60 * 60 * 1000).toISOString(),
  },
  // EMOM variado
  {
    id: 'wod-emom-mix',
    date: new Date(today.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'Triple Threat',
    type: 'EMOM',
    description: `EMOM 24 minutes (8 rounds):
Minute 1: 15/12 Cal Row
Minute 2: 12 Dumbbell Thrusters (50/35 lbs)
Minute 3: 15 Toes-to-Bar`,
    stimulus: 'Mantener consistencia en los 8 rounds. El desafío es mental.',
    estimatedDuration: 24,
    targetHeartRate: { min: 80, max: 90 },
    equipmentNeeded: ['rower', 'dumbbells', 'pullup-bar'],
    scaling: {
      rx: 'Como se describe',
      scaled: '12/10 Cal Row, DB Thrusters (35/20 lbs), Hanging Knee Raises',
      beginner: '10/8 Cal Row, DB Thrusters (25/15 lbs), Abmat Sit-ups',
    },
    media: {
      videoUrl: 'https://www.youtube.com/watch?v=GJGe5yQoLI4',
    },
    coachNotes: {
      warmup: '500m easy row. Movilidad de hombros. Práctica de cada movimiento.',
      strategy: [
        'Row: no ir demasiado fuerte al inicio, ritmo de 80-85%',
        'Thrusters: sin romper si es posible',
        'T2B: sets de 5-10 según capacidad',
        'Objetivo: terminar cada estación con 10-15seg de descanso',
      ],
      technicalFocus: [
        'Tiempos de remo eficientes (stroke rate 26-30)',
        'Ciclos fluidos en thrusters',
        'Kip controlado en T2B',
      ],
    },
    isPublished: true,
    publishedAt: new Date(today.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    isBenchmark: false,
    createdBy: 'Coach Mike',
    createdAt: new Date(today.getTime() - 26 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
  },
  // Chipper largo
  {
    id: 'wod-chipper-long',
    date: new Date(today.getTime() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    name: 'The Gauntlet',
    type: 'Chipper',
    description: `For Time:
50 Double Unders
40 Wall Balls (20/14 lbs)
30 Box Jumps (24/20")
20 Pull-ups
10 Thrusters (95/65 lbs)
20 Pull-ups
30 Box Jumps
40 Wall Balls
50 Double Unders

Time Cap: 30 minutes`,
    stimulus: 'Resistencia y gestión de fatiga. "Chip away" en bloques pequeños.',
    estimatedDuration: 25,
    timeCap: 30,
    targetHeartRate: { min: 75, max: 85 },
    equipmentNeeded: ['rope', 'wall-ball', 'box', 'pullup-bar', 'barbell'],
    scaling: {
      rx: 'Como se describe',
      scaled: '100 Singles, WB (14/10), Box (20/16"), Banded Pull-ups, Thrusters (65/45)',
      beginner: '50 Singles, WB (10 lbs), Step-ups, Ring Rows, Thrusters (45/35) - cada movimiento reducido 50%',
    },
    coachNotes: {
      warmup: 'Calentamiento general 10min. Práctica de double unders.',
      strategy: [
        'No sprint al inicio, ritmo de maratón',
        'Romper movimientos grandes en sets manejables',
        'Minimizar tiempo de transición',
      ],
      technicalFocus: [
        'Ritmo constante en cada movimiento',
        'No ir al fallo',
        'Respiración controlada',
      ],
      cooldown: 'Estiramientos generales. Foam roll.',
    },
    isPublished: true,
    publishedAt: new Date(today.getTime() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    isBenchmark: false,
    createdBy: 'Coach Sarah',
    createdAt: new Date(today.getTime() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 24 * 24 * 60 * 60 * 1000).toISOString(),
  },
  // WOD de hoy (más reciente)
  {
    id: 'wod-today',
    date: today.toISOString(),
    name: 'Monday Madness',
    type: 'For Time',
    description: `3 Rounds For Time:
400m Run
21 Kettlebell Swings (53/35 lbs)
12 Pull-ups

Time Cap: 20 minutes`,
    stimulus: 'Salida de fin de semana. Cardio + gimnástico con peso ligero. Debe ser rápido.',
    estimatedDuration: 15,
    timeCap: 20,
    targetHeartRate: { min: 80, max: 90 },
    equipmentNeeded: ['kettlebell', 'pullup-bar'],
    scaling: {
      rx: 'Como se describe',
      scaled: '300m Run, KB Swings (35/26 lbs), Banded Pull-ups',
      beginner: '200m Run, KB Swings (26/18 lbs), Ring Rows',
    },
    media: {
      videoUrl: 'https://www.youtube.com/watch?v=3ERuhks3GKo',
    },
    coachNotes: {
      warmup: '800m easy jog. Movilidad dinámica. 2 rounds: 10 KB swings, 5 pull-ups.',
      strategy: [
        'Runs controlados pero fuertes (85-90%)',
        'KB swings unbroken si es posible',
        'Pull-ups en sets de 6-6 o 4-4-4',
        'Objetivo: sub-15min',
      ],
      technicalFocus: [
        'Extensión completa de cadera en KB swings',
        'Kipping eficiente en pull-ups',
        'Transiciones rápidas',
      ],
      cooldown: 'Walk 5min. Estiramiento de hombros y piernas.',
    },
    isPublished: true,
    publishedAt: today.toISOString(),
    isBenchmark: false,
    createdBy: 'Coach Mike',
    createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: today.toISOString(),
  },
];

// Resultados mock
export const mockResults: WodResult[] = [
  {
    id: 'result-1',
    wodId: 'wod-today',
    userId: 'user-1',
    userName: 'John Smith',
    result: '12:45',
    scalingUsed: 'RX',
    submittedAt: new Date().toISOString(),
    validatedByCoach: true,
  },
  {
    id: 'result-2',
    wodId: 'wod-today',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    result: '13:22',
    scalingUsed: 'RX',
    submittedAt: new Date().toISOString(),
    validatedByCoach: true,
  },
  {
    id: 'result-3',
    wodId: 'wod-today',
    userId: 'user-3',
    userName: 'Mike Davis',
    result: '15:10',
    scalingUsed: 'Scaled',
    submittedAt: new Date().toISOString(),
  },
  {
    id: 'result-4',
    wodId: 'wod-today',
    userId: 'user-4',
    userName: 'Emily Chen',
    result: '11:38',
    scalingUsed: 'RX',
    submittedAt: new Date().toISOString(),
    validatedByCoach: true,
  },
];

// Comentarios mock
export const mockComments: WodComment[] = [
  {
    id: 'comment-1',
    wodId: 'wod-today',
    userId: 'user-1',
    userName: 'John Smith',
    userAvatar: '👨',
    comment: '¡Qué WOD brutal! Los KB swings me mataron en el round 3. 💪',
    reactions: { '💪': 5, '🔥': 3 },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'comment-2',
    wodId: 'wod-today',
    userId: 'user-2',
    userName: 'Sarah Johnson',
    userAvatar: '👩',
    comment: 'PR en este WOD! La estrategia de romper los pull-ups funcionó perfecto.',
    reactions: { '🎉': 8, '👏': 4 },
    createdAt: new Date().toISOString(),
  },
];

export const getMockWod = (): Wod => {
  return mockWods[mockWods.length - 1]; // Retorna el WOD de hoy
};

export const getAllMockWods = (): Wod[] => {
  return mockWods;
};

export const getWodByDate = (date: string): Wod | undefined => {
  return mockWods.find(wod => wod.date.split('T')[0] === date.split('T')[0]);
};

export const getBenchmarkWods = (): Wod[] => {
  return mockWods.filter(wod => wod.isBenchmark);
};

export const getResultsByWodId = (wodId: string): WodResult[] => {
  return mockResults.filter(result => result.wodId === wodId);
};

export const getCommentsByWodId = (wodId: string): WodComment[] => {
  return mockComments.filter(comment => comment.wodId === wodId);
};

export const getWodStats = (wodId: string): WodStats => {
  const results = getResultsByWodId(wodId);
  const totalResults = results.length;
  const rxCount = results.filter(r => r.scalingUsed === 'RX').length;
  const scaledCount = results.filter(r => r.scalingUsed === 'Scaled').length;
  const beginnerCount = results.filter(r => r.scalingUsed === 'Beginner').length;

  return {
    wodId,
    completedBy: totalResults,
    rxPercentage: totalResults > 0 ? (rxCount / totalResults) * 100 : 0,
    scaledPercentage: totalResults > 0 ? (scaledCount / totalResults) * 100 : 0,
    beginnerPercentage: totalResults > 0 ? (beginnerCount / totalResults) * 100 : 0,
  };
};

export const getWodTemplate = (type: WodType): string => {
  switch (type) {
    case 'AMRAP':
      return `AMRAP XX minutes:
• X Reps of Exercise A
• X Reps of Exercise B
• X Reps of Exercise C`;
    case 'For Time':
      return `X Rounds For Time:
• X Reps of Exercise A
• X Reps of Exercise B
• X Reps of Exercise C

Time Cap: XX minutes`;
    case 'EMOM':
      return `EMOM XX minutes:
Minute 1: Exercise A
Minute 2: Exercise B
Minute 3: Exercise C`;
    case 'Chipper':
      return `For Time:
• XX Reps Exercise A
• XX Reps Exercise B
• XX Reps Exercise C
• XX Reps Exercise D

Time Cap: XX minutes`;
    case 'Strength':
      return `Exercise Name
X-X-X-X-X @ XX% 1RM

Rest X minutes between sets`;
    case 'Girl WOD':
    case 'Hero WOD':
      return 'Selecciona un benchmark WOD de la biblioteca o crea uno personalizado.';
    default:
      return '';
  }
};

// Advanced Functionalities Endpoints (Mock)

export const getSuggestedWods = async (): Promise<Wod[]> => {
  console.log('Fetching AI suggested WODs...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'ai-wod-1', type: 'Custom', description: 'AI Suggested WOD: Focus on Legs and Core' },
        { id: 'ai-wod-2', type: 'AMRAP', description: 'AI Suggested WOD: Upper Body Blast AMRAP 15' },
      ]);
    }, 500);
  });
};

export const getExerciseLibrary = async (): Promise<any[]> => {
  console.log('Fetching exercise library...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'ex-1', name: 'Squat', videoUrl: 'https://example.com/squat.mp4' },
        { id: 'ex-2', name: 'Push-up', videoUrl: 'https://example.com/pushup.mp4' },
      ]);
    }, 500);
  });
};

export const getScaledWod = async (wodId: string, level: string): Promise<Wod> => {
  console.log(`Scaling WOD ${wodId} for level ${level}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: wodId, type: 'Custom', description: `Scaled WOD for ${level}: ${wodId} (modified)` });
    }, 500);
  });
};

export const submitWodRating = async (wodId: string, rating: number, comment: string): Promise<string> => {
  console.log(`Submitting rating for WOD ${wodId}: ${rating} - ${comment}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Rating submitted successfully!');
    }, 500);
  });
};

export const getWearableData = async (userId: string): Promise<any> => {
  console.log(`Fetching wearable data for user ${userId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ heartRate: 120, caloriesBurned: 500, duration: 60 });
    }, 500);
  });
};

export const getWeeklyChallenges = async (): Promise<any[]> => {
  console.log('Fetching weekly challenges...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'challenge-1', name: 'Push-up Challenge', description: 'Complete 100 push-ups in a week.' },
        { id: 'challenge-2', name: 'Running Challenge', description: 'Run 10km in a week.' },
      ]);
    }, 500);
  });
};

export const getDifficultyProgression = async (userId: string): Promise<any> => {
  console.log(`Fetching difficulty progression for user ${userId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ currentLevel: 'Intermediate', nextLevelProgress: 75 });
    }, 500);
  });
};

export const getCollaborativeWods = async (): Promise<Wod[]> => {
  console.log('Fetching collaborative WODs...');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'collab-wod-1', type: 'Custom', description: 'Gym A vs Gym B Challenge WOD' },
        { id: 'collab-wod-2', type: 'For Time', description: 'Community Hero WOD' },
      ]);
    }, 500);
  });
};

export const getUserBadges = async (userId: string): Promise<any[]> => {
  console.log(`Fetching badges for user ${userId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'badge-1', name: 'First WOD', imageUrl: 'https://example.com/badge1.png' },
        { id: 'badge-2', name: 'Ironman', imageUrl: 'https://example.com/badge2.png' },
      ]);
    }, 500);
  });
};

export const getTrainingPatterns = async (userId: string): Promise<any> => {
  console.log(`Fetching training patterns for user ${userId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ favoriteMovements: ['Squat', 'Deadlift'], peakPerformanceDays: ['Monday', 'Wednesday'] });
    }, 500);
  });
};

export const saveCustomWod = async (wod: Wod): Promise<string> => {
  console.log(`Saving custom WOD: ${wod.id}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Custom WOD saved successfully!');
    }, 500);
  });
};

export const get3DExerciseView = async (exerciseId: string): Promise<string> => {
  console.log(`Fetching 3D view for exercise ${exerciseId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`3D model data for exercise ${exerciseId}`);
    }, 500);
  });
};

export const startMotivationalTimer = async (duration: number): Promise<string> => {
  console.log(`Starting motivational timer for ${duration} minutes...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Motivational timer started!');
    }, 500);
  });
};

export const shareWodSocial = async (wodId: string, platform: string): Promise<string> => {
  console.log(`Sharing WOD ${wodId} on ${platform}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('WOD shared successfully on social media!');
    }, 500);
  });
};

export const startCoachMode = async (coachId: string): Promise<string> => {
  console.log(`Starting coach mode for coach ${coachId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Coach mode activated, live broadcasting started!');
    }, 500);
  });
};

export const getAugmentedRealityDemo = async (exerciseId: string): Promise<string> => {
  console.log(`Fetching AR demo for exercise ${exerciseId}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`AR demonstration data for exercise ${exerciseId}`);
    }, 500);
  });
};
