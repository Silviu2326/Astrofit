import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Star, Bookmark, Tag, Users, Clock, Weight, Repeat, Target,
  Dumbbell, Activity, Heart, Flame, Zap, Award, Play, Eye, Plus, Download,
  Share, Edit, Trash2, Copy, ExternalLink, ChevronDown, ChevronUp
} from 'lucide-react';

interface Ejercicio {
  id: string;
  nombre: string;
  categoria: string;
  subcategoria: string;
  musculos: string[];
  equipamiento: string[];
  dificultad: 'Principiante' | 'Intermedio' | 'Avanzado';
  descripcion: string;
  instrucciones: string[];
  variaciones: string[];
  imagen?: string;
  video?: string;
  gif?: string;
  favorito: boolean;
  personalizado: boolean;
  creadoPor: string;
  fechaCreacion: Date;
  tags: string[];
  metodos: string[];
  beneficios: string[];
  contraindicaciones: string[];
  nivelFuerza: number;
  nivelCardio: number;
  nivelFlexibilidad: number;
  tiempoEjecucion: number;
  caloriasQuemadas: number;
}

interface BibliotecaEjerciciosProps {
  onEjercicioSelect: (ejercicio: Ejercicio) => void;
  onEjercicioCreate: (ejercicio: Omit<Ejercicio, 'id' | 'fechaCreacion'>) => void;
  modo: 'seleccion' | 'gestion' | 'vista';
}

const BibliotecaEjercicios: React.FC<BibliotecaEjerciciosProps> = ({
  onEjercicioSelect,
  onEjercicioCreate,
  modo
}) => {
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    categoria: '',
    subcategoria: '',
    musculo: '',
    equipamiento: '',
    dificultad: '',
    favoritos: false,
    personalizados: false,
    metodos: [] as string[]
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<Ejercicio | null>(null);
  const [vista, setVista] = useState<'grid' | 'lista'>('grid');
  const [ordenarPor, setOrdenarPor] = useState<'nombre' | 'dificultad' | 'fecha' | 'popularidad'>('nombre');

  // Categorías y subcategorías
  const categorias = {
    'Fuerza': ['Tren Superior', 'Tren Inferior', 'Core', 'Fuerza Funcional', 'Powerlifting'],
    'Cardio': ['HIIT', 'LISS', 'CrossFit', 'Funcional', 'Deportes'],
    'Flexibilidad': ['Yoga', 'Pilates', 'Estiramientos', 'Movilidad', 'Recuperación'],
    'Equilibrio': ['Estabilidad', 'Propriocepción', 'Coordinación', 'Agilidad'],
    'Rehabilitación': ['Fisioterapia', 'Prevención', 'Recuperación', 'Adaptado']
  };

  // Mock data expandida
  useEffect(() => {
    const ejerciciosMock: Ejercicio[] = [
      // FUERZA - TREN SUPERIOR
      {
        id: '1',
        nombre: 'Press de Banca',
        categoria: 'Fuerza',
        subcategoria: 'Tren Superior',
        musculos: ['Pectorales', 'Deltoides Anterior', 'Tríceps'],
        equipamiento: ['Banco', 'Barra', 'Discos'],
        dificultad: 'Intermedio',
        descripcion: 'Ejercicio fundamental para el desarrollo del pecho',
        instrucciones: ['Acuéstate en el banco', 'Agarra la barra', 'Baja controladamente', 'Empuja hacia arriba'],
        variaciones: ['Press Inclinado', 'Press Declinado', 'Press con Mancuernas'],
        favorito: true,
        personalizado: false,
        creadoPor: 'Sistema',
        fechaCreacion: new Date(),
        tags: ['compuesto', 'fuerza', 'pecho'],
        metodos: ['Fuerza', 'Hipertrofia', 'Powerlifting'],
        beneficios: ['Desarrollo del pecho', 'Fuerza del tren superior', 'Estabilidad del core'],
        contraindicaciones: ['Lesiones de hombro', 'Problemas de espalda'],
        nivelFuerza: 8,
        nivelCardio: 2,
        nivelFlexibilidad: 3,
        tiempoEjecucion: 45,
        caloriasQuemadas: 8
      },
      {
        id: '2',
        nombre: 'Sentadilla con Barra',
        categoria: 'Fuerza',
        subcategoria: 'Tren Inferior',
        musculos: ['Cuádriceps', 'Glúteos', 'Isquiotibiales'],
        equipamiento: ['Barra', 'Rack'],
        dificultad: 'Intermedio',
        descripcion: 'Ejercicio rey para el desarrollo de las piernas',
        instrucciones: ['Coloca la barra en los trapecios', 'Mantén el pecho erguido', 'Baja hasta paralelo', 'Empuja con los talones'],
        variaciones: ['Sentadilla Frontal', 'Sentadilla Goblet', 'Sentadilla Búlgara'],
        favorito: true,
        personalizado: false,
        creadoPor: 'Sistema',
        fechaCreacion: new Date(),
        tags: ['compuesto', 'fuerza', 'piernas'],
        metodos: ['Fuerza', 'Hipertrofia', 'Powerlifting'],
        beneficios: ['Desarrollo de piernas', 'Fuerza funcional', 'Activación del core'],
        contraindicaciones: ['Lesiones de rodilla', 'Problemas de espalda baja'],
        nivelFuerza: 9,
        nivelCardio: 3,
        nivelFlexibilidad: 4,
        tiempoEjecucion: 60,
        caloriasQuemadas: 12
      },
      // CARDIO - HIIT
      {
        id: '3',
        nombre: 'Burpees',
        categoria: 'Cardio',
        subcategoria: 'HIIT',
        musculos: ['Todo el cuerpo'],
        equipamiento: ['Suelo'],
        dificultad: 'Intermedio',
        descripcion: 'Ejercicio de alta intensidad para todo el cuerpo',
        instrucciones: ['Posición de cuclillas', 'Salto hacia atrás', 'Flexión', 'Salto hacia adelante', 'Salto vertical'],
        variaciones: ['Burpees con salto', 'Burpees sin salto', 'Burpees con peso'],
        favorito: false,
        personalizado: false,
        creadoPor: 'Sistema',
        fechaCreacion: new Date(),
        tags: ['cardio', 'hiit', 'funcional'],
        metodos: ['HIIT', 'Funcional', 'CrossFit'],
        beneficios: ['Quema de calorías', 'Condición cardiovascular', 'Fuerza funcional'],
        contraindicaciones: ['Problemas de rodilla', 'Lesiones de muñeca'],
        nivelFuerza: 5,
        nivelCardio: 9,
        nivelFlexibilidad: 6,
        tiempoEjecucion: 30,
        caloriasQuemadas: 15
      },
      // FLEXIBILIDAD - YOGA
      {
        id: '4',
        nombre: 'Perro Boca Abajo',
        categoria: 'Flexibilidad',
        subcategoria: 'Yoga',
        musculos: ['Isquiotibiales', 'Pantorrillas', 'Erectores', 'Deltoides'],
        equipamiento: ['Suelo'],
        dificultad: 'Principiante',
        descripcion: 'Postura fundamental de yoga para estiramiento',
        instrucciones: ['Posición de cuatro patas', 'Levanta las caderas', 'Estira las piernas', 'Mantén la posición'],
        variaciones: ['Perro con una pierna', 'Perro caminando', 'Perro con rodilla flexionada'],
        favorito: false,
        personalizado: false,
        creadoPor: 'Sistema',
        fechaCreacion: new Date(),
        tags: ['flexibilidad', 'yoga', 'estiramiento'],
        metodos: ['Yoga', 'Flexibilidad', 'Recuperación'],
        beneficios: ['Flexibilidad de isquiotibiales', 'Fortalecimiento de brazos', 'Relajación'],
        contraindicaciones: ['Lesiones de muñeca', 'Problemas de hombro'],
        nivelFuerza: 3,
        nivelCardio: 1,
        nivelFlexibilidad: 8,
        tiempoEjecucion: 60,
        caloriasQuemadas: 2
      }
    ];
    setEjercicios(ejerciciosMock);
  }, []);

  // Filtrar ejercicios
  const ejerciciosFiltrados = ejercicios.filter(ejercicio => {
    const coincideBusqueda = ejercicio.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                            ejercicio.musculos.some(m => m.toLowerCase().includes(filtros.busqueda.toLowerCase())) ||
                            ejercicio.tags.some(t => t.toLowerCase().includes(filtros.busqueda.toLowerCase()));
    
    const coincideCategoria = !filtros.categoria || ejercicio.categoria === filtros.categoria;
    const coincideSubcategoria = !filtros.subcategoria || ejercicio.subcategoria === filtros.subcategoria;
    const coincideMusculo = !filtros.musculo || ejercicio.musculos.includes(filtros.musculo);
    const coincideEquipamiento = !filtros.equipamiento || ejercicio.equipamiento.includes(filtros.equipamiento);
    const coincideDificultad = !filtros.dificultad || ejercicio.dificultad === filtros.dificultad;
    const coincideFavoritos = !filtros.favoritos || ejercicio.favorito;
    const coincidePersonalizados = !filtros.personalizados || ejercicio.personalizado;
    const coincideMetodos = filtros.metodos.length === 0 || filtros.metodos.some(m => ejercicio.metodos.includes(m));

    return coincideBusqueda && coincideCategoria && coincideSubcategoria && 
           coincideMusculo && coincideEquipamiento && coincideDificultad && 
           coincideFavoritos && coincidePersonalizados && coincideMetodos;
  });

  // Ordenar ejercicios
  const ejerciciosOrdenados = [...ejerciciosFiltrados].sort((a, b) => {
    switch (ordenarPor) {
      case 'nombre':
        return a.nombre.localeCompare(b.nombre);
      case 'dificultad':
        const ordenDificultad = { 'Principiante': 1, 'Intermedio': 2, 'Avanzado': 3 };
        return ordenDificultad[a.dificultad] - ordenDificultad[b.dificultad];
      case 'fecha':
        return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime();
      case 'popularidad':
        return b.favorito ? 1 : -1;
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
            <h2 className="text-2xl font-bold text-gray-900">Biblioteca de Ejercicios</h2>
            <p className="text-gray-600">{ejerciciosOrdenados.length} ejercicios disponibles</p>
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
            placeholder="Buscar ejercicios, músculos, equipamiento..."
            value={filtros.busqueda}
            onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Filtros rápidos */}
        <div className="flex gap-2 flex-wrap">
          {Object.keys(categorias).map(categoria => (
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subcategoría</label>
                <select
                  value={filtros.subcategoria}
                  onChange={(e) => setFiltros({ ...filtros, subcategoria: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todas</option>
                  {filtros.categoria && categorias[filtros.categoria as keyof typeof categorias]?.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Músculo</label>
                <select
                  value={filtros.musculo}
                  onChange={(e) => setFiltros({ ...filtros, musculo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos</option>
                  <option value="Pectorales">Pectorales</option>
                  <option value="Dorsales">Dorsales</option>
                  <option value="Cuádriceps">Cuádriceps</option>
                  <option value="Glúteos">Glúteos</option>
                  <option value="Bíceps">Bíceps</option>
                  <option value="Tríceps">Tríceps</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Equipamiento</label>
                <select
                  value={filtros.equipamiento}
                  onChange={(e) => setFiltros({ ...filtros, equipamiento: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ordenar por</label>
                <select
                  value={ordenarPor}
                  onChange={(e) => setOrdenarPor(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="nombre">Nombre</option>
                  <option value="dificultad">Dificultad</option>
                  <option value="fecha">Fecha</option>
                  <option value="popularidad">Popularidad</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de ejercicios */}
      <div className={vista === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {ejerciciosOrdenados.map((ejercicio) => (
          <motion.div
            key={ejercicio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all cursor-pointer ${
              vista === 'grid' ? 'p-6' : 'p-4'
            }`}
            onClick={() => onEjercicioSelect(ejercicio)}
          >
            {vista === 'grid' ? (
              // Vista de tarjetas
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{ejercicio.nombre}</h3>
                    <p className="text-sm text-gray-600">{ejercicio.categoria} • {ejercicio.subcategoria}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {ejercicio.favorito && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      ejercicio.dificultad === 'Principiante' ? 'bg-green-100 text-green-800' :
                      ejercicio.dificultad === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {ejercicio.dificultad}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-2">{ejercicio.descripcion}</p>
                
                <div className="flex gap-2 mb-4">
                  {ejercicio.musculos.slice(0, 3).map((musculo) => (
                    <span key={musculo} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {musculo}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {ejercicio.tiempoEjecucion}s
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4" />
                      {ejercicio.caloriasQuemadas} cal
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
                  <h3 className="text-lg font-bold text-gray-900">{ejercicio.nombre}</h3>
                  <p className="text-sm text-gray-600">{ejercicio.descripcion}</p>
                  <div className="flex gap-2 mt-2">
                    {ejercicio.musculos.slice(0, 3).map((musculo) => (
                      <span key={musculo} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {musculo}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    ejercicio.dificultad === 'Principiante' ? 'bg-green-100 text-green-800' :
                    ejercicio.dificultad === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {ejercicio.dificultad}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{ejercicio.tiempoEjecucion}s</span>
                    <span className="text-sm text-gray-600">{ejercicio.caloriasQuemadas} cal</span>
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

export default BibliotecaEjercicios;