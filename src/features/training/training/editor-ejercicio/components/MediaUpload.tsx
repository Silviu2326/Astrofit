import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Video, CheckCircle, Loader } from 'lucide-react';

interface MediaUploadProps {
  onMediaUpload: (url: string) => void;
  initialMediaUrl?: string;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onMediaUpload, initialMediaUrl }) => {
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(initialMediaUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setPreviewUrl(initialMediaUrl);
  }, [initialMediaUrl]);

  const handleFileChange = (file: File) => {
    if (file) {
      setMediaFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Simulate upload with progress
      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            onMediaUpload(url);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      handleFileChange(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(undefined);
    setMediaFile(null);
    setUploadProgress(0);
  };

  const isVideo = previewUrl && (previewUrl.endsWith('.mp4') || previewUrl.includes('video'));

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-4 border-dashed rounded-3xl transition-all duration-300 overflow-hidden ${
          isDragging
            ? 'border-emerald-500 bg-emerald-50/50 scale-[1.02]'
            : 'border-slate-300 hover:border-emerald-400 bg-gradient-to-br from-slate-50 to-emerald-50/30'
        }`}
      >
        <input
          type="file"
          id="media-upload"
          accept="video/*,image/*"
          onChange={handleInputChange}
          className="hidden"
        />

        <label
          htmlFor="media-upload"
          className="block p-12 cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            {/* Animated Icon */}
            <motion.div
              animate={isDragging ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 0.5, repeat: isDragging ? Infinity : 0 }}
              className={`p-6 rounded-2xl transition-all duration-300 ${
                isDragging
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
                  : 'bg-gradient-to-br from-slate-200 to-emerald-200'
              }`}
            >
              <Upload className={`w-12 h-12 ${isDragging ? 'text-white' : 'text-slate-600'}`} />
            </motion.div>

            {/* Text */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {isDragging ? '¡Suelta aquí!' : 'Arrastra imágenes/videos aquí'}
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                o haz clic para seleccionar archivos
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" />
                  JPG, PNG, GIF
                </span>
                <span className="flex items-center gap-1">
                  <Video className="w-4 h-4" />
                  MP4, MOV, AVI
                </span>
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Seleccionar archivos
            </button>
          </div>
        </label>

        {/* Upload Progress */}
        {isUploading && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 border-t-2 border-emerald-200">
            <div className="flex items-center gap-3 mb-2">
              <Loader className="w-5 h-5 text-emerald-600 animate-spin" />
              <span className="text-sm font-semibold text-slate-700">Subiendo archivo...</span>
              <span className="ml-auto text-sm font-bold text-emerald-600">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Preview Gallery */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative group"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 border-2 border-slate-200 shadow-lg">
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  {isVideo ? (
                    <video src={previewUrl} className="w-full h-full object-cover" />
                  ) : (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded-lg flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Principal
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 mb-1">
                    {mediaFile?.name || 'Media cargado'}
                  </h4>
                  <p className="text-sm text-slate-600 mb-2">
                    {mediaFile ? `${(mediaFile.size / 1024 / 1024).toFixed(2)} MB` : 'Archivo multimedia'}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-lg font-semibold">
                      {isVideo ? 'Video' : 'Imagen'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleRemove}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Full Preview */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 rounded-2xl overflow-hidden shadow-xl"
            >
              {isVideo ? (
                <video controls src={previewUrl} className="w-full h-auto max-h-96 object-contain bg-slate-900" />
              ) : (
                <img src={previewUrl} alt="Full preview" className="w-full h-auto max-h-96 object-contain bg-slate-900" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaUpload;
