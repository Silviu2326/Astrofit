import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, ArrowRight } from 'lucide-react';

const AnalisisRival: React.FC = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
    >
      {/* Efecto hover */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Target className="w-8 h-8" />
          </div>
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm group-hover:translate-x-1 transition-transform duration-300">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2">Análisis de Rival</h3>
        <p className="text-orange-100 text-sm leading-relaxed">
          Análisis automático de rival con recomendaciones tácticas avanzadas.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-yellow-300" />
          <span className="text-xs font-semibold text-yellow-300">Análisis Profundo</span>
        </div>
      </div>
    </motion.button>
  );
};

export default AnalisisRival;
