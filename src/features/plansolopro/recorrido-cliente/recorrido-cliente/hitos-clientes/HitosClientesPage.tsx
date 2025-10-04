import React from 'react';
import { motion } from 'framer-motion';
import { Flag, TrendingUp, Trophy, Users, ArrowUpRight, Share2, Image as ImageIcon, Settings } from 'lucide-react';
import TimelineHitos from './components/TimelineHitos';
import CalendarioEventos from './components/CalendarioEventos';

const HitosClientesPage: React.FC = () => {
  const stats = [
    {
      title: 'Hitos Alcanzados Este Mes',
      value: '24',
      change: '18',
      icon: Trophy,
      gradient: 'from-amber-500 to-yellow-500',
      progress: 75
    },
    {
      title: 'Clientes con Logros Recientes',
      value: '18',
      change: '12',
      icon: Users,
      gradient: 'from-yellow-500 to-lime-500',
      progress: 60
    },
    {
      title: 'Hito Más Común',
      value: 'Meta de Peso',
      change: '8',
      icon: TrendingUp,
      gradient: 'from-lime-500 to-green-500',
      progress: 85
    },
    {
      title: 'Promedio de Hitos por Cliente',
      value: '3.2',
      change: '5',
      icon: Flag,
      gradient: 'from-green-500 to-emerald-500',
      progress: 65
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-yellow-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-yellow-600 to-lime-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Flag className="w-10 h-10 text-yellow-200 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-200 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Hitos y <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Logros</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl leading-relaxed">
            Celebra cada <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">victoria</span> de tus clientes
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Logros Recientes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Share2 className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Compartir Éxitos</span>
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
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
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

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-yellow-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <Share2 className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Compartir Logros</h3>
            <p className="text-sm text-amber-100">Celebra en redes sociales</p>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gradient-to-br from-yellow-500 to-lime-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <ImageIcon className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Galería de Transformaciones</h3>
            <p className="text-sm text-yellow-100">Fotos de antes y después</p>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden bg-gradient-to-br from-lime-500 to-green-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <Settings className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Configurar Hitos</h3>
            <p className="text-sm text-lime-100">Personaliza tus milestones</p>
          </div>
        </motion.button>
      </div>

      {/* Timeline y Calendario */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl text-white">
                <Flag className="w-6 h-6" />
              </div>
              Timeline de Logros
            </h2>
            <TimelineHitos />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-lime-200 to-green-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl text-white">
                <Trophy className="w-6 h-6" />
              </div>
              Calendario de Eventos
            </h2>
            <CalendarioEventos />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HitosClientesPage;
