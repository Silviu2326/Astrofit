
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Download, FileText, FolderOpen, Sparkles, Upload, Search, X, File, AlertCircle, Loader2 } from 'lucide-react';
import Modal from '../../../../../components/ui/modal';
import { getArchivos } from '../bibliotecaContenidosApi';
import { ArchivoResponse } from '../types/index';

interface DownloadableFile {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xlsx' | 'ppt' | 'image' | 'other';
  size: string;
  uploadDate: string;
  downloads: number;
  category: string;
  tags: string[];
  url: string;
}

const ContenidosDescargablesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [files, setFiles] = useState<DownloadableFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Integrar API centralizada directamente
  useEffect(() => {
    const loadFiles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const filesData = await getArchivos();
        setFiles(filesData as DownloadableFile[]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar archivos');
      } finally {
        setIsLoading(false);
      }
    };

    loadFiles();
  }, []);

  const categories = ['Todos', 'Nutrición', 'Entrenamiento', 'Bienestar', 'Marketing', 'Administración'];
  const fileTypes = ['Todos', 'PDF', 'Documento', 'Hoja de Cálculo', 'Presentación', 'Imagen'];

  const handleDownload = (file: DownloadableFile) => {
    // Simulate download
    console.log(`Downloading ${file.name}`);
    toast.success(`Descargando: ${file.name}`, {
      duration: 3000,
      icon: '📥',
    });
    // In a real app, this would trigger the actual download
  };

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleFileUpload = () => {
    if (!uploadFile) {
      toast.error('Por favor selecciona un archivo');
      return;
    }
    
    if (!uploadCategory) {
      toast.error('Por favor selecciona una categoría');
      return;
    }

    // Simulate file upload
    toast.success(`Archivo "${uploadFile.name}" subido exitosamente`, {
      duration: 3000,
      icon: '✅',
    });
    
    // Reset form
    setUploadFile(null);
    setUploadCategory('');
    setUploadTags('');
    setShowUploadModal(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const handleNavigation = (page: string) => {
    navigate(`/${page}`);
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || selectedCategory === 'Todos' || file.category === selectedCategory;
    const matchesType = !selectedType || selectedType === 'Todos' || file.type === selectedType.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Manejar estados de carga y error
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Cargando archivos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar archivos</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Download className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Contenidos <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Descargables</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona tu biblioteca de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">archivos descargables</span>, PDFs y plantillas profesionales
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <FileText className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Gestor PDFs</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <FolderOpen className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Biblioteca Archivos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Plantillas Pro</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contenido Principal */}
      <div className="space-y-8">
        {/* Search and Upload Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar archivos por nombre o etiquetas..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {fileTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              onClick={handleUpload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <Upload className="w-5 h-5" />
              Subir Archivo
            </button>
          </div>
        </motion.div>

        {/* Files Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Archivos Disponibles</h2>
            <span className="text-sm text-gray-600">{filteredFiles.length} archivos encontrados</span>
          </div>
          
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 rounded-3xl bg-gray-100 flex items-center justify-center text-gray-400 mx-auto mb-4">
                <FileText className="w-12 h-12" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron archivos</h3>
              <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFiles.map((file) => (
                <div key={file.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {file.type.toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{file.name}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Tamaño:</span>
                      <span>{file.size}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Descargas:</span>
                      <span>{file.downloads}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Categoría:</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        {file.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {file.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                    {file.tags.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{file.tags.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleDownload(file)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    Descargar
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Grid de funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gestor PDFs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => handleNavigation('buscador-contenidos')}
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gestor PDFs</h3>
              <p className="text-gray-600 text-sm">Organiza y gestiona todos tus documentos PDF de manera eficiente</p>
            </div>
          </motion.div>

          {/* Biblioteca Archivos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => handleNavigation('contenidos-articulos')}
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <FolderOpen className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Biblioteca Archivos</h3>
              <p className="text-gray-600 text-sm">Almacena y organiza todos tus archivos en una biblioteca centralizada</p>
            </div>
          </motion.div>

          {/* Plantillas Pro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => handleNavigation('contenidos-video')}
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plantillas Pro</h3>
              <p className="text-gray-600 text-sm">Accede a plantillas profesionales y personalizables para tu contenido</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal para subir archivos */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Subir Nuevo Archivo"
        size="lg"
      >
        <div className="space-y-6">
          {/* Selector de archivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Archivo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.xlsx,.xls,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                {uploadFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <File className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{uploadFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setUploadFile(null);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Haz clic para seleccionar un archivo
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF, DOC, XLSX, PPT, JPG, PNG (máx. 10MB)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar categoría</option>
              {categories.filter(cat => cat !== 'Todos').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Etiquetas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Etiquetas
            </label>
            <input
              type="text"
              value={uploadTags}
              onChange={(e) => setUploadTags(e.target.value)}
              placeholder="Separar etiquetas con comas (ej: nutrición, guía, completa)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowUploadModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleFileUpload}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Subir Archivo
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContenidosDescargablesPage;
