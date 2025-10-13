import { Client, Exercise, ExerciseBlock, ExerciseHistory, TrainingGoal, TrainingType } from '../types/training.types';

export const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    avatar: '👨',
    lastSession: 'Hace 2 días',
    level: 'intermediate',
    email: 'juan@example.com',
    phone: '+34 600 123 456'
  },
];

export const MOCK_EXERCISES: Exercise[] = [
  { id: 'e1', name: 'Sentadilla con Barra', muscleGroup: 'Piernas', muscleGroups: ['Cuádriceps', 'Glúteos'], image: '🏋️', equipment: 'Barra' },
  { id: 'e2', name: 'Press de Banca', muscleGroup: 'Pecho', muscleGroups: ['Pecho', 'Tríceps'], image: '💪', equipment: 'Barra' },
  { id: 'e3', name: 'Peso Muerto', muscleGroup: 'Espalda', muscleGroups: ['Espalda Baja', 'Isquios', 'Glúteos'], image: '🏋️‍♀️', equipment: 'Barra' },
  { id: 'e4', name: 'Press Militar', muscleGroup: 'Hombros', muscleGroups: ['Hombros', 'Tríceps'], image: '🦾', equipment: 'Barra' },
  { id: 'e5', name: 'Remo con Barra', muscleGroup: 'Espalda', muscleGroups: ['Espalda Dorsal', 'Bíceps'], image: '💪', equipment: 'Barra' },
  { id: 'e6', name: 'Dominadas', muscleGroup: 'Espalda', muscleGroups: ['Espalda Dorsal', 'Bíceps'], image: '🤸', equipment: 'Peso corporal' },
  { id: 'e7', name: 'Fondos', muscleGroup: 'Pecho', muscleGroups: ['Pecho', 'Tríceps'], image: '🤸‍♂️', equipment: 'Peso corporal' },
  { id: 'e8', name: 'Curl de Bíceps', muscleGroup: 'Brazos', muscleGroups: ['Bíceps'], image: '💪', equipment: 'Mancuernas' },
  { id: 'e9', name: 'Extensión de Tríceps', muscleGroup: 'Brazos', muscleGroups: ['Tríceps'], image: '💪', equipment: 'Polea' },
  { id: 'e10', name: 'Elevaciones Laterales', muscleGroup: 'Hombros', muscleGroups: ['Hombros'], image: '🦾', equipment: 'Mancuernas' },
  { id: 'e11', name: 'Press Inclinado', muscleGroup: 'Pecho', muscleGroups: ['Pecho', 'Hombros'], image: '💪', equipment: 'Barra' },
  { id: 'e12', name: 'Zancadas', muscleGroup: 'Piernas', muscleGroups: ['Cuádriceps', 'Glúteos'], image: '🏃', equipment: 'Mancuernas' },
];

export const EXERCISE_BLOCKS: ExerciseBlock[] = [
  {
    id: 'block1',
    name: '5/3/1 Main Lifts',
    description: 'Los 4 levantamientos principales del 5/3/1',
    tags: ['fuerza', 'básico'],
    exercises: [
      { exerciseId: 'e1', sets: 3, reps: '5/3/1', rest: 180, rpe: 9 },
      { exerciseId: 'e2', sets: 3, reps: '5/3/1', rest: 180, rpe: 9 },
      { exerciseId: 'e3', sets: 3, reps: '5/3/1', rest: 180, rpe: 9 },
      { exerciseId: 'e4', sets: 3, reps: '5/3/1', rest: 180, rpe: 9 },
    ]
  },
  {
    id: 'block2',
    name: 'PPL Push',
    description: 'Día de empuje completo',
    tags: ['push', 'hipertrofia'],
    exercises: [
      { exerciseId: 'e2', sets: 4, reps: '8-10', rest: 120, rpe: 8 },
      { exerciseId: 'e11', sets: 3, reps: '10-12', rest: 90, rpe: 7 },
      { exerciseId: 'e4', sets: 3, reps: '10-12', rest: 90, rpe: 7 },
      { exerciseId: 'e10', sets: 3, reps: '12-15', rest: 60, rpe: 7 },
      { exerciseId: 'e9', sets: 3, reps: '12-15', rest: 60, rpe: 7 },
    ]
  },
  {
    id: 'block3',
    name: 'Leg Day Volume',
    description: 'Pierna enfocada en hipertrofia',
    tags: ['piernas', 'hipertrofia'],
    exercises: [
      { exerciseId: 'e1', sets: 4, reps: '8-10', rest: 120, rpe: 8 },
      { exerciseId: 'e12', sets: 3, reps: '10-12', rest: 90, rpe: 7 },
      { exerciseId: 'e3', sets: 3, reps: '10-12', rest: 120, rpe: 8 },
    ]
  },
  {
    id: 'block4',
    name: 'PPL Pull',
    description: 'Día de tirón completo',
    tags: ['pull', 'hipertrofia'],
    exercises: [
      { exerciseId: 'e3', sets: 4, reps: '6-8', rest: 150, rpe: 8 },
      { exerciseId: 'e5', sets: 4, reps: '8-10', rest: 120, rpe: 8 },
      { exerciseId: 'e6', sets: 3, reps: '8-12', rest: 120, rpe: 7 },
      { exerciseId: 'e8', sets: 3, reps: '10-12', rest: 60, rpe: 7 },
    ]
  }
];

export const GOALS = [
  { id: 'muscle' as TrainingGoal, label: 'Ganar Masa Muscular', icon: '💪', color: 'bg-blue-500' },
  { id: 'fat-loss' as TrainingGoal, label: 'Perder Grasa', icon: '🔥', color: 'bg-red-500' },
  { id: 'strength' as TrainingGoal, label: 'Fuerza Máxima', icon: '⚡', color: 'bg-yellow-500' },
  { id: 'endurance' as TrainingGoal, label: 'Resistencia', icon: '🏃', color: 'bg-green-500' },
];

export const TRAINING_TYPES = [
  { id: 'strength' as TrainingType, label: 'Fuerza' },
  { id: 'hypertrophy' as TrainingType, label: 'Hipertrofia' },
  { id: 'crossfit' as TrainingType, label: 'CrossFit' },
  { id: 'functional' as TrainingType, label: 'Funcional' },
];

export const DAYS_OF_WEEK = [
  { id: 'L', label: 'Lunes', short: 'L' },
  { id: 'M', label: 'Martes', short: 'M' },
  { id: 'X', label: 'Miércoles', short: 'X' },
  { id: 'J', label: 'Jueves', short: 'J' },
  { id: 'V', label: 'Viernes', short: 'V' },
  { id: 'S', label: 'Sábado', short: 'S' },
  { id: 'D', label: 'Domingo', short: 'D' },
];

export const MOCK_HISTORY: { [key: string]: ExerciseHistory[] } = {
  'e1': [
    { date: '2025-09-24', weight: 95, sets: 5, reps: '5', rpe: 9 },
    { date: '2025-09-20', weight: 92.5, sets: 5, reps: '5', rpe: 8 },
    { date: '2025-09-17', weight: 90, sets: 5, reps: '5', rpe: 8 },
  ],
  'e2': [
    { date: '2025-09-25', weight: 77.5, sets: 4, reps: '8', rpe: 8 },
    { date: '2025-09-22', weight: 75, sets: 4, reps: '8', rpe: 7 },
    { date: '2025-09-18', weight: 75, sets: 4, reps: '7', rpe: 8 },
  ],
};

// Volumen óptimo por grupo muscular (series por semana)
export const OPTIMAL_VOLUME: { [key: string]: [number, number] } = {
  'Pecho': [10, 20],
  'Espalda Dorsal': [12, 22],
  'Espalda Baja': [6, 12],
  'Hombros': [12, 20],
  'Cuádriceps': [10, 20],
  'Isquios': [8, 16],
  'Glúteos': [8, 16],
  'Bíceps': [8, 16],
  'Tríceps': [10, 18],
};
