import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy, Target, TrendingUp, Award, Users, Clock,
  Zap, BarChart3, Medal, Star, ChevronRight, Calendar
} from 'lucide-react';
import CentroResultados from './components/CentroResultados';
import DistribucionMediatica from './components/DistribucionMediatica';
import AnalyticsEvento from './components/AnalyticsEvento';
import TimingOficial from './components/TimingOficial';
import IntegracionPhotofinish from './components/IntegracionPhotofinish';
import GeneradorComunicados from './components/GeneradorComunicados';
import ClasificacionesComplejas from './components/ClasificacionesComplejas';
import ArchivoHistorico from './components/ArchivoHistorico';
import ScoreboardDigital from './components/ScoreboardDigital';

const ResultadosEventosPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState('campeonato-nacional-2024');

  // Datos mock para la clasificación
  const clasificacion = [
    { posicion: 1, equipo: 'Águilas FC', puntos: 2850, cambio: '+2', rendimiento: 95 },
    { posicion: 2, equipo: 'Tigres United', puntos: 2720, cambio: '-1', rendimiento: 92 },
    { posicion: 3, equipo: 'Leones SC', puntos: 2680, cambio: '+1', rendimiento: 89 },
    { posicion: 4, equipo: 'Dragones CF', puntos: 2540, cambio: '0', rendimiento: 85 },
    { posicion: 5, equipo: 'Halcones AC', puntos: 2420, cambio: '-2', rendimiento: 82 },
  ];

  // Estadísticas del evento
  const estadisticas = [
    { icon: Users, label: 'Participantes', valor: '248', color: 'from-blue-500 to-indigo-600' },
    { icon: Trophy, label: 'Competencias', valor: '32', color: 'from-purple-500 to-pink-600' },
    { icon: Award, label: 'Premios', valor: '96', color: 'from-emerald-500 to-teal-600' },
    { icon: Clock, label: 'Duración', valor: '8h', color: 'from-orange-500 to-red-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Trophy className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Resultados de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Eventos</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Marcadores digitales, clasificaciones y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">análisis en tiempo real</span>
          </p>

          {/* Selector de Evento */}
          <div className="mt-6">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="px-6 py-3 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold focus:border-white/50 focus:ring-4 focus:ring-white/20 transition-all duration-300 outline-none"
            >
              <option value="campeonato-nacional-2024" className="text-gray-900">Campeonato Nacional 2024</option>
              <option value="copa-elite-2024" className="text-gray-900">Copa Elite 2024</option>
              <option value="torneo-regional" className="text-gray-900">Torneo Regional</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {estadisticas.map((stat, index) => (
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
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.label}
              </p>
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                {stat.valor}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marcador Digital */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-8"
      >
        <ScoreboardDigital
          eventName="Final - Campeonato Nacional"
          team1Name="Águilas FC"
          team2Name="Tigres United"
          team1Score={3}
          team2Score={2}
          timeRemaining="Final"
        />
      </motion.div>

      {/* Tabla de Clasificación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Medal className="w-6 h-6" />
            </div>
            Clasificación General
          </h3>
        </div>

        {/* Body - Tabla */}
        <div className="p-6">
          <div className="space-y-3">
            {clasificacion.map((item, index) => (
              <motion.div
                key={item.posicion}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-indigo-100 hover:shadow-md group"
              >
                {/* Badge de posición */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                  item.posicion === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                  item.posicion === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                  item.posicion === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800' :
                  'bg-gradient-to-br from-blue-400 to-indigo-600'
                }`}>
                  <span className="text-lg">{item.posicion}°</span>
                </div>

                {/* Nombre del equipo */}
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-gray-900">{item.equipo}</p>
                  <p className="text-sm text-gray-600">{item.puntos} puntos</p>
                </div>

                {/* Progress bar de rendimiento */}
                <div className="hidden md:block flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-purple-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.rendimiento}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                        className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 rounded-full"
                      ></motion.div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{item.rendimiento}%</span>
                  </div>
                </div>

                {/* Cambio de posición */}
                <div className={`px-3 py-1 rounded-full font-bold text-xs ${
                  item.cambio.startsWith('+') ? 'bg-green-100 text-green-700' :
                  item.cambio.startsWith('-') ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {item.cambio}
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Sistema Broadcasting Profesional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden mb-8"
      >
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Sistema Broadcasting Profesional
            </h2>
          </div>

          <p className="text-lg text-gray-700 mb-6">
            Integración con sistemas de broadcasting para una cobertura de eventos de <span className="font-bold text-indigo-600">alta calidad</span> en tiempo real.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
              <span className="text-sm font-bold text-blue-700">📡 Streaming Live</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
              <span className="text-sm font-bold text-purple-700">🎥 Multi-cámara</span>
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200">
              <span className="text-sm font-bold text-emerald-700">🌐 Distribución Global</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Módulos Avanzados de Resultados */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-6 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-indigo-600" />
          Módulos Avanzados de Resultados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CentroResultados />
          <DistribucionMediatica />
          <AnalyticsEvento />
          <TimingOficial />
          <IntegracionPhotofinish />
          <GeneradorComunicados />
          <ClasificacionesComplejas />
          <ArchivoHistorico />
        </div>
      </motion.div>
    </div>
  );
};

export default ResultadosEventosPage;
