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
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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
  const [showLogsView, setShowLogsView] = useState(false);
  const [showAlertsModal, setShowAlertsModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ExecutionStatus | 'all'>('all');
  const [selectedFlow, setSelectedFlow] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

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

  // Active executions
  const activeExecutions = useMemo(() =>
    filteredExecutions.filter(e => e.status === 'in_progress').slice(0, 5),
    [filteredExecutions]
  );

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

  // Pagination
  const paginatedExecutions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredExecutions.slice(start, start + itemsPerPage);
  }, [filteredExecutions, currentPage]);

  const totalPages = Math.ceil(filteredExecutions.length / itemsPerPage);

  // Unique flows for filter
  const uniqueFlows = useMemo(() => {
    const flows = new Set(executions.map(e => ({ id: e.flowId, name: e.flowName })));
    return Array.from(flows);
  }, [executions]);

  const getStatusBadge = (status: ExecutionStatus) => {
    const styles = {
      success: 'bg-green-100 text-green-800 border-green-300',
      failed: 'bg-red-100 text-red-800 border-red-300',
      in_progress: 'bg-blue-100 text-blue-800 border-blue-300 animate-pulse',
      canceled: 'bg-gray-100 text-gray-800 border-gray-300'
    };
    const labels = {
      success: 'Exitoso',
      failed: 'Fallido',
      in_progress: 'En progreso',
      canceled: 'Cancelado'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
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

  const getLogLevelColor = (level: LogLevel) => {
    switch (level) {
      case 'INFO': return 'text-blue-600';
      case 'WARNING': return 'text-yellow-600';
      case 'ERROR': return 'text-red-600';
      case 'DEBUG': return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-gray-50 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <History className="w-8 h-8 text-purple-600" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Historial de Ejecuciones
            </h1>
            <p className="text-gray-600">Logs y monitoreo de flujos automatizados</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex flex-wrap gap-3 mt-4">
          {/* Date Range Selector */}
          <div className="flex gap-2">
            {dateRanges.map(range => (
              <button
                key={range.label}
                onClick={() => setSelectedDateRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDateRange.label === range.label
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 ml-auto">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              Exportar Logs
            </button>
            <button
              onClick={() => setShowAlertsModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-4 h-4" />
              Configurar Alertas
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors text-red-600">
              <Trash2 className="w-4 h-4" />
              Limpiar Logs Antiguos
            </button>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <span className="text-gray-600 text-sm font-medium">Total Ejecuciones</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md border border-green-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-gray-600 text-sm font-medium">Exitosas</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.successful}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-md border border-red-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="text-gray-600 text-sm font-medium">Fallidas</span>
          </div>
          <p className="text-3xl font-bold text-red-600">{stats.failed}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-md border border-blue-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span className="text-gray-600 text-sm font-medium">Tasa de Éxito</span>
          </div>
          <p className={`text-3xl font-bold ${stats.successRate >= 90 ? 'text-green-600' : stats.successRate >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
            {stats.successRate.toFixed(1)}%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-md border border-purple-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-gray-600 text-sm font-medium">Tiempo Promedio</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatDuration(stats.avgDuration)}</p>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-md mb-6"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Ejecuciones - Últimos 30 Días</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" stroke="#666" style={{ fontSize: 12 }} />
            <YAxis stroke="#666" style={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
            />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={2} name="Total" dot={{ r: 3 }} />
            <Line type="monotone" dataKey="successful" stroke="#10b981" strokeWidth={2} name="Exitosas" dot={{ r: 3 }} />
            <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} name="Fallidas" dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Active Executions */}
      {activeExecutions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg mb-6 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <Play className="w-6 h-6" />
            <h2 className="text-xl font-bold">Ejecuciones Activas ({activeExecutions.length})</h2>
          </div>
          <div className="space-y-3">
            {activeExecutions.map(exec => (
              <div key={exec.id} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="font-medium">{exec.flowName}</span>
                    {exec.clientName && <span className="text-sm opacity-90">→ {exec.clientName}</span>}
                  </div>
                  <span className="text-sm opacity-90">
                    {formatDuration(Date.now() - exec.timestamp.getTime())}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-white h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(exec.stepsCompleted / exec.totalSteps) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-sm opacity-90">
                    Paso {exec.stepsCompleted} de {exec.totalSteps}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Error Analysis */}
      {errorAnalysis.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-md mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">Errores Recurrentes</h2>
          </div>
          <div className="space-y-3">
            {errorAnalysis.map((error, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{error.error}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {error.flows.join(', ')} • Última vez: {error.lastOccurrence.toLocaleString('es-ES')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full font-bold">
                    {error.count}x
                  </span>
                  <button className="text-purple-600 hover:text-purple-800 font-medium text-sm">
                    Ver Ocurrencias →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white p-4 rounded-xl shadow-md mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-800"
          >
            <Filter className="w-5 h-5" />
            Filtros Avanzados
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border flex-1 max-w-md ml-4">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por ID, flujo, cliente, error..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-900"
            />
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                >
                  <option value="all">Todos</option>
                  <option value="success">Exitoso</option>
                  <option value="failed">Fallido</option>
                  <option value="in_progress">En progreso</option>
                  <option value="canceled">Cancelado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flujo</label>
                <select
                  value={selectedFlow}
                  onChange={(e) => setSelectedFlow(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
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
                  }}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Limpiar Filtros
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Executions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Flujo</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trigger</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Duración</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Pasos</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedExecutions.map((exec) => (
                <motion.tr
                  key={exec.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-purple-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono text-gray-900">{exec.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        {exec.timestamp.toLocaleDateString('es-ES')}
                      </div>
                      <div className="text-gray-500">
                        {exec.timestamp.toLocaleTimeString('es-ES')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">{exec.flowName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{exec.triggerDetails}</div>
                  </td>
                  <td className="px-6 py-4">
                    {exec.clientName ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">
                          {exec.clientAvatar}
                        </div>
                        <span className="text-sm text-gray-900">{exec.clientName}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(exec.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{formatDuration(exec.duration)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {exec.stepsCompleted} / {exec.totalSteps}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedExecution(exec)}
                      className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      Ver Detalles
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredExecutions.length)} de {filteredExecutions.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
                      className={`w-10 h-10 rounded-lg font-medium ${
                        currentPage === page
                          ? 'bg-purple-600 text-white'
                          : 'hover:bg-gray-50'
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
                className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Execution Details Modal */}
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
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold">{selectedExecution.id}</span>
                      {getStatusBadge(selectedExecution.status)}
                    </div>
                    <h3 className="text-xl font-medium flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      {selectedExecution.flowName}
                    </h3>
                    <p className="text-purple-100 mt-1">
                      {selectedExecution.timestamp.toLocaleString('es-ES')}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedExecution(null)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-purple-200 text-sm">Duración</p>
                    <p className="text-lg font-bold">{formatDuration(selectedExecution.duration)}</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Pasos Completados</p>
                    <p className="text-lg font-bold">{selectedExecution.stepsCompleted} / {selectedExecution.totalSteps}</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-sm">Trigger</p>
                    <p className="text-lg font-bold capitalize">{selectedExecution.trigger}</p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
                {/* Error Section */}
                {selectedExecution.error && (
                  <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-bold text-red-900 mb-2">Error Detectado</h4>
                        <p className="text-red-800 font-medium mb-3">{selectedExecution.error}</p>
                        {selectedExecution.errorStack && (
                          <details className="mt-2">
                            <summary className="cursor-pointer text-sm text-red-700 font-medium hover:text-red-900">
                              Ver Stack Trace
                            </summary>
                            <pre className="mt-2 p-3 bg-red-100 rounded text-xs overflow-x-auto text-red-900 font-mono">
                              {selectedExecution.errorStack}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                    <button className="w-full mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                      Reintentar Ejecución
                    </button>
                  </div>
                )}

                {/* Timeline */}
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    Timeline de Ejecución
                  </h4>
                  <div className="space-y-3">
                    {selectedExecution.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.status === 'success' ? 'bg-green-100 text-green-600' :
                            step.status === 'failed' ? 'bg-red-100 text-red-600' :
                            'bg-gray-100 text-gray-400'
                          }`}>
                            {getStatusIcon(step.status === 'failed' ? 'failed' : step.status === 'success' ? 'success' : 'canceled')}
                          </div>
                          {idx < selectedExecution.steps.length - 1 && (
                            <div className="w-0.5 h-12 bg-gray-200 my-1" />
                          )}
                        </div>
                        <div className={`flex-1 p-4 rounded-lg border-2 ${
                          step.status === 'success' ? 'bg-green-50 border-green-200' :
                          step.status === 'failed' ? 'bg-red-50 border-red-200' :
                          'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-gray-900">Paso {step.stepNumber}: {step.nodeName}</span>
                            <span className="text-sm text-gray-600">{formatDuration(step.duration)}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="capitalize">{step.nodeType}</span>
                            <span>•</span>
                            <span>{step.timestamp.toLocaleTimeString('es-ES')}</span>
                          </div>
                          {step.output && (
                            <details className="mt-2">
                              <summary className="cursor-pointer text-sm text-purple-600 font-medium">Ver Output</summary>
                              <pre className="mt-2 p-2 bg-white rounded text-xs overflow-x-auto">
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
                    <h4 className="font-bold text-gray-900 mb-3">Payload de Entrada</h4>
                    <div className="bg-gray-50 border rounded-lg p-4">
                      <pre className="text-xs overflow-x-auto">
                        {JSON.stringify(selectedExecution.inputPayload, null, 2)}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Payload de Salida</h4>
                    <div className="bg-gray-50 border rounded-lg p-4">
                      <pre className="text-xs overflow-x-auto">
                        {JSON.stringify(selectedExecution.outputPayload, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Logs */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-purple-600" />
                    Logs Técnicos
                  </h4>
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm max-h-60 overflow-y-auto">
                    {selectedExecution.logs.map((log, idx) => (
                      <div key={idx} className="mb-1">
                        <span className="text-gray-500">[{log.timestamp.toLocaleTimeString('es-ES')}]</span>
                        {' '}
                        <span className={
                          log.level === 'ERROR' ? 'text-red-400 font-bold' :
                          log.level === 'WARNING' ? 'text-yellow-400' :
                          log.level === 'INFO' ? 'text-blue-400' :
                          'text-gray-400'
                        }>
                          {log.level}
                        </span>
                        {' '}
                        <span>{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t p-4 flex gap-3">
                <button
                  onClick={() => setSelectedExecution(null)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cerrar
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                  <Download className="w-4 h-4" />
                  Exportar Log
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
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
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full"
            >
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-6 h-6" />
                    <h3 className="text-2xl font-bold">Configurar Alertas</h3>
                  </div>
                  <button
                    onClick={() => setShowAlertsModal(false)}
                    className="hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Tasa de Fallo Elevada</h4>
                      <p className="text-sm text-gray-600">Alerta cuando la tasa de fallo supere el umbral</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input type="number" defaultValue="10" className="w-20 px-3 py-2 border rounded-lg" />
                    <span className="text-sm text-gray-600">% de fallos</span>
                  </div>
                </div>

                <div className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Flujo Inactivo</h4>
                      <p className="text-sm text-gray-600">Alerta cuando un flujo no se ejecute por cierto tiempo</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input type="number" defaultValue="7" className="w-20 px-3 py-2 border rounded-lg" />
                    <span className="text-sm text-gray-600">días sin ejecutarse</span>
                  </div>
                </div>

                <div className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Duración Excesiva</h4>
                      <p className="text-sm text-gray-600">Alerta cuando una ejecución tarde demasiado</p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <input type="number" defaultValue="30" className="w-20 px-3 py-2 border rounded-lg" />
                    <span className="text-sm text-gray-600">segundos</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Canal de Notificación</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                    <option>Email</option>
                    <option>Notificación In-App</option>
                    <option>Webhook</option>
                  </select>
                </div>
              </div>

              <div className="border-t p-4 flex gap-3">
                <button
                  onClick={() => setShowAlertsModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowAlertsModal(false)}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Guardar Configuración
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistorialFlujosPage;