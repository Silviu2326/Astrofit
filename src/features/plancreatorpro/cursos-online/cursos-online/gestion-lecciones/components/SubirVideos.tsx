import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, CheckCircle, Play, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadVideo, getLessonVideos, deleteVideo, VideoUploadResponse } from '../gestionLeccionesApi';
import VideoPreviewModal from './modals/VideoPreviewModal';

const SubirVideos: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState<VideoUploadResponse[]>([]);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [previewVideo, setPreviewVideo] = useState<VideoUploadResponse | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      // Validar tipo de archivo
      if (!file.type.startsWith('video/')) {
        toast.error('Por favor selecciona un archivo de video válido');
        return;
      }
      
      // Validar tamaño (máximo 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast.error('El archivo es demasiado grande. Máximo 100MB');
        return;
      }
      
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      toast.success(`Video "${file.name}" seleccionado correctamente`);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  // Cargar videos existentes al montar el componente
  useEffect(() => {
    loadExistingVideos();
  }, []);

  const loadExistingVideos = async () => {
    try {
      setLoadingVideos(true);
      const videos = await getLessonVideos('current-lesson');
      setUploadedVideos(videos);
    } catch (error) {
      console.error('Error loading videos:', error);
      toast.error('Error al cargar videos existentes');
    } finally {
      setLoadingVideos(false);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      const uploadToast = toast.loading('Subiendo video...');
      
      try {
        const videoResponse = await uploadVideo(selectedFile);
        toast.success('¡Video subido exitosamente!', { id: uploadToast });
        
        // Agregar el video a la lista
        setUploadedVideos(prev => [...prev, videoResponse]);
        
        // Limpiar el archivo seleccionado
        setSelectedFile(null);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        
        // Limpiar el input
        const fileInput = document.getElementById('video-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        
      } catch (error) {
        toast.error('Error al subir el video. Inténtalo de nuevo.', { id: uploadToast });
        console.error('Error al subir el video:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    toast.success('Video eliminado');
  };

  const handleDeleteUploadedVideo = async (videoId: string) => {
    try {
      await deleteVideo(videoId);
      setUploadedVideos(prev => prev.filter(video => video.id !== videoId));
      toast.success('Video eliminado exitosamente');
    } catch (error) {
      toast.error('Error al eliminar el video');
      console.error('Error deleting video:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePreviewVideo = (video: VideoUploadResponse) => {
    setPreviewVideo(video);
    setShowPreviewModal(true);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="video-upload"
        />
        <label
          htmlFor="video-upload"
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <Upload className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-600">
            Haz clic para seleccionar un video o arrastra aquí
          </span>
          <span className="text-xs text-gray-400">Máximo 100MB</span>
        </label>
      </div>

      {/* Preview */}
      {previewUrl && selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-700">{selectedFile.name}</span>
              <span className="text-xs text-gray-500">
                ({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)
              </span>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
          <video
            src={previewUrl}
            controls
            className="w-full h-auto rounded-lg shadow-sm"
          />
        </motion.div>
      )}

      {/* Upload Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-lg font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
      >
        {uploading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Subiendo...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Subir Video
          </>
        )}
      </motion.button>

      {/* Videos Subidos */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-700">Videos Subidos ({uploadedVideos.length})</h4>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadExistingVideos}
            disabled={loadingVideos}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400"
          >
            {loadingVideos ? 'Cargando...' : 'Actualizar'}
          </motion.button>
        </div>

        {loadingVideos ? (
          <div className="text-center py-4">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-500">Cargando videos...</p>
          </div>
        ) : uploadedVideos.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {uploadedVideos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Play className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {video.filename}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(video.size)}
                      {video.duration && ` • ${Math.round(video.duration)}s`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePreviewVideo(video)}
                    className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                    title="Vista previa"
                  >
                    <Eye className="w-4 h-4 text-green-600" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.open(video.url, '_blank')}
                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Reproducir video"
                  >
                    <Play className="w-4 h-4 text-blue-600" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteUploadedVideo(video.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    title="Eliminar video"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Play className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No hay videos subidos</p>
            <p className="text-sm">Sube tu primer video para comenzar</p>
          </div>
        )}
      </div>

      {/* Video Preview Modal */}
      {previewVideo && (
        <VideoPreviewModal
          isOpen={showPreviewModal}
          onClose={() => {
            setShowPreviewModal(false);
            setPreviewVideo(null);
          }}
          video={previewVideo}
        />
      )}
    </div>
  );
};

export default SubirVideos;
