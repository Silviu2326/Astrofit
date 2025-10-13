import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  RefreshCw,
  Search,
  Filter,
  Target,
  Zap,
  Heart,
  Dumbbell,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Save,
  Eye,
  Star,
  TrendingUp,
  Activity,
  Shield,
  Award,
  Flame,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Info,
  Lightbulb,
  AlertTriangle,
  Check,
  X as XIcon,
  Plus,
  Minus,
  Edit,
  Trash2,
  Copy,
  Download,
  Share,
  Bookmark,
  Tag,
  Pin,
  Archive,
  Lock,
  Unlock,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Play,
  Pause,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Square as SquareIcon
} from 'lucide-react';

interface EjercicioActual {
  id: string;
  nombre: string;
  categoria: string;
  musculos: string[];
  equipamiento: string[];
  dificultad: string;
  series: number;
  repeticiones: string;
  peso: string;
  descanso: number;
  notas: string;
  dia: string;
  sesion: string;
  tieneSustitucion: boolean;
  sustitucionRecomendada?: EjercicioSustitucion;
}

interface EjercicioSustitucion {
  id: string;
  nombre: string;
  categoria: string;
  musculos: string[];
  equipamiento: string[];
  dificultad: string;
  razon: string;
  beneficios: string[];
  adaptacion: number; // 1-10 qué tan similar es
  nivelDificultad: 'más_fácil' | 'igual' | 'más_difícil';
  tiempo: number; // duración estimada
  calorias: number; // calorías quemadas estimadas
  imagen?: string;
  video?: string;
  notas: string;
}

interface SustitucionesModalProps {
  isOpen: boolean;
  onClose: () => void;
  sesionesSemana: { [key: string]: any[] };
  onAplicarSustitucion: (ejercicioOriginal: EjercicioActual, sustitucion: EjercicioSustitucion) => void;
}

export const SustitucionesModal: React.FC<SustitucionesModalProps> = ({
  isOpen,
  onClose,
  sesionesSemana,
  onAplicarSustitucion
}) => {
  const [ejerciciosActuales, setEjerciciosActuales] = useState<EjercicioActual[]>([]);
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState<EjercicioActual | null>(null);
  const [sustituciones, setSustituciones] = useState<EjercicioSustitucion[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroMusculo, setFiltroMusculo] = useState<string>('todos');
  const [filtroDificultad, setFiltroDificultad] = useState<string>('todas');
  const [filtroEquipamiento, setFiltroEquipamiento] = useState<string>('todos');
  const [ordenarPor, setOrdenarPor] = useState<'adaptacion' | 'dificultad' | 'tiempo' | 'calorias'>('adaptacion');
  const [mostrarSoloRecomendadas, setMostrarSoloRecomendadas] = useState(false);

  // Obtener ejercicios actuales del grid
  useEffect(() => {
    const ejercicios: EjercicioActual[] = [];
    
    Object.keys(sesionesSemana).forEach(dia => {
      const sesionesDelDia = sesionesSemana[dia];
      sesionesDelDia.forEach(sesion => {
        if (sesion.ejercicios && sesion.ejercicios.length > 0) {
          sesion.ejercicios.forEach((ejercicio: any) => {
            ejercicios.push({
              id: ejercicio.id,
              nombre: ejercicio.nombre,
              categoria: ejercicio.categoria,
              musculos: ejercicio.musculos || [],
              equipamiento: ejercicio.equipamiento || [],
              dificultad: ejercicio.dificultad || 'intermedio',
              series: ejercicio.series || 3,
              repeticiones: ejercicio.repeticiones || '10-12',
              peso: ejercicio.peso || '0kg',
              descanso: ejercicio.descanso || 60,
              notas: ejercicio.notas || '',
              dia: dia,
              sesion: sesion.nombre,
              tieneSustitucion: false
            });
          });
        }
      });
    });

    setEjerciciosActuales(ejercicios);
  }, [sesionesSemana]);

  // Generar sustituciones para el ejercicio seleccionado
  useEffect(() => {
    if (ejercicioSeleccionado) {
      const sustitucionesMock: EjercicioSustitucion[] = [
        {
          id: 'sub1',
          nombre: `${ejercicioSeleccionado.nombre} - Variación`,
          categoria: ejercicioSeleccionado.categoria,
          musculos: ejercicioSeleccionado.musculos,
          equipamiento: ejercicioSeleccionado.equipamiento,
          dificultad: ejercicioSeleccionado.dificultad,
          razon: 'Variación del mismo ejercicio para evitar monotonía',
          beneficios: ['Mismo grupo muscular', 'Variación de movimiento', 'Prevención de lesiones'],
          adaptacion: 9,
          nivelDificultad: 'igual',
          tiempo: 45,
          calorias: 120,
          notas: 'Variación que mantiene la misma intensidad'
        },
        {
          id: 'sub2',
          nombre: `Alternativa para ${ejercicioSeleccionado.musculos[0]}`,
          categoria: ejercicioSeleccionado.categoria,
          musculos: ejercicioSeleccionado.musculos,
          equipamiento: ejercicioSeleccionado.equipamiento,
          dificultad: ejercicioSeleccionado.dificultad,
          razon: 'Ejercicio alternativo que trabaja los mismos músculos',
          beneficios: ['Mismo objetivo', 'Diferente ángulo', 'Menor impacto articular'],
          adaptacion: 8,
          nivelDificultad: 'igual',
          tiempo: 50,
          calorias: 110,
          notas: 'Excelente alternativa con menor riesgo de lesión'
        },
        {
          id: 'sub3',
          nombre: `Versión Avanzada de ${ejercicioSeleccionado.nombre}`,
          categoria: ejercicioSeleccionado.categoria,
          musculos: ejercicioSeleccionado.musculos,
          equipamiento: ejercicioSeleccionado.equipamiento,
          dificultad: 'avanzado',
          razon: 'Progresión natural del ejercicio actual',
          beneficios: ['Mayor intensidad', 'Progresión', 'Nuevos desafíos'],
          adaptacion: 7,
          nivelDificultad: 'más_difícil',
          tiempo: 40,
          calorias: 150,
          notas: 'Para cuando el ejercicio actual sea demasiado fácil'
        },
        {
          id: 'sub4',
          nombre: `Versión Principiante de ${ejercicioSeleccionado.nombre}`,
          categoria: ejercicioSeleccionado.categoria,
          musculos: ejercicioSeleccionado.musculos,
          equipamiento: ejercicioSeleccionado.equipamiento,
          dificultad: 'principiante',
          razon: 'Versión más accesible del ejercicio',
          beneficios: ['Menor complejidad', 'Mejor para principiantes', 'Técnica más fácil'],
          adaptacion: 6,
          nivelDificultad: 'más_fácil',
          tiempo: 35,
          calorias: 80,
          notas: 'Ideal para principiantes o recuperación'
        }
      ];
      setSustituciones(sustitucionesMock);
    }
  }, [ejercicioSeleccionado]);

  const musculos = [
    'todos', 'pecho', 'espalda', 'hombros', 'biceps', 'triceps', 'cuadriceps', 
    'gluteos', 'isquiotibiales', 'pantorrillas', 'core', 'todo el cuerpo'
  ];

  const dificultades = [
    'todas', 'principiante', 'intermedio', 'avanzado', 'experto'
  ];

  const equipamientos = [
    'todos', 'ninguno', 'mancuernas', 'barra', 'banco', 'máquinas', 'cuerpo', 'bandas'
  ];

  const filtrarSustituciones = () => {
    return sustituciones.filter(sustitucion => {
      const coincideBusqueda = sustitucion.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                               sustitucion.razon.toLowerCase().includes(busqueda.toLowerCase()) ||
                               sustitucion.beneficios.some(beneficio => beneficio.toLowerCase().includes(busqueda.toLowerCase()));
      
      const coincideMusculo = filtroMusculo === 'todos' || sustitucion.musculos.includes(filtroMusculo);
      const coincideDificultad = filtroDificultad === 'todas' || sustitucion.dificultad === filtroDificultad;
      const coincideEquipamiento = filtroEquipamiento === 'todos' || sustitucion.equipamiento.includes(filtroEquipamiento);
      const coincideRecomendadas = !mostrarSoloRecomendadas || sustitucion.adaptacion >= 8;
      
      return coincideBusqueda && coincideMusculo && coincideDificultad && coincideEquipamiento && coincideRecomendadas;
    });
  };

  const ordenarSustituciones = (sustitucionesFiltradas: EjercicioSustitucion[]) => {
    return [...sustitucionesFiltradas].sort((a, b) => {
      let valorA: any, valorB: any;
      
      switch (ordenarPor) {
        case 'adaptacion':
          valorA = a.adaptacion;
          valorB = b.adaptacion;
          break;
        case 'dificultad':
          const ordenDificultad = { principiante: 1, intermedio: 2, avanzado: 3, experto: 4 };
          valorA = ordenDificultad[a.dificultad as keyof typeof ordenDificultad];
          valorB = ordenDificultad[b.dificultad as keyof typeof ordenDificultad];
          break;
        case 'tiempo':
          valorA = a.tiempo;
          valorB = b.tiempo;
          break;
        case 'calorias':
          valorA = a.calorias;
          valorB = b.calorias;
          break;
        default:
          return 0;
      }
      
      return valorB - valorA; // Descendente
    });
  };

  const sustitucionesFiltradas = ordenarSustituciones(filtrarSustituciones());

  const getColorAdaptacion = (adaptacion: number) => {
    if (adaptacion >= 9) return '#10B981'; // Verde
    if (adaptacion >= 7) return '#F59E0B'; // Amarillo
    if (adaptacion >= 5) return '#EF4444'; // Rojo
    return '#6B7280'; // Gris
  };

  const getColorDificultad = (dificultad: string) => {
    const colores = {
      principiante: '#10B981',
      intermedio: '#F59E0B',
      avanzado: '#EF4444',
      experto: '#8B5CF6'
    };
    return colores[dificultad as keyof typeof colores] || '#6B7280';
  };

  const getColorNivelDificultad = (nivel: string) => {
    const colores = {
      más_fácil: '#10B981',
      igual: '#3B82F6',
      más_difícil: '#EF4444'
    };
    return colores[nivel as keyof typeof colores] || '#6B7280';
  };

  const handleAplicarSustitucion = (sustitucion: EjercicioSustitucion) => {
    if (ejercicioSeleccionado) {
      onAplicarSustitucion(ejercicioSeleccionado, sustitucion);
      onClose();
    }
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
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-bold">Sustituciones de Ejercicios</h2>
                <p className="text-orange-100">Encuentra alternativas perfectas para tus ejercicios actuales</p>
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
          {/* Sidebar - Ejercicios Actuales */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Ejercicios Actuales ({ejerciciosActuales.length})</h3>
              
              {ejerciciosActuales.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center">
                    <Dumbbell className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="text-gray-500 text-sm">No hay ejercicios programados</p>
                  <p className="text-gray-400 text-xs mt-1">Añade ejercicios al grid para ver sustituciones</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {ejerciciosActuales.map(ejercicio => (
                    <motion.div
                      key={ejercicio.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        ejercicioSeleccionado?.id === ejercicio.id 
                          ? 'border-orange-500 bg-orange-50' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => setEjercicioSeleccionado(ejercicio)}
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className={`w-3 h-3 rounded-full mt-1 ${
                            ejercicio.tieneSustitucion 
                              ? 'bg-green-500' 
                              : 'bg-gray-400'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{ejercicio.nombre}</h4>
                          <p className="text-sm text-gray-600">{ejercicio.dia} - {ejercicio.sesion}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {ejercicio.categoria}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {ejercicio.series} x {ejercicio.repeticiones}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Área Principal */}
          <div className="flex-1 flex flex-col">
            {ejercicioSeleccionado ? (
              <>
                {/* Header del Ejercicio Seleccionado */}
                <div className="p-6 border-b border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{ejercicioSeleccionado.nombre}</h3>
                      <p className="text-sm text-gray-600">{ejercicioSeleccionado.dia} - {ejercicioSeleccionado.sesion}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{ejercicioSeleccionado.series} series</span>
                      <span>{ejercicioSeleccionado.repeticiones} reps</span>
                      <span>{ejercicioSeleccionado.peso}</span>
                    </div>
                  </div>
                </div>

                {/* Filtros */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Buscar sustituciones..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <select
                      value={filtroMusculo}
                      onChange={(e) => setFiltroMusculo(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      {musculos.map(musculo => (
                        <option key={musculo} value={musculo}>{musculo}</option>
                      ))}
                    </select>

                    <select
                      value={filtroDificultad}
                      onChange={(e) => setFiltroDificultad(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      {dificultades.map(dificultad => (
                        <option key={dificultad} value={dificultad}>{dificultad}</option>
                      ))}
                    </select>

                    <select
                      value={filtroEquipamiento}
                      onChange={(e) => setFiltroEquipamiento(e.target.value)}
                      className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      {equipamientos.map(equipamiento => (
                        <option key={equipamiento} value={equipamiento}>{equipamiento}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <select
                      value={ordenarPor}
                      onChange={(e) => setOrdenarPor(e.target.value as any)}
                      className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="adaptacion">Por Adaptación</option>
                      <option value="dificultad">Por Dificultad</option>
                      <option value="tiempo">Por Tiempo</option>
                      <option value="calorias">Por Calorías</option>
                    </select>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={mostrarSoloRecomendadas}
                        onChange={(e) => setMostrarSoloRecomendadas(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">Solo recomendadas</span>
                    </label>
                  </div>
                </div>

                {/* Lista de Sustituciones */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {sustitucionesFiltradas.map(sustitucion => (
                      <motion.div
                        key={sustitucion.id}
                        whileHover={{ scale: 1.01 }}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{sustitucion.nombre}</h4>
                            <p className="text-sm text-gray-600 mb-2">{sustitucion.razon}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: getColorAdaptacion(sustitucion.adaptacion) }}
                                />
                                <span>Adaptación: {sustitucion.adaptacion}/10</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{sustitucion.tiempo} min</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Flame className="w-4 h-4" />
                                <span>{sustitucion.calorias} cal</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                              <span 
                                className="text-xs px-2 py-1 rounded"
                                style={{ 
                                  backgroundColor: getColorDificultad(sustitucion.dificultad) + '20',
                                  color: getColorDificultad(sustitucion.dificultad)
                                }}
                              >
                                {sustitucion.dificultad}
                              </span>
                              <span 
                                className="text-xs px-2 py-1 rounded"
                                style={{ 
                                  backgroundColor: getColorNivelDificultad(sustitucion.nivelDificultad) + '20',
                                  color: getColorNivelDificultad(sustitucion.nivelDificultad)
                                }}
                              >
                                {sustitucion.nivelDificultad.replace('_', ' ')}
                              </span>
                            </div>

                            <div className="mb-3">
                              <h5 className="text-sm font-medium text-gray-700 mb-1">Beneficios:</h5>
                              <div className="flex flex-wrap gap-1">
                                {sustitucion.beneficios.map((beneficio, index) => (
                                  <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    {beneficio}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {sustitucion.notas && (
                              <p className="text-sm text-gray-600 italic mb-3">{sustitucion.notas}</p>
                            )}
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => handleAplicarSustitucion(sustitucion)}
                              className="px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 flex items-center gap-2"
                            >
                              <ArrowRight className="w-4 h-4" />
                              Aplicar
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-300 flex items-center justify-center">
                    <Dumbbell className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Selecciona un ejercicio</h3>
                  <p className="text-sm">Elige un ejercicio de la lista para ver sus sustituciones</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
