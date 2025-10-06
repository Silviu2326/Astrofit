// src/features/comparativas-longitudinales/components/CorrelacionesAutomaticas.tsx
// Correlaciones automáticas variables entrenamiento competencia
import React from 'react';
import { motion } from 'framer-motion';
import { Link2, ArrowRight } from 'lucide-react';

const CorrelacionesAutomaticas: React.FC = () => {
  const correlations = [
    { var1: 'Entrenamiento', var2: 'Competencia', strength: 0.92, type: 'strong' },
    { var1: 'Recuperación', var2: 'Rendimiento', strength: 0.78, type: 'moderate' },
    { var1: 'Nutrición', var2: 'Energía', strength: 0.85, type: 'strong' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border border-orange-200">
        <Link2 className="w-5 h-5 text-orange-600" />
        <p className="text-sm font-semibold text-orange-700">
          Correlaciones encontradas: <span className="font-bold">{correlations.length}</span>
        </p>
      </div>

      <div className="space-y-3">
        {correlations.map((corr, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-700 px-3 py-1 bg-gray-100 rounded-full">
                  {corr.var1}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-gray-700 px-3 py-1 bg-gray-100 rounded-full">
                  {corr.var2}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">Correlación</span>
                <span className={`text-xs font-bold ${
                  corr.type === 'strong' ? 'text-green-700' : 'text-yellow-700'
                }`}>
                  {(corr.strength * 100).toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${corr.strength * 100}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className={`h-full rounded-full ${
                    corr.type === 'strong'
                      ? 'bg-gradient-to-r from-green-400 to-emerald-600'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                  }`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CorrelacionesAutomaticas;
