import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, TrendingUp, Download, Share2, Filter, BarChart3,
  Users, Clock, Target, Award, Sparkles, ChevronDown, Calendar,
  FileBarChart, Send, Eye
} from 'lucide-react';
import EditorInformes from './components/EditorInformes';
import MotorRecomendaciones from './components/MotorRecomendaciones';
import DistribucionAutomatica from './components/DistribucionAutomatica';
import InformesAdaptativos from './components/InformesAdaptativos';
import IntegracionVideoanalysis from './components/IntegracionVideoanalysis';
import ProgramadorAutomatico from './components/ProgramadorAutomatico';
import SistemaComentarios from './components/SistemaComentarios';
import AnalyticsLectura from './components/AnalyticsLectura';

const ReportesRendimientoPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedTemplate, setSelectedTemplate] = useState('executive');

  const kpiData = [
    {
      title: 'Reportes Generados',
      value: '142',
      change: 18.5,
      icon: FileText,
      gradient: 'from-blue-500 to-indigo-600',
      progress: 85
    },
    {
      title: 'Tasa de Lectura',
      value: '87%',
      change: 12.3,
      icon: Eye,
      gradient: 'from-emerald-500 to-teal-600',
      progress: 87
    },
    {
      title: 'Compartidos',
      value: '89',
      change: 24.1,
      icon: Share2,
      gradient: 'from-purple-500 to-pink-600',
      progress: 72
    },
    {
      title: 'Tiempo Promedio',
      value: '3.5m',
      change: -8.2,
      icon: Clock,
      gradient: 'from-orange-500 to-red-600',
      progress: 68,
      isNegative: true
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Reportes de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Rendimiento</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-blue-100 max-w-4xl leading-relaxed mb-6">
            Compila datos de rendimiento multi-fuente, genera PDFs con resúmenes de carga y mejoras individuales,
            y previsualiza tu <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">dossier profesional</span> antes de la generación final.
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <FileBarChart className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Informes Ejecutivos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">KPIs en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Award className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Análisis Avanzado</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filtros y Acciones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Filtros */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 border border-gray-200 hover:border-indigo-300 transition-colors duration-300">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-semibold text-gray-700 cursor-pointer"
              >
                <option value="week">Última semana</option>
                <option value="month">Último mes</option>
                <option value="quarter">Último trimestre</option>
                <option value="year">Último año</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>

            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-xl px-4 py-2 border border-gray-200 hover:border-purple-300 transition-colors duration-300">
              <Filter className="w-5 h-5 text-purple-600" />
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="bg-transparent border-none outline-none text-sm font-semibold text-gray-700 cursor-pointer"
              >
                <option value="executive">Ejecutivo</option>
                <option value="detailed">Detallado</option>
                <option value="summary">Resumen</option>
                <option value="custom">Personalizado</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 border-2 border-indigo-500 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Exportar</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center gap-2">
                <Send className="w-5 h-5" />
                <span>Compartir</span>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Grid de KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${kpi.gradient} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Título */}
                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {kpi.title}
                </p>

                {/* Valor */}
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {kpi.value}
                </p>

                {/* Cambio */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-1 ${kpi.isNegative ? 'bg-red-50' : 'bg-green-50'} rounded-lg`}>
                    <TrendingUp className={`w-4 h-4 ${kpi.isNegative ? 'text-red-600 rotate-180' : 'text-green-600'}`} />
                  </div>
                  <span className={`text-sm font-bold ${kpi.isNegative ? 'text-red-600' : 'text-green-600'}`}>
                    {kpi.isNegative ? '' : '+'}{kpi.change}%
                  </span>
                  <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${kpi.progress}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${kpi.gradient} rounded-full relative`}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cards de Funcionalidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Plantillas de Reporte */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group"
        >
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Plantillas de Reporte</h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-gray-600 mb-4 leading-relaxed">
              Selecciona una plantilla predefinida para tu informe ejecutivo con diseños profesionales.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                <span>Plantillas personalizables</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span>Formatos profesionales</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span>Diseño adaptativo</span>
              </div>
            </div>

            <button className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-semibold rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 border border-indigo-200">
              Ver Plantillas
            </button>
          </div>
        </motion.div>

        {/* Card 2: KPIs de Equipo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group"
        >
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">KPIs de Equipo</h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-gray-600 mb-4 leading-relaxed">
              Organiza y visualiza los indicadores clave de rendimiento de tu equipo en tiempo real.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>Métricas en tiempo real</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                <span>Análisis comparativo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span>Alertas automáticas</span>
              </div>
            </div>

            <button className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 font-semibold rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all duration-300 border border-emerald-200">
              Configurar KPIs
            </button>
          </div>
        </motion.div>

        {/* Card 3: Generación de PDF */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 relative overflow-hidden group"
        >
          {/* Header con gradiente */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <div className="relative z-10 flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Generación de PDF</h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-gray-600 mb-4 leading-relaxed">
              Previsualiza tu reporte estilo "dossier profesional" y genera el PDF final de alta calidad.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span>Vista previa en vivo</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                <span>Calidad profesional</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span>Marca personalizada</span>
              </div>
            </div>

            <button className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-orange-50 to-pink-50 text-orange-700 font-semibold rounded-xl hover:from-orange-100 hover:to-pink-100 transition-all duration-300 border border-orange-200">
              Generar PDF
            </button>
          </div>
        </motion.div>
      </div>

      {/* Sistema de Informes Inteligente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          {/* Header de la sección */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                Sistema de Informes Inteligente
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed ml-16">
              Herramientas avanzadas para crear, distribuir y analizar reportes de rendimiento de forma inteligente y automatizada.
            </p>
          </div>

          {/* Grid de componentes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <EditorInformes />
            <MotorRecomendaciones />
            <DistribucionAutomatica />
            <InformesAdaptativos />
            <IntegracionVideoanalysis />
            <ProgramadorAutomatico />
            <SistemaComentarios />
            <AnalyticsLectura />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportesRendimientoPage;