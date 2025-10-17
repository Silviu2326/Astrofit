// Re-exportar funciones directamente desde la API centralizada
export {
  getArticulos,
  getArticuloById,
  createArticulo,
  updateArticulo,
  deleteArticulo,
  ApiError
} from '../bibliotecaContenidosApi';

// Re-exportar tipos
export type {
  CreateArticuloDto,
  UpdateArticuloDto,
  ArticuloResponse
} from '../types/Articulo';

// Tipos para compatibilidad con el código existente
export interface Article extends ArticuloResponse {
  comments: Comment[];
}

export interface Comment {
  id: string;
  articleId: string;
  memberId: string;
  memberName: string;
  comment: string;
  createdAt: string;
}
