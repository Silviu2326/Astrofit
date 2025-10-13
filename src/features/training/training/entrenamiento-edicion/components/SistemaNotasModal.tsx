import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  StickyNote,
  Plus,
  Search,
  Filter,
  Tag,
  Calendar,
  User,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Bookmark,
  Pin,
  Archive,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Share,
  Copy,
  Heart,
  MessageCircle,
  BarChart3,
  TrendingUp,
  Zap,
  Award,
  Shield,
  Lightbulb,
  FileText,
  Image,
  Video,
  Mic,
  Paperclip
} from 'lucide-react';

interface Nota {
  id: string;
  titulo: string;
  contenido: string;
  categoria: 'planificacion' | 'cliente' | 'sesion' | 'ejercicio' | 'objetivo' | 'progreso' | 'lesion' | 'nutricion' | 'general';
  prioridad: 'baja' | 'media' | 'alta' | 'urgente';
  fechaCreacion: string;
  fechaModificacion: string;
  autor: string;
  etiquetas: string[];
  esPrivada: boolean;
  esFavorita: boolean;
  esArchivada: boolean;
  color: string;
  adjuntos?: Adjunto[];
  recordatorio?: string;
  relacionadoCon?: {
    tipo: 'sesion' | 'ejercicio' | 'cliente' | 'planificacion';
    id: string;
    nombre: string;
  };
}

interface Adjunto {
  id: string;
  nombre: string;
  tipo: 'imagen' | 'video' | 'audio' | 'documento';
  url: string;
  tamaño: number;
}

interface SistemaNotasModalProps {
  isOpen: boolean;
  onClose: () => void;
  cliente: any;
  sesionesSemana: { [key: string]: any[] };
}

export const SistemaNotasModal: React.FC<SistemaNotasModalProps> = ({
  isOpen,
  onClose,
  cliente,
  sesionesSemana
}) => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [notaSeleccionada, setNotaSeleccionada] = useState<Nota | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>('todas');
  const [mostrarArchivadas, setMostrarArchivadas] = useState(false);
  const [vista, setVista] = useState<'lista' | 'grid' | 'timeline'>('lista');
  const [ordenarPor, setOrdenarPor] = useState<'fecha' | 'prioridad' | 'titulo' | 'categoria'>('fecha');
  const [orden, setOrden] = useState<'asc' | 'desc'>('desc');

  // Datos mock para demostración
  useEffect(() => {
    const notasMock: Nota[] = [
      {
        id: '1',
        titulo: 'Progresión de Fuerza - Semana 1',
        contenido: 'Cliente muestra excelente adaptación a los ejercicios básicos. Aumentar peso en sentadillas y press de banca en un 5% la próxima semana.',
        categoria: 'planificacion',
        prioridad: 'alta',
        fechaCreacion: '2024-01-15T10:30:00Z',
        fechaModificacion: '2024-01-15T10:30:00Z',
        autor: 'Entrenador',
        etiquetas: ['fuerza', 'progresión', 'semana1'],
        esPrivada: false,
        esFavorita: true,
        esArchivada: false,
        color: '#3B82F6',
        relacionadoCon: {
          tipo: 'planificacion',
          id: 'plan-1',
          nombre: 'Plan de Fuerza'
        }
      },
      {
        id: '2',
        titulo: 'Molestia en Hombro Derecho',
        contenido: 'Cliente reporta molestia leve en el hombro derecho durante el press militar. Reducir intensidad y añadir ejercicios de movilidad.',
        categoria: 'lesion',
        prioridad: 'urgente',
        fechaCreacion: '2024-01-14T14:20:00Z',
        fechaModificacion: '2024-01-14T14:20:00Z',
        autor: 'Cliente',
        etiquetas: ['lesión', 'hombro', 'prevención'],
        esPrivada: false,
        esFavorita: false,
        esArchivada: false,
        color: '#EF4444',
        relacionadoCon: {
          tipo: 'ejercicio',
          id: 'ej-1',
          nombre: 'Press Militar'
        }
      },
      {
        id: '3',
        titulo: 'Objetivo de Pérdida de Peso',
        contenido: 'Cliente quiere perder 5kg en 3 meses. Ajustar plan de entrenamiento para incluir más cardio y HIIT.',
        categoria: 'objetivo',
        prioridad: 'alta',
        fechaCreacion: '2024-01-13T09:15:00Z',
        fechaModificacion: '2024-01-13T09:15:00Z',
        autor: 'Cliente',
        etiquetas: ['objetivo', 'peso', 'cardio'],
        esPrivada: false,
        esFavorita: true,
        esArchivada: false,
        color: '#10B981',
        relacionadoCon: {
          tipo: 'cliente',
          id: 'cliente-1',
          nombre: cliente?.nombre || 'Cliente'
        }
      },
      {
        id: '4',
        titulo: 'Rutina de Calentamiento Personalizada',
        contenido: 'Crear rutina de calentamiento específica para el cliente basada en sus limitaciones de movilidad.',
        categoria: 'sesion',
        prioridad: 'media',
        fechaCreacion: '2024-01-12T16:45:00Z',
        fechaModificacion: '2024-01-12T16:45:00Z',
        autor: 'Entrenador',
        etiquetas: ['calentamiento', 'movilidad', 'personalizado'],
        esPrivada: false,
        esFavorita: false,
        esArchivada: false,
        color: '#F59E0B',
        relacionadoCon: {
          tipo: 'sesion',
          id: 'sesion-1',
          nombre: 'Sesión de Fuerza'
        }
      }
    ];
    setNotas(notasMock);
  }, [cliente]);

  const categorias = [
    { id: 'todas', nombre: 'Todas', icono: StickyNote, color: '#6B7280' },
    { id: 'planificacion', nombre: 'Planificación', icono: Target, color: '#3B82F6' },
    { id: 'cliente', nombre: 'Cliente', icono: User, color: '#10B981' },
    { id: 'sesion', nombre: 'Sesión', icono: Clock, color: '#F59E0B' },
    { id: 'ejercicio', nombre: 'Ejercicio', icono: Zap, color: '#8B5CF6' },
    { id: 'objetivo', nombre: 'Objetivo', icono: Award, color: '#EF4444' },
    { id: 'progreso', nombre: 'Progreso', icono: TrendingUp, color: '#06B6D4' },
    { id: 'lesion', nombre: 'Lesión', icono: AlertTriangle, color: '#F97316' },
    { id: 'nutricion', nombre: 'Nutrición', icono: Heart, color: '#84CC16' },
    { id: 'general', nombre: 'General', icono: FileText, color: '#6B7280' }
  ];

  const prioridades = [
    { id: 'todas', nombre: 'Todas', color: '#6B7280' },
    { id: 'baja', nombre: 'Baja', color: '#10B981' },
    { id: 'media', nombre: 'Media', color: '#F59E0B' },
    { id: 'alta', nombre: 'Alta', color: '#EF4444' },
    { id: 'urgente', nombre: 'Urgente', color: '#DC2626' }
  ];

  const filtrarNotas = () => {
    return notas.filter(nota => {
      const coincideBusqueda = nota.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                               nota.contenido.toLowerCase().includes(busqueda.toLowerCase()) ||
                               nota.etiquetas.some(etiqueta => etiqueta.toLowerCase().includes(busqueda.toLowerCase()));
      
      const coincideCategoria = filtroCategoria === 'todas' || nota.categoria === filtroCategoria;
      const coincidePrioridad = filtroPrioridad === 'todas' || nota.prioridad === filtroPrioridad;
      const coincideArchivadas = mostrarArchivadas || !nota.esArchivada;
      
      return coincideBusqueda && coincideCategoria && coincidePrioridad && coincideArchivadas;
    });
  };

  const ordenarNotas = (notasFiltradas: Nota[]) => {
    return [...notasFiltradas].sort((a, b) => {
      let valorA: any, valorB: any;
      
      switch (ordenarPor) {
        case 'fecha':
          valorA = new Date(a.fechaModificacion);
          valorB = new Date(b.fechaModificacion);
          break;
        case 'prioridad':
          const ordenPrioridad = { urgente: 4, alta: 3, media: 2, baja: 1 };
          valorA = ordenPrioridad[a.prioridad as keyof typeof ordenPrioridad];
          valorB = ordenPrioridad[b.prioridad as keyof typeof ordenPrioridad];
          break;
        case 'titulo':
          valorA = a.titulo.toLowerCase();
          valorB = b.titulo.toLowerCase();
          break;
        case 'categoria':
          valorA = a.categoria;
          valorB = b.categoria;
          break;
        default:
          return 0;
      }
      
      if (valorA < valorB) return orden === 'asc' ? -1 : 1;
      if (valorA > valorB) return orden === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const notasFiltradas = ordenarNotas(filtrarNotas());

  const handleNuevaNota = () => {
    const nuevaNota: Nota = {
      id: `nota-${Date.now()}`,
      titulo: 'Nueva Nota',
      contenido: '',
      categoria: 'general',
      prioridad: 'media',
      fechaCreacion: new Date().toISOString(),
      fechaModificacion: new Date().toISOString(),
      autor: 'Entrenador',
      etiquetas: [],
      esPrivada: false,
      esFavorita: false,
      esArchivada: false,
      color: '#6B7280'
    };
    
    setNotas(prev => [nuevaNota, ...prev]);
    setNotaSeleccionada(nuevaNota);
    setModoEdicion(true);
  };

  const handleGuardarNota = (notaActualizada: Nota) => {
    setNotas(prev => prev.map(nota => 
      nota.id === notaActualizada.id 
        ? { ...notaActualizada, fechaModificacion: new Date().toISOString() }
        : nota
    ));
    setNotaSeleccionada(notaActualizada);
    setModoEdicion(false);
  };

  const handleEliminarNota = (id: string) => {
    setNotas(prev => prev.filter(nota => nota.id !== id));
    if (notaSeleccionada?.id === id) {
      setNotaSeleccionada(null);
    }
  };

  const handleToggleFavorita = (id: string) => {
    setNotas(prev => prev.map(nota => 
      nota.id === id 
        ? { ...nota, esFavorita: !nota.esFavorita }
        : nota
    ));
  };

  const handleToggleArchivada = (id: string) => {
    setNotas(prev => prev.map(nota => 
      nota.id === id 
        ? { ...nota, esArchivada: !nota.esArchivada }
        : nota
    ));
  };

  const getColorPrioridad = (prioridad: string) => {
    const colores = {
      baja: '#10B981',
      media: '#F59E0B', 
      alta: '#EF4444',
      urgente: '#DC2626'
    };
    return colores[prioridad as keyof typeof colores] || '#6B7280';
  };

  const getIconoCategoria = (categoria: string) => {
    const categoriaData = categorias.find(cat => cat.id === categoria);
    return categoriaData?.icono || StickyNote;
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StickyNote className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Sistema de Notas</h2>
                <p className="text-blue-100">Gestión completa de notas de planificación y cliente</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
            {/* Filtros y Búsqueda */}
            <div className="p-4 border-b border-gray-200">
              <div className="space-y-4">
                {/* Búsqueda */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar notas..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Filtro Categoría */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                  <select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                    ))}
                  </select>
                </div>

                {/* Filtro Prioridad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                  <select
                    value={filtroPrioridad}
                    onChange={(e) => setFiltroPrioridad(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {prioridades.map(pri => (
                      <option key={pri.id} value={pri.id}>{pri.nombre}</option>
                    ))}
                  </select>
                </div>

                {/* Opciones adicionales */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={mostrarArchivadas}
                      onChange={(e) => setMostrarArchivadas(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Mostrar archivadas</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Lista de Notas */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Notas ({notasFiltradas.length})</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setVista('lista')}
                      className={`p-2 rounded ${vista === 'lista' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                    >
                      <StickyNote className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setVista('grid')}
                      className={`p-2 rounded ${vista === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {notasFiltradas.map(nota => {
                    const IconoCategoria = getIconoCategoria(nota.categoria);
                    return (
                      <motion.div
                        key={nota.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          notaSeleccionada?.id === nota.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        onClick={() => setNotaSeleccionada(nota)}
                      >
                        <div className="flex items-start gap-3">
                          <div 
                            className="w-3 h-3 rounded-full mt-1"
                            style={{ backgroundColor: getColorPrioridad(nota.prioridad) }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <IconoCategoria className="w-4 h-4 text-gray-500" />
                              <h4 className="font-medium text-gray-900 truncate">{nota.titulo}</h4>
                              {nota.esFavorita && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2">{nota.contenido}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">
                                {new Date(nota.fechaModificacion).toLocaleDateString()}
                              </span>
                              {nota.etiquetas.slice(0, 2).map(etiqueta => (
                                <span key={etiqueta} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  {etiqueta}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Botón Nueva Nota */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleNuevaNota}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Nueva Nota
              </button>
            </div>
          </div>

          {/* Área Principal */}
          <div className="flex-1 flex flex-col">
            {notaSeleccionada ? (
              <div className="flex-1 flex flex-col">
                {/* Header de la nota */}
                <div className="p-6 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {React.createElement(getIconoCategoria(notaSeleccionada.categoria), { className: "w-6 h-6 text-gray-600" })}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{notaSeleccionada.titulo}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Creada: {new Date(notaSeleccionada.fechaCreacion).toLocaleString()}</span>
                          <span>Modificada: {new Date(notaSeleccionada.fechaModificacion).toLocaleString()}</span>
                          <span>Por: {notaSeleccionada.autor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleFavorita(notaSeleccionada.id)}
                        className={`p-2 rounded-lg ${notaSeleccionada.esFavorita ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:bg-gray-100'}`}
                      >
                        <Star className={`w-5 h-5 ${notaSeleccionada.esFavorita ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => setModoEdicion(!modoEdicion)}
                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleToggleArchivada(notaSeleccionada.id)}
                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"
                      >
                        {notaSeleccionada.esArchivada ? <Archive className="w-5 h-5" /> : <Archive className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => handleEliminarNota(notaSeleccionada.id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contenido de la nota */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {modoEdicion ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                        <input
                          type="text"
                          value={notaSeleccionada.titulo}
                          onChange={(e) => setNotaSeleccionada({...notaSeleccionada, titulo: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contenido</label>
                        <textarea
                          value={notaSeleccionada.contenido}
                          onChange={(e) => setNotaSeleccionada({...notaSeleccionada, contenido: e.target.value})}
                          rows={10}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                          <select
                            value={notaSeleccionada.categoria}
                            onChange={(e) => setNotaSeleccionada({...notaSeleccionada, categoria: e.target.value as any})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            {categorias.slice(1).map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
                          <select
                            value={notaSeleccionada.prioridad}
                            onChange={(e) => setNotaSeleccionada({...notaSeleccionada, prioridad: e.target.value as any})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            {prioridades.slice(1).map(pri => (
                              <option key={pri.id} value={pri.id}>{pri.nombre}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => handleGuardarNota(notaSeleccionada)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Guardar
                        </button>
                        <button
                          onClick={() => setModoEdicion(false)}
                          className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                        {notaSeleccionada.contenido}
                      </div>
                      
                      {notaSeleccionada.etiquetas.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Etiquetas</h4>
                          <div className="flex flex-wrap gap-2">
                            {notaSeleccionada.etiquetas.map(etiqueta => (
                              <span key={etiqueta} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                {etiqueta}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {notaSeleccionada.relacionadoCon && (
                        <div className="mt-6">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Relacionado con</h4>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <span className="text-sm text-gray-600">
                              {notaSeleccionada.relacionadoCon.tipo}: {notaSeleccionada.relacionadoCon.nombre}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <StickyNote className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Selecciona una nota</h3>
                  <p className="text-sm">Elige una nota de la lista para ver su contenido</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
