// Tipos relacionados con lecciones y contenido
export interface Leccion {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'video' | 'texto' | 'quiz' | 'archivo' | 'enlace';
  contenido: string;
  duracion: number; // en minutos
  orden: number;
  bloqueada: boolean;
  cursoId: string;
  moduloId: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  archivos: ArchivoLeccion[];
  videos: VideoLeccion[];
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'file' | 'quiz' | 'link';
  content: string;
  order: number;
  metadata: ContentBlockMetadata;
}

export interface ContentBlockMetadata {
  width?: number;
  height?: number;
  duration?: number;
  fileSize?: number;
  mimeType?: string;
  url?: string;
}

export interface ArchivoLeccion {
  id: string;
  nombre: string;
  url: string;
  tipo: string;
  tamaño: number;
  fechaSubida: string;
}

export interface VideoLeccion {
  id: string;
  nombre: string;
  url: string;
  duracion: number;
  thumbnail: string;
  fechaSubida: string;
  estado: 'procesando' | 'completado' | 'error';
}
