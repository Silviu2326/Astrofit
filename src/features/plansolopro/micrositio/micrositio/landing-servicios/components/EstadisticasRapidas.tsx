
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

const EstadisticasRapidas: React.FC = () => {
  const stats = [
    {
      title: 'Visitas Este Mes',
      value: '2,847',
      change: 23.5,
      icon: Eye,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-500 to-indigo-600',
      progress: 75
    },
    {
      title: 'Conversiones (%)',
      value: '18.4%',
      change: 12.3,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-500 to-teal-600',
      progress: 84
    },
    {
      title: 'Reservas Generadas',
      value: '124',
      change: 34.2,
      icon: Calendar,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-500 to-pink-600',
      progress: 92
    },
    {
      title: 'Tasa de Rebote (%)',
      value: '28.3%',
      change: -8.5,
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-600',
      bgGradient: 'from-orange-500 to-red-600',
      progress: 45
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className={`p-1 ${stat.change >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                  <TrendingUp className={`w-4 h-4 ${stat.change >= 0 ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
                </div>
                <span className={`text-sm font-bold ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change >= 0 ? '+' : ''}{stat.change}%
                </span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default EstadisticasRapidas;
