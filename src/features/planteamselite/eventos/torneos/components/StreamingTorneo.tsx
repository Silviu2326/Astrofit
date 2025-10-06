import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Radio, Users, Eye, Camera, Video } from 'lucide-react';

const StreamingTorneo: React.FC = () => {
  const liveStreams = [
    { id: 1, match: 'Alpha vs Beta', viewers: 1245, status: 'live', platform: 'Twitch' },
    { id: 2, match: 'Gamma vs Delta', viewers: 892, status: 'live', platform: 'YouTube' },
    { id: 3, match: 'Epsilon vs Zeta', viewers: 0, status: 'scheduled', platform: 'Twitch' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Streaming de Torneos</h2>
          </div>
          <p className="text-purple-100 ml-12">
            Transmite y gestiona partidos en vivo desde múltiples plataformas
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveStreams.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 bg-white/80 group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Video Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                {/* Pattern de fondo */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                {/* Live Badge */}
                {stream.status === 'live' && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-2 bg-red-500 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20 animate-pulse">
                      <Radio className="w-4 h-4 text-white" />
                      <span className="text-xs font-bold text-white uppercase">En Vivo</span>
                    </div>
                  </div>
                )}

                {/* Platform Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="px-3 py-1 bg-purple-500/90 backdrop-blur-md rounded-full border border-white/20">
                    <span className="text-xs font-bold text-white">{stream.platform}</span>
                  </div>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center cursor-pointer group-hover:bg-white/30 transition-all duration-300"
                  >
                    <PlayCircle className="w-10 h-10 text-white" />
                  </motion.div>
                </div>

                {/* Viewers */}
                {stream.status === 'live' && (
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
                      <Eye className="w-4 h-4 text-white" />
                      <span className="text-xs font-bold text-white">{stream.viewers.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{stream.match}</h3>

                {stream.status === 'live' ? (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-red-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs font-semibold text-red-600">En Curso</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Programado para más tarde</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white font-bold group border border-white/20"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-center gap-2">
              <PlayCircle className="w-5 h-5" />
              <span>Iniciar Nuevo Streaming</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default StreamingTorneo;
