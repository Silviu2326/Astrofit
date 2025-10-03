import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Archive, TrendingUp, DollarSign, Target,
  Calendar, Filter, Download, BarChart3,
  FileText, Lightbulb, ArrowUpRight
} from 'lucide-react';
import { experimentosHistoricos, calcularEstadisticasGenerales, bibliotecaInsights } from './historialExperimentosApi';
import ArchivoExperimentos from './components/ArchivoExperimentos';
import BuscadorTests from './components/BuscadorTests';
import LeccionesAprendidas from './components/LeccionesAprendidas';

const HistorialExperimentosPage: React.FC = () => {
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroResultado, setFiltroResultado] = useState<string>('todos');
  const [ordenar, setOrdenar] = useState<'fecha' | 'impacto' | 'tipo'>('fecha');

  const stats = useMemo(() => calcularEstadisticasGenerales(), []);

  const experimentosFiltrados = useMemo(() => {
    let filtered = [...experimentosHistoricos];

    if (filtroTipo !== 'todos') {
      filtered = filtered.filter(exp => exp.tipo === filtroTipo);
    }

    if (filtroResultado !== 'todos') {
      filtered = filtered.filter(exp => exp.estado === filtroResultado);
    }

    // Ordenar
    filtered.sort((a, b) => {
      if (ordenar === 'fecha') {
        return new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime();
      } else if (ordenar === 'impacto') {
        return (b.impactoIngresos || 0) - (a.impactoIngresos || 0);
      } else {
        return a.tipo.localeCompare(b.tipo);
      }
    });

    return filtered;
  }, [filtroTipo, filtroResultado, ordenar]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/30 to-yellow-50/30 pb-12">
      {/* HERO SECTION - Historial */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-yellow-600 to-lime-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Archive className="w-10 h-10 text-yellow-200 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-200 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Historial de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-lime-200">Experimentos</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-yellow-100 max-w-3xl leading-relaxed mb-6">
            Aprende de tus tests anteriores y optimiza continuamente
          </p>

          {/* Pills informativos */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <FileText className="w-5 h-5 text-yellow-200" />
              <span className="text-sm font-semibold text-white">{stats.totalExperimentos} Experimentos</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-200" />
              <span className="text-sm font-semibold text-white">{stats.tasaExito.toFixed(1)}% Tasa de Éxito</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <DollarSign className="w-5 h-5 text-green-200" />
              <span className="text-sm font-semibold text-white">${stats.ingresosTotalesGenerados.toLocaleString()} Generados</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS GENERALES - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: Target,
            title: 'Total Experimentos',
            value: stats.totalExperimentos,
            color: 'from-blue-500 to-indigo-600',
            bgColor: 'from-blue-500/10 to-indigo-600/10'
          },
          {
            icon: TrendingUp,
            title: 'Tasa de Éxito',
            value: `${stats.tasaExito.toFixed(1)}%`,
            color: 'from-green-500 to-emerald-600',
            bgColor: 'from-green-500/10 to-emerald-600/10',
            change: `${stats.experimentosExitosos} exitosos`
          },
          {
            icon: BarChart3,
            title: 'Mejora Acumulada',
            value: `${stats.mejoraPromedio.toFixed(1)}%`,
            color: 'from-purple-500 to-pink-600',
            bgColor: 'from-purple-500/10 to-pink-600/10',
            change: 'Promedio por experimento'
          },
          {
            icon: DollarSign,
            title: 'Ingresos Incrementales',
            value: `$${(stats.ingresosTotalesGenerados / 1000).toFixed(0)}K`,
            color: 'from-amber-500 to-orange-600',
            bgColor: 'from-amber-500/10 to-orange-600/10',
            change: `${stats.experimentosImplementados} implementados`
          }
        ].map((stat, index) => (
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

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgColor} rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio/Info adicional */}
              {stat.change && (
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded-lg">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{stat.change}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* BUSCADOR Y FILTROS */}
      <BuscadorTests
        filtroTipo={filtroTipo}
        setFiltroTipo={setFiltroTipo}
        filtroResultado={filtroResultado}
        setFiltroResultado={setFiltroResultado}
        ordenar={ordenar}
        setOrdenar={setOrdenar}
      />

      {/* ARCHIVO DE EXPERIMENTOS - Timeline */}
      <ArchivoExperimentos experimentos={experimentosFiltrados} />

      {/* LECCIONES APRENDIDAS - Insights */}
      <LeccionesAprendidas insights={bibliotecaInsights} stats={stats} />
    </div>
  );
};

export default HistorialExperimentosPage;
