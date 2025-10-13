import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDraggable } from '@dnd-kit/core';
import {
  Search, Filter, Star, Bookmark, Tag, Users, Clock, Weight, Repeat, Target,
  Dumbbell, Activity, Heart, Flame, Zap, Award, Play, Eye, Plus, Download,
  Share, Edit, Trash2, Copy, ExternalLink, ChevronDown, ChevronUp, Grid3X3, List,
  FileText, Sparkles, Calendar, Timer, GripVertical
} from 'lucide-react';

interface Ejercicio {
  id: string;
  nombre: string;
  categoria: string;
  musculos: string[];
  equipamiento: string[];
  dificultad: 'Principiante' | 'Intermedio' | 'Avanzado';
  descripcion: string;
  tiempo: number;
  intensidad: number;
  calorias: number;
  favorito: boolean;
  imagen?: string;
  video?: string;
}

interface PlantillaEntrenamiento {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  duracion: number; // en minutos
  dificultad: 'Principiante' | 'Intermedio' | 'Avanzado';
  ejercicios: number;
  objetivo: string;
  favorito: boolean;
  imagen?: string;
}

interface CatalogoPanelProps {
  onEjercicioSelect: (ejercicio: Ejercicio) => void;
  onEjercicioAdd: (ejercicio: Ejercicio) => void;
  onPlantillaSelect: (plantilla: PlantillaEntrenamiento) => void;
  onPlantillaAdd: (plantilla: PlantillaEntrenamiento) => void;
}

// Componente arrastrable para ejercicios
const EjercicioDraggable: React.FC<{ ejercicio: Ejercicio; onSelect: (ejercicio: Ejercicio) => void; vista: 'grid' | 'lista' }> = ({ 
  ejercicio, 
  onSelect, 
  vista 
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `ejercicio-${ejercicio.id}`,
    data: {
      type: 'ejercicio',
      ejercicio
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      className={`bg-gray-50 rounded-lg hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-all ${
        vista === 'grid' ? 'p-4' : 'p-3'
      } ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => onSelect(ejercicio)}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center gap-2 mb-2">
        <GripVertical className="w-4 h-4 text-gray-400" />
        {vista === 'grid' ? (
          // Vista de tarjetas
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900 text-sm">{ejercicio.nombre}</h4>
              {ejercicio.favorito && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
            </div>
            <p className="text-xs text-gray-600 mb-2">{ejercicio.descripcion}</p>
            <div className="flex gap-1 mb-2">
              {ejercicio.musculos.slice(0, 2).map((musculo) => (
                <span key={musculo} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {musculo}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {ejercicio.tiempo}min
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3" />
                {ejercicio.calorias} cal
              </span>
            </div>
          </div>
        ) : (
          // Vista de lista
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">{ejercicio.nombre}</h4>
                <p className="text-xs text-gray-600">{ejercicio.categoria}</p>
                <div className="flex gap-1 mt-1">
                  {ejercicio.musculos.slice(0, 2).map((musculo) => (
                    <span key={musculo} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {musculo}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  ejercicio.dificultad === 'Principiante' ? 'bg-green-100 text-green-800' :
                  ejercicio.dificultad === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {ejercicio.dificultad}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <span>{ejercicio.tiempo}min</span>
                  <span>{ejercicio.calorias} cal</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Componente arrastrable para plantillas
const PlantillaDraggable: React.FC<{ plantilla: PlantillaEntrenamiento; onSelect: (plantilla: PlantillaEntrenamiento) => void; vista: 'grid' | 'lista' }> = ({ 
  plantilla, 
  onSelect, 
  vista 
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `plantilla-${plantilla.id}`,
    data: {
      type: 'plantilla',
      plantilla
    }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 cursor-grab active:cursor-grabbing transition-all border border-blue-200 ${
        vista === 'grid' ? 'p-4' : 'p-3'
      } ${isDragging ? 'opacity-50' : ''}`}
      onClick={() => onSelect(plantilla)}
      {...listeners}
      {...attributes}
    >
      <div className="flex items-center gap-2 mb-2">
        <GripVertical className="w-4 h-4 text-blue-400" />
        {vista === 'grid' ? (
          // Vista de tarjetas para plantillas
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                {plantilla.nombre}
              </h4>
              {plantilla.favorito && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
            </div>
            <p className="text-xs text-gray-600 mb-2">{plantilla.descripcion}</p>
            <div className="flex gap-1 mb-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {plantilla.categoria}
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                {plantilla.objetivo}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <Timer className="w-3 h-3" />
                {plantilla.duracion}min
              </span>
              <span className="flex items-center gap-1">
                <Dumbbell className="w-3 h-3" />
                {plantilla.ejercicios} ejercicios
              </span>
            </div>
          </div>
        ) : (
          // Vista de lista para plantillas
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  {plantilla.nombre}
                </h4>
                <p className="text-xs text-gray-600">{plantilla.descripcion}</p>
                <div className="flex gap-1 mt-1">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {plantilla.categoria}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    {plantilla.objetivo}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  plantilla.dificultad === 'Principiante' ? 'bg-green-100 text-green-800' :
                  plantilla.dificultad === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {plantilla.dificultad}
                </span>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <span>{plantilla.duracion}min</span>
                  <span>{plantilla.ejercicios} ejercicios</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const CatalogoPanel: React.FC<CatalogoPanelProps> = ({
  onEjercicioSelect,
  onEjercicioAdd,
  onPlantillaSelect,
  onPlantillaAdd
}) => {
  const [busqueda, setBusqueda] = useState('');
  const [tipoContenido, setTipoContenido] = useState<'ejercicios' | 'plantillas'>('ejercicios');
  const [filtros, setFiltros] = useState({
    categoria: '',
    musculo: '',
    equipamiento: '',
    dificultad: '',
    favoritos: false
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [vista, setVista] = useState<'grid' | 'lista'>('grid');

  // Mock data
  const ejercicios: Ejercicio[] = [
    {
      id: '1',
      nombre: 'Sentadilla con Barra',
      categoria: 'Fuerza',
      musculos: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
      equipamiento: ['Barra', 'Rack'],
      dificultad: 'Intermedio',
      descripcion: 'Ejercicio fundamental para el desarrollo de la fuerza del tren inferior',
      tiempo: 45,
      intensidad: 8,
      calorias: 120,
      favorito: true
    },
    {
      id: '2',
      nombre: 'Press de Banca',
      categoria: 'Fuerza',
      musculos: ['Pectorales', 'Deltoides Anterior', 'Tríceps'],
      equipamiento: ['Banco', 'Barra', 'Discos'],
      dificultad: 'Intermedio',
      descripcion: 'Ejercicio clásico para el desarrollo del tren superior',
      tiempo: 40,
      intensidad: 7,
      calorias: 100,
      favorito: true
    },
    {
      id: '3',
      nombre: 'Burpees',
      categoria: 'Cardio',
      musculos: ['Todo el cuerpo'],
      equipamiento: ['Suelo'],
      dificultad: 'Intermedio',
      descripcion: 'Ejercicio de alta intensidad para todo el cuerpo',
      tiempo: 30,
      intensidad: 9,
      calorias: 150,
      favorito: false
    },
    {
      id: '4',
      nombre: 'Plancha',
      categoria: 'Core',
      musculos: ['Abdominales', 'Erectores', 'Deltoides'],
      equipamiento: ['Suelo'],
      dificultad: 'Principiante',
      descripcion: 'Ejercicio isométrico para el fortalecimiento del core',
      tiempo: 60,
      intensidad: 6,
      calorias: 50,
      favorito: false
    },
    {
      id: '5',
      nombre: 'Dominadas',
      categoria: 'Fuerza',
      musculos: ['Dorsales', 'Bíceps', 'Deltoides Posterior'],
      equipamiento: ['Barra de Dominadas'],
      dificultad: 'Intermedio',
      descripcion: 'Ejercicio fundamental para el desarrollo de la fuerza del tren superior',
      tiempo: 35,
      intensidad: 8,
      calorias: 80,
      favorito: false
    }
  ];

  // Mock data para plantillas
  const plantillas: PlantillaEntrenamiento[] = [
    {
      id: 'p1',
      nombre: 'Fuerza Básica',
      descripcion: 'Rutina completa para desarrollar fuerza base',
      categoria: 'Fuerza',
      duracion: 60,
      dificultad: 'Principiante',
      ejercicios: 6,
      objetivo: 'Desarrollo de fuerza',
      favorito: true
    },
    {
      id: 'p2',
      nombre: 'HIIT Cardio',
      descripcion: 'Entrenamiento de alta intensidad para quemar grasa',
      categoria: 'Cardio',
      duracion: 30,
      dificultad: 'Intermedio',
      ejercicios: 8,
      objetivo: 'Pérdida de grasa',
      favorito: false
    },
    {
      id: 'p3',
      nombre: 'Push Day',
      descripcion: 'Día de empuje para tren superior',
      categoria: 'Fuerza',
      duracion: 45,
      dificultad: 'Intermedio',
      ejercicios: 5,
      objetivo: 'Desarrollo muscular',
      favorito: true
    },
    {
      id: 'p4',
      nombre: 'Core Intenso',
      descripcion: 'Rutina enfocada en fortalecimiento del core',
      categoria: 'Core',
      duracion: 25,
      dificultad: 'Avanzado',
      ejercicios: 7,
      objetivo: 'Core fuerte',
      favorito: false
    },
    {
      id: 'p5',
      nombre: 'Full Body',
      descripcion: 'Entrenamiento completo para todo el cuerpo',
      categoria: 'Fuerza',
      duracion: 50,
      dificultad: 'Intermedio',
      ejercicios: 8,
      objetivo: 'Fitness general',
      favorito: true
    }
  ];

  // Filtrar contenido según el tipo
  const ejerciciosFiltrados = ejercicios.filter(ejercicio => {
    const coincideBusqueda = ejercicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            ejercicio.musculos.some(m => m.toLowerCase().includes(busqueda.toLowerCase())) ||
                            ejercicio.categoria.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideCategoria = !filtros.categoria || ejercicio.categoria === filtros.categoria;
    const coincideMusculo = !filtros.musculo || ejercicio.musculos.includes(filtros.musculo);
    const coincideEquipamiento = !filtros.equipamiento || ejercicio.equipamiento.includes(filtros.equipamiento);
    const coincideDificultad = !filtros.dificultad || ejercicio.dificultad === filtros.dificultad;
    const coincideFavoritos = !filtros.favoritos || ejercicio.favorito;

    return coincideBusqueda && coincideCategoria && coincideMusculo && 
           coincideEquipamiento && coincideDificultad && coincideFavoritos;
  });

  const plantillasFiltradas = plantillas.filter(plantilla => {
    const coincideBusqueda = plantilla.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            plantilla.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                            plantilla.categoria.toLowerCase().includes(busqueda.toLowerCase()) ||
                            plantilla.objetivo.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideCategoria = !filtros.categoria || plantilla.categoria === filtros.categoria;
    const coincideDificultad = !filtros.dificultad || plantilla.dificultad === filtros.dificultad;
    const coincideFavoritos = !filtros.favoritos || plantilla.favorito;

    return coincideBusqueda && coincideCategoria && coincideDificultad && coincideFavoritos;
  });

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        {/* Selector de tipo de contenido */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setTipoContenido('ejercicios')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              tipoContenido === 'ejercicios'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            Ejercicios
          </button>
          <button
            onClick={() => setTipoContenido('plantillas')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              tipoContenido === 'plantillas'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Plantillas
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            {tipoContenido === 'ejercicios' ? 'Ejercicios' : 'Plantillas de Entrenamiento'}
          </h3>
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
            placeholder={tipoContenido === 'ejercicios' ? 'Buscar ejercicios...' : 'Buscar plantillas...'}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        
        {/* Filtros rápidos */}
        <div className="flex gap-2 flex-wrap mb-4">
          {['Fuerza', 'Cardio', 'Core', 'Flexibilidad'].map(categoria => (
            <button
              key={categoria}
              onClick={() => setFiltros({ ...filtros, categoria: filtros.categoria === categoria ? '' : categoria })}
              className={`px-2 py-1 rounded-full text-xs font-semibold transition-all ${
                filtros.categoria === categoria
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
        
        {/* Botón de filtros avanzados */}
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm"
        >
          <Filter className="w-4 h-4" />
          Filtros
          <ChevronDown className={`w-4 h-4 transition-transform ${mostrarFiltros ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filtros avanzados */}
      <AnimatePresence>
        {mostrarFiltros && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border-b border-gray-200 bg-gray-50"
          >
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Músculo</label>
                <select
                  value={filtros.musculo}
                  onChange={(e) => setFiltros({ ...filtros, musculo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value="">Todos</option>
                  <option value="Cuádriceps">Cuádriceps</option>
                  <option value="Glúteos">Glúteos</option>
                  <option value="Pectorales">Pectorales</option>
                  <option value="Dorsales">Dorsales</option>
                  <option value="Bíceps">Bíceps</option>
                  <option value="Tríceps">Tríceps</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Equipamiento</label>
                <select
                  value={filtros.equipamiento}
                  onChange={(e) => setFiltros({ ...filtros, equipamiento: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value="">Todos</option>
                  <option value="Barra">Barra</option>
                  <option value="Mancuernas">Mancuernas</option>
                  <option value="Banco">Banco</option>
                  <option value="Suelo">Suelo</option>
                  <option value="Máquina">Máquina</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Dificultad</label>
                <select
                  value={filtros.dificultad}
                  onChange={(e) => setFiltros({ ...filtros, dificultad: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value="">Todas</option>
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filtros.favoritos}
                  onChange={(e) => setFiltros({ ...filtros, favoritos: e.target.checked })}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <label className="text-sm font-semibold text-gray-700">Solo favoritos</label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Lista de contenido */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className={vista === 'grid' ? 'grid grid-cols-1 gap-3' : 'space-y-3'}>
          {tipoContenido === 'ejercicios' ? (
            // Mostrar ejercicios arrastrables
            ejerciciosFiltrados.map((ejercicio) => (
              <EjercicioDraggable
                key={ejercicio.id}
                ejercicio={ejercicio}
                onSelect={onEjercicioSelect}
                vista={vista}
              />
            ))
          ) : (
            // Mostrar plantillas arrastrables
            plantillasFiltradas.map((plantilla) => (
              <PlantillaDraggable
                key={plantilla.id}
                plantilla={plantilla}
                onSelect={onPlantillaSelect}
                vista={vista}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};



