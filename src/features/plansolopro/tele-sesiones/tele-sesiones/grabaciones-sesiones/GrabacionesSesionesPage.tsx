import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Users, 
  Clock, 
  Download,
  RefreshCw,
  Eye,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Share,
  BookOpen,
  Zap,
  Target,
  Activity,
  Award,
  Play,
  Pause
} from 'lucide-react';
import VideotecaGrid from './components/VideotecaGrid';
import ReproductorVideo from './components/ReproductorVideo';
import PermisosAcceso from './components/PermisosAcceso';

const GrabacionesSesionesPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [showPermissions, setShowPermissions] = useState(false);

  const videos = [
    { id: '1', title: 'Sesión 1', thumbnail: 'https://via.placeholder.com/150', date: '2023-01-15', type: 'Consulta', duration: '30:00', size: '50MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: '2', title: 'Sesión 2', thumbnail: 'https://via.placeholder.com/150', date: '2023-02-20', type: 'Terapia', duration: '45:00', size: '75MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: '3', title: 'Sesión 3', thumbnail: 'https://via.placeholder.com/150', date: '2023-03-10', type: 'Seguimiento', duration: '20:00', size: '30MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  ];

  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  const handleManagePermissions = () => {
    setShowPermissions(true);
  };

  const handleClosePermissions = () => {
    setShowPermissions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header con gradiente */}
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Video className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Grabaciones <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Sesiones</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona y reproduce las grabaciones de tus sesiones desde tu panel de entrenador
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Grabaciones Totales</p>
              <p className="text-2xl font-bold text-gray-900">127</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Horas Grabadas</p>
              <p className="text-2xl font-bold text-gray-900">89.5h</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Espacio Usado</p>
              <p className="text-2xl font-bold text-gray-900">2.4GB</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Clientes Únicos</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-[1920px] mx-auto px-6">

      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="filterDate" className="mr-2">Filtrar por fecha:</label>
          <input type="date" id="filterDate" className="border p-1 rounded" />
        </div>
        <div>
          <label htmlFor="filterType" className="mr-2">Filtrar por tipo:</label>
          <select id="filterType" className="border p-1 rounded">
            <option value="">Todos</option>
            <option value="Consulta">Consulta</option>
            <option value="Terapia">Terapia</option>
            <option value="Seguimiento">Seguimiento</option>
          </select>
        </div>
        <button onClick={handleManagePermissions} className="bg-blue-500 text-white px-4 py-2 rounded">
          Gestionar Permisos
        </button>
      </div>

        {selectedVideo ? (
          <ReproductorVideo video={selectedVideo} onClose={handleClosePlayer} />
        ) : (
          <VideotecaGrid videos={videos} onVideoSelect={handleVideoSelect} />
        )}

        {showPermissions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <PermisosAcceso onClose={handleClosePermissions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GrabacionesSesionesPage;
