import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign } from 'lucide-react';
import { mockExperiments } from '../data/mockData';

const DashboardResultados: React.FC = () => {
  const stats = [
    {
      title: 'Total Experimentos',
      value: mockExperiments.length,
      icon: BarChart3,
      color: 'from-blue-500 to-indigo-600',
      change: '+2 este mes'
    },
    {
      title: 'Tests Activos',
      value: mockExperiments.filter(e => e.status === 'active').length,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      change: 'En progreso'
    },
    {
      title: 'Visitantes Totales',
      value: mockExperiments.reduce((acc, exp) => acc + exp.totalTraffic, 0).toLocaleString(),
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      change: '+12% vs anterior'
    },
    {
      title: 'Revenue Impactado',
      value: '$' + mockExperiments.reduce((acc, exp) =>
        acc + exp.variants.reduce((sum, v) => sum + v.revenue, 0), 0
      ).toLocaleString(),
      icon: DollarSign,
      color: 'from-orange-500 to-red-600',
      change: '+$150K este mes'
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
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
              <p className="text-xs text-gray-500 font-medium">{stat.change}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardResultados;
