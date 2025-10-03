import React from 'react';
import { motion } from 'framer-motion';
import { Video, Camera, Mic, Users2, CheckCircle2 } from 'lucide-react';

const CoberturaMediatica: React.FC = () => {
  const estadisticas = [
    { titulo: 'Acreditaciones', valor: 145, icono: Users2, color: 'from-blue-500 to-cyan-500' },
    { titulo: 'Cámaras', valor: 24, icono: Camera, color: 'from-purple-500 to-pink-500' },
    { titulo: 'Streaming', valor: 8, icono: Video, color: 'from-red-500 to-orange-500' },
    { titulo: 'Podcasts', valor: 12, icono: Mic, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Video className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Sistema de Cobertura Mediática</h2>
        </div>
        <p className="text-pink-100 mt-2 ml-11">Gestión de acreditaciones de prensa y broadcasting</p>
      </div>

      {/* Body */}
      <div className="p-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {estadisticas.map((stat, index) => {
            const IconComponent = stat.icono;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -5 }}
                className="text-center p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.valor}</p>
                <p className="text-sm text-gray-600 font-medium">{stat.titulo}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Transmisión en vivo activa - 3 canales</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CoberturaMediatica;
