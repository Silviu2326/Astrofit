import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Video, Link, FileVideo, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../../../../../../../components/ui/modal';

interface AddVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (videoData: { type: 'file' | 'url'; content: string; title: string; description?: string }) => void;
}

const AddVideoModal: React.FC<AddVideoModalProps> = ({ isOpen, onClose, onSave }) => {
  const [videoType, setVideoType] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
      setTitle(file.name.replace(/\.[^/.]+$/, "")); // Remover extensión
      toast.success(`Video "${file.name}" seleccionado correctamente`);
    }
  };

  const handleUrlChange = (url: string) => {
    setVideoUrl(url);
    
    // Detectar si es YouTube, Vimeo, etc.
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      setTitle('Video de YouTube');
    } else if (url.includes('vimeo.com')) {
      setTitle('Video de Vimeo');
    } else {
      setTitle('Video Externo');
    }
  };

  const handleSave = async () => {
    if (videoType === 'file' && !selectedFile) {
      toast.error('Por favor selecciona un archivo de video');
      return;
    }
    
    if (videoType === 'url' && !videoUrl.trim()) {
      toast.error('Por favor ingresa una URL de video');
      return;
    }
    
    if (!title.trim()) {
      toast.error('Por favor ingresa un título para el video');
      return;
    }

    setIsSaving(true);
    const saveToast = toast.loading('Guardando video...');
    
    try {
      // Simular delay de guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const videoData = {
        type: videoType,
        content: videoType === 'file' ? selectedFile!.name : videoUrl,
        title: title.trim(),
        description: description.trim() || undefined
      };
      
      onSave(videoData);
      toast.success('Video guardado exitosamente', { id: saveToast });
      handleClose();
    } catch (error) {
      toast.error('Error al guardar el video', { id: saveToast });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setVideoUrl('');
    setTitle('');
    setDescription('');
    setPreviewUrl(null);
    setVideoType('file');
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Agregar Video" size="lg">
      <div className="space-y-6">
        {/* Video Type Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Tipo de Video
          </label>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setVideoType('file')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                videoType === 'file'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>Subir Archivo</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setVideoType('url')}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-colors ${
                videoType === 'url'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Link className="w-5 h-5" />
              <span>URL Externa</span>
            </motion.button>
          </div>
        </div>

        {/* File Upload */}
        {videoType === 'file' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                id="video-file-upload"
              />
              <label
                htmlFor="video-file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Haz clic para seleccionar un video o arrastra aquí
                </span>
                <span className="text-xs text-gray-400">Máximo 100MB</span>
              </label>
            </div>

            {/* File Preview */}
            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                </div>
                
                {previewUrl && (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-auto rounded-lg shadow-sm max-h-48"
                  />
                )}
              </motion.div>
            )}
          </div>
        )}

        {/* URL Input */}
        {videoType === 'url' && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              URL del Video
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... o https://vimeo.com/..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>
                Soporta YouTube, Vimeo y otros servicios de video. 
                Asegúrate de que la URL sea pública y accesible.
              </p>
            </div>
          </div>
        )}

        {/* Title */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Título del Video *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ingresa un título descriptivo para el video"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Descripción (Opcional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Agrega una descripción del video..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={isSaving || (!selectedFile && !videoUrl.trim()) || !title.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <FileVideo className="w-4 h-4" />
            {isSaving ? 'Guardando...' : 'Agregar Video'}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default AddVideoModal;
