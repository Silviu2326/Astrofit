import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Download,
  Settings,
  BookOpen,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  ChevronUp,
  X,
  Calendar,
  DollarSign,
  Activity,
  Target,
  AlertCircle,
  Info,
  Lightbulb,
  Zap,
  Filter,
  BarChart3,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

// Types
interface CohortData {
  id: string;
  name: string;
  startDate: string;
  initialSize: number;
  retentionByPeriod: number[];
  revenueByPeriod: number[];
  adherenceByPeriod: number[];
  activeClients: number;
  totalRevenue: number;
  avgLTV: number;
  avgAdherence: number;
  segment: string;
  channel: string;
}

interface Client {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'inactive' | 'churned';
  daysActive: number;
  ltv: number;
  lastActivity: string;
}

type MetricType = 'retention' | 'revenue' | 'sessions' | 'adherence';
type GroupingType = 'weekly' | 'monthly' | 'quarterly';
type SegmentType = 'all' | 'basic' | 'premium' | 'elite';

// Mock Data Generator
const generateMockCohortes = (): CohortData[] => {
  const cohorts: CohortData[] = [];
  const startDate = new Date('2023-07-01');
  const channels = ['Orgánico', 'Publicidad', 'Referido', 'Redes Sociales'];
  const segments = ['Básica', 'Premium', 'Elite'];

  for (let i = 0; i < 18; i++) {
    const cohortDate = new Date(startDate);
    cohortDate.setMonth(startDate.getMonth() + i);
    const initialSize = Math.floor(Math.random() * 80) + 20;

    // Generate realistic retention curve
    const retentionByPeriod: number[] = [100];
    let currentRetention = 100;
    for (let period = 1; period <= 12; period++) {
      const dropRate = Math.random() * 12 + 3; // 3-15% drop per period
      currentRetention = Math.max(currentRetention - dropRate, 20);
      retentionByPeriod.push(Math.round(currentRetention));
    }

    // Special boost for some cohorts (events, campaigns)
    const isSpecialCohort = Math.random() > 0.7;
    if (isSpecialCohort) {
      retentionByPeriod.forEach((_, idx) => {
        if (idx > 0) retentionByPeriod[idx] = Math.min(retentionByPeriod[idx] + 10, 95);
      });
    }

    // Generate revenue coherent with retention
    const revenueByPeriod = retentionByPeriod.map((retention, idx) => {
      const baseRevenue = 50; // per client per period
      return Math.round((initialSize * (retention / 100) * baseRevenue * (1 + idx * 0.1)));
    });

    // Generate adherence data
    const adherenceByPeriod = retentionByPeriod.map(retention => {
      return Math.round(retention * 0.7 + Math.random() * 15);
    });

    cohorts.push({
      id: `cohort-${i}`,
      name: cohortDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
      startDate: cohortDate.toISOString(),
      initialSize,
      retentionByPeriod,
      revenueByPeriod,
      adherenceByPeriod,
      activeClients: Math.round((initialSize * retentionByPeriod[retentionByPeriod.length - 1]) / 100),
      totalRevenue: revenueByPeriod.reduce((a, b) => a + b, 0),
      avgLTV: Math.round(revenueByPeriod.reduce((a, b) => a + b, 0) / initialSize),
      avgAdherence: Math.round(adherenceByPeriod.reduce((a, b) => a + b, 0) / adherenceByPeriod.length),
      segment: segments[Math.floor(Math.random() * segments.length)],
      channel: channels[Math.floor(Math.random() * channels.length)],
    });
  }

  return cohorts.reverse(); // Most recent first
};

const generateMockClients = (cohortSize: number): Client[] => {
  const names = ['Ana García', 'Carlos Ruiz', 'María López', 'Juan Pérez', 'Laura Martín', 'David Sánchez'];
  const clients: Client[] = [];

  for (let i = 0; i < Math.min(cohortSize, 20); i++) {
    const status = Math.random() > 0.3 ? 'active' : Math.random() > 0.5 ? 'inactive' : 'churned';
    clients.push({
      id: `client-${i}`,
      name: names[Math.floor(Math.random() * names.length)],
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      status,
      daysActive: Math.floor(Math.random() * 365) + 30,
      ltv: Math.floor(Math.random() * 2000) + 300,
      lastActivity: `Hace ${Math.floor(Math.random() * 30)} días`,
    });
  }

  return clients;
};

const CohortesClientesPage: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('retention');
  const [grouping, setGrouping] = useState<GroupingType>('monthly');
  const [selectedSegment, setSelectedSegment] = useState<SegmentType>('all');
  const [selectedCohortsForCompare, setSelectedCohortsForCompare] = useState<string[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState<CohortData | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ cohort: string; period: number } | null>(null);
  const [sortColumn, setSortColumn] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [showInsights, setShowInsights] = useState(true);

  const cohortesData = useMemo(() => generateMockCohortes(), []);
  const mockClients = useMemo(() => selectedCohort ? generateMockClients(selectedCohort.initialSize) : [], [selectedCohort]);

  // Calculations
  const avgRetentionMonth1 = useMemo(() => {
    const avg = cohortesData.reduce((acc, c) => acc + c.retentionByPeriod[1], 0) / cohortesData.length;
    return Math.round(avg);
  }, [cohortesData]);

  const avgRetentionMonth3 = useMemo(() => {
    const avg = cohortesData.reduce((acc, c) => acc + (c.retentionByPeriod[3] || 0), 0) / cohortesData.length;
    return Math.round(avg);
  }, [cohortesData]);

  const avgRetentionMonth6 = useMemo(() => {
    const avg = cohortesData.reduce((acc, c) => acc + (c.retentionByPeriod[6] || 0), 0) / cohortesData.length;
    return Math.round(avg);
  }, [cohortesData]);

  const bestCohort = useMemo(() => {
    return cohortesData.reduce((best, current) => {
      const currentAvg = current.retentionByPeriod.reduce((a, b) => a + b, 0) / current.retentionByPeriod.length;
      const bestAvg = best.retentionByPeriod.reduce((a, b) => a + b, 0) / best.retentionByPeriod.length;
      return currentAvg > bestAvg ? current : best;
    });
  }, [cohortesData]);

  const worstCohort = useMemo(() => {
    return cohortesData.reduce((worst, current) => {
      const currentAvg = current.retentionByPeriod.reduce((a, b) => a + b, 0) / current.retentionByPeriod.length;
      const worstAvg = worst.retentionByPeriod.reduce((a, b) => a + b, 0) / worst.retentionByPeriod.length;
      return currentAvg < worstAvg ? current : worst;
    });
  }, [cohortesData]);

  const getRetentionColor = (retention: number): string => {
    if (retention >= 80) return 'bg-green-600';
    if (retention >= 60) return 'bg-green-400';
    if (retention >= 40) return 'bg-yellow-400';
    if (retention >= 20) return 'bg-orange-400';
    return 'bg-red-500';
  };

  const getRetentionColorText = (retention: number): string => {
    if (retention >= 80) return 'text-green-600';
    if (retention >= 60) return 'text-green-500';
    if (retention >= 40) return 'text-yellow-600';
    if (retention >= 20) return 'text-orange-500';
    return 'text-red-600';
  };

  const cohortColors = [
    '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6',
    '#ef4444', '#14b8a6', '#f97316', '#8b5cf6', '#06b6d4',
    '#84cc16', '#a855f7', '#f43f5e', '#22c55e', '#6366f1',
    '#eab308', '#d946ef', '#0ea5e9',
  ];

  // Prepare line chart data
  const lineChartData = useMemo(() => {
    const maxPeriods = Math.max(...cohortesData.map(c => c.retentionByPeriod.length));
    const data = [];

    for (let period = 0; period < maxPeriods; period++) {
      const dataPoint: any = { period: `Mes ${period}` };
      cohortesData.slice(0, 8).forEach((cohort, idx) => {
        if (cohort.retentionByPeriod[period] !== undefined) {
          dataPoint[cohort.name] = cohort.retentionByPeriod[period];
        }
      });
      data.push(dataPoint);
    }

    return data;
  }, [cohortesData]);

  // Prepare pie chart data
  const pieChartData = useMemo(() => {
    return cohortesData.slice(0, 6).map(cohort => ({
      name: cohort.name,
      value: cohort.activeClients,
    }));
  }, [cohortesData]);

  // Insights
  const insights = useMemo(() => {
    const insights = [];

    // Best performing cohort
    const bestAvg = bestCohort.retentionByPeriod.reduce((a, b) => a + b, 0) / bestCohort.retentionByPeriod.length;
    const overallAvg = cohortesData.reduce((acc, c) => {
      return acc + (c.retentionByPeriod.reduce((a, b) => a + b, 0) / c.retentionByPeriod.length);
    }, 0) / cohortesData.length;

    if (bestAvg > overallAvg + 10) {
      insights.push({
        type: 'success',
        icon: TrendingUp,
        message: `La cohorte de ${bestCohort.name} tiene ${Math.round(bestAvg - overallAvg)}% más retención que el promedio`,
      });
    }

    // Channel performance
    const channelPerformance = cohortesData.reduce((acc, cohort) => {
      if (!acc[cohort.channel]) acc[cohort.channel] = [];
      const avgRetention = cohort.retentionByPeriod.reduce((a, b) => a + b, 0) / cohort.retentionByPeriod.length;
      acc[cohort.channel].push(avgRetention);
      return acc;
    }, {} as Record<string, number[]>);

    const bestChannel = Object.entries(channelPerformance).reduce((best, [channel, retentions]) => {
      const avg = retentions.reduce((a, b) => a + b, 0) / retentions.length;
      return avg > best.avg ? { channel, avg } : best;
    }, { channel: '', avg: 0 });

    insights.push({
      type: 'info',
      icon: Zap,
      message: `Los clientes del canal "${bestChannel.channel}" tienen ${Math.round(bestChannel.avg / overallAvg * 100 - 100)}% mejor retención`,
    });

    // Recent cohort alert
    const recentCohort = cohortesData[0];
    if (recentCohort.retentionByPeriod[1] < 75) {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        message: `Alerta: La cohorte de ${recentCohort.name} muestra signos de churn temprano (${recentCohort.retentionByPeriod[1]}% en Mes 1)`,
      });
    }

    // Reactivation opportunity
    const oldCohort = cohortesData[cohortesData.length - 3];
    if (oldCohort && oldCohort.activeClients > 10) {
      insights.push({
        type: 'opportunity',
        icon: Lightbulb,
        message: `Oportunidad: Reactivar ${oldCohort.activeClients} clientes de la cohorte ${oldCohort.name}`,
      });
    }

    return insights;
  }, [cohortesData, bestCohort]);

  const sortedCohortes = useMemo(() => {
    return [...cohortesData].sort((a, b) => {
      let aValue: any = a[sortColumn as keyof CohortData];
      let bValue: any = b[sortColumn as keyof CohortData];

      if (sortColumn === 'currentRetention') {
        aValue = a.retentionByPeriod[a.retentionByPeriod.length - 1];
        bValue = b.retentionByPeriod[b.retentionByPeriod.length - 1];
      }

      if (typeof aValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [cohortesData, sortColumn, sortDirection]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 p-6 pb-12">
      {/* Hero Section */}
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
              <Users className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Análisis de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Cohortes</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Comprende el comportamiento de tus clientes a través del tiempo
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Download className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Exportar Análisis</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Settings className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Configurar</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BookOpen className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Tutorial</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Configurador de Análisis - Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
                <Calendar className="w-4 h-4" />
              </div>
              Período
            </label>
            <select className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm">
              <option>Últimos 6 meses</option>
              <option>Último año</option>
              <option>Últimos 18 meses</option>
              <option>Todo el histórico</option>
            </select>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
                <BarChart3 className="w-4 h-4" />
              </div>
              Agrupación
            </label>
            <select
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              value={grouping}
              onChange={(e) => setGrouping(e.target.value as GroupingType)}
            >
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensual</option>
              <option value="quarterly">Trimestral</option>
            </select>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl text-white">
                <Activity className="w-4 h-4" />
              </div>
              Métrica
            </label>
            <select
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value as MetricType)}
            >
              <option value="retention">Retención (%)</option>
              <option value="revenue">Ingresos acumulados</option>
              <option value="sessions">Sesiones completadas</option>
              <option value="adherence">Adherencia promedio</option>
            </select>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2 uppercase tracking-wider">
              <div className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl text-white">
                <Filter className="w-4 h-4" />
              </div>
              Segmento
            </label>
            <select
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value as SegmentType)}
            >
              <option value="all">Todos los clientes</option>
              <option value="basic">Membresía Básica</option>
              <option value="premium">Membresía Premium</option>
              <option value="elite">Membresía Elite</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas - Glassmorphism Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Cohortes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Total Cohortes
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {cohortesData.length}
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">+3 este mes</span>
            </div>
          </div>
        </motion.div>

        {/* Cohorte Más Grande */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Cohorte Más Grande
            </p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-1">
              {bestCohort.name}
            </p>
            <p className="text-sm text-gray-600 mb-3">{bestCohort.initialSize} clientes</p>
            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.3, duration: 1 }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Retención Promedio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Retención Promedio
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {avgRetentionMonth3}%
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">+2% vs anterior</span>
            </div>
          </div>
        </motion.div>

        {/* Análisis Activos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-blue-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Análisis Activos
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {cohortesData.filter(c => c.activeClients > 0).length}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-medium">De {cohortesData.length} totales</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insights Panel */}
      <AnimatePresence>
        {showInsights && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-xl shadow-md border border-violet-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-violet-600" />
                  Insights Automáticos
                </h3>
                <button
                  onClick={() => setShowInsights(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {insights.map((insight, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 rounded-lg flex items-start gap-3 ${
                      insight.type === 'success'
                        ? 'bg-green-50 border border-green-200'
                        : insight.type === 'warning'
                        ? 'bg-orange-50 border border-orange-200'
                        : insight.type === 'opportunity'
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-violet-50 border border-violet-200'
                    }`}
                  >
                    <insight.icon
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        insight.type === 'success'
                          ? 'text-green-600'
                          : insight.type === 'warning'
                          ? 'text-orange-600'
                          : insight.type === 'opportunity'
                          ? 'text-blue-600'
                          : 'text-violet-600'
                      }`}
                    />
                    <div>
                      <p className="text-sm text-gray-700">{insight.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cohort Heat Map Table - Mejorado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 mb-8 overflow-hidden relative"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              Matriz de Retención - Heat Map
            </h2>
            <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-full border border-indigo-200">
              <Info className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-700">Hover para detalles</span>
            </div>
          </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-3 text-sm font-semibold text-gray-700 sticky left-0 bg-white z-10">
                  Cohorte
                </th>
                <th className="text-center p-3 text-sm font-semibold text-gray-700">
                  Tamaño (n)
                </th>
                {Array.from({ length: 13 }).map((_, idx) => (
                  <th key={idx} className="text-center p-3 text-sm font-semibold text-gray-700">
                    Mes {idx}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortesData.slice(0, 12).map((cohort, cohortIdx) => (
                <tr key={cohort.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 text-sm font-medium text-gray-800 sticky left-0 bg-white">
                    {cohort.name}
                  </td>
                  <td className="text-center p-3 text-sm text-gray-600">
                    {cohort.initialSize}
                  </td>
                  {cohort.retentionByPeriod.map((retention, periodIdx) => (
                    <td
                      key={periodIdx}
                      className="text-center p-2 relative"
                      onMouseEnter={() => setHoveredCell({ cohort: cohort.id, period: periodIdx })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div
                        className={`${getRetentionColor(
                          retention
                        )} text-white font-semibold text-sm rounded-lg p-2 cursor-pointer hover:scale-110 transition-transform`}
                      >
                        {retention}%
                      </div>
                      {hoveredCell?.cohort === cohort.id && hoveredCell?.period === periodIdx && (
                        <div className="absolute z-20 bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl w-48">
                          <div className="font-semibold mb-1">Cohorte: {cohort.name}</div>
                          <div>Período: Mes {periodIdx}</div>
                          <div>
                            Clientes activos: {Math.round((cohort.initialSize * retention) / 100)} de{' '}
                            {cohort.initialSize}
                          </div>
                          <div>Retención: {retention}%</div>
                          {periodIdx > 0 && (
                            <div
                              className={
                                retention >= cohort.retentionByPeriod[periodIdx - 1]
                                  ? 'text-green-400'
                                  : 'text-red-400'
                              }
                            >
                              {retention >= cohort.retentionByPeriod[periodIdx - 1] ? '↑' : '↓'}{' '}
                              {Math.abs(retention - cohort.retentionByPeriod[periodIdx - 1])}% vs anterior
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  ))}
                  {Array.from({ length: 13 - cohort.retentionByPeriod.length }).map((_, idx) => (
                    <td key={`empty-${idx}`} className="p-3"></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <div className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-200">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-600" />
                Escala de Retención:
              </span>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-600 rounded-lg shadow-md"></div>
                  <span className="text-sm font-semibold text-gray-700">≥80% Excelente</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-400 rounded-lg shadow-md"></div>
                  <span className="text-sm font-semibold text-gray-700">60-80% Bueno</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-400 rounded-lg shadow-md"></div>
                  <span className="text-sm font-semibold text-gray-700">40-60% Regular</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-400 rounded-lg shadow-md"></div>
                  <span className="text-sm font-semibold text-gray-700">20-40% Bajo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 rounded-lg shadow-md"></div>
                  <span className="text-sm font-semibold text-gray-700">&lt;20% Crítico</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Retention Line Chart - Mejorado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 mb-8 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            Curvas de Retención por Cohorte
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lineChartData}>
              <defs>
                <linearGradient id="lineGradient1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 500 }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 500 }} />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                  padding: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
              {cohortesData.slice(0, 8).map((cohort, idx) => (
                <Line
                  key={cohort.id}
                  type="monotone"
                  dataKey={cohort.name}
                  stroke={cohortColors[idx]}
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2 }}
                  activeDot={{ r: 7, strokeWidth: 2 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Charts Row - Mejorados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart - LTV por Cohorte */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              Lifetime Value por Cohorte
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={cohortColors[index % cohortColors.length]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    padding: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Survival Analysis - Curva de Supervivencia */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              Curva de Supervivencia
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={lineChartData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="period" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 500 }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: 500 }} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    padding: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey={cohortesData[0]?.name}
                  stroke="#8b5cf6"
                  fill="url(#colorGradient)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">189 días</div>
                <div className="text-sm text-gray-600 font-semibold mt-1">Tiempo medio hasta churn</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl border border-green-200">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">67%</div>
                <div className="text-sm text-gray-600 font-semibold mt-1">Prob. retención 6 meses</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Detailed Table - Mejorada */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden"
      >
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            Tabla Detallada de Cohortes
          </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th
                  className="text-left p-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setSortColumn('name');
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  Nombre {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="text-center p-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setSortColumn('startDate');
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  Fecha Inicio {sortColumn === 'startDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  className="text-center p-3 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    setSortColumn('initialSize');
                    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                  }}
                >
                  Tamaño Inicial {sortColumn === 'initialSize' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="text-center p-3 text-sm font-semibold text-gray-700">Activos Ahora</th>
                <th className="text-center p-3 text-sm font-semibold text-gray-700">Retención Actual</th>
                <th className="text-center p-3 text-sm font-semibold text-gray-700">Ingresos Totales</th>
                <th className="text-center p-3 text-sm font-semibold text-gray-700">LTV Promedio</th>
                <th className="text-center p-3 text-sm font-semibold text-gray-700">Adherencia</th>
                <th className="text-center p-3 text-sm font-semibold text-gray-700">Canal</th>
                <th className="text-center p-3 text-sm font-semibold text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedCohortes.slice(0, 12).map((cohort, idx) => (
                <motion.tr
                  key={cohort.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-3 text-sm font-medium text-gray-800">{cohort.name}</td>
                  <td className="p-3 text-sm text-gray-600 text-center">
                    {new Date(cohort.startDate).toLocaleDateString('es-ES')}
                  </td>
                  <td className="p-3 text-sm text-gray-600 text-center">{cohort.initialSize}</td>
                  <td className="p-3 text-sm text-gray-600 text-center">{cohort.activeClients}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRetentionColorText(
                        cohort.retentionByPeriod[cohort.retentionByPeriod.length - 1]
                      )}`}
                    >
                      {cohort.retentionByPeriod[cohort.retentionByPeriod.length - 1]}%
                    </span>
                  </td>
                  <td className="p-3 text-sm text-gray-600 text-center">
                    ${cohort.totalRevenue.toLocaleString()}
                  </td>
                  <td className="p-3 text-sm text-gray-600 text-center">${cohort.avgLTV}</td>
                  <td className="p-3 text-sm text-gray-600 text-center">{cohort.avgAdherence}%</td>
                  <td className="p-3 text-center">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {cohort.channel}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedCohort(cohort);
                        setShowDetailModal(true);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedCohort && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header - Mejorado */}
              <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 rounded-t-xl overflow-hidden">
                {/* Pattern de fondo */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                      <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Users className="w-7 h-7" />
                      </div>
                      Cohorte: {selectedCohort.name}
                    </h2>
                    <p className="text-blue-100 mt-2 text-lg">Análisis detallado de comportamiento</p>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-white hover:bg-white hover:bg-opacity-20 p-3 rounded-xl transition-all backdrop-blur-sm"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-600 mb-1">Tamaño Inicial</div>
                    <div className="text-2xl font-bold text-blue-900">{selectedCohort.initialSize}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-600 mb-1">Activos Actuales</div>
                    <div className="text-2xl font-bold text-green-900">{selectedCohort.activeClients}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-600 mb-1">Retención %</div>
                    <div className="text-2xl font-bold text-purple-900">
                      {selectedCohort.retentionByPeriod[selectedCohort.retentionByPeriod.length - 1]}%
                    </div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="text-sm text-red-600 mb-1">Churn Rate</div>
                    <div className="text-2xl font-bold text-red-900">
                      {100 - selectedCohort.retentionByPeriod[selectedCohort.retentionByPeriod.length - 1]}%
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="text-sm text-yellow-600 mb-1">LTV Promedio</div>
                    <div className="text-2xl font-bold text-yellow-900">${selectedCohort.avgLTV}</div>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <div className="text-sm text-indigo-600 mb-1">Ingresos Totales</div>
                    <div className="text-2xl font-bold text-indigo-900">
                      ${selectedCohort.totalRevenue.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Evolution Chart */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Evolución de la Cohorte</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={selectedCohort.retentionByPeriod.map((retention, idx) => ({
                        period: `Mes ${idx}`,
                        clientes: Math.round((selectedCohort.initialSize * retention) / 100),
                        ingresos: selectedCohort.revenueByPeriod[idx],
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="period" stroke="#6b7280" />
                      <YAxis yAxisId="left" stroke="#6b7280" />
                      <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="clientes" fill="#8b5cf6" name="Clientes Activos" />
                      <Bar yAxisId="right" dataKey="ingresos" fill="#10b981" name="Ingresos ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Clients List */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Clientes de la Cohorte (muestra)
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {mockClients.map((client) => (
                      <div
                        key={client.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <img src={client.avatar} alt={client.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <div className="font-medium text-gray-800">{client.name}</div>
                            <div className="text-xs text-gray-500">{client.lastActivity}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-800">${client.ltv}</div>
                            <div className="text-xs text-gray-500">{client.daysActive} días</div>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              client.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : client.status === 'inactive'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {client.status === 'active'
                              ? 'Activo'
                              : client.status === 'inactive'
                              ? 'Inactivo'
                              : 'Churn'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons - Mejorados */}
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl font-semibold">
                    <Download className="w-5 h-5" />
                    Exportar Datos
                  </button>
                  <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl font-semibold">
                    <Users className="w-5 h-5" />
                    Contactar Grupo
                  </button>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all font-semibold"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CohortesClientesPage;