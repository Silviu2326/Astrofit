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
  'quinoa': { calories: 120, protein: 4.4, carbs: 22, fat: 1.9 },
  'aguacate': { calories: 160, protein: 2, carbs: 8.5, fat: 14.7 },
  'tomates cherry': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },
  'pepino': { calories: 16, protein: 0.7, carbs: 4, fat: 0.1 },
  'limón': { calories: 29, protein: 1.1, carbs: 9.3, fat: 0.3 },
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
  tiempoEstimado?: number;
}

interface Receta {
  id: string;
  nombre: string;
  descripcion: string;
  tipoComida: string;
  dificultad: string;
  tiempoPreparacion: number;
  tiempoCoccion: number;
  etiquetas: string[];
  porciones: number;
  tipsNotas: string;
  ingredientes: Ingrediente[];
  pasos: Paso[];
  fotoUrl?: string;
  version: number;
  fechaCreacion: string;
  fechaModificacion: string;
  valoresNutricionales?: {
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
}

let mockRecetas: Receta[] = [
  {
    id: 'receta-123',
    nombre: 'Ensalada de Quinoa y Aguacate',
    descripcion: 'Una ensalada fresca y nutritiva, perfecta para el verano.',
    tipoComida: 'Almuerzo',
    dificultad: 'fácil',
    tiempoPreparacion: 15,
    tiempoCoccion: 0,
    etiquetas: ['vegetariana', 'fresca', 'saludable'],
    porciones: 2,
    tipsNotas: 'Ideal para llevar al trabajo. Se puede añadir pollo a la parrilla para más proteína.',
    ingredientes: [
      { id: 'ing-1', nombre: 'Quinoa', cantidad: 1, unidad: 'taza' },
      { id: 'ing-2', nombre: 'Aguacate', cantidad: 1, unidad: 'unidad' },
      { id: 'ing-3', nombre: 'Tomates Cherry', cantidad: 10, unidad: 'unidades' },
      { id: 'ing-4', nombre: 'Pepino', cantidad: 0.5, unidad: 'unidad' },
      { id: 'ing-5', nombre: 'Limón', cantidad: 1, unidad: 'unidad' },
      { id: 'ing-6', nombre: 'Aceite de Oliva', cantidad: 2, unidad: 'cucharadas' },
      { id: 'ing-7', nombre: 'Sal', cantidad: 1, unidad: 'pizca' },
      { id: 'ing-8', nombre: 'Pimienta', cantidad: 1, unidad: 'pizca' },
    ],
    pasos: [
      { id: 'paso-1', descripcion: 'Cocinar la quinoa según las instrucciones del paquete.', tiempoEstimado: 15 },
      { id: 'paso-2', descripcion: 'Cortar el aguacate, tomates cherry y pepino en trozos pequeños.', tiempoEstimado: 5 },
      { id: 'paso-3', descripcion: 'En un bol grande, combinar la quinoa cocida con los vegetales cortados.', tiempoEstimado: 2 },
      { id: 'paso-4', descripcion: 'Exprimir el jugo de limón, añadir aceite de oliva, sal y pimienta. Mezclar bien.', tiempoEstimado: 2 },
      { id: 'paso-5', descripcion: 'Servir fría.', tiempoEstimado: 1 },
    ],
    fotoUrl: 'https://example.com/quinoa-salad.jpg',
    version: 1,
    fechaCreacion: '2024-01-15',
    fechaModificacion: '2024-01-15',
    valoresNutricionales: {
      calorias: 350,
      proteinas: 12,
      carbohidratos: 40,
      grasas: 18,
    }
  },
];

export const recetaEditarApi = {
  async getRecetaById(id: string): Promise<Receta | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const receta = mockRecetas.find(r => r.id === id);
        resolve(receta || null);
      }, 300);
    });
  },

  async updateReceta(id: string, recetaData: Receta): Promise<Receta> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockRecetas.findIndex(r => r.id === id);
        if (index > -1) {
          const updatedReceta = { 
            ...recetaData, 
            fechaModificacion: new Date().toISOString().split('T')[0],
            version: mockRecetas[index].version + 1
          };
          if (recetaData.ingredientes) {
            updatedReceta.valoresNutricionales = this.calculateNutritionalValues(recetaData.ingredientes);
          }
          mockRecetas[index] = updatedReceta;
          console.log('Receta actualizada:', updatedReceta);
          resolve(updatedReceta);
        } else {
          throw new Error('Receta no encontrada');
        }
      }, 500);
    });
  },

  async createNewVersion(recetaData: Receta): Promise<Receta> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newVersion = {
          ...recetaData,
          id: `receta-${Date.now()}`,
          version: 1,
          fechaCreacion: new Date().toISOString().split('T')[0],
          fechaModificacion: new Date().toISOString().split('T')[0],
        };
        mockRecetas.push(newVersion);
        console.log('Nueva versión creada:', newVersion);
        resolve(newVersion);
      }, 500);
    });
  },

  async getHistorialVersiones(recetaId: string): Promise<Receta[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular historial de versiones
        const receta = mockRecetas.find(r => r.id === recetaId);
        if (receta) {
          const historial = [
            { ...receta, version: receta.version - 1, fechaModificacion: '2024-01-10' },
            receta
          ];
          resolve(historial);
        } else {
          resolve([]);
        }
      }, 300);
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