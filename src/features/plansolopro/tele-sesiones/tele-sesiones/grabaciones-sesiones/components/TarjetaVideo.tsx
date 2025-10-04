import React from 'react';
import { motion } from 'framer-motion';
import { VideoRecording } from '../grabacionesSesionesApi';
import { Play, Clock, Calendar, FileVideo, Download, Share2, Eye } from 'lucide-react';

interface TarjetaVideoProps {
  video: VideoRecording;
  onSelect: (video: VideoRecording) => void;
}

const TarjetaVideo: React.FC<TarjetaVideoProps> = ({ video, onSelect }) => {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Simulación de compartir link
    navigator.clipboard.writeText(video.url);
    alert('Link copiado al portapapeles');
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(video.url, '_blank');
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(video)}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-white/50 relative group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000 z-10"></div>

      {/* Thumbnail con overlay */}
      <div className="relative overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white flex items-center justify-center">
            <Play className="w-8 h-8 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
          <span className="text-xs font-semibold text-white flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.duration}
          </span>
        </div>

        {/* Type badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
          <span className="text-xs font-bold text-white">{video.type}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 relative z-10">
        {/* Título */}
        <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-1 group-hover:text-purple-600 transition-colors duration-300">
          {video.title}
        </h3>

        {/* Metadata */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-purple-500" />
            <span>{new Date(video.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileVideo className="w-4 h-4 text-pink-500" />
            <span>{video.size}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Eye className="w-4 h-4 text-rose-500" />
            <span>{video.views || 0} vistas</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex-1 px-3 py-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Descargar
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className="px-3 py-2 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300 flex items-center justify-center"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TarjetaVideo;
