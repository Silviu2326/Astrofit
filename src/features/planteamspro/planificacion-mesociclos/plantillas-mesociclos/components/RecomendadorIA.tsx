import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, TrendingUp } from 'lucide-react';

const RecomendadorIA: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          Recomendador de Plantillas por IA
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Obtén recomendaciones inteligentes basadas en el historial de entrenamiento y las características de tu equipo
        </p>

        {/* Cards de recomendaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500 rounded-xl">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-purple-900">Recomendación IA</h4>
            </div>
            <p className="text-sm text-purple-700">Plantillas sugeridas según tu historial</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500 rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-blue-900">Análisis predictivo</h4>
            </div>
            <p className="text-sm text-blue-700">Basado en rendimiento de tu equipo</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecomendadorIA;
