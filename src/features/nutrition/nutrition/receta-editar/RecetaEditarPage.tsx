import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles, Clock, Users, Save, RefreshCw, Eye, History, Edit3, Search, Filter, Grid, List, Plus, ArrowLeft, ChevronRight } from 'lucide-react';
import RecetaEditor from './components/RecetaEditor';
import IngredientesManager from './components/IngredientesManager';
import PasosManager from './components/PasosManager';
import NutricionUpdater from './components/NutricionUpdater';
import HistorialVersiones from './components/HistorialVersiones';
import { recetaEditarApi } from './recetaEditarApi';

interface Ingrediente {
  id: string;
  nombre: string;
  cantidad: number;
  unidad: string;
}

interface Paso {
  id: string;
  descripcion: string;
  tiempoEstimado?: number;
}

interface RecetaData {
  id: string;
  nombre: string;
  descripcion: string;
  tipoComida: string;
  dificultad: string;
  tiempoPreparacion: number;
  tiempoCoccion: number;
  etiquetas: string[];
  porciones: number;
  tipsNotas: string;
  ingredientes: Ingrediente[];
  pasos: Paso[];
  fotoUrl?: string;
  version: number;
  fechaCreacion: string;
  fechaModificacion: string;
  valoresNutricionales?: {
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
  };
}

// Mock data para las recetas
const mockRecetas: RecetaData[] = [
  {
    id: 'receta-1',
    nombre: 'Ensalada César Clásica',
    descripcion: 'Una ensalada fresca y deliciosa con aderezo casero',
    tipoComida: 'Almuerzo',
    dificultad: 'fácil',
    tiempoPreparacion: 15,
    tiempoCoccion: 0,
    etiquetas: ['vegetariana', 'fresca', 'clásica'],
    porciones: 4,
    tipsNotas: 'Servir inmediatamente para mantener la frescura',
    ingredientes: [
      { id: '1', nombre: 'Lechuga romana', cantidad: 1, unidad: 'cabeza' },
      { id: '2', nombre: 'Parmesano rallado', cantidad: 50, unidad: 'g' },
      { id: '3', nombre: 'Crutones', cantidad: 100, unidad: 'g' },
      { id: '4', nombre: 'Aderezo César', cantidad: 4, unidad: 'cucharadas' }
    ],
    pasos: [
      { id: '1', descripcion: 'Lavar y cortar la lechuga en trozos medianos', tiempoEstimado: 5 },
      { id: '2', descripcion: 'Agregar el aderezo César y mezclar suavemente', tiempoEstimado: 2 },
      { id: '3', descripcion: 'Añadir parmesano y crutones', tiempoEstimado: 1 },
      { id: '4', descripcion: 'Servir inmediatamente', tiempoEstimado: 1 }
    ],
    fotoUrl: '/images/ensalada-cesar.jpg',
    version: 1,
    fechaCreacion: '2024-01-15',
    fechaModificacion: '2024-01-15',
    valoresNutricionales: {
      calorias: 250,
      proteinas: 8,
      carbohidratos: 15,
      grasas: 18
    }
  },
  {
    id: 'receta-2',
    nombre: 'Pollo a la Plancha con Verduras',
    descripcion: 'Pechuga de pollo marinada con especias y verduras asadas',
    tipoComida: 'Cena',
    dificultad: 'media',
    tiempoPreparacion: 20,
    tiempoCoccion: 25,
    etiquetas: ['proteína', 'saludable', 'bajo carbohidrato'],
    porciones: 2,
    tipsNotas: 'Marinar el pollo por al menos 30 minutos para mejor sabor',
    ingredientes: [
      { id: '1', nombre: 'Pechuga de pollo', cantidad: 400, unidad: 'g' },
      { id: '2', nombre: 'Brócoli', cantidad: 200, unidad: 'g' },
      { id: '3', nombre: 'Zanahoria', cantidad: 150, unidad: 'g' },
      { id: '4', nombre: 'Aceite de oliva', cantidad: 2, unidad: 'cucharadas' }
    ],
    pasos: [
      { id: '1', descripcion: 'Cortar el pollo en tiras y marinar con especias', tiempoEstimado: 10 },
      { id: '2', descripcion: 'Cortar las verduras en trozos medianos', tiempoEstimado: 10 },
      { id: '3', descripcion: 'Cocinar el pollo en la plancha', tiempoEstimado: 15 },
      { id: '4', descripcion: 'Asar las verduras hasta que estén tiernas', tiempoEstimado: 10 }
    ],
    fotoUrl: '/images/pollo-plancha.jpg',
    version: 2,
    fechaCreacion: '2024-01-10',
    fechaModificacion: '2024-01-20',
    valoresNutricionales: {
      calorias: 320,
      proteinas: 35,
      carbohidratos: 12,
      grasas: 15
    }
  },
  {
    id: 'receta-3',
    nombre: 'Avena Overnight con Frutas',
    descripcion: 'Desayuno nutritivo preparado la noche anterior',
    tipoComida: 'Desayuno',
    dificultad: 'fácil',
    tiempoPreparacion: 10,
    tiempoCoccion: 0,
    etiquetas: ['desayuno', 'saludable', 'preparación rápida'],
    porciones: 1,
    tipsNotas: 'Dejar reposar en la nevera toda la noche para mejor textura',
    ingredientes: [
      { id: '1', nombre: 'Avena', cantidad: 50, unidad: 'g' },
      { id: '2', nombre: 'Leche de almendras', cantidad: 200, unidad: 'ml' },
      { id: '3', nombre: 'Plátano', cantidad: 1, unidad: 'unidad' },
      { id: '4', nombre: 'Fresas', cantidad: 100, unidad: 'g' }
    ],
    pasos: [
      { id: '1', descripcion: 'Mezclar la avena con la leche', tiempoEstimado: 2 },
      { id: '2', descripcion: 'Cortar el plátano en rodajas', tiempoEstimado: 3 },
      { id: '3', descripcion: 'Lavar y cortar las fresas', tiempoEstimado: 3 },
      { id: '4', descripcion: 'Refrigerar toda la noche', tiempoEstimado: 0 }
    ],
    fotoUrl: '/images/avena-overnight.jpg',
    version: 1,
    fechaCreacion: '2024-01-12',
    fechaModificacion: '2024-01-12',
    valoresNutricionales: {
      calorias: 280,
      proteinas: 8,
      carbohidratos: 45,
      grasas: 6
    }
  }
];

const RecetaEditarPage: React.FC = () => {
  // Estados para la lista de recetas
  const [recetas, setRecetas] = useState<RecetaData[]>(mockRecetas);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    tipoComida: '',
    dificultad: ''
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Estados para el editor
  const [currentReceta, setCurrentReceta] = useState<RecetaData | null>(null);
  const [originalReceta, setOriginalReceta] = useState<RecetaData | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'ingredientes' | 'pasos' | 'nutricion' | 'historial'>('editor');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Filtrado de recetas
  const recetasFiltradas = React.useMemo(() => {
    return recetas.filter((receta) => {
      const matchesSearch = searchTerm === '' ||
        receta.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receta.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTipo = filters.tipoComida === '' || receta.tipoComida === filters.tipoComida;
      const matchesDificultad = filters.dificultad === '' || receta.dificultad === filters.dificultad;

      return matchesSearch && matchesTipo && matchesDificultad;
    });
  }, [recetas, searchTerm, filters]);

  const handleEditReceta = (recetaToEdit: RecetaData) => {
    setCurrentReceta(recetaToEdit);
    setOriginalReceta({ ...recetaToEdit });
    setHasUnsavedChanges(false);
  };

  const handleBackToList = () => {
    if (hasUnsavedChanges) {
      if (confirm('¿Descartar todos los cambios?')) {
        setCurrentReceta(null);
        setOriginalReceta(null);
        setHasUnsavedChanges(false);
      }
    } else {
      setCurrentReceta(null);
      setOriginalReceta(null);
    }
  };

  const handleRecetaUpdate = (updatedData: Partial<RecetaData>) => {
    if (currentReceta) {
      setCurrentReceta({
        ...currentReceta,
        ...updatedData,
        fechaModificacion: new Date().toISOString().split('T')[0],
        version: currentReceta.version + 1
      });
      setHasUnsavedChanges(true);
    }
  };

  const handleIngredientesUpdate = (ingredientes: Ingrediente[]) => {
    handleRecetaUpdate({ ingredientes });
  };

  const handlePasosUpdate = (pasos: Paso[]) => {
    handleRecetaUpdate({ pasos });
  };

  const handleSaveReceta = async () => {
    if (!currentReceta) return;

    try {
      await recetaEditarApi.updateReceta(currentReceta.id, currentReceta);
      setSaveMessage({ type: 'success', message: '¡Receta actualizada con éxito!' });
      setHasUnsavedChanges(false);
      setLastSaved(new Date());
      
      // Actualizar la lista de recetas
      setRecetas(prev => prev.map(r => r.id === currentReceta.id ? currentReceta : r));
      
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error al guardar la receta:', error);
      setSaveMessage({ type: 'error', message: 'Error al guardar la receta. Inténtelo de nuevo.' });
    }
  };

  const handleSaveAsNewVersion = async () => {
    if (!currentReceta) return;

    try {
      const newVersion = await recetaEditarApi.createNewVersion(currentReceta);
      setSaveMessage({ type: 'success', message: '¡Nueva versión creada con éxito!' });
      
      // Actualizar la lista de recetas
      setRecetas(prev => [...prev, newVersion]);
      setCurrentReceta(newVersion);
      
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error al crear nueva versión:', error);
      setSaveMessage({ type: 'error', message: 'Error al crear nueva versión. Inténtelo de nuevo.' });
    }
  };

  const getDificultadClass = (dificultad: string) => {
    switch (dificultad) {
      case 'fácil':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'difícil':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDificultadLabel = (dificultad: string) => {
    switch (dificultad) {
      case 'fácil': return 'Fácil';
      case 'media': return 'Media';
      case 'difícil': return 'Difícil';
      default: return dificultad;
    }
  };

  const tiempoTotal = currentReceta ? currentReceta.tiempoPreparacion + currentReceta.tiempoCoccion : 0;

  // Si estamos editando una receta, mostrar el editor
  if (currentReceta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
        {/* HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
        >
          {/* Efectos de fondo animados */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-4 text-purple-100">
              <button 
                onClick={handleBackToList}
                className="hover:text-white cursor-pointer transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Lista de Recetas</span>
              </button>
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
                  Editar Receta
                </h1>
                <p className="text-xl text-purple-100 mt-2">
                  {currentReceta.nombre}
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
                  Versión {currentReceta.version}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TABS */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'editor', label: 'Editor', icon: Edit3 },
              { id: 'ingredientes', label: 'Ingredientes', icon: ChefHat },
              { id: 'pasos', label: 'Pasos', icon: Clock },
              { id: 'nutricion', label: 'Nutrición', icon: Sparkles },
              { id: 'historial', label: 'Versiones', icon: History }
            ].map((tab, index) => {
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
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl'
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
            {activeTab === 'editor' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <RecetaEditor
                  receta={currentReceta}
                  onRecetaUpdate={handleRecetaUpdate}
                />
              </motion.div>
            )}

            {activeTab === 'ingredientes' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <IngredientesManager
                  ingredientes={currentReceta.ingredientes}
                  onIngredientesUpdate={handleIngredientesUpdate}
                />
              </motion.div>
            )}

            {activeTab === 'pasos' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PasosManager
                  pasos={currentReceta.pasos}
                  onPasosUpdate={handlePasosUpdate}
                />
              </motion.div>
            )}

            {activeTab === 'nutricion' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NutricionUpdater
                  ingredientes={currentReceta.ingredientes}
                  porciones={currentReceta.porciones}
                />
              </motion.div>
            )}

            {activeTab === 'historial' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HistorialVersiones
                  recetaId={currentReceta.id}
                  currentVersion={currentReceta.version}
                />
              </motion.div>
            )}
          </div>

          {/* SIDEBAR - PREVIEW Y ACCIONES */}
          <div className="space-y-6">
            {/* Preview en Vivo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden relative"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-20"></div>

              <div className="relative z-10">
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6">
                  <div className="flex items-center gap-2 text-white">
                    <Eye className="w-5 h-5" />
                    <h3 className="text-lg font-bold">Vista Previa</h3>
                    <span className="ml-auto text-sm bg-white/20 px-2 py-1 rounded-full">
                      v{currentReceta.version}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {currentReceta.fotoUrl ? (
                    <img src={currentReceta.fotoUrl} alt="Preview" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                      <ChefHat className="w-16 h-16 text-gray-400" />
                    </div>
                  )}

                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentReceta.nombre}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {currentReceta.descripcion}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-bold text-purple-700">{tiempoTotal} min</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-bold text-purple-700">{currentReceta.porciones} porciones</span>
                    </div>
                    {currentReceta.tipoComida && (
                      <div className="px-3 py-2 bg-purple-500 text-white text-xs font-bold rounded-full">
                        {currentReceta.tipoComida}
                      </div>
                    )}
                    {currentReceta.dificultad && (
                      <div className="px-3 py-2 bg-pink-500 text-white text-xs font-bold rounded-full">
                        {currentReceta.dificultad}
                      </div>
                    )}
                  </div>
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
                onClick={handleSaveReceta}
                className="w-full relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white text-left group border border-white/20"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <Save className="w-5 h-5" />
                  <span className="font-bold">Guardar Cambios</span>
                </div>
              </button>

              <button
                onClick={handleSaveAsNewVersion}
                className="w-full px-4 py-3 border-2 border-purple-500 text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Guardar como nueva versión
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Mostrar lista de recetas
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-2">
                Editar <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Recetas</span>
              </h1>
              <p className="text-xl text-purple-100">
                Gestiona y edita tus recetas
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md text-white rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30">
              <Plus className="w-5 h-5" />
              Nueva Receta
            </button>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold text-white">Total</span>
              </div>
              <p className="text-2xl font-bold text-white">{recetas.length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold text-white">Fáciles</span>
              </div>
              <p className="text-2xl font-bold text-white">{recetas.filter(r => r.dificultad === 'fácil').length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Edit3 className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold text-white">Medias</span>
              </div>
              <p className="text-2xl font-bold text-white">{recetas.filter(r => r.dificultad === 'media').length}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-bold text-white">Difíciles</span>
              </div>
              <p className="text-2xl font-bold text-white">{recetas.filter(r => r.dificultad === 'difícil').length}</p>
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
                    placeholder="Nombre o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Tipo de Comida */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Comida</label>
                <select
                  value={filters.tipoComida}
                  onChange={(e) => setFilters({ ...filters, tipoComida: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Todos los tipos</option>
                  <option value="Desayuno">Desayuno</option>
                  <option value="Almuerzo">Almuerzo</option>
                  <option value="Cena">Cena</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>

              {/* Dificultad */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Dificultad</label>
                <select
                  value={filters.dificultad}
                  onChange={(e) => setFilters({ ...filters, dificultad: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Todas las dificultades</option>
                  <option value="fácil">Fácil</option>
                  <option value="media">Media</option>
                  <option value="difícil">Difícil</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* GRID DE RECETAS */}
        <div className="lg:col-span-3">
          {/* Header con contador y opciones */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {recetasFiltradas.length} receta{recetasFiltradas.length !== 1 ? 's' : ''}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {searchTerm && `Resultados para "${searchTerm}"`}
                {filters.tipoComida && ` • Tipo: ${filters.tipoComida}`}
                {filters.dificultad && ` • Dificultad: ${getDificultadLabel(filters.dificultad)}`}
              </p>
            </div>

            {/* Botones de vista */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
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
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="Vista en lista"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Grid/Lista de recetas */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recetasFiltradas.map((receta, index) => (
                <motion.div
                  key={receta.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  onClick={() => handleEditReceta(receta)}
                  className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/50 relative group cursor-pointer"
                >
                  {/* Header de la tarjeta */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">{receta.nombre}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{receta.descripcion}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDificultadClass(receta.dificultad)}`}>
                        {getDificultadLabel(receta.dificultad)}
                      </span>
                    </div>

                    {/* Info nutricional resumida */}
                    {receta.valoresNutricionales && (
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                          <p className="text-xs font-bold text-purple-600 mb-1">Calorías</p>
                          <p className="text-lg font-bold text-purple-700">{receta.valoresNutricionales.calorias}</p>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                          <p className="text-xs font-bold text-blue-600 mb-1">Proteínas</p>
                          <p className="text-lg font-bold text-blue-700">{receta.valoresNutricionales.proteinas}g</p>
                        </div>
                      </div>
                    )}

                    {/* Info adicional */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {receta.tiempoPreparacion + receta.tiempoCoccion} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {receta.porciones} porciones
                      </span>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="p-6 pt-0">
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditReceta(receta);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
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
                  <div className="col-span-4">Receta</div>
                  <div className="col-span-2">Tipo</div>
                  <div className="col-span-2">Dificultad</div>
                  <div className="col-span-2">Tiempo</div>
                  <div className="col-span-1">Porciones</div>
                  <div className="col-span-1">Acción</div>
                </div>
              </div>

              {/* Lista de recetas */}
              <div className="divide-y divide-gray-100">
                {recetasFiltradas.map((receta, index) => (
                  <motion.div
                    key={receta.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ backgroundColor: 'rgba(168, 85, 247, 0.02)' }}
                    className="grid grid-cols-12 gap-4 p-6 hover:bg-purple-50/30 transition-colors duration-200 group"
                  >
                    {/* Receta */}
                    <div className="col-span-4 flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                          <ChefHat className="w-6 h-6 text-white/70" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 truncate">
                          {receta.nombre}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-1">
                          {receta.descripcion}
                        </p>
                      </div>
                    </div>

                    {/* Tipo */}
                    <div className="col-span-2 flex items-center">
                      <span className="text-gray-700">{receta.tipoComida}</span>
                    </div>

                    {/* Dificultad */}
                    <div className="col-span-2 flex items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDificultadClass(receta.dificultad)}`}>
                        {getDificultadLabel(receta.dificultad)}
                      </span>
                    </div>

                    {/* Tiempo */}
                    <div className="col-span-2 flex items-center">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{receta.tiempoPreparacion + receta.tiempoCoccion} min</span>
                      </div>
                    </div>

                    {/* Porciones */}
                    <div className="col-span-1 flex items-center">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{receta.porciones}</span>
                      </div>
                    </div>

                    {/* Acción */}
                    <div className="col-span-1 flex items-center">
                      <button
                        onClick={() => handleEditReceta(receta)}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm"
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
          {recetasFiltradas.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-12 h-12 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No se encontraron recetas</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No hay recetas que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecetaEditarPage;
