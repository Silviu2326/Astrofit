
// src/features/plancreatorpro/cursos-online/cursos-online/crear-curso/crearCursoApi.ts

import { cursosApi } from '../cursosApi';
import { CreateCursoRequest, Curso, UploadFileResponse } from '../types';

interface CursoData {
  titulo: string;
  descripcion: string;
  portadaUrl?: string;
  modulos: any[]; // Define una interfaz más específica para módulos si es necesario
  precio: number;
  categoria: string;
  duracion: number;
  // Agrega más campos según sea necesario
}

export const crearCursoApi = {
  // Guarda la configuración del curso usando el servicio real
  guardarConfiguracion: async (data: Partial<CursoData>): Promise<Curso> => {
    try {
      const cursoData: CreateCursoRequest = {
        titulo: data.titulo || '',
        descripcion: data.descripcion || '',
        imagenPortada: data.portadaUrl,
        precio: data.precio || 0,
        categoria: data.categoria || '',
        duracion: data.duracion || 0,
      };
      
      const curso = await cursosApi.crearCurso(cursoData);
      return curso;
    } catch (error) {
      console.error('Error al guardar configuración del curso:', error);
      throw new Error(error instanceof Error ? error.message : 'Error al guardar la configuración del curso');
    }
  },

  // Guarda el contenido del curso (módulos) usando el servicio real
  guardarContenido: async (cursoId: string, data: Partial<CursoData>): Promise<Curso> => {
    try {
      const updateData = {
        titulo: data.titulo,
        descripcion: data.descripcion,
        imagenPortada: data.portadaUrl,
        precio: data.precio,
        categoria: data.categoria,
        duracion: data.duracion,
      };
      
      const curso = await cursosApi.actualizarCurso(cursoId, updateData);
      return curso;
    } catch (error) {
      console.error('Error al guardar contenido del curso:', error);
      throw new Error(error instanceof Error ? error.message : 'Error al guardar el contenido del curso');
    }
  },

  // Publica el curso cambiando su estado a activo
  publicarCurso: async (cursoId: string): Promise<Curso> => {
    try {
      const curso = await cursosApi.actualizarCurso(cursoId, { estado: 'activo' });
      return curso;
    } catch (error) {
      console.error('Error al publicar el curso:', error);
      throw new Error(error instanceof Error ? error.message : 'Error al publicar el curso');
    }
  },

  // Sube un archivo usando el servicio real
  subirArchivo: async (file: File): Promise<UploadFileResponse> => {
    try {
      const response = await cursosApi.subirArchivo(file);
      return response;
    } catch (error) {
      console.error('Error al subir archivo:', error);
      throw new Error(error instanceof Error ? error.message : 'Error al subir el archivo');
    }
  },
};
