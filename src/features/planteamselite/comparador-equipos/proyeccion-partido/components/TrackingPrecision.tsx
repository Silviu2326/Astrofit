import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Award, CheckCircle, Activity } from 'lucide-react';

const TrackingPrecision: React.FC = () => {
  const metrics = [
    { label: 'Precisión General', value: 87.3, target: 90, color: 'from-green-500 to-emerald-600' },
    { label: 'Predicciones Victoria', value: 92.5, target: 90, color: 'from-blue-500 to-indigo-600' },
    { label: 'Predicciones Empate', value: 68.8, target: 75, color: 'from-yellow-500 to-orange-600' },
    { label: 'Over/Under 2.5', value: 89.2, target: 85, color: 'from-purple-500 to-pink-600' }
  ];

  const recentPerformance = [
    { month: 'Ene', accuracy: 85 },
    { month: 'Feb', accuracy: 86.5 },
    { month: 'Mar', accuracy: 87.3 },
    { month: 'Abr', accuracy: 88 }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
          <Target className="w-6 h-6 text-white" />
        </div>
        Sistema de Tracking de Precisión
      </h2>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Monitoreo continuo de la <span className="font-bold text-indigo-600">precisión del modelo</span> para garantizar la mejora continua.
      </p>

      {/* Métricas de Precisión */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {metric.label}
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {metric.value}%
            </p>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Objetivo: {metric.target}%</span>
                {metric.value >= metric.target && (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(metric.value / metric.target) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 + 0.3 }}
                  className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                />
              </div>
            </div>

            {/* Badge de estado */}
            {metric.value >= metric.target ? (
              <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full inline-block">
                ✓ Objetivo Alcanzado
              </div>
            ) : (
              <div className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full inline-block">
                En Progreso
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Rendimiento Reciente */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-200">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          Evolución de Precisión (Últimos 4 Meses)
        </h3>

        <div className="flex items-end justify-between gap-4">
          {recentPerformance.map((item, index) => (
            <div key={index} className="flex-1 text-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${item.accuracy}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg mx-auto mb-2 relative"
                style={{ width: '60%', maxHeight: '200px' }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-lg shadow-md border border-indigo-200">
                  <span className="text-xs font-bold text-indigo-600">{item.accuracy}%</span>
                </div>
              </motion.div>
              <p className="text-sm font-semibold text-gray-700">{item.month}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 justify-center">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span className="text-sm font-bold text-green-600">+3.0% vs último trimestre</span>
        </div>
      </div>
    </div>
  );
};

export default TrackingPrecision;
