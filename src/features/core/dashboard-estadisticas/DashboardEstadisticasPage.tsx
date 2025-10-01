import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3, TrendingUp, Users, DollarSign, Calendar, Activity,
  PieChart, LineChart, Target, AlertTriangle, CheckCircle, Clock,
  ArrowUpRight, ArrowDownRight, Filter, Download, RefreshCw,
  Eye, Settings, Zap, Star, Award, Trophy
} from 'lucide-react';

// Tipos
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  change: number;
  color: string;
  delay: number;
  description?: string;
}

interface ReportSectionProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  route: string;
  color: string;
  stats: {
    total: number;
    change: number;
    period: string;
  };
}

const DashboardEstadisticasPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Estadísticas principales del dashboard
  const mainStats: StatCardProps[] = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Total Clientes',
      value: 1247,
      change: 12.5,
      color: 'from-blue-500 to-blue-600',
      delay: 0.1,
      description: 'Clientes registrados en el sistema'
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Ingresos Totales',
      value: '€45,230',
      change: 23.8,
      color: 'from-emerald-500 to-emerald-600',
      delay: 0.2,
      description: 'Ingresos acumulados este mes'
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: 'Sesiones Completadas',
      value: 3248,
      change: 18.7,
      color: 'from-purple-500 to-purple-600',
      delay: 0.3,
      description: 'Entrenamientos realizados'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Tasa de Retención',
      value: '94.2%',
      change: 5.4,
      color: 'from-orange-500 to-orange-600',
      delay: 0.4,
      description: 'Clientes que continúan activos'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Objetivos Alcanzados',
      value: '87%',
      change: 12.1,
      color: 'from-indigo-500 to-indigo-600',
      delay: 0.5,
      description: 'Metas cumplidas este mes'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Satisfacción',
      value: '4.8/5',
      change: 8.3,
      color: 'from-pink-500 to-pink-600',
      delay: 0.6,
      description: 'Calificación promedio de clientes'
    }
  ];

  // Secciones de reportes disponibles
  const reportSections: ReportSectionProps[] = [
    {
      title: 'Analytics Avanzadas',
      icon: <BarChart3 className="w-8 h-8" />,
      description: 'Análisis de ingresos, cohortes, LTV y retención de clientes',
      route: 'analitica-ingresos',
      color: 'from-blue-500 to-indigo-600',
      stats: {
        total: 4,
        change: 15.2,
        period: 'reportes'
      }
    },
    {
      title: 'Reportes de Rendimiento',
      icon: <Activity className="w-8 h-8" />,
      description: 'Métricas de entrenamiento y rendimiento deportivo',
      route: 'reportes-rendimiento',
      color: 'from-purple-500 to-purple-600',
      stats: {
        total: 8,
        change: 22.1,
        period: 'métricas'
      }
    },
    {
      title: 'Reportes de Accesos',
      icon: <Users className="w-8 h-8" />,
      description: 'Control de accesos y asistencia de clientes',
      route: 'reportes-accesos',
      color: 'from-emerald-500 to-teal-600',
      stats: {
        total: 12,
        change: 8.7,
        period: 'registros'
      }
    },
    {
      title: 'Reportes de Asistencia',
      icon: <Calendar className="w-8 h-8" />,
      description: 'Estadísticas de clases y asistencia de miembros',
      route: 'reportes-asistencia',
      color: 'from-orange-500 to-orange-600',
      stats: {
        total: 6,
        change: 18.3,
        period: 'sesiones'
      }
    },
    {
      title: 'Análisis Financiero',
      icon: <DollarSign className="w-8 h-8" />,
      description: 'Reportes financieros y análisis de rentabilidad',
      route: 'panel-financiero',
      color: 'from-green-500 to-emerald-600',
      stats: {
        total: 15,
        change: 25.4,
        period: 'reportes'
      }
    },
    {
      title: 'Métricas de Marketing',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Análisis de campañas y conversión de leads',
      route: 'campanas',
      color: 'from-pink-500 to-rose-600',
      stats: {
        total: 9,
        change: 31.2,
        period: 'campañas'
      }
    }
  ];

  // Datos para gráficos
  const revenueData = [1200, 1350, 1100, 1450, 1600, 1800, 1750];
  const clientRetentionData = [85, 88, 92, 89, 94, 96, 94];
  const maxRevenue = Math.max(...revenueData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="relative">
              <BarChart3 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Dashboard de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Estadísticas</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed"
          >
            Centro de análisis y reportes completo. Visualiza el rendimiento de tu negocio con métricas en tiempo real y análisis detallados.
          </motion.p>

          {/* Filtros y controles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Filter className="w-5 h-5 text-blue-300" />
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-transparent text-white text-sm font-semibold border-none outline-none"
              >
                <option value="7d" className="text-gray-900">Últimos 7 días</option>
                <option value="30d" className="text-gray-900">Últimos 30 días</option>
                <option value="90d" className="text-gray-900">Últimos 90 días</option>
                <option value="1y" className="text-gray-900">Último año</option>
              </select>
            </div>
            <button 
              onClick={() => {
                setLastUpdated(new Date());
                // Aquí se podría agregar lógica para refrescar datos
              }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-colors duration-300"
            >
              <RefreshCw className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">
                Actualizado {Math.floor((new Date().getTime() - lastUpdated.getTime()) / 60000)} min
              </span>
            </button>
            <button 
              onClick={() => {
                // Función para exportar datos
                const data = {
                  period: selectedPeriod,
                  stats: mainStats,
                  revenueData,
                  clientRetentionData
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `estadisticas-${selectedPeriod}.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-colors duration-300"
            >
              <Download className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Exportar datos</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS PRINCIPALES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {mainStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* GRÁFICOS PRINCIPALES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de Ingresos */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              Ingresos (7 días)
            </h3>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
              <span className="text-sm font-bold text-green-600">+15.3%</span>
            </div>
          </div>
          
          <div className="flex items-end justify-between h-48 gap-2">
            {revenueData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / maxRevenue) * 100}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="w-full bg-gradient-to-t from-emerald-500 via-teal-400 to-cyan-400 rounded-t-2xl group-hover:from-emerald-600 group-hover:via-teal-500 group-hover:to-cyan-500 transition-all duration-300 shadow-lg relative"
                >
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
                    €{value}
                  </div>
                </motion.div>
                <span className="text-xs text-gray-500 font-bold">
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              €{revenueData.reduce((a, b) => a + b, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 font-semibold mt-1">Total esta semana</p>
          </div>
        </motion.div>

        {/* Gráfico de Retención */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              Retención de Clientes
            </h3>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
              <span className="text-sm font-bold text-green-600">+5.4%</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {clientRetentionData.map((value, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-600 w-8">
                  {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'][index]}
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
                <span className="text-sm font-bold text-gray-900 w-12 text-right">{value}%</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              {Math.round(clientRetentionData.reduce((a, b) => a + b, 0) / clientRetentionData.length)}%
            </p>
            <p className="text-sm text-gray-600 font-semibold mt-1">Promedio de retención</p>
          </div>
        </motion.div>
      </div>

      {/* SECCIONES DE REPORTES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
            <PieChart className="w-6 h-6 text-white" />
          </div>
          Secciones de Reportes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportSections.map((section, index) => (
            <ReportSectionCard key={index} {...section} delay={index * 0.1} />
          ))}
        </div>
      </motion.div>

      {/* RESUMEN DE ALERTAS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          Alertas y Recomendaciones
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-100">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h4 className="font-bold text-red-800">Atención Requerida</h4>
            </div>
            <p className="text-sm text-red-700 mb-2">3 clientes con pagos pendientes</p>
            <p className="text-xs text-red-600">Revisar estado de facturación</p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-yellow-600" />
              <h4 className="font-bold text-yellow-800">Oportunidad</h4>
            </div>
            <p className="text-sm text-yellow-700 mb-2">5 clientes próximos a renovar</p>
            <p className="text-xs text-yellow-600">Contactar para retención</p>
          </div>
          
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h4 className="font-bold text-green-800">Excelente</h4>
            </div>
            <p className="text-sm text-green-700 mb-2">Retención superando objetivos</p>
            <p className="text-xs text-green-600">+4% sobre meta mensual</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// COMPONENTE: Tarjeta de Estadística
const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, color, delay, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${color} opacity-5 rounded-full blur-2xl`}></div>

      <div className="relative z-10">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>

        <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">{title}</p>
        <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
          {value}
        </p>
        
        {description && (
          <p className="text-xs text-gray-500 mb-3">{description}</p>
        )}

        <div className="flex items-center gap-2">
          {change >= 0 ? (
            <>
              <div className="p-1 bg-green-50 rounded-lg">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">+{change}%</span>
            </>
          ) : (
            <>
              <div className="p-1 bg-red-50 rounded-lg">
                <ArrowDownRight className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-sm font-bold text-red-600">{change}%</span>
            </>
          )}
          <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
        </div>
      </div>
    </motion.div>
  );
};

// COMPONENTE: Tarjeta de Sección de Reporte
const ReportSectionCard: React.FC<ReportSectionProps & { delay: number }> = ({
  title,
  icon,
  description,
  route,
  color,
  stats,
  delay
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/${route}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group cursor-pointer"
    >
      <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${color} opacity-5 rounded-full blur-2xl`}></div>

      <div className="relative z-10">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">{stats.total}</span>
            <span className="text-sm text-gray-500">{stats.period}</span>
          </div>
          <div className="flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4 text-green-600" />
            <span className="text-sm font-bold text-green-600">+{stats.change}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Eye className="w-4 h-4" />
          <span>Ver reportes</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardEstadisticasPage;
