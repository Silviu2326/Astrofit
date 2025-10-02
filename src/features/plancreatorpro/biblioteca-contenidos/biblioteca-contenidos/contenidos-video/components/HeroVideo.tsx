import React from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Clock, ThumbsUp, Tag, Calendar, User } from 'lucide-react';
import { Video } from '../contenidosVideoApi';

interface HeroVideoProps {
  video: Video;
  onPlay: () => void;
}

const HeroVideo: React.FC<HeroVideoProps> = ({ video, onPlay }) => {
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
    if (diffInDays < 365) return `Hace ${Math.floor(diffInDays / 30)} meses`;
    return `Hace ${Math.floor(diffInDays / 365)} años`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden mb-8 border border-white/50"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 md:p-8">
        {/* Thumbnail del video */}
        <div className="relative group cursor-pointer" onClick={onPlay}>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />

            {/* Play overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-red-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:bg-red-500 transition-colors duration-300">
                  <Play className="w-10 h-10 text-red-500 group-hover:text-white ml-1 transition-colors duration-300" />
                </div>
              </motion.div>
            </div>

            {/* Duración */}
            <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg">
              <span className="text-white text-sm font-bold">{video.duration}</span>
            </div>

            {/* Badge de categoría */}
            <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded-full">
              <span className="text-white text-xs font-bold uppercase">{video.category}</span>
            </div>

            {/* Badge de Nuevo */}
            {video.isNew && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full animate-pulse">
                <span className="text-white text-xs font-bold">NUEVO</span>
              </div>
            )}

            {/* Calidad */}
            <div className="absolute bottom-4 left-4 bg-purple-500/90 backdrop-blur-sm px-3 py-1 rounded-lg">
              <span className="text-white text-xs font-bold">{video.quality}</span>
            </div>
          </div>
        </div>

        {/* Información del video */}
        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-3 py-1 bg-gradient-to-r from-red-50 to-pink-50 rounded-full border border-red-200">
                <span className="text-xs font-bold text-red-700">VIDEO DESTACADO</span>
              </div>
              {video.playlist && (
                <div className="px-3 py-1 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-full border border-purple-200">
                  <span className="text-xs font-bold text-purple-700">{video.playlist}</span>
                </div>
              )}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              {video.title}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {video.description}
            </p>

            {/* Autor */}
            <div className="flex items-center gap-3 mb-6">
              <img
                src={video.author.avatar}
                alt={video.author.name}
                className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
              />
              <div>
                <p className="font-semibold text-gray-900">{video.author.name}</p>
                <p className="text-sm text-gray-500">Instructor</p>
              </div>
            </div>

            {/* Métricas */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Eye className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {formatViews(video.views)} vistas
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <ThumbsUp className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {formatViews(video.likes)} likes
                </span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">{video.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">
                  {getRelativeTime(video.publishedAt)}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {video.tags.map((tag, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full border border-gray-200"
                >
                  <span className="text-xs font-medium text-gray-700">#{tag}</span>
                </div>
              ))}
            </div>

            {/* Botón de acción */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPlay}
              className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Ver Ahora</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroVideo;
