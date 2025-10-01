import { v4 as uuidv4 } from 'uuid';

interface Recipe {
  id: string;
  name: string;
  quantity: string;
  macros?: { protein: number; carbs: number; fats: number; calories: number };
}

interface Meal {
  id: string;
  name: string;
  recipes: Recipe[];
}

interface DietVersion {
  version: number;
  date: string;
  changes: string;
  dietData: any; // Simplified for mock, would be a full diet object
}

interface ProgressEntry {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  notes: string;
}

interface Diet {
  id: string;
  name: string;
  meals: Meal[];
  macros: { protein: number; carbs: number; fats: number; calories: number };
  version: number;
  notes: { timestamp: string; content: string }[];
}

// Mock Data
const mockDiets: Diet[] = [
  {
    id: 'diet-1',
    name: 'Dieta de Volumen - Fase 1',
    meals: [
      { id: 'meal-1', name: 'Desayuno', recipes: [{ id: 'rec-1', name: 'Tortilla de avena', quantity: '1 unidad', macros: { protein: 15, carbs: 30, fats: 5, calories: 225 } }] },
      { id: 'meal-2', name: 'Almuerzo', recipes: [{ id: 'rec-2', name: 'Arroz con pollo', quantity: '200g', macros: { protein: 40, carbs: 50, fats: 10, calories: 450 } }] },
      { id: 'meal-3', name: 'Cena', recipes: [{ id: 'rec-3', name: 'Salmón a la plancha', quantity: '150g', macros: { protein: 30, carbs: 0, fats: 15, calories: 255 } }] },
    ],
    macros: { protein: 180, carbs: 300, fats: 70, calories: 2500 },
    version: 1,
    notes: [{ timestamp: new Date().toISOString(), content: 'Dieta inicial para fase de volumen.' }],
  },
  {
    id: 'diet-2',
    name: 'Dieta de Definición - Semana 1',
    meals: [
      { id: 'meal-4', name: 'Desayuno', recipes: [{ id: 'rec-4', name: 'Claras de huevo con espinacas', quantity: '200g' }] },
      { id: 'meal-5', name: 'Cena', recipes: [{ id: 'rec-5', name: 'Pechuga de pavo con verduras', quantity: '180g' }] },
    ],
    macros: { protein: 150, carbs: 150, fats: 50, calories: 1600 },
    version: 1,
    notes: [{ timestamp: new Date().toISOString(), content: 'Dieta inicial para fase de definición.' }],
  },
];

const mockVersionHistory: { [dietId: string]: DietVersion[] } = {
  'diet-1': [
    { version: 1, date: '2025-09-01', changes: 'Creación inicial', dietData: mockDiets[0] },
    { version: 2, date: '2025-09-15', changes: 'Ajuste de macros, +20g Carbs', dietData: { ...mockDiets[0], macros: { ...mockDiets[0].macros, carbs: 320 }, version: 2 } },
  ],
};

const mockProgressTracking: { [clientId: string]: ProgressEntry[] } = {
  'client-1': [
    { id: uuidv4(), date: '2025-09-01', weight: 75.2, bodyFat: 15.1, notes: 'Inicio de dieta de volumen.' },
    { id: uuidv4(), date: '2025-09-08', weight: 75.8, bodyFat: 14.9, notes: 'Buen progreso, energía alta.' },
    { id: uuidv4(), date: '2025-09-15', weight: 76.5, bodyFat: 14.8, notes: 'Aumento de peso constante.' },
  ],
};

export const dietaEditarApi = {
  fetchDiet: async (dietId: string): Promise<Diet | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDiets.find((diet) => diet.id === dietId));
      }, 500);
    });
  },

  updateDiet: async (diet: Diet): Promise<Diet> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockDiets.findIndex((d) => d.id === diet.id);
        if (index !== -1) {
          mockDiets[index] = diet;
        } else {
          mockDiets.push(diet);
        }
        resolve(diet);
      }, 500);
    });
  },

  fetchVersionHistory: async (dietId: string): Promise<DietVersion[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockVersionHistory[dietId] || []);
      }, 500);
    });
  },

  fetchProgressTracking: async (clientId: string): Promise<ProgressEntry[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProgressTracking[clientId] || []);
      }, 500);
    });
  },

  addProgressEntry: async (clientId: string, entry: Omit<ProgressEntry, 'id'>): Promise<ProgressEntry> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEntry = { ...entry, id: uuidv4() };
        if (!mockProgressTracking[clientId]) {
          mockProgressTracking[clientId] = [];
        }
        mockProgressTracking[clientId].push(newEntry);
        resolve(newEntry);
      }, 500);
    });
  },

  // Mock function for food substitution (simplified)
  substituteFood: async (currentRecipe: Recipe, targetMacros: any): Promise<Recipe> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // This is a very simplified mock. In a real app, this would involve a complex logic
        // to find a suitable substitute based on nutritional data.
        const substitute = {
          id: uuidv4(),
          name: `Sustituto de ${currentRecipe.name}`,
          quantity: currentRecipe.quantity,
          macros: targetMacros, // Assume the substitute perfectly matches target macros for mock
        };
        resolve(substitute);
      }, 700);
    });
  },
};

export type { Diet, Meal, Recipe, DietVersion, ProgressEntry };
