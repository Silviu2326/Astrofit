import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, CheckCircle, XCircle, TrendingUp, BarChart3, ArrowUpRight, Activity } from 'lucide-react';
import { getCouponStats } from '../cuponesApi';

interface CouponStats {
  totalCoupons: number;
  activeCoupons: number;
  expiredCoupons: number;
  totalUses: number;
  conversionRate: string;
  couponEffectiveness: Array<{ code: string; uses: number; effectiveness: string }>;
}

const EstadisticasCupones: React.FC = () => {
  const [stats, setStats] = useState<CouponStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getCouponStats();
        setStats(data);
      } catch (err) {
        setError('Error al cargar las estadísticas de cupones.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-3xl p-6 flex items-center gap-3">
        <XCircle className="w-6 h-6 text-red-600" />
        <p className="text-red-700 font-semibold">{error}</p>
      </div>
    );
  }

  if (!stats) return <p>No se pudieron cargar las estadísticas.</p>;

  const statsCards = [
    {
      title: 'Total de Cupones',
      value: stats.totalCoupons,
      icon: Ticket,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Cupones Activos',
      value: stats.activeCoupons,
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Cupones Caducados',
      value: stats.expiredCoupons,
      icon: XCircle,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
      textColor: 'text-red-600'
    },
    {
      title: 'Usos Totales',
      value: stats.totalUses,
      icon: Activity,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      textColor: 'text-amber-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Barra decorativa */}
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tasa de Conversión */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Tasa de Conversión General</h3>
          </div>
        </div>

        <div className="p-8 relative z-10">
          <div className="flex items-end gap-4">
            <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              {stats.conversionRate}
            </p>
            <div className="pb-2 flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
              <span className="text-sm font-bold text-green-600">+12.5%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabla de Efectividad */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Efectividad por Cupón</h3>
          </div>
        </div>

        <div className="p-6 relative z-10">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Código</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Usos</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Efectividad</th>
                </tr>
              </thead>
              <tbody>
                {stats.couponEffectiveness.map((coupon, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                          <Ticket className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{coupon.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-700">{coupon.uses}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="px-3 py-1 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200 inline-block">
                        <span className="text-sm font-bold text-emerald-700">{coupon.effectiveness}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EstadisticasCupones;
