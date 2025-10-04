import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/entrenamientos';

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

// Types
export interface SesionEntrenamiento {
  _id?: string;
  fecha: Date | string;
  hora: string;
  duracion: number;
  estado: 'pendiente' | 'completado' | 'cancelado' | 'en-progreso';
  ejercicios: {
    ejercicioId: any;
    series?: number;
    repeticiones?: string;
    peso?: number;
    descanso?: number;
    notas?: string;
    completado?: boolean;
    orden?: number;
  }[];
  notasEntrenador?: string;
  notasCliente?: string;
  valoracionCliente?: number;
  sensacionEsfuerzo?: number;
}

export interface Entrenamiento {
  _id: string;
  id?: string; // For backward compatibility
  trainerId?: any;
  clienteId: any;
  titulo: string;
  descripcion?: string;
  tipo: 'Fuerza' | 'Hipertrofia' | 'Resistencia' | 'Pérdida de Peso' | 'CrossFit' | 'Funcional' | 'Powerlifting' | 'Calistenia' | 'HIIT' | 'Otro';
  objetivo: 'Ganar Masa' | 'Perder Grasa' | 'Mantener' | 'Rendimiento' | 'Salud General' | 'Rehabilitación' | 'Competición';
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado';
  estado: 'activo' | 'completado' | 'pausado' | 'borrador' | 'cancelado';
  fechaInicio: Date | string;
  fechaFin?: Date | string;
  totalSemanas: number;
  semanaActual: number;
  diasPorSemana: number;
  progreso: number;
  adherencia: number;
  sesionesCompletadas: number;
  sesionesProgramadas: number;
  sesiones: SesionEntrenamiento[];
  plantillaId?: any;
  tieneComentarios?: boolean;
  requiereRevision?: boolean;
  conSeguimiento?: boolean;
  notasEntrenador?: string;
  notasCliente?: string;
  ultimaActividad?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;

  // Backward compatibility
  cliente?: string;
  programa?: string;
  duracion?: string;
}

export interface EntrenamientosResponse {
  success: boolean;
  data: Entrenamiento[];
  total: number;
  page: number;
  pageSize: number;
  pages: number;
  stats?: {
    total: number;
    activos: number;
    completados: number;
    pausados: number;
    borradores: number;
  };
}

export interface EntrenamientoResponse {
  success: boolean;
  data: Entrenamiento;
  message?: string;
}

export interface CreateEntrenamientoData {
  clienteId: string;
  titulo: string;
  descripcion?: string;
  tipo: string;
  objetivo: string;
  nivel?: string;
  estado?: string;
  fechaInicio: Date | string;
  fechaFin?: Date | string;
  totalSemanas: number;
  diasPorSemana: number;
  sesiones?: SesionEntrenamiento[];
  plantillaId?: string;
  notasEntrenador?: string;
}

// Normalize data for backward compatibility
const normalizeEntrenamiento = (ent: Entrenamiento): Entrenamiento => {
  return {
    ...ent,
    id: ent._id || ent.id,
    cliente: ent.clienteId?.nombre ? `${ent.clienteId.nombre} ${ent.clienteId.apellidos || ''}`.trim() : ent.cliente || 'Cliente',
    programa: ent.titulo || ent.programa || 'Sin título',
    duracion: `${ent.totalSemanas} semanas`,
  };
};

// GET all entrenamientos
export const getEntrenamientos = async (params?: {
  q?: string;
  estado?: string;
  tipo?: string;
  objetivo?: string;
  clienteId?: string;
  nivel?: string;
  page?: number;
  pageSize?: number;
}): Promise<Entrenamiento[]> => {
  try {
    const response = await apiClient.get<EntrenamientosResponse>('/', { params });
    return response.data.data.map(normalizeEntrenamiento);
  } catch (error) {
    console.error('Error fetching entrenamientos:', error);
    throw error;
  }
};

// GET single entrenamiento
export const getEntrenamiento = async (id: string): Promise<Entrenamiento> => {
  try {
    const response = await apiClient.get<EntrenamientoResponse>(`/${id}`);
    return normalizeEntrenamiento(response.data.data);
  } catch (error) {
    console.error('Error fetching entrenamiento:', error);
    throw error;
  }
};

// CREATE entrenamiento
export const createEntrenamiento = async (data: CreateEntrenamientoData): Promise<Entrenamiento> => {
  try {
    const response = await apiClient.post<EntrenamientoResponse>('/', data);
    return normalizeEntrenamiento(response.data.data);
  } catch (error) {
    console.error('Error creating entrenamiento:', error);
    throw error;
  }
};

// UPDATE entrenamiento
export const updateEntrenamiento = async (id: string, updates: Partial<CreateEntrenamientoData>): Promise<Entrenamiento> => {
  try {
    const response = await apiClient.put<EntrenamientoResponse>(`/${id}`, updates);
    return normalizeEntrenamiento(response.data.data);
  } catch (error) {
    console.error('Error updating entrenamiento:', error);
    throw error;
  }
};

// DELETE entrenamiento
export const deleteEntrenamiento = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error('Error deleting entrenamiento:', error);
    throw error;
  }
};

// PAUSE entrenamiento
export const pausarEntrenamiento = async (id: string): Promise<Entrenamiento> => {
  try {
    const response = await apiClient.patch<EntrenamientoResponse>(`/${id}/pausar`);
    return normalizeEntrenamiento(response.data.data);
  } catch (error) {
    console.error('Error pausing entrenamiento:', error);
    throw error;
  }
};

// RESUME entrenamiento
export const reanudarEntrenamiento = async (id: string): Promise<Entrenamiento> => {
  try {
    const response = await apiClient.patch<EntrenamientoResponse>(`/${id}/reanudar`);
    return normalizeEntrenamiento(response.data.data);
  } catch (error) {
    console.error('Error resuming entrenamiento:', error);
    throw error;
  }
};

// FINALIZE entrenamiento
export const finalizarEntrenamiento = async (id: string): Promise<Entrenamiento> => {
  try {
    const response = await apiClient.patch<EntrenamientoResponse>(`/${id}/finalizar`);
    return normalizeEntrenamiento(response.data.data);
  } catch (error) {
    console.error('Error finalizing entrenamiento:', error);
    throw error;
  }
};

// DUPLICATE entrenamiento
export const duplicateEntrenamiento = async (id: string): Promise<Entrenamiento> => {
  try {
    const response = await apiClient.post<EntrenamientoResponse>(`/${id}/duplicate`);
    return normalizeEntrenamiento(response.data.data);
  } catch (error) {
    console.error('Error duplicating entrenamiento:', error);
    throw error;
  }
};

// COMPLETE session
export const completarSesion = async (
  entrenamientoId: string,
  sesionId: string,
  datos: {
    notasCliente?: string;
    valoracionCliente?: number;
    sensacionEsfuerzo?: number;
    ejercicios?: any[];
  }
): Promise<{ entrenamiento: Entrenamiento; sesion: SesionEntrenamiento }> => {
  try {
    const response = await apiClient.post(`/${entrenamientoId}/sesiones/${sesionId}/completar`, datos);
    return {
      entrenamiento: normalizeEntrenamiento(response.data.data.entrenamiento),
      sesion: response.data.data.sesion
    };
  } catch (error) {
    console.error('Error completing session:', error);
    throw error;
  }
};

// GET stats
export const getStats = async () => {
  try {
    const response = await apiClient.get('/stats');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};

// Custom hook for fetching entrenamientos (compatible with old code)
export const useFetchEntrenamientos = () => {
  const [data, setData] = useState<Entrenamiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Fetching entrenamientos...');
        const entrenamientos = await getEntrenamientos();
        console.log('Entrenamientos received:', entrenamientos);
        setData(entrenamientos);
        setError(null);
      } catch (err: any) {
        console.error('Error in useFetchEntrenamientos:', err);
        setError(err.message || 'Error fetching entrenamientos');
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
