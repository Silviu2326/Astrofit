import React from 'react';
import { motion } from 'framer-motion';
import { Video, Play, ExternalLink } from 'lucide-react';

const IntegracionAnalisisVideo: React.FC = () => {
  const clips = [
    { momento: 'Min 15:23', descripcion: 'Aceleración máxima registrada', tipo: 'Pico de rendimiento', color: 'from-green-500 to-emerald-600' },
    { momento: 'Min 32:45', descripcion: 'Asimetría detectada en salto', tipo: 'Alerta biomecánica', color: 'from-orange-500 to-red-500' },
    { momento: 'Min 58:12', descripcion: 'Sprint de alta intensidad', tipo: 'Evento destacado', color: 'from-blue-500 to-indigo-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Video className="w-6 h-6" />
          </div>
          Integración con Análisis de Video
        </h2>
      </div>

      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Integración con sistemas de análisis de video para <span className="font-bold text-pink-700 px-2 py-1 bg-pink-50 rounded-lg">contexto táctico</span>.
        </p>

        {/* Clips vinculados */}
        <div className="space-y-4 mb-6">
          {clips.map((clip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4 group"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${clip.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Play className="w-8 h-8" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-gray-900">{clip.momento}</p>
                  <div className={`px-3 py-1 bg-gradient-to-r ${clip.color} rounded-full`}>
                    <span className="text-xs font-bold text-white">{clip.tipo}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{clip.descripcion}</p>
              </div>

              <button className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl text-white hover:shadow-lg transition-all duration-300">
                <ExternalLink className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Info adicional */}
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-100">
          <p className="text-gray-700 leading-relaxed">
            <span className="font-bold text-pink-700">Sincronización automática:</span> Los momentos clave detectados por sensores se vinculan automáticamente con el análisis de video para una revisión táctica completa.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default IntegracionAnalisisVideo;
