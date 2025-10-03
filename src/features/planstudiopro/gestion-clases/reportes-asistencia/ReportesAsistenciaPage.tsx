import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Users, TrendingUp, TrendingDown, Calendar, Filter,
  Download, Clock, Target, UserX, UserPlus, CheckCircle,
  Activity, Zap, Award, Map, ArrowUpRight, ArrowDownRight,
  DollarSign, Percent, AlertCircle, Star, ChevronDown
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie,
  Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

// Mock data generation
const generateMockData = () => {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm'];
  const classTypes = ['CrossFit', 'Yoga', 'Spinning', 'Funcional', 'Pilates', 'Boxing'];
  const coaches = [
    { name: 'Carlos Ruiz', avatar: 'CR', rating: 4.9 },
    { name: 'María López', avatar: 'ML', rating: 4.8 },
    { name: 'Juan Pérez', avatar: 'JP', rating: 4.7 },
    { name: 'Ana García', avatar: 'AG', rating: 4.9 },
    { name: 'Pedro Sánchez', avatar: 'PS', rating: 4.6 }
  ];

  // Asistencia mensual
  const monthlyData = months.map((month, idx) => ({
    month,
    asistencias: 1200 + Math.random() * 800 + idx * 150,
    capacidad: 2000,
    anterior: 1100 + Math.random() * 700 + idx * 140
  }));

  // Asistencia por tipo de clase
  const classByType = classTypes.map(type => ({
    name: type,
    value: Math.floor(Math.random() * 300 + 200),
    clases: Math.floor(Math.random() * 20 + 10),
    ocupacion: Math.floor(Math.random() * 30 + 65)
  }));

  // Heatmap por día y hora
  const heatmapData = days.map(day => ({
    day,
    ...hours.reduce((acc, hour) => ({
      ...acc,
      [hour]: Math.floor(Math.random() * 20 + 5)
    }), {})
  }));

  // Asistencia por día de semana
  const weeklyData = days.map(day => ({
    day,
    asistencias: Math.floor(Math.random() * 200 + 150)
  }));

  // Ranking de coaches
  const coachRanking = coaches.map((coach, idx) => ({
    ...coach,
    classes: Math.floor(Math.random() * 30 + 20),
    totalAttendance: Math.floor(Math.random() * 400 + 300),
    avgPerClass: Math.floor(Math.random() * 8 + 12),
    occupancy: Math.floor(Math.random() * 20 + 75)
  })).sort((a, b) => b.totalAttendance - a.totalAttendance);

  // Salas
  const roomsData = [
    { name: 'Sala 1', classes: 45, attendance: 680, occupancy: 85 },
    { name: 'Sala 2', classes: 38, attendance: 520, occupancy: 78 },
    { name: 'Área Funcional', classes: 32, attendance: 450, occupancy: 82 },
    { name: 'Sala Yoga', classes: 28, attendance: 380, occupancy: 90 }
  ];

  return {
    monthlyData,
    classByType,
    heatmapData,
    weeklyData,
    coachRanking,
    roomsData,
    totalAttendance: 8542,
    avgDaily: 142,
    occupancyRate: 82,
    noShows: 127,
    noShowsPercent: 8.5,
    walkIns: 89,
    fullClasses: 34
  };
};

type PeriodType = 'today' | 'week' | 'month' | '30days' | '3months' | 'year' | 'custom';
type ChartType = 'line' | 'bar' | 'area';

const ReportesAsistenciaPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('month');
  const [compareWithPrevious, setCompareWithPrevious] = useState(true);
  const [chartType, setChartType] = useState<ChartType>('line');
  const [selectedFilters, setSelectedFilters] = useState({
    classType: 'all',
    coach: 'all',
    room: 'all',
    timeOfDay: 'all'
  });

  const mockData = useMemo(() => generateMockData(), []);

  const periods = [
    { id: 'today', label: 'Hoy' },
    { id: 'week', label: 'Esta semana' },
    { id: 'month', label: 'Este mes' },
    { id: '30days', label: 'Últimos 30 días' },
    { id: '3months', label: 'Últimos 3 meses' },
    { id: 'year', label: 'Este año' },
    { id: 'custom', label: 'Custom' }
  ];

  const metrics = [
    {
      title: 'Total Asistencias',
      value: mockData.totalAttendance.toLocaleString(),
      change: +12.5,
      icon: Users,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Promedio Diario',
      value: mockData.avgDaily,
      change: +8.2,
      icon: TrendingUp,
      color: 'from-teal-500 to-cyan-600'
    },
    {
      title: 'Tasa Ocupación',
      value: `${mockData.occupancyRate}%`,
      change: +5.3,
      icon: Target,
      color: 'from-emerald-500 to-green-600'
    },
    {
      title: 'No-Shows',
      value: `${mockData.noShows} (${mockData.noShowsPercent}%)`,
      change: -2.1,
      icon: UserX,
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Walk-ins',
      value: mockData.walkIns,
      change: +15.7,
      icon: UserPlus,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Clases Llenas',
      value: mockData.fullClasses,
      change: +18.4,
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const COLORS = ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-emerald-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <BarChart3 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Reportes de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Asistencia</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl leading-relaxed">
            Analiza patrones y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">optimiza tu oferta</span> de clases
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Analytics Avanzado</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Tiempo Real</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SELECTOR DE PERÍODO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Quick filters */}
          <div className="flex-1">
            <label className="text-sm font-bold text-gray-600 mb-3 block uppercase tracking-wide">Período de tiempo</label>
            <div className="flex flex-wrap gap-2">
              {periods.map(period => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id as PeriodType)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                    selectedPeriod === period.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {/* Compare toggle */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl px-4 py-3 border border-green-200">
            <input
              type="checkbox"
              id="compare"
              checked={compareWithPrevious}
              onChange={(e) => setCompareWithPrevious(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded"
            />
            <label htmlFor="compare" className="text-sm font-semibold text-green-700 cursor-pointer">
              Comparar con período anterior
            </label>
          </div>
        </div>
      </motion.div>

      {/* MÉTRICAS PRINCIPALES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${metric.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <metric.icon className="w-7 h-7" />
              </div>

              {/* Título */}
              <p className="text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {metric.title}
              </p>

              {/* Valor */}
              <p className="text-2xl xl:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {metric.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className={`p-1 ${metric.change > 0 ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                  {metric.change > 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <span className={`text-sm font-bold ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GRÁFICO DE ASISTENCIA PRINCIPAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Activity className="w-6 h-6" />
              </div>
              Tendencia de Asistencia
            </h3>

            {/* Chart type selector */}
            <div className="flex gap-2 bg-white/20 backdrop-blur-sm rounded-xl p-1">
              {(['line', 'bar', 'area'] as ChartType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    chartType === type
                      ? 'bg-white text-emerald-600 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  {type === 'line' ? 'Líneas' : type === 'bar' ? 'Barras' : 'Área'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-6">
          <ResponsiveContainer width="100%" height={400}>
            {chartType === 'line' ? (
              <LineChart data={mockData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="asistencias" stroke="#10b981" strokeWidth={3} name="Asistencias" dot={{ fill: '#10b981', r: 6 }} />
                <Line type="monotone" dataKey="capacidad" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="Capacidad" />
                {compareWithPrevious && (
                  <Line type="monotone" dataKey="anterior" stroke="#f59e0b" strokeWidth={2} strokeDasharray="3 3" name="Período Anterior" />
                )}
              </LineChart>
            ) : chartType === 'bar' ? (
              <BarChart data={mockData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="asistencias" fill="#10b981" radius={[8, 8, 0, 0]} name="Asistencias" />
                {compareWithPrevious && (
                  <Bar dataKey="anterior" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Período Anterior" />
                )}
              </BarChart>
            ) : (
              <AreaChart data={mockData.monthlyData}>
                <defs>
                  <linearGradient id="colorAsistencias" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="asistencias" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAsistencias)" name="Asistencias" />
              </AreaChart>
            )}
          </ResponsiveContainer>

          {/* Export button */}
          <div className="mt-6 flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              <Download className="w-4 h-4" />
              Exportar Gráfico
            </button>
          </div>
        </div>
      </motion.div>

      {/* Grid de análisis - Tipo de Clase y Horarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* ASISTENCIA POR TIPO DE CLASE */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Target className="w-6 h-6" />
              </div>
              Asistencia por Tipo de Clase
            </h3>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockData.classByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.classByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Tabla complementaria */}
            <div className="space-y-3">
              {mockData.classByType.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-green-50 hover:to-emerald-50 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="font-semibold text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">{item.clases} clases</span>
                    <span className="font-bold text-green-600">{item.value} asist.</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg font-semibold">{item.ocupacion}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ASISTENCIA POR DÍA DE SEMANA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Calendar className="w-6 h-6" />
              </div>
              Asistencia por Día de Semana
            </h3>
          </div>

          <div className="p-6">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={mockData.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="asistencias" radius={[8, 8, 0, 0]}>
                  {mockData.weeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            {/* Best/Worst day indicators */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">Mejor Día</p>
                <p className="text-2xl font-bold text-green-700">Viernes</p>
                <p className="text-sm text-green-600 font-semibold">avg. 185 asist.</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">Menor Día</p>
                <p className="text-2xl font-bold text-orange-700">Domingo</p>
                <p className="text-sm text-orange-600 font-semibold">avg. 142 asist.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* HEATMAP POR HORARIO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Clock className="w-6 h-6" />
            </div>
            Mapa de Calor: Asistencia por Día y Hora
          </h3>
          <p className="text-pink-100 mt-2">Identifica los horarios con mayor demanda</p>
        </div>

        <div className="p-6">
          {/* Simplified heatmap visualization */}
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="grid grid-cols-[100px_repeat(17,1fr)] gap-1">
                {/* Header */}
                <div></div>
                {['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm'].map(hour => (
                  <div key={hour} className="text-xs font-bold text-gray-600 text-center py-2">{hour}</div>
                ))}

                {/* Rows */}
                {mockData.heatmapData.map((dayData, dayIdx) => (
                  <React.Fragment key={dayData.day}>
                    <div className="flex items-center font-bold text-sm text-gray-700 py-2">{dayData.day}</div>
                    {Object.entries(dayData).filter(([key]) => key !== 'day').map(([hour, value], idx) => {
                      const intensity = (value as number) / 25;
                      return (
                        <div
                          key={idx}
                          className="aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 hover:scale-110 cursor-pointer"
                          style={{
                            backgroundColor: `rgba(16, 185, 129, ${Math.min(intensity, 1)})`,
                            color: intensity > 0.5 ? 'white' : '#374151'
                          }}
                          title={`${dayData.day} ${hour}: ${value} asistencias`}
                        >
                          {value}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="text-sm font-semibold text-gray-600">Intensidad:</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-100"></div>
              <span className="text-xs text-gray-500">Baja</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-300"></div>
              <span className="text-xs text-gray-500">Media</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-500"></div>
              <span className="text-xs text-gray-500">Alta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-700"></div>
              <span className="text-xs text-gray-500">Muy Alta</span>
            </div>
          </div>

          {/* Insights */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-1">Horario Pico</p>
              <p className="text-xl font-bold text-green-700">6pm - 8pm</p>
              <p className="text-sm text-green-600">Lunes a Viernes</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Segundo Pico</p>
              <p className="text-xl font-bold text-blue-700">8am - 10am</p>
              <p className="text-sm text-blue-600">Fines de Semana</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-200">
              <p className="text-xs font-bold text-orange-600 uppercase tracking-wide mb-1">Oportunidad</p>
              <p className="text-xl font-bold text-orange-700">2pm - 4pm</p>
              <p className="text-sm text-orange-600">Baja ocupación</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RANKING DE COACHES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Award className="w-6 h-6" />
            </div>
            Ranking de Coaches
          </h3>
          <p className="text-orange-100 mt-2">Top performers del período</p>
        </div>

        <div className="p-6">
          {/* Podio - Top 3 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {mockData.coachRanking.slice(0, 3).map((coach, index) => {
              const podiumColors = [
                'from-yellow-400 to-yellow-600',
                'from-gray-300 to-gray-500',
                'from-orange-400 to-orange-600'
              ];
              const podiumHeights = ['h-32', 'h-24', 'h-20'];
              const positions = [1, 0, 2];
              const actualPosition = positions[index];
              const actualCoach = mockData.coachRanking[actualPosition];

              return (
                <div key={actualPosition} className="flex flex-col items-center">
                  <div className="relative mb-3">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${podiumColors[actualPosition]} flex items-center justify-center text-white text-2xl font-bold shadow-xl`}>
                      {actualCoach.avatar}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
                      <span className="text-sm font-bold text-gray-700">#{actualPosition + 1}</span>
                    </div>
                  </div>
                  <p className="font-bold text-gray-800 text-center mb-1">{actualCoach.name}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-600">{actualCoach.rating}</span>
                  </div>
                  <div className={`w-full ${podiumHeights[actualPosition]} bg-gradient-to-t ${podiumColors[actualPosition]} rounded-t-2xl flex flex-col items-center justify-center text-white`}>
                    <p className="text-2xl font-bold">{actualCoach.totalAttendance}</p>
                    <p className="text-xs opacity-90">asistencias</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tabla completa */}
          <div className="space-y-3">
            {mockData.coachRanking.map((coach, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                  index < 3
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200'
                    : 'bg-gray-50 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                    {coach.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{coach.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{coach.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Clases</p>
                    <p className="font-bold text-gray-700">{coach.classes}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Asist.</p>
                    <p className="font-bold text-green-600">{coach.totalAttendance}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Prom/Clase</p>
                    <p className="font-bold text-gray-700">{coach.avgPerClass}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Ocupación</p>
                    <p className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold">{coach.occupancy}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Grid de análisis adicionales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* ASISTENCIA POR SALA */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Map className="w-6 h-6" />
              </div>
              Asistencia por Sala/Área
            </h3>
          </div>

          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockData.roomsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="name" type="category" stroke="#6b7280" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="attendance" fill="#10b981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 space-y-3">
              {mockData.roomsData.map((room, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">{room.name}</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-sm">{room.occupancy}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-1000"
                      style={{ width: `${room.occupancy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* TENDENCIAS Y PATRONES */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              Tendencias y Patrones
            </h3>
          </div>

          <div className="p-6 space-y-4">
            {/* Crecimiento */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-green-700">Crecimiento General</h4>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-2xl font-bold">+12.5%</span>
                </div>
              </div>
              <p className="text-sm text-green-600 mb-2">vs mes anterior</p>
              <div className="w-full bg-green-200 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '78%' }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                ></motion.div>
              </div>
              <p className="text-xs text-green-600 mt-2">Proyección próximo mes: +8.3%</p>
            </div>

            {/* Estacionalidad */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <h4 className="font-bold text-blue-700 mb-3">Estacionalidad</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-blue-600 mb-1">Meses de Alta</p>
                  <p className="font-bold text-blue-700">Ene, Mar, Sep</p>
                </div>
                <div>
                  <p className="text-xs text-blue-600 mb-1">Meses de Baja</p>
                  <p className="font-bold text-blue-700">Jul, Ago, Dic</p>
                </div>
              </div>
            </div>

            {/* Recomendaciones */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <h4 className="font-bold text-purple-700 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Recomendaciones
              </h4>
              <ul className="space-y-2 text-sm text-purple-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Agregar más clases de CrossFit los viernes 6-8pm</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Promocionar horarios 2-4pm con descuentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Considerar expansión de Sala 1 (85% ocupación)</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grid de análisis - No-shows, Walk-ins, Clases Llenas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* ANÁLISIS DE NO-SHOWS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <UserX className="w-5 h-5" />
              </div>
              No-Shows
            </h3>
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-red-600 mb-2">{mockData.noShows}</p>
              <p className="text-sm text-gray-600">inasistencias</p>
              <div className="mt-3 inline-block px-4 py-2 bg-red-50 text-red-600 rounded-full font-semibold">
                {mockData.noShowsPercent}% de reservas
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-xl">
                <p className="text-xs font-bold text-red-600 uppercase mb-1">Top Clase</p>
                <p className="font-semibold text-gray-700">Spinning 7pm</p>
                <p className="text-sm text-gray-600">15 no-shows</p>
              </div>

              <div className="p-3 bg-orange-50 rounded-xl">
                <p className="text-xs font-bold text-orange-600 uppercase mb-1">Patrón</p>
                <p className="text-sm text-gray-700">Lunes y Viernes tardes</p>
              </div>

              <div className="p-3 bg-yellow-50 rounded-xl">
                <p className="text-xs font-bold text-yellow-600 uppercase mb-1">Estrategia</p>
                <p className="text-sm text-gray-700">Implementar recordatorios 2h antes</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ANÁLISIS DE WALK-INS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <UserPlus className="w-5 h-5" />
              </div>
              Walk-ins
            </h3>
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-blue-600 mb-2">{mockData.walkIns}</p>
              <p className="text-sm text-gray-600">llegadas sin reserva</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="font-bold text-green-600">+15.7%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-xl">
                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Tendencia</p>
                <p className="text-sm text-gray-700">Aumentando gradualmente</p>
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl">
                <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Horario Frecuente</p>
                <p className="font-semibold text-gray-700">Sábados 9-11am</p>
              </div>

              <div className="p-3 bg-green-50 rounded-xl">
                <p className="text-xs font-bold text-green-600 uppercase mb-1">Impacto</p>
                <p className="text-sm text-gray-700">Ingresos extra: $2,670</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CLASES LLENAS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <CheckCircle className="w-5 h-5" />
              </div>
              Clases Llenas
            </h3>
          </div>

          <div className="p-6">
            <div className="text-center mb-6">
              <p className="text-5xl font-bold text-purple-600 mb-2">{mockData.fullClasses}</p>
              <p className="text-sm text-gray-600">clases a capacidad máxima</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
                <span className="font-bold text-green-600">+18.4%</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-xl">
                <p className="text-xs font-bold text-purple-600 uppercase mb-1">Más Demandado</p>
                <p className="font-semibold text-gray-700">CrossFit 6pm</p>
                <p className="text-sm text-gray-600">Lista de espera: avg. 8</p>
              </div>

              <div className="p-3 bg-pink-50 rounded-xl">
                <p className="text-xs font-bold text-pink-600 uppercase mb-1">Oportunidad</p>
                <p className="text-sm text-gray-700">Agregar clase adicional 7pm</p>
              </div>

              <div className="p-3 bg-indigo-50 rounded-xl">
                <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Potencial</p>
                <p className="text-sm text-gray-700">+$4,500/mes estimado</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FILTROS AVANZADOS Y EXPORTACIÓN */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Filter className="w-6 h-6" />
              </div>
              Filtros Avanzados
            </h3>

            <button className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
              <Download className="w-5 h-5" />
              Exportar Reporte
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Tipo de Clase */}
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 block">Tipo de Clase</label>
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white appearance-none">
                  <option value="all">Todas</option>
                  <option value="crossfit">CrossFit</option>
                  <option value="yoga">Yoga</option>
                  <option value="spinning">Spinning</option>
                  <option value="funcional">Funcional</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Coach */}
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 block">Coach</label>
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white appearance-none">
                  <option value="all">Todos</option>
                  {mockData.coachRanking.map((coach, idx) => (
                    <option key={idx} value={coach.name}>{coach.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Sala */}
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 block">Sala/Área</label>
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white appearance-none">
                  <option value="all">Todas</option>
                  {mockData.roomsData.map((room, idx) => (
                    <option key={idx} value={room.name}>{room.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Horario */}
            <div>
              <label className="text-sm font-bold text-gray-600 mb-2 block">Horario</label>
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white appearance-none">
                  <option value="all">Todo el día</option>
                  <option value="morning">Mañana (6am-12pm)</option>
                  <option value="afternoon">Tarde (12pm-6pm)</option>
                  <option value="evening">Noche (6pm-10pm)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Opciones de exportación */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-bold text-gray-700 mb-4">Opciones de Exportación</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300">
                <Download className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-red-700">PDF</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300">
                <Download className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-700">Excel</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <Download className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-700">CSV</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                <Download className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-orange-700">PowerPoint</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportesAsistenciaPage;
