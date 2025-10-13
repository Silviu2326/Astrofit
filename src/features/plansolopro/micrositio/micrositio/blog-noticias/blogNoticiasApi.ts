import axios from 'axios';

// Función para obtener headers de autenticación
const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Interceptor para manejar tokens expirados
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o no válido
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      // Redirigir a login o mostrar mensaje
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface Articulo {
  id: string;
  titulo: string;
  imagen: string;
  extracto: string;
  contenido: string;
  categoria: string;
  fechaPublicacion: string;
  autor?: string;
  tags?: string[];
  esPublico: boolean;
  vistas: number;
  createdAt: string;
  updatedAt: string;
}

export interface ArticulosResponse {
  success: boolean;
  data: Articulo[];
  total: number;
  page: number;
  limit: number;
}

export interface ArticuloResponse {
  success: boolean;
  data: Articulo;
}

export interface CategoriasResponse {
  success: boolean;
  data: string[];
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getArticulos = async (
  categoria?: string, 
  searchTerm?: string, 
  page?: number, 
  limit?: number
): Promise<ArticulosResponse> => {
  try {
    const params = new URLSearchParams();
    if (categoria && categoria !== 'Todas') {
      params.append('categoria', categoria);
    }
    if (searchTerm) {
      params.append('search', searchTerm);
    }
    if (page) {
      params.append('page', page.toString());
    }
    if (limit) {
      params.append('limit', limit.toString());
    }
    
    const response = await axios.get(`${API_BASE_URL}/blog-articulos`, {
      params,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      }
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener artículos:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Autenticación requerida. Por favor, inicia sesión.');
    }
    
    if (error.response?.status === 403) {
      throw new Error('No tienes permisos para acceder a este contenido.');
    }
    
    throw new Error('Error al cargar los artículos');
  }
};

export const getArticuloById = async (id: string): Promise<ArticuloResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blog-articulos/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      }
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener artículo:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Autenticación requerida. Por favor, inicia sesión.');
    }
    
    if (error.response?.status === 403) {
      throw new Error('No tienes permisos para acceder a este artículo.');
    }
    
    throw new Error('Error al cargar el artículo');
  }
};

export const getCategorias = async (): Promise<CategoriasResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blog-articulos/categorias`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      }
    });
    
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener categorías:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Autenticación requerida. Por favor, inicia sesión.');
    }
    
    if (error.response?.status === 403) {
      throw new Error('No tienes permisos para acceder a las categorías.');
    }
    
    throw new Error('Error al cargar las categorías');
  }
};
