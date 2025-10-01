
export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyMeals {
  day: string;
  meals: Meal[];
}

export interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionalAlert {
  id: string;
  type: 'deficit' | 'excess';
  nutrient: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
}

const mockMeals: Meal[] = [
  { id: 'm1', name: 'Desayuno proteico', calories: 320, protein: 25, carbs: 15, fat: 18 },
  { id: 'm2', name: 'Almuerzo equilibrado', calories: 450, protein: 35, carbs: 40, fat: 15 },
  { id: 'm3', name: 'Cena ligera', calories: 280, protein: 22, carbs: 20, fat: 12 },
  { id: 'm4', name: 'Snack saludable', calories: 150, protein: 8, carbs: 12, fat: 8 },
];

const mockWeeklyMeals: DailyMeals[] = [
  { day: 'Lunes', meals: [mockMeals[0], mockMeals[1], mockMeals[2]] },
  { day: 'Martes', meals: [mockMeals[0], mockMeals[1], mockMeals[3]] },
  { day: 'Miércoles', meals: [mockMeals[0], mockMeals[1], mockMeals[2]] },
  { day: 'Jueves', meals: [mockMeals[0], mockMeals[1], mockMeals[3]] },
  { day: 'Viernes', meals: [mockMeals[0], mockMeals[1], mockMeals[2]] },
  { day: 'Sábado', meals: [mockMeals[0], mockMeals[1], mockMeals[3]] },
  { day: 'Domingo', meals: [mockMeals[0], mockMeals[1], mockMeals[2]] },
];

const mockQuickRecipes: Recipe[] = [
  { id: 'r1', name: 'Batido proteico', calories: 250, protein: 20, carbs: 10, fat: 8 },
  { id: 'r2', name: 'Ensalada de quinoa', calories: 320, protein: 12, carbs: 45, fat: 8 },
  { id: 'r3', name: 'Pollo a la plancha', calories: 180, protein: 35, carbs: 0, fat: 4 },
  { id: 'r4', name: 'Yogur griego con frutos secos', calories: 200, protein: 15, carbs: 8, fat: 12 },
];

const mockNutritionalAlerts: NutritionalAlert[] = [
  { id: 'a1', type: 'deficit', nutrient: 'Proteína', message: 'Ingesta de proteína por debajo del objetivo diario', severity: 'medium' },
  { id: 'a2', type: 'excess', nutrient: 'Azúcar', message: 'Consumo de azúcar excesivo en el almuerzo', severity: 'high' },
  { id: 'a3', type: 'deficit', nutrient: 'Fibra', message: 'Se recomienda aumentar el consumo de fibra', severity: 'low' },
];

export const agenteNutricionistaApi = {
  getWeeklyMeals: (): DailyMeals[] => mockWeeklyMeals,
  getRecipeSuggestions: (mealId: string): Recipe[] => {
    // Simulate getting suggestions based on meal
    return mockQuickRecipes.slice(0, 3);
  },
  getQuickRecipes: (): Recipe[] => mockQuickRecipes,
  getNutritionalAlerts: (): NutritionalAlert[] => mockNutritionalAlerts,
};
