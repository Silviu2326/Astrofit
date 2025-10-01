import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RefreshCw,
  Download,
  Settings,
  Database,
  Wifi,
  Activity,
  AlertTriangle,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  Award,
  Clock,
  UserPlus,
  Search,
  Filter,
  Eye,
  Edit,
  Ban,
  Trash2,
  Shield,
  Lock,
  HardDriveDownload,
  Cloud,
  Globe,
  Cpu,
  Zap,
  CheckCircle,
  XCircle,
  Info,
  AlertCircle,
  BarChart3,
  PieChart,
  LineChart,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  Repeat,
  X,
  Save,
  MapPin,
  Calendar as CalendarIcon,
  CreditCard,
} from 'lucide-react';
import {
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
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'year' | 'custom'>('week');
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

  // Estados para gestión de usuarios
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Estados para filtros y paginación
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    plan: 'ALL',
    status: 'ALL',
    country: 'ALL',
    dateRange: 'ALL'
  });

  // Estados para gestión de backups
  const [showCreateBackup, setShowCreateBackup] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showDeleteBackupModal, setShowDeleteBackupModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);
  const [backupList, setBackupList] = useState<Backup[]>([]);
  const [backupLoading, setBackupLoading] = useState(false);

  // Estados para funcionalidades del dashboard
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  // Estados para exportación de ingresos
  const [showRevenueExportModal, setShowRevenueExportModal] = useState(false);
  const [revenueExportLoading, setRevenueExportLoading] = useState(false);

  // Estados para gestión de alertas
  const [showAlertDetails, setShowAlertDetails] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showBlockIPModal, setShowBlockIPModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [alertLoading, setAlertLoading] = useState(false);


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
    { id: '6', name: 'Pedro Sánchez', email: 'pedro.sanchez@email.com', plan: 'Pro', status: 'online', joinDate: '2025-09-25', country: 'Chile' },
    { id: '7', name: 'Sofía Torres', email: 'sofia.torres@email.com', plan: 'Enterprise', status: 'offline', joinDate: '2025-09-24', country: 'Perú' },
    { id: '8', name: 'Roberto Gómez', email: 'roberto.gomez@email.com', plan: 'Free', status: 'online', joinDate: '2025-09-23', country: 'Uruguay' },
    { id: '9', name: 'Elena Castro', email: 'elena.castro@email.com', plan: 'Pro', status: 'online', joinDate: '2025-09-22', country: 'Venezuela' },
    { id: '10', name: 'Luis Fernández', email: 'luis.fernandez@email.com', plan: 'Free', status: 'offline', joinDate: '2025-09-21', country: 'Ecuador' },
    { id: '11', name: 'Carmen Vega', email: 'carmen.vega@email.com', plan: 'Enterprise', status: 'online', joinDate: '2025-09-20', country: 'Bolivia' },
    { id: '12', name: 'Diego Morales', email: 'diego.morales@email.com', plan: 'Pro', status: 'offline', joinDate: '2025-09-19', country: 'Paraguay' },
  ];

  // Inicializar usuarios, backups y alertas
  useEffect(() => {
    setUsers(recentUsers);
    setBackupList(backups);
    setAlerts(criticalAlerts);
  }, []);

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
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simular actualización de datos
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Actualizar timestamp
      setLastUpdate(new Date());
      
      // Simular actualización de métricas (en una app real, aquí se harían llamadas a la API)
      console.log('Datos actualizados exitosamente');
    } catch (error) {
      console.error('Error al actualizar datos:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleDateRangeChange = (newRange: 'today' | 'week' | 'month' | 'year' | 'custom') => {
    setDateRange(newRange);
    // En una app real, aquí se filtrarían los datos según el rango seleccionado
    console.log('Rango de fechas cambiado a:', newRange);
  };

  const exportData = async (format: 'csv' | 'excel' | 'pdf') => {
    setExportLoading(true);
    try {
      // Simular exportación
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // En una app real, aquí se generaría y descargaría el archivo
      console.log(`Exportando datos en formato ${format} para el período: ${dateRange}`);
      
      // Simular descarga
      const fileName = `dashboard-data-${dateRange}-${new Date().toISOString().split('T')[0]}.${format}`;
      alert(`Archivo ${fileName} descargado exitosamente`);
      
      setShowExportModal(false);
    } catch (error) {
      console.error('Error al exportar datos:', error);
    } finally {
      setExportLoading(false);
    }
  };

  // Funciones específicas para exportación de ingresos
  const handleRevenueExport = () => {
    setShowRevenueExportModal(true);
  };

  const exportRevenueData = async (format: 'csv' | 'excel' | 'pdf' | 'json') => {
    setRevenueExportLoading(true);
    try {
      // Simular exportación de datos de ingresos
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Preparar datos de ingresos para exportación
      const revenueData = {
        period: dateRange,
        exportDate: new Date().toISOString(),
        data: monthlyData.map(item => ({
          mes: item.month,
          ingresos_totales: item.ingresos,
          ingresos_recurrentes: item.recurrentes,
          ingresos_unicos: item.unicos,
          nuevos_clientes: item.clientes,
          clientes_activos: item.activos
        })),
        summary: {
          total_ingresos: monthlyData.reduce((sum, item) => sum + item.ingresos, 0),
          promedio_mensual: Math.round(monthlyData.reduce((sum, item) => sum + item.ingresos, 0) / monthlyData.length),
          crecimiento_anual: 15.8,
          total_clientes: monthlyData[monthlyData.length - 1].clientes
        }
      };
      
      console.log(`Exportando datos de ingresos en formato ${format}:`, revenueData);
      
      // Simular descarga
      const fileName = `evolucion-ingresos-${dateRange}-${new Date().toISOString().split('T')[0]}.${format}`;
      alert(`Archivo de ingresos ${fileName} descargado exitosamente`);
      
      setShowRevenueExportModal(false);
    } catch (error) {
      console.error('Error al exportar datos de ingresos:', error);
    } finally {
      setRevenueExportLoading(false);
    }
  };

  const handleToggleSetting = (id: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  // Funciones para gestión de usuarios
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserProfile(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
    setShowEditUser(true);
  };

  const handleSuspendUser = (user: User) => {
    setSelectedUser(user);
    setShowSuspendModal(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmSuspendUser = async () => {
    if (!selectedUser) return;
    
    setLoading(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, status: 'offline' as const }
          : user
      ));
      
      setShowSuspendModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error al suspender usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;
    
    setLoading(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
      
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveUserChanges = async () => {
    if (!editingUser) return;
    
    setLoading(true);
    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      
      setShowEditUser(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeModals = () => {
    setShowUserProfile(false);
    setShowEditUser(false);
    setShowSuspendModal(false);
    setShowDeleteModal(false);
    setSelectedUser(null);
    setEditingUser(null);
  };

  // Funciones para filtros y paginación
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1); // Reset a la primera página cuando se cambian filtros
  };

  const clearFilters = () => {
    setFilters({
      plan: 'ALL',
      status: 'ALL',
      country: 'ALL',
      dateRange: 'ALL'
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filters.plan === 'ALL' || user.plan === filters.plan;
    const matchesStatus = filters.status === 'ALL' || user.status === filters.status;
    const matchesCountry = filters.country === 'ALL' || user.country === filters.country;
    
    return matchesSearch && matchesPlan && matchesStatus && matchesCountry;
  });

  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Obtener países únicos para el filtro
  const uniqueCountries = Array.from(new Set(users.map(user => user.country))).sort();

  // Funciones para gestión de backups
  const handleCreateBackup = async () => {
    setBackupLoading(true);
    try {
      // Simular creación de backup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newBackup: Backup = {
        id: Date.now().toString(),
        date: new Date().toLocaleString('es-ES', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        size: '428 GB',
        status: 'success',
        type: 'manual'
      };
      
      setBackupList(prev => [newBackup, ...prev]);
      setShowCreateBackup(false);
    } catch (error) {
      console.error('Error al crear backup:', error);
    } finally {
      setBackupLoading(false);
    }
  };

  const handleDownloadBackup = async (backup: Backup) => {
    setBackupLoading(true);
    try {
      // Simular descarga
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // En una aplicación real, aquí se iniciaría la descarga
      console.log(`Descargando backup: ${backup.id}`);
      
      // Simular notificación de descarga completada
      alert(`Backup ${backup.date} descargado exitosamente`);
    } catch (error) {
      console.error('Error al descargar backup:', error);
    } finally {
      setBackupLoading(false);
    }
  };

  const handleRestoreBackup = (backup: Backup) => {
    setSelectedBackup(backup);
    setShowRestoreModal(true);
  };

  const handleDeleteBackup = (backup: Backup) => {
    setSelectedBackup(backup);
    setShowDeleteBackupModal(true);
  };

  const confirmRestoreBackup = async () => {
    if (!selectedBackup) return;
    
    setBackupLoading(true);
    try {
      // Simular restauración
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      console.log(`Restaurando backup: ${selectedBackup.id}`);
      alert(`Backup ${selectedBackup.date} restaurado exitosamente`);
      
      setShowRestoreModal(false);
      setSelectedBackup(null);
    } catch (error) {
      console.error('Error al restaurar backup:', error);
    } finally {
      setBackupLoading(false);
    }
  };

  const confirmDeleteBackup = async () => {
    if (!selectedBackup) return;
    
    setBackupLoading(true);
    try {
      // Simular eliminación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setBackupList(prev => prev.filter(backup => backup.id !== selectedBackup.id));
      
      setShowDeleteBackupModal(false);
      setSelectedBackup(null);
    } catch (error) {
      console.error('Error al eliminar backup:', error);
    } finally {
      setBackupLoading(false);
    }
  };

  const closeBackupModals = () => {
    setShowCreateBackup(false);
    setShowRestoreModal(false);
    setShowDeleteBackupModal(false);
    setSelectedBackup(null);
  };

  // Funciones para gestión de alertas
  const handleViewAlertDetails = (alert: any) => {
    setSelectedAlert(alert);
    setShowAlertDetails(true);
  };

  const handleUpdateSystem = () => {
    setShowUpdateModal(true);
  };

  const handleBlockIP = (alert: any) => {
    setSelectedAlert(alert);
    setShowBlockIPModal(true);
  };

  const confirmUpdateSystem = async () => {
    setAlertLoading(true);
    try {
      // Simular actualización del sistema
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Actualizar alertas para remover la de actualización
      setAlerts(prev => prev.filter(alert => alert.id !== '2'));
      
      console.log('Sistema actualizado exitosamente');
      alert('Sistema actualizado exitosamente. Se reiniciará en 5 minutos.');
      
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error al actualizar sistema:', error);
    } finally {
      setAlertLoading(false);
    }
  };

  const confirmBlockIP = async () => {
    if (!selectedAlert) return;
    
    setAlertLoading(true);
    try {
      // Simular bloqueo de IP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Actualizar alertas para remover la de IP sospechosa
      setAlerts(prev => prev.filter(alert => alert.id !== selectedAlert.id));
      
      console.log(`IP bloqueada: ${selectedAlert.ip || 'IP sospechosa'}`);
      alert(`IP bloqueada exitosamente. Se ha agregado a la lista de IPs bloqueadas.`);
      
      setShowBlockIPModal(false);
      setSelectedAlert(null);
    } catch (error) {
      console.error('Error al bloquear IP:', error);
    } finally {
      setAlertLoading(false);
    }
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const closeAlertModals = () => {
    setShowAlertDetails(false);
    setShowUpdateModal(false);
    setShowBlockIPModal(false);
    setSelectedAlert(null);
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
                disabled={isRefreshing}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all backdrop-blur-md border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm font-semibold text-white">
                  {isRefreshing ? 'Actualizando...' : 'Actualizar'}
                </span>
              </button>
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-all backdrop-blur-md border border-white/20"
              >
                <Download className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">Exportar</span>
              </button>

              {/* Selector de período elegante */}
              <select
                value={dateRange}
                onChange={(e) => handleDateRangeChange(e.target.value as any)}
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
                {alerts.length}
              </span>
            </div>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
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
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        if (alert.action === 'Ver detalles') {
                          handleViewAlertDetails(alert);
                        } else if (alert.action === 'Actualizar') {
                          handleUpdateSystem();
                        } else if (alert.action === 'Bloquear IP') {
                          handleBlockIP(alert);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        alert.type === 'error' ? 'bg-red-50 text-red-600 hover:bg-red-100' :
                        alert.type === 'warning' ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' :
                        'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      {alert.action}
                    </button>
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Descartar alerta"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
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
              <button 
                onClick={handleRevenueExport}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all"
              >
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
                  {membershipDistribution.map((_, index) => (
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
              <button 
                onClick={() => setShowFilters(true)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
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
              {currentUsers.map((user) => (
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
                      <button 
                        onClick={() => handleViewUser(user)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50" 
                        title="Ver perfil"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="text-green-600 hover:text-green-800 transition-colors p-1 rounded hover:bg-green-50" 
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleSuspendUser(user)}
                        className="text-yellow-600 hover:text-yellow-800 transition-colors p-1 rounded hover:bg-yellow-50" 
                        title="Suspender"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50" 
                        title="Eliminar"
                      >
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
          <span className="text-sm text-gray-600">
            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} de {filteredUsers.length} usuarios
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            
            {/* Páginas */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded text-sm ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
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
            <button 
              onClick={() => setShowCreateBackup(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Cloud className="w-4 h-4" />
              <span className="hidden sm:inline">Crear Backup</span>
            </button>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {backupList.map((backup) => (
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
                  <button 
                    onClick={() => handleDownloadBackup(backup)}
                    disabled={backupLoading || backup.status === 'failed'}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                    title="Descargar"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleRestoreBackup(backup)}
                    disabled={backupLoading || backup.status === 'failed'}
                    className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                    title="Restaurar"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteBackup(backup)}
                    disabled={backupLoading}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                    title="Eliminar"
                  >
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

      {/* MODALES */}
      <AnimatePresence>
        {/* Modal Ver Perfil */}
        {showUserProfile && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Perfil de Usuario</h3>
                  <button
                    onClick={closeModals}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{selectedUser.name}</h4>
                    <p className="text-gray-600 mb-4">{selectedUser.email}</p>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPlanBadgeColor(selectedUser.plan)}`}>
                        {selectedUser.plan}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${selectedUser.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <span className="text-sm text-gray-600">{selectedUser.status === 'online' ? 'Online' : 'Offline'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <CalendarIcon className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Fecha de Registro</p>
                        <p className="text-sm text-gray-600">{selectedUser.joinDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">País</p>
                        <p className="text-sm text-gray-600">{selectedUser.country}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Plan Actual</p>
                        <p className="text-sm text-gray-600">{selectedUser.plan}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                      <Activity className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Estado</p>
                        <p className="text-sm text-gray-600">{selectedUser.status === 'online' ? 'Activo' : 'Inactivo'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => {
                    closeModals();
                    handleEditUser(selectedUser);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Editar Usuario
                </button>
                <button
                  onClick={closeModals}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Editar Usuario */}
        {showEditUser && editingUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Editar Usuario</h3>
                  <button
                    onClick={closeModals}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Nombre</label>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Plan</label>
                    <select
                      value={editingUser.plan}
                      onChange={(e) => setEditingUser({ ...editingUser, plan: e.target.value as 'Free' | 'Pro' | 'Enterprise' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="Free">Free</option>
                      <option value="Pro">Pro</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Estado</label>
                    <select
                      value={editingUser.status}
                      onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as 'online' | 'offline' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="online">Online</option>
                      <option value="offline">Offline</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">País</label>
                    <input
                      type="text"
                      value={editingUser.country}
                      onChange={(e) => setEditingUser({ ...editingUser, country: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Fecha de Registro</label>
                    <input
                      type="date"
                      value={editingUser.joinDate}
                      onChange={(e) => setEditingUser({ ...editingUser, joinDate: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={closeModals}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveUserChanges}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Guardar Cambios
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Suspender Usuario */}
        {showSuspendModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Ban className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Suspender Usuario</h3>
                    <p className="text-sm text-gray-600">Esta acción deshabilitará el acceso del usuario</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    ¿Estás seguro de que quieres suspender a <strong>{selectedUser.name}</strong>?
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    El usuario no podrá acceder a su cuenta hasta que sea reactivado.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModals}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmSuspendUser}
                    disabled={loading}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Suspendiendo...
                      </>
                    ) : (
                      <>
                        <Ban className="w-4 h-4" />
                        Suspender
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Eliminar Usuario */}
        {showDeleteModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Eliminar Usuario</h3>
                    <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-red-700">
                    ¿Estás seguro de que quieres eliminar permanentemente a <strong>{selectedUser.name}</strong>?
                  </p>
                  <p className="text-xs text-red-600 mt-2">
                    Todos los datos del usuario serán eliminados permanentemente.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModals}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmDeleteUser}
                    disabled={loading}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Eliminando...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal de Filtros */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Filtros Avanzados</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Filtro por Plan */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Plan</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['ALL', 'Free', 'Pro', 'Enterprise'].map((plan) => (
                      <button
                        key={plan}
                        onClick={() => handleFilterChange('plan', plan)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          filters.plan === plan
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {plan}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtro por Estado */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Estado</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['ALL', 'online', 'offline'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleFilterChange('status', status)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          filters.status === status
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {status === 'ALL' ? 'Todos' : status === 'online' ? 'Online' : 'Offline'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtro por País */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">País</label>
                  <select
                    value={filters.country}
                    onChange={(e) => handleFilterChange('country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="ALL">Todos los países</option>
                    {uniqueCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro por Rango de Fechas */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Rango de Fechas</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Desde</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Hasta</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Resumen de filtros activos */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Filtros Activos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {filters.plan !== 'ALL' && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Plan: {filters.plan}
                      </span>
                    )}
                    {filters.status !== 'ALL' && (
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Estado: {filters.status === 'online' ? 'Online' : 'Offline'}
                      </span>
                    )}
                    {filters.country !== 'ALL' && (
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        País: {filters.country}
                      </span>
                    )}
                    {searchTerm && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                        Búsqueda: "{searchTerm}"
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-between">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Limpiar Filtros
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Crear Backup */}
        {showCreateBackup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeBackupModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Cloud className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Crear Backup Manual</h3>
                    <p className="text-sm text-gray-600">Se creará un respaldo completo del sistema</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-700">
                    Esta operación puede tomar varios minutos dependiendo del tamaño de los datos.
                    Se recomienda no realizar otras operaciones durante el proceso.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeBackupModals}
                    disabled={backupLoading}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreateBackup}
                    disabled={backupLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {backupLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creando...
                      </>
                    ) : (
                      <>
                        <Cloud className="w-4 h-4" />
                        Crear Backup
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Restaurar Backup */}
        {showRestoreModal && selectedBackup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeBackupModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <RefreshCw className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Restaurar Backup</h3>
                    <p className="text-sm text-gray-600">Esta acción restaurará el sistema a un estado anterior</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Backup seleccionado:</strong> {selectedBackup.date}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Tamaño:</strong> {selectedBackup.size}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Tipo:</strong> {selectedBackup.type === 'automatic' ? 'Automático' : 'Manual'}
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-red-700">
                    <strong>⚠️ Advertencia:</strong> Esta operación reemplazará todos los datos actuales.
                    Asegúrate de crear un backup actual antes de proceder.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeBackupModals}
                    disabled={backupLoading}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmRestoreBackup}
                    disabled={backupLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {backupLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Restaurando...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        Restaurar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Eliminar Backup */}
        {showDeleteBackupModal && selectedBackup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeBackupModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Eliminar Backup</h3>
                    <p className="text-sm text-gray-600">Esta acción no se puede deshacer</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Backup a eliminar:</strong> {selectedBackup.date}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Tamaño:</strong> {selectedBackup.size}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Tipo:</strong> {selectedBackup.type === 'automatic' ? 'Automático' : 'Manual'}
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-red-700">
                    ¿Estás seguro de que quieres eliminar este backup permanentemente?
                    Esta acción liberará {selectedBackup.size} de espacio de almacenamiento.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeBackupModals}
                    disabled={backupLoading}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmDeleteBackup}
                    disabled={backupLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {backupLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Eliminando...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal de Exportación */}
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Download className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Exportar Datos</h3>
                    <p className="text-sm text-gray-600">Selecciona el formato de exportación</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Período seleccionado:</strong> {
                      dateRange === 'today' ? 'Hoy' : 
                      dateRange === 'week' ? 'Esta semana' :
                      dateRange === 'month' ? 'Este mes' :
                      dateRange === 'year' ? 'Este año' : 
                      dateRange === 'custom' ? 'Personalizado' : 'Este mes'
                    }
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Datos incluidos:</strong> Métricas, gráficos, usuarios y logs del sistema
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => exportData('csv')}
                    disabled={exportLoading}
                    className="w-full flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Download className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">CSV</p>
                      <p className="text-sm text-gray-600">Datos tabulares para Excel/Google Sheets</p>
                    </div>
                  </button>

                  <button
                    onClick={() => exportData('excel')}
                    disabled={exportLoading}
                    className="w-full flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Download className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Excel</p>
                      <p className="text-sm text-gray-600">Archivo .xlsx con gráficos incluidos</p>
                    </div>
                  </button>

                  <button
                    onClick={() => exportData('pdf')}
                    disabled={exportLoading}
                    className="w-full flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Download className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">PDF</p>
                      <p className="text-sm text-gray-600">Reporte completo con gráficos</p>
                    </div>
                  </button>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowExportModal(false)}
                    disabled={exportLoading}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                </div>

                {exportLoading && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm text-blue-700 font-medium">Generando archivo de exportación...</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal de Exportación de Ingresos */}
        {showRevenueExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRevenueExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
                    <LineChart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Exportar Evolución de Ingresos</h3>
                    <p className="text-sm text-gray-600">Datos financieros detallados</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Período:</p>
                      <p className="font-semibold text-gray-900">
                        {dateRange === 'today' ? 'Hoy' : 
                         dateRange === 'week' ? 'Esta semana' :
                         dateRange === 'month' ? 'Este mes' :
                         dateRange === 'year' ? 'Este año' : 
                         dateRange === 'custom' ? 'Personalizado' : 'Este mes'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Meses incluidos:</p>
                      <p className="font-semibold text-gray-900">{monthlyData.length} meses</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total ingresos:</p>
                      <p className="font-semibold text-emerald-600">
                        ${monthlyData.reduce((sum, item) => sum + item.ingresos, 0).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Promedio mensual:</p>
                      <p className="font-semibold text-blue-600">
                        ${Math.round(monthlyData.reduce((sum, item) => sum + item.ingresos, 0) / monthlyData.length).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => exportRevenueData('csv')}
                    disabled={revenueExportLoading}
                    className="w-full flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Download className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">CSV</p>
                      <p className="text-sm text-gray-600">Datos tabulares para análisis financiero</p>
                    </div>
                  </button>

                  <button
                    onClick={() => exportRevenueData('excel')}
                    disabled={revenueExportLoading}
                    className="w-full flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Download className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Excel</p>
                      <p className="text-sm text-gray-600">Hoja de cálculo con gráficos incluidos</p>
                    </div>
                  </button>

                  <button
                    onClick={() => exportRevenueData('pdf')}
                    disabled={revenueExportLoading}
                    className="w-full flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Download className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">PDF</p>
                      <p className="text-sm text-gray-600">Reporte ejecutivo con gráficos</p>
                    </div>
                  </button>

                  <button
                    onClick={() => exportRevenueData('json')}
                    disabled={revenueExportLoading}
                    className="w-full flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Download className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">JSON</p>
                      <p className="text-sm text-gray-600">Datos estructurados para desarrolladores</p>
                    </div>
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Datos incluidos:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Ingresos totales por mes</li>
                    <li>• Ingresos recurrentes vs únicos</li>
                    <li>• Nuevos clientes y clientes activos</li>
                    <li>• Resumen ejecutivo con métricas clave</li>
                    <li>• Crecimiento anual y tendencias</li>
                  </ul>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowRevenueExportModal(false)}
                    disabled={revenueExportLoading}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                </div>

                {revenueExportLoading && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm text-blue-700 font-medium">Generando archivo de ingresos...</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Ver Detalles de Alerta */}
        {showAlertDetails && selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeAlertModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Detalles de la Alerta</h3>
                  <button
                    onClick={closeAlertModals}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-full ${selectedAlert.type === 'error' ? 'bg-red-100' : selectedAlert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                    {selectedAlert.type === 'error' ? <XCircle className="w-6 h-6 text-red-600" /> :
                     selectedAlert.type === 'warning' ? <AlertCircle className="w-6 h-6 text-yellow-600" /> :
                     <Info className="w-6 h-6 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{selectedAlert.message}</h4>
                    <p className="text-sm text-gray-600 mb-4">{selectedAlert.time}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedAlert.type === 'error' ? 'bg-red-100 text-red-800' :
                      selectedAlert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedAlert.type === 'error' ? 'Error Crítico' :
                       selectedAlert.type === 'warning' ? 'Advertencia' : 'Información'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h5 className="text-sm font-semibold text-gray-900 mb-2">Información del Sistema</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">ID de Alerta:</span>
                          <span className="font-medium">{selectedAlert.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tipo:</span>
                          <span className="font-medium">{selectedAlert.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timestamp:</span>
                          <span className="font-medium">{new Date().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h5 className="text-sm font-semibold text-gray-900 mb-2">Acciones Disponibles</h5>
                      <div className="space-y-2">
                        <button 
                          onClick={() => {
                            closeAlertModals();
                            if (selectedAlert.action === 'Actualizar') {
                              handleUpdateSystem();
                            } else if (selectedAlert.action === 'Bloquear IP') {
                              handleBlockIP(selectedAlert);
                            }
                          }}
                          className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedAlert.type === 'error' ? 'bg-red-50 text-red-600 hover:bg-red-100' :
                            selectedAlert.type === 'warning' ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' :
                            'bg-blue-50 text-blue-600 hover:bg-blue-100'
                          }`}
                        >
                          {selectedAlert.action}
                        </button>
                        <button 
                          onClick={() => dismissAlert(selectedAlert.id)}
                          className="w-full px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          Descartar Alerta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Actualizar Sistema */}
        {showUpdateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeAlertModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <RefreshCw className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Actualizar Sistema</h3>
                    <p className="text-sm text-gray-600">Instalar actualización de seguridad</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-700 mb-2">
                    <strong>Actualización disponible:</strong> Parche de seguridad v2.1.4
                  </p>
                  <p className="text-sm text-blue-700 mb-2">
                    <strong>Tamaño:</strong> 45.2 MB
                  </p>
                  <p className="text-sm text-blue-700">
                    <strong>Descripción:</strong> Corrección de vulnerabilidades críticas y mejoras de rendimiento.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-yellow-700">
                    <strong>⚠️ Advertencia:</strong> El sistema se reiniciará automáticamente después de la actualización.
                    Se recomienda programar la actualización durante horarios de menor actividad.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeAlertModals}
                    disabled={alertLoading}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmUpdateSystem}
                    disabled={alertLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {alertLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Actualizando...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        Actualizar Ahora
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Modal Bloquear IP */}
        {showBlockIPModal && selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeAlertModals}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Bloquear IP</h3>
                    <p className="text-sm text-gray-600">Agregar IP a la lista de bloqueadas</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Alerta:</strong> {selectedAlert.message}
                  </p>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>IP detectada:</strong> 45.123.67.89
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Actividad:</strong> 3 intentos de login fallidos en 5 minutos
                  </p>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-red-700">
                    <strong>⚠️ Advertencia:</strong> Esta acción bloqueará permanentemente la IP 45.123.67.89.
                    La IP no podrá acceder al sistema hasta que sea removida manualmente de la lista de bloqueadas.
                  </p>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeAlertModals}
                    disabled={alertLoading}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={confirmBlockIP}
                    disabled={alertLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {alertLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Bloqueando...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        Bloquear IP
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PanelControlPage;