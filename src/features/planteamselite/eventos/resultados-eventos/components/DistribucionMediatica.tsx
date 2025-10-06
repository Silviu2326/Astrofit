import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Radio, Wifi } from 'lucide-react';

const DistribucionMediatica: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Icono */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
          <Tv className="w-8 h-8" />
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Distribución Mediática
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Distribución automática a través de APIs deportivas y medios.
        </p>

        {/* Indicadores */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-lg">
            <Radio className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-700">Radio</span>
          </div>
          <div className="flex items-center gap-1 px-3 py-1 bg-purple-50 rounded-lg">
            <Wifi className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold text-purple-700">Streaming</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DistribucionMediatica;
