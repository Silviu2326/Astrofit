// Interfaces para artículos de la biblioteca de contenidos

export interface CreateArticuloDto {
  titulo: string;
  extracto: string;
  contenido: string;
  categoria: string;
  autor?: string;
  tags?: string[];
  esPublico?: boolean;
  imagen?: string;
}

export interface UpdateArticuloDto {
  titulo?: string;
  extracto?: string;
  contenido?: string;
  categoria?: string;
  autor?: string;
  tags?: string[];
  esPublico?: boolean;
  imagen?: string;
}

export interface ArticuloResponse {
  id: string;
  titulo: string;
  extracto: string;
  contenido: string;
  categoria: string;
  autor?: string;
  tags?: string[];
  esPublico: boolean;
  imagen?: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  vistas: number;
  likes: number;
  isDeleted: boolean;
}
