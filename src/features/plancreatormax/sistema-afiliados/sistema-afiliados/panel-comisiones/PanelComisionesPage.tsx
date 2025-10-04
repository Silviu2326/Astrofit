import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calculator, BarChart3 } from 'lucide-react';
import DashboardComisiones from './components/DashboardComisiones';
import CalculadoraComisiones from './components/CalculadoraComisiones';
import ListaTransacciones from './components/ListaTransacciones';

const PanelComisionesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <DollarSign className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Panel de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Comisiones</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl leading-relaxed">
            Gestiona y optimiza las <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">comisiones de afiliados</span> con herramientas avanzadas de análisis
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Rendimiento en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Calculator className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Cálculo Automático</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <BarChart3 className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Análisis Avanzado</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dashboard de Comisiones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-8"
      >
        <DashboardComisiones />
      </motion.div>

      {/* Grid de Herramientas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lista detallada de transacciones */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ListaTransacciones />
        </motion.div>

        {/* Calculadora automática de comisiones */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <CalculadoraComisiones />
        </motion.div>
      </div>
    </div>
  );
};

export default PanelComisionesPage;
