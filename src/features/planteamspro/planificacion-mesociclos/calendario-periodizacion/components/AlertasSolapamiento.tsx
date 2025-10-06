import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Bell } from 'lucide-react';

const AlertasSolapamiento: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-yellow-400 to-amber-500 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Icono */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">Alertas de Solapamiento</h3>
        <p className="text-sm text-gray-600 mb-4">Detecta fases y períodos intensos solapados</p>

        {/* Indicador de funcionalidad */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-300">
          <Bell className="w-4 h-4 text-yellow-600" />
          <span className="text-xs font-semibold text-yellow-700">Detección activa</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AlertasSolapamiento;
