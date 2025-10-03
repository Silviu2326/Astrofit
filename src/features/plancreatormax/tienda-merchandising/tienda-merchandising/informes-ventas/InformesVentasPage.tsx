import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, DollarSign, Sparkles } from 'lucide-react';
import SelectorPeriodo from './components/SelectorPeriodo';
import MetricasPrincipales from './components/MetricasPrincipales';
import GraficoIngresos from './components/GraficoIngresos';
import TopProductos from './components/TopProductos';
import AnalisisMargen from './components/AnalisisMargen';
import AnalisisCategoria from './components/AnalisisCategoria';
import FuentesTrafico from './components/FuentesTrafico';
import GeografiaVentas from './components/GeografiaVentas';
import AnalisisTemporal from './components/AnalisisTemporal';
import ClientesRetencion from './components/ClientesRetencion';
import MetodosPago from './components/MetodosPago';
import ProyeccionesForecasting from './components/ProyeccionesForecasting';
import TendenciasVenta from './components/TendenciasVenta';

const InformesVentasPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <BarChart3 className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Informes de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Ventas</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl leading-relaxed">
            Analiza el rendimiento de tu tienda con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">analytics completo</span> y proyecciones inteligentes
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Analytics en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <DollarSign className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Proyecciones con IA</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Sparkles className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-semibold text-white">Insights Avanzados</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selector de Período */}
      <SelectorPeriodo />

      {/* Métricas Principales - 8 Cards */}
      <MetricasPrincipales />

      {/* Gráfico Principal de Ingresos */}
      <GraficoIngresos />

      {/* Grid de Componentes */}
      <div className="space-y-8">
        {/* Top Productos y Análisis de Margen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopProductos />
          <AnalisisMargen />
        </div>

        {/* Análisis por Categoría y Fuentes de Tráfico */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalisisCategoria />
          <FuentesTrafico />
        </div>

        {/* Geografía de Ventas */}
        <GeografiaVentas />

        {/* Análisis Temporal */}
        <AnalisisTemporal />

        {/* Clientes y Retención */}
        <ClientesRetencion />

        {/* Métodos de Pago y Tendencias */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MetodosPago />
          <TendenciasVenta />
        </div>

        {/* Proyecciones y Forecasting */}
        <ProyeccionesForecasting />
      </div>
    </div>
  );
};

export default InformesVentasPage;
