import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Grid3x3, List } from 'lucide-react';

interface NavigadorPantallasProps {
  screens: string[];
  screensConfig: any;
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

const NavigadorPantallas: React.FC<NavigadorPantallasProps> = ({
  screens,
  screensConfig,
  currentScreen,
  onScreenChange
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'dropdown'>('grid');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="mb-6">
      {/* Toggle entre Grid y Dropdown */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-700">Navegación de Pantallas</h4>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Vista Grid"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('dropdown')}
            className={`p-1.5 rounded-lg transition-all ${
              viewMode === 'dropdown'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title="Vista Dropdown"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Vista Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-5 gap-2">
          {screens.map((screen, index) => {
            const isActive = currentScreen === screen;
            const screenInfo = screensConfig[screen];

            return (
              <motion.button
                key={screen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => onScreenChange(screen)}
                className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl font-medium transition-all duration-300 group ${
                  isActive
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-purple-50 hover:to-pink-50 hover:shadow-md hover:scale-102'
                }`}
              >
                {/* Icono emoji */}
                <span className={`text-2xl transition-transform duration-300 ${
                  isActive ? '' : 'group-hover:scale-110'
                }`}>
                  {screenInfo?.icon || '📱'}
                </span>

                {/* Nombre de la pantalla */}
                <span className={`text-xs font-semibold text-center leading-tight ${
                  isActive ? 'text-white' : ''
                }`}>
                  {screenInfo?.name || screen}
                </span>

                {/* Indicador activo */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Vista Dropdown */}
      {viewMode === 'dropdown' && (
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{screensConfig[currentScreen]?.icon || '📱'}</span>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">
                  {screensConfig[currentScreen]?.name || currentScreen}
                </p>
                <p className="text-xs text-gray-600">Pantalla actual</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-purple-600" />
            </motion.div>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-[400px] overflow-y-auto"
            >
              {screens.map((screen, index) => {
                const isActive = currentScreen === screen;
                const screenInfo = screensConfig[screen];

                return (
                  <button
                    key={screen}
                    onClick={() => {
                      onScreenChange(screen);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 text-gray-900'
                    }`}
                  >
                    <span className="text-2xl">{screenInfo?.icon || '📱'}</span>
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-900'}`}>
                        {screenInfo?.name || screen}
                      </p>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </div>
      )}

      {/* Categorías de pantallas (opcional - para organizar mejor) */}
      {viewMode === 'grid' && (
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Autenticación</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Principal</span>
          </div>
          <div className="w-px h-3 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Funcional</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigadorPantallas;
