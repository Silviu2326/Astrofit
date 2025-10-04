import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign, TrendingUp, TrendingDown, Target, AlertCircle,
  FileText, Download, Calendar, PieChart, BarChart3, LineChart,
  Lightbulb, Zap, Shield, ArrowUpRight, ArrowDownRight, Users,
  CreditCard, Sparkles, ChevronDown, Filter, Calculator,
  Activity, Wallet, Receipt, Clock, CheckCircle2, XCircle
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

const AgenteFinancieroPage: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'semanal' | 'mensual' | 'trimestral' | 'anual'>('mensual');
  const [selectedScenario, setSelectedScenario] = useState('actual');
  const [sliderValues, setSliderValues] = useState({
    precioAumento: 0,
    nuevoEntrenador: 0,
    metaFacturacion: 50000
  });

  // Datos mockeados - Estadísticas rápidas
  const quickStats = [
    {
      title: 'Ingresos del Mes',
      value: '€45,230',
      change: '+18.2%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-green-500 to-emerald-500',
      progress: 85
    },
    {
      title: 'Margen de Ganancia',
      value: '67%',
      change: '+5.3%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-500',
      progress: 67
    },
    {
      title: 'Proyección Trimestre',
      value: '€138,450',
      change: '+22.1%',
      trend: 'up',
      icon: Target,
      gradient: 'from-teal-500 to-cyan-500',
      progress: 92
    },
    {
      title: 'Salud Financiera',
      value: '8.9/10',
      change: '+0.8',
      trend: 'up',
      icon: Shield,
      gradient: 'from-green-600 to-emerald-600',
      progress: 89
    }
  ];

  // Datos mockeados - Histórico 12 meses
  const historicoFinanciero = [
    { mes: 'Ene', ingresos: 32500, gastos: 18200, ganancia: 14300 },
    { mes: 'Feb', ingresos: 35200, gastos: 19100, ganancia: 16100 },
    { mes: 'Mar', ingresos: 38900, gastos: 19800, ganancia: 19100 },
    { mes: 'Abr', ingresos: 36700, gastos: 18900, ganancia: 17800 },
    { mes: 'May', ingresos: 39800, gastos: 20100, ganancia: 19700 },
    { mes: 'Jun', ingresos: 42300, gastos: 20500, ganancia: 21800 },
    { mes: 'Jul', ingresos: 41200, gastos: 19900, ganancia: 21300 },
    { mes: 'Ago', ingresos: 38500, gastos: 18700, ganancia: 19800 },
    { mes: 'Sep', ingresos: 43100, gastos: 21200, ganancia: 21900 },
    { mes: 'Oct', ingresos: 44600, gastos: 21800, ganancia: 22800 },
    { mes: 'Nov', ingresos: 45230, gastos: 22100, ganancia: 23130 },
    { mes: 'Dic', ingresos: 47800, gastos: 23200, ganancia: 24600 }
  ];

  // Datos mockeados - Proyecciones
  const proyecciones = [
    { mes: 'Actual', real: 45230, optimista: 45230, realista: 45230, pesimista: 45230 },
    { mes: '+30d', optimista: 52000, realista: 48500, pesimista: 43000 },
    { mes: '+60d', optimista: 56800, realista: 51200, pesimista: 45800 },
    { mes: '+90d', optimista: 61500, realista: 54800, pesimista: 48200 }
  ];

  // Datos mockeados - Rentabilidad por servicio
  const rentabilidadServicios = [
    { servicio: 'Entrenamiento Personal', ingresos: 18500, margen: 72, recomendacion: 'Aumentar precio 8%' },
    { servicio: 'Planes Nutricionales', ingresos: 8900, margen: 85, recomendacion: 'Precio óptimo' },
    { servicio: 'Membresías', ingresos: 12300, margen: 65, recomendacion: 'Aumentar precio 10%' },
    { servicio: 'Clases Grupales', ingresos: 5530, margen: 58, recomendacion: 'Optimizar ocupación' }
  ];

  // Datos mockeados - Oportunidades detectadas
  const oportunidades = [
    {
      titulo: 'Aumentar precio de membresías 10%',
      descripcion: 'El análisis de mercado sugiere que tus precios están 12% por debajo del promedio',
      impacto: '+€1,230',
      tipo: 'precio',
      prioridad: 'alta'
    },
    {
      titulo: '3 clientes candidatos para upgrade',
      descripcion: 'Clientes con alto engagement que podrían pasar a plan premium',
      impacto: '+€890',
      tipo: 'upsell',
      prioridad: 'alta'
    },
    {
      titulo: 'Mes ideal para promoción de captación',
      descripcion: 'Enero muestra 35% más conversión basado en histórico',
      impacto: '+€2,100',
      tipo: 'marketing',
      prioridad: 'media'
    },
    {
      titulo: 'Reduce 15% gastos en software',
      descripcion: 'Herramientas con baja utilización o funcionalidad duplicada',
      impacto: '+€340',
      tipo: 'ahorro',
      prioridad: 'media'
    }
  ];

  // Datos mockeados - Distribución de gastos
  const distribucionGastos = [
    { categoria: 'Marketing', valor: 4200, color: '#6366f1' },
    { categoria: 'Equipamiento', valor: 5800, color: '#8b5cf6' },
    { categoria: 'Software', valor: 2300, color: '#ec4899' },
    { categoria: 'Alquiler', valor: 8500, color: '#14b8a6' },
    { categoria: 'Otros', valor: 1300, color: '#f59e0b' }
  ];

  // Datos mockeados - LTV por segmento
  const ltvSegmentos = [
    { segmento: 'Premium', ltv: 2850, clientes: 12, color: '#10b981' },
    { segmento: 'Estándar', ltv: 1680, clientes: 34, color: '#3b82f6' },
    { segmento: 'Básico', ltv: 890, clientes: 28, color: '#f59e0b' }
  ];

  // Datos mockeados - Clientes en riesgo
  const clientesRiesgo = [
    { nombre: 'Ana García', ltv: 1200, riesgo: 78, accion: 'Contactar esta semana' },
    { nombre: 'Carlos Ruiz', ltv: 980, riesgo: 65, accion: 'Ofrecer descuento' },
    { nombre: 'María López', ltv: 1450, riesgo: 54, accion: 'Encuesta satisfacción' }
  ];

  // Datos mockeados - Alertas
  const alertas = [
    { tipo: 'warning', mensaje: 'Ingreso del día 20% bajo lo esperado', tiempo: 'Hace 2h' },
    { tipo: 'success', mensaje: 'Mes récord: +35% vs mes pasado', tiempo: 'Hoy' },
    { tipo: 'error', mensaje: 'Gasto en marketing superó presupuesto', tiempo: 'Hace 5h' }
  ];

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-50 border-red-200 text-red-700';
      case 'media': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      default: return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const getAlertaIcon = (tipo: string) => {
    switch (tipo) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

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

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <DollarSign className="w-12 h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Agente <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Financiero</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-green-100 max-w-3xl leading-relaxed mb-6">
            Análisis inteligente de tu <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">negocio fitness</span>
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Proyecciones IA</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Lightbulb className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Oportunidades Detectadas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Shield className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Salud Financiera</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <div className={`p-1 ${stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <span className={`text-sm font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>

              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DASHBOARD FINANCIERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <LineChart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Dashboard Financiero</h3>
            </div>

            <div className="flex gap-2">
              {(['semanal', 'mensual', 'trimestral', 'anual'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    timeFilter === filter
                      ? 'bg-white text-green-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8">
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart data={historicoFinanciero}>
              <defs>
                <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="ganancia"
                fill="url(#colorIngresos)"
                stroke="#10b981"
                strokeWidth={0}
                name="Ganancia"
              />
              <Line
                type="monotone"
                dataKey="ingresos"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 4 }}
                name="Ingresos"
              />
              <Line
                type="monotone"
                dataKey="gastos"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 4 }}
                strokeDasharray="5 5"
                name="Gastos"
              />
            </ComposedChart>
          </ResponsiveContainer>

          <div className="mt-6 flex justify-center">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
              <Download className="w-5 h-5" />
              Exportar Datos
            </button>
          </div>
        </div>
      </motion.div>

      {/* PROYECCIONES DE IA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Proyecciones de IA</h3>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <p className="text-sm font-semibold text-green-700 mb-1">Próximos 30 días</p>
              <p className="text-2xl font-bold text-green-900">€48,500</p>
              <p className="text-xs text-green-600 mt-1">Confianza: 85%</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <p className="text-sm font-semibold text-blue-700 mb-1">Próximos 60 días</p>
              <p className="text-2xl font-bold text-blue-900">€51,200</p>
              <p className="text-xs text-blue-600 mt-1">Confianza: 78%</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <p className="text-sm font-semibold text-purple-700 mb-1">Próximos 90 días</p>
              <p className="text-2xl font-bold text-purple-900">€54,800</p>
              <p className="text-xs text-purple-600 mt-1">Confianza: 72%</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={proyecciones}>
              <defs>
                <linearGradient id="colorOptimista" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRealista" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPesimista" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.5)'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="optimista" stroke="#10b981" fill="url(#colorOptimista)" name="Optimista" />
              <Area type="monotone" dataKey="realista" stroke="#3b82f6" fill="url(#colorRealista)" name="Realista" />
              <Area type="monotone" dataKey="pesimista" stroke="#ef4444" fill="url(#colorPesimista)" name="Pesimista" />
            </AreaChart>
          </ResponsiveContainer>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">Tendencia: Creciente</p>
                <p className="text-sm text-blue-700">El modelo predice un crecimiento sostenido del 13% en los próximos 90 días basado en tendencias actuales y estacionalidad histórica.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ANÁLISIS DE RENTABILIDAD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Análisis de Rentabilidad</h3>
          </div>
        </div>

        <div className="p-8">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rentabilidadServicios}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="servicio" stroke="#6b7280" angle={-15} textAnchor="end" height={100} />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.5)'
                }}
              />
              <Legend />
              <Bar dataKey="ingresos" fill="#3b82f6" name="Ingresos (€)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="margen" fill="#10b981" name="Margen (%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rentabilidadServicios.map((servicio, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                <p className="text-sm font-semibold text-gray-700 mb-2">{servicio.servicio}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">€{servicio.ingresos.toLocaleString()}</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    servicio.margen > 70 ? 'bg-green-100 text-green-700' :
                    servicio.margen > 60 ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {servicio.margen}% margen
                  </div>
                </div>
                <p className="text-xs text-indigo-600 font-medium">{servicio.recomendacion}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* DETECTOR DE OPORTUNIDADES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Detector de Oportunidades</h3>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {oportunidades.map((oportunidad, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`p-6 rounded-2xl border-2 ${getPrioridadColor(oportunidad.prioridad)} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {oportunidad.prioridad}
                    </span>
                  </div>
                  <div className="px-3 py-1 bg-white rounded-full">
                    <span className="text-lg font-bold text-green-600">{oportunidad.impacto}</span>
                  </div>
                </div>

                <h4 className="text-lg font-bold text-gray-900 mb-2">{oportunidad.titulo}</h4>
                <p className="text-sm text-gray-700 mb-4">{oportunidad.descripcion}</p>

                <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                  Aplicar Acción
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* GESTOR DE GASTOS + ANÁLISIS DE CLIENTES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* GESTOR DE GASTOS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Gestor de Gastos</h3>
            </div>
          </div>

          <div className="p-6">
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={distribucionGastos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                  label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`}
                >
                  {distribucionGastos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2">
              {distribucionGastos.map((gasto, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: gasto.color }}></div>
                    <span className="text-sm font-semibold text-gray-700">{gasto.categoria}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">€{gasto.valor.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ANÁLISIS DE CLIENTES (LTV) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Análisis de Clientes</h3>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-600 mb-3">LTV por Segmento</p>
              {ltvSegmentos.map((segmento, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">{segmento.segmento}</span>
                    <span className="text-sm font-bold text-gray-900">€{segmento.ltv.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: segmento.color,
                        width: `${(segmento.ltv / 3000) * 100}%`
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{segmento.clientes} clientes</p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <p className="font-semibold text-orange-900">Churn Rate: 4.2%</p>
              </div>
              <p className="text-xs text-orange-700 mb-3">3 clientes en riesgo detectados</p>
              <div className="space-y-2">
                {clientesRiesgo.map((cliente, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-700">{cliente.nombre}</span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full font-bold">
                      {cliente.riesgo}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ESCENARIOS FINANCIEROS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Simulador de Escenarios</h3>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <p className="text-sm font-semibold text-blue-700 mb-3">Aumentar precios</p>
              <input
                type="range"
                min="0"
                max="20"
                value={sliderValues.precioAumento}
                onChange={(e) => setSliderValues({...sliderValues, precioAumento: Number(e.target.value)})}
                className="w-full mb-2"
              />
              <p className="text-2xl font-bold text-blue-900">+{sliderValues.precioAumento}%</p>
              <p className="text-sm text-blue-600 mt-2">Impacto: +€{(sliderValues.precioAumento * 450).toLocaleString()}/mes</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <p className="text-sm font-semibold text-green-700 mb-3">Contratar entrenador</p>
              <input
                type="range"
                min="0"
                max="3"
                value={sliderValues.nuevoEntrenador}
                onChange={(e) => setSliderValues({...sliderValues, nuevoEntrenador: Number(e.target.value)})}
                className="w-full mb-2"
              />
              <p className="text-2xl font-bold text-green-900">{sliderValues.nuevoEntrenador} persona{sliderValues.nuevoEntrenador !== 1 ? 's' : ''}</p>
              <p className="text-sm text-green-600 mt-2">Impacto: +€{(sliderValues.nuevoEntrenador * 3200).toLocaleString()}/mes</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <p className="text-sm font-semibold text-purple-700 mb-3">Meta de facturación</p>
              <input
                type="range"
                min="30000"
                max="70000"
                step="1000"
                value={sliderValues.metaFacturacion}
                onChange={(e) => setSliderValues({...sliderValues, metaFacturacion: Number(e.target.value)})}
                className="w-full mb-2"
              />
              <p className="text-2xl font-bold text-purple-900">€{sliderValues.metaFacturacion.toLocaleString()}</p>
              <p className="text-sm text-purple-600 mt-2">
                {sliderValues.metaFacturacion > 45230 ?
                  `Necesitas +${Math.ceil((sliderValues.metaFacturacion - 45230) / 890)} clientes` :
                  'Meta alcanzada'}
              </p>
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Resultado del Escenario</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ingresos Proyectados</p>
                <p className="text-3xl font-bold text-green-600">
                  €{(45230 + (sliderValues.precioAumento * 450) + (sliderValues.nuevoEntrenador * 3200)).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Incremento Total</p>
                <p className="text-3xl font-bold text-blue-600">
                  +€{((sliderValues.precioAumento * 450) + (sliderValues.nuevoEntrenador * 3200)).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Variación</p>
                <p className="text-3xl font-bold text-purple-600">
                  +{(((sliderValues.precioAumento * 450) + (sliderValues.nuevoEntrenador * 3200)) / 45230 * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* RECOMENDADOR DE PRECIOS + ALERTAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* RECOMENDADOR DE PRECIOS */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Recomendador de Precios</h3>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-green-700">Membresía Premium</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Recomendado</span>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <div>
                  <p className="text-xs text-gray-600">Precio Actual</p>
                  <p className="text-2xl font-bold text-gray-900">€89</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-green-600 mb-1" />
                <div>
                  <p className="text-xs text-green-700">Precio Óptimo</p>
                  <p className="text-2xl font-bold text-green-600">€98</p>
                </div>
              </div>
              <p className="text-xs text-green-700">Impacto estimado: +€1,230/mes</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-blue-700">Entrenamiento Personal</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Revisar</span>
              </div>
              <div className="flex items-end gap-3 mb-2">
                <div>
                  <p className="text-xs text-gray-600">Precio Actual</p>
                  <p className="text-2xl font-bold text-gray-900">€45</p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-blue-600 mb-1" />
                <div>
                  <p className="text-xs text-blue-700">Precio Sugerido</p>
                  <p className="text-2xl font-bold text-blue-600">€49</p>
                </div>
              </div>
              <p className="text-xs text-blue-700">Impacto estimado: +€580/mes</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Clases Grupales</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">Óptimo</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div>
                  <p className="text-xs text-gray-600">Precio Actual</p>
                  <p className="text-2xl font-bold text-gray-900">€25</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-600 mb-1" />
              </div>
              <p className="text-xs text-gray-600">Precio en punto óptimo</p>
            </div>
          </div>
        </motion.div>

        {/* ALERTAS Y NOTIFICACIONES */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Alertas y Notificaciones</h3>
            </div>
          </div>

          <div className="p-6 space-y-3">
            {alertas.map((alerta, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`p-4 rounded-2xl border-2 ${
                  alerta.tipo === 'success' ? 'bg-green-50 border-green-200' :
                  alerta.tipo === 'error' ? 'bg-red-50 border-red-200' :
                  'bg-yellow-50 border-yellow-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {getAlertaIcon(alerta.tipo)}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{alerta.mensaje}</p>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-500">{alerta.tiempo}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="mt-6 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h4 className="font-bold text-indigo-900">Resumen del Día</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Ingresos de hoy</span>
                  <span className="font-bold text-green-600">€1,850</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Nuevos clientes</span>
                  <span className="font-bold text-blue-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Sesiones realizadas</span>
                  <span className="font-bold text-purple-600">18</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* REPORTES AUTOMÁTICOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
      >
        <div className="bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">Reportes Automáticos</h3>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left border border-white/20">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Activity className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-2">Estado de Resultados</h4>
                <p className="text-sm text-blue-100 mb-4">Informe completo de P&L del mes</p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Download className="w-4 h-4" />
                  <span>Descargar PDF</span>
                </div>
              </div>
            </button>

            <button className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left border border-white/20">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Wallet className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-2">Flujo de Caja</h4>
                <p className="text-sm text-green-100 mb-4">Análisis de liquidez y cash flow</p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Download className="w-4 h-4" />
                  <span>Descargar Excel</span>
                </div>
              </div>
            </button>

            <button className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left border border-white/20">
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-2">Balance General</h4>
                <p className="text-sm text-purple-100 mb-4">Resumen financiero simplificado</p>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Download className="w-4 h-4" />
                  <span>Descargar PDF</span>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-indigo-600 mt-0.5" />
              <div>
                <h4 className="font-bold text-indigo-900 mb-2">Programación Automática</h4>
                <p className="text-sm text-indigo-700 mb-3">Configura la frecuencia de generación y envío automático de reportes</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white text-indigo-600 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 border border-indigo-200">
                    Semanal
                  </button>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300">
                    Mensual
                  </button>
                  <button className="px-4 py-2 bg-white text-indigo-600 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300 border border-indigo-200">
                    Trimestral
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default AgenteFinancieroPage;
