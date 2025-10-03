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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-3 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl"
            >
              <Activity className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Panel de Datos de Wearables
              </h1>
              <p className="text-gray-600 mt-1">
                Analiza métricas de salud y rendimiento de tus clientes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <Download className="w-4 h-4" />
              Exportar Datos
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <FileText className="w-4 h-4" />
              Generar Reporte
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <Settings className="w-4 h-4" />
              Configurar Alertas
            </button>
          </div>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium">Vista:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setViewMode('aggregate');
                  setSelectedClientId(null);
                }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'aggregate'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Todos los Clientes
              </button>
              <button
                onClick={() => setViewMode('individual')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'individual'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Cliente Individual
              </button>
            </div>
          </div>

          {viewMode === 'individual' && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Cliente:</span>
              <select
                value={selectedClientId || ''}
                onChange={(e) => setSelectedClientId(e.target.value)}
                className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm border-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar cliente...</option>
                {MOCK_CLIENTS.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium">Período:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['today', '7days', '30days'] as Period[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    period === p
                      ? 'bg-green-500 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {p === 'today' ? 'Hoy' : p === '7days' ? 'Últimos 7 días' : 'Últimos 30 días'}
                </button>
              ))}
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
        className="bg-white p-6 rounded-xl shadow"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Actividad Agregada - Últimos{' '}
          {period === 'today' ? '24 horas' : period === '7days' ? '7 días' : '30 días'}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
              stroke="#94a3b8"
            />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              labelFormatter={(date) => new Date(date).toLocaleDateString('es-ES')}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="avgSteps"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Pasos promedio"
              dot={{ fill: '#3b82f6', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="avgCalories"
              stroke="#f97316"
              strokeWidth={2}
              name="Calorías promedio"
              dot={{ fill: '#f97316', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="totalWorkouts"
              stroke="#10b981"
              strokeWidth={2}
              name="Entrenamientos totales"
              dot={{ fill: '#10b981', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
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
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
    teal: 'from-teal-500 to-teal-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <TrendingUp className={`w-4 h-4 ${change < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
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
      className="bg-white p-6 rounded-xl shadow"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-600" />
        Rankings de la Semana
      </h3>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('steps')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'steps' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Pasos
        </button>
        <button
          onClick={() => setActiveTab('workouts')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'workouts' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Entrenamientos
        </button>
        <button
          onClick={() => setActiveTab('sleep')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'sleep' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
          }`}
        >
          Sueño
        </button>
      </div>

      <div className="space-y-2">
        {activeTab === 'steps' &&
          rankings.stepsRanking.map((item: any, index: number) => (
            <div key={item.client.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 text-center">
                {index < 3 ? (
                  <Award className={`w-6 h-6 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-700'}`} />
                ) : (
                  <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                )}
              </div>
              <img src={item.client.avatar} alt="" className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.client.name}</p>
                <p className="text-xs text-gray-600">{item.totalSteps.toLocaleString()} pasos</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Promedio</p>
                <p className="text-sm font-medium">{Math.floor(item.avgSteps).toLocaleString()}/día</p>
              </div>
            </div>
          ))}

        {activeTab === 'workouts' &&
          rankings.workoutsRanking.map((item: any, index: number) => (
            <div key={item.client.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 text-center">
                {index < 3 ? (
                  <Award className={`w-6 h-6 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-700'}`} />
                ) : (
                  <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                )}
              </div>
              <img src={item.client.avatar} alt="" className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.client.name}</p>
                <p className="text-xs text-gray-600">{item.totalWorkouts} entrenamientos</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">{item.totalMinutes} min</p>
                <p className="text-xs text-gray-500">{item.totalCalories} kcal</p>
              </div>
            </div>
          ))}

        {activeTab === 'sleep' &&
          rankings.sleepRanking.map((item: any, index: number) => (
            <div key={item.client.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 w-8 text-center">
                {index < 3 ? (
                  <Award className={`w-6 h-6 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : 'text-amber-700'}`} />
                ) : (
                  <span className="text-sm font-medium text-gray-600">#{index + 1}</span>
                )}
              </div>
              <img src={item.client.avatar} alt="" className="w-8 h-8 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.client.name}</p>
                <p className="text-xs text-gray-600">{item.avgSleep.toFixed(1)}h promedio</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Calidad</p>
                <p className="text-sm font-medium">{Math.floor(item.avgQuality)}%</p>
              </div>
            </div>
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
    high: 'bg-red-50 border-red-200 text-red-700',
    medium: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    low: 'bg-blue-50 border-blue-200 text-blue-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white p-6 rounded-xl shadow"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-orange-600" />
        Alertas Automáticas
      </h3>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${priorityColors[alert.priority]}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-semibold">{alert.clientName}</span>
              </div>
              <span className="text-xs uppercase font-medium">{alert.priority}</span>
            </div>
            <p className="text-sm mb-3">{alert.message}</p>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1 bg-white rounded hover:bg-opacity-80 transition-colors">
                Enviar mensaje
              </button>
              <button className="text-xs px-3 py-1 bg-white rounded hover:bg-opacity-80 transition-colors">
                Programar check-in
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ============================================================================
// INSIGHTS
// ============================================================================

const InsightsSection: React.FC<{ insights: Insight[] }> = ({ insights }) => {
  const impactColors = {
    positive: 'bg-green-50 border-green-200 text-green-700',
    neutral: 'bg-gray-50 border-gray-200 text-gray-700',
    negative: 'bg-red-50 border-red-200 text-red-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white p-6 rounded-xl shadow"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Brain className="w-5 h-5 text-purple-600" />
        Insights Inteligentes
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 rounded-lg border ${impactColors[insight.impact]}`}
          >
            <h4 className="text-sm font-semibold mb-2">{insight.title}</h4>
            <p className="text-xs">{insight.description}</p>
          </div>
        ))}
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
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Análisis de Tendencias</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pasos por día de semana */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Pasos por Día de la Semana</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weekdayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="avgSteps" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Adherencia a objetivos */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Adherencia a Objetivos (%)</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weekdayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="adherence" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Distribución de actividades */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Tipos de Entrenamientos</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityTypes} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" stroke="#94a3b8" />
                <YAxis dataKey="type" type="category" width={80} stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Calidad de sueño */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Distribución Calidad de Sueño</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sleepQualityDist}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sleepQualityDist.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
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
        className="bg-gradient-to-br from-blue-500 to-green-500 p-6 rounded-xl shadow-lg text-white"
      >
        <div className="flex items-center gap-4 mb-6">
          <img src={client.avatar} alt={client.name} className="w-16 h-16 rounded-full border-4 border-white" />
          <div>
            <h2 className="text-2xl font-bold">{client.name}</h2>
            <p className="text-blue-100">{client.age} años • {client.gender === 'M' ? 'Masculino' : 'Femenino'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="relative inline-flex">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - Math.min(stepsProgress / 100, 1))}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Footprints className="w-6 h-6" />
              </div>
            </div>
            <p className="mt-2 text-sm font-medium">{today.steps.toLocaleString()}</p>
            <p className="text-xs text-blue-100">de {client.stepsGoal.toLocaleString()} pasos</p>
          </div>

          <div className="text-center">
            <div className="relative inline-flex">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="white"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - Math.min(activeMinutesProgress / 100, 1))}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>
            <p className="mt-2 text-sm font-medium">{today.activeMinutes} min</p>
            <p className="text-xs text-blue-100">de {client.activeMinutesGoal} min activos</p>
          </div>

          <div className="text-center">
            <Flame className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm font-medium">{today.calories.toLocaleString()} kcal</p>
            <p className="text-xs text-blue-100">quemadas hoy</p>
          </div>

          <div className="text-center">
            <Moon className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm font-medium">{today.sleep.toFixed(1)}h</p>
            <p className="text-xs text-blue-100">sueño ({today.sleepQuality}% calidad)</p>
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
          className="bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Footprints className="w-5 h-5 text-blue-600" />
            Pasos - Últimos 7 Días
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stepsChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString('es-ES', { weekday: 'short' })}
                stroke="#94a3b8"
              />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="steps" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                {stepsChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.steps >= entry.goal ? '#10b981' : '#ef4444'} />
                ))}
              </Bar>
              <Line type="monotone" dataKey="goal" stroke="#94a3b8" strokeDasharray="5 5" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">
            Promedio: {Math.floor(last7Days.reduce((sum, m) => sum + m.steps, 0) / 7).toLocaleString()} pasos/día
          </p>
        </motion.div>

        {/* Sueño */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Moon className="w-5 h-5 text-purple-600" />
            Sueño - Últimos 7 Días
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sleepChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString('es-ES', { weekday: 'short' })}
                stroke="#94a3b8"
              />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="light" stackId="a" fill="#93c5fd" name="Ligero" radius={[0, 0, 0, 0]} />
              <Bar dataKey="deep" stackId="a" fill="#3b82f6" name="Profundo" radius={[0, 0, 0, 0]} />
              <Bar dataKey="rem" stackId="a" fill="#a855f7" name="REM" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-2">
            Promedio: {(last7Days.reduce((sum, m) => sum + m.sleep, 0) / 7).toFixed(1)}h/noche • Calidad:{' '}
            {Math.floor(last7Days.reduce((sum, m) => sum + m.sleepQuality, 0) / 7)}%
          </p>
        </motion.div>
      </div>

      {/* Métricas Avanzadas */}
      {(client.vo2max || client.hrv || client.spo2 || client.recoveryScore) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-lg font-semibold mb-4">Métricas Avanzadas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {client.vo2max && (
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <Wind className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold text-blue-900">{client.vo2max.toFixed(1)}</p>
                <p className="text-sm text-blue-700">VO2 max</p>
                <p className="text-xs text-blue-600 mt-1">ml/kg/min</p>
              </div>
            )}
            {client.hrv && (
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <Heart className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold text-green-900">{Math.floor(client.hrv)}</p>
                <p className="text-sm text-green-700">HRV</p>
                <p className="text-xs text-green-600 mt-1">ms</p>
              </div>
            )}
            {client.spo2 && (
              <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                <Droplet className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <p className="text-2xl font-bold text-red-900">{client.spo2.toFixed(1)}%</p>
                <p className="text-sm text-red-700">SpO2</p>
                <p className="text-xs text-red-600 mt-1">Saturación O2</p>
              </div>
            )}
            {client.recoveryScore && (
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <Zap className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold text-purple-900">{client.recoveryScore}%</p>
                <p className="text-sm text-purple-700">Recuperación</p>
                <p
                  className={`text-xs mt-1 font-medium ${
                    client.recoveryScore >= 70 ? 'text-green-600' : client.recoveryScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                  }`}
                >
                  {client.recoveryScore >= 70 ? 'Excelente' : client.recoveryScore >= 40 ? 'Moderada' : 'Baja'}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Entrenamientos Recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-green-600" />
          Entrenamientos Recientes
        </h3>
        <div className="space-y-3">
          {recentWorkouts.map((workout) => (
            <div key={workout.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">{workout.type}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(workout.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {workout.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4" />
                    {workout.calories} kcal
                  </span>
                  {workout.distance && (
                    <span className="flex items-center gap-1">
                      <Footprints className="w-4 h-4" />
                      {workout.distance} km
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {workout.avgHeartRate} bpm
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default PanelDatosWearablesPage;
