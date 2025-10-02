import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  PhoneOff,
  Settings,
  MoreVertical,
  Users,
  Hand,
  MessageSquare
} from 'lucide-react';

const ControlesVideo: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="relative"
    >
      {/* Main Controls Bar - Glassmorphism */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl px-4 py-3 flex items-center gap-2 md:gap-3">
        {/* Mic Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3 md:p-4 rounded-2xl transition-all duration-300 ${
            isMuted
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
          }`}
          title={isMuted ? 'Activar micrófono' : 'Silenciar micrófono'}
        >
          {isMuted ? (
            <MicOff className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <Mic className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </motion.button>

        {/* Video Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsVideoOff(!isVideoOff)}
          className={`p-3 md:p-4 rounded-2xl transition-all duration-300 ${
            isVideoOff
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
          }`}
          title={isVideoOff ? 'Activar cámara' : 'Desactivar cámara'}
        >
          {isVideoOff ? (
            <VideoOff className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <Video className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </motion.button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20 mx-1"></div>

        {/* Share Screen Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsScreenSharing(!isScreenSharing)}
          className={`p-3 md:p-4 rounded-2xl transition-all duration-300 ${
            isScreenSharing
              ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
              : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
          }`}
          title={isScreenSharing ? 'Detener compartir' : 'Compartir pantalla'}
        >
          {isScreenSharing ? (
            <MonitorOff className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <Monitor className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </motion.button>

        {/* Raise Hand */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 md:p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hidden md:block"
          title="Levantar mano"
        >
          <Hand className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20 mx-1 hidden md:block"></div>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 md:p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300 hidden md:block"
          title="Configuración"
        >
          <Settings className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>

        {/* More Options */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowMore(!showMore)}
          className="p-3 md:p-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300 md:hidden"
          title="Más opciones"
        >
          <MoreVertical className="w-5 h-5" />
        </motion.button>

        {/* Divider */}
        <div className="w-px h-8 bg-white/20 mx-1"></div>

        {/* End Call Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 md:px-6 py-3 md:py-4 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold shadow-xl transition-all duration-300 flex items-center gap-2"
          title="Finalizar llamada"
        >
          <PhoneOff className="w-5 h-5 md:w-6 md:h-6" />
          <span className="hidden md:inline text-sm">Salir</span>
        </motion.button>
      </div>

      {/* More Options Dropdown - Mobile */}
      {showMore && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full mb-2 right-0 bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-2 min-w-[200px]"
        >
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white transition-all duration-200">
            <Hand className="w-5 h-5" />
            <span className="text-sm font-semibold">Levantar mano</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-white transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span className="text-sm font-semibold">Configuración</span>
          </button>
        </motion.div>
      )}

      {/* Screen Sharing Visual Feedback */}
      {isScreenSharing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-cyan-500/90 backdrop-blur-md rounded-xl border border-cyan-300/30 shadow-xl"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-white">Compartiendo pantalla</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ControlesVideo;
