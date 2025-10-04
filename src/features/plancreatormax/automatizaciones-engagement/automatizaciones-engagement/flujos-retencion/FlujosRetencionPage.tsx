import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Infinity, Users, TrendingUp, DollarSign, Plus, Filter,
  Play, Pause, FileText, Edit3, Copy, BarChart3, Settings,
  ChevronRight, Calendar, Mail, MessageSquare, Bell, Tag,
  CreditCard, Webhook, GitBranch, Clock, Zap, Sparkles,
  ArrowUpRight, CheckCircle, AlertCircle, Eye, TestTube,
  Target, UserCheck, Activity, TrendingDown, Search
} from 'lucide-react';
import { mockFlowStats, mockFlows, mockTemplates, mockExecutions, mockAnalytics, mockSegments, mockAIOptimizations } from './mockData';
import { Flow, FlowTemplate, FlowStatus } from './types';
import FlowBuilder from './components/FlowBuilder';
import FlowAnalytics from './components/FlowAnalytics';
import FlowTesting from './components/FlowTesting';
import SegmentationRules from './components/SegmentationRules';

type ModalType = 'builder' | 'analytics' | 'testing' | 'segmentation' | null;

const FlujosRetencionPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | FlowStatus>('all');
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<FlowTemplate | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const filteredFlows = selectedFilter === 'all'
    ? mockFlows
    : mockFlows.filter(f => f.status === selectedFilter);

  const getStatusBadge = (status: FlowStatus) => {
    const styles = {
      active: 'bg-green-500 text-white',
      paused: 'bg-orange-500 text-white',
      draft: 'bg-gray-400 text-white'
    };
    const labels = {
      active: 'Activo',
      paused: 'Pausado',
      draft: 'Borrador'
    };
    return (
      <span className={`px-3 py-1 ${styles[status]} text-xs font-bold rounded-full`}>
        {labels[status]}
      </span>
    );
  };

  const getNodeIcon = (type: string) => {
    const icons: any = {
      email: Mail,
      sms: MessageSquare,
      push: Bell,
      tag: Tag,
      plan: CreditCard,
      webhook: Webhook,
      conditional: GitBranch,
      delay: Clock,
      split: Zap
    };
    const Icon = icons[type] || Activity;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-teal-50/30 p-6">
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
              <Infinity className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Flujos de Retención <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Automatizados</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Mantén a tus clientes <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">comprometidos</span> en piloto automático
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Constructor Visual</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Automatización IA</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Analytics en Tiempo Real</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Flujos Activos', value: mockFlowStats.activeFlows, icon: Activity, gradient: 'from-green-500 to-emerald-600', change: 8 },
          { title: 'Clientes en Flujos', value: mockFlowStats.clientsInFlows, icon: Users, gradient: 'from-blue-500 to-cyan-600', change: 12 },
          { title: 'Tasa de Retención', value: `${mockFlowStats.retentionRate}%`, icon: TrendingUp, gradient: 'from-purple-500 to-pink-600', change: 5 },
          { title: 'Conversiones', value: mockFlowStats.conversionsGenerated, icon: DollarSign, gradient: 'from-orange-500 to-red-600', change: 15 }
        ].map((stat, index) => (
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

              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toolbar: Templates y Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Ver Templates
          </button>

          <button
            onClick={() => setActiveModal('builder')}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Crear Nuevo Flujo
          </button>

          <button
            onClick={() => setActiveModal('segmentation')}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Target className="w-5 h-5" />
            Segmentación
          </button>
        </div>

        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xl rounded-2xl p-2 border border-white/50">
          <Filter className="w-5 h-5 text-gray-500 ml-2" />
          {['all', 'active', 'paused', 'draft'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter as any)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filter === 'all' ? 'Todos' : filter === 'active' ? 'Activos' : filter === 'paused' ? 'Pausados' : 'Borradores'}
            </button>
          ))}
        </div>
      </div>

      {/* Templates de Flujos */}
      {showTemplates && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 mb-8 border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-yellow-500" />
              Templates Predefinidos
            </h2>
            <button
              onClick={() => setShowTemplates(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedTemplate(template);
                  setActiveModal('builder');
                  setShowTemplates(false);
                }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-green-500 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="text-4xl mb-3">{template.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500">{template.nodes.length} pasos</span>
                    <ChevronRight className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Galería de Flujos Existentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredFlows.map((flow, index) => (
          <motion.div
            key={flow.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 group"
          >
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <div className="relative z-10 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{flow.name}</h3>
                  <div className="flex items-center gap-2 text-green-100">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-medium">{flow.trigger}</span>
                  </div>
                </div>
                {getStatusBadge(flow.status)}
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Pasos</p>
                  <p className="text-2xl font-bold text-indigo-600">{flow.steps}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3">
                  <p className="text-xs font-semibold text-gray-600 mb-1">Clientes Activos</p>
                  <p className="text-2xl font-bold text-purple-600">{flow.activeClients}</p>
                </div>
              </div>

              {/* Tasa de conversión */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600">Tasa de Conversión</span>
                  <span className="text-lg font-bold text-green-600">{flow.conversionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${flow.conversionRate}%` }}
                    transition={{ delay: index * 0.05 + 0.3, duration: 1 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                  ></motion.div>
                </div>
              </div>

              {/* Revenue si existe */}
              {flow.revenue && (
                <div className="flex items-center gap-2 mb-4 bg-green-50 rounded-xl p-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs font-semibold text-gray-600">Ingresos Generados</p>
                    <p className="text-lg font-bold text-green-600">${flow.revenue.toLocaleString()}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedFlow(flow);
                    setActiveModal('analytics');
                  }}
                  className="flex-1 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Ver Métricas
                </button>
                <button
                  onClick={() => {
                    setSelectedFlow(flow);
                    setActiveModal('builder');
                  }}
                  className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  title="Editar"
                >
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors" title="Duplicar">
                  <Copy className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => {
                    setSelectedFlow(flow);
                    setActiveModal('testing');
                  }}
                  className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                  title="Test"
                >
                  <TestTube className="w-4 h-4 text-blue-600" />
                </button>
                <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors" title={flow.status === 'active' ? 'Pausar' : 'Activar'}>
                  {flow.status === 'active' ? (
                    <Pause className="w-4 h-4 text-orange-600" />
                  ) : (
                    <Play className="w-4 h-4 text-green-600" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics y Optimización con IA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Historial de Ejecuciones */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Activity className="w-7 h-7 text-blue-500" />
            Historial de Ejecuciones
          </h2>

          <div className="space-y-3">
            {mockExecutions.slice(0, 5).map((exec, index) => (
              <motion.div
                key={exec.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                      {exec.clientName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{exec.clientName}</p>
                      <p className="text-xs text-gray-500">{exec.entryDate}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    exec.status === 'completed' ? 'bg-green-100 text-green-700' :
                    exec.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {exec.status === 'completed' ? 'Completado' : exec.status === 'in_progress' ? 'En Progreso' : 'Salió'}
                  </div>
                </div>

                <div className="ml-13 space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Paso actual:</span> {exec.currentStep}
                  </p>
                  {exec.nextAction !== '-' && (
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Próxima acción:</span> {exec.nextAction}
                    </p>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mt-3 ml-13">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{ width: `${exec.completionRate}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button className="mt-4 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
            Ver todos
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Optimización con IA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-purple-500" />
              Optimización con IA
            </h2>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors relative">
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform"></div>
              </div>
              <span className="text-sm font-medium text-gray-600">Auto-optimize</span>
            </label>
          </div>

          <div className="space-y-4">
            {mockAIOptimizations.map((opt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white">
                    {opt.type === 'delay' && <Clock className="w-5 h-5" />}
                    {opt.type === 'subject' && <Mail className="w-5 h-5" />}
                    {opt.type === 'content' && <FileText className="w-5 h-5" />}
                    {opt.type === 'path' && <GitBranch className="w-5 h-5" />}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 mb-2">{opt.suggestion}</p>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-purple-600 bg-white px-2 py-1 rounded-lg">
                        {opt.impact}
                      </span>
                      <span className="text-xs text-gray-500">
                        {opt.confidence}% confianza
                      </span>
                    </div>
                  </div>

                  <button className="flex-shrink-0 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-lg hover:bg-purple-700 transition-colors opacity-0 group-hover:opacity-100">
                    Aplicar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      {activeModal === 'builder' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Settings className="w-7 h-7" />
                {selectedTemplate ? `Crear desde: ${selectedTemplate.name}` : selectedFlow ? `Editar: ${selectedFlow.name}` : 'Constructor de Flujos'}
              </h2>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setSelectedTemplate(null);
                  setSelectedFlow(null);
                }}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            <FlowBuilder
              onClose={() => {
                setActiveModal(null);
                setSelectedTemplate(null);
                setSelectedFlow(null);
              }}
              templateName={selectedTemplate?.name}
              initialNodes={selectedTemplate?.nodes || selectedFlow?.nodes}
              initialEdges={selectedTemplate?.edges || selectedFlow?.edges}
            />
          </motion.div>
        </div>
      )}

      {activeModal === 'analytics' && selectedFlow && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-7 h-7" />
                Analytics: {selectedFlow.name}
              </h2>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setSelectedFlow(null);
                }}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            <FlowAnalytics
              analytics={mockAnalytics}
              onClose={() => {
                setActiveModal(null);
                setSelectedFlow(null);
              }}
            />
          </motion.div>
        </div>
      )}

      {activeModal === 'testing' && selectedFlow && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <TestTube className="w-7 h-7" />
                Test: {selectedFlow.name}
              </h2>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setSelectedFlow(null);
                }}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            <FlowTesting
              flowName={selectedFlow.name}
              onClose={() => {
                setActiveModal(null);
                setSelectedFlow(null);
              }}
            />
          </motion.div>
        </div>
      )}

      {activeModal === 'segmentation' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Target className="w-7 h-7" />
                Segmentación y Reglas
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                ✕
              </button>
            </div>

            <SegmentationRules
              onClose={() => setActiveModal(null)}
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FlujosRetencionPage;
