// src/features/historial-rendimiento/components/AnalisisCorrelaciones.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';

const AnalisisCorrelaciones: React.FC = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-600 opacity-5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        {/* Icono */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
          <GitBranch className="w-8 h-8" />
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Análisis de Correlaciones
        </h3>

        {/* Descripción */}
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Relaciones entre métricas de rendimiento y factores de entrenamiento
        </p>

        {/* Badge indicador */}
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-200">
            <span className="text-xs font-bold text-blue-700">Estadísticas</span>
          </div>
        </div>

        {/* Barra decorativa */}
        <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '85%' }}
            transition={{ delay: 0.6, duration: 1 }}
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisCorrelaciones;
