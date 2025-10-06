import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, AlertTriangle, CheckCircle, Activity, Heart, Zap, TrendingDown } from 'lucide-react';

const DetectorOvertraining: React.FC = () => {
  const athletes = [
    {
      name: 'Carlos López',
      riskLevel: 'high',
      score: 82,
      indicators: [
        { label: 'Fatiga acumulada', value: 'Alta', status: 'danger' },
        { label: 'Calidad del sueño', value: 'Baja', status: 'danger' },
        { label: 'Estado de ánimo', value: 'Bajo', status: 'warning' },
        { label: 'Recuperación', value: '65%', status: 'danger' }
      ],
      recommendations: ['Reducir carga 40%', 'Descanso activo 2 días', 'Sesión de fisioterapia']
    },
    {
      name: 'Pedro Sánchez',
      riskLevel: 'medium',
      score: 58,
      indicators: [
        { label: 'Fatiga acumulada', value: 'Media', status: 'warning' },
        { label: 'Calidad del sueño', value: 'Normal', status: 'success' },
        { label: 'Estado de ánimo', value: 'Bajo', status: 'warning' },
        { label: 'Recuperación', value: '78%', status: 'warning' }
      ],
      recommendations: ['Monitorizar de cerca', 'Mantener carga actual', 'Evaluar en 48h']
    },
    {
      name: 'Juan Pérez',
      riskLevel: 'low',
      score: 25,
      indicators: [
        { label: 'Fatiga acumulada', value: 'Baja', status: 'success' },
        { label: 'Calidad del sueño', value: 'Óptima', status: 'success' },
        { label: 'Estado de ánimo', value: 'Alto', status: 'success' },
        { label: 'Recuperación', value: '92%', status: 'success' }
      ],
      recommendations: ['Estado óptimo', 'Continuar con plan actual']
    },
    {
      name: 'Ana Martínez',
      riskLevel: 'low',
      score: 18,
      indicators: [
        { label: 'Fatiga acumulada', value: 'Baja', status: 'success' },
        { label: 'Calidad del sueño', value: 'Buena', status: 'success' },
        { label: 'Estado de ánimo', value: 'Alto', status: 'success' },
        { label: 'Recuperación', value: '95%', status: 'success' }
      ],
      recommendations: ['Rendimiento óptimo', 'Puede incrementar carga gradualmente']
    }
  ];

  const getRiskConfig = (level: string) => {
    switch (level) {
      case 'high':
        return {
          color: 'from-red-500 to-pink-600',
          bgColor: 'from-red-50 to-pink-50',
          borderColor: 'border-red-300',
          textColor: 'text-red-700',
          icon: AlertCircle,
          label: 'Riesgo Alto'
        };
      case 'medium':
        return {
          color: 'from-orange-500 to-yellow-600',
          bgColor: 'from-orange-50 to-yellow-50',
          borderColor: 'border-orange-300',
          textColor: 'text-orange-700',
          icon: AlertTriangle,
          label: 'Riesgo Medio'
        };
      default:
        return {
          color: 'from-emerald-500 to-teal-600',
          bgColor: 'from-emerald-50 to-teal-50',
          borderColor: 'border-emerald-300',
          textColor: 'text-emerald-700',
          icon: CheckCircle,
          label: 'Riesgo Bajo'
        };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'danger': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      default: return 'text-emerald-600 bg-emerald-100';
    }
  };

  const summary = [
    { label: 'Riesgo Alto', count: 1, icon: AlertCircle, color: 'from-red-500 to-pink-600' },
    { label: 'Riesgo Medio', count: 1, icon: AlertTriangle, color: 'from-orange-500 to-yellow-600' },
    { label: 'Sin Riesgo', count: 2, icon: CheckCircle, color: 'from-emerald-500 to-teal-600' },
    { label: 'Total Atletas', count: 4, icon: Activity, color: 'from-blue-500 to-indigo-600' }
  ];

  return (
    <div className="space-y-8">
      {/* Resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summary.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${item.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {item.label}
                </p>

                <p className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${item.color}`}>
                  {item.count}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lista de Atletas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Heart className="w-6 h-6" />
            </div>
            Detección de Overtraining por Atleta
          </h3>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {athletes.map((athlete, index) => {
              const config = getRiskConfig(athlete.riskLevel);
              const Icon = config.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className={`p-6 rounded-2xl bg-gradient-to-r ${config.bgColor} border-2 ${config.borderColor} relative overflow-hidden`}
                >
                  <div className={`absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br ${config.color} opacity-10 rounded-full blur-2xl`}></div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white shadow-lg`}>
                          <span className="text-lg font-bold">{athlete.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{athlete.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Icon className={`w-4 h-4 ${config.textColor}`} />
                            <span className={`text-sm font-bold ${config.textColor}`}>{config.label}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-600 mb-1">Score de Riesgo</p>
                        <p className={`text-3xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                          {athlete.score}
                        </p>
                      </div>
                    </div>

                    {/* Indicadores */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {athlete.indicators.map((indicator, i) => (
                        <div key={i} className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                          <p className="text-xs text-gray-600 mb-1">{indicator.label}</p>
                          <p className={`text-sm font-bold px-2 py-1 rounded-lg inline-block ${getStatusColor(indicator.status)}`}>
                            {indicator.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Recomendaciones */}
                    <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-4 h-4 text-indigo-600" />
                        <p className="text-sm font-bold text-gray-700">Recomendaciones:</p>
                      </div>
                      <div className="space-y-2">
                        {athlete.recommendations.map((rec, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${config.color}`}></div>
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
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

export default DetectorOvertraining;
