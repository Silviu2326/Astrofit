import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Zap,
  Activity,
  Target,
  TrendingUp,
  Plus,
  Play,
  FileText,
  Edit2,
  Copy,
  Trash2,
  GripVertical,
  Check,
  X,
  Eye,
  Download,
  Upload,
  GitBranch,
  Clock,
  Users,
  DollarSign,
  Filter,
  Search,
  Calendar,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Sparkles,
  BarChart3,
  RefreshCw,
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// ===================== TIPOS =====================

type TriggerType =
  | 'registro'
  | 'compra'
  | 'sesiones_completadas'
  | 'dias_activo'
  | 'aniversario'
  | 'perfil_actualizado'
  | 'dashboard_ingreso'
  | 'fecha_especifica'
  | 'pago_vencer'
  | 'programa_finalizado'
  | 'programado_diario'
  | 'programado_semanal'
  | 'programado_mensual';

type ConditionField =
  | 'tipo_membresia'
  | 'meses_activo'
  | 'adherencia'
  | 'sesiones_completadas'
  | 'ltv'
  | 'productos_contratados'
  | 'ultima_actividad'
  | 'edad'
  | 'objetivo_fitness'
  | 'etiquetas';

type ConditionOperator =
  | 'igual'
  | 'diferente'
  | 'mayor'
  | 'menor'
  | 'mayor_igual'
  | 'menor_igual'
  | 'entre'
  | 'contiene'
  | 'empieza_con'
  | 'esta_en'
  | 'no_esta_en'
  | 'es_verdadero'
  | 'es_falso';

type ActionType =
  | 'mostrar_oferta'
  | 'enviar_email'
  | 'crear_notificacion'
  | 'asignar_etiqueta'
  | 'crear_tarea'
  | 'webhook';

interface Condition {
  id: string;
  field: ConditionField;
  operator: ConditionOperator;
  value: string;
}

interface Action {
  type: ActionType;
  config: {
    offerId?: string;
    where?: string;
    when?: string;
    frequency?: string;
    message?: string;
    [key: string]: any;
  };
}

interface Rule {
  id: string;
  name: string;
  description: string;
  active: boolean;
  priority: number;
  trigger: {
    type: TriggerType;
    config?: any;
  };
  conditions: Condition[];
  conditionsLogic: 'AND' | 'OR';
  actions: Action[];
  limits: {
    maxPerClient?: number;
    maxPerDay?: number;
    cooldownDays?: number;
  };
  exclusions: string[];
  stats: {
    executions: number;
    conversions: number;
    conversionRate: number;
    revenue: number;
    lastExecution?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface ExecutionLog {
  id: string;
  timestamp: string;
  ruleId: string;
  ruleName: string;
  clientId: string;
  clientName: string;
  trigger: string;
  conditionsResult: boolean;
  actionTaken: string;
  result: 'success' | 'failed';
  details: string;
}

// ===================== DATOS MOCKEADOS =====================

const MOCK_RULES: Rule[] = [
  {
    id: 'rule-1',
    name: 'Upgrade Premium tras 3 meses',
    description: 'Ofrece plan Premium a clientes básicos con buena adherencia',
    active: true,
    priority: 1,
    trigger: { type: 'aniversario', config: { months: 3 } },
    conditions: [
      { id: 'c1', field: 'tipo_membresia', operator: 'igual', value: 'Básica' },
      { id: 'c2', field: 'adherencia', operator: 'mayor', value: '75' },
    ],
    conditionsLogic: 'AND',
    actions: [
      {
        type: 'mostrar_oferta',
        config: {
          offerId: 'premium-upgrade',
          where: 'Dashboard',
          when: 'Inmediato',
          frequency: 'Una vez',
        },
      },
    ],
    limits: { maxPerClient: 1, cooldownDays: 90 },
    exclusions: ['VIP', 'Ya tiene Premium'],
    stats: {
      executions: 45,
      conversions: 7,
      conversionRate: 15.6,
      revenue: 2100,
      lastExecution: '2025-09-29T14:30:00',
    },
    createdAt: '2025-08-15',
    updatedAt: '2025-09-20',
  },
  {
    id: 'rule-2',
    name: 'Cross-sell Nutrición',
    description: 'Ofrece plan de nutrición a clientes comprometidos sin él',
    active: true,
    priority: 2,
    trigger: { type: 'sesiones_completadas', config: { count: 20 } },
    conditions: [
      { id: 'c3', field: 'adherencia', operator: 'mayor_igual', value: '80' },
      { id: 'c4', field: 'productos_contratados', operator: 'no_esta_en', value: 'Nutrición' },
    ],
    conditionsLogic: 'AND',
    actions: [
      {
        type: 'mostrar_oferta',
        config: {
          offerId: 'nutricion-addon',
          where: 'Email',
          when: 'Delay 2 días',
          frequency: 'Una vez',
        },
      },
    ],
    limits: { maxPerClient: 1, maxPerDay: 10 },
    exclusions: [],
    stats: {
      executions: 32,
      conversions: 7,
      conversionRate: 21.9,
      revenue: 960,
      lastExecution: '2025-09-28T10:15:00',
    },
    createdAt: '2025-07-20',
    updatedAt: '2025-09-15',
  },
  {
    id: 'rule-3',
    name: 'Bundle Alto Valor',
    description: 'Ofrece bundle completo a clientes de alto LTV',
    active: true,
    priority: 3,
    trigger: { type: 'ltv', config: { threshold: 500 } },
    conditions: [
      { id: 'c5', field: 'ltv', operator: 'mayor', value: '500' },
      { id: 'c6', field: 'meses_activo', operator: 'mayor_igual', value: '6' },
    ],
    conditionsLogic: 'AND',
    actions: [
      {
        type: 'mostrar_oferta',
        config: {
          offerId: 'bundle-vip',
          where: 'Pop-up',
          when: 'Inmediato',
        },
      },
      { type: 'asignar_etiqueta', config: { tag: 'Alto Valor' } },
    ],
    limits: { maxPerClient: 2 },
    exclusions: ['Ya tiene Bundle'],
    stats: {
      executions: 12,
      conversions: 5,
      conversionRate: 41.7,
      revenue: 3500,
      lastExecution: '2025-09-27T16:45:00',
    },
    createdAt: '2025-06-10',
    updatedAt: '2025-09-10',
  },
  {
    id: 'rule-4',
    name: 'Aniversario 6 meses',
    description: 'Regalo especial al cumplir 6 meses activo',
    active: true,
    priority: 4,
    trigger: { type: 'aniversario', config: { months: 6 } },
    conditions: [{ id: 'c7', field: 'adherencia', operator: 'mayor', value: '70' }],
    conditionsLogic: 'AND',
    actions: [
      {
        type: 'enviar_email',
        config: {
          template: 'aniversario-6m',
          message: '¡{nombre}, 6 meses juntos! 🎉 Descuento especial para ti',
        },
      },
      {
        type: 'mostrar_oferta',
        config: {
          offerId: 'descuento-aniversario',
          where: 'Dashboard',
        },
      },
    ],
    limits: { maxPerClient: 1 },
    exclusions: [],
    stats: {
      executions: 8,
      conversions: 2,
      conversionRate: 25.0,
      revenue: 240,
      lastExecution: '2025-09-25T09:00:00',
    },
    createdAt: '2025-05-05',
    updatedAt: '2025-09-05',
  },
  {
    id: 'rule-5',
    name: 'Reactivar Inactivos',
    description: 'Oferta especial para clientes sin actividad reciente',
    active: false,
    priority: 5,
    trigger: { type: 'ultima_actividad', config: { days: 30 } },
    conditions: [
      { id: 'c8', field: 'ultima_actividad', operator: 'mayor', value: '30' },
      { id: 'c9', field: 'meses_activo', operator: 'mayor', value: '2' },
    ],
    conditionsLogic: 'AND',
    actions: [
      {
        type: 'enviar_email',
        config: {
          template: 'reactivacion',
          message: 'Te extrañamos {nombre}! 20% descuento para volver',
        },
      },
    ],
    limits: { maxPerClient: 3, cooldownDays: 60 },
    exclusions: ['Cancelado'],
    stats: {
      executions: 18,
      conversions: 2,
      conversionRate: 11.1,
      revenue: 180,
      lastExecution: '2025-09-20T08:00:00',
    },
    createdAt: '2025-04-15',
    updatedAt: '2025-09-01',
  },
  {
    id: 'rule-6',
    name: 'Programa Completado',
    description: 'Felicita y ofrece siguiente nivel al completar programa',
    active: true,
    priority: 6,
    trigger: { type: 'programa_finalizado' },
    conditions: [{ id: 'c10', field: 'adherencia', operator: 'mayor_igual', value: '85' }],
    conditionsLogic: 'AND',
    actions: [
      {
        type: 'crear_notificacion',
        config: { message: '¡Programa completado! 🏆 Siguiente nivel disponible' },
      },
      {
        type: 'mostrar_oferta',
        config: { offerId: 'programa-avanzado' },
      },
    ],
    limits: {},
    exclusions: [],
    stats: {
      executions: 15,
      conversions: 9,
      conversionRate: 60.0,
      revenue: 1350,
      lastExecution: '2025-09-26T12:30:00',
    },
    createdAt: '2025-08-01',
    updatedAt: '2025-09-18',
  },
  {
    id: 'rule-7',
    name: 'Renovación Anual Descuento',
    description: 'Ofrece descuento por renovación anual anticipada',
    active: true,
    priority: 7,
    trigger: { type: 'pago_vencer', config: { daysBeforeExpiry: 30 } },
    conditions: [
      { id: 'c11', field: 'tipo_membresia', operator: 'esta_en', value: 'Mensual' },
      { id: 'c12', field: 'meses_activo', operator: 'mayor_igual', value: '6' },
    ],
    conditionsLogic: 'AND',
    actions: [
      {
        type: 'mostrar_oferta',
        config: {
          offerId: 'anual-descuento',
          where: 'Email',
          message: 'Cambia a anual y ahorra 15%',
        },
      },
    ],
    limits: { maxPerClient: 1 },
    exclusions: ['Ya es anual'],
    stats: {
      executions: 22,
      conversions: 5,
      conversionRate: 22.7,
      revenue: 1650,
      lastExecution: '2025-09-28T15:00:00',
    },
    createdAt: '2025-07-10',
    updatedAt: '2025-09-12',
  },
  {
    id: 'rule-8',
    name: 'Sesiones Semanales',
    description: 'Promoción de sesiones adicionales cada lunes',
    active: true,
    priority: 8,
    trigger: { type: 'programado_semanal', config: { dayOfWeek: 1, time: '08:00' } },
    conditions: [
      { id: 'c13', field: 'sesiones_completadas', operator: 'mayor', value: '10' },
    ],
    conditionsLogic: 'AND',
    actions: [
      {
        type: 'crear_notificacion',
        config: { message: 'Nueva semana, nueva oportunidad! 💪 Sesiones extra disponibles' },
      },
    ],
    limits: { maxPerDay: 50 },
    exclusions: [],
    stats: {
      executions: 64,
      conversions: 12,
      conversionRate: 18.8,
      revenue: 480,
      lastExecution: '2025-09-23T08:00:00',
    },
    createdAt: '2025-06-20',
    updatedAt: '2025-09-20',
  },
  {
    id: 'rule-9',
    name: 'Welcome Series Día 7',
    description: 'Oferta especial al séptimo día de registro',
    active: true,
    priority: 9,
    trigger: { type: 'dias_activo', config: { days: 7 } },
    conditions: [
      { id: 'c14', field: 'sesiones_completadas', operator: 'mayor_igual', value: '3' },
    ],
    conditionsLogic: 'AND',
    actions: [
      {
        type: 'enviar_email',
        config: {
          template: 'welcome-day7',
          message: '¡Primera semana completada! Aquí está tu recompensa',
        },
      },
    ],
    limits: { maxPerClient: 1 },
    exclusions: [],
    stats: {
      executions: 28,
      conversions: 11,
      conversionRate: 39.3,
      revenue: 770,
      lastExecution: '2025-09-29T10:00:00',
    },
    createdAt: '2025-08-05',
    updatedAt: '2025-09-22',
  },
  {
    id: 'rule-10',
    name: 'Objetivo Alcanzado Celebración',
    description: 'Celebra cuando cliente alcanza su objetivo fitness',
    active: true,
    priority: 10,
    trigger: { type: 'objetivo_fitness', config: { achieved: true } },
    conditions: [],
    conditionsLogic: 'AND',
    actions: [
      {
        type: 'crear_notificacion',
        config: { message: '🎯 ¡Objetivo alcanzado! Establece tu próximo reto' },
      },
      { type: 'asignar_etiqueta', config: { tag: 'Objetivo Logrado' } },
      {
        type: 'mostrar_oferta',
        config: { offerId: 'proximo-nivel' },
      },
    ],
    limits: {},
    exclusions: [],
    stats: {
      executions: 11,
      conversions: 8,
      conversionRate: 72.7,
      revenue: 880,
      lastExecution: '2025-09-27T18:20:00',
    },
    createdAt: '2025-07-15',
    updatedAt: '2025-09-19',
  },
];

const MOCK_LOGS: ExecutionLog[] = [
  {
    id: 'log-1',
    timestamp: '2025-09-29T14:30:00',
    ruleId: 'rule-1',
    ruleName: 'Upgrade Premium tras 3 meses',
    clientId: 'client-101',
    clientName: 'María González',
    trigger: 'Aniversario 3 meses',
    conditionsResult: true,
    actionTaken: 'Mostrar oferta Premium en Dashboard',
    result: 'success',
    details: 'Cliente cumple todas las condiciones. Oferta mostrada exitosamente.',
  },
  {
    id: 'log-2',
    timestamp: '2025-09-29T10:15:00',
    ruleId: 'rule-9',
    ruleName: 'Welcome Series Día 7',
    clientId: 'client-102',
    clientName: 'Carlos Ruiz',
    trigger: '7 días activo',
    conditionsResult: true,
    actionTaken: 'Email enviado con oferta especial',
    result: 'success',
    details: 'Email enviado exitosamente. Cliente ha completado 5 sesiones.',
  },
  {
    id: 'log-3',
    timestamp: '2025-09-28T15:00:00',
    ruleId: 'rule-7',
    ruleName: 'Renovación Anual Descuento',
    clientId: 'client-103',
    clientName: 'Ana Martínez',
    trigger: 'Pago vence en 30 días',
    conditionsResult: true,
    actionTaken: 'Email con oferta anual enviado',
    result: 'success',
    details: 'Cliente con 8 meses activo. Oferta de renovación anual presentada.',
  },
  {
    id: 'log-4',
    timestamp: '2025-09-28T10:15:00',
    ruleId: 'rule-2',
    ruleName: 'Cross-sell Nutrición',
    clientId: 'client-104',
    clientName: 'Pedro Sánchez',
    trigger: '20 sesiones completadas',
    conditionsResult: false,
    actionTaken: 'Ninguna',
    result: 'failed',
    details: 'Cliente no cumple condiciones: adherencia 68% (requiere >80%)',
  },
  {
    id: 'log-5',
    timestamp: '2025-09-27T18:20:00',
    ruleId: 'rule-10',
    ruleName: 'Objetivo Alcanzado Celebración',
    clientId: 'client-105',
    clientName: 'Laura Fernández',
    trigger: 'Objetivo fitness alcanzado',
    conditionsResult: true,
    actionTaken: 'Notificación creada + Etiqueta asignada + Oferta mostrada',
    result: 'success',
    details: 'Cliente logró objetivo de peso. Oferta de siguiente nivel presentada.',
  },
  {
    id: 'log-6',
    timestamp: '2025-09-27T16:45:00',
    ruleId: 'rule-3',
    ruleName: 'Bundle Alto Valor',
    clientId: 'client-106',
    clientName: 'Jorge López',
    trigger: 'LTV superó €500',
    conditionsResult: true,
    actionTaken: 'Pop-up con Bundle VIP + Etiqueta Alto Valor',
    result: 'success',
    details: 'Cliente con LTV €540 y 9 meses activo. Bundle VIP ofrecido.',
  },
];

const EXECUTION_TREND_DATA = [
  { date: '24 Sep', ejecuciones: 12, conversiones: 3 },
  { date: '25 Sep', ejecuciones: 8, conversiones: 2 },
  { date: '26 Sep', ejecuciones: 15, conversiones: 9 },
  { date: '27 Sep', ejecuciones: 18, conversiones: 5 },
  { date: '28 Sep', ejecuciones: 14, conversiones: 7 },
  { date: '29 Sep', ejecuciones: 11, conversiones: 4 },
];

const TRIGGER_LABELS: Record<TriggerType, string> = {
  registro: 'Cliente se registra',
  compra: 'Cliente hace compra',
  sesiones_completadas: 'Sesiones completadas',
  dias_activo: 'Días activo alcanzados',
  aniversario: 'Aniversario (meses)',
  perfil_actualizado: 'Perfil actualizado',
  dashboard_ingreso: 'Ingreso a Dashboard',
  fecha_especifica: 'Fecha específica',
  pago_vencer: 'Pago próximo a vencer',
  programa_finalizado: 'Programa finalizado',
  programado_diario: 'Programado diario',
  programado_semanal: 'Programado semanal',
  programado_mensual: 'Programado mensual',
};

const FIELD_LABELS: Record<ConditionField, string> = {
  tipo_membresia: 'Tipo de membresía',
  meses_activo: 'Meses activo',
  adherencia: 'Adherencia (%)',
  sesiones_completadas: 'Sesiones completadas',
  ltv: 'LTV (€)',
  productos_contratados: 'Productos contratados',
  ultima_actividad: 'Última actividad (días)',
  edad: 'Edad',
  objetivo_fitness: 'Objetivo fitness',
  etiquetas: 'Etiquetas',
};

const OPERATOR_LABELS: Record<ConditionOperator, string> = {
  igual: '=',
  diferente: '≠',
  mayor: '>',
  menor: '<',
  mayor_igual: '≥',
  menor_igual: '≤',
  entre: 'entre',
  contiene: 'contiene',
  empieza_con: 'empieza con',
  esta_en: 'está en',
  no_esta_en: 'no está en',
  es_verdadero: 'es verdadero',
  es_falso: 'es falso',
};

const ACTION_LABELS: Record<ActionType, string> = {
  mostrar_oferta: 'Mostrar oferta',
  enviar_email: 'Enviar email',
  crear_notificacion: 'Crear notificación',
  asignar_etiqueta: 'Asignar etiqueta',
  crear_tarea: 'Crear tarea',
  webhook: 'Webhook',
};

const TEMPLATES = [
  {
    id: 'template-1',
    name: 'Upgrade tras 3 meses activo',
    description: 'Ofrece plan superior a clientes con buen engagement',
    icon: TrendingUp,
    color: 'emerald',
  },
  {
    id: 'template-2',
    name: 'Cross-sell nutrición',
    description: 'Añade servicio de nutrición a clientes comprometidos',
    icon: Target,
    color: 'blue',
  },
  {
    id: 'template-3',
    name: 'Oferta de aniversario',
    description: 'Celebra hitos con ofertas especiales',
    icon: Sparkles,
    color: 'purple',
  },
  {
    id: 'template-4',
    name: 'Reactivar clientes inactivos',
    description: 'Recupera clientes sin actividad reciente',
    icon: RefreshCw,
    color: 'orange',
  },
  {
    id: 'template-5',
    name: 'Bundle para alto valor',
    description: 'Ofrece paquetes premium a mejores clientes',
    icon: Zap,
    color: 'yellow',
  },
  {
    id: 'template-6',
    name: 'Descuento renovación anual',
    description: 'Incentiva cambio de plan mensual a anual',
    icon: DollarSign,
    color: 'green',
  },
];

// ===================== COMPONENTE PRINCIPAL =====================

const ConfiguracionUpsellsPage: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>(MOCK_RULES);
  const [logs, setLogs] = useState<ExecutionLog[]>(MOCK_LOGS);
  const [view, setView] = useState<'list' | 'templates' | 'logs' | 'analytics'>('list');
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);

  const handleFilter = () => {
    console.log('Filtrando upsells...');
    // Lógica para filtrar
  };

  const handleExport = () => {
    console.log('Exportando upsells...');
    // Lógica para exportar
  };
  const [showRuleBuilder, setShowRuleBuilder] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [showLogDetail, setShowLogDetail] = useState<ExecutionLog | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  // Estadísticas calculadas
  const totalActiveRules = rules.filter((r) => r.active).length;
  const totalExecutionsToday = logs.filter((l) => {
    const logDate = new Date(l.timestamp);
    const today = new Date();
    return logDate.toDateString() === today.toDateString();
  }).length;
  const avgSuccessRate =
    rules.reduce((acc, r) => acc + r.stats.conversionRate, 0) / rules.length;
  const totalOffersGenerated = rules.reduce((acc, r) => acc + r.stats.executions, 0);

  const toggleRuleActive = (ruleId: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === ruleId ? { ...r, active: !r.active } : r))
    );
  };

  const deleteRule = (ruleId: string) => {
    if (confirm('¿Eliminar esta regla? Esta acción no se puede deshacer.')) {
      setRules((prev) => prev.filter((r) => r.id !== ruleId));
    }
  };

  const duplicateRule = (rule: Rule) => {
    const newRule: Rule = {
      ...rule,
      id: `rule-${Date.now()}`,
      name: `${rule.name} (Copia)`,
      active: false,
      stats: {
        executions: 0,
        conversions: 0,
        conversionRate: 0,
        revenue: 0,
      },
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setRules((prev) => [...prev, newRule]);
  };

  const filteredRules = rules
    .filter((r) => {
      if (filterStatus === 'active') return r.active;
      if (filterStatus === 'inactive') return !r.active;
      return true;
    })
    .filter(
      (r) =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="p-3 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-xl shadow-lg"
              >
                <Settings className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  Motor de Reglas de Upsells
                </h1>
                <p className="text-slate-600 mt-1">
                  Automatiza ofertas inteligentes basadas en comportamiento
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTestModal(true)}
                className="px-4 py-2 bg-white border-2 border-blue-200 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Test de Reglas
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setView('logs')}
                className="px-4 py-2 bg-white border-2 border-emerald-200 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Ver Logs
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowRuleBuilder(true)}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Nueva Regla
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Zap}
            label="Reglas Activas"
            value={totalActiveRules}
            color="emerald"
            trend="+3 esta semana"
          />
          <StatCard
            icon={Activity}
            label="Triggers Ejecutados Hoy"
            value={totalExecutionsToday}
            color="blue"
            trend="12% más que ayer"
          />
          <StatCard
            icon={Target}
            label="Tasa de Éxito Promedio"
            value={`${avgSuccessRate.toFixed(1)}%`}
            color="purple"
            trend="+2.3% vs mes anterior"
          />
          <StatCard
            icon={TrendingUp}
            label="Ofertas Automatizadas"
            value={totalOffersGenerated}
            color="orange"
            trend="Total generadas"
          />
        </div>

        {/* Navegación de Vistas */}
        <div className="flex gap-2 mb-6 border-b border-slate-200">
          <TabButton
            active={view === 'list'}
            onClick={() => setView('list')}
            icon={GitBranch}
            label="Reglas"
          />
          <TabButton
            active={view === 'templates'}
            onClick={() => setView('templates')}
            icon={Sparkles}
            label="Plantillas"
          />
          <TabButton
            active={view === 'logs'}
            onClick={() => setView('logs')}
            icon={FileText}
            label="Logs"
          />
          <TabButton
            active={view === 'analytics'}
            onClick={() => setView('analytics')}
            icon={BarChart3}
            label="Análisis"
          />
        </div>

        {/* Contenido según vista */}
        <AnimatePresence mode="wait">
          {view === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Barra de búsqueda y filtros */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar reglas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <FilterButton
                    active={filterStatus === 'all'}
                    onClick={() => setFilterStatus('all')}
                    label="Todas"
                  />
                  <FilterButton
                    active={filterStatus === 'active'}
                    onClick={() => setFilterStatus('active')}
                    label="Activas"
                  />
                  <FilterButton
                    active={filterStatus === 'inactive'}
                    onClick={() => setFilterStatus('inactive')}
                    label="Inactivas"
                  />
                </div>
              </div>

              {/* Lista de Reglas */}
              <div className="space-y-4">
                {filteredRules.map((rule, index) => (
                  <RuleCard
                    key={rule.id}
                    rule={rule}
                    index={index}
                    onToggle={() => toggleRuleActive(rule.id)}
                    onEdit={() => {
                      setSelectedRule(rule);
                      setShowRuleBuilder(true);
                    }}
                    onDuplicate={() => duplicateRule(rule)}
                    onDelete={() => deleteRule(rule.id)}
                    onTest={() => {
                      setSelectedRule(rule);
                      setShowTestModal(true);
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {view === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Plantillas de Reglas
                </h2>
                <p className="text-slate-600">
                  Comienza rápidamente con reglas predefinidas y personalizables
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TEMPLATES.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </motion.div>
          )}

          {view === 'logs' && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    Logs de Ejecución
                  </h2>
                  <p className="text-slate-600">
                    Historial de triggers y acciones ejecutadas
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleFilter}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                  >
                    <Filter className="w-4 h-4" />
                    Filtrar
                  </button>
                  <button 
                    onClick={handleExport}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Exportar
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Regla
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Trigger
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Resultado
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                          Acción
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {logs.map((log) => (
                        <LogRow
                          key={log.id}
                          log={log}
                          onClick={() => setShowLogDetail(log)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <AnalyticsView rules={rules} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modales */}
        <AnimatePresence>
          {showRuleBuilder && (
            <RuleBuilderModal
              rule={selectedRule}
              onClose={() => {
                setShowRuleBuilder(false);
                setSelectedRule(null);
              }}
              onSave={(rule) => {
                if (selectedRule) {
                  setRules((prev) =>
                    prev.map((r) => (r.id === rule.id ? rule : r))
                  );
                } else {
                  setRules((prev) => [...prev, rule]);
                }
                setShowRuleBuilder(false);
                setSelectedRule(null);
              }}
            />
          )}

          {showTestModal && (
            <TestRuleModal
              rule={selectedRule}
              onClose={() => {
                setShowTestModal(false);
                setSelectedRule(null);
              }}
            />
          )}

          {showLogDetail && (
            <LogDetailModal
              log={showLogDetail}
              onClose={() => setShowLogDetail(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ===================== COMPONENTES AUXILIARES =====================

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  trend: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color, trend }) => {
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600 bg-emerald-50 text-emerald-600',
    blue: 'from-blue-500 to-blue-600 bg-blue-50 text-blue-600',
    purple: 'from-purple-500 to-purple-600 bg-purple-50 text-purple-600',
    orange: 'from-orange-500 to-orange-600 bg-orange-50 text-orange-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-slate-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses].split(' ')[2]} ${colorClasses[color as keyof typeof colorClasses].split(' ')[3]}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
      <div className="text-sm text-slate-600 mb-2">{label}</div>
      <div className="text-xs text-slate-500">{trend}</div>
    </motion.div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon: Icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 flex items-center gap-2 font-medium transition-colors relative ${
        active
          ? 'text-emerald-600'
          : 'text-slate-600 hover:text-slate-800'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-600"
        />
      )}
    </button>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        active
          ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg'
          : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
      }`}
    >
      {label}
    </button>
  );
};

interface RuleCardProps {
  rule: Rule;
  index: number;
  onToggle: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onTest: () => void;
}

const RuleCard: React.FC<RuleCardProps> = ({
  rule,
  index,
  onToggle,
  onEdit,
  onDuplicate,
  onDelete,
  onTest,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all ${
        rule.active ? 'border-emerald-200' : 'border-slate-200'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Drag Handle & Priority */}
        <div className="flex flex-col items-center gap-2">
          <GripVertical className="w-5 h-5 text-slate-400 cursor-move" />
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
            {rule.priority}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-slate-800">{rule.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    rule.active
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {rule.active ? 'Activa' : 'Inactiva'}
                </span>
              </div>
              <p className="text-slate-600 text-sm mb-3">{rule.description}</p>

              {/* Trigger */}
              <div className="flex items-center gap-2 text-sm mb-3">
                <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  {TRIGGER_LABELS[rule.trigger.type]}
                </div>
                {rule.conditions.length > 0 && (
                  <div className="text-slate-500">
                    → {rule.conditions.length} condicion
                    {rule.conditions.length !== 1 ? 'es' : ''}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Ejecutada</div>
                  <div className="text-lg font-bold text-slate-800">
                    {rule.stats.executions}x
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Conversiones</div>
                  <div className="text-lg font-bold text-emerald-600">
                    {rule.stats.conversions}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Tasa de éxito</div>
                  <div className="text-lg font-bold text-purple-600">
                    {rule.stats.conversionRate.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Ingresos</div>
                  <div className="text-lg font-bold text-orange-600">
                    €{rule.stats.revenue}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-slate-100"
                  >
                    <div className="space-y-3">
                      {/* Condiciones */}
                      {rule.conditions.length > 0 && (
                        <div>
                          <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
                            Condiciones ({rule.conditionsLogic})
                          </div>
                          <div className="space-y-1">
                            {rule.conditions.map((cond) => (
                              <div
                                key={cond.id}
                                className="text-sm text-slate-700 flex items-center gap-2"
                              >
                                <ChevronRight className="w-3 h-3 text-slate-400" />
                                {FIELD_LABELS[cond.field]} {OPERATOR_LABELS[cond.operator]}{' '}
                                <span className="font-semibold">{cond.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Acciones */}
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
                          Acciones
                        </div>
                        <div className="space-y-1">
                          {rule.actions.map((action, idx) => (
                            <div
                              key={idx}
                              className="text-sm text-slate-700 flex items-center gap-2"
                            >
                              <Check className="w-3 h-3 text-emerald-500" />
                              {ACTION_LABELS[action.type]}
                              {action.config.offerId && (
                                <span className="text-slate-500">
                                  ({action.config.offerId})
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Límites */}
                      {(rule.limits.maxPerClient ||
                        rule.limits.maxPerDay ||
                        rule.limits.cooldownDays) && (
                        <div>
                          <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
                            Límites
                          </div>
                          <div className="flex gap-3 text-xs text-slate-600">
                            {rule.limits.maxPerClient && (
                              <span>Max/cliente: {rule.limits.maxPerClient}</span>
                            )}
                            {rule.limits.maxPerDay && (
                              <span>Max/día: {rule.limits.maxPerDay}</span>
                            )}
                            {rule.limits.cooldownDays && (
                              <span>Cooldown: {rule.limits.cooldownDays}d</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Toggle */}
            <button
              onClick={onToggle}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                rule.active ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <motion.div
                animate={{ x: rule.active ? 24 : 0 }}
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md"
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              {expanded ? (
                <>
                  <ChevronDown className="w-4 h-4" />
                  Ocultar detalles
                </>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4" />
                  Ver detalles
                </>
              )}
            </button>
            <div className="flex gap-2">
              <IconButton onClick={onTest} icon={Play} tooltip="Probar regla" />
              <IconButton onClick={onEdit} icon={Edit2} tooltip="Editar" />
              <IconButton onClick={onDuplicate} icon={Copy} tooltip="Duplicar" />
              <IconButton
                onClick={onDelete}
                icon={Trash2}
                tooltip="Eliminar"
                variant="danger"
              />
            </div>
          </div>

          {/* Last execution */}
          {rule.stats.lastExecution && (
            <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Última ejecución:{' '}
              {new Date(rule.stats.lastExecution).toLocaleString('es-ES', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface IconButtonProps {
  onClick: () => void;
  icon: React.ElementType;
  tooltip: string;
  variant?: 'default' | 'danger';
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon: Icon,
  tooltip,
  variant = 'default',
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      title={tooltip}
      className={`p-2 rounded-lg transition-colors ${
        variant === 'danger'
          ? 'hover:bg-red-50 text-slate-400 hover:text-red-600'
          : 'hover:bg-slate-100 text-slate-400 hover:text-slate-600'
      }`}
    >
      <Icon className="w-4 h-4" />
    </motion.button>
  );
};

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    color: string;
  };
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const Icon = template.icon;
  const colorClasses = {
    emerald: 'from-emerald-500 to-emerald-600 bg-emerald-50 text-emerald-600',
    blue: 'from-blue-500 to-blue-600 bg-blue-50 text-blue-600',
    purple: 'from-purple-500 to-purple-600 bg-purple-50 text-purple-600',
    orange: 'from-orange-500 to-orange-600 bg-orange-50 text-orange-600',
    yellow: 'from-yellow-500 to-yellow-600 bg-yellow-50 text-yellow-600',
    green: 'from-green-500 to-green-600 bg-green-50 text-green-600',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-slate-100 cursor-pointer group"
    >
      <div
        className={`w-12 h-12 rounded-lg ${colorClasses[template.color as keyof typeof colorClasses].split(' ')[1]} ${colorClasses[template.color as keyof typeof colorClasses].split(' ')[2]} flex items-center justify-center mb-4`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">{template.name}</h3>
      <p className="text-sm text-slate-600 mb-4">{template.description}</p>
      <button className="w-full py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Usar Plantilla
      </button>
    </motion.div>
  );
};

interface LogRowProps {
  log: ExecutionLog;
  onClick: () => void;
}

const LogRow: React.FC<LogRowProps> = ({ log, onClick }) => {
  return (
    <tr
      onClick={onClick}
      className="hover:bg-slate-50 cursor-pointer transition-colors"
    >
      <td className="px-4 py-3 text-sm text-slate-600">
        {new Date(log.timestamp).toLocaleString('es-ES', {
          day: '2-digit',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </td>
      <td className="px-4 py-3">
        <div className="text-sm font-medium text-slate-800">{log.ruleName}</div>
      </td>
      <td className="px-4 py-3">
        <div className="text-sm text-slate-700">{log.clientName}</div>
        <div className="text-xs text-slate-500">{log.clientId}</div>
      </td>
      <td className="px-4 py-3">
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
          {log.trigger}
        </span>
      </td>
      <td className="px-4 py-3">
        {log.result === 'success' ? (
          <div className="flex items-center gap-1 text-emerald-600">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Éxito</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-red-600">
            <X className="w-4 h-4" />
            <span className="text-sm font-medium">Fallida</span>
          </div>
        )}
      </td>
      <td className="px-4 py-3">
        <button className="text-blue-600 hover:text-blue-700">
          <Eye className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};

interface AnalyticsViewProps {
  rules: Rule[];
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ rules }) => {
  const topRulesByConversion = [...rules]
    .sort((a, b) => b.stats.conversionRate - a.stats.conversionRate)
    .slice(0, 5);

  const topRulesByRevenue = [...rules]
    .sort((a, b) => b.stats.revenue - a.stats.revenue)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Análisis de Desempeño</h2>
        <p className="text-slate-600">
          Métricas detalladas y tendencias de tus reglas de upsell
        </p>
      </div>

      {/* Tendencia de Ejecuciones */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">
          Tendencia de Ejecuciones
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={EXECUTION_TREND_DATA}>
            <defs>
              <linearGradient id="colorEjec" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorConv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey="ejecuciones"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorEjec)"
            />
            <Area
              type="monotone"
              dataKey="conversiones"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorConv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top Reglas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Por Conversión */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Top 5 por Tasa de Conversión
          </h3>
          <div className="space-y-3">
            {topRulesByConversion.map((rule, idx) => (
              <div key={rule.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">{rule.name}</div>
                  <div className="text-xs text-slate-500">
                    {rule.stats.conversions}/{rule.stats.executions} conversiones
                  </div>
                </div>
                <div className="text-lg font-bold text-purple-600">
                  {rule.stats.conversionRate.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Por Ingresos */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-orange-600" />
            Top 5 por Ingresos Generados
          </h3>
          <div className="space-y-3">
            {topRulesByRevenue.map((rule, idx) => (
              <div key={rule.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">{rule.name}</div>
                  <div className="text-xs text-slate-500">
                    {rule.stats.executions} ejecuciones
                  </div>
                </div>
                <div className="text-lg font-bold text-orange-600">
                  €{rule.stats.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Optimizaciones Sugeridas
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <span>
                  La regla "Reactivar Inactivos" tiene baja conversión (11.1%). Considera
                  ajustar las condiciones o mejorar la oferta.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <span>
                  "Objetivo Alcanzado Celebración" tiene excelente conversión (72.7%).
                  Considera crear reglas similares para otros hitos.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <span>
                  El "Bundle Alto Valor" genera €3,500 con solo 12 ejecuciones. Amplía las
                  condiciones para alcanzar más clientes potenciales.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===================== MODALES =====================

interface RuleBuilderModalProps {
  rule: Rule | null;
  onClose: () => void;
  onSave: (rule: Rule) => void;
}

const RuleBuilderModal: React.FC<RuleBuilderModalProps> = ({ rule, onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<Rule>>(
    rule || {
      name: '',
      description: '',
      active: false,
      priority: 1,
      trigger: { type: 'registro' },
      conditions: [],
      conditionsLogic: 'AND',
      actions: [],
      limits: {},
      exclusions: [],
    }
  );

  const handleSave = () => {
    const newRule: Rule = {
      id: rule?.id || `rule-${Date.now()}`,
      name: formData.name || '',
      description: formData.description || '',
      active: formData.active || false,
      priority: formData.priority || 1,
      trigger: formData.trigger || { type: 'registro' },
      conditions: formData.conditions || [],
      conditionsLogic: formData.conditionsLogic || 'AND',
      actions: formData.actions || [],
      limits: formData.limits || {},
      exclusions: formData.exclusions || [],
      stats: rule?.stats || {
        executions: 0,
        conversions: 0,
        conversionRate: 0,
        revenue: 0,
      },
      createdAt: rule?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    onSave(newRule);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              {rule ? 'Editar Regla' : 'Nueva Regla de Upsell'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          {/* Progress */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  s <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800">
                Paso 1: Información Básica
              </h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre de la regla
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Upgrade Premium tras 3 meses"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe qué hace esta regla..."
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Prioridad
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: Number(e.target.value) })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value={1}>Alta (1)</option>
                  <option value={5}>Media (5)</option>
                  <option value={10}>Baja (10)</option>
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800">
                Paso 2: Definir Trigger
              </h3>
              <p className="text-sm text-slate-600">¿Cuándo se debe evaluar esta regla?</p>
              <div className="grid grid-cols-2 gap-3">
                {(
                  Object.keys(TRIGGER_LABELS) as TriggerType[]
                ).map((triggerType) => (
                  <button
                    key={triggerType}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        trigger: { type: triggerType },
                      })
                    }
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.trigger?.type === triggerType
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-medium text-slate-800">
                      {TRIGGER_LABELS[triggerType]}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800">
                Paso 3: Condiciones
              </h3>
              <p className="text-sm text-slate-600">¿A quién aplica esta regla?</p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Constructor de condiciones: Implementa aquí el visual query builder tipo
                  "if-then" con selección de campos, operadores y valores. Por razones de
                  brevedad, este modal muestra la estructura básica.
                </p>
              </div>
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Añadir Condición
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800">Paso 4: Acción</h3>
              <p className="text-sm text-slate-600">¿Qué hacer cuando se cumplen las condiciones?</p>
              <div className="space-y-3">
                {(Object.keys(ACTION_LABELS) as ActionType[]).map((actionType) => (
                  <button
                    key={actionType}
                    className="w-full p-4 rounded-lg border-2 border-slate-200 hover:border-emerald-500 text-left transition-all"
                  >
                    {ACTION_LABELS[actionType]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800">
                Paso 5: Límites y Exclusiones
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Máximo por cliente
                  </label>
                  <input
                    type="number"
                    placeholder="Ej: 1"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Máximo por día
                  </label>
                  <input
                    type="number"
                    placeholder="Ej: 10"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cooldown (días)
                  </label>
                  <input
                    type="number"
                    placeholder="Ej: 90"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800">
                Paso 6: Revisión y Activación
              </h3>
              <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Nombre</div>
                  <div className="text-lg font-bold text-slate-800">
                    {formData.name || 'Sin nombre'}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">Trigger</div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded inline-block">
                    {formData.trigger
                      ? TRIGGER_LABELS[formData.trigger.type]
                      : 'No definido'}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-500 mb-1">
                    Estimación de Impacto
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-slate-500">Clientes potenciales</div>
                      <div className="text-2xl font-bold text-emerald-600">~45</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                      <div className="text-xs text-slate-500">Ejecuciones/mes</div>
                      <div className="text-2xl font-bold text-blue-600">~60</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <input
                    type="checkbox"
                    id="activate"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData({ ...formData, active: e.target.checked })
                    }
                    className="w-5 h-5 text-emerald-600"
                  />
                  <label htmlFor="activate" className="text-sm font-medium text-slate-700">
                    Activar regla inmediatamente
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 p-6 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Anterior
          </button>
          <div className="text-sm text-slate-600">
            Paso {step} de 6
          </div>
          {step < 6 ? (
            <button
              onClick={() => setStep(Math.min(6, step + 1))}
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              Guardar Regla
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

interface TestRuleModalProps {
  rule: Rule | null;
  onClose: () => void;
}

const TestRuleModal: React.FC<TestRuleModalProps> = ({ rule, onClose }) => {
  const [testResult, setTestResult] = useState<boolean | null>(null);
  const [testDetails, setTestDetails] = useState<string>('');

  const runTest = () => {
    // Simular test
    const success = Math.random() > 0.4;
    setTestResult(success);
    if (success) {
      setTestDetails(
        'Cliente cumple todas las condiciones. La regla se ejecutaría correctamente.'
      );
    } else {
      setTestDetails(
        'Cliente NO cumple condiciones: adherencia 68% (requiere >75%)'
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Probar Regla</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Seleccionar cliente de prueba
            </label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
              <option>María González (cliente-101)</option>
              <option>Carlos Ruiz (cliente-102)</option>
              <option>Ana Martínez (cliente-103)</option>
            </select>
          </div>

          <button
            onClick={runTest}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            Ejecutar Test
          </button>

          {testResult !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-xl ${
                testResult
                  ? 'bg-emerald-50 border-2 border-emerald-200'
                  : 'bg-red-50 border-2 border-red-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                {testResult ? (
                  <>
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-lg font-bold text-emerald-800">
                      Regla se ejecutaría
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-lg font-bold text-red-800">
                      Regla NO se ejecutaría
                    </div>
                  </>
                )}
              </div>
              <p
                className={`text-sm ${
                  testResult ? 'text-emerald-700' : 'text-red-700'
                }`}
              >
                {testDetails}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

interface LogDetailModalProps {
  log: ExecutionLog;
  onClose: () => void;
}

const LogDetailModal: React.FC<LogDetailModalProps> = ({ log, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Detalles de Ejecución</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
                Timestamp
              </div>
              <div className="text-sm text-slate-800">
                {new Date(log.timestamp).toLocaleString('es-ES')}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
                Resultado
              </div>
              <div>
                {log.result === 'success' ? (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                    Éxito
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    Fallida
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">Regla</div>
            <div className="text-lg font-bold text-slate-800">{log.ruleName}</div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
              Cliente
            </div>
            <div className="text-sm text-slate-800">{log.clientName}</div>
            <div className="text-xs text-slate-500">{log.clientId}</div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
              Trigger
            </div>
            <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded inline-block text-sm">
              {log.trigger}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
              Acción Tomada
            </div>
            <div className="text-sm text-slate-800">{log.actionTaken}</div>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
              Detalles
            </div>
            <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-700">
              {log.details}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfiguracionUpsellsPage;
