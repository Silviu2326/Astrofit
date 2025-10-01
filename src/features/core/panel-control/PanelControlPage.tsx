import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  RefreshCw,
  Download,
  Settings,
  Calendar,
  Server,
  Database,
  Wifi,
  HardDrive,
  Activity,
  AlertTriangle,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Award,
  LifeBuoy,
  Clock,
  UserPlus,
  ChevronUp,
  ChevronDown,
  Minus,
  Search,
  Filter,
  Eye,
  Edit,
  Ban,
  Trash2,
  Shield,
  Lock,
  Unlock,
  Bell,
  Power,
  HardDriveDownload,
  Cloud,
  Globe,
  Cpu,
  MemoryStick,
  Zap,
  CheckCircle,
  XCircle,
  Info,
  AlertCircle,
  BarChart3,
  PieChart,
  LineChart,
  TrendingDown,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  ShoppingCart,
  Repeat,
} from 'lucide-react';
import {
  LineChart as RechartsLine,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from 'recharts';

// Tipos
interface SystemStatus {
  name: string;
  status: 'online' | 'warning' | 'offline';
  metric: string;
  subMetric: string;
  icon: React.ReactNode;
  trend: number[];
}

interface KPI {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
  gradient: string;
  sparklineData: number[];
}

interface MonthlyData {
  month: string;
  ingresos: number;
  recurrentes: number;
  unicos: number;
  clientes: number;
  activos: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Pro' | 'Enterprise';
  status: 'online' | 'offline';
  joinDate: string;
  country: string;
}

interface LogEntry {
  id: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  timestamp: string;
  message: string;
}

interface ToggleSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  critical?: boolean;
}

interface Backup {
  id: string;
  date: string;
  size: string;
  status: 'success' | 'failed';
  type: 'automatic' | 'manual';
}

interface OnlineUser {
  id: string;
  name: string;
  avatar: string;
  lastActivity: string;
  location: string;
  device: string;
  sessionDuration: string;
}

const PanelControlPage: React.FC = () => {
  // Estados
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'custom'>('week');
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [logFilter, setLogFilter] = useState<'ALL' | 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'>('ALL');
  const [settings, setSettings] = useState<ToggleSetting[]>([
    { id: 'maintenance', label: 'Modo Mantenimiento', description: 'Deshabilita el acceso público', enabled: false, critical: true },
    { id: 'registration', label: 'Registro de Usuarios', description: 'Permite nuevos registros', enabled: true },
    { id: 'push', label: 'Notificaciones Push', description: 'Envío de notificaciones', enabled: true },
    { id: 'backup', label: 'Auto-backup', description: 'Respaldo automático diario', enabled: true },
    { id: 'debug', label: 'Debug Mode', description: 'Logs detallados', enabled: false },
    { id: 'ssl', label: 'SSL Enforcement', description: 'Forzar conexiones HTTPS', enabled: true },
    { id: 'ratelimit', label: 'Rate Limiting', description: 'Límite de requests', enabled: true },
    { id: 'cors', label: 'CORS Settings', description: 'Configuración CORS', enabled: true },
  ]);

  // Datos mockeados - Estado del Sistema
  const systemStatus: SystemStatus[] = [
    {
      name: 'Servidor',
      status: 'online',
      metric: 'CPU: 34%',
      subMetric: 'RAM: 8.2GB / 16GB',
      icon: <Server className="w-6 h-6" />,
      trend: [20, 35, 28, 40, 34, 38, 34],
    },
    {
      name: 'Base de Datos',
      status: 'online',
      metric: '24 conexiones',
      subMetric: '1,245 queries/seg',
      icon: <Database className="w-6 h-6" />,
      trend: [800, 1200, 1100, 1300, 1245, 1400, 1245],
    },
    {
      name: 'APIs Externas',
      status: 'online',
      metric: '5/5 activas',
      subMetric: 'Latencia: 124ms',
      icon: <Wifi className="w-6 h-6" />,
      trend: [100, 120, 110, 130, 124, 115, 124],
    },
    {
      name: 'Almacenamiento',
      status: 'warning',
      metric: '425GB / 500GB',
      subMetric: '85% utilizado',
      icon: <HardDrive className="w-6 h-6" />,
      trend: [70, 72, 75, 78, 80, 83, 85],
    },
    {
      name: 'Tráfico de Red',
      status: 'online',
      metric: '234 Mbps',
      subMetric: 'Pico: 450 Mbps',
      icon: <Activity className="w-6 h-6" />,
      trend: [200, 250, 220, 300, 234, 280, 234],
    },
    {
      name: 'Errores Recientes',
      status: 'online',
      metric: '3 errores',
      subMetric: 'Última hora',
      icon: <AlertTriangle className="w-6 h-6" />,
      trend: [5, 3, 7, 2, 3, 4, 3],
    },
  ];

  // Datos de gráficos - 12 meses históricos
  const monthlyData: MonthlyData[] = [
    { month: 'Ene', ingresos: 35000, recurrentes: 28000, unicos: 7000, clientes: 120, activos: 95 },
    { month: 'Feb', ingresos: 38500, recurrentes: 30500, unicos: 8000, clientes: 145, activos: 118 },
    { month: 'Mar', ingresos: 42000, recurrentes: 33000, unicos: 9000, clientes: 178, activos: 152 },
    { month: 'Abr', ingresos: 45800, recurrentes: 36500, unicos: 9300, clientes: 203, activos: 180 },
    { month: 'May', ingresos: 48200, recurrentes: 38800, unicos: 9400, clientes: 234, activos: 212 },
    { month: 'Jun', ingresos: 52000, recurrentes: 42000, unicos: 10000, clientes: 267, activos: 245 },
    { month: 'Jul', ingresos: 55500, recurrentes: 45000, unicos: 10500, clientes: 298, activos: 278 },
    { month: 'Ago', ingresos: 59000, recurrentes: 48000, unicos: 11000, clientes: 332, activos: 310 },
    { month: 'Sep', ingresos: 62500, recurrentes: 51000, unicos: 11500, clientes: 365, activos: 342 },
    { month: 'Oct', ingresos: 66000, recurrentes: 54000, unicos: 12000, clientes: 398, activos: 375 },
    { month: 'Nov', ingresos: 69500, recurrentes: 57000, unicos: 12500, clientes: 432, activos: 408 },
    { month: 'Dic', ingresos: 73000, recurrentes: 60000, unicos: 13000, clientes: 467, activos: 441 },
  ];

  // KPIs de Negocio
  const kpis: KPI[] = [
    {
      label: 'Ingresos Totales',
      value: '$73,000',
      change: 15.8,
      icon: <CircleDollarSign className="w-5 h-5" />,
      trend: 'up',
      gradient: 'from-emerald-500 to-teal-500',
      sparklineData: [35, 38, 42, 45, 48, 52, 55, 59, 62, 66, 69, 73]
    },
    {
      label: 'Nuevos Clientes',
      value: '467',
      change: 12.5,
      icon: <UserPlus className="w-5 h-5" />,
      trend: 'up',
      gradient: 'from-blue-500 to-indigo-500',
      sparklineData: [120, 145, 178, 203, 234, 267, 298, 332, 365, 398, 432, 467]
    },
    {
      label: 'Retención',
      value: '94.4%',
      change: 5.3,
      icon: <Repeat className="w-5 h-5" />,
      trend: 'up',
      gradient: 'from-purple-500 to-pink-500',
      sparklineData: [79, 81, 85, 88, 90, 91, 93, 93, 93, 94, 94, 94]
    },
    {
      label: 'Sesiones Completadas',
      value: '8,934',
      change: 8.7,
      icon: <CheckCircle className="w-5 h-5" />,
      trend: 'up',
      gradient: 'from-green-500 to-emerald-500',
      sparklineData: [520, 610, 720, 810, 890, 980, 1050, 1120, 1180, 1240, 1300, 1350]
    },
    {
      label: 'Tasa de Conversión',
      value: '4.7%',
      change: 1.2,
      icon: <Target className="w-5 h-5" />,
      trend: 'up',
      gradient: 'from-orange-500 to-red-500',
      sparklineData: [3.2, 3.5, 3.8, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.6, 4.7]
    },
    {
      label: 'MRR',
      value: '$60,000',
      change: 9.2,
      icon: <DollarSign className="w-5 h-5" />,
      trend: 'up',
      gradient: 'from-cyan-500 to-blue-500',
      sparklineData: [28, 30, 33, 36, 38, 42, 45, 48, 51, 54, 57, 60]
    },
  ];

  // Usuarios recientes
  const recentUsers: User[] = [
    { id: '1', name: 'Ana García', email: 'ana.garcia@email.com', plan: 'Pro', status: 'online', joinDate: '2025-09-28', country: 'España' },
    { id: '2', name: 'Carlos Ruiz', email: 'carlos.ruiz@email.com', plan: 'Free', status: 'offline', joinDate: '2025-09-28', country: 'México' },
    { id: '3', name: 'María López', email: 'maria.lopez@email.com', plan: 'Enterprise', status: 'online', joinDate: '2025-09-27', country: 'Argentina' },
    { id: '4', name: 'Juan Pérez', email: 'juan.perez@email.com', plan: 'Pro', status: 'online', joinDate: '2025-09-27', country: 'Colombia' },
    { id: '5', name: 'Laura Martín', email: 'laura.martin@email.com', plan: 'Free', status: 'offline', joinDate: '2025-09-26', country: 'España' },
  ];

  // Logs del sistema
  const systemLogs: LogEntry[] = [
    { id: '1', level: 'INFO', timestamp: '2025-09-30 14:32:15', message: 'Usuario ana.garcia@email.com inició sesión desde 192.168.1.15' },
    { id: '2', level: 'INFO', timestamp: '2025-09-30 14:30:42', message: 'Backup automático completado exitosamente (425GB)' },
    { id: '3', level: 'WARN', timestamp: '2025-09-30 14:28:33', message: 'Alto uso de CPU detectado: 85% durante 5 minutos' },
    { id: '4', level: 'ERROR', timestamp: '2025-09-30 14:25:18', message: 'Fallo en conexión a API externa: payment-gateway.com (timeout)' },
    { id: '5', level: 'DEBUG', timestamp: '2025-09-30 14:22:05', message: 'Cache limpiado: 2,345 entradas removidas, memoria liberada: 512MB' },
    { id: '6', level: 'INFO', timestamp: '2025-09-30 14:20:11', message: 'Nueva suscripción Pro: juan.perez@email.com ($29/mes)' },
    { id: '7', level: 'WARN', timestamp: '2025-09-30 14:15:22', message: 'Intento de login fallido desde IP 45.123.67.89 (3 intentos)' },
    { id: '8', level: 'INFO', timestamp: '2025-09-30 14:12:44', message: 'Certificado SSL renovado automáticamente, válido hasta 2026-09-30' },
    { id: '9', level: 'ERROR', timestamp: '2025-09-30 14:10:33', message: 'Query lenta detectada: SELECT * FROM users WHERE... (2.3s)' },
    { id: '10', level: 'DEBUG', timestamp: '2025-09-30 14:05:15', message: 'Tarea programada ejecutada: cleanup_old_sessions (234 sesiones eliminadas)' },
  ];

  // Backups
  const backups: Backup[] = [
    { id: '1', date: '2025-09-30 02:00', size: '425 GB', status: 'success', type: 'automatic' },
    { id: '2', date: '2025-09-29 02:00', size: '422 GB', status: 'success', type: 'automatic' },
    { id: '3', date: '2025-09-28 15:30', size: '420 GB', status: 'success', type: 'manual' },
    { id: '4', date: '2025-09-28 02:00', size: '419 GB', status: 'success', type: 'automatic' },
    { id: '5', date: '2025-09-27 02:00', size: '418 GB', status: 'failed', type: 'automatic' },
  ];

  // Usuarios online
  const onlineUsers: OnlineUser[] = [
    { id: '1', name: 'Ana García', avatar: 'AG', lastActivity: 'Hace 2 min', location: 'Madrid, ES', device: 'Chrome / macOS', sessionDuration: '1h 23m' },
    { id: '2', name: 'Carlos Ruiz', avatar: 'CR', lastActivity: 'Hace 5 min', location: 'CDMX, MX', device: 'Firefox / Windows', sessionDuration: '45m' },
    { id: '3', name: 'María López', avatar: 'ML', lastActivity: 'Hace 1 min', location: 'Buenos Aires, AR', device: 'Safari / iOS', sessionDuration: '2h 15m' },
    { id: '4', name: 'Juan Pérez', avatar: 'JP', lastActivity: 'Activo ahora', location: 'Bogotá, CO', device: 'Chrome / Android', sessionDuration: '38m' },
  ];

  // Alertas críticas
  const criticalAlerts = [
    { id: '1', type: 'warning', message: 'Almacenamiento al 85% de capacidad', time: 'Hace 15 min', action: 'Ver detalles' },
    { id: '2', type: 'info', message: 'Actualización de seguridad disponible', time: 'Hace 2 horas', action: 'Actualizar' },
    { id: '3', type: 'error', message: '3 intentos de login fallidos desde IP sospechosa', time: 'Hace 30 min', action: 'Bloquear IP' },
  ];

  // Actividad reciente
  const recentActivity = [
    { id: '1', type: 'client', avatar: '👤', title: 'Nuevo cliente', description: 'Ana García se registró con plan Pro', time: 'Hace 2 min', badge: 'Nuevo', badgeColor: 'bg-green-500' },
    { id: '2', type: 'payment', avatar: '💰', title: 'Pago recibido', description: '$149 de Empresa XYZ Corp - Plan Enterprise', time: 'Hace 5 min', badge: 'Pago', badgeColor: 'bg-emerald-500' },
    { id: '3', type: 'session', avatar: '✅', title: 'Sesión completada', description: 'Carlos Ruiz finalizó sesión de coaching (90min)', time: 'Hace 8 min', badge: 'Sesión', badgeColor: 'bg-blue-500' },
    { id: '4', type: 'client', avatar: '👤', title: 'Nuevo cliente', description: 'María López se registró con plan Free', time: 'Hace 12 min', badge: 'Nuevo', badgeColor: 'bg-green-500' },
    { id: '5', type: 'upgrade', avatar: '⬆️', title: 'Upgrade de plan', description: 'Juan Pérez actualizó de Free a Pro', time: 'Hace 15 min', badge: 'Upgrade', badgeColor: 'bg-purple-500' },
    { id: '6', type: 'payment', avatar: '💰', title: 'Pago recibido', description: '$49 de Laura Martín - Plan Pro', time: 'Hace 18 min', badge: 'Pago', badgeColor: 'bg-emerald-500' },
    { id: '7', type: 'session', avatar: '✅', title: 'Sesión completada', description: 'Pedro Sánchez finalizó sesión individual (60min)', time: 'Hace 22 min', badge: 'Sesión', badgeColor: 'bg-blue-500' },
    { id: '8', type: 'cancel', avatar: '❌', title: 'Cancelación', description: 'Luis Fernández canceló su suscripción Pro', time: 'Hace 28 min', badge: 'Cancel', badgeColor: 'bg-red-500' },
    { id: '9', type: 'payment', avatar: '💰', title: 'Pago recibido', description: '$29 de Sofía Torres - Plan Pro', time: 'Hace 32 min', badge: 'Pago', badgeColor: 'bg-emerald-500' },
    { id: '10', type: 'session', avatar: '✅', title: 'Sesión completada', description: 'Roberto Gómez finalizó workshop grupal (120min)', time: 'Hace 38 min', badge: 'Sesión', badgeColor: 'bg-blue-500' },
    { id: '11', type: 'client', avatar: '👤', title: 'Nuevo cliente', description: 'Elena Castro se registró con plan Enterprise', time: 'Hace 42 min', badge: 'Nuevo', badgeColor: 'bg-green-500' },
    { id: '12', type: 'payment', avatar: '💰', title: 'Pago recibido', description: '$149 de Tech Startup Inc - Plan Enterprise', time: 'Hace 45 min', badge: 'Pago', badgeColor: 'bg-emerald-500' },
  ];

  // Top Performers
  const topClients = [
    { rank: 1, name: 'Empresa XYZ Corp', revenue: '$12,450', sessions: 42, growth: '+28%' },
    { rank: 2, name: 'Tech Startup Inc', revenue: '$9,870', sessions: 35, growth: '+22%' },
    { rank: 3, name: 'Digital Agency SA', revenue: '$8,320', sessions: 31, growth: '+18%' },
    { rank: 4, name: 'Consulting Group', revenue: '$7,540', sessions: 28, growth: '+15%' },
    { rank: 5, name: 'Innovation Lab', revenue: '$6,890', sessions: 25, growth: '+12%' },
  ];

  const topServices = [
    { rank: 1, name: 'Coaching Ejecutivo', revenue: '$45,230', clients: 89, progress: 92 },
    { rank: 2, name: 'Consultoría Estratégica', revenue: '$38,450', clients: 67, progress: 78 },
    { rank: 3, name: 'Workshops Grupales', revenue: '$32,180', clients: 124, progress: 65 },
    { rank: 4, name: 'Mentorías Personalizadas', revenue: '$28,900', clients: 156, progress: 58 },
    { rank: 5, name: 'Asesoría de Negocios', revenue: '$24,670', clients: 98, progress: 50 },
  ];

  // Objetivos del período
  const periodGoals = [
    { id: '1', title: 'Ingresos Mensuales', current: 73000, target: 80000, unit: '$' },
    { id: '2', title: 'Nuevos Clientes', current: 467, target: 500, unit: '' },
    { id: '3', title: 'Retención de Clientes', current: 94.4, target: 95, unit: '%' },
    { id: '4', title: 'Sesiones Completadas', current: 8934, target: 10000, unit: '' },
    { id: '5', title: 'NPS Score', current: 72, target: 75, unit: '' },
  ];

  // Datos para gráfico de distribución (Pie Chart)
  const membershipDistribution = [
    { name: 'Free', value: 7234, percentage: 58 },
    { name: 'Pro', value: 4123, percentage: 33 },
    { name: 'Enterprise', value: 1130, percentage: 9 },
  ];

  const COLORS = ['#6b7280', '#3b82f6', '#8b5cf6'];

  // Funciones
  const handleRefresh = () => {
    setLastUpdate(new Date());
  };

  const handleToggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const getStatusColor = (status: 'online' | 'warning' | 'offline') => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-red-500';
    }
  };

  const getStatusTextColor = (status: 'online' | 'warning' | 'offline') => {
    switch (status) {
      case 'online':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'offline':
        return 'text-red-600';
    }
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'Free':
        return 'bg-gray-100 text-gray-800';
      case 'Pro':
        return 'bg-blue-100 text-blue-800';
      case 'Enterprise':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLogLevelStyle = (level: string) => {
    switch (level) {
      case 'INFO':
        return 'bg-green-100 text-green-800';
      case 'WARN':
        return 'bg-yellow-100 text-yellow-800';
      case 'ERROR':
        return 'bg-red-100 text-red-800';
      case 'DEBUG':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = logFilter === 'ALL' ? systemLogs : systemLogs.filter(log => log.level === logFilter);

  // Mini Sparkline Component
  const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    const width = 60;
    const height = 20;

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="inline-block">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* HERO SECTION - Dashboard Overview */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-slate-700 via-indigo-700 to-purple-700 rounded-3xl shadow-2xl p-8 md:p-12"
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
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Panel de Control <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Ejecutivo</span>
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl leading-relaxed mt-2">
                Métricas clave y análisis en tiempo real de tu negocio
              </p>
            </div>
          </div>

          {/* Controles y selector de período */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mt-8">
            <div className="flex flex-wrap gap-3">
              {/* Pills con métricas rápidas */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Clock className="w-4 h-4 text-green-300" />
                <span className="text-sm font-semibold text-white">{lastUpdate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Users className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-semibold text-white">467 Clientes</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <TrendingUp className="w-4 h-4 text-emerald-300" />
                <span className="text-sm font-semibold text-white">+15.8% MoM</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all backdrop-blur-md border border-white/20"
              >
                <RefreshCw className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">Actualizar</span>
              </button>
              <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all backdrop-blur-md border border-white/20">
                <Download className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">Exportar</span>
              </button>

              {/* Selector de período elegante */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all backdrop-blur-md border border-white/20 text-white font-semibold text-sm cursor-pointer outline-none"
              >
                <option value="today" className="text-gray-900">Hoy</option>
                <option value="week" className="text-gray-900">Esta semana</option>
                <option value="month" className="text-gray-900">Este mes</option>
                <option value="year" className="text-gray-900">Este año</option>
                <option value="custom" className="text-gray-900">Personalizado</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ALERTAS CRÍTICAS */}
      {criticalAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-orange-200 relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Alertas y Notificaciones</h3>
              <span className="ml-auto bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                {criticalAlerts.length}
              </span>
            </div>
            <div className="space-y-3">
              {criticalAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className={`p-2.5 rounded-xl ${alert.type === 'error' ? 'bg-red-100' : alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                    {alert.type === 'error' ? <XCircle className="w-5 h-5 text-red-600" /> :
                     alert.type === 'warning' ? <AlertCircle className="w-5 h-5 text-yellow-600" /> :
                     <Info className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 mb-1">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  <button className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    alert.type === 'error' ? 'bg-red-50 text-red-600 hover:bg-red-100' :
                    alert.type === 'warning' ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' :
                    'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}>
                    {alert.action}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* KPIs PRINCIPALES */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Métricas Clave del Negocio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => (
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
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${kpi.gradient} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${kpi.gradient} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {kpi.icon}
                </div>

                {/* Label */}
                <p className="text-xs font-bold text-gray-600 mb-2 tracking-wide uppercase">
                  {kpi.label}
                </p>

                {/* Valor */}
                <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {kpi.value}
                </p>

                {/* Cambio */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-1 rounded-lg ${kpi.trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <span className={`text-sm font-bold ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend === 'up' ? '+' : ''}{kpi.change}%
                  </span>
                  <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                </div>

                {/* Mini Sparkline */}
                <div className="mt-4">
                  <Sparkline
                    data={kpi.sparklineData}
                    color={kpi.trend === 'up' ? '#10b981' : '#ef4444'}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* GRÁFICOS PRINCIPALES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Ingresos (Grande) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden lg:col-span-2"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                  <LineChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Evolución de Ingresos</h3>
                  <p className="text-sm text-gray-600">Últimos 12 meses</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all">
                <Download className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">Exportar</span>
              </button>
            </div>

            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRecurrentes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUnicos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: '600' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: '600' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '14px', fontWeight: '600' }} />
                <Area type="monotone" dataKey="ingresos" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIngresos)" name="Ingresos Totales" />
                <Area type="monotone" dataKey="recurrentes" stroke="#10b981" fillOpacity={1} fill="url(#colorRecurrentes)" name="Recurrentes" />
                <Area type="monotone" dataKey="unicos" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorUnicos)" name="Únicos" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Gráfico de Clientes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Nuevos Clientes</h3>
                <p className="text-sm text-gray-600">Por mes</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <RechartsBar data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px', fontWeight: '600' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px', fontWeight: '600' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '14px', fontWeight: '600' }} />
                <Bar dataKey="clientes" fill="#8b5cf6" name="Nuevos" radius={[8, 8, 0, 0]} />
                <Bar dataKey="activos" fill="#3b82f6" name="Activos" radius={[8, 8, 0, 0]} />
              </RechartsBar>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Gráfico de Distribución (Pie Chart) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-lg">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Distribución de Membresías</h3>
                <p className="text-sm text-gray-600">Por tipo de plan</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <RechartsPie>
                <Pie
                  data={membershipDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, percentage}) => `${name} ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {membershipDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }}
                />
              </RechartsPie>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-4 mt-4">
              {membershipDistribution.map((item, index) => (
                <div key={item.name} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-sm font-semibold text-gray-900">{item.name}</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{item.value.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{item.percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* GESTIÓN DE USUARIOS */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h3 className="text-xl font-bold text-gray-900">Últimos Usuarios Registrados</h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filtros</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPlanBadgeColor(user.plan)}`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-sm text-gray-900">{user.status === 'online' ? 'Online' : 'Offline'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800" title="Ver perfil">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800" title="Suspender">
                        <Ban className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <span className="text-sm text-gray-600">Mostrando 5 de 12,487 usuarios</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">Anterior</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">Siguiente</button>
          </div>
        </div>
      </div>

      {/* ACTIVIDAD RECIENTE (Timeline) + TOP PERFORMERS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ACTIVIDAD RECIENTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Actividad Reciente</h3>
            </div>

            <div className="space-y-1 max-h-[600px] overflow-y-auto">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="relative flex items-start gap-4 p-4 rounded-2xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-300 group"
                >
                  {/* Línea vertical conectora */}
                  {index < recentActivity.length - 1 && (
                    <div className="absolute left-[26px] top-16 w-0.5 h-full bg-gradient-to-b from-gray-200 to-transparent"></div>
                  )}

                  {/* Avatar */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <span className="text-lg">{activity.avatar}</span>
                  </div>

                  {/* Contenido */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-700 mt-0.5">{activity.description}</p>
                      </div>
                      <span className={`${activity.badgeColor} text-white px-2 py-1 rounded-lg text-xs font-bold whitespace-nowrap`}>
                        {activity.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* TOP PERFORMERS - Top Clientes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Top Clientes</h3>
            </div>

            <div className="space-y-4">
              {topClients.map((client, index) => (
                <motion.div
                  key={client.rank}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all group"
                >
                  {/* Medalla/Posición */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                    index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                    'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
                  }`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${client.rank}`}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">{client.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-lg font-bold text-emerald-600">{client.revenue}</span>
                      <span className="text-xs text-gray-500">{client.sessions} sesiones</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-1.5 rounded-full"
                        style={{ width: `${90 - index * 10}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Growth badge */}
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    {client.growth}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* TOP PERFORMERS - Top Servicios + OBJETIVOS DEL PERÍODO */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TOP SERVICIOS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Top Servicios</h3>
            </div>

            <div className="space-y-4">
              {topServices.map((service, index) => (
                <motion.div
                  key={service.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-full text-sm font-bold">
                        #{service.rank}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{service.name}</p>
                        <p className="text-xs text-gray-500">{service.clients} clientes</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-purple-600">{service.revenue}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${service.progress}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-end pr-2"
                    >
                      <span className="text-xs font-bold text-white">{service.progress}%</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* OBJETIVOS DEL PERÍODO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Objetivos del Mes</h3>
            </div>

            <div className="space-y-5">
              {periodGoals.map((goal, index) => {
                const percentage = Math.round((goal.current / goal.target) * 100);
                const remaining = goal.target - goal.current;
                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-bold text-gray-900">{goal.title}</p>
                      <div className="text-right">
                        <p className="text-lg font-bold text-cyan-600">
                          {percentage}%
                        </p>
                        <p className="text-xs text-gray-500">
                          {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
                        </p>
                      </div>
                    </div>

                    {/* Progress bar animado */}
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full relative ${
                          percentage >= 100 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                          percentage >= 80 ? 'bg-gradient-to-r from-cyan-500 to-blue-600' :
                          percentage >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                          'bg-gradient-to-r from-red-500 to-pink-600'
                        }`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </motion.div>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      {percentage >= 100 ? '¡Objetivo completado! 🎉' :
                       `Faltan ${remaining.toLocaleString()}${goal.unit} para completar`}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* LOGS Y ACTIVIDAD + USUARIOS EN LÍNEA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LOGS DEL SISTEMA */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-xl font-bold text-gray-900">Logs del Sistema en Tiempo Real</h3>
              <div className="flex gap-2">
                {(['ALL', 'INFO', 'WARN', 'ERROR', 'DEBUG'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setLogFilter(level)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      logFilter === level
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-900 text-gray-100 font-mono text-sm max-h-96 overflow-y-auto">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 mb-2 hover:bg-gray-800 p-2 rounded">
                <span className={`px-2 py-1 rounded text-xs font-bold ${getLogLevelStyle(log.level)}`}>
                  {log.level}
                </span>
                <span className="text-gray-400 text-xs">{log.timestamp}</span>
                <span className="flex-1 text-xs">{log.message}</span>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 flex items-center justify-between">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar logs
            </button>
            <span className="text-xs text-gray-500">Auto-refresh cada 5s</span>
          </div>
        </div>

        {/* USUARIOS EN LÍNEA */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Usuarios en Línea</h3>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {onlineUsers.length}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {onlineUsers.map((user) => (
              <div key={user.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {user.avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.lastActivity}</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Globe className="w-3 h-3" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Cpu className="w-3 h-3" />
                      <span>{user.device}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{user.sessionDuration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONFIGURACIONES RÁPIDAS Y BACKUPS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CONFIGURACIONES RÁPIDAS */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-gray-700" />
            <h3 className="text-xl font-bold text-gray-900">Configuraciones Críticas</h3>
          </div>

          <div className="space-y-4">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  setting.critical ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{setting.label}</p>
                    {setting.critical && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                        Crítico
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                </div>

                <button
                  onClick={() => handleToggleSetting(setting.id)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    setting.enabled ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Toggle ${setting.label}`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      setting.enabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* GESTIÓN DE BACKUPS */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <HardDriveDownload className="w-6 h-6 text-gray-700" />
              <h3 className="text-xl font-bold text-gray-900">Backups</h3>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Cloud className="w-4 h-4" />
              <span className="hidden sm:inline">Crear Backup</span>
            </button>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${backup.status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                    {backup.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{backup.date}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-600">{backup.size}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        backup.type === 'automatic' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {backup.type === 'automatic' ? 'Auto' : 'Manual'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Descargar">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors" title="Restaurar">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Eliminar">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PERFORMANCE MONITORING Y SEGURIDAD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PERFORMANCE MONITORING */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-yellow-500" />
            <h3 className="text-xl font-bold text-gray-900">Performance Monitoring</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Activity className="w-4 h-4" />
                <span className="text-xs font-medium">Response Time</span>
              </div>
              <p className="text-3xl font-bold text-blue-900">124ms</p>
              <p className="text-xs text-blue-700 mt-1">Promedio últimas 24h</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <Database className="w-4 h-4" />
                <span className="text-xs font-medium">DB Query Time</span>
              </div>
              <p className="text-3xl font-bold text-green-900">45ms</p>
              <p className="text-xs text-green-700 mt-1">Promedio por query</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-600 mb-2">
                <Wifi className="w-4 h-4" />
                <span className="text-xs font-medium">API Latency</span>
              </div>
              <p className="text-3xl font-bold text-purple-900">89ms</p>
              <p className="text-xs text-purple-700 mt-1">APIs externas</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-medium">Error Rate</span>
              </div>
              <p className="text-3xl font-bold text-red-900">0.03%</p>
              <p className="text-xs text-red-700 mt-1">Últimas 24h</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-orange-600 mb-2">
                <BarChart3 className="w-4 h-4" />
                <span className="text-xs font-medium">Request Rate</span>
              </div>
              <p className="text-3xl font-bold text-orange-900">2,345</p>
              <p className="text-xs text-orange-700 mt-1">req/seg actual</p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-medium">CPU Usage</span>
              </div>
              <p className="text-3xl font-bold text-indigo-900">34%</p>
              <p className="text-xs text-indigo-700 mt-1">4 cores disponibles</p>
            </div>
          </div>
        </div>

        {/* SEGURIDAD */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">Seguridad</h3>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-red-600">
                  <Lock className="w-5 h-5" />
                  <span className="font-semibold">Intentos Fallidos de Login</span>
                </div>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">12</span>
              </div>
              <p className="text-sm text-red-700">Últimas 24 horas</p>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-yellow-600">
                  <Ban className="w-5 h-5" />
                  <span className="font-semibold">IPs Bloqueadas</span>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-bold">8</span>
              </div>
              <p className="text-sm text-yellow-700">Por actividad sospechosa</p>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Actividad Sospechosa</span>
                </div>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-bold">3</span>
              </div>
              <p className="text-sm text-orange-700">Requiere revisión manual</p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Certificado SSL</span>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">Válido</span>
              </div>
              <p className="text-sm text-green-700">Expira: 2026-09-30 (365 días)</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-blue-600">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Auditoría de Accesos</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Ver detalles →
                </button>
              </div>
              <p className="text-sm text-blue-700">Último acceso admin: Hace 5 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelControlPage;