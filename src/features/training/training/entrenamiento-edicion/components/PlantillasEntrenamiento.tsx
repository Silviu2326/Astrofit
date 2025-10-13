import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Star, Bookmark, Tag, Users, Clock, Weight, Repeat, Target,
  Dumbbell, Activity, Heart, Flame, Zap, Award, Play, Eye, Plus, Download,
  Share, Edit, Trash2, Copy, ExternalLink, ChevronDown, ChevronUp, Save,
  Settings, BarChart3, TrendingUp, Calendar, User, MapPin, MessageSquare
} from 'lucide-react';

interface PlantillaEntrenamiento {
  id: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  objetivo: string;
  nivel: 'Principiante' | 'Intermedio' | 'Avanzado';
  duracion: number; // en semanas
  diasPorSemana: number;
  duracionSesion: number; // en minutos
  creadoPor: string;
  fechaCreacion: Date;
  favorito: boolean;
  personalizado: boolean;
  publico: boolean;
  tags: string[];
  sesiones: {
    id: string;
    nombre: string;
    dia: number;
    orden: number;
    duracion: number;
    tipo: string;
    ejercicios: {
      id: string;
      nombre: string;
      series: number;
      repeticiones: string;
      peso: number;
      descanso: number;
      orden: number;
    }[];
  }[];
  estadisticas: {
    totalEjercicios: number;
    totalSesiones: number;
    duracionTotal: number;
    caloriasEstimadas: number;
    usos: number;
    rating: number;
  };
  requisitos: {
    equipamiento: string[];
    espacio: string;
    experiencia: string;
    restricciones: string[];
  };
  progresion: {
    tipo: 'lineal' | 'ondulante' | 'periodizado';
    incremento: number;
    frecuencia: string;
  };
}

interface PlantillasEntrenamientoProps {
  onPlantillaSelect: (plantilla: PlantillaEntrenamiento) => void;
  onPlantillaCreate: (plantilla: Omit<PlantillaEntrenamiento, 'id' | 'fechaCreacion'>) => void;
  onPlantillaDuplicate: (plantilla: PlantillaEntrenamiento) => void;
  modo: 'seleccion' | 'gestion' | 'vista';
}

const PlantillasEntrenamiento: React.FC<PlantillasEntrenamientoProps> = ({
  onPlantillaSelect,
  onPlantillaCreate,
  onPlantillaDuplicate,
  modo
}) => {
  const [plantillas, setPlantillas] = useState<PlantillaEntrenamiento[]>([]);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    categoria: '',
    objetivo: '',
    nivel: '',
    duracion: '',
    favoritos: false,
    personalizados: false,
    publicos: false
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<PlantillaEntrenamiento | null>(null);
  const [vista, setVista] = useState<'grid' | 'lista'>('grid');
  const [ordenarPor, setOrdenarPor] = useState<'nombre' | 'fecha' | 'rating' | 'usos'>('nombre');

  // Mock data
  useEffect(() => {
    const plantillasMock: PlantillaEntrenamiento[] = [
      {
        id: '1',
        nombre: 'Fuerza Básica 8 Semanas',
        descripcion: 'Programa de fuerza fundamental para principiantes que quieren desarrollar una base sólida',
        categoria: 'Fuerza',
        objetivo: 'Ganar Masa',
        nivel: 'Principiante',
        duracion: 8,
        diasPorSemana: 3,
        duracionSesion: 60,
        creadoPor: 'Carlos Trainer',
        fechaCreacion: new Date(),
        favorito: true,
        personalizado: false,
        publico: true,
        tags: ['fuerza', 'principiante', 'masa'],
        sesiones: [
          {
            id: 'sesion-1',
            nombre: 'Tren Superior',
            dia: 1,
            orden: 1,
            duracion: 60,
            tipo: 'Fuerza',
            ejercicios: [
              { id: 'ej-1', nombre: 'Press de Banca', series: 3, repeticiones: '8-10', peso: 0, descanso: 120, orden: 1 },
              { id: 'ej-2', nombre: 'Remo con Barra', series: 3, repeticiones: '8-10', peso: 0, descanso: 120, orden: 2 },
              { id: 'ej-3', nombre: 'Press Militar', series: 3, repeticiones: '8-10', peso: 0, descanso: 90, orden: 3 }
            ]
          },
          {
            id: 'sesion-2',
            nombre: 'Tren Inferior',
            dia: 2,
            orden: 2,
            duracion: 60,
            tipo: 'Fuerza',
            ejercicios: [
              { id: 'ej-4', nombre: 'Sentadilla', series: 3, repeticiones: '8-10', peso: 0, descanso: 120, orden: 1 },
              { id: 'ej-5', nombre: 'Peso Muerto', series: 3, repeticiones: '6-8', peso: 0, descanso: 180, orden: 2 },
              { id: 'ej-6', nombre: 'Zancadas', series: 3, repeticiones: '10-12', peso: 0, descanso: 90, orden: 3 }
            ]
          }
        ],
        estadisticas: {
          totalEjercicios: 6,
          totalSesiones: 2,
          duracionTotal: 120,
          caloriasEstimadas: 400,
          usos: 156,
          rating: 4.8
        },
        requisitos: {
          equipamiento: ['Barra', 'Discos', 'Banco', 'Rack'],
          espacio: 'Gimnasio completo',
          experiencia: 'Principiante',
          restricciones: []
        },
        progresion: {
          tipo: 'lineal',
          incremento: 2.5,
          frecuencia: 'semanal'
        }
      },
      {
        id: '2',
        nombre: 'HIIT Quema Grasa',
        descripcion: 'Programa de alta intensidad para maximizar la quema de grasa y mejorar la condición cardiovascular',
        categoria: 'Cardio',
        objetivo: 'Perder Grasa',
        nivel: 'Intermedio',
        duracion: 6,
        diasPorSemana: 4,
        duracionSesion: 30,
        creadoPor: 'Laura Fitness',
        fechaCreacion: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        favorito: false,
        personalizado: false,
        publico: true,
        tags: ['hiit', 'cardio', 'quema-grasa'],
        sesiones: [
          {
            id: 'sesion-3',
            nombre: 'HIIT Tabata',
            dia: 1,
            orden: 1,
            duracion: 30,
            tipo: 'HIIT',
            ejercicios: [
              { id: 'ej-7', nombre: 'Burpees', series: 8, repeticiones: '20s', peso: 0, descanso: 10, orden: 1 },
              { id: 'ej-8', nombre: 'Mountain Climbers', series: 8, repeticiones: '20s', peso: 0, descanso: 10, orden: 2 },
              { id: 'ej-9', nombre: 'Jumping Jacks', series: 8, repeticiones: '20s', peso: 0, descanso: 10, orden: 3 }
            ]
          }
        ],
        estadisticas: {
          totalEjercicios: 3,
          totalSesiones: 1,
          duracionTotal: 30,
          caloriasEstimadas: 300,
          usos: 89,
          rating: 4.6
        },
        requisitos: {
          equipamiento: ['Suelo'],
          espacio: 'Cualquier lugar',
          experiencia: 'Intermedio',
          restricciones: ['Problemas de rodilla']
        },
        progresion: {
          tipo: 'ondulante',
          incremento: 5,
          frecuencia: 'semanal'
        }
      },
      {
        id: '3',
        nombre: 'Yoga Flow Dinámico',
        descripcion: 'Secuencia de yoga fluida para mejorar flexibilidad, fuerza y equilibrio',
        categoria: 'Flexibilidad',
        objetivo: 'Salud General',
        nivel: 'Principiante',
        duracion: 4,
        diasPorSemana: 5,
        duracionSesion: 45,
        creadoPor: 'Sofia Wellness',
        fechaCreacion: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        favorito: true,
        personalizado: false,
        publico: true,
        tags: ['yoga', 'flexibilidad', 'equilibrio'],
        sesiones: [
          {
            id: 'sesion-4',
            nombre: 'Flow Matutino',
            dia: 1,
            orden: 1,
            duracion: 45,
            tipo: 'Yoga',
            ejercicios: [
              { id: 'ej-10', nombre: 'Saludo al Sol', series: 3, repeticiones: '5 min', peso: 0, descanso: 0, orden: 1 },
              { id: 'ej-11', nombre: 'Warrior I', series: 2, repeticiones: '30s', peso: 0, descanso: 15, orden: 2 },
              { id: 'ej-12', nombre: 'Tree Pose', series: 2, repeticiones: '30s', peso: 0, descanso: 15, orden: 3 }
            ]
          }
        ],
        estadisticas: {
          totalEjercicios: 3,
          totalSesiones: 1,
          duracionTotal: 45,
          caloriasEstimadas: 150,
          usos: 234,
          rating: 4.9
        },
        requisitos: {
          equipamiento: ['Mat de yoga'],
          espacio: 'Espacio tranquilo',
          experiencia: 'Principiante',
          restricciones: []
        },
        progresion: {
          tipo: 'lineal',
          incremento: 5,
          frecuencia: 'semanal'
        }
      }
    ];
    setPlantillas(plantillasMock);
  }, []);

  // Filtrar plantillas
  const plantillasFiltradas = plantillas.filter(plantilla => {
    const coincideBusqueda = plantilla.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                            plantilla.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                            plantilla.tags.some(t => t.toLowerCase().includes(filtros.busqueda.toLowerCase()));
    
    const coincideCategoria = !filtros.categoria || plantilla.categoria === filtros.categoria;
    const coincideObjetivo = !filtros.objetivo || plantilla.objetivo === filtros.objetivo;
    const coincideNivel = !filtros.nivel || plantilla.nivel === filtros.nivel;
    const coincideDuracion = !filtros.duracion || plantilla.duracion.toString() === filtros.duracion;
    const coincideFavoritos = !filtros.favoritos || plantilla.favorito;
    const coincidePersonalizados = !filtros.personalizados || plantilla.personalizado;
    const coincidePublicos = !filtros.publicos || plantilla.publico;

    return coincideBusqueda && coincideCategoria && coincideObjetivo && 
           coincideNivel && coincideDuracion && coincideFavoritos && 
           coincidePersonalizados && coincidePublicos;
  });

  // Ordenar plantillas
  const plantillasOrdenadas = [...plantillasFiltradas].sort((a, b) => {
    switch (ordenarPor) {
      case 'nombre':
        return a.nombre.localeCompare(b.nombre);
      case 'fecha':
        return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime();
      case 'rating':
        return b.estadisticas.rating - a.estadisticas.rating;
      case 'usos':
        return b.estadisticas.usos - a.estadisticas.usos;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Plantillas de Entrenamiento</h2>
            <p className="text-gray-600">{plantillasOrdenadas.length} plantillas disponibles</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVista('grid')}
                className={`p-2 rounded-lg transition-all ${
                  vista === 'grid' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setVista('lista')}
                className={`p-2 rounded-lg transition-all ${
                  vista === 'lista' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar plantillas, objetivos, categorías..."
            value={filtros.busqueda}
            onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Filtros rápidos */}
        <div className="flex gap-2 flex-wrap">
          {['Fuerza', 'Cardio', 'Flexibilidad', 'Equilibrio', 'Rehabilitación'].map(categoria => (
            <button
              key={categoria}
              onClick={() => setFiltros({ ...filtros, categoria: filtros.categoria === categoria ? '' : categoria })}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                filtros.categoria === categoria
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      {/* Filtros avanzados */}
      <AnimatePresence>
        {mostrarFiltros && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Objetivo</label>
                <select
                  value={filtros.objetivo}
                  onChange={(e) => setFiltros({ ...filtros, objetivo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos</option>
                  <option value="Ganar Masa">Ganar Masa</option>
                  <option value="Perder Grasa">Perder Grasa</option>
                  <option value="Salud General">Salud General</option>
                  <option value="Rendimiento">Rendimiento</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nivel</label>
                <select
                  value={filtros.nivel}
                  onChange={(e) => setFiltros({ ...filtros, nivel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos</option>
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Duración</label>
                <select
                  value={filtros.duracion}
                  onChange={(e) => setFiltros({ ...filtros, duracion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todas</option>
                  <option value="4">4 semanas</option>
                  <option value="6">6 semanas</option>
                  <option value="8">8 semanas</option>
                  <option value="12">12 semanas</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ordenar por</label>
                <select
                  value={ordenarPor}
                  onChange={(e) => setOrdenarPor(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="nombre">Nombre</option>
                  <option value="fecha">Fecha</option>
                  <option value="rating">Rating</option>
                  <option value="usos">Más usadas</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de plantillas */}
      <div className={vista === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {plantillasOrdenadas.map((plantilla) => (
          <motion.div
            key={plantilla.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer ${
              vista === 'grid' ? 'p-6' : 'p-4'
            }`}
            onClick={() => onPlantillaSelect(plantilla)}
          >
            {vista === 'grid' ? (
              // Vista de tarjetas
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{plantilla.nombre}</h3>
                    <p className="text-sm text-gray-600">{plantilla.categoria} • {plantilla.objetivo}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {plantilla.favorito && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      plantilla.nivel === 'Principiante' ? 'bg-green-100 text-green-800' :
                      plantilla.nivel === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {plantilla.nivel}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-2">{plantilla.descripcion}</p>
                
                <div className="flex gap-2 mb-4">
                  {plantilla.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duración:</span>
                    <span className="font-semibold">{plantilla.duracion} semanas</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sesiones/semana:</span>
                    <span className="font-semibold">{plantilla.diasPorSemana}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duración sesión:</span>
                    <span className="font-semibold">{plantilla.duracionSesion} min</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {plantilla.estadisticas.usos}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {plantilla.estadisticas.rating}
                    </span>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            ) : (
              // Vista de lista
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{plantilla.nombre}</h3>
                  <p className="text-sm text-gray-600">{plantilla.descripcion}</p>
                  <div className="flex gap-2 mt-2">
                    {plantilla.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    plantilla.nivel === 'Principiante' ? 'bg-green-100 text-green-800' :
                    plantilla.nivel === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {plantilla.nivel}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{plantilla.duracion} sem</span>
                    <span>{plantilla.diasPorSemana}/sem</span>
                    <span>{plantilla.duracionSesion} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{plantilla.estadisticas.usos} usos</span>
                    <span className="text-sm text-gray-600">{plantilla.estadisticas.rating}★</span>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PlantillasEntrenamiento;







