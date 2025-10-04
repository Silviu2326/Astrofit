import { v4 as uuidv4 } from 'uuid';

// Mock data for ingredients and their nutritional values
const mockIngredientNutritions: { [key: string]: { calories: number; protein: number; carbs: number; fat: number } } = {
  'pollo': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  'arroz': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  'brocoli': { calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6 },
  'aceite de oliva': { calories: 900, protein: 0, carbs: 0, fat: 100 },
  'tomate': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  'cebolla': { calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
  'sal': { calories: 0, protein: 0, carbs: 0, fat: 0 },
  'pimienta': { calories: 0, protein: 0, carbs: 0, fat: 0 },
};

interface Ingrediente {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
}

interface Paso {
  id: string;
  descripcion: string;
}

interface Receta {
  id: string;
  nombre: string;
  descripcion: string;
  tipoComida: string;
  etiquetas: string[];
  porciones: number;
  tiempoPreparacion: number;
  tipsNotas: string;
  ingredientes: Ingrediente[];
  pasos: Paso[];
  fotoUrl?: string;
  valoresNutricionales?: {
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
}

let mockRecetas: Receta[] = [];

export const recetaNuevaApi = {
  async createReceta(recetaData: Omit<Receta, 'id' | 'valoresNutricionales'>): Promise<Receta> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReceta: Receta = {
          id: uuidv4(),
          ...recetaData,
          ingredientes: recetaData.ingredientes.map(ing => ({ ...ing, id: uuidv4() })),
          pasos: recetaData.pasos.map(paso => ({ ...paso, id: uuidv4() })),
        };
        // Calculate mock nutritional values
        newReceta.valoresNutricionales = this.calculateNutritionalValues(newReceta.ingredientes);
        mockRecetas.push(newReceta);
        console.log('Receta creada:', newReceta);
        resolve(newReceta);
      }, 500);
    });
  },

  async updateReceta(id: string, updatedData: Partial<Receta>): Promise<Receta | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockRecetas.findIndex(r => r.id === id);
        if (index > -1) {
          const updatedReceta = { ...mockRecetas[index], ...updatedData };
          if (updatedData.ingredientes) {
            updatedReceta.valoresNutricionales = this.calculateNutritionalValues(updatedData.ingredientes);
          }
          mockRecetas[index] = updatedReceta;
          console.log('Receta actualizada:', updatedReceta);
          resolve(updatedReceta);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  async getRecetaById(id: string): Promise<Receta | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const receta = mockRecetas.find(r => r.id === id);
        resolve(receta || null);
      }, 300);
    });
  },

  async getIngredientNutrition(ingredientName: string): Promise<typeof mockIngredientNutritions[string] | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockIngredientNutritions[ingredientName.toLowerCase()]);
      }, 200);
    });
  },

  calculateNutritionalValues(ingredientes: Ingrediente[]) {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    ingredientes.forEach(ing => {
      const nutrition = mockIngredientNutritions[ing.nombre.toLowerCase()];
      if (nutrition) {
        // Simple calculation: assume quantity is in grams for now for simplicity
        // In a real app, unit conversion would be needed.
        const factor = ing.unidad.toLowerCase() === 'g' || ing.unidad.toLowerCase() === 'ml' ? ing.cantidad / 100 : ing.cantidad; // Assuming nutrition is per 100g/ml
        totalCalories += nutrition.calories * factor;
        totalProtein += nutrition.protein * factor;
        totalCarbs += nutrition.carbs * factor;
        totalFat += nutrition.fat * factor;
      }
    });

    return {
      calorias: parseFloat(totalCalories.toFixed(2)),
      proteinas: parseFloat(totalProtein.toFixed(2)),
      carbohidratos: parseFloat(totalCarbs.toFixed(2)),
      grasas: parseFloat(totalFat.toFixed(2)),
    };
  },
};
