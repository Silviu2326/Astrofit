import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Users, Target, Shield, Gauge, TrendingUp,
  BarChart3, MapPin, Zap, ArrowUpRight, Play, Pause, RotateCcw,
  Wifi, WifiOff, AlertTriangle, CheckCircle, Clock, Radio,
  Eye, EyeOff, Maximize2, Minimize2, RefreshCw, Bell, BellRing,
  Users2, Globe, Filter, Settings, Layers, GitCompare, 
  TrendingDown, Star, Award, Medal, Crown, Trophy, ChevronDown,
  Search, X, Plus, Minus, RotateCcw as ResetIcon, Download
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

// Tipos para sistema de análisis táctico en tiempo real
type TrackingData = {
  id: string;
  timestamp: Date;
  position: { x: number; y: number };
  speed: number;
  direction: number;
  intensity: 'low' | 'medium' | 'high';
  action: string;
  playerId: string;
  positionType: PosicionType;
};

type RealTimeAlert = {
  id: string;
  type: 'anomaly' | 'pattern' | 'performance' | 'fatigue';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  playerId: string;
  position: PosicionType;
  resolved: boolean;
};

type HeatMapData = {
  x: number;
  y: number;
  intensity: number;
  timestamp: Date;
  playerId: string;
};

type LiveComparison = {
  playerId: string;
  currentValue: number;
  historicalAverage: number;
  deviation: number;
  trend: 'up' | 'down' | 'stable';
};

// Tipos para sistema de comparación multi-dimensional
type ComparisonContext = 'home' | 'away' | 'vs_specific_opponent' | 'international' | 'all';
type ComparisonMetric = 'goals' | 'assists' | 'passes' | 'tackles' | 'sprints' | 'distance' | 'efficiency';
type PlayerComparison = {
  id: string;
  name: string;
  position: PosicionType;
  team: string;
  league: string;
  metrics: Record<ComparisonMetric, number>;
  context: ComparisonContext;
  performance: 'excellent' | 'good' | 'average' | 'below_average' | 'poor';
  trend: 'improving' | 'stable' | 'declining';
  selected: boolean;
};

type ComparisonFilter = {
  position: PosicionType[];
  leagues: string[];
  context: ComparisonContext[];
  metrics: ComparisonMetric[];
  performanceRange: [number, number];
  dateRange: [Date, Date];
};

type ComparisonVisualization = 'radar' | 'bar' | 'scatter' | 'heatmap' | 'table';

const AnalisisPosicionPage: React.FC = () => {
  const [posicionActiva, setPosicionActiva] = useState<PosicionType>('delantero');

  // Estado para sistema de análisis táctico en tiempo real
  const [isLiveTracking, setIsLiveTracking] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);
  const [realTimeAlerts, setRealTimeAlerts] = useState<RealTimeAlert[]>([]);
  const [heatMapData, setHeatMapData] = useState<HeatMapData[]>([]);
  const [liveComparisons, setLiveComparisons] = useState<LiveComparison[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('disconnected');
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [showAlerts, setShowAlerts] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Estado para sistema de comparación multi-dimensional
  const [comparisonPlayers, setComparisonPlayers] = useState<PlayerComparison[]>([]);
  const [comparisonFilters, setComparisonFilters] = useState<ComparisonFilter>({
    position: ['delantero'],
    leagues: ['Liga Local', 'Premier League', 'La Liga', 'Serie A'],
    context: ['all'],
    metrics: ['goals', 'assists', 'passes', 'efficiency'],
    performanceRange: [0, 100],
    dateRange: [new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), new Date()]
  });
  const [comparisonVisualization, setComparisonVisualization] = useState<ComparisonVisualization>('radar');
  const [showComparisonPanel, setShowComparisonPanel] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);
  const [comparisonMode, setComparisonMode] = useState<'individual' | 'team' | 'league'>('individual');

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

  // Datos mock para comparación multi-dimensional
  const mockComparisonPlayers: PlayerComparison[] = [
    {
      id: '1',
      name: 'Lionel Messi',
      position: 'delantero',
      team: 'PSG',
      league: 'Ligue 1',
      metrics: { goals: 25, assists: 15, passes: 1200, tackles: 8, sprints: 45, distance: 10.5, efficiency: 92 },
      context: 'all',
      performance: 'excellent',
      trend: 'stable',
      selected: false
    },
    {
      id: '2',
      name: 'Kylian Mbappé',
      position: 'delantero',
      team: 'PSG',
      league: 'Ligue 1',
      metrics: { goals: 28, assists: 12, passes: 950, tackles: 12, sprints: 65, distance: 11.2, efficiency: 89 },
      context: 'all',
      performance: 'excellent',
      trend: 'improving',
      selected: false
    },
    {
      id: '3',
      name: 'Erling Haaland',
      position: 'delantero',
      team: 'Manchester City',
      league: 'Premier League',
      metrics: { goals: 30, assists: 8, passes: 800, tackles: 6, sprints: 55, distance: 9.8, efficiency: 94 },
      context: 'all',
      performance: 'excellent',
      trend: 'improving',
      selected: false
    },
    {
      id: '4',
      name: 'Robert Lewandowski',
      position: 'delantero',
      team: 'Barcelona',
      league: 'La Liga',
      metrics: { goals: 22, assists: 18, passes: 1100, tackles: 10, sprints: 40, distance: 9.5, efficiency: 87 },
      context: 'all',
      performance: 'good',
      trend: 'stable',
      selected: false
    }
  ];

  const leagues = ['Liga Local', 'Premier League', 'La Liga', 'Serie A', 'Ligue 1', 'Bundesliga', 'Champions League'];
  const opponents = ['Real Madrid', 'Barcelona', 'Manchester United', 'Liverpool', 'Bayern Munich', 'PSG'];

  // Funciones para comparación multi-dimensional
  const togglePlayerSelection = useCallback((playerId: string) => {
    setComparisonPlayers(prev => prev.map(player => 
      player.id === playerId ? { ...player, selected: !player.selected } : player
    ));
  }, []);

  const updateComparisonFilters = useCallback((newFilters: Partial<ComparisonFilter>) => {
    setComparisonFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const resetComparisonFilters = useCallback(() => {
    setComparisonFilters({
      position: ['delantero'],
      leagues: ['Liga Local', 'Premier League', 'La Liga', 'Serie A'],
      context: ['all'],
      metrics: ['goals', 'assists', 'passes', 'efficiency'],
      performanceRange: [0, 100],
      dateRange: [new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), new Date()]
    });
  }, []);

  const getPerformanceColor = useCallback((performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'average': return 'text-yellow-600 bg-yellow-50';
      case 'below_average': return 'text-orange-600 bg-orange-50';
      case 'poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  }, []);

  const getTrendIcon = useCallback((trend: string) => {
    switch (trend) {
      case 'improving': return TrendingUp;
      case 'declining': return TrendingDown;
      case 'stable': return BarChart3;
      default: return BarChart3;
    }
  }, []);

  const filteredPlayers = useMemo(() => {
    return mockComparisonPlayers.filter(player => {
      const matchesPosition = comparisonFilters.position.includes(player.position);
      const matchesLeague = comparisonFilters.leagues.includes(player.league);
      const matchesContext = comparisonFilters.context.includes('all') || comparisonFilters.context.includes(player.context);
      
      return matchesPosition && matchesLeague && matchesContext;
    });
  }, [comparisonFilters]);

  const selectedPlayers = useMemo(() => {
    return filteredPlayers.filter(player => player.selected);
  }, [filteredPlayers]);

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

      {/* Sistema de Comparación Multi-Dimensional */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Comparación Multi-Dimensional</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <span className="text-sm text-gray-600">
                {selectedPlayers.length} jugadores seleccionados
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowComparisonPanel(!showComparisonPanel)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300"
            >
              <GitCompare className="w-4 h-4" />
              Comparar
            </button>
            <button
              onClick={resetComparisonFilters}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
            >
              <ResetIcon className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        {/* Filtros de comparación */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Filtro por posición */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Posición</label>
            <div className="flex flex-wrap gap-2">
              {posiciones.map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => {
                    const newPositions = comparisonFilters.position.includes(pos.id)
                      ? comparisonFilters.position.filter(p => p !== pos.id)
                      : [...comparisonFilters.position, pos.id];
                    updateComparisonFilters({ position: newPositions });
                  }}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                    comparisonFilters.position.includes(pos.id)
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {pos.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Filtro por liga */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Ligas</label>
            <div className="max-h-32 overflow-y-auto">
              {leagues.map((league) => (
                <label key={league} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={comparisonFilters.leagues.includes(league)}
                    onChange={(e) => {
                      const newLeagues = e.target.checked
                        ? [...comparisonFilters.leagues, league]
                        : comparisonFilters.leagues.filter(l => l !== league);
                      updateComparisonFilters({ leagues: newLeagues });
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{league}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filtro por contexto */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contexto</label>
            <select
              value={comparisonFilters.context[0]}
              onChange={(e) => updateComparisonFilters({ context: [e.target.value as ComparisonContext] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los partidos</option>
              <option value="home">Local</option>
              <option value="away">Visitante</option>
              <option value="vs_specific_opponent">Vs Rival Específico</option>
              <option value="international">Internacional</option>
            </select>
          </div>

          {/* Filtro por visualización */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Visualización</label>
            <select
              value={comparisonVisualization}
              onChange={(e) => setComparisonVisualization(e.target.value as ComparisonVisualization)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="radar">Gráfico Radar</option>
              <option value="bar">Gráfico de Barras</option>
              <option value="scatter">Gráfico de Dispersión</option>
              <option value="heatmap">Mapa de Calor</option>
              <option value="table">Tabla</option>
            </select>
          </div>
        </div>

        {/* Lista de jugadores para comparación */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredPlayers.map((player) => {
            const TrendIcon = getTrendIcon(player.trend);
            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                  player.selected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => togglePlayerSelection(player.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={player.selected}
                      onChange={() => togglePlayerSelection(player.id)}
                      className="rounded border-gray-300"
                    />
                    <h3 className="font-bold text-gray-900">{player.name}</h3>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getPerformanceColor(player.performance)}`}>
                    {player.performance}
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Equipo:</span>
                    <span className="font-semibold">{player.team}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Liga:</span>
                    <span className="font-semibold">{player.league}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tendencia:</span>
                    <div className="flex items-center gap-1">
                      <TrendIcon className="w-4 h-4" />
                      <span className="font-semibold capitalize">{player.trend}</span>
                    </div>
                  </div>
                </div>

                {/* Métricas principales */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{player.metrics.goals}</div>
                    <div className="text-xs text-gray-600">Goles</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">{player.metrics.assists}</div>
                    <div className="text-xs text-gray-600">Asistencias</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Panel de comparación */}
        <AnimatePresence>
          {showComparisonPanel && selectedPlayers.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Comparación de Jugadores Seleccionados</h3>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-300">
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowComparisonPanel(false)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Visualización de comparación */}
              <div className="bg-white rounded-xl p-4">
                {comparisonVisualization === 'table' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Jugador</th>
                          <th className="text-center py-2 px-3 font-semibold text-gray-700">Goles</th>
                          <th className="text-center py-2 px-3 font-semibold text-gray-700">Asistencias</th>
                          <th className="text-center py-2 px-3 font-semibold text-gray-700">Pases</th>
                          <th className="text-center py-2 px-3 font-semibold text-gray-700">Eficiencia</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPlayers.map((player) => (
                          <tr key={player.id} className="border-b border-gray-100">
                            <td className="py-2 px-3">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {player.name.charAt(0)}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{player.name}</div>
                                  <div className="text-sm text-gray-600">{player.team}</div>
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-2 px-3 font-semibold text-blue-600">{player.metrics.goals}</td>
                            <td className="text-center py-2 px-3 font-semibold text-green-600">{player.metrics.assists}</td>
                            <td className="text-center py-2 px-3 font-semibold text-purple-600">{player.metrics.passes}</td>
                            <td className="text-center py-2 px-3 font-semibold text-orange-600">{player.metrics.efficiency}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>Visualización {comparisonVisualization} en desarrollo</p>
                    <p className="text-sm">Selecciona una visualización diferente o usa la tabla</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
