import React from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Calendar, FileVideo } from 'lucide-react';
import Modal from '../../../../../../../components/ui/modal';

interface VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    id: string;
    url: string;
    filename: string;
    size: number;
    duration?: number;
  };
}

const VideoPreviewModal: React.FC<VideoPreviewModalProps> = ({ isOpen, onClose, video }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'Duración desconocida';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = video.url;
    a.download = video.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vista Previa del Video" size="xl">
      <div className="space-y-6">
        {/* Video Player */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            src={video.url}
            controls
            className="w-full h-auto max-h-96"
            poster=""
          >
            Tu navegador no soporta la reproducción de videos.
          </video>
          
          {/* Overlay con información */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium">{formatDuration(video.duration)}</span>
            </div>
          </div>
        </div>

        {/* Información del Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Detalles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Información del Video</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileVideo className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">{video.filename}</p>
                  <p className="text-sm text-gray-500">Nombre del archivo</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">{formatFileSize(video.size)}</p>
                  <p className="text-sm text-gray-500">Tamaño del archivo</p>
                </div>
              </div>
              
              {video.duration && (
                <div className="flex items-center gap-3">
                  <Play className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium text-gray-900">{formatDuration(video.duration)}</p>
                    <p className="text-sm text-gray-500">Duración</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Acciones */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Acciones</h3>
            
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                className="w-full flex items-center gap-3 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Descargar Video</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(video.url, '_blank')}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Play className="w-5 h-5" />
                <span>Abrir en Nueva Pestaña</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Notas */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 Información</h4>
          <p className="text-sm text-blue-800">
            Este video está disponible para su uso en las lecciones. Puedes reproducirlo directamente 
            o descargarlo para uso offline.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default VideoPreviewModal;
