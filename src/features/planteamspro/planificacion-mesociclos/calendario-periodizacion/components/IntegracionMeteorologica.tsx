import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain } from 'lucide-react';

const IntegracionMeteorologica: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Icono */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
          <Cloud className="w-8 h-8" />
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">Integración Meteorológica</h3>
        <p className="text-sm text-gray-600 mb-4">Datos meteorológicos para entrenamientos outdoor</p>

        {/* Indicador de funcionalidad */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
          <CloudRain className="w-4 h-4 text-cyan-600" />
          <span className="text-xs font-semibold text-cyan-700">Datos en tiempo real</span>
        </div>
      </div>
    </motion.div>
  );
};

export default IntegracionMeteorologica;
