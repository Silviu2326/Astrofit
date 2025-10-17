// Interfaces para videos de la biblioteca de contenidos

export interface CreateVideoDto {
  titulo: string;
  descripcion: string;
  url: string;
  thumbnail?: string;
  tags?: string[];
  dificultad: 'easy' | 'medium' | 'hard';
  topico: string;
  esFavorito?: boolean;
}

export interface UpdateVideoDto {
  titulo?: string;
  descripcion?: string;
  url?: string;
  thumbnail?: string;
  tags?: string[];
  dificultad?: 'principiante' | 'intermedio' | 'avanzado';
  topico?: string;
  esFavorito?: boolean;
}

export interface VideoResponse {
  id: string;
  titulo: string;
  descripcion: string;
  url: string;
  thumbnail?: string;
  tags?: string[];
  dificultad: 'easy' | 'medium' | 'hard';
  topico: string;
  esFavorito: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
  duracion: number; // en segundos
  vistas: number;
  likes: number;
  isDeleted: boolean;
}
