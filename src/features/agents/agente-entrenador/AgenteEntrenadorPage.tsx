import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dumbbell, Users, Target, TrendingUp,
  Calendar, Zap, Activity, CheckCircle2,
  Sparkles, BarChart3, Trophy
} from 'lucide-react';
import ConstructorVisual from './components/builder/ConstructorVisual';
import BloquesEntrenamiento from './components/builder/BloquesEntrenamiento';
import SuperseriesManager from './components/builder/SuperseriesManager';
import BancoVariantes from './components/library/BancoVariantes';
import DashboardEntrenamiento from './components/dashboard/DashboardEntrenamiento';
import AnalisisRendimiento from './components/analytics/AnalisisRendimiento';
import IndicadoresEquilibrio from './components/analytics/IndicadoresEquilibrio';
import PrediccionesIA from './components/analytics/PrediccionesIA';
import ValidadorRutinas from './components/analytics/ValidadorRutinas';

const AgenteEntrenadorPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'constructor' | 'analytics' | 'validador'>('constructor');

  // Datos mockeados para estadísticas rápidas
  const quickStats = [
    {
      title: 'Rutinas Generadas',
      value: '156',
      change: '+12.5',
      icon: Calendar,
      gradient: 'from-orange-500 to-red-500',
      progress: 75
    },
    {
      title: 'Ejercicios en BD',
      value: '500+',
      change: '+8.3',
      icon: Dumbbell,
      gradient: 'from-red-500 to-pink-500',
      progress: 90
    },
    {
      title: 'Clientes Entrenando',
      value: '42',
      change: '+15.2',
      icon: Users,
      gradient: 'from-pink-500 to-orange-500',
      progress: 68
    },
    {
      title: 'Adherencia Promedio',
      value: '87%',
      change: '+5.8',
      icon: Trophy,
      gradient: 'from-orange-600 to-red-600',
      progress: 87
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-pink-50/30 pb-12">
      {/* HERO SECTION - Agente Entrenador */}
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
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Dumbbell className="w-12 h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Agente <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Entrenador</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed mb-6">
            IA especializada en <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">programación de entrenamientos</span> personalizados
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Optimización Automática</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Balance Muscular</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Predicción IA</span>
            </div>
          </div>
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
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}%</span>
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

      {/* TABS DE NAVEGACIÓN */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('constructor')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
            activeTab === 'constructor'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl'
              : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            Constructor
          </div>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
            activeTab === 'analytics'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl'
              : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Análisis
          </div>
        </button>
        <button
          onClick={() => setActiveTab('validador')}
          className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
            activeTab === 'validador'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl'
              : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Validador
          </div>
        </button>
      </div>

      {/* CONTENIDO POR TAB */}
      {activeTab === 'constructor' && (
        <div className="space-y-8">
          <ConstructorVisual />
          <BloquesEntrenamiento />
          <SuperseriesManager />
          <BancoVariantes />
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <DashboardEntrenamiento />
          <AnalisisRendimiento />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <IndicadoresEquilibrio />
            <PrediccionesIA />
          </div>
        </div>
      )}

      {activeTab === 'validador' && (
        <div className="space-y-8">
          <ValidadorRutinas />
        </div>
      )}
    </div>
  );
};

export default AgenteEntrenadorPage;