import React, { useState } from 'react';
import {
  Smartphone, Save, Eye, Upload, Settings, Bell, Users,
  Palette, Layout, Image, Zap, Download, Play, BarChart3,
  Moon, Sun, ChevronDown, GripVertical, Plus, Minus, Send,
  CheckCircle, XCircle, RotateCcw, FileText, Shield, BookOpen,
  QrCode, Star, TrendingUp, Globe, Code, Package
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

    primaryColor: '#3B82F6',
    backgroundColor: '#F9FAFB',
    cardColor: '#FFFFFF',
    darkMode: true,
    darkPrimaryColor: '#60A5FA',
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
    notificationColor: '#3B82F6',
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
    { id: 'icon', label: 'Icono', icon: Image },
    { id: 'splash', label: 'Splash Screen', icon: Zap },
    { id: 'colors', label: 'Colores', icon: Palette },
    { id: 'navigation', label: 'Navegación', icon: Layout },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'onboarding', label: 'Onboarding', icon: Users },
    { id: 'modules', label: 'Módulos', icon: Package },
  ];

  const devices = [
    { id: 'iphone15', name: 'iPhone 15 Pro', width: 393, height: 852 },
    { id: 'iphoneSE', name: 'iPhone SE', width: 375, height: 667 },
    { id: 'galaxyS23', name: 'Galaxy S23', width: 360, height: 780 },
    { id: 'pixel7', name: 'Pixel 7', width: 412, height: 915 },
  ];

  const templates = [
    { id: 'minimal', name: 'Minimalista', primary: '#000000', bg: '#FFFFFF' },
    { id: 'energetic', name: 'Energética', primary: '#FF6B35', bg: '#FFF8F3' },
    { id: 'professional', name: 'Profesional', primary: '#1E40AF', bg: '#F3F4F6' },
    { id: 'dark', name: 'Dark', primary: '#8B5CF6', bg: '#0F172A' },
  ];

  const applyTemplate = (template: typeof templates[0]) => {
    updateConfig({
      primaryColor: template.primary,
      backgroundColor: template.bg,
    });
  };

  const handlePublish = async () => {
    setIsBuilding(true);
    setBuildProgress(0);

    // Simular proceso de build
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
              <label className="block text-sm font-medium mb-2">Nombre de la App</label>
              <input
                type="text"
                value={config.appName}
                onChange={(e) => updateConfig({ appName: e.target.value.slice(0, 30) })}
                maxLength={30}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Mi App Fitness"
              />
              <p className="text-xs text-gray-500 mt-1">{config.appName.length}/30 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descripción Corta</label>
              <textarea
                value={config.shortDescription}
                onChange={(e) => updateConfig({ shortDescription: e.target.value.slice(0, 160) })}
                maxLength={160}
                rows={2}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Para App Store y Google Play"
              />
              <p className="text-xs text-gray-500 mt-1">{config.shortDescription.length}/160 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Descripción Larga</label>
              <textarea
                value={config.longDescription}
                onChange={(e) => updateConfig({ longDescription: e.target.value.slice(0, 4000) })}
                maxLength={4000}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción completa para stores"
              />
              <p className="text-xs text-gray-500 mt-1">{config.longDescription.length}/4000 caracteres</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Categoría</label>
              <select
                value={config.category}
                onChange={(e) => updateConfig({ category: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="health">Health & Fitness</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Idiomas Soportados</label>
              <div className="flex flex-wrap gap-2">
                {['es', 'en', 'fr', 'de', 'pt'].map(lang => (
                  <label key={lang} className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
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
                      className="rounded"
                    />
                    <span className="text-sm">{lang.toUpperCase()}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium mb-2">Versión Actual</label>
              <div className="text-2xl font-bold text-gray-700">v{config.version}</div>
            </div>
          </div>
        );

      case 'icon':
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm font-medium mb-1">Arrastra tu icono aquí</p>
              <p className="text-xs text-gray-500">PNG de 1024x1024px (sin transparencia para iOS)</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Seleccionar Archivo
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Generador Automático
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Sube una imagen y genera todos los tamaños necesarios para iOS y Android
              </p>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow">
                <Download className="w-4 h-4 inline mr-2" />
                Generar y Descargar ZIP
              </button>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Plantillas de Iconos</h3>
              <div className="grid grid-cols-2 gap-3">
                {['💪', '🏃', '🎯', '⚡'].map(emoji => (
                  <div
                    key={emoji}
                    onClick={() => updateConfig({ icon: emoji })}
                    className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl cursor-pointer hover:scale-105 transition-transform"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Preview en Contexto</h3>
              <div className="bg-gradient-to-b from-blue-600 to-blue-800 p-6 rounded-2xl">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="grid grid-cols-4 gap-4">
                    {[config.icon, '📱', '⚙️', '📸'].map((icon, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-2xl shadow-lg">
                          {icon}
                        </div>
                        <span className="text-xs text-white">App</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'splash':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Diseño del Splash Screen</label>
              <div className="space-y-3">
                {[
                  { id: 'logo', label: 'Logo centrado + color de fondo' },
                  { id: 'fullscreen', label: 'Imagen full-screen' },
                  { id: 'logo-slogan', label: 'Logo + slogan' }
                ].map(option => (
                  <label key={option.id} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="splash"
                      checked={config.splashScreen === option.id}
                      onChange={() => updateConfig({ splashScreen: option.id })}
                      className="text-blue-600"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Duración del Splash: {config.splashDuration}s
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={config.splashDuration}
                onChange={(e) => updateConfig({ splashDuration: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Animación</label>
              <select
                value={config.splashAnimation}
                onChange={(e) => updateConfig({ splashAnimation: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="fade">Fade In</option>
                <option value="slide">Slide Up</option>
                <option value="zoom">Zoom</option>
                <option value="none">Ninguna</option>
              </select>
            </div>

            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow">
              <Play className="w-4 h-4 inline mr-2" />
              Ver Animación
            </button>

            <div className="bg-gray-900 rounded-xl p-8 aspect-[9/16] flex items-center justify-center">
              <div className="text-center animate-pulse">
                <div className="text-6xl mb-4">{config.icon}</div>
                <div className="text-white text-xl font-bold">{config.appName}</div>
              </div>
            </div>
          </div>
        );

      case 'colors':
        return (
          <div className="space-y-6">
            <div>
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  className="rounded"
                />
                <span className="text-sm font-medium">Heredar colores de plataforma web</span>
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Color Primario</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                    className="h-12 w-12 rounded border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color de Fondo</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="h-12 w-12 rounded border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Color de Tarjetas</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={config.cardColor}
                    onChange={(e) => updateConfig({ cardColor: e.target.value })}
                    className="h-12 w-12 rounded border cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.cardColor}
                    onChange={(e) => updateConfig({ cardColor: e.target.value })}
                    className="flex-1 px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={config.darkMode}
                  onChange={(e) => updateConfig({ darkMode: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Soportar Modo Oscuro</span>
              </label>

              {config.darkMode && (
                <div className="ml-6 space-y-4 p-4 bg-gray-900 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Color Primario (Dark)</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={config.darkPrimaryColor}
                        onChange={(e) => updateConfig({ darkPrimaryColor: e.target.value })}
                        className="h-12 w-12 rounded border cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.darkPrimaryColor}
                        onChange={(e) => updateConfig({ darkPrimaryColor: e.target.value })}
                        className="flex-1 px-3 py-2 border rounded-lg bg-gray-800 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Color de Fondo (Dark)</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={config.darkBackgroundColor}
                        onChange={(e) => updateConfig({ darkBackgroundColor: e.target.value })}
                        className="h-12 w-12 rounded border cursor-pointer"
                      />
                      <input
                        type="text"
                        value={config.darkBackgroundColor}
                        onChange={(e) => updateConfig({ darkBackgroundColor: e.target.value })}
                        className="flex-1 px-3 py-2 border rounded-lg bg-gray-800 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estilo de Navegación</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'tabs', label: 'Bottom Tabs' },
                  { id: 'drawer', label: 'Side Drawer' },
                  { id: 'both', label: 'Ambos' }
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => updateConfig({ navigationStyle: style.id as any })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      config.navigationStyle === style.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'navigation':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Bottom Tabs</h3>
              <div className="space-y-2">
                {config.bottomTabs.map((tab, index) => (
                  <div key={tab.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <span className="text-2xl">{tab.icon}</span>
                    <input
                      type="text"
                      value={tab.label}
                      onChange={(e) => {
                        const newTabs = [...config.bottomTabs];
                        newTabs[index].label = e.target.value;
                        updateConfig({ bottomTabs: newTabs });
                      }}
                      className="flex-1 px-3 py-1 border rounded"
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
                        className="rounded"
                      />
                      <span className="text-sm">Activar</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Widgets de Inicio</h3>
              <div className="space-y-2">
                {config.homeWidgets.map((widget, index) => (
                  <div key={widget.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    <span className="flex-1">{widget.name}</span>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={widget.enabled}
                        onChange={(e) => {
                          const newWidgets = [...config.homeWidgets];
                          newWidgets[index].enabled = e.target.checked;
                          updateConfig({ homeWidgets: newWidgets });
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">Activar</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Tipos de Notificaciones</h3>
              <div className="space-y-2">
                {Object.entries(config.notifications).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => updateConfig({
                        notifications: { ...config.notifications, [key]: e.target.checked }
                      })}
                      className="rounded"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">No molestar desde</label>
                <input
                  type="time"
                  value={config.quietHoursStart}
                  onChange={(e) => updateConfig({ quietHoursStart: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">No molestar hasta</label>
                <input
                  type="time"
                  value={config.quietHoursEnd}
                  onChange={(e) => updateConfig({ quietHoursEnd: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Personalización de Mensajes</h3>
              <textarea
                rows={3}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="¡Hola {nombre}! Es hora de tu {entrenamiento} 💪"
              />
              <p className="text-xs text-gray-500 mt-2">
                Variables disponibles: {'{nombre}'}, {'{entrenamiento}'}, {'{hora}'}
              </p>
            </div>

            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Enviar Notificación de Prueba
            </button>
          </div>
        );

      case 'onboarding':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Número de Pantallas: {config.onboardingScreens}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                value={config.onboardingScreens}
                onChange={(e) => updateConfig({ onboardingScreens: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            {config.onboardingScreens > 0 && (
              <div className="space-y-4">
                {Array.from({ length: config.onboardingScreens }).map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold">Pantalla {i + 1}</span>
                      <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Título"
                        className="w-full px-3 py-2 border rounded"
                      />
                      <textarea
                        placeholder="Descripción"
                        rows={2}
                        className="w-full px-3 py-2 border rounded"
                      />
                      <button className="w-full px-3 py-2 border-2 border-dashed rounded hover:border-blue-500">
                        <Upload className="w-4 h-4 inline mr-2" />
                        Subir Imagen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.showSkipButton}
                onChange={(e) => updateConfig({ showSkipButton: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Mostrar botón "Saltar"</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.interactiveTutorial}
                onChange={(e) => updateConfig({ interactiveTutorial: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Tutorial interactivo en primera vez</span>
            </label>

            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg">
              <Eye className="w-4 h-4 inline mr-2" />
              Ver Onboarding
            </button>
          </div>
        );

      case 'modules':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Módulos de la App</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(config.modules).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                    <span className="capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => updateConfig({
                        modules: { ...config.modules, [key]: e.target.checked }
                      })}
                      className="rounded"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Funcionalidades Avanzadas</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <div className="font-medium">Modo Offline</div>
                    <div className="text-xs text-gray-500">Permitir uso sin conexión</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.offlineMode}
                    onChange={(e) => updateConfig({ offlineMode: e.target.checked })}
                    className="rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <div className="font-medium">Sincronización Automática</div>
                    <div className="text-xs text-gray-500">Sincronizar datos en background</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.autoSync}
                    onChange={(e) => updateConfig({ autoSync: e.target.checked })}
                    className="rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <div className="font-medium">Biometría</div>
                    <div className="text-xs text-gray-500">Face ID / Touch ID</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={config.biometrics}
                    onChange={(e) => updateConfig({ biometrics: e.target.checked })}
                    className="rounded"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Personalización de App Cliente
                </h1>
                <p className="text-gray-600">Personaliza la experiencia móvil de tus clientes</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors flex items-center gap-2">
                <Save className="w-4 h-4" />
                Guardar
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Vista Previa
              </button>
              <button
                onClick={() => setShowPublishModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Publicar App
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="border-b overflow-x-auto">
                <div className="flex">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                {renderTabContent()}
              </div>
            </div>

            {/* Templates Section */}
            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Plantillas Prediseñadas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {templates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => applyTemplate(template)}
                    className="border-2 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-all"
                  >
                    <div className="flex gap-2 mb-2">
                      <div className="w-8 h-8 rounded" style={{ backgroundColor: template.primary }} />
                      <div className="w-8 h-8 rounded" style={{ backgroundColor: template.bg }} />
                    </div>
                    <div className="font-medium text-sm">{template.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Mockup */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              {/* Device Selector */}
              <div className="flex items-center justify-between mb-6">
                <select
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
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
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    {isDarkPreview ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setShowSimulator(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg"
                  >
                    Abrir Simulador
                  </button>
                </div>
              </div>

              {/* Mockup */}
              <div className="flex items-center justify-center p-8">
                <div className="relative">
                  {/* Phone Frame */}
                  <div
                    className="relative rounded-[3rem] border-[14px] border-black shadow-2xl overflow-hidden"
                    style={{
                      width: devices.find(d => d.id === selectedDevice)?.width || 393,
                      height: devices.find(d => d.id === selectedDevice)?.height || 852,
                      maxHeight: '70vh',
                    }}
                  >
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />

                    {/* Screen Content */}
                    <div
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

                        {/* Widgets */}
                        <div className="space-y-3">
                          {config.homeWidgets.filter(w => w.enabled).slice(0, 3).map(widget => (
                            <div
                              key={widget.id}
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
                                width: '60%'
                              }} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Navigation */}
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Mini Dashboard */}
              <div className="mt-6 grid grid-cols-4 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">500</div>
                  <div className="text-xs text-gray-600">Descargas</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">350</div>
                  <div className="text-xs text-gray-600">Activos</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-yellow-600">4.5</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">v{config.version}</div>
                  <div className="text-xs text-gray-600">Versión</div>
                </div>
              </div>

              {/* QR Code */}
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl text-center">
                <QrCode className="w-32 h-32 mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-medium">Escanea para ver preview en tu móvil</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold mb-6">Publicar App</h2>

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

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Changelog</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Describe los cambios de esta versión..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPublishModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handlePublish}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg"
                  >
                    Generar App
                  </button>
                </div>
              </>
            ) : buildProgress < 100 ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <p className="font-medium mb-2">Generando build de iOS y Android...</p>
                  <p className="text-sm text-gray-600">Esto puede tomar algunos minutos</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                    style={{ width: `${buildProgress}%` }}
                  />
                </div>
                <p className="text-center text-sm text-gray-600">{buildProgress}% completado</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                  <h3 className="text-xl font-bold mb-2">¡Listo! Tu app está lista para publicar</h3>
                  <p className="text-gray-600">Ahora puedes subir tu app a las tiendas</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="px-6 py-4 bg-black text-white rounded-xl hover:bg-gray-800 flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    Subir a App Store
                  </button>
                  <button className="px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    Subir a Google Play
                  </button>
                </div>

                <button
                  onClick={() => {
                    setShowPublishModal(false);
                    setBuildProgress(0);
                  }}
                  className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg hover:border-gray-300"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Simulator Modal */}
      {showSimulator && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative">
            <button
              onClick={() => setShowSimulator(false)}
              className="absolute -top-12 right-0 px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-100"
            >
              Cerrar Simulador
            </button>
            <div
              className="relative rounded-[3rem] border-[14px] border-black shadow-2xl overflow-hidden"
              style={{ width: 393, height: 852 }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />
              <div className="w-full h-full bg-white flex items-center justify-center">
                <div className="text-center">
                  <Smartphone className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Simulador Interactivo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalizacionAppClientePage;
