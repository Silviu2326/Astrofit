
import { AdherenceData, DailyChecklist, FeedbackEntry } from './types';

// Generate 30 days of mock data with realistic variation
const generateMockAdherenceData = (): AdherenceData[] => {
  const data: AdherenceData[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    // Realistic variation (70-95% with some lower days)
    const baseAdherence = 75 + Math.random() * 20;
    const adherence = Math.round(Math.min(95, Math.max(65, baseAdherence)));

    const reasons: string[] = [];
    if (adherence < 75) {
      const possibleReasons = ['Evento social', 'Día ocupado', 'Olvidé snack', 'Comí fuera'];
      reasons.push(possibleReasons[Math.floor(Math.random() * possibleReasons.length)]);
    }

    data.push({
      date: dateStr,
      adherencePercentage: adherence,
      reasonsForNonAdherence: reasons,
      mealsLogged: adherence > 85 ? 5 : adherence > 75 ? 4 : 3,
      waterIntake: Math.round(2 + Math.random() * 1.5),
      calories: Math.round(1800 + Math.random() * 400),
      caloriesTarget: 2000,
      macros: {
        protein: Math.round(120 + Math.random() * 40),
        carbs: Math.round(200 + Math.random() * 60),
        fats: Math.round(50 + Math.random() * 30),
      },
      macrosTarget: {
        protein: 150,
        carbs: 250,
        fats: 65,
      },
    });
  }

  return data;
};

const mockAdherenceData = generateMockAdherenceData();

// Generate checklist for last 30 days
const generateMockChecklist = (): DailyChecklist => {
  const checklist: DailyChecklist = {};
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    checklist[dateStr] = {
      breakfast: Math.random() > 0.1,
      midMorning: Math.random() > 0.2,
      lunch: Math.random() > 0.05,
      snack: Math.random() > 0.25,
      dinner: Math.random() > 0.1,
      hydration: Math.random() > 0.15,
    };
  }

  return checklist;
};

const mockDailyChecklist = generateMockChecklist();

const mockFeedbackEntries: FeedbackEntry[] = [
  {
    id: '1',
    date: '2025-09-26',
    clientNote: 'Tuve dificultades con el almuerzo el martes',
    trainerResponse: 'Hablemos de estrategias para días ocupados.',
    mood: '😐',
    energyLevel: 6,
    hungerLevel: 7,
    cravings: ['Dulces']
  },
  {
    id: '2',
    date: '2025-09-24',
    clientNote: 'Evento social, difícil seguir el plan',
    trainerResponse: '¡Entendible! Podemos ajustar para estos casos.',
    mood: '😊',
    energyLevel: 8,
    hungerLevel: 5,
    cravings: []
  },
  {
    id: '3',
    date: '2025-09-20',
    clientNote: '¡Semana perfecta! Me siento con mucha energía',
    trainerResponse: '¡Excelente trabajo! Sigue así 🎉',
    mood: '😃',
    energyLevel: 9,
    hungerLevel: 4,
    cravings: []
  },
];

// Types
export interface AdherenceData {
  date: string;
  adherencePercentage: number;
  reasonsForNonAdherence: string[];
  mealsLogged: number;
  waterIntake: number;
  calories: number;
  caloriesTarget: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  macrosTarget: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface DailyChecklist {
  [date: string]: {
    breakfast: boolean;
    midMorning: boolean;
    lunch: boolean;
    snack: boolean;
    dinner: boolean;
    hydration: boolean;
  };
}

export interface FeedbackEntry {
  id: string;
  date: string;
  clientNote: string;
  trainerResponse?: string;
  mood?: string;
  energyLevel?: number;
  hungerLevel?: number;
  cravings?: string[];
}

// API functions
export const getAdherenceData = async (): Promise<AdherenceData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAdherenceData), 500);
  });
};

export const getDailyChecklist = async (date: string): Promise<DailyChecklist[string]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDailyChecklist[date] || {}), 500);
  });
};

export const updateDailyChecklist = async (date: string, checklist: DailyChecklist[string]): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockDailyChecklist[date] = { ...mockDailyChecklist[date], ...checklist };
      console.log('Updated daily checklist:', mockDailyChecklist);
      resolve();
    }, 500);
  });
};

export const getFeedbackEntries = async (): Promise<FeedbackEntry[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFeedbackEntries), 500);
  });
};

export const submitFeedback = async (entry: Omit<FeedbackEntry, 'id'>): Promise<FeedbackEntry> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEntry = { ...entry, id: String(mockFeedbackEntries.length + 1) };
      mockFeedbackEntries.push(newEntry);
      console.log('New feedback submitted:', newEntry);
      resolve(newEntry);
    }, 500);
  });
};
