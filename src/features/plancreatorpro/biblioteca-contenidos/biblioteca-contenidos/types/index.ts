// Exportaciones centralizadas de tipos para biblioteca-contenidos

// Tipos de artículos
export type {
  CreateArticuloDto,
  UpdateArticuloDto,
  ArticuloResponse
} from './Articulo';

// Tipos de videos
export type {
  CreateVideoDto,
  UpdateVideoDto,
  VideoResponse
} from './Video';

// Tipos de archivos
export type {
  CreateArchivoDto,
  UpdateArchivoDto,
  ArchivoResponse
} from './Archivo';

// Tipos de búsqueda
export type {
  SearchRequest,
  SearchFilters,
  SearchResult,
  SearchResponse
} from './Search';
