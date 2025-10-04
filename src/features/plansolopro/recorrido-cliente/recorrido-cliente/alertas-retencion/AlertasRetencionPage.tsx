import React from 'react';
import { motion } from 'framer-motion';
import { BellRing, AlertTriangle, Users, TrendingUp, CheckCircle } from 'lucide-react';
import RadarClientes from './components/RadarClientes';
import TarjetasRiesgo from './components/TarjetasRiesgo';
import AccionesRapidas from './components/AccionesRapidas';
import SugerenciasRetencion from './components/SugerenciasRetencion';

const AlertasRetencionPage: React.FC = () => {
  // Datos mockeados para estadísticas rápidas
  const stats = [
    {
      title: 'Alertas Activas',
      value: '24',
      change: '+8',
      icon: AlertTriangle,
      gradient: 'from-red-500 to-orange-500'
    },
    {
      title: 'Clientes en Riesgo Alto',
      value: '12',
      change: '+3',
      icon: Users,
      gradient: 'from-rose-500 to-red-500'
    },
    {
      title: 'Alertas Resueltas Este Mes',
      value: '48',
      change: '+15',
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Tasa de Retención',
      value: '87%',
      change: '+5',
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-orange-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-red-600 to-orange-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <BellRing className="w-10 h-10 md:w-12 md:h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Alertas de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Retención</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-lg md:text-xl lg:text-2xl text-rose-100 max-w-3xl leading-relaxed">
            Prevén la pérdida de clientes <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">antes de que suceda</span>
          </p>

          {/* Indicador de alerta activa */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-white">Sistema de alertas activo</span>
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
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-rose-500 to-orange-600 opacity-5 rounded-full blur-2xl"></div>

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
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">vs semana anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* TARJETAS DE RIESGO */}
      <div className="mb-8">
        <TarjetasRiesgo />
      </div>

      {/* RADAR Y SUGERENCIAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <RadarClientes />
        <SugerenciasRetencion />
      </div>

      {/* ACCIONES RÁPIDAS */}
      <AccionesRapidas />
    </div>
  );
};

export default AlertasRetencionPage;
