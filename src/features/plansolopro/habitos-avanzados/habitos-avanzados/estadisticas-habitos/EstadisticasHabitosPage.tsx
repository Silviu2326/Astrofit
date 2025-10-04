import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Calendar, Award, Flame, Target,
  BarChart3, Download, Sparkles, ArrowUpRight,
  CheckCircle, Clock, Activity, Brain
} from 'lucide-react';
import GraficoAdherencia from './components/GraficoAdherencia';
import RankingHabitos from './components/RankingHabitos';
import MetricasCliente from './components/MetricasCliente';
import DashboardAnalytics from './components/DashboardAnalytics';

const EstadisticasHabitosPage: React.FC = () => {
  // Datos de ejemplo para estadísticas rápidas
  const quickStats = [
    {
      title: 'Promedio de Cumplimiento',
      value: '78.5%',
      change: '+5.2',
      icon: Target,
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-100 to-red-100',
      progress: 78.5
    },
    {
      title: 'Días Consecutivos',
      value: '24',
      change: '+3',
      icon: Flame,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-100 to-pink-100',
      progress: 80
    },
    {
      title: 'Hábito Más Consistente',
      value: 'Beber Agua',
      change: '90',
      icon: Award,
      gradient: 'from-pink-500 to-orange-500',
      bgGradient: 'from-pink-100 to-orange-100',
      progress: 90
    },
    {
      title: 'Mejor Racha del Año',
      value: '45 días',
      change: '+12',
      icon: TrendingUp,
      gradient: 'from-orange-600 to-red-600',
      bgGradient: 'from-orange-100 to-red-100',
      progress: 75
    }
  ];

  // Datos para timeline de hábitos completados
  const recentCompletions = [
    { habit: 'Hacer ejercicio', time: 'Hace 2 horas', icon: '💪', category: 'Salud' },
    { habit: 'Meditar 10 min', time: 'Hace 5 horas', icon: '🧘', category: 'Bienestar' },
    { habit: 'Leer 30 min', time: 'Ayer', icon: '📚', category: 'Educación' },
    { habit: 'Beber 2L agua', time: 'Ayer', icon: '💧', category: 'Salud' },
  ];

  // Datos para insights de IA
  const aiInsights = [
    {
      type: 'success',
      title: 'Excelente consistencia',
      message: 'Has mantenido tus hábitos matutinos por 24 días consecutivos. ¡Sigue así!',
      icon: CheckCircle,
      color: 'green'
    },
    {
      type: 'info',
      title: 'Oportunidad de mejora',
      message: 'Tus hábitos nocturnos tienen un 45% de cumplimiento. Intenta establecer recordatorios.',
      icon: Brain,
      color: 'blue'
    },
    {
      type: 'warning',
      title: 'Patrón detectado',
      message: 'Los fines de semana tu adherencia baja un 20%. Considera hábitos más flexibles.',
      icon: Activity,
      color: 'orange'
    }
  ];

  const handleExportReport = () => {
    console.log('Exportando reporte de hábitos...');
    // Aquí iría la lógica de exportación
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-pink-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Patrón de puntos */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <BarChart3 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Estadísticas de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Hábitos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed mb-6">
            Visualiza tu progreso y crecimiento personal
          </p>

          {/* Botón de exportar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportReport}
            className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 hover:bg-white/30 transition-all duration-300"
          >
            <Download className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white">Exportar Reporte</span>
          </motion.button>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} opacity-20 rounded-full blur-2xl`}></div>

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

              {/* Cambio */}
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1 bg-green-50 rounded-lg">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              {/* Barra de progreso */}
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GRÁFICOS Y ANÁLISIS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de adherencia */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <GraficoAdherencia />
        </motion.div>

        {/* Dashboard Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <DashboardAnalytics />
        </motion.div>
      </div>

      {/* RANKING Y TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Ranking de hábitos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <RankingHabitos />
        </motion.div>

        {/* Timeline de completados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Actividad Reciente</h3>
            </div>

            <div className="space-y-3">
              {recentCompletions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-300 border border-transparent hover:border-orange-100 hover:shadow-md group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-orange-400 to-pink-600">
                    <span className="text-2xl">{item.icon}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{item.habit}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">{item.time}</span>
                    </div>
                  </div>

                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* INSIGHTS DE IA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden mb-8"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Insights y Recomendaciones</h3>
            <div className="ml-auto">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                className={`p-4 rounded-2xl border-2 ${
                  insight.color === 'green' ? 'bg-green-50 border-green-200' :
                  insight.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                  'bg-orange-50 border-orange-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl ${
                    insight.color === 'green' ? 'bg-green-100' :
                    insight.color === 'blue' ? 'bg-blue-100' :
                    'bg-orange-100'
                  }`}>
                    <insight.icon className={`w-5 h-5 ${
                      insight.color === 'green' ? 'text-green-600' :
                      insight.color === 'blue' ? 'text-blue-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-sm font-bold mb-1 ${
                      insight.color === 'green' ? 'text-green-900' :
                      insight.color === 'blue' ? 'text-blue-900' :
                      'text-orange-900'
                    }`}>
                      {insight.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${
                      insight.color === 'green' ? 'text-green-700' :
                      insight.color === 'blue' ? 'text-blue-700' :
                      'text-orange-700'
                    }`}>
                      {insight.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* MÉTRICAS DE CLIENTES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <MetricasCliente />
      </motion.div>
    </div>
  );
};

export default EstadisticasHabitosPage;
