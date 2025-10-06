// src/features/alertas-fatiga/components/ModeloPredictivoFatiga.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

const ModeloPredictivoFatiga: React.FC = () => {
  const predicciones = [
    { dia: 'Hoy', riesgo: 35, nivel: 'Bajo' },
    { dia: 'Mañana', riesgo: 52, nivel: 'Medio' },
    { dia: '2 días', riesgo: 68, nivel: 'Alto' },
    { dia: '3 días', riesgo: 82, nivel: 'Crítico' }
  ];

  const getNivelColor = (nivel: string) => {
    if (nivel === 'Crítico') return 'bg-red-500';
    if (nivel === 'Alto') return 'bg-orange-500';
    if (nivel === 'Medio') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiesgoColor = (riesgo: number) => {
    if (riesgo >= 75) return 'from-red-500 to-pink-500';
    if (riesgo >= 50) return 'from-orange-500 to-red-500';
    if (riesgo >= 30) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Modelo Predictivo</h3>
            <p className="text-xs text-gray-600">Anticipación de fatiga con IA</p>
          </div>
        </div>

        {/* Predicciones Timeline */}
        <div className="space-y-3">
          {predicciones.map((pred, index) => (
            <motion.div
              key={pred.dia}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl p-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="font-bold text-sm text-gray-800">{pred.dia}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`${getNivelColor(pred.nivel)} text-white text-xs font-bold rounded-full px-3 py-1`}>
                    {pred.nivel}
                  </div>
                  <span className="text-sm font-bold text-gray-700">{pred.riesgo}%</span>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pred.riesgo}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${getRiesgoColor(pred.riesgo)} rounded-full relative`}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alerta de predicción */}
        <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-red-700 font-bold mb-1">⚠️ Alerta Predictiva</p>
            <p className="text-xs text-red-600">Se prevé un nivel crítico de fatiga en 3 días. Se recomienda ajustar carga de entrenamiento.</p>
          </div>
        </div>

        {/* Info del modelo */}
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <TrendingUp className="w-3 h-3" />
          <span>Precisión del modelo: 94.2%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ModeloPredictivoFatiga;
