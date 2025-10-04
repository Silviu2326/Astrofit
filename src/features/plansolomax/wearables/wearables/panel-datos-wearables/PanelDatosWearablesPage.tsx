import React, { useState, useMemo } from 'react';
import {
  Activity,
  Heart,
  Moon,
  Footprints,
  Flame,
  TrendingUp,
  Users,
  Award,
  AlertTriangle,
  Download,
  FileText,
  Settings,
  Calendar,
  ChevronDown,
  Trophy,
  Zap,
  Target,
  Clock,
  BarChart3,
  Brain,
  Wind,
  Droplet,
  Bed,
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
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  RadialBarChart,
  RadialBar,
  Scatter,
  ScatterChart,
  ZAxis,
} from 'recharts';
import { motion } from 'framer-motion';

// ============================================================================
// TIPOS
// ============================================================================

interface DailyMetrics {
  date: string;
  steps: number;
  calories: number;
  sleep: number;
  workouts: number;
  activeMinutes: number;
  heartRate: number;
  sleepQuality: number;
}

interface Workout {
  id: string;
  date: string;
  type: string;
  duration: number;
  calories: number;
  distance?: number;
  avgHeartRate: number;
  maxHeartRate: number;
}

interface Client {
  id: string;
  name: string;
  avatar: string;
  age: number;
  gender: string;
  stepsGoal: number;
  activeMinutesGoal: number;
  sleepGoal: number;
  dailyMetrics: DailyMetrics[];
  workouts: Workout[];
  vo2max?: number;
  hrv?: number;
  spo2?: number;
  restingHR: number;
  recoveryScore?: number;
}

interface Alert {
  id: string;
  clientId: string;
  clientName: string;
  type: 'steps' | 'sleep' | 'heartRate' | 'inactive';
  message: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'neutral' | 'negative';
}

type ViewMode = 'aggregate' | 'individual';
type Period = 'today' | '7days' | '30days' | 'custom';

// ============================================================================
// DATOS MOCKEADOS
// ============================================================================

const generateDailyMetrics = (days: number): DailyMetrics[] => {
  const metrics: DailyMetrics[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Variación realista por día de la semana
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    metrics.push({
      date: date.toISOString().split('T')[0],
      steps: Math.floor((isWeekend ? 7000 : 9000) + Math.random() * 6000),
      calories: Math.floor((isWeekend ? 2000 : 2400) + Math.random() * 800),
      sleep: 5 + Math.random() * 3.5,
      workouts: Math.random() > (isWeekend ? 0.3 : 0.6) ? 0 : Math.floor(1 + Math.random() * 2),
      activeMinutes: Math.floor((isWeekend ? 50 : 80) + Math.random() * 60),
      heartRate: Math.floor(58 + Math.random() * 18),
      sleepQuality: Math.floor(60 + Math.random() * 35),
    });
  }

  return metrics;
};

const generateWorkouts = (count: number): Workout[] => {
  const types = ['Correr', 'Ciclismo', 'Pesas', 'Natación', 'Yoga', 'CrossFit', 'Caminar'];
  const workouts: Workout[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));

    const type = types[Math.floor(Math.random() * types.length)];
    const duration = Math.floor(20 + Math.random() * 70);

    workouts.push({
      id: `workout-${i}`,
      date: date.toISOString(),
      type,
      duration,
      calories: Math.floor(duration * (3 + Math.random() * 7)),
      distance: ['Correr', 'Ciclismo', 'Caminar'].includes(type)
        ? parseFloat((duration / 10 * (1 + Math.random())).toFixed(2))
        : undefined,
      avgHeartRate: Math.floor(120 + Math.random() * 40),
      maxHeartRate: Math.floor(160 + Math.random() * 30),
    });
  }

  return workouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const MOCK_CLIENTS: Client[] = Array.from({ length: 65 }, (_, i) => ({
  id: `client-${i + 1}`,
  name: `Cliente ${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  age: 20 + Math.floor(Math.random() * 45),
  gender: Math.random() > 0.5 ? 'M' : 'F',
  stepsGoal: 10000,
  activeMinutesGoal: 120,
  sleepGoal: 8,
  dailyMetrics: generateDailyMetrics(30),
  workouts: generateWorkouts(Math.floor(5 + Math.random() * 25)),
  vo2max: Math.random() > 0.3 ? 35 + Math.random() * 30 : undefined,
  hrv: Math.random() > 0.3 ? 30 + Math.random() * 60 : undefined,
  spo2: Math.random() > 0.5 ? 95 + Math.random() * 4 : undefined,
  restingHR: Math.floor(50 + Math.random() * 30),
  recoveryScore: Math.random() > 0.4 ? Math.floor(50 + Math.random() * 50) : undefined,
}));

const MOCK_ALERTS: Alert[] = [
  {
    id: 'alert-1',
    clientId: 'client-5',
    clientName: 'Cliente 5',
    type: 'steps',
    message: 'No ha alcanzado 5k pasos en los últimos 3 días',
    priority: 'high',
    date: new Date().toISOString(),
  },
  {
    id: 'alert-2',
    clientId: 'client-12',
    clientName: 'Cliente 12',
    type: 'sleep',
    message: 'Sueño <6h durante los últimos 5 días',
    priority: 'high',
    date: new Date().toISOString(),
  },
  {
    id: 'alert-3',
    clientId: 'client-23',
    clientName: 'Cliente 23',
    type: 'heartRate',
    message: 'Frecuencia cardíaca en reposo elevada (85 bpm)',
    priority: 'medium',
    date: new Date().toISOString(),
  },
  {
    id: 'alert-4',
    clientId: 'client-8',
    clientName: 'Cliente 8',
    type: 'inactive',
    message: 'No ha registrado entrenamientos en 7 días',
    priority: 'medium',
    date: new Date().toISOString(),
  },
  {
    id: 'alert-5',
    clientId: 'client-31',
    clientName: 'Cliente 31',
    type: 'sleep',
    message: 'Calidad de sueño <50% esta semana',
    priority: 'low',
    date: new Date().toISOString(),
  },
  {
    id: 'alert-6',
    clientId: 'client-45',
    clientName: 'Cliente 45',
    type: 'steps',
    message: 'Reducción del 40% en actividad vs semana pasada',
    priority: 'medium',
    date: new Date().toISOString(),
  },
];

const MOCK_INSIGHTS: Insight[] = [
  {
    id: 'insight-1',
    title: 'Mayor adherencia con >10k pasos',
    description: 'Clientes que superan 10k pasos diarios tienen 25% mejor adherencia a entrenamientos',
    impact: 'positive',
  },
  {
    id: 'insight-2',
    title: 'Sueño y rendimiento correlacionados',
    description: 'Sueño <6h correlaciona con 30% menos entrenamientos completados',
    impact: 'negative',
  },
  {
    id: 'insight-3',
    title: 'Lunes: día más activo',
    description: 'Los lunes registran 18% más actividad que el promedio semanal',
    impact: 'positive',
  },
  {
    id: 'insight-4',
    title: 'Grupo 25-35 años más activo',
    description: 'Clientes entre 25-35 años promedian 12,500 pasos vs 8,200 del resto',
    impact: 'neutral',
  },
  {
    id: 'insight-5',
    title: 'Mejora cardiovascular detectada',
    description: 'HR en reposo bajó 6% promedio en últimos 30 días - indica mejora fitness',
    impact: 'positive',
  },
  {
    id: 'insight-6',
    title: 'Fines de semana: menor actividad',
    description: 'Actividad los fines de semana es 32% menor que días laborales',
    impact: 'neutral',
  },
  {
    id: 'insight-7',
    title: 'Entrenamientos matutinos más consistentes',
    description: 'Clientes que entrenan AM tienen 40% más adherencia mensual',
    impact: 'positive',
  },
  {
    id: 'insight-8',
    title: 'VO2 max mejorando',
    description: 'VO2 max promedio subió 8% en últimos 90 días - excelente progreso',
    impact: 'positive',
  },
];

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const PanelDatosWearablesPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('aggregate');
  const [period, setPeriod] = useState<Period>('7days');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [showAlerts, setShowAlerts] = useState(true);
  const [showInsights, setShowInsights] = useState(true);

  const selectedClient = useMemo(
    () => MOCK_CLIENTS.find((c) => c.id === selectedClientId),
    [selectedClientId]
  );

  // Cálculos agregados
  const aggregateStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const todayMetrics = MOCK_CLIENTS.map((c) =>
      c.dailyMetrics.find((m) => m.date === today)
    ).filter(Boolean) as DailyMetrics[];

    const yesterdayMetrics = MOCK_CLIENTS.map((c) =>
      c.dailyMetrics.find((m) => m.date === yesterday)
    ).filter(Boolean) as DailyMetrics[];

    const totalStepsToday = todayMetrics.reduce((sum, m) => sum + m.steps, 0);
    const totalStepsYesterday = yesterdayMetrics.reduce((sum, m) => sum + m.steps, 0);
    const avgStepsToday = totalStepsToday / todayMetrics.length;

    const totalCaloriesToday = todayMetrics.reduce((sum, m) => sum + m.calories, 0);
    const totalCaloriesYesterday = yesterdayMetrics.reduce((sum, m) => sum + m.calories, 0);
    const avgCaloriesToday = totalCaloriesToday / todayMetrics.length;

    const avgSleepToday = todayMetrics.reduce((sum, m) => sum + m.sleep, 0) / todayMetrics.length;
    const avgSleepYesterday = yesterdayMetrics.reduce((sum, m) => sum + m.sleep, 0) / yesterdayMetrics.length;
    const avgSleepQuality = todayMetrics.reduce((sum, m) => sum + m.sleepQuality, 0) / todayMetrics.length;

    const totalWorkoutsToday = todayMetrics.reduce((sum, m) => sum + m.workouts, 0);
    const totalWorkoutsYesterday = yesterdayMetrics.reduce((sum, m) => sum + m.workouts, 0);

    const avgHeartRate = todayMetrics.reduce((sum, m) => sum + m.heartRate, 0) / todayMetrics.length;

    const clientsMetGoal = todayMetrics.filter((m) => m.steps >= 10000).length;
    const activityRate = (clientsMetGoal / todayMetrics.length) * 100;

    return {
      totalStepsToday,
      avgStepsToday,
      stepsChange: ((totalStepsToday - totalStepsYesterday) / totalStepsYesterday) * 100,
      totalCaloriesToday,
      avgCaloriesToday,
      caloriesChange: ((totalCaloriesToday - totalCaloriesYesterday) / totalCaloriesYesterday) * 100,
      avgSleepToday,
      avgSleepQuality,
      sleepChange: ((avgSleepToday - avgSleepYesterday) / avgSleepYesterday) * 100,
      totalWorkoutsToday,
      workoutsChange: totalWorkoutsYesterday > 0
        ? ((totalWorkoutsToday - totalWorkoutsYesterday) / totalWorkoutsYesterday) * 100
        : 0,
      avgHeartRate,
      activityRate,
    };
  }, []);

  // Datos para gráficos agregados
  const aggregateChartData = useMemo(() => {
    const days = period === 'today' ? 1 : period === '7days' ? 7 : 30;
    const data: any[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayMetrics = MOCK_CLIENTS.map((c) =>
        c.dailyMetrics.find((m) => m.date === dateStr)
      ).filter(Boolean) as DailyMetrics[];

      if (dayMetrics.length > 0) {
        data.push({
          date: dateStr,
          avgSteps: Math.floor(dayMetrics.reduce((sum, m) => sum + m.steps, 0) / dayMetrics.length),
          avgCalories: Math.floor(dayMetrics.reduce((sum, m) => sum + m.calories, 0) / dayMetrics.length),
          totalWorkouts: dayMetrics.reduce((sum, m) => sum + m.workouts, 0),
        });
      }
    }

    return data;
  }, [period]);

  // Rankings
  const rankings = useMemo(() => {
    const stepsRanking = MOCK_CLIENTS.map((client) => {
      const last7Days = client.dailyMetrics.slice(-7);
      const totalSteps = last7Days.reduce((sum, m) => sum + m.steps, 0);
      const avgSteps = totalSteps / 7;

      return {
        client,
        totalSteps,
        avgSteps,
      };
    })
      .sort((a, b) => b.totalSteps - a.totalSteps)
      .slice(0, 10);

    const workoutsRanking = MOCK_CLIENTS.map((client) => {
      const last7Days = client.dailyMetrics.slice(-7);
      const totalWorkouts = last7Days.reduce((sum, m) => sum + m.workouts, 0);
      const totalMinutes = client.workouts
        .filter((w) => new Date(w.date) >= new Date(Date.now() - 7 * 86400000))
        .reduce((sum, w) => sum + w.duration, 0);
      const totalCalories = client.workouts
        .filter((w) => new Date(w.date) >= new Date(Date.now() - 7 * 86400000))
        .reduce((sum, w) => sum + w.calories, 0);

      return {
        client,
        totalWorkouts,
        totalMinutes,
        totalCalories,
      };
    })
      .sort((a, b) => b.totalWorkouts - a.totalWorkouts)
      .slice(0, 10);

    const sleepRanking = MOCK_CLIENTS.map((client) => {
      const last7Days = client.dailyMetrics.slice(-7);
      const avgSleep = last7Days.reduce((sum, m) => sum + m.sleep, 0) / 7;
      const avgQuality = last7Days.reduce((sum, m) => sum + m.sleepQuality, 0) / 7;

      return {
        client,
        avgSleep,
        avgQuality,
      };
    })
      .sort((a, b) => b.avgQuality - a.avgQuality)
      .slice(0, 10);

    return { stepsRanking, workoutsRanking, sleepRanking };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-lime-50/30 to-emerald-50/30 p-6">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
                <Activity className="w-10 h-10 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Dashboard de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Wearables</span>
                </h1>
                <p className="text-xl md:text-2xl text-green-100 mt-2 leading-relaxed">
                  Insights en tiempo real de tus clientes
                </p>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/30 transition-all duration-300">
                <Download className="w-4 h-4" />
                Exportar
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/30 transition-all duration-300">
                <FileText className="w-4 h-4" />
                Reporte
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 text-white hover:bg-white/30 transition-all duration-300">
                <Settings className="w-4 h-4" />
                Alertas
              </button>
            </div>
          </div>

          {/* Indicadores pills */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Users className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{MOCK_CLIENTS.length} Clientes Activos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Sincronización en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-emerald-300" />
              <span className="text-sm font-semibold text-white">Análisis Predictivo</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CONTROLES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {/* Vista */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-lime-500 to-emerald-600 rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Vista:</span>
              <div className="flex bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-1 shadow-inner">
                <button
                  onClick={() => {
                    setViewMode('aggregate');
                    setSelectedClientId(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    viewMode === 'aggregate'
                      ? 'bg-gradient-to-r from-lime-500 to-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Todos los Clientes
                </button>
                <button
                  onClick={() => setViewMode('individual')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    viewMode === 'individual'
                      ? 'bg-gradient-to-r from-lime-500 to-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cliente Individual
                </button>
              </div>
            </div>

            {/* Selector de Cliente */}
            {viewMode === 'individual' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
              >
                <span className="text-sm font-semibold text-gray-700">Cliente:</span>
                <select
                  value={selectedClientId || ''}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="px-4 py-2 bg-white rounded-xl text-sm font-medium border-2 border-gray-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-100 transition-all duration-300 outline-none shadow-sm"
                >
                  <option value="">🔍 Seleccionar cliente...</option>
                  {MOCK_CLIENTS.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

            {/* Período */}
            <div className="flex items-center gap-3 lg:ml-auto">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-700">Período:</span>
              <div className="flex bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-1 shadow-inner">
                {(['today', '7days', '30days'] as Period[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                      period === p
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {p === 'today' ? 'Hoy' : p === '7days' ? '7 días' : '30 días'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CONTENIDO PRINCIPAL */}
      {viewMode === 'aggregate' ? (
        <AggregateView
          stats={aggregateStats}
          chartData={aggregateChartData}
          rankings={rankings}
          alerts={MOCK_ALERTS}
          insights={MOCK_INSIGHTS}
          showAlerts={showAlerts}
          showInsights={showInsights}
          period={period}
        />
      ) : selectedClient ? (
        <IndividualView client={selectedClient} period={period} />
      ) : (
        <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow">
          <p className="text-gray-500">Selecciona un cliente para ver sus métricas</p>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// VISTA AGREGADA
// ============================================================================

interface AggregateViewProps {
  stats: any;
  chartData: any[];
  rankings: any;
  alerts: Alert[];
  insights: Insight[];
  showAlerts: boolean;
  showInsights: boolean;
  period: Period;
}

const AggregateView: React.FC<AggregateViewProps> = ({
  stats,
  chartData,
  rankings,
  alerts,
  insights,
  period,
}) => {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard
          title="Pasos Totales Hoy"
          value={stats.totalStepsToday.toLocaleString()}
          subtitle={`Promedio: ${Math.floor(stats.avgStepsToday).toLocaleString()} por cliente`}
          change={stats.stepsChange}
          icon={Footprints}
          color="blue"
        />
        <KPICard
          title="Calorías Quemadas"
          value={`${Math.floor(stats.totalCaloriesToday).toLocaleString()} kcal`}
          subtitle={`Promedio: ${Math.floor(stats.avgCaloriesToday)} kcal por cliente`}
          change={stats.caloriesChange}
          icon={Flame}
          color="orange"
        />
        <KPICard
          title="Horas de Sueño Promedio"
          value={`${stats.avgSleepToday.toFixed(1)}h`}
          subtitle={`Calidad: ${Math.floor(stats.avgSleepQuality)}%`}
          change={stats.sleepChange}
          icon={Moon}
          color="purple"
        />
        <KPICard
          title="Entrenamientos Completados"
          value={stats.totalWorkoutsToday.toString()}
          subtitle="registrados hoy"
          change={stats.workoutsChange}
          icon={Zap}
          color="green"
        />
        <KPICard
          title="Frecuencia Cardíaca"
          value={`${Math.floor(stats.avgHeartRate)} bpm`}
          subtitle="promedio en reposo"
          icon={Heart}
          color="red"
        />
        <KPICard
          title="Tasa de Actividad"
          value={`${Math.floor(stats.activityRate)}%`}
          subtitle="alcanzaron objetivo de pasos"
          icon={Target}
          color="teal"
        />
      </div>

      {/* Gráfico de Actividad Agregada */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-lime-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-lime-500 to-emerald-600 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-emerald-600">
                Actividad Agregada
              </span>
              <span className="text-sm font-medium text-gray-500">
                - Últimos {period === 'today' ? '24h' : period === '7days' ? '7 días' : '30 días'}
              </span>
            </h3>
          </div>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorWorkouts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                stroke="#94a3b8"
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
                labelFormatter={(date) => new Date(date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Area
                type="monotone"
                dataKey="avgSteps"
                stroke="#84cc16"
                strokeWidth={3}
                fill="url(#colorSteps)"
                name="Pasos promedio"
              />
              <Area
                type="monotone"
                dataKey="avgCalories"
                stroke="#f97316"
                strokeWidth={3}
                fill="url(#colorCalories)"
                name="Calorías promedio"
              />
              <Area
                type="monotone"
                dataKey="totalWorkouts"
                stroke="#10b981"
                strokeWidth={3}
                fill="url(#colorWorkouts)"
                name="Entrenamientos totales"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Rankings y Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rankings */}
        <RankingsSection rankings={rankings} />

        {/* Alertas */}
        <AlertsSection alerts={alerts} />
      </div>

      {/* Insights */}
      <InsightsSection insights={insights} />

      {/* Análisis de Tendencias */}
      <TrendsSection />
    </div>
  );
};

// ============================================================================
// KPI CARD
// ============================================================================

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  change?: number;
  icon: any;
  color: string;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, subtitle, change, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    orange: 'from-orange-500 to-orange-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-lime-500 to-emerald-600',
    red: 'from-red-500 to-red-600',
    teal: 'from-teal-500 to-cyan-600',
  };

  const bgColorClasses = {
    blue: 'from-blue-200 to-blue-300',
    orange: 'from-orange-200 to-orange-300',
    purple: 'from-purple-200 to-purple-300',
    green: 'from-lime-200 to-emerald-300',
    red: 'from-red-200 to-red-300',
    teal: 'from-teal-200 to-cyan-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${bgColorClasses[color as keyof typeof bgColorClasses]} rounded-full blur-3xl opacity-20`}></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8" />
          </div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
              change >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              <TrendingUp className={`w-4 h-4 ${change < 0 ? 'rotate-180' : ''}`} />
              <span className="text-sm font-bold">{Math.abs(change).toFixed(1)}%</span>
            </div>
          )}
        </div>
        <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
          {title}
        </p>
        <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
          {value}
        </p>
        <p className="text-xs text-gray-500 font-medium">{subtitle}</p>

        {/* Barra decorativa */}
        <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ delay: 0.5, duration: 1 }}
            className={`h-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-full`}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// RANKINGS
// ============================================================================

const RankingsSection: React.FC<{ rankings: any }> = ({ rankings }) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'workouts' | 'sleep'>('steps');

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración */}
      <div className="absolute -left-12 -top-12 w-40 h-40 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600">
            Rankings de la Semana
          </span>
        </h3>

        <div className="flex gap-2 mb-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('steps')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'steps' ? 'bg-gradient-to-r from-lime-500 to-green-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pasos
          </button>
          <button
            onClick={() => setActiveTab('workouts')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'workouts' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Entrenamientos
          </button>
          <button
            onClick={() => setActiveTab('sleep')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'sleep' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Sueño
          </button>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        {activeTab === 'steps' &&
          rankings.stepsRanking.map((item: any, index: number) => (
            <motion.div
              key={item.client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-lime-50 to-green-50 rounded-2xl hover:from-lime-100 hover:to-green-100 transition-all duration-300 border border-lime-100 hover:border-lime-200 hover:shadow-md group"
            >
              <div className="flex-shrink-0 w-10 text-center">
                {index < 3 ? (
                  <Award className={`w-7 h-7 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-700'}`} />
                ) : (
                  <span className="text-sm font-bold text-gray-600">#{index + 1}</span>
                )}
              </div>
              <img src={item.client.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300" />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{item.client.name}</p>
                <p className="text-xs text-gray-600 font-medium">{item.totalSteps.toLocaleString()} pasos</p>
              </div>
              <div className="text-right bg-white/60 rounded-xl px-3 py-2">
                <p className="text-xs text-gray-500 font-medium">Promedio</p>
                <p className="text-sm font-bold text-lime-600">{Math.floor(item.avgSteps).toLocaleString()}/día</p>
              </div>
            </motion.div>
          ))}

        {activeTab === 'workouts' &&
          rankings.workoutsRanking.map((item: any, index: number) => (
            <motion.div
              key={item.client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border border-green-100 hover:border-green-200 hover:shadow-md group"
            >
              <div className="flex-shrink-0 w-10 text-center">
                {index < 3 ? (
                  <Award className={`w-7 h-7 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-700'}`} />
                ) : (
                  <span className="text-sm font-bold text-gray-600">#{index + 1}</span>
                )}
              </div>
              <img src={item.client.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300" />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{item.client.name}</p>
                <p className="text-xs text-gray-600 font-medium">{item.totalWorkouts} entrenamientos</p>
              </div>
              <div className="text-right bg-white/60 rounded-xl px-3 py-2">
                <p className="text-xs text-gray-500 font-medium">{item.totalMinutes} min</p>
                <p className="text-xs text-emerald-600 font-bold">{item.totalCalories} kcal</p>
              </div>
            </motion.div>
          ))}

        {activeTab === 'sleep' &&
          rankings.sleepRanking.map((item: any, index: number) => (
            <motion.div
              key={item.client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-50 rounded-2xl hover:from-purple-100 hover:to-purple-100 transition-all duration-300 border border-purple-100 hover:border-purple-200 hover:shadow-md group"
            >
              <div className="flex-shrink-0 w-10 text-center">
                {index < 3 ? (
                  <Award className={`w-7 h-7 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-700'}`} />
                ) : (
                  <span className="text-sm font-bold text-gray-600">#{index + 1}</span>
                )}
              </div>
              <img src={item.client.avatar} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300" />
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{item.client.name}</p>
                <p className="text-xs text-gray-600 font-medium">{item.avgSleep.toFixed(1)}h promedio</p>
              </div>
              <div className="text-right bg-white/60 rounded-xl px-3 py-2">
                <p className="text-xs text-gray-500 font-medium">Calidad</p>
                <p className="text-sm font-bold text-purple-600">{Math.floor(item.avgQuality)}%</p>
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
};

// ============================================================================
// ALERTAS
// ============================================================================

const AlertsSection: React.FC<{ alerts: Alert[] }> = ({ alerts }) => {
  const priorityColors = {
    high: 'from-red-50 to-red-100 border-red-200 text-red-700',
    medium: 'from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700',
    low: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
            Alertas Automáticas
          </span>
        </h3>

        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl border-2 bg-gradient-to-r ${priorityColors[alert.priority]} hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="text-sm font-bold">{alert.clientName}</span>
                </div>
                <span className="px-3 py-1 text-xs uppercase font-bold bg-white/60 rounded-full">{alert.priority}</span>
              </div>
              <p className="text-sm mb-3 font-medium">{alert.message}</p>
              <div className="flex gap-2">
                <button className="text-xs px-4 py-2 bg-white/80 rounded-xl hover:bg-white transition-all duration-300 font-semibold shadow-sm hover:shadow">
                  📧 Mensaje
                </button>
                <button className="text-xs px-4 py-2 bg-white/80 rounded-xl hover:bg-white transition-all duration-300 font-semibold shadow-sm hover:shadow">
                  📅 Check-in
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// INSIGHTS
// ============================================================================

const InsightsSection: React.FC<{ insights: Insight[] }> = ({ insights }) => {
  const impactColors = {
    positive: 'from-green-50 to-emerald-50 border-green-200 text-green-700',
    neutral: 'from-gray-50 to-gray-100 border-gray-200 text-gray-700',
    negative: 'from-red-50 to-red-100 border-red-200 text-red-700',
  };

  const impactIcons = {
    positive: '✅',
    neutral: 'ℹ️',
    negative: '⚠️',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración */}
      <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Insights Inteligentes
          </span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className={`p-5 rounded-2xl border-2 bg-gradient-to-br ${impactColors[insight.impact]} hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-start gap-2 mb-3">
                <span className="text-2xl">{impactIcons[insight.impact]}</span>
                <h4 className="text-sm font-bold leading-tight">{insight.title}</h4>
              </div>
              <p className="text-xs font-medium leading-relaxed">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// TENDENCIAS
// ============================================================================

const TrendsSection: React.FC = () => {
  const weekdayData = [
    { day: 'Lun', avgSteps: 11200, adherence: 72 },
    { day: 'Mar', avgSteps: 10800, adherence: 68 },
    { day: 'Mie', avgSteps: 10500, adherence: 65 },
    { day: 'Jue', avgSteps: 10200, adherence: 64 },
    { day: 'Vie', avgSteps: 9800, adherence: 61 },
    { day: 'Sab', avgSteps: 7800, adherence: 52 },
    { day: 'Dom', avgSteps: 7200, adherence: 48 },
  ];

  const activityTypes = [
    { type: 'Correr', count: 245, color: '#3b82f6' },
    { type: 'Pesas', count: 198, color: '#f97316' },
    { type: 'Ciclismo', count: 167, color: '#10b981' },
    { type: 'Yoga', count: 134, color: '#a855f7' },
    { type: 'CrossFit', count: 89, color: '#ef4444' },
    { type: 'Natación', count: 72, color: '#06b6d4' },
  ];

  const sleepQualityDist = [
    { name: 'Excelente (>85%)', value: 22, color: '#10b981' },
    { name: 'Buena (70-85%)', value: 31, color: '#3b82f6' },
    { name: 'Regular (50-70%)', value: 9, color: '#f59e0b' },
    { name: 'Pobre (<50%)', value: 3, color: '#ef4444' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="space-y-6"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden">
        {/* Decoración */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              Análisis de Tendencias
            </span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pasos por día de semana */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Footprints className="w-4 h-4 text-lime-600" />
                Pasos por Día de la Semana
              </h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={weekdayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="avgSteps" fill="url(#gradientSteps)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="gradientSteps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#84cc16" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Adherencia a objetivos */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                Adherencia a Objetivos (%)
              </h4>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={weekdayData}>
                  <defs>
                    <linearGradient id="colorAdherence" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="adherence" stroke="#10b981" strokeWidth={3} fill="url(#colorAdherence)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Distribución de actividades */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-600" />
                Tipos de Entrenamientos
              </h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={activityTypes} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#64748b" style={{ fontSize: '12px' }} />
                  <YAxis dataKey="type" type="category" width={80} stroke="#64748b" style={{ fontSize: '11px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                    {activityTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Calidad de sueño */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <h4 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-600" />
                Distribución Calidad de Sueño
              </h4>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={sleepQualityDist}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={85}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sleepQualityDist.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// VISTA INDIVIDUAL
// ============================================================================

interface IndividualViewProps {
  client: Client;
  period: Period;
}

const IndividualView: React.FC<IndividualViewProps> = ({ client, period }) => {
  const today = client.dailyMetrics[client.dailyMetrics.length - 1];
  const last7Days = client.dailyMetrics.slice(-7);
  const recentWorkouts = client.workouts.slice(0, 5);

  // Datos para gráfico de pasos
  const stepsChartData = last7Days.map((m) => ({
    date: m.date,
    steps: m.steps,
    goal: client.stepsGoal,
  }));

  // Datos para gráfico de sueño
  const sleepChartData = last7Days.map((m) => ({
    date: m.date,
    light: (m.sleep * 0.5).toFixed(1),
    deep: (m.sleep * 0.3).toFixed(1),
    rem: (m.sleep * 0.2).toFixed(1),
    total: m.sleep.toFixed(1),
    quality: m.sleepQuality,
  }));

  // Progreso circular
  const stepsProgress = (today.steps / client.stepsGoal) * 100;
  const activeMinutesProgress = (today.activeMinutes / client.activeMinutesGoal) * 100;
  const sleepProgress = (today.sleep / client.sleepGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Resumen Diario */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 rounded-3xl shadow-2xl p-8 border border-white/20"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <img src={client.avatar} alt={client.name} className="w-20 h-20 rounded-full border-4 border-white shadow-2xl" />
            <div>
              <h2 className="text-3xl font-bold text-white">{client.name}</h2>
              <p className="text-lg text-green-100 font-medium">{client.age} años • {client.gender === 'M' ? 'Masculino' : 'Femenino'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="relative inline-flex mb-3">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - Math.min(stepsProgress / 100, 1))}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Footprints className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{today.steps.toLocaleString()}</p>
              <p className="text-xs text-green-100 font-medium">de {client.stepsGoal.toLocaleString()} pasos</p>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="relative inline-flex mb-3">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - Math.min(activeMinutesProgress / 100, 1))}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{today.activeMinutes} min</p>
              <p className="text-xs text-green-100 font-medium">de {client.activeMinutesGoal} min activos</p>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="mb-3">
                <Flame className="w-14 h-14 mx-auto text-white" />
              </div>
              <p className="text-2xl font-bold text-white">{today.calories.toLocaleString()} kcal</p>
              <p className="text-xs text-green-100 font-medium">quemadas hoy</p>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="mb-3">
                <Moon className="w-14 h-14 mx-auto text-white" />
              </div>
              <p className="text-2xl font-bold text-white">{today.sleep.toFixed(1)}h</p>
              <p className="text-xs text-green-100 font-medium">sueño ({today.sleepQuality}% calidad)</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pasos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración */}
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-gradient-to-br from-lime-200 to-green-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-lime-500 to-green-600 rounded-xl">
                <Footprints className="w-5 h-5 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-green-600">
                Pasos - Últimos 7 Días
              </span>
            </h3>
            <ResponsiveContainer width="100%" height={270}>
              <BarChart data={stepsChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString('es-ES', { weekday: 'short' })}
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="steps" radius={[8, 8, 0, 0]}>
                  {stepsChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.steps >= entry.goal ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
                <Line type="monotone" dataKey="goal" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-3 font-medium">
              📊 Promedio: <span className="font-bold text-lime-600">{Math.floor(last7Days.reduce((sum, m) => sum + m.steps, 0) / 7).toLocaleString()}</span> pasos/día
            </p>
          </div>
        </motion.div>

        {/* Sueño */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración */}
          <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                <Moon className="w-5 h-5 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                Sueño - Últimos 7 Días
              </span>
            </h3>
            <ResponsiveContainer width="100%" height={270}>
              <BarChart data={sleepChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString('es-ES', { weekday: 'short' })}
                  stroke="#64748b"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="light" stackId="a" fill="#93c5fd" name="Ligero" radius={[0, 0, 0, 0]} />
                <Bar dataKey="deep" stackId="a" fill="#3b82f6" name="Profundo" radius={[0, 0, 0, 0]} />
                <Bar dataKey="rem" stackId="a" fill="#a855f7" name="REM" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-3 font-medium">
              😴 Promedio: <span className="font-bold text-purple-600">{(last7Days.reduce((sum, m) => sum + m.sleep, 0) / 7).toFixed(1)}h</span>/noche •
              Calidad: <span className="font-bold text-indigo-600">{Math.floor(last7Days.reduce((sum, m) => sum + m.sleepQuality, 0) / 7)}%</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Métricas Avanzadas */}
      {(client.vo2max || client.hrv || client.spo2 || client.recoveryScore) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          {/* Decoración */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                Métricas Avanzadas
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {client.vo2max && (
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-lg"
                >
                  <Wind className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                  <p className="text-3xl font-bold text-blue-900">{client.vo2max.toFixed(1)}</p>
                  <p className="text-sm font-bold text-blue-700 mt-1">VO2 max</p>
                  <p className="text-xs text-blue-600 mt-1 font-medium">ml/kg/min</p>
                </motion.div>
              )}
              {client.hrv && (
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 shadow-lg"
                >
                  <Heart className="w-10 h-10 mx-auto mb-3 text-green-600" />
                  <p className="text-3xl font-bold text-green-900">{Math.floor(client.hrv)}</p>
                  <p className="text-sm font-bold text-green-700 mt-1">HRV</p>
                  <p className="text-xs text-green-600 mt-1 font-medium">ms</p>
                </motion.div>
              )}
              {client.spo2 && (
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-2 border-red-200 shadow-lg"
                >
                  <Droplet className="w-10 h-10 mx-auto mb-3 text-red-600" />
                  <p className="text-3xl font-bold text-red-900">{client.spo2.toFixed(1)}%</p>
                  <p className="text-sm font-bold text-red-700 mt-1">SpO2</p>
                  <p className="text-xs text-red-600 mt-1 font-medium">Saturación O2</p>
                </motion.div>
              )}
              {client.recoveryScore && (
                <motion.div
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 shadow-lg"
                >
                  <Zap className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                  <p className="text-3xl font-bold text-purple-900">{client.recoveryScore}%</p>
                  <p className="text-sm font-bold text-purple-700 mt-1">Recuperación</p>
                  <p
                    className={`text-xs mt-2 font-bold px-3 py-1 rounded-full inline-block ${
                      client.recoveryScore >= 70 ? 'bg-green-200 text-green-700' : client.recoveryScore >= 40 ? 'bg-yellow-200 text-yellow-700' : 'bg-red-200 text-red-700'
                    }`}
                  >
                    {client.recoveryScore >= 70 ? '✨ Excelente' : client.recoveryScore >= 40 ? '⚡ Moderada' : '⚠️ Baja'}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Entrenamientos Recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración */}
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              Entrenamientos Recientes
            </span>
          </h3>
          <div className="space-y-4">
            {recentWorkouts.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="flex items-center gap-4 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:border-green-200 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex-shrink-0 p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-gray-900 text-lg">{workout.type}</p>
                    <p className="text-sm text-gray-500 font-medium bg-white/60 px-3 py-1 rounded-full">
                      {new Date(workout.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-700">
                    <span className="flex items-center gap-2 font-medium">
                      <div className="p-1 bg-blue-100 rounded-lg">
                        <Clock className="w-4 h-4 text-blue-600" />
                      </div>
                      {workout.duration} min
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                      <div className="p-1 bg-orange-100 rounded-lg">
                        <Flame className="w-4 h-4 text-orange-600" />
                      </div>
                      {workout.calories} kcal
                    </span>
                    {workout.distance && (
                      <span className="flex items-center gap-2 font-medium">
                        <div className="p-1 bg-lime-100 rounded-lg">
                          <Footprints className="w-4 h-4 text-lime-600" />
                        </div>
                        {workout.distance} km
                      </span>
                    )}
                    <span className="flex items-center gap-2 font-medium">
                      <div className="p-1 bg-red-100 rounded-lg">
                        <Heart className="w-4 h-4 text-red-600" />
                      </div>
                      {workout.avgHeartRate} bpm
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PanelDatosWearablesPage;
