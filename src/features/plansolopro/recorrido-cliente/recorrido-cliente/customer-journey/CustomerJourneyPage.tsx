import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Users, Clock, TrendingUp, Filter } from 'lucide-react';
import EmbudoVisual from './components/EmbudoVisual';
import TarjetasClientes from './components/TarjetasClientes';
import BarrasConversion from './components/BarrasConversion';
import AlertasEstancados from './components/AlertasEstancados';

const CustomerJourneyPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Estadísticas rápidas
  const stats = [
    {
      title: 'Clientes en Onboarding',
      value: '48',
      change: '+12',
      icon: Users,
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-50',
      progress: 65,
    },
    {
      title: 'Etapa Promedio',
      value: '2.4',
      change: '+0.3',
      icon: TrendingUp,
      gradient: 'from-green-500 to-lime-600',
      bgGradient: 'from-green-50 to-lime-50',
      progress: 60,
    },
    {
      title: 'Tiempo Promedio por Etapa',
      value: '12.5d',
      change: '-2.1',
      icon: Clock,
      gradient: 'from-lime-500 to-emerald-600',
      bgGradient: 'from-lime-50 to-emerald-50',
      progress: 75,
    },
    {
      title: 'Tasa de Conversión',
      value: '68%',
      change: '+5.2',
      icon: TrendingUp,
      gradient: 'from-emerald-600 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      progress: 68,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-green-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Map className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Recorrido del <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Cliente</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl leading-relaxed">
            Visualiza cada etapa del <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">journey</span> de tus clientes
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Filter className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Timeline Visual</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-lime-300" />
              <span className="text-sm font-semibold text-white">Puntos de Contacto</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Automated Triggers</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
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
                <div className={`p-1 rounded-lg bg-gradient-to-r ${stat.bgGradient}`}>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-sm font-bold text-emerald-600">{stat.change}</span>
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

      {/* FILTROS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Filtrar por estado:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'Lead', 'Cliente nuevo', 'Activo', 'Fiel'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  filterStatus === status
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {status === 'all' ? 'Todos' : status}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <EmbudoVisual />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="lg:col-span-1"
        >
          <AlertasEstancados />
        </motion.div>
      </div>

      {/* TABLERO KANBAN */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mb-8"
      >
        <TarjetasClientes />
      </motion.div>

      {/* BARRAS DE CONVERSIÓN */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <BarrasConversion />
      </motion.div>
    </div>
  );
};

export default CustomerJourneyPage;
