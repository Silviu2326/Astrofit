import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  X, Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  Settings, ThumbsUp, ThumbsDown, Share2, Flag, Download,
  ChevronDown, Eye, Calendar, PlayCircle, Clock
} from 'lucide-react';
import { Video } from '../contenidosVideoApi';

interface VideoPlayerModalProps {
  video: Video;
  relatedVideos: Video[];
  onClose: () => void;
  onVideoSelect: (video: Video) => void;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  relatedVideos,
  onClose,
  onVideoSelect
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{video.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Columna Principal - Reproductor y Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl group">
                <div className="relative aspect-video">
                  {/* Placeholder del video */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Controles del reproductor simulados */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                      {/* Progress bar */}
                      <div className="w-full h-1 bg-white/30 rounded-full cursor-pointer">
                        <div className="h-full w-1/3 bg-red-500 rounded-full"></div>
                      </div>

                      {/* Controles */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={togglePlay}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="w-6 h-6 text-white" />
                            ) : (
                              <Play className="w-6 h-6 text-white" />
                            )}
                          </button>
                          <button
                            onClick={toggleMute}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                          >
                            {isMuted ? (
                              <VolumeX className="w-5 h-5 text-white" />
                            ) : (
                              <Volume2 className="w-5 h-5 text-white" />
                            )}
                          </button>
                          <span className="text-white text-sm font-medium">
                            0:00 / {video.duration}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            <Settings className="w-5 h-5 text-white" />
                          </button>
                          <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                            {isFullscreen ? (
                              <Minimize className="w-5 h-5 text-white" />
                            ) : (
                              <Maximize className="w-5 h-5 text-white" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información del video */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200">
                {/* Título y categoría */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{video.title}</h2>
                  <div className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-sm font-bold">
                    {video.category}
                  </div>
                </div>

                {/* Métricas y acciones */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span className="font-semibold">{formatViews(video.views)} vistas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{getRelativeTime(video.publishedAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        liked
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-semibold">{formatViews(video.likes)}</span>
                    </button>
                    <button
                      onClick={handleDislike}
                      className={`p-2 rounded-full transition-all ${
                        disliked
                          ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                      <Share2 className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                      <Download className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                      <Flag className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>

                {/* Autor */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={video.author.avatar}
                      alt={video.author.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{video.author.name}</h3>
                      <p className="text-sm text-gray-500">Instructor Profesional</p>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transition-all">
                    Suscribirse
                  </button>
                </div>

                {/* Descripción */}
                <div>
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="flex items-center gap-2 text-gray-700 font-semibold mb-2 hover:text-gray-900 transition-colors"
                  >
                    <span>Descripción</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showDescription ? 'rotate-180' : ''}`} />
                  </button>
                  {showDescription && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-gray-600 leading-relaxed mb-4"
                    >
                      <p>{video.description}</p>
                    </motion.div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {video.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full text-sm text-gray-700 border border-gray-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Videos Relacionados */}
            <div className="lg:col-span-1">
              <div className="sticky top-0">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-red-500" />
                  Videos Relacionados
                </h3>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  {relatedVideos.map((relatedVideo) => (
                    <motion.div
                      key={relatedVideo.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => onVideoSelect(relatedVideo)}
                      className="bg-white/80 backdrop-blur-xl rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all border border-gray-200 group"
                    >
                      <div className="flex gap-3 p-2">
                        <div className="relative w-40 flex-shrink-0">
                          <div className="aspect-video rounded-lg overflow-hidden">
                            <img
                              src={relatedVideo.thumbnail}
                              alt={relatedVideo.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Play className="w-8 h-8 text-white" />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-xs text-white font-bold">
                              {relatedVideo.duration}
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1 group-hover:text-red-600 transition-colors">
                            {relatedVideo.title}
                          </h4>
                          <p className="text-xs text-gray-500 mb-1">{relatedVideo.author.name}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{formatViews(relatedVideo.views)} vistas</span>
                            <span>•</span>
                            <span>{getRelativeTime(relatedVideo.publishedAt)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </motion.div>
  );
};

export default VideoPlayerModal;
