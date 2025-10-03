import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, BarChart3, Users, Activity, Target, Download,
  ChevronDown, Filter, CheckCircle, AlertTriangle, Info, Sparkles,
  TrendingDown, MapPin, Clock, Smartphone, ArrowUpRight, ArrowDownRight,
  Globe, Calendar, DollarSign, Zap, FileText, Award, Settings
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, FunnelChart, Funnel, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { mockExperiments, mockSegmentData, getExperimentById } from './data/mockData';

const ResultadosTestPage: React.FC = () => {
  const [selectedExperiment, setSelectedExperiment] = useState(mockExperiments[0]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed'>('all');
  const [showDeclareWinnerModal, setShowDeclareWinnerModal] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Filtrar experimentos
  const filteredExperiments = mockExperiments.filter(exp => {
    if (filterStatus === 'all') return true;
    return exp.status === filterStatus;
  });

  // Calcular ganador
  const winner = selectedExperiment.variants.reduce((prev, current) =>
    (current.conversionRate > prev.conversionRate) ? current : prev
  );

  const control = selectedExperiment.variants.find(v => v.isControl) || selectedExperiment.variants[0];

  // Preparar datos para gráficos
  const conversionChartData = selectedExperiment.timeSeriesData;

  const variantComparisonData = selectedExperiment.variants.map(variant => ({
    name: variant.name,
    conversion: variant.conversionRate,
    revenue: variant.revenue,
    visitors: variant.visitors
  }));

  const trafficDistributionData = selectedExperiment.variants.map(variant => ({
    name: variant.name,
    value: variant.trafficShare,
    visitors: variant.visitors
  }));

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      {/* Hero Section */}
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <BarChart3 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Resultados de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Tests A/B</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl leading-relaxed">
            Decisiones basadas en <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">datos estadísticamente significativos</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{mockExperiments.filter(e => e.status === 'completed').length} Tests Completados</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">{mockExperiments.filter(e => e.status === 'active').length} Tests Activos</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selector de Experimento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-600" />
            Seleccionar Experimento
          </h2>

          {/* Filtros rápidos */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                filterStatus === 'all'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                filterStatus === 'active'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Activos
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                filterStatus === 'completed'
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Completados
            </button>
          </div>
        </div>

        {/* Lista de experimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExperiments.map((exp) => (
            <motion.button
              key={exp.id}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => setSelectedExperiment(exp)}
              className={`text-left p-4 rounded-2xl border-2 transition-all duration-300 ${
                selectedExperiment.id === exp.id
                  ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-900">{exp.name}</h3>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  exp.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {exp.status === 'active' ? 'Activo' : 'Completado'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{exp.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{exp.variants.length} variantes</span>
                <span className="font-semibold text-emerald-600">
                  {exp.confidence >= 95 ? '✓ Significativo' : `${exp.confidence}% confianza`}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Overview del Experimento */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-4">{selectedExperiment.name}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-emerald-100 mb-1">Estado</p>
                <p className="text-lg font-bold text-white">{selectedExperiment.status === 'active' ? 'Activo' : 'Completado'}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-emerald-100 mb-1">Duración</p>
                <p className="text-lg font-bold text-white">{selectedExperiment.duration} días</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-emerald-100 mb-1">Tráfico Total</p>
                <p className="text-lg font-bold text-white">{selectedExperiment.totalTraffic.toLocaleString()}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-emerald-100 mb-1">Variantes</p>
                <p className="text-lg font-bold text-white">{selectedExperiment.variants.length}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-emerald-100 mb-1">Confianza</p>
                <p className="text-lg font-bold text-white">{selectedExperiment.confidence}%</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-emerald-100 mb-1">Ganador</p>
                <p className="text-lg font-bold text-white">{winner.name}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabla Comparativa de Variantes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
            Comparativa de Variantes
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-700">Variante</th>
                  <th className="text-right py-4 px-4 font-bold text-gray-700">Visitantes</th>
                  <th className="text-right py-4 px-4 font-bold text-gray-700">Conversiones</th>
                  <th className="text-right py-4 px-4 font-bold text-gray-700">Tasa Conv.</th>
                  <th className="text-right py-4 px-4 font-bold text-gray-700">Mejora vs Control</th>
                  <th className="text-right py-4 px-4 font-bold text-gray-700">Revenue</th>
                  <th className="text-center py-4 px-4 font-bold text-gray-700">Significancia</th>
                </tr>
              </thead>
              <tbody>
                {selectedExperiment.variants.map((variant, index) => {
                  const improvement = ((variant.conversionRate - control.conversionRate) / control.conversionRate * 100).toFixed(1);
                  const isWinner = variant.id === winner.id;

                  return (
                    <motion.tr
                      key={variant.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className={`border-b border-gray-100 transition-colors duration-200 ${
                        variant.isControl
                          ? 'bg-blue-50/50'
                          : isWinner
                            ? 'bg-green-50/50'
                            : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{variant.name}</span>
                          {variant.isControl && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Control</span>
                          )}
                          {isWinner && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              Ganador
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="text-right py-4 px-4 text-gray-700">{variant.visitors.toLocaleString()}</td>
                      <td className="text-right py-4 px-4 text-gray-700">{variant.conversions.toLocaleString()}</td>
                      <td className="text-right py-4 px-4">
                        <span className="font-semibold text-gray-900">{variant.conversionRate}%</span>
                      </td>
                      <td className="text-right py-4 px-4">
                        {variant.isControl ? (
                          <span className="text-gray-500">-</span>
                        ) : (
                          <div className="flex items-center justify-end gap-1">
                            {parseFloat(improvement) > 0 ? (
                              <>
                                <ArrowUpRight className="w-4 h-4 text-green-600" />
                                <span className="font-semibold text-green-600">+{improvement}%</span>
                              </>
                            ) : (
                              <>
                                <ArrowDownRight className="w-4 h-4 text-red-600" />
                                <span className="font-semibold text-red-600">{improvement}%</span>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="text-right py-4 px-4 font-semibold text-gray-900">
                        ${variant.revenue.toLocaleString()}
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          variant.significance >= 95
                            ? 'bg-green-100 text-green-700'
                            : variant.significance >= 80
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-600'
                        }`}>
                          {variant.significance >= 95 ? '✓ Significativo' : `${variant.significance}%`}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Gráficos y Visualizaciones - Grid 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico de Conversión en Tiempo Real */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Conversión en Tiempo Real
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={conversionChartData}>
              <defs>
                {selectedExperiment.variants.map((variant, index) => (
                  <linearGradient key={variant.id} id={`color${variant.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS[index]} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={COLORS[index]} stopOpacity={0}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Legend />
              {selectedExperiment.variants.map((variant, index) => (
                <Area
                  key={variant.id}
                  type="monotone"
                  dataKey={variant.name}
                  stroke={COLORS[index]}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#color${variant.id})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Distribución de Tráfico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-600" />
            Distribución de Tráfico
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {trafficDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Panel de Significancia Estadística */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-emerald-600" />
          Significancia Estadística
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Progress bar de confianza */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Nivel de Confianza</span>
              <span className="text-2xl font-bold text-emerald-600">{selectedExperiment.confidence}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${selectedExperiment.confidence}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full relative ${
                  selectedExperiment.confidence >= 95
                    ? 'bg-gradient-to-r from-green-500 via-green-600 to-emerald-600'
                    : selectedExperiment.confidence >= 80
                      ? 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500'
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                }`}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </motion.div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>0%</span>
              <span>Target: 95%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Badge de estado */}
          <div className="flex items-center justify-center">
            <div className={`px-6 py-4 rounded-2xl text-center ${
              selectedExperiment.confidence >= 95
                ? 'bg-green-100 border-2 border-green-500'
                : selectedExperiment.confidence >= 80
                  ? 'bg-yellow-100 border-2 border-yellow-500'
                  : 'bg-gray-100 border-2 border-gray-400'
            }`}>
              <div className="text-4xl mb-2">
                {selectedExperiment.confidence >= 95 ? '🏆' : selectedExperiment.confidence >= 80 ? '⚠️' : '📊'}
              </div>
              <p className="font-bold text-lg">
                {selectedExperiment.confidence >= 95
                  ? 'Altamente Significativo'
                  : selectedExperiment.confidence >= 80
                    ? 'Preliminar'
                    : 'Recolectando Datos'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
          <p className="text-sm text-blue-900">
            <Info className="w-4 h-4 inline mr-2" />
            <strong>P-value:</strong> {selectedExperiment.pValue} •
            <strong className="ml-2">Muestra actual:</strong> {selectedExperiment.totalTraffic.toLocaleString()} visitantes •
            <strong className="ml-2">Muestra requerida para 95%:</strong> {selectedExperiment.requiredSampleSize.toLocaleString()} visitantes
          </p>
        </div>
      </motion.div>

      {/* Recomendaciones Automáticas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-600" />
          Recomendaciones IA
        </h2>

        <div className="space-y-4">
          {selectedExperiment.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`p-4 rounded-2xl border-2 ${
                rec.type === 'success'
                  ? 'bg-green-50 border-green-300'
                  : rec.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-300'
                    : 'bg-blue-50 border-blue-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">
                  {rec.type === 'success' ? '✅' : rec.type === 'warning' ? '⚠️' : '💡'}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{rec.title}</h4>
                  <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                  {rec.action && (
                    <button className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      rec.type === 'success'
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : rec.type === 'warning'
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                      {rec.action}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Acciones Principales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Declarar Ganador */}
        <motion.button
          whileHover={{ scale: 1.02, y: -4 }}
          onClick={() => setShowDeclareWinnerModal(true)}
          disabled={selectedExperiment.confidence < 95}
          className={`relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-left group border border-white/20 ${
            selectedExperiment.confidence >= 95
              ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <Award className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Declarar Ganador</h3>
            <p className="text-sm opacity-90">Implementar variante ganadora en producción</p>
          </div>
        </motion.button>

        {/* Exportar Resultados */}
        <motion.button
          whileHover={{ scale: 1.02, y: -4 }}
          onClick={() => setShowExportOptions(!showExportOptions)}
          className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <Download className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Exportar Resultados</h3>
            <p className="text-sm opacity-90">PDF, PowerPoint, Excel, PNG</p>
          </div>
        </motion.button>

        {/* Ajustar Distribución */}
        <motion.button
          whileHover={{ scale: 1.02, y: -4 }}
          className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 text-white text-left group border border-white/20"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative z-10">
            <Settings className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Ajustar Distribución</h3>
            <p className="text-sm opacity-90">Modificar tráfico entre variantes</p>
          </div>
        </motion.button>
      </motion.div>

      {/* Modal de Exportación */}
      {showExportOptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowExportOptions(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Exportar Resultados</h3>
            <div className="space-y-3">
              <button className="w-full p-4 bg-red-50 hover:bg-red-100 rounded-2xl text-left transition-colors duration-200 border border-red-200">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="font-semibold text-gray-900">PDF Profesional</p>
                    <p className="text-xs text-gray-600">Reporte ejecutivo completo</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-4 bg-orange-50 hover:bg-orange-100 rounded-2xl text-left transition-colors duration-200 border border-orange-200">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="font-semibold text-gray-900">PowerPoint</p>
                    <p className="text-xs text-gray-600">Slides para presentación</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-4 bg-green-50 hover:bg-green-100 rounded-2xl text-left transition-colors duration-200 border border-green-200">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Excel / CSV</p>
                    <p className="text-xs text-gray-600">Datos crudos para análisis</p>
                  </div>
                </div>
              </button>
              <button className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl text-left transition-colors duration-200 border border-blue-200">
                <div className="flex items-center gap-3">
                  <Download className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Imágenes PNG</p>
                    <p className="text-xs text-gray-600">Gráficos individuales</p>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ResultadosTestPage;
