import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Activity,
  Sparkles,
  FileText,
  Users,
  Target,
  AlertCircle
} from 'lucide-react';
import DashboardWellness from './components/DashboardWellness';
import AnalizadorPatrones from './components/AnalizadorPatrones';
import ComparadorPeriodos from './components/ComparadorPeriodos';
import PrediccionRendimiento from './components/PrediccionRendimiento';
import AnalisisCorrelacion from './components/AnalisisCorrelacion';
import DetectorOvertraining from './components/DetectorOvertraining';
import ReportesAutomaticos from './components/ReportesAutomaticos';
import BenchmarkingEquipos from './components/BenchmarkingEquipos';
import RecomendacionesCarga from './components/RecomendacionesCarga';

const InformesSemanalesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'patrones', label: 'Patrones', icon: TrendingUp },
    { id: 'periodos', label: 'Períodos', icon: Calendar },
    { id: 'prediccion', label: 'Predicción', icon: Target },
    { id: 'correlacion', label: 'Correlación', icon: Activity },
    { id: 'overtraining', label: 'Overtraining', icon: AlertCircle },
    { id: 'reportes', label: 'Reportes', icon: FileText },
    { id: 'benchmarking', label: 'Benchmarking', icon: Users },
    { id: 'recomendaciones', label: 'Recomendaciones', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <BarChart3 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Informes <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Semanales</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Análisis avanzado de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">wellness</span> y rendimiento del equipo
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Análisis en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Target className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Predicciones IA</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl mb-8 p-2 border border-white/50"
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold text-sm
                  transition-all duration-300 relative overflow-hidden group
                  ${isActive
                    ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
                  }
                `}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'text-yellow-300' : 'text-gray-600'}`} />
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === 'dashboard' && <DashboardWellness />}
        {activeTab === 'patrones' && <AnalizadorPatrones />}
        {activeTab === 'periodos' && <ComparadorPeriodos />}
        {activeTab === 'prediccion' && <PrediccionRendimiento />}
        {activeTab === 'correlacion' && <AnalisisCorrelacion />}
        {activeTab === 'overtraining' && <DetectorOvertraining />}
        {activeTab === 'reportes' && <ReportesAutomaticos />}
        {activeTab === 'benchmarking' && <BenchmarkingEquipos />}
        {activeTab === 'recomendaciones' && <RecomendacionesCarga />}
      </motion.div>
    </div>
  );
};

export default InformesSemanalesPage;
