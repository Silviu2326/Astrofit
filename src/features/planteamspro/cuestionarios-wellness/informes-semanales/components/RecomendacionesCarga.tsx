import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, TrendingDown, Minus, Activity, Users, Target, Calendar } from 'lucide-react';

const RecomendacionesCarga: React.FC = () => {
  const teamStatus = {
    currentLoad: 78,
    optimalLoad: 85,
    recommendation: 'increase',
    adjustment: '+9%'
  };

  const weeklyRecommendations = [
    {
      day: 'Lunes',
      load: 'Alta',
      intensity: 85,
      focus: 'Fuerza y Potencia',
      icon: Activity,
      color: 'from-red-500 to-pink-600',
      bgColor: 'from-red-50 to-pink-50'
    },
    {
      day: 'Martes',
      load: 'Media',
      intensity: 65,
      focus: 'Técnica y Habilidades',
      icon: Target,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      day: 'Miércoles',
      load: 'Alta',
      intensity: 90,
      focus: 'Resistencia Cardiovascular',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      day: 'Jueves',
      load: 'Baja',
      intensity: 40,
      focus: 'Recuperación Activa',
      icon: Minus,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50'
    },
    {
      day: 'Viernes',
      load: 'Media',
      intensity: 70,
      focus: 'Velocidad y Agilidad',
      icon: Activity,
      color: 'from-orange-500 to-yellow-600',
      bgColor: 'from-orange-50 to-yellow-50'
    },
    {
      day: 'Sábado',
      load: 'Alta',
      intensity: 88,
      focus: 'Partido/Competición',
      icon: Users,
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'from-indigo-50 to-purple-50'
    },
    {
      day: 'Domingo',
      load: 'Mínima',
      intensity: 20,
      focus: 'Descanso y Regeneración',
      icon: Calendar,
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'from-teal-50 to-cyan-50'
    }
  ];

  const individualRecommendations = [
    {
      athlete: 'Juan Pérez',
      currentLoad: 75,
      recommendedLoad: 85,
      action: 'increase',
      percentage: '+13%',
      reason: 'Excelente recuperación y estado de forma'
    },
    {
      athlete: 'Carlos López',
      currentLoad: 90,
      recommendedLoad: 60,
      action: 'decrease',
      percentage: '-33%',
      reason: 'Alto riesgo de overtraining detectado'
    },
    {
      athlete: 'María García',
      currentLoad: 80,
      recommendedLoad: 80,
      action: 'maintain',
      percentage: '0%',
      reason: 'Carga óptima según estado actual'
    },
    {
      athlete: 'Ana Martínez',
      currentLoad: 70,
      recommendedLoad: 82,
      action: 'increase',
      percentage: '+17%',
      reason: 'Capacidad para mayor volumen de trabajo'
    }
  ];

  const getActionConfig = (action: string) => {
    switch (action) {
      case 'increase':
        return {
          icon: TrendingUp,
          color: 'from-emerald-500 to-teal-600',
          bgColor: 'from-emerald-50 to-teal-50',
          borderColor: 'border-emerald-300',
          textColor: 'text-emerald-700',
          label: 'Incrementar'
        };
      case 'decrease':
        return {
          icon: TrendingDown,
          color: 'from-red-500 to-pink-600',
          bgColor: 'from-red-50 to-pink-50',
          borderColor: 'border-red-300',
          textColor: 'text-red-700',
          label: 'Reducir'
        };
      default:
        return {
          icon: Minus,
          color: 'from-blue-500 to-indigo-600',
          bgColor: 'from-blue-50 to-indigo-50',
          borderColor: 'border-blue-300',
          textColor: 'text-blue-700',
          label: 'Mantener'
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Estado General del Equipo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
              <Sparkles className="w-6 h-6" />
            </div>
            Recomendación General del Equipo
          </h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <p className="text-sm font-semibold text-gray-600 mb-2">Carga Actual</p>
              <p className="text-4xl font-bold text-blue-600">{teamStatus.currentLoad}%</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
              <p className="text-sm font-semibold text-gray-600 mb-2">Carga Óptima</p>
              <p className="text-4xl font-bold text-emerald-600">{teamStatus.optimalLoad}%</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <p className="text-sm font-semibold text-gray-600 mb-2">Ajuste Recomendado</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <p className="text-4xl font-bold text-purple-600">{teamStatus.adjustment}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Planificación Semanal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Calendar className="w-6 h-6" />
            </div>
            Planificación de Carga Semanal
          </h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {weeklyRecommendations.map((day, index) => {
              const Icon = day.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`p-4 rounded-2xl bg-gradient-to-br ${day.bgColor} border-2 border-${day.color.split(' ')[1].replace('to-', '')}/30 relative overflow-hidden`}
                >
                  <div className={`absolute -right-2 -top-2 w-16 h-16 bg-gradient-to-br ${day.color} opacity-10 rounded-full blur-xl`}></div>

                  <div className="relative z-10">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${day.color} flex items-center justify-center text-white mb-3 shadow-lg`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h4 className="font-bold text-gray-900 mb-1">{day.day}</h4>
                    <p className={`text-xs font-bold mb-2 bg-gradient-to-r ${day.color} bg-clip-text text-transparent`}>
                      {day.load}
                    </p>

                    <div className="mb-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${day.intensity}%` }}
                          transition={{ delay: 0.5 + index * 0.05, duration: 0.8 }}
                          className={`h-full bg-gradient-to-r ${day.color} rounded-full`}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{day.intensity}%</p>
                    </div>

                    <p className="text-xs text-gray-700 leading-tight">{day.focus}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Recomendaciones Individuales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Users className="w-6 h-6" />
            </div>
            Recomendaciones por Atleta
          </h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {individualRecommendations.map((rec, index) => {
              const config = getActionConfig(rec.action);
              const Icon = config.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  className={`p-6 rounded-2xl bg-gradient-to-r ${config.bgColor} border-2 ${config.borderColor} relative overflow-hidden`}
                >
                  <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${config.color} opacity-10 rounded-full blur-2xl`}></div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center text-white shadow-lg`}>
                          <span className="text-lg font-bold">{rec.athlete.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{rec.athlete}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Icon className={`w-4 h-4 ${config.textColor}`} />
                            <span className={`text-sm font-bold ${config.textColor}`}>{config.label}</span>
                          </div>
                        </div>
                      </div>

                      <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${config.color}`}>
                        <span className="text-lg font-bold text-white">{rec.percentage}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                        <p className="text-xs text-gray-600 mb-1">Carga Actual</p>
                        <p className="text-2xl font-bold text-gray-900">{rec.currentLoad}%</p>
                      </div>
                      <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                        <p className="text-xs text-gray-600 mb-1">Recomendada</p>
                        <p className={`text-2xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                          {rec.recommendedLoad}%
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                      <p className="text-xs font-bold text-gray-700 mb-1">Razón:</p>
                      <p className="text-sm text-gray-700">{rec.reason}</p>
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

export default RecomendacionesCarga;
