import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, X, Check, Image as ImageIcon } from 'lucide-react';

interface FotoUploadProps {
  onFotoUpload: (file: File | null) => void;
  initialFotoUrl?: string;
}

const FotoUpload: React.FC<FotoUploadProps> = ({
  onFotoUpload,
  initialFotoUrl,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialFotoUrl || null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona una imagen válida');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        setUploadProgress(progress);
      }
    };

    reader.onloadend = () => {
      setTimeout(() => {
        setPreviewUrl(reader.result as string);
        onFotoUpload(file);
        setIsUploading(false);
        setUploadProgress(100);
      }, 300);
    };

    reader.readAsDataURL(file);
  }, [onFotoUpload]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
    onFotoUpload(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl shadow-lg">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Foto de la Receta</h3>
        </div>

        {/* Upload Area */}
        {!previewUrl ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClickUpload}
            className={`relative border-dashed border-4 rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden ${
              isDragging
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 hover:border-purple-400'
            }`}
          >
            <div className="p-12 text-center">
              <motion.div
                animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-4"
              >
                {/* Icono animado */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                    <Upload className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-purple-500 rounded-2xl blur-xl opacity-30"></div>
                </motion.div>

                <div>
                  <p className="text-xl font-bold text-gray-900 mb-2">
                    {isDragging ? '¡Suelta la imagen aquí!' : 'Arrastra y suelta tu foto'}
                  </p>
                  <p className="text-sm text-gray-600">
                    o haz clic para seleccionar desde tu dispositivo
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Formatos: JPG, PNG, WEBP (Máx. 5MB)
                  </p>
                </div>

                {/* Badge decorativo */}
                <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 shadow-lg">
                  <ImageIcon className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">Imagen de alta calidad</span>
                </div>
              </motion.div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Preview de la imagen */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={previewUrl}
                alt="Vista previa"
                className="w-full h-64 object-cover"
              />

              {/* Overlay con acciones */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="flex items-center gap-3 w-full">
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-full shadow-lg">
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-semibold">Foto cargada</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePhoto();
                    }}
                    className="ml-auto p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Botón para cambiar foto */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClickUpload}
              className="mt-4 w-full px-4 py-3 border-2 border-purple-500 text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Cambiar foto
            </motion.button>
          </motion.div>
        )}

        {/* Progress bar durante upload */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <Upload className="w-4 h-4 text-purple-600 animate-pulse" />
                <span className="text-sm font-semibold text-gray-700">Cargando imagen...</span>
                <span className="ml-auto text-sm font-bold text-purple-600">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FotoUpload;
