import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, Download, Trash2, RefreshCw, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadFiles, getLessonFiles, deleteFile } from '../gestionLeccionesApi';
import FilePreviewModal from './modals/FilePreviewModal';

interface UploadedFile {
  id: string;
  filename: string;
  url: string;
  size: number;
  type?: string;
}

const GestorArchivos: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(true);
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Cargar archivos existentes al montar el componente
  useEffect(() => {
    loadExistingFiles();
  }, []);

  const loadExistingFiles = async () => {
    try {
      setLoadingFiles(true);
      const files = await getLessonFiles('current-lesson');
      setUploadedFiles(files);
    } catch (error) {
      console.error('Error loading files:', error);
      toast.error('Error al cargar archivos existentes');
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      
      // Validar archivos
      const validFiles = newFiles.filter(file => {
        // Máximo 50MB por archivo
        if (file.size > 50 * 1024 * 1024) {
          toast.error(`El archivo "${file.name}" es demasiado grande. Máximo 50MB`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        setFiles([...files, ...validFiles]);
        toast.success(`${validFiles.length} archivo(s) seleccionado(s) correctamente`);
      }
    }
  };

  const handleUploadFiles = async () => {
    if (files.length === 0) {
      toast.error('No hay archivos para subir');
      return;
    }

    setUploading(true);
    const uploadToast = toast.loading(`Subiendo ${files.length} archivo(s)...`);
    
    try {
      const uploadedFileResponses = await uploadFiles(files);
      toast.success(`${uploadedFileResponses.length} archivo(s) subido(s) exitosamente`, { id: uploadToast });
      
      // Agregar archivos a la lista
      setUploadedFiles(prev => [...prev, ...uploadedFileResponses]);
      
      // Limpiar archivos seleccionados
      setFiles([]);
      
      // Limpiar el input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      toast.error('Error al subir los archivos. Inténtalo de nuevo.', { id: uploadToast });
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = (index: number) => {
    const fileToRemove = files[index];
    setFiles(files.filter((_, i) => i !== index));
    toast.success(`Archivo "${fileToRemove.name}" eliminado de la selección`);
  };

  const handleDeleteUploadedFile = async (fileId: string) => {
    try {
      await deleteFile(fileId);
      setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
      toast.success('Archivo eliminado exitosamente');
    } catch (error) {
      toast.error('Error al eliminar el archivo');
      console.error('Error deleting file:', error);
    }
  };

  const handleDownloadFile = (file: UploadedFile) => {
    const a = document.createElement('a');
    a.href = file.url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success(`Descargando "${file.filename}"`);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handlePreviewFile = (file: UploadedFile) => {
    setPreviewFile(file);
    setShowPreviewModal(true);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <Upload className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-600">
            Haz clic para seleccionar archivos o arrastra aquí
          </span>
          <span className="text-xs text-gray-400">Máximo 50MB por archivo</span>
        </label>
      </div>

      {/* Upload Button */}
      {files.length > 0 && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUploadFiles}
          disabled={uploading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-medium disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Subiendo...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Subir {files.length} Archivo(s)
            </>
          )}
        </motion.button>
      )}

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Archivos Seleccionados ({files.length})</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <File className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveFile(index)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  title="Eliminar de selección"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Files */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-700">Archivos Subidos ({uploadedFiles.length})</h4>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadExistingFiles}
            disabled={loadingFiles}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:text-gray-400 flex items-center gap-1"
          >
            <RefreshCw className={`w-3 h-3 ${loadingFiles ? 'animate-spin' : ''}`} />
            {loadingFiles ? 'Cargando...' : 'Actualizar'}
          </motion.button>
        </div>

        {loadingFiles ? (
          <div className="text-center py-4">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-sm text-gray-500">Cargando archivos...</p>
          </div>
        ) : uploadedFiles.length > 0 ? (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <File className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {file.filename}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePreviewFile(file)}
                    className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                    title="Vista previa"
                  >
                    <Eye className="w-4 h-4 text-green-600" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDownloadFile(file)}
                    className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Descargar"
                  >
                    <Download className="w-4 h-4 text-blue-600" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteUploadedFile(file.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <File className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No hay archivos subidos</p>
            <p className="text-sm">Selecciona archivos para comenzar</p>
          </div>
        )}
      </div>

      {/* File Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          isOpen={showPreviewModal}
          onClose={() => {
            setShowPreviewModal(false);
            setPreviewFile(null);
          }}
          file={previewFile}
        />
      )}
    </div>
  );
};

export default GestorArchivos;
