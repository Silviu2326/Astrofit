import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code2, Palette, BarChart3, Layers, MousePointerClick } from 'lucide-react';
import GeneradorWidget from './components/GeneradorWidget';
import FormularioReserva from './components/FormularioReserva';
import IntegracionCRM from './components/IntegracionCRM';
import PersonalizacionDiseno from './components/PersonalizacionDiseno';
import AnaliticsWidget from './components/AnaliticsWidget';

const WidgetCaptacionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generador' | 'formulario' | 'crm' | 'diseno' | 'analytics'>('generador');

  const tabs = [
    { id: 'generador' as const, label: 'Constructor de Widgets', icon: Layers },
    { id: 'formulario' as const, label: 'Preview & Campos', icon: MousePointerClick },
    { id: 'crm' as const, label: 'Integración CRM', icon: Code2 },
    { id: 'diseno' as const, label: 'Diseño & Branding', icon: Palette },
    { id: 'analytics' as const, label: 'Analytics & Métricas', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Sparkles className="w-10 h-10 text-cyan-200 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-cyan-200 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Widgets de <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-200">Captación</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed mb-6">
            Crea widgets personalizados para capturar leads en tu sitio web. <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">Constructor visual</span> con preview en tiempo real.
          </p>

          {/* Indicadores pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Code2 className="w-5 h-5 text-cyan-200" />
              <span className="text-sm font-semibold text-white">Código Listo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Palette className="w-5 h-5 text-blue-200" />
              <span className="text-sm font-semibold text-white">100% Personalizable</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-indigo-200" />
              <span className="text-sm font-semibold text-white">Analytics Integrado</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs modernos */}
      <div className="mb-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 border border-white/50">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300
                    ${isActive
                      ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-600'
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-2xl"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="hidden sm:inline text-sm md:text-base">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenido de tabs con animación */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === 'generador' && <GeneradorWidget />}
        {activeTab === 'formulario' && <FormularioReserva />}
        {activeTab === 'crm' && <IntegracionCRM />}
        {activeTab === 'diseno' && <PersonalizacionDiseno />}
        {activeTab === 'analytics' && <AnaliticsWidget />}
      </motion.div>
    </div>
  );
};

export default WidgetCaptacionPage;
