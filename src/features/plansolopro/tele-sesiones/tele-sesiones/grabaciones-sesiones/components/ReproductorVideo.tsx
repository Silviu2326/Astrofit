import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VideoRecording } from '../grabacionesSesionesApi';
import { X, Download, Share2, Calendar, Clock, FileVideo, Eye, MessageSquare, Volume2 } from 'lucide-react';

interface ReproductorVideoProps {
  video: VideoRecording;
  onClose: () => void;
}

const ReproductorVideo: React.FC<ReproductorVideoProps> = ({ video, onClose }) => {
  const [showTranscription, setShowTranscription] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(video.url);
    alert('Link copiado al portapapeles');
  };

  const handleDownload = () => {
    window.open(video.url, '_blank');
  };

  // Simulación de transcripción
  const transcription = `Esta es una transcripción automática de la sesión "${video.title}".

En esta sesión se discutieron diversos temas relacionados con el progreso del cliente. Se establecieron nuevos objetivos y se revisó el avance de los objetivos anteriores.

El cliente mostró una actitud positiva y comprometida durante toda la sesión. Se identificaron áreas de mejora y se planificaron las próximas sesiones.`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50"
    >
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 p-6">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
                <span className="text-xs font-bold text-white">{video.type}</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{video.title}</h2>
            <div className="flex flex-wrap gap-4 text-sm text-purple-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(video.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{video.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileVideo className="w-4 h-4" />
                <span>{video.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{video.views || 0} vistas</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Video Player */}
      <div className="p-6">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6 bg-black">
          <video
            controls
            src={video.url}
            className="w-full h-auto max-h-[500px]"
            autoPlay
          >
            Tu navegador no soporta el elemento de video.
          </video>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="px-6 py-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Descargar Video
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="px-6 py-3 border-2 border-purple-500 text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Compartir Link
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowTranscription(!showTranscription)}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              showTranscription
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl'
                : 'border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            Transcripción
          </motion.button>
        </div>

        {/* Transcription Panel */}
        {showTranscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Transcripción Automática</h3>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 max-h-60 overflow-y-auto">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {transcription}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-3 italic">
              * La transcripción automática puede contener errores. Por favor, verifica el contenido.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ReproductorVideo;
