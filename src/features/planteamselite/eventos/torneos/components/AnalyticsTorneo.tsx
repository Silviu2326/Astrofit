import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Activity, Eye, Clock } from 'lucide-react';

const AnalyticsTorneo: React.FC = () => {
  const metrics = [
    { label: 'Espectadores Totales', value: '12.5K', trend: '+18%', icon: Eye, color: 'from-blue-500 to-indigo-500' },
    { label: 'Partidos Completados', value: '24/32', trend: '75%', icon: Activity, color: 'from-green-500 to-emerald-500' },
    { label: 'Tiempo Promedio', value: '45min', trend: '-5%', icon: Clock, color: 'from-orange-500 to-red-500' },
    { label: 'Participación', value: '89%', trend: '+12%', icon: Users, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Analytics en Tiempo Real</h2>
          </div>
          <p className="text-purple-100 ml-12">
            Estadísticas y métricas del torneo actualizadas en vivo
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="p-8">
        {/* Grid de Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 bg-white/80 group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${metric.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10 p-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  <metric.icon className="w-6 h-6" />
                </div>

                <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  {metric.label}
                </p>

                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-gray-800">{metric.value}</p>
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-lg">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-bold text-green-600">{metric.trend}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gráfico de Actividad */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-200"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            Actividad del Torneo (Últimas 24h)
          </h3>

          {/* Mock Chart - Bars */}
          <div className="flex items-end gap-2 h-40">
            {[65, 78, 45, 92, 58, 73, 88, 95, 72, 85, 68, 90].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ delay: idx * 0.05 + 0.6, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-xl relative group/bar hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                  {value}%
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between mt-4 text-xs text-gray-600 font-semibold">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsTorneo;
