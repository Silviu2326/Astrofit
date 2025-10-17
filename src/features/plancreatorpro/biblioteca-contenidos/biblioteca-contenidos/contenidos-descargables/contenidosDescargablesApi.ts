
// Re-exportar funciones directamente desde la API centralizada
export {
  getArchivos,
  getArchivoById,
  createArchivo,
  updateArchivo,
  deleteArchivo,
  recordDownload,
  ApiError
} from '../bibliotecaContenidosApi';

// Re-exportar tipos
export {
  CreateArchivoDto,
  UpdateArchivoDto,
  ArchivoResponse
} from '../types/index';

// Interface para compatibilidad con el código existente
export interface DownloadableContent extends ArchivoResponse {
  // Mantenemos la interfaz existente para compatibilidad
}
