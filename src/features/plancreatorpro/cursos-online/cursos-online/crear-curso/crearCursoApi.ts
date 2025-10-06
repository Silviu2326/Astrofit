
// src/features/cursos-online/crear-curso/crearCursoApi.ts

interface CursoData {
  titulo: string;
  descripcion: string;
  portadaUrl?: string;
  modulos: any[]; // Define una interfaz más específica para módulos si es necesario
  precio: number;
  // Agrega más campos según sea necesario
}

export const crearCursoApi = {
  // Simula una llamada API para guardar la configuración del curso
  guardarConfiguracion: async (data: Partial<CursoData>): Promise<any> => {
    console.log('Guardando configuración del curso:', data);
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Configuración guardada' }), 500));
  },

  // Simula una llamada API para guardar el contenido del curso (módulos)
  guardarContenido: async (data: Partial<CursoData>): Promise<any> => {
    console.log('Guardando contenido del curso:', data);
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Contenido guardado' }), 500));
  },

  // Simula una llamada API para publicar el curso
  publicarCurso: async (data: CursoData): Promise<any> => {
    console.log('Publicando curso:', data);
    return new Promise((resolve) => setTimeout(() => resolve({ success: true, message: 'Curso publicado exitosamente' }), 1000));
  },

  // Simula una llamada API para subir un archivo (ej. portada)
  subirArchivo: async (file: File): Promise<{ url: string }> => {
    console.log('Subiendo archivo:', file.name);
    return new Promise((resolve) => setTimeout(() => resolve({ url: `/uploads/${file.name}` }), 700));
  },
};
