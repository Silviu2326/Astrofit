import { TrainingDay, TrainingGoal, TrainingType, Level } from '../types/training.types';

export interface PlanTemplate {
  id: string;
  name: string;
  description: string;
  goal: TrainingGoal;
  type: TrainingType;
  level: Level;
  daysPerWeek: string[];
  duration: number;
  deloadWeeks: number;
  progressionRate: number;
  trainingDays: TrainingDay[];
  tags: string[];
  imageUrl?: string;
}

export const PLAN_TEMPLATES: PlanTemplate[] = [
  // ============================================================================
  // PPL - PUSH/PULL/LEGS (6 días)
  // ============================================================================
  {
    id: 'ppl-6days-hypertrophy',
    name: 'PPL - Push/Pull/Legs (6 días)',
    description: 'Rutina clásica de hipertrofia dividida en empuje, tirón y piernas. Ideal para intermedios/avanzados con disponibilidad de 6 días.',
    goal: 'muscle',
    type: 'hypertrophy',
    level: 'intermediate',
    daysPerWeek: ['L', 'M', 'X', 'J', 'V', 'S'],
    duration: 8,
    deloadWeeks: 4,
    progressionRate: 2.5,
    tags: ['hipertrofia', '6 días', 'volumen alto', 'clásico'],
    trainingDays: [
      {
        day: 'L',
        name: 'Push A - Empuje',
        focus: 'hypertrophy',
        duration: 75,
        exercises: [
          { exerciseId: 'chest001', sets: 4, reps: '8-10', rest: 120, rpe: 8, weight: 80 },
          { exerciseId: 'chest003', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 60 },
          { exerciseId: 'shoulders001', sets: 3, reps: '8-10', rest: 90, rpe: 8, weight: 40 },
          { exerciseId: 'shoulders003', sets: 3, reps: '12-15', rest: 60, rpe: 7, weight: 10 },
          { exerciseId: 'arms004', sets: 3, reps: '12-15', rest: 60, rpe: 7, weight: 30 },
        ]
      },
      {
        day: 'M',
        name: 'Pull A - Tirón',
        focus: 'hypertrophy',
        duration: 75,
        exercises: [
          { exerciseId: 'back001', sets: 4, reps: '5-6', rest: 180, rpe: 9, weight: 120 },
          { exerciseId: 'back003', sets: 3, reps: '8-10', rest: 120, rpe: 8 },
          { exerciseId: 'back005', sets: 4, reps: '8-10', rest: 90, rpe: 8, weight: 70 },
          { exerciseId: 'back009', sets: 3, reps: '15-20', rest: 60, rpe: 7, weight: 15 },
          { exerciseId: 'arms001', sets: 3, reps: '10-12', rest: 60, rpe: 7, weight: 30 },
        ]
      },
      {
        day: 'X',
        name: 'Legs A - Piernas',
        focus: 'hypertrophy',
        duration: 80,
        exercises: [
          { exerciseId: 'legs001', sets: 4, reps: '8-10', rest: 150, rpe: 8, weight: 100 },
          { exerciseId: 'legs002', sets: 3, reps: '8-10', rest: 120, rpe: 8, weight: 80 },
          { exerciseId: 'back002', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 70 },
          { exerciseId: 'legs006', sets: 3, reps: '12-15', rest: 60, rpe: 7, weight: 40 },
          { exerciseId: 'legs010', sets: 4, reps: '15-20', rest: 60, rpe: 8, weight: 50 },
        ]
      },
      {
        day: 'J',
        name: 'Push B - Empuje',
        focus: 'hypertrophy',
        duration: 75,
        exercises: [
          { exerciseId: 'chest002', sets: 4, reps: '8-10', rest: 120, rpe: 8, weight: 35 },
          { exerciseId: 'chest008', sets: 3, reps: '12-15', rest: 90, rpe: 7, weight: 16 },
          { exerciseId: 'shoulders002', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 22 },
          { exerciseId: 'shoulders005', sets: 3, reps: '12-15', rest: 60, rpe: 7, weight: 8 },
          { exerciseId: 'arms005', sets: 3, reps: '12-15', rest: 60, rpe: 7, weight: 20 },
        ]
      },
      {
        day: 'V',
        name: 'Pull B - Tirón',
        focus: 'hypertrophy',
        duration: 75,
        exercises: [
          { exerciseId: 'back004', sets: 3, reps: '8-10', rest: 120, rpe: 8 },
          { exerciseId: 'back006', sets: 4, reps: '10-12', rest: 90, rpe: 7, weight: 30 },
          { exerciseId: 'back008', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 50 },
          { exerciseId: 'shoulders005', sets: 3, reps: '15-20', rest: 60, rpe: 7, weight: 8 },
          { exerciseId: 'arms003', sets: 3, reps: '10-12', rest: 60, rpe: 7, weight: 16 },
        ]
      },
      {
        day: 'S',
        name: 'Legs B - Piernas',
        focus: 'hypertrophy',
        duration: 80,
        exercises: [
          { exerciseId: 'legs003', sets: 3, reps: '10-12', rest: 120, rpe: 8, weight: 20 },
          { exerciseId: 'legs008', sets: 4, reps: '10-12', rest: 120, rpe: 8, weight: 80 },
          { exerciseId: 'legs007', sets: 3, reps: '12-15', rest: 90, rpe: 7, weight: 35 },
          { exerciseId: 'legs004', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 16 },
          { exerciseId: 'core001', sets: 3, reps: '60s', rest: 60, rpe: 7 },
        ]
      },
    ]
  },

  // ============================================================================
  // UPPER/LOWER (4 días)
  // ============================================================================
  {
    id: 'upper-lower-4days',
    name: 'Upper/Lower (4 días)',
    description: 'División superior/inferior para 4 días por semana. Excelente balance entre volumen y recuperación.',
    goal: 'muscle',
    type: 'hypertrophy',
    level: 'intermediate',
    daysPerWeek: ['L', 'M', 'J', 'V'],
    duration: 8,
    deloadWeeks: 4,
    progressionRate: 2.5,
    tags: ['hipertrofia', '4 días', 'balanceado'],
    trainingDays: [
      {
        day: 'L',
        name: 'Upper A - Tren Superior',
        focus: 'hypertrophy',
        duration: 80,
        exercises: [
          { exerciseId: 'chest001', sets: 4, reps: '6-8', rest: 150, rpe: 8, weight: 85 },
          { exerciseId: 'back005', sets: 4, reps: '8-10', rest: 120, rpe: 8, weight: 70 },
          { exerciseId: 'shoulders001', sets: 3, reps: '8-10', rest: 90, rpe: 7, weight: 40 },
          { exerciseId: 'back007', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 50 },
          { exerciseId: 'arms001', sets: 3, reps: '10-12', rest: 60, rpe: 7, weight: 30 },
          { exerciseId: 'arms004', sets: 3, reps: '10-12', rest: 60, rpe: 7, weight: 30 },
        ]
      },
      {
        day: 'M',
        name: 'Lower A - Tren Inferior',
        focus: 'hypertrophy',
        duration: 75,
        exercises: [
          { exerciseId: 'legs001', sets: 4, reps: '6-8', rest: 180, rpe: 9, weight: 110 },
          { exerciseId: 'back002', sets: 3, reps: '8-10', rest: 120, rpe: 8, weight: 80 },
          { exerciseId: 'legs003', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 22 },
          { exerciseId: 'legs007', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 35 },
          { exerciseId: 'legs010', sets: 4, reps: '12-15', rest: 60, rpe: 7, weight: 50 },
        ]
      },
      {
        day: 'J',
        name: 'Upper B - Tren Superior',
        focus: 'hypertrophy',
        duration: 80,
        exercises: [
          { exerciseId: 'chest002', sets: 4, reps: '8-10', rest: 120, rpe: 8, weight: 35 },
          { exerciseId: 'back003', sets: 4, reps: '6-8', rest: 150, rpe: 8 },
          { exerciseId: 'shoulders002', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 22 },
          { exerciseId: 'back006', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 30 },
          { exerciseId: 'arms002', sets: 3, reps: '12-15', rest: 60, rpe: 7, weight: 14 },
          { exerciseId: 'arms005', sets: 3, reps: '12-15', rest: 60, rpe: 7, weight: 20 },
        ]
      },
      {
        day: 'V',
        name: 'Lower B - Tren Inferior',
        focus: 'hypertrophy',
        duration: 75,
        exercises: [
          { exerciseId: 'legs002', sets: 4, reps: '8-10', rest: 150, rpe: 8, weight: 80 },
          { exerciseId: 'back001', sets: 3, reps: '5-6', rest: 180, rpe: 9, weight: 120 },
          { exerciseId: 'legs008', sets: 4, reps: '10-12', rest: 90, rpe: 8, weight: 80 },
          { exerciseId: 'legs004', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 16 },
          { exerciseId: 'core001', sets: 3, reps: '60s', rest: 60, rpe: 7 },
        ]
      },
    ]
  },

  // ============================================================================
  // FULL BODY (3 días) - PRINCIPIANTES
  // ============================================================================
  {
    id: 'fullbody-3days-beginner',
    name: 'Full Body Principiante (3 días)',
    description: 'Rutina de cuerpo completo 3 veces por semana. Perfecta para principiantes o personas con poco tiempo.',
    goal: 'muscle',
    type: 'strength',
    level: 'beginner',
    daysPerWeek: ['L', 'X', 'V'],
    duration: 8,
    deloadWeeks: 4,
    progressionRate: 2.5,
    tags: ['principiante', '3 días', 'cuerpo completo', 'básico'],
    trainingDays: [
      {
        day: 'L',
        name: 'Full Body A',
        focus: 'strength',
        duration: 60,
        exercises: [
          { exerciseId: 'legs001', sets: 3, reps: '8-10', rest: 120, rpe: 7, weight: 60 },
          { exerciseId: 'chest001', sets: 3, reps: '8-10', rest: 120, rpe: 7, weight: 60 },
          { exerciseId: 'back005', sets: 3, reps: '8-10', rest: 90, rpe: 7, weight: 40 },
          { exerciseId: 'shoulders003', sets: 2, reps: '12-15', rest: 60, rpe: 6, weight: 6 },
          { exerciseId: 'core001', sets: 2, reps: '30s', rest: 60, rpe: 6 },
        ]
      },
      {
        day: 'X',
        name: 'Full Body B',
        focus: 'strength',
        duration: 60,
        exercises: [
          { exerciseId: 'back001', sets: 3, reps: '6-8', rest: 150, rpe: 8, weight: 80 },
          { exerciseId: 'chest002', sets: 3, reps: '8-10', rest: 120, rpe: 7, weight: 20 },
          { exerciseId: 'back007', sets: 3, reps: '10-12', rest: 90, rpe: 7, weight: 40 },
          { exerciseId: 'arms001', sets: 2, reps: '10-12', rest: 60, rpe: 6, weight: 15 },
          { exerciseId: 'core003', sets: 2, reps: '15', rest: 60, rpe: 6 },
        ]
      },
      {
        day: 'V',
        name: 'Full Body C',
        focus: 'strength',
        duration: 60,
        exercises: [
          { exerciseId: 'legs002', sets: 3, reps: '8-10', rest: 120, rpe: 7, weight: 60 },
          { exerciseId: 'chest003', sets: 3, reps: '8-10', rest: 120, rpe: 7, weight: 50 },
          { exerciseId: 'back003', sets: 3, reps: '6-8', rest: 120, rpe: 7 },
          { exerciseId: 'shoulders001', sets: 2, reps: '8-10', rest: 90, rpe: 7, weight: 30 },
          { exerciseId: 'core002', sets: 2, reps: '30s', rest: 60, rpe: 6 },
        ]
      },
    ]
  },

  // ============================================================================
  // 5/3/1 STRENGTH (4 días)
  // ============================================================================
  {
    id: '531-strength-4days',
    name: '5/3/1 Wendler (4 días)',
    description: 'Programa de fuerza clásico de Jim Wendler. 4 levantamientos principales con trabajo accesorio.',
    goal: 'strength',
    type: 'powerlifting',
    level: 'advanced',
    daysPerWeek: ['L', 'M', 'J', 'V'],
    duration: 12,
    deloadWeeks: 4,
    progressionRate: 2.5,
    tags: ['fuerza', '4 días', '5/3/1', 'avanzado', 'powerlifting'],
    trainingDays: [
      {
        day: 'L',
        name: 'Press de Banca 5/3/1',
        focus: 'strength',
        duration: 70,
        exercises: [
          { exerciseId: 'chest001', sets: 3, reps: '5/3/1', rest: 180, rpe: 9, weight: 90 },
          { exerciseId: 'chest001', sets: 5, reps: '5', rest: 120, rpe: 7, weight: 70 }, // BBB
          { exerciseId: 'chest003', sets: 3, reps: '10', rest: 90, rpe: 7, weight: 50 },
          { exerciseId: 'arms004', sets: 3, reps: '12', rest: 60, rpe: 7, weight: 25 },
        ]
      },
      {
        day: 'M',
        name: 'Sentadilla 5/3/1',
        focus: 'strength',
        duration: 75,
        exercises: [
          { exerciseId: 'legs001', sets: 3, reps: '5/3/1', rest: 180, rpe: 9, weight: 120 },
          { exerciseId: 'legs001', sets: 5, reps: '5', rest: 150, rpe: 7, weight: 90 }, // BBB
          { exerciseId: 'legs004', sets: 3, reps: '10', rest: 90, rpe: 7, weight: 20 },
          { exerciseId: 'legs010', sets: 3, reps: '15', rest: 60, rpe: 7, weight: 50 },
        ]
      },
      {
        day: 'J',
        name: 'Press Militar 5/3/1',
        focus: 'strength',
        duration: 65,
        exercises: [
          { exerciseId: 'shoulders001', sets: 3, reps: '5/3/1', rest: 180, rpe: 9, weight: 50 },
          { exerciseId: 'shoulders001', sets: 5, reps: '5', rest: 120, rpe: 7, weight: 40 }, // BBB
          { exerciseId: 'shoulders003', sets: 3, reps: '12', rest: 60, rpe: 7, weight: 10 },
          { exerciseId: 'arms001', sets: 3, reps: '12', rest: 60, rpe: 7, weight: 25 },
        ]
      },
      {
        day: 'V',
        name: 'Peso Muerto 5/3/1',
        focus: 'strength',
        duration: 70,
        exercises: [
          { exerciseId: 'back001', sets: 3, reps: '5/3/1', rest: 180, rpe: 9, weight: 140 },
          { exerciseId: 'back001', sets: 5, reps: '5', rest: 150, rpe: 7, weight: 110 }, // BBB
          { exerciseId: 'back005', sets: 3, reps: '10', rest: 90, rpe: 7, weight: 60 },
          { exerciseId: 'core001', sets: 3, reps: '60s', rest: 60, rpe: 7 },
        ]
      },
    ]
  },
];

/**
 * Busca plantillas por criterios
 */
export const searchTemplates = (filters: {
  goal?: TrainingGoal;
  level?: Level;
  daysPerWeek?: number;
}): PlanTemplate[] => {
  return PLAN_TEMPLATES.filter(template => {
    if (filters.goal && template.goal !== filters.goal) return false;
    if (filters.level && template.level !== filters.level) return false;
    if (filters.daysPerWeek && template.daysPerWeek.length !== filters.daysPerWeek) return false;
    return true;
  });
};
