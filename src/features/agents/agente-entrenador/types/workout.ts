
// src/features/agente-entrenador/types/workout.ts

import { Exercise } from './exercise';
import { Progression } from './progression';

export interface WorkoutSet {
  id: string;
  reps: number;
  weight: number; // in kg
  rpe?: number; // Rate of Perceived Exertion
  rir?: number; // Reps in Reserve
  isWarmUp?: boolean;
  notes?: string;
}

export interface WorkoutExercise {
  id: string;
  exercise: Exercise;
  sets: WorkoutSet[];
  progression?: Progression;
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  date: string; // ISO date string
  exercises: WorkoutExercise[];
  durationMinutes?: number;
  notes?: string;
  isCompleted: boolean;
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description?: string;
  exercises: Omit<WorkoutExercise, 'id' | 'sets'> & {
    sets: Omit<WorkoutSet, 'id'>[];
  }[];
}

// Mock Data
export const MOCK_WORKOUTS: Workout[] = [
  {
    id: 'wk1',
    name: 'Rutina de Fuerza - Día 1',
    date: '2025-09-26',
    exercises: [
      {
        id: 'wke1',
        exercise: {
          id: 'ex1',
          name: 'Press de Banca',
          type: 'Fuerza',
          muscleGroups: ['Pecho', 'Tríceps', 'Hombro'],
          equipment: ['Barra', 'Banco'],
          instructions: 'Tumbado en un banco, baja la barra hasta el pecho y empuja hacia arriba.',
          videoUrl: 'https://example.com/press-banca',
        },
        sets: [
          { id: 'set1', reps: 8, weight: 60, rpe: 7 },
          { id: 'set2', reps: 8, weight: 60, rpe: 7.5 },
          { id: 'set3', reps: 7, weight: 62.5, rpe: 8 },
        ],
        notes: 'Sensación de buena fuerza hoy.',
      },
      {
        id: 'wke2',
        exercise: {
          id: 'ex2',
          name: 'Sentadilla con Barra',
          type: 'Fuerza',
          muscleGroups: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
          equipment: ['Barra', 'Rack'],
          instructions: 'Con la barra sobre los hombros, baja la cadera como si te sentaras en una silla.',
          videoUrl: 'https://example.com/sentadilla',
        },
        sets: [
          { id: 'set4', reps: 6, weight: 80, rpe: 7 },
          { id: 'set5', reps: 6, weight: 80, rpe: 7.5 },
          { id: 'set6', reps: 5, weight: 85, rpe: 8 },
        ],
      },
    ],
    durationMinutes: 60,
    isCompleted: true,
  },
  {
    id: 'wk2',
    name: 'Cardio y Movilidad',
    date: '2025-09-27',
    exercises: [
      {
        id: 'wke3',
        exercise: {
          id: 'ex3',
          name: 'Carrera Continua',
          type: 'Cardio',
          muscleGroups: ['Piernas'],
          equipment: ['Ninguno'],
          instructions: 'Corre a un ritmo constante durante 30 minutos.',
          videoUrl: 'https://example.com/carrera',
        },
        sets: [
          { id: 'set7', reps: 1, weight: 0, notes: '30 minutos a ritmo moderado' },
        ],
      },
      {
        id: 'wke4',
        exercise: {
          id: 'ex4',
          name: 'Estiramientos Dinámicos',
          type: 'Movilidad',
          muscleGroups: ['Todo el cuerpo'],
          equipment: ['Ninguno'],
          instructions: 'Realiza estiramientos dinámicos para mejorar la flexibilidad.',
          videoUrl: 'https://example.com/estiramientos',
        },
        sets: [
          { id: 'set8', reps: 1, weight: 0, notes: '15 minutos de movilidad general' },
        ],
      },
    ],
    durationMinutes: 45,
    isCompleted: true,
  },
];
