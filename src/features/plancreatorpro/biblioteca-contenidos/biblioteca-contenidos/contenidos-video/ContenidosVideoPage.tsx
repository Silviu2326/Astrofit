import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Eye, Clock, TrendingUp, Video as VideoIcon, Sparkles,
  Search, Filter, Grid3x3, List, Heart, Share2, BookMarked,
  PlayCircle, ChevronRight, Star, Users, Calendar, Award,
  Monitor, Zap, Flame
} from 'lucide-react';
import { fetchVideos, Video } from './contenidosVideoApi';
import VideoPlayerModal from './components/VideoPlayerModal';
import HeroVideo from './components/HeroVideo';
import VideoStatsCards from './components/VideoStatsCards';
import CategoryTabs from './components/CategoryTabs';
import VideoGrid from './components/VideoGrid';
import VideoFilters from './components/VideoFilters';

const ContenidosVideoPage: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'views' | 'rating'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  // Filtros avanzados
  const [durationFilter, setDurationFilter] = useState<'all' | 'short' | 'medium' | 'long'>('all');
  const [qualityFilter, setQualityFilter] = useState<'all' | 'hd' | 'sd'>('all');

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [videos, selectedCategory, searchTerm, sortBy, durationFilter, qualityFilter]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const data = await fetchVideos();
      setVideos(data);
      setFilteredVideos(data);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...videos];

    // Filtro por categoría
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }

    // Filtro por búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchLower) ||
        video.description.toLowerCase().includes(searchLower) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filtro por duración
    if (durationFilter !== 'all') {
      filtered = filtered.filter(video => {
        const [minutes] = video.duration.split(':').map(Number);
        if (durationFilter === 'short') return minutes < 5;
        if (durationFilter === 'medium') return minutes >= 5 && minutes <= 20;
        if (durationFilter === 'long') return minutes > 20;
        return true;
      });
    }

    // Filtro por calidad
    if (qualityFilter !== 'all') {
      filtered = filtered.filter(video => {
        if (qualityFilter === 'hd') return video.quality === '1080p' || video.quality === '720p';
        if (qualityFilter === 'sd') return video.quality === '480p';
        return true;
      });
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'views':
          return b.views - a.views;
        case 'rating':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

    setFilteredVideos(filtered);
  };

  const featuredVideo = videos.find(v => v.id === '2') || videos[0];

  const stats = [
    {
      title: 'Total de Videos',
      value: videos.length,
      change: 12,
      icon: VideoIcon,
      gradient: 'from-red-500 via-pink-500 to-purple-500'
    },
    {
      title: 'Horas de Contenido',
      value: Math.floor(videos.reduce((acc, v) => {
        const [min] = v.duration.split(':').map(Number);
        return acc + min;
      }, 0) / 60),
      change: 8,
      icon: Clock,
      gradient: 'from-orange-500 via-red-500 to-pink-500'
    },
    {
      title: 'Total de Vistas',
      value: videos.reduce((acc, v) => acc + v.views, 0).toLocaleString(),
      change: 24,
      icon: Eye,
      gradient: 'from-pink-500 via-purple-500 to-indigo-500'
    },
    {
      title: 'Videos Nuevos',
      value: videos.filter(v => v.isNew).length,
      change: 15,
      icon: Sparkles,
      gradient: 'from-purple-500 via-pink-500 to-red-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-pink-50/30 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 font-medium">Cargando biblioteca de videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-pink-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Patrón de puntos */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <PlayCircle className="w-12 h-12 text-yellow-300" />
              </motion.div>
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Biblioteca de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Videos</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Aprende visualmente con nuestro contenido educativo premium
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="text-sm font-semibold text-white">{videos.filter(v => v.isNew).length} Videos Nuevos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Contenido Premium</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Monitor className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">HD Quality</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <VideoStatsCards stats={stats} />

      {/* VIDEO DESTACADO */}
      {featuredVideo && (
        <HeroVideo
          video={featuredVideo}
          onPlay={() => setSelectedVideo(featuredVideo)}
        />
      )}

      {/* BARRA DE BÚSQUEDA Y FILTROS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Búsqueda */}
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar videos por título, descripción o tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Vista */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filtros avanzados */}
        <VideoFilters
          sortBy={sortBy}
          setSortBy={setSortBy}
          durationFilter={durationFilter}
          setDurationFilter={setDurationFilter}
          qualityFilter={qualityFilter}
          setQualityFilter={setQualityFilter}
        />
      </motion.div>

      {/* CATEGORÍAS Y TABS */}
      <CategoryTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* CONTADOR DE RESULTADOS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6 flex items-center justify-between"
      >
        <p className="text-gray-600 font-medium">
          Mostrando <span className="font-bold text-gray-900">{filteredVideos.length}</span> de {videos.length} videos
        </p>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 transition-colors"
          >
            <span>Limpiar búsqueda</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </motion.div>

      {/* GRID DE VIDEOS */}
      <VideoGrid
        videos={filteredVideos}
        viewMode={viewMode}
        onVideoClick={(video) => setSelectedVideo(video)}
      />

      {/* MODAL DE REPRODUCTOR */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoPlayerModal
            video={selectedVideo}
            relatedVideos={videos.filter(v =>
              v.id !== selectedVideo.id &&
              (v.category === selectedVideo.category ||
               v.tags.some(tag => selectedVideo.tags.includes(tag)))
            ).slice(0, 10)}
            onClose={() => setSelectedVideo(null)}
            onVideoSelect={(video) => setSelectedVideo(video)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContenidosVideoPage;
