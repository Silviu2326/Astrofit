import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Apple,
  Users,
  TrendingUp,
  Target,
  Calendar,
  CheckCircle,
  LayoutGrid,
  LayoutList,
  Plus,
  Activity
} from 'lucide-react';
import { DietasTable } from './components/DietasTable';
import { DietasFilters } from './components/DietasFilters';
import { DietasActions } from './components/DietasActions';
import { DietaCard } from './components/DietaCard';
import { getDietas, Dieta } from './dietasListadoApi';

const DietasListadoPage: React.FC = () => {
  const [dietas, setDietas] = useState<Dieta[]>([]);
  const [allDietas, setAllDietas] = useState<Dieta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
  const [filters, setFilters] = useState({
    estado: '',
    search: '',
    objetivo: '',
    nutricionista: '',
    fechaInicio: ''
  });

  useEffect(() => {
    const fetchDietas = async () => {
      setLoading(true);
      const data = await getDietas(filters);
      setDietas(data);
      if (!allDietas.length) {
        const allData = await getDietas({});
        setAllDietas(allData);
      }
      setLoading(false);
    };
    fetchDietas();
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const stats = [
    {
      title: 'Dietas Activas',
      value: allDietas.filter(d => d.estado === 'activo').length,
      change: 12,
      icon: Activity,
      gradient: 'from-lime-500 to-green-500',
      bgGradient: 'from-lime-50 to-green-50'
    },
    {
      title: 'Clientes en Plan',
      value: allDietas.filter(d => d.estado === 'activo' || d.estado === 'en pausa').length,
      change: 8,
      icon: Users,
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Adherencia Promedio',
      value: `${Math.round(allDietas.reduce((sum, d) => sum + d.adherencia, 0) / allDietas.length || 0)}%`,
      change: 5,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50'
    },
    {
      title: 'Completadas Este Mes',
      value: allDietas.filter(d => d.estado === 'completado' && new Date(d.ultimaActualizacion).getMonth() === new Date().getMonth()).length,
      change: 15,
      icon: CheckCircle,
      gradient: 'from-teal-500 to-cyan-500',
      bgGradient: 'from-teal-50 to-cyan-50'
    }
  ];

  if (loading && !allDietas.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-lime-50/30 to-green-50/30 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-lime-500 border-t-transparent"
          />
          <p className="text-lg font-semibold text-gray-600">Cargando dietas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-lime-50/30 to-green-50/30 p-4 md:p-8">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <Apple className="w-10 h-10 text-lime-200 animate-pulse" />
                  <div className="absolute inset-0 w-10 h-10 bg-lime-200 rounded-full blur-lg opacity-50"></div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Dietas <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-200 to-yellow-200">Asignadas</span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-green-100 max-w-3xl leading-relaxed mb-6">
                Gestiona y realiza seguimiento de todos los <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">planes nutricionales activos</span>
              </p>

              {/* Métricas rápidas pills */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <Target className="w-5 h-5 text-lime-200" />
                  <span className="text-sm font-semibold text-white">{dietas.length} dietas encontradas</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <TrendingUp className="w-5 h-5 text-green-200" />
                  <span className="text-sm font-semibold text-white">Adherencia promedio {Math.round(allDietas.reduce((sum, d) => sum + d.adherencia, 0) / allDietas.length || 0)}%</span>
                </div>
              </div>
            </div>

            {/* Mini calendario con dietas activas */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-lime-200" />
                <h3 className="text-lg font-bold text-white">Este Mes</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-100">Dietas activas</span>
                  <span className="text-2xl font-bold text-white">{allDietas.filter(d => d.estado === 'activo').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-100">En pausa</span>
                  <span className="text-2xl font-bold text-white">{allDietas.filter(d => d.estado === 'en pausa').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-green-100">Completadas</span>
                  <span className="text-2xl font-bold text-white">{allDietas.filter(d => d.estado === 'completado').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} opacity-30 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              <div className="flex items-center gap-2">
                <div className="p-1 bg-green-50 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-bold text-green-600">+{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
              </div>

              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FILTROS Y ACCIONES */}
      <div className="mb-8 space-y-6">
        <DietasFilters onFilterChange={handleFilterChange} currentFilters={filters} />

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <DietasActions />

          {/* Toggle Vista */}
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/50">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'cards'
                  ? 'bg-gradient-to-br from-lime-500 to-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-3 rounded-xl transition-all duration-300 ${
                viewMode === 'table'
                  ? 'bg-gradient-to-br from-lime-500 to-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* VISTA DE DIETAS */}
      {loading ? (
        <div className="text-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-lime-500 border-t-transparent"
          />
          <p className="text-gray-600">Cargando dietas...</p>
        </div>
      ) : dietas.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50"
        >
          <Apple className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron dietas</h3>
          <p className="text-gray-600 mb-6">Intenta ajustar los filtros o crea una nueva dieta</p>
          <button className="px-6 py-3 bg-gradient-to-br from-lime-500 to-green-500 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto">
            <Plus className="w-5 h-5" />
            Nueva Dieta
          </button>
        </motion.div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dietas.map((dieta, index) => (
            <motion.div
              key={dieta.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <DietaCard dieta={dieta} />
            </motion.div>
          ))}
        </div>
      ) : (
        <DietasTable dietas={dietas} />
      )}

      {/* Botón flotante Nueva Dieta */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-lime-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-lime-500/50 transition-all duration-300 z-50"
      >
        <Plus className="w-8 h-8" />
      </motion.button>
    </div>
  );
};

export default DietasListadoPage;
