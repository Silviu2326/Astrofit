import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, RotateCcw, Save, Eye, Edit, Trash2, Copy, Plus,
  Clock, Weight, Repeat, Target, Dumbbell, Activity, Heart, Flame,
  Zap, Award, Calendar, User, MapPin, MessageSquare, Settings,
  BarChart3, TrendingUp, ChevronDown, ChevronUp, ArrowLeft, ArrowRight
} from 'lucide-react';

interface EjercicioSesion {
  id: string;
  ejercicioId: string;
  ejercicio: {
    id: string;
    nombre: string;
    categoria: string;
    musculos: string[];
    equipamiento: string[];
    dificultad: string;
    descripcion: string;
    instrucciones: string[];
    imagen?: string;
    video?: string;
  };
  orden: number;
  series: number;
  repeticiones: string;
  peso: number;
  pesoInicial?: number;
  pesoObjetivo?: number;
  descanso: number;
  tiempo: number;
  distancia?: number;
  intensidad?: number;
  notas: string;
  completado: boolean;
  fechaCompletado?: Date;
  progresion: {
    tipo: 'peso' | 'repeticiones' | 'tiempo' | 'intensidad';
    incremento: number;
    frecuencia: 'semanal' | 'mensual' | 'por-sesion';
    ultimoIncremento?: Date;
  };
  historial: {
    fecha: Date;
    peso: number;
    repeticiones: string;
    series: number;
    notas: string;
  }[];
}

interface SesionEntrenamiento {
  id: string;
  nombre: string;
  fecha: string;
  hora: string;
  duracion: number;
  estado: 'pendiente' | 'en-progreso' | 'completado' | 'cancelado';
  ejercicios: EjercicioSesion[];
  notasEntrenador: string;
  notasCliente: string;
  ubicacion: string;
  entrenador: string;
  objetivo: string;
  nivel: string;
  equipamientoDisponible: string[];
  restricciones: string[];
  calentamiento: string;
  enfriamiento: string;
  cliente: {
    id: string;
    nombre: string;
    avatar: string;
  };
  metricas: {
    duracionReal: number;
    caloriasQuemadas: number;
    intensidadPromedio: number;
    satisfaccion: number;
    fatiga: number;
  };
}

interface EditorSesionesProps {
  sesion: SesionEntrenamiento;
  onSesionUpdate: (sesion: SesionEntrenamiento) => void;
  onEjercicioUpdate: (ejercicio: EjercicioSesion) => void;
  onEjercicioAdd: (ejercicio: Omit<EjercicioSesion, 'id'>) => void;
  onEjercicioRemove: (ejercicioId: string) => void;
  modo: 'edicion' | 'vista' | 'ejecucion';
}

const EditorSesiones: React.FC<EditorSesionesProps> = ({
  sesion,
  onSesionUpdate,
  onEjercicioUpdate,
  onEjercicioAdd,
  onEjercicioRemove,
  modo
}) => {
  const [ejercicioActivo, setEjercicioActivo] = useState<EjercicioSesion | null>(null);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [ejecutando, setEjecutando] = useState(false);
  const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(false);
  const [mostrarMetricas, setMostrarMetricas] = useState(false);
  const [ejercicioEditando, setEjercicioEditando] = useState<EjercicioSesion | null>(null);

  // Timer para descansos
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (ejecutando && tiempoRestante > 0) {
      interval = setInterval(() => {
        setTiempoRestante(prev => {
          if (prev <= 1) {
            setEjecutando(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [ejecutando, tiempoRestante]);

  // Calcular estadísticas de la sesión
  const estadisticas = {
    totalEjercicios: sesion.ejercicios.length,
    ejerciciosCompletados: sesion.ejercicios.filter(e => e.completado).length,
    seriesCompletadas: sesion.ejercicios.reduce((sum, e) => sum + (e.completado ? e.series : 0), 0),
    duracionEstimada: sesion.ejercicios.reduce((sum, e) => sum + (e.series * 30) + (e.series * e.descanso), 0),
    pesoTotal: sesion.ejercicios.reduce((sum, e) => sum + (e.peso * e.series), 0),
    progreso: sesion.ejercicios.length > 0 ? (sesion.ejercicios.filter(e => e.completado).length / sesion.ejercicios.length) * 100 : 0
  };

  // Iniciar ejercicio
  const iniciarEjercicio = (ejercicio: EjercicioSesion) => {
    setEjercicioActivo(ejercicio);
    setTiempoRestante(ejercicio.descanso);
  };

  // Completar ejercicio
  const completarEjercicio = (ejercicio: EjercicioSesion) => {
    const ejercicioActualizado = {
      ...ejercicio,
      completado: true,
      fechaCompletado: new Date()
    };
    onEjercicioUpdate(ejercicioActualizado);
    setEjercicioActivo(null);
  };

  // Actualizar ejercicio
  const actualizarEjercicio = (ejercicio: EjercicioSesion, actualizaciones: Partial<EjercicioSesion>) => {
    const ejercicioActualizado = { ...ejercicio, ...actualizaciones };
    onEjercicioUpdate(ejercicioActualizado);
  };

  // Formatear tiempo
  const formatearTiempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header de la sesión */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{sesion.nombre}</h2>
            <p className="text-gray-600">
              {new Date(sesion.fecha).toLocaleDateString('es-ES')} • {sesion.hora} • {sesion.duracion} min
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Progreso</p>
              <p className="text-2xl font-bold text-orange-600">{Math.round(estadisticas.progreso)}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Ejercicios</p>
              <p className="text-2xl font-bold text-pink-600">{estadisticas.ejerciciosCompletados}/{estadisticas.totalEjercicios}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Tiempo Est.</p>
              <p className="text-2xl font-bold text-blue-600">{Math.round(estadisticas.duracionEstimada / 60)}min</p>
            </div>
          </div>
        </div>

        {/* Información del cliente */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={sesion.cliente.avatar}
            alt={sesion.cliente.nombre}
            className="w-12 h-12 rounded-full border-2 border-orange-200"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{sesion.cliente.nombre}</h3>
            <p className="text-sm text-gray-600">{sesion.entrenador} • {sesion.ubicacion}</p>
          </div>
        </div>

        {/* Objetivo y nivel */}
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
            {sesion.objetivo}
          </span>
          <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold">
            {sesion.nivel}
          </span>
        </div>
      </div>

      {/* Barra de herramientas */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMostrarVistaPrevia(!mostrarVistaPrevia)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
          >
            <Eye className="w-4 h-4" />
            Vista Previa
          </button>
          
          <button
            onClick={() => setMostrarMetricas(!mostrarMetricas)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
          >
            <BarChart3 className="w-4 h-4" />
            Métricas
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
            <Copy className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
            <Save className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Ejercicio activo (modo ejecución) */}
      {ejercicioActivo && modo === 'ejecucion' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{ejercicioActivo.ejercicio.nombre}</h3>
              <p className="text-gray-600">Serie {ejercicioActivo.series} de {ejercicioActivo.series}</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">Descanso</p>
              <p className="text-3xl font-bold text-blue-600">{formatearTiempo(tiempoRestante)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Repeticiones</p>
              <p className="text-lg font-bold text-gray-900">{ejercicioActivo.repeticiones}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Peso</p>
              <p className="text-lg font-bold text-gray-900">{ejercicioActivo.peso} kg</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Intensidad</p>
              <p className="text-lg font-bold text-gray-900">{ejercicioActivo.intensidad || 5}/10</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Tiempo</p>
              <p className="text-lg font-bold text-gray-900">{ejercicioActivo.tiempo}s</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setEjecutando(!ejecutando)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                ejecutando
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {ejecutando ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {ejecutando ? 'Pausar' : 'Iniciar'} Descanso
            </button>
            
            <button
              onClick={() => completarEjercicio(ejercicioActivo)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              Completar Ejercicio
            </button>
          </div>
        </motion.div>
      )}

      {/* Lista de ejercicios */}
      <div className="space-y-4">
        {sesion.ejercicios.map((ejercicio, index) => (
          <motion.div
            key={ejercicio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl border-2 transition-all ${
              ejercicio.completado ? 'border-green-200 bg-green-50' :
              ejercicioActivo?.id === ejercicio.id ? 'border-blue-500 shadow-lg' :
              'border-gray-200 hover:border-orange-300'
            }`}
          >
            <div className="p-6">
              {/* Header del ejercicio */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">#{ejercicio.orden}</p>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      ejercicio.completado ? 'bg-green-500 text-white' :
                      ejercicioActivo?.id === ejercicio.id ? 'bg-blue-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {ejercicio.completado ? <CheckCircle className="w-4 h-4" /> : index + 1}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{ejercicio.ejercicio.nombre}</h4>
                    <p className="text-sm text-gray-600">{ejercicio.ejercicio.descripcion}</p>
                    <div className="flex gap-2 mt-1">
                      {ejercicio.ejercicio.musculos.slice(0, 3).map((musculo) => (
                        <span key={musculo} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {musculo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {modo === 'ejecucion' && !ejercicio.completado && (
                    <button
                      onClick={() => iniciarEjercicio(ejercicio)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                    >
                      <Play className="w-4 h-4" />
                      Iniciar
                    </button>
                  )}
                  
                  {modo === 'edicion' && (
                    <button
                      onClick={() => setEjercicioEditando(ejercicio)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                    >
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                  
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Configuración del ejercicio */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Series</label>
                  <input
                    type="number"
                    value={ejercicio.series}
                    onChange={(e) => actualizarEjercicio(ejercicio, { series: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    min="1"
                    max="20"
                    disabled={modo === 'vista'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Repeticiones</label>
                  <input
                    type="text"
                    value={ejercicio.repeticiones}
                    onChange={(e) => actualizarEjercicio(ejercicio, { repeticiones: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="8-12"
                    disabled={modo === 'vista'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Peso (kg)</label>
                  <input
                    type="number"
                    value={ejercicio.peso}
                    onChange={(e) => actualizarEjercicio(ejercicio, { peso: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    min="0"
                    step="0.5"
                    disabled={modo === 'vista'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Descanso (s)</label>
                  <input
                    type="number"
                    value={ejercicio.descanso}
                    onChange={(e) => actualizarEjercicio(ejercicio, { descanso: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    min="0"
                    step="15"
                    disabled={modo === 'vista'}
                  />
                </div>
              </div>

              {/* Notas del ejercicio */}
              <div className="mt-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Notas</label>
                <textarea
                  value={ejercicio.notas}
                  onChange={(e) => actualizarEjercicio(ejercicio, { notas: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  rows={2}
                  placeholder="Técnica, variaciones, observaciones..."
                  disabled={modo === 'vista'}
                />
              </div>

              {/* Progresión */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-semibold text-blue-800">Progresión</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Tipo:</span>
                    <span className="ml-1 font-semibold">{ejercicio.progresion.tipo}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Incremento:</span>
                    <span className="ml-1 font-semibold">+{ejercicio.progresion.incremento}kg</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Frecuencia:</span>
                    <span className="ml-1 font-semibold">{ejercicio.progresion.frecuencia}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resumen de la sesión */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 border border-orange-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Resumen de la Sesión</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{estadisticas.totalEjercicios}</p>
            <p className="text-sm text-gray-600">Ejercicios</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-pink-600">{estadisticas.seriesCompletadas}</p>
            <p className="text-sm text-gray-600">Series</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{Math.round(estadisticas.duracionEstimada / 60)}</p>
            <p className="text-sm text-gray-600">Minutos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{estadisticas.pesoTotal}</p>
            <p className="text-sm text-gray-600">Kg Total</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorSesiones;







