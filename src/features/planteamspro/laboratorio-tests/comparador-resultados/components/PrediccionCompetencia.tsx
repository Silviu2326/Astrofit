import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Target } from 'lucide-react';

const PrediccionCompetencia: React.FC = () => {
  const predicciones = [
    { atleta: 'Atleta A', probabilidad: 87, nivel: 'Alto', tendencia: 'up' },
    { atleta: 'Atleta B', probabilidad: 74, nivel: 'Medio-Alto', tendencia: 'up' },
    { atleta: 'Atleta C', probabilidad: 58, nivel: 'Medio', tendencia: 'neutral' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white shadow-lg">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Predicción de Rendimiento</h3>
        </div>

        <div className="space-y-3">
          {predicciones.map((pred, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-gray-800">{pred.atleta}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                  pred.nivel === 'Alto' ? 'bg-green-100 text-green-700' :
                  pred.nivel === 'Medio-Alto' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {pred.nivel}
                </div>
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600 font-medium">Probabilidad de éxito</span>
                <div className="flex items-center gap-1">
                  <Target className="w-3 h-3 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-600">{pred.probabilidad}%</span>
                </div>
              </div>

              <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pred.probabilidad}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PrediccionCompetencia;
