import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, Copy, X, Eye, History, ChevronRight, Star, Upload, Trash2, Plus,
  GripVertical, Monitor, Smartphone, AlertCircle, Check, Clock, Users,
  TrendingUp, Edit3, Image as ImageIcon, Video as VideoIcon, FileText,
  Settings, Target, Dumbbell, Activity, Info, Search, Filter, ArrowLeft,
  Grid3x3, List, LayoutGrid, Heart, Play
} from 'lucide-react';
import { fetchEjercicios, Ejercicio } from '../biblioteca-ejercicios/bibliotecaEjerciciosApi';

// Types
interface VersionHistorial {
  id: string;
  version: number;
  fecha: string;
  usuario: string;
  cambios: string;
  esCambioMayor: boolean;
}

interface EjercicioStats {
  vecesUsado: number;
  clientesQueLoUsan: number;
  entrenamientosActivos: number;
  primeraVezUsado: string;
  ultimaVezUsado: string;
  ratingPromedio: number;
}

const EditorEjercicioPage: React.FC = () => {
  // Estados para la lista de ejercicios
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

  // Estados para el editor
  const [activeTab, setActiveTab] = useState<string>('basico');
  const [ejercicio, setEjercicio] = useState<Ejercicio | null>(null);
  const [originalEjercicio, setOriginalEjercicio] = useState<Ejercicio | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showHistorial, setShowHistorial] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCompareMode, setShowCompareMode] = useState(false);
  const [showStats, setShowStats] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  // Cargar ejercicios
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
  const ejerciciosFiltrados = React.useMemo(() => {
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

  // Detectar cambios en el editor
  useEffect(() => {
    if (ejercicio && originalEjercicio) {
      const changed = JSON.stringify(ejercicio) !== JSON.stringify(originalEjercicio);
      setHasChanges(changed);
    }
  }, [ejercicio, originalEjercicio]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSave = setInterval(() => {
      if (hasChanges && ejercicio) {
        console.log('Auto-guardando borrador...');
        setLastSaved(new Date());
      }
    }, 30000);
    return () => clearInterval(autoSave);
  }, [hasChanges, ejercicio]);

  const handleEditEjercicio = (ejercicioToEdit: Ejercicio) => {
    setEjercicio(ejercicioToEdit);
    setOriginalEjercicio({ ...ejercicioToEdit });
    setHasChanges(false);
  };

  const handleBackToList = () => {
    if (hasChanges) {
      if (confirm('¿Descartar todos los cambios?')) {
        setEjercicio(null);
        setOriginalEjercicio(null);
        setHasChanges(false);
      }
    } else {
      setEjercicio(null);
      setOriginalEjercicio(null);
    }
  };

  const handleSave = async (notaVersion: string, esCambioMayor: boolean) => {
    if (!ejercicio) return;
    
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Guardando cambios...', { notaVersion, esCambioMayor });
    
    // Update the exercise in the list
    setEjercicios(prev => prev.map(e => e.id === ejercicio.id ? ejercicio : e));
    
    setIsSaving(false);
    setShowSaveModal(false);
    setHasChanges(false);
    setLastSaved(new Date());
  };

  const handleSaveAsNew = () => {
    console.log('Guardar como nuevo ejercicio');
  };

  const handleDiscard = () => {
    if (confirm('¿Descartar todos los cambios?')) {
      setEjercicio(originalEjercicio);
      setHasChanges(false);
    }
  };

  // Si estamos editando un ejercicio, mostrar el editor
  if (ejercicio) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 pb-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-12 md:py-20">
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          <div className="max-w-[1800px] mx-auto px-6 py-8 md:py-12 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-emerald-100 mb-4">
              <button 
                onClick={handleBackToList}
                className="hover:text-white cursor-pointer transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Lista de Ejercicios</span>
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-semibold">Editar Ejercicio</span>
            </div>

            <div className="flex items-center justify-between gap-6 flex-wrap">
              {/* Title & Icon */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Edit3 className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-yellow-300 rounded-2xl blur-lg opacity-30"></div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
                    Editar <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Ejercicio</span>
                  </h1>
                  <p className="text-lg text-emerald-100">
                    {ejercicio.name || 'Ejercicio de entrenamiento'}
                  </p>
                </div>
              </div>

              {/* Auto-save indicator */}
              <div className="flex items-center gap-3">
                {hasChanges ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-full border border-orange-300/30">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-orange-100 text-sm font-medium">Cambios sin guardar</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-300/30">
                    <Check className="w-4 h-4 text-green-300" />
                    <span className="text-green-100 text-sm font-medium">
                      Guardado {lastSaved.toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="max-w-[1800px] mx-auto px-6 py-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="flex overflow-x-auto">
                {[
                  { id: 'basico', label: 'Básico', icon: FileText },
                  { id: 'media', label: 'Media', icon: ImageIcon },
                  { id: 'instrucciones', label: 'Instrucciones', icon: Target },
                  { id: 'variaciones', label: 'Variaciones', icon: Copy },
                  { id: 'configuracion', label: 'Configuración', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              <div className="text-center py-12">
                <Edit3 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Editor de Ejercicio</h3>
                <p className="text-gray-600">
                  Aquí iría el contenido del editor para el ejercicio: <strong>{ejercicio.name}</strong>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  ID: {ejercicio.id} | Categoría: {ejercicio.category} | Dificultad: {ejercicio.difficulty}
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-200 bg-gray-50 px-8 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleDiscard}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Descartar Cambios
                </button>
                <button
                  onClick={handleSaveAsNew}
                  className="px-4 py-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  Guardar como Nuevo
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSaveModal(true)}
                  disabled={isSaving}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Guardar Cambios
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si no estamos editando, mostrar la lista de ejercicios
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
        >
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
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
                    <Edit3 className="w-12 h-12 text-yellow-300" />
                  </div>
                </motion.div>
                <div className="absolute inset-0 w-full h-full bg-yellow-300 rounded-2xl blur-xl opacity-50"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Editor de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Ejercicios</span>
                </h1>
                <p className="text-xl md:text-2xl text-emerald-100 mt-2">
                  Gestiona y edita tu biblioteca de ejercicios
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
                  {ejercicios.length} ejercicios disponibles
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

        {/* BÚSQUEDA */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar ejercicios para editar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* LAYOUT: FILTROS + GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* FILTROS (Sidebar) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Filtros</h3>
                
                {/* Categoría */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Todas las categorías</option>
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
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Dificultad</label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Todas las dificultades</option>
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                    <option value="experto">Experto</option>
                  </select>
                </div>

                {/* Material */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
                  <select
                    value={filters.material}
                    onChange={(e) => setFilters({ ...filters, material: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Todo el material</option>
                    <option value="sin material">Sin material</option>
                    <option value="mancuernas">Mancuernas</option>
                    <option value="barra">Barra</option>
                    <option value="máquina">Máquina</option>
                    <option value="bandas">Bandas</option>
                    <option value="trx">TRX</option>
                    <option value="kettlebell">Kettlebell</option>
                  </select>
                </div>
              </div>
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

              {/* Botones de vista */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
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
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ejerciciosFiltrados.map((ejercicio, index) => (
                  <motion.div
                    key={ejercicio.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.02, y: -8 }}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      {ejercicio.imageUrl ? (
                        <img
                          src={ejercicio.imageUrl}
                          alt={ejercicio.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                          <Dumbbell className="w-16 h-16 text-white/50" />
                        </div>
                      )}
                      
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl">
                          <Edit3 className="w-8 h-8 text-gray-900" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                        {ejercicio.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {ejercicio.description}
                      </p>
                      
                      {/* Badges */}
                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <div className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full capitalize">
                          {ejercicio.category}
                        </div>
                        <div className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                          {ejercicio.difficulty}
                        </div>
                      </div>

                      {/* Rating y botón editar */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(ejercicio.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="text-sm font-bold text-gray-700 ml-1">{ejercicio.rating}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditEjercicio(ejercicio);
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                {/* Header de la tabla */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    <div className="col-span-4">Ejercicio</div>
                    <div className="col-span-2">Categoría</div>
                    <div className="col-span-2">Dificultad</div>
                    <div className="col-span-2">Material</div>
                    <div className="col-span-1">Rating</div>
                    <div className="col-span-1">Acción</div>
                  </div>
                </div>

                {/* Lista de ejercicios */}
                <div className="divide-y divide-gray-100">
                  {ejerciciosFiltrados.map((ejercicio, index) => (
                    <motion.div
                      key={ejercicio.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      whileHover={{ backgroundColor: 'rgba(16, 185, 129, 0.02)' }}
                      className="grid grid-cols-12 gap-4 p-6 hover:bg-emerald-50/30 transition-colors duration-200 group"
                    >
                      {/* Ejercicio */}
                      <div className="col-span-4 flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                          {ejercicio.imageUrl ? (
                            <img
                              src={ejercicio.imageUrl}
                              alt={ejercicio.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                              <Dumbbell className="w-6 h-6 text-white/70" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 truncate">
                            {ejercicio.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {ejercicio.description}
                          </p>
                        </div>
                      </div>

                      {/* Categoría */}
                      <div className="col-span-2 flex items-center">
                        <div className="px-3 py-1 bg-emerald-500 text-white text-sm font-bold rounded-full capitalize">
                          {ejercicio.category}
                        </div>
                      </div>

                      {/* Dificultad */}
                      <div className="col-span-2 flex items-center">
                        <div className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                          {ejercicio.difficulty}
                        </div>
                      </div>

                      {/* Material */}
                      <div className="col-span-2 flex items-center">
                        <div className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                          {ejercicio.material}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="col-span-1 flex items-center">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm font-bold text-gray-700">{ejercicio.rating}</span>
                        </div>
                      </div>

                      {/* Acción */}
                      <div className="col-span-1 flex items-center justify-end">
                        <button
                          onClick={() => handleEditEjercicio(ejercicio)}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
                        >
                          Editar
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorEjercicioPage;