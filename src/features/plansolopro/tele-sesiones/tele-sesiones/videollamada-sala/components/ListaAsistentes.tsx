import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mic, MicOff, Video, VideoOff, Crown, MoreVertical, UserPlus } from 'lucide-react';

interface Attendee {
  id: string;
  name: string;
  isMuted: boolean;
  isVideoOff: boolean;
  role?: 'host' | 'participant';
  connectionQuality?: 'excellent' | 'good' | 'poor';
}

const mockAttendees: Attendee[] = [
  { id: '1', name: 'Dr. Carlos Ruiz', isMuted: false, isVideoOff: false, role: 'host', connectionQuality: 'excellent' },
  { id: '2', name: 'Ana García', isMuted: false, isVideoOff: false, role: 'participant', connectionQuality: 'excellent' },
  { id: '3', name: 'Luis Martínez', isMuted: true, isVideoOff: false, role: 'participant', connectionQuality: 'good' },
  { id: '4', name: 'María López', isMuted: false, isVideoOff: true, role: 'participant', connectionQuality: 'excellent' },
  { id: '5', name: 'Pedro Sánchez', isMuted: false, isVideoOff: false, role: 'participant', connectionQuality: 'poor' },
];

const ListaAsistentes: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getConnectionColor = (quality?: string) => {
    switch (quality) {
      case 'excellent': return 'bg-green-400';
      case 'good': return 'bg-yellow-400';
      case 'poor': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="h-full bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-4 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Participantes</h3>
              <p className="text-xs text-blue-100">{mockAttendees.length} en la sesión</p>
            </div>
          </div>

          {/* Add Participant Button */}
          <button
            className="p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all duration-200"
            title="Invitar participante"
          >
            <UserPlus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Participants List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {mockAttendees.map((attendee, index) => (
          <motion.div
            key={attendee.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onMouseEnter={() => setHoveredId(attendee.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative group"
          >
            {/* Participant Card */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                    attendee.role === 'host'
                      ? 'from-yellow-400 to-orange-500'
                      : 'from-indigo-400 to-purple-500'
                  } flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {attendee.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  {/* Connection Quality Indicator */}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full ${getConnectionColor(attendee.connectionQuality)} ring-2 ring-slate-900`}></div>

                  {/* Host Badge */}
                  {attendee.role === 'host' && (
                    <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-0.5">
                      <Crown className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* Name and Status */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white truncate">
                      {attendee.name}
                    </p>
                    {attendee.role === 'host' && (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 text-xs font-bold rounded-full">
                        Anfitrión
                      </span>
                    )}
                  </div>

                  {/* Status Icons Row */}
                  <div className="flex items-center gap-2 mt-1">
                    {/* Mic Status */}
                    <div className={`flex items-center gap-1 ${
                      attendee.isMuted ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {attendee.isMuted ? (
                        <MicOff className="w-3 h-3" />
                      ) : (
                        <Mic className="w-3 h-3" />
                      )}
                    </div>

                    {/* Video Status */}
                    <div className={`flex items-center gap-1 ${
                      attendee.isVideoOff ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {attendee.isVideoOff ? (
                        <VideoOff className="w-3 h-3" />
                      ) : (
                        <Video className="w-3 h-3" />
                      )}
                    </div>

                    {/* Connection Quality Text */}
                    <span className="text-xs text-gray-400 ml-1">
                      {attendee.connectionQuality === 'excellent' && '⚡ Excelente'}
                      {attendee.connectionQuality === 'good' && '⚠️ Buena'}
                      {attendee.connectionQuality === 'poor' && '🔴 Pobre'}
                    </span>
                  </div>
                </div>

                {/* More Options */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all duration-200 flex-shrink-0 ${
                    hoveredId === attendee.id ? 'opacity-100' : 'opacity-0'
                  }`}
                  title="Más opciones"
                >
                  <MoreVertical className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer - Quick Stats */}
      <div className="p-4 bg-slate-900/60 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around text-center">
          {/* Active Mics */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-green-400">
              <Mic className="w-4 h-4" />
              <span className="text-sm font-bold">
                {mockAttendees.filter(a => !a.isMuted).length}
              </span>
            </div>
            <span className="text-xs text-gray-400 mt-0.5">Activos</span>
          </div>

          {/* Active Cameras */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-blue-400">
              <Video className="w-4 h-4" />
              <span className="text-sm font-bold">
                {mockAttendees.filter(a => !a.isVideoOff).length}
              </span>
            </div>
            <span className="text-xs text-gray-400 mt-0.5">Cámaras</span>
          </div>

          {/* Total Participants */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-purple-400">
              <Users className="w-4 h-4" />
              <span className="text-sm font-bold">{mockAttendees.length}</span>
            </div>
            <span className="text-xs text-gray-400 mt-0.5">Total</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListaAsistentes;
