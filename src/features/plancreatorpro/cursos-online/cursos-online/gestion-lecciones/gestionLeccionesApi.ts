// API real para la gestión de lecciones
import { cursosApi } from '../cursosApi';
import { Leccion, ContentBlock, CreateLeccionRequest } from '../types';

interface VideoUploadResponse {
  id: string;
  url: string;
  filename: string;
  size: number;
  duration?: number;
}

interface LessonContent {
  id: string;
  title: string;
  blocks: ContentBlock[];
  createdAt: string;
  updatedAt: string;
}

// Subir video usando el servicio real
export const uploadVideo = async (file: File): Promise<VideoUploadResponse> => {
  try {
    const response = await cursosApi.subirArchivo(file);
    const videoResponse: VideoUploadResponse = {
      id: response.id,
      url: response.url,
      filename: response.nombre,
      size: response.tamaño,
      duration: undefined // Se puede obtener del metadata del archivo
    };
    return videoResponse;
  } catch (error) {
    console.error('Error al subir video:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al subir el video');
  }
};

// Subir archivos múltiples usando el servicio real
export const uploadFiles = async (files: File[]): Promise<{ id: string; filename: string; url: string; size: number }[]> => {
  try {
    const uploadPromises = files.map(file => cursosApi.subirArchivo(file));
    const responses = await Promise.all(uploadPromises);
    
    const uploadedFiles = responses.map(response => ({
      id: response.id,
      filename: response.nombre,
      url: response.url,
      size: response.tamaño
    }));
    
    return uploadedFiles;
  } catch (error) {
    console.error('Error al subir archivos:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al subir los archivos');
  }
};

// Guardar contenido de lección usando el servicio real
export const saveLessonContent = async (cursoId: string, content: LessonContent): Promise<Leccion> => {
  try {
    const leccionData: CreateLeccionRequest = {
      titulo: content.title,
      descripcion: content.blocks.map(block => block.content).join(' '),
      tipo: 'texto',
      contenido: JSON.stringify(content.blocks),
      duracion: 0, // Se puede calcular basado en el contenido
      orden: 0,
      bloqueada: false
    };
    
    const leccion = await cursosApi.crearLeccion(cursoId, leccionData);
    return leccion;
  } catch (error) {
    console.error('Error al guardar contenido de lección:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al guardar el contenido de la lección');
  }
};

// Obtener contenido de lección usando el servicio real
export const fetchLessonContent = async (cursoId: string, leccionId?: string): Promise<LessonContent> => {
  try {
    const lecciones = await cursosApi.obtenerLecciones(cursoId);
    const leccion = leccionId 
      ? lecciones.find(l => l.id === leccionId)
      : lecciones[0];
    
    if (!leccion) {
      throw new Error('Lección no encontrada');
    }
    
    const lessonContent: LessonContent = {
      id: leccion.id,
      title: leccion.titulo,
      blocks: JSON.parse(leccion.contenido || '[]'),
      createdAt: leccion.fechaCreacion,
      updatedAt: leccion.fechaActualizacion
    };
    
    return lessonContent;
  } catch (error) {
    console.error('Error al obtener contenido de lección:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al obtener el contenido de la lección');
  }
};

// Eliminar archivo usando el servicio real
export const deleteFile = async (fileId: string): Promise<void> => {
  try {
    await cursosApi.eliminarArchivo(fileId);
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al eliminar el archivo');
  }
};

// Eliminar video usando el servicio real
export const deleteVideo = async (videoId: string): Promise<void> => {
  try {
    await cursosApi.eliminarArchivo(videoId);
  } catch (error) {
    console.error('Error al eliminar video:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al eliminar el video');
  }
};

// Obtener lista de archivos de la lección usando el servicio real
export const getLessonFiles = async (leccionId: string): Promise<any[]> => {
  try {
    const archivos = await cursosApi.obtenerArchivos(leccionId);
    return archivos;
  } catch (error) {
    console.error('Error al obtener archivos de la lección:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al obtener los archivos de la lección');
  }
};

// Obtener lista de videos de la lección usando el servicio real
export const getLessonVideos = async (leccionId: string): Promise<any[]> => {
  try {
    const archivos = await cursosApi.obtenerArchivos(leccionId);
    // Filtrar solo videos basado en el tipo MIME
    const videos = archivos.filter(archivo => 
      archivo.tipo?.startsWith('video/') || 
      archivo.nombre?.match(/\.(mp4|avi|mov|wmv|flv|webm)$/i)
    );
    return videos;
  } catch (error) {
    console.error('Error al obtener videos de la lección:', error);
    throw new Error(error instanceof Error ? error.message : 'Error al obtener los videos de la lección');
  }
};

// Exportar tipos para uso en componentes
export type { VideoUploadResponse, LessonContent, ContentBlock };