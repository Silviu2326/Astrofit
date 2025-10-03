import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, Users, Target, Shield, Gauge, TrendingUp,
  BarChart3, MapPin, Zap, ArrowUpRight
} from 'lucide-react';
import TablasPosicionales from './components/TablasPosicionales';
import MapaCalorPosicional from './components/MapaCalorPosicional';
import AnalisisRotaciones from './components/AnalisisRotaciones';
import OptimizadorPosicional from './components/OptimizadorPosicional';
import CompatibilidadJugadores from './components/CompatibilidadJugadores';
import BenchmarkingLigas from './components/BenchmarkingLigas';
import IdentificacionGaps from './components/IdentificacionGaps';
import AnalisisPredictivo from './components/AnalisisPredictivo';
import RecomendacionesFichajes from './components/RecomendacionesFichajes';

type PosicionType = 'delantero' | 'mediocampista' | 'defensa' | 'portero';

const AnalisisPosicionPage: React.FC = () => {
  const [posicionActiva, setPosicionActiva] = useState<PosicionType>('delantero');

  const posiciones = [
    {
      id: 'delantero' as PosicionType,
      nombre: 'Delanteros',
      icon: Target,
      color: 'from-red-500 via-orange-500 to-pink-500',
      bgColor: 'from-red-50 to-orange-50',
      stats: { efectividad: 87, goles: 45, asistencias: 23 }
    },
    {
      id: 'mediocampista' as PosicionType,
      nombre: 'Mediocampistas',
      icon: Activity,
      color: 'from-blue-500 via-indigo-500 to-purple-500',
      bgColor: 'from-blue-50 to-indigo-50',
      stats: { control: 82, pases: 1254, recuperaciones: 156 }
    },
    {
      id: 'defensa' as PosicionType,
      nombre: 'Defensas',
      icon: Shield,
      color: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgColor: 'from-emerald-50 to-teal-50',
      stats: { solidez: 91, despejes: 234, intercepciones: 189 }
    },
    {
      id: 'portero' as PosicionType,
      nombre: 'Portero',
      icon: Users,
      color: 'from-purple-500 via-pink-500 to-rose-500',
      bgColor: 'from-purple-50 to-pink-50',
      stats: { atajadas: 78, porcentaje: 94, golesRecibidos: 12 }
    }
  ];

  const metricas = [
    { titulo: 'Efectividad General', valor: '87%', cambio: '+12.5', icon: Gauge, color: 'from-blue-500 to-purple-600' },
    { titulo: 'Promedio de Goles', valor: '2.4', cambio: '+8.3', icon: Target, color: 'from-orange-500 to-red-600' },
    { titulo: 'Rotaciones Óptimas', valor: '15', cambio: '+5.0', icon: TrendingUp, color: 'from-emerald-500 to-teal-600' },
    { titulo: 'Posiciones Críticas', valor: '3', cambio: '-15.2', icon: Zap, color: 'from-purple-500 to-pink-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-12">
      {/* Hero Section con gradiente deportivo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Pattern de campo de fútbol */}
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
              <MapPin className="w-10 h-10 text-green-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-green-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Análisis por <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-green-400">Posición</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Desglose táctico completo de cada <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">posición en el campo</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Análisis Completo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Datos en Tiempo Real</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de Métricas Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricas.map((metrica, index) => (
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
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${metrica.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <metrica.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {metrica.titulo}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {metrica.valor}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className={`p-1 ${parseFloat(metrica.cambio) >= 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                  <ArrowUpRight className={`w-4 h-4 ${parseFloat(metrica.cambio) >= 0 ? 'text-green-600' : 'text-red-600 rotate-90'}`} />
                </div>
                <span className={`text-sm font-bold ${parseFloat(metrica.cambio) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metrica.cambio}%
                </span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selector de Posición con Pills/Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Análisis por Posición</h2>

        {/* Tabs de posiciones */}
        <div className="flex flex-wrap gap-3 mb-8">
          {posiciones.map((pos) => (
            <motion.button
              key={pos.id}
              onClick={() => setPosicionActiva(pos.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                posicionActiva === pos.id
                  ? `bg-gradient-to-r ${pos.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <pos.icon className="w-5 h-5" />
                <span>{pos.nombre}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Grid de Cards por Posición */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posiciones.map((pos, index) => (
            <motion.div
              key={pos.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`relative overflow-hidden bg-gradient-to-br ${pos.bgColor} rounded-3xl shadow-lg p-6 border-2 ${
                posicionActiva === pos.id ? 'border-indigo-500' : 'border-transparent'
              } transition-all duration-300 cursor-pointer`}
              onClick={() => setPosicionActiva(pos.id)}
            >
              {/* Badge de posición */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${pos.color} text-white text-sm font-bold mb-4`}>
                <pos.icon className="w-4 h-4" />
                <span>{pos.nombre}</span>
              </div>

              {/* Estadísticas */}
              <div className="space-y-3">
                {Object.entries(pos.stats).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold text-gray-700 capitalize">{key}</span>
                      <span className="text-sm font-bold text-gray-900">{value}</span>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-white/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${typeof value === 'number' ? value : 50}%` }}
                        transition={{ delay: index * 0.1 + 0.6, duration: 1 }}
                        className={`h-full bg-gradient-to-r ${pos.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Componentes de Análisis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="space-y-8"
      >
        <TablasPosicionales />
        <MapaCalorPosicional />
        <AnalisisRotaciones />
        <OptimizadorPosicional />
        <CompatibilidadJugadores />
        <BenchmarkingLigas />
        <IdentificacionGaps />
        <AnalisisPredictivo />
        <RecomendacionesFichajes />
      </motion.div>
    </div>
  );
};

export default AnalisisPosicionPage;
