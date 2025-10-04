import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Eye, 
  Settings, 
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Smartphone as PhoneIcon,
  Monitor,
  Tablet
} from 'lucide-react';
import MockupInteractivo from './components/MockupInteractivo';
import NavigadorPantallas from './components/NavigadorPantallas';
import PreviewTiempoReal from './components/PreviewTiempoReal';
import SimuladorMovil from './components/SimuladorMovil';

const VistaPreviewAppPage: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<'iOS' | 'Android' | 'Tablet' | 'Desktop'>('iOS');
  const [appConfig, setAppConfig] = useState({
    appName: 'Mi App',
    primaryColor: '#3B82F6',
    secondaryColor: '#60A5FA',
    icon: 'default-icon',
    screens: {
      home: { name: 'Inicio', content: 'Bienvenido a mi app!' },
      profile: { name: 'Perfil', content: 'Contenido del perfil.' },
      settings: { name: 'Ajustes', content: 'Configuraciones de la app.' },
    },
  });

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleConfigChange = (key: string, value: any) => {
    setAppConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  const devices = [
    { id: 'iOS', name: 'iPhone', icon: PhoneIcon, color: 'from-blue-500 to-indigo-600' },
    { id: 'Android', name: 'Android', icon: PhoneIcon, color: 'from-green-500 to-emerald-600' },
    { id: 'Tablet', name: 'Tablet', icon: Tablet, color: 'from-purple-500 to-pink-600' },
    { id: 'Desktop', name: 'Desktop', icon: Monitor, color: 'from-gray-500 to-slate-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
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
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Eye className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Vista Previa <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">App</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Previsualiza tu aplicación en <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">tiempo real</span> y prueba todas las funcionalidades
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-white">En Vivo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Smartphone className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Multi-Dispositivo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Settings className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Interactivo</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controles de Dispositivo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Selector de Dispositivos */}
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">Dispositivo:</h3>
            <div className="flex gap-2">
              {devices.map((device) => {
                const IconComponent = device.icon;
                return (
                  <motion.button
                    key={device.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDevice(device.id as 'iOS' | 'Android' | 'Tablet' | 'Desktop')}
                    className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                      selectedDevice === device.id
                        ? `bg-gradient-to-br ${device.color} text-white border-transparent shadow-lg`
                        : 'bg-white/60 backdrop-blur-sm text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Controles de Reproducción */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/60 backdrop-blur-sm text-gray-600 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              <RotateCcw className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/60 backdrop-blur-sm text-gray-600 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              <Maximize2 className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Panel de Configuración en Tiempo Real */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 rounded-2xl mb-6 relative overflow-hidden">
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Settings className="w-6 h-6" />
                </div>
                Configuración en Tiempo Real
              </h2>
            </div>

            {/* Contenido del Preview */}
            <div className="space-y-6">
              <PreviewTiempoReal appConfig={appConfig} onConfigChange={handleConfigChange} />
            </div>
          </div>
        </motion.div>

        {/* Panel de Simulador */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Header con gradiente */}
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 rounded-2xl mb-6 relative overflow-hidden">
              {/* Pattern de fondo */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Smartphone className="w-6 h-6" />
                </div>
                Simulador Interactivo
              </h2>
            </div>

            {/* Navegador de Pantallas */}
            <div className="mb-6">
              <NavigadorPantallas
                screens={Object.keys(appConfig.screens)}
                currentScreen={currentScreen}
                onScreenChange={handleScreenChange}
              />
            </div>

            {/* Mockup Interactivo */}
            <div className="flex justify-center">
              <MockupInteractivo platform={selectedDevice === 'iOS' || selectedDevice === 'Android' ? selectedDevice : 'iOS'}>
                <SimuladorMovil
                  currentScreen={currentScreen}
                  appConfig={appConfig}
                  platform={selectedDevice === 'iOS' || selectedDevice === 'Android' ? selectedDevice : 'iOS'}
                />
              </MockupInteractivo>
            </div>

            {/* Indicadores de Estado */}
            <div className="mt-6 flex justify-center gap-4">
              <div className="flex items-center gap-2 bg-green-50 rounded-full px-3 py-1 border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">Sincronizado</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1 border border-blue-200">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-medium text-blue-700">{selectedDevice}</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 rounded-full px-3 py-1 border border-purple-200">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs font-medium text-purple-700">{currentScreen}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VistaPreviewAppPage;
