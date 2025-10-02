import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Trophy, Users, Clock, Target, Zap, Award } from 'lucide-react';
import GraficoUsos from './GraficoUsos';
import MetricasIngresos from './MetricasIngresos';

const DashboardCupones: React.FC = () => {
  // Top cupones
  const topCoupons = [
    { code: 'VERANO2024', usos: 1247, revenue: '$18,450', roi: '320%', color: 'from-sky-500 to-blue-600' },
    { code: 'PRIMERACOMPRA', usos: 892, revenue: '$12,340', roi: '280%', color: 'from-violet-500 to-purple-600' },
    { code: 'PREMIUM50', usos: 654, revenue: '$9,820', roi: '245%', color: 'from-pink-500 to-rose-600' },
    { code: 'VIPSALE', usos: 523, revenue: '$8,210', roi: '198%', color: 'from-emerald-500 to-teal-600' }
  ];

  // Insights
  const insights = [
    {
      icon: Zap,
      title: 'Momento óptimo',
      description: 'Los cupones se usan más entre 14:00-18:00',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Award,
      title: 'Mejor conversión',
      description: 'PRIMERACOMPRA tiene 89% de conversión',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Trophy,
      title: 'Mayor valor',
      description: 'Tickets con cupón promedian $156',
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Uso */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 p-6 relative overflow-hidden">
            {/* Pattern de fondo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <BarChart2 className="w-6 h-6" />
              </div>
              Uso de Cupones en el Tiempo
            </h3>
          </div>

          {/* Body */}
          <div className="p-6">
            <GraficoUsos />
          </div>
        </motion.div>

        {/* Métricas de Ingresos */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
            {/* Pattern de fondo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              Métricas de Impacto
            </h3>
          </div>

          {/* Body */}
          <div className="p-6">
            <MetricasIngresos />
          </div>
        </motion.div>
      </div>

      {/* Top Cupones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Target className="w-6 h-6" />
            </div>
            Top Cupones por Rendimiento
          </h3>
        </div>

        {/* Tabla */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wide">#</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wide">Código</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wide">Usos</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wide">Ingresos</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wide">ROI</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wide">Rendimiento</th>
                </tr>
              </thead>
              <tbody>
                {topCoupons.map((coupon, index) => (
                  <motion.tr
                    key={coupon.code}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group"
                  >
                    <td className="py-4 px-4">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${coupon.color} flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-lg">{coupon.code}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-gray-700">{coupon.usos.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="font-bold text-emerald-600">{coupon.revenue}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="inline-block px-3 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
                        <span className="text-sm font-bold text-green-700">{coupon.roi}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(index === 0 ? 100 : 100 - index * 20)}%` }}
                          transition={{ delay: 0.5 + index * 0.1 + 0.3, duration: 1 }}
                          className={`h-full bg-gradient-to-r ${coupon.color} rounded-full`}
                        ></motion.div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Insights y Recomendaciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Zap className="w-6 h-6" />
            </div>
            Insights y Recomendaciones
          </h3>
        </div>

        {/* Insights grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <insight.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardCupones;
