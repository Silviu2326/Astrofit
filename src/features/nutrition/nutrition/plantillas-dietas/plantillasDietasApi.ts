import axios from 'axios';

const API_URL = 'http://localhost:5000/api/plantillas-dietas';

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Meal {
  name: string;
  description: string;
  calories: number;
  macros: { protein: number; carbs: number; fat: number };
  foods: string[];
}

export interface DayMenu {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks?: Meal[];
}

export interface PlantillaDieta {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  objective: 'perdida_peso' | 'ganancia_muscular' | 'mantenimiento' | 'definicion' | 'volumen_limpio' | 'rendimiento' | 'salud_general' | 'recomposicion';
  dietType: 'mediterranea' | 'keto' | 'vegana' | 'vegetariana' | 'paleo' | 'flexible' | 'intermitente' | 'baja_carbos' | 'alta_proteina';
  time_level: 'quick' | 'advanced' | 'no_cook';
  culinary_experience: 'beginner' | 'intermediate' | 'expert';
  calories: number;
  macros: { protein: number; carbs: number; fat: number };
  duration_weeks: number;
  is_favorite: boolean;
  is_public: boolean;
  restrictions: string[];
  allergens: string[];
  rating: number;
  uses: number;
  reviews: number;
  weekly_menu: DayMenu[];
  estado?: 'activa' | 'borrador' | 'archivada';
  trainerId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const plantillasDietasApi = {
  getPlantillas: async (filters: any = {}) => {
    const { data } = await apiClient.get('/', { params: { incluirPublicas: 'true', ...filters } });
    if (data.data) {
      data.data = data.data.map((p: any) => ({ ...p, id: p._id || p.id }));
    }
    return data;
  },

  getPlantillaById: async (id: string) => {
    const { data } = await apiClient.get(`/${id}`);
    return { ...data.data, id: data.data._id || data.data.id };
  },

  createPlantilla: async (plantilla: Partial<PlantillaDieta>) => {
    const { data } = await apiClient.post('/', plantilla);
    return { ...data.data, id: data.data._id || data.data.id };
  },

  updatePlantilla: async (id: string, plantilla: Partial<PlantillaDieta>) => {
    const { data } = await apiClient.put(`/${id}`, plantilla);
    return { ...data.data, id: data.data._id || data.data.id };
  },

  deletePlantilla: async (id: string) => {
    await apiClient.delete(`/${id}`);
  },

  toggleFavorite: async (id: string) => {
    const { data } = await apiClient.patch(`/${id}/toggle-favorita`);
    return { ...data.data, id: data.data._id || data.data.id };
  },

  incrementUso: async (id: string) => {
    const { data } = await apiClient.patch(`/${id}/increment-uso`);
    return { ...data.data, id: data.data._id || data.data.id };
  },

  calificarPlantilla: async (id: string, puntos: number) => {
    const { data } = await apiClient.post(`/${id}/calificar`, { puntos });
    return { ...data.data, id: data.data._id || data.data.id };
  },

  duplicatePlantilla: async (id: string) => {
    const { data } = await apiClient.post(`/${id}/duplicate`);
    return { ...data.data, id: data.data._id || data.data.id };
  },

  getStats: async () => {
    const { data } = await apiClient.get('/stats');
    return data.data;
  },

  getPlantillasPublicas: async (filters: any = {}) => {
    const { data } = await apiClient.get('/publicas', { params: filters });
    if (data.data) {
      data.data = data.data.map((p: any) => ({ ...p, id: p._id || p.id }));
    }
    return data;
  },
};
