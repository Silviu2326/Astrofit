import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Activity, Droplets, Wheat, Download, History, HelpCircle } from 'lucide-react';
import TDEECalculator from './components/TDEECalculator';
import MacrosCalculator from './components/MacrosCalculator';
import HidratacionCalculator from './components/HidratacionCalculator';
import FibraCalculator from './components/FibraCalculator';
import ResultadosExport from './components/ResultadosExport';

type CalculatorTab = 'tdee' | 'macros' | 'hidratacion' | 'fibra';

interface CalculationHistory {
  id: string;
  type: CalculatorTab;
  date: string;
  inputs: string;
  results: string;
}

const mockHistory: CalculationHistory[] = [
  {
    id: '1',
    type: 'tdee',
    date: '2025-01-15',
    inputs: '70kg, 175cm, 30 años',
    results: 'TDEE: 2,340 kcal/día'
  },
  {
    id: '2',
    type: 'macros',
    date: '2025-01-14',
    inputs: 'TDEE: 2,000 kcal',
    results: 'P: 150g, C: 200g, G: 67g'
  },
  {
    id: '3',
    type: 'hidratacion',
    date: '2025-01-13',
    inputs: '70kg, actividad moderada',
    results: '2.45 litros/día'
  }
];

const CalculadorasNutricionalesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('tdee');

  const tabs = [
    { id: 'tdee' as CalculatorTab, label: 'TDEE Calculator', icon: Activity },
    { id: 'macros' as CalculatorTab, label: 'Macros Calculator', icon: Calculator },
    { id: 'hidratacion' as CalculatorTab, label: 'Hidratación', icon: Droplets },
    { id: 'fibra' as CalculatorTab, label: 'Fibra', icon: Wheat }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 pb-12">
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
              <Calculator className="w-10 h-10 text-cyan-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-cyan-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Calculadoras <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-200">Nutricionales</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Herramientas precisas para calcular tus <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">necesidades nutricionales</span> y optimizar tu alimentación
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-semibold text-white">Cálculos Precisos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Calculator className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-semibold text-white">Fórmulas Científicas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Download className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-semibold text-white">Exportable</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navegación por tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 border border-white/50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative overflow-hidden rounded-2xl p-4 transition-all duration-300 border-2
                    ${isActive
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-transparent shadow-lg'
                      : 'bg-white/50 text-gray-700 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50/50'
                    }
                  `}
                >
                  {/* Efecto shimmer en hover */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
                  )}

                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-cyan-600'}`} />
                    <span className="font-semibold text-sm text-center">{tab.label}</span>
                  </div>

                  {/* Indicador activo */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Contenido de la calculadora activa */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        {activeTab === 'tdee' && <TDEECalculator />}
        {activeTab === 'macros' && <MacrosCalculator />}
        {activeTab === 'hidratacion' && <HidratacionCalculator />}
        {activeTab === 'fibra' && <FibraCalculator />}
      </motion.div>

      {/* Historial de cálculos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 mb-8 relative overflow-hidden"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg">
              <History className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Historial de Cálculos</h2>
          </div>

          <div className="space-y-3">
            {mockHistory.map((calc, index) => (
              <motion.div
                key={calc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-cyan-50/30 hover:from-cyan-50 hover:to-blue-50 border border-gray-200 hover:border-cyan-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-full">
                        {calc.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">{calc.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold">Inputs:</span> {calc.inputs}
                    </p>
                    <p className="text-sm font-bold text-cyan-700">
                      {calc.results}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-cyan-100 text-cyan-700 rounded-xl font-semibold text-sm hover:bg-cyan-200 transition-colors">
                    Reutilizar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Export de resultados */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <ResultadosExport />
      </motion.div>
    </div>
  );
};

export default CalculadorasNutricionalesPage;
