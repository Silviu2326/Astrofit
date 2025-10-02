import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Video, Clock, HardDrive, Eye, Search, Filter, Share2, Download, Settings } from 'lucide-react';
import VideotecaGrid from './components/VideotecaGrid';
import ReproductorVideo from './components/ReproductorVideo';
import PermisosAcceso from './components/PermisosAcceso';

const GrabacionesSesionesPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterType, setFilterType] = useState('');

  const videos = [
    { id: '1', title: 'Sesión 1', thumbnail: 'https://via.placeholder.com/150', date: '2023-01-15', type: 'Consulta', duration: '30:00', size: '50MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4', views: 12 },
    { id: '2', title: 'Sesión 2', thumbnail: 'https://via.placeholder.com/150', date: '2023-02-20', type: 'Terapia', duration: '45:00', size: '75MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4', views: 8 },
    { id: '3', title: 'Sesión 3', thumbnail: 'https://via.placeholder.com/150', date: '2023-03-10', type: 'Seguimiento', duration: '20:00', size: '30MB', url: 'https://www.w3schools.com/html/mov_bbb.mp4', views: 15 },
  ];

  const estadisticas = [
    { title: 'Total de Grabaciones', value: '24', icon: Video, color: 'from-purple-500 to-pink-500', change: '+12.5' },
    { title: 'Horas de Video', value: '18.5', icon: Clock, color: 'from-pink-500 to-rose-500', change: '+8.3' },
    { title: 'Vistas Este Mes', value: '156', icon: Eye, color: 'from-rose-500 to-orange-500', change: '+23.1' },
    { title: 'Almacenamiento Usado', value: '2.4 GB', icon: HardDrive, color: 'from-purple-600 to-purple-500', change: '+5.2' },
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

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || video.date === filterDate;
    const matchesType = !filterType || video.type === filterType;
    return matchesSearch && matchesDate && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Play className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Grabaciones de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Sesiones</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed">
            Revive tus sesiones <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">cuando quieras</span>
          </p>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {estadisticas.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Búsqueda por título */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Search className="w-4 h-4 inline mr-2" />
              Buscar por título
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar grabaciones..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Filtro por fecha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Filtrar por fecha
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Filtro por tipo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-2" />
              Tipo de sesión
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            >
              <option value="">Todos</option>
              <option value="Consulta">Consulta</option>
              <option value="Terapia">Terapia</option>
              <option value="Seguimiento">Seguimiento</option>
            </select>
          </div>
        </div>

        {/* Botón de gestionar permisos */}
        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleManagePermissions}
            className="px-6 py-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
          >
            <Settings className="w-5 h-5" />
            Gestionar Permisos
          </motion.button>
        </div>
      </motion.div>

      {/* CONTENIDO PRINCIPAL */}
      {selectedVideo ? (
        <ReproductorVideo video={selectedVideo} onClose={handleClosePlayer} />
      ) : (
        <VideotecaGrid videos={filteredVideos} onVideoSelect={handleVideoSelect} />
      )}

      {/* MODAL DE PERMISOS */}
      {showPermissions && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <PermisosAcceso onClose={handleClosePermissions} />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default GrabacionesSesionesPage;
