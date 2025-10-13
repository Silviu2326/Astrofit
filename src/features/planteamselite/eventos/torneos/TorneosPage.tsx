import React, { Suspense, lazy, useState, useMemo, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Users, Award, TrendingUp, PlayCircle, BarChart3, Sparkles, Loader2, Search, Filter, X, ChevronDown, GripVertical, Settings, Eye, Maximize2, Bell, BellRing, CheckCircle, AlertCircle, Clock, Trophy as TrophyIcon, Shield, User, Crown, Eye as EyeIcon, Lock, Unlock, Moon, Sun, Palette, Monitor, Download, FileText, Image, Calendar as CalendarIcon, Share2, Menu, Smartphone, Tablet, Monitor as MonitorIcon, RotateCcw, Maximize, Minimize, Save, History, RotateCcw as UndoIcon, Database, RefreshCw, Archive, Trash2, Wifi, Touchpad, Gamepad2, Grid3X3, List, Plus } from 'lucide-react';

// Componentes de fallback personalizados para mejor UX
const TournamentCardSkeleton = memo(() => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
    <div className="flex items-center justify-between mb-4">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
    </div>
    <div className="flex justify-between items-center mt-4">
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
    </div>
  </div>
));

const DashboardSkeleton = memo(() => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-12"></div>
        </div>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16 mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
      </div>
    ))}
  </div>
));

const ChartSkeleton = memo(() => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4"></div>
    <div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div>
  </div>
));

// Sistema de lazy loading optimizado con preloading inteligente y code splitting granular
const createLazyComponent = (importFn: () => Promise<any>, fallback: React.ComponentType, chunkName?: string) => {
  // Crear función de importación con chunk name para mejor debugging
  const enhancedImportFn = () => {
    if (chunkName) {
      console.log(`Loading chunk: ${chunkName}`);
    }
    return importFn();
  };
  
  const LazyComponent = lazy(enhancedImportFn);
  
  return memo((props: any) => (
    <Suspense fallback={<fallback />}>
      <LazyComponent {...props} />
    </Suspense>
  ));
};

// Sistema de chunks dinámicos para mejor organización
const createChunkedComponent = (basePath: string, componentName: string, fallback: React.ComponentType) => {
  return createLazyComponent(
    () => import(`${basePath}/${componentName}`),
    fallback,
    `${basePath}/${componentName}`
  );
};

// Lazy loading de componentes pesados con fallbacks personalizados y chunks optimizados
const CuadroTorneos = createLazyComponent(
  () => import('./components/CuadroTorneos'),
  TournamentCardSkeleton,
  'tournament-cuadro'
);

const GeneradorBrackets = createLazyComponent(
  () => import('./components/GeneradorBrackets'),
  () => <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"><div className="h-64 bg-gray-300 dark:bg-gray-600 rounded"></div></div>,
  'tournament-brackets'
);

const SistemaSeeding = createLazyComponent(
  () => import('./components/SistemaSeeding'),
  () => <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"><div className="h-48 bg-gray-300 dark:bg-gray-600 rounded"></div></div>,
  'tournament-seeding'
);

const StreamingTorneo = createLazyComponent(
  () => import('./components/StreamingTorneo'),
  () => <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"><div className="h-32 bg-gray-300 dark:bg-gray-600 rounded"></div></div>,
  'tournament-streaming'
);

const ApuestasVirtuales = createLazyComponent(
  () => import('./components/ApuestasVirtuales'),
  () => <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"><div className="h-40 bg-gray-300 dark:bg-gray-600 rounded"></div></div>,
  'tournament-apuestas'
);

const GestionArbitros = createLazyComponent(
  () => import('./components/GestionArbitros'),
  () => <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"><div className="h-56 bg-gray-300 dark:bg-gray-600 rounded"></div></div>,
  'tournament-arbitros'
);

const AnalyticsTorneo = createLazyComponent(
  () => import('./components/AnalyticsTorneo'),
  ChartSkeleton,
  'tournament-analytics'
);

const SistemaPremios = createLazyComponent(
  () => import('./components/SistemaPremios'),
  () => <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"><div className="h-36 bg-gray-300 dark:bg-gray-600 rounded"></div></div>,
  'tournament-premios'
);

const IntegracionRedesSociales = createLazyComponent(
  () => import('./components/IntegracionRedesSociales'),
  () => <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse"><div className="h-28 bg-gray-300 dark:bg-gray-600 rounded"></div></div>,
  'tournament-redes'
);

// Tipos para sistema de filtros y búsqueda inteligente
type FilterType = 'status' | 'type' | 'date' | 'prize' | 'location' | 'difficulty' | 'category';
type FilterOperator = 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'in' | 'not_in';
type SortDirection = 'asc' | 'desc';
type SortField = 'name' | 'date' | 'prize' | 'participants' | 'status';

interface Filter {
  id: string;
  type: FilterType;
  field: string;
  operator: FilterOperator;
  value: any;
  label: string;
  active: boolean;
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'tournament' | 'team' | 'participant' | 'location';
  icon: any;
  count?: number;
}

interface SavedFilter {
  id: string;
  name: string;
  description: string;
  filters: Filter[];
  isDefault: boolean;
  createdAt: Date;
  lastUsed: Date;
}

interface SearchHistory {
  id: string;
  query: string;
  filters: Filter[];
  timestamp: Date;
  resultCount: number;
}

// Tipos para sistema de dashboard interactivo
type WidgetType = 'stat' | 'chart' | 'table' | 'list' | 'metric' | 'gauge' | 'progress' | 'timeline';
type WidgetSize = 'small' | 'medium' | 'large' | 'xlarge';
type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'area' | 'scatter' | 'radar';

interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  description: string;
  size: WidgetSize;
  position: { x: number; y: number };
  visible: boolean;
  config: any;
  data?: any;
  refreshInterval?: number;
  lastUpdated?: Date;
}

interface DashboardLayout {
  id: string;
  name: string;
  description: string;
  widgets: Widget[];
  isDefault: boolean;
  createdAt: Date;
  lastModified: Date;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

interface MetricData {
  value: number;
  previousValue: number;
  change: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  format: 'number' | 'currency' | 'percentage';
}

// Tipos para sistema de notificaciones en tiempo real
type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'tournament' | 'match' | 'result' | 'system';
type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';
type NotificationStatus = 'unread' | 'read' | 'archived';

interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  title: string;
  message: string;
  timestamp: Date;
  readAt?: Date;
  tournamentId?: string;
  matchId?: string;
  userId?: string;
  actionUrl?: string;
  metadata?: any;
  expiresAt?: Date;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
  tournamentUpdates: boolean;
  matchResults: boolean;
  systemAlerts: boolean;
  marketing: boolean;
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
}

interface WebSocketMessage {
  type: 'notification' | 'tournament_update' | 'match_result' | 'system_alert';
  data: any;
  timestamp: Date;
}

// Tipos para optimización de rendimiento
interface PerformanceMetrics {
  renderCount: number;
  lastRenderTime: number;
  averageRenderTime: number;
  memoryUsage: number;
  componentSize: number;
}

interface VirtualizationConfig {
  itemHeight: number;
  containerHeight: number;
  overscan: number;
  threshold: number;
}

interface MemoizationConfig {
  enabled: boolean;
  maxCacheSize: number;
  ttl: number; // Time to live in milliseconds
  strategy: 'aggressive' | 'conservative' | 'balanced';
}

// Tipos para sistema de roles y permisos
// Tipos para sistema de roles y permisos granulares
type UserRole = 'admin' | 'organizer' | 'participant' | 'spectator';
type Permission = 
  | 'tournaments.create' | 'tournaments.edit' | 'tournaments.delete' | 'tournaments.view'
  | 'matches.create' | 'matches.edit' | 'matches.delete' | 'matches.view'
  | 'participants.manage' | 'participants.view'
  | 'analytics.view' | 'analytics.export'
  | 'notifications.manage' | 'notifications.view'
  | 'settings.manage' | 'settings.view'
  | 'users.manage' | 'users.view'
  | 'reports.generate' | 'reports.view'
  | 'dashboard.customize' | 'dashboard.view'
  | 'backup.create' | 'backup.restore' | 'backup.view'
  | 'redes.manage' | 'redes.view'
  | 'premios.manage' | 'premios.view';

interface PermissionGroup {
  name: string;
  permissions: Permission[];
  description: string;
}

interface RolePermissions {
  role: UserRole;
  permissions: Permission[];
  restrictions: Permission[];
  description: string;
  color: string;
  icon: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  avatar?: string;
  lastLogin?: Date;
  isActive: boolean;
  customPermissions?: Permission[];
  restrictions?: Permission[];
  teamId?: string;
  organizationId?: string;
}

interface PermissionAudit {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  reason?: string;
}

// Tipos para sistema de temas y modo oscuro
type ThemeMode = 'light' | 'dark' | 'auto';
type ThemeType = 'default' | 'purple' | 'blue' | 'green' | 'red' | 'orange' | 'custom';

interface Theme {
  id: string;
  name: string;
  type: ThemeType;
  mode: ThemeMode;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    shadow: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  gradients: {
    primary: string;
    secondary: string;
    background: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface ThemePreferences {
  currentTheme: string;
  mode: ThemeMode;
  autoSwitch: boolean;
  transitionDuration: number;
  customThemes: Theme[];
  systemTheme: ThemeMode;
}

// Tipos para sistema de exportación y reportes
type ExportFormat = 'pdf' | 'png' | 'jpg' | 'csv' | 'xlsx' | 'json' | 'ics';
type ExportType = 'bracket' | 'participants' | 'statistics' | 'calendar' | 'report' | 'all';
type ExportStatus = 'pending' | 'processing' | 'completed' | 'failed';

interface ExportJob {
  id: string;
  type: ExportType;
  format: ExportFormat;
  status: ExportStatus;
  progress: number;
  createdAt: Date;
  completedAt?: Date;
  downloadUrl?: string;
  error?: string;
  metadata: {
    tournamentId?: string;
    participantCount?: number;
    includeImages?: boolean;
    customTemplate?: string;
  };
}

interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  type: ExportType;
  format: ExportFormat;
  template: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ExportSettings {
  defaultFormat: ExportFormat;
  includeImages: boolean;
  quality: 'low' | 'medium' | 'high';
  watermark: boolean;
  customFooter: string;
  autoExport: boolean;
  scheduleExport: boolean;
  exportFrequency: 'daily' | 'weekly' | 'monthly';
}

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  url?: string;
  attendees?: string[];
  organizer?: string;
}

// Tipos para optimización mobile-first y responsive
type DeviceType = 'mobile' | 'tablet' | 'desktop';
type Orientation = 'portrait' | 'landscape';
type TouchAction = 'tap' | 'swipe' | 'pinch' | 'longpress';

interface MobileState {
  deviceType: DeviceType;
  orientation: Orientation;
  screenWidth: number;
  screenHeight: number;
  isTouchDevice: boolean;
  hasKeyboard: boolean;
  isOnline: boolean;
  batteryLevel?: number;
  connectionType?: 'slow-2g' | '2g' | '3g' | '4g' | '5g' | 'wifi';
}

interface TouchGesture {
  type: TouchAction;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
}

interface ResponsiveBreakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
}

interface MobileNavigation {
  activeTab: string;
  tabs: Array<{
    id: string;
    label: string;
    icon: string;
    badge?: number;
    disabled?: boolean;
  }>;
  showTabs: boolean;
  tabPosition: 'bottom' | 'top';
}

// Tipos para sistema de backup y recuperación de datos
type BackupStatus = 'pending' | 'in_progress' | 'completed' | 'failed' | 'restored';
type BackupType = 'auto' | 'manual' | 'scheduled' | 'cloud';
type RestoreStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

interface BackupData {
  id: string;
  name: string;
  type: BackupType;
  status: BackupStatus;
  createdAt: Date;
  completedAt?: Date;
  size: number;
  description: string;
  version: string;
  data: {
    tournaments: any[];
    settings: any;
    userPreferences: any;
    notifications: any[];
    exportJobs: any[];
    themes: any[];
    mobileSettings: any;
  };
  metadata: {
    deviceType: string;
    userAgent: string;
    timestamp: number;
    checksum: string;
  };
}

interface BackupHistory {
  id: string;
  action: 'create' | 'restore' | 'delete' | 'schedule';
  backupId: string;
  timestamp: Date;
  userId: string;
  details: string;
  success: boolean;
}

interface BackupSettings {
  autoBackup: boolean;
  backupFrequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
  maxBackups: number;
  cloudBackup: boolean;
  compressionEnabled: boolean;
  encryptionEnabled: boolean;
  retentionDays: number;
  notifyOnBackup: boolean;
  notifyOnRestore: boolean;
}

interface RestoreOptions {
  backupId: string;
  restoreType: 'full' | 'partial' | 'selective';
  selectedData: string[];
  overwriteExisting: boolean;
  createNewVersion: boolean;
  notifyOnComplete: boolean;
}

interface Theme {
  mode: ThemeMode;
  color: ThemeColor;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
}

// Tipos para sistema de exportación

interface ExportOption {
  id: string;
  name: string;
  description: string;
  format: ExportFormat;
  type: ExportType;
  icon: any;
  color: string;
}

interface ExportData {
  tournament: any;
  participants: any[];
  statistics: any;
  brackets: any[];
  matches: any[];
}

// Tipos para sistema mobile-first
type ViewMode = 'grid' | 'list' | 'card';

interface MobileState {
  deviceType: DeviceType;
  orientation: Orientation;
  viewMode: ViewMode;
  isMobileMenuOpen: boolean;
  isLandscapeMode: boolean;
  touchEnabled: boolean;
}

// Tipos para sistema de backup y recuperación
type RecoveryStatus = 'available' | 'restoring' | 'completed' | 'failed';

interface BackupData {
  id: string;
  timestamp: Date;
  type: BackupType;
  status: BackupStatus;
  size: number;
  description: string;
  data: any;
  checksum: string;
}

interface ChangeHistory {
  id: string;
  timestamp: Date;
  action: string;
  description: string;
  data: any;
  canRevert: boolean;
}

interface BackupSettings {
  autoSave: boolean;
  autoSaveInterval: number; // en minutos
  maxBackups: number;
  cloudSync: boolean;
  compression: boolean;
}

// Definición de roles y permisos
const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    'tournaments.create',
    'tournaments.edit',
    'tournaments.delete',
    'tournaments.view',
    'users.manage',
    'analytics.view',
    'settings.manage',
    'notifications.send',
    'brackets.manage',
    'arbitros.manage',
    'premios.manage',
    'streaming.manage',
    'apuestas.manage',
    'redes.manage'
  ],
  organizer: [
    'tournaments.create',
    'tournaments.edit',
    'tournaments.view',
    'analytics.view',
    'notifications.send',
    'brackets.manage',
    'arbitros.manage',
    'premios.manage',
    'streaming.manage',
    'apuestas.manage',
    'redes.manage'
  ],
  participant: [
    'tournaments.view',
    'tournaments.join',
    'notifications.receive',
    'brackets.view',
    'premios.view',
    'streaming.view'
  ],
  spectator: [
    'tournaments.view',
    'notifications.receive',
    'brackets.view',
    'streaming.view'
  ]
};

const PERMISSIONS: Permission[] = [
  { id: 'tournaments.create', name: 'Crear Torneos', description: 'Permite crear nuevos torneos', category: 'Torneos' },
  { id: 'tournaments.edit', name: 'Editar Torneos', description: 'Permite modificar torneos existentes', category: 'Torneos' },
  { id: 'tournaments.delete', name: 'Eliminar Torneos', description: 'Permite eliminar torneos', category: 'Torneos' },
  { id: 'tournaments.view', name: 'Ver Torneos', description: 'Permite visualizar torneos', category: 'Torneos' },
  { id: 'tournaments.join', name: 'Unirse a Torneos', description: 'Permite participar en torneos', category: 'Torneos' },
  { id: 'users.manage', name: 'Gestionar Usuarios', description: 'Permite administrar usuarios del sistema', category: 'Usuarios' },
  { id: 'analytics.view', name: 'Ver Analytics', description: 'Permite acceder a estadísticas y reportes', category: 'Analytics' },
  { id: 'settings.manage', name: 'Gestionar Configuración', description: 'Permite modificar configuraciones del sistema', category: 'Sistema' },
  { id: 'notifications.send', name: 'Enviar Notificaciones', description: 'Permite enviar notificaciones a usuarios', category: 'Comunicación' },
  { id: 'notifications.receive', name: 'Recibir Notificaciones', description: 'Permite recibir notificaciones', category: 'Comunicación' },
  { id: 'brackets.manage', name: 'Gestionar Brackets', description: 'Permite crear y modificar brackets', category: 'Torneos' },
  { id: 'brackets.view', name: 'Ver Brackets', description: 'Permite visualizar brackets', category: 'Torneos' },
  { id: 'arbitros.manage', name: 'Gestionar Árbitros', description: 'Permite administrar árbitros', category: 'Personal' },
  { id: 'premios.manage', name: 'Gestionar Premios', description: 'Permite configurar premios', category: 'Torneos' },
  { id: 'premios.view', name: 'Ver Premios', description: 'Permite visualizar premios', category: 'Torneos' },
  { id: 'streaming.manage', name: 'Gestionar Streaming', description: 'Permite configurar streaming', category: 'Multimedia' },
  { id: 'streaming.view', name: 'Ver Streaming', description: 'Permite visualizar streaming', category: 'Multimedia' },
  { id: 'apuestas.manage', name: 'Gestionar Apuestas', description: 'Permite configurar apuestas virtuales', category: 'Apuestas' },
  { id: 'redes.manage', name: 'Gestionar Redes Sociales', description: 'Permite configurar integración con redes sociales', category: 'Social' }
];

// Definición de temas personalizables
const THEMES: Record<string, Theme> = {
  'light-purple': {
    mode: 'light',
    color: 'purple',
    name: 'Púrpura Claro',
    description: 'Tema claro con acentos púrpura',
    colors: {
      primary: '#8B5CF6',
      secondary: '#A855F7',
      accent: '#C084FC',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280'
    }
  },
  'dark-purple': {
    mode: 'dark',
    color: 'purple',
    name: 'Púrpura Oscuro',
    description: 'Tema oscuro con acentos púrpura',
    colors: {
      primary: '#8B5CF6',
      secondary: '#A855F7',
      accent: '#C084FC',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F1F5F9',
      textSecondary: '#94A3B8'
    }
  },
  'light-blue': {
    mode: 'light',
    color: 'blue',
    name: 'Azul Claro',
    description: 'Tema claro con acentos azul',
    colors: {
      primary: '#3B82F6',
      secondary: '#2563EB',
      accent: '#60A5FA',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280'
    }
  },
  'dark-blue': {
    mode: 'dark',
    color: 'blue',
    name: 'Azul Oscuro',
    description: 'Tema oscuro con acentos azul',
    colors: {
      primary: '#3B82F6',
      secondary: '#2563EB',
      accent: '#60A5FA',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F1F5F9',
      textSecondary: '#94A3B8'
    }
  },
  'light-green': {
    mode: 'light',
    color: 'green',
    name: 'Verde Claro',
    description: 'Tema claro con acentos verde',
    colors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#34D399',
      background: '#F8FAFC',
      surface: '#FFFFFF',
      text: '#1F2937',
      textSecondary: '#6B7280'
    }
  },
  'dark-green': {
    mode: 'dark',
    color: 'green',
    name: 'Verde Oscuro',
    description: 'Tema oscuro con acentos verde',
    colors: {
      primary: '#10B981',
      secondary: '#059669',
      accent: '#34D399',
      background: '#0F172A',
      surface: '#1E293B',
      text: '#F1F5F9',
      textSecondary: '#94A3B8'
    }
  }
};

// Definición de opciones de exportación
const EXPORT_OPTIONS: ExportOption[] = [
  {
    id: 'bracket-pdf',
    name: 'Bracket PDF',
    description: 'Exportar bracket como documento PDF',
    format: 'pdf',
    type: 'bracket',
    icon: FileText,
    color: 'from-red-500 to-rose-500'
  },
  {
    id: 'bracket-png',
    name: 'Bracket PNG',
    description: 'Exportar bracket como imagen PNG',
    format: 'png',
    type: 'bracket',
    icon: Image,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'statistics-pdf',
    name: 'Estadísticas PDF',
    description: 'Generar reporte de estadísticas en PDF',
    format: 'pdf',
    type: 'statistics',
    icon: BarChart3,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'participants-csv',
    name: 'Lista Participantes CSV',
    description: 'Exportar lista de participantes en CSV',
    format: 'csv',
    type: 'participants',
    icon: Users,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'participants-xlsx',
    name: 'Lista Participantes Excel',
    description: 'Exportar lista de participantes en Excel',
    format: 'xlsx',
    type: 'participants',
    icon: FileText,
    color: 'from-orange-500 to-amber-500'
  },
  {
    id: 'calendar-ics',
    name: 'Calendario ICS',
    description: 'Exportar fechas del torneo a calendario',
    format: 'json',
    type: 'calendar',
    icon: CalendarIcon,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'report-pdf',
    name: 'Reporte Completo PDF',
    description: 'Generar reporte completo del torneo',
    format: 'pdf',
    type: 'report',
    icon: Trophy,
    color: 'from-yellow-500 to-orange-500'
  }
];

// Componente de fallback personalizado para lazy loading con progreso
const LoadingFallback: React.FC<{ sectionName: string; progress?: number }> = ({ sectionName, progress = 0 }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50">
    <div className="relative">
      <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
      <div className="absolute inset-0 w-8 h-8 bg-purple-600 rounded-full blur-lg opacity-30"></div>
    </div>
    <p className="mt-4 text-sm font-semibold text-gray-600">Cargando {sectionName}...</p>
    <div className="mt-2 w-32 h-1 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    {progress > 0 && (
      <p className="mt-1 text-xs text-gray-500">{Math.round(progress)}%</p>
    )}
  </div>
);

// Indicador de progreso global para preloading
const GlobalLoadingIndicator: React.FC<{ progress: number; isVisible: boolean }> = ({ progress, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-xl rounded-lg shadow-xl border border-white/50 p-4 min-w-[200px]"
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
          <div className="absolute inset-0 w-5 h-5 bg-purple-600 rounded-full blur-sm opacity-30"></div>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-700">Optimizando experiencia...</p>
          <div className="mt-1 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% completado</p>
        </div>
      </div>
    </motion.div>
  );
};

// Componentes de widgets personalizables
const StatWidget = memo<{ widget: Widget; metric: MetricData; onRefresh: () => void }>(({ widget, metric, onRefresh }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{widget.title}</h3>
      <button
        onClick={onRefresh}
        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-gray-900">
          {metric.format === 'currency' ? `$${metric.value.toLocaleString()}` : 
           metric.format === 'percentage' ? `${metric.value}%` : 
           metric.value.toLocaleString()}
        </span>
        <span className="text-sm text-gray-500">{metric.unit}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm ${
          metric.trend === 'up' ? 'bg-green-100 text-green-700' :
          metric.trend === 'down' ? 'bg-red-100 text-red-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> :
           metric.trend === 'down' ? <TrendingUp className="w-4 h-4 rotate-180" /> :
           <div className="w-4 h-4 bg-gray-400 rounded-full" />}
          <span>{Math.abs(metric.changePercentage).toFixed(1)}%</span>
        </div>
        <span className="text-sm text-gray-500">
          vs período anterior
        </span>
      </div>
    </div>
  </div>
));

const ChartWidget = memo<{ widget: Widget; chartData: ChartData; onRefresh: () => void }>(({ widget, chartData, onRefresh }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{widget.title}</h3>
      <button
        onClick={onRefresh}
        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
    
    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
      <div className="text-center">
        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500">Gráfico interactivo</p>
        <p className="text-xs text-gray-400">{chartData.labels.length} puntos de datos</p>
      </div>
    </div>
  </div>
));

const MetricWidget = memo<{ widget: Widget; metric: MetricData; onRefresh: () => void }>(({ widget, metric, onRefresh }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{widget.title}</h3>
      <button
        onClick={onRefresh}
        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
    
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {metric.format === 'currency' ? `$${metric.value.toLocaleString()}` : 
           metric.format === 'percentage' ? `${metric.value}%` : 
           metric.value.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">{metric.unit}</div>
      </div>
      
      <div className="flex justify-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
          metric.trend === 'up' ? 'bg-green-100' :
          metric.trend === 'down' ? 'bg-red-100' :
          'bg-gray-100'
        }`}>
          {metric.trend === 'up' ? <TrendingUp className="w-8 h-8 text-green-600" /> :
           metric.trend === 'down' ? <TrendingUp className="w-8 h-8 text-red-600 rotate-180" /> :
           <div className="w-8 h-8 bg-gray-400 rounded-full" />}
        </div>
      </div>
      
      <div className="text-center">
        <div className={`text-sm font-medium ${
          metric.trend === 'up' ? 'text-green-600' :
          metric.trend === 'down' ? 'text-red-600' :
          'text-gray-600'
        }`}>
          {metric.change > 0 ? '+' : ''}{metric.changePercentage.toFixed(1)}%
        </div>
        <div className="text-xs text-gray-500">vs anterior</div>
      </div>
    </div>
  </div>
));

const TableWidget = memo<{ widget: Widget; data: any[]; onRefresh: () => void }>(({ widget, data, onRefresh }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900">{widget.title}</h3>
      <button
        onClick={onRefresh}
        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 font-medium text-gray-700">Torneo</th>
            <th className="text-left py-2 font-medium text-gray-700">Estado</th>
            <th className="text-left py-2 font-medium text-gray-700">Participantes</th>
            <th className="text-left py-2 font-medium text-gray-700">Premio</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((item, index) => (
            <tr key={index} className="border-b border-gray-100">
              <td className="py-2 text-gray-900">{item.name}</td>
              <td className="py-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  item.status === 'active' ? 'bg-green-100 text-green-700' :
                  item.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="py-2 text-gray-600">{item.participants}</td>
              <td className="py-2 text-gray-600">${item.prize?.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
));

// Componente memoizado para tarjetas de estadísticas
const StatCard = memo<{
  stat: {
    id: string;
    icon: any;
    title: string;
    value: string;
    change: string;
    color: string;
    drillDownData?: Array<{ name: string; value: number }>;
  };
  index: number;
  onMetricClick: (metricId: string) => void;
}>(({ stat, index, onMetricClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
    onClick={() => onMetricClick(stat.id)}
    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-100"
    style={{ willChange: 'transform' }}
  >
    <div className="flex items-center justify-between mb-2">
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
        <stat.icon className="w-4 h-4 text-white" />
      </div>
      <TrendingUp className="w-4 h-4 text-green-600" />
    </div>
    <p className="text-sm font-semibold text-gray-600 mb-1">{stat.title}</p>
    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
    <p className="text-xs text-green-600 font-semibold">{stat.change}%</p>
  </motion.div>
));

// Componente memoizado para tarjetas de torneos
const TournamentCard = memo<{
  tournament: {
    id: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    prize: number;
    teams: Array<{ id: string; name: string }>;
    type: string;
  };
  index: number;
  canEdit: boolean;
  canDelete: boolean;
}>(({ tournament, index, canEdit, canDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ scale: 1.02, y: -4 }}
    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    style={{ willChange: 'transform' }}
  >
    {/* Decoración de fondo */}
    <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 rounded-full blur-2xl"></div>

    <div className="relative z-10">
      {/* Header del torneo */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{tournament.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          tournament.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
          tournament.status === 'in-progress' ? 'bg-green-100 text-green-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {tournament.status === 'upcoming' ? 'Próximo' :
           tournament.status === 'in-progress' ? 'En Progreso' : 'Finalizado'}
        </span>
      </div>

      {/* Información del torneo */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{tournament.startDate} - {tournament.endDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{tournament.teams.length} equipos</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Award className="w-4 h-4" />
          <span>${tournament.prize.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Trophy className="w-4 h-4" />
          <span className="capitalize">{tournament.type}</span>
        </div>
      </div>

      {/* Equipos participantes */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Equipos:</p>
        <div className="flex flex-wrap gap-2">
          {tournament.teams.slice(0, 3).map((team) => (
            <span key={team.id} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs">
              {team.name}
            </span>
          ))}
          {tournament.teams.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
              +{tournament.teams.length - 3} más
            </span>
          )}
        </div>
      </div>

      {/* Botones de acción según permisos */}
      <div className="flex gap-2">
        <button className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold">
          Ver Detalles
        </button>
        {canEdit && (
          <button className="px-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300">
            <Settings className="w-4 h-4" />
          </button>
        )}
        {canDelete && (
          <button className="px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  </motion.div>
));

// Componente memoizado para notificaciones
const NotificationItem = memo<{
  notification: {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
  };
  onMarkAsRead: (id: string) => void;
  onRemove: (id: string) => void;
}>(({ notification, onMarkAsRead, onRemove }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    className={`p-4 rounded-xl border-l-4 transition-all duration-300 ${
      notification.read 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-white border-purple-500 shadow-md'
    }`}
    style={{ willChange: 'transform' }}
  >
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        notification.type === 'info' ? 'bg-blue-100 text-blue-600' :
        notification.type === 'success' ? 'bg-green-100 text-green-600' :
        notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
        'bg-red-100 text-red-600'
      }`}>
        {notification.type === 'info' && <AlertCircle className="w-4 h-4" />}
        {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
        {notification.type === 'warning' && <AlertCircle className="w-4 h-4" />}
        {notification.type === 'error' && <X className="w-4 h-4" />}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-gray-900 text-sm">
            {notification.title}
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {notification.timestamp.toLocaleTimeString()}
            </span>
            <button
              onClick={() => onRemove(notification.id)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
        {!notification.read && (
          <button
            onClick={() => onMarkAsRead(notification.id)}
            className="text-xs text-purple-600 hover:text-purple-800 font-medium"
          >
            Marcar como leída
          </button>
        )}
      </div>
    </div>
  </motion.div>
));

const TorneosPage: React.FC = () => {
  // Estado para sistema de filtros y búsqueda inteligente
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [prizeFilter, setPrizeFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  // Estados para búsqueda inteligente
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterPresets, setFilterPresets] = useState<SavedFilter[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  // Estado para torneo seleccionado
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  
  // Función para actualizar torneos (mock)
  const setTournaments = useCallback((newTournaments: any[]) => {
    // En un entorno real, esto actualizaría el estado de los torneos
    // Por ahora, solo actualizamos mockTournaments si es necesario
    console.log('Actualizando torneos:', newTournaments);
  }, []);

  // Estado para dashboard interactivo con widgets personalizables
  const [isEditMode, setIsEditMode] = useState(false);
  const [widgetLayout, setWidgetLayout] = useState([
    { id: 'stats', visible: true, position: 0, size: 'normal' },
    { id: 'chart', visible: true, position: 1, size: 'large' },
    { id: 'recent', visible: true, position: 2, size: 'normal' },
    { id: 'performance', visible: true, position: 3, size: 'normal' },
  ]);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  
  // Estados para dashboard interactivo
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [dashboardLayouts, setDashboardLayouts] = useState<DashboardLayout[]>([]);
  const [currentLayout, setCurrentLayout] = useState<string>('default');
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const [widgetBeingResized, setWidgetBeingResized] = useState<string | null>(null);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [widgetConfig, setWidgetConfig] = useState<any>(null);
  const [dashboardMetrics, setDashboardMetrics] = useState<Record<string, MetricData>>({});
  const [chartData, setChartData] = useState<Record<string, ChartData>>({});

  // Estado para sistema de notificaciones en tiempo real
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [wsRef, setWsRef] = useState<WebSocket | null>(null);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    inApp: true,
    tournamentUpdates: true,
    matchResults: true,
    systemAlerts: true,
    marketing: false,
    frequency: 'immediate'
  });
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [notificationHistory, setNotificationHistory] = useState<Notification[]>([]);
  const [isNotificationPermissionGranted, setIsNotificationPermissionGranted] = useState(false);
  const [lastNotificationCheck, setLastNotificationCheck] = useState<Date>(new Date());

  // Estado para optimización de rendimiento
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0,
    memoryUsage: 0,
    componentSize: 0
  });
  const [virtualizationConfig, setVirtualizationConfig] = useState<VirtualizationConfig>({
    itemHeight: 80,
    containerHeight: 400,
    overscan: 5,
    threshold: 100
  });
  const [memoizationConfig, setMemoizationConfig] = useState<MemoizationConfig>({
    enabled: true,
    maxCacheSize: 100,
    ttl: 300000, // 5 minutos
    strategy: 'balanced'
  });
  const [isPerformanceMode, setIsPerformanceMode] = useState(false);
  const [renderOptimizations, setRenderOptimizations] = useState({
    memoEnabled: true,
    virtualScrolling: true,
    lazyLoading: true,
    debouncing: true
  });

  // Estado para sistema de roles y permisos
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    permissions: [
      'tournaments.create', 'tournaments.edit', 'tournaments.delete', 'tournaments.view',
      'matches.create', 'matches.edit', 'matches.delete', 'matches.view',
      'participants.manage', 'participants.view',
      'analytics.view', 'analytics.export',
      'notifications.manage', 'notifications.view',
      'settings.manage', 'settings.view',
      'users.manage', 'users.view',
      'reports.generate', 'reports.view',
      'dashboard.customize', 'dashboard.view',
      'backup.create', 'backup.restore', 'backup.view',
      'redes.manage', 'redes.view',
      'premios.manage', 'premios.view'
    ],
    lastLogin: new Date(),
    isActive: true
  });

  // Estado para gestión de roles y permisos granulares
  const [rolePermissions, setRolePermissions] = useState<RolePermissions[]>([
    {
      role: 'admin',
      permissions: [
        'tournaments.create', 'tournaments.edit', 'tournaments.delete', 'tournaments.view',
        'matches.create', 'matches.edit', 'matches.delete', 'matches.view',
        'participants.manage', 'participants.view',
        'analytics.view', 'analytics.export',
        'notifications.manage', 'notifications.view',
        'settings.manage', 'settings.view',
        'users.manage', 'users.view',
        'reports.generate', 'reports.view',
        'dashboard.customize', 'dashboard.view',
        'backup.create', 'backup.restore', 'backup.view',
        'redes.manage', 'redes.view',
        'premios.manage', 'premios.view'
      ],
      restrictions: [],
      description: 'Acceso completo al sistema',
      color: 'red',
      icon: 'Shield'
    },
    {
      role: 'organizer',
      permissions: [
        'tournaments.create', 'tournaments.edit', 'tournaments.view',
        'matches.create', 'matches.edit', 'matches.view',
        'participants.manage', 'participants.view',
        'analytics.view',
        'notifications.manage', 'notifications.view',
        'dashboard.customize', 'dashboard.view',
        'premios.manage', 'premios.view'
      ],
      restrictions: ['tournaments.delete', 'users.manage', 'settings.manage', 'backup.create'],
      description: 'Gestión de torneos y participantes',
      color: 'blue',
      icon: 'Trophy'
    },
    {
      role: 'participant',
      permissions: [
        'tournaments.view',
        'matches.view',
        'participants.view',
        'notifications.view',
        'dashboard.view'
      ],
      restrictions: [
        'tournaments.create', 'tournaments.edit', 'tournaments.delete',
        'matches.create', 'matches.edit', 'matches.delete',
        'participants.manage',
        'analytics.view', 'analytics.export',
        'notifications.manage',
        'settings.manage', 'settings.view',
        'users.manage', 'users.view',
        'reports.generate', 'reports.view',
        'dashboard.customize',
        'backup.create', 'backup.restore', 'backup.view',
        'redes.manage', 'redes.view',
        'premios.manage', 'premios.view'
      ],
      description: 'Participación en torneos',
      color: 'green',
      icon: 'User'
    },
    {
      role: 'spectator',
      permissions: [
        'tournaments.view',
        'matches.view',
        'notifications.view'
      ],
      restrictions: [
        'tournaments.create', 'tournaments.edit', 'tournaments.delete',
        'matches.create', 'matches.edit', 'matches.delete',
        'participants.manage', 'participants.view',
        'analytics.view', 'analytics.export',
        'notifications.manage',
        'settings.manage', 'settings.view',
        'users.manage', 'users.view',
        'reports.generate', 'reports.view',
        'dashboard.customize', 'dashboard.view',
        'backup.create', 'backup.restore', 'backup.view',
        'redes.manage', 'redes.view',
        'premios.manage', 'premios.view'
      ],
      description: 'Solo visualización',
      color: 'gray',
      icon: 'Eye'
    }
  ]);

  const [permissionGroups, setPermissionGroups] = useState<PermissionGroup[]>([
    {
      name: 'Torneos',
      permissions: ['tournaments.create', 'tournaments.edit', 'tournaments.delete', 'tournaments.view'],
      description: 'Gestión de torneos'
    },
    {
      name: 'Partidos',
      permissions: ['matches.create', 'matches.edit', 'matches.delete', 'matches.view'],
      description: 'Gestión de partidos'
    },
    {
      name: 'Participantes',
      permissions: ['participants.manage', 'participants.view'],
      description: 'Gestión de participantes'
    },
    {
      name: 'Analíticas',
      permissions: ['analytics.view', 'analytics.export'],
      description: 'Visualización y exportación de datos'
    },
    {
      name: 'Notificaciones',
      permissions: ['notifications.manage', 'notifications.view'],
      description: 'Gestión de notificaciones'
    },
    {
      name: 'Configuración',
      permissions: ['settings.manage', 'settings.view'],
      description: 'Configuración del sistema'
    },
    {
      name: 'Usuarios',
      permissions: ['users.manage', 'users.view'],
      description: 'Gestión de usuarios'
    },
    {
      name: 'Reportes',
      permissions: ['reports.generate', 'reports.view'],
      description: 'Generación y visualización de reportes'
    },
    {
      name: 'Dashboard',
      permissions: ['dashboard.customize', 'dashboard.view'],
      description: 'Personalización del dashboard'
    },
    {
      name: 'Backup',
      permissions: ['backup.create', 'backup.restore', 'backup.view'],
      description: 'Gestión de respaldos'
    },
    {
      name: 'Redes Sociales',
      permissions: ['redes.manage', 'redes.view'],
      description: 'Integración con redes sociales'
    },
    {
      name: 'Premios',
      permissions: ['premios.manage', 'premios.view'],
      description: 'Gestión de premios'
    }
  ]);

  const [permissionAudit, setPermissionAudit] = useState<PermissionAudit[]>([]);
  const [showRoleManagement, setShowRoleManagement] = useState(false);
  const [showPermissionAudit, setShowPermissionAudit] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);

  // Estado para sistema de temas y modo oscuro
  const [currentTheme, setCurrentTheme] = useState<string>('light-purple');
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const [themePreferences, setThemePreferences] = useState<ThemePreferences>({
    currentTheme: 'light-purple',
    mode: 'auto',
    autoSwitch: true,
    transitionDuration: 300,
    customThemes: [],
    systemTheme: 'light'
  });

  // Temas predefinidos
  const [availableThemes, setAvailableThemes] = useState<Theme[]>([
    {
      id: 'light-purple',
      name: 'Púrpura Claro',
      type: 'purple',
      mode: 'light',
      colors: {
        primary: '#8B5CF6',
        secondary: '#A78BFA',
        accent: '#C4B5FD',
        background: '#FFFFFF',
        surface: '#F8FAFC',
        text: '#1F2937',
        textSecondary: '#6B7280',
        border: '#E5E7EB',
        shadow: '#000000',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      gradients: {
        primary: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
        secondary: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem'
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      }
    },
    {
      id: 'dark-purple',
      name: 'Púrpura Oscuro',
      type: 'purple',
      mode: 'dark',
      colors: {
        primary: '#8B5CF6',
        secondary: '#A78BFA',
        accent: '#C4B5FD',
        background: '#0F0F23',
        surface: '#1A1A2E',
        text: '#FFFFFF',
        textSecondary: '#A1A1AA',
        border: '#27272A',
        shadow: '#000000',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      gradients: {
        primary: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
        secondary: 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem'
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      }
    },
    {
      id: 'light-blue',
      name: 'Azul Claro',
      type: 'blue',
      mode: 'light',
      colors: {
        primary: '#3B82F6',
        secondary: '#60A5FA',
        accent: '#93C5FD',
        background: '#FFFFFF',
        surface: '#F1F5F9',
        text: '#1E293B',
        textSecondary: '#64748B',
        border: '#E2E8F0',
        shadow: '#000000',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      gradients: {
        primary: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
        secondary: 'linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%)',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem'
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      }
    },
    {
      id: 'dark-blue',
      name: 'Azul Oscuro',
      type: 'blue',
      mode: 'dark',
      colors: {
        primary: '#3B82F6',
        secondary: '#60A5FA',
        accent: '#93C5FD',
        background: '#0F172A',
        surface: '#1E293B',
        text: '#FFFFFF',
        textSecondary: '#94A3B8',
        border: '#334155',
        shadow: '#000000',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      gradients: {
        primary: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
        secondary: 'linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%)',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4)'
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem'
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      }
    }
  ]);

  const [showCustomThemeEditor, setShowCustomThemeEditor] = useState(false);
  const [customTheme, setCustomTheme] = useState<Theme | null>(null);

  // Estado para sistema de exportación y reportes
  const [showExportPanel, setShowExportPanel] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [exportTemplates, setExportTemplates] = useState<ExportTemplate[]>([
    {
      id: 'bracket-pdf',
      name: 'Bracket PDF',
      description: 'Exportar bracket en formato PDF',
      type: 'bracket',
      format: 'pdf',
      template: 'default-bracket',
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'participants-csv',
      name: 'Lista de Participantes CSV',
      description: 'Exportar lista de participantes en CSV',
      type: 'participants',
      format: 'csv',
      template: 'default-participants',
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'statistics-xlsx',
      name: 'Estadísticas Excel',
      description: 'Exportar estadísticas en Excel',
      type: 'statistics',
      format: 'xlsx',
      template: 'default-statistics',
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'calendar-ics',
      name: 'Evento Calendario',
      description: 'Exportar evento a calendario',
      type: 'calendar',
      format: 'ics',
      template: 'default-calendar',
      isDefault: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    defaultFormat: 'pdf',
    includeImages: true,
    quality: 'high',
    watermark: false,
    customFooter: '',
    autoExport: false,
    scheduleExport: false,
    exportFrequency: 'weekly'
  });
  const [showExportHistory, setShowExportHistory] = useState(false);
  const [showExportTemplates, setShowExportTemplates] = useState(false);
  const [showExportSettings, setShowExportSettings] = useState(false);
  const [selectedExportType, setSelectedExportType] = useState<ExportType>('bracket');
  const [selectedExportFormat, setSelectedExportFormat] = useState<ExportFormat>('pdf');
  const [selectedExportOptions, setSelectedExportOptions] = useState<string[]>([]);

  // Estado para sistema mobile-first y responsive
  const [mobileState, setMobileState] = useState<MobileState>({
    deviceType: 'desktop',
    orientation: 'portrait',
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    isTouchDevice: 'ontouchstart' in window,
    hasKeyboard: false,
    isOnline: navigator.onLine,
    batteryLevel: undefined,
    connectionType: undefined
  });

  const [responsiveBreakpoints] = useState<ResponsiveBreakpoints>({
    mobile: 768,
    tablet: 1024,
    desktop: 1280
  });

  // Mock data for demonstration
  const mockTournaments = [
    {
    id: '1',
    name: 'Torneo de Verano',
      status: 'in-progress' as const,
      type: 'eliminación',
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      prize: 25000,
    teams: [
      { id: 't1', name: 'Equipo Alpha' },
      { id: 't2', name: 'Equipo Beta' },
      { id: 't3', name: 'Equipo Gamma' },
      { id: 't4', name: 'Equipo Delta' },
    ],
    matches: [
      { id: 'm1', round: 1, team1: 't1', team2: 't2', winner: null },
      { id: 'm2', round: 1, team1: 't3', team2: 't4', winner: null },
      ],
    },
    {
      id: '2',
      name: 'Copa de Invierno',
      status: 'upcoming' as const,
      type: 'grupos',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      prize: 15000,
      teams: [
        { id: 't5', name: 'Equipo Echo' },
        { id: 't6', name: 'Equipo Foxtrot' },
      ],
      matches: [],
    },
    {
      id: '3',
      name: 'Liga Profesional',
      status: 'completed' as const,
      type: 'liga',
      startDate: '2023-12-01',
      endDate: '2023-12-31',
      prize: 50000,
      teams: [
        { id: 't7', name: 'Equipo Golf' },
        { id: 't8', name: 'Equipo Hotel' },
      ],
      matches: [],
    },
  ];

  // Funciones para manejar temas
  const changeTheme = useCallback((themeKey: string) => {
    setCurrentTheme(themeKey);
    setShowThemeSelector(false);
    
    // Aplicar tema al documento
    const theme = THEMES[themeKey];
    if (theme) {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', theme.colors.primary);
      root.style.setProperty('--color-secondary', theme.colors.secondary);
      root.style.setProperty('--color-accent', theme.colors.accent);
      root.style.setProperty('--color-background', theme.colors.background);
      root.style.setProperty('--color-surface', theme.colors.surface);
      root.style.setProperty('--color-text', theme.colors.text);
      root.style.setProperty('--color-text-secondary', theme.colors.textSecondary);
      
      // Aplicar clase de modo oscuro
      if (theme.mode === 'dark') {
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDarkMode(false);
      }
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem('tournament-theme', themeKey);
  }, []);

  const [mobileNavigation, setMobileNavigation] = useState<MobileNavigation>({
    activeTab: 'tournaments',
    tabs: [
      { id: 'tournaments', label: 'Torneos', icon: 'Trophy', badge: mockTournaments.length },
      { id: 'matches', label: 'Partidos', icon: 'Gamepad2', badge: 0 },
      { id: 'participants', label: 'Participantes', icon: 'Users', badge: 0 },
      { id: 'analytics', label: 'Analíticas', icon: 'BarChart3', badge: 0 },
      { id: 'settings', label: 'Configuración', icon: 'Settings', badge: 0 }
    ],
    showTabs: true,
    tabPosition: 'bottom'
  });

  const [touchGestures, setTouchGestures] = useState<TouchGesture[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [mobileViewMode, setMobileViewMode] = useState<'grid' | 'list'>('grid');
  const [isLandscapeOptimized, setIsLandscapeOptimized] = useState(false);

  // Estado para sistema de backup y recuperación de datos
  const [backups, setBackups] = useState<BackupData[]>([]);
  const [backupHistory, setBackupHistory] = useState<BackupHistory[]>([]);
  const [backupSettings, setBackupSettings] = useState<BackupSettings>({
    autoBackup: true,
    backupFrequency: 'daily',
    maxBackups: 10,
    cloudBackup: false,
    compressionEnabled: true,
    encryptionEnabled: false,
    retentionDays: 30,
    notifyOnBackup: true,
    notifyOnRestore: true
  });
  const [showBackupPanel, setShowBackupPanel] = useState(false);
  const [showBackupHistory, setShowBackupHistory] = useState(false);
  const [showRestoreOptions, setShowRestoreOptions] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [restoreProgress, setRestoreProgress] = useState(0);
  const [selectedBackup, setSelectedBackup] = useState<BackupData | null>(null);
  const [restoreOptions, setRestoreOptions] = useState<RestoreOptions>({
    backupId: '',
    restoreType: 'full',
    selectedData: [],
    overwriteExisting: false,
    createNewVersion: true,
    notifyOnComplete: true
  });
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Estado para sistema de backup
  const [changeHistory, setChangeHistory] = useState<ChangeHistory[]>([]);

  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);
  const [recoveryStatus, setRecoveryStatus] = useState<RecoveryStatus>('available');

  // Estado para sistema de lazy loading optimizado
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(new Set());
  const [preloadingComponents, setPreloadingComponents] = useState<Set<string>>(new Set());
  const [componentCache, setComponentCache] = useState<Map<string, any>>(new Map());
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Sistema de preloading inteligente basado en roles y uso
  const preloadComponents = useCallback((userRole: UserRole) => {
    const componentsToPreload = {
      admin: ['AnalyticsTorneo', 'GestionArbitros', 'SistemaPremios', 'IntegracionRedesSociales'],
      organizer: ['GeneradorBrackets', 'SistemaSeeding', 'StreamingTorneo', 'ApuestasVirtuales'],
      participant: ['CuadroTorneos'],
      spectator: ['CuadroTorneos']
    };

    const components = componentsToPreload[userRole] || [];
    
    components.forEach(async (componentName, index) => {
      if (!loadedComponents.has(componentName) && !preloadingComponents.has(componentName)) {
        setPreloadingComponents(prev => new Set([...prev, componentName]));
        
        try {
          // Simular preloading con delay progresivo
          await new Promise(resolve => setTimeout(resolve, index * 200));
          
          // Aquí se cargaría el componente real
          setLoadedComponents(prev => new Set([...prev, componentName]));
          setLoadingProgress(prev => prev + (100 / components.length));
        } catch (error) {
          console.error(`Error preloading ${componentName}:`, error);
        } finally {
          setPreloadingComponents(prev => {
            const newSet = new Set(prev);
            newSet.delete(componentName);
            return newSet;
          });
        }
      }
    });
  }, [loadedComponents, preloadingComponents]);

  // Preload components basado en el rol del usuario
  useEffect(() => {
    const timer = setTimeout(() => {
      preloadComponents(currentUser.role);
    }, 1000); // Preload después de 1 segundo

    return () => clearTimeout(timer);
  }, [currentUser.role, preloadComponents]);

  // Sistema de caché para componentes ya cargados
  const getCachedComponent = useCallback((componentName: string) => {
    return componentCache.get(componentName);
  }, [componentCache]);

  const setCachedComponent = useCallback((componentName: string, component: any) => {
    setComponentCache(prev => new Map(prev).set(componentName, component));
  }, []);

  // Hook personalizado para lazy loading optimizado con Intersection Observer
  const useLazyComponent = useCallback((componentName: string, importFn: () => Promise<any>) => {
    const [isLoaded, setIsLoaded] = useState(loadedComponents.has(componentName));
    const [isLoading, setIsLoading] = useState(preloadingComponents.has(componentName));
    const [error, setError] = useState<Error | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    // Intersection Observer para cargar solo cuando sea visible
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!isVisible) return;

      if (loadedComponents.has(componentName)) {
        setIsLoaded(true);
        return;
      }

      if (preloadingComponents.has(componentName)) {
        setIsLoading(true);
        return;
      }

      // Preload component solo cuando sea visible
      const preloadComponent = async () => {
        try {
          setIsLoading(true);
          setError(null);
          
          // Simular carga del componente
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Aquí se cargaría el componente real
          setLoadedComponents(prev => new Set([...prev, componentName]));
          setIsLoaded(true);
        } catch (err) {
          setError(err as Error);
        } finally {
          setIsLoading(false);
        }
      };

      preloadComponent();
    }, [componentName, loadedComponents, preloadingComponents, isVisible]);

    return { isLoaded, isLoading, error, elementRef };
  }, [loadedComponents, preloadingComponents]);

  // Sistema de preloading inteligente basado en scroll y viewport
  const useSmartPreloading = useCallback(() => {
    const [viewportComponents, setViewportComponents] = useState<Set<string>>(new Set());
    
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        // Determinar qué componentes están próximos a ser visibles
        const upcomingComponents = [];
        if (scrollPosition > 100) upcomingComponents.push('GeneradorBrackets');
        if (scrollPosition > 300) upcomingComponents.push('SistemaSeeding');
        if (scrollPosition > 500) upcomingComponents.push('StreamingTorneo');
        if (scrollPosition > 700) upcomingComponents.push('ApuestasVirtuales');
        if (scrollPosition > 900) upcomingComponents.push('GestionArbitros');
        if (scrollPosition > 1100) upcomingComponents.push('AnalyticsTorneo');
        if (scrollPosition > 1300) upcomingComponents.push('SistemaPremios');
        if (scrollPosition > 1500) upcomingComponents.push('IntegracionRedesSociales');
        
        setViewportComponents(new Set(upcomingComponents));
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return viewportComponents;
  }, []);


  const mockTournament = {
    ...mockTournaments[0],
    status: 'in-progress' as const,
    startDate: '2024-01-15',
    endDate: '2024-01-30'
  };

  // Sistema de búsqueda inteligente con autocompletado
  const generateSearchSuggestions = useCallback((query: string): SearchSuggestion[] => {
    if (query.length < 2) return [];
    
    const suggestions: SearchSuggestion[] = [];
    const queryLower = query.toLowerCase();
    
    // Sugerencias de torneos
    mockTournaments.forEach(tournament => {
      if (tournament.name.toLowerCase().includes(queryLower)) {
        suggestions.push({
          id: `tournament-${tournament.id}`,
          text: tournament.name,
          type: 'tournament',
          icon: Trophy,
          count: tournament.teams.length
        });
      }
    });
    
    // Sugerencias de equipos
    mockTournaments.forEach(tournament => {
      tournament.teams.forEach(team => {
        if (team.name.toLowerCase().includes(queryLower)) {
          suggestions.push({
            id: `team-${team.id}`,
            text: team.name,
            type: 'team',
            icon: Users,
            count: 1
          });
        }
      });
    });
    
    return suggestions.slice(0, 8); // Limitar a 8 sugerencias
  }, []);

  // Función para manejar búsqueda con debounce
  const handleSearch = useCallback((query: string) => {
    setSearchTerm(query);
    setIsSearching(true);
    
    // Debounce para evitar búsquedas excesivas
    const timeoutId = setTimeout(() => {
      const suggestions = generateSearchSuggestions(query);
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
      setIsSearching(false);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [generateSearchSuggestions]);

  // Sistema de filtros avanzados
  const applyFilter = useCallback((filter: Filter, tournaments: any[]) => {
    return tournaments.filter(tournament => {
      const fieldValue = tournament[filter.field];
      
      switch (filter.operator) {
        case 'equals':
          return fieldValue === filter.value;
        case 'contains':
          return fieldValue?.toString().toLowerCase().includes(filter.value.toLowerCase());
        case 'greater_than':
          return fieldValue > filter.value;
        case 'less_than':
          return fieldValue < filter.value;
        case 'between':
          return fieldValue >= filter.value[0] && fieldValue <= filter.value[1];
        case 'in':
          return filter.value.includes(fieldValue);
        case 'not_in':
          return !filter.value.includes(fieldValue);
        default:
          return true;
      }
    });
  }, []);

  // Lógica de filtrado optimizada con sistema avanzado
  const filteredTournaments = useMemo(() => {
    let results = [...mockTournaments];
    
    // Aplicar filtros activos
    activeFilters.forEach(filter => {
      if (filter.active) {
        results = applyFilter(filter, results);
      }
    });
    
    // Aplicar filtros básicos (compatibilidad)
    results = results.filter(tournament => {
      // Filtro por búsqueda (optimizado)
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        tournament.name.toLowerCase().includes(searchLower) ||
        tournament.teams.some(team => team.name.toLowerCase().includes(searchLower));

      // Filtro por estado
      const matchesStatus = statusFilter === 'all' || tournament.status === statusFilter;

      // Filtro por tipo
      const matchesType = typeFilter === 'all' || tournament.type === typeFilter;

      // Filtro por fecha (optimizado)
      const currentMonth = new Date().getMonth();
      const matchesDate = dateFilter === 'all' || 
        (dateFilter === 'this-month' && new Date(tournament.startDate).getMonth() === currentMonth) ||
        (dateFilter === 'next-month' && new Date(tournament.startDate).getMonth() === currentMonth + 1);

      // Filtro por premio (optimizado)
      const matchesPrize = prizeFilter === 'all' || 
        (prizeFilter === 'low' && tournament.prize < 20000) ||
        (prizeFilter === 'medium' && tournament.prize >= 20000 && tournament.prize < 40000) ||
        (prizeFilter === 'high' && tournament.prize >= 40000);

      return matchesSearch && matchesStatus && matchesType && matchesDate && matchesPrize;
    });
    
    // Aplicar ordenamiento
    results.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'date') {
        aValue = new Date(a.startDate).getTime();
        bValue = new Date(b.startDate).getTime();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setSearchResults(results);
    return results;
  }, [searchTerm, statusFilter, typeFilter, dateFilter, prizeFilter, activeFilters, sortField, sortDirection, applyFilter]);

  // Funciones para manejar filtros guardados
  const saveCurrentFilters = useCallback((name: string, description: string) => {
    const newSavedFilter: SavedFilter = {
      id: `filter-${Date.now()}`,
      name,
      description,
      filters: activeFilters,
      isDefault: false,
      createdAt: new Date(),
      lastUsed: new Date()
    };
    
    setSavedFilters(prev => [...prev, newSavedFilter]);
  }, [activeFilters]);

  const loadSavedFilter = useCallback((savedFilter: SavedFilter) => {
    setActiveFilters(savedFilter.filters);
    setSavedFilters(prev => 
      prev.map(filter => 
        filter.id === savedFilter.id 
          ? { ...filter, lastUsed: new Date() }
          : filter
      )
    );
  }, []);

  const deleteSavedFilter = useCallback((filterId: string) => {
    setSavedFilters(prev => prev.filter(filter => filter.id !== filterId));
  }, []);

  // Funciones para historial de búsquedas
  const addToSearchHistory = useCallback((query: string, resultCount: number) => {
    if (query.trim() === '') return;
    
    const newHistoryEntry: SearchHistory = {
      id: `search-${Date.now()}`,
      query,
      filters: activeFilters,
      timestamp: new Date(),
      resultCount
    };
    
    setSearchHistory(prev => {
      const filtered = prev.filter(entry => entry.query !== query);
      return [newHistoryEntry, ...filtered].slice(0, 10); // Mantener solo 10 entradas
    });
  }, [activeFilters]);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  // Funciones para filtros avanzados
  const addFilter = useCallback((filter: Omit<Filter, 'id'>) => {
    const newFilter: Filter = {
      ...filter,
      id: `filter-${Date.now()}`,
      active: true
    };
    
    setActiveFilters(prev => [...prev, newFilter]);
  }, []);

  const removeFilter = useCallback((filterId: string) => {
    setActiveFilters(prev => prev.filter(filter => filter.id !== filterId));
  }, []);

  const toggleFilter = useCallback((filterId: string) => {
    setActiveFilters(prev => 
      prev.map(filter => 
        filter.id === filterId 
          ? { ...filter, active: !filter.active }
          : filter
      )
    );
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveFilters([]);
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setDateFilter('all');
    setPrizeFilter('all');
  }, []);

  // Funciones para dashboard interactivo
  const createWidget = useCallback((type: WidgetType, config: any): Widget => {
    return {
      id: `widget-${Date.now()}`,
      type,
      title: config.title || 'Nuevo Widget',
      description: config.description || '',
      size: config.size || 'medium',
      position: { x: 0, y: 0 },
      visible: true,
      config,
      refreshInterval: config.refreshInterval || 30000,
      lastUpdated: new Date()
    };
  }, []);

  const addWidget = useCallback((widget: Widget) => {
    setWidgets(prev => [...prev, widget]);
  }, []);

  const removeWidget = useCallback((widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
  }, []);

  const updateWidget = useCallback((widgetId: string, updates: Partial<Widget>) => {
    setWidgets(prev => prev.map(w => w.id === widgetId ? { ...w, ...updates } : w));
  }, []);

  const moveWidget = useCallback((widgetId: string, newPosition: { x: number; y: number }) => {
    updateWidget(widgetId, { position: newPosition });
  }, [updateWidget]);

  const resizeWidget = useCallback((widgetId: string, newSize: WidgetSize) => {
    updateWidget(widgetId, { size: newSize });
  }, [updateWidget]);

  const toggleWidgetVisibility = useCallback((widgetId: string) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, visible: !w.visible } : w
    ));
  }, []);

  // Funciones para layouts de dashboard
  const saveDashboardLayout = useCallback((name: string, description: string) => {
    const newLayout: DashboardLayout = {
      id: `layout-${Date.now()}`,
      name,
      description,
      widgets: [...widgets],
      isDefault: false,
      createdAt: new Date(),
      lastModified: new Date()
    };
    
    setDashboardLayouts(prev => [...prev, newLayout]);
  }, [widgets]);

  const loadDashboardLayout = useCallback((layoutId: string) => {
    const layout = dashboardLayouts.find(l => l.id === layoutId);
    if (layout) {
      setWidgets(layout.widgets);
      setCurrentLayout(layoutId);
    }
  }, [dashboardLayouts]);

  const deleteDashboardLayout = useCallback((layoutId: string) => {
    setDashboardLayouts(prev => prev.filter(l => l.id !== layoutId));
  }, []);

  // Funciones para métricas y datos
  const updateWidgetData = useCallback((widgetId: string, data: any) => {
    setWidgets(prev => prev.map(w => 
      w.id === widgetId ? { ...w, data, lastUpdated: new Date() } : w
    ));
  }, []);

  const refreshWidget = useCallback((widgetId: string) => {
    const widget = widgets.find(w => w.id === widgetId);
    if (widget && widget.refreshInterval) {
      // Simular actualización de datos
      setTimeout(() => {
        updateWidgetData(widgetId, { 
          ...widget.data, 
          refreshed: true,
          timestamp: new Date()
        });
      }, 1000);
    }
  }, [widgets, updateWidgetData]);

  // Función para generar datos de gráficos
  const generateChartData = useCallback((type: ChartType, widgetId: string): ChartData => {
    const baseData = {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Torneos',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 2
      }]
    };

    setChartData(prev => ({ ...prev, [widgetId]: baseData }));
    return baseData;
  }, []);

  // Función para generar métricas
  const generateMetricData = useCallback((widgetId: string): MetricData => {
    const value = Math.floor(Math.random() * 1000) + 100;
    const previousValue = Math.floor(Math.random() * 1000) + 100;
    const change = value - previousValue;
    const changePercentage = ((change / previousValue) * 100);
    
    const metric: MetricData = {
      value,
      previousValue,
      change,
      changePercentage,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
      unit: 'torneos',
      format: 'number'
    };

    setDashboardMetrics(prev => ({ ...prev, [widgetId]: metric }));
    return metric;
  }, []);

  // Funciones para sistema de notificaciones en tiempo real
  const createNotification = useCallback((
    type: NotificationType,
    title: string,
    message: string,
    priority: NotificationPriority = 'medium',
    metadata?: any
  ): Notification => {
    return {
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      priority,
      status: 'unread',
      title,
      message,
      timestamp: new Date(),
      metadata,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 días
    };
  }, []);

  const addNotification = useCallback((notification: Notification) => {
    setNotifications(prev => [notification, ...prev].slice(0, 50)); // Máximo 50 notificaciones
    setUnreadCount(prev => prev + 1);
    
    // Agregar al historial
    setNotificationHistory(prev => [notification, ...prev].slice(0, 100));
    
    // Mostrar notificación push si está habilitada
    if (notificationSettings.push && isNotificationPermissionGranted) {
      showPushNotification(notification);
    }
  }, [notificationSettings.push, isNotificationPermissionGranted]);

  const markNotificationAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, status: 'read' as NotificationStatus, readAt: new Date() }
          : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notif => ({ 
        ...notif, 
        status: 'read' as NotificationStatus, 
        readAt: new Date() 
      }))
    );
    setUnreadCount(0);
  }, []);

  const deleteNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  // Función para mostrar notificaciones push del navegador
  const showPushNotification = useCallback((notification: Notification) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notif = new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.id,
        requireInteraction: notification.priority === 'urgent',
        silent: notification.priority === 'low'
      });

      notif.onclick = () => {
        window.focus();
        setShowNotifications(true);
        markNotificationAsRead(notification.id);
        notif.close();
      };

      // Auto-cerrar después de 5 segundos (excepto urgentes)
      if (notification.priority !== 'urgent') {
        setTimeout(() => notif.close(), 5000);
      }
    }
  }, [markNotificationAsRead]);

  // Función para solicitar permisos de notificación
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setIsNotificationPermissionGranted(permission === 'granted');
      return permission === 'granted';
    }
    return false;
  }, []);

  // Función para conectar WebSocket
  const connectWebSocket = useCallback(() => {
    try {
      const ws = new WebSocket('ws://localhost:8080/notifications');
      
      ws.onopen = () => {
        setIsConnected(true);
        console.log('WebSocket conectado');
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          handleWebSocketMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket desconectado');
        // Reconectar después de 5 segundos
        setTimeout(connectWebSocket, 5000);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      setWsRef(ws);
    } catch (error) {
      console.error('Error connecting WebSocket:', error);
    }
  }, []);

  // Función para manejar mensajes de WebSocket
  const handleWebSocketMessage = useCallback((message: WebSocketMessage) => {
    switch (message.type) {
      case 'notification':
        const notification = createNotification(
          message.data.type,
          message.data.title,
          message.data.message,
          message.data.priority,
          message.data.metadata
        );
        addNotification(notification);
        break;
        
      case 'tournament_update':
        const tournamentNotification = createNotification(
          'tournament',
          'Actualización de Torneo',
          message.data.message,
          'medium',
          { tournamentId: message.data.tournamentId }
        );
        addNotification(tournamentNotification);
        break;
        
      case 'match_result':
        const matchNotification = createNotification(
          'result',
          'Resultado de Partido',
          message.data.message,
          'high',
          { matchId: message.data.matchId, tournamentId: message.data.tournamentId }
        );
        addNotification(matchNotification);
        break;
        
      case 'system_alert':
        const systemNotification = createNotification(
          'system',
          'Alerta del Sistema',
          message.data.message,
          'urgent',
          message.data.metadata
        );
        addNotification(systemNotification);
        break;
    }
  }, [createNotification, addNotification]);

  // Función para enviar notificación de prueba
  const sendTestNotification = useCallback(() => {
    const testNotification = createNotification(
      'info',
      'Notificación de Prueba',
      'Esta es una notificación de prueba del sistema de torneos.',
      'medium'
    );
    addNotification(testNotification);
  }, [createNotification, addNotification]);

  // Función para actualizar configuración de notificaciones
  const updateNotificationSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setNotificationSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Funciones para optimización de rendimiento
  const updatePerformanceMetrics = useCallback((renderTime: number) => {
    setPerformanceMetrics(prev => {
      const newRenderCount = prev.renderCount + 1;
      const newAverageRenderTime = (prev.averageRenderTime * prev.renderCount + renderTime) / newRenderCount;
      
      return {
        ...prev,
        renderCount: newRenderCount,
        lastRenderTime: renderTime,
        averageRenderTime: newAverageRenderTime,
        memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
        componentSize: document.querySelector('.tournament-page')?.clientHeight || 0
      };
    });
  }, []);

  // Hook personalizado para memoización avanzada
  const useAdvancedMemo = useCallback(<T,>(
    factory: () => T,
    deps: React.DependencyList,
    config: { ttl?: number; strategy?: 'aggressive' | 'conservative' | 'balanced' } = {}
  ): T => {
    const cache = useRef<Map<string, { value: T; timestamp: number }>>(new Map());
    const key = JSON.stringify(deps);
    const now = Date.now();
    
    if (cache.current.has(key)) {
      const cached = cache.current.get(key)!;
      const ttl = config.ttl || memoizationConfig.ttl;
      
      if (now - cached.timestamp < ttl) {
        return cached.value;
      }
    }
    
    const value = factory();
    cache.current.set(key, { value, timestamp: now });
    
    // Limpiar cache si excede el tamaño máximo
    if (cache.current.size > memoizationConfig.maxCacheSize) {
      const entries = Array.from(cache.current.entries());
      entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      const toDelete = entries.slice(0, entries.length - memoizationConfig.maxCacheSize);
      toDelete.forEach(([k]) => cache.current.delete(k));
    }
    
    return value;
  }, [memoizationConfig]);

  // Hook para debouncing avanzado
  const useAdvancedDebounce = useCallback(<T,>(
    value: T,
    delay: number,
    options: { leading?: boolean; trailing?: boolean; maxWait?: number } = {}
  ): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const maxTimeoutRef = useRef<NodeJS.Timeout>();
    const lastCallTime = useRef<number>(0);
    
    useEffect(() => {
      const now = Date.now();
      lastCallTime.current = now;
      
      if (options.leading && debouncedValue !== value) {
        setDebouncedValue(value);
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        if (options.trailing !== false) {
          setDebouncedValue(value);
        }
      }, delay);
      
      if (options.maxWait) {
        if (maxTimeoutRef.current) {
          clearTimeout(maxTimeoutRef.current);
        }
        maxTimeoutRef.current = setTimeout(() => {
          setDebouncedValue(value);
        }, options.maxWait);
      }
      
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        if (maxTimeoutRef.current) {
          clearTimeout(maxTimeoutRef.current);
        }
      };
    }, [value, delay, options.leading, options.trailing, options.maxWait]);
    
    return debouncedValue;
  }, []);

  // Hook para virtualización
  const useVirtualization = useCallback((
    items: any[],
    config: VirtualizationConfig
  ) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [containerHeight, setContainerHeight] = useState(config.containerHeight);
    
    const startIndex = Math.floor(scrollTop / config.itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / config.itemHeight) + config.overscan,
      items.length
    );
    
    const visibleItems = items.slice(startIndex, endIndex);
    const totalHeight = items.length * config.itemHeight;
    const offsetY = startIndex * config.itemHeight;
    
    return {
      visibleItems,
      totalHeight,
      offsetY,
      startIndex,
      endIndex,
      setScrollTop,
      setContainerHeight
    };
  }, []);

  // Función para optimizar re-renderizados
  const optimizeRenders = useCallback(() => {
    if (!renderOptimizations.memoEnabled) return;
    
    // Forzar re-renderizado optimizado
    requestAnimationFrame(() => {
      updatePerformanceMetrics(performance.now());
    });
  }, [renderOptimizations.memoEnabled, updatePerformanceMetrics]);

  // Función para activar modo de rendimiento
  const togglePerformanceMode = useCallback(() => {
    setIsPerformanceMode(prev => {
      const newMode = !prev;
      
      if (newMode) {
        // Activar optimizaciones
        setRenderOptimizations({
          memoEnabled: true,
          virtualScrolling: true,
          lazyLoading: true,
          debouncing: true
        });
        
        // Configurar CSS para optimización
        document.documentElement.style.setProperty('--optimization-mode', '1');
        document.documentElement.style.setProperty('will-change', 'transform, opacity');
      } else {
        // Desactivar optimizaciones
        setRenderOptimizations({
          memoEnabled: false,
          virtualScrolling: false,
          lazyLoading: false,
          debouncing: false
        });
        
        // Restaurar CSS
        document.documentElement.style.removeProperty('--optimization-mode');
        document.documentElement.style.removeProperty('will-change');
      }
      
      return newMode;
    });
  }, []);

  // Función para limpiar cache de memoización
  const clearMemoizationCache = useCallback(() => {
    // Limpiar todos los caches de memoización
    setPerformanceMetrics(prev => ({
      ...prev,
      renderCount: 0,
      averageRenderTime: 0
    }));
  }, []);

  // Función para medir rendimiento
  const measurePerformance = useCallback((componentName: string) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      updatePerformanceMetrics(renderTime);
    };
  }, [updatePerformanceMetrics]);

  // Funciones para sistema de roles y permisos granulares
  const hasPermission = useCallback((permission: Permission): boolean => {
    return currentUser.permissions.includes(permission);
  }, [currentUser.permissions]);

  const hasAnyPermission = useCallback((permissions: Permission[]): boolean => {
    return permissions.some(permission => currentUser.permissions.includes(permission));
  }, [currentUser.permissions]);

  const hasAllPermissions = useCallback((permissions: Permission[]): boolean => {
    return permissions.every(permission => currentUser.permissions.includes(permission));
  }, [currentUser.permissions]);

  const canViewAnalytics = useCallback((): boolean => {
    return hasPermission('analytics.view');
  }, [hasPermission]);

  const canManageTournaments = useCallback((): boolean => {
    return hasAnyPermission(['tournaments.create', 'tournaments.edit', 'tournaments.delete']);
  }, [hasAnyPermission]);

  const canManageUsers = useCallback((): boolean => {
    return hasPermission('users.manage');
  }, [hasPermission]);

  const canCustomizeDashboard = useCallback((): boolean => {
    return hasPermission('dashboard.customize');
  }, [hasPermission]);

  const canManageNotifications = useCallback((): boolean => {
    return hasPermission('notifications.manage');
  }, [hasPermission]);

  const canManageBackups = useCallback((): boolean => {
    return hasAnyPermission(['backup.create', 'backup.restore']);
  }, [hasAnyPermission]);

  const canManageRedes = useCallback((): boolean => {
    return hasPermission('redes.manage');
  }, [hasPermission]);

  const canManagePremios = useCallback((): boolean => {
    return hasPermission('premios.manage');
  }, [hasPermission]);

  const canGenerateReports = useCallback((): boolean => {
    return hasPermission('reports.generate');
  }, [hasPermission]);

  const canManageSettings = useCallback((): boolean => {
    return hasPermission('settings.manage');
  }, [hasPermission]);

  // Función para cambiar rol del usuario
  const changeUserRole = useCallback((newRole: UserRole) => {
    const roleConfig = rolePermissions.find(rp => rp.role === newRole);
    if (roleConfig) {
      setCurrentUser(prev => ({
        ...prev,
        role: newRole,
        permissions: roleConfig.permissions
      }));
      
      // Activar modo de solo lectura para espectadores
      setIsReadOnlyMode(newRole === 'spectator');
      
      // Registrar cambio de rol en auditoría
      logPermissionAction('role_change', `Changed role to ${newRole}`, true);
    }
  }, [rolePermissions]);

  // Función para agregar permiso personalizado
  const addCustomPermission = useCallback((permission: Permission) => {
    if (!currentUser.permissions.includes(permission)) {
      setCurrentUser(prev => ({
        ...prev,
        permissions: [...prev.permissions, permission],
        customPermissions: [...(prev.customPermissions || []), permission]
      }));
      
      logPermissionAction('permission_add', `Added permission: ${permission}`, true);
    }
  }, [currentUser.permissions]);

  // Función para remover permiso personalizado
  const removeCustomPermission = useCallback((permission: Permission) => {
    setCurrentUser(prev => ({
      ...prev,
      permissions: prev.permissions.filter(p => p !== permission),
      customPermissions: (prev.customPermissions || []).filter(p => p !== permission)
    }));
    
    logPermissionAction('permission_remove', `Removed permission: ${permission}`, true);
  }, []);

  // Función para registrar acciones de permisos
  const logPermissionAction = useCallback((
    action: string,
    resource: string,
    success: boolean,
    reason?: string
  ) => {
    const auditEntry: PermissionAudit = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: currentUser.id,
      action,
      resource,
      timestamp: new Date(),
      ipAddress: '127.0.0.1', // En producción sería la IP real
      userAgent: navigator.userAgent,
      success,
      reason
    };
    
    setPermissionAudit(prev => [auditEntry, ...prev].slice(0, 100)); // Mantener solo los últimos 100
  }, [currentUser.id]);

  // Función para verificar si el usuario puede realizar una acción
  const canPerformAction = useCallback((action: string, resource: string): boolean => {
    const permission = `${resource}.${action}` as Permission;
    const hasAccess = hasPermission(permission);
    
    logPermissionAction(action, resource, hasAccess, hasAccess ? undefined : 'Insufficient permissions');
    
    return hasAccess;
  }, [hasPermission, logPermissionAction]);

  // Función para obtener permisos del rol actual
  const getCurrentRolePermissions = useCallback(() => {
    return rolePermissions.find(rp => rp.role === currentUser.role);
  }, [currentUser.role, rolePermissions]);

  // Función para verificar si el usuario está en modo de solo lectura
  const isUserReadOnly = useCallback((): boolean => {
    return currentUser.role === 'spectator' || isReadOnlyMode;
  }, [currentUser.role, isReadOnlyMode]);

  // Función para obtener el nivel de acceso del usuario
  const getUserAccessLevel = useCallback((): 'full' | 'limited' | 'readonly' => {
    if (currentUser.role === 'admin') return 'full';
    if (currentUser.role === 'organizer') return 'limited';
    return 'readonly';
  }, [currentUser.role]);

  // Funciones para sistema de temas y modo oscuro
  const getCurrentTheme = useCallback((): Theme => {
    const theme = availableThemes.find(t => t.id === currentTheme);
    return theme || availableThemes[0];
  }, [currentTheme, availableThemes]);

  const applyTheme = useCallback((theme: Theme) => {
    const root = document.documentElement;
    
    // Aplicar colores
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Aplicar gradientes
    Object.entries(theme.gradients).forEach(([key, value]) => {
      root.style.setProperty(`--gradient-${key}`, value);
    });
    
    // Aplicar sombras
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
    
    // Aplicar border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
    
    // Aplicar espaciado
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });
    
    // Aplicar modo oscuro/claro
    root.classList.toggle('dark', theme.mode === 'dark');
    root.setAttribute('data-theme', theme.id);
    
    // Actualizar meta tag para color del navegador
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.colors.primary);
    }
  }, []);



  const setAutoTheme = useCallback(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    
    setThemePreferences(prev => ({ ...prev, systemTheme, mode: 'auto' }));
    setThemeMode('auto');
    
    // Aplicar tema del sistema
    document.documentElement.classList.toggle('dark', prefersDark);
    setIsDarkMode(prefersDark);
  }, []);

  const createCustomTheme = useCallback((themeData: Partial<Theme>) => {
    const customTheme: Theme = {
      id: `custom-${Date.now()}`,
      name: themeData.name || 'Tema Personalizado',
      type: 'custom',
      mode: themeData.mode || 'light',
      colors: {
        primary: themeData.colors?.primary || '#8B5CF6',
        secondary: themeData.colors?.secondary || '#A78BFA',
        accent: themeData.colors?.accent || '#C4B5FD',
        background: themeData.colors?.background || '#FFFFFF',
        surface: themeData.colors?.surface || '#F8FAFC',
        text: themeData.colors?.text || '#1F2937',
        textSecondary: themeData.colors?.textSecondary || '#6B7280',
        border: themeData.colors?.border || '#E5E7EB',
        shadow: themeData.colors?.shadow || '#000000',
        success: themeData.colors?.success || '#10B981',
        warning: themeData.colors?.warning || '#F59E0B',
        error: themeData.colors?.error || '#EF4444',
        info: themeData.colors?.info || '#3B82F6'
      },
      gradients: {
        primary: themeData.gradients?.primary || 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
        secondary: themeData.gradients?.secondary || 'linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)',
        background: themeData.gradients?.background || 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)'
      },
      shadows: {
        sm: themeData.shadows?.sm || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: themeData.shadows?.md || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: themeData.shadows?.lg || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: themeData.shadows?.xl || '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      },
      borderRadius: {
        sm: themeData.borderRadius?.sm || '0.375rem',
        md: themeData.borderRadius?.md || '0.5rem',
        lg: themeData.borderRadius?.lg || '0.75rem',
        xl: themeData.borderRadius?.xl || '1rem'
      },
      spacing: {
        xs: themeData.spacing?.xs || '0.25rem',
        sm: themeData.spacing?.sm || '0.5rem',
        md: themeData.spacing?.md || '1rem',
        lg: themeData.spacing?.lg || '1.5rem',
        xl: themeData.spacing?.xl || '2rem'
      }
    };
    
    setAvailableThemes(prev => [...prev, customTheme]);
    setThemePreferences(prev => ({ 
      ...prev, 
      customThemes: [...prev.customThemes, customTheme] 
    }));
    
    // Guardar tema personalizado
    const savedThemes = JSON.parse(localStorage.getItem('custom-themes') || '[]');
    savedThemes.push(customTheme);
    localStorage.setItem('custom-themes', JSON.stringify(savedThemes));
    
    return customTheme;
  }, []);

  const deleteCustomTheme = useCallback((themeId: string) => {
    setAvailableThemes(prev => prev.filter(t => t.id !== themeId));
    setThemePreferences(prev => ({ 
      ...prev, 
      customThemes: prev.customThemes.filter(t => t.id !== themeId) 
    }));
    
    // Actualizar localStorage
    const savedThemes = JSON.parse(localStorage.getItem('custom-themes') || '[]');
    const updatedThemes = savedThemes.filter((t: Theme) => t.id !== themeId);
    localStorage.setItem('custom-themes', JSON.stringify(updatedThemes));
  }, []);

  const exportTheme = useCallback((theme: Theme) => {
    const themeData = JSON.stringify(theme, null, 2);
    const blob = new Blob([themeData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);


  const importTheme = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const themeData = JSON.parse(e.target?.result as string);
        const importedTheme = createCustomTheme(themeData);
        changeTheme(importedTheme.id);
      } catch (error) {
        console.error('Error importing theme:', error);
      }
    };
    reader.readAsText(file);
  }, [createCustomTheme, changeTheme]);

  // Funciones para sistema de exportación y reportes
  const createExportJob = useCallback((type: ExportType, format: ExportFormat, metadata: any = {}): ExportJob => {
    return {
      id: `export-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      format,
      status: 'pending',
      progress: 0,
      createdAt: new Date(),
      metadata: {
        tournamentId: selectedTournament?.id,
        participantCount: mockTournaments.length,
        includeImages: exportSettings.includeImages,
        ...metadata
      }
    };
  }, [selectedTournament, mockTournaments.length, exportSettings.includeImages]);

  const startExport = useCallback(async (type: ExportType, format: ExportFormat, options: any = {}) => {
    const job = createExportJob(type, format, options);
    setExportJobs(prev => [job, ...prev]);
    setIsExporting(true);
    setExportProgress(0);

    try {
      // Simular proceso de exportación
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setExportProgress(i);
        setExportJobs(prev => prev.map(j => 
          j.id === job.id ? { ...j, progress: i, status: 'processing' } : j
        ));
      }

      // Generar URL de descarga simulada
      const downloadUrl = `data:application/${format};base64,${btoa('exported-data')}`;
      
      setExportJobs(prev => prev.map(j => 
        j.id === job.id ? { 
          ...j, 
          status: 'completed', 
          progress: 100, 
          completedAt: new Date(),
          downloadUrl 
        } : j
      ));

      // Mostrar notificación de éxito
      addNotification({
        id: `export-success-${Date.now()}`,
        type: 'success',
        title: 'Exportación Completada',
        message: `El ${type} ha sido exportado exitosamente en formato ${format.toUpperCase()}`,
        timestamp: new Date(),
        read: false
      });

    } catch (error) {
      setExportJobs(prev => prev.map(j => 
        j.id === job.id ? { 
          ...j, 
          status: 'failed', 
          error: error instanceof Error ? error.message : 'Error desconocido'
        } : j
      ));

      addNotification({
        id: `export-error-${Date.now()}`,
        type: 'error',
        title: 'Error en Exportación',
        message: 'Hubo un error al exportar los datos',
        timestamp: new Date(),
        read: false
      });
    } finally {
      setIsExporting(false);
    }
  }, [createExportJob, addNotification]);

  const exportBracket = useCallback(async (format: ExportFormat) => {
    await startExport('bracket', format, {
      includeImages: exportSettings.includeImages,
      quality: exportSettings.quality
    });
  }, [startExport, exportSettings]);

  const exportParticipants = useCallback(async (format: ExportFormat) => {
    await startExport('participants', format, {
      includeImages: exportSettings.includeImages
    });
  }, [startExport, exportSettings]);

  const exportStatistics = useCallback(async (format: ExportFormat) => {
    await startExport('statistics', format, {
      includeImages: exportSettings.includeImages
    });
  }, [startExport, exportSettings]);

  const exportCalendar = useCallback(async () => {
    const calendarEvent: CalendarEvent = {
      id: `tournament-${selectedTournament?.id || 'all'}`,
      title: selectedTournament?.name || 'Torneo de Fútbol',
      description: `Torneo de fútbol con ${mockTournaments.length} participantes`,
      startDate: new Date(),
      endDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 horas después
      location: 'Campo de Fútbol',
      organizer: currentUser.name
    };

    // Generar archivo ICS
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Tournament System//Tournament Calendar//EN
BEGIN:VEVENT
UID:${calendarEvent.id}@tournament-system.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${calendarEvent.startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${calendarEvent.endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${calendarEvent.title}
DESCRIPTION:${calendarEvent.description}
LOCATION:${calendarEvent.location}
ORGANIZER:CN=${calendarEvent.organizer}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `tournament-${calendarEvent.id}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addNotification({
      id: `calendar-export-${Date.now()}`,
      type: 'success',
      title: 'Calendario Exportado',
      message: 'El evento ha sido agregado a tu calendario',
      timestamp: new Date(),
      read: false
    });
  }, [selectedTournament, mockTournaments.length, currentUser.name, addNotification]);

  const downloadExport = useCallback((job: ExportJob) => {
    if (job.downloadUrl) {
      const a = document.createElement('a');
      a.href = job.downloadUrl;
      a.download = `export-${job.type}-${job.id}.${job.format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, []);

  const deleteExportJob = useCallback((jobId: string) => {
    setExportJobs(prev => prev.filter(job => job.id !== jobId));
  }, []);

  const createExportTemplate = useCallback((template: Omit<ExportTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTemplate: ExportTemplate = {
      ...template,
      id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setExportTemplates(prev => [...prev, newTemplate]);
    return newTemplate;
  }, []);

  const updateExportSettings = useCallback((settings: Partial<ExportSettings>) => {
    setExportSettings(prev => ({ ...prev, ...settings }));
    localStorage.setItem('export-settings', JSON.stringify({ ...exportSettings, ...settings }));
  }, [exportSettings]);

  const scheduleExport = useCallback((type: ExportType, format: ExportFormat, frequency: string) => {
    // Simular programación de exportación
    addNotification({
      id: `schedule-export-${Date.now()}`,
      type: 'info',
      title: 'Exportación Programada',
      message: `Exportación ${type} programada para ${frequency}`,
      timestamp: new Date(),
      read: false
    });
  }, [addNotification]);

  // Funciones para optimización mobile-first y responsive
  const detectDeviceType = useCallback((width: number): DeviceType => {
    if (width < responsiveBreakpoints.mobile) return 'mobile';
    if (width < responsiveBreakpoints.tablet) return 'tablet';
    return 'desktop';
  }, [responsiveBreakpoints]);

  const detectOrientation = useCallback((width: number, height: number): Orientation => {
    return width > height ? 'landscape' : 'portrait';
  }, []);

  const updateMobileState = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const deviceType = detectDeviceType(width);
    const orientation = detectOrientation(width, height);
    
    setMobileState(prev => ({
      ...prev,
      deviceType,
      orientation,
      screenWidth: width,
      screenHeight: height,
      isOnline: navigator.onLine
    }));

    // Optimizar para landscape en tablets
    if (deviceType === 'tablet' && orientation === 'landscape') {
      setIsLandscapeOptimized(true);
    } else {
      setIsLandscapeOptimized(false);
    }
  }, [detectDeviceType, detectOrientation]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const gesture: TouchGesture = {
      type: 'tap',
      startX: touch.clientX,
      startY: touch.clientY,
      duration: 0
    };
    setTouchGestures(prev => [...prev, gesture]);
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const startGesture = touchGestures[touchGestures.length - 1];
    
    if (startGesture) {
      const distance = Math.sqrt(
        Math.pow(touch.clientX - startGesture.startX!, 2) + 
        Math.pow(touch.clientY - startGesture.startY!, 2)
      );
      
      if (distance > 50) {
        // Detectar dirección del swipe
        const deltaX = touch.clientX - startGesture.startX!;
        const deltaY = touch.clientY - startGesture.startY!;
        
        let direction: 'up' | 'down' | 'left' | 'right';
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          direction = deltaX > 0 ? 'right' : 'left';
        } else {
          direction = deltaY > 0 ? 'down' : 'up';
        }
        
        const swipeGesture: TouchGesture = {
          type: 'swipe',
          direction,
          distance,
          startX: startGesture.startX,
          startY: startGesture.startY,
          endX: touch.clientX,
          endY: touch.clientY
        };
        
        setTouchGestures(prev => [...prev, swipeGesture]);
        
        // Manejar acciones de swipe
        if (direction === 'left' && mobileState.deviceType === 'mobile') {
          // Swipe izquierda - siguiente torneo
          const currentIndex = mockTournaments.findIndex(t => t.id === selectedTournament?.id);
          if (currentIndex < mockTournaments.length - 1) {
            setSelectedTournament(mockTournaments[currentIndex + 1]);
          }
        } else if (direction === 'right' && mobileState.deviceType === 'mobile') {
          // Swipe derecha - torneo anterior
          const currentIndex = mockTournaments.findIndex(t => t.id === selectedTournament?.id);
          if (currentIndex > 0) {
            setSelectedTournament(mockTournaments[currentIndex - 1]);
          }
        }
      }
    }
  }, [touchGestures, mobileState.deviceType, mockTournaments, selectedTournament]);

  const handlePinch = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + 
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const pinchGesture: TouchGesture = {
        type: 'pinch',
        distance,
        startX: (touch1.clientX + touch2.clientX) / 2,
        startY: (touch1.clientY + touch2.clientY) / 2
      };
      
      setTouchGestures(prev => [...prev, pinchGesture]);
      
      // Manejar zoom en mobile
      if (mobileState.deviceType === 'mobile') {
        if (distance > 100) {
          setMobileViewMode('grid');
        } else {
          setMobileViewMode('list');
        }
      }
    }
  }, [mobileState.deviceType]);

  const switchMobileTab = useCallback((tabId: string) => {
    setMobileNavigation(prev => ({ ...prev, activeTab: tabId }));
    setIsMobileMenuOpen(false);
  }, []);


  const toggleMobileFilters = useCallback(() => {
    setShowMobileFilters(prev => !prev);
  }, []);

  const toggleMobileViewMode = useCallback(() => {
    setMobileViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  }, []);

  const getResponsiveClasses = useCallback((baseClasses: string) => {
    const { deviceType, orientation } = mobileState;
    
    let responsiveClasses = baseClasses;
    
    // Clases específicas por dispositivo
    if (deviceType === 'mobile') {
      responsiveClasses += ' mobile-optimized';
      if (orientation === 'landscape') {
        responsiveClasses += ' mobile-landscape';
      }
    } else if (deviceType === 'tablet') {
      responsiveClasses += ' tablet-optimized';
      if (orientation === 'landscape') {
        responsiveClasses += ' tablet-landscape';
      }
    } else {
      responsiveClasses += ' desktop-optimized';
    }
    
    return responsiveClasses;
  }, [mobileState]);

  const getMobileGridCols = useCallback(() => {
    const { deviceType, orientation } = mobileState;
    
    if (deviceType === 'mobile') {
      return orientation === 'landscape' ? 2 : 1;
    } else if (deviceType === 'tablet') {
      return orientation === 'landscape' ? 3 : 2;
    }
    return 4;
  }, [mobileState]);

  const isMobileOptimized = useCallback(() => {
    return mobileState.deviceType === 'mobile' || mobileState.deviceType === 'tablet';
  }, [mobileState.deviceType]);

  const getTouchOptimizedSize = useCallback((baseSize: number) => {
    if (mobileState.isTouchDevice) {
      return Math.max(baseSize, 44); // Mínimo 44px para touch
    }
    return baseSize;
  }, [mobileState.isTouchDevice]);

  // Funciones para sistema de backup y recuperación de datos
  const createBackup = useCallback(async (type: BackupType = 'manual', name?: string) => {
    const backupId = `backup-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const backupName = name || `Backup ${new Date().toLocaleString()}`;
    
    const backupData: BackupData = {
      id: backupId,
      name: backupName,
      type,
      status: 'pending',
      createdAt: new Date(),
      size: 0,
      description: `Backup ${type} creado automáticamente`,
      version: '1.0.0',
      data: {
        tournaments: tournaments,
        settings: exportSettings,
        userPreferences: themePreferences,
        notifications: notifications,
        exportJobs: exportJobs,
        themes: availableThemes,
        mobileSettings: mobileState
      },
      metadata: {
        deviceType: mobileState.deviceType,
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
        checksum: ''
      }
    };

    setBackups(prev => [backupData, ...prev]);
    setIsBackingUp(true);
    setBackupProgress(0);

    try {
      // Simular proceso de backup
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setBackupProgress(i);
        setBackups(prev => prev.map(b => 
          b.id === backupId ? { ...b, status: 'in_progress' } : b
        ));
      }

      // Calcular tamaño del backup
      const dataSize = JSON.stringify(backupData.data).length;
      
      setBackups(prev => prev.map(b => 
        b.id === backupId ? { 
          ...b, 
          status: 'completed', 
          completedAt: new Date(),
          size: dataSize
        } : b
      ));

      // Agregar al historial
      const historyEntry: BackupHistory = {
        id: `history-${Date.now()}`,
        action: 'create',
        backupId,
        timestamp: new Date(),
        userId: currentUser.id,
        details: `Backup ${type} creado exitosamente`,
        success: true
      };
      setBackupHistory(prev => [historyEntry, ...prev]);

      // Notificación de éxito
      if (backupSettings.notifyOnBackup) {
        addNotification({
          id: `backup-success-${Date.now()}`,
          type: 'success',
          title: 'Backup Completado',
          message: `El backup "${backupName}" se ha creado exitosamente`,
          timestamp: new Date(),
          read: false
        });
      }

    } catch (error) {
      setBackups(prev => prev.map(b => 
        b.id === backupId ? { ...b, status: 'failed' } : b
      ));

      addNotification({
        id: `backup-error-${Date.now()}`,
        type: 'error',
        title: 'Error en Backup',
        message: 'Hubo un error al crear el backup',
        timestamp: new Date(),
        read: false
      });
    } finally {
      setIsBackingUp(false);
    }
  }, [mockTournaments, exportSettings, themePreferences, notifications, exportJobs, availableThemes, mobileState, currentUser.id, backupSettings, addNotification]);

  const restoreBackup = useCallback(async (backupId: string, options: RestoreOptions) => {
    const backup = backups.find(b => b.id === backupId);
    if (!backup) return;

    setIsRestoring(true);
    setRestoreProgress(0);

    try {
      // Simular proceso de restauración
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setRestoreProgress(i);
      }

      // Restaurar datos según el tipo
      if (options.restoreType === 'full') {
        setTournaments(backup.data.tournaments);
        setExportSettings(backup.data.settings);
        setThemePreferences(backup.data.userPreferences);
        setNotifications(backup.data.notifications);
        setExportJobs(backup.data.exportJobs);
        setAvailableThemes(backup.data.themes);
        setMobileState(backup.data.mobileSettings);
      } else if (options.restoreType === 'partial') {
        // Restaurar solo datos seleccionados
        if (options.selectedData.includes('tournaments')) {
          setTournaments(backup.data.tournaments);
        }
        if (options.selectedData.includes('settings')) {
          setExportSettings(backup.data.settings);
        }
        if (options.selectedData.includes('themes')) {
          setAvailableThemes(backup.data.themes);
        }
      }

      // Agregar al historial
      const historyEntry: BackupHistory = {
        id: `history-${Date.now()}`,
        action: 'restore',
        backupId,
        timestamp: new Date(),
        userId: currentUser.id,
        details: `Restauración ${options.restoreType} completada`,
        success: true
      };
      setBackupHistory(prev => [historyEntry, ...prev]);

      // Notificación de éxito
      if (backupSettings.notifyOnRestore) {
        addNotification({
          id: `restore-success-${Date.now()}`,
          type: 'success',
          title: 'Restauración Completada',
          message: `Los datos han sido restaurados desde "${backup.name}"`,
          timestamp: new Date(),
          read: false
        });
      }

    } catch (error) {
      addNotification({
        id: `restore-error-${Date.now()}`,
        type: 'error',
        title: 'Error en Restauración',
        message: 'Hubo un error al restaurar los datos',
        timestamp: new Date(),
        read: false
      });
    } finally {
      setIsRestoring(false);
    }
  }, [backups, currentUser.id, backupSettings, addNotification]);

  const deleteBackup = useCallback((backupId: string) => {
    setBackups(prev => prev.filter(b => b.id !== backupId));
    
    const historyEntry: BackupHistory = {
      id: `history-${Date.now()}`,
      action: 'delete',
      backupId,
      timestamp: new Date(),
      userId: currentUser.id,
      details: 'Backup eliminado',
      success: true
    };
    setBackupHistory(prev => [historyEntry, ...prev]);

    addNotification({
      id: `backup-deleted-${Date.now()}`,
      type: 'info',
      title: 'Backup Eliminado',
      message: 'El backup ha sido eliminado exitosamente',
      timestamp: new Date(),
      read: false
    });
  }, [currentUser.id, addNotification]);

  const scheduleBackup = useCallback((frequency: string) => {
    const historyEntry: BackupHistory = {
      id: `history-${Date.now()}`,
      action: 'schedule',
      backupId: 'scheduled',
      timestamp: new Date(),
      userId: currentUser.id,
      details: `Backup programado para ${frequency}`,
      success: true
    };
    setBackupHistory(prev => [historyEntry, ...prev]);

    addNotification({
      id: `backup-scheduled-${Date.now()}`,
      type: 'info',
      title: 'Backup Programado',
      message: `Backup automático programado para ${frequency}`,
      timestamp: new Date(),
      read: false
    });
  }, [currentUser.id, addNotification]);

  const updateBackupSettings = useCallback((settings: Partial<BackupSettings>) => {
    setBackupSettings(prev => ({ ...prev, ...settings }));
    localStorage.setItem('backup-settings', JSON.stringify({ ...backupSettings, ...settings }));
  }, [backupSettings]);

  const exportBackup = useCallback((backup: BackupData) => {
    const dataStr = JSON.stringify(backup, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup-${backup.name.replace(/\s+/g, '-')}-${backup.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  const importBackup = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target?.result as string);
        setBackups(prev => [backupData, ...prev]);
        
        addNotification({
          id: `backup-imported-${Date.now()}`,
          type: 'success',
          title: 'Backup Importado',
          message: `El backup "${backupData.name}" ha sido importado exitosamente`,
          timestamp: new Date(),
          read: false
        });
      } catch (error) {
        addNotification({
          id: `backup-import-error-${Date.now()}`,
          type: 'error',
          title: 'Error al Importar',
          message: 'No se pudo importar el archivo de backup',
          timestamp: new Date(),
          read: false
        });
      }
    };
    reader.readAsText(file);
  }, [addNotification]);

  const autoBackup = useCallback(() => {
    if (backupSettings.autoBackup) {
      createBackup('auto');
    }
  }, [backupSettings.autoBackup, createBackup]);

  // Componentes memoizados para optimización de rendimiento
  const OptimizedTournamentCard = memo<{ tournament: any; onSelect: (id: string) => void }>(({ tournament, onSelect }) => {
    const handleClick = useCallback(() => onSelect(tournament.id), [tournament.id, onSelect]);
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
        onClick={handleClick}
        style={{ willChange: 'transform' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{tournament.name}</h3>
              <p className="text-gray-600 text-sm">{tournament.type}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-600">${tournament.prize.toLocaleString()}</p>
            <p className="text-gray-500 text-sm">Premio</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{tournament.participants}</p>
            <p className="text-gray-500 text-sm">Participantes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{tournament.matches}</p>
            <p className="text-gray-500 text-sm">Partidos</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600 text-sm">{tournament.date}</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            tournament.status === 'active' ? 'bg-green-100 text-green-700' :
            tournament.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {tournament.status === 'active' ? 'Activo' :
             tournament.status === 'upcoming' ? 'Próximo' : 'Finalizado'}
          </div>
        </div>
      </motion.div>
    );
  });

  const OptimizedFilterButton = memo<{ 
    active: boolean; 
    onClick: () => void; 
    children: React.ReactNode; 
    count?: number;
  }>(({ active, onClick, children, count }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
        active 
          ? 'bg-purple-600 text-white shadow-lg' 
          : 'bg-white/80 text-gray-700 hover:bg-purple-50'
      }`}
      style={{ willChange: 'background-color, transform' }}
    >
      {children}
      {count !== undefined && (
        <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
          {count}
        </span>
      )}
    </button>
  ));

  const OptimizedSearchInput = memo<{
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    debounceMs?: number;
  }>(({ value, onChange, placeholder, debounceMs = 300 }) => {
    const debouncedValue = useAdvancedDebounce(value, debounceMs, {
      leading: true,
      trailing: true,
      maxWait: 1000
    });

    useEffect(() => {
      if (debouncedValue !== value) {
        onChange(debouncedValue);
      }
    }, [debouncedValue, value, onChange]);

    return (
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-xl border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          style={{ willChange: 'border-color, box-shadow' }}
        />
      </div>
    );
  });

  // Estadísticas calculadas con useMemo optimizado
  const tournamentStats = useAdvancedMemo(() => [
    { 
      id: 'active-tournaments',
      icon: Trophy, 
      title: 'Torneos Activos', 
      value: '8', 
      change: '+15', 
      color: 'from-purple-500 to-pink-500',
      drillDownData: [
        { name: 'Eliminación', value: 4 },
        { name: 'Grupos', value: 3 },
        { name: 'Liga', value: 1 }
      ]
    },
    { 
      id: 'registered-teams',
      icon: Users, 
      title: 'Equipos Inscritos', 
      value: '64', 
      change: '+23', 
      color: 'from-indigo-500 to-purple-500',
      drillDownData: [
        { name: 'Profesionales', value: 32 },
        { name: 'Amateurs', value: 20 },
        { name: 'Principiantes', value: 12 }
      ]
    },
    { 
      id: 'matches-today',
      icon: Calendar, 
      title: 'Partidos Hoy', 
      value: '12', 
      change: '+8', 
      color: 'from-rose-500 to-pink-500',
      drillDownData: [
        { name: 'Mañana', value: 6 },
        { name: 'Tarde', value: 4 },
        { name: 'Noche', value: 2 }
      ]
    },
    { 
      id: 'total-prizes',
      icon: Award, 
      title: 'Premios Totales', 
      value: '$25K', 
      change: '+12', 
      color: 'from-purple-500 to-rose-500',
      drillDownData: [
        { name: '1er Lugar', value: 15000 },
        { name: '2do Lugar', value: 8000 },
        { name: '3er Lugar', value: 2000 }
      ]
    },
  ], []);

  // Datos para gráficos calculados con useMemo
  const chartDataMemo = useMemo(() => ({
    tournamentsOverTime: [
      { month: 'Ene', tournaments: 4, participants: 120 },
      { month: 'Feb', tournaments: 6, participants: 180 },
      { month: 'Mar', tournaments: 8, participants: 240 },
      { month: 'Abr', tournaments: 12, participants: 360 },
      { month: 'May', tournaments: 15, participants: 450 },
      { month: 'Jun', tournaments: 18, participants: 540 },
    ],
    tournamentTypes: [
      { type: 'Eliminación', count: 8, percentage: 40 },
      { type: 'Grupos', count: 6, percentage: 30 },
      { type: 'Liga', count: 6, percentage: 30 },
    ],
    performanceMetrics: [
      { metric: 'Tiempo Promedio', value: '2.5h', trend: 'up' },
      { metric: 'Participación', value: '85%', trend: 'up' },
      { metric: 'Satisfacción', value: '4.8/5', trend: 'up' },
      { metric: 'Retención', value: '78%', trend: 'down' },
    ]
  }), []);

  // Funciones optimizadas con useCallback para manejar notificaciones
  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  }, []);

  const handleMetricClick = useCallback((metricId: string) => {
    setSelectedMetric(selectedMetric === metricId ? null : metricId);
  }, [selectedMetric]);

  // Funciones para manejar roles y permisos
  const canEdit = useCallback((): boolean => {
    return hasPermission('tournaments.edit') || hasPermission('tournaments.create');
  }, [hasPermission]);

  const canDelete = useCallback((): boolean => {
    return hasPermission('tournaments.delete');
  }, [hasPermission]);

  const switchRole = useCallback((newRole: UserRole) => {
    setCurrentUser(prev => ({
      ...prev,
      role: newRole,
      permissions: ROLE_PERMISSIONS[newRole]
    }));
    setShowRoleSelector(false);
  }, []);

  const getRoleIcon = useCallback((role: UserRole) => {
    switch (role) {
      case 'admin': return Crown;
      case 'organizer': return Shield;
      case 'participant': return User;
      case 'spectator': return EyeIcon;
      default: return User;
    }
  }, []);

  const getRoleColor = useCallback((role: UserRole) => {
    switch (role) {
      case 'admin': return 'from-red-500 to-pink-500';
      case 'organizer': return 'from-blue-500 to-indigo-500';
      case 'participant': return 'from-green-500 to-emerald-500';
      case 'spectator': return 'from-gray-500 to-slate-500';
      default: return 'from-gray-500 to-slate-500';
    }
  }, []);

  const getRoleName = useCallback((role: UserRole) => {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'organizer': return 'Organizador';
      case 'participant': return 'Participante';
      case 'spectator': return 'Espectador';
      default: return 'Usuario';
    }
  }, []);


  const toggleDarkMode = useCallback(() => {
    const newTheme = isDarkMode ? 'light-purple' : 'dark-purple';
    changeTheme(newTheme);
  }, [isDarkMode, changeTheme]);

  const getThemeIcon = useCallback((themeKey: string) => {
    const theme = THEMES[themeKey];
    if (!theme) return Sun;
    
    switch (theme.mode) {
      case 'light': return Sun;
      case 'dark': return Moon;
      case 'system': return Monitor;
      default: return Sun;
    }
  }, []);

  const getThemeColor = useCallback((themeKey: string) => {
    const theme = THEMES[themeKey];
    if (!theme) return 'from-purple-500 to-pink-500';
    
    switch (theme.color) {
      case 'purple': return 'from-purple-500 to-pink-500';
      case 'blue': return 'from-blue-500 to-indigo-500';
      case 'green': return 'from-green-500 to-emerald-500';
      case 'red': return 'from-red-500 to-rose-500';
      case 'orange': return 'from-orange-500 to-amber-500';
      case 'pink': return 'from-pink-500 to-rose-500';
      default: return 'from-purple-500 to-pink-500';
    }
  }, []);

  // Cargar tema guardado al inicializar
  useEffect(() => {
    const savedTheme = localStorage.getItem('tournament-theme');
    if (savedTheme && THEMES[savedTheme]) {
      changeTheme(savedTheme);
    }
  }, [changeTheme]);

  // Funciones para manejar exportación
  const generateExportData = useCallback((tournamentId: string): ExportData => {
    const tournament = mockTournaments.find(t => t.id === tournamentId) || mockTournament;
    return {
      tournament,
      participants: tournament.teams || [],
      statistics: tournamentStats,
      brackets: [],
      matches: tournament.matches || []
    };
  }, []);

  const exportToPDF = useCallback(async (data: ExportData, type: ExportType) => {
    // Simulación de exportación a PDF
    console.log(`Exportando ${type} a PDF:`, data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, filename: `${type}-${Date.now()}.pdf` });
      }, 2000);
    });
  }, []);

  const exportToPNG = useCallback(async (data: ExportData, type: ExportType) => {
    // Simulación de exportación a PNG
    console.log(`Exportando ${type} a PNG:`, data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, filename: `${type}-${Date.now()}.png` });
      }, 1500);
    });
  }, []);

  const exportToCSV = useCallback(async (data: ExportData, type: ExportType) => {
    // Simulación de exportación a CSV
    console.log(`Exportando ${type} a CSV:`, data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, filename: `${type}-${Date.now()}.csv` });
      }, 1000);
    });
  }, []);

  const exportToXLSX = useCallback(async (data: ExportData, type: ExportType) => {
    // Simulación de exportación a XLSX
    console.log(`Exportando ${type} a XLSX:`, data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, filename: `${type}-${Date.now()}.xlsx` });
      }, 1800);
    });
  }, []);

  const exportToCalendar = useCallback(async (data: ExportData) => {
    // Simulación de exportación a calendario
    console.log('Exportando a calendario:', data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, filename: `tournament-${Date.now()}.ics` });
      }, 1200);
    });
  }, []);

  const handleExport = useCallback(async (option: ExportOption, tournamentId: string) => {
    setIsExporting(true);
    setExportProgress(0);
    
    try {
      const data = generateExportData(tournamentId);
      let result;
      
      // Simular progreso
      const progressInterval = setInterval(() => {
        setExportProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);
      
      switch (option.format) {
        case 'pdf':
          result = await exportToPDF(data, option.type);
          break;
        case 'png':
          result = await exportToPNG(data, option.type);
          break;
        case 'csv':
          result = await exportToCSV(data, option.type);
          break;
        case 'xlsx':
          result = await exportToXLSX(data, option.type);
          break;
        case 'json':
          result = await exportToCalendar(data);
          break;
        default:
          throw new Error('Formato no soportado');
      }
      
      clearInterval(progressInterval);
      setExportProgress(100);
      
      // Simular descarga
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
        alert(`Archivo exportado exitosamente: ${(result as any).filename}`);
      }, 500);
      
    } catch (error) {
      console.error('Error en exportación:', error);
      setIsExporting(false);
      setExportProgress(0);
      alert('Error al exportar el archivo');
    }
  }, [generateExportData, exportToPDF, exportToPNG, exportToCSV, exportToXLSX, exportToCalendar]);

  const toggleExportOption = useCallback((optionId: string) => {
    setSelectedExportOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  }, []);

  const exportSelected = useCallback(async (tournamentId: string) => {
    if (selectedExportOptions.length === 0) {
      alert('Selecciona al menos una opción de exportación');
      return;
    }
    
    setIsExporting(true);
    setExportProgress(0);
    
    try {
      for (let i = 0; i < selectedExportOptions.length; i++) {
        const option = EXPORT_OPTIONS.find(opt => opt.id === selectedExportOptions[i]);
        if (option) {
          await handleExport(option, tournamentId);
          setExportProgress(((i + 1) / selectedExportOptions.length) * 100);
        }
      }
      
      setSelectedExportOptions([]);
      setShowExportPanel(false);
    } catch (error) {
      console.error('Error en exportación múltiple:', error);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  }, [selectedExportOptions, handleExport]);

  // Funciones para manejar mobile-first



  const toggleMobileMenu = useCallback(() => {
    setMobileState(prev => ({
      ...prev,
      isMobileMenuOpen: !prev.isMobileMenuOpen
    }));
  }, []);

  const changeViewMode = useCallback((mode: ViewMode) => {
    setMobileState(prev => ({
      ...prev,
      viewMode: mode
    }));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);


  const getDeviceIcon = useCallback((deviceType: DeviceType) => {
    switch (deviceType) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      case 'desktop': return MonitorIcon;
      default: return MonitorIcon;
    }
  }, []);

  const getViewModeIcon = useCallback((viewMode: ViewMode) => {
    switch (viewMode) {
      case 'grid': return Maximize;
      case 'list': return Minimize;
      case 'card': return Eye;
      default: return Maximize;
    }
  }, []);

  // Detectar cambios de tamaño y orientación
  useEffect(() => {
    updateMobileState();
    
    const handleResize = () => {
      updateMobileState();
    };
    
    const handleOrientationChange = () => {
      setTimeout(updateMobileState, 100);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [updateMobileState]);

  // Funciones para manejar backup y recuperación
  const generateChecksum = useCallback((data: any): string => {
    return btoa(JSON.stringify(data)).slice(0, 16);
  }, []);




  const revertChange = useCallback((historyId: string) => {
    const historyEntry = changeHistory.find(h => h.id === historyId);
    if (!historyEntry || !historyEntry.canRevert) return;
    
    // Simular reversión
    console.log('Revirtiendo cambio:', historyEntry);
    
    const newHistoryEntry: ChangeHistory = {
      id: `history_${Date.now()}`,
      timestamp: new Date(),
      action: 'change_reverted',
      description: `Cambio revertido: ${historyEntry.description}`,
      data: { originalHistoryId: historyId },
      canRevert: false
    };
    
    setChangeHistory(prev => [newHistoryEntry, ...prev.slice(0, 49)]);
  }, [changeHistory]);


  // Auto-guardado
  useEffect(() => {
    if (!backupSettings.autoSave) return;
    
    const interval = setInterval(() => {
      createBackup('auto', 'Auto-guardado automático');
    }, backupSettings.autoSaveInterval * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [backupSettings.autoSave, backupSettings.autoSaveInterval, createBackup]);

  // Cargar backups existentes al inicializar
  useEffect(() => {
    const savedBackups = localStorage.getItem('tournament-backups');
    if (savedBackups) {
      try {
        const parsedBackups = JSON.parse(savedBackups);
        setBackups(parsedBackups);
      } catch (error) {
        console.error('Error cargando backups:', error);
      }
    }
  }, []);

  // Guardar backups en localStorage
  useEffect(() => {
    localStorage.setItem('tournament-backups', JSON.stringify(backups));
  }, [backups]);

  // Simulación de WebSocket para notificaciones en tiempo real
  useEffect(() => {
    // Verificar permisos de notificación
    if ('Notification' in window) {
      setIsNotificationPermissionGranted(Notification.permission === 'granted');
    }

    // Conectar WebSocket
    connectWebSocket();

    // Simular notificaciones iniciales
    const initialNotifications = [
      createNotification('info', 'Bienvenido al sistema de torneos', 'El sistema de notificaciones en tiempo real está activo', 'low'),
      createNotification('success', 'Sistema conectado', 'WebSocket conectado exitosamente', 'medium'),
      createNotification('tournament', 'Nuevo torneo disponible', 'Se ha creado un nuevo torneo: Copa de Invierno 2024', 'high')
    ];
    
    initialNotifications.forEach(notification => {
      addNotification(notification);
    });

    // Simular notificaciones automáticas
    const intervals = [
      { delay: 5000, message: 'Nuevo torneo "Copa Primavera" ha comenzado', type: 'tournament' as NotificationType },
      { delay: 10000, message: 'Partido Alpha vs Beta está en progreso', type: 'match' as NotificationType },
      { delay: 15000, message: 'Resultado: Equipo Gamma ganó 3-1', type: 'result' as NotificationType },
      { delay: 20000, message: 'Torneo "Liga Profesional" finalizado', type: 'tournament' as NotificationType },
    ];

    intervals.forEach(({ delay, message, type }) => {
      setTimeout(() => {
        const notification = createNotification(
          type,
          'Actualización de Torneo',
          message,
          'medium',
          { tournamentId: '1' }
        );
        addNotification(notification);
      }, delay);
    });

    // Cleanup
    return () => {
      if (wsRef) {
        wsRef.close();
      }
    };
  }, [connectWebSocket, createNotification, addNotification]);

  // Efecto para limpiar notificaciones expiradas
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setNotifications(prev => 
        prev.filter(notif => !notif.expiresAt || notif.expiresAt > now)
      );
    }, 60000); // Verificar cada minuto

    return () => clearInterval(interval);
  }, []);

  // Efecto para inicializar sistema de temas
  useEffect(() => {
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('tournament-theme');
    const savedDarkMode = localStorage.getItem('tournament-dark-mode');
    const savedCustomThemes = localStorage.getItem('custom-themes');
    
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
    
    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
    }
    
    if (savedCustomThemes) {
      try {
        const customThemes = JSON.parse(savedCustomThemes);
        setAvailableThemes(prev => [...prev, ...customThemes]);
        setThemePreferences(prev => ({ ...prev, customThemes }));
      } catch (error) {
        console.error('Error loading custom themes:', error);
      }
    }
    
    // Detectar preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (themeMode === 'auto') {
        setIsDarkMode(e.matches);
        document.documentElement.classList.toggle('dark', e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Aplicar tema inicial
    const currentThemeObj = availableThemes.find(t => t.id === (savedTheme || 'light-purple'));
    if (currentThemeObj) {
      applyTheme(currentThemeObj);
    }
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [availableThemes, applyTheme, themeMode]);

  // Efecto para inicializar sistema mobile-first
  useEffect(() => {
    // Detectar dispositivo inicial
    updateMobileState();
    
    // Detectar cambios de orientación
    const handleOrientationChange = () => {
      setTimeout(updateMobileState, 100); // Delay para obtener dimensiones correctas
    };
    
    // Detectar cambios de tamaño de ventana
    const handleResize = () => {
      updateMobileState();
    };
    
    // Detectar cambios de conectividad
    const handleOnline = () => {
      setMobileState(prev => ({ ...prev, isOnline: true }));
    };
    
    const handleOffline = () => {
      setMobileState(prev => ({ ...prev, isOnline: false }));
    };
    
    // Detectar teclado virtual (aproximación)
    const handleKeyboardToggle = () => {
      const height = window.innerHeight;
      setMobileState(prev => ({ 
        ...prev, 
        hasKeyboard: height < prev.screenHeight * 0.75 
      }));
    };
    
    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('resize', handleKeyboardToggle);
    
    // Detectar información de batería si está disponible
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setMobileState(prev => ({ 
          ...prev, 
          batteryLevel: Math.round(battery.level * 100) 
        }));
      });
    }
    
    // Detectar tipo de conexión si está disponible
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        setMobileState(prev => ({ 
          ...prev, 
          connectionType: connection.effectiveType 
        }));
      }
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('resize', handleKeyboardToggle);
    };
  }, [updateMobileState]);

  // Efecto para auto-backup
  useEffect(() => {
    if (!backupSettings.autoBackup) return;

    const interval = setInterval(() => {
      autoBackup();
    }, getBackupInterval());

    return () => clearInterval(interval);
  }, [backupSettings.autoBackup, autoBackup]);

  const getBackupInterval = useCallback(() => {
    switch (backupSettings.backupFrequency) {
      case 'hourly': return 60 * 60 * 1000; // 1 hora
      case 'daily': return 24 * 60 * 60 * 1000; // 1 día
      case 'weekly': return 7 * 24 * 60 * 60 * 1000; // 1 semana
      case 'monthly': return 30 * 24 * 60 * 60 * 1000; // 1 mes
      default: return 24 * 60 * 60 * 1000;
    }
  }, [backupSettings.backupFrequency]);

  // Efecto para medir rendimiento en tiempo real
  useEffect(() => {
    if (!isPerformanceMode) return;

    const measurePerformance = () => {
      const startTime = performance.now();
      
      requestAnimationFrame(() => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        updatePerformanceMetrics(renderTime);
      });
    };

    // Medir rendimiento cada 5 segundos
    const interval = setInterval(measurePerformance, 5000);
    
    // Medir rendimiento en cambios de estado
    const observer = new MutationObserver(() => {
      if (isPerformanceMode) {
        measurePerformance();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [isPerformanceMode, updatePerformanceMetrics]);

  // Efecto para aplicar optimizaciones CSS
  useEffect(() => {
    if (isPerformanceMode) {
      // Aplicar optimizaciones CSS
      document.documentElement.style.setProperty('--optimization-mode', '1');
      document.documentElement.style.setProperty('will-change', 'transform, opacity');
      document.documentElement.style.setProperty('contain', 'layout style paint');
      
      // Optimizar animaciones
      const style = document.createElement('style');
      style.textContent = `
        .tournament-page * {
          will-change: auto;
        }
        .tournament-page .optimized {
          will-change: transform, opacity;
          contain: layout style paint;
        }
        .tournament-page .virtual-scroll {
          contain: strict;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
        document.documentElement.style.removeProperty('--optimization-mode');
        document.documentElement.style.removeProperty('will-change');
        document.documentElement.style.removeProperty('contain');
      };
    }
  }, [isPerformanceMode]);


  return (
    <div 
      className="min-h-screen pb-12 transition-all duration-500"
      style={{
        background: `linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 50%, var(--color-accent) 100%)`,
        color: 'var(--color-text)'
      }}
    >
      {/* Indicador de progreso global para preloading */}
      <GlobalLoadingIndicator 
        progress={loadingProgress} 
        isVisible={loadingProgress > 0 && loadingProgress < 100} 
      />
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
        style={{
          background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)`
        }}
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
              <Trophy className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Torneos <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Elite</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed">
            Organiza y gestiona torneos profesionales con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">brackets inteligentes</span> y seguimiento en tiempo real
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Gestión Profesional</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <PlayCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Streaming en Vivo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Analytics Avanzado</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navegación Mobile-First */}
      {mobileState.deviceType === 'mobile' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 p-4">
            {/* Header móvil */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  {React.createElement(getDeviceIcon(mobileState.deviceType), { className: "w-4 h-4 text-gray-600 dark:text-gray-400" })}
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {mobileState.deviceType === 'mobile' ? 'Móvil' : 
                     mobileState.deviceType === 'tablet' ? 'Tablet' : 'Escritorio'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${mobileState.touchEnabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {mobileState.touchEnabled ? 'Táctil' : 'Ratón'}
                  </span>
                </div>
              </div>
            </div>

            {/* Navegación por pestañas */}
            <div className="flex overflow-x-auto gap-2 pb-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'tournaments', label: 'Torneos', icon: Trophy },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                { id: 'export', label: 'Exportar', icon: Download },
                { id: 'themes', label: 'Temas', icon: Palette },
                { id: 'settings', label: 'Config', icon: Settings }
              ].map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span className="text-sm font-semibold">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Indicadores de orientación */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  {mobileState.orientation === 'landscape' ? 'Horizontal' : 'Vertical'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-400">Vista:</span>
                <div className="flex gap-1">
                  {(['grid', 'list', 'card'] as ViewMode[]).map((mode) => {
                    const ModeIcon = getViewModeIcon(mode);
                    const isActive = mobileState.viewMode === mode;
                    return (
                      <button
                        key={mode}
                        onClick={() => changeViewMode(mode)}
                        className={`p-1 rounded transition-all duration-300 ${
                          isActive
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}
                      >
                        <ModeIcon className="w-3 h-3" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Sistema de Temas y Modo Oscuro */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-8"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Temas y Personalización</h2>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getThemeColor(currentTheme)}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {THEMES[currentTheme]?.name || 'Tema Personalizado'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
              </button>
              <button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-300"
              >
                <Palette className="w-4 h-4" />
                Personalizar
              </button>
            </div>
          </div>

          {/* Información del tema actual */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl mb-6">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getThemeColor(currentTheme)} flex items-center justify-center`}>
              {React.createElement(getThemeIcon(currentTheme), { className: "w-6 h-6 text-white" })}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white">{THEMES[currentTheme]?.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{THEMES[currentTheme]?.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {THEMES[currentTheme]?.mode === 'light' ? 'Modo Claro' : 'Modo Oscuro'}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {THEMES[currentTheme]?.color === 'purple' ? 'Púrpura' :
                   THEMES[currentTheme]?.color === 'blue' ? 'Azul' :
                   THEMES[currentTheme]?.color === 'green' ? 'Verde' : 'Personalizado'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Colores</p>
              <div className="flex gap-1 mt-1">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: THEMES[currentTheme]?.colors.primary }}></div>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: THEMES[currentTheme]?.colors.secondary }}></div>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: THEMES[currentTheme]?.colors.accent }}></div>
              </div>
            </div>
          </div>

          {/* Selector de temas */}
          <AnimatePresence>
            {showThemeSelector && (
          <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Seleccionar Tema</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(THEMES).map(([themeKey, theme]) => {
                    const ThemeIcon = getThemeIcon(themeKey);
                    const isCurrentTheme = currentTheme === themeKey;
                    return (
                      <button
                        key={themeKey}
                        onClick={() => changeTheme(themeKey)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          isCurrentTheme
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg'
                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getThemeColor(themeKey)} flex items-center justify-center`}>
                            <ThemeIcon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-center">
                            <h4 className="font-bold text-gray-900 dark:text-white">{theme.name}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{theme.description}</p>
                          </div>
                          {isCurrentTheme && (
                            <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm font-semibold">Activo</span>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Previsualización del tema */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Torneos Activos</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">8 torneos</p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Equipos</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">64 equipos</p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Premios</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">$25K total</p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sistema de Exportación y Reportes */}
      <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Exportación y Reportes</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedExportOptions.length} opciones seleccionadas
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowExportPanel(!showExportPanel)}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                Exportar
              </button>
              <button
                onClick={() => exportSelected('1')}
                disabled={selectedExportOptions.length === 0 || isExporting}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Share2 className="w-4 h-4" />
                Procesar
              </button>
            </div>
          </div>

          {/* Información de exportación */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white">Exportación de Datos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Exporta brackets, estadísticas, participantes y más en múltiples formatos
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {EXPORT_OPTIONS.length} formatos disponibles
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  PDF, PNG, CSV, Excel, Calendario
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Progreso</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{exportProgress}%</p>
            </div>
          </div>

          {/* Panel de opciones de exportación */}
          <AnimatePresence>
            {showExportPanel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Opciones de Exportación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {EXPORT_OPTIONS.map((option) => {
                    const OptionIcon = option.icon;
                    const isSelected = selectedExportOptions.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => toggleExportOption(option.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg'
                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-green-300 dark:hover:border-green-500 hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${option.color} flex items-center justify-center`}>
                            <OptionIcon className="w-6 h-6 text-white" />
              </div>
                          <div className="text-center">
                            <h4 className="font-bold text-gray-900 dark:text-white">{option.name}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{option.description}</p>
                          </div>
                          {isSelected && (
                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm font-semibold">Seleccionado</span>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Barra de progreso de exportación */}
          {isExporting && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Exportando archivos...
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{exportProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Previsualización de exportación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Brackets PDF</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Documento completo</p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <Image className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Imágenes PNG</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Brackets visuales</p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Lista Participantes</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">CSV y Excel</p>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              onClick={() => handleExport(EXPORT_OPTIONS[0], '1')}
              className="flex items-center gap-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300"
            >
              <FileText className="w-4 h-4" />
              PDF Rápido
            </button>
            <button
              onClick={() => handleExport(EXPORT_OPTIONS[1], '1')}
              className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300"
            >
              <Image className="w-4 h-4" />
              PNG Rápido
            </button>
            <button
              onClick={() => handleExport(EXPORT_OPTIONS[3], '1')}
              className="flex items-center gap-2 px-3 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-300"
            >
              <Users className="w-4 h-4" />
              CSV Rápido
            </button>
            <button
              onClick={() => handleExport(EXPORT_OPTIONS[5], '1')}
              className="flex items-center gap-2 px-3 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-lg hover:bg-cyan-200 dark:hover:bg-cyan-900/50 transition-all duration-300"
            >
              <CalendarIcon className="w-4 h-4" />
              Calendario
            </button>
          </div>
        </div>
      </motion.section>

      {/* Sistema de Backup y Recuperación */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-8"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Backup y Recuperación</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {backups.length} backups disponibles
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => createBackup('manual', 'Backup manual')}
                disabled={isBackingUp}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {isBackingUp ? 'Guardando...' : 'Crear Backup'}
              </button>
              <button
                onClick={() => setShowBackupPanel(!showBackupPanel)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300"
              >
                <Database className="w-4 h-4" />
                Gestionar
              </button>
            </div>
          </div>

          {/* Información de backup */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white">Protección de Datos</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Auto-guardado cada {backupSettings.autoSaveInterval} minutos • Último backup: {lastAutoSave ? lastAutoSave.toLocaleTimeString() : 'Nunca'}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {backupSettings.autoSave ? 'Auto-guardado activo' : 'Auto-guardado desactivado'}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {changeHistory.length} cambios registrados
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Estado</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {recoveryStatus === 'available' ? 'Disponible' : 
                 recoveryStatus === 'restoring' ? 'Restaurando' : 
                 recoveryStatus === 'completed' ? 'Completado' : 'Error'}
              </p>
            </div>
          </div>

          {/* Panel de gestión de backups */}
          <AnimatePresence>
            {showBackupPanel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Gestión de Backups</h3>
                
                {/* Lista de backups */}
                <div className="space-y-3 mb-6">
                  {backups.map((backup) => (
                    <div
                      key={backup.id}
                      className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          backup.type === 'auto' ? 'bg-blue-100 dark:bg-blue-900/30' :
                          backup.type === 'manual' ? 'bg-green-100 dark:bg-green-900/30' :
                          'bg-purple-100 dark:bg-purple-900/30'
                        }`}>
                          {backup.type === 'auto' ? <RefreshCw className="w-5 h-5 text-blue-600" /> :
                           backup.type === 'manual' ? <Save className="w-5 h-5 text-green-600" /> :
                           <Archive className="w-5 h-5 text-purple-600" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">{backup.description}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {backup.timestamp.toLocaleString()} • {(backup.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          backup.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                          backup.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {backup.status === 'completed' ? 'Completado' :
                           backup.status === 'in-progress' ? 'En progreso' : 'Fallido'}
                        </span>
                        <button
                          onClick={() => restoreBackup(backup.id)}
                          disabled={backup.status !== 'completed' || recoveryStatus === 'restoring'}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <UndoIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteBackup(backup.id)}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Configuración de backup */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Configuración</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Auto-guardado</span>
                      <button
                        onClick={() => updateBackupSettings({ autoSave: !backupSettings.autoSave })}
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          backupSettings.autoSave ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                          backupSettings.autoSave ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Intervalo (min)</span>
                      <select
                        value={backupSettings.autoSaveInterval}
                        onChange={(e) => updateBackupSettings({ autoSaveInterval: parseInt(e.target.value) })}
                        className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                      >
                        <option value={1}>1 minuto</option>
                        <option value={5}>5 minutos</option>
                        <option value={15}>15 minutos</option>
                        <option value={30}>30 minutos</option>
                        <option value={60}>1 hora</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Máx. backups</span>
                      <input
                        type="number"
                        value={backupSettings.maxBackups}
                        onChange={(e) => updateBackupSettings({ maxBackups: parseInt(e.target.value) })}
                        className="w-20 px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                        min="1"
                        max="50"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Compresión</span>
                      <button
                        onClick={() => updateBackupSettings({ compression: !backupSettings.compression })}
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          backupSettings.compression ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                          backupSettings.compression ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Historial de cambios */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                <History className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">Historial de Cambios</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Últimos 10 cambios registrados</p>
              </div>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {changeHistory.slice(0, 10).map((change) => (
                <div
                  key={change.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{change.description}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{change.timestamp.toLocaleString()}</p>
                    </div>
                  </div>
                  {change.canRevert && (
                    <button
                      onClick={() => revertChange(change.id)}
                      className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-all duration-300"
                    >
                      <UndoIcon className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Optimización para Tablets */}
      {mobileState.deviceType === 'tablet' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50 p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Optimización Tablet</h2>
              <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {mobileState.isLandscapeMode ? 'Modo Horizontal' : 'Modo Vertical'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setMobileState(prev => ({ ...prev, isLandscapeMode: !prev.isLandscapeMode }))}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  {mobileState.isLandscapeMode ? 'Vertical' : 'Horizontal'}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all duration-300"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Layout adaptativo para tablet */}
            <div className={`grid gap-6 ${
              mobileState.isLandscapeMode 
                ? 'grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {/* Panel izquierdo - Dashboard */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Dashboard</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Estadísticas en tiempo real</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Torneos</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                    <p className="text-xs text-green-600">+2 esta semana</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Equipos</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">64</p>
                    <p className="text-xs text-blue-600">+12 nuevos</p>
                  </div>
                </div>
              </div>

              {/* Panel derecho - Acciones rápidas */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">Acciones Rápidas</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Herramientas principales</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300">
                    <Download className="w-5 h-5 text-green-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Exportar</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300">
                    <Palette className="w-5 h-5 text-purple-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Temas</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300">
                    <Bell className="w-5 h-5 text-orange-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Notificaciones</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300">
                    <Shield className="w-5 h-5 text-red-500" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Permisos</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Indicadores de optimización */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">Responsive</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Layout adaptativo para tablet
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                    <RotateCcw className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">Orientación</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Optimizado para horizontal
                </p>
              </div>

              <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Tablet className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">Tablet</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Experiencia optimizada
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Sistema de Roles y Permisos */}
      <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Sistema de Roles y Permisos</h2>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getRoleColor(currentUser.role)}`}></div>
                <span className="text-sm text-gray-600">
                  {getRoleName(currentUser.role)}
                </span>
                </div>
              </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowRoleSelector(!showRoleSelector)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-all duration-300"
              >
                <Shield className="w-4 h-4" />
                Cambiar Rol
              </button>
              <button
                onClick={() => setShowPermissions(!showPermissions)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-300"
              >
                <Lock className="w-4 h-4" />
                Ver Permisos
              </button>
            </div>
          </div>

          {/* Información del usuario actual */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl mb-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{currentUser.name}</h3>
              <p className="text-sm text-gray-600">{currentUser.email}</p>
              <div className="flex items-center gap-2 mt-1">
                {React.createElement(getRoleIcon(currentUser.role), { className: "w-4 h-4 text-gray-600" })}
                <span className="text-sm font-semibold text-gray-700">{getRoleName(currentUser.role)}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Permisos activos</p>
              <p className="text-2xl font-bold text-purple-600">{currentUser.permissions.length}</p>
            </div>
          </div>

          {/* Selector de roles */}
          <AnimatePresence>
            {showRoleSelector && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Seleccionar Rol</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(['admin', 'organizer', 'participant', 'spectator'] as UserRole[]).map((role) => {
                    const RoleIcon = getRoleIcon(role);
                    const isCurrentRole = currentUser.role === role;
                    return (
                      <button
                        key={role}
                        onClick={() => switchRole(role)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          isCurrentRole
                            ? 'border-purple-500 bg-purple-50 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getRoleColor(role)} flex items-center justify-center`}>
                            <RoleIcon className="w-6 h-6 text-white" />
              </div>
                          <div className="text-center">
                            <h4 className="font-bold text-gray-900">{getRoleName(role)}</h4>
                            <p className="text-xs text-gray-600">
                              {ROLE_PERMISSIONS[role].length} permisos
                            </p>
                          </div>
                          {isCurrentRole && (
                            <div className="flex items-center gap-1 text-purple-600">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm font-semibold">Activo</span>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
            </div>
          </motion.div>
            )}
          </AnimatePresence>

          {/* Panel de permisos */}
          <AnimatePresence>
            {showPermissions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Permisos del Usuario</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PERMISSIONS.map((permission) => {
                    const hasAccess = hasPermission(permission.id);
                    return (
                      <div
                        key={permission.id}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          hasAccess
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          {hasAccess ? (
                            <Unlock className="w-5 h-5 text-green-600" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-400" />
                          )}
                          <h4 className="font-semibold text-gray-900">{permission.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{permission.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{permission.category}</span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            hasAccess
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {hasAccess ? 'Permitido' : 'Denegado'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicadores de permisos en tiempo real */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className={`p-4 rounded-xl border-2 ${
              canEdit() ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {canEdit() ? <Unlock className="w-5 h-5 text-green-600" /> : <Lock className="w-5 h-5 text-gray-400" />}
                <span className="font-semibold text-gray-900">Edición</span>
              </div>
              <p className="text-sm text-gray-600">
                {canEdit() ? 'Puede crear y editar torneos' : 'Solo lectura'}
              </p>
            </div>

            <div className={`p-4 rounded-xl border-2 ${
              canDelete() ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {canDelete() ? <Unlock className="w-5 h-5 text-red-600" /> : <Lock className="w-5 h-5 text-gray-400" />}
                <span className="font-semibold text-gray-900">Eliminación</span>
              </div>
              <p className="text-sm text-gray-600">
                {canDelete() ? 'Puede eliminar torneos' : 'No puede eliminar'}
              </p>
            </div>

            <div className={`p-4 rounded-xl border-2 ${
              canViewAnalytics() ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {canViewAnalytics() ? <Unlock className="w-5 h-5 text-blue-600" /> : <Lock className="w-5 h-5 text-gray-400" />}
                <span className="font-semibold text-gray-900">Analytics</span>
              </div>
              <p className="text-sm text-gray-600">
                {canViewAnalytics() ? 'Puede ver estadísticas' : 'Sin acceso a analytics'}
              </p>
            </div>

            <div className={`p-4 rounded-xl border-2 ${
              canManageUsers() ? 'border-purple-200 bg-purple-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {canManageUsers() ? <Unlock className="w-5 h-5 text-purple-600" /> : <Lock className="w-5 h-5 text-gray-400" />}
                <span className="font-semibold text-gray-900">Usuarios</span>
              </div>
              <p className="text-sm text-gray-600">
                {canManageUsers() ? 'Puede gestionar usuarios' : 'Sin gestión de usuarios'}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Sistema de Notificaciones */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Notificaciones en Tiempo Real</h2>
              <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? 'Conectado' : 'Desconectado'}
              </span>
                </div>
              </div>
          <div className="flex gap-2">
            <button
              onClick={requestNotificationPermission}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-300"
            >
              <BellRing className="w-4 h-4" />
              Activar Push
            </button>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex items-center gap-2 px-4 py-2 bg-white/80 text-gray-700 rounded-xl hover:bg-purple-100 transition-all duration-300"
            >
              <Bell className="w-4 h-4" />
              Notificaciones
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                  {unreadCount}
                </span>
              )}
              {isConnected && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </button>
          </div>
        </div>

        {/* Panel de Notificaciones en Tiempo Real */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    Notificaciones en Tiempo Real
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-sm text-gray-600">
                      {isConnected ? 'Conectado' : 'Desconectado'}
                    </span>
                  </div>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowNotificationSettings(true)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Configuración de notificaciones"
                  >
                    <Settings className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={sendTestNotification}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    title="Enviar notificación de prueba"
                  >
                    <BellRing className="w-4 h-4 text-gray-600" />
                  </button>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-purple-600 hover:text-purple-800 font-medium"
                    >
                      Marcar todas como leídas
                    </button>
                  )}
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Filtros de notificaciones */}
              <div className="flex gap-2 mb-4">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                  <option value="all">Todas</option>
                  <option value="unread">No leídas</option>
                  <option value="tournament">Torneos</option>
                  <option value="match">Partidos</option>
                  <option value="result">Resultados</option>
                  <option value="system">Sistema</option>
                </select>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                  <option value="all">Todas las prioridades</option>
                  <option value="urgent">Urgente</option>
                  <option value="high">Alta</option>
                  <option value="medium">Media</option>
                  <option value="low">Baja</option>
                </select>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No hay notificaciones</p>
                    <button
                      onClick={sendTestNotification}
                      className="mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium"
                    >
                      Enviar notificación de prueba
                    </button>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        notification.status === 'unread' 
                          ? 'bg-blue-50 border-blue-200 shadow-sm' 
                          : 'bg-gray-50 border-gray-200'
                      } ${
                        notification.priority === 'urgent' 
                          ? 'border-red-300 bg-red-50' 
                          : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`w-3 h-3 rounded-full mt-2 ${
                            notification.type === 'tournament' ? 'bg-blue-500' :
                            notification.type === 'match' ? 'bg-green-500' :
                            notification.type === 'result' ? 'bg-purple-500' :
                            notification.type === 'system' ? 'bg-red-500' :
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            notification.type === 'error' ? 'bg-red-500' :
                            'bg-gray-500'
                          }`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900 text-sm">
                                {notification.title}
                              </h4>
                              {notification.priority === 'urgent' && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                  URGENTE
                                </span>
                              )}
                              {notification.priority === 'high' && (
                                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                                  ALTA
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{notification.timestamp.toLocaleTimeString()}</span>
                              {notification.tournamentId && (
                                <span>Torneo: {notification.tournamentId}</span>
                              )}
                              {notification.matchId && (
                                <span>Partido: {notification.matchId}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {notification.status === 'unread' && (
                            <button
                              onClick={() => markNotificationAsRead(notification.id)}
                              className="p-1 hover:bg-blue-100 rounded-full transition-colors"
                              title="Marcar como leída"
                            >
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 hover:bg-red-100 rounded-full transition-colors"
                            title="Eliminar"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Panel de Configuración de Notificaciones */}
        <AnimatePresence>
          {showNotificationSettings && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">
                  Configuración de Notificaciones
                </h3>
                <button
                  onClick={() => setShowNotificationSettings(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Configuración de canales */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Canales de Notificación</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Notificaciones en la aplicación</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.inApp}
                        onChange={(e) => updateNotificationSettings({ inApp: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Notificaciones push del navegador</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={notificationSettings.push}
                          onChange={(e) => updateNotificationSettings({ push: e.target.checked })}
                          className="w-4 h-4 text-purple-600 rounded"
                        />
                        {!isNotificationPermissionGranted && (
                          <button
                            onClick={requestNotificationPermission}
                            className="text-xs text-purple-600 hover:text-purple-800 font-medium"
                          >
                            Solicitar permisos
                          </button>
                        )}
                      </div>
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Notificaciones por email</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.email}
                        onChange={(e) => updateNotificationSettings({ email: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                    </label>
                  </div>
                </div>

                {/* Configuración de tipos */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Tipos de Notificación</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Actualizaciones de torneos</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.tournamentUpdates}
                        onChange={(e) => updateNotificationSettings({ tournamentUpdates: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Resultados de partidos</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.matchResults}
                        onChange={(e) => updateNotificationSettings({ matchResults: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Alertas del sistema</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.systemAlerts}
                        onChange={(e) => updateNotificationSettings({ systemAlerts: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Marketing y promociones</span>
                      <input
                        type="checkbox"
                        checked={notificationSettings.marketing}
                        onChange={(e) => updateNotificationSettings({ marketing: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                    </label>
                  </div>
                </div>

                {/* Configuración de frecuencia */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Frecuencia</h4>
                  <select
                    value={notificationSettings.frequency}
                    onChange={(e) => updateNotificationSettings({ frequency: e.target.value as any })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="immediate">Inmediata</option>
                    <option value="hourly">Cada hora</option>
                    <option value="daily">Diaria</option>
                    <option value="weekly">Semanal</option>
                  </select>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={sendTestNotification}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Enviar Prueba
                  </button>
                  <button
                    onClick={clearAllNotifications}
                    className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Limpiar Todas
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Panel de Backup y Recuperación de Datos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.02, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Sistema de Backup y Recuperación</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowBackupPanel(!showBackupPanel)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                {showBackupPanel ? 'Ocultar Backup' : 'Gestionar Backup'}
              </button>
              <button
                onClick={() => setShowBackupHistory(!showBackupHistory)}
                className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                Historial
              </button>
            </div>
          </div>

          {/* Información de Backup */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900 text-sm">Backups</p>
                  <p className="text-blue-700 text-xs">{backups.length} total</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-900 text-sm">Completados</p>
                  <p className="text-green-700 text-xs">{backups.filter(b => b.status === 'completed').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-orange-900 text-sm">En Proceso</p>
                  <p className="text-orange-700 text-xs">{backups.filter(b => b.status === 'in_progress').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <History className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-purple-900 text-sm">Historial</p>
                  <p className="text-purple-700 text-xs">{backupHistory.length} acciones</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controles de Backup Rápido */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Backup Rápido</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => createBackup('manual')}
                disabled={isBackingUp}
                className="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Database className="w-4 h-4 inline mr-2" />
                Backup Manual
              </button>
              
              <button
                onClick={() => createBackup('auto')}
                disabled={isBackingUp}
                className="px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className="w-4 h-4 inline mr-2" />
                Auto Backup
              </button>
              
              <button
                onClick={() => scheduleBackup(backupSettings.backupFrequency)}
                className="px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Programar
              </button>
              
              <button
                onClick={() => setShowRestoreOptions(!showRestoreOptions)}
                className="px-4 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4 inline mr-2" />
                Restaurar
              </button>
            </div>
          </div>

          {/* Progreso de Backup */}
          {isBackingUp && (
            <div className="mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Creando backup...</span>
                  <span className="text-sm text-gray-500">{backupProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${backupProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Progreso de Restauración */}
          {isRestoring && (
            <div className="mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Restaurando datos...</span>
                  <span className="text-sm text-gray-500">{restoreProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${restoreProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Panel de Gestión de Backup */}
          <AnimatePresence>
            {showBackupPanel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 pt-6"
              >
                <h4 className="font-semibold text-gray-900 mb-4">Gestión de Backups</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lista de Backups */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Backups Disponibles</h5>
                    <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
                      {backups.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No hay backups disponibles</p>
                      ) : (
                        <div className="space-y-2">
                          {backups.map((backup) => (
                            <div key={backup.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${
                                  backup.status === 'completed' ? 'bg-green-500' :
                                  backup.status === 'in_progress' ? 'bg-blue-500' :
                                  backup.status === 'failed' ? 'bg-red-500' :
                                  'bg-gray-500'
                                }`} />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{backup.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {backup.createdAt.toLocaleDateString()} • {backup.size} bytes
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => setSelectedBackup(backup)}
                                  className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                                >
                                  Restaurar
                                </button>
                                <button
                                  onClick={() => exportBackup(backup)}
                                  className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                                >
                                  Exportar
                                </button>
                                <button
                                  onClick={() => deleteBackup(backup.id)}
                                  className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Configuración de Backup */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Configuración</h5>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={backupSettings.autoBackup}
                            onChange={(e) => updateBackupSettings({ autoBackup: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Backup automático</span>
                        </label>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Frecuencia</label>
                        <select
                          value={backupSettings.backupFrequency}
                          onChange={(e) => updateBackupSettings({ backupFrequency: e.target.value as any })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="hourly">Cada hora</option>
                          <option value="daily">Diario</option>
                          <option value="weekly">Semanal</option>
                          <option value="monthly">Mensual</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Máximo de backups</label>
                        <input
                          type="number"
                          value={backupSettings.maxBackups}
                          onChange={(e) => updateBackupSettings({ maxBackups: parseInt(e.target.value) })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                          min="1"
                          max="50"
                        />
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={backupSettings.notifyOnBackup}
                            onChange={(e) => updateBackupSettings({ notifyOnBackup: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Notificar en backup</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Historial de Backup */}
          <AnimatePresence>
            {showBackupHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 pt-6"
              >
                <h4 className="font-semibold text-gray-900 mb-4">Historial de Backup</h4>
                <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
                  {backupHistory.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No hay historial de backup</p>
                  ) : (
                    <div className="space-y-2">
                      {backupHistory.map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              entry.success ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                            <div>
                              <p className="text-sm font-medium text-gray-900 capitalize">{entry.action}</p>
                              <p className="text-xs text-gray-500">{entry.details}</p>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {entry.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Panel de Optimización Mobile-First */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Optimización Mobile-First</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMobileMenu}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                {isMobileMenuOpen ? 'Cerrar Menú' : 'Menú Móvil'}
              </button>
              <button
                onClick={toggleMobileViewMode}
                className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                {mobileViewMode === 'grid' ? 'Vista Lista' : 'Vista Grid'}
              </button>
            </div>
          </div>

          {/* Información del Dispositivo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900 text-sm">Dispositivo</p>
                  <p className="text-blue-700 text-xs capitalize">{mobileState.deviceType}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-900 text-sm">Orientación</p>
                  <p className="text-green-700 text-xs capitalize">{mobileState.orientation}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-purple-900 text-sm">Conectividad</p>
                  <p className="text-purple-700 text-xs">{mobileState.isOnline ? 'En línea' : 'Sin conexión'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Touchpad className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-orange-900 text-sm">Touch</p>
                  <p className="text-orange-700 text-xs">{mobileState.isTouchDevice ? 'Soportado' : 'No soportado'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navegación Móvil */}
          {isMobileOptimized() && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Navegación Móvil</h4>
              <div className="flex overflow-x-auto gap-2 pb-2">
                {mobileNavigation.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => switchMobileTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                      mobileNavigation.activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    disabled={tab.disabled}
                  >
                    {tab.icon === 'Trophy' && <Trophy className="w-4 h-4" />}
                    {tab.icon === 'Gamepad2' && <Gamepad2 className="w-4 h-4" />}
                    {tab.icon === 'Users' && <Users className="w-4 h-4" />}
                    {tab.icon === 'BarChart3' && <BarChart3 className="w-4 h-4" />}
                    {tab.icon === 'Settings' && <Settings className="w-4 h-4" />}
                    <span>{tab.label}</span>
                    {tab.badge && tab.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Controles Móviles */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Controles Móviles</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={toggleMobileFilters}
                className="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                <Filter className="w-4 h-4 inline mr-2" />
                Filtros
              </button>
              
              <button
                onClick={toggleMobileViewMode}
                className="px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                {mobileViewMode === 'grid' ? <Grid3X3 className="w-4 h-4 inline mr-2" /> : <List className="w-4 h-4 inline mr-2" />}
                {mobileViewMode === 'grid' ? 'Grid' : 'Lista'}
              </button>
              
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                <Search className="w-4 h-4 inline mr-2" />
                Búsqueda
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="px-4 py-3 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors"
              >
                <Menu className="w-4 h-4 inline mr-2" />
                Menú
              </button>
            </div>
          </div>

          {/* Optimizaciones Landscape */}
          {isLandscapeOptimized && (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-900 text-sm">Modo Landscape Optimizado</p>
                    <p className="text-yellow-700 text-xs">Interfaz adaptada para orientación horizontal</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Información Técnica */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h5 className="font-medium text-gray-900 mb-2">Resolución</h5>
              <p className="text-sm text-gray-600">
                {mobileState.screenWidth} × {mobileState.screenHeight}px
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h5 className="font-medium text-gray-900 mb-2">Tipo de Conexión</h5>
              <p className="text-sm text-gray-600">
                {mobileState.connectionType || 'Desconocido'}
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h5 className="font-medium text-gray-900 mb-2">Batería</h5>
              <p className="text-sm text-gray-600">
                {mobileState.batteryLevel ? `${mobileState.batteryLevel}%` : 'No disponible'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Panel de Exportación y Reportes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Sistema de Exportación y Reportes</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowExportPanel(!showExportPanel)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                {showExportPanel ? 'Ocultar Exportación' : 'Gestionar Exportación'}
              </button>
              <button
                onClick={() => setShowExportHistory(!showExportHistory)}
                className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                Historial
              </button>
            </div>
          </div>

          {/* Información de Exportación */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900 text-sm">Exportaciones</p>
                  <p className="text-blue-700 text-xs">{exportJobs.length} total</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-900 text-sm">Completadas</p>
                  <p className="text-green-700 text-xs">{exportJobs.filter(j => j.status === 'completed').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-orange-900 text-sm">En Proceso</p>
                  <p className="text-orange-700 text-xs">{exportJobs.filter(j => j.status === 'processing').length}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-purple-900 text-sm">Plantillas</p>
                  <p className="text-purple-700 text-xs">{exportTemplates.length} disponibles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controles de Exportación Rápida */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Exportación Rápida</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => exportBracket('pdf')}
                disabled={isExporting}
                className="px-4 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Bracket PDF
              </button>
              
              <button
                onClick={() => exportParticipants('csv')}
                disabled={isExporting}
                className="px-4 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Users className="w-4 h-4 inline mr-2" />
                Participantes CSV
              </button>
              
              <button
                onClick={() => exportStatistics('xlsx')}
                disabled={isExporting}
                className="px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Estadísticas Excel
              </button>
              
              <button
                onClick={exportCalendar}
                className="px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Calendario ICS
              </button>
            </div>
          </div>

          {/* Progreso de Exportación */}
          {isExporting && (
            <div className="mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Exportando...</span>
                  <span className="text-sm text-gray-500">{exportProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Panel de Exportación Avanzada */}
          <AnimatePresence>
            {showExportPanel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 pt-6"
              >
                <h4 className="font-semibold text-gray-900 mb-4">Exportación Avanzada</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Configuración de Exportación */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Configuración</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Tipo de Exportación</label>
                        <select
                          value={selectedExportType}
                          onChange={(e) => setSelectedExportType(e.target.value as ExportType)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="bracket">Bracket</option>
                          <option value="participants">Participantes</option>
                          <option value="statistics">Estadísticas</option>
                          <option value="calendar">Calendario</option>
                          <option value="report">Reporte Completo</option>
                          <option value="all">Todo</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Formato</label>
                        <select
                          value={selectedExportFormat}
                          onChange={(e) => setSelectedExportFormat(e.target.value as ExportFormat)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value="pdf">PDF</option>
                          <option value="png">PNG</option>
                          <option value="jpg">JPG</option>
                          <option value="csv">CSV</option>
                          <option value="xlsx">Excel</option>
                          <option value="json">JSON</option>
                          <option value="ics">Calendario</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={exportSettings.includeImages}
                            onChange={(e) => updateExportSettings({ includeImages: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Incluir imágenes</span>
                        </label>
                      </div>
                      
                      <button
                        onClick={() => startExport(selectedExportType, selectedExportFormat)}
                        disabled={isExporting}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {isExporting ? 'Exportando...' : 'Iniciar Exportación'}
                      </button>
                    </div>
                  </div>

                  {/* Plantillas de Exportación */}
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Plantillas Disponibles</h5>
                    <div className="space-y-2">
                      {exportTemplates.map((template) => (
                        <div key={template.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <div>
                            <p className="font-medium text-sm text-gray-900">{template.name}</p>
                            <p className="text-xs text-gray-500">{template.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                              {template.format.toUpperCase()}
                            </span>
                            <button
                              onClick={() => startExport(template.type, template.format)}
                              className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                            >
                              Usar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Historial de Exportaciones */}
          <AnimatePresence>
            {showExportHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 pt-6"
              >
                <h4 className="font-semibold text-gray-900 mb-4">Historial de Exportaciones</h4>
                <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
                  {exportJobs.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No hay exportaciones realizadas</p>
                  ) : (
                    <div className="space-y-2">
                      {exportJobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              job.status === 'completed' ? 'bg-green-500' :
                              job.status === 'processing' ? 'bg-blue-500' :
                              job.status === 'failed' ? 'bg-red-500' :
                              'bg-gray-500'
                            }`} />
                            <div>
                              <p className="text-sm font-medium text-gray-900 capitalize">{job.type}</p>
                              <p className="text-xs text-gray-500">{job.format.toUpperCase()} • {job.createdAt.toLocaleTimeString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {job.status === 'completed' && job.downloadUrl && (
                              <button
                                onClick={() => downloadExport(job)}
                                className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                              >
                                Descargar
                              </button>
                            )}
                            {job.status === 'processing' && (
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${job.progress}%` }}
                                />
                              </div>
                            )}
                            <button
                              onClick={() => deleteExportJob(job.id)}
                              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Panel de Gestión de Temas y Modo Oscuro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Sistema de Temas y Modo Oscuro</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowThemeSelector(!showThemeSelector)}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                {showThemeSelector ? 'Ocultar Temas' : 'Gestionar Temas'}
              </button>
              <button
                onClick={() => setShowCustomThemeEditor(!showCustomThemeEditor)}
                className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
              >
                Crear Tema
              </button>
            </div>
          </div>

          {/* Información del Tema Actual */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-purple-900 text-sm">Tema Actual</p>
                  <p className="text-purple-700 text-xs">{getCurrentTheme().name}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Moon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900 text-sm">Modo</p>
                  <p className="text-blue-700 text-xs capitalize">{themeMode}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Sun className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-900 text-sm">Estado</p>
                  <p className="text-green-700 text-xs">{isDarkMode ? 'Oscuro' : 'Claro'}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-orange-900 text-sm">Temas</p>
                  <p className="text-orange-700 text-xs">{availableThemes.length} disponibles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controles de Modo */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Controles de Modo</h4>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-yellow-500 text-white'
                }`}
              >
                {isDarkMode ? <Moon className="w-4 h-4 inline mr-2" /> : <Sun className="w-4 h-4 inline mr-2" />}
                {isDarkMode ? 'Modo Oscuro' : 'Modo Claro'}
              </button>
              
              <button
                onClick={setAutoTheme}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  themeMode === 'auto' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-600 text-white'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Automático
              </button>
            </div>
          </div>

          {/* Selector de Temas */}
          <AnimatePresence>
            {showThemeSelector && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 pt-6"
              >
                <h4 className="font-semibold text-gray-900 mb-4">Temas Disponibles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableThemes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        currentTheme === theme.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => changeTheme(theme.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-gray-900">{theme.name}</h5>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: theme.colors.secondary }}
                          />
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: theme.colors.accent }}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Tipo:</span>
                          <span className="text-sm font-medium capitalize">{theme.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Modo:</span>
                          <span className="text-sm font-medium capitalize">{theme.mode}</span>
                        </div>
                        {theme.type === 'custom' && (
                          <div className="flex items-center gap-2 mt-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                exportTheme(theme);
                              }}
                              className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                            >
                              Exportar
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteCustomTheme(theme.id);
                              }}
                              className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Editor de Temas Personalizados */}
          <AnimatePresence>
            {showCustomThemeEditor && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 pt-6"
              >
                <h4 className="font-semibold text-gray-900 mb-4">Crear Tema Personalizado</h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Tema</label>
                      <input
                        type="text"
                        value={customTheme?.name || ''}
                        onChange={(e) => setCustomTheme(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="Mi Tema Personalizado"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Modo</label>
                      <select
                        value={customTheme?.mode || 'light'}
                        onChange={(e) => setCustomTheme(prev => ({ ...prev, mode: e.target.value as ThemeMode }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="light">Claro</option>
                        <option value="dark">Oscuro</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-900 mb-3">Colores</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(customTheme?.colors || {}).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-xs text-gray-600 mb-1 capitalize">{key}</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={value}
                              onChange={(e) => setCustomTheme(prev => ({
                                ...prev,
                                colors: { ...prev?.colors, [key]: e.target.value }
                              }))}
                              className="w-8 h-8 rounded border border-gray-300"
                            />
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => setCustomTheme(prev => ({
                                ...prev,
                                colors: { ...prev?.colors, [key]: e.target.value }
                              }))}
                              className="flex-1 text-xs border border-gray-300 rounded px-2 py-1"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (customTheme) {
                          createCustomTheme(customTheme);
                          setCustomTheme(null);
                          setShowCustomThemeEditor(false);
                        }
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Crear Tema
                    </button>
                    <button
                      onClick={() => setShowCustomThemeEditor(false)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Panel de Gestión de Roles y Permisos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Sistema de Roles y Permisos</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRoleManagement(!showRoleManagement)}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                {showRoleManagement ? 'Ocultar Gestión' : 'Gestionar Roles'}
              </button>
              <button
                onClick={() => setShowPermissionAudit(!showPermissionAudit)}
                className="px-4 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
              >
                Auditoría
              </button>
            </div>
          </div>

          {/* Información del Usuario Actual */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900 text-sm">Usuario Actual</p>
                  <p className="text-blue-700 text-xs">{currentUser.name}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-900 text-sm">Rol</p>
                  <p className="text-green-700 text-xs capitalize">{currentUser.role}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-purple-900 text-sm">Permisos</p>
                  <p className="text-purple-700 text-xs">{currentUser.permissions.length} activos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Selector de Rol */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Cambiar Rol</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {rolePermissions.map((roleConfig) => (
                <button
                  key={roleConfig.role}
                  onClick={() => changeUserRole(roleConfig.role)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    currentUser.role === roleConfig.role
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      roleConfig.color === 'red' ? 'bg-red-500' :
                      roleConfig.color === 'blue' ? 'bg-blue-500' :
                      roleConfig.color === 'green' ? 'bg-green-500' :
                      'bg-gray-500'
                    }`}>
                      {roleConfig.icon === 'Shield' ? <Shield className="w-4 h-4 text-white" /> :
                       roleConfig.icon === 'Trophy' ? <Trophy className="w-4 h-4 text-white" /> :
                       roleConfig.icon === 'User' ? <User className="w-4 h-4 text-white" /> :
                       <Eye className="w-4 h-4 text-white" />}
                    </div>
                    <p className="font-medium text-sm capitalize">{roleConfig.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{roleConfig.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Panel de Gestión de Roles */}
          <AnimatePresence>
            {showRoleManagement && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 pt-6"
              >
                <h4 className="font-semibold text-gray-900 mb-4">Gestión de Permisos por Rol</h4>
                <div className="space-y-4">
                  {rolePermissions.map((roleConfig) => (
                    <div key={roleConfig.role} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-gray-900 capitalize">{roleConfig.role}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          roleConfig.color === 'red' ? 'bg-red-100 text-red-700' :
                          roleConfig.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                          roleConfig.color === 'green' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {roleConfig.permissions.length} permisos
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{roleConfig.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {permissionGroups.map((group) => {
                          const groupPermissions = group.permissions.filter(p => 
                            roleConfig.permissions.includes(p)
                          );
                          return (
                            <div key={group.name} className="bg-white rounded-lg p-2">
                              <p className="text-xs font-medium text-gray-700">{group.name}</p>
                              <p className="text-xs text-gray-500">{groupPermissions.length}/{group.permissions.length}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Panel de Auditoría de Permisos */}
          <AnimatePresence>
            {showPermissionAudit && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 pt-6"
              >
                <h4 className="font-semibold text-gray-900 mb-4">Auditoría de Permisos</h4>
                <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
                  {permissionAudit.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No hay registros de auditoría</p>
                  ) : (
                    <div className="space-y-2">
                      {permissionAudit.map((audit) => (
                        <div key={audit.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              audit.success ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{audit.action}</p>
                              <p className="text-xs text-gray-500">{audit.resource}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{audit.timestamp.toLocaleTimeString()}</p>
                            {audit.reason && (
                              <p className="text-xs text-red-500">{audit.reason}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Panel de Control de Rendimiento */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Optimización de Rendimiento</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={togglePerformanceMode}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isPerformanceMode 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-600 text-white'
                }`}
              >
                {isPerformanceMode ? 'Modo Optimizado' : 'Activar Optimizaciones'}
              </button>
              <button
                onClick={clearMemoizationCache}
                className="px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Limpiar Cache
              </button>
            </div>
          </div>

          {/* Métricas de Rendimiento */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900 text-sm">Renderizados</p>
                  <p className="text-blue-700 text-xs">{performanceMetrics.renderCount} total</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-green-900 text-sm">Tiempo Promedio</p>
                  <p className="text-green-700 text-xs">{performanceMetrics.averageRenderTime.toFixed(2)}ms</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-purple-900 text-sm">Memoria</p>
                  <p className="text-purple-700 text-xs">{(performanceMetrics.memoryUsage / 1024 / 1024).toFixed(1)}MB</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-orange-900 text-sm">Tamaño</p>
                  <p className="text-orange-700 text-xs">{performanceMetrics.componentSize}px</p>
                </div>
              </div>
            </div>
          </div>

          {/* Configuración de Optimizaciones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Optimizaciones Activas</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">React.memo() habilitado</span>
                  <input
                    type="checkbox"
                    checked={renderOptimizations.memoEnabled}
                    onChange={(e) => setRenderOptimizations(prev => ({ ...prev, memoEnabled: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Virtualización de listas</span>
                  <input
                    type="checkbox"
                    checked={renderOptimizations.virtualScrolling}
                    onChange={(e) => setRenderOptimizations(prev => ({ ...prev, virtualScrolling: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Lazy loading avanzado</span>
                  <input
                    type="checkbox"
                    checked={renderOptimizations.lazyLoading}
                    onChange={(e) => setRenderOptimizations(prev => ({ ...prev, lazyLoading: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Debouncing de búsquedas</span>
                  <input
                    type="checkbox"
                    checked={renderOptimizations.debouncing}
                    onChange={(e) => setRenderOptimizations(prev => ({ ...prev, debouncing: e.target.checked }))}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                </label>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Configuración de Memoización</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Tamaño máximo del cache</label>
                  <input
                    type="number"
                    value={memoizationConfig.maxCacheSize}
                    onChange={(e) => setMemoizationConfig(prev => ({ ...prev, maxCacheSize: parseInt(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    min="10"
                    max="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">TTL (Time to Live)</label>
                  <select
                    value={memoizationConfig.ttl}
                    onChange={(e) => setMemoizationConfig(prev => ({ ...prev, ttl: parseInt(e.target.value) }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value={60000}>1 minuto</option>
                    <option value={300000}>5 minutos</option>
                    <option value={600000}>10 minutos</option>
                    <option value={1800000}>30 minutos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Estrategia de memoización</label>
                  <select
                    value={memoizationConfig.strategy}
                    onChange={(e) => setMemoizationConfig(prev => ({ ...prev, strategy: e.target.value as any }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="conservative">Conservadora</option>
                    <option value="balanced">Balanceada</option>
                    <option value="aggressive">Agresiva</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alertas en tiempo real */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <PlayCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-blue-900 text-sm">Partidos en Vivo</p>
                <p className="text-blue-700 text-xs">3 partidos activos</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <TrophyIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-green-900 text-sm">Resultados</p>
                <p className="text-green-700 text-xs">2 partidos finalizados</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-purple-900 text-sm">Próximos</p>
                <p className="text-purple-700 text-xs">4 partidos programados</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Dashboard Interactivo con Widgets Personalizables */}
      {canViewAnalytics() && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          {/* Controles del Dashboard Interactivo */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Interactivo</h2>
                <p className="text-sm text-gray-600">Personaliza tu dashboard con widgets arrastrables</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isEditMode 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  {isEditMode ? 'Finalizar Edición' : 'Personalizar'}
                </button>
                
                <button
                  onClick={() => setShowWidgetLibrary(!showWidgetLibrary)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-300"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Widget
                </button>
                
                <button
                  onClick={() => {
                    const name = prompt('Nombre del layout:');
                    const description = prompt('Descripción (opcional):');
                    if (name) {
                      saveDashboardLayout(name, description || '');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all duration-300"
                >
                  <Save className="w-4 h-4" />
                  Guardar Layout
                </button>
              </div>
            </div>

            {/* Selector de Layouts */}
            {dashboardLayouts.length > 0 && (
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Layout:</label>
                <select
                  value={currentLayout}
                  onChange={(e) => loadDashboardLayout(e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="default">Layout por Defecto</option>
                  {dashboardLayouts.map((layout) => (
                    <option key={layout.id} value={layout.id}>
                      {layout.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Biblioteca de Widgets */}
          {showWidgetLibrary && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Biblioteca de Widgets</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { type: 'stat', title: 'Estadística', icon: BarChart3, description: 'Métrica numérica con tendencia' },
                  { type: 'chart', title: 'Gráfico', icon: TrendingUp, description: 'Visualización de datos' },
                  { type: 'metric', title: 'Métrica', icon: Award, description: 'Valor con indicador visual' },
                  { type: 'table', title: 'Tabla', icon: Database, description: 'Lista de datos estructurados' }
                ].map((widgetType) => (
                  <button
                    key={widgetType.type}
                    onClick={() => {
                      const newWidget = createWidget(widgetType.type as WidgetType, {
                        title: widgetType.title,
                        description: widgetType.description
                      });
                      addWidget(newWidget);
                      setShowWidgetLibrary(false);
                    }}
                    className="p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 text-left"
                  >
                    <widgetType.icon className="w-8 h-8 text-purple-600 mb-2" />
                    <h4 className="font-medium text-gray-900">{widgetType.title}</h4>
                    <p className="text-sm text-gray-500">{widgetType.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Grid de Widgets Personalizables */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {widgets.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay widgets</h3>
                <p className="text-gray-500 mb-4">Agrega widgets para personalizar tu dashboard</p>
                <button
                  onClick={() => setShowWidgetLibrary(true)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  Agregar Primer Widget
                </button>
              </div>
            ) : (
              widgets.map((widget) => {
                const metric = dashboardMetrics[widget.id];
                const widgetChartData = chartData[widget.id];
                
                return (
                  <motion.div
                    key={widget.id}
                    layout
                    className={`${
                      widget.size === 'small' ? 'col-span-1' :
                      widget.size === 'medium' ? 'col-span-1 md:col-span-2' :
                      widget.size === 'large' ? 'col-span-1 md:col-span-2 lg:col-span-3' :
                      'col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4'
                    } ${isEditMode ? 'ring-2 ring-purple-500' : ''}`}
                    drag={isEditMode}
                    onDragStart={() => setDraggedWidget(widget.id)}
                    onDragEnd={() => setDraggedWidget(null)}
                  >
                    <div className="relative group">
                      {isEditMode && (
                        <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => resizeWidget(widget.id, 
                              widget.size === 'small' ? 'medium' :
                              widget.size === 'medium' ? 'large' :
                              widget.size === 'large' ? 'xlarge' : 'small'
                            )}
                            className="p-1 bg-white rounded shadow-md hover:bg-gray-50 transition-colors"
                          >
                            <Maximize2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => toggleWidgetVisibility(widget.id)}
                            className="p-1 bg-white rounded shadow-md hover:bg-gray-50 transition-colors"
                          >
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => removeWidget(widget.id)}
                            className="p-1 bg-white rounded shadow-md hover:bg-red-50 transition-colors"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      )}
                      
                      {widget.type === 'stat' && metric && (
                        <StatWidget 
                          widget={widget} 
                          metric={metric} 
                          onRefresh={() => refreshWidget(widget.id)} 
                        />
                      )}
                      
                      {widget.type === 'chart' && chartData && (
                        <ChartWidget 
                          widget={widget} 
                          chartData={chartData} 
                          onRefresh={() => refreshWidget(widget.id)} 
                        />
                      )}
                      
                      {widget.type === 'metric' && metric && (
                        <MetricWidget 
                          widget={widget} 
                          metric={metric} 
                          onRefresh={() => refreshWidget(widget.id)} 
                        />
                      )}
                      
                      {widget.type === 'table' && (
                        <TableWidget 
                          widget={widget} 
                          data={filteredTournaments} 
                          onRefresh={() => refreshWidget(widget.id)} 
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.section>
      )}

      {/* Sistema de Búsqueda y Filtros Inteligente */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
          {/* Barra de búsqueda inteligente con autocompletado */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar torneos, equipos o participantes..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
            />
            {isSearching && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <Loader2 className="h-5 w-5 text-purple-500 animate-spin" />
              </div>
            )}
            {searchTerm && !isSearching && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setShowSuggestions(false);
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
              </button>
            )}
            
            {/* Panel de sugerencias */}
            {showSuggestions && searchSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 max-h-64 overflow-y-auto"
              >
                {searchSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => {
                      setSearchTerm(suggestion.text);
                      setShowSuggestions(false);
                      addToSearchHistory(suggestion.text, searchResults.length);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-3"
                  >
                    <suggestion.icon className="w-4 h-4 text-gray-500" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{suggestion.text}</div>
                      <div className="text-sm text-gray-500 capitalize">{suggestion.type}</div>
                    </div>
                    {suggestion.count && (
                      <div className="text-xs text-gray-400">{suggestion.count}</div>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Controles de filtros y búsqueda */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors duration-300"
              >
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filtros</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors duration-300"
              >
                <Settings className="w-4 h-4" />
                <span className="font-medium">Avanzados</span>
              </button>

              {/* Ordenamiento */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as SortField)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="name">Nombre</option>
                  <option value="date">Fecha</option>
                  <option value="prize">Premio</option>
                  <option value="participants">Participantes</option>
                  <option value="status">Estado</option>
                </select>
                <button
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300"
                >
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>

            {/* Contador de resultados y acciones */}
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                {filteredTournaments.length} torneo{filteredTournaments.length !== 1 ? 's' : ''} encontrado{filteredTournaments.length !== 1 ? 's' : ''}
              </div>
              
              {/* Historial de búsquedas */}
              {searchHistory.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowSuggestions(!showSuggestions)}
                    className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                  >
                    <History className="w-4 h-4" />
                    <span className="text-sm">Historial</span>
                  </button>
                  
                  {showSuggestions && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 z-50">
                      <div className="p-3 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">Búsquedas recientes</h3>
                          <button
                            onClick={clearSearchHistory}
                            className="text-xs text-gray-500 hover:text-gray-700"
                          >
                            Limpiar
                          </button>
                        </div>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {searchHistory.slice(0, 5).map((entry) => (
                          <button
                            key={entry.id}
                            onClick={() => {
                              setSearchTerm(entry.query);
                              setShowSuggestions(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                          >
                            <div>
                              <div className="font-medium text-gray-900">{entry.query}</div>
                              <div className="text-xs text-gray-500">
                                {entry.resultCount} resultados • {entry.timestamp.toLocaleDateString()}
                              </div>
                            </div>
                            <Search className="w-4 h-4 text-gray-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Panel de filtros expandible mejorado */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 space-y-6"
            >
              {/* Filtros básicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Filtro por Estado */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="all">Todos</option>
                    <option value="upcoming">Próximos</option>
                    <option value="in-progress">En Progreso</option>
                    <option value="completed">Finalizados</option>
                  </select>
                </div>

                {/* Filtro por Tipo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="all">Todos</option>
                    <option value="eliminación">Eliminación</option>
                    <option value="grupos">Grupos</option>
                    <option value="liga">Liga</option>
                  </select>
                </div>

                {/* Filtro por Fecha */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha</label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="all">Todas</option>
                    <option value="this-month">Este mes</option>
                    <option value="next-month">Próximo mes</option>
                  </select>
                </div>

                {/* Filtro por Premio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Premio</label>
                  <select
                    value={prizeFilter}
                    onChange={(e) => setPrizeFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="all">Todos</option>
                    <option value="low">Bajo (&lt; $20K)</option>
                    <option value="medium">Medio ($20K - $40K)</option>
                    <option value="high">Alto (&gt; $40K)</option>
                  </select>
                </div>
              </div>

              {/* Filtros activos */}
              {activeFilters.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Filtros Activos</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter) => (
                      <div
                        key={filter.id}
                        className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg"
                      >
                        <span className="text-sm font-medium">{filter.label}</span>
                        <button
                          onClick={() => toggleFilter(filter.id)}
                          className="text-purple-500 hover:text-purple-700"
                        >
                          {filter.active ? '✓' : '✗'}
                        </button>
                        <button
                          onClick={() => removeFilter(filter.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Filtros guardados */}
              {savedFilters.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Filtros Guardados</h3>
                  <div className="flex flex-wrap gap-2">
                    {savedFilters.map((savedFilter) => (
                      <button
                        key={savedFilter.id}
                        onClick={() => loadSavedFilter(savedFilter)}
                        className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-300"
                      >
                        <span className="text-sm font-medium">{savedFilter.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSavedFilter(savedFilter.id);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Panel de filtros avanzados */}
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-4 bg-gray-50 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filtros Avanzados</h3>
                <button
                  onClick={() => setShowAdvancedFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Agregar filtro personalizado */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Campo</label>
                  <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg">
                    <option value="name">Nombre</option>
                    <option value="prize">Premio</option>
                    <option value="participants">Participantes</option>
                    <option value="location">Ubicación</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Operador</label>
                  <select className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg">
                    <option value="equals">Igual a</option>
                    <option value="contains">Contiene</option>
                    <option value="greater_than">Mayor que</option>
                    <option value="less_than">Menor que</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Valor</label>
                  <input
                    type="text"
                    placeholder="Valor del filtro"
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300">
                  Agregar Filtro
                </button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300">
                  Guardar Preset
                </button>
              </div>
            </motion.div>
          )}

          {/* Acciones de filtros */}
          <div className="mt-6 flex flex-wrap gap-4 items-center justify-between">
            {/* Botón para limpiar filtros */}
            {(searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || dateFilter !== 'all' || prizeFilter !== 'all' || activeFilters.length > 0) && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors duration-300"
              >
                <X className="w-4 h-4" />
                <span className="font-medium">Limpiar todos los filtros</span>
              </button>
            )}

            {/* Guardar filtros actuales */}
            {activeFilters.length > 0 && (
              <button
                onClick={() => {
                  const name = prompt('Nombre para el filtro:');
                  const description = prompt('Descripción (opcional):');
                  if (name) {
                    saveCurrentFilters(name, description || '');
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors duration-300"
              >
                <Save className="w-4 h-4" />
                <span className="font-medium">Guardar filtros</span>
              </button>
            )}

            {/* Exportar resultados */}
            {filteredTournaments.length > 0 && (
              <button
                onClick={() => {
                  // Implementar exportación de resultados
                  console.log('Exportar resultados:', filteredTournaments);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors duration-300"
              >
                <Download className="w-4 h-4" />
                <span className="font-medium">Exportar resultados</span>
              </button>
            )}
          </div>
        </div>
      </motion.section>

      {/* Lista de Torneos Filtrados */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament, index) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
              index={index}
              canEdit={canEdit()}
              canDelete={canDelete()}
            />
          ))}
        </div>

        {/* Mensaje cuando no hay resultados */}
        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No se encontraron torneos</h3>
            <p className="text-gray-500">Intenta ajustar los filtros o términos de búsqueda</p>
          </div>
        )}
      </motion.section>

      {/* Cuadro de Torneos - Renderizado condicional basado en permisos */}
      {hasPermission('tournaments.view') && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <Suspense fallback={<LoadingFallback sectionName="Cuadro de Torneos" progress={loadingProgress} />}>
            <CuadroTorneos tournament={mockTournament} />
          </Suspense>
        </motion.section>
      )}

      {/* Generador de Brackets - Solo para organizadores y admins */}
      {hasPermission('brackets.manage') && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8"
        >
          <Suspense fallback={<LoadingFallback sectionName="Generador de Brackets" progress={loadingProgress} />}>
            <GeneradorBrackets />
          </Suspense>
        </motion.section>
      )}

      {/* Sistema Seeding - Solo para organizadores y admins */}
      {hasPermission('brackets.manage') && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mb-8"
        >
          <Suspense fallback={<LoadingFallback sectionName="Sistema Seeding" progress={loadingProgress} />}>
            <SistemaSeeding />
          </Suspense>
        </motion.section>
      )}

      {/* Streaming - Solo para organizadores y admins */}
      {hasPermission('streaming.manage') && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-8"
        >
          <Suspense fallback={<LoadingFallback sectionName="Streaming" progress={loadingProgress} />}>
            <StreamingTorneo />
          </Suspense>
        </motion.section>
      )}

      {/* Apuestas Virtuales - Solo para organizadores y admins */}
      {hasPermission('apuestas.manage') && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mb-8"
        >
          <Suspense fallback={<LoadingFallback sectionName="Apuestas Virtuales" progress={loadingProgress} />}>
            <ApuestasVirtuales />
          </Suspense>
        </motion.section>
      )}

      {/* Gestión Árbitros - Solo para admins */}
      {hasPermission('arbitros.manage') && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mb-8"
        >
          <Suspense fallback={<LoadingFallback sectionName="Gestión de Árbitros" progress={loadingProgress} />}>
            <GestionArbitros />
          </Suspense>
        </motion.section>
      )}

      {/* Analytics - Solo para admins y organizadores */}
      {hasPermission('analytics.view') && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="mb-8"
        >
          <Suspense fallback={<LoadingFallback sectionName="Analytics" progress={loadingProgress} />}>
            <AnalyticsTorneo />
          </Suspense>
        </motion.section>
      )}

      {/* Sistema de Premios - Solo para organizadores y admins */}
      {hasPermission('premios.manage') && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-8"
        >
          <Suspense fallback={<LoadingFallback sectionName="Sistema de Premios" progress={loadingProgress} />}>
            <SistemaPremios />
          </Suspense>
        </motion.section>
      )}

      {/* Redes Sociales - Solo para organizadores y admins */}
      {hasPermission('redes.manage') && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mb-8"
        >
          <Suspense fallback={<LoadingFallback sectionName="Integración Redes Sociales" progress={loadingProgress} />}>
            <IntegracionRedesSociales />
          </Suspense>
        </motion.section>
      )}
    </div>
  );
};

export default TorneosPage;
