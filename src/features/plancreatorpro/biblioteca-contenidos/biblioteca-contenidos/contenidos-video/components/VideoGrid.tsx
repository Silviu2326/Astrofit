import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Clock, ThumbsUp, Heart, Share2, BookMarked, Sparkles, User } from 'lucide-react';
import { Video } from '../contenidosVideoApi';

interface VideoGridProps {
  videos: Video[];
  viewMode: 'grid' | 'list';
  onVideoClick: (video: Video) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, viewMode, onVideoClick }) => {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Hoy';
    if (diffInDays === 1) return 'Ayer';
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    if (diffInDays < 30) return `Hace ${Math.floor(diffInDays / 7)} semanas`;
    return `Hace más de 1 mes`;
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
          <Play className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron videos</h3>
        <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            onMouseEnter={() => setHoveredVideo(video.id)}
            onMouseLeave={() => setHoveredVideo(null)}
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/50 cursor-pointer group"
            onClick={() => onVideoClick(video)}
          >
            <div className="flex flex-col sm:flex-row gap-4 p-4">
              {/* Thumbnail */}
              <div className="relative w-full sm:w-64 flex-shrink-0">
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl">
                      <Play className="w-7 h-7 text-red-500 ml-1" />
                    </div>
                  </div>

                  {/* Duración */}
                  <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-white text-xs font-bold">{video.duration}</span>
                  </div>

                  {/* Badge de nuevo */}
                  {video.isNew && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full">
                      <span className="text-white text-xs font-bold">NUEVO</span>
                    </div>
                  )}

                  {/* Calidad */}
                  <div className="absolute top-2 right-2 bg-purple-500/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-white text-xs font-bold">{video.quality}</span>
                  </div>
                </div>
              </div>

              {/* Información */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {video.title}
                    </h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryGradient(video.category)} text-white`}>
                      {video.category}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {video.description}
                  </p>

                  {/* Autor */}
                  <div className="flex items-center gap-2 mb-3">
                    <img
                      src={video.author.avatar}
                      alt={video.author.name}
                      className="w-8 h-8 rounded-full border-2 border-white shadow"
                    />
                    <span className="text-sm font-medium text-gray-700">{video.author.name}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {video.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Métricas y acciones */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{formatViews(video.views)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{formatViews(video.likes)}</span>
                    </div>
                    <span>{getRelativeTime(video.publishedAt)}</span>
                  </div>

                  {/* Acciones rápidas */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <BookMarked className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Grid view
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05, duration: 0.4 }}
          onMouseEnter={() => setHoveredVideo(video.id)}
          onMouseLeave={() => setHoveredVideo(null)}
          whileHover={{ y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 cursor-pointer group"
          onClick={() => onVideoClick(video)}
        >
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Play overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl"
              >
                <Play className="w-8 h-8 text-red-500 ml-1" />
              </motion.div>
            </div>

            {/* Duración */}
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg">
              <span className="text-white text-xs font-bold">{video.duration}</span>
            </div>

            {/* Badge de categoría */}
            <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryGradient(video.category)} text-white`}>
              {video.category}
            </div>

            {/* Badge de nuevo */}
            {video.isNew && (
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full animate-pulse">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-white text-xs font-bold">NUEVO</span>
              </div>
            )}

            {/* Calidad badge */}
            <div className="absolute bottom-2 left-2 bg-purple-500/90 backdrop-blur-sm px-2 py-1 rounded-lg">
              <span className="text-white text-xs font-bold">{video.quality}</span>
            </div>

            {/* Acciones rápidas al hover */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <Heart className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <BookMarked className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Info del video */}
          <div className="p-4">
            {/* Autor */}
            <div className="flex items-center gap-2 mb-3">
              <img
                src={video.author.avatar}
                alt={video.author.name}
                className="w-8 h-8 rounded-full border-2 border-white shadow"
              />
              <span className="text-sm font-medium text-gray-700 truncate">{video.author.name}</span>
            </div>

            {/* Título */}
            <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors leading-tight">
              {video.title}
            </h3>

            {/* Métricas */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{formatViews(video.views)}</span>
              </div>
              <span className="text-xs">{getRelativeTime(video.publishedAt)}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {video.tags.slice(0, 2).map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full text-xs text-gray-600 border border-gray-200">
                  #{tag}
                </span>
              ))}
              {video.tags.length > 2 && (
                <span className="px-2 py-1 bg-gray-50 rounded-full text-xs text-gray-500">
                  +{video.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const getCategoryGradient = (category: string): string => {
  const gradients: Record<string, string> = {
    'Tutoriales': 'from-blue-500 to-indigo-600',
    'Entrenamientos': 'from-red-500 to-pink-600',
    'Nutrición': 'from-green-500 to-emerald-600',
    'Motivación': 'from-yellow-500 to-orange-600',
    'Webinars': 'from-purple-500 to-indigo-600'
  };
  return gradients[category] || 'from-gray-500 to-gray-600';
};

export default VideoGrid;
