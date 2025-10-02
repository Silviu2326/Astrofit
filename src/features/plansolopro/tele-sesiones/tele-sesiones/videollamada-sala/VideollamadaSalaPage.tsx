import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Users, MessageSquare, X, ChevronRight, Signal } from 'lucide-react';
import PanelVideo from './components/PanelVideo';
import ListaAsistentes from './components/ListaAsistentes';
import ChatLateral from './components/ChatLateral';
import ControlesVideo from './components/ControlesVideo';

const VideollamadaSalaPage: React.FC = () => {
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
      {/* Hero Section - Pre-join (puede mostrarse condicionalmente) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 shadow-2xl p-4 md:p-6"
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

        <div className="relative z-10 flex items-center justify-between">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Video className="w-8 h-8 md:w-10 md:h-10 text-cyan-300 animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 md:w-10 md:h-10 bg-cyan-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                Sala de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Videollamada</span>
              </h1>
              <p className="text-sm md:text-lg text-blue-100">Tu sesión virtual profesional</p>
            </div>
          </div>

          {/* Connection Quality Indicator */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md ${
              connectionQuality === 'excellent'
                ? 'bg-green-500/20 border-green-300/30'
                : connectionQuality === 'good'
                ? 'bg-yellow-500/20 border-yellow-300/30'
                : 'bg-red-500/20 border-red-300/30'
            }`}>
              <Signal className={`w-4 h-4 ${
                connectionQuality === 'excellent' ? 'text-green-300' :
                connectionQuality === 'good' ? 'text-yellow-300' : 'text-red-300'
              }`} />
              <span className="text-xs font-semibold text-white hidden md:inline">
                {connectionQuality === 'excellent' ? 'Excelente' : connectionQuality === 'good' ? 'Buena' : 'Pobre'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Video Room */}
      <div className="flex h-[calc(100vh-120px)] md:h-[calc(100vh-140px)] p-2 md:p-4 gap-2 md:gap-4">
        {/* Video Panel Principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex-1 relative"
        >
          <div className="h-full bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden relative">
            <PanelVideo />

            {/* Controls Overlay - Glassmorphism */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
              <ControlesVideo />
            </div>

            {/* Top Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-4 left-4 right-4 flex items-center justify-between z-10"
            >
              {/* Session Info */}
              <div className="flex items-center gap-3 bg-slate-900/60 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/10">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-white">Sesión en vivo</span>
                <span className="text-xs text-gray-300 hidden md:inline">• 00:45:32</span>
              </div>

              {/* Toggle Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowParticipants(!showParticipants)}
                  className={`p-2 rounded-xl backdrop-blur-md transition-all duration-300 border ${
                    showParticipants
                      ? 'bg-white/20 border-white/30'
                      : 'bg-slate-900/60 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <Users className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => setShowChat(!showChat)}
                  className={`p-2 rounded-xl backdrop-blur-md transition-all duration-300 border ${
                    showChat
                      ? 'bg-white/20 border-white/30'
                      : 'bg-slate-900/60 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Sidebar - Asistentes y Chat */}
        {(showParticipants || showChat) && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full md:w-80 lg:w-96 flex flex-col gap-4"
          >
            {/* Lista de Asistentes */}
            {showParticipants && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={showChat ? 'h-1/2' : 'flex-1'}
              >
                <ListaAsistentes />
              </motion.div>
            )}

            {/* Chat Lateral */}
            {showChat && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={showParticipants ? 'h-1/2' : 'flex-1'}
              >
                <ChatLateral />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VideollamadaSalaPage;
