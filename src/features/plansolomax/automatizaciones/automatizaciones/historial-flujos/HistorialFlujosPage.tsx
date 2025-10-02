import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Bell,
  Trash2,
  Filter,
  Search,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Play,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Zap,
  Users,
  Calendar,
  BarChart3,
  Terminal,
  Settings,
  ExternalLink,
  X,
  Copy,
  AlertCircle,
  ArrowUpRight,
  Timer,
  Sparkles
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';

// Types
type ExecutionStatus = 'success' | 'failed' | 'in_progress' | 'canceled';
type LogLevel = 'INFO' | 'WARNING' | 'ERROR' | 'DEBUG';
type TriggerType = 'manual' | 'scheduled' | 'webhook' | 'event';

interface FlowExecution {
  id: string;
  flowId: string;
  flowName: string;
  timestamp: Date;
  status: ExecutionStatus;
  trigger: TriggerType;
  triggerDetails: string;
  clientId?: string;
  clientName?: string;
  clientAvatar?: string;
  duration: number;
  stepsCompleted: number;
  totalSteps: number;
  error?: string;
  errorStack?: string;
  logs: LogEntry[];
  steps: ExecutionStep[];
  inputPayload: any;
  outputPayload: any;
  variables: Record<string, any>;
}

interface ExecutionStep {
  stepNumber: number;
  nodeType: string;
  nodeName: string;
  status: 'success' | 'failed' | 'skipped';
  duration: number;
  timestamp: Date;
  output?: any;
  data?: any;
}

interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  context?: any;
}

interface DateRange {
  label: string;
  days: number;
}

const dateRanges: DateRange[] = [
  { label: 'Hoy', days: 1 },
  { label: 'Últimos 7 días', days: 7 },
  { label: 'Últimos 30 días', days: 30 },
  { label: 'Personalizado', days: -1 }
];

// Mock Data Generator
const generateMockExecutions = (): FlowExecution[] => {
  const flows = [
    { id: 'flow-1', name: 'Onboarding Email Sequence' },
    { id: 'flow-2', name: 'Lead Scoring Automation' },
    { id: 'flow-3', name: 'Abandoned Cart Recovery' },
    { id: 'flow-4', name: 'Customer Feedback Loop' },
    { id: 'flow-5', name: 'Weekly Report Generator' },
    { id: 'flow-6', name: 'Social Media Publisher' },
    { id: 'flow-7', name: 'Invoice Reminder System' },
    { id: 'flow-8', name: 'Support Ticket Classifier' }
  ];

  const clients = [
    { id: '1', name: 'Juan Pérez', avatar: 'JP' },
    { id: '2', name: 'María García', avatar: 'MG' },
    { id: '3', name: 'Carlos López', avatar: 'CL' },
    { id: '4', name: 'Ana Martínez', avatar: 'AM' },
    { id: '5', name: 'Luis Rodríguez', avatar: 'LR' }
  ];

  const errors = [
    { msg: 'Email bounce: dirección no válida', stack: 'Error at sendEmail (email.service.ts:45)\n  at executeNode (flow.executor.ts:123)' },
    { msg: 'Timeout: API externa no respondió', stack: 'TimeoutError at fetch (http.client.ts:89)\n  at callExternalAPI (integration.ts:234)' },
    { msg: 'Cliente no encontrado', stack: 'NotFoundError at findClient (client.repository.ts:67)' },
    { msg: 'Condición no cumplida: score < threshold', stack: 'ConditionError at evaluateCondition (condition.evaluator.ts:34)' },
    { msg: 'Rate limit exceeded: max 100 requests/hour', stack: 'RateLimitError at checkRateLimit (rate-limiter.ts:56)' }
  ];

  const executions: FlowExecution[] = [];
  const now = new Date();

  for (let i = 0; i < 350; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const timestamp = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000 - Math.random() * 24 * 60 * 60 * 1000);

    const flow = flows[Math.floor(Math.random() * flows.length)];
    const client = Math.random() > 0.3 ? clients[Math.floor(Math.random() * clients.length)] : undefined;

    let status: ExecutionStatus;
    const rand = Math.random();
    if (rand < 0.85) status = 'success';
    else if (rand < 0.95) status = 'failed';
    else if (rand < 0.98) status = 'in_progress';
    else status = 'canceled';

    const totalSteps = 3 + Math.floor(Math.random() * 7);
    const stepsCompleted = status === 'success' ? totalSteps :
                          status === 'in_progress' ? Math.floor(Math.random() * totalSteps) :
                          status === 'failed' ? Math.floor(Math.random() * totalSteps) :
                          Math.floor(Math.random() * totalSteps);

    const duration = 50 + Math.random() * 4950;

    const error = status === 'failed' ? errors[Math.floor(Math.random() * errors.length)] : undefined;

    const triggers: TriggerType[] = ['manual', 'scheduled', 'webhook', 'event'];
    const trigger = triggers[Math.floor(Math.random() * triggers.length)];

    const triggerDetailsMap = {
      manual: 'Iniciado manualmente por usuario',
      scheduled: 'Programado: Todos los días a las 09:00',
      webhook: 'Webhook recibido de Stripe',
      event: 'Evento: Cliente completó registro'
    };

    const steps: ExecutionStep[] = [];
    let stepTime = timestamp.getTime();
    for (let s = 0; s < totalSteps; s++) {
      const stepDuration = 10 + Math.random() * 500;
      stepTime += stepDuration;
      steps.push({
        stepNumber: s + 1,
        nodeType: ['trigger', 'action', 'condition', 'delay', 'webhook'][Math.floor(Math.random() * 5)],
        nodeName: `Paso ${s + 1}: ${['Enviar Email', 'Verificar Condición', 'Actualizar Cliente', 'Llamar API', 'Esperar 1 hora'][Math.floor(Math.random() * 5)]}`,
        status: s < stepsCompleted ? 'success' : s === stepsCompleted && status === 'failed' ? 'failed' : 'skipped',
        duration: stepDuration,
        timestamp: new Date(stepTime),
        output: { result: 'ok', data: { processed: true } },
        data: { input: 'test data' }
      });
    }

    const logs: LogEntry[] = [
      { timestamp: new Date(timestamp.getTime() + 10), level: 'INFO', message: `Iniciando ejecución del flujo ${flow.name}` },
      { timestamp: new Date(timestamp.getTime() + 100), level: 'DEBUG', message: 'Cargando configuración del flujo' },
      { timestamp: new Date(timestamp.getTime() + 200), level: 'INFO', message: `Procesando paso 1 de ${totalSteps}` }
    ];

    if (status === 'failed' && error) {
      logs.push({
        timestamp: new Date(timestamp.getTime() + duration - 50),
        level: 'ERROR',
        message: error.msg,
        context: { stack: error.stack }
      });
    } else if (status === 'success') {
      logs.push({
        timestamp: new Date(timestamp.getTime() + duration),
        level: 'INFO',
        message: 'Ejecución completada exitosamente'
      });
    }

    executions.push({
      id: `exec-${i + 1}`,
      flowId: flow.id,
      flowName: flow.name,
      timestamp,
      status,
      trigger,
      triggerDetails: triggerDetailsMap[trigger],
      clientId: client?.id,
      clientName: client?.name,
      clientAvatar: client?.avatar,
      duration,
      stepsCompleted,
      totalSteps,
      error: error?.msg,
      errorStack: error?.stack,
      logs,
      steps,
      inputPayload: { userId: client?.id || 'N/A', trigger: trigger },
      outputPayload: status === 'success' ? { success: true, processed: true } : { success: false },
      variables: { score: Math.floor(Math.random() * 100), threshold: 50 }
    });
  }

  return executions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

const HistorialFlujosPage: React.FC = () => {
  const [executions] = useState<FlowExecution[]>(generateMockExecutions());
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange>(dateRanges[2]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExecution, setSelectedExecution] = useState<FlowExecution | null>(null);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ExecutionStatus | 'all'>('all');
  const [selectedFlow, setSelectedFlow] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filtered executions
  const filteredExecutions = useMemo(() => {
    let filtered = executions;

    // Date range filter
    if (selectedDateRange.days > 0) {
      const cutoffDate = new Date(Date.now() - selectedDateRange.days * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(e => e.timestamp >= cutoffDate);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(e => e.status === selectedStatus);
    }

    // Flow filter
    if (selectedFlow !== 'all') {
      filtered = filtered.filter(e => e.flowId === selectedFlow);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(e =>
        e.id.toLowerCase().includes(query) ||
        e.flowName.toLowerCase().includes(query) ||
        e.clientName?.toLowerCase().includes(query) ||
        e.error?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [executions, selectedDateRange, selectedStatus, selectedFlow, searchQuery]);

  // Statistics - Today
  const todayStats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayExecs = executions.filter(e => e.timestamp >= today);
    return todayExecs.length;
  }, [executions]);

  // Statistics - This month
  const monthStats = useMemo(() => {
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const monthExecs = executions.filter(e => e.timestamp >= monthStart);
    const failed = monthExecs.filter(e => e.status === 'failed').length;
    return failed;
  }, [executions]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredExecutions.length;
    const successful = filteredExecutions.filter(e => e.status === 'success').length;
    const failed = filteredExecutions.filter(e => e.status === 'failed').length;
    const successRate = total > 0 ? (successful / total) * 100 : 0;
    const avgDuration = total > 0 ? filteredExecutions.reduce((sum, e) => sum + e.duration, 0) / total : 0;

    return { total, successful, failed, successRate, avgDuration };
  }, [filteredExecutions]);

  // Chart data - last 30 days
  const chartData = useMemo(() => {
    const data: { date: string; total: number; successful: number; failed: number }[] = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
      const dayExecs = executions.filter(e => {
        const execDate = new Date(e.timestamp);
        return execDate.toDateString() === date.toDateString();
      });
      data.push({
        date: dateStr,
        total: dayExecs.length,
        successful: dayExecs.filter(e => e.status === 'success').length,
        failed: dayExecs.filter(e => e.status === 'failed').length
      });
    }
    return data;
  }, [executions]);

  // Error analysis
  const errorAnalysis = useMemo(() => {
    const errorMap = new Map<string, { count: number; flows: Set<string>; lastOccurrence: Date }>();
    executions.filter(e => e.error).forEach(e => {
      const errorMsg = e.error!;
      if (!errorMap.has(errorMsg)) {
        errorMap.set(errorMsg, { count: 0, flows: new Set(), lastOccurrence: e.timestamp });
      }
      const errorData = errorMap.get(errorMsg)!;
      errorData.count++;
      errorData.flows.add(e.flowName);
      if (e.timestamp > errorData.lastOccurrence) {
        errorData.lastOccurrence = e.timestamp;
      }
    });
    return Array.from(errorMap.entries())
      .map(([error, data]) => ({ error, ...data, flows: Array.from(data.flows) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [executions]);

  // Most failed flows
  const mostFailedFlows = useMemo(() => {
    const flowMap = new Map<string, { name: string; failed: number; total: number }>();
    executions.forEach(e => {
      if (!flowMap.has(e.flowId)) {
        flowMap.set(e.flowId, { name: e.flowName, failed: 0, total: 0 });
      }
      const flowData = flowMap.get(e.flowId)!;
      flowData.total++;
      if (e.status === 'failed') flowData.failed++;
    });
    return Array.from(flowMap.values())
      .filter(f => f.failed > 0)
      .sort((a, b) => b.failed - a.failed)
      .slice(0, 3);
  }, [executions]);

  // Pagination
  const paginatedExecutions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredExecutions.slice(start, start + itemsPerPage);
  }, [filteredExecutions, currentPage]);

  const totalPages = Math.ceil(filteredExecutions.length / itemsPerPage);

  // Unique flows for filter
  const uniqueFlows = useMemo(() => {
    const flowsMap = new Map<string, string>();
    executions.forEach(e => flowsMap.set(e.flowId, e.flowName));
    return Array.from(flowsMap.entries()).map(([id, name]) => ({ id, name }));
  }, [executions]);

  const getStatusBadge = (status: ExecutionStatus) => {
    const styles = {
      success: 'bg-green-500 text-white',
      failed: 'bg-red-500 text-white',
      in_progress: 'bg-blue-500 text-white animate-pulse',
      canceled: 'bg-gray-500 text-white'
    };
    const labels = {
      success: 'Exitoso',
      failed: 'Fallido',
      in_progress: 'En progreso',
      canceled: 'Cancelado'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getStatusIcon = (status: ExecutionStatus) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'in_progress': return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'canceled': return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${Math.round(ms)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <History className="w-10 h-10 text-yellow-300" />
              </motion.div>
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Historial de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Ejecuciones</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            Monitorea y audita tus <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">automatizaciones</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{stats.successful} Exitosas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <XCircle className="w-5 h-5 text-red-300" />
              <span className="text-sm font-semibold text-white">{stats.failed} Fallidas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-emerald-300" />
              <span className="text-sm font-semibold text-white">{stats.successRate.toFixed(1)}% Tasa de Éxito</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Ejecuciones Hoy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Icono */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-8 h-8" />
            </div>

            {/* Título */}
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Ejecuciones Hoy
            </p>

            {/* Valor */}
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {todayStats}
            </p>

            {/* Barra decorativa */}
            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ delay: 0.6, duration: 1 }}
                className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tasa de Éxito */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-8 h-8" />
            </div>

            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Tasa de Éxito
            </p>

            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 mb-3">
              {stats.successRate.toFixed(1)}%
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-50 rounded-lg">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">+2.3%</span>
              <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
            </div>

            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.successRate}%` }}
                transition={{ delay: 0.7, duration: 1 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Errores Este Mes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-red-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Errores Este Mes
            </p>

            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600 mb-3">
              {monthStats}
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-red-50 rounded-lg">
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-sm font-bold text-red-600">-5.1%</span>
              <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
            </div>

            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '35%' }}
                transition={{ delay: 0.8, duration: 1 }}
                className="h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tiempo Promedio de Ejecución */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Timer className="w-8 h-8" />
            </div>

            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Tiempo Promedio
            </p>

            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-3">
              {formatDuration(stats.avgDuration)}
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1 bg-purple-50 rounded-lg">
                <Zap className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-bold text-purple-600">Optimizado</span>
            </div>

            <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ delay: 0.9, duration: 1 }}
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ANÁLISIS DE ERRORES */}
      {errorAnalysis.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-red-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Análisis de Errores</h2>
                  <p className="text-sm text-gray-600">Errores recurrentes y sugerencias</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {errorAnalysis.map((error, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 mb-1">{error.error}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-red-100 rounded-lg font-medium">{error.flows.length} flujos afectados</span>
                      <span>•</span>
                      <span>Última vez: {error.lastOccurrence.toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white shadow-xl">
                        <span className="text-xl font-bold">{error.count}</span>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">ocurrencias</span>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                      Resolver →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Automatizaciones con más fallos */}
            {mostFailedFlows.length > 0 && (
              <div className="mt-6 pt-6 border-t-2 border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Automatizaciones con Más Fallos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mostFailedFlows.map((flow, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-2xl border-2 border-red-100 shadow-md">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-red-600" />
                        <span className="font-bold text-gray-900 text-sm truncate">{flow.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-red-600">{flow.failed}</span>
                        <span className="text-xs text-gray-600">de {flow.total} ejecuciones</span>
                      </div>
                      <div className="mt-2 w-full h-2 bg-red-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-pink-600 rounded-full"
                          style={{ width: `${(flow.failed / flow.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* MÉTRICAS TEMPORALES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Métricas Temporales</h2>
              <p className="text-sm text-gray-600">Tendencias de ejecución - Últimos 30 días</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" style={{ fontSize: 12 }} />
              <YAxis stroke="#666" style={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '2px solid #f59e0b',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="total" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" name="Total" />
              <Area type="monotone" dataKey="successful" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSuccess)" name="Exitosas" />
              <Area type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorFailed)" name="Fallidas" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <Filter className="w-5 h-5" />
            Filtros Avanzados
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-2xl border-2 border-gray-200 flex-1 max-w-md hover:border-amber-500 transition-colors duration-300">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por ID, flujo, cliente, error..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Date Range Selector */}
          <div className="flex gap-2">
            {dateRanges.slice(0, 3).map(range => (
              <button
                key={range.label}
                onClick={() => setSelectedDateRange(range)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  selectedDateRange.label === range.label
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t-2 border-gray-200"
            >
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Estado</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all duration-300"
                >
                  <option value="all">Todos</option>
                  <option value="success">Exitoso</option>
                  <option value="failed">Fallido</option>
                  <option value="in_progress">En progreso</option>
                  <option value="canceled">Cancelado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Flujo</label>
                <select
                  value={selectedFlow}
                  onChange={(e) => setSelectedFlow(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none transition-all duration-300"
                >
                  <option value="all">Todos los flujos</option>
                  {uniqueFlows.map(flow => (
                    <option key={flow.id} value={flow.id}>{flow.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={() => {
                    setSelectedStatus('all');
                    setSelectedFlow('all');
                    setSearchQuery('');
                    setSelectedDateRange(dateRanges[2]);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-2xl font-bold transition-colors duration-300"
                >
                  Limpiar Filtros
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* LISTA DE EJECUCIONES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <h3 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Activity className="w-6 h-6" />
            </div>
            Timeline de Ejecuciones
            <span className="ml-auto text-sm font-normal bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {filteredExecutions.length} resultados
            </span>
          </h3>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {paginatedExecutions.map((exec, index) => (
              <motion.div
                key={exec.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                className="relative flex items-center gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300 border-2 border-transparent hover:border-orange-200 hover:shadow-lg group cursor-pointer"
                onClick={() => setSelectedExecution(exec)}
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                    exec.status === 'success' ? 'bg-gradient-to-br from-green-400 to-emerald-600' :
                    exec.status === 'failed' ? 'bg-gradient-to-br from-red-400 to-pink-600' :
                    exec.status === 'in_progress' ? 'bg-gradient-to-br from-blue-400 to-indigo-600' :
                    'bg-gradient-to-br from-gray-400 to-gray-600'
                  }`}>
                    <span className="text-white">{getStatusIcon(exec.status)}</span>
                  </div>

                  {/* Línea vertical */}
                  {index < paginatedExecutions.length - 1 && (
                    <div className="w-0.5 h-8 bg-gradient-to-b from-gray-200 to-transparent mt-2"></div>
                  )}
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-gray-900 text-lg">{exec.flowName}</span>
                        {getStatusBadge(exec.status)}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exec.timestamp.toLocaleDateString('es-ES')}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{exec.timestamp.toLocaleTimeString('es-ES')}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Timer className="w-4 h-4" />
                          <span>{formatDuration(exec.duration)}</span>
                        </div>
                        {exec.clientName && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 text-white flex items-center justify-center text-xs font-bold">
                                {exec.clientAvatar}
                              </div>
                              <span>{exec.clientName}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">Progreso</div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                exec.status === 'success' ? 'bg-gradient-to-r from-green-400 to-emerald-600' :
                                exec.status === 'failed' ? 'bg-gradient-to-r from-red-400 to-pink-600' :
                                'bg-gradient-to-r from-blue-400 to-indigo-600'
                              }`}
                              style={{ width: `${(exec.stepsCompleted / exec.totalSteps) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-900">
                            {exec.stepsCompleted}/{exec.totalSteps}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {exec.error && (
                    <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-500 rounded text-sm text-red-800">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">{exec.error}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Ver detalles button */}
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105">
                  Ver Detalles
                  <ExternalLink className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t-2 border-gray-200 flex items-center justify-between bg-gray-50">
            <div className="text-sm font-medium text-gray-600">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredExecutions.length)} de {filteredExecutions.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 hover:border-amber-500 transition-all duration-300 font-semibold"
              >
                Anterior
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-bold transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 hover:border-amber-500 transition-all duration-300 font-semibold"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* MODAL DE DETALLES DE EJECUCIÓN */}
      <AnimatePresence>
        {selectedExecution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedExecution(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white p-6 relative overflow-hidden">
                {/* Pattern de fondo */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold font-mono">{selectedExecution.id}</span>
                        {getStatusBadge(selectedExecution.status)}
                      </div>
                      <h3 className="text-2xl font-bold flex items-center gap-2">
                        <Zap className="w-6 h-6" />
                        {selectedExecution.flowName}
                      </h3>
                      <p className="text-orange-100 mt-1">
                        {selectedExecution.timestamp.toLocaleString('es-ES')}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedExecution(null)}
                      className="text-white hover:bg-white/20 p-2 rounded-xl transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                      <p className="text-orange-200 text-sm">Duración</p>
                      <p className="text-xl font-bold">{formatDuration(selectedExecution.duration)}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                      <p className="text-orange-200 text-sm">Pasos</p>
                      <p className="text-xl font-bold">{selectedExecution.stepsCompleted} / {selectedExecution.totalSteps}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                      <p className="text-orange-200 text-sm">Trigger</p>
                      <p className="text-xl font-bold capitalize">{selectedExecution.trigger}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                      <p className="text-orange-200 text-sm">Cliente</p>
                      <p className="text-xl font-bold">{selectedExecution.clientName || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
                {/* Error Section */}
                {selectedExecution.error && (
                  <div className="mb-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 bg-red-500 rounded-xl">
                        <AlertTriangle className="w-6 h-6 text-white flex-shrink-0" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-red-900 text-lg mb-2">Error Detectado</h4>
                        <p className="text-red-800 font-medium mb-3">{selectedExecution.error}</p>
                        {selectedExecution.errorStack && (
                          <details className="mt-3">
                            <summary className="cursor-pointer text-sm text-red-700 font-bold hover:text-red-900">
                              Ver Stack Trace Completo
                            </summary>
                            <pre className="mt-3 p-4 bg-red-100 rounded-xl text-xs overflow-x-auto text-red-900 font-mono border-2 border-red-200">
                              {selectedExecution.errorStack}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                    <button className="w-full mt-3 px-4 py-3 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-bold flex items-center justify-center gap-2">
                      <RefreshCw className="w-5 h-5" />
                      Reintentar Ejecución
                    </button>
                  </div>
                )}

                {/* Timeline de Pasos */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 text-xl mb-4 flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    Timeline de Pasos Ejecutados
                  </h4>
                  <div className="space-y-4">
                    {selectedExecution.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
                            step.status === 'success' ? 'bg-gradient-to-br from-green-400 to-emerald-600' :
                            step.status === 'failed' ? 'bg-gradient-to-br from-red-400 to-pink-600' :
                            'bg-gradient-to-br from-gray-300 to-gray-500'
                          }`}>
                            <span className="text-white font-bold">{step.stepNumber}</span>
                          </div>
                          {idx < selectedExecution.steps.length - 1 && (
                            <div className="w-1 h-16 bg-gradient-to-b from-gray-300 to-gray-200 my-2 rounded-full" />
                          )}
                        </div>
                        <div className={`flex-1 p-4 rounded-2xl border-2 ${
                          step.status === 'success' ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300' :
                          step.status === 'failed' ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-300' :
                          'bg-gray-50 border-gray-300'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(step.status === 'failed' ? 'failed' : step.status === 'success' ? 'success' : 'canceled')}
                              <span className="font-bold text-gray-900">{step.nodeName}</span>
                            </div>
                            <span className="text-sm font-bold text-gray-600">{formatDuration(step.duration)}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="px-2 py-1 bg-white rounded-lg font-medium capitalize">{step.nodeType}</span>
                            <span>•</span>
                            <span>{step.timestamp.toLocaleTimeString('es-ES')}</span>
                          </div>
                          {step.output && (
                            <details className="mt-3">
                              <summary className="cursor-pointer text-sm text-amber-600 font-bold hover:text-amber-800">Ver Output del Paso</summary>
                              <pre className="mt-2 p-3 bg-white rounded-xl text-xs overflow-x-auto border-2 border-gray-200 font-mono">
                                {JSON.stringify(step.output, null, 2)}
                              </pre>
                            </details>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payloads */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-blue-500 rounded-lg">
                        <Download className="w-4 h-4 text-white" />
                      </div>
                      Payload de Entrada
                    </h4>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-4">
                      <pre className="text-xs overflow-x-auto font-mono text-gray-800">
                        {JSON.stringify(selectedExecution.inputPayload, null, 2)}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="p-1.5 bg-purple-500 rounded-lg">
                        <Download className="w-4 h-4 text-white rotate-180" />
                      </div>
                      Payload de Salida
                    </h4>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-4">
                      <pre className="text-xs overflow-x-auto font-mono text-gray-800">
                        {JSON.stringify(selectedExecution.outputPayload, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Logs Técnicos */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl">
                      <Terminal className="w-5 h-5 text-white" />
                    </div>
                    Logs Técnicos Detallados
                  </h4>
                  <div className="bg-gray-900 text-gray-100 rounded-2xl p-4 font-mono text-sm max-h-60 overflow-y-auto border-4 border-gray-800">
                    {selectedExecution.logs.map((log, idx) => (
                      <div key={idx} className="mb-2 hover:bg-gray-800 p-1 rounded transition-colors">
                        <span className="text-gray-500">[{log.timestamp.toLocaleTimeString('es-ES')}]</span>
                        {' '}
                        <span className={
                          log.level === 'ERROR' ? 'text-red-400 font-bold' :
                          log.level === 'WARNING' ? 'text-yellow-400 font-bold' :
                          log.level === 'INFO' ? 'text-blue-400' :
                          'text-gray-400'
                        }>
                          [{log.level}]
                        </span>
                        {' '}
                        <span>{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t-2 border-gray-200 p-4 flex gap-3 bg-gray-50">
                <button
                  onClick={() => setSelectedExecution(null)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-2xl hover:bg-gray-100 transition-colors font-bold"
                >
                  Cerrar
                </button>
                <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-bold">
                  <Copy className="w-4 h-4" />
                  Copiar ID
                </button>
                <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-bold">
                  <Download className="w-4 h-4" />
                  Exportar Log
                </button>
                <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-bold">
                  <ExternalLink className="w-4 h-4" />
                  Ver Flujo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alerts Config Modal */}
      <AnimatePresence>
        {showAlertsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAlertsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
            >
              <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Bell className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Configurar Alertas</h3>
                  </div>
                  <button
                    onClick={() => setShowAlertsModal(false)}
                    className="hover:bg-white/20 p-2 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-4 border-2 border-amber-200 rounded-2xl hover:border-amber-400 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-r from-amber-50 to-orange-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Tasa de Fallo Elevada</h4>
                      <p className="text-sm text-gray-600">Alerta cuando la tasa de fallo supere el umbral</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 rounded" defaultChecked />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input type="number" defaultValue="10" className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none" />
                    <span className="text-sm text-gray-600 font-medium">% de fallos</span>
                  </div>
                </div>

                <div className="p-4 border-2 border-amber-200 rounded-2xl hover:border-amber-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Flujo Inactivo</h4>
                      <p className="text-sm text-gray-600">Alerta cuando un flujo no se ejecute por cierto tiempo</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 rounded" />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input type="number" defaultValue="7" className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none" />
                    <span className="text-sm text-gray-600 font-medium">días sin ejecutarse</span>
                  </div>
                </div>

                <div className="p-4 border-2 border-amber-200 rounded-2xl hover:border-amber-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Duración Excesiva</h4>
                      <p className="text-sm text-gray-600">Alerta cuando una ejecución tarde demasiado</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 rounded" />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input type="number" defaultValue="30" className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-amber-500 outline-none" />
                    <span className="text-sm text-gray-600 font-medium">segundos</span>
                  </div>
                </div>

                <div className="pt-4 border-t-2 border-gray-200">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Canal de Notificación</label>
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-100 focus:border-amber-500 outline-none">
                    <option>Email</option>
                    <option>Notificación In-App</option>
                    <option>Webhook</option>
                    <option>Slack</option>
                  </select>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 p-4 flex gap-3 bg-gray-50">
                <button
                  onClick={() => setShowAlertsModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-2xl hover:bg-gray-100 transition-colors font-bold"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowAlertsModal(false)}
                  className="flex-1 px-4 py-3 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 font-bold"
                >
                  Guardar Configuración
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAlertsModal(true)}
          className="p-4 bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300"
          title="Configurar Alertas"
        >
          <Bell className="w-6 h-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          title="Exportar Logs"
        >
          <Download className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default HistorialFlujosPage;
