import axios from 'axios';

const API_URL = 'http://localhost:5000/api/plantillas-entrenamiento';

// Get token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

// Axios instance with auth
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Exercise {
  ejercicioId?: string;
  series?: number;
  repeticiones?: string;
  descanso?: number;
  notas?: string;
  orden?: number;
}

export interface WorkoutDay {
  dia: number;
  nombre: string;
  ejercicios: Exercise[];
  calentamiento?: {
    duracion?: number;
    descripcion?: string;
  };
  enfriamiento?: {
    duracion?: number;
    descripcion?: string;
  };
}

export type Objective =
  | 'perdida-peso'
  | 'ganancia-musculo'
  | 'fuerza'
  | 'resistencia'
  | 'flexibilidad'
  | 'rehabilitacion'
  | 'mantenimiento';

export type Level = 'principiante' | 'intermedio' | 'avanzado' | 'experto';

export type Modality =
  | 'gym'
  | 'casa'
  | 'exterior'
  | 'funcional'
  | 'crossfit'
  | 'yoga'
  | 'pilates'
  | 'otro';

export type Visibility = 'privada' | 'publica' | 'equipo';
export type Status = 'activa' | 'borrador' | 'archivada';

export interface TrainingTemplate {
  _id: string;
  id?: string; // For backward compatibility
  trainerId?: any;
  nombre: string;
  name?: string; // For backward compatibility
  descripcion: string;
  description?: string; // For backward compatibility
  objetivo: Objective;
  objective?: Objective; // For backward compatibility
  nivel: Level;
  level?: Level; // For backward compatibility
  modalidad: Modality;
  modality?: Modality; // For backward compatibility
  duracionSemanas: number;
  diasPorSemana: number;
  duracionSesion: number;
  duration?: string; // For backward compatibility
  frequency?: string; // For backward compatibility
  diasEntrenamiento: WorkoutDay[];
  workoutDays?: WorkoutDay[]; // For backward compatibility
  equipamiento: string[];
  materialNeeded?: string[]; // For backward compatibility
  gruposMusculares: string[];
  etiquetas: string[];
  visibilidad: Visibility;
  esPlantillaSistema: boolean;
  isSystemTemplate?: boolean; // For backward compatibility
  imagen?: string;
  estado: Status;
  vecesUtilizada: number;
  ultimoUso?: Date | null;
  esFavorita: boolean;
  isFavorite?: boolean; // For backward compatibility
  calificacion: number;
  rating?: number; // For backward compatibility
  numeroCalificaciones: number;
  commentsCount?: number; // For backward compatibility
  author?: string; // For backward compatibility
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlantillasResponse {
  success: boolean;
  data: TrainingTemplate[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  stats?: {
    total: number;
    activas: number;
    borradores: number;
    favoritas: number;
    publicas: number;
  };
}

export interface PlantillaResponse {
  success: boolean;
  data: TrainingTemplate;
  message?: string;
}

export interface CreatePlantillaData {
  nombre: string;
  descripcion: string;
  objetivo: Objective;
  nivel: Level;
  modalidad: Modality;
  duracionSemanas?: number;
  diasPorSemana?: number;
  duracionSesion?: number;
  diasEntrenamiento?: WorkoutDay[];
  equipamiento?: string[];
  gruposMusculares?: string[];
  etiquetas?: string[];
  visibilidad?: Visibility;
  imagen?: string;
  estado?: Status;
}

// Normalize template data for backward compatibility
const normalizeTemplate = (template: TrainingTemplate): TrainingTemplate => {
  return {
    ...template,
    id: template._id || template.id,
    name: template.nombre || template.name,
    description: template.descripcion || template.description,
    objective: template.objetivo || template.objective,
    level: template.nivel || template.level,
    modality: template.modalidad || template.modality,
    duration: `${template.duracionSesion || 60} min`,
    frequency: `${template.diasPorSemana || 3} veces/semana`,
    workoutDays: template.diasEntrenamiento || template.workoutDays || [],
    materialNeeded: template.equipamiento || template.materialNeeded || [],
    isSystemTemplate: template.esPlantillaSistema ?? template.isSystemTemplate ?? false,
    isFavorite: template.esFavorita ?? template.isFavorite ?? false,
    rating: template.calificacion || template.rating || 0,
    commentsCount: template.numeroCalificaciones || template.commentsCount || 0,
    author: template.esPlantillaSistema ? 'Sistema' : (template.trainerId?.nombre || 'Usuario'),
  };
};

// GET all plantillas with filters
export const getTrainingTemplates = async (params?: {
  q?: string;
  objetivo?: Objective;
  nivel?: Level;
  modalidad?: Modality;
  visibilidad?: Visibility;
  estado?: Status;
  esFavorita?: boolean;
  incluirPublicas?: boolean;
  page?: number;
  pageSize?: number;
}): Promise<TrainingTemplate[]> => {
  try {
    const response = await apiClient.get<PlantillasResponse>('/', {
      params: {
        ...params,
        incluirPublicas: params?.incluirPublicas ?? true,
      },
    });

    return response.data.data.map(normalizeTemplate);
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
};

// GET single plantilla by ID
export const getTrainingTemplateById = async (id: string): Promise<TrainingTemplate> => {
  try {
    const response = await apiClient.get<PlantillaResponse>(`/${id}`);
    return normalizeTemplate(response.data.data);
  } catch (error) {
    console.error('Error fetching template:', error);
    throw error;
  }
};

// GET public plantillas
export const getPublicTemplates = async (params?: {
  objetivo?: Objective;
  nivel?: Level;
  modalidad?: Modality;
  page?: number;
  pageSize?: number;
}): Promise<TrainingTemplate[]> => {
  try {
    const response = await apiClient.get<PlantillasResponse>('/publicas', { params });
    return response.data.data.map(normalizeTemplate);
  } catch (error) {
    console.error('Error fetching public templates:', error);
    throw error;
  }
};

// GET statistics
export const getTemplateStats = async () => {
  try {
    const response = await apiClient.get('/stats');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

// CREATE new plantilla
export const createTemplate = async (data: CreatePlantillaData): Promise<TrainingTemplate> => {
  try {
    const response = await apiClient.post<PlantillaResponse>('/', data);
    return normalizeTemplate(response.data.data);
  } catch (error) {
    console.error('Error creating template:', error);
    throw error;
  }
};

// UPDATE plantilla
export const updateTemplate = async (
  id: string,
  data: Partial<CreatePlantillaData>
): Promise<TrainingTemplate> => {
  try {
    const response = await apiClient.put<PlantillaResponse>(`/${id}`, data);
    return normalizeTemplate(response.data.data);
  } catch (error) {
    console.error('Error updating template:', error);
    throw error;
  }
};

// DELETE plantilla
export const deleteTemplate = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error('Error deleting template:', error);
    throw error;
  }
};

// TOGGLE favorite
export const toggleFavorite = async (id: string): Promise<TrainingTemplate> => {
  try {
    const response = await apiClient.patch<PlantillaResponse>(`/${id}/toggle-favorita`);
    return normalizeTemplate(response.data.data);
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

// INCREMENT usage counter
export const incrementUsage = async (id: string): Promise<TrainingTemplate> => {
  try {
    const response = await apiClient.patch<PlantillaResponse>(`/${id}/increment-uso`);
    return normalizeTemplate(response.data.data);
  } catch (error) {
    console.error('Error incrementing usage:', error);
    throw error;
  }
};

// RATE plantilla
export const rateTemplate = async (id: string, puntos: number): Promise<TrainingTemplate> => {
  try {
    const response = await apiClient.post<PlantillaResponse>(`/${id}/calificar`, { puntos });
    return normalizeTemplate(response.data.data);
  } catch (error) {
    console.error('Error rating template:', error);
    throw error;
  }
};

// DUPLICATE plantilla
export const duplicateTemplate = async (id: string): Promise<TrainingTemplate> => {
  try {
    const response = await apiClient.post<PlantillaResponse>(`/${id}/duplicate`);
    return normalizeTemplate(response.data.data);
  } catch (error) {
    console.error('Error duplicating template:', error);
    throw error;
  }
};
