import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Copy, Edit, Trash2, Dumbbell, Clock, Flame, 
  Target, Heart, Zap, Calendar, Play, Pause, CheckCircle,
  AlertTriangle, TrendingUp, Users, Settings, MoreVertical
} from 'lucide-react';
import { Ejercicio } from '../types';

interface GridSemanalMejoradoProps {
  onSlotClick: (dia: number, sesion: string) => void;
  onEjercicioAdd: (dia: number, sesion: string, ejercicio: Ejercicio) => void;
  onEjercicioEdit: (slotId: string) => void;
  onEjercicioDelete: (slotId: string) => void;
  ejercicioSeleccionado?: Ejercicio;
  semanaActual?: number;
  onNuevaSesion?: (dia: number) => void;
  onDuplicarDia?: (dia: number) => void;
  onCopiarSemana?: () => void;
}

interface SesionEntrenamiento {
  id: string;
  nombre: string;
  tipo: 'fuerza' | 'cardio' | 'flexibilidad' | 'mixto';
  duracion: number;
  intensidad: number;
  ejercicios: Ejercicio[];
  completada: boolean;
  notas?: string;
}

interface DiaSemana {
  numero: number;
  nombre: string;
  fecha: string;
  sesiones: SesionEntrenamiento[];
  esHoy: boolean;
  esPasado: boolean;
  esFuturo: boolean;
}

const GridSemanalMejorado: React.FC<GridSemanalMejoradoProps> = ({
  onSlotClick,
  onEjercicioAdd,
  onEjercicioEdit,
  onEjercicioDelete,
  ejercicioSeleccionado,
  semanaActual = 1,
  onNuevaSesion,
  onDuplicarDia,
  onCopiarSemana
}) => {
  const [diasSemana, setDiasSemana] = useState<DiaSemana[]>([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number | null>(null);
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);

  // Generar datos de la semana
  useEffect(() => {
    const dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const hoy = new Date();
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay() + 1 + (semanaActual - 1) * 7);

    const nuevaSemana = dias.map((nombre, index) => {
      const fecha = new Date(inicioSemana);
      fecha.setDate(inicioSemana.getDate() + index);
      
      const esHoy = fecha.toDateString() === hoy.toDateString();
      const esPasado = fecha < hoy && !esHoy;
      const esFuturo = fecha > hoy;

      return {
        numero: index + 1,
        nombre,
        fecha: fecha.toISOString().split('T')[0],
        esHoy,
        esPasado,
        esFuturo,
        sesiones: generarSesionesParaDia(index + 1)
      };
    });

    setDiasSemana(nuevaSemana);
  }, [semanaActual]);

  const generarSesionesParaDia = (dia: number): SesionEntrenamiento[] => {
    // Simular sesiones basadas en el día
    const sesiones: SesionEntrenamiento[] = [];
    
    if (dia === 1 || dia === 3 || dia === 5) { // Lunes, Miércoles, Viernes
      sesiones.push({
        id: `sesion-${dia}-fuerza`,
        nombre: 'Fuerza',
        tipo: 'fuerza',
        duracion: 60,
        intensidad: 8,
        ejercicios: [
          { id: '1', nombre: 'Sentadilla', categoria: 'Piernas', musculos: ['cuádriceps'], dificultad: 'intermedio', equipamiento: ['barra'], metrica: 'repeticiones' },
          { id: '2', nombre: 'Press Banca', categoria: 'Pecho', musculos: ['pectorales'], dificultad: 'intermedio', equipamiento: ['barra'], metrica: 'repeticiones' }
        ],
        completada: dia <= 3
      });
    }
    
    if (dia === 2 || dia === 4) { // Martes, Jueves
      sesiones.push({
        id: `sesion-${dia}-cardio`,
        nombre: 'Cardio',
        tipo: 'cardio',
        duracion: 30,
        intensidad: 6,
        ejercicios: [
          { id: '3', nombre: 'Correr', categoria: 'Cardio', musculos: ['piernas'], dificultad: 'fácil', equipamiento: [], metrica: 'tiempo' }
        ],
        completada: dia <= 2
      });
    }
    
    if (dia === 6) { // Sábado
      sesiones.push({
        id: `sesion-${dia}-mixto`,
        nombre: 'Entrenamiento Mixto',
        tipo: 'mixto',
        duracion: 45,
        intensidad: 7,
        ejercicios: [],
        completada: false
      });
    }

    return sesiones;
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'fuerza':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'cardio':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'flexibilidad':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'mixto':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'fuerza':
        return <Dumbbell className="w-4 h-4" />;
      case 'cardio':
        return <Heart className="w-4 h-4" />;
      case 'flexibilidad':
        return <Target className="w-4 h-4" />;
      case 'mixto':
        return <Zap className="w-4 h-4" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  const getEstadoColor = (completada: boolean, esPasado: boolean) => {
    if (completada) return 'bg-green-500';
    if (esPasado) return 'bg-red-500';
    return 'bg-gray-300';
  };

  const handleDiaClick = (dia: number) => {
    setDiaSeleccionado(diaSeleccionado === dia ? null : dia);
  };

  const handleSesionClick = (dia: number, sesion: SesionEntrenamiento) => {
    onSlotClick(dia, sesion.id);
  };

  const handleEjercicioAdd = (dia: number, sesion: SesionEntrenamiento) => {
    if (ejercicioSeleccionado) {
      onEjercicioAdd(dia, sesion.id, ejercicioSeleccionado);
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header del grid */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Plan Semanal</h2>
              <p className="text-white/80">Semana {semanaActual} - Organiza tus entrenamientos</p>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMostrarEstadisticas(!mostrarEstadisticas)}
                className="px-4 py-2 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Estadísticas
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onCopiarSemana}
                className="px-4 py-2 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Duplicar
              </motion.button>
            </div>
          </div>
        </div>

        {/* Estadísticas (expandible) */}
        <AnimatePresence>
          {mostrarEstadisticas && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 border-b border-gray-200 p-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">12</div>
                  <div className="text-sm text-gray-600">Sesiones</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">8.5h</div>
                  <div className="text-sm text-gray-600">Tiempo Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">85%</div>
                  <div className="text-sm text-gray-600">Completado</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">2,400</div>
                  <div className="text-sm text-gray-600">Calorías</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid de días */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {diasSemana.map((dia) => (
              <motion.div
                key={dia.numero}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDiaClick(dia.numero)}
                className={`bg-gray-50 rounded-2xl p-4 border-2 border-dashed transition-all cursor-pointer ${
                  diaSeleccionado === dia.numero
                    ? 'border-orange-300 bg-orange-50'
                    : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                } ${dia.esHoy ? 'ring-2 ring-orange-500' : ''}`}
              >
                {/* Header del día */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{dia.nombre}</h3>
                    {dia.esHoy && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(dia.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                  </p>
                </div>

                {/* Sesiones del día */}
                <div className="space-y-2">
                  {dia.sesiones.length === 0 ? (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onNuevaSesion?.(dia.numero);
                      }}
                      className="bg-white/50 rounded-lg p-3 text-center border border-dashed border-gray-300 hover:border-orange-300 transition-all"
                    >
                      <Plus className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-500">Nueva Sesión</p>
                    </motion.div>
                  ) : (
                    dia.sesiones.map((sesion) => (
                      <motion.div
                        key={sesion.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSesionClick(dia.numero, sesion);
                        }}
                        className={`rounded-xl p-3 border transition-all ${getTipoColor(sesion.tipo)}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getTipoIcon(sesion.tipo)}
                            <span className="font-semibold text-sm">{sesion.nombre}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className={`w-2 h-2 rounded-full ${getEstadoColor(sesion.completada, dia.esPasado)}`}></div>
                            {sesion.completada && <CheckCircle className="w-3 h-3 text-green-600" />}
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            <Clock className="w-3 h-3" />
                            <span>{sesion.duracion}min</span>
                            <div className="flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              <span>{sesion.intensidad}/10</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">
                              {sesion.ejercicios.length} ejercicio{sesion.ejercicios.length !== 1 ? 's' : ''}
                            </span>
                            
                            <div className="flex gap-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEjercicioEdit(sesion.id);
                                }}
                                className="p-1 hover:bg-white/50 rounded transition-colors"
                              >
                                <Edit className="w-3 h-3" />
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEjercicioDelete(sesion.id);
                                }}
                                className="p-1 hover:bg-white/50 rounded transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Botón para añadir ejercicio */}
                        {ejercicioSeleccionado && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEjercicioAdd(dia.numero, sesion);
                            }}
                            className="w-full mt-2 px-3 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Añadir {ejercicioSeleccionado.nombre}
                          </motion.button>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Indicadores del día */}
                <div className="mt-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-500">
                      {dia.sesiones.length} sesión{dia.sesiones.length !== 1 ? 'es' : ''}
                    </span>
                  </div>
                  
                  {dia.sesiones.length > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 font-semibold">
                        {Math.round((dia.sesiones.filter(s => s.completada).length / dia.sesiones.length) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer con acciones rápidas */}
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>Plan optimizado para tu nivel y objetivos</span>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Configurar
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Iniciar Entrenamiento
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridSemanalMejorado;

