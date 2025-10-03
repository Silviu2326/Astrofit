import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Swords, TrendingUp, TrendingDown, Shield, Zap,
  Target, Users, BarChart3, Sparkles, ArrowRight,
  Trophy, AlertCircle, CheckCircle, Award
} from 'lucide-react';
import GraficoRadar from './components/GraficoRadar';
import AnalisisVentajasCompetitivas from './components/AnalisisVentajasCompetitivas';
import RecomendacionesTacticas from './components/RecomendacionesTacticas';
import SimuladorEncuentro from './components/SimuladorEncuentro';
import AnalisisJugadoresClave from './components/AnalisisJugadoresClave';
import ScoutingEspecifico from './components/ScoutingEspecifico';
import CondicionesAmbientales from './components/CondicionesAmbientales';
import PrediccionAlineaciones from './components/PrediccionAlineaciones';
import DashboardPrePartido from './components/DashboardPrePartido';
import { getTeamStats, getHistoricalMatches } from './equipoAVsBApi';

interface TeamStats {
  name: string;
  metrics: {
    attack: number;
    defense: number;
    midfield: number;
    overall: number;
  };
}

interface Match {
  id: string;
  date: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  winner: string;
}

const EquipoAVsBPage: React.FC = () => {
  const [teamAStats, setTeamAStats] = useState<TeamStats | null>(null);
  const [teamBStats, setTeamBStats] = useState<TeamStats | null>(null);
  const [historicalMatches, setHistoricalMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statsA = await getTeamStats('Equipo A');
        const statsB = await getTeamStats('Equipo B');
        const matches = await getHistoricalMatches('Equipo A', 'Equipo B');

        setTeamAStats(statsA);
        setTeamBStats(statsB);
        setHistoricalMatches(matches);
      } catch (err) {
        setError('Error al cargar los datos de los equipos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-blue-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
        >
          <div className="flex items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            <p className="text-lg font-semibold text-gray-700">Cargando datos de equipos...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-blue-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200"
        >
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="w-8 h-8" />
            <p className="text-lg font-semibold">{error}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!teamAStats || !teamBStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-blue-50/30 flex items-center justify-center">
        <div className="text-center p-4 text-gray-600">No se pudieron cargar las estadísticas de los equipos.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-blue-50/30 pb-12">
      {/* Hero Section con gradiente red-purple-blue */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <Swords className="w-12 h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight text-center">
              Equipo A <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">VS</span> Equipo B
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 text-center max-w-3xl mx-auto leading-relaxed">
            Análisis completo y comparativa <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">cara a cara</span>
          </p>

          {/* Badges informativos */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Análisis Táctico</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Estadísticas Avanzadas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-pink-300" />
              <span className="text-sm font-semibold text-white">Predicciones IA</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Layout VS - Dos columnas con separador central */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Equipo A - Animación desde la izquierda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-red-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            <div className="relative z-10">
              {/* Icono con glow */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-10 h-10" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-red-400 rounded-2xl blur-xl opacity-30"></div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
                {teamAStats.name}
              </h2>

              {/* Badge de ventaja */}
              <div className="flex justify-center mb-4">
                <div className="px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-full border border-red-200">
                  <span className="text-sm font-bold text-red-700 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Equipo Local
                  </span>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-600">Ataque</span>
                  <span className="text-lg font-bold text-red-600">{teamAStats.metrics.attack}%</span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamAStats.metrics.attack}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                  ></motion.div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-semibold text-gray-600">Defensa</span>
                  <span className="text-lg font-bold text-red-600">{teamAStats.metrics.defense}%</span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamAStats.metrics.defense}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                  ></motion.div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm font-semibold text-gray-600">Mediocampo</span>
                  <span className="text-lg font-bold text-red-600">{teamAStats.metrics.midfield}%</span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamAStats.metrics.midfield}%` }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full"
                  ></motion.div>
                </div>
              </div>

              {/* Overall Score */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Puntuación Global</p>
                  <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
                    {teamAStats.metrics.overall}
                  </p>
                </div>
              </div>

              {/* Características */}
              <div className="mt-6 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Ataque fuerte, buena defensa</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Mediocampo inconsistente</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Separador VS Central */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 opacity-10"></div>
              <div className="relative z-10 text-center">
                <div className="relative inline-block">
                  <Swords className="w-16 h-16 text-purple-600 mb-2" />
                  <div className="absolute inset-0 w-16 h-16 bg-purple-400 rounded-full blur-xl opacity-30"></div>
                </div>
                <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
                  VS
                </p>
                <div className="mt-4 space-y-2">
                  <div className="px-3 py-1 bg-purple-100 rounded-full">
                    <span className="text-xs font-bold text-purple-700">Enfrentamiento Directo</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Equipo B - Animación desde la derecha */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Decoración de fondo */}
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            <div className="relative z-10">
              {/* Icono con glow */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-10 h-10" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 bg-blue-400 rounded-2xl blur-xl opacity-30"></div>
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                {teamBStats.name}
              </h2>

              {/* Badge de ventaja */}
              <div className="flex justify-center mb-4">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                  <span className="text-sm font-bold text-blue-700 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Equipo Visitante
                  </span>
                </div>
              </div>

              {/* Estadísticas - Progress bars a la derecha */}
              <div className="space-y-3">
                <div className="flex justify-between items-center flex-row-reverse">
                  <span className="text-sm font-semibold text-gray-600">Ataque</span>
                  <span className="text-lg font-bold text-blue-600">{teamBStats.metrics.attack}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamBStats.metrics.attack}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full ml-auto"
                    style={{ direction: 'rtl' }}
                  ></motion.div>
                </div>

                <div className="flex justify-between items-center flex-row-reverse mt-4">
                  <span className="text-sm font-semibold text-gray-600">Defensa</span>
                  <span className="text-lg font-bold text-blue-600">{teamBStats.metrics.defense}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamBStats.metrics.defense}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full ml-auto"
                    style={{ direction: 'rtl' }}
                  ></motion.div>
                </div>

                <div className="flex justify-between items-center flex-row-reverse mt-4">
                  <span className="text-sm font-semibold text-gray-600">Mediocampo</span>
                  <span className="text-lg font-bold text-blue-600">{teamBStats.metrics.midfield}%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${teamBStats.metrics.midfield}%` }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="h-full bg-gradient-to-l from-blue-500 to-indigo-500 rounded-full ml-auto"
                    style={{ direction: 'rtl' }}
                  ></motion.div>
                </div>
              </div>

              {/* Overall Score */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Puntuación Global</p>
                  <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                    {teamBStats.metrics.overall}
                  </p>
                </div>
              </div>

              {/* Características */}
              <div className="mt-6 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Mediocampo dominante, buena posesión</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Ataque menos efectivo</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Métricas Clave con Gráfico Radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-12 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <BarChart3 className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Métricas Clave
              </h2>
            </div>
            <GraficoRadar teamA={teamAStats.metrics} teamB={teamBStats.metrics} />
          </div>
        </motion.div>

        {/* Historial de Enfrentamientos Directos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-12 relative overflow-hidden"
        >
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="w-8 h-8 text-indigo-600" />
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
                Historial de Enfrentamientos
              </h2>
            </div>

            {historicalMatches.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 rounded-tl-xl">Fecha</th>
                      <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100">Equipo A</th>
                      <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100">Equipo B</th>
                      <th className="py-3 px-4 text-center text-xs font-bold uppercase tracking-wider text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100">Resultado</th>
                      <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 rounded-tr-xl">Ganador</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historicalMatches.map((match, index) => (
                      <motion.tr
                        key={match.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 transition-all duration-300"
                      >
                        <td className="py-3 px-4 text-sm text-gray-700 font-medium">{match.date}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="font-semibold text-red-600">{match.teamA}</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span className="font-semibold text-blue-600">{match.teamB}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg font-bold text-gray-700">
                            {match.scoreA} - {match.scoreB}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-gray-800">{match.winner}</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No hay enfrentamientos históricos disponibles.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Grid de Componentes Adicionales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <AnalisisVentajasCompetitivas />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <RecomendacionesTacticas />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-12 relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <SimuladorEncuentro />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <AnalisisJugadoresClave />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <ScoutingEspecifico />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-sky-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <CondicionesAmbientales />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className="absolute -left-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
            <div className="relative z-10">
              <PrediccionAlineaciones />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-12 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <DashboardPrePartido />
          </div>
        </motion.div>

        {/* Análisis de Tendencias Recientes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-8">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                Tendencias Recientes
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Equipo A */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-red-700">{teamAStats.name}</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">Ganó 3 de sus últimos 5 partidos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Promedio de 2 goles por partido</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">Defensa sólida en casa</span>
                  </li>
                </ul>
              </div>

              {/* Equipo B */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-700">{teamBStats.name}</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-gray-700">Ganó 2 de sus últimos 5 partidos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Promedio de 1.5 goles por partido</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="text-gray-700">Luchando en partidos fuera de casa</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EquipoAVsBPage;
