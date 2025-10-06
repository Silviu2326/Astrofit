import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Award, TrendingUp, Target, Flame, Star } from 'lucide-react';
import CentroComando from './components/CentroComando';
import GestorLogistica from './components/GestorLogistica';
import CoberturaMediatica from './components/CoberturaMediatica';
import ProtocolosCOVID from './components/ProtocolosCOVID';
import SistemaEmergencias from './components/SistemaEmergencias';
import IntegracionTicketing from './components/IntegracionTicketing';
import DashboardSponsors from './components/DashboardSponsors';
import SistemaSustentabilidad from './components/SistemaSustentabilidad';

const CampeonatosPage: React.FC = () => {
  // Mock data para tabla de posiciones
  const posiciones = [
    { pos: 1, equipo: 'Team Alpha', puntos: 87, partidos: 30, victorias: 27, badge: 'oro' },
    { pos: 2, equipo: 'Team Beta', puntos: 82, partidos: 30, victorias: 25, badge: 'plata' },
    { pos: 3, equipo: 'Team Gamma', puntos: 76, partidos: 30, victorias: 23, badge: 'bronce' },
    { pos: 4, equipo: 'Team Delta', puntos: 71, partidos: 30, victorias: 21, badge: null },
    { pos: 5, equipo: 'Team Epsilon', puntos: 65, partidos: 30, victorias: 19, badge: null },
  ];

  // Mock data para campeonatos
  const campeonatos = [
    {
      nombre: 'Torneo Apertura 2025',
      equipos: 16,
      progreso: 75,
      fase: 'Semifinales',
      icono: Trophy,
      color: 'from-yellow-500 via-orange-500 to-red-500'
    },
    {
      nombre: 'Copa Nacional',
      equipos: 12,
      progreso: 50,
      fase: 'Cuartos',
      icono: Award,
      color: 'from-blue-500 via-indigo-500 to-purple-500'
    },
    {
      nombre: 'Champions League',
      equipos: 8,
      progreso: 90,
      fase: 'Final',
      icono: Crown,
      color: 'from-purple-500 via-pink-500 to-red-500'
    },
  ];

  const getBadgeStyles = (tipo: string | null) => {
    switch(tipo) {
      case 'oro':
        return 'bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-yellow-900 shadow-lg shadow-yellow-500/50';
      case 'plata':
        return 'bg-gradient-to-r from-gray-300 via-gray-200 to-gray-400 text-gray-800 shadow-lg shadow-gray-400/50';
      case 'bronce':
        return 'bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 text-orange-900 shadow-lg shadow-orange-500/50';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pb-12">
      {/* Hero Section con gradiente deportivo */}
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Trophy className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Campeonatos</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            Centro de control para <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">torneos profesionales</span> multi-equipo
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">3 Torneos Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">36 Equipos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="text-sm font-semibold text-white">En Vivo</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cards de Campeonatos con header gradiente */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {campeonatos.map((campeonato, index) => {
          const IconComponent = campeonato.icono;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Header con gradiente */}
              <div className={`bg-gradient-to-r ${campeonato.color} p-6 relative overflow-hidden`}>
                {/* Pattern de fondo */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{campeonato.nombre}</h3>
                  </div>
                  <p className="text-white/90 text-sm font-medium">{campeonato.equipos} equipos participantes</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 relative z-10">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600">Progreso de Temporada</span>
                    <span className="text-lg font-bold text-gray-900">{campeonato.progreso}%</span>
                  </div>
                  {/* Progress bar con gradiente */}
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${campeonato.progreso}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${campeonato.color} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </motion.div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium">Fase Actual:</span>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
                    <span className="text-sm font-bold text-purple-700">{campeonato.fase}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tabla de Posiciones con glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8 relative"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Medal className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Tabla de Posiciones</h2>
          </div>
        </div>

        {/* Tabla */}
        <div className="p-6 relative z-10">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Pos</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Equipo</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wider">PJ</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wider">V</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Pts</th>
                  <th className="text-center py-3 px-4 text-sm font-bold text-gray-600 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody>
                {posiciones.map((equipo, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 group"
                  >
                    <td className="py-4 px-4">
                      {equipo.badge ? (
                        <div className={`w-8 h-8 rounded-full ${getBadgeStyles(equipo.badge)} flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-300`}>
                          {equipo.pos}
                        </div>
                      ) : (
                        <span className="text-gray-700 font-semibold">{equipo.pos}</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {equipo.badge && (
                          <div className="relative">
                            {equipo.badge === 'oro' && <Crown className="w-5 h-5 text-yellow-500" />}
                            {equipo.badge === 'plata' && <Medal className="w-5 h-5 text-gray-400" />}
                            {equipo.badge === 'bronce' && <Award className="w-5 h-5 text-orange-500" />}
                            <div className="absolute inset-0 blur-md opacity-50"></div>
                          </div>
                        )}
                        <span className="font-bold text-gray-900">{equipo.equipo}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-700 font-medium">{equipo.partidos}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2 py-1 bg-green-50 text-green-700 font-bold text-sm rounded-lg">
                        {equipo.victorias}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                        {equipo.puntos}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Gestión Federativa Profesional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión Federativa Profesional</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Módulo para la gestión y coordinación con federaciones y entidades profesionales.
          </p>
        </div>
      </motion.div>

      {/* Módulos de Coordinación y Operaciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          Módulos de Coordinación y Operaciones
        </h2>
        <div className="space-y-6">
          <CentroComando />
          <GestorLogistica />
          <CoberturaMediatica />
          <ProtocolosCOVID />
          <SistemaEmergencias />
          <IntegracionTicketing />
          <DashboardSponsors />
          <SistemaSustentabilidad />
        </div>
      </motion.div>
    </div>
  );
};

export default CampeonatosPage;
