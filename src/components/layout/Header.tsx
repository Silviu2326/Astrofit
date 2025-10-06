import React, { useState, useEffect } from 'react';
import { Bell, Search, User, LogOut, Menu, Settings, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../utils/localStorage';

interface HeaderProps {
  onLogout: () => void;
  onToggleSidebar: () => void;
}

interface UserData {
  name?: string;
  email?: string;
  plan?: string;
  role?: string;
}

export const Header: React.FC<HeaderProps> = ({ onLogout, onToggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState(3);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Format plan name for display
  const formatPlanName = (plan?: string) => {
    if (!plan) return 'Plan Core';

    const planNames: { [key: string]: string } = {
      'core': 'Plan Core',
      'plansolo-pro': 'Plan Solo Pro',
      'plansolo-max': 'Plan Solo Max',
      'plancreator-pro': 'Plan Creator Pro',
      'plancreator-max': 'Plan Creator Max',
      'planstudio-pro': 'Plan Studio Pro',
      'planstudio-max': 'Plan Studio Max',
      'planteams-pro': 'Plan Teams Pro',
      'planteams-elite': 'Plan Teams Elite'
    };

    return planNames[plan] || plan;
  };

  const handleNavigatePerfil = () => {
    setShowUserMenu(false);
    navigate('/dashboard/perfil');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="Mostrar/Ocultar menú"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar clientes, rutinas..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="h-5 w-5 text-gray-600" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
          >
            <div className="bg-blue-600 p-2 rounded-full">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-700">
                {currentUser?.name || currentUser?.email || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500">
                {formatPlanName(currentUser?.plan)}
              </p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="py-1">
                <button
                  onClick={handleNavigatePerfil}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <UserCircle className="h-4 w-4" />
                  <span>Mi Perfil</span>
                </button>
                <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="h-4 w-4" />
                  <span>Configuración</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
