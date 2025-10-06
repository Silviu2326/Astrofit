import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, TrendingDown, Minus, BarChart3, Award, Coffee } from 'lucide-react';

const ComparadorPeriodos: React.FC = () => {
  const [selectedComparison, setSelectedComparison] = useState('pretemporada-vs-competicion');

  const periods = [
    {
      id: 'pretemporada',
      name: 'Pretemporada',
      icon: Calendar,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      metrics: {
        sleep: 7.8,
        fatigue: 3.2,
        mood: 4.1,
        recovery: 82
      }
    },
    {
      id: 'competicion',
      name: 'Competición',
      icon: Award,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50',
      metrics: {
        sleep: 7.2,
        fatigue: 3.8,
        mood: 3.9,
        recovery: 75
      }
    },
    {
      id: 'descanso',
      name: 'Descanso',
      icon: Coffee,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
      metrics: {
        sleep: 8.5,
        fatigue: 2.1,
        mood: 4.6,
        recovery: 95
      }
    }
  ];

  const comparisons = [
    { id: 'pretemporada-vs-competicion', label: 'Pretemporada vs Competición' },
    { id: 'competicion-vs-descanso', label: 'Competición vs Descanso' },
    { id: 'pretemporada-vs-descanso', label: 'Pretemporada vs Descanso' }
  ];

  const calculateDifference = (metric1: number, metric2: number) => {
    const diff = ((metric2 - metric1) / metric1 * 100).toFixed(1);
    return {
      value: Math.abs(parseFloat(diff)),
      isPositive: metric2 > metric1,
      icon: metric2 > metric1 ? TrendingUp : metric2 < metric1 ? TrendingDown : Minus
    };
  };

  return (
    <div className="space-y-8">
      {/* Selector de Comparación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-900">Seleccionar Comparación</h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {comparisons.map((comparison) => (
            <motion.button
              key={comparison.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedComparison(comparison.id)}
              className={`
                px-6 py-3 rounded-2xl font-semibold text-sm
                transition-all duration-300 relative overflow-hidden
                ${selectedComparison === comparison.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }
              `}
            >
              {comparison.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Grid de Períodos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {periods.map((period, index) => {
          const Icon = period.icon;
          return (
            <motion.div
              key={period.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Header con gradiente */}
              <div className={`bg-gradient-to-r ${period.color} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{period.name}</h3>
                </div>
              </div>

              {/* Body con métricas */}
              <div className="p-6 space-y-4 relative z-10">
                {/* Decoración de fondo */}
                <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${period.color} opacity-5 rounded-full blur-2xl`}></div>

                <div className="relative z-10 space-y-4">
                  {/* Sueño */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Sueño promedio</span>
                    <span className="text-lg font-bold text-blue-600">{period.metrics.sleep}h</span>
                  </div>
                  <div className="w-full bg-blue-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(period.metrics.sleep / 10) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                    />
                  </div>

                  {/* Fatiga */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Fatiga</span>
                    <span className="text-lg font-bold text-orange-600">{period.metrics.fatigue}/5</span>
                  </div>
                  <div className="w-full bg-orange-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(period.metrics.fatigue / 5) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                    />
                  </div>

                  {/* Ánimo */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Ánimo</span>
                    <span className="text-lg font-bold text-purple-600">{period.metrics.mood}/5</span>
                  </div>
                  <div className="w-full bg-purple-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(period.metrics.mood / 5) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                    />
                  </div>

                  {/* Recuperación */}
                  <div className={`mt-4 p-4 bg-gradient-to-r ${period.bgColor} rounded-2xl border border-${period.color.split(' ')[1].replace('to-', '')}/20`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Recuperación</span>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${period.color} bg-clip-text text-transparent`}>
                        {period.metrics.recovery}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Análisis de Diferencias */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            Análisis Comparativo Detallado
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Comparación entre períodos para identificar tendencias y optimizar la planificación del entrenamiento.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { metric: 'Sueño', unit: 'h', key: 'sleep' as const },
              { metric: 'Fatiga', unit: '/5', key: 'fatigue' as const },
              { metric: 'Ánimo', unit: '/5', key: 'mood' as const },
              { metric: 'Recuperación', unit: '%', key: 'recovery' as const }
            ].map((item, index) => {
              const diff = calculateDifference(
                periods[0].metrics[item.key],
                periods[1].metrics[item.key]
              );
              const DiffIcon = diff.icon;

              return (
                <motion.div
                  key={item.metric}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">{item.metric}</span>
                    <div className={`flex items-center gap-1 ${diff.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      <DiffIcon className="w-4 h-4" />
                      <span className="text-lg font-bold">{diff.value}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComparadorPeriodos;
