import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Dumbbell, Salad, MessageCircle, Calendar, Settings, ChevronLeft, Bell, Search, Plus, TrendingUp, Award, Clock, Heart, Star } from 'lucide-react';

interface SimuladorMovilProps {
  currentScreen: string;
  appConfig: any;
  platform: 'iOS' | 'Android';
  theme?: 'light' | 'dark';
  sessionState?: 'logged-in' | 'logged-out';
  userType?: 'free' | 'premium';
  onScreenChange?: (screen: string) => void;
}

const SimuladorMovil: React.FC<SimuladorMovilProps> = ({
  currentScreen,
  appConfig,
  platform,
  theme = 'light',
  sessionState = 'logged-out',
  userType = 'free',
  onScreenChange
}) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-gray-900' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-gray-900';

  // Renderiza el contenido de cada pantalla
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen appConfig={appConfig} />;
      case 'onboarding':
        return <OnboardingScreen appConfig={appConfig} onScreenChange={onScreenChange} />;
      case 'login':
        return <LoginScreen appConfig={appConfig} onScreenChange={onScreenChange} />;
      case 'home':
        return <HomeScreen appConfig={appConfig} userType={userType} isDark={isDark} />;
      case 'profile':
        return <ProfileScreen appConfig={appConfig} userType={userType} isDark={isDark} />;
      case 'workouts':
        return <WorkoutsScreen appConfig={appConfig} isDark={isDark} />;
      case 'nutrition':
        return <NutritionScreen appConfig={appConfig} isDark={isDark} />;
      case 'chat':
        return <ChatScreen appConfig={appConfig} isDark={isDark} />;
      case 'calendar':
        return <CalendarScreen appConfig={appConfig} isDark={isDark} />;
      case 'settings':
        return <SettingsScreen appConfig={appConfig} isDark={isDark} />;
      default:
        return <SplashScreen appConfig={appConfig} />;
    }
  };

  // Iconos para el bottom navigation
  const getNavIcon = (screenKey: string) => {
    switch (screenKey) {
      case 'home': return Home;
      case 'workouts': return Dumbbell;
      case 'nutrition': return Salad;
      case 'chat': return MessageCircle;
      case 'profile': return User;
      default: return Home;
    }
  };

  const mainScreens = ['home', 'workouts', 'nutrition', 'chat', 'profile'];
  const shouldShowNav = sessionState === 'logged-in' && mainScreens.includes(currentScreen);

  return (
    <div className={`w-full h-full flex flex-col ${bgColor} overflow-hidden`}>
      {/* Contenido de la pantalla con animación */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation (solo en pantallas principales) */}
      {shouldShowNav && (
        <div className={`flex justify-around items-center ${isDark ? 'bg-gray-800' : 'bg-white'} border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} px-2 py-2`}>
          {mainScreens.map((screenKey) => {
            const Icon = getNavIcon(screenKey);
            const isActive = currentScreen === screenKey;
            return (
              <button
                key={screenKey}
                onClick={() => onScreenChange?.(screenKey)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'text-purple-600'
                    : isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[10px] font-medium">{appConfig.screens[screenKey]?.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============ PANTALLAS ============

// 1. Splash Screen
const SplashScreen: React.FC<{ appConfig: any }> = ({ appConfig }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 relative overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="text-8xl mb-6 relative z-10"
    >
      {appConfig.logo}
    </motion.div>
    <motion.h1
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="text-4xl font-bold text-white mb-2 relative z-10"
    >
      {appConfig.appName}
    </motion.h1>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mt-8 relative z-10"
    >
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </motion.div>
  </div>
);

// 2. Onboarding Screen
const OnboardingScreen: React.FC<{ appConfig: any; onScreenChange?: (screen: string) => void }> = ({ appConfig, onScreenChange }) => (
  <div className="w-full h-full flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <div className="text-7xl mb-6">🏋️</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Transforma tu cuerpo</h2>
      <p className="text-lg text-gray-600 text-center mb-8 leading-relaxed">
        Entrena con planes personalizados y alcanza tus objetivos
      </p>
      <div className="flex gap-2 mb-12">
        <div className="w-3 h-3 rounded-full bg-purple-600"></div>
        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
      </div>
    </div>
    <div className="p-6 space-y-3">
      <button
        onClick={() => onScreenChange?.('login')}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg"
      >
        Comenzar
      </button>
      <button className="w-full py-4 bg-white text-gray-700 rounded-2xl font-semibold border-2 border-gray-200">
        Omitir
      </button>
    </div>
  </div>
);

// 3. Login Screen
const LoginScreen: React.FC<{ appConfig: any; onScreenChange?: (screen: string) => void }> = ({ appConfig, onScreenChange }) => (
  <div className="w-full h-full flex flex-col">
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 pb-16">
      <button className="text-white mb-8">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <h1 className="text-4xl font-bold text-white mb-2">Bienvenido</h1>
      <p className="text-purple-100">Inicia sesión para continuar</p>
    </div>
    <div className="flex-1 bg-white rounded-t-3xl -mt-8 p-8">
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none"
            placeholder="tu@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 outline-none"
            placeholder="••••••••"
          />
        </div>
      </div>
      <button
        onClick={() => onScreenChange?.('home')}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg mb-4"
      >
        Iniciar Sesión
      </button>
      <button className="w-full text-sm text-purple-600 font-semibold">
        ¿Olvidaste tu contraseña?
      </button>
    </div>
  </div>
);

// 4. Home Dashboard
const HomeScreen: React.FC<{ appConfig: any; userType: string; isDark: boolean }> = ({ appConfig, userType, isDark }) => (
  <div className={`w-full min-h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6 pb-24`}>
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Hola, Carlos 👋</h1>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Lunes, 2 de Octubre</p>
      </div>
      <div className="flex gap-2">
        <button className={`p-2 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow`}>
          <Search className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
        </button>
        <button className={`p-2 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow relative`}>
          <Bell className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </button>
      </div>
    </div>

    {/* Premium Badge (if premium) */}
    {userType === 'premium' && (
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-white" />
          <div>
            <h3 className="text-white font-bold">Premium</h3>
            <p className="text-yellow-100 text-xs">Acceso completo</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-white text-orange-600 rounded-xl text-sm font-semibold">
          Ver Beneficios
        </button>
      </div>
    )}

    {/* Stats Grid */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow`}>
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-3">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>24</p>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Entrenamientos</p>
      </div>
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow`}>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3">
          <Award className="w-5 h-5 text-white" />
        </div>
        <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>8</p>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Objetivos</p>
      </div>
    </div>

    {/* Next Workout */}
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow mb-6`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Próximo Entrenamiento</h3>
        <Clock className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl">
          💪
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Fuerza Superior</h4>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>45 min • Nivel Intermedio</p>
        </div>
        <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-xl font-semibold text-sm">
          Iniciar
        </button>
      </div>
    </div>

    {/* Quick Actions */}
    <h3 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Acceso Rápido</h3>
    <div className="grid grid-cols-2 gap-3">
      <button className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow flex flex-col items-center gap-2`}>
        <Dumbbell className="w-6 h-6 text-purple-600" />
        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Entrenar</span>
      </button>
      <button className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow flex flex-col items-center gap-2`}>
        <Salad className="w-6 h-6 text-green-600" />
        <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Nutrición</span>
      </button>
    </div>
  </div>
);

// 5. Profile Screen
const ProfileScreen: React.FC<{ appConfig: any; userType: string; isDark: boolean }> = ({ appConfig, userType, isDark }) => (
  <div className={`w-full min-h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} pb-24`}>
    {/* Header con gradiente */}
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 pt-6 pb-20 px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Perfil</h1>
        <button className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl mb-3 shadow-xl">
          👤
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">Carlos Martínez</h2>
        <p className="text-purple-100">carlos@email.com</p>
        {userType === 'premium' && (
          <div className="mt-3 px-4 py-1 bg-yellow-400 rounded-full flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-900" />
            <span className="text-sm font-bold text-yellow-900">Premium</span>
          </div>
        )}
      </div>
    </div>

    <div className="px-6 -mt-12">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Peso', value: '75kg', icon: '⚖️' },
          { label: 'Altura', value: '178cm', icon: '📏' },
          { label: 'IMC', value: '23.7', icon: '📊' }
        ].map((stat, i) => (
          <div key={i} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow text-center`}>
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{stat.label}</p>
            <p className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow mb-6`}>
        <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Progreso Semanal</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Entrenamientos</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>5/7</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '71%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Calorías</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>1800/2000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 6-10. Pantallas adicionales (versiones simplificadas)
const WorkoutsScreen: React.FC<{ appConfig: any; isDark: boolean }> = ({ appConfig, isDark }) => (
  <div className={`w-full min-h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6 pb-24`}>
    <h1 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Entrenamientos</h1>
    <div className="space-y-4">
      {['Fuerza Superior', 'Cardio HIIT', 'Pierna y Glúteo'].map((workout, i) => (
        <div key={i} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow flex items-center gap-4`}>
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl">
            💪
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{workout}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>45 min • Intermedio</p>
          </div>
          <Heart className="w-5 h-5 text-gray-400" />
        </div>
      ))}
    </div>
  </div>
);

const NutritionScreen: React.FC<{ appConfig: any; isDark: boolean }> = ({ appConfig, isDark }) => (
  <div className={`w-full min-h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6 pb-24`}>
    <h1 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Nutrición</h1>
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-5 shadow mb-6`}>
      <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Calorías Hoy</h3>
      <div className="text-center mb-4">
        <p className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>1,847</p>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>de 2,000 kcal</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div className="bg-gradient-to-r from-green-500 to-teal-500 h-3 rounded-full" style={{ width: '92%' }}></div>
      </div>
    </div>
  </div>
);

const ChatScreen: React.FC<{ appConfig: any; isDark: boolean }> = ({ appConfig, isDark }) => (
  <div className={`w-full min-h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col pb-24`}>
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Mensajes</h1>
    </div>
    <div className="flex-1 p-6 space-y-4">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">E</div>
        <div className={`flex-1 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl rounded-tl-none p-4 shadow`}>
          <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>¡Hola! ¿Cómo vas con tu rutina?</p>
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <div className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl rounded-tr-none p-4 shadow max-w-[70%] ml-auto">
          <p className="text-sm text-white">¡Muy bien! Ya completé 3 días</p>
        </div>
      </div>
    </div>
  </div>
);

const CalendarScreen: React.FC<{ appConfig: any; isDark: boolean }> = ({ appConfig, isDark }) => (
  <div className={`w-full min-h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6 pb-24`}>
    <h1 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Calendario</h1>
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow mb-6`}>
      <div className="grid grid-cols-7 gap-2 text-center">
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, i) => (
          <div key={i} className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{day}</div>
        ))}
        {Array.from({ length: 35 }, (_, i) => (
          <div key={i} className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
            i === 14 ? 'bg-purple-500 text-white font-bold' :
            i % 7 === 0 ? isDark ? 'text-purple-400' : 'text-purple-600' :
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SettingsScreen: React.FC<{ appConfig: any; isDark: boolean }> = ({ appConfig, isDark }) => (
  <div className={`w-full min-h-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6 pb-24`}>
    <h1 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Configuración</h1>
    <div className="space-y-3">
      {['Notificaciones', 'Privacidad', 'Idioma', 'Ayuda'].map((item, i) => (
        <button key={i} className={`w-full ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-4 shadow flex items-center justify-between`}>
          <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item}</span>
          <ChevronLeft className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-400'} transform rotate-180`} />
        </button>
      ))}
    </div>
  </div>
);

export default SimuladorMovil;
