import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, TrendingUp, Users, Target, Sparkles } from 'lucide-react';
import EncuestasRapidas from './components/EncuestasRapidas';
import CalculadoraNPS from './components/CalculadoraNPS';
import ComentariosUtiles from './components/ComentariosUtiles';
import TendenciasSatisfaccion from './components/TendenciasSatisfaccion';
import AccionesMejora from './components/AccionesMejora';
import { useGetFeedbackQuery } from './encuestasNpsApi';

const EncuestasNpsPage: React.FC = () => {
  const { data: feedback } = useGetFeedbackQuery();

  // Cálculos para estadísticas rápidas
  const totalResponses = feedback?.length || 0;
  const promoters = feedback?.filter((f) => f.score >= 9).length || 0;
  const passives = feedback?.filter((f) => f.score >= 7 && f.score <= 8).length || 0;
  const detractors = feedback?.filter((f) => f.score >= 0 && f.score <= 6).length || 0;
  const npsScore = totalResponses > 0 ? ((promoters - detractors) / totalResponses) * 100 : 0;
  const responseRate = 68; // Mock data
  const trend = 12.5; // Mock data - vs mes anterior

  const stats = [
    {
      title: 'Score NPS',
      value: npsScore.toFixed(1),
      icon: Gauge,
      change: trend,
      progress: Math.min(100, (npsScore + 100) / 2),
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Total Respuestas',
      value: totalResponses,
      icon: Users,
      change: 8.3,
      progress: 75,
      gradient: 'from-cyan-500 to-teal-600',
    },
    {
      title: 'Tasa de Respuesta',
      value: `${responseRate}%`,
      icon: TrendingUp,
      change: 5.2,
      progress: responseRate,
      gradient: 'from-teal-500 to-emerald-600',
    },
    {
      title: 'Tendencia',
      value: `+${trend}%`,
      icon: Target,
      change: trend,
      progress: 80,
      gradient: 'from-emerald-500 to-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 pb-12">
      {/* Hero Section - NPS */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Gauge className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Net Promoter <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Score</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Sistema de seguimiento de satisfacción del cliente basado en{' '}
            <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">metodología NPS</span>
          </p>

          {/* Clasificación NPS */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-sm font-semibold text-white">Detractores (0-6): {detractors}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-sm font-semibold text-white">Pasivos (7-8): {passives}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-sm font-semibold text-white">Promotores (9-10): {promoters}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
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
        ))}
      </div>

      {/* Componentes principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calculadora NPS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <CalculadoraNPS />
        </motion.div>

        {/* Encuestas Rápidas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="lg:col-span-2"
        >
          <EncuestasRapidas />
        </motion.div>

        {/* Comentarios Útiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="lg:col-span-3"
        >
          <ComentariosUtiles />
        </motion.div>

        {/* Tendencias de Satisfacción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="lg:col-span-2"
        >
          <TendenciasSatisfaccion />
        </motion.div>

        {/* Acciones de Mejora */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <AccionesMejora />
        </motion.div>
      </div>
    </div>
  );
};

export default EncuestasNpsPage;