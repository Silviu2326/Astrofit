import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Star, Bookmark, Tag, Users, Clock, Weight, 
  Repeat, Target, Dumbbell, Activity, Heart, Flame, Zap, Award, 
  Play, Eye, Plus, Download, Share, Edit, Trash2, Copy, 
  ExternalLink, ChevronDown, ChevronUp, Grid3X3, List, 
  SlidersHorizontal, X, CheckCircle, TrendingUp, BarChart3
} from 'lucide-react';
import { Ejercicio } from '../types';

interface CatalogoMejoradoProps {
  onEjercicioSelect: (ejercicio: Ejercicio) => void;
  onEjercicioAdd?: (ejercicio: Ejercicio) => void;
  onEjercicioFavorite?: (ejercicioId: string) => void;
  onEjercicioBookmark?: (ejercicioId: string) => void;
  ejerciciosFavoritos?: string[];
  ejerciciosBookmarks?: string[];
  mostrarFiltrosAvanzados?: boolean;
  onToggleFiltrosAvanzados?: () => void;
}

interface FiltrosAvanzados {
  categoria: string[];
  dificultad: string[];
  equipamiento: string[];
  musculos: string[];
  duracion: { min: number; max: number };
  intensidad: { min: number; max: number };
}

const CatalogoMejorado: React.FC<CatalogoMejoradoProps> = ({
  onEjercicioSelect,
  onEjercicioAdd,
  onEjercicioFavorite,
  onEjercicioBookmark,
  ejerciciosFavoritos = [],
  ejerciciosBookmarks = [],
  mostrarFiltrosAvanzados = false,
  onToggleFiltrosAvanzados
}) => {
  const [vista, setVista] = useState<'grid' | 'lista'>('grid');
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas');
  const [dificultadFiltro, setDificultadFiltro] = useState<string>('todas');
  const [equipamientoFiltro, setEquipamientoFiltro] = useState<string>('todos');
  const [ordenarPor, setOrdenarPor] = useState<string>('nombre');
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<Ejercicio | null>(null);
  const [mostrarPreview, setMostrarPreview] = useState(false);

  // Ejercicios de ejemplo
  const ejercicios: Ejercicio[] = [
    {
      id: '1',
      nombre: 'Sentadilla',
      categoria: 'Piernas',
      musculos: ['cuádriceps', 'glúteos', 'isquiotibiales'],
      dificultad: 'intermedio',
      equipamiento: ['barra', 'discos'],
      metrica: 'repeticiones',
      duracion: 5,
      intensidad: 8,
      calorias: 12,
      descripcion: 'Ejercicio fundamental para el desarrollo de la fuerza en las piernas',
      instrucciones: ['Coloca la barra sobre los hombros', 'Baja hasta que los muslos estén paralelos al suelo', 'Sube manteniendo la espalda recta']
    },
    {
      id: '2',
      nombre: 'Press de Banca',
      categoria: 'Pecho',
      musculos: ['pectorales', 'deltoides anterior', 'tríceps'],
      dificultad: 'intermedio',
      equipamiento: ['barra', 'banco'],
      metrica: 'repeticiones',
      duracion: 4,
      intensidad: 7,
      calorias: 10,
      descripcion: 'Ejercicio clásico para el desarrollo del pecho y brazos',
      instrucciones: ['Acuéstate en el banco', 'Agarra la barra con las manos separadas', 'Baja controladamente y sube con fuerza']
    },
    {
      id: '3',
      nombre: 'Peso Muerto',
      categoria: 'Espalda',
      musculos: ['erectores espinales', 'glúteos', 'isquiotibiales'],
      dificultad: 'avanzado',
      equipamiento: ['barra', 'discos'],
      metrica: 'repeticiones',
      duracion: 6,
      intensidad: 9,
      calorias: 15,
      descripcion: 'Ejercicio completo para el desarrollo de la cadena posterior',
      instrucciones: ['Párate con los pies separados', 'Agarra la barra con ambas manos', 'Levanta manteniendo la espalda recta']
    },
    {
      id: '4',
      nombre: 'Flexiones',
      categoria: 'Pecho',
      musculos: ['pectorales', 'deltoides anterior', 'tríceps'],
      dificultad: 'principiante',
      equipamiento: [],
      metrica: 'repeticiones',
      duracion: 3,
      intensidad: 6,
      calorias: 8,
      descripcion: 'Ejercicio básico para fortalecer el pecho y brazos',
      instrucciones: ['Colócate en posición de plancha', 'Baja el pecho hacia el suelo', 'Sube manteniendo el cuerpo recto']
    },
    {
      id: '5',
      nombre: 'Plancha',
      categoria: 'Core',
      musculos: ['abdominales', 'oblicuos', 'erectores espinales'],
      dificultad: 'principiante',
      equipamiento: [],
      metrica: 'tiempo',
      duracion: 1,
      intensidad: 5,
      calorias: 5,
      descripcion: 'Ejercicio isométrico para fortalecer el core',
      instrucciones: ['Colócate boca abajo', 'Apóyate en antebrazos y puntas de pies', 'Mantén el cuerpo recto']
    }
  ];

  // Filtros y búsqueda
  const ejerciciosFiltrados = useMemo(() => {
    let filtrados = ejercicios;

    // Búsqueda por texto
    if (busqueda) {
      filtrados = filtrados.filter(ejercicio =>
        ejercicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        ejercicio.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
        ejercicio.musculos.some(musculo => 
          musculo.toLowerCase().includes(busqueda.toLowerCase())
        )
      );
    }

    // Filtro por categoría
    if (categoriaFiltro !== 'todas') {
      filtrados = filtrados.filter(ejercicio => ejercicio.categoria === categoriaFiltro);
    }

    // Filtro por dificultad
    if (dificultadFiltro !== 'todas') {
      filtrados = filtrados.filter(ejercicio => ejercicio.dificultad === dificultadFiltro);
    }

    // Filtro por equipamiento
    if (equipamientoFiltro !== 'todos') {
      if (equipamientoFiltro === 'sin-equipamiento') {
        filtrados = filtrados.filter(ejercicio => ejercicio.equipamiento.length === 0);
      } else {
        filtrados = filtrados.filter(ejercicio => 
          ejercicio.equipamiento.includes(equipamientoFiltro)
        );
      }
    }

    // Ordenamiento
    filtrados.sort((a, b) => {
      switch (ordenarPor) {
        case 'nombre':
          return a.nombre.localeCompare(b.nombre);
        case 'categoria':
          return a.categoria.localeCompare(b.categoria);
        case 'dificultad':
          const ordenDificultad = { 'principiante': 1, 'intermedio': 2, 'avanzado': 3 };
          return ordenDificultad[a.dificultad as keyof typeof ordenDificultad] - 
                 ordenDificultad[b.dificultad as keyof typeof ordenDificultad];
        case 'duracion':
          return a.duracion - b.duracion;
        case 'intensidad':
          return b.intensidad - a.intensidad;
        default:
          return 0;
      }
    });

    return filtrados;
  }, [busqueda, categoriaFiltro, dificultadFiltro, equipamientoFiltro, ordenarPor]);

  const categorias = [...new Set(ejercicios.map(e => e.categoria))];
  const dificultades = [...new Set(ejercicios.map(e => e.dificultad))];
  const equipamientos = [...new Set(ejercicios.flatMap(e => e.equipamiento))];

  const getDificultadColor = (dificultad: string) => {
    switch (dificultad) {
      case 'principiante':
        return 'bg-green-100 text-green-700';
      case 'intermedio':
        return 'bg-yellow-100 text-yellow-700';
      case 'avanzado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'Piernas':
        return 'bg-blue-100 text-blue-700';
      case 'Pecho':
        return 'bg-red-100 text-red-700';
      case 'Espalda':
        return 'bg-green-100 text-green-700';
      case 'Core':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleEjercicioClick = (ejercicio: Ejercicio) => {
    setEjercicioSeleccionado(ejercicio);
    setMostrarPreview(true);
    onEjercicioSelect(ejercicio);
  };

  const handleEjercicioAdd = (ejercicio: Ejercicio) => {
    onEjercicioAdd?.(ejercicio);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header con búsqueda */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Ejercicios</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVista('grid')}
              className={`p-1 rounded transition-all ${
                vista === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setVista('lista')}
              className={`p-1 rounded transition-all ${
                vista === 'lista' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Búsqueda */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar ejercicios, músculos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        
        {/* Filtros rápidos */}
        <div className="space-y-3">
          {/* Categorías */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Categoría</label>
            <select
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="todas">Todas las categorías</option>
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>

          {/* Dificultad */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Dificultad</label>
            <select
              value={dificultadFiltro}
              onChange={(e) => setDificultadFiltro(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="todas">Todas las dificultades</option>
              {dificultades.map(dificultad => (
                <option key={dificultad} value={dificultad}>
                  {dificultad.charAt(0).toUpperCase() + dificultad.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Equipamiento */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Equipamiento</label>
            <select
              value={equipamientoFiltro}
              onChange={(e) => setEquipamientoFiltro(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="todos">Todo el equipamiento</option>
              <option value="sin-equipamiento">Sin equipamiento</option>
              {equipamientos.map(equipamiento => (
                <option key={equipamiento} value={equipamiento}>
                  {equipamiento.charAt(0).toUpperCase() + equipamiento.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenar por */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Ordenar por</label>
            <select
              value={ordenarPor}
              onChange={(e) => setOrdenarPor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="nombre">Nombre</option>
              <option value="categoria">Categoría</option>
              <option value="dificultad">Dificultad</option>
              <option value="duracion">Duración</option>
              <option value="intensidad">Intensidad</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de ejercicios */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className={`space-y-3 ${
          vista === 'grid' ? 'grid grid-cols-1 gap-3' : 'space-y-3'
        }`}>
          <AnimatePresence>
            {ejerciciosFiltrados.map((ejercicio, index) => (
              <motion.div
                key={ejercicio.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => handleEjercicioClick(ejercicio)}
                className="bg-gray-50 rounded-xl p-4 hover:bg-orange-50 transition-all cursor-pointer border border-gray-100 hover:border-orange-200 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 group-hover:text-orange-700 transition-colors">
                        {ejercicio.nombre}
                      </h4>
                      <div className="flex items-center gap-1">
                        {ejerciciosFavoritos.includes(ejercicio.id) && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                        {ejerciciosBookmarks.includes(ejercicio.id) && (
                          <Bookmark className="w-4 h-4 text-blue-500 fill-current" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoriaColor(ejercicio.categoria)}`}>
                        {ejercicio.categoria}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDificultadColor(ejercicio.dificultad)}`}>
                        {ejercicio.dificultad}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {ejercicio.descripcion}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ejercicio.duracion}min
                      </span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        {ejercicio.intensidad}/10
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {ejercicio.calorias} cal
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-2">
                      {ejercicio.musculos.slice(0, 2).map(musculo => (
                        <span key={musculo} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          {musculo}
                        </span>
                      ))}
                      {ejercicio.musculos.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{ejercicio.musculos.length - 2} más
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Acciones */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEjercicioFavorite?.(ejercicio.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Star className={`w-4 h-4 ${
                        ejerciciosFavoritos.includes(ejercicio.id) 
                          ? 'text-yellow-500 fill-current' 
                          : 'text-gray-400'
                      }`} />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEjercicioBookmark?.(ejercicio.id);
                      }}
                      className="p-1 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Bookmark className={`w-4 h-4 ${
                        ejerciciosBookmarks.includes(ejercicio.id) 
                          ? 'text-blue-500 fill-current' 
                          : 'text-gray-400'
                      }`} />
                    </motion.button>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEjercicioAdd(ejercicio);
                    }}
                    className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Añadir
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {ejerciciosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron ejercicios</h3>
            <p className="text-gray-600">Intenta ajustar los filtros o cambiar la búsqueda.</p>
          </div>
        )}
      </div>

      {/* Preview del ejercicio seleccionado */}
      <AnimatePresence>
        {mostrarPreview && ejercicioSeleccionado && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{ejercicioSeleccionado.nombre}</h2>
                <button
                  onClick={() => setMostrarPreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="space-y-6">
                  {/* Información básica */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{ejercicioSeleccionado.duracion}min</div>
                      <div className="text-sm text-gray-600">Duración</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600 mb-1">{ejercicioSeleccionado.intensidad}/10</div>
                      <div className="text-sm text-gray-600">Intensidad</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{ejercicioSeleccionado.calorias}</div>
                      <div className="text-sm text-gray-600">Calorías</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{ejercicioSeleccionado.musculos.length}</div>
                      <div className="text-sm text-gray-600">Músculos</div>
                    </div>
                  </div>
                  
                  {/* Descripción */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                    <p className="text-gray-700">{ejercicioSeleccionado.descripcion}</p>
                  </div>
                  
                  {/* Instrucciones */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Instrucciones</h3>
                    <ol className="space-y-2">
                      {ejercicioSeleccionado.instrucciones.map((instruccion, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{instruccion}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  {/* Músculos trabajados */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Músculos Trabajados</h3>
                    <div className="flex flex-wrap gap-2">
                      {ejercicioSeleccionado.musculos.map(musculo => (
                        <span key={musculo} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {musculo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleEjercicioAdd(ejercicioSeleccionado);
                    setMostrarPreview(false);
                  }}
                  className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Añadir al Entrenamiento
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMostrarPreview(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Cerrar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogoMejorado;

