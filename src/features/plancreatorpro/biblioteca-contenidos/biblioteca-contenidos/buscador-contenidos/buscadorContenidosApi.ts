// Re-exportar funciones directamente desde la API centralizada
export {
  searchContent,
  getSearchSuggestions,
  ApiError
} from '../bibliotecaContenidosApi';

// Re-exportar tipos
export type {
  SearchRequest,
  SearchResponse,
  SearchFilters,
  SearchResult
} from '../types/Search';
