import React from 'react';
import { motion } from 'framer-motion';
import { User, Mic, MicOff, Video as VideoIcon, VideoOff } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOff: boolean;
}

const mockParticipants: Participant[] = [
  { id: '2', name: 'Ana García', isMuted: false, isVideoOff: false },
  { id: '3', name: 'Luis Martínez', isMuted: true, isVideoOff: false },
  { id: '4', name: 'María López', isMuted: false, isVideoOff: true },
];

const PanelVideo: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      {/* Main Video Feed - Presentador */}
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Video Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950"></div>

        {/* Decorative Blur Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Placeholder for Main Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center justify-center"
        >
          {/* Avatar Circle */}
          <div className="relative mb-6">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl">
              <User className="w-16 h-16 md:w-24 md:h-24 text-white" />
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 blur-2xl opacity-40 animate-pulse"></div>
          </div>

          {/* Name Badge */}
          <div className="px-6 py-3 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10">
            <p className="text-xl md:text-2xl font-bold text-white">Dr. Carlos Ruiz</p>
            <p className="text-sm text-cyan-300 text-center">Presentador Principal</p>
          </div>

          {/* Status Indicator */}
          <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-md rounded-full border border-green-300/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-green-300">Conectado</span>
          </div>
        </motion.div>

        {/* Watermark/Logo (opcional) */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-slate-900/40 backdrop-blur-sm rounded-xl border border-white/10">
          <span className="text-xs font-bold text-white/80">SESIÓN PROFESIONAL</span>
        </div>
      </div>

      {/* Grid de Participantes Secundarios */}
      <div className="absolute bottom-20 md:bottom-24 right-4 flex flex-col gap-2 max-h-[50%] overflow-y-auto">
        {mockParticipants.map((participant, index) => (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
            whileHover={{ scale: 1.05, x: -5 }}
            className="relative group"
          >
            {/* Mini Video Card */}
            <div className="w-32 md:w-40 h-24 md:h-28 bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl">
              {participant.isVideoOff ? (
                // Video Off - Show Avatar
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-2">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <VideoOff className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ) : (
                // Video On - Show placeholder with gradient
                <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
              )}

              {/* Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-gradient-to-t from-slate-900/90 to-transparent">
                <p className="text-xs font-semibold text-white truncate">{participant.name}</p>
              </div>

              {/* Status Icons */}
              <div className="absolute top-2 right-2 flex gap-1">
                {participant.isMuted ? (
                  <div className="p-1 bg-red-500/80 backdrop-blur-sm rounded-lg">
                    <MicOff className="w-3 h-3 text-white" />
                  </div>
                ) : (
                  <div className="p-1 bg-green-500/80 backdrop-blur-sm rounded-lg">
                    <Mic className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 rounded-2xl transition-all duration-300"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PanelVideo;
