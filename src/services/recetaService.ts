import api from './api';

// Interfaces para las recetas
export interface Ingrediente {
  nombre: string;
  cantidad: number;
  unidad: string;
}

export interface Paso {
  orden: number;
  descripcion: string;
  tiempoEstimado?: number;
}

export interface ValoresNutricionales {
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  fibra?: number;
  sodio?: number;
  azucar?: number;
}

export interface Receta {
  _id?: string;
  id?: string;
  trainerId?: string;
  nombre: string;
  descripcion?: string;
  tipoComida: 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack' | 'Postre' | 'Bebida';
  dificultad: 'Fácil' | 'Media' | 'Difícil';
  tiempoPreparacion: number;
  tiempoCoccion: number;
  porciones: number;
  ingredientes: Ingrediente[];
  pasos: Paso[];
  valoresNutricionales: ValoresNutricionales;
  restricciones?: string[];
  etiquetas?: string[];
  fotoUrl?: string;
  videoUrl?: string;
  notasPersonales?: string;
  tipsNotas?: string;
  rating?: number;
  esFavorita?: boolean;
  esDestacada?: boolean;
  badge?: 'Más Popular' | 'Nuevo' | "Chef's Choice" | '';
  esPublica?: boolean;
  contadorUsos?: number;
  version?: number;
  tiempoTotal?: number; // Virtual
  caloriasPorPorcion?: number; // Virtual
  createdAt?: string;
  updatedAt?: string;
}

export interface RecetasFilters {
  q?: string;
  tipoComida?: 'Desayuno' | 'Almuerzo' | 'Cena' | 'Snack' | 'Postre' | 'Bebida' | '';
  dificultad?: 'Fácil' | 'Media' | 'Difícil' | '';
  restricciones?: string[];
  esFavorita?: boolean;
  esDestacada?: boolean;
  tiempoMaximo?: number;
  caloriasMin?: number;
  caloriasMax?: number;
  sortBy?: 'nombre' | 'tipoComida' | 'dificultad' | 'rating' | 'contadorUsos' | 'createdAt';
  sortDir?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface RecetasResponse {
  success: boolean;
  data: Receta[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  stats: {
    total: number;
    favoritas: number;
    destacadas: number;
    publicas: number;
    porTipoComida: Array<{ _id: string; count: number }>;
    porDificultad: Array<{ _id: string; count: number }>;
    masUsadas: Array<{ nombre: string; contadorUsos: number; tipoComida: string }>;
    ratingPromedio: number;
  };
}

export interface RecetaResponse {
  success: boolean;
  data: Receta;
  message?: string;
}

export interface StatsResponse {
  success: boolean;
  data: {
    total: number;
    favoritas: number;
    destacadas: number;
    publicas: number;
    porTipoComida: Array<{ _id: string; count: number }>;
    porDificultad: Array<{ _id: string; count: number }>;
    masUsadas: Array<{ nombre: string; contadorUsos: number; tipoComida: string }>;
    ratingPromedio: number;
  };
}

class RecetaService {
  // Get all recetas with filters
  async getRecetas(filters: RecetasFilters = {}): Promise<RecetasResponse> {
    const params = new URLSearchParams();

    if (filters.q) params.append('q', filters.q);
    if (filters.tipoComida) params.append('tipoComida', filters.tipoComida);
    if (filters.dificultad) params.append('dificultad', filters.dificultad);
    if (filters.restricciones && filters.restricciones.length > 0) {
      filters.restricciones.forEach(r => params.append('restricciones', r));
    }
    if (filters.esFavorita !== undefined) params.append('esFavorita', String(filters.esFavorita));
    if (filters.esDestacada !== undefined) params.append('esDestacada', String(filters.esDestacada));
    if (filters.tiempoMaximo) params.append('tiempoMaximo', String(filters.tiempoMaximo));
    if (filters.caloriasMin) params.append('caloriasMin', String(filters.caloriasMin));
    if (filters.caloriasMax) params.append('caloriasMax', String(filters.caloriasMax));
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortDir) params.append('sortDir', filters.sortDir);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.pageSize) params.append('pageSize', String(filters.pageSize));

    const response = await api.get<RecetasResponse>(`/recetas?${params.toString()}`);
    return response.data;
  }

  // Get single receta by ID
  async getReceta(id: string): Promise<RecetaResponse> {
    const response = await api.get<RecetaResponse>(`/recetas/${id}`);
    return response.data;
  }

  // Create new receta
  async createReceta(receta: Partial<Receta>): Promise<RecetaResponse> {
    const response = await api.post<RecetaResponse>('/recetas', receta);
    return response.data;
  }

  // Update receta
  async updateReceta(id: string, receta: Partial<Receta>): Promise<RecetaResponse> {
    const response = await api.put<RecetaResponse>(`/recetas/${id}`, receta);
    return response.data;
  }

  // Delete receta (soft delete)
  async deleteReceta(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<{ success: boolean; message: string }>(`/recetas/${id}`);
    return response.data;
  }

  // Toggle favorita status
  async toggleFavorita(id: string): Promise<RecetaResponse> {
    const response = await api.patch<RecetaResponse>(`/recetas/${id}/favorita`);
    return response.data;
  }

  // Update rating
  async updateRating(id: string, rating: number): Promise<RecetaResponse> {
    const response = await api.patch<RecetaResponse>(`/recetas/${id}/rating`, { rating });
    return response.data;
  }

  // Increment uso counter
  async incrementarUso(id: string): Promise<RecetaResponse> {
    const response = await api.patch<RecetaResponse>(`/recetas/${id}/uso`);
    return response.data;
  }

  // Get statistics
  async getStats(): Promise<StatsResponse> {
    const response = await api.get<StatsResponse>('/recetas/stats');
    return response.data;
  }

  // Get public recetas
  async getRecetasPublicas(filters: RecetasFilters = {}): Promise<RecetasResponse> {
    const params = new URLSearchParams();

    if (filters.q) params.append('q', filters.q);
    if (filters.tipoComida) params.append('tipoComida', filters.tipoComida);
    if (filters.dificultad) params.append('dificultad', filters.dificultad);
    if (filters.restricciones && filters.restricciones.length > 0) {
      filters.restricciones.forEach(r => params.append('restricciones', r));
    }
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortDir) params.append('sortDir', filters.sortDir);
    if (filters.page) params.append('page', String(filters.page));
    if (filters.pageSize) params.append('pageSize', String(filters.pageSize));

    const response = await api.get<RecetasResponse>(`/recetas/publicas?${params.toString()}`);
    return response.data;
  }

  // Duplicate receta
  async duplicarReceta(id: string): Promise<RecetaResponse> {
    const response = await api.post<RecetaResponse>(`/recetas/${id}/duplicar`);
    return response.data;
  }
}

export const recetaService = new RecetaService();
export default recetaService;
