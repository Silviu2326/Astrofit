// Sistema registro tiempo real cronómetros mediciones
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';

const RegistroTiempoReal: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      className="relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-white/50 group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-500 to-red-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Icono */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Clock className="w-7 h-7" />
        </div>

        {/* Título */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">Registro Tiempo Real</h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
          Cronómetros y mediciones en vivo durante las pruebas
        </p>

        {/* Badge */}
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 rounded-full border border-orange-200">
          <Zap className="w-3 h-3 text-orange-600" />
          <span className="text-xs font-bold text-orange-700">En Vivo</span>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistroTiempoReal;
