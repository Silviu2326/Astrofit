import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Dumbbell, TrendingUp, Heart, History, Sparkles,
  ArrowUpRight, Library, Target, Activity, Zap,
  Grid3x3, List, LayoutGrid, Plus, X
} from 'lucide-react';
import { fetchEjercicios, Ejercicio } from './bibliotecaEjerciciosApi';
import { EjerciciosSearch } from './components/EjerciciosSearch';
import { EjerciciosFilters } from './components/EjerciciosFilters';
import { EjerciciosGrid } from './components/EjerciciosGrid';
import { EjerciciosList } from './components/EjerciciosList';

export const BibliotecaEjerciciosPage: React.FC = () => {
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    material: '',
    difficulty: ''
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEjercicio, setEditingEjercicio] = useState<Ejercicio | null>(null);

  useEffect(() => {
    const loadEjercicios = async () => {
      setIsLoading(true);
      try {
        const data = await fetchEjercicios();
        setEjercicios(data);
      } catch (error) {
        console.error('Error cargando ejercicios:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEjercicios();
  }, []);

  // Filtrado de ejercicios
  const ejerciciosFiltrados = useMemo(() => {
    return ejercicios.filter((ejercicio) => {
      const matchesSearch = searchTerm === '' ||
        ejercicio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ejercicio.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ejercicio.muscleGroups.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = filters.category === '' || ejercicio.category === filters.category;
      const matchesMaterial = filters.material === '' || ejercicio.material === filters.material;
      const matchesDifficulty = filters.difficulty === '' || ejercicio.difficulty === filters.difficulty;

      return matchesSearch && matchesCategory && matchesMaterial && matchesDifficulty;
    });
  }, [ejercicios, searchTerm, filters]);

  // Estadísticas
  const stats = useMemo(() => {
    const totalEjercicios = ejercicios.length;
    const ejerciciosFavoritos = ejercicios.filter(e => e.isFavorite).length;
    const categorias = new Set(ejercicios.map(e => e.category)).size;
    const recientes = ejercicios.filter(e => e.isNew).length;

    return { totalEjercicios, ejerciciosFavoritos, categorias, recientes };
  }, [ejercicios]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-2xl"
        >
          <Dumbbell className="w-12 h-12 text-white" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
        >
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Grid/dots pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="relative z-10">
            {/* Título con icono animado */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <Library className="w-12 h-12 text-yellow-300" />
                  </div>
                </motion.div>
                <div className="absolute inset-0 w-full h-full bg-yellow-300 rounded-2xl blur-xl opacity-50"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Biblioteca de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Ejercicios</span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mt-2">
                  Tu colección completa de ejercicios profesionales
                </p>
              </div>
            </div>

            {/* Contador total y botón crear */}
            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">
                  {stats.totalEjercicios} ejercicios disponibles
                </span>
              </div>
              
              {/* Botón crear ejercicio */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 hover:bg-white/30 transition-all duration-300 group"
              >
                <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold">Crear Ejercicio</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* ESTADÍSTICAS RÁPIDAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: 'Total Ejercicios',
              value: stats.totalEjercicios,
              icon: Dumbbell,
              gradient: 'from-blue-500 to-indigo-600',
              bgGradient: 'from-blue-50 to-indigo-50',
              change: '+5 este mes',
              changePositive: true
            },
            {
              title: 'Favoritos',
              value: stats.ejerciciosFavoritos,
              icon: Heart,
              gradient: 'from-pink-500 to-red-600',
              bgGradient: 'from-pink-50 to-red-50',
              change: `${((stats.ejerciciosFavoritos / stats.totalEjercicios) * 100).toFixed(0)}% del total`,
              changePositive: true
            },
            {
              title: 'Categorías',
              value: stats.categorias,
              icon: LayoutGrid,
              gradient: 'from-purple-500 to-pink-600',
              bgGradient: 'from-purple-50 to-pink-50',
              change: 'Todas activas',
              changePositive: true
            },
            {
              title: 'Nuevos',
              value: stats.recientes,
              icon: Sparkles,
              gradient: 'from-green-500 to-emerald-600',
              bgGradient: 'from-green-50 to-emerald-50',
              change: 'Esta semana',
              changePositive: true
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
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
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

                {/* Cambio */}
                <div className="flex items-center gap-2">
                  <div className={`p-1 ${stat.changePositive ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                    <ArrowUpRight className={`w-4 h-4 ${stat.changePositive ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <span className={`text-sm font-bold ${stat.changePositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BÚSQUEDA */}
        <div className="mb-8">
          <EjerciciosSearch onSearch={setSearchTerm} />
        </div>

        {/* LAYOUT: FILTROS + GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FILTROS (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <EjerciciosFilters onFilterChange={setFilters} />
            </div>
          </div>

          {/* GRID DE EJERCICIOS */}
          <div className="lg:col-span-3">
            {/* Header con contador y opciones */}
            <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {ejerciciosFiltrados.length} ejercicio{ejerciciosFiltrados.length !== 1 ? 's' : ''}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {searchTerm && `Resultados para "${searchTerm}"`}
                  {filters.category && ` • Categoría: ${filters.category}`}
                  {filters.difficulty && ` • Dificultad: ${filters.difficulty}`}
                  {filters.material && ` • Material: ${filters.material}`}
                </p>
              </div>

              {/* Botones de vista (opcional para futuro) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Vista en grid"
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  title="Vista en lista"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Grid/Lista de ejercicios */}
            {viewMode === 'grid' ? (
              <EjerciciosGrid
                ejercicios={ejerciciosFiltrados}
                onEdit={(ejercicio) => {
                  setEditingEjercicio(ejercicio);
                  setShowCreateModal(true);
                }}
              />
            ) : (
              <EjerciciosList ejercicios={ejerciciosFiltrados} />
            )}
          </div>
        </div>

        {/* SECCIÓN DE CATEGORÍAS DESTACADAS (Opcional) */}
        {ejerciciosFiltrados.length > 0 && !searchTerm && !filters.category && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Explora por Categoría</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Piernas', icon: '🦵', color: 'from-blue-500 to-indigo-600', count: ejercicios.filter(e => e.category === 'piernas').length },
                { name: 'Torso', icon: '💪', color: 'from-purple-500 to-pink-600', count: ejercicios.filter(e => e.category === 'torso').length },
                { name: 'Espalda', icon: '🏋️', color: 'from-cyan-500 to-blue-600', count: ejercicios.filter(e => e.category === 'espalda').length },
                { name: 'Core', icon: '🔥', color: 'from-orange-500 to-red-600', count: ejercicios.filter(e => e.category === 'core').length },
                { name: 'Brazos', icon: '💪', color: 'from-green-500 to-emerald-600', count: ejercicios.filter(e => e.category === 'brazos').length },
                { name: 'Cardio', icon: '❤️', color: 'from-red-500 to-pink-600', count: ejercicios.filter(e => e.category === 'cardio').length },
                { name: 'Flexibilidad', icon: '🧘', color: 'from-teal-500 to-cyan-600', count: ejercicios.filter(e => e.category === 'flexibilidad').length },
                { name: 'Funcional', icon: '⚡', color: 'from-indigo-500 to-purple-600', count: ejercicios.filter(e => e.category === 'funcional').length }
              ].filter(cat => cat.count > 0).map((category, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + idx * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilters({ ...filters, category: category.name.toLowerCase() })}
                  className={`relative overflow-hidden bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h3 className="text-lg font-bold mb-1">{category.name}</h3>
                    <p className="text-sm text-white/80">{category.count} ejercicios</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* MODAL CREAR EJERCICIO */}
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header del modal */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {editingEjercicio ? 'Editar Ejercicio' : 'Crear Nuevo Ejercicio'}
                    </h2>
                    <p className="text-blue-100 text-sm mt-1">
                      {editingEjercicio
                        ? 'Modifica los detalles del ejercicio'
                        : 'Añade un nuevo ejercicio a tu biblioteca'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingEjercicio(null);
                    }}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Formulario */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nombre del ejercicio */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre del Ejercicio *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Sentadilla con barra"
                      defaultValue={editingEjercicio?.name || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Descripción */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      placeholder="Describe el ejercicio, técnica y beneficios..."
                      rows={3}
                      defaultValue={editingEjercicio?.description || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Categoría */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Categoría *
                    </label>
                    <select
                      defaultValue={editingEjercicio?.category || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="piernas">Piernas</option>
                      <option value="torso">Torso</option>
                      <option value="espalda">Espalda</option>
                      <option value="core">Core</option>
                      <option value="brazos">Brazos</option>
                      <option value="cardio">Cardio</option>
                      <option value="flexibilidad">Flexibilidad</option>
                      <option value="funcional">Funcional</option>
                    </select>
                  </div>

                  {/* Dificultad */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dificultad *
                    </label>
                    <select
                      defaultValue={editingEjercicio?.difficulty || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar dificultad</option>
                      <option value="principiante">Principiante</option>
                      <option value="intermedio">Intermedio</option>
                      <option value="avanzado">Avanzado</option>
                      <option value="experto">Experto</option>
                    </select>
                  </div>

                  {/* Material */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Material
                    </label>
                    <select
                      defaultValue={editingEjercicio?.material || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="peso corporal">Sin material</option>
                      <option value="mancuernas">Mancuernas</option>
                      <option value="barra">Barra</option>
                      <option value="maquina">Máquina</option>
                      <option value="gomas">Bandas</option>
                      <option value="trx">TRX</option>
                      <option value="kettlebell">Kettlebell</option>
                    </select>
                  </div>

                  {/* Músculos objetivo */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Músculos Objetivo
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Cuádriceps, Glúteos"
                      defaultValue={editingEjercicio?.muscleGroups.join(', ') || ''}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingEjercicio(null);
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      // Aquí iría la lógica para crear/editar el ejercicio
                      console.log(editingEjercicio ? 'Editar ejercicio' : 'Crear ejercicio');
                      setShowCreateModal(false);
                      setEditingEjercicio(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    {editingEjercicio ? 'Guardar Cambios' : 'Crear Ejercicio'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BibliotecaEjerciciosPage;
