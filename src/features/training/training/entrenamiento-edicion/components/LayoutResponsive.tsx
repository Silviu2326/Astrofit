import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronLeft, ChevronRight, Maximize2, 
  Minimize2, Smartphone, Monitor, Tablet, 
  Grid3X3, List, Settings, Bell, User
} from 'lucide-react';

interface LayoutResponsiveProps {
  children: React.ReactNode;
  onToggleSidebar?: () => void;
  onTogglePanel?: (panel: 'catalogo' | 'metricas') => void;
  sidebarOpen?: boolean;
  panelOpen?: 'catalogo' | 'metricas' | null;
  onViewChange?: (view: 'mobile' | 'tablet' | 'desktop') => void;
  currentView?: 'mobile' | 'tablet' | 'desktop';
}

const LayoutResponsive: React.FC<LayoutResponsiveProps> = ({
  children,
  onToggleSidebar,
  onTogglePanel,
  sidebarOpen = true,
  panelOpen = null,
  onViewChange,
  currentView = 'desktop'
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showViewSelector, setShowViewSelector] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [floatingActionOpen, setFloatingActionOpen] = useState(false);

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Determinar el layout basado en el tamaño de pantalla
  const getLayoutClass = () => {
    if (isMobile) {
      return 'flex-col';
    } else if (isTablet) {
      return 'flex-col lg:flex-row';
    } else {
      return 'flex-row';
    }
  };

  const getSidebarClass = () => {
    if (isMobile) {
      return sidebarOpen ? 'w-full' : 'w-0';
    } else if (isTablet) {
      return sidebarOpen ? 'w-80' : 'w-0';
    } else {
      return sidebarCollapsed ? 'w-16' : 'w-80';
    }
  };

  const getMainContentClass = () => {
    if (isMobile) {
      return 'w-full';
    } else if (isTablet) {
      return 'w-full lg:flex-1';
    } else {
      return 'flex-1';
    }
  };

  const handleViewChange = (view: 'mobile' | 'tablet' | 'desktop') => {
    onViewChange?.(view);
    setShowViewSelector(false);
  };

  const getViewIcon = (view: 'mobile' | 'tablet' | 'desktop') => {
    switch (view) {
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getViewLabel = (view: 'mobile' | 'tablet' | 'desktop') => {
    switch (view) {
      case 'mobile':
        return 'Móvil';
      case 'tablet':
        return 'Tablet';
      case 'desktop':
        return 'Desktop';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header responsive */}
      <motion.div 
        className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          {/* Botón de menú para móvil */}
          {isMobile && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
          )}

          {/* Logo/Título */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Grid3X3 className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Editor de Entrenamiento</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Selector de vista */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowViewSelector(!showViewSelector)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            >
              {getViewIcon(currentView)}
              <span className="hidden sm:inline text-sm font-medium">
                {getViewLabel(currentView)}
              </span>
            </motion.button>

            <AnimatePresence>
              {showViewSelector && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                >
                  {(['mobile', 'tablet', 'desktop'] as const).map(view => (
                    <motion.button
                      key={view}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleViewChange(view)}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                        currentView === view ? 'bg-orange-50 text-orange-700' : 'text-gray-700'
                      }`}
                    >
                      {getViewIcon(view)}
                      <span className="text-sm font-medium">{getViewLabel(view)}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Botones de panel para tablet/desktop */}
          {!isMobile && (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTogglePanel?.('catalogo')}
                className={`p-2 rounded-lg transition-colors ${
                  panelOpen === 'catalogo' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <List className="w-4 h-4" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTogglePanel?.('metricas')}
                className={`p-2 rounded-lg transition-colors ${
                  panelOpen === 'metricas' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bell className="w-4 h-4" />
              </motion.button>
            </div>
          )}

          {/* Botón de configuración */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Layout principal */}
      <div className={`flex-1 flex overflow-hidden ${getLayoutClass()}`}>
        {/* Sidebar para desktop/tablet */}
        {!isMobile && (
          <motion.div
            className={`bg-white border-r border-gray-200 transition-all duration-300 ${getSidebarClass()} ${
              sidebarOpen ? 'block' : 'hidden'
            }`}
            initial={{ x: -320 }}
            animate={{ x: sidebarOpen ? 0 : -320 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full flex flex-col">
              {/* Header del sidebar */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Panel de Control</h3>
                  {!isMobile && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Contenido del sidebar */}
              <div className="flex-1 overflow-y-auto p-4">
                {!sidebarCollapsed && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Progreso Semanal</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Sesiones</span>
                          <span className="font-semibold">4/5</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Acciones Rápidas</h4>
                      <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                        <Plus className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Nueva Sesión</span>
                      </button>
                      <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                        <Copy className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Duplicar Semana</span>
                      </button>
                      <button className="w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3">
                        <Settings className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Configuración</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Contenido principal */}
        <div className={`${getMainContentClass()} flex flex-col`}>
          {children}
        </div>

        {/* Panel derecho para desktop */}
        {isDesktop && panelOpen && (
          <motion.div
            className="w-80 bg-white border-l border-gray-200"
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {panelOpen === 'catalogo' ? 'Catálogo' : 'Métricas'}
                  </h3>
                  <button
                    onClick={() => onTogglePanel?.(null)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {panelOpen === 'catalogo' && (
                  <div className="space-y-4">
                    <p className="text-gray-600">Catálogo de ejercicios aquí...</p>
                  </div>
                )}
                {panelOpen === 'metricas' && (
                  <div className="space-y-4">
                    <p className="text-gray-600">Métricas y estadísticas aquí...</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Action Button para móvil */}
      {isMobile && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setFloatingActionOpen(!floatingActionOpen)}
            className="w-14 h-14 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full shadow-lg flex items-center justify-center"
          >
            <Plus className="w-6 h-6" />
          </motion.button>

          <AnimatePresence>
            {floatingActionOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-16 right-0 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
              >
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Plus className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Nueva Sesión</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Copy className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Duplicar</span>
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3">
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Configurar</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Overlay para móvil cuando sidebar está abierto */}
      {isMobile && sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onToggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}
    </div>
  );
};

export default LayoutResponsive;

