import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Sun, Moon, RotateCw, ZoomIn, ZoomOut, LogIn, LogOut, Star, Crown, RefreshCw, Palette, Type, Image as ImageIcon, Settings, ChevronRight } from 'lucide-react';

interface PreviewTiempoRealProps {
  appConfig: any;
  onConfigChange: (key: string, value: any) => void;
  device: string;
  setDevice: (device: any) => void;
  platform: 'iOS' | 'Android';
  iosDevices: string[];
  androidDevices: string[];
  orientation: 'portrait' | 'landscape';
  setOrientation: (orientation: 'portrait' | 'landscape') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  sessionState: 'logged-in' | 'logged-out';
  setSessionState: (state: 'logged-in' | 'logged-out') => void;
  userType: 'free' | 'premium';
  setUserType: (type: 'free' | 'premium') => void;
  onReset: () => void;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

const PreviewTiempoReal: React.FC<PreviewTiempoRealProps> = ({
  appConfig,
  onConfigChange,
  device,
  setDevice,
  platform,
  iosDevices,
  androidDevices,
  orientation,
  setOrientation,
  theme,
  setTheme,
  zoom,
  setZoom,
  sessionState,
  setSessionState,
  userType,
  setUserType,
  onReset,
  currentScreen,
  setCurrentScreen
}) => {
  const availableDevices = platform === 'iOS' ? iosDevices : androidDevices;

  return (
    <div className="space-y-6">
      {/* SELECTOR DE DISPOSITIVO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-purple-600" />
            Dispositivo
          </h3>

          {/* Dropdown de dispositivos */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Modelo</label>
              <select
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white text-gray-900 font-medium"
              >
                {availableDevices.map((dev) => (
                  <option key={dev} value={dev}>{dev}</option>
                ))}
              </select>
            </div>

            {/* Orientación */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Orientación</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setOrientation('portrait')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    orientation === 'portrait'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Portrait
                </button>
                <button
                  onClick={() => setOrientation('landscape')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    orientation === 'landscape'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <RotateCw className="w-4 h-4" />
                  Landscape
                </button>
              </div>
            </div>

            {/* Tema */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tema</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
              </div>
            </div>

            {/* Zoom */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Zoom: {zoom}%
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setZoom(Math.max(50, zoom - 10))}
                  className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
                >
                  <ZoomOut className="w-4 h-4 text-gray-700" />
                </button>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={zoom}
                  onChange={(e) => setZoom(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-purple-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600"
                />
                <button
                  onClick={() => setZoom(Math.min(150, zoom + 10))}
                  className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all"
                >
                  <ZoomIn className="w-4 h-4 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADO DE SESIÓN Y USUARIO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            Estado de Sesión
          </h3>

          <div className="space-y-3">
            {/* Estado de sesión */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sesión</label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSessionState('logged-out');
                    setCurrentScreen('splash');
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    sessionState === 'logged-out'
                      ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
                <button
                  onClick={() => {
                    setSessionState('logged-in');
                    setCurrentScreen('home');
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    sessionState === 'logged-in'
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              </div>
            </div>

            {/* Tipo de usuario */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Usuario</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setUserType('free')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    userType === 'free'
                      ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  Free
                </button>
                <button
                  onClick={() => setUserType('premium')}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    userType === 'premium'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Crown className="w-4 h-4" />
                  Premium
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* QUICK ACTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-purple-600" />
            Acciones Rápidas
          </h3>

          <div className="space-y-2">
            <button
              onClick={onReset}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset App
            </button>
            <button
              onClick={() => setCurrentScreen('splash')}
              className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Ir a Splash
            </button>
            <button
              onClick={() => setCurrentScreen('home')}
              className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Ir a Home
            </button>
          </div>
        </div>
      </motion.div>

      {/* CONFIGURACIÓN DE LA APP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            Personalización
          </h3>

          <div className="space-y-4">
            {/* Nombre de la app */}
            <div>
              <label htmlFor="appName" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Type className="w-4 h-4" />
                Nombre de la App
              </label>
              <input
                type="text"
                id="appName"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white"
                value={appConfig.appName}
                onChange={(e) => onConfigChange('appName', e.target.value)}
                placeholder="Nombre de tu app"
              />
            </div>

            {/* Logo emoji */}
            <div>
              <label htmlFor="logo" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Logo (Emoji)
              </label>
              <input
                type="text"
                id="logo"
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white text-4xl text-center"
                value={appConfig.logo}
                onChange={(e) => onConfigChange('logo', e.target.value)}
                maxLength={2}
              />
            </div>

            {/* Colores */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Color Primario</label>
                <div className="relative">
                  <input
                    type="color"
                    className="w-full h-12 rounded-2xl border-2 border-gray-200 cursor-pointer"
                    value={appConfig.primaryColor}
                    onChange={(e) => onConfigChange('primaryColor', e.target.value)}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-xs font-bold text-white mix-blend-difference">
                    {appConfig.primaryColor}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Color Secundario</label>
                <div className="relative">
                  <input
                    type="color"
                    className="w-full h-12 rounded-2xl border-2 border-gray-200 cursor-pointer"
                    value={appConfig.secondaryColor}
                    onChange={(e) => onConfigChange('secondaryColor', e.target.value)}
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-xs font-bold text-white mix-blend-difference">
                    {appConfig.secondaryColor}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* INFO TIP */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl p-5 text-white relative overflow-hidden"
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            💡 Consejo
          </h4>
          <p className="text-sm text-purple-100 leading-relaxed">
            Navega entre las pantallas para ver la experiencia completa de tu app
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PreviewTiempoReal;
