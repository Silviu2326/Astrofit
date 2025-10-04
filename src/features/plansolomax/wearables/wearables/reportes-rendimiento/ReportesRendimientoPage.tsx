import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Clock,
  Search,
  ChevronRight,
  ChevronLeft,
  Download,
  Mail,
  Share2,
  Check,
  Calendar,
  Users,
  Activity,
  Moon,
  Heart,
  TrendingUp,
  Target,
  Award,
  Settings,
  Copy,
  Edit,
  Trash2,
  Eye,
  ZoomIn,
  ZoomOut,
  Layout,
  Palette,
  Type,
  Image as ImageIcon,
  Send,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  Filter,
} from 'lucide-react';

// Types
interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
  device: string;
  deviceConnected: boolean;
}

interface Template {
  id: string;
  name: string;
  description: string;
  pages: number;
  sections: string[];
  thumbnail: string;
  category: string;
}

interface ReportSection {
  id: string;
  name: string;
  icon: any;
  included: boolean;
  description: string;
}

interface GeneratedReport {
  id: string;
  clientId: string;
  clientName: string;
  period: string;
  template: string;
  format: string;
  status: 'pending' | 'sent' | 'downloaded';
  createdAt: string;
  openedAt?: string;
}

interface ScheduledReport {
  id: string;
  clientIds: string[];
  templateId: string;
  frequency: string;
  nextRun: string;
  autoSend: boolean;
  active: boolean;
}

// Mock Data
const mockClients: Client[] = [
  { id: '1', name: 'Ana García', email: 'ana@example.com', avatar: 'AG', device: 'Garmin Fenix 7', deviceConnected: true },
  { id: '2', name: 'Carlos Ruiz', email: 'carlos@example.com', avatar: 'CR', device: 'Apple Watch Ultra', deviceConnected: true },
  { id: '3', name: 'María López', email: 'maria@example.com', avatar: 'ML', device: 'Fitbit Charge 6', deviceConnected: true },
  { id: '4', name: 'Juan Pérez', email: 'juan@example.com', avatar: 'JP', device: 'Polar Vantage V3', deviceConnected: false },
  { id: '5', name: 'Laura Martínez', email: 'laura@example.com', avatar: 'LM', device: 'Garmin Forerunner 965', deviceConnected: true },
];

const mockTemplates: Template[] = [
  {
    id: 'weekly-basic',
    name: 'Reporte Semanal Básico',
    description: 'Resumen de actividad, pasos, calorías, sueño y entrenamientos',
    pages: 2,
    sections: ['Resumen Ejecutivo', 'Análisis de Actividad', 'Entrenamientos'],
    thumbnail: '📊',
    category: 'basic',
  },
  {
    id: 'monthly-complete',
    name: 'Reporte Mensual Completo',
    description: 'Análisis detallado de 4 semanas con tendencias y recomendaciones',
    pages: 6,
    sections: ['Portada', 'Resumen', 'Actividad', 'Entrenamientos', 'Sueño', 'HR', 'Comparativa', 'Recomendaciones'],
    thumbnail: '📈',
    category: 'complete',
  },
  {
    id: 'performance-athletic',
    name: 'Reporte de Rendimiento Atlético',
    description: 'Enfocado en entrenamientos, HR zones, VO2 max y recuperación',
    pages: 4,
    sections: ['Entrenamientos', 'HR Zones', 'Métricas Avanzadas', 'PRs', 'Recomendaciones'],
    thumbnail: '🏃',
    category: 'athletic',
  },
  {
    id: 'health-wellness',
    name: 'Reporte de Salud y Bienestar',
    description: 'Enfoque en sueño, estrés, recuperación y balance vida-entrenamiento',
    pages: 3,
    sections: ['Análisis de Sueño', 'Recuperación', 'Estrés', 'Balance', 'Recomendaciones'],
    thumbnail: '🧘',
    category: 'wellness',
  },
  {
    id: 'progress-comparative',
    name: 'Reporte de Progreso Comparativo',
    description: 'Comparar dos períodos, mejoras y áreas de oportunidad',
    pages: 4,
    sections: ['Comparativa', 'Mejoras', 'Áreas de Oportunidad', 'Objetivos'],
    thumbnail: '📊',
    category: 'progress',
  },
  {
    id: 'custom-blank',
    name: 'Plantilla Vacía (Personalizar)',
    description: 'Crear reporte desde cero seleccionando secciones',
    pages: 0,
    sections: [],
    thumbnail: '✏️',
    category: 'custom',
  },
];

const availableSections: ReportSection[] = [
  { id: 'cover', name: 'Portada con foto del cliente', icon: ImageIcon, included: true, description: 'Portada profesional con branding' },
  { id: 'summary', name: 'Resumen Ejecutivo', icon: FileText, included: true, description: 'KPIs destacados del período' },
  { id: 'activity', name: 'Análisis de Actividad', icon: Activity, included: true, description: 'Pasos, calorías, distancia' },
  { id: 'workouts', name: 'Análisis de Entrenamientos', icon: TrendingUp, included: true, description: 'Frecuencia, duración, tipo' },
  { id: 'sleep', name: 'Análisis de Sueño', icon: Moon, included: true, description: 'Horas, calidad, patrones' },
  { id: 'heart-rate', name: 'Frecuencia Cardíaca', icon: Heart, included: true, description: 'Zonas, reposo, máxima' },
  { id: 'advanced', name: 'Métricas Avanzadas', icon: BarChart3, included: false, description: 'VO2 max, HRV, recuperación' },
  { id: 'comparative-period', name: 'Comparativa con Período Anterior', icon: LineChart, included: false, description: 'Evolución vs período pasado' },
  { id: 'comparative-goals', name: 'Comparativa con Objetivos', icon: Target, included: true, description: 'Progreso hacia metas' },
  { id: 'achievements', name: 'Rankings y Logros', icon: Award, included: false, description: 'Badges y récords personales' },
  { id: 'trends', name: 'Gráficos de Tendencias', icon: TrendingUp, included: true, description: 'Evolución temporal' },
  { id: 'ai-insights', name: 'Insights y Análisis IA', icon: Activity, included: false, description: 'Análisis inteligente de patrones' },
  { id: 'recommendations', name: 'Recomendaciones Personalizadas', icon: FileText, included: true, description: 'Consejos del entrenador' },
  { id: 'next-goals', name: 'Objetivos para Próximo Período', icon: Target, included: true, description: 'Metas futuras' },
];

const mockGeneratedReports: GeneratedReport[] = [
  { id: '1', clientId: '1', clientName: 'Ana García', period: '1-7 Ene 2025', template: 'Semanal Básico', format: 'PDF', status: 'sent', createdAt: '2025-01-08', openedAt: '2025-01-08' },
  { id: '2', clientId: '2', clientName: 'Carlos Ruiz', period: 'Diciembre 2024', template: 'Mensual Completo', format: 'PDF', status: 'downloaded', createdAt: '2025-01-02' },
  { id: '3', clientId: '3', clientName: 'María López', period: '15-21 Ene 2025', template: 'Salud y Bienestar', format: 'PDF', status: 'sent', createdAt: '2025-01-22', openedAt: '2025-01-22' },
  { id: '4', clientId: '1', clientName: 'Ana García', period: 'Diciembre 2024', template: 'Progreso Comparativo', format: 'PDF', status: 'downloaded', createdAt: '2025-01-05' },
  { id: '5', clientId: '5', clientName: 'Laura Martínez', period: '1-14 Ene 2025', template: 'Rendimiento Atlético', format: 'PDF', status: 'pending', createdAt: '2025-01-15' },
];

const mockScheduledReports: ScheduledReport[] = [
  { id: '1', clientIds: ['1', '2', '3'], templateId: 'weekly-basic', frequency: 'Semanal (Lunes)', nextRun: '2025-02-03', autoSend: true, active: true },
  { id: '2', clientIds: ['5'], templateId: 'performance-athletic', frequency: 'Mensual (día 1)', nextRun: '2025-02-01', autoSend: true, active: true },
  { id: '3', clientIds: ['1', '3', '4'], templateId: 'monthly-complete', frequency: 'Mensual (día 1)', nextRun: '2025-02-01', autoSend: false, active: false },
];

const ReportesRendimientoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'nuevo' | 'plantillas' | 'historial' | 'programados' | 'analytics'>('nuevo');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('last-week');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [sections, setSections] = useState<ReportSection[]>(availableSections);
  const [reportStyle, setReportStyle] = useState('professional');
  const [trainerMessage, setTrainerMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [pdfZoom, setPdfZoom] = useState(100);
  const [searchClient, setSearchClient] = useState('');
  const [historialFilter, setHistorialFilter] = useState('');

  const totalSteps = 6;

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const steps = [
      { message: 'Recopilando datos...', progress: 20 },
      { message: 'Generando gráficos...', progress: 40 },
      { message: 'Aplicando diseño...', progress: 60 },
      { message: 'Creando PDF...', progress: 80 },
      { message: 'Finalizando...', progress: 100 },
    ];

    let currentStepIndex = 0;
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setGenerationProgress(steps[currentStepIndex].progress);
        currentStepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsGenerating(false);
          setShowPreview(true);
        }, 500);
      }
    }, 800);
  };

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchClient.toLowerCase())
  );

  const filteredHistory = mockGeneratedReports.filter(report =>
    report.clientName.toLowerCase().includes(historialFilter.toLowerCase()) ||
    report.template.toLowerCase().includes(historialFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-fuchsia-50/30 p-6">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <BarChart3 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Reportes de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Rendimiento</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-pink-100 max-w-3xl leading-relaxed">
            Analiza el progreso de tus clientes <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">en profundidad</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Análisis Avanzado</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <FileText className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Reportes PDF</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Métricas en Tiempo Real</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Clientes con Mejora', value: '87%', icon: TrendingUp, color: 'from-green-500 to-emerald-600', change: '+12%' },
          { label: 'VO2 Max Promedio', value: '52', icon: Activity, color: 'from-rose-500 to-pink-600', change: '+3' },
          { label: 'Recuperación Promedio', value: '84%', icon: Heart, color: 'from-purple-500 to-fuchsia-600', change: '+8%' },
          { label: 'Adherencia Entrenamientos', value: '92%', icon: Award, color: 'from-orange-500 to-rose-600', change: '+5%' },
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.label}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Header de Acciones */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveTab('nuevo'); setCurrentStep(1); }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Nuevo Reporte
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('historial')}
              className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl text-slate-700 rounded-xl shadow hover:shadow-lg transition-all border border-white/50"
            >
              <Clock className="w-5 h-5" />
              Historial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('analytics')}
              className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl text-slate-700 rounded-xl shadow hover:shadow-lg transition-all border border-white/50"
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </motion.button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-4 mt-6 border-b border-rose-200">
          {[
            { id: 'nuevo', label: 'Nuevo Reporte', icon: Plus },
            { id: 'plantillas', label: 'Mis Plantillas', icon: Layout },
            { id: 'historial', label: 'Historial', icon: Clock },
            { id: 'programados', label: 'Reportes Automáticos', icon: RefreshCw },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-rose-600 text-rose-600 font-semibold'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'nuevo' && (
          <motion.div
            key="nuevo"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Wizard Progress */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl mb-6 border border-white/50">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4, 5, 6].map(step => (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                          currentStep >= step
                            ? 'bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600 text-white shadow-lg'
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        {currentStep > step ? <Check className="w-5 h-5" /> : step}
                      </motion.div>
                      <span className="text-xs mt-2 text-slate-600 text-center font-medium">
                        {step === 1 && 'Cliente y Período'}
                        {step === 2 && 'Plantilla'}
                        {step === 3 && 'Contenido'}
                        {step === 4 && 'Diseño'}
                        {step === 5 && 'Personalizar'}
                        {step === 6 && 'Preview'}
                      </span>
                    </div>
                    {step < 6 && (
                      <div
                        className={`h-1 flex-1 mx-2 rounded transition-all ${
                          currentStep > step ? 'bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Cliente y Período */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Seleccionar Cliente y Período</h2>

                {/* Cliente Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Cliente</label>
                  <div className="relative mb-4">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar cliente..."
                      value={searchClient}
                      onChange={(e) => setSearchClient(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {filteredClients.map(client => (
                      <motion.div
                        key={client.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedClient(client)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedClient?.id === client.id
                            ? 'border-rose-600 bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                            {client.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-slate-900">{client.name}</div>
                            <div className="text-sm text-slate-600">{client.device}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <div className={`w-2 h-2 rounded-full ${client.deviceConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                              <span className="text-xs text-slate-500">
                                {client.deviceConnected ? 'Conectado' : 'Desconectado'}
                              </span>
                            </div>
                          </div>
                          {selectedClient?.id === client.id && (
                            <Check className="w-6 h-6 text-rose-600" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Período Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Período del Reporte</label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'last-week', label: 'Última semana', days: 7 },
                      { id: 'last-2-weeks', label: 'Últimas 2 semanas', days: 14 },
                      { id: 'last-month', label: 'Último mes', days: 30 },
                      { id: 'last-3-months', label: 'Últimos 3 meses', days: 90 },
                      { id: 'custom', label: 'Personalizado', days: null },
                    ].map(period => (
                      <motion.button
                        key={period.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPeriod(period.id)}
                        className={`p-4 border-2 rounded-xl transition-all text-left ${
                          selectedPeriod === period.id
                            ? 'border-rose-600 bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-rose-600" />
                          <span className="font-semibold text-slate-900">{period.label}</span>
                        </div>
                        {period.days && (
                          <span className="text-xs text-slate-600">{period.days} días</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Vista previa de datos */}
                {selectedClient && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6"
                  >
                    <h3 className="font-semibold text-slate-900 mb-4">Vista Previa de Datos Disponibles</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">28</div>
                        <div className="text-sm text-slate-600">Días con datos completos</div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">Actividad diaria</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">Entrenamientos</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">Sueño</span>
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">Frecuencia cardíaca</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">VO2 max</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-slate-700">HRV</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-end gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(2)}
                    disabled={!selectedClient || !selectedPeriod}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Seleccionar Plantilla */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Seleccionar Plantilla</h2>

                <div className="grid grid-cols-3 gap-6">
                  {mockTemplates.map(template => (
                    <motion.div
                      key={template.id}
                      whileHover={{ scale: 1.03, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTemplate(template)}
                      className={`border-2 rounded-xl cursor-pointer transition-all overflow-hidden ${
                        selectedTemplate?.id === template.id
                          ? 'border-rose-600 shadow-xl'
                          : 'border-slate-200 hover:border-slate-300 shadow-lg'
                      }`}
                    >
                      <div className="bg-gradient-to-br from-rose-50 to-fuchsia-50 p-8 flex items-center justify-center text-6xl">
                        {template.thumbnail}
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-slate-900 mb-2">{template.name}</h3>
                        <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                          <span>{template.pages} páginas</span>
                          <span>{template.sections.length} secciones</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {template.sections.slice(0, 3).map((section, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {section}
                            </span>
                          ))}
                          {template.sections.length > 3 && (
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                              +{template.sections.length - 3}
                            </span>
                          )}
                        </div>
                        {selectedTemplate?.id === template.id && (
                          <div className="mt-4 flex items-center gap-2 text-rose-600">
                            <Check className="w-5 h-5" />
                            <span className="font-semibold">Seleccionada</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(1)}
                    className="flex items-center gap-2 px-8 py-3 bg-white/80 backdrop-blur-xl text-slate-700 rounded-xl shadow hover:shadow-lg transition-all border border-white/50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(3)}
                    disabled={!selectedTemplate}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Personalizar Contenido */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Personalizar Contenido</h2>
                <p className="text-slate-600 mb-6">Selecciona las secciones que deseas incluir en el reporte</p>

                <div className="grid grid-cols-2 gap-4">
                  {sections.map(section => (
                    <motion.div
                      key={section.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 border-2 rounded-xl transition-all ${
                        section.included
                          ? 'border-rose-600 bg-gradient-to-br from-rose-50 to-pink-50'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={section.included}
                          onChange={() => {
                            setSections(sections.map(s =>
                              s.id === section.id ? { ...s, included: !s.included } : s
                            ));
                          }}
                          className="mt-1 w-5 h-5 text-rose-600 rounded focus:ring-2 focus:ring-rose-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <section.icon className="w-4 h-4 text-rose-600" />
                            <span className="font-semibold text-slate-900">{section.name}</span>
                          </div>
                          <p className="text-sm text-slate-600">{section.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(2)}
                    className="flex items-center gap-2 px-8 py-3 bg-white/80 backdrop-blur-xl text-slate-700 rounded-xl shadow hover:shadow-lg transition-all border border-white/50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(4)}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Configurar Diseño */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Configurar Diseño</h2>

                <div className="space-y-6">
                  {/* Estilo del Reporte */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Estilo del Reporte</label>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { id: 'professional', name: 'Profesional', colors: 'from-rose-500 via-pink-600 to-fuchsia-700' },
                        { id: 'sporty', name: 'Deportivo', colors: 'from-orange-500 to-red-600' },
                        { id: 'minimal', name: 'Minimalista', colors: 'from-slate-700 to-slate-900' },
                        { id: 'elegant', name: 'Elegante', colors: 'from-purple-500 to-pink-600' },
                      ].map(style => (
                        <motion.button
                          key={style.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setReportStyle(style.id)}
                          className={`p-4 border-2 rounded-xl transition-all ${
                            reportStyle === style.id
                              ? 'border-rose-600 shadow-lg'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-full h-20 bg-gradient-to-br ${style.colors} rounded-lg mb-3`} />
                          <span className="font-semibold text-slate-900">{style.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Personalización */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        <Palette className="w-4 h-4 inline mr-2" />
                        Color Principal
                      </label>
                      <input
                        type="color"
                        className="w-full h-12 border-2 border-slate-300 rounded-xl cursor-pointer"
                        defaultValue="#3B82F6"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        <Type className="w-4 h-4 inline mr-2" />
                        Tipografía
                      </label>
                      <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Inter (Moderna)</option>
                        <option>Roboto (Clásica)</option>
                        <option>Montserrat (Elegante)</option>
                        <option>Open Sans (Limpia)</option>
                      </select>
                    </div>
                  </div>

                  {/* Opciones */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-all">
                      <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" defaultChecked />
                      <div>
                        <div className="font-semibold text-slate-900">Incluir logo del entrenador</div>
                        <div className="text-sm text-slate-600">Mostrar tu marca en todas las páginas</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-all">
                      <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                      <div>
                        <div className="font-semibold text-slate-900">Incluir fotos del cliente</div>
                        <div className="text-sm text-slate-600">Personalizar con imágenes</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-xl cursor-pointer hover:border-slate-300 transition-all">
                      <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" defaultChecked />
                      <div>
                        <div className="font-semibold text-slate-900">Incluir marca de agua</div>
                        <div className="text-sm text-slate-600">Proteger el documento</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(3)}
                    className="flex items-center gap-2 px-8 py-3 bg-white/80 backdrop-blur-xl text-slate-700 rounded-xl shadow hover:shadow-lg transition-all border border-white/50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(5)}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Siguiente
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Contenido Personalizado */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Añadir Contenido Personalizado</h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Mensaje del Entrenador</label>
                    <textarea
                      value={trainerMessage}
                      onChange={(e) => setTrainerMessage(e.target.value)}
                      placeholder="Escribe un mensaje personalizado para tu cliente..."
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-32"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Recomendaciones Principales</label>
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <input
                          key={i}
                          type="text"
                          placeholder={`Recomendación ${i}...`}
                          className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Objetivos para Próximo Período</label>
                    <div className="space-y-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          <input
                            type="text"
                            placeholder={`Objetivo ${i}...`}
                            className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(4)}
                    className="flex items-center gap-2 px-8 py-3 bg-white/80 backdrop-blur-xl text-slate-700 rounded-xl shadow hover:shadow-lg transition-all border border-white/50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(6)}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Ver Preview
                    <Eye className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Preview y Generación */}
            {currentStep === 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Preview del Reporte</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPdfZoom(Math.max(50, pdfZoom - 10))}
                      className="p-2 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      <ZoomOut className="w-5 h-5 text-slate-700" />
                    </button>
                    <span className="text-sm text-slate-600 px-3">{pdfZoom}%</span>
                    <button
                      onClick={() => setPdfZoom(Math.min(150, pdfZoom + 10))}
                      className="p-2 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-all"
                    >
                      <ZoomIn className="w-5 h-5 text-slate-700" />
                    </button>
                  </div>
                </div>

                {/* PDF Preview Mockup */}
                <div className="bg-slate-100 rounded-xl p-8 mb-6 overflow-auto max-h-96">
                  <div
                    className="bg-white shadow-2xl mx-auto rounded-lg overflow-hidden"
                    style={{ width: `${pdfZoom}%`, maxWidth: '800px' }}
                  >
                    {/* Portada */}
                    <div className={`p-12 bg-gradient-to-br ${reportStyle === 'professional' ? 'from-rose-600 via-pink-600 to-fuchsia-600' : reportStyle === 'sporty' ? 'from-orange-500 to-red-600' : reportStyle === 'minimal' ? 'from-slate-700 to-slate-900' : 'from-purple-500 to-pink-600'} text-white text-center`}>
                      <div className="text-6xl font-bold mb-4">📊</div>
                      <h1 className="text-4xl font-bold mb-2">Reporte de Rendimiento</h1>
                      <p className="text-2xl mb-8">{selectedClient?.name}</p>
                      <p className="text-lg opacity-90">Período: {selectedPeriod === 'last-week' ? 'Última semana' : selectedPeriod === 'last-month' ? 'Último mes' : 'Personalizado'}</p>
                      <p className="text-sm opacity-75 mt-4">Generado el 30 de Septiembre, 2025</p>
                    </div>

                    {/* Resumen Ejecutivo */}
                    <div className="p-12 border-b-4 border-slate-200">
                      <h2 className="text-3xl font-bold text-slate-900 mb-6">Resumen Ejecutivo</h2>
                      {trainerMessage && (
                        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-lg mb-6">
                          <p className="text-slate-700">{trainerMessage}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gradient-to-br from-rose-50 to-pink-100 p-6 rounded-xl">
                          <div className="text-4xl font-bold text-rose-600 mb-2">142,856</div>
                          <div className="text-slate-700">Pasos Totales</div>
                          <div className="text-sm text-green-600 mt-2">↑ 12% vs anterior</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-fuchsia-100 p-6 rounded-xl">
                          <div className="text-4xl font-bold text-purple-600 mb-2">18</div>
                          <div className="text-slate-700">Entrenamientos</div>
                          <div className="text-sm text-green-600 mt-2">↑ 3 más que antes</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl">
                          <div className="text-4xl font-bold text-green-600 mb-2">7.5h</div>
                          <div className="text-slate-700">Sueño Promedio</div>
                          <div className="text-sm text-green-600 mt-2">Óptimo ✓</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-rose-100 p-6 rounded-xl">
                          <div className="text-4xl font-bold text-orange-600 mb-2">3,240</div>
                          <div className="text-slate-700">Calorías Quemadas</div>
                          <div className="text-sm text-green-600 mt-2">↑ 8% vs objetivo</div>
                        </div>
                      </div>
                    </div>

                    {/* Más páginas simuladas */}
                    <div className="p-12 bg-slate-50">
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">Análisis de Actividad</h2>
                      <div className="bg-white p-6 rounded-xl mb-4">
                        <div className="h-48 bg-gradient-to-r from-rose-200 to-fuchsia-200 rounded-lg flex items-end justify-around p-4">
                          {[70, 90, 65, 100, 85, 75, 95].map((height, i) => (
                            <div key={i} className="bg-gradient-to-t from-rose-600 via-pink-600 to-fuchsia-600 rounded-t" style={{ width: '12%', height: `${height}%` }} />
                          ))}
                        </div>
                        <p className="text-center text-slate-600 mt-4">Pasos por día</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Opciones de Generación */}
                <div className="bg-slate-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Opciones de Generación</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Formato</label>
                      <select className="w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                        <option>PDF (recomendado)</option>
                        <option>Word (.docx)</option>
                        <option>PowerPoint (.pptx)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-700 mb-2">Calidad</label>
                      <select className="w-full px-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                        <option>Alta (mejor calidad)</option>
                        <option>Media (balance)</option>
                        <option>Baja (menor tamaño)</option>
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 p-4 border-2 border-slate-300 rounded-xl cursor-pointer hover:border-slate-400 transition-all">
                        <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                        <span className="text-sm text-slate-700">Incluir datos raw (Excel)</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(5)}
                    className="flex items-center gap-2 px-8 py-3 bg-white/80 backdrop-blur-xl text-slate-700 rounded-xl shadow hover:shadow-lg transition-all border border-white/50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Anterior
                  </motion.button>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl text-slate-700 rounded-xl shadow hover:shadow-lg transition-all border border-white/50"
                    >
                      <Edit className="w-5 h-5" />
                      Editar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGenerateReport}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                      <FileText className="w-5 h-5" />
                      Generar Reporte
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Historial Tab */}
        {activeTab === 'historial' && (
          <motion.div
            key="historial"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Historial de Reportes</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar reportes..."
                  value={historialFilter}
                  onChange={(e) => setHistorialFilter(e.target.value)}
                  className="pl-12 pr-4 py-2 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredHistory.map(report => (
                <motion.div
                  key={report.id}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 border-2 border-slate-200 rounded-xl hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{report.clientName}</div>
                        <div className="text-sm text-slate-600">
                          {report.period} • {report.template} • {report.format}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-500">Creado: {report.createdAt}</span>
                          {report.status === 'sent' && report.openedAt && (
                            <span className="text-xs text-green-600">• Abierto: {report.openedAt}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        report.status === 'sent' ? 'bg-green-100 text-green-700' :
                        report.status === 'downloaded' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {report.status === 'sent' ? 'Enviado' : report.status === 'downloaded' ? 'Descargado' : 'Pendiente'}
                      </span>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                        <Eye className="w-5 h-5 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                        <Download className="w-5 h-5 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                        <Mail className="w-5 h-5 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reportes Programados Tab */}
        {activeTab === 'programados' && (
          <motion.div
            key="programados"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Reportes Automáticos</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                Nueva Programación
              </motion.button>
            </div>

            <div className="space-y-4">
              {mockScheduledReports.map(scheduled => (
                <motion.div
                  key={scheduled.id}
                  whileHover={{ scale: 1.01 }}
                  className="p-6 border-2 border-slate-200 rounded-xl hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <RefreshCw className={`w-5 h-5 ${scheduled.active ? 'text-green-600' : 'text-slate-400'}`} />
                        <span className="font-semibold text-slate-900">{scheduled.frequency}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          scheduled.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {scheduled.active ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 mb-2">
                        Plantilla: {mockTemplates.find(t => t.id === scheduled.templateId)?.name}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {scheduled.clientIds.length} clientes
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Próxima: {scheduled.nextRun}
                        </span>
                        {scheduled.autoSend && (
                          <span className="flex items-center gap-1 text-blue-600">
                            <Mail className="w-4 h-4" />
                            Envío automático
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-all">
                        <Edit className="w-5 h-5 text-slate-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Reportes Generados', value: '147', icon: FileText, color: 'from-rose-500 to-pink-600' },
                { label: 'Clientes Activos', value: '28', icon: Users, color: 'from-purple-500 to-fuchsia-600' },
                { label: 'Tasa de Apertura', value: '94%', icon: Eye, color: 'from-green-500 to-emerald-600' },
                { label: 'Downloads Totales', value: '312', icon: Download, color: 'from-orange-500 to-rose-600' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 relative overflow-hidden group"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50">
                <h3 className="font-bold text-slate-900 mb-4">Reportes por Mes</h3>
                <div className="h-64 bg-gradient-to-t from-rose-50 to-transparent rounded-xl flex items-end justify-around p-4">
                  {[45, 62, 58, 71, 68, 79, 85, 92, 88, 95, 98, 100].map((height, i) => (
                    <div key={i} className="bg-gradient-to-t from-rose-600 via-pink-600 to-fuchsia-600 rounded-t" style={{ width: '7%', height: `${height}%` }} />
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50">
                <h3 className="font-bold text-slate-900 mb-4">Plantillas Más Usadas</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Mensual Completo', count: 45, percent: 30 },
                    { name: 'Semanal Básico', count: 38, percent: 26 },
                    { name: 'Rendimiento Atlético', count: 32, percent: 22 },
                    { name: 'Salud y Bienestar', count: 22, percent: 15 },
                    { name: 'Progreso Comparativo', count: 10, percent: 7 },
                  ].map((template, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-700">{template.name}</span>
                        <span className="font-semibold text-slate-900">{template.count}</span>
                      </div>
                      <div className="h-2 bg-rose-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${template.percent}%` }}
                          transition={{ delay: i * 0.1, duration: 1 }}
                          className="h-full bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Generación */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <FileText className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Generando reporte...</h3>
                <p className="text-slate-600 mb-6">
                  {generationProgress < 20 && 'Recopilando datos...'}
                  {generationProgress >= 20 && generationProgress < 40 && 'Generando gráficos...'}
                  {generationProgress >= 40 && generationProgress < 60 && 'Aplicando diseño...'}
                  {generationProgress >= 60 && generationProgress < 80 && 'Creando PDF...'}
                  {generationProgress >= 80 && 'Finalizando...'}
                </p>
                <div className="w-full h-2 bg-rose-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${generationProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="text-sm text-slate-600 mt-2">{generationProgress}%</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Éxito */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">¡Reporte generado exitosamente!</h3>
                <p className="text-slate-600">Tu reporte está listo para descargar o compartir</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-600 rounded-lg flex items-center justify-center shadow-lg">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Reporte_{selectedClient?.name.replace(' ', '_')}.pdf</div>
                      <div className="text-sm text-slate-600">2.4 MB • 12 páginas</div>
                    </div>
                  </div>
                  <Eye className="w-6 h-6 text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowPreview(false)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Download className="w-5 h-5" />
                  Descargar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setShowPreview(false); setShowEmailModal(true); }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-fuchsia-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Mail className="w-5 h-5" />
                  Enviar Email
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setShowPreview(false); setShowShareModal(true); }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl text-slate-700 rounded-xl shadow hover:shadow-lg transition-all border border-white/50"
                >
                  <Share2 className="w-5 h-5" />
                  Compartir Link
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setShowPreview(false); setCurrentStep(1); setSelectedClient(null); setSelectedTemplate(null); }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-xl text-slate-700 rounded-xl shadow hover:shadow-lg transition-all border border-white/50"
                >
                  <Plus className="w-5 h-5" />
                  Generar Otro
                </motion.button>
              </div>

              <button
                onClick={() => setShowPreview(false)}
                className="w-full text-center text-slate-600 hover:text-slate-900 transition-all"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Email */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Enviar Reporte por Email</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Para:</label>
                  <input
                    type="email"
                    value={selectedClient?.email || ''}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Asunto:</label>
                  <input
                    type="text"
                    defaultValue={`Tu Reporte de Rendimiento - ${selectedPeriod}`}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Mensaje:</label>
                  <textarea
                    defaultValue={`Hola ${selectedClient?.name},\n\nAdjunto encontrarás tu reporte de rendimiento del período ${selectedPeriod}. Revísalo y si tienes cualquier duda, no dudes en contactarme.\n\n¡Sigue así!\n\nSaludos`}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-32"
                  />
                </div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" defaultChecked />
                  <span className="text-sm text-slate-700">Adjuntar reporte PDF</span>
                </label>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 px-6 py-3 bg-white/80 backdrop-blur-xl text-slate-700 rounded-xl shadow hover:shadow-lg transition-all border border-white/50"
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setShowEmailModal(false); alert('Email enviado exitosamente!'); }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Send className="w-5 h-5" />
                  Enviar Ahora
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Compartir */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Compartir Reporte</h3>

              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value="https://reports.app/r/abc123xyz"
                    readOnly
                    className="flex-1 px-4 py-2 bg-white border-2 border-slate-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => alert('Link copiado al portapapeles!')}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600">Este link expira en 30 días</p>
              </div>

              <div className="space-y-3 mb-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                  <span className="text-sm text-slate-700">Proteger con contraseña</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" defaultChecked />
                  <span className="text-sm text-slate-700">Permitir descarga</span>
                </label>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 text-center mb-6">
                <div className="text-6xl mb-3">📱</div>
                <p className="text-sm text-slate-600">Escanea el QR para compartir</p>
              </div>

              <button
                onClick={() => setShowShareModal(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportesRendimientoPage;
