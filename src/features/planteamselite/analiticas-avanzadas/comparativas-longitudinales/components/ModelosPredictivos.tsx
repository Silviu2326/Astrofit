// src/features/comparativas-longitudinales/components/ModelosPredictivos.tsx
// Modelos predictivos proyectar evolución futura atletas
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Target, TrendingUp, Zap } from 'lucide-react';

const ModelosPredictivos: React.FC = () => {
  const predictions = [
    { metric: 'Velocidad', current: 85, predicted: 92, confidence: 94 },
    { metric: 'Resistencia', current: 78, predicted: 84, confidence: 88 },
    { metric: 'Fuerza', current: 82, predicted: 88, confidence: 91 },
  ];

  return (
    <div className="space-y-4">
      {/* Header de IA */}
      <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
        <Brain className="w-5 h-5 text-emerald-600" />
        <p className="text-sm font-semibold text-emerald-700">
          Modelo IA activo: <span className="font-bold">Neural Network v2.1</span>
        </p>
      </div>

      {/* Predicciones */}
      <div className="space-y-3">
        {predictions.map((pred, index) => (
          <motion.div
            key={pred.metric}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-teal-600" />
                <h4 className="font-bold text-gray-900">{pred.metric}</h4>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                <TrendingUp className="w-3 h-3 text-green-700" />
                <span className="text-xs font-bold text-green-700">+{pred.predicted - pred.current}%</span>
              </div>
            </div>

            {/* Barras comparativas */}
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Actual</span>
                  <span className="text-xs font-bold text-gray-900">{pred.current}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pred.current}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
                  ></motion.div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Predicción</span>
                  <span className="text-xs font-bold text-emerald-700">{pred.predicted}%</span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pred.predicted}%` }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full"
                  ></motion.div>
                </div>
              </div>
            </div>

            {/* Confianza */}
            <div className="mt-3 flex items-center gap-2">
              <Zap className="w-3 h-3 text-yellow-600" />
              <span className="text-xs text-gray-600">
                Confianza: <span className="font-bold text-gray-900">{pred.confidence}%</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ModelosPredictivos;
