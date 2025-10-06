import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, Award, TrendingUp, PlayCircle, Shield, BarChart3, Share2, Sparkles } from 'lucide-react';
import CuadroTorneos from './components/CuadroTorneos';
import GeneradorBrackets from './components/GeneradorBrackets';
import SistemaSeeding from './components/SistemaSeeding';
import StreamingTorneo from './components/StreamingTorneo';
import ApuestasVirtuales from './components/ApuestasVirtuales';
import GestionArbitros from './components/GestionArbitros';
import AnalyticsTorneo from './components/AnalyticsTorneo';
import SistemaPremios from './components/SistemaPremios';
import IntegracionRedesSociales from './components/IntegracionRedesSociales';

const TorneosPage: React.FC = () => {
  // Mock data for demonstration
  const mockTournament = {
    id: '1',
    name: 'Torneo de Verano',
    teams: [
      { id: 't1', name: 'Equipo Alpha' },
      { id: 't2', name: 'Equipo Beta' },
      { id: 't3', name: 'Equipo Gamma' },
      { id: 't4', name: 'Equipo Delta' },
    ],
    matches: [
      { id: 'm1', round: 1, team1: 't1', team2: 't2', winner: null },
      { id: 'm2', round: 1, team1: 't3', team2: 't4', winner: null },
      // More matches would be added as the tournament progresses
    ],
  };

  const tournamentStats = [
    { icon: Trophy, title: 'Torneos Activos', value: '8', change: '+15', color: 'from-purple-500 to-pink-500' },
    { icon: Users, title: 'Equipos Inscritos', value: '64', change: '+23', color: 'from-indigo-500 to-purple-500' },
    { icon: Calendar, title: 'Partidos Hoy', value: '12', change: '+8', color: 'from-rose-500 to-pink-500' },
    { icon: Award, title: 'Premios Totales', value: '$25K', change: '+12', color: 'from-purple-500 to-rose-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Trophy className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Torneos <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Elite</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed">
            Organiza y gestiona torneos profesionales con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">brackets inteligentes</span> y seguimiento en tiempo real
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Gestión Profesional</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <PlayCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Streaming en Vivo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Analytics Avanzado</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {tournamentStats.map((stat, index) => (
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
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cuadro de Torneos */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-8"
      >
        <CuadroTorneos tournament={mockTournament} />
      </motion.section>

      {/* Generador de Brackets */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mb-8"
      >
        <GeneradorBrackets />
      </motion.section>

      {/* Sistema Seeding */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mb-8"
      >
        <SistemaSeeding />
      </motion.section>

      {/* Streaming */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mb-8"
      >
        <StreamingTorneo />
      </motion.section>

      {/* Apuestas Virtuales */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mb-8"
      >
        <ApuestasVirtuales />
      </motion.section>

      {/* Gestión Árbitros */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="mb-8"
      >
        <GestionArbitros />
      </motion.section>

      {/* Analytics */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="mb-8"
      >
        <AnalyticsTorneo />
      </motion.section>

      {/* Sistema de Premios */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mb-8"
      >
        <SistemaPremios />
      </motion.section>

      {/* Redes Sociales */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="mb-8"
      >
        <IntegracionRedesSociales />
      </motion.section>
    </div>
  );
};

export default TorneosPage;
