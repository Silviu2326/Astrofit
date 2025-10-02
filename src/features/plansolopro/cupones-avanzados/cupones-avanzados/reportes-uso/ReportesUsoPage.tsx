import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign, Filter, Download, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import DashboardCupones from './components/DashboardCupones';

const ReportesUsoPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Estadísticas rápidas
  const quickStats = [
    {
      title: 'Total Redimido',
      value: '$45,230',
      change: '+18.5',
      trend: 'up',
      icon: DollarSign,
      color: 'from-emerald-500 via-teal-500 to-cyan-500',
      progress: 78
    },
    {
      title: 'Cupones Populares',
      value: '12',
      change: '+3',
      trend: 'up',
      icon: Target,
      color: 'from-sky-500 via-blue-500 to-indigo-500',
      progress: 65
    },
    {
      title: 'ROI Promociones',
      value: '285%',
      change: '+42.3',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-violet-500 via-purple-500 to-fuchsia-500',
      progress: 92
    },
    {
      title: 'Nuevos Clientes',
      value: '1,847',
      change: '+24.1',
      trend: 'up',
      icon: Users,
      color: 'from-orange-500 via-pink-500 to-rose-500',
      progress: 71
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <BarChart3 className="w-10 h-10 text-cyan-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-cyan-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Reportes de <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-200">Cupones</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Analiza el <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">impacto de tus promociones</span> en tiempo real
          </p>

          {/* Filtros y acciones */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Filter className="w-5 h-5 text-cyan-300" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-transparent text-sm font-semibold text-white border-none outline-none cursor-pointer"
              >
                <option value="7d" className="text-gray-900">Últimos 7 días</option>
                <option value="30d" className="text-gray-900">Últimos 30 días</option>
                <option value="90d" className="text-gray-900">Últimos 90 días</option>
                <option value="custom" className="text-gray-900">Personalizado</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 text-white font-semibold hover:bg-white/30 transition-colors"
            >
              <Download className="w-5 h-5" />
              <span className="text-sm">Exportar</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
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

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className={`p-1 ${stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <span className={`text-sm font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}%
                </span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Dashboard de Cupones */}
      <DashboardCupones />
    </div>
  );
};

export default ReportesUsoPage;
