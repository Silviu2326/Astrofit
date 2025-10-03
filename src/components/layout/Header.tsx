import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, User, LogOut, Menu, Settings, Sparkles } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout, onToggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState(3);

  const handleToggleSidebar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSidebar();
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/50 h-16 flex items-center justify-between px-6 relative z-50 sticky top-0">
      <div className="flex items-center gap-4 relative z-50">
        {/* Botón hamburguesa modernizado */}
        <button
          onClick={handleToggleSidebar}
          className="p-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl text-white transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer active:scale-95"
          title="Mostrar/Ocultar menú"
          type="button"
          style={{ pointerEvents: 'auto' }}
        >
          <Menu className="w-5 h-5 pointer-events-none" />
        </button>

        {/* Buscador modernizado */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar clientes, rutinas..."
            className="pl-10 pr-4 py-2 border border-gray-200 bg-white/60 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent w-64 text-sm transition-all duration-300 hover:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notificaciones */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 hover:bg-indigo-50 rounded-xl transition-all duration-300"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          {notifications > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
            >
              {notifications}
            </motion.span>
          )}
        </motion.button>

        {/* Menú de usuario */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 pr-4 hover:bg-indigo-50 rounded-xl transition-all duration-300"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-700">Carlos Entrenador</p>
              <p className="text-xs text-gray-500">Entrenador Principal</p>
            </div>
          </motion.button>

          {showUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-52 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 z-50 overflow-hidden"
            >
              <div className="py-2">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="font-medium">Configuración</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="font-medium">Cerrar Sesión</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};