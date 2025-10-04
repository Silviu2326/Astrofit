import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, CheckCircle, Calendar, TrendingUp, ArrowUpRight } from 'lucide-react';

const EstadisticasRapidas: React.FC = () => {
  const stats = [
    {
      title: 'Comisiones Totales',
      value: '$47,523.40',
      change: '+18.5',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-emerald-600/10',
      progress: 85
    },
    {
      title: 'Pendientes de Pago',
      value: '$8,945.20',
      change: '+12.3',
      icon: Clock,
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-500/10 to-orange-600/10',
      progress: 65
    },
    {
      title: 'Pagadas Este Mes',
      value: '$23,150.00',
      change: '+25.8',
      icon: CheckCircle,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-500/10 to-indigo-600/10',
      progress: 92
    },
    {
      title: 'Próximo Pago',
      value: '15 Oct 2025',
      change: '5 días',
      icon: Calendar,
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-500/10 to-pink-600/10',
      progress: 78,
      isDate: true
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-2xl`}></div>

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
                {!stat.isDate && (
                  <>
                    <div className="p-1 bg-green-50 rounded-lg">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-bold text-green-600">{stat.change}%</span>
                    <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                  </>
                )}
                {stat.isDate && (
                  <>
                    <div className="p-1 bg-purple-50 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-bold text-purple-600">En {stat.change}</span>
                  </>
                )}
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
