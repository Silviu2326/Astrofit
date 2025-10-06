import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Activity, Heart, TrendingUp, Watch, AlertCircle, Target, BarChart3, Sparkles } from 'lucide-react';
import PerfilDeportivo from './components/PerfilDeportivo';
import AnalisisBiomecanico from './components/AnalisisBiomecanico';
import PerfilPsicologico from './components/PerfilPsicologico';
import PlanDesarrollo from './components/PlanDesarrollo';
import IntegracionWearables from './components/IntegracionWearables';
import AlertasMedicas from './components/AlertasMedicas';
import AnalisisTalento from './components/AnalisisTalento';
import TrackingDesarrollo from './components/TrackingDesarrollo';
import RecomendacionesPersonalizadas from './components/RecomendacionesPersonalizadas';

const FichaAtletaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('perfil');

  const renderContent = () => {
    switch (activeTab) {
      case 'perfil':
        return <PerfilDeportivo />;
      case 'personal':
        return (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  Datos Personales
                </h2>
              </div>
              <p className="text-gray-700">Aquí se mostrarán los datos personales del atleta.</p>
            </div>
          </div>
        );
      case 'lesiones':
        return (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-red-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                  Historial de Lesiones
                </h2>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">01/01/2023 - Esguince de tobillo</p>
                      <p className="text-sm text-gray-600 mt-1">Tratamiento: Reposo, fisioterapia</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">15/05/2024 - Distensión muscular</p>
                      <p className="text-sm text-gray-600 mt-1">Tratamiento: Hielo, estiramientos</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      case 'progression':
        return (
          <div className="space-y-6">
            {/* Header Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
                    Progresión Física
                  </h2>
                </div>
                <p className="text-gray-700">Gráficos simples de evolución (ej. peso, altura, rendimiento).</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Peso', value: '75 kg', progress: 85, icon: Activity },
                { label: 'Altura', value: '180 cm', progress: 100, icon: TrendingUp },
                { label: 'Rendimiento', value: '92%', progress: 92, icon: Target }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
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

                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-5 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7" />
                      </div>

                      <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                        {stat.label}
                      </p>

                      <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                        {stat.value}
                      </p>

                      {/* Progress bar */}
                      <div className="w-full bg-emerald-200 rounded-full h-3 overflow-hidden shadow-inner">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.progress}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                          className="h-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      case 'biomecanico':
        return <AnalisisBiomecanico />;
      case 'psicologico':
        return <PerfilPsicologico />;
      case 'desarrollo':
        return <PlanDesarrollo />;
      case 'wearables':
        return <IntegracionWearables />;
      case 'alertas':
        return <AlertasMedicas />;
      case 'talento':
        return <AnalisisTalento />;
      case 'tracking':
        return <TrackingDesarrollo />;
      case 'recomendaciones':
        return <RecomendacionesPersonalizadas />;
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'perfil', label: 'Perfil Básico', icon: User },
    { id: 'personal', label: 'Datos Personales', icon: User },
    { id: 'lesiones', label: 'Lesiones', icon: Heart },
    { id: 'progression', label: 'Progresión', icon: TrendingUp },
    { id: 'biomecanico', label: 'Biomecánico', icon: Activity },
    { id: 'psicologico', label: 'Psicológico', icon: Heart },
    { id: 'desarrollo', label: 'Desarrollo', icon: Target },
    { id: 'wearables', label: 'Wearables', icon: Watch },
    { id: 'alertas', label: 'Alertas', icon: AlertCircle },
    { id: 'talento', label: 'Talento', icon: Sparkles },
    { id: 'tracking', label: 'Tracking', icon: BarChart3 },
    { id: 'recomendaciones', label: 'Recomendaciones', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12 mx-4 md:mx-8 mt-4"
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
              <Sparkles className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Ficha de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Atleta</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl text-blue-100 max-w-3xl leading-relaxed">
            Perfil completo del atleta con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">métricas avanzadas</span> y seguimiento integral
          </p>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <div className="mx-4 md:mx-8 mb-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 border border-white/50">
          <nav className="flex flex-wrap gap-2" aria-label="Tabs">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                      : 'bg-white/50 text-gray-700 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-4 md:mx-8"
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default FichaAtletaPage;
