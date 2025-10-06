import { Habit, AdherenceData, GamifiedChallenge, MotivationalPhrase, LifestyleTrend } from './types';

// Mock data
const mockHabits: Habit[] = [
  { id: '1', name: 'Beber Agua', target: '2 Litros', current: '1.5 Litros', unit: 'Litros', completed: false },
  { id: '2', name: 'Dormir', target: '8 Horas', current: '7 Horas', unit: 'Horas', completed: true },
  { id: '3', name: 'Pasos', target: '10000 Pasos', current: '8500 Pasos', unit: 'Pasos', completed: false },
  { id: '4', name: 'Estiramientos', target: '15 Minutos', current: '10 Minutos', unit: 'Minutos', completed: true },
];

const mockAdherence: AdherenceData = {
  percentage: 75,
  status: 'verde', // verde, amarillo, rojo
};

const mockChallenges: GamifiedChallenge[] = [
  { id: 'c1', title: '3 días seguidos de 8h de sueño', completed: false, progress: '2/3' },
  { id: 'c2', title: 'Beber 2L de agua por 5 días', completed: false, progress: '1/5' },
];

const mockMotivationalPhrases: MotivationalPhrase[] = [
  { id: 'm1', text: '¡Cada paso cuenta! Sigue adelante.', active: false },
  { id: 'm2', text: 'Tu bienestar es tu mayor riqueza.', active: true },
];

const mockLifestyleTrends: LifestyleTrend[] = [
  { date: '2025-09-20', completed: 3, missed: 1 },
  { date: '2025-09-21', completed: 2, missed: 2 },
  { date: '2025-09-22', completed: 4, missed: 0 },
  { date: '2025-09-23', completed: 3, missed: 1 },
  { date: '2025-09-24', completed: 2, missed: 2 },
  { date: '2025-09-25', completed: 4, missed: 0 },
  { date: '2025-09-26', completed: 3, missed: 1 },
];

// Define types for better type safety
export interface Habit {
  id: string;
  name: string;
  target: string;
  current: string;
  unit: string;
  completed: boolean;
}

export interface AdherenceData {
  percentage: number;
  status: 'verde' | 'amarillo' | 'rojo';
}

export interface GamifiedChallenge {
  id: string;
  title: string;
  completed: boolean;
  progress: string;
}

export interface MotivationalPhrase {
  id: string;
  text: string;
  active: boolean;
}

export interface LifestyleTrend {
  date: string;
  completed: number;
  missed: number;
}

// Mock API functions
export const fetchHabits = async (): Promise<Habit[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockHabits), 500);
  });
};

export const updateHabitCompletion = async (id: string, completed: boolean): Promise<Habit[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedHabits = mockHabits.map(habit =>
        habit.id === id ? { ...habit, completed } : habit
      );
      resolve(updatedHabits);
    }, 300);
  });
};

export const fetchAdherenceData = async (): Promise<AdherenceData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAdherence), 400);
  });
};

export const fetchGamifiedChallenges = async (): Promise<GamifiedChallenge[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockChallenges), 600);
  });
};

export const fetchMotivationalPhrases = async (): Promise<MotivationalPhrase[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMotivationalPhrases), 300);
  });
};

export const toggleMotivationalPhrase = async (id: string): Promise<MotivationalPhrase[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedPhrases = mockMotivationalPhrases.map(phrase =>
        phrase.id === id ? { ...phrase, active: !phrase.active } : phrase
      );
      resolve(updatedPhrases);
    }, 200);
  });
};

export const fetchLifestyleTrends = async (): Promise<LifestyleTrend[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockLifestyleTrends), 700);
  });
};
