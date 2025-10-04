export interface Exercise {
  id: string;
  name: string;
  category: 'fuerza' | 'cardio' | 'movilidad' | 'correctivo';
  muscleGroup: string;
  variants?: string[];
  isAntagonist?: boolean;
  laterality?: 'left' | 'right' | 'bilateral';
}

export interface TrainingBlock {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface Progression {
  week: number;
  load: number;
  volume: number;
}

export interface BalanceIndicator {
  name: string;
  value: number;
  target: number;
  unit: string;
}

export interface StrengthRatios {
  squat: number; // 1RM estimate
  deadlift: number;
  benchPress: number;
}

export interface WeeklyVolume {
  muscleGroup: string;
  minSets: number;
  maxSets: number;
}

export interface OptimalFrequency {
  muscleGroup: string;
  minPerWeek: number;
  maxPerWeek: number;
}

export interface AdherenceData {
  date: string;
  compliancePercentage: number;
}

export interface RecoveryMetrics {
  hrv: number; // Heart Rate Variability (simulated in ms)
  sleepHours: number;
  stressLevel: number; // 1-10 scale
}

const mockExercises: Exercise[] = [
  { id: 'ex1', name: 'Sentadilla', category: 'fuerza', muscleGroup: 'quads', variants: ['Sentadilla frontal', 'Sentadilla búlgara'], laterality: 'bilateral' },
  { id: 'ex2', name: 'Press Banca', category: 'fuerza', muscleGroup: 'chest', variants: ['Press inclinado', 'Flexiones'], laterality: 'bilateral' },
  { id: 'ex3', name: 'Peso Muerto', category: 'fuerza', muscleGroup: 'hamstrings', variants: ['Peso muerto rumano', 'Buenos días'], laterality: 'bilateral' },
  { id: 'ex4', name: 'Remo con Barra', category: 'fuerza', muscleGroup: 'back', variants: ['Remo Gironda', 'Remo con mancuerna'], laterality: 'bilateral' },
  { id: 'ex5', name: 'Press Militar', category: 'fuerza', muscleGroup: 'shoulders', laterality: 'bilateral' },
  { id: 'ex6', name: 'Curl de Biceps', category: 'fuerza', muscleGroup: 'biceps', laterality: 'bilateral' },
  { id: 'ex7', name: 'Extension de Triceps', category: 'fuerza', muscleGroup: 'triceps', laterality: 'bilateral' },
  { id: 'ex8', name: 'Zancadas', category: 'fuerza', muscleGroup: 'quads', laterality: 'bilateral' },
  { id: 'ex9', name: 'Face Pulls', category: 'correctivo', muscleGroup: 'shoulders', variants: ['Band Pull-Aparts'] },
  { id: 'ex10', name: 'Rotación Externa con Banda', category: 'correctivo', muscleGroup: 'shoulders' },
  { id: 'ex11', name: 'Paseo del Granjero', category: 'fuerza', muscleGroup: 'core', laterality: 'bilateral' },
  { id: 'ex12', name: 'Hip Thrust', category: 'fuerza', muscleGroup: 'glutes', laterality: 'bilateral' },
  { id: 'ex13', name: 'Elevaciones Laterales', category: 'fuerza', muscleGroup: 'shoulders', laterality: 'bilateral' },
  { id: 'ex14', name: 'Remo Unilateral Mancuerna Derecha', category: 'fuerza', muscleGroup: 'back', laterality: 'right' },
  { id: 'ex15', name: 'Remo Unilateral Mancuerna Izquierda', category: 'fuerza', muscleGroup: 'back', laterality: 'left' },
];

const mockTrainingBlocks: TrainingBlock[] = [
  { id: 'block1', name: 'Día de Pierna y Empuje', exercises: [mockExercises[0], mockExercises[2], mockExercises[11], mockExercises[1], mockExercises[4]] },
  { id: 'block2', name: 'Día de Tirón y Corrección', exercises: [mockExercises[3], mockExercises[13], mockExercises[14], mockExercises[5], mockExercises[8], mockExercises[9]] },
  { id: 'block3', name: 'Día Full Body', exercises: [mockExercises[0], mockExercises[1], mockExercises[3], mockExercises[6], mockExercises[12]] },
];

const mockProgressions: Progression[] = [
  { week: 1, load: 100, volume: 500 }, // Example for a specific lift, e.g., Squat
  { week: 2, load: 102.5, volume: 510 },
  { week: 3, load: 105, volume: 520 },
  { week: 4, load: 107.5, volume: 530 },
];

const mockBalanceIndicators: BalanceIndicator[] = [
  { name: 'Tren Superior / Inferior', value: 0.95, target: 1, unit: 'ratio' },
  { name: 'Empuje / Tirón', value: 0.85, target: 1, unit: 'ratio' },
  { name: 'Cuádriceps / Isquiotibiales', value: 1.1, target: 1, unit: 'ratio' },
  { name: 'Core', value: 0.8, target: 1, unit: 'ratio' },
  { name: 'Movilidad de Hombro', value: 70, target: 90, unit: '%' },
];

const mockStrengthRatios: StrengthRatios = {
  squat: 120, // 1RM estimate in kg
  deadlift: 140,
  benchPress: 100,
};

const mockWeeklyVolumes: WeeklyVolume[] = [
  { muscleGroup: 'chest', minSets: 12, maxSets: 20 },
  { muscleGroup: 'back', minSets: 12, maxSets: 20 },
  { muscleGroup: 'shoulders', minSets: 8, maxSets: 15 },
  { muscleGroup: 'quads', minSets: 10, maxSets: 18 },
  { muscleGroup: 'hamstrings', minSets: 8, maxSets: 15 },
  { muscleGroup: 'biceps', minSets: 6, maxSets: 12 },
  { muscleGroup: 'triceps', minSets: 6, maxSets: 12 },
  { muscleGroup: 'glutes', minSets: 10, maxSets: 18 },
];

const mockOptimalFrequencies: OptimalFrequency[] = [
  { muscleGroup: 'chest', minPerWeek: 2, maxPerWeek: 3 },
  { muscleGroup: 'back', minPerWeek: 2, maxPerWeek: 3 },
  { muscleGroup: 'shoulders', minPerWeek: 2, maxPerWeek: 3 },
  { muscleGroup: 'quads', minPerWeek: 2, maxPerWeek: 3 },
  { muscleGroup: 'hamstrings', minPerWeek: 2, maxPerWeek: 3 },
  { muscleGroup: 'biceps', minPerWeek: 2, maxPerWeek: 3 },
  { muscleGroup: 'triceps', minPerWeek: 2, maxPerWeek: 3 },
  { muscleGroup: 'glutes', minPerWeek: 2, maxPerWeek: 3 },
];

const mockCorrectiveExercises: Exercise[] = [
  { id: 'corr1', name: 'Band Pull-Aparts', category: 'correctivo', muscleGroup: 'shoulders' },
  { id: 'corr2', name: 'Face Pulls', category: 'correctivo', muscleGroup: 'shoulders' },
  { id: 'corr3', name: 'Rotación Externa con Mancuerna', category: 'correctivo', muscleGroup: 'shoulders' },
  { id: 'corr4', name: 'Estiramiento de Psoas', category: 'movilidad', muscleGroup: 'core' },
  { id: 'corr5', name: 'Activación de Glúteo Medio', category: 'correctivo', muscleGroup: 'glutes' },
];

const mockAdherenceData: AdherenceData[] = [
  { date: '2025-09-01', compliancePercentage: 75 },
  { date: '2025-09-08', compliancePercentage: 80 },
  { date: '2025-09-15', compliancePercentage: 70 },
  { date: '2025-09-22', compliancePercentage: 85 },
];

const mockRecoveryMetrics: RecoveryMetrics = {
  hrv: 55, // ms
  sleepHours: 7.2,
  stressLevel: 4,
};

export const agenteEntrenadorApi = {
  getExercises: (): Exercise[] => mockExercises,
  getTrainingBlocks: (): TrainingBlock[] => mockTrainingBlocks,
  getProgressions: (): Progression[] => mockProgressions,
  getBalanceIndicators: (): BalanceIndicator[] => mockBalanceIndicators,
  getStrengthRatios: (): StrengthRatios => mockStrengthRatios,
  getWeeklyVolumes: (): WeeklyVolume[] => mockWeeklyVolumes,
  getOptimalFrequencies: (): OptimalFrequency[] => mockOptimalFrequencies,
  getCorrectiveExercises: (): Exercise[] => mockCorrectiveExercises,
  getAdherenceData: (): AdherenceData[] => mockAdherenceData,
  getRecoveryMetrics: (): RecoveryMetrics => mockRecoveryMetrics,
};