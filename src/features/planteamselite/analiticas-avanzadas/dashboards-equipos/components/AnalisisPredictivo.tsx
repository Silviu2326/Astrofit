import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Lightbulb } from 'lucide-react';

const AnalisisPredictivo: React.FC = () => {
  const predicciones = [
    { titulo: 'Próximo Partido', prediccion: 'Victoria probable (85%)', confianza: 85, icon: TrendingUp },
    { titulo: 'Riesgo de Lesión', prediccion: 'Bajo (15%)', confianza: 15, icon: Brain },
    { titulo: 'Recomendación', prediccion: 'Ajustar carga de trabajo', confianza: 70, icon: Lightbulb },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
            <Brain className="w-5 h-5 text-white" />
          </div>
          Análisis Predictivo
        </h3>

        <div className="space-y-4">
          {predicciones.map((pred, index) => {
            const Icon = pred.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800 mb-1">{pred.titulo}</p>
                    <p className="text-xs text-gray-600">{pred.prediccion}</p>
                  </div>
                </div>

                {/* Barra de confianza */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600">Confianza:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pred.confianza}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                    ></motion.div>
                  </div>
                  <span className="text-xs font-bold text-indigo-600">{pred.confianza}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisPredictivo;
