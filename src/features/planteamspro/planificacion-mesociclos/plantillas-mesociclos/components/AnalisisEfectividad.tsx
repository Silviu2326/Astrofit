import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Target } from 'lucide-react';

const AnalisisEfectividad: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <BarChart3 className="w-6 h-6" />
          </div>
          Análisis de Efectividad de Plantillas
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          Evalúa el rendimiento y efectividad de las plantillas utilizadas
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4 border border-cyan-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyan-500 rounded-xl">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-cyan-900">Mejora de rendimiento</h4>
                <div className="text-2xl font-bold text-cyan-900">+24%</div>
              </div>
            </div>
            <p className="text-sm text-cyan-700">Desde el uso de plantillas</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500 rounded-xl">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-blue-900">Objetivos alcanzados</h4>
                <div className="text-2xl font-bold text-blue-900">87%</div>
              </div>
            </div>
            <p className="text-sm text-blue-700">Tasa de éxito promedio</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisEfectividad;
