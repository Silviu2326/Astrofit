import React from 'react';
import { motion } from 'framer-motion';
import { Video, Play, Camera, Film } from 'lucide-react';

const IntegracionVideoanalisis: React.FC = () => {
  const videos = [
    { titulo: 'Último Entrenamiento', duracion: '45:30', icon: Play },
    { titulo: 'Análisis Táctico', duracion: '22:15', icon: Film },
    { titulo: 'Highlights Equipo', duracion: '08:45', icon: Camera },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl">
            <Video className="w-5 h-5 text-white" />
          </div>
          Videoanálisis
        </h3>

        <div className="space-y-3">
          {videos.map((video, index) => {
            const Icon = video.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 hover:border-violet-300 transition-all duration-300 cursor-pointer group/video"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">{video.titulo}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="px-2 py-0.5 bg-violet-500 rounded-full">
                        <span className="text-xs font-bold text-white">{video.duracion}</span>
                      </div>
                      <span className="text-xs text-gray-500">Disponible</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Badge de estado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-50 to-purple-50 rounded-full border border-violet-200"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-violet-700">Sistema Conectado</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntegracionVideoanalisis;
