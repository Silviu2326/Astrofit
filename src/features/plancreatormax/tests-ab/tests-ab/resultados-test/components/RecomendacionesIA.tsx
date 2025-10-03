import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { mockExperiments } from '../data/mockData';

const RecomendacionesIA: React.FC = () => {
  const experiment = mockExperiments[0]; // Usar el primer experimento como ejemplo

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-emerald-600" />
        Recomendaciones IA
      </h3>

      <div className="space-y-4">
        {experiment.recommendations.map((rec, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className={`p-4 rounded-2xl border-2 ${
              rec.type === 'success'
                ? 'bg-green-50 border-green-300'
                : rec.type === 'warning'
                  ? 'bg-yellow-50 border-yellow-300'
                  : 'bg-blue-50 border-blue-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0">
                {rec.type === 'success' ? '✅' : rec.type === 'warning' ? '⚠️' : '💡'}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-1">{rec.title}</h4>
                <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                {rec.action && (
                  <button className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    rec.type === 'success'
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : rec.type === 'warning'
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}>
                    {rec.action}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resumen de acciones */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-indigo-900 mb-1">Siguiente Paso Recomendado</p>
            <p className="text-sm text-indigo-700">
              {experiment.confidence >= 95
                ? 'El experimento ha alcanzado significancia estadística. Procede a declarar el ganador e implementar la variante exitosa.'
                : experiment.confidence >= 80
                  ? 'El experimento está cerca de alcanzar significancia. Continúa recolectando datos o aumenta el tráfico para resultados más rápidos.'
                  : 'El experimento está en fase inicial. Asegúrate de que el tráfico sea suficiente y espera a alcanzar el tamaño de muestra requerido.'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecomendacionesIA;
