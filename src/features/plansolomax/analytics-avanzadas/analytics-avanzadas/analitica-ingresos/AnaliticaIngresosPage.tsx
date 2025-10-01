import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Target,
  LineChart,
  Users,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  Award,
  AlertCircle,
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from 'recharts';

// Tipos
interface RevenueData {
  month: string;
  totalRevenue: number;
  mrr: number;
  recurringRevenue: number;
  oneTimeRevenue: number;
  newMRR: number;
  expansionMRR: number;
  churnMRR: number;
  contractionMRR: number;
  netMRR: number;
  customers: number;
  growthRate: number;
}

interface ProductRevenue {
  name: string;
  revenue: number;
  percentage: number;
  customers: number;
  arpu: number;
  growth: number;
  mrr?: number;
  color: string;
}

interface TopCustomer {
  id: string;
  name: string;
  avatar: string;
  totalRevenue: number;
  monthlyRevenue: number;
  membership: string;
  monthsAsCustomer: number;
  ltv: number;
}

type Period = 'month' | '3months' | '6months' | '12months' | 'fiscal' | 'custom';

// Datos mockeados
const generateRevenueData = (): RevenueData[] => {
  const data: RevenueData[] = [];
  const startDate = new Date(2023, 6, 1); // Julio 2023
  let currentMRR = 15000;
  let customers = 75;

  for (let i = 0; i < 20; i++) {
    const month = new Date(startDate);
    month.setMonth(startDate.getMonth() + i);
    const monthName = month.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });

    // Crecimiento con estacionalidad
    const seasonality = [0.85, 1.15, 1.1, 1.05, 0.95, 0.75, 0.7, 0.9, 1.1, 1.15, 1.2, 1.25][month.getMonth()];
    const baseGrowth = 1 + (Math.random() * 0.15 + 0.05); // 5-20% crecimiento

    const newMRR = currentMRR * (Math.random() * 0.15 + 0.05) * seasonality;
    const expansionMRR = currentMRR * (Math.random() * 0.08 + 0.02);
    const churnMRR = currentMRR * (Math.random() * 0.05 + 0.02);
    const contractionMRR = currentMRR * (Math.random() * 0.02 + 0.01);

    const netMRR = newMRR + expansionMRR - churnMRR - contractionMRR;
    currentMRR += netMRR;

    const oneTimeRevenue = currentMRR * (Math.random() * 0.4 + 0.2);
    const totalRevenue = currentMRR + oneTimeRevenue;

    customers += Math.floor((newMRR / 200) - (churnMRR / 200));
    const growthRate = i > 0 ? ((currentMRR - data[i - 1].mrr) / data[i - 1].mrr) * 100 : 0;

    data.push({
      month: monthName,
      totalRevenue: Math.round(totalRevenue),
      mrr: Math.round(currentMRR),
      recurringRevenue: Math.round(currentMRR),
      oneTimeRevenue: Math.round(oneTimeRevenue),
      newMRR: Math.round(newMRR),
      expansionMRR: Math.round(expansionMRR),
      churnMRR: Math.round(churnMRR),
      contractionMRR: Math.round(contractionMRR),
      netMRR: Math.round(netMRR),
      customers,
      growthRate: Number(growthRate.toFixed(2)),
    });
  }

  return data;
};

const productRevenueData: ProductRevenue[] = [
  { name: 'Membresía Elite', revenue: 18500, percentage: 35, customers: 45, arpu: 411, growth: 15.3, mrr: 18500, color: '#FFD700' },
  { name: 'Membresía Premium', revenue: 15800, percentage: 30, customers: 85, arpu: 186, growth: 12.1, mrr: 15800, color: '#10B981' },
  { name: 'Membresía Básica', revenue: 8200, percentage: 15, customers: 120, arpu: 68, growth: 8.5, mrr: 8200, color: '#3B82F6' },
  { name: 'Sesiones 1-on-1', revenue: 6500, percentage: 12, customers: 65, arpu: 100, growth: 22.8, color: '#8B5CF6' },
  { name: 'Productos Digital', revenue: 3200, percentage: 6, customers: 95, arpu: 34, growth: -3.2, color: '#F59E0B' },
  { name: 'Otros servicios', revenue: 1100, percentage: 2, customers: 28, arpu: 39, growth: 5.1, color: '#6B7280' },
];

const topCustomers: TopCustomer[] = [
  { id: '1', name: 'Carlos Mendoza', avatar: 'CM', totalRevenue: 8500, monthlyRevenue: 450, membership: 'Elite', monthsAsCustomer: 18, ltv: 9200 },
  { id: '2', name: 'Ana Rodríguez', avatar: 'AR', totalRevenue: 7200, monthlyRevenue: 450, membership: 'Elite', monthsAsCustomer: 16, ltv: 8100 },
  { id: '3', name: 'Luis García', avatar: 'LG', totalRevenue: 6800, monthlyRevenue: 450, membership: 'Elite', monthsAsCustomer: 15, ltv: 7650 },
  { id: '4', name: 'María Sánchez', avatar: 'MS', totalRevenue: 5200, monthlyRevenue: 299, membership: 'Premium', monthsAsCustomer: 17, ltv: 5950 },
  { id: '5', name: 'Pedro López', avatar: 'PL', totalRevenue: 4900, monthlyRevenue: 450, membership: 'Elite', monthsAsCustomer: 11, ltv: 5400 },
  { id: '6', name: 'Laura Martínez', avatar: 'LM', totalRevenue: 4500, monthlyRevenue: 299, membership: 'Premium', monthsAsCustomer: 15, ltv: 5100 },
  { id: '7', name: 'Jorge Díaz', avatar: 'JD', totalRevenue: 4200, monthlyRevenue: 299, membership: 'Premium', monthsAsCustomer: 14, ltv: 4800 },
  { id: '8', name: 'Carmen Ruiz', avatar: 'CR', totalRevenue: 3800, monthlyRevenue: 299, membership: 'Premium', monthsAsCustomer: 13, ltv: 4350 },
];

const distributionByChannel = [
  { name: 'Orgánico', value: 38, color: '#10B981' },
  { name: 'Publicidad', value: 28, color: '#3B82F6' },
  { name: 'Referidos', value: 22, color: '#8B5CF6' },
  { name: 'Directo', value: 12, color: '#F59E0B' },
];

const AnaliticaIngresosPage: React.FC = () => {
  const [period, setPeriod] = useState<Period>('12months');
  const [hoveredKPI, setHoveredKPI] = useState<string | null>(null);

  const revenueData = useMemo(() => generateRevenueData(), []);

  // Filtrar datos según período
  const filteredData = useMemo(() => {
    const periodMap = { month: 1, '3months': 3, '6months': 6, '12months': 12, fiscal: 12, custom: 12 };
    const months = periodMap[period];
    return revenueData.slice(-months);
  }, [period, revenueData]);

  // KPIs calculados
  const currentMonth = filteredData[filteredData.length - 1];
  const previousMonth = filteredData[filteredData.length - 2];

  const mrr = currentMonth?.mrr || 0;
  const arr = mrr * 12;
  const mrrChange = previousMonth ? ((mrr - previousMonth.mrr) / previousMonth.mrr) * 100 : 0;
  const mrrChangeAmount = previousMonth ? mrr - previousMonth.mrr : 0;

  const totalRevenue = filteredData.reduce((sum, d) => sum + d.totalRevenue, 0);
  const recurringRevenue = filteredData.reduce((sum, d) => sum + d.recurringRevenue, 0);
  const oneTimeRevenue = filteredData.reduce((sum, d) => sum + d.oneTimeRevenue, 0);

  const avgGrowthRate = filteredData.reduce((sum, d) => sum + d.growthRate, 0) / filteredData.length;

  const arpu = mrr / currentMonth.customers;
  const arpuChange = previousMonth ? ((arpu - (previousMonth.mrr / previousMonth.customers)) / (previousMonth.mrr / previousMonth.customers)) * 100 : 0;

  const churnRate = (currentMonth.churnMRR / previousMonth?.mrr) * 100;
  const churnImpact = currentMonth.churnMRR;

  // Quick Ratio
  const quickRatio = (currentMonth.newMRR + currentMonth.expansionMRR) / (currentMonth.churnMRR + currentMonth.contractionMRR);

  // Net Revenue Retention
  const nrr = ((previousMonth?.mrr || 0) + currentMonth.expansionMRR - currentMonth.churnMRR - currentMonth.contractionMRR) / (previousMonth?.mrr || 1) * 100;

  // Proyecciones
  const projections = useMemo(() => {
    const lastMRR = currentMonth.mrr;
    const avgGrowth = avgGrowthRate / 100;
    const monthlyChurn = churnRate / 100;

    return Array.from({ length: 12 }, (_, i) => {
      const month = new Date();
      month.setMonth(month.getMonth() + i + 1);
      const monthName = month.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });

      const realistic = lastMRR * Math.pow(1 + avgGrowth - monthlyChurn, i + 1);
      const optimistic = lastMRR * Math.pow(1 + avgGrowth * 1.3 - monthlyChurn * 0.7, i + 1);
      const pessimistic = lastMRR * Math.pow(1 + avgGrowth * 0.7 - monthlyChurn * 1.3, i + 1);

      return {
        month: monthName,
        realistic: Math.round(realistic),
        optimistic: Math.round(optimistic),
        pessimistic: Math.round(pessimistic),
      };
    });
  }, [currentMonth, avgGrowthRate, churnRate]);

  // Waterfall data para MRR movements
  const waterfallData = [
    { name: 'MRR Inicial', value: previousMonth?.mrr || 0, fill: '#9CA3AF' },
    { name: 'New MRR', value: currentMonth.newMRR, fill: '#10B981' },
    { name: 'Expansion', value: currentMonth.expansionMRR, fill: '#10B981' },
    { name: 'Churn', value: -currentMonth.churnMRR, fill: '#EF4444' },
    { name: 'Contraction', value: -currentMonth.contractionMRR, fill: '#EF4444' },
    { name: 'MRR Final', value: currentMonth.mrr, fill: '#3B82F6' },
  ];

  const formatCurrency = (value: number) => `€${value.toLocaleString()}`;
  const formatPercent = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-yellow-50 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="p-3 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl shadow-lg"
          >
            <DollarSign className="w-8 h-8 text-white" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-green-500 to-yellow-500 bg-clip-text text-transparent">
              Analítica de Ingresos
            </h1>
            <p className="text-gray-600 mt-1">Análisis completo de ingresos y proyecciones financieras</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-6">
          {/* Selector de período */}
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm px-4 py-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
              className="border-none bg-transparent focus:outline-none focus:ring-0 text-sm font-medium text-gray-700"
            >
              <option value="month">Este mes</option>
              <option value="3months">Últimos 3 meses</option>
              <option value="6months">Últimos 6 meses</option>
              <option value="12months">Últimos 12 meses</option>
              <option value="fiscal">Año fiscal</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>

          {/* Botones de acción */}
          <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-colors">
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Exportar Reporte</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-colors">
            <LineChart className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Proyecciones</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white rounded-lg shadow-md transition-all">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Configurar Objetivos</span>
          </button>
        </div>
      </motion.div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* MRR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onHoverStart={() => setHoveredKPI('mrr')}
          onHoverEnd={() => setHoveredKPI(null)}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">MRR (Monthly Recurring Revenue)</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(mrr)}</h3>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            {mrrChange >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-600" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm font-semibold ${mrrChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(mrrChange)}
            </span>
            <span className="text-sm text-gray-500">
              ({formatCurrency(mrrChangeAmount)}) vs mes anterior
            </span>
          </div>
          <div className="h-16">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={filteredData.slice(-6)}>
                <Line type="monotone" dataKey="mrr" stroke="#10B981" strokeWidth={2} dot={false} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ARR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onHoverStart={() => setHoveredKPI('arr')}
          onHoverEnd={() => setHoveredKPI(null)}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">ARR (Annual Recurring Revenue)</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(arr)}</h3>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-3">
            Proyección anual basada en MRR actual
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-green-50 rounded-lg p-3">
            <p className="text-xs text-gray-600">Proyección a 12 meses</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(projections[11].realistic)}</p>
          </div>
        </motion.div>

        {/* Ingresos Totales */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Ingresos Totales del Período</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(totalRevenue)}</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Recurrentes:</span>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(recurringRevenue)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">One-time:</span>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(oneTimeRevenue)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                style={{ width: `${(recurringRevenue / totalRevenue) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center">
              {((recurringRevenue / totalRevenue) * 100).toFixed(1)}% recurrentes
            </p>
          </div>
        </motion.div>

        {/* Tasa de Crecimiento */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Tasa de Crecimiento (MRR)</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{formatPercent(avgGrowthRate)}</h3>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">Objetivo: +15%</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                style={{ width: `${Math.min((avgGrowthRate / 15) * 100, 100)}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">
            {avgGrowthRate >= 15 ? '🎉 ¡Objetivo alcanzado!' : `Faltan ${(15 - avgGrowthRate).toFixed(1)}% para el objetivo`}
          </p>
        </motion.div>

        {/* ARPU */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">ARPU (Avg Revenue Per User)</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(Math.round(arpu))}</h3>
            </div>
            <div className="p-2 bg-cyan-100 rounded-lg">
              <Users className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            {arpuChange >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-green-600" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm font-semibold ${arpuChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(arpuChange)}
            </span>
            <span className="text-sm text-gray-500">vs mes anterior</span>
          </div>
          <div className="bg-cyan-50 rounded-lg p-3">
            <p className="text-xs text-gray-600">Clientes activos</p>
            <p className="text-lg font-bold text-gray-900">{currentMonth.customers}</p>
          </div>
        </motion.div>

        {/* Churn Rate */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Churn Rate Financiero</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{churnRate.toFixed(2)}%</h3>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mb-3">
            <p className="text-sm text-gray-600">Impacto en MRR:</p>
            <p className="text-lg font-bold text-red-600">-{formatCurrency(churnImpact)}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3">
            <p className="text-xs text-gray-600">Estado</p>
            <p className="text-sm font-semibold text-gray-900">
              {churnRate < 5 ? '✅ Excelente' : churnRate < 7 ? '⚠️ Aceptable' : '❌ Requiere atención'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Gráfico Principal de Ingresos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Evolución de Ingresos y MRR</h2>
            <p className="text-sm text-gray-600 mt-1">Análisis de ingresos totales y MRR en el tiempo</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm text-gray-600">Ingresos Totales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-600">MRR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
              <span className="text-sm text-gray-600">MRR Neto</span>
            </div>
          </div>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickFormatter={(value) => `${value.toFixed(0)}%`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value: any) => typeof value === 'number' && value < 100 ? `${value.toFixed(1)}%` : formatCurrency(value)}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="totalRevenue" fill="#3B82F6" name="Ingresos Totales" radius={[8, 8, 0, 0]} />
              <Line yAxisId="left" type="monotone" dataKey="mrr" stroke="#10B981" strokeWidth={3} name="MRR" dot={{ r: 4 }} />
              <Line yAxisId="left" type="monotone" dataKey="netMRR" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" name="MRR Neto" dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="growthRate" stroke="#F59E0B" strokeWidth={2} name="Crecimiento %" dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Desglose de Ingresos y MRR Movements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Desglose de Ingresos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Desglose de Ingresos por Categoría</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={filteredData.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  formatter={(value: any) => formatCurrency(value)}
                />
                <Legend />
                <Bar dataKey="recurringRevenue" stackId="a" fill="#10B981" name="Recurrentes" radius={[0, 0, 0, 0]} />
                <Bar dataKey="oneTimeRevenue" stackId="a" fill="#3B82F6" name="One-time" radius={[8, 8, 0, 0]} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* MRR Movements */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">MRR Movements (Waterfall)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={waterfallData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  formatter={(value: any) => formatCurrency(Math.abs(value))}
                />
                <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 8, 8]}>
                  {waterfallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Crecimiento Total</p>
              <p className="text-lg font-bold text-green-600">+{formatCurrency(currentMonth.newMRR + currentMonth.expansionMRR)}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-xs text-gray-600">Pérdida Total</p>
              <p className="text-lg font-bold text-red-600">-{formatCurrency(currentMonth.churnMRR + currentMonth.contractionMRR)}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Distribución de Ingresos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Por Producto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Distribución por Producto/Servicio</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={productRevenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="revenue"
                  label={(entry) => `${entry.name}: ${entry.percentage}%`}
                  labelLine={true}
                >
                  {productRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {productRevenueData.slice(0, 4).map((product) => (
              <div key={product.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }} />
                <span className="text-xs text-gray-600">{product.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Por Canal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Distribución por Canal de Adquisición</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={distributionByChannel}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  labelLine={true}
                >
                  {distributionByChannel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value}%`} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {distributionByChannel.map((channel) => (
              <div key={channel.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                <span className="text-xs text-gray-600">{channel.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tabla de Ingresos por Producto */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Ranking de Productos por Ingresos</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Producto/Servicio</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Ingresos</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">% Total</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Clientes</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">ARPU</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Crecimiento</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Tendencia</th>
                {productRevenueData.some(p => p.mrr) && (
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">MRR</th>
                )}
              </tr>
            </thead>
            <tbody>
              {productRevenueData.map((product, index) => (
                <motion.tr
                  key={product.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: product.color }} />
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">{formatCurrency(product.revenue)}</td>
                  <td className="text-right py-3 px-4 text-gray-600">{product.percentage}%</td>
                  <td className="text-right py-3 px-4 text-gray-600">{product.customers}</td>
                  <td className="text-right py-3 px-4 text-gray-600">{formatCurrency(product.arpu)}</td>
                  <td className="text-right py-3 px-4">
                    <span className={`font-semibold ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercent(product.growth)}
                    </span>
                  </td>
                  <td className="text-right py-3 px-4">
                    {product.growth >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-600 ml-auto" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600 ml-auto" />
                    )}
                  </td>
                  {product.mrr && (
                    <td className="text-right py-3 px-4 text-gray-600">{formatCurrency(product.mrr)}</td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Proyecciones Financieras */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Proyecciones Financieras (12 meses)</h2>
            <p className="text-sm text-gray-600 mt-1">Basado en tasa de crecimiento histórica y churn actual</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm text-gray-600">Optimista</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm text-gray-600">Realista</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm text-gray-600">Pesimista</span>
            </div>
          </div>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={[...filteredData.slice(-3), ...projections]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value: any) => formatCurrency(value)}
              />
              <Legend />
              <Line type="monotone" dataKey="mrr" stroke="#3B82F6" strokeWidth={3} name="MRR Histórico" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="realistic" stroke="#3B82F6" strokeWidth={3} strokeDasharray="5 5" name="Proyección Realista" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="optimistic" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name="Proyección Optimista" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="pessimistic" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" name="Proyección Pesimista" dot={{ r: 3 }} />
              <Area type="monotone" dataKey="optimistic" fill="#10B981" fillOpacity={0.1} />
              <Area type="monotone" dataKey="pessimistic" fill="#EF4444" fillOpacity={0.1} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Escenario Optimista</p>
            <p className="text-2xl font-bold text-green-600">{formatCurrency(projections[11].optimistic)}</p>
            <p className="text-xs text-gray-500 mt-1">+{((projections[11].optimistic / mrr - 1) * 100).toFixed(1)}% en 12 meses</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Escenario Realista</p>
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(projections[11].realistic)}</p>
            <p className="text-xs text-gray-500 mt-1">+{((projections[11].realistic / mrr - 1) * 100).toFixed(1)}% en 12 meses</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Escenario Pesimista</p>
            <p className="text-2xl font-bold text-red-600">{formatCurrency(projections[11].pessimistic)}</p>
            <p className="text-xs text-gray-500 mt-1">+{((projections[11].pessimistic / mrr - 1) * 100).toFixed(1)}% en 12 meses</p>
          </div>
        </div>
      </motion.div>

      {/* Métricas de Salud Financiera */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Métricas de Salud Financiera</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quick Ratio */}
          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600 font-medium">Quick Ratio</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{quickRatio.toFixed(2)}</h3>
              </div>
              <div className={`p-2 rounded-lg ${quickRatio > 4 ? 'bg-green-100' : quickRatio > 2 ? 'bg-yellow-100' : 'bg-red-100'}`}>
                <Zap className={`w-5 h-5 ${quickRatio > 4 ? 'text-green-600' : quickRatio > 2 ? 'text-yellow-600' : 'text-red-600'}`} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-2">Ideal: {'>'} 4.0</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${quickRatio > 4 ? 'bg-green-500' : quickRatio > 2 ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min((quickRatio / 8) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {quickRatio > 4 ? '✅ Excelente' : quickRatio > 2 ? '⚠️ Aceptable' : '❌ Necesita mejora'}
            </p>
          </div>

          {/* NRR */}
          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600 font-medium">Net Revenue Retention</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{nrr.toFixed(1)}%</h3>
              </div>
              <div className={`p-2 rounded-lg ${nrr > 100 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <Activity className={`w-5 h-5 ${nrr > 100 ? 'text-green-600' : 'text-yellow-600'}`} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-2">Ideal: {'>'} 100%</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${nrr > 100 ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: `${Math.min((nrr / 120) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {nrr > 110 ? '✅ Excelente' : nrr > 100 ? '✅ Bueno' : '⚠️ Necesita mejora'}
            </p>
          </div>

          {/* MRR Churn Rate */}
          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600 font-medium">MRR Churn Rate</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{churnRate.toFixed(2)}%</h3>
              </div>
              <div className={`p-2 rounded-lg ${churnRate < 5 ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <TrendingDown className={`w-5 h-5 ${churnRate < 5 ? 'text-green-600' : 'text-yellow-600'}`} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-2">Objetivo: {'<'} 5%</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${churnRate < 5 ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: `${Math.min((churnRate / 10) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {churnRate < 5 ? '✅ Excelente' : churnRate < 7 ? '⚠️ Aceptable' : '❌ Alto'}
            </p>
          </div>

          {/* CAC Payback */}
          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-600 font-medium">CAC Payback Period</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">8.5 <span className="text-lg text-gray-600">meses</span></h3>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-2">Ideal: {'<'} 12 meses</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="h-2 rounded-full bg-green-500" style={{ width: '70%' }} />
            </div>
            <p className="text-xs text-gray-600 mt-2">✅ Excelente recuperación</p>
          </div>
        </div>
      </motion.div>

      {/* Top Clientes por Ingresos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Clientes por Ingresos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-yellow-500 rounded-full text-white font-bold">
                {customer.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                <p className="text-sm text-gray-600">{customer.membership}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{formatCurrency(customer.totalRevenue)}</p>
                <p className="text-xs text-gray-600">{formatCurrency(customer.monthlyRevenue)}/mes</p>
                <p className="text-xs text-gray-500 mt-1">{customer.monthsAsCustomer} meses</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowUpRight className="w-4 h-4 text-gray-600" />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Análisis de Expansión */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Análisis de Expansión (Upsell/Cross-sell)</h2>
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Expansion MRR del mes</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(currentMonth.expansionMRR)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600">Clientes expandidos</p>
                <p className="text-xl font-bold text-blue-600">{Math.floor(currentMonth.expansionMRR / 150)}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-xs text-gray-600">Tasa de expansión</p>
                <p className="text-xl font-bold text-purple-600">{((currentMonth.expansionMRR / previousMonth.mrr) * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={filteredData.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Line type="monotone" dataKey="expansionMRR" stroke="#10B981" strokeWidth={3} name="Expansion MRR" dot={{ r: 4 }} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Análisis de Churned Revenue</h2>
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">MRR perdido por churn</p>
                <p className="text-2xl font-bold text-red-600">-{formatCurrency(currentMonth.churnMRR)}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-xs text-gray-600">Churn MRR</p>
                <p className="text-xl font-bold text-orange-600">{formatCurrency(currentMonth.churnMRR)}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-xs text-gray-600">Contraction MRR</p>
                <p className="text-xl font-bold text-yellow-600">{formatCurrency(currentMonth.contractionMRR)}</p>
              </div>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={filteredData.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Line type="monotone" dataKey="churnMRR" stroke="#EF4444" strokeWidth={3} name="Churn MRR" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="contractionMRR" stroke="#F59E0B" strokeWidth={2} name="Contraction MRR" dot={{ r: 3 }} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Footer con estadísticas adicionales */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-green-600 to-yellow-600 rounded-xl shadow-lg p-6 text-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-green-100 text-sm mb-1">Total Ingresos Período</p>
            <p className="text-3xl font-bold">{formatCurrency(totalRevenue)}</p>
          </div>
          <div>
            <p className="text-green-100 text-sm mb-1">Clientes Activos</p>
            <p className="text-3xl font-bold">{currentMonth.customers}</p>
          </div>
          <div>
            <p className="text-green-100 text-sm mb-1">Crecimiento Promedio</p>
            <p className="text-3xl font-bold">{formatPercent(avgGrowthRate)}</p>
          </div>
          <div>
            <p className="text-green-100 text-sm mb-1">ARR Proyectado</p>
            <p className="text-3xl font-bold">{formatCurrency(arr)}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnaliticaIngresosPage;