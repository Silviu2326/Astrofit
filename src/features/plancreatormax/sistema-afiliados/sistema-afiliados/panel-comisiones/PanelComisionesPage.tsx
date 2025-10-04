import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calculator, TrendingUp, Calendar, Filter, Download } from 'lucide-react';
import EstadisticasRapidas from './components/EstadisticasRapidas';
import ResumenFinanciero from './components/ResumenFinanciero';
import TablaComisiones from './components/TablaComisiones';
import ComisionesPendientes from './components/ComisionesPendientes';
import ProcesamientoPagos from './components/ProcesamientoPagos';
import HistorialPagos from './components/HistorialPagos';
import ComisionesPorAfiliado from './components/ComisionesPorAfiliado';
import CalculadoraComisiones from './components/CalculadoraComisiones';
import ReglasComision from './components/ReglasComision';
import ReportesFinancieros from './components/ReportesFinancieros';
import ProyeccionesFuturas from './components/ProyeccionesFuturas';

const PanelComisionesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'pendientes' | 'pagos' | 'afiliados' | 'reglas' | 'reportes'>('general');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      {/* HERO SECTION - Comisiones */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona pagos a tus <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">afiliados</span> de forma eficiente
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Crecimiento Constante</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Calculator className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Cálculo Automático</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Calendar className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-white">Pagos Programados</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas Rápidas */}
      <EstadisticasRapidas />

      {/* Navegación por Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-2 mb-8 border border-white/50"
      >
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'general', label: 'General', icon: TrendingUp },
            { id: 'pendientes', label: 'Pendientes', icon: Filter },
            { id: 'pagos', label: 'Procesar Pagos', icon: DollarSign },
            { id: 'afiliados', label: 'Por Afiliado', icon: Calendar },
            { id: 'reglas', label: 'Reglas', icon: Calculator },
            { id: 'reportes', label: 'Reportes', icon: Download }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Contenido según Tab Activo */}
      {activeTab === 'general' && (
        <div className="space-y-8">
          <ResumenFinanciero />
          <TablaComisiones />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CalculadoraComisiones />
            <ProyeccionesFuturas />
          </div>
        </div>
      )}

      {activeTab === 'pendientes' && (
        <div className="space-y-8">
          <ComisionesPendientes />
        </div>
      )}

      {activeTab === 'pagos' && (
        <div className="space-y-8">
          <ProcesamientoPagos />
          <HistorialPagos />
        </div>
      )}

      {activeTab === 'afiliados' && (
        <div className="space-y-8">
          <ComisionesPorAfiliado />
        </div>
      )}

      {activeTab === 'reglas' && (
        <div className="space-y-8">
          <ReglasComision />
        </div>
      )}

      {activeTab === 'reportes' && (
        <div className="space-y-8">
          <ReportesFinancieros />
        </div>
      )}
    </div>
  );
};

export default PanelComisionesPage;
