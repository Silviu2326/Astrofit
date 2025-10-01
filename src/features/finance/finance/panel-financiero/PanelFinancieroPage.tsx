import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Clock,
  AlertCircle,
  Activity,
  Download,
  Settings,
  FileText,
  Calendar,
  Filter,
  Target,
  Bell,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertTriangle,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';

// Types
type Period = 'today' | 'week' | 'month' | 'quarter' | 'year';

// Mock Data (keeping existing data)
const monthlyData = [
  { month: 'Ene', ingresos: 45000, gastos: 28000, beneficio: 17000 },
  { month: 'Feb', ingresos: 52000, gastos: 31000, beneficio: 21000 },
  { month: 'Mar', ingresos: 48000, gastos: 29000, beneficio: 19000 },
  { month: 'Abr', ingresos: 61000, gastos: 35000, beneficio: 26000 },
  { month: 'May', ingresos: 55000, gastos: 32000, beneficio: 23000 },
  { month: 'Jun', ingresos: 67000, gastos: 38000, beneficio: 29000 },
  { month: 'Jul', ingresos: 72000, gastos: 41000, beneficio: 31000 },
  { month: 'Ago', ingresos: 58000, gastos: 34000, beneficio: 24000 },
  { month: 'Sep', ingresos: 64000, gastos: 37000, beneficio: 27000 },
  { month: 'Oct', ingresos: 69000, gastos: 39000, beneficio: 30000 },
  { month: 'Nov', ingresos: 75000, gastos: 42000, beneficio: 33000 },
  { month: 'Dic', ingresos: 82000, gastos: 45000, beneficio: 37000 },
];

const incomeDistribution = [
  { name: 'Membresías', value: 45000, color: '#10b981' },
  { name: 'Sesiones', value: 28000, color: '#3b82f6' },
  { name: 'Nutrición', value: 18000, color: '#8b5cf6' },
  { name: 'Productos', value: 12000, color: '#f59e0b' },
  { name: 'Otros', value: 6000, color: '#ec4899' },
];

const PanelFinancieroPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('month');
  const [lastUpdate] = useState(new Date().toLocaleTimeString());

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  const kpis = useMemo(() => {
    const totalIncome = currentMonth.ingresos;
    const totalExpenses = currentMonth.gastos;
    const netProfit = totalIncome - totalExpenses;
    const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);
    const incomeChange = (((totalIncome - previousMonth.ingresos) / previousMonth.ingresos) * 100).toFixed(1);
    const expensesChange = (((totalExpenses - previousMonth.gastos) / previousMonth.gastos) * 100).toFixed(1);

    return {
      totalIncome,
      incomeChange: parseFloat(incomeChange),
      totalExpenses,
      expensesChange: parseFloat(expensesChange),
      netProfit,
      profitMargin: parseFloat(profitMargin),
    };
  }, [currentMonth, previousMonth]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header con gradiente */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 shadow-2xl mb-8 p-8 md:p-12"
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

        <div className="relative z-10 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4">
                  <DollarSign className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Panel <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Financiero</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100 mt-2 max-w-2xl flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Diciembre 2025 • Última actualización: {lastUpdate}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden">
                {(['today', 'week', 'month', 'quarter', 'year'] as Period[]).map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-2 text-sm font-semibold transition-colors ${
                      selectedPeriod === period
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {period === 'today' && 'Hoy'}
                    {period === 'week' && 'Semana'}
                    {period === 'month' && 'Mes'}
                    {period === 'quarter' && 'Trim'}
                    {period === 'year' && 'Año'}
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Reporte</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-600 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Exportar</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="max-w-[1920px] mx-auto px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-emerald-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-bold ${kpis.incomeChange > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {kpis.incomeChange > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {kpis.incomeChange > 0 ? '+' : ''}{kpis.incomeChange}%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Ingresos Totales</p>
            <p className="text-3xl font-bold text-emerald-600">{formatCurrency(kpis.totalIncome)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-red-50 rounded-lg">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-bold ${kpis.expensesChange > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                {kpis.expensesChange > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {kpis.expensesChange > 0 ? '+' : ''}{kpis.expensesChange}%
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Gastos Totales</p>
            <p className="text-3xl font-bold text-red-600">{formatCurrency(kpis.totalExpenses)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 bg-blue-50 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-bold text-blue-600">
                {kpis.profitMargin}% margen
              </span>
            </div>
            <p className="text-sm font-medium text-gray-600 mb-1">Beneficio Neto</p>
            <p className="text-3xl font-bold text-blue-600">{formatCurrency(kpis.netProfit)}</p>
          </motion.div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Gráfico Principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  Ingresos vs Gastos
                </h3>
                <p className="text-sm text-gray-500">Últimos 12 meses</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="ingresos" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="gastos" fill="#ef4444" radius={[8, 8, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="beneficio"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Distribución de Ingresos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-indigo-600" />
                Distribución Ingresos
              </h3>
              <p className="text-sm text-gray-500">Por categoría</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={incomeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incomeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {incomeDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PanelFinancieroPage;
