import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Megaphone, TrendingUp, Users, DollarSign, Target,
  Calendar, BarChart3, History, Plus, Eye
} from 'lucide-react';
import { MOCK_CAMPANAS } from './types';
import CrearCampana from './components/CrearCampana';
import SeguimientoResultados from './components/SeguimientoResultados';
import HistorialCampanas from './components/HistorialCampanas';
import MetricasCampana from './components/MetricasCampana';
import CalendarioCampanas from './components/CalendarioCampanas';

const CampanasPage: React.FC = () => {
  const [mostrarCrearCampana, setMostrarCrearCampana] = useState(false);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [mostrarMetricas, setMostrarMetricas] = useState(false);

  // Calcular estadísticas globales
  const campanasActivas = MOCK_CAMPANAS.filter(c => c.estado === 'Activa').length;
  const totalImpresiones = MOCK_CAMPANAS.reduce((sum, c) => sum + c.impresiones, 0);
  const totalConversiones = MOCK_CAMPANAS.reduce((sum, c) => sum + c.conversiones, 0);
  const roiPromedio = Math.round(
    MOCK_CAMPANAS.filter(c => c.roi > 0).reduce((sum, c) => sum + c.roi, 0) /
    MOCK_CAMPANAS.filter(c => c.roi > 0).length
  );
  const tasaConversionPromedio = ((totalConversiones / totalImpresiones) * 100).toFixed(2);

  const stats = [
    {
      title: 'Campañas Activas',
      value: campanasActivas.toString(),
      change: 15,
      icon: Target,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'from-violet-50 to-purple-50',
      progress: (campanasActivas / MOCK_CAMPANAS.length) * 100
    },
    {
      title: 'Tasa de Conversión',
      value: `${tasaConversionPromedio}%`,
      change: 8,
      icon: TrendingUp,
      color: 'from-fuchsia-500 to-pink-600',
      bgColor: 'from-fuchsia-50 to-pink-50',
      progress: parseFloat(tasaConversionPromedio) * 10
    },
    {
      title: 'Alcance Total',
      value: `${(totalImpresiones / 1000000).toFixed(1)}M`,
      change: 22,
      icon: Users,
      color: 'from-purple-500 to-fuchsia-600',
      bgColor: 'from-purple-50 to-fuchsia-50',
      progress: 78
    },
    {
      title: 'ROI Promedio',
      value: `${roiPromedio}%`,
      change: 12,
      icon: DollarSign,
      color: 'from-violet-600 to-fuchsia-600',
      bgColor: 'from-violet-50 to-fuchsia-50',
      progress: Math.min((roiPromedio / 500) * 100, 100)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-fuchsia-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Megaphone className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Campañas de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Marketing</span>
              </h1>
            </div>

            {/* Botón CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMostrarCrearCampana(true)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-2xl font-semibold border-2 border-white/30 transition-all duration-300 shadow-xl"
            >
              <Plus className="w-5 h-5" />
              Crear Nueva Campaña
            </motion.button>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-violet-100 max-w-3xl leading-relaxed">
            Centro de control para <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">crear</span>,{' '}
            <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">gestionar</span> y{' '}
            <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">analizar</span> tus campañas
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Calendar className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{MOCK_CAMPANAS.length} Campañas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">{campanasActivas} Activas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">ROI {roiPromedio}%</span>
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgColor} rounded-full blur-2xl opacity-50`}></div>

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
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
              </div>

              {/* Progress bar circular decorativo */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
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

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Calendario */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          whileHover={{ scale: 1.03, y: -4 }}
          onClick={() => setMostrarCalendario(!mostrarCalendario)}
          className="relative overflow-hidden bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Calendar className="w-8 h-8" />
              </div>
              <Eye className="w-5 h-5 opacity-70" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Calendario</h3>
            <p className="text-violet-100">Visualiza campañas programadas</p>
          </div>
        </motion.button>

        {/* Historial */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.03, y: -4 }}
          onClick={() => setMostrarHistorial(!mostrarHistorial)}
          className="relative overflow-hidden bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <History className="w-8 h-8" />
              </div>
              <Eye className="w-5 h-5 opacity-70" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Historial</h3>
            <p className="text-fuchsia-100">Revisa campañas anteriores</p>
          </div>
        </motion.button>

        {/* Métricas */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          whileHover={{ scale: 1.03, y: -4 }}
          onClick={() => setMostrarMetricas(!mostrarMetricas)}
          className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <BarChart3 className="w-8 h-8" />
              </div>
              <Eye className="w-5 h-5 opacity-70" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Métricas</h3>
            <p className="text-purple-100">Análisis detallado de resultados</p>
          </div>
        </motion.button>
      </div>

      {/* Componentes Condicionales */}
      {mostrarCrearCampana && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CrearCampana onClose={() => setMostrarCrearCampana(false)} />
          </div>
        </div>
      )}

      {mostrarCalendario && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <CalendarioCampanas />
        </motion.div>
      )}

      {mostrarHistorial && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <HistorialCampanas />
        </motion.div>
      )}

      {mostrarMetricas && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <MetricasCampana />
        </motion.div>
      )}

      {/* Seguimiento de Resultados - Siempre visible */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <SeguimientoResultados />
      </motion.div>
    </div>
  );
};

export default CampanasPage;
