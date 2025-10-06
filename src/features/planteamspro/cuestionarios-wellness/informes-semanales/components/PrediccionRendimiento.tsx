import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Sparkles, Brain, Activity, Zap } from 'lucide-react';

const PrediccionRendimiento: React.FC = () => {
  const predictions = [
    {
      athlete: 'Juan Pérez',
      currentPerformance: 85,
      predictedPerformance: 92,
      trend: 'up',
      confidence: 89,
      factors: ['Mejora en sueño', 'Reducción de fatiga', 'Ánimo estable']
    },
    {
      athlete: 'María García',
      currentPerformance: 78,
      predictedPerformance: 83,
      trend: 'up',
      confidence: 76,
      factors: ['Recuperación óptima', 'Patrón de sueño consistente']
    },
    {
      athlete: 'Carlos López',
      currentPerformance: 92,
      predictedPerformance: 88,
      trend: 'down',
      confidence: 82,
      factors: ['Incremento en fatiga', 'Disminución de horas de sueño']
    },
    {
      athlete: 'Ana Martínez',
      currentPerformance: 81,
      predictedPerformance: 86,
      trend: 'up',
      confidence: 91,
      factors: ['Mejora en estado de ánimo', 'Excelente recuperación']
    }
  ];

  const teamMetrics = [
    { label: 'Rendimiento Promedio Actual', value: '84%', icon: Activity, color: 'from-blue-500 to-indigo-600' },
    { label: 'Rendimiento Predicho (7 días)', value: '87%', icon: Target, color: 'from-purple-500 to-pink-600' },
    { label: 'Confianza de Predicción', value: '85%', icon: Brain, color: 'from-emerald-500 to-teal-600' },
    { label: 'Tendencia General', value: '+3.5%', icon: TrendingUp, color: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Métricas del Equipo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${metric.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {metric.label}
                </p>

                <p className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${metric.color}`}>
                  {metric.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Predicciones Individuales */}
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
              <Sparkles className="w-6 h-6" />
            </div>
            Predicciones de Rendimiento por Atleta
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictions.map((prediction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                className={`p-6 rounded-2xl border-2 ${
                  prediction.trend === 'up'
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
                    : 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'
                } relative overflow-hidden`}
              >
                {/* Decoración */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 ${
                  prediction.trend === 'up'
                    ? 'bg-gradient-to-br from-emerald-300 to-teal-300'
                    : 'bg-gradient-to-br from-orange-300 to-red-300'
                } opacity-10 rounded-full blur-2xl`}></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{prediction.athlete}</h4>
                      <p className="text-sm text-gray-600">Próximos 7 días</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full ${
                      prediction.trend === 'up'
                        ? 'bg-emerald-500'
                        : 'bg-orange-500'
                    } text-white text-xs font-bold flex items-center gap-1`}>
                      {prediction.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <Zap className="w-3 h-3" />}
                      {prediction.trend === 'up' ? 'Mejorando' : 'Atención'}
                    </div>
                  </div>

                  {/* Métricas */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Actual</p>
                      <p className="text-2xl font-bold text-gray-900">{prediction.currentPerformance}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Predicción</p>
                      <p className={`text-2xl font-bold ${
                        prediction.trend === 'up' ? 'text-emerald-600' : 'text-orange-600'
                      }`}>
                        {prediction.predictedPerformance}%
                      </p>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>Confianza</span>
                      <span className="font-bold">{prediction.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.confidence}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                        className={`h-full rounded-full ${
                          prediction.trend === 'up'
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                            : 'bg-gradient-to-r from-orange-400 to-red-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Factores */}
                  <div>
                    <p className="text-xs font-bold text-gray-700 mb-2">Factores clave:</p>
                    <div className="space-y-1">
                      {prediction.factors.map((factor, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            prediction.trend === 'up' ? 'bg-emerald-500' : 'bg-orange-500'
                          }`}></div>
                          <span>{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrediccionRendimiento;
