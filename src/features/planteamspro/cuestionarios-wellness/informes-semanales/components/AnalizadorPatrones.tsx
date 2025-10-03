import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Sun, Moon, Cloud, Zap, Activity } from 'lucide-react';

const AnalizadorPatrones: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const patterns = [
    {
      id: 1,
      title: 'Patrón de Sueño Semanal',
      trend: 'Mejorando',
      value: '+12%',
      icon: Moon,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
      description: 'Incremento progresivo en horas de sueño durante la semana'
    },
    {
      id: 2,
      title: 'Fatiga Post-Entrenamiento',
      trend: 'Estable',
      value: '±3%',
      icon: Activity,
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
      description: 'Niveles de fatiga consistentes después de sesiones intensivas'
    },
    {
      id: 3,
      title: 'Estado de Ánimo Mensual',
      trend: 'Alto',
      value: '4.2/5',
      icon: Sun,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      description: 'Ánimo positivo con picos durante días de descanso'
    },
    {
      id: 4,
      title: 'Recuperación Estacional',
      trend: 'Óptima',
      value: '89%',
      icon: Zap,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
      description: 'Tiempos de recuperación más rápidos en temporada actual'
    }
  ];

  const periods = [
    { id: 'weekly', label: 'Semanal' },
    { id: 'monthly', label: 'Mensual' },
    { id: 'seasonal', label: 'Estacional' },
    { id: 'yearly', label: 'Anual' }
  ];

  return (
    <div className="space-y-8">
      {/* Selector de Período */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-bold text-gray-900">Seleccionar Período de Análisis</h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {periods.map((period) => (
            <motion.button
              key={period.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPeriod(period.id)}
              className={`
                px-6 py-3 rounded-2xl font-semibold text-sm
                transition-all duration-300 relative overflow-hidden
                ${selectedPeriod === period.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }
              `}
            >
              {period.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Grid de Patrones Detectados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patterns.map((pattern, index) => {
          const Icon = pattern.icon;
          return (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${pattern.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono y Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pattern.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  <div className={`px-4 py-2 bg-gradient-to-r ${pattern.bgColor} rounded-full border border-${pattern.color.split(' ')[1].replace('to-', '')}/20`}>
                    <span className={`text-sm font-bold bg-gradient-to-r ${pattern.color} bg-clip-text text-transparent`}>
                      {pattern.trend}
                    </span>
                  </div>
                </div>

                {/* Título */}
                <h4 className="text-xl font-bold text-gray-900 mb-2">{pattern.title}</h4>

                {/* Descripción */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {pattern.description}
                </p>

                {/* Valor destacado */}
                <div className={`mt-4 p-4 bg-gradient-to-r ${pattern.bgColor} rounded-2xl border border-${pattern.color.split(' ')[1].replace('to-', '')}/20`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">Variación</span>
                    <span className={`text-2xl font-bold bg-gradient-to-r ${pattern.color} bg-clip-text text-transparent`}>
                      {pattern.value}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Timeline de Evolución */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
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
            Timeline de Evolución de Patrones
          </h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="space-y-4">
            {[
              { week: 'Semana 1', status: 'Inicio de análisis', date: '01 - 07 Ene' },
              { week: 'Semana 2', status: 'Primeros patrones detectados', date: '08 - 14 Ene' },
              { week: 'Semana 3', status: 'Tendencias confirmadas', date: '15 - 21 Ene' },
              { week: 'Semana 4', status: 'Optimización continua', date: '22 - 28 Ene' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-100 hover:shadow-md group relative"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-indigo-400 to-purple-600">
                  <span className="text-lg">{index + 1}</span>
                </div>

                {/* Línea vertical */}
                {index < 3 && (
                  <div className="absolute left-[23px] top-12 w-0.5 h-full bg-gradient-to-b from-indigo-200 to-transparent"></div>
                )}

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-gray-900">{item.week}</h4>
                    <span className="text-xs text-gray-500 font-medium">{item.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{item.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalizadorPatrones;
