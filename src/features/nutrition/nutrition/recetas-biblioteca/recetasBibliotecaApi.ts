import recetaService, { Receta as RecetaBackend, RecetasFilters } from '../../../../services/recetaService';

// Interfaz para compatibilidad con el frontend existente
export interface NutritionalValues {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sodium?: number;
  sugar?: number;
}

export interface Receta {
  id: string;
  name: string;
  type: 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack';
  ingredients: string[];
  steps: string[];
  nutritionalValues: NutritionalValues;
  tags: string[];
  isFavorite: boolean;
  photoUrl?: string;
  personalNotes?: string;
  portions: number;
  prepTime: number; // en minutos
  cookTime: number; // en minutos
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  rating: number; // 0-5
  videoUrl?: string;
  restrictions: string[]; // vegano, vegetariano, sin gluten, sin lactosa
  featured?: boolean; // Receta destacada
  badge?: 'Más Popular' | 'Nuevo' | "Chef's Choice"; // Badges especiales
}

// Función para convertir del formato backend al frontend
const mapBackendToFrontend = (receta: RecetaBackend): Receta => {
  return {
    id: receta._id || receta.id || '',
    name: receta.nombre,
    type: receta.tipoComida as 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack',
    ingredients: receta.ingredientes.map(ing => `${ing.cantidad} ${ing.unidad} ${ing.nombre}`),
    steps: receta.pasos.map(paso => paso.descripcion),
    nutritionalValues: {
      calories: receta.valoresNutricionales.calorias,
      protein: receta.valoresNutricionales.proteinas,
      carbs: receta.valoresNutricionales.carbohidratos,
      fat: receta.valoresNutricionales.grasas,
      fiber: receta.valoresNutricionales.fibra,
      sodium: receta.valoresNutricionales.sodio,
      sugar: receta.valoresNutricionales.azucar,
    },
    tags: receta.etiquetas || [],
    isFavorite: receta.esFavorita || false,
    photoUrl: receta.fotoUrl,
    personalNotes: receta.notasPersonales,
    portions: receta.porciones,
    prepTime: receta.tiempoPreparacion,
    cookTime: receta.tiempoCoccion,
    difficulty: receta.dificultad,
    rating: receta.rating || 0,
    videoUrl: receta.videoUrl,
    restrictions: receta.restricciones || [],
    featured: receta.esDestacada || false,
    badge: receta.badge as 'Más Popular' | 'Nuevo' | "Chef's Choice" | undefined,
  };
};

// Función para convertir del formato frontend al backend
const mapFrontendToBackend = (receta: Partial<Receta>): Partial<RecetaBackend> => {
  const backendReceta: Partial<RecetaBackend> = {
    nombre: receta.name || '',
    tipoComida: receta.type as any,
    dificultad: receta.difficulty || 'Fácil',
    tiempoPreparacion: receta.prepTime || 0,
    tiempoCoccion: receta.cookTime || 0,
    porciones: receta.portions || 1,
    etiquetas: receta.tags || [],
    esFavorita: receta.isFavorite || false,
    fotoUrl: receta.photoUrl,
    notasPersonales: receta.personalNotes,
    rating: receta.rating || 0,
    videoUrl: receta.videoUrl,
    restricciones: receta.restrictions || [],
    esDestacada: receta.featured || false,
    badge: receta.badge || '',
  };

  // Convertir ingredients si existe
  if (receta.ingredients) {
    backendReceta.ingredientes = receta.ingredients.map((ing, idx) => ({
      nombre: ing,
      cantidad: 1,
      unidad: 'unidad',
    }));
  }

  // Convertir steps si existe
  if (receta.steps) {
    backendReceta.pasos = receta.steps.map((step, idx) => ({
      orden: idx + 1,
      descripcion: step,
      tiempoEstimado: 5,
    }));
  }

  // Convertir nutritionalValues si existe
  if (receta.nutritionalValues) {
    backendReceta.valoresNutricionales = {
      calorias: receta.nutritionalValues.calories || 0,
      proteinas: receta.nutritionalValues.protein || 0,
      carbohidratos: receta.nutritionalValues.carbs || 0,
      grasas: receta.nutritionalValues.fat || 0,
      fibra: receta.nutritionalValues.fiber,
      sodio: receta.nutritionalValues.sodium,
      azucar: receta.nutritionalValues.sugar,
    };
  }

  return backendReceta;
};

// API functions con integración real
export const fetchRecetas = async (): Promise<Receta[]> => {
  try {
    const response = await recetaService.getRecetas({ pageSize: 100 });
    return response.data.map(mapBackendToFrontend);
  } catch (error) {
    console.error('Error fetching recetas:', error);
    throw error;
  }
};

export const fetchRecetasWithFilters = async (filters: RecetasFilters): Promise<Receta[]> => {
  try {
    const response = await recetaService.getRecetas(filters);
    return response.data.map(mapBackendToFrontend);
  } catch (error) {
    console.error('Error fetching recetas with filters:', error);
    throw error;
  }
};

export const getReceta = async (id: string): Promise<Receta> => {
  try {
    const response = await recetaService.getReceta(id);
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error fetching receta:', error);
    throw error;
  }
};

export const createReceta = async (receta: Partial<Receta>): Promise<Receta> => {
  try {
    const backendReceta = mapFrontendToBackend(receta);
    const response = await recetaService.createReceta(backendReceta);
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error creating receta:', error);
    throw error;
  }
};

export const updateReceta = async (receta: Receta): Promise<Receta> => {
  try {
    const backendReceta = mapFrontendToBackend(receta);
    const response = await recetaService.updateReceta(receta.id, backendReceta);
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error updating receta:', error);
    throw error;
  }
};

export const deleteReceta = async (id: string): Promise<void> => {
  try {
    await recetaService.deleteReceta(id);
  } catch (error) {
    console.error('Error deleting receta:', error);
    throw error;
  }
};

export const toggleFavorite = async (id: string): Promise<Receta> => {
  try {
    const response = await recetaService.toggleFavorita(id);
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

export const updateRating = async (id: string, rating: number): Promise<Receta> => {
  try {
    const response = await recetaService.updateRating(id, rating);
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error updating rating:', error);
    throw error;
  }
};

export const duplicateReceta = async (id: string): Promise<Receta> => {
  try {
    const response = await recetaService.duplicarReceta(id);
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error duplicating receta:', error);
    throw error;
  }
};

export const getStats = async () => {
  try {
    const response = await recetaService.getStats();
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

export const getPublicRecetas = async (filters: RecetasFilters = {}): Promise<Receta[]> => {
  try {
    const response = await recetaService.getRecetasPublicas(filters);
    return response.data.map(mapBackendToFrontend);
  } catch (error) {
    console.error('Error fetching public recetas:', error);
    throw error;
  }
};
