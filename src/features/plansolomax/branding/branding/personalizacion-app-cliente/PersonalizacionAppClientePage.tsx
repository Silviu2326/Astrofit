import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone, Save, Eye, Upload, Settings, Bell, Users,
  Palette, Layout, Image, Zap, Download, Play, BarChart3,
  Moon, Sun, ChevronDown, GripVertical, Plus, Minus, Send,
  CheckCircle, XCircle, RotateCcw, FileText, Shield, BookOpen,
  QrCode, Star, TrendingUp, Globe, Code, Package, ArrowUpRight,
  Clock, Activity, Sparkles
} from 'lucide-react';

interface AppConfig {
  // Información básica
  appName: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  languages: string[];
  version: string;

  // Diseño
  icon: string;
  splashScreen: string;
  splashDuration: number;
  splashAnimation: string;

  // Colores
  primaryColor: string;
  backgroundColor: string;
  cardColor: string;
  darkMode: boolean;
  darkPrimaryColor: string;
  darkBackgroundColor: string;

  // Navegación
  navigationStyle: 'tabs' | 'drawer' | 'both';
  bottomTabs: Array<{ id: string; label: string; icon: string; enabled: boolean }>;
  homeWidgets: Array<{ id: string; name: string; enabled: boolean }>;

  // Notificaciones
  notificationIcon: string;
  notificationColor: string;
  notifications: {
    workout: boolean;
    coach: boolean;
    achievements: boolean;
    nutrition: boolean;
    updates: boolean;
  };
  quietHoursStart: string;
  quietHoursEnd: string;

  // Onboarding
  onboardingScreens: number;
  showSkipButton: boolean;
  interactiveTutorial: boolean;

  // Módulos
  modules: {
    workouts: boolean;
    nutrition: boolean;
    progress: boolean;
    chat: boolean;
    calendar: boolean;
    social: boolean;
    wearables: boolean;
    videoCalls: boolean;
    payments: boolean;
  };

  // Avanzado
  offlineMode: boolean;
  autoSync: boolean;
  biometrics: boolean;
}

const PersonalizacionAppClientePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [isDarkPreview, setIsDarkPreview] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('iphone15');
  const [showSimulator, setShowSimulator] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);

  const [config, setConfig] = useState<AppConfig>({
    appName: 'Mi App Fitness',
    shortDescription: 'Tu entrenador personal en el bolsillo',
    longDescription: 'Alcanza tus objetivos fitness con entrenamientos personalizados, planes de nutrición y seguimiento de progreso.',
    category: 'health',
    languages: ['es', 'en'],
    version: '1.2.3',

    icon: '💪',
    splashScreen: 'logo',
    splashDuration: 2,
    splashAnimation: 'fade',

    primaryColor: '#0D9488',
    backgroundColor: '#F9FAFB',
    cardColor: '#FFFFFF',
    darkMode: true,
    darkPrimaryColor: '#5EEAD4',
    darkBackgroundColor: '#111827',

    navigationStyle: 'tabs',
    bottomTabs: [
      { id: 'home', label: 'Inicio', icon: '🏠', enabled: true },
      { id: 'workouts', label: 'Entrenamientos', icon: '💪', enabled: true },
      { id: 'nutrition', label: 'Nutrición', icon: '🥗', enabled: true },
      { id: 'progress', label: 'Progreso', icon: '📊', enabled: true },
      { id: 'profile', label: 'Perfil', icon: '👤', enabled: true },
    ],
    homeWidgets: [
      { id: 'next-workout', name: 'Próximo entrenamiento', enabled: true },
      { id: 'weekly-progress', name: 'Progreso semanal', enabled: true },
      { id: 'coach-messages', name: 'Mensajes del entrenador', enabled: true },
      { id: 'quick-stats', name: 'Estadísticas rápidas', enabled: true },
      { id: 'achievements', name: 'Logros recientes', enabled: true },
    ],

    notificationIcon: '🔔',
    notificationColor: '#0D9488',
    notifications: {
      workout: true,
      coach: true,
      achievements: true,
      nutrition: true,
      updates: false,
    },
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',

    onboardingScreens: 3,
    showSkipButton: true,
    interactiveTutorial: true,

    modules: {
      workouts: true,
      nutrition: true,
      progress: true,
      chat: true,
      calendar: true,
      social: false,
      wearables: true,
      videoCalls: false,
      payments: true,
    },

    offlineMode: true,
    autoSync: true,
    biometrics: true,
  });

  const updateConfig = (updates: Partial<AppConfig>) => {
    setConfig({ ...config, ...updates });
  };

  const tabs = [
    { id: 'info', label: 'Información', icon: FileText },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'navigation', label: 'Navegación', icon: Layout },
    { id: 'screens', label: 'Pantallas', icon: Smartphone },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'modules', label: 'Módulos', icon: Package },
  ];

  const devices = [
    { id: 'iphone15', name: 'iPhone 15 Pro', width: 393, height: 852 },
    { id: 'iphoneSE', name: 'iPhone SE', width: 375, height: 667 },
    { id: 'galaxyS23', name: 'Galaxy S23', width: 360, height: 780 },
    { id: 'pixel7', name: 'Pixel 7', width: 412, height: 915 },
  ];

  const handlePublish = async () => {
    setIsBuilding(true);
    setBuildProgress(0);

    const interval = setInterval(() => {
      setBuildProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBuilding(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de la App</label>
              <input
                type="text"
                value={config.appName}
                onChange={(e) => updateConfig({ appName: e.target.value.slice(0, 30) })}
                maxLength={30}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                placeholder="Mi App Fitness"
              />
              <p className="text-xs text-gray-500 mt-1">{config.appName.length}/30 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción Corta</label>
              <textarea
                value={config.shortDescription}
                onChange={(e) => updateConfig({ shortDescription: e.target.value.slice(0, 160) })}
                maxLength={160}
                rows={2}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                placeholder="Para App Store y Google Play"
              />
              <p className="text-xs text-gray-500 mt-1">{config.shortDescription.length}/160 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción Larga</label>
              <textarea
                value={config.longDescription}
                onChange={(e) => updateConfig({ longDescription: e.target.value.slice(0, 4000) })}
                maxLength={4000}
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                placeholder="Descripción completa para stores"
              />
              <p className="text-xs text-gray-500 mt-1">{config.longDescription.length}/4000 caracteres</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
                <select
                  value={config.category}
                  onChange={(e) => updateConfig({ category: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                >
                  <option value="health">Health & Fitness</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Versión</label>
                <input
                  type="text"
                  value={config.version}
                  onChange={(e) => updateConfig({ version: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                  placeholder="1.0.0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Idiomas Soportados</label>
              <div className="flex flex-wrap gap-2">
                {['es', 'en', 'fr', 'de', 'pt'].map(lang => (
                  <label key={lang} className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-teal-500 hover:bg-teal-50 transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={config.languages.includes(lang)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateConfig({ languages: [...config.languages, lang] });
                        } else {
                          updateConfig({ languages: config.languages.filter(l => l !== lang) });
                        }
                      }}
                      className="rounded text-teal-600"
                    />
                    <span className="text-sm font-semibold">{lang.toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'branding':
        return (
          <div className="space-y-6">
            {/* Logo de App */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-teal-200 to-cyan-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Image className="w-5 h-5 text-teal-600" />
                  Logo de App (Icono)
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-xs font-medium text-gray-600 mb-1">Subir Icono</p>
                    <p className="text-xs text-gray-500">1024x1024px</p>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center text-4xl shadow-xl">
                      {config.icon}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  {['💪', '🏃', '🎯', '⚡', '🔥', '💎', '🚀', '⭐'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => updateConfig({ icon: emoji })}
                      className={`aspect-square bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform ${config.icon === emoji ? 'ring-4 ring-teal-300' : ''}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Splash Screen */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-600" />
                  Splash Screen
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estilo</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'logo', label: 'Logo' },
                        { id: 'fullscreen', label: 'Full Screen' },
                        { id: 'logo-slogan', label: 'Logo + Texto' }
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() => updateConfig({ splashScreen: option.id })}
                          className={`px-3 py-2 rounded-xl border-2 transition-all text-sm font-semibold ${
                            config.splashScreen === option.id
                              ? 'border-teal-500 bg-teal-50 text-teal-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duración: {config.splashDuration}s
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={config.splashDuration}
                      onChange={(e) => updateConfig({ splashDuration: Number(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Animación</label>
                    <select
                      value={config.splashAnimation}
                      onChange={(e) => updateConfig({ splashAnimation: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
                    >
                      <option value="fade">Fade In</option>
                      <option value="slide">Slide Up</option>
                      <option value="zoom">Zoom</option>
                      <option value="none">Ninguna</option>
                    </select>
                  </div>

                  <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-8 aspect-[9/16] flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="text-6xl mb-4">{config.icon}</div>
                      <div className="text-white text-xl font-bold">{config.appName}</div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colores de Marca */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-blue-600" />
                  Colores de Marca
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Color Primario</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                        className="h-12 w-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.primaryColor}
                        onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-teal-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Fondo</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={config.backgroundColor}
                        onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                        className="h-12 w-12 rounded-xl border-2 border-gray-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.backgroundColor}
                        onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                        className="flex-1 px-3 py-2 rounded-xl border-2 border-gray-200 focus:border-teal-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-3 mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl cursor-pointer hover:from-teal-50 hover:to-cyan-50 transition-all">
                  <input
                    type="checkbox"
                    checked={config.darkMode}
                    onChange={(e) => updateConfig({ darkMode: e.target.checked })}
                    className="rounded text-teal-600"
                  />
                  <div className="flex items-center gap-2">
                    <Moon className="w-5 h-5 text-gray-700" />
                    <span className="text-sm font-semibold">Soportar Modo Oscuro</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        );

      case 'navigation':
        return (
          <div className="space-y-6">
            {/* Estilo de Navegación */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50">
              <h3 className="font-bold text-gray-900 mb-4">Estilo de Navegación</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'tabs', label: 'Bottom Tabs', icon: '📱' },
                  { id: 'drawer', label: 'Side Drawer', icon: '☰' },
                  { id: 'both', label: 'Ambos', icon: '⚡' }
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => updateConfig({ navigationStyle: style.id as any })}
                    className={`px-4 py-4 rounded-2xl border-2 transition-all ${
                      config.navigationStyle === style.id
                        ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{style.icon}</div>
                    <div className="text-sm font-semibold">{style.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Tabs */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Pestañas Inferiores</h3>
                <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Drag & drop para ordenar
                </span>
              </div>

              <div className="space-y-2">
                {config.bottomTabs.map((tab, index) => (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-teal-300 transition-all group"
                  >
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move group-hover:text-teal-500" />
                    <span className="text-2xl">{tab.icon}</span>
                    <input
                      type="text"
                      value={tab.label}
                      onChange={(e) => {
                        const newTabs = [...config.bottomTabs];
                        newTabs[index].label = e.target.value;
                        updateConfig({ bottomTabs: newTabs });
                      }}
                      className="flex-1 px-3 py-2 rounded-xl border-2 border-transparent focus:border-teal-500 outline-none bg-white"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={tab.enabled}
                        onChange={(e) => {
                          const newTabs = [...config.bottomTabs];
                          newTabs[index].enabled = e.target.checked;
                          updateConfig({ bottomTabs: newTabs });
                        }}
                        className="rounded text-teal-600"
                      />
                      <span className="text-sm font-semibold text-gray-600">Activo</span>
                    </label>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'screens':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Layout className="w-5 h-5 text-teal-600" />
                Widgets de Pantalla Principal
              </h3>

              <div className="space-y-2">
                {config.homeWidgets.map((widget, index) => (
                  <motion.div
                    key={widget.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-cyan-300 transition-all group"
                  >
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move group-hover:text-cyan-500" />
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>
                    <span className="flex-1 font-medium text-gray-700">{widget.name}</span>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={widget.enabled}
                        onChange={(e) => {
                          const newWidgets = [...config.homeWidgets];
                          newWidgets[index].enabled = e.target.checked;
                          updateConfig({ homeWidgets: newWidgets });
                        }}
                        className="rounded text-teal-600"
                      />
                      <span className="text-sm font-semibold text-gray-600">Visible</span>
                    </label>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            {/* Tipos de Notificaciones */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-teal-600" />
                Tipos de Notificaciones Push
              </h3>

              <div className="space-y-2">
                {Object.entries(config.notifications).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 cursor-pointer hover:border-teal-300 transition-all"
                  >
                    <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => updateConfig({
                        notifications: { ...config.notifications, [key]: e.target.checked }
                      })}
                      className="rounded text-teal-600 w-5 h-5"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Horario No Molestar */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Moon className="w-5 h-5 text-blue-600" />
                Horario "No Molestar"
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Desde</label>
                  <input
                    type="time"
                    value={config.quietHoursStart}
                    onChange={(e) => updateConfig({ quietHoursStart: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Hasta</label>
                  <input
                    type="time"
                    value={config.quietHoursEnd}
                    onChange={(e) => updateConfig({ quietHoursEnd: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-300 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Preview de Notificación */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50">
              <h3 className="font-bold text-gray-900 mb-4">Preview de Notificación</h3>

              <div className="space-y-3">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-4 text-white">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl">
                      {config.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{config.appName}</div>
                      <div className="text-sm text-gray-300 mt-1">¡Es hora de tu entrenamiento! 💪</div>
                    </div>
                    <div className="text-xs text-gray-400">ahora</div>
                  </div>
                </div>

                <button className="w-full px-4 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-2xl hover:shadow-xl transition-all font-semibold flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Enviar Notificación de Prueba
                </button>
              </div>
            </div>
          </div>
        );

      case 'modules':
        return (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50">
              <h3 className="font-bold text-gray-900 mb-4">Módulos de la App</h3>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(config.modules).map(([key, value]) => (
                  <label
                    key={key}
                    className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 cursor-pointer hover:border-teal-500 hover:from-teal-50 hover:to-cyan-50 transition-all"
                  >
                    <span className="capitalize text-sm font-semibold text-gray-700">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => updateConfig({
                        modules: { ...config.modules, [key]: e.target.checked }
                      })}
                      className="rounded text-teal-600"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-white/50">
              <h3 className="font-bold text-gray-900 mb-4">Funcionalidades Avanzadas</h3>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 cursor-pointer hover:border-cyan-300 transition-all">
                  <div>
                    <div className="font-semibold text-gray-900">Modo Offline</div>
                    <div className="text-xs text-gray-500">Permitir uso sin conexión</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.offlineMode}
                    onChange={(e) => updateConfig({ offlineMode: e.target.checked })}
                    className="rounded text-teal-600 w-5 h-5"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 cursor-pointer hover:border-cyan-300 transition-all">
                  <div>
                    <div className="font-semibold text-gray-900">Sincronización Automática</div>
                    <div className="text-xs text-gray-500">Sincronizar datos en background</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.autoSync}
                    onChange={(e) => updateConfig({ autoSync: e.target.checked })}
                    className="rounded text-teal-600 w-5 h-5"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 cursor-pointer hover:border-cyan-300 transition-all">
                  <div>
                    <div className="font-semibold text-gray-900">Biometría</div>
                    <div className="text-xs text-gray-500">Face ID / Touch ID</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.biometrics}
                    onChange={(e) => updateConfig({ biometrics: e.target.checked })}
                    className="rounded text-teal-600 w-5 h-5"
                  />
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const statsData = [
    {
      title: 'Usuarios Activos',
      value: '2,456',
      change: '+12.5',
      icon: Users,
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-50 to-cyan-50'
    },
    {
      title: 'Rating Promedio',
      value: '4.8',
      change: '+0.3',
      icon: Star,
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-50 to-orange-50'
    },
    {
      title: 'Sesiones Este Mes',
      value: '12.4K',
      change: '+18.2',
      icon: Activity,
      gradient: 'from-cyan-500 to-blue-600',
      bgGradient: 'from-cyan-50 to-blue-50'
    },
    {
      title: 'Tiempo Promedio',
      value: '24min',
      change: '+5.7',
      icon: Clock,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12 mx-4 md:mx-8 mt-8"
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
              <Smartphone className="w-10 h-10 text-cyan-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-cyan-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              App del Cliente <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Personalizada</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl leading-relaxed">
            Tu marca en las <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">manos de tus clientes</span>
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 hover:bg-white/20 transition-all group">
              <Save className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-white">Guardar Cambios</span>
            </button>
            <button className="flex items-center gap-2 bg-white text-teal-600 rounded-full px-6 py-3 hover:shadow-xl transition-all font-semibold">
              <Eye className="w-5 h-5" />
              <span className="text-sm">Vista Previa</span>
            </button>
            <button
              onClick={() => setShowPublishModal(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full px-6 py-3 hover:shadow-xl transition-all font-semibold"
            >
              <Upload className="w-5 h-5" />
              <span className="text-sm">Publicar App</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="px-4 md:px-8 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
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
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>

                {/* Título */}
                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.title}
                </p>

                {/* Valor */}
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {stat.value}
                </p>

                {/* Cambio */}
                <div className="flex items-center gap-2">
                  <div className={`p-1 bg-gradient-to-br ${stat.bgGradient} rounded-lg`}>
                    <ArrowUpRight className={`w-4 h-4 bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`} />
                  </div>
                  <span className={`text-sm font-bold bg-gradient-to-br ${stat.gradient} bg-clip-text text-transparent`}>+{stat.change}%</span>
                  <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                </div>

                {/* Barra decorativa */}
                <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${75 + index * 5}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
              {/* Tabs */}
              <div className="border-b overflow-x-auto">
                <div className="flex">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-teal-600 text-teal-600 bg-teal-50/50'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                {renderTabContent()}
              </div>
            </div>
          </div>

          {/* Right Column - PREVIEW INTERACTIVO */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 sticky top-4">
              {/* Device Selector */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <select
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  className="px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-teal-500 outline-none bg-white font-semibold text-gray-700"
                >
                  {devices.map(device => (
                    <option key={device.id} value={device.id}>
                      {device.name}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsDarkPreview(!isDarkPreview)}
                    className="p-2 rounded-xl border-2 border-gray-200 hover:border-teal-500 transition-all"
                  >
                    {isDarkPreview ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
                  </button>
                  <button
                    onClick={() => setShowSimulator(true)}
                    className="px-4 py-2 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold"
                  >
                    Abrir Simulador
                  </button>
                </div>
              </div>

              {/* Mockup 3D */}
              <div className="flex items-center justify-center p-8">
                <div className="relative">
                  {/* Phone Frame con efecto 3D */}
                  <motion.div
                    initial={{ rotateY: -15 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-[3rem] border-[14px] border-black shadow-2xl overflow-hidden"
                    style={{
                      width: devices.find(d => d.id === selectedDevice)?.width || 393,
                      height: devices.find(d => d.id === selectedDevice)?.height || 852,
                      maxHeight: '70vh',
                      transform: 'perspective(1000px) rotateY(0deg)',
                    }}
                  >
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />

                    {/* Screen Content con cambios en tiempo real */}
                    <motion.div
                      key={`${config.primaryColor}-${isDarkPreview}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full flex flex-col"
                      style={{
                        backgroundColor: isDarkPreview ? config.darkBackgroundColor : config.backgroundColor
                      }}
                    >
                      {/* Status Bar */}
                      <div className="h-12 flex items-end justify-between px-6 pb-2 text-xs font-medium" style={{
                        color: isDarkPreview ? '#fff' : '#000'
                      }}>
                        <span>9:41</span>
                        <div className="flex gap-1">
                          <span>📶</span>
                          <span>📶</span>
                          <span>🔋</span>
                        </div>
                      </div>

                      {/* App Content */}
                      <div className="flex-1 overflow-hidden px-4 pt-2">
                        <div className="text-2xl font-bold mb-4" style={{
                          color: isDarkPreview ? '#fff' : '#000'
                        }}>
                          {config.appName}
                        </div>

                        {/* Widgets con animación */}
                        <div className="space-y-3">
                          {config.homeWidgets.filter(w => w.enabled).slice(0, 3).map((widget, idx) => (
                            <motion.div
                              key={widget.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="p-4 rounded-xl shadow-sm"
                              style={{
                                backgroundColor: isDarkPreview ? '#1F2937' : config.cardColor
                              }}
                            >
                              <div className="text-sm font-medium mb-1" style={{
                                color: isDarkPreview ? '#fff' : '#000'
                              }}>
                                {widget.name}
                              </div>
                              <div className="h-2 rounded-full" style={{
                                backgroundColor: isDarkPreview ? config.darkPrimaryColor : config.primaryColor,
                                width: `${60 + idx * 10}%`
                              }} />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Navigation con cambios en tiempo real */}
                      <div
                        className="border-t px-2 py-2"
                        style={{
                          borderColor: isDarkPreview ? '#374151' : '#E5E7EB',
                          backgroundColor: isDarkPreview ? '#1F2937' : '#fff'
                        }}
                      >
                        <div className="flex justify-around">
                          {config.bottomTabs.filter(t => t.enabled).map((tab, i) => (
                            <div key={tab.id} className="flex flex-col items-center gap-1">
                              <span className="text-xl">{tab.icon}</span>
                              <span
                                className="text-xs"
                                style={{
                                  color: i === 0
                                    ? (isDarkPreview ? config.darkPrimaryColor : config.primaryColor)
                                    : (isDarkPreview ? '#9CA3AF' : '#6B7280')
                                }}
                              >
                                {tab.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* QR Code para preview en móvil */}
              <div className="mt-6 p-6 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 rounded-2xl text-center border border-teal-100">
                <QrCode className="w-32 h-32 mx-auto mb-3 text-teal-600" />
                <p className="text-sm font-bold text-gray-900">Escanea para ver en tu móvil</p>
                <p className="text-xs text-gray-500 mt-1">Vista previa instantánea</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PUBLISH MODAL */}
      {showPublishModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl max-w-2xl w-full p-8 border border-white/50"
          >
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Publicar App
            </h2>

            {!isBuilding && buildProgress === 0 ? (
              <>
                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold">Checklist de Requisitos</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'Icono configurado', done: true },
                      { label: 'Splash screen configurado', done: true },
                      { label: 'Colores definidos', done: true },
                      { label: 'Nombre de app definido', done: true },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {item.done ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPublishModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-2xl hover:border-gray-300 font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handlePublish}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 text-white rounded-2xl hover:shadow-xl font-semibold"
                  >
                    Generar App
                  </button>
                </div>
              </>
            ) : buildProgress < 100 ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
                  <p className="font-medium mb-2">Generando build de iOS y Android...</p>
                  <p className="text-sm text-gray-600">Esto puede tomar algunos minutos</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${buildProgress}%` }}
                    className="h-full bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600"
                  />
                </div>
                <p className="text-center text-sm text-gray-600">{buildProgress}% completado</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-bold mb-2">¡Listo! Tu app está lista para publicar</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="px-6 py-4 bg-black text-white rounded-2xl hover:bg-gray-800 flex items-center justify-center gap-2 font-semibold">
                    <Upload className="w-5 h-5" />
                    App Store
                  </button>
                  <button className="px-6 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 flex items-center justify-center gap-2 font-semibold">
                    <Upload className="w-5 h-5" />
                    Google Play
                  </button>
                </div>

                <button
                  onClick={() => {
                    setShowPublishModal(false);
                    setBuildProgress(0);
                  }}
                  className="w-full px-6 py-3 border-2 border-gray-200 rounded-2xl hover:border-gray-300 font-semibold"
                >
                  Cerrar
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* SIMULATOR MODAL */}
      {showSimulator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <div className="relative">
            <button
              onClick={() => setShowSimulator(false)}
              className="absolute -top-12 right-0 px-6 py-2 bg-white text-black rounded-xl hover:bg-gray-100 font-semibold"
            >
              Cerrar Simulador
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative rounded-[3rem] border-[14px] border-black shadow-2xl overflow-hidden"
              style={{ width: 393, height: 852 }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />
              <div className="w-full h-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <Smartphone className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 font-semibold">Simulador Interactivo</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PersonalizacionAppClientePage;
