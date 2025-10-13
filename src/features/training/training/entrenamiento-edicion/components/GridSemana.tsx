import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDroppable } from '@dnd-kit/core';
import {
  Plus, Edit, Trash2, Clock, Target, Activity, Flame,
  MapPin, Calendar, Grid3X3, CheckCircle, TrendingUp, 
  BarChart3, Timer, PlusCircle, ChevronLeft, ChevronRight, Settings, X
} from 'lucide-react';

interface Ejercicio {
  id: string;
  nombre: string;
  categoria: string;
  musculos: string[];
  equipamiento: string[];
  dificultad: string;
  descripcion: string;
  tiempo: number;
  intensidad: number;
  calorias: number;
  series?: number;
  repeticiones?: string;
  peso?: number;
  descanso?: number;
  completado?: boolean;
  orden?: number;
  notas?: string;
}

interface Sesion {
  id: string;
  nombre: string;
  hora: string;
  duracion: number;
  estado: 'pendiente' | 'en-progreso' | 'completado' | 'cancelado';
  ejercicios: Ejercicio[];
  ubicacion: string;
  entrenador: string;
  notas: string;
}

interface GridSemanaProps {
  onSesionClick: (dia: number, sesion: string) => void;
  onEjercicioAdd: (dia: number, sesion: string, ejercicio: Ejercicio) => void;
  onEjercicioEdit: (slotId: string) => void;
  onEjercicioDelete: (slotId: string) => void;
  ejercicioSeleccionado?: Ejercicio;
  onNuevaSesion?: (dia?: number) => void;
  onCambiarVista?: (vista: 'semanal' | 'diaria') => void;
  fechaInicio?: string;
  fechaFin?: string;
  semanaActual?: number;
  onSemanaChange?: (semana: number) => void;
  onPlantillaAdd?: (dia: number, sesion: string, plantilla: any) => void;
  sesionesSemana?: { [key: string]: Sesion[] };
}

// Componente para áreas de drop
const DropZone: React.FC<{ 
  dia: number; 
  sesion: string; 
  sesionData?: Sesion; 
  onSesionClick: (dia: number, sesion: string) => void;
  onNuevaSesion: (dia: number) => void;
  ejercicioSeleccionado?: Ejercicio;
}> = ({ dia, sesion, sesionData, onSesionClick, onNuevaSesion, ejercicioSeleccionado }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `drop-${dia}-${sesion}`,
    data: {
      dia,
      sesion
    }
  });

  return (
    <motion.div
      ref={setNodeRef}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all min-h-32 max-w-full overflow-hidden ${
        isOver
          ? 'border-orange-400 bg-orange-100 shadow-lg'
          : ejercicioSeleccionado 
            ? 'border-orange-400 bg-orange-50 shadow-lg' 
            : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
      }`}
      onClick={() => onSesionClick(dia, sesion)}
    >
      <div className="flex items-center justify-between mb-3 min-w-0">
        <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded-lg truncate flex-1 min-w-0">
          {sesion}
        </span>
        {sesionData && (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold truncate max-w-20 ml-2 flex-shrink-0 ${
            sesionData.estado === 'completado' ? 'bg-green-100 border-green-300 text-green-800' :
            sesionData.estado === 'en-progreso' ? 'bg-blue-100 border-blue-300 text-blue-800' :
            sesionData.estado === 'pendiente' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
            'bg-red-100 border-red-300 text-red-800'
          }`} title={sesionData.estado}>
            {sesionData.estado === 'pendiente' ? 'Pend.' : 
             sesionData.estado === 'completado' ? 'Comp.' :
             sesionData.estado === 'en-progreso' ? 'Prog.' : 'Canc.'}
          </span>
        )}
      </div>
      
      {sesionData ? (
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">{sesionData.nombre}</h4>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {sesionData.hora} • {sesionData.duracion}min
            </p>
          </div>
          
          {sesionData.ejercicios.length > 0 && (
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {sesionData.ejercicios.slice(0, 2).map((ejercicio) => (
                <div key={ejercicio.id} className="bg-white rounded-lg p-2 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate" title={ejercicio.nombre}>
                        {ejercicio.nombre}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {ejercicio.series} x {ejercicio.repeticiones}
                        {ejercicio.peso && ejercicio.peso > 0 && ` • ${ejercicio.peso}kg`}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                      {ejercicio.completado && (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {sesionData.ejercicios.length > 2 && (
                <p className="text-xs text-gray-500 text-center">
                  +{sesionData.ejercicios.length - 2} ejercicios más
                </p>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 rounded-lg p-2">
            <span className="flex items-center gap-1 truncate">
              <Flame className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{sesionData.ejercicios.reduce((sum, ej) => sum + ej.calorias, 0)} cal</span>
            </span>
            <span className="flex items-center gap-1 truncate">
              <Target className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{sesionData.ejercicios.length} ej.</span>
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 h-full flex flex-col items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2"
          >
            <Plus className="w-6 h-6" />
          </motion.div>
          <p className="text-xs">Arrastra ejercicios aquí</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onNuevaSesion(dia);
            }}
            className="mt-2 px-3 py-1 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 transition-all"
          >
            Crear Sesión
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export const GridSemana: React.FC<GridSemanaProps> = ({
  onSesionClick,
  onEjercicioEdit,
  onEjercicioDelete,
  ejercicioSeleccionado,
  onNuevaSesion,
  onCambiarVista,
  fechaInicio,
  fechaFin,
  semanaActual: semanaActualProp = 1,
  onSemanaChange,
  sesionesSemana: sesionesSemanaProp = {}
}) => {
  const [vistaActual, setVistaActual] = useState<'semanal' | 'diaria'>('semanal');
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(0);
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);
  const [mostrarConfiguracion, setMostrarConfiguracion] = useState(false);
  
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const sesiones = ['Mañana', 'Tarde'];

  // Forzar re-render cuando cambien las sesiones
  useEffect(() => {
    console.log('GridSemana: sesionesSemana actualizadas', sesionesSemanaProp);
  }, [sesionesSemanaProp]);

  // Calcular fechas de la semana actual
  const getFechasSemana = () => {
    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      
      return {
        inicio,
        fin,
        dias: Array.from({ length: 7 }, (_, i) => {
          const fecha = new Date(inicio);
          fecha.setDate(inicio.getDate() + i);
          return fecha;
        })
      };
    }
    
    // Fallback si no hay props
    const hoy = new Date();
    const inicioSemana = new Date(hoy);
    
    const diaSemana = hoy.getDay();
    const diasHastaLunes = diaSemana === 0 ? -6 : 1 - diaSemana;
    inicioSemana.setDate(hoy.getDate() + diasHastaLunes);
    inicioSemana.setDate(inicioSemana.getDate() + (semanaActualProp - 1) * 7);
    
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(inicioSemana.getDate() + 6);
    
    return {
      inicio: inicioSemana,
      fin: finSemana,
      dias: Array.from({ length: 7 }, (_, i) => {
        const fecha = new Date(inicioSemana);
        fecha.setDate(inicioSemana.getDate() + i);
        return fecha;
      })
    };
  };

  const fechasSemana = getFechasSemana();

  // Usar datos reales del prop directamente

  const getSesionesDelDia = (dia: number) => {
    return sesionesSemanaProp[dia.toString()] || [];
  };

  // Calcular estadísticas en tiempo real
  const calcularEstadisticas = () => {
    const todasLasSesiones = Object.values(sesionesSemanaProp).flat();
    const totalSesiones = todasLasSesiones.length;
    const sesionesCompletadas = todasLasSesiones.filter(s => s.estado === 'completado').length;
    const totalEjercicios = todasLasSesiones.reduce((sum, s) => sum + s.ejercicios.length, 0);
    const totalHoras = todasLasSesiones.reduce((sum, s) => sum + s.duracion, 0) / 60;
    const totalCalorias = todasLasSesiones.reduce((sum, s) => 
      sum + s.ejercicios.reduce((ejSum, ej) => ejSum + ej.calorias, 0), 0
    );
    
    const progreso = totalSesiones > 0 ? Math.round((sesionesCompletadas / totalSesiones) * 100) : 0;
    const mejora = Math.round(Math.random() * 20 + 5); // Simulado por ahora
    
    return {
      progreso,
      sesionesCompletadas,
      totalSesiones,
      totalEjercicios,
      totalHoras: Math.round(totalHoras * 10) / 10,
      totalCalorias,
      mejora
    };
  };

  const estadisticas = calcularEstadisticas();

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completado':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'en-progreso':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'pendiente':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'cancelado':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const handleCambiarVista = (vista: 'semanal' | 'diaria') => {
    setVistaActual(vista);
    onCambiarVista?.(vista);
  };

  const handleNuevaSesion = (dia?: number) => {
    onNuevaSesion?.(dia);
  };

  const handleDiaClick = (dia: number) => {
    setDiaSeleccionado(dia);
    if (vistaActual === 'semanal') {
      setVistaActual('diaria');
      onCambiarVista?.('diaria');
    }
  };

  const handleCambiarDia = (direccion: 'anterior' | 'siguiente') => {
    if (direccion === 'anterior') {
      setDiaSeleccionado(prev => Math.max(0, prev - 1));
    } else {
      setDiaSeleccionado(prev => Math.min(6, prev + 1));
    }
  };

  const handleSeleccionarDia = (dia: number) => {
    setDiaSeleccionado(dia);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-orange-50 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header mejorado */}
        <div className="bg-gradient-to-r from-orange-600 via-pink-600 to-rose-600 shadow-2xl">
      <div className="p-6">
            <div className="flex items-center justify-between mb-4">
          <div>
                <h2 className="text-3xl font-bold text-white mb-2">Planificación de Entrenamiento</h2>
                <p className="text-white/80">
                  {fechasSemana.inicio.toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'short' 
                  })} - {fechasSemana.fin.toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'short' 
                  })}
                </p>
          </div>
          
          <div className="flex items-center gap-4">
                <div className="text-center text-white">
                  <p className="text-sm opacity-80">Sesiones</p>
                  <p className="text-2xl font-bold">{estadisticas.totalSesiones}</p>
                </div>
                <div className="text-center text-white">
                  <p className="text-sm opacity-80">Ejercicios</p>
                  <p className="text-2xl font-bold">{estadisticas.totalEjercicios}</p>
                </div>
                <div className="text-center text-white">
                  <p className="text-sm opacity-80">Horas</p>
                  <p className="text-2xl font-bold">{estadisticas.totalHoras}</p>
                </div>
                <div className="text-center text-white">
                  <p className="text-sm opacity-80">Calorías</p>
                  <p className="text-2xl font-bold">{estadisticas.totalCalorias}</p>
                </div>
              </div>
            </div>

            {/* Controles de vista */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Navegación de semanas */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSemanaChange?.(Math.max(1, semanaActualProp - 1))}
                    className="p-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  
                  <div className="px-4 py-2 bg-white/20 text-white rounded-xl">
                    <span className="text-sm font-semibold">Semana {semanaActualProp}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSemanaChange?.(semanaActualProp + 1)}
                    className="p-2 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="w-px h-8 bg-white/30"></div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCambiarVista('semanal')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    vistaActual === 'semanal'
                      ? 'bg-white text-orange-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  Vista Semanal
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCambiarVista('diaria')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    vistaActual === 'diaria'
                      ? 'bg-white text-orange-600 shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  Vista Diaria
                </motion.button>
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
                  onClick={() => setMostrarConfiguracion(true)}
                  className="px-3 py-2 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNuevaSesion()}
                  className="px-6 py-2 bg-white text-orange-600 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Nueva Sesión
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas expandibles */}
        <AnimatePresence>
          {mostrarEstadisticas && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/90 backdrop-blur-xl border-b border-white/50"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Estadísticas de la Semana</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMostrarConfiguracion(true)}
                    className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm font-semibold hover:bg-orange-200 transition-all flex items-center gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    Configurar
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Activity className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{estadisticas.progreso}%</div>
                    <div className="text-sm text-gray-600">Progreso</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {estadisticas.sesionesCompletadas}/{estadisticas.totalSesiones} sesiones
                    </div>
                  </div>
                  
            <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{estadisticas.sesionesCompletadas}</div>
                    <div className="text-sm text-gray-600">Completadas</div>
                    <div className="text-xs text-gray-500 mt-1">
                      de {estadisticas.totalSesiones} total
                    </div>
            </div>
                  
            <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Flame className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{estadisticas.totalCalorias}</div>
                    <div className="text-sm text-gray-600">Calorías</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {estadisticas.totalEjercicios} ejercicios
                    </div>
            </div>
                  
            <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">+{estadisticas.mejora}%</div>
                    <div className="text-sm text-gray-600">Mejora</div>
                    <div className="text-xs text-gray-500 mt-1">
                      vs semana anterior
            </div>
          </div>
        </div>

                {/* Métricas adicionales */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{estadisticas.totalHoras}h</div>
                    <div className="text-xs text-gray-600">Tiempo Total</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{estadisticas.totalEjercicios}</div>
                    <div className="text-xs text-gray-600">Ejercicios</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{estadisticas.totalSesiones}</div>
                    <div className="text-xs text-gray-600">Sesiones</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {estadisticas.totalSesiones > 0 ? Math.round(estadisticas.totalEjercicios / estadisticas.totalSesiones) : 0}
                    </div>
                    <div className="text-xs text-gray-600">Promedio/Sesión</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenido principal */}
        <div className="flex-1 p-6 overflow-y-auto overflow-x-auto mb-4">
          {vistaActual === 'semanal' ? (
            /* Vista Semanal */
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 pb-8">
        <div className="grid grid-cols-7 gap-4 min-w-0">
          {/* Header de días */}
          {diasSemana.map((dia, index) => (
                    <motion.div
                      key={dia}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleDiaClick(index)}
                      className="text-center cursor-pointer"
                    >
                      <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-4 mb-4">
              <div className="text-sm font-semibold text-gray-600 mb-1">{dia}</div>
                        <div className="text-2xl font-bold text-gray-900">
                          {fechasSemana.dias[index].getDate()}
              </div>
            </div>
                    </motion.div>
          ))}
          
          {/* Contenido de la semana */}
          {Array.from({ length: 7 }, (_, dia) => (
                    <div key={dia} className="space-y-3">
              {sesiones.map((sesion) => {
                const sesionesDelDia = getSesionesDelDia(dia);
                const sesionData = sesionesDelDia.find(s => s.nombre.includes(sesion));
                
                return (
                          <DropZone
                    key={`${dia}-${sesion}`}
                            dia={dia}
                            sesion={sesion}
                            sesionData={sesionData}
                            onSesionClick={onSesionClick}
                            onNuevaSesion={handleNuevaSesion}
                            ejercicioSeleccionado={ejercicioSeleccionado}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Vista Diaria */
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 pb-8">
                {/* Header con navegación de días */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCambiarDia('anterior')}
                      disabled={diaSeleccionado === 0}
                      className={`p-2 rounded-xl transition-all ${
                        diaSeleccionado === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {diasSemana[diaSeleccionado]}
                      </h3>
                      <p className="text-gray-600">
                        {fechasSemana.dias[diaSeleccionado].toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'long' 
                        })}
                      </p>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCambiarDia('siguiente')}
                      disabled={diaSeleccionado === 6}
                      className={`p-2 rounded-xl transition-all ${
                        diaSeleccionado === 6
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNuevaSesion(diaSeleccionado)}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Nueva Sesión
                  </motion.button>
                </div>

                {/* Selector de días */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Seleccionar día:</h4>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {diasSemana.map((dia, index) => (
                      <motion.button
                        key={dia}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSeleccionarDia(index)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
                          diaSeleccionado === index
                            ? 'bg-orange-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm">{dia}</div>
                          <div className="text-xs opacity-80">
                            {fechasSemana.dias[index].getDate()}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                    </div>
                    
                <div className="space-y-4">
                  {getSesionesDelDia(diaSeleccionado).map((sesion) => (
                    <motion.div
                      key={sesion.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl p-6 border border-gray-200 hover:border-orange-300 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{sesion.nombre}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {sesion.hora}
                            </span>
                            <span className="flex items-center gap-1">
                              <Timer className="w-4 h-4" />
                              {sesion.duracion}min
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {sesion.ubicacion}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getEstadoColor(sesion.estado)}`}>
                            {sesion.estado}
                        </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 text-gray-600" />
                          </motion.button>
                        </div>
                                </div>

                      {sesion.ejercicios.length > 0 && (
                        <div className="space-y-3">
                          <h5 className="font-semibold text-gray-900">Ejercicios ({sesion.ejercicios.length})</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {sesion.ejercicios.map((ejercicio) => (
                              <div key={ejercicio.id} className="bg-white rounded-lg p-4 border border-gray-100 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                  <h6 className="font-semibold text-gray-900 truncate flex-1 min-w-0" title={ejercicio.nombre}>
                                    {ejercicio.nombre}
                                  </h6>
                                  <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                                  {ejercicio.completado && (
                                      <CheckCircle className="w-5 h-5 text-green-600" />
                                    )}
                                  </div>
                    </div>
                    
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p className="truncate">{ejercicio.series} x {ejercicio.repeticiones}</p>
                                  {ejercicio.peso && ejercicio.peso > 0 && <p className="truncate">Peso: {ejercicio.peso}kg</p>}
                                  <p className="truncate">Descanso: {ejercicio.descanso}s</p>
                        </div>
                        
                                <div className="flex items-center justify-between mt-3">
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Flame className="w-3 h-3" />
                                    {ejercicio.calorias} cal
                                </div>
                                  <div className="flex gap-1">
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => onEjercicioEdit(ejercicio.id)}
                                    className="p-1 hover:bg-gray-100 rounded transition-all"
                                  >
                                    <Edit className="w-3 h-3 text-gray-600" />
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => onEjercicioDelete(ejercicio.id)}
                                      className="p-1 hover:bg-red-100 rounded transition-all"
                                    >
                                      <Trash2 className="w-3 h-3 text-red-600" />
                                    </motion.button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          </div>
                        )}
                        
                      {sesion.notas && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <h6 className="font-semibold text-blue-900 mb-1">Notas</h6>
                          <p className="text-sm text-blue-800">{sesion.notas}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {getSesionesDelDia(diaSeleccionado).length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin sesiones programadas</h3>
                      <p className="text-gray-600 mb-4">No hay sesiones de entrenamiento para este día.</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleNuevaSesion(diaSeleccionado)}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
                      >
                        <PlusCircle className="w-5 h-5" />
                        Crear Primera Sesión
                      </motion.button>
                      </div>
                    )}
                        </div>
                      </div>
                      </div>
                    )}
                  </div>
      </div>

      {/* Modal de configuración de estadísticas */}
      <AnimatePresence>
        {mostrarConfiguracion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setMostrarConfiguracion(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Configurar Estadísticas</h3>
                <button
                  onClick={() => setMostrarConfiguracion(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Configuración de métricas principales */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Métricas Principales</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Mostrar Progreso</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Mostrar Sesiones Completadas</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Mostrar Calorías</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Mostrar Mejora</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                {/* Configuración de métricas adicionales */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Métricas Adicionales</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Tiempo Total</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Total Ejercicios</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Total Sesiones</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Promedio por Sesión</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                {/* Configuración de objetivos */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Objetivos Semanales</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sesiones Objetivo</label>
                      <input
                        type="number"
                        defaultValue="5"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Horas Objetivo</label>
                      <input
                        type="number"
                        defaultValue="8"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
            </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Calorías Objetivo</label>
                      <input
                        type="number"
                        defaultValue="2000"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
        </div>
      </div>
                </div>

                {/* Botones de acción */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setMostrarConfiguracion(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      console.log('Guardar configuración');
                      setMostrarConfiguracion(false);
                    }}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all"
                  >
                    Guardar Configuración
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



