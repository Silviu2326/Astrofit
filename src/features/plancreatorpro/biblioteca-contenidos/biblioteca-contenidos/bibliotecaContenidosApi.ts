import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  CreateArticuloDto,
  UpdateArticuloDto,
  ArticuloResponse,
  CreateVideoDto,
  UpdateVideoDto,
  VideoResponse,
  CreateArchivoDto,
  UpdateArchivoDto,
  ArchivoResponse,
  SearchRequest,
  SearchResponse
} from './types';

// Configuración de axios
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/biblioteca-contenidos`;

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para headers de autorización
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejo de respuestas
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Error de autenticación 401:', error.response?.data);
      // No redirigir automáticamente, dejar que el componente maneje el error
    }
    return Promise.reject(error);
  }
);

// Tipos de error personalizados
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Función helper para manejo de errores
const handleApiError = (error: any): never => {
  console.error('API Error:', error);
  
  if (error.response) {
    const { status, data } = error.response;
    const message = data?.message || `Error del servidor (${status})`;
    throw new ApiError(message, status, data?.code);
  } else if (error.request) {
    throw new ApiError('No se pudo conectar con el servidor', 0, 'NETWORK_ERROR');
  } else if (error instanceof ApiError) {
    throw error;
  } else {
    throw new ApiError('Error inesperado en la aplicación', 0, 'UNKNOWN_ERROR');
  }
};

// Función helper para mapear campos del backend al frontend
const mapResponse = <T extends Record<string, any>>(data: T | T[]): T | T[] => {
  if (Array.isArray(data)) {
    return data.map(item => mapResponse(item)) as T[];
  }
  
  if (data && typeof data === 'object') {
    const mapped = { ...data };
    
    // Mapear campos comunes
    if ('_id' in mapped) {
      mapped.id = mapped._id;
      delete mapped._id;
    }
    if ('createdAt' in mapped) {
      mapped.fechaCreacion = mapped.createdAt;
      delete mapped.createdAt;
    }
    if ('updatedAt' in mapped) {
      mapped.fechaActualizacion = mapped.updatedAt;
      delete mapped.updatedAt;
    }
    
    // Mapear campos específicos de videos
    if ('dificultad' in mapped) {
      // Convertir dificultad de inglés a español si es necesario
      const dificultadMap: Record<string, string> = {
        'easy': 'easy',
        'medium': 'medium', 
        'hard': 'hard',
        'principiante': 'easy',
        'intermedio': 'medium',
        'avanzado': 'hard'
      };
      if (dificultadMap[mapped.dificultad]) {
        mapped.dificultad = dificultadMap[mapped.dificultad];
      }
    }
    
    return mapped;
  }
  
  return data;
};

// ===== FUNCIONES PARA ARTÍCULOS =====

export const getArticulos = async (filters?: {
  categoria?: string;
  tags?: string[];
  esPublico?: boolean;
  autor?: string;
}): Promise<ArticuloResponse[]> => {
  try {
    const response = await apiClient.get('/articulos', { params: filters });
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const getArticuloById = async (id: string): Promise<ArticuloResponse> => {
  try {
    const response = await apiClient.get(`/articulos/${id}`);
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const createArticulo = async (data: CreateArticuloDto): Promise<ArticuloResponse> => {
  try {
    const response = await apiClient.post('/articulos', data);
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const updateArticulo = async (id: string, data: UpdateArticuloDto): Promise<ArticuloResponse> => {
  try {
    const response = await apiClient.put(`/articulos/${id}`, data);
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteArticulo = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/articulos/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};

// ===== FUNCIONES PARA VIDEOS =====

export const getVideos = async (filters?: {
  tags?: string[];
  dificultad?: string;
  topico?: string;
  esFavorito?: boolean;
}): Promise<VideoResponse[]> => {
  try {
    const response = await apiClient.get('/videos', { params: filters });
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const getVideoById = async (id: string): Promise<VideoResponse> => {
  try {
    const response = await apiClient.get(`/videos/${id}`);
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const createVideo = async (data: CreateVideoDto): Promise<VideoResponse> => {
  try {
    const response = await apiClient.post('/videos', data);
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const updateVideo = async (id: string, data: UpdateVideoDto): Promise<VideoResponse> => {
  try {
    const response = await apiClient.put(`/videos/${id}`, data);
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteVideo = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/videos/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};

export const toggleFavorite = async (id: string, isFavorite: boolean): Promise<VideoResponse> => {
  try {
    const response = await apiClient.put(`/videos/${id}/favorite`, { isFavorite });
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

// ===== FUNCIONES PARA ARCHIVOS =====

export const getArchivos = async (filters?: {
  categoria?: string;
  tags?: string[];
  tipo?: string;
}): Promise<ArchivoResponse[]> => {
  try {
    const response = await apiClient.get('/archivos', { params: filters });
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const getArchivoById = async (id: string): Promise<ArchivoResponse> => {
  try {
    const response = await apiClient.get(`/archivos/${id}`);
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const createArchivo = async (data: CreateArchivoDto): Promise<ArchivoResponse> => {
  try {
    const response = await apiClient.post('/archivos', data);
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const updateArchivo = async (id: string, data: UpdateArchivoDto): Promise<ArchivoResponse> => {
  try {
    const response = await apiClient.put(`/archivos/${id}`, data);
    return mapResponse(response.data);
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteArchivo = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/archivos/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};

export const recordDownload = async (id: string): Promise<void> => {
  try {
    await apiClient.post(`/archivos/${id}/download`);
  } catch (error) {
    handleApiError(error);
  }
};

// ===== FUNCIONES DE BÚSQUEDA =====

export const searchContent = async (query: string, filters?: Partial<SearchRequest>): Promise<SearchResponse> => {
  try {
    console.log('🔍 Frontend - searchContent called with:', { query, filters });
    const response = await apiClient.get('/search', {
      params: {
        query,
        ...filters
      }
    });
    console.log('✅ Frontend - searchContent response:', response.data);
    return mapResponse(response.data);
  } catch (error) {
    console.error('❌ Frontend - searchContent error:', error);
    handleApiError(error);
  }
};

export const getSearchSuggestions = async (query: string): Promise<string[]> => {
  try {
    const response = await apiClient.get('/search/suggestions', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export default apiClient;
