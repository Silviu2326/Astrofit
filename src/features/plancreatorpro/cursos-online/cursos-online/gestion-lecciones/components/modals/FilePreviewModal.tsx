import React from 'react';
import { motion } from 'framer-motion';
import { Download, File, Calendar, FileText, FileImage, FileVideo, FileAudio } from 'lucide-react';
import Modal from '../../../../../../../components/ui/modal';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: {
    id: string;
    filename: string;
    url: string;
    size: number;
    type?: string;
  };
}

const FilePreviewModal: React.FC<FilePreviewModalProps> = ({ isOpen, onClose, file }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type?: string) => {
    if (!type) return <File className="w-8 h-8 text-gray-500" />;
    
    if (type.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
    if (type.includes('image')) return <FileImage className="w-8 h-8 text-green-500" />;
    if (type.includes('video')) return <FileVideo className="w-8 h-8 text-blue-500" />;
    if (type.includes('audio')) return <FileAudio className="w-8 h-8 text-purple-500" />;
    if (type.includes('text')) return <FileText className="w-8 h-8 text-gray-500" />;
    
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const getFileTypeName = (type?: string) => {
    if (!type) return 'Archivo';
    
    if (type.includes('pdf')) return 'Documento PDF';
    if (type.includes('image')) return 'Imagen';
    if (type.includes('video')) return 'Video';
    if (type.includes('audio')) return 'Audio';
    if (type.includes('text')) return 'Documento de Texto';
    if (type.includes('presentation')) return 'Presentación';
    if (type.includes('spreadsheet')) return 'Hoja de Cálculo';
    if (type.includes('word')) return 'Documento Word';
    
    return 'Archivo';
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = file.url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const canPreview = file.type?.includes('image') || file.type?.includes('pdf');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vista Previa del Archivo" size="xl">
      <div className="space-y-6">
        {/* Preview Area */}
        {canPreview && (
          <div className="bg-gray-100 rounded-lg p-4 min-h-64 flex items-center justify-center">
            {file.type?.includes('image') ? (
              <img
                src={file.url}
                alt={file.filename}
                className="max-w-full max-h-64 object-contain rounded-lg shadow-sm"
              />
            ) : file.type?.includes('pdf') ? (
              <div className="text-center">
                <FileText className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Vista previa de PDF no disponible</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(file.url, '_blank')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Abrir PDF
                </motion.button>
              </div>
            ) : null}
          </div>
        )}

        {/* File Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Detalles */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Información del Archivo</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {getFileIcon(file.type)}
                <div>
                  <p className="font-medium text-gray-900">{file.filename}</p>
                  <p className="text-sm text-gray-500">{getFileTypeName(file.type)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">{formatFileSize(file.size)}</p>
                  <p className="text-sm text-gray-500">Tamaño del archivo</p>
                </div>
              </div>
              
              {file.type && (
                <div className="flex items-center gap-3">
                  <File className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">{file.type}</p>
                    <p className="text-sm text-gray-500">Tipo MIME</p>
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
                <span>Descargar Archivo</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open(file.url, '_blank')}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <File className="w-5 h-5" />
                <span>Abrir en Nueva Pestaña</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Notas */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 Información</h4>
          <p className="text-sm text-blue-800">
            Este archivo está disponible para descarga y uso en las lecciones. 
            {!canPreview && ' La vista previa no está disponible para este tipo de archivo.'}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default FilePreviewModal;
