// Re-exportar funciones directamente desde la API centralizada
export {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  toggleFavorite,
  ApiError
} from '../bibliotecaContenidosApi';

// Re-exportar tipos
export type {
  CreateVideoDto,
  UpdateVideoDto,
  VideoResponse
} from '../types/index';

// Importar VideoResponse para uso en la interfaz
import type { VideoResponse } from '../types/index';

// Interface para compatibilidad con el código existente
export interface Video extends VideoResponse {
  // Mantenemos la interfaz existente para compatibilidad
}
