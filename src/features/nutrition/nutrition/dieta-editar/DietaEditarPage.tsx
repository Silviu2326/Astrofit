import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Save, Clock, ChevronRight, AlertCircle, Send, ArrowLeft, Search, Filter, Grid, List, Plus, Target, User, TrendingUp } from 'lucide-react';
import DietaEditor from './components/DietaEditor';
import ComidasEditor from './components/ComidasEditor';
import MacrosAdjuster from './components/MacrosAdjuster';
import VersionHistory from './components/VersionHistory';
import ProgressTracking from './components/ProgressTracking';

interface Dieta {
  id: string;
  name: string;
  clientName: string;
  clientId: string;
  status: 'activa' | 'borrador' | 'finalizada' | 'pausada';
  startDate: string;
  endDate?: string;
  version: number;
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  adherence: number;
  lastUpdate: string;
  trainer: string;
  meals: any[];
  notes: any[];
}

const mockDietas: Dieta[] = [
  {
    id: 'diet-1',
    name: 'Dieta de Volumen - Fase 1',
    clientName: 'Carlos Martínez',
    clientId: 'client-1',
    status: 'activa',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    version: 3,
    macros: { calories: 2500, protein: 180, carbs: 300, fats: 70 },
    adherence: 87,
    lastUpdate: '2024-01-20',
    trainer: 'Ana García',
    meals: [
      { id: 'meal-1', name: 'Desayuno', recipes: [{ id: 'rec-1', name: 'Tortilla de avena', quantity: '1 unidad' }] },
      { id: 'meal-2', name: 'Almuerzo', recipes: [{ id: 'rec-2', name: 'Arroz con pollo', quantity: '200g' }] },
    ],
    notes: []
  },
  {
    id: 'diet-2',
    name: 'Cutting Intensivo',
    clientName: 'María López',
    clientId: 'client-2',
    status: 'activa',
    startDate: '2024-01-10',
    endDate: '2024-03-10',
    version: 2,
    macros: { calories: 1800, protein: 150, carbs: 150, fats: 60 },
    adherence: 92,
    lastUpdate: '2024-01-18',
    trainer: 'Ana García',
    meals: [],
    notes: []
  },
  {
    id: 'diet-3',
    name: 'Mantenimiento Post-Cut',
    clientName: 'Juan Pérez',
    clientId: 'client-3',
    status: 'borrador',
    startDate: '2024-01-25',
    version: 1,
    macros: { calories: 2200, protein: 160, carbs: 220, fats: 80 },
    adherence: 0,
    lastUpdate: '2024-01-25',
    trainer: 'Ana García',
    meals: [],
    notes: []
  },
  {
    id: 'diet-4',
    name: 'Dieta de Definición',
    clientName: 'Laura Sánchez',
    clientId: 'client-4',
    status: 'finalizada',
    startDate: '2023-11-01',
    endDate: '2024-01-01',
    version: 4,
    macros: { calories: 1600, protein: 140, carbs: 120, fats: 50 },
    adherence: 95,
    lastUpdate: '2023-12-28',
    trainer: 'Ana García',
    meals: [],
    notes: []
  },
  {
    id: 'diet-5',
    name: 'Bulk Clean',
    clientName: 'Roberto Díaz',
    clientId: 'client-5',
    status: 'pausada',
    startDate: '2023-12-01',
    version: 2,
    macros: { calories: 2800, protein: 200, carbs: 350, fats: 90 },
    adherence: 78,
    lastUpdate: '2024-01-15',
    trainer: 'Ana García',
    meals: [],
    notes: []
  }
];

const DietaEditarPage: React.FC = () => {
  // Estados para la lista de dietas
  const [dietas, setDietas] = useState<Dieta[]>(mockDietas);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    trainer: ''
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Estados para el editor
  const [currentDiet, setCurrentDiet] = useState<Dieta | null>(null);
  const [originalDiet, setOriginalDiet] = useState<Dieta | null>(null);
  const [activeTab, setActiveTab] = useState<'comidas' | 'macros' | 'historial' | 'progreso'>('comidas');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  // Filtrado de dietas
  const dietasFiltradas = React.useMemo(() => {
    return dietas.filter((dieta) => {
      const matchesSearch = searchTerm === '' ||
        dieta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dieta.clientName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filters.status === '' || dieta.status === filters.status;
      const matchesTrainer = filters.trainer === '' || dieta.trainer === filters.trainer;

      return matchesSearch && matchesStatus && matchesTrainer;
    });
  }, [dietas, searchTerm, filters]);

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges && autoSaveEnabled && currentDiet) {
      const timer = setTimeout(() => {
        handleSave();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentDiet, hasUnsavedChanges, autoSaveEnabled]);

  const handleEditDieta = (dietaToEdit: Dieta) => {
    setCurrentDiet(dietaToEdit);
    setOriginalDiet({ ...dietaToEdit });
    setHasUnsavedChanges(false);
  };

  const handleBackToList = () => {
    if (hasUnsavedChanges) {
      if (confirm('¿Descartar todos los cambios?')) {
        setCurrentDiet(null);
        setOriginalDiet(null);
        setHasUnsavedChanges(false);
      }
    } else {
      setCurrentDiet(null);
      setOriginalDiet(null);
    }
  };

  const handleDietChange = (updatedDiet: Dieta) => {
    setCurrentDiet(updatedDiet);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    if (currentDiet) {
      console.log('Diet saved:', currentDiet);
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
    }
  };

  const handleSendToClient = () => {
    console.log('Sending diet to client...');
    alert('Dieta enviada al cliente');
  };

  const getStatusClass = (status: Dieta['status']) => {
    switch (status) {
      case 'activa':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'borrador':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'finalizada':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pausada':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusLabel = (status: Dieta['status']) => {
    switch (status) {
      case 'activa': return 'Activa';
      case 'borrador': return 'Borrador';
      case 'finalizada': return 'Finalizada';
      case 'pausada': return 'Pausada';
      default: return status;
    }
  };

  const tabs = [
    { id: 'comidas', label: 'Editar Comidas', icon: Edit3 },
    { id: 'macros', label: 'Ajustar Macros', icon: Save },
    { id: 'historial', label: 'Historial', icon: Clock },
    { id: 'progreso', label: 'Progreso', icon: AlertCircle },
  ];

  // Si estamos editando una dieta, mostrar el editor
  if (currentDiet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-yellow-50/30 pb-12">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4 text-orange-100">
              <button 
                onClick={handleBackToList}
                className="hover:text-white cursor-pointer transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Lista de Dietas</span>
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-sm font-medium">{currentDiet.clientName}</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-sm font-bold text-white">Editar</span>
            </div>

            {/* Título */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <Edit3 className="w-12 h-12 text-yellow-300 animate-pulse" />
                <div className="absolute inset-0 w-12 h-12 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                  Editar Dieta
                </h1>
                <p className="text-xl text-yellow-100 mt-2">
                  {currentDiet.name}
                </p>
              </div>
            </div>

            {/* Indicador de guardado */}
            <div className="flex items-center gap-4 mt-6 flex-wrap">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border ${
                hasUnsavedChanges
                  ? 'bg-red-500/20 border-red-300/30'
                  : 'bg-green-500/20 border-green-300/30'
              }`}>
                <div className={`w-2 h-2 rounded-full ${hasUnsavedChanges ? 'bg-red-300' : 'bg-green-300'} animate-pulse`}></div>
                <span className="text-sm font-semibold text-white">
                  {hasUnsavedChanges ? 'Cambios sin guardar' : 'Todo guardado'}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <Clock className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-semibold text-white">
                  Último guardado: {lastSaved.toLocaleTimeString()}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <span className="text-sm font-semibold text-white">
                  Versión {currentDiet.version}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TABS */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-xl'
                      : 'bg-white/80 backdrop-blur-xl text-gray-700 hover:bg-white border border-white/50 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* LAYOUT PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* COLUMNA PRINCIPAL */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'comidas' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ComidasEditor diet={currentDiet} onDietChange={handleDietChange} />
              </motion.div>
            )}

            {activeTab === 'macros' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <MacrosAdjuster diet={currentDiet} onDietChange={handleDietChange} />
              </motion.div>
            )}

            {activeTab === 'historial' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <VersionHistory dietId={currentDiet.id} currentVersion={currentDiet.version} />
              </motion.div>
            )}

            {activeTab === 'progreso' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProgressTracking clientId={currentDiet.clientId} />
              </motion.div>
            )}
          </div>

          {/* SIDEBAR - ESTADÍSTICAS Y ALERTAS */}
          <div className="space-y-6">
            {/* Panel de Estadísticas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Resumen Actual</h3>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border border-orange-200">
                    <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">Calorías Objetivo</p>
                    <p className="text-3xl font-bold text-orange-700">{currentDiet.macros.calories}</p>
                    <p className="text-xs text-orange-600 mt-1">kcal/día</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <p className="text-xs font-bold text-blue-600 mb-1">Proteínas</p>
                      <p className="text-lg font-bold text-blue-700">{currentDiet.macros.protein}g</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                      <p className="text-xs font-bold text-green-600 mb-1">Carbos</p>
                      <p className="text-lg font-bold text-green-700">{currentDiet.macros.carbs}g</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                      <p className="text-xs font-bold text-purple-600 mb-1">Grasas</p>
                      <p className="text-lg font-bold text-purple-700">{currentDiet.macros.fats}g</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-600">Adherencia Promedio</span>
                      <span className="text-sm font-bold text-green-600">{currentDiet.adherence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: `${currentDiet.adherence}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Alertas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Alertas
              </h3>

              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm font-semibold text-blue-700">Revisión programada</p>
                  <p className="text-xs text-blue-600 mt-1">En 3 días</p>
                </div>

                <div className="p-3 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-sm font-semibold text-green-700">Cliente activo</p>
                  <p className="text-xs text-green-600 mt-1">Última comida registrada: Hoy</p>
                </div>
              </div>
            </motion.div>

            {/* Acciones Finales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-3"
            >
              <button
                onClick={handleSave}
                className="w-full relative overflow-hidden bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white text-left group border border-white/20"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <Save className="w-5 h-5" />
                  <span className="font-bold">Guardar Cambios</span>
                </div>
              </button>

              <button
                onClick={handleSendToClient}
                className="w-full px-4 py-3 border-2 border-orange-500 text-orange-600 rounded-2xl font-semibold hover:bg-orange-50 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar al Cliente
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar lista de dietas
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-yellow-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-2">
                Editar <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Dietas</span>
              </h1>
              <p className="text-xl text-yellow-100">
                Gestiona y edita las dietas de tus clientes
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
              <Plus className="w-5 h-5" />
              Nueva Dieta
            </button>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold text-white">Total</span>
              </div>
              <p className="text-2xl font-bold text-white">{dietas.length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold text-white">Activas</span>
              </div>
              <p className="text-2xl font-bold text-white">{dietas.filter(d => d.status === 'activa').length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Edit3 className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold text-white">Borradores</span>
              </div>
              <p className="text-2xl font-bold text-white">{dietas.filter(d => d.status === 'borrador').length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold text-white">Adherencia</span>
              </div>
              <p className="text-2xl font-bold text-white">{Math.round(dietas.reduce((acc, d) => acc + d.adherence, 0) / dietas.length)}%</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* LAYOUT: FILTROS + GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* FILTROS (Sidebar) */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Filtros</h3>
              
              {/* Búsqueda */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Nombre o cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Estado */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos los estados</option>
                  <option value="activa">Activa</option>
                  <option value="borrador">Borrador</option>
                  <option value="finalizada">Finalizada</option>
                  <option value="pausada">Pausada</option>
                </select>
              </div>

              {/* Entrenador */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Entrenador</label>
                <select
                  value={filters.trainer}
                  onChange={(e) => setFilters({ ...filters, trainer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos los entrenadores</option>
                  <option value="Ana García">Ana García</option>
                  <option value="Carlos López">Carlos López</option>
                  <option value="María Rodríguez">María Rodríguez</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* GRID DE DIETAS */}
        <div className="lg:col-span-3">
          {/* Header con contador y opciones */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {dietasFiltradas.length} dieta{dietasFiltradas.length !== 1 ? 's' : ''}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {searchTerm && `Resultados para "${searchTerm}"`}
                {filters.status && ` • Estado: ${getStatusLabel(filters.status as Dieta['status'])}`}
                {filters.trainer && ` • Entrenador: ${filters.trainer}`}
              </p>
            </div>

            {/* Botones de vista */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="Vista en grid"
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="Vista en lista"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Grid/Lista de dietas */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dietasFiltradas.map((dieta, index) => (
                <motion.div
                  key={dieta.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  onClick={() => handleEditDieta(dieta)}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group cursor-pointer"
                >
                  {/* Header de la tarjeta */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">{dieta.name}</h3>
                        <p className="text-gray-600 flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {dieta.clientName}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusClass(dieta.status)}`}>
                        {getStatusLabel(dieta.status)}
                      </span>
                    </div>

                    {/* Macros resumidos */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-orange-50 rounded-xl p-3 border border-orange-200">
                        <p className="text-xs font-bold text-orange-600 mb-1">Calorías</p>
                        <p className="text-lg font-bold text-orange-700">{dieta.macros.calories}</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                        <p className="text-xs font-bold text-blue-600 mb-1">Proteínas</p>
                        <p className="text-lg font-bold text-blue-700">{dieta.macros.protein}g</p>
                      </div>
                    </div>

                    {/* Adherencia */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-600">Adherencia</span>
                        <span className="text-sm font-bold text-green-600">{dieta.adherence}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${dieta.adherence}%` }}
                        />
                      </div>
                    </div>

                    {/* Info adicional */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        V{dieta.version}
                      </span>
                      <span>{dieta.lastUpdate}</span>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="p-6 pt-0">
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditDieta(dieta);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                      >
                        <Edit3 className="w-4 h-4" />
                        Editar
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-300"
                      >
                        <Clock className="w-4 h-4" />
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
                  <div className="col-span-4">Dieta</div>
                  <div className="col-span-2">Cliente</div>
                  <div className="col-span-2">Estado</div>
                  <div className="col-span-2">Macros</div>
                  <div className="col-span-1">Adherencia</div>
                  <div className="col-span-1">Acción</div>
                </div>
              </div>

              {/* Lista de dietas */}
              <div className="divide-y divide-gray-100">
                {dietasFiltradas.map((dieta, index) => (
                  <motion.div
                    key={dieta.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ backgroundColor: 'rgba(251, 146, 60, 0.02)' }}
                    className="grid grid-cols-12 gap-4 p-6 hover:bg-orange-50/30 transition-colors duration-200 group"
                  >
                    {/* Dieta */}
                    <div className="col-span-4 flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-orange-100 to-pink-100 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                          <Target className="w-6 h-6 text-white/70" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 truncate">
                          {dieta.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          V{dieta.version} • {dieta.lastUpdate}
                        </p>
                      </div>
                    </div>

                    {/* Cliente */}
                    <div className="col-span-2 flex items-center">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{dieta.clientName}</span>
                      </div>
                    </div>

                    {/* Estado */}
                    <div className="col-span-2 flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusClass(dieta.status)}`}>
                        {getStatusLabel(dieta.status)}
                      </span>
                    </div>

                    {/* Macros */}
                    <div className="col-span-2 flex items-center">
                      <div className="text-sm">
                        <p className="font-semibold text-orange-600">{dieta.macros.calories} kcal</p>
                        <p className="text-gray-500">{dieta.macros.protein}p / {dieta.macros.carbs}c / {dieta.macros.fats}f</p>
                      </div>
                    </div>

                    {/* Adherencia */}
                    <div className="col-span-1 flex items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                            style={{ width: `${dieta.adherence}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-green-600">{dieta.adherence}%</span>
                      </div>
                    </div>

                    {/* Acción */}
                    <div className="col-span-1 flex items-center">
                      <button
                        onClick={() => handleEditDieta(dieta)}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm"
                      >
                        Editar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Estado vacío */}
          {dietasFiltradas.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No se encontraron dietas</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No hay dietas que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietaEditarPage;