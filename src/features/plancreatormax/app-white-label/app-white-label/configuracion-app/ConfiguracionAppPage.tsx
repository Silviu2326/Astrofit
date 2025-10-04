import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone, Star, Users, Download, TrendingUp, CheckCircle,
  Image as ImageIcon, Palette, Type, Zap, Bell, CreditCard,
  Globe, Calendar, MessageCircle, Award, Apple, Play, Upload,
  Eye, Code, Shield, Settings, Clock, Package, ChevronRight,
  Sparkles, Layout, Navigation, FileText, Database, Cpu,
  Link as LinkIcon, BarChart, AlertCircle, Check, X
} from 'lucide-react';

// Tipos
type TabType = 'general' | 'branding' | 'funcionalidades' | 'navegacion' | 'publicacion' | 'politicas' | 'avanzado' | 'build' | 'versiones';
type BuildStatus = 'idle' | 'validating' | 'generating' | 'compiling' | 'packaging' | 'uploading' | 'completed' | 'error';

interface AppConfig {
  nombre: string;
  empresa: string;
  descripcionCorta: string;
  descripcionLarga: string;
  categoria: string;
  idiomas: string[];
  pais: string;
  colorPrimario: string;
  colorSecundario: string;
  colorAcento: string;
  fuente: string;
  splashLogo: string;
  splashBg: string;
  splashAnimacion: string;
  packageName: string;
  bundleId: string;
}

interface AppStats {
  appsGeneradas: number;
  descargas: number;
  usuariosActivos: number;
  rating: number;
}

interface Funcionalidad {
  id: string;
  nombre: string;
  descripcion: string;
  activa: boolean;
  impactoTamano: string;
  icono: React.FC<any>;
}

interface NavItem {
  id: string;
  label: string;
  icono: string;
  visible: boolean;
  orden: number;
}

interface Version {
  numero: string;
  fecha: string;
  changelog: string[];
  estado: string;
}

const ConfiguracionAppPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [buildStatus, setBuildStatus] = useState<BuildStatus>('idle');
  const [buildProgress, setBuildProgress] = useState(0);

  // Mock data - Apps configuradas
  const mockApps = [
    { id: 1, nombre: 'FitPro Coach', empresa: 'GymMaster', downloads: 12500, rating: 4.8 },
    { id: 2, nombre: 'NutriPlan+', empresa: 'HealthyLife', downloads: 8900, rating: 4.6 },
    { id: 3, nombre: 'Workout Buddy', empresa: 'FitnessPro', downloads: 15300, rating: 4.9 }
  ];

  // Estadísticas
  const stats: AppStats = {
    appsGeneradas: mockApps.length,
    descargas: mockApps.reduce((acc, app) => acc + app.downloads, 0),
    usuariosActivos: 8450,
    rating: 4.8
  };

  // Configuración de la app
  const [appConfig, setAppConfig] = useState<AppConfig>({
    nombre: 'FitPro Coach',
    empresa: 'GymMaster',
    descripcionCorta: 'Tu entrenador personal en el bolsillo',
    descripcionLarga: 'Entrena con planes personalizados, seguimiento de progreso y mucho más.',
    categoria: 'Salud y Fitness',
    idiomas: ['Español', 'Inglés'],
    pais: 'España',
    colorPrimario: '#6366f1',
    colorSecundario: '#8b5cf6',
    colorAcento: '#ec4899',
    fuente: 'Inter',
    splashLogo: '',
    splashBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    splashAnimacion: 'fade',
    packageName: 'com.gymmaster.fitprocoach',
    bundleId: 'com.gymmaster.fitprocoach'
  });

  // Funcionalidades disponibles
  const [funcionalidades, setFuncionalidades] = useState<Funcionalidad[]>([
    { id: 'social-login', nombre: 'Inicio de sesión social', descripcion: 'Google, Facebook, Apple', activa: true, impactoTamano: '+2MB', icono: Users },
    { id: 'workouts', nombre: 'Seguimiento de entrenamientos', descripcion: 'Registra y analiza entrenamientos', activa: true, impactoTamano: '+3MB', icono: TrendingUp },
    { id: 'nutrition', nombre: 'Planes nutricionales', descripcion: 'Dietas y recetas personalizadas', activa: true, impactoTamano: '+2.5MB', icono: Apple },
    { id: 'chat', nombre: 'Chat con entrenador', descripcion: 'Mensajería en tiempo real', activa: false, impactoTamano: '+1.8MB', icono: MessageCircle },
    { id: 'calendar', nombre: 'Calendario de citas', descripcion: 'Agenda y recordatorios', activa: true, impactoTamano: '+1.2MB', icono: Calendar },
    { id: 'payments', nombre: 'Pagos in-app', descripcion: 'Suscripciones y compras', activa: true, impactoTamano: '+1.5MB', icono: CreditCard },
    { id: 'notifications', nombre: 'Notificaciones push', descripcion: 'Alertas personalizadas', activa: true, impactoTamano: '+0.8MB', icono: Bell },
    { id: 'wearables', nombre: 'Wearables', descripcion: 'Apple Watch, Fitbit', activa: false, impactoTamano: '+2.2MB', icono: Smartphone },
    { id: 'community', nombre: 'Comunidad/Social feed', descripcion: 'Red social de usuarios', activa: false, impactoTamano: '+3.5MB', icono: Users },
    { id: 'gamification', nombre: 'Gamificación y logros', descripcion: 'Badges y rankings', activa: true, impactoTamano: '+1MB', icono: Award }
  ]);

  // Items de navegación
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: 'home', label: 'Inicio', icono: '🏠', visible: true, orden: 1 },
    { id: 'workouts', label: 'Entrenamientos', icono: '💪', visible: true, orden: 2 },
    { id: 'nutrition', label: 'Nutrición', icono: '🥗', visible: true, orden: 3 },
    { id: 'progress', label: 'Progreso', icono: '📊', visible: true, orden: 4 },
    { id: 'profile', label: 'Perfil', icono: '👤', visible: true, orden: 5 }
  ]);

  // Versiones
  const versiones: Version[] = [
    {
      numero: '1.2.0',
      fecha: '2024-01-15',
      changelog: ['Nueva función de chat', 'Mejoras en UI', 'Corrección de bugs'],
      estado: 'En tiendas'
    },
    {
      numero: '1.1.0',
      fecha: '2024-01-01',
      changelog: ['Integración con Apple Watch', 'Nuevo sistema de logros'],
      estado: 'Archivada'
    }
  ];

  // Progreso de completitud
  const calcularProgreso = () => {
    let completado = 0;
    let total = 8;

    if (appConfig.nombre) completado++;
    if (appConfig.descripcionCorta) completado++;
    if (appConfig.colorPrimario) completado++;
    if (funcionalidades.some(f => f.activa)) completado++;
    if (navItems.length > 0) completado++;
    if (appConfig.packageName) completado++;
    if (appConfig.bundleId) completado++;
    completado++; // Siempre hay algo configurado

    return Math.round((completado / total) * 100);
  };

  const progreso = calcularProgreso();

  // Tabs de navegación
  const tabs = [
    { id: 'general', label: 'Información General', icono: FileText },
    { id: 'branding', label: 'Branding y Diseño', icono: Palette },
    { id: 'funcionalidades', label: 'Funcionalidades', icono: Zap },
    { id: 'navegacion', label: 'Navegación', icono: Navigation },
    { id: 'publicacion', label: 'Publicación', icono: Upload },
    { id: 'politicas', label: 'Políticas', icono: Shield },
    { id: 'avanzado', label: 'Avanzado', icono: Settings },
    { id: 'build', label: 'Build', icono: Package },
    { id: 'versiones', label: 'Versiones', icono: Clock }
  ];

  // Iniciar build
  const startBuild = () => {
    setBuildStatus('validating');
    setBuildProgress(0);

    const steps: BuildStatus[] = ['validating', 'generating', 'compiling', 'packaging', 'uploading', 'completed'];
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setBuildStatus(steps[currentStep]);
        setBuildProgress((currentStep / (steps.length - 1)) * 100);
      } else {
        clearInterval(interval);
      }
    }, 2000);
  };

  const buildStepLabels = {
    idle: 'Listo para compilar',
    validating: 'Validando configuración...',
    generating: 'Generando assets...',
    compiling: 'Compilando código...',
    packaging: 'Creando paquetes...',
    uploading: 'Subiendo a stores...',
    completed: '¡Build completado!',
    error: 'Error en el build'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Texto */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Smartphone className="w-10 h-10 text-yellow-300 animate-pulse" />
                  <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Configuración de App <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">White Label</span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
                Tu app personalizada lista para publicar en <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">App Store</span> y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">Google Play</span>
              </p>

              {/* Pills de info */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span className="text-sm font-semibold text-white">Sin código</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-semibold text-white">100% personalizable</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <Clock className="w-5 h-5 text-blue-300" />
                  <span className="text-sm font-semibold text-white">Listo en minutos</span>
                </div>
              </div>
            </div>

            {/* Preview móvil animado */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative"
              >
                {/* Efecto glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-pink-300 rounded-3xl blur-3xl opacity-40"></div>

                {/* Mockup de móvil */}
                <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-white/20 backdrop-blur-xl w-72">
                  <div className="bg-white rounded-[2.5rem] h-[580px] overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-full z-10"></div>

                    {/* Contenido del móvil */}
                    <div className="relative h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-white text-center"
                      >
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-4 shadow-xl mx-auto">
                          <Sparkles className="w-12 h-12 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{appConfig.nombre}</h3>
                        <p className="text-purple-100 text-sm">{appConfig.descripcionCorta}</p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Apps Generadas', value: stats.appsGeneradas, icono: Package, color: 'from-blue-500 to-indigo-600', change: '+12' },
          { label: 'Descargas Totales', value: stats.descargas.toLocaleString(), icono: Download, color: 'from-emerald-500 to-teal-600', change: '+24' },
          { label: 'Usuarios Activos', value: stats.usuariosActivos.toLocaleString(), icono: Users, color: 'from-purple-500 to-pink-600', change: '+18' },
          { label: 'Rating Promedio', value: stats.rating.toFixed(1), icono: Star, color: 'from-orange-500 to-red-600', change: '+0.2', isRating: true }
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
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icono className="w-8 h-8" />
              </div>

              {/* Label */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.label}
              </p>

              {/* Valor */}
              <div className="flex items-end gap-2 mb-3">
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  {stat.value}
                </p>
                {stat.isRating && (
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(stats.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                )}
              </div>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* NAVEGACIÓN POR TABS + PROGRESO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-8"
      >
        {/* Barra de progreso */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-gray-700">Completitud de configuración</p>
            <p className="text-sm font-bold text-indigo-600">{progreso}%</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progreso}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative"
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icono className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* CONTENIDO DE TABS */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
      >
        {/* TAB: INFORMACIÓN GENERAL */}
        {activeTab === 'general' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Información General</h2>
                <p className="text-gray-600">Configuración básica de tu aplicación</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Formulario */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la App *</label>
                  <input
                    type="text"
                    value={appConfig.nombre}
                    onChange={(e) => setAppConfig({ ...appConfig, nombre: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    placeholder="ej. FitPro Coach"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la Empresa/Entrenador *</label>
                  <input
                    type="text"
                    value={appConfig.empresa}
                    onChange={(e) => setAppConfig({ ...appConfig, empresa: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    placeholder="ej. GymMaster"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Descripción Corta (App Store/Play Store) *</label>
                  <input
                    type="text"
                    value={appConfig.descripcionCorta}
                    onChange={(e) => setAppConfig({ ...appConfig, descripcionCorta: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    placeholder="ej. Tu entrenador personal en el bolsillo"
                    maxLength={80}
                  />
                  <p className="text-xs text-gray-500 mt-1">{appConfig.descripcionCorta.length}/80 caracteres</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Descripción Larga *</label>
                  <textarea
                    value={appConfig.descripcionLarga}
                    onChange={(e) => setAppConfig({ ...appConfig, descripcionLarga: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
                    placeholder="Describe tu app en detalle..."
                    rows={4}
                    maxLength={4000}
                  />
                  <p className="text-xs text-gray-500 mt-1">{appConfig.descripcionLarga.length}/4000 caracteres</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Categoría *</label>
                    <select
                      value={appConfig.categoria}
                      onChange={(e) => setAppConfig({ ...appConfig, categoria: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    >
                      <option>Salud y Fitness</option>
                      <option>Deportes</option>
                      <option>Estilo de vida</option>
                      <option>Educación</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">País/Región *</label>
                    <select
                      value={appConfig.pais}
                      onChange={(e) => setAppConfig({ ...appConfig, pais: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    >
                      <option>España</option>
                      <option>México</option>
                      <option>Argentina</option>
                      <option>Colombia</option>
                      <option>Estados Unidos</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Idiomas Soportados *</label>
                  <div className="flex flex-wrap gap-2">
                    {['Español', 'Inglés', 'Francés', 'Alemán', 'Portugués'].map((idioma) => (
                      <button
                        key={idioma}
                        onClick={() => {
                          const idiomas = appConfig.idiomas.includes(idioma)
                            ? appConfig.idiomas.filter(i => i !== idioma)
                            : [...appConfig.idiomas, idioma];
                          setAppConfig({ ...appConfig, idiomas });
                        }}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                          appConfig.idiomas.includes(idioma)
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {idioma}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-indigo-600" />
                    Preview en Store
                  </h3>

                  {/* Mockup de App Store */}
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl flex-shrink-0">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xl font-bold text-gray-900 truncate">{appConfig.nombre || 'Nombre de la App'}</h4>
                        <p className="text-sm text-gray-600">{appConfig.empresa || 'Empresa'}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">4.8 • 1.2K valoraciones</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="px-2 py-1 bg-gray-100 rounded-lg text-gray-600 font-medium">{appConfig.categoria}</div>
                        <div className="px-2 py-1 bg-gray-100 rounded-lg text-gray-600 font-medium">Nº 5 en su categoría</div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Globe className="w-3 h-3" />
                        <span>{appConfig.idiomas.join(', ') || 'Idiomas no seleccionados'}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">{appConfig.descripcionCorta || 'Descripción corta de la app...'}</p>

                    <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all">
                      Descargar
                    </button>
                  </div>

                  {/* Información adicional */}
                  <div className="mt-4 p-4 bg-white/50 rounded-xl">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>Tip:</strong> La descripción corta es crucial para la conversión. Debe ser clara, atractiva y mencionar el beneficio principal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: BRANDING Y DISEÑO */}
        {activeTab === 'branding' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-600 flex items-center justify-center text-white shadow-xl">
                <Palette className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Branding y Diseño</h2>
                <p className="text-gray-600">Personaliza la apariencia de tu app</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Configuración */}
              <div className="space-y-8">
                {/* Logo */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-indigo-600" />
                    Logo de la App
                  </h3>

                  <div className="border-2 border-dashed border-indigo-300 rounded-2xl p-8 text-center hover:border-indigo-500 transition-colors cursor-pointer bg-gradient-to-br from-indigo-50 to-purple-50">
                    <Upload className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-gray-700 mb-1">Arrastra tu logo o haz clic para subir</p>
                    <p className="text-xs text-gray-500">PNG, JPG o SVG • Min. 1024x1024px</p>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {['1024x1024', '512x512', '256x256', '128x128'].map((size) => (
                      <div key={size} className="text-center">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl aspect-square flex items-center justify-center mb-2 shadow-lg">
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-xs text-gray-600 font-medium">{size}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colores */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Palette className="w-5 h-5 text-pink-600" />
                    Colores de Marca
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Color Primario</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={appConfig.colorPrimario}
                          onChange={(e) => setAppConfig({ ...appConfig, colorPrimario: e.target.value })}
                          className="w-16 h-16 rounded-xl border-2 border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={appConfig.colorPrimario}
                          onChange={(e) => setAppConfig({ ...appConfig, colorPrimario: e.target.value })}
                          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Color Secundario</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={appConfig.colorSecundario}
                          onChange={(e) => setAppConfig({ ...appConfig, colorSecundario: e.target.value })}
                          className="w-16 h-16 rounded-xl border-2 border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={appConfig.colorSecundario}
                          onChange={(e) => setAppConfig({ ...appConfig, colorSecundario: e.target.value })}
                          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Color de Acento</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={appConfig.colorAcento}
                          onChange={(e) => setAppConfig({ ...appConfig, colorAcento: e.target.value })}
                          className="w-16 h-16 rounded-xl border-2 border-gray-200 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={appConfig.colorAcento}
                          onChange={(e) => setAppConfig({ ...appConfig, colorAcento: e.target.value })}
                          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tipografía */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Type className="w-5 h-5 text-purple-600" />
                    Tipografía
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Fuente Principal</label>
                      <select
                        value={appConfig.fuente}
                        onChange={(e) => setAppConfig({ ...appConfig, fuente: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white"
                      >
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Poppins</option>
                        <option>Montserrat</option>
                        <option>Open Sans</option>
                      </select>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <p style={{ fontFamily: appConfig.fuente }} className="text-2xl font-bold text-gray-900 mb-2">
                        Aa Bb Cc 123
                      </p>
                      <p style={{ fontFamily: appConfig.fuente }} className="text-sm text-gray-600">
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>
                </div>

                {/* Splash Screen */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                    Splash Screen
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Animación de Entrada</label>
                      <select
                        value={appConfig.splashAnimacion}
                        onChange={(e) => setAppConfig({ ...appConfig, splashAnimacion: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none bg-white"
                      >
                        <option value="fade">Fade In</option>
                        <option value="scale">Scale Up</option>
                        <option value="slide">Slide Up</option>
                        <option value="bounce">Bounce</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview en vivo */}
              <div>
                <div className="sticky top-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-indigo-600" />
                    Preview en Vivo
                  </h3>

                  {/* Mockup de móvil con los colores aplicados */}
                  <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-white/20 mx-auto w-80">
                    <div className="bg-white rounded-[2.5rem] h-[600px] overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-full z-10"></div>

                      {/* Header con color primario */}
                      <div style={{ background: `linear-gradient(135deg, ${appConfig.colorPrimario}, ${appConfig.colorSecundario})` }} className="h-32 relative">
                        <div className="absolute bottom-4 left-4 right-4">
                          <p style={{ fontFamily: appConfig.fuente }} className="text-white text-lg font-bold">
                            {appConfig.nombre}
                          </p>
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="p-4 space-y-3">
                        {/* Botón primario */}
                        <button
                          style={{ backgroundColor: appConfig.colorPrimario }}
                          className="w-full py-3 rounded-xl text-white font-semibold shadow-lg"
                        >
                          Botón Primario
                        </button>

                        {/* Botón secundario */}
                        <button
                          style={{ backgroundColor: appConfig.colorSecundario }}
                          className="w-full py-3 rounded-xl text-white font-semibold shadow-lg"
                        >
                          Botón Secundario
                        </button>

                        {/* Card con acento */}
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              style={{ backgroundColor: appConfig.colorAcento }}
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                            >
                              <Star className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <p style={{ fontFamily: appConfig.fuente }} className="font-bold text-gray-900">Card de Ejemplo</p>
                              <p className="text-xs text-gray-600">Con color de acento</p>
                            </div>
                          </div>
                        </div>

                        {/* Pills con colores */}
                        <div className="flex gap-2">
                          <div style={{ backgroundColor: `${appConfig.colorPrimario}20`, color: appConfig.colorPrimario }} className="px-3 py-1 rounded-full text-xs font-bold">
                            Tag 1
                          </div>
                          <div style={{ backgroundColor: `${appConfig.colorAcento}20`, color: appConfig.colorAcento }} className="px-3 py-1 rounded-full text-xs font-bold">
                            Tag 2
                          </div>
                        </div>

                        {/* Paleta de colores */}
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div>
                            <div style={{ backgroundColor: appConfig.colorPrimario }} className="h-16 rounded-lg shadow-lg"></div>
                            <p className="text-xs text-center mt-1 text-gray-600 font-medium">Primario</p>
                          </div>
                          <div>
                            <div style={{ backgroundColor: appConfig.colorSecundario }} className="h-16 rounded-lg shadow-lg"></div>
                            <p className="text-xs text-center mt-1 text-gray-600 font-medium">Secundario</p>
                          </div>
                          <div>
                            <div style={{ backgroundColor: appConfig.colorAcento }} className="h-16 rounded-lg shadow-lg"></div>
                            <p className="text-xs text-center mt-1 text-gray-600 font-medium">Acento</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom navigation con colores */}
                    <div style={{ backgroundColor: appConfig.colorPrimario }} className="absolute bottom-6 left-6 right-6 h-14 rounded-2xl flex items-center justify-around px-4">
                      {navItems.slice(0, 4).map((item) => (
                        <div key={item.id} className="text-center">
                          <div className="text-2xl">{item.icono}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: FUNCIONALIDADES */}
        {activeTab === 'funcionalidades' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white shadow-xl">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Funcionalidades</h2>
                <p className="text-gray-600">Activa o desactiva las características de tu app</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {funcionalidades.map((func) => (
                <motion.div
                  key={func.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                    func.activa
                      ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        func.activa ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        <func.icono className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{func.nombre}</h3>
                        <p className="text-sm text-gray-600">{func.descripcion}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            func.activa ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {func.impactoTamano}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Toggle switch */}
                    <button
                      onClick={() => {
                        const updated = funcionalidades.map(f =>
                          f.id === func.id ? { ...f, activa: !f.activa } : f
                        );
                        setFuncionalidades(updated);
                      }}
                      className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                        func.activa ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <motion.div
                        animate={{ x: func.activa ? 24 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
                      />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resumen */}
            <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-600" />
                Resumen de la App
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Funcionalidades Activas</p>
                  <p className="text-2xl font-bold text-indigo-600">{funcionalidades.filter(f => f.activa).length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tamaño Estimado</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {funcionalidades.filter(f => f.activa).reduce((acc, f) => {
                      const mb = parseFloat(f.impactoTamano.replace(/[^0-9.]/g, ''));
                      return acc + mb;
                    }, 15).toFixed(1)} MB
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Complejidad</p>
                  <p className="text-2xl font-bold text-pink-600">
                    {funcionalidades.filter(f => f.activa).length > 7 ? 'Alta' : funcionalidades.filter(f => f.activa).length > 4 ? 'Media' : 'Baja'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: NAVEGACIÓN */}
        {activeTab === 'navegacion' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xl">
                <Navigation className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Navegación de la App</h2>
                <p className="text-gray-600">Configura el menú principal de tu aplicación</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Editor de menú */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Items del Menú</h3>
                <div className="space-y-3">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-300 transition-all"
                    >
                      <div className="cursor-move text-gray-400">
                        <Layout className="w-5 h-5" />
                      </div>
                      <div className="text-2xl">{item.icono}</div>
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const updated = navItems.map(i =>
                            i.id === item.id ? { ...i, label: e.target.value } : i
                          );
                          setNavItems(updated);
                        }}
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                      />
                      <button
                        onClick={() => {
                          const updated = navItems.map(i =>
                            i.id === item.id ? { ...i, visible: !i.visible } : i
                          );
                          setNavItems(updated);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          item.visible ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {item.visible ? <Eye className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </motion.div>
                  ))}
                </div>

                <button className="mt-4 w-full py-3 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors">
                  + Agregar Item
                </button>

                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-900">
                    <strong>Tip:</strong> Arrastra los items para reordenarlos. Se recomienda un máximo de 5 items para mejor UX.
                  </p>
                </div>
              </div>

              {/* Preview */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Preview de Navegación</h3>

                <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-4 border-white/20 mx-auto w-80">
                  <div className="bg-white rounded-[2.5rem] h-[600px] overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-full z-10"></div>

                    {/* Contenido principal */}
                    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 pt-16 pb-24">
                      <div className="p-6">
                        <h4 className="text-2xl font-bold text-gray-900 mb-6">Vista Principal</h4>

                        <div className="space-y-3">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600"></div>
                                <div className="flex-1">
                                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                                  <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="absolute bottom-6 left-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3">
                      <div className="flex items-center justify-around">
                        {navItems.filter(item => item.visible).slice(0, 5).map((item, index) => (
                          <div key={item.id} className="flex flex-col items-center gap-1">
                            <div className={`text-xl transition-all ${
                              index === 0 ? 'scale-110' : 'opacity-50'
                            }`}>
                              {item.icono}
                            </div>
                            <span className={`text-[10px] font-medium ${
                              index === 0 ? 'text-indigo-600' : 'text-gray-500'
                            }`}>
                              {item.label}
                            </span>
                            {index === 0 && (
                              <div className="w-1 h-1 rounded-full bg-indigo-600"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PUBLICACIÓN */}
        {activeTab === 'publicacion' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-xl">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Configuración de Publicación</h2>
                <p className="text-gray-600">Prepara tu app para las tiendas</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Google Play */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                    <Play className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Google Play Store</h3>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Package Name *</label>
                  <input
                    type="text"
                    value={appConfig.packageName}
                    onChange={(e) => setAppConfig({ ...appConfig, packageName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none font-mono text-sm"
                    placeholder="com.tuempresa.app"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Screenshots (5 mínimo)</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-[9/16] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 hover:border-green-500 transition-colors cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50">
                        <Upload className="w-8 h-8" />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Feature Graphic (1024x500px)</label>
                  <div className="aspect-[1024/500] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-green-500 transition-colors cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50">
                    <Upload className="w-10 h-10 mb-2" />
                    <p className="text-sm font-medium">Subir Feature Graphic</p>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-900 mb-3">Checklist de Google Play</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Package name configurado', done: true },
                      { label: 'Descripción en español', done: true },
                      { label: 'Mínimo 5 screenshots', done: false },
                      { label: 'Feature graphic subido', done: false },
                      { label: 'Política de privacidad URL', done: false }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {item.done ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300" />
                        )}
                        <span className={`text-sm ${item.done ? 'text-green-900 font-medium' : 'text-gray-600'}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apple App Store */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                    <Apple className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Apple App Store</h3>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Bundle ID *</label>
                  <input
                    type="text"
                    value={appConfig.bundleId}
                    onChange={(e) => setAppConfig({ ...appConfig, bundleId: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-mono text-sm"
                    placeholder="com.tuempresa.app"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Screenshots por Dispositivo</label>
                  <div className="space-y-3">
                    {['iPhone 14 Pro Max', 'iPhone 14', 'iPad Pro'].map((device) => (
                      <div key={device}>
                        <p className="text-sm font-medium text-gray-700 mb-2">{device}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-[9/19.5] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs hover:border-blue-500 transition-colors cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50">
                              <Upload className="w-6 h-6" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-3">Checklist de App Store</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Bundle ID configurado', done: true },
                      { label: 'Screenshots iPhone 14 Pro Max', done: false },
                      { label: 'Screenshots iPad Pro', done: false },
                      { label: 'App preview video (opcional)', done: false },
                      { label: 'Política de privacidad URL', done: false }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {item.done ? (
                          <Check className="w-5 h-5 text-blue-600" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300" />
                        )}
                        <span className={`text-sm ${item.done ? 'text-blue-900 font-medium' : 'text-gray-600'}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: POLÍTICAS */}
        {activeTab === 'politicas' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-xl">
                <Shield className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Políticas de Privacidad y Términos</h2>
                <p className="text-gray-600">Genera automáticamente tus documentos legales</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Generador */}
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
                  <h3 className="font-bold text-gray-900 mb-4">Generador Automático</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Legal de la Empresa</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                        placeholder="GymMaster S.L."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email de Contacto</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                        placeholder="legal@gymmaster.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Dirección</label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none resize-none"
                        rows={3}
                        placeholder="Calle Principal 123, Madrid, España"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">¿Qué datos recopilas?</label>
                      <div className="space-y-2">
                        {['Email', 'Nombre', 'Foto de perfil', 'Datos de salud', 'Ubicación', 'Datos de pago'].map((dato) => (
                          <label key={dato} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-purple-600" />
                            <span className="text-sm text-gray-700">{dato}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                      <div className="flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Generar Documentos
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">URL de Política de Privacidad</label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                    placeholder="https://tuapp.com/privacy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">URL de Términos y Condiciones</label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
                    placeholder="https://tuapp.com/terms"
                  />
                </div>
              </div>

              {/* Preview */}
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Preview del Documento</h3>

                <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 h-[600px] overflow-y-auto">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Política de Privacidad</h4>

                  <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                    <p>
                      <strong>{appConfig.empresa}</strong> ("nosotros", "nuestro" o "la empresa") opera la aplicación móvil <strong>{appConfig.nombre}</strong> (en adelante, "la Aplicación").
                    </p>

                    <p>
                      Esta página le informa de nuestras políticas en materia de recopilación, uso y divulgación de datos personales cuando utiliza nuestra Aplicación y de las opciones de las que dispone en relación con esos datos.
                    </p>

                    <h5 className="font-bold text-gray-900 mt-6 mb-2">1. Información que Recopilamos</h5>
                    <p>
                      Recopilamos varios tipos de información con distintos fines para prestarle el servicio y mejorarlo.
                    </p>

                    <h5 className="font-bold text-gray-900 mt-6 mb-2">2. Uso de los Datos</h5>
                    <p>
                      {appConfig.empresa} utiliza los datos recopilados para diversos fines:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Prestar y mantener nuestra Aplicación</li>
                      <li>Notificarle cambios en nuestra Aplicación</li>
                      <li>Permitirle participar en funciones interactivas</li>
                      <li>Prestar asistencia al cliente</li>
                      <li>Recopilar análisis o información valiosa</li>
                    </ul>

                    <h5 className="font-bold text-gray-900 mt-6 mb-2">3. Seguridad de los Datos</h5>
                    <p>
                      La seguridad de sus datos es importante para nosotros, pero recuerde que ningún método de transmisión por Internet o método de almacenamiento electrónico resulta 100% seguro.
                    </p>

                    <h5 className="font-bold text-gray-900 mt-6 mb-2">4. Contacto</h5>
                    <p>
                      Si tiene alguna pregunta sobre esta Política de Privacidad, póngase en contacto con nosotros por correo electrónico.
                    </p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 py-2 border-2 border-purple-500 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors">
                      Exportar PDF
                    </button>
                    <button className="flex-1 py-2 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-600 transition-colors">
                      Copiar HTML
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CONFIGURACIÓN AVANZADA */}
        {activeTab === 'avanzado' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white shadow-xl">
                <Settings className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Configuración Avanzada</h2>
                <p className="text-gray-600">Opciones técnicas y configuraciones de desarrollador</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Deep Linking */}
              <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900">Deep Linking</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Custom URL Scheme</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none font-mono text-sm"
                      placeholder="fitprocoach://"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Universal Links Domain</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                      placeholder="app.fitprocoach.com"
                    />
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white">
                    <BarChart className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900">Analytics</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Plataforma de Analytics</label>
                    <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none">
                      <option>Firebase Analytics</option>
                      <option>Mixpanel</option>
                      <option>Amplitude</option>
                      <option>Google Analytics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">API Key</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none font-mono text-sm"
                      placeholder="••••••••••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Crash Reporting */}
              <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900">Crash Reporting</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Servicio</label>
                    <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none">
                      <option>Firebase Crashlytics</option>
                      <option>Sentry</option>
                      <option>Bugsnag</option>
                    </select>
                  </div>
                  <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-gray-700">Enviar informes automáticamente</span>
                  </label>
                </div>
              </div>

              {/* Versión mínima OS */}
              <div className="p-6 bg-white rounded-2xl border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900">Versiones de SO</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">iOS Mínimo</label>
                    <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none">
                      <option>iOS 15.0</option>
                      <option>iOS 14.0</option>
                      <option>iOS 13.0</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Android Mínimo</label>
                    <select className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none">
                      <option>Android 12 (API 31)</option>
                      <option>Android 11 (API 30)</option>
                      <option>Android 10 (API 29)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* API Keys */}
              <div className="p-6 bg-white rounded-2xl border-2 border-gray-200 lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900">API Keys y Credenciales</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Google Maps API Key</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all outline-none font-mono text-sm"
                      placeholder="••••••••••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Stripe API Key</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all outline-none font-mono text-sm"
                      placeholder="••••••••••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Firebase Config JSON</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all outline-none font-mono text-xs resize-none"
                      rows={3}
                      placeholder='{"apiKey": "...","authDomain": "..."}'
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">OneSignal App ID</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 transition-all outline-none font-mono text-sm"
                      placeholder="••••••••••••••••"
                    />
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-900">
                    <strong>Importante:</strong> Las API keys se almacenan de forma segura y encriptada. Nunca se expondrán en el código cliente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: BUILD */}
        {activeTab === 'build' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-xl">
                <Package className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Proceso de Build</h2>
                <p className="text-gray-600">Compila y genera los paquetes de tu app</p>
              </div>
            </div>

            {/* Estado del build */}
            <div className="mb-8">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{buildStepLabels[buildStatus]}</h3>
                    <p className="text-gray-600">
                      {buildStatus === 'idle' && 'Haz clic en "Iniciar Build" para compilar tu app'}
                      {buildStatus === 'completed' && 'Tu app ha sido compilada exitosamente'}
                      {!['idle', 'completed'].includes(buildStatus) && 'Este proceso puede tomar varios minutos...'}
                    </p>
                  </div>

                  {buildStatus === 'idle' && (
                    <button
                      onClick={startBuild}
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-2xl hover:shadow-xl transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Iniciar Build
                    </button>
                  )}

                  {buildStatus === 'completed' && (
                    <div className="flex gap-3">
                      <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors">
                        Descargar APK
                      </button>
                      <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors">
                        Descargar IPA
                      </button>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                {buildStatus !== 'idle' && (
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${buildProgress}%` }}
                        className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </motion.div>
                    </div>
                    <p className="text-sm font-bold text-gray-700 text-right">{Math.round(buildProgress)}%</p>
                  </div>
                )}

                {/* Pasos del build */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
                  {[
                    { status: 'validating', label: 'Validando', icon: CheckCircle },
                    { status: 'generating', label: 'Generando', icon: ImageIcon },
                    { status: 'compiling', label: 'Compilando', icon: Code },
                    { status: 'packaging', label: 'Empaquetando', icon: Package },
                    { status: 'uploading', label: 'Subiendo', icon: Upload }
                  ].map((step, index) => {
                    const statusOrder = ['idle', 'validating', 'generating', 'compiling', 'packaging', 'uploading', 'completed', 'error'];
                    const currentIndex = statusOrder.indexOf(buildStatus);
                    const stepIndex = statusOrder.indexOf(step.status);
                    const isCompleted = currentIndex > stepIndex;
                    const isCurrent = currentIndex === stepIndex;

                    return (
                      <div key={step.status} className={`p-4 rounded-xl text-center transition-all ${
                        isCompleted ? 'bg-green-100 border-2 border-green-500' :
                        isCurrent ? 'bg-orange-100 border-2 border-orange-500' :
                        'bg-white border-2 border-gray-200'
                      }`}>
                        <step.icon className={`w-8 h-8 mx-auto mb-2 ${
                          isCompleted ? 'text-green-600' :
                          isCurrent ? 'text-orange-600' :
                          'text-gray-400'
                        }`} />
                        <p className={`text-sm font-bold ${
                          isCompleted ? 'text-green-900' :
                          isCurrent ? 'text-orange-900' :
                          'text-gray-600'
                        }`}>
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Log del build */}
            <div className="bg-gray-900 rounded-2xl p-6 text-green-400 font-mono text-sm h-64 overflow-y-auto">
              <p className="opacity-75">[12:34:56] Starting build process...</p>
              <p className="opacity-75">[12:34:57] Validating configuration... ✓</p>
              <p className="opacity-75">[12:34:58] Generating app icons... ✓</p>
              <p className="opacity-75">[12:35:02] Generating splash screens... ✓</p>
              {buildStatus !== 'idle' && (
                <>
                  <p className="opacity-75">[12:35:05] Compiling Android app...</p>
                  {buildProgress > 50 && <p className="opacity-75">[12:35:45] Compiling iOS app...</p>}
                  {buildProgress > 75 && <p className="opacity-75">[12:36:12] Creating packages...</p>}
                  {buildStatus === 'completed' && (
                    <>
                      <p className="opacity-75">[12:36:45] Build completed successfully! ✓</p>
                      <p className="text-green-300 font-bold">[12:36:45] 🎉 Your app is ready!</p>
                    </>
                  )}
                </>
              )}
              <span className="animate-pulse">▊</span>
            </div>
          </div>
        )}

        {/* TAB: VERSIONES */}
        {activeTab === 'versiones' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-xl">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Versiones</h2>
                  <p className="text-gray-600">Historial de builds y versiones publicadas</p>
                </div>
              </div>

              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                + Nueva Versión
              </button>
            </div>

            <div className="space-y-4">
              {versiones.map((version, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl border-2 border-gray-200 p-6 hover:border-teal-300 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg">
                        {version.numero.split('.')[0]}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Versión {version.numero}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {version.fecha}
                          </div>
                          <div className={`px-3 py-1 rounded-full font-bold text-xs ${
                            version.estado === 'En tiendas' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {version.estado}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-colors">
                        <Download className="w-5 h-5 text-gray-600" />
                      </button>
                      {version.estado === 'Archivada' && (
                        <button className="p-2 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors">
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-2">Cambios en esta versión:</h4>
                    <ul className="space-y-1">
                      {version.changelog.map((change, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ConfiguracionAppPage;
