// Interfaces para búsqueda en la biblioteca de contenidos

export interface SearchRequest {
  query: string;
  tipo?: 'articulos' | 'videos' | 'archivos' | 'todos';
  categoria?: string;
  tags?: string[];
  dificultad?: 'principiante' | 'intermedio' | 'avanzado';
  topico?: string;
  esPublico?: boolean;
  fechaDesde?: string;
  fechaHasta?: string;
  limit?: number;
  offset?: number;
}

export interface SearchFilters {
  categorias: string[];
  tags: string[];
  dificultades: string[];
  topicos: string[];
  tipos: string[];
}

export interface SearchResult {
  id: string;
  tipo: 'articulo' | 'video' | 'archivo';
  titulo: string;
  descripcion: string;
  categoria: string;
  tags: string[];
  fechaCreacion: string;
  relevancia: number;
  url?: string;
  thumbnail?: string;
}

export interface SearchResponse {
  resultados: SearchResult[];
  total: number;
  filtros: SearchFilters;
  sugerencias: string[];
  tiempoBusqueda: number; // en milisegundos
}