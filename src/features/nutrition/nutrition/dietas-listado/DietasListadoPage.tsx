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
  Activity,
  X
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
  const [showNewDietModal, setShowNewDietModal] = useState(false);
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

      // Debug: Verificar usuario actual
      const currentUserStr = localStorage.getItem('currentUser');
      const token = localStorage.getItem('token');

      try {
        const currentUser = currentUserStr && currentUserStr !== 'undefined' ? JSON.parse(currentUserStr) : null;
        console.log('🔍 Usuario actual:', currentUser);
        console.log('🔑 Token presente:', !!token);
      } catch (e) {
        console.error('❌ Error al parsear usuario:', e);
        console.log('📝 currentUser raw:', currentUserStr);
      }

      const data = await getDietas(filters);
      console.log('📊 Dietas recibidas del backend:', data.length, data);

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
          <DietasActions onNewDietClick={() => setShowNewDietModal(true)} />

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
          <button 
            onClick={() => setShowNewDietModal(true)}
            className="px-6 py-3 bg-gradient-to-br from-lime-500 to-green-500 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
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
        onClick={() => setShowNewDietModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-lime-500 to-green-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-lime-500/50 transition-all duration-300 z-50"
      >
        <Plus className="w-8 h-8" />
      </motion.button>

      {/* MODAL NUEVA DIETA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
        onClick={() => setShowNewDietModal(false)}
        style={{ display: showNewDietModal ? 'flex' : 'none' }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header del modal */}
          <div className="bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Nueva Dieta</h2>
                <p className="text-lime-100 text-sm mt-1">
                  Asigna un plan nutricional a un cliente
                </p>
              </div>
              <button
                onClick={() => setShowNewDietModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Formulario */}
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cliente */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cliente *
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent">
                  <option value="">Seleccionar cliente</option>
                  <option value="cliente1">María González</option>
                  <option value="cliente2">Carlos Rodríguez</option>
                  <option value="cliente3">Ana Martínez</option>
                  <option value="cliente4">Luis Fernández</option>
                </select>
              </div>

              {/* Plantilla de dieta */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Plantilla de Dieta *
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent">
                  <option value="">Seleccionar plantilla</option>
                  <option value="keto">Dieta Keto para Principiantes</option>
                  <option value="volumen">Volumen Rápido y Efectivo</option>
                  <option value="mantenimiento">Mantenimiento Sin Cocina</option>
                  <option value="mediterranea">Mediterránea Saludable</option>
                  <option value="vegana">Vegana Alta en Proteína</option>
                  <option value="definicion">Definición Extrema</option>
                  <option value="intermitente">Ayuno Intermitente 16/8</option>
                  <option value="vegetariana">Vegetariana Equilibrada</option>
                  <option value="paleo">Paleo Performance</option>
                  <option value="volumen-limpio">Volumen Limpio Premium</option>
                </select>
              </div>

              {/* Objetivo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Objetivo *
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent">
                  <option value="">Seleccionar objetivo</option>
                  <option value="perdida_peso">Pérdida de Peso</option>
                  <option value="ganancia_muscular">Ganancia Muscular</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="definicion">Definición</option>
                  <option value="volumen_limpio">Volumen Limpio</option>
                  <option value="rendimiento">Rendimiento</option>
                  <option value="salud_general">Salud General</option>
                  <option value="recomposicion">Recomposición</option>
                </select>
              </div>

              {/* Duración */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duración (semanas) *
                </label>
                <input
                  type="number"
                  placeholder="Ej: 8"
                  min="1"
                  max="52"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>

              {/* Fecha de inicio */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fecha de Inicio *
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>

              {/* Nutricionista */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nutricionista Asignado
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent">
                  <option value="">Asignar nutricionista</option>
                  <option value="nutri1">Dra. María González</option>
                  <option value="nutri2">Lic. Carlos Rodríguez</option>
                  <option value="nutri3">Nutr. Ana Martínez</option>
                </select>
              </div>

              {/* Calorías objetivo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Calorías Objetivo
                </label>
                <input
                  type="number"
                  placeholder="Ej: 2000"
                  min="800"
                  max="5000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>

              {/* Proteína objetivo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Proteína Objetivo (g)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 120"
                  min="0"
                  max="500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>

              {/* Carbohidratos objetivo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Carbohidratos Objetivo (g)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 200"
                  min="0"
                  max="1000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>

              {/* Grasas objetivo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Grasas Objetivo (g)
                </label>
                <input
                  type="number"
                  placeholder="Ej: 80"
                  min="0"
                  max="300"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Notas adicionales */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notas Adicionales (opcional)
              </label>
              <textarea
                placeholder="Añade observaciones específicas para esta dieta..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Restricciones alimentarias */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Restricciones Alimentarias (opcional)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Sin gluten', 'Sin lácteos', 'Sin azúcar', 'Baja en sodio', 'Sin frutos secos', 'Sin soja'].map((restriction) => (
                  <label key={restriction} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-lime-600 focus:ring-lime-500"
                    />
                    <span className="text-sm text-gray-700">{restriction}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowNewDietModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Aquí iría la lógica para crear la dieta
                  console.log('Crear nueva dieta');
                  setShowNewDietModal(false);
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Crear Dieta
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DietasListadoPage;
