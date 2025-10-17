// Interfaces para archivos descargables de la biblioteca de contenidos

export interface CreateArchivoDto {
  nombre: string;
  tipo: string;
  tamaño: number; // en bytes
  urlArchivo: string;
  urlPreview?: string;
  descripcion?: string;
  categoria?: string;
  tags?: string[];
}

export interface UpdateArchivoDto {
  nombre?: string;
  tipo?: string;
  urlPreview?: string;
  descripcion?: string;
  categoria?: string;
  tags?: string[];
}

export interface ArchivoResponse {
  id: string;
  nombre: string;
  tipo: string;
  tamaño: number; // en bytes
  urlArchivo: string;
  urlPreview?: string;
  descripcion?: string;
  categoria?: string;
  tags?: string[];
  descargas: number;
  fechaCreacion: string;
  fechaActualizacion: string;
  isDeleted: boolean;
}
