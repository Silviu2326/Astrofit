import React, { useState } from 'react';
import {
  Watch, Activity, Heart, Moon, Zap, Battery, Calendar,
  TrendingUp, Users, Smartphone, RefreshCw, Settings, Plus,
  CheckCircle, AlertCircle, Clock, Download, ExternalLink,
  Search, Filter, ChevronRight, Wifi, WifiOff, Play, X,
  BarChart3, PieChart, FileText, Webhook, Shield, BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

// ============================================================================
// TIPOS Y DATOS MOCK
// ============================================================================

type PlatformStatus = 'active' | 'available' | 'beta' | 'error';
type SyncStatus = 'synced' | 'syncing' | 'error' | 'never';
type Tab = 'overview' | 'clients' | 'logs' | 'analytics' | 'config';

interface Platform {
  id: string;
  name: string;
  logo: string;
  status: PlatformStatus;
  connectedClients: number;
  availableData: string[];
  color: string;
}

interface ClientDevice {
  id: string;
  clientName: string;
  avatar: string;
  platform: string;
  deviceModel: string;
  syncStatus: SyncStatus;
  lastSync: string;
  lastMetric: string;
  battery?: number;
  connectedDate: string;
  stepsToday?: number;
  sleepLastNight?: number;
}

interface SyncLog {
  id: string;
  timestamp: string;
  clientName: string;
  platform: string;
  status: 'success' | 'error';
  dataPoints: string[];
  duration: number;
  error?: string;
}

interface HealthData {
  steps: number;
  stepsGoal: number;
  calories: number;
  distance: number;
  activeMinutes: number;
  heartRate: number;
  restingHR: number;
  maxHR: number;
  sleep: number;
  sleepQuality: number;
  workouts: Workout[];
  vo2max?: number;
  hrv?: number;
  spo2?: number;
}

interface Workout {
  type: string;
  duration: number;
  calories: number;
  distance?: number;
  avgHR?: number;
  maxHR?: number;
}

// Plataformas disponibles
const platforms: Platform[] = [
  {
    id: 'apple',
    name: 'Apple Health',
    logo: '🍎',
    status: 'active',
    connectedClients: 45,
    availableData: ['Pasos', 'Calorías', 'Frecuencia Cardíaca', 'Sueño', 'Entrenamientos', 'VO2 max'],
    color: '#000000'
  },
  {
    id: 'google',
    name: 'Google Fit',
    logo: '🔵',
    status: 'active',
    connectedClients: 32,
    availableData: ['Pasos', 'Calorías', 'Frecuencia Cardíaca', 'Sueño', 'Distancia'],
    color: '#4285F4'
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    logo: '⚡',
    status: 'active',
    connectedClients: 18,
    availableData: ['Pasos', 'Sueño', 'HR', 'Calorías', 'Pisos'],
    color: '#00B0B9'
  },
  {
    id: 'garmin',
    name: 'Garmin',
    logo: '🔷',
    status: 'active',
    connectedClients: 12,
    availableData: ['Deportes', 'HR', 'VO2', 'Entrenamientos', 'GPS'],
    color: '#007CC3'
  },
  {
    id: 'whoop',
    name: 'Whoop',
    logo: '⚫',
    status: 'available',
    connectedClients: 0,
    availableData: ['Recuperación', 'HRV', 'Sueño', 'Strain'],
    color: '#000000'
  },
  {
    id: 'polar',
    name: 'Polar',
    logo: '❄️',
    status: 'available',
    connectedClients: 0,
    availableData: ['HR', 'Entrenamientos', 'Recuperación'],
    color: '#E30613'
  },
  {
    id: 'samsung',
    name: 'Samsung Health',
    logo: '💚',
    status: 'beta',
    connectedClients: 5,
    availableData: ['Pasos', 'Sueño', 'HR'],
    color: '#1428A0'
  }
];

// Generar clientes con dispositivos
const generateClientDevices = (): ClientDevice[] => {
  const names = [
    'Ana García', 'Carlos López', 'María Rodríguez', 'José Martínez', 'Laura Sánchez',
    'David Torres', 'Carmen Ruiz', 'Miguel Ángel', 'Elena Fernández', 'Pablo Jiménez',
    'Sofía Díaz', 'Javier Moreno', 'Isabel Muñoz', 'Francisco Álvarez', 'Lucía Romero',
    'Antonio Navarro', 'Marta Gutiérrez', 'Raúl Serrano', 'Cristina Molina', 'Alberto Castro'
  ];

  const platformDevices = {
    apple: ['Apple Watch Series 9', 'Apple Watch Ultra 2', 'Apple Watch SE'],
    google: ['Pixel Watch 2', 'Samsung Galaxy Watch', 'TicWatch Pro'],
    fitbit: ['Fitbit Charge 6', 'Fitbit Sense 2', 'Fitbit Versa 4'],
    garmin: ['Garmin Forerunner 965', 'Garmin Fenix 7', 'Garmin Venu 3'],
    samsung: ['Galaxy Watch 6', 'Galaxy Watch 6 Classic']
  };

  const clients: ClientDevice[] = [];
  const statusOptions: SyncStatus[] = ['synced', 'synced', 'synced', 'synced', 'error'];

  for (let i = 0; i < 65; i++) {
    const name = names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : '');
    const platformId = ['apple', 'apple', 'google', 'fitbit', 'garmin', 'samsung'][i % 6];
    const devices = platformDevices[platformId as keyof typeof platformDevices];
    const syncStatus = statusOptions[i % statusOptions.length];

    clients.push({
      id: `client-${i + 1}`,
      clientName: name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      platform: platformId,
      deviceModel: devices[i % devices.length],
      syncStatus,
      lastSync: syncStatus === 'never' ? 'Nunca' : syncStatus === 'error' ? 'Error hace 2h' : `Hace ${Math.floor(Math.random() * 60)} min`,
      lastMetric: `${(8000 + Math.random() * 8000).toFixed(0)} pasos hoy`,
      battery: Math.floor(60 + Math.random() * 40),
      connectedDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      stepsToday: Math.floor(3000 + Math.random() * 17000),
      sleepLastNight: Number((5 + Math.random() * 4).toFixed(1))
    });
  }

  return clients;
};

// Generar logs de sincronización
const generateSyncLogs = (): SyncLog[] => {
  const logs: SyncLog[] = [];
  const clients = generateClientDevices();

  for (let i = 0; i < 150; i++) {
    const client = clients[Math.floor(Math.random() * clients.length)];
    const status = Math.random() > 0.1 ? 'success' : 'error';

    logs.push({
      id: `log-${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      clientName: client.clientName,
      platform: client.platform,
      status,
      dataPoints: ['234 pasos', '1 sesión sueño', '2 entrenamientos'].slice(0, Math.floor(1 + Math.random() * 3)),
      duration: Math.floor(500 + Math.random() * 3000),
      error: status === 'error' ? 'Token expirado' : undefined
    });
  }

  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

// Datos para gráficos
const adoptionData = [
  { month: 'Ene', clients: 15 },
  { month: 'Feb', clients: 23 },
  { month: 'Mar', clients: 34 },
  { month: 'Abr', clients: 47 },
  { month: 'May', clients: 58 },
  { month: 'Jun', clients: 72 },
  { month: 'Jul', clients: 89 },
  { month: 'Ago', clients: 107 }
];

const stepsData = [
  { day: 'Lun', steps: 8234 },
  { day: 'Mar', steps: 12543 },
  { day: 'Mié', steps: 9876 },
  { day: 'Jue', steps: 11234 },
  { day: 'Vie', steps: 10543 },
  { day: 'Sáb', steps: 15234 },
  { day: 'Dom', steps: 7892 }
];

const sleepData = [
  { day: 'Lun', hours: 7.2 },
  { day: 'Mar', hours: 6.8 },
  { day: 'Mié', hours: 7.5 },
  { day: 'Jue', hours: 6.5 },
  { day: 'Vie', hours: 7.8 },
  { day: 'Sáb', hours: 8.2 },
  { day: 'Dom', hours: 7.9 }
];

const hrData = [
  { time: '00:00', hr: 58 },
  { time: '04:00', hr: 55 },
  { time: '08:00', hr: 72 },
  { time: '12:00', hr: 85 },
  { time: '16:00', hr: 165 },
  { time: '20:00', hr: 68 },
  { time: '23:59', hr: 62 }
];

// ============================================================================
// COMPONENTES
// ============================================================================

const DispositivosConectadosPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [clients] = useState<ClientDevice[]>(generateClientDevices());
  const [logs] = useState<SyncLog[]>(generateSyncLogs());
  const [selectedClient, setSelectedClient] = useState<ClientDevice | null>(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState<Platform | null>(null);
  const [showSyncProgress, setShowSyncProgress] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<SyncStatus | 'all'>('all');

  const totalClients = clients.length;
  const totalDevices = clients.length;
  const syncRate = ((clients.filter(c => c.syncStatus === 'synced').length / clients.length) * 100).toFixed(1);
  const lastSync = 'Hace 3 minutos';
  const dataSyncedToday = {
    sessions: 234,
    steps: '1.2M',
    calories: '87k',
    sleep: '523h'
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = filterPlatform === 'all' || client.platform === filterPlatform;
    const matchesStatus = filterStatus === 'all' || client.syncStatus === filterStatus;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const distributionData = platforms
    .filter(p => p.connectedClients > 0)
    .map(p => ({
      name: p.name,
      value: p.connectedClients,
      color: p.color
    }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-indigo-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex items-center gap-4 mb-4 flex-wrap">
            <div className="relative">
              <Watch className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Dispositivos <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Conectados</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-8">
            Integra datos de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">wearables</span> de tus clientes
          </p>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowConnectModal(true)}
              className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl"
            >
              <Plus className="w-5 h-5" />
              Conectar Dispositivo
            </button>
            <button
              onClick={() => setShowSyncProgress(true)}
              className="px-6 py-3 bg-white text-sky-600 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Sincronizar Todo
            </button>
          </div>
        </div>
      </motion.div>

      {/* TABS */}
      <div className="flex gap-2 border-b border-slate-200 mb-8 overflow-x-auto">
        {[
          { id: 'overview', label: 'Resumen', icon: Activity },
          { id: 'clients', label: 'Clientes', icon: Users },
          { id: 'logs', label: 'Logs', icon: FileText },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'config', label: 'Configuración', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENIDO SEGÚN TAB */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <OverviewTab
            totalClients={totalClients}
            totalDevices={totalDevices}
            syncRate={parseFloat(syncRate)}
            lastSync={lastSync}
            dataSyncedToday={dataSyncedToday}
            platforms={platforms}
            clients={clients}
            setShowConfigModal={setShowConfigModal}
          />
        )}

        {activeTab === 'clients' && (
          <ClientsTab
            clients={filteredClients}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterPlatform={filterPlatform}
            setFilterPlatform={setFilterPlatform}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            platforms={platforms}
            setSelectedClient={setSelectedClient}
          />
        )}

        {activeTab === 'logs' && <LogsTab logs={logs} />}

        {activeTab === 'analytics' && (
          <AnalyticsTab
            adoptionData={adoptionData}
            distributionData={distributionData}
            clients={clients}
          />
        )}

        {activeTab === 'config' && <ConfigTab platforms={platforms} />}
      </AnimatePresence>

      {/* MODALES */}
      <AnimatePresence>
        {showConnectModal && (
          <ConnectDeviceModal onClose={() => setShowConnectModal(false)} />
        )}
        {showConfigModal && (
          <PlatformConfigModal
            platform={showConfigModal}
            onClose={() => setShowConfigModal(null)}
          />
        )}
        {selectedClient && (
          <ClientDataModal
            client={selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        )}
        {showSyncProgress && (
          <SyncProgressModal
            clients={clients}
            onClose={() => setShowSyncProgress(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// TAB: OVERVIEW
// ============================================================================

const OverviewTab: React.FC<{
  totalClients: number;
  totalDevices: number;
  syncRate: number;
  lastSync: string;
  dataSyncedToday: any;
  platforms: Platform[];
  clients: ClientDevice[];
  setShowConfigModal: (platform: Platform) => void;
}> = ({ totalClients, totalDevices, syncRate, lastSync, dataSyncedToday, platforms, clients, setShowConfigModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          icon={Users}
          label="Clientes con Wearables"
          value={totalClients}
          subtitle="74% del total"
          trend="+12% vs mes anterior"
          color="blue"
        />
        <StatCard
          icon={Watch}
          label="Dispositivos Conectados"
          value={totalDevices}
          subtitle="Apple Watch más popular"
          color="green"
        />
        <StatCard
          icon={Activity}
          label="Datos Sincronizados Hoy"
          value={`${dataSyncedToday.sessions} sesiones`}
          subtitle={`${dataSyncedToday.steps} pasos`}
          color="purple"
          autoRefresh
        />
        <StatCard
          icon={TrendingUp}
          label="Tasa de Sincronización"
          value={`${syncRate}%`}
          subtitle={syncRate > 95 ? 'Excelente' : syncRate > 90 ? 'Buena' : 'Mejorar'}
          color={syncRate > 95 ? 'green' : syncRate > 90 ? 'yellow' : 'red'}
        />
        <StatCard
          icon={Clock}
          label="Última Sincronización"
          value={lastSync}
          subtitle="Auto-sync activo"
          color="indigo"
          hasButton
          buttonLabel="Sincronizar Ahora"
        />
      </div>

      {/* PLATAFORMAS */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Smartphone className="w-6 h-6" />
          Plataformas Disponibles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {platforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              onConfig={() => setShowConfigModal(platform)}
            />
          ))}
        </div>
      </div>

      {/* ERRORES ACTIVOS */}
      <ErrorsPanel clients={clients.filter(c => c.syncStatus === 'error')} />

      {/* GUÍAS Y RECURSOS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-sky-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-xl">
              <BookOpen className="w-6 h-6 text-sky-600" />
            </div>
            Guías y Recursos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResourceCard
              icon="📱"
              title="Cómo conectar Apple Watch"
              type="Video Tutorial"
            />
            <ResourceCard
              icon="⚡"
              title="Configurar Fitbit"
              type="Documentación"
            />
            <ResourceCard
              icon="🔷"
              title="Integración con Garmin"
              type="Guía Paso a Paso"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// TAB: CLIENTS
// ============================================================================

const ClientsTab: React.FC<{
  clients: ClientDevice[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterPlatform: string;
  setFilterPlatform: (platform: string) => void;
  filterStatus: SyncStatus | 'all';
  setFilterStatus: (status: SyncStatus | 'all') => void;
  platforms: Platform[];
  setSelectedClient: (client: ClientDevice) => void;
}> = ({ clients, searchTerm, setSearchTerm, filterPlatform, setFilterPlatform, filterStatus, setFilterStatus, platforms, setSelectedClient }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* FILTROS */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-400" />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium"
              />
            </div>
          </div>

          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-semibold text-gray-700"
          >
            <option value="all">Todas las plataformas</option>
            {platforms.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as SyncStatus | 'all')}
            className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-semibold text-gray-700"
          >
            <option value="all">Todos los estados</option>
            <option value="synced">Sincronizado</option>
            <option value="error">Error</option>
            <option value="never">Nunca sincronizado</option>
          </select>
        </div>
      </div>

      {/* TABLA DE CLIENTES */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border-b border-sky-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Dispositivo</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Última Métrica</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Batería</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Conectado</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => (
                <ClientRow
                  key={client.id}
                  client={client}
                  onViewData={() => setSelectedClient(client)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center text-slate-600">
        Mostrando {clients.length} clientes
      </div>
    </motion.div>
  );
};

// ============================================================================
// TAB: LOGS
// ============================================================================

const LogsTab: React.FC<{ logs: SyncLog[] }> = ({ logs }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'success' | 'error'>('all');

  const filteredLogs = logs.filter(log =>
    filterStatus === 'all' || log.status === filterStatus
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="flex gap-4">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg ${filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-300'}`}
        >
          Todos ({logs.length})
        </button>
        <button
          onClick={() => setFilterStatus('success')}
          className={`px-4 py-2 rounded-lg ${filterStatus === 'success' ? 'bg-green-600 text-white' : 'bg-white border border-slate-300'}`}
        >
          Exitosos ({logs.filter(l => l.status === 'success').length})
        </button>
        <button
          onClick={() => setFilterStatus('error')}
          className={`px-4 py-2 rounded-lg ${filterStatus === 'error' ? 'bg-red-600 text-white' : 'bg-white border border-slate-300'}`}
        >
          Errores ({logs.filter(l => l.status === 'error').length})
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Plataforma</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Datos</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Duración</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredLogs.slice(0, 50).map((log) => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{log.clientName}</td>
                  <td className="px-6 py-4 text-sm">{log.platform}</td>
                  <td className="px-6 py-4">
                    {log.status === 'success' ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        ✓ Exitoso
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        ✗ Error
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {log.dataPoints.join(', ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{log.duration}ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// TAB: ANALYTICS
// ============================================================================

const AnalyticsTab: React.FC<{
  adoptionData: any[];
  distributionData: any[];
  clients: ClientDevice[];
}> = ({ adoptionData, distributionData, clients }) => {
  const avgSteps = Math.floor(clients.reduce((sum, c) => sum + (c.stepsToday || 0), 0) / clients.length);
  const avgSleep = (clients.reduce((sum, c) => sum + (c.sleepLastNight || 0), 0) / clients.length).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* MÉTRICAS PROMEDIO */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-blue-600" />
            <span className="text-slate-600 text-sm">Pasos Promedio/Día</span>
          </div>
          <div className="text-3xl font-bold">{avgSteps.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Moon className="w-5 h-5 text-indigo-600" />
            <span className="text-slate-600 text-sm">Sueño Promedio</span>
          </div>
          <div className="text-3xl font-bold">{avgSleep}h</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-orange-600" />
            <span className="text-slate-600 text-sm">Calorías Promedio</span>
          </div>
          <div className="text-3xl font-bold">2,145</div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5 text-red-600" />
            <span className="text-slate-600 text-sm">Entrenamientos/Semana</span>
          </div>
          <div className="text-3xl font-bold">4.2</div>
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Adopción */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-bold mb-4">Crecimiento de Adopción</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={adoptionData}>
              <defs>
                <linearGradient id="colorClients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="clients" stroke="#3B82F6" fillOpacity={1} fill="url(#colorClients)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-bold mb-4">Distribución de Dispositivos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// TAB: CONFIG
// ============================================================================

const ConfigTab: React.FC<{ platforms: Platform[] }> = ({ platforms }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Configuración General
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Frecuencia de Sincronización</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
              <option>Cada 15 minutos (recomendado)</option>
              <option>Cada hora</option>
              <option>Cada 6 horas</option>
              <option>Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Notificaciones</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Notificar cuando nuevo dispositivo se conecta</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Notificar si falla sincronización</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Notificar hitos (ej: cliente alcanza 10k pasos)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacidad y Seguridad
        </h3>
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span>Datos encriptados en tránsito (TLS 1.3) y en reposo (AES-256)</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span>Cumplimiento GDPR y HIPAA</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span>Cliente puede revocar acceso en cualquier momento</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span>Retención de datos: 90 días (configurable)</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Webhook className="w-5 h-5" />
          Webhooks
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">URL del Webhook</label>
            <input
              type="url"
              placeholder="https://tu-servidor.com/webhook"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Eventos</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Nuevo entrenamiento completado</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Nuevo día de actividad</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Hito alcanzado</span>
              </label>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Test Webhook
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// COMPONENTES AUXILIARES
// ============================================================================

const StatCard: React.FC<{
  icon: any;
  label: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  color: string;
  autoRefresh?: boolean;
  hasButton?: boolean;
  buttonLabel?: string;
}> = ({ icon: Icon, label, value, subtitle, trend, color, autoRefresh, hasButton, buttonLabel }) => {
  const colorClasses = {
    blue: 'from-sky-500 to-blue-600',
    green: 'from-emerald-500 to-teal-600',
    purple: 'from-purple-500 to-indigo-600',
    yellow: 'from-yellow-500 to-orange-600',
    red: 'from-red-500 to-pink-600',
    indigo: 'from-indigo-500 to-purple-600'
  };

  return (
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
      <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} opacity-5 rounded-full blur-2xl`}></div>

      <div className="relative z-10">
        {/* Icono */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8" />
        </div>

        {/* Título */}
        <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
          {label}
        </p>

        {/* Valor */}
        <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3 flex items-center gap-2">
          {value}
          {autoRefresh && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-5 h-5 text-sky-600" />
            </motion.div>
          )}
        </p>

        {/* Subtítulo */}
        <div className="text-xs text-gray-500 font-medium">{subtitle}</div>

        {/* Cambio/trend */}
        {trend && (
          <div className="flex items-center gap-2 mt-2">
            <div className="p-1 bg-green-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-bold text-green-600">{trend}</span>
          </div>
        )}

        {hasButton && (
          <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-sky-50 to-blue-50 text-sky-600 rounded-xl text-sm font-semibold hover:from-sky-100 hover:to-blue-100 transition-all duration-300 border border-sky-200">
            {buttonLabel}
          </button>
        )}
      </div>
    </motion.div>
  );
};

const PlatformCard: React.FC<{
  platform: Platform;
  onConfig: () => void;
}> = ({ platform, onConfig }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-700 border-green-300',
    available: 'bg-slate-100 text-slate-700 border-slate-300',
    beta: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    error: 'bg-red-100 text-red-700 border-red-300'
  };

  const statusLabels = {
    active: 'Activa',
    available: 'Disponible',
    beta: 'Beta',
    error: 'Error'
  };

  const statusIcons = {
    active: <Wifi className="w-3 h-3" />,
    available: <WifiOff className="w-3 h-3" />,
    beta: <AlertCircle className="w-3 h-3" />,
    error: <X className="w-3 h-3" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-sky-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          {/* Logo con backdrop */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            {platform.logo}
          </div>

          {/* Estado badge */}
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border ${statusColors[platform.status]}`}>
            {statusIcons[platform.status]}
            {statusLabels[platform.status]}
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-gray-900">{platform.name}</h3>

        {platform.connectedClients > 0 && (
          <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-100">
            <Users className="w-4 h-4 text-sky-600" />
            <span className="text-sm font-semibold text-sky-700">
              {platform.connectedClients} clientes
            </span>
          </div>
        )}

        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Datos disponibles:</div>
          <div className="flex flex-wrap gap-2">
            {platform.availableData.slice(0, 3).map((data, i) => (
              <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-medium">
                {data}
              </span>
            ))}
            {platform.availableData.length > 3 && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 text-indigo-700 rounded-lg text-xs font-bold">
                +{platform.availableData.length - 3} más
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onConfig}
          className="w-full px-4 py-3 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl shadow-lg shadow-sky-500/50 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-2xl"
        >
          {platform.status === 'active' ? (
            <>
              <Settings className="w-5 h-5" />
              Configurar
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Conectar
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

const ClientRow: React.FC<{
  client: ClientDevice;
  onViewData: () => void;
}> = ({ client, onViewData }) => {
  const statusConfig = {
    synced: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300', label: 'Sincronizado' },
    syncing: { icon: RefreshCw, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300', label: 'Sincronizando...' },
    error: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-300', label: 'Error' },
    never: { icon: WifiOff, color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-300', label: 'Nunca' }
  };

  const status = statusConfig[client.syncStatus];
  const StatusIcon = status.icon;

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hover:bg-gradient-to-r hover:from-sky-50/50 hover:to-blue-50/50 transition-all duration-300"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img src={client.avatar} alt={client.clientName} className="w-10 h-10 rounded-full ring-2 ring-white shadow-md" />
          <span className="font-semibold text-gray-900">{client.clientName}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm">
          <div className="font-semibold text-gray-900">{client.deviceModel}</div>
          <div className="text-slate-500 capitalize flex items-center gap-1 mt-0.5">
            <Watch className="w-3 h-3" />
            {client.platform}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <StatusIcon className={`w-4 h-4 ${status.color}`} />
            <span className={`px-3 py-1 ${status.bg} ${status.color} rounded-full text-xs font-bold border ${status.border}`}>
              {status.label}
            </span>
          </div>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {client.lastSync}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
          <Activity className="w-4 h-4 text-sky-600" />
          {client.lastMetric}
        </div>
      </td>
      <td className="px-6 py-4">
        {client.battery && (
          <div className="flex items-center gap-2">
            <Battery className={`w-4 h-4 ${client.battery > 20 ? 'text-green-600' : 'text-red-600'}`} />
            <span className={`text-sm font-semibold ${client.battery > 20 ? 'text-green-600' : 'text-red-600'}`}>
              {client.battery}%
            </span>
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4" />
          {client.connectedDate}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={onViewData}
            className="px-3 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg text-xs font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-1"
          >
            <BarChart3 className="w-3 h-3" />
            Ver Datos
          </button>
          <button className="px-3 py-2 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:from-slate-200 hover:to-slate-300 transition-all duration-300 flex items-center gap-1">
            <RefreshCw className="w-3 h-3" />
            Sync
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

const ErrorsPanel: React.FC<{ clients: ClientDevice[] }> = ({ clients }) => {
  if (clients.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-50 via-orange-50 to-pink-50 border-l-4 border-red-500 rounded-3xl p-6 shadow-xl relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-red-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-xl">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          Dispositivos con Problemas
          <span className="px-3 py-1 bg-red-600 text-white rounded-full text-sm font-bold">
            {clients.length}
          </span>
        </h3>

        <div className="space-y-3">
          {clients.slice(0, 5).map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between hover:shadow-lg transition-all duration-300 border border-white/50"
            >
              <div className="flex items-center gap-4">
                <img src={client.avatar} alt={client.clientName} className="w-12 h-12 rounded-full ring-2 ring-red-200 shadow-md" />
                <div>
                  <div className="font-bold text-gray-900">{client.clientName}</div>
                  <div className="text-sm text-slate-600 flex items-center gap-1">
                    <Watch className="w-3 h-3" />
                    {client.deviceModel}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-bold text-red-600 flex items-center gap-1">
                    <X className="w-4 h-4" />
                    Token expirado
                  </div>
                  <div className="text-xs text-slate-500">Cliente debe re-autenticar</div>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Notificar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ResourceCard: React.FC<{
  icon: string;
  title: string;
  type: string;
}> = ({ icon, title, type }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      className="flex items-center gap-4 p-5 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl hover:from-sky-50 hover:to-blue-50 transition-all duration-300 cursor-pointer border border-slate-200 hover:border-sky-300 shadow-md hover:shadow-xl group"
    >
      <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <div className="flex-1">
        <div className="font-bold text-gray-900 group-hover:text-sky-700 transition-colors">{title}</div>
        <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
          <Play className="w-3 h-3" />
          {type}
        </div>
      </div>
      <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-sky-600 transition-colors" />
    </motion.div>
  );
};

// ============================================================================
// MODALES
// ============================================================================

const ConnectDeviceModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50"
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-gradient-to-r from-sky-50 to-blue-50 backdrop-blur-xl z-10 rounded-t-3xl">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">Conectar Nuevo Dispositivo</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-xl transition-colors">
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Seleccionar Cliente</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-400" />
                  <input
                    type="text"
                    placeholder="Buscar cliente..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Seleccionar Plataforma</label>
                <div className="grid grid-cols-2 gap-4">
                  {platforms.slice(0, 4).map((platform) => (
                    <motion.button
                      key={platform.id}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedPlatform(platform.id);
                        setStep(2);
                      }}
                      className="p-5 border-2 border-slate-200 rounded-2xl hover:border-sky-500 transition-all duration-300 text-left bg-gradient-to-br from-white to-slate-50 hover:from-sky-50 hover:to-blue-50 shadow-md hover:shadow-xl"
                    >
                      <div className="text-4xl mb-3">{platform.logo}</div>
                      <div className="font-bold text-gray-900">{platform.name}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 text-center border border-sky-200 shadow-inner">
                <div className="w-48 h-48 bg-white rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-xl border border-slate-200">
                  <div className="text-7xl">📱</div>
                </div>
                <div className="text-xl font-bold text-gray-900 mb-2">Escanea este código QR</div>
                <div className="text-sm text-slate-600">
                  Abre la app en tu dispositivo móvil y escanea para conectar
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { num: 1, text: `Cliente abre app de ${selectedPlatform}`, color: 'sky' },
                  { num: 2, text: 'Permite acceso a datos de salud', color: 'blue' },
                  { num: 3, text: 'Acepta permisos', color: 'indigo' },
                  { num: '✓', text: '¡Listo! Datos sincronizando', color: 'green', final: true }
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${step.final ? 'from-green-500 to-emerald-600' : 'from-sky-500 to-blue-600'} text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-lg`}>
                      {step.num}
                    </div>
                    <span className={`${step.final ? 'font-bold text-green-700' : 'text-gray-700'} text-sm`}>{step.text}</span>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full px-6 py-4 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl shadow-lg shadow-sky-500/50 transition-all duration-300 text-lg"
              >
                Simular Conexión Exitosa
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-28 h-28 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-xl border-4 border-green-200"
              >
                <CheckCircle className="w-16 h-16 text-green-600" />
              </motion.div>

              <div>
                <h3 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">¡Dispositivo Conectado!</h3>
                <p className="text-slate-600 text-lg">Los datos se están sincronizando ahora</p>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 text-left border border-slate-200 shadow-inner">
                <div className="text-sm font-bold mb-4 text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-600" />
                  Preview de datos recibidos:
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-sky-600" />
                      Pasos hoy:
                    </span>
                    <span className="font-bold text-gray-900">8,543</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-600" />
                      Frecuencia cardíaca:
                    </span>
                    <span className="font-bold text-gray-900">72 bpm</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-xl">
                    <span className="text-gray-600 flex items-center gap-2">
                      <Moon className="w-4 h-4 text-indigo-600" />
                      Sueño anoche:
                    </span>
                    <span className="font-bold text-gray-900">7.2h</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full px-6 py-4 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-xl shadow-lg shadow-sky-500/50 transition-all duration-300 text-lg flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-5 h-5" />
                Ver Dashboard del Cliente
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ClientDataModal: React.FC<{
  client: ClientDevice;
  onClose: () => void;
}> = ({ client, onClose }) => {
  const [activeTab, setActiveTab] = useState<'activity' | 'heart' | 'sleep' | 'workouts' | 'other'>('activity');

  const mockData: HealthData = {
    steps: client.stepsToday || 12543,
    stepsGoal: 10000,
    calories: 2340,
    distance: 6.2,
    activeMinutes: 87,
    heartRate: 72,
    restingHR: 58,
    maxHR: 165,
    sleep: client.sleepLastNight || 7.2,
    sleepQuality: 85,
    workouts: [
      { type: 'Correr', duration: 35, calories: 387, distance: 5.2, avgHR: 145, maxHR: 165 },
      { type: 'Pesas', duration: 45, calories: 224, avgHR: 112, maxHR: 138 }
    ],
    vo2max: 48,
    hrv: 52,
    spo2: 98
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
          <div className="flex items-center gap-4">
            <img src={client.avatar} alt={client.clientName} className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="text-xl font-bold">{client.clientName}</h2>
              <p className="text-sm text-slate-600">{client.deviceModel}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="border-b border-slate-200">
          <div className="flex gap-2 px-6">
            {[
              { id: 'activity', label: 'Actividad', icon: Activity },
              { id: 'heart', label: 'Corazón', icon: Heart },
              { id: 'sleep', label: 'Sueño', icon: Moon },
              { id: 'workouts', label: 'Entrenamientos', icon: Zap },
              { id: 'other', label: 'Otros', icon: BarChart3 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard icon={Activity} label="Pasos Hoy" value={mockData.steps.toLocaleString()} color="blue" />
                <MetricCard icon={Zap} label="Calorías" value={`${mockData.calories} kcal`} color="orange" />
                <MetricCard icon={TrendingUp} label="Distancia" value={`${mockData.distance} km`} color="green" />
                <MetricCard icon={Clock} label="Min Activos" value={`${mockData.activeMinutes} min`} color="purple" />
              </div>

              <div className="bg-slate-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">Objetivo de Pasos</span>
                  <span className="text-sm text-slate-600">
                    {((mockData.steps / mockData.stepsGoal) * 100).toFixed(0)}% completado
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((mockData.steps / mockData.stepsGoal) * 100, 100)}%` }}
                    className="bg-gradient-to-r from-blue-600 to-green-600 h-4 rounded-full"
                  />
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-3">Pasos Últimos 7 Días</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={stepsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="steps" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'heart' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <MetricCard icon={Heart} label="HR Actual" value={`${mockData.heartRate} bpm`} color="red" />
                <MetricCard icon={Heart} label="HR Reposo" value={`${mockData.restingHR} bpm`} color="blue" />
                <MetricCard icon={Heart} label="HR Máxima" value={`${mockData.maxHR} bpm`} color="orange" />
              </div>

              <div>
                <h4 className="font-bold mb-3">Frecuencia Cardíaca del Día</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={hrData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[40, 180]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="hr" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'sleep' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <MetricCard icon={Moon} label="Horas Dormidas" value={`${mockData.sleep}h`} color="indigo" />
                <MetricCard icon={TrendingUp} label="Calidad Sueño" value={`${mockData.sleepQuality}%`} color="green" />
              </div>

              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="font-bold mb-4">Fases del Sueño Anoche</h4>
                <div className="space-y-3">
                  <SleepPhase label="Sueño Ligero" hours={3.5} color="bg-blue-400" />
                  <SleepPhase label="Sueño Profundo" hours={2.1} color="bg-indigo-600" />
                  <SleepPhase label="REM" hours={1.6} color="bg-purple-500" />
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-3">Sueño Últimos 7 Días</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={sleepData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#6366F1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'workouts' && (
            <div className="space-y-4">
              {mockData.workouts.map((workout, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold">{workout.type}</h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {workout.duration} min
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-slate-600">Calorías</div>
                      <div className="text-xl font-bold">{workout.calories} kcal</div>
                    </div>
                    {workout.distance && (
                      <div>
                        <div className="text-sm text-slate-600">Distancia</div>
                        <div className="text-xl font-bold">{workout.distance} km</div>
                      </div>
                    )}
                    {workout.avgHR && (
                      <div>
                        <div className="text-sm text-slate-600">HR Promedio</div>
                        <div className="text-xl font-bold">{workout.avgHR} bpm</div>
                      </div>
                    )}
                    {workout.maxHR && (
                      <div>
                        <div className="text-sm text-slate-600">HR Máxima</div>
                        <div className="text-xl font-bold">{workout.maxHR} bpm</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'other' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mockData.vo2max && (
                <MetricCard icon={Activity} label="VO2 Max" value={`${mockData.vo2max} ml/kg/min`} color="blue" />
              )}
              {mockData.hrv && (
                <MetricCard icon={Heart} label="HRV" value={`${mockData.hrv} ms`} color="purple" />
              )}
              {mockData.spo2 && (
                <MetricCard icon={Activity} label="SpO2" value={`${mockData.spo2}%`} color="green" />
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 flex gap-3">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Sincronizar Ahora
          </button>
          <button className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Exportar Datos
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PlatformConfigModal: React.FC<{
  platform: Platform;
  onClose: () => void;
}> = ({ platform, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{platform.logo}</span>
            <h2 className="text-2xl font-bold">Configurar {platform.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-bold mb-3">API Keys</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Client ID</label>
                <input
                  type="text"
                  placeholder="your-client-id"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Client Secret</label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Redirect URL</label>
                <input
                  type="text"
                  value="https://app.solofitpro.com/callback"
                  readOnly
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Permisos Solicitados</h3>
            <div className="space-y-2">
              {['Actividad y ejercicio', 'Frecuencia cardíaca', 'Sueño', 'Nutrición', 'Ubicación', 'Peso corporal'].map((perm) => (
                <label key={perm} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">{perm}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-3">Frecuencia de Sincronización</h3>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg">
              <option>Cada 15 minutos (recomendado)</option>
              <option>Cada hora</option>
              <option>Cada 6 horas</option>
              <option>Manual</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Guardar Configuración
            </button>
            <button className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
              Test de Conexión
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SyncProgressModal: React.FC<{
  clients: ClientDevice[];
  onClose: () => void;
}> = ({ clients, onClose }) => {
  const [progress, setProgress] = useState(0);
  const [syncing, setSyncing] = useState(true);

  React.useEffect(() => {
    if (syncing && progress < clients.length) {
      const timer = setTimeout(() => {
        setProgress(progress + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else if (progress >= clients.length) {
      setSyncing(false);
    }
  }, [progress, syncing, clients.length]);

  const successCount = clients.filter(c => c.syncStatus !== 'error').length;
  const errorCount = clients.filter(c => c.syncStatus === 'error').length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={syncing ? undefined : onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold">
            {syncing ? 'Sincronizando Dispositivos...' : 'Sincronización Completada'}
          </h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progreso</span>
              <span className="text-sm text-slate-600">{progress} / {clients.length}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <motion.div
                animate={{ width: `${(progress / clients.length) * 100}%` }}
                className="bg-gradient-to-r from-blue-600 to-green-600 h-3 rounded-full"
              />
            </div>
          </div>

          {!syncing && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{successCount}</div>
                <div className="text-sm text-slate-600">Exitosos</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-red-600">{errorCount}</div>
                <div className="text-sm text-slate-600">Errores</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">1.2k</div>
                <div className="text-sm text-slate-600">Datos Nuevos</div>
              </div>
            </div>
          )}

          <div className="max-h-[400px] overflow-y-auto space-y-2">
            {clients.slice(0, progress).map((client, i) => (
              <div key={client.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={client.avatar} alt={client.clientName} className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium">{client.clientName}</span>
                </div>
                {i < progress - 1 ? (
                  client.syncStatus === 'error' ? (
                    <span className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Error
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Completado
                    </span>
                  )
                ) : (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="w-4 h-4 text-blue-600" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {!syncing && (
          <div className="p-6 border-t border-slate-200">
            <button
              onClick={onClose}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Componentes auxiliares pequeños
const MetricCard: React.FC<{
  icon: any;
  label: string;
  value: string;
  color: string;
}> = ({ icon: Icon, label, value, color }) => {
  const colors = {
    blue: 'text-blue-600 bg-blue-100',
    green: 'text-green-600 bg-green-100',
    orange: 'text-orange-600 bg-orange-100',
    purple: 'text-purple-600 bg-purple-100',
    red: 'text-red-600 bg-red-100',
    indigo: 'text-indigo-600 bg-indigo-100'
  };

  return (
    <div className="bg-slate-50 rounded-xl p-4">
      <div className={`w-10 h-10 rounded-lg ${colors[color as keyof typeof colors]} flex items-center justify-center mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-sm text-slate-600 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

const SleepPhase: React.FC<{
  label: string;
  hours: number;
  color: string;
}> = ({ label, hours, color }) => {
  const percentage = (hours / 7.2) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-slate-600">{hours}h</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

export default DispositivosConectadosPage;
