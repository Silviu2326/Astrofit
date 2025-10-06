import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Users, MousePointerClick, Eye,
  Calendar, Download, Filter, ArrowUpRight, ArrowDownRight,
  Target, Zap, Award, Activity
} from 'lucide-react';

// Mock data de widgets
const mockWidgets = [
  {
    id: 'widget-1',
    name: 'Reserva de Consultoría',
    type: 'reserva',
    analytics: {
      impresiones: 15248,
      clics: 3456,
      conversiones: 892,
      tasaConversion: 25.8,
      tasaClics: 22.7,
      leadValue: 45.50,
      tendencia: 'up',
      incremento: 18.5
    }
  },
  {
    id: 'widget-2',
    name: 'Newsletter Suscripción',
    type: 'info',
    analytics: {
      impresiones: 28567,
      clics: 5234,
      conversiones: 2156,
      tasaConversion: 41.2,
      tasaClics: 18.3,
      leadValue: 12.30,
      tendencia: 'up',
      incremento: 32.4
    }
  },
  {
    id: 'widget-3',
    name: 'Descarga Ebook',
    type: 'descarga',
    analytics: {
      impresiones: 19843,
      clics: 4123,
      conversiones: 1543,
      tasaConversion: 37.4,
      tasaClics: 20.8,
      leadValue: 28.90,
      tendencia: 'down',
      incremento: -5.2
    }
  },
  {
    id: 'widget-4',
    name: 'Banner Promo',
    type: 'info',
    analytics: {
      impresiones: 45678,
      clics: 8234,
      conversiones: 1245,
      tasaConversion: 15.1,
      tasaClics: 18.0,
      leadValue: 35.60,
      tendencia: 'up',
      incremento: 8.7
    }
  }
];

// Mock data de rendimiento por página
const pagePerformance = [
  { page: '/servicios', visits: 4567, conversiones: 892, tasa: 19.5 },
  { page: '/blog', visits: 8234, conversiones: 645, tasa: 7.8 },
  { page: '/contacto', visits: 3456, conversiones: 543, tasa: 15.7 },
  { page: '/recursos', visits: 5678, conversiones: 789, tasa: 13.9 },
  { page: '/pricing', visits: 2345, conversiones: 432, tasa: 18.4 }
];

// Mock data histórico (últimos 7 días)
const historicalData = [
  { day: 'Lun', impresiones: 3200, conversiones: 145 },
  { day: 'Mar', impresiones: 4100, conversiones: 198 },
  { day: 'Mié', impresiones: 3800, conversiones: 167 },
  { day: 'Jue', impresiones: 5200, conversiones: 234 },
  { day: 'Vie', impresiones: 4900, conversiones: 212 },
  { day: 'Sáb', impresiones: 2800, conversiones: 98 },
  { day: 'Dom', impresiones: 2400, conversiones: 87 }
];

const AnaliticsWidget: React.FC = () => {
  const [selectedWidgetId, setSelectedWidgetId] = useState(mockWidgets[0].id);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  const currentWidget = mockWidgets.find(w => w.id === selectedWidgetId) || mockWidgets[0];
  const totalConversiones = mockWidgets.reduce((sum, w) => sum + w.analytics.conversiones, 0);
  const totalClics = mockWidgets.reduce((sum, w) => sum + w.analytics.clics, 0);
  const avgConversionRate = (totalConversiones / totalClics * 100).toFixed(1);

  const maxImpresiones = Math.max(...historicalData.map(d => d.impresiones));
  const maxConversiones = Math.max(...historicalData.map(d => d.conversiones));

  return (
    <div className="space-y-8">
      {/* Header con filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Analytics & Métricas</h2>
              <p className="text-gray-600">Dashboard de rendimiento de widgets</p>
            </div>
          </div>

          <div className="flex gap-3">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as typeof timeRange)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range === '7d' ? '7 días' : range === '30d' ? '30 días' : '90 días'}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Globales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Total Conversiones',
            value: totalConversiones.toLocaleString(),
            icon: Target,
            color: 'from-emerald-500 to-teal-500',
            change: '+24.5%',
            trend: 'up'
          },
          {
            label: 'Tasa Promedio',
            value: `${avgConversionRate}%`,
            icon: TrendingUp,
            color: 'from-blue-500 to-cyan-500',
            change: '+5.3%',
            trend: 'up'
          },
          {
            label: 'Total Clics',
            value: totalClics.toLocaleString(),
            icon: MousePointerClick,
            color: 'from-orange-500 to-red-500',
            change: '+12.8%',
            trend: 'up'
          },
          {
            label: 'Mejor Widget',
            value: '41.2%',
            icon: Award,
            color: 'from-violet-500 to-purple-500',
            change: 'Newsletter',
            trend: 'neutral'
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.label}
                </p>

                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {stat.value}
                </p>

                <div className="flex items-center gap-2">
                  {stat.trend === 'up' ? (
                    <div className="p-1 bg-green-50 rounded-lg">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    </div>
                  ) : stat.trend === 'down' ? (
                    <div className="p-1 bg-red-50 rounded-lg">
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    </div>
                  ) : null}
                  <span className={`text-sm font-bold ${
                    stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selector de Widget y Gráfico */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Widgets */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 lg:col-span-1"
        >
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-violet-500" />
            <h3 className="text-lg font-bold text-gray-900">Widgets Activos</h3>
          </div>

          <div className="space-y-3">
            {mockWidgets.map((widget, index) => (
              <motion.button
                key={widget.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedWidgetId(widget.id)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                  selectedWidgetId === widget.id
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg scale-105'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm">{widget.name}</span>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${
                    selectedWidgetId === widget.id ? 'text-white' : 'text-gray-600'
                  }`}>
                    {widget.analytics.tendencia === 'up' ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(widget.analytics.incremento)}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className={selectedWidgetId === widget.id ? 'text-white/80' : 'text-gray-600'}>
                    Conversiones: {widget.analytics.conversiones}
                  </span>
                  <span className={`font-bold ${selectedWidgetId === widget.id ? 'text-white' : 'text-violet-600'}`}>
                    {widget.analytics.tasaConversion}%
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Detalles del Widget Seleccionado */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{currentWidget.name}</h3>
              <p className="text-sm text-gray-600 capitalize">Tipo: {currentWidget.type}</p>
            </div>

            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>

          {/* Métricas del Widget */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Impresiones', value: currentWidget.analytics.impresiones.toLocaleString(), icon: Eye },
              { label: 'Clics', value: currentWidget.analytics.clics.toLocaleString(), icon: MousePointerClick },
              { label: 'Conversiones', value: currentWidget.analytics.conversiones.toLocaleString(), icon: Target },
              { label: 'Valor/Lead', value: `$${currentWidget.analytics.leadValue}`, icon: TrendingUp }
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-200"
                >
                  <Icon className="w-5 h-5 text-violet-500 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-xs text-gray-600 font-medium">{metric.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Gráfico de barras simple */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-900">Rendimiento Semanal</h4>
              <div className="flex gap-3 text-xs font-semibold">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-violet-500"></div>
                  <span className="text-gray-600">Impresiones</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-emerald-500"></div>
                  <span className="text-gray-600">Conversiones</span>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between gap-2 h-48">
              {historicalData.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  {/* Barra de impresiones */}
                  <div className="w-full flex flex-col gap-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.impresiones / maxImpresiones) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-violet-500 to-purple-500 rounded-t-lg min-h-[20px]"
                      style={{ height: `${(day.impresiones / maxImpresiones) * 100}%` }}
                    ></motion.div>

                    {/* Barra de conversiones */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.conversiones / maxConversiones) * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-emerald-500 to-teal-500 rounded-t-lg min-h-[10px]"
                      style={{ height: `${(day.conversiones / maxConversiones) * 50}%` }}
                    ></motion.div>
                  </div>

                  {/* Etiqueta del día */}
                  <span className="text-xs font-semibold text-gray-600">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabla de Rendimiento por Página */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Rendimiento por Página</h2>
              <p className="text-gray-600">Análisis de conversión por ubicación</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Página</th>
                <th className="text-right py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Visitas</th>
                <th className="text-right py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Conversiones</th>
                <th className="text-right py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Tasa</th>
                <th className="py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wider">Progreso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pagePerformance.map((page, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 transition-all duration-300"
                >
                  <td className="py-4 px-4">
                    <code className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-700">
                      {page.page}
                    </code>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm font-semibold text-gray-900">{page.visits.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-sm font-semibold text-violet-600">{page.conversiones.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                      {page.tasa}%
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${page.tasa}%` }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
                      ></motion.div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AnaliticsWidget;
