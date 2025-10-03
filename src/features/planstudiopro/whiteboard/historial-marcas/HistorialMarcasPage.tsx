import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, TrendingUp, Calendar, Flame, Target, Users, Award,
  ChevronDown, Search, Filter, Share2, Download, Plus, X,
  ArrowUpRight, ArrowDownRight, Medal, Star, CheckCircle,
  Zap, Clock, Activity, BarChart3, LineChart, PieChart,
  Camera, Video, Edit2, Trash2, Eye, Upload, ChevronRight,
  Dumbbell, Heart, Run, Bike, Timer, Gauge, Sparkles
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Area,
  AreaChart
} from 'recharts';

// ==================== TIPOS ====================
type MovementCategory = 'lifts' | 'gymnastics' | 'cardio' | 'benchmarks' | 'all';

type UnitType = 'lbs' | 'kg' | 'time' | 'reps' | 'meters' | 'calories';

interface Movement {
  id: string;
  name: string;
  category: MovementCategory;
  unit: UnitType;
  icon: string;
}

interface PRRecord {
  id: string;
  movementId: string;
  value: number;
  date: string;
  notes?: string;
  photo?: string;
  video?: string;
  tags?: string[];
  validated?: boolean;
  coach?: string;
}

interface Goal {
  id: string;
  movementId: string;
  targetValue: number;
  currentValue: number;
  targetDate: string;
  progress: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  earnedDate?: string;
}

interface Cycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  movements: string[];
  baselineTest?: number;
  finalTest?: number;
  improvement?: number;
}

// ==================== DATOS MOCKEADOS ====================

const movements: Movement[] = [
  // Lifts
  { id: 'back-squat', name: 'Back Squat', category: 'lifts', unit: 'lbs', icon: '🏋️' },
  { id: 'front-squat', name: 'Front Squat', category: 'lifts', unit: 'lbs', icon: '🏋️' },
  { id: 'deadlift', name: 'Deadlift', category: 'lifts', unit: 'lbs', icon: '💪' },
  { id: 'bench-press', name: 'Bench Press', category: 'lifts', unit: 'lbs', icon: '🏋️' },
  { id: 'overhead-press', name: 'Overhead Press', category: 'lifts', unit: 'lbs', icon: '⬆️' },
  { id: 'clean', name: 'Clean', category: 'lifts', unit: 'lbs', icon: '🎯' },
  { id: 'snatch', name: 'Snatch', category: 'lifts', unit: 'lbs', icon: '⚡' },
  { id: 'clean-jerk', name: 'Clean & Jerk', category: 'lifts', unit: 'lbs', icon: '🚀' },
  { id: 'thruster', name: 'Thruster', category: 'lifts', unit: 'lbs', icon: '💥' },

  // Gymnastics
  { id: 'pull-ups', name: 'Max Pull-ups', category: 'gymnastics', unit: 'reps', icon: '💪' },
  { id: 'push-ups', name: 'Max Push-ups', category: 'gymnastics', unit: 'reps', icon: '👊' },
  { id: 'hspu', name: 'Max HSPU', category: 'gymnastics', unit: 'reps', icon: '🤸' },
  { id: 'ring-dips', name: 'Max Ring Dips', category: 'gymnastics', unit: 'reps', icon: '💍' },
  { id: 'handstand-walk', name: 'Handstand Walk', category: 'gymnastics', unit: 'meters', icon: '🤸' },
  { id: 'rope-climbs', name: 'Rope Climbs', category: 'gymnastics', unit: 'reps', icon: '🧗' },

  // Cardio
  { id: '500m-row', name: '500m Row', category: 'cardio', unit: 'time', icon: '🚣' },
  { id: '1000m-row', name: '1000m Row', category: 'cardio', unit: 'time', icon: '🚣' },
  { id: '2000m-row', name: '2000m Row', category: 'cardio', unit: 'time', icon: '🚣' },
  { id: '5k-run', name: '5K Run', category: 'cardio', unit: 'time', icon: '🏃' },
  { id: 'mile-run', name: 'Mile Run', category: 'cardio', unit: 'time', icon: '🏃' },
  { id: '100m-sprint', name: '100m Sprint', category: 'cardio', unit: 'time', icon: '⚡' },
  { id: 'assault-bike', name: 'Assault Bike Cal/min', category: 'cardio', unit: 'calories', icon: '🚴' },

  // Benchmarks
  { id: 'fran', name: 'Fran', category: 'benchmarks', unit: 'time', icon: '🔥' },
  { id: 'murph', name: 'Murph', category: 'benchmarks', unit: 'time', icon: '🎖️' },
  { id: 'cindy', name: 'Cindy', category: 'benchmarks', unit: 'reps', icon: '⭐' },
  { id: 'annie', name: 'Annie', category: 'benchmarks', unit: 'time', icon: '⏱️' },
  { id: 'diane', name: 'Diane', category: 'benchmarks', unit: 'time', icon: '💎' },
  { id: 'grace', name: 'Grace', category: 'benchmarks', unit: 'time', icon: '✨' },
  { id: 'isabel', name: 'Isabel', category: 'benchmarks', unit: 'time', icon: '👑' },
];

// Generar historial de PRs
const generatePRHistory = (movementId: string, count: number): PRRecord[] => {
  const records: PRRecord[] = [];
  const baseValue = Math.random() * 200 + 100;

  for (let i = 0; i < count; i++) {
    const daysAgo = (count - i) * 30;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    records.push({
      id: `${movementId}-${i}`,
      movementId,
      value: baseValue + (i * 10) + (Math.random() * 5),
      date: date.toISOString().split('T')[0],
      notes: i % 3 === 0 ? 'Felt strong today!' : undefined,
      tags: i % 4 === 0 ? ['#fresco', '#pr-day'] : undefined,
      validated: true,
      coach: i % 5 === 0 ? 'Coach Mike' : undefined
    });
  }

  return records;
};

const allPRs: PRRecord[] = movements.flatMap(m => generatePRHistory(m.id, 6));

const badges: Badge[] = [
  { id: '1', name: '400 Club', description: 'Back Squat 400+ lbs', icon: '🏆', color: 'from-yellow-500 to-orange-500', earned: true, earnedDate: '2024-01-15' },
  { id: '2', name: '2x BW Deadlift', description: '2x Bodyweight Deadlift', icon: '💪', color: 'from-red-500 to-pink-500', earned: true, earnedDate: '2024-02-20' },
  { id: '3', name: 'Sub-3 Fran', description: 'Fran under 3 minutes', icon: '⚡', color: 'from-purple-500 to-indigo-500', earned: false },
  { id: '4', name: 'Murph Under 40', description: 'Murph under 40 minutes', icon: '🎖️', color: 'from-green-500 to-teal-500', earned: false },
  { id: '5', name: 'Century Club', description: '100+ consecutive DUs', icon: '🎯', color: 'from-blue-500 to-cyan-500', earned: true, earnedDate: '2024-03-10' },
];

const goals: Goal[] = [
  { id: '1', movementId: 'back-squat', targetValue: 500, currentValue: 420, targetDate: '2025-06-01', progress: 84 },
  { id: '2', movementId: 'deadlift', targetValue: 600, currentValue: 550, targetDate: '2025-08-01', progress: 91.6 },
  { id: '3', movementId: 'fran', targetValue: 180, currentValue: 210, targetDate: '2025-05-01', progress: 85.7 },
];

const cycles: Cycle[] = [
  {
    id: '1',
    name: 'Squat Cycle 12 weeks',
    startDate: '2024-01-01',
    endDate: '2024-03-24',
    movements: ['back-squat', 'front-squat'],
    baselineTest: 350,
    finalTest: 420,
    improvement: 20
  },
  {
    id: '2',
    name: 'Olympic Lifting 8 weeks',
    startDate: '2024-04-01',
    endDate: '2024-05-26',
    movements: ['clean', 'snatch', 'clean-jerk'],
    baselineTest: 225,
    finalTest: 255,
    improvement: 13.3
  }
];

// ==================== COMPONENTES ====================

const HistorialMarcasPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MovementCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPRModal, setShowNewPRModal] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Calcular estadísticas rápidas
  const totalPRs = movements.length;
  const prsThisMonth = allPRs.filter(pr => {
    const prDate = new Date(pr.date);
    const now = new Date();
    return prDate.getMonth() === now.getMonth() && prDate.getFullYear() === now.getFullYear();
  }).length;

  const currentStreak = 7; // Mock
  const lastPR = allPRs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  const daysSinceLastPR = Math.floor((new Date().getTime() - new Date(lastPR.date).getTime()) / (1000 * 60 * 60 * 24));

  // Filtrar movimientos
  const filteredMovements = movements.filter(m => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Obtener PR actual de un movimiento
  const getCurrentPR = (movementId: string) => {
    const prs = allPRs.filter(pr => pr.movementId === movementId).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return prs[0];
  };

  // Generar datos sparkline
  const getSparklineData = (movementId: string) => {
    return allPRs
      .filter(pr => pr.movementId === movementId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(pr => ({ value: pr.value }));
  };

  // Formatear valor según unidad
  const formatValue = (value: number, unit: UnitType) => {
    if (unit === 'time') {
      const minutes = Math.floor(value / 60);
      const seconds = Math.floor(value % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return value.toFixed(0);
  };

  const getUnitLabel = (unit: UnitType) => {
    const labels: Record<UnitType, string> = {
      lbs: 'lbs',
      kg: 'kg',
      time: 'min',
      reps: 'reps',
      meters: 'm',
      calories: 'cal/min'
    };
    return labels[unit];
  };

  // Determinar badge de progreso
  const getProgressBadge = (movementId: string) => {
    const currentPR = getCurrentPR(movementId);
    if (!currentPR) return null;

    const daysSince = Math.floor((new Date().getTime() - new Date(currentPR.date).getTime()) / (1000 * 60 * 60 * 24));

    if (daysSince < 7) {
      return { label: 'Nuevo!', color: 'from-green-500 to-emerald-500', textColor: 'text-white' };
    } else if (daysSince > 90) {
      return { label: 'Estancado', color: 'from-yellow-500 to-orange-500', textColor: 'text-white' };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* ==================== HERO SECTION ==================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              Historial de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Marcas</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl leading-relaxed">
            Registra y celebra cada <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">progreso</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Medal className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">{totalPRs} Movimientos Trackeados</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="text-sm font-semibold text-white">{currentStreak} días de racha</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Award className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{badges.filter(b => b.earned).length} Badges Obtenidos</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== ESTADÍSTICAS RÁPIDAS ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total de PRs', value: totalPRs, icon: Trophy, color: 'from-purple-500 to-pink-500', change: '+5%' },
          { title: 'PRs Este Mes', value: prsThisMonth, icon: Calendar, color: 'from-blue-500 to-indigo-500', change: '+12%' },
          { title: 'Racha Actual', value: `${currentStreak} días`, icon: Flame, color: 'from-orange-500 to-red-500', change: '+2 días' },
          { title: 'Último PR', value: `Hace ${daysSinceLastPR}d`, icon: Clock, color: 'from-green-500 to-teal-500', change: 'Reciente' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group cursor-pointer"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

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
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ==================== BARRA DE ACCIONES ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Búsqueda */}
          <div className="relative flex-1 w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar movimiento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowNewPRModal(true)}
              className="px-6 py-3 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2 hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              Registrar PR
            </button>

            <button
              onClick={() => setShowComparison(true)}
              className="px-6 py-3 border-2 border-purple-500 text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 transition-colors duration-300 flex items-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              Comparar
            </button>

            <button
              onClick={() => setShowGoals(true)}
              className="px-6 py-3 border-2 border-pink-500 text-pink-600 rounded-2xl font-semibold hover:bg-pink-50 transition-colors duration-300 flex items-center gap-2"
            >
              <Target className="w-5 h-5" />
              Metas
            </button>

            <button className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50 transition-colors duration-300 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Exportar
            </button>
          </div>
        </div>
      </motion.div>

      {/* ==================== CATEGORÍAS (TABS) ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'Todos', icon: Sparkles },
            { id: 'lifts', label: 'Levantamientos', icon: Dumbbell },
            { id: 'gymnastics', label: 'Gimnásticos', icon: Activity },
            { id: 'cardio', label: 'Cardio', icon: Heart },
            { id: 'benchmarks', label: 'Benchmarks', icon: Trophy }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as MovementCategory)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-xl scale-105'
                  : 'bg-white/80 backdrop-blur-xl border-2 border-gray-200 text-gray-700 hover:border-purple-300'
              }`}
            >
              <cat.icon className="w-5 h-5" />
              {cat.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ==================== GRID DE MARCAS ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {filteredMovements.map((movement, index) => {
          const currentPR = getCurrentPR(movement.id);
          const sparklineData = getSparklineData(movement.id);
          const badge = getProgressBadge(movement.id);

          return (
            <motion.div
              key={movement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group cursor-pointer"
              onClick={() => {
                setSelectedMovement(movement);
                setShowDetailModal(true);
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                {/* Header con icono y badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{movement.icon}</div>
                  {badge && (
                    <div className={`px-3 py-1 bg-gradient-to-r ${badge.color} rounded-full`}>
                      <span className={`text-xs font-bold ${badge.textColor}`}>{badge.label}</span>
                    </div>
                  )}
                </div>

                {/* Nombre del movimiento */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{movement.name}</h3>

                {/* Marca actual */}
                {currentPR && (
                  <>
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                          {formatValue(currentPR.value, movement.unit)}
                        </span>
                        <span className="text-lg font-semibold text-gray-600">{getUnitLabel(movement.unit)}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(currentPR.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>

                    {/* Sparkline */}
                    <div className="h-16 mb-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sparklineData}>
                          <defs>
                            <linearGradient id={`gradient-${movement.id}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#a855f7"
                            strokeWidth={2}
                            fill={`url(#gradient-${movement.id})`}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Acciones */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowNewPRModal(true);
                        }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                      >
                        Nuevo PR
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors duration-300"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ==================== SECCIÓN DE BADGES ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Badges y Logros</h2>
              <p className="text-gray-600">Celebra tus hitos más importantes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-2xl border-2 ${
                  badge.earned
                    ? `bg-gradient-to-br ${badge.color} text-white border-white/30`
                    : 'bg-gray-50 text-gray-400 border-gray-200'
                } transition-all duration-300 text-center`}
              >
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h4 className="font-bold mb-1">{badge.name}</h4>
                <p className={`text-xs ${badge.earned ? 'text-white/80' : 'text-gray-500'}`}>
                  {badge.description}
                </p>
                {badge.earned && badge.earnedDate && (
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-xs font-semibold">
                      {new Date(badge.earnedDate).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ==================== METAS ACTIVAS ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-8 border border-white/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Metas Activas</h2>
            <p className="text-gray-600">Alcanza tus objetivos paso a paso</p>
          </div>
        </div>

        <div className="space-y-4">
          {goals.map((goal, index) => {
            const movement = movements.find(m => m.id === goal.movementId);
            if (!movement) return null;

            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-teal-50 border border-green-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{movement.icon}</span>
                      <h4 className="text-xl font-bold text-gray-900">{movement.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Objetivo para {new Date(goal.targetDate).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
                      {formatValue(goal.currentValue, movement.unit)}
                    </p>
                    <p className="text-sm text-gray-600">
                      de {formatValue(goal.targetValue, movement.unit)} {getUnitLabel(movement.unit)}
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-green-200 rounded-full h-4 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-green-500 via-green-600 to-teal-500 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-semibold text-green-700">{goal.progress}% completado</span>
                  <span className="text-sm text-gray-600">
                    Falta {formatValue(goal.targetValue - goal.currentValue, movement.unit)} {getUnitLabel(movement.unit)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ==================== CICLOS DE FUERZA ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Ciclos de Fuerza</h2>
            <p className="text-gray-600">Historial de tus programas de entrenamiento</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cycles.map((cycle, index) => (
            <motion.div
              key={cycle.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{cycle.name}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(cycle.startDate).toLocaleDateString('es-ES')} - {new Date(cycle.endDate).toLocaleDateString('es-ES')}
                  </p>
                </div>
                {cycle.improvement && (
                  <div className="px-3 py-1 bg-green-500 text-white rounded-full">
                    <span className="text-sm font-bold">+{cycle.improvement}%</span>
                  </div>
                )}
              </div>

              {cycle.baselineTest && cycle.finalTest && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-white/60 rounded-xl">
                    <p className="text-xs text-gray-600 mb-1">Baseline</p>
                    <p className="text-2xl font-bold text-gray-900">{cycle.baselineTest} lbs</p>
                  </div>
                  <div className="text-center p-3 bg-white/60 rounded-xl">
                    <p className="text-xs text-gray-600 mb-1">Final</p>
                    <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
                      {cycle.finalTest} lbs
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {cycle.movements.map(movId => {
                  const mov = movements.find(m => m.id === movId);
                  return mov ? (
                    <div key={movId} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                      {mov.name}
                    </div>
                  ) : null;
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ==================== MODAL: REGISTRAR NUEVA MARCA ==================== */}
      <AnimatePresence>
        {showNewPRModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewPRModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Registrar Nueva Marca</h3>
                  </div>
                  <button
                    onClick={() => setShowNewPRModal(false)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Seleccionar movimiento */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Movimiento</label>
                  <select className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white">
                    <option value="">Seleccionar movimiento...</option>
                    {movements.map(m => (
                      <option key={m.id} value={m.id}>{m.icon} {m.name}</option>
                    ))}
                  </select>
                </div>

                {/* Resultado */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Resultado</label>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Unidad</label>
                    <select className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white">
                      <option value="lbs">lbs</option>
                      <option value="kg">kg</option>
                      <option value="time">tiempo (seg)</option>
                      <option value="reps">reps</option>
                      <option value="meters">metros</option>
                    </select>
                  </div>
                </div>

                {/* Fecha */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Fecha</label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white"
                  />
                </div>

                {/* Notas */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Notas (opcional)</label>
                  <textarea
                    rows={3}
                    placeholder="¿Cómo te sentiste? ¿Post-WOD? ¿Coach que validó?"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white resize-none"
                  ></textarea>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {['#fresco', '#post-wod', '#pr-day', '#ciclo-fuerza'].map(tag => (
                      <button
                        key={tag}
                        className="px-4 py-2 border-2 border-purple-200 text-purple-600 rounded-full text-sm font-semibold hover:bg-purple-50 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload foto/video */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Foto/Video (opcional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">Click para subir evidencia</p>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNewPRModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all">
                    Guardar PR
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== MODAL: HISTORIAL COMPLETO ==================== */}
      <AnimatePresence>
        {showDetailModal && selectedMovement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 relative overflow-hidden">
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedMovement.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{selectedMovement.name}</h3>
                      <p className="text-indigo-100">Historial completo de progresión</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Gráfico de progresión */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Gráfico de Progresión</h4>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={getSparklineData(selectedMovement.id).map((d, i) => ({
                          ...d,
                          index: i + 1,
                          date: `PR ${i + 1}`
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#a855f7"
                          strokeWidth={3}
                          dot={{ fill: '#a855f7', r: 6 }}
                          activeDot={{ r: 8 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Tabla de historial */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">Todas las Marcas</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Fecha</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Marca</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Mejora</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">% Mejora</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Notas</th>
                          <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allPRs
                          .filter(pr => pr.movementId === selectedMovement.id)
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((pr, index, arr) => {
                            const prevPR = arr[index + 1];
                            const improvement = prevPR ? pr.value - prevPR.value : 0;
                            const improvementPercent = prevPR ? ((improvement / prevPR.value) * 100).toFixed(1) : '0';

                            return (
                              <tr key={pr.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3 text-sm text-gray-700">
                                  {new Date(pr.date).toLocaleDateString('es-ES')}
                                </td>
                                <td className="px-4 py-3">
                                  <span className="text-lg font-bold text-purple-600">
                                    {formatValue(pr.value, selectedMovement.unit)} {getUnitLabel(selectedMovement.unit)}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  {improvement > 0 && (
                                    <div className="flex items-center gap-1 text-green-600">
                                      <ArrowUpRight className="w-4 h-4" />
                                      <span className="text-sm font-semibold">
                                        +{formatValue(improvement, selectedMovement.unit)}
                                      </span>
                                    </div>
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  {improvement > 0 && (
                                    <span className="text-sm font-semibold text-green-600">+{improvementPercent}%</span>
                                  )}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">{pr.notes || '-'}</td>
                                <td className="px-4 py-3">
                                  <div className="flex gap-2">
                                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                      <Eye className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                                      <Edit2 className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button className="p-1 hover:bg-red-50 rounded-lg transition-colors">
                                      <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistorialMarcasPage;
