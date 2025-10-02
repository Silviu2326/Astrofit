import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, Tablet, Sun, Moon, RotateCw, Maximize2, Download, Share2, Eye, Layout, MessageSquare, Camera } from 'lucide-react';
import MockupInteractivo from './components/MockupInteractivo';
import NavigadorPantallas from './components/NavigadorPantallas';
import PreviewTiempoReal from './components/PreviewTiempoReal';
import SimuladorMovil from './components/SimuladorMovil';

type Platform = 'iOS' | 'Android';
type Device = 'iPhone 15 Pro Max' | 'iPhone 15' | 'iPhone SE' | 'iPad Pro' | 'Samsung Galaxy S24' | 'Google Pixel 8' | 'OnePlus 12';
type Orientation = 'portrait' | 'landscape';
type Theme = 'light' | 'dark';

const VistaPreviewAppPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [platform, setPlatform] = useState<Platform>('iOS');
  const [device, setDevice] = useState<Device>('iPhone 15 Pro Max');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [theme, setTheme] = useState<Theme>('light');
  const [zoom, setZoom] = useState(100);
  const [showComparison, setShowComparison] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sessionState, setSessionState] = useState<'logged-in' | 'logged-out'>('logged-out');
  const [userType, setUserType] = useState<'free' | 'premium'>('free');

  const [appConfig, setAppConfig] = useState({
    appName: 'FitPro App',
    primaryColor: '#9333EA',
    secondaryColor: '#EC4899',
    logo: '💪',
    screens: {
      splash: { name: 'Splash', icon: '🚀' },
      onboarding: { name: 'Onboarding', icon: '👋' },
      login: { name: 'Login', icon: '🔐' },
      home: { name: 'Dashboard', icon: '🏠' },
      profile: { name: 'Perfil', icon: '👤' },
      workouts: { name: 'Entrenamientos', icon: '💪' },
      nutrition: { name: 'Nutrición', icon: '🥗' },
      chat: { name: 'Chat', icon: '💬' },
      calendar: { name: 'Calendario', icon: '📅' },
      settings: { name: 'Configuración', icon: '⚙️' },
    },
  });

  const iosDevices: Device[] = ['iPhone 15 Pro Max', 'iPhone 15', 'iPhone SE', 'iPad Pro'];
  const androidDevices: Device[] = ['Samsung Galaxy S24', 'Google Pixel 8', 'OnePlus 12'];

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleConfigChange = (key: string, value: any) => {
    setAppConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  const handlePlatformChange = (newPlatform: Platform) => {
    setPlatform(newPlatform);
    setDevice(newPlatform === 'iOS' ? 'iPhone 15 Pro Max' : 'Samsung Galaxy S24');
  };

  const handleDownloadScreenshot = () => {
    console.log('Descargando screenshot...');
  };

  const handleResetApp = () => {
    setCurrentScreen('splash');
    setSessionState('logged-out');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* HERO SECTION - Preview */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12 mx-4 md:mx-8 mt-8"
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
              <Eye className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Preview de tu <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">App</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed mb-6">
            Visualiza tu app antes de publicar en <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">iOS</span> y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">Android</span>
          </p>

          {/* Toggle: iOS / Android */}
          <div className="flex items-center gap-4">
            <div className="flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
              <button
                onClick={() => handlePlatformChange('iOS')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  platform === 'iOS'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                iOS
              </button>
              <button
                onClick={() => handlePlatformChange('Android')}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  platform === 'Android'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Smartphone className="w-5 h-5" />
                Android
              </button>
            </div>

            {/* Quick Stats Pills */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Layout className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{Object.keys(appConfig.screens).length} Pantallas</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MAIN CONTENT */}
      <div className="px-4 md:px-8 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* PANEL DE CONTROL LATERAL */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <PreviewTiempoReal
              appConfig={appConfig}
              onConfigChange={handleConfigChange}
              device={device}
              setDevice={setDevice}
              platform={platform}
              iosDevices={iosDevices}
              androidDevices={androidDevices}
              orientation={orientation}
              setOrientation={setOrientation}
              theme={theme}
              setTheme={setTheme}
              zoom={zoom}
              setZoom={setZoom}
              sessionState={sessionState}
              setSessionState={setSessionState}
              userType={userType}
              setUserType={setUserType}
              onReset={handleResetApp}
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />
          </motion.div>

          {/* MOCKUP INTERACTIVO - Centro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={showComparison ? 'lg:col-span-4' : 'lg:col-span-6'}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
              {/* Decoración de fondo */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                {/* Header con controles */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {device}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
                      className="p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 border border-purple-200"
                      title="Rotar dispositivo"
                    >
                      <RotateCw className="w-5 h-5 text-purple-600" />
                    </button>
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 border border-purple-200"
                      title="Pantalla completa"
                    >
                      <Maximize2 className="w-5 h-5 text-purple-600" />
                    </button>
                    <button
                      onClick={handleDownloadScreenshot}
                      className="p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 border border-purple-200"
                      title="Capturar pantalla"
                    >
                      <Camera className="w-5 h-5 text-purple-600" />
                    </button>
                  </div>
                </div>

                {/* Navegador de pantallas */}
                <NavigadorPantallas
                  screens={Object.keys(appConfig.screens)}
                  screensConfig={appConfig.screens}
                  currentScreen={currentScreen}
                  onScreenChange={handleScreenChange}
                />

                {/* Mockup del dispositivo */}
                <div className="flex justify-center">
                  <MockupInteractivo
                    platform={platform}
                    device={device}
                    orientation={orientation}
                    zoom={zoom}
                  >
                    <SimuladorMovil
                      currentScreen={currentScreen}
                      appConfig={appConfig}
                      platform={platform}
                      theme={theme}
                      sessionState={sessionState}
                      userType={userType}
                      onScreenChange={handleScreenChange}
                    />
                  </MockupInteractivo>
                </div>
              </div>
            </div>
          </motion.div>

          {/* MODO COMPARACIÓN (condicional) */}
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden h-full">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Comparación</h3>
                  <div className="flex justify-center">
                    <MockupInteractivo
                      platform={platform === 'iOS' ? 'Android' : 'iOS'}
                      device={platform === 'iOS' ? 'Samsung Galaxy S24' : 'iPhone 15 Pro Max'}
                      orientation={orientation}
                      zoom={zoom}
                    >
                      <SimuladorMovil
                        currentScreen={currentScreen}
                        appConfig={appConfig}
                        platform={platform === 'iOS' ? 'Android' : 'iOS'}
                        theme={theme}
                        sessionState={sessionState}
                        userType={userType}
                        onScreenChange={handleScreenChange}
                      />
                    </MockupInteractivo>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ACCIONES RÁPIDAS - Derecha */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="space-y-6">
              {/* Modo Comparación Toggle */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Layout className="w-5 h-5 text-purple-600" />
                  Modo Vista
                </h3>
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    showComparison
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {showComparison ? 'Vista Simple' : 'Vista Comparación'}
                </button>
              </div>

              {/* Acciones de descarga */}
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Download className="w-5 h-5 text-purple-600" />
                  Exportar
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={handleDownloadScreenshot}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Screenshot Actual
                  </button>
                  <button
                    className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Todas las Pantallas
                  </button>
                  <button
                    className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Compartir Preview
                  </button>
                </div>
              </div>

              {/* Info útil */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-xl p-6 text-white relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">💡 Tip Profesional</h3>
                  <p className="text-sm text-purple-100 leading-relaxed">
                    Usa el modo comparación para ver cómo se ve tu app en iOS y Android simultáneamente
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VistaPreviewAppPage;
