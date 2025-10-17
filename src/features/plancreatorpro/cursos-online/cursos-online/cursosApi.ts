import axios, { AxiosResponse } from 'axios';
import {
  Curso,
  Leccion,
  Quiz,
  QuizResult,
  CreateCursoRequest,
  UpdateCursoRequest,
  ListCursosResponse,
  ListCursosQuery,
  UploadFileResponse,
  CreateLeccionRequest,
  CreateQuizRequest,
  SubmitQuizRequest,
  Answer
} from './types';

// Configuración de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
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

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Error con respuesta del servidor
      const { status, data } = error.response;
      let message = 'Error en la solicitud';
      
      switch (status) {
        case 400:
          message = data.message || 'Solicitud inválida';
          break;
        case 401:
          message = 'No autorizado. Por favor, inicia sesión nuevamente';
          localStorage.removeItem('token');
          break;
        case 403:
          message = 'No tienes permisos para realizar esta acción';
          break;
        case 404:
          message = 'Recurso no encontrado';
          break;
        case 409:
          message = 'Conflicto: El recurso ya existe';
          break;
        case 422:
          message = data.message || 'Datos de entrada inválidos';
          break;
        case 500:
          message = 'Error interno del servidor';
          break;
        default:
          message = data.message || `Error ${status}`;
      }
      
      throw new Error(message);
    } else if (error.request) {
      // Error de red
      throw new Error('Error de conexión. Verifica tu conexión a internet');
    } else {
      // Otro tipo de error
      throw new Error('Error inesperado');
    }
  }
);

// Función para listar cursos con paginación y filtros
export const listarCursos = async (query?: ListCursosQuery): Promise<ListCursosResponse> => {
  try {
    const params = new URLSearchParams();
    
    if (query?.pagina) params.append('pagina', query.pagina.toString());
    if (query?.limite) params.append('limite', query.limite.toString());
    if (query?.estado) params.append('estado', query.estado);
    if (query?.categoria) params.append('categoria', query.categoria);
    if (query?.instructorId) params.append('instructorId', query.instructorId);
    if (query?.busqueda) params.append('busqueda', query.busqueda);
    if (query?.ordenarPor) params.append('ordenarPor', query.ordenarPor);
    if (query?.orden) params.append('orden', query.orden);
    if (query?.precioMin) params.append('precioMin', query.precioMin.toString());
    if (query?.precioMax) params.append('precioMax', query.precioMax.toString());
    if (query?.fechaDesde) params.append('fechaDesde', query.fechaDesde);
    if (query?.fechaHasta) params.append('fechaHasta', query.fechaHasta);

    const response: AxiosResponse<ListCursosResponse> = await api.get(`/api/cursos?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener un curso específico
export const obtenerCurso = async (id: string): Promise<Curso> => {
  try {
    const response: AxiosResponse<Curso> = await api.get(`/api/cursos/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para crear un nuevo curso
export const crearCurso = async (data: CreateCursoRequest): Promise<Curso> => {
  try {
    const response: AxiosResponse<Curso> = await api.post('/api/cursos', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para actualizar un curso existente
export const actualizarCurso = async (id: string, data: UpdateCursoRequest): Promise<Curso> => {
  try {
    const response: AxiosResponse<Curso> = await api.put(`/api/cursos/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar un curso
export const eliminarCurso = async (id: string): Promise<void> => {
  try {
    await api.delete(`/api/cursos/${id}`);
  } catch (error) {
    throw error;
  }
};

// Función para subir archivos
export const subirArchivo = async (file: File): Promise<UploadFileResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response: AxiosResponse<UploadFileResponse> = await api.post('/api/cursos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener lecciones de un curso
export const obtenerLecciones = async (cursoId: string): Promise<Leccion[]> => {
  try {
    const response: AxiosResponse<Leccion[]> = await api.get(`/api/cursos/${cursoId}/lecciones`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para crear una nueva lección
export const crearLeccion = async (cursoId: string, data: CreateLeccionRequest): Promise<Leccion> => {
  try {
    const response: AxiosResponse<Leccion> = await api.post(`/api/cursos/${cursoId}/lecciones`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para actualizar una lección
export const actualizarLeccion = async (leccionId: string, data: Partial<CreateLeccionRequest>): Promise<Leccion> => {
  try {
    const response: AxiosResponse<Leccion> = await api.put(`/api/lecciones/${leccionId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar una lección
export const eliminarLeccion = async (leccionId: string): Promise<void> => {
  try {
    await api.delete(`/api/lecciones/${leccionId}`);
  } catch (error) {
    throw error;
  }
};

// Función para obtener quizzes de un curso
export const obtenerQuizzes = async (cursoId: string): Promise<Quiz[]> => {
  try {
    const response: AxiosResponse<Quiz[]> = await api.get(`/api/cursos/${cursoId}/quizzes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para crear un nuevo quiz
export const crearQuiz = async (cursoId: string, data: CreateQuizRequest): Promise<Quiz> => {
  try {
    const response: AxiosResponse<Quiz> = await api.post(`/api/cursos/${cursoId}/quizzes`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para actualizar un quiz
export const actualizarQuiz = async (quizId: string, data: Partial<CreateQuizRequest>): Promise<Quiz> => {
  try {
    const response: AxiosResponse<Quiz> = await api.put(`/api/quizzes/${quizId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar un quiz
export const eliminarQuiz = async (quizId: string): Promise<void> => {
  try {
    await api.delete(`/api/quizzes/${quizId}`);
  } catch (error) {
    throw error;
  }
};

// Función para enviar respuestas de un quiz
export const enviarQuiz = async (quizId: string, respuestas: Answer[]): Promise<QuizResult> => {
  try {
    const data: SubmitQuizRequest = { respuestas };
    const response: AxiosResponse<QuizResult> = await api.post(`/api/quizzes/${quizId}/submit`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener resultados de un quiz
export const obtenerResultados = async (quizId: string): Promise<QuizResult[]> => {
  try {
    const response: AxiosResponse<QuizResult[]> = await api.get(`/api/quizzes/${quizId}/results`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener estadísticas de un quiz
export const obtenerEstadisticas = async (quizId: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.get(`/api/quizzes/${quizId}/statistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para obtener archivos de una lección
export const obtenerArchivos = async (leccionId: string): Promise<any[]> => {
  try {
    const response: AxiosResponse<any[]> = await api.get(`/api/lecciones/${leccionId}/archivos`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función para eliminar un archivo
export const eliminarArchivo = async (fileId: string): Promise<void> => {
  try {
    await api.delete(`/api/archivos/${fileId}`);
  } catch (error) {
    throw error;
  }
};

// Exportar todas las funciones como un objeto cursosApi
export const cursosApi = {
  // Cursos
  listarCursos,
  obtenerCurso,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
  
  // Archivos
  subirArchivo,
  obtenerArchivos,
  eliminarArchivo,
  
  // Lecciones
  obtenerLecciones,
  crearLeccion,
  actualizarLeccion,
  eliminarLeccion,
  
  // Quizzes
  obtenerQuizzes,
  crearQuiz,
  actualizarQuiz,
  eliminarQuiz,
  enviarQuiz,
  obtenerResultados,
  obtenerEstadisticas,
};

export default cursosApi;
