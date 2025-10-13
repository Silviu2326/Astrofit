import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Target,
  Dumbbell,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Copy,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Grid,
  List,
  Filter,
  Search,
  Settings,
  Download,
  Share,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Star,
  Bookmark,
  Tag,
  Users,
  MapPin,
  MessageSquare,
  FileText,
  BarChart3,
  TrendingUp,
  Activity,
  Heart,
  Flame,
  Zap,
  Award,
  Timer,
  ExternalLink,
  Bell,
} from 'lucide-react';

// Interfaces
interface SesionCalendario {
  id: string;
  nombre: string;
  fecha: string;
  hora: string;
  duracion: number;
  estado: 'pendiente' | 'en-progreso' | 'completado' | 'cancelado';
  tipo: string;
  objetivo: string;
  nivel: string;
  cliente: {
    nombre: string;
    avatar: string;
  };
  entrenador: string;
  ubicacion: string;
  ejercicios: number;
  series: number;
  pesoTotal: number;
  notas: string;
  color: string;
  prioridad: 'baja' | 'media' | 'alta';
  recordatorio: boolean;
  seguimiento: boolean;
}

interface CalendarioSemanalProps {
  entrenamientoId: string;
  semana: Date;
  onSemanaChange: (semana: Date) => void;
  onSesionSelect: (sesion: SesionCalendario) => void;
  onSesionCreate: (fecha: string, hora: string) => void;
  onSesionUpdate: (sesion: SesionCalendario) => void;
  onSesionDelete: (sesionId: string) => void;
  onSesionDuplicate: (sesion: SesionCalendario, nuevaFecha: string) => void;
  modo: 'vista' | 'edicion' | 'ejecucion';
}

const CalendarioSemanal: React.FC<CalendarioSemanalProps> = ({
  entrenamientoId,
  semana,
  onSemanaChange,
  onSesionSelect,
  onSesionCreate,
  onSesionUpdate,
  onSesionDelete,
  onSesionDuplicate,
  modo
}) => {
  const [sesiones, setSesiones] = useState<SesionCalendario[]>([]);
  const [vista, setVista] = useState<'semana' | 'mes' | 'dia'>('semana');
  const [filtros, setFiltros] = useState({
    estado: '',
    tipo: '',
    entrenador: '',
    ubicacion: ''
  });
  const [sesionSeleccionada, setSesionSeleccionada] = useState<SesionCalendario | null>(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [dragData, setDragData] = useState<{ sesion: SesionCalendario; dia: string } | null>(null);

  // Días de la semana
  const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const diasCortos = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Obtener fechas de la semana
  const obtenerFechasSemana = (fecha: Date) => {
    const inicioSemana = new Date(fecha);
    inicioSemana.setDate(fecha.getDate() - fecha.getDay() + 1); // Lunes
    
    const fechas = [];
    for (let i = 0; i < 7; i++) {
      const fecha = new Date(inicioSemana);
      fecha.setDate(inicioSemana.getDate() + i);
      fechas.push(fecha);
    }
    return fechas;
  };

  const fechasSemana = obtenerFechasSemana(semana);

  // Mock data para sesiones
  useEffect(() => {
    const sesionesMock: SesionCalendario[] = [
      {
        id: '1',
        nombre: 'Fuerza - Tren Superior',
        fecha: fechasSemana[0].toISOString().split('T')[0],
        hora: '09:00',
        duracion: 60,
        estado: 'completado',
        tipo: 'Fuerza',
        objetivo: 'Ganar Masa',
        nivel: 'Intermedio',
        cliente: {
          nombre: 'Juan Pérez',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        entrenador: 'Carlos Trainer',
        ubicacion: 'Gimnasio Principal',
        ejercicios: 6,
        series: 18,
        pesoTotal: 1200,
        notas: 'Excelente sesión, progreso notable en press banca',
        color: 'bg-orange-500',
        prioridad: 'alta',
        recordatorio: true,
        seguimiento: true
      },
      {
        id: '2',
        nombre: 'HIIT Cardio',
        fecha: fechasSemana[1].toISOString().split('T')[0],
        hora: '10:30',
        duracion: 45,
        estado: 'pendiente',
        tipo: 'Cardio',
        objetivo: 'Perder Grasa',
        nivel: 'Intermedio',
        cliente: {
          nombre: 'María López',
          avatar: 'https://i.pravatar.cc/150?img=5'
        },
        entrenador: 'Laura Fitness',
        ubicacion: 'Sala Funcional',
        ejercicios: 8,
        series: 16,
        pesoTotal: 0,
        notas: 'Sesión de alta intensidad programada',
        color: 'bg-red-500',
        prioridad: 'media',
        recordatorio: true,
        seguimiento: false
      },
      {
        id: '3',
        nombre: 'Fuerza - Tren Inferior',
        fecha: fechasSemana[2].toISOString().split('T')[0],
        hora: '14:00',
        duracion: 75,
        estado: 'en-progreso',
        tipo: 'Fuerza',
        objetivo: 'Ganar Masa',
        nivel: 'Avanzado',
        cliente: {
          nombre: 'Carlos García',
          avatar: 'https://i.pravatar.cc/150?img=12'
        },
        entrenador: 'Mike Coach',
        ubicacion: 'Gimnasio Principal',
        ejercicios: 5,
        series: 20,
        pesoTotal: 1800,
        notas: 'Sesión en progreso, enfoque en sentadillas',
        color: 'bg-blue-500',
        prioridad: 'alta',
        recordatorio: false,
        seguimiento: true
      },
      {
        id: '4',
        nombre: 'Flexibilidad y Movilidad',
        fecha: fechasSemana[3].toISOString().split('T')[0],
        hora: '16:00',
        duracion: 30,
        estado: 'pendiente',
        tipo: 'Flexibilidad',
        objetivo: 'Salud General',
        nivel: 'Principiante',
        cliente: {
          nombre: 'Ana Rodríguez',
          avatar: 'https://i.pravatar.cc/150?img=20'
        },
        entrenador: 'Sofia Wellness',
        ubicacion: 'Sala de Yoga',
        ejercicios: 12,
        series: 1,
        pesoTotal: 0,
        notas: 'Sesión de recuperación y estiramientos',
        color: 'bg-green-500',
        prioridad: 'baja',
        recordatorio: false,
        seguimiento: false
      },
      {
        id: '5',
        nombre: 'CrossFit WOD',
        fecha: fechasSemana[4].toISOString().split('T')[0],
        hora: '18:00',
        duracion: 60,
        estado: 'pendiente',
        tipo: 'CrossFit',
        objetivo: 'Rendimiento',
        nivel: 'Avanzado',
        cliente: {
          nombre: 'Pedro Martínez',
          avatar: 'https://i.pravatar.cc/150?img=33'
        },
        entrenador: 'Roberto Strength',
        ubicacion: 'Box CrossFit',
        ejercicios: 10,
        series: 25,
        pesoTotal: 800,
        notas: 'WOD del día: Fran modificado',
        color: 'bg-purple-500',
        prioridad: 'alta',
        recordatorio: true,
        seguimiento: true
      }
    ];
    setSesiones(sesionesMock);
  }, [semana]);

  // Filtrar sesiones
  const sesionesFiltradas = sesiones.filter(sesion => {
    const coincideEstado = !filtros.estado || sesion.estado === filtros.estado;
    const coincideTipo = !filtros.tipo || sesion.tipo === filtros.tipo;
    const coincideEntrenador = !filtros.entrenador || sesion.entrenador.includes(filtros.entrenador);
    const coincideUbicacion = !filtros.ubicacion || sesion.ubicacion.includes(filtros.ubicacion);
    
    return coincideEstado && coincideTipo && coincideEntrenador && coincideUbicacion;
  });

  // Obtener sesiones por día
  const obtenerSesionesPorDia = (fecha: string) => {
    return sesionesFiltradas.filter(sesion => sesion.fecha === fecha);
  };

  // Navegación de semanas
  const semanaAnterior = () => {
    const nuevaSemana = new Date(semana);
    nuevaSemana.setDate(semana.getDate() - 7);
    onSemanaChange(nuevaSemana);
  };

  const semanaSiguiente = () => {
    const nuevaSemana = new Date(semana);
    nuevaSemana.setDate(semana.getDate() + 7);
    onSemanaChange(nuevaSemana);
  };

  const irAHoy = () => {
    onSemanaChange(new Date());
  };

  // Drag and Drop
  const handleDragStart = (sesion: SesionCalendario, dia: string) => {
    setDragData({ sesion, dia });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, diaDestino: string) => {
    e.preventDefault();
    if (dragData) {
      const sesionActualizada = {
        ...dragData.sesion,
        fecha: diaDestino
      };
      onSesionUpdate(sesionActualizada);
    }
    setDragData(null);
  };

  // Estadísticas de la semana
  const estadisticasSemana = {
    totalSesiones: sesionesFiltradas.length,
    sesionesCompletadas: sesionesFiltradas.filter(s => s.estado === 'completado').length,
    sesionesPendientes: sesionesFiltradas.filter(s => s.estado === 'pendiente').length,
    sesionesEnProgreso: sesionesFiltradas.filter(s => s.estado === 'en-progreso').length,
    duracionTotal: sesionesFiltradas.reduce((sum, s) => sum + s.duracion, 0),
    ejerciciosTotal: sesionesFiltradas.reduce((sum, s) => sum + s.ejercicios, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header del calendario */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">Calendario Semanal</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={semanaAnterior}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={semanaSiguiente}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <ArrowRight className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={irAHoy}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all"
              >
                Hoy
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVista('semana')}
                className={`p-2 rounded-lg transition-all ${
                  vista === 'semana' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Calendar className="w-5 h-5" />
              </button>
              <button
                onClick={() => setVista('mes')}
                className={`p-2 rounded-lg transition-all ${
                  vista === 'mes' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setVista('dia')}
                className={`p-2 rounded-lg transition-all ${
                  vista === 'dia' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
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

        {/* Información de la semana */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {fechasSemana[0].toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })} - {fechasSemana[6].toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </h3>
            <p className="text-sm text-gray-600">
              {estadisticasSemana.totalSesiones} sesiones • {estadisticasSemana.duracionTotal} minutos • {estadisticasSemana.ejerciciosTotal} ejercicios
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Completadas</p>
              <p className="text-xl font-bold text-green-600">{estadisticasSemana.sesionesCompletadas}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Pendientes</p>
              <p className="text-xl font-bold text-yellow-600">{estadisticasSemana.sesionesPendientes}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">En Progreso</p>
              <p className="text-xl font-bold text-blue-600">{estadisticasSemana.sesionesEnProgreso}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Estado</label>
                <select
                  value={filtros.estado}
                  onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="en-progreso">En Progreso</option>
                  <option value="completado">Completado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo</label>
                <select
                  value={filtros.tipo}
                  onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos</option>
                  <option value="Fuerza">Fuerza</option>
                  <option value="Cardio">Cardio</option>
                  <option value="CrossFit">CrossFit</option>
                  <option value="Flexibilidad">Flexibilidad</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Entrenador</label>
                <select
                  value={filtros.entrenador}
                  onChange={(e) => setFiltros({ ...filtros, entrenador: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todos</option>
                  <option value="Carlos">Carlos Trainer</option>
                  <option value="Laura">Laura Fitness</option>
                  <option value="Mike">Mike Coach</option>
                  <option value="Sofia">Sofia Wellness</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ubicación</label>
                <select
                  value={filtros.ubicacion}
                  onChange={(e) => setFiltros({ ...filtros, ubicacion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Todas</option>
                  <option value="Gimnasio">Gimnasio Principal</option>
                  <option value="Sala">Sala Funcional</option>
                  <option value="Yoga">Sala de Yoga</option>
                  <option value="Box">Box CrossFit</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendario semanal */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header de días */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {diasCortos.map((dia, index) => (
            <div key={dia} className="p-4 text-center border-r border-gray-200 last:border-r-0">
              <div className="text-sm font-semibold text-gray-600 mb-1">{dia}</div>
              <div className="text-lg font-bold text-gray-900">
                {fechasSemana[index].getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Contenido del calendario */}
        <div className="grid grid-cols-7 min-h-96">
          {fechasSemana.map((fecha, index) => {
            const fechaStr = fecha.toISOString().split('T')[0];
            const sesionesDelDia = obtenerSesionesPorDia(fechaStr);
            const esHoy = fecha.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={fechaStr}
                className={`p-2 border-r border-gray-200 last:border-r-0 min-h-96 ${
                  esHoy ? 'bg-orange-50' : 'bg-white'
                }`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, fechaStr)}
              >
                {/* Botón para agregar sesión */}
                {modo === 'edicion' && (
                  <button
                    onClick={() => onSesionCreate(fechaStr, '09:00')}
                    className="w-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all mb-2"
                  >
                    <Plus className="w-4 h-4 mx-auto" />
                  </button>
                )}

                {/* Sesiones del día */}
                <div className="space-y-2">
                  {sesionesDelDia.map((sesion) => (
                    <motion.div
                      key={sesion.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-3 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        sesion.color
                      } text-white`}
                      onClick={() => onSesionSelect(sesion)}
                      draggable={modo === 'edicion'}
                      onDragStart={() => handleDragStart(sesion, fechaStr)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold">{sesion.hora}</span>
                        <div className="flex items-center gap-1">
                          {sesion.recordatorio && <Bell className="w-3 h-3" />}
                          {sesion.seguimiento && <Eye className="w-3 h-3" />}
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-bold truncate">{sesion.nombre}</h4>
                      <p className="text-xs opacity-90 truncate">{sesion.cliente.nombre}</p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          {sesion.duracion}min
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          sesion.estado === 'completado' ? 'bg-green-500' :
                          sesion.estado === 'en-progreso' ? 'bg-blue-500' :
                          sesion.estado === 'pendiente' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}>
                          {sesion.estado}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resumen de la semana */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 border border-orange-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Estadísticas de la Semana</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Sesiones Programadas</span>
              <span className="font-bold text-gray-900">{estadisticasSemana.totalSesiones}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tiempo Total</span>
              <span className="font-bold text-gray-900">{estadisticasSemana.duracionTotal} min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ejercicios Totales</span>
              <span className="font-bold text-gray-900">{estadisticasSemana.ejerciciosTotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tasa de Completitud</span>
              <span className="font-bold text-green-600">
                {estadisticasSemana.totalSesiones > 0 
                  ? Math.round((estadisticasSemana.sesionesCompletadas / estadisticasSemana.totalSesiones) * 100)
                  : 0}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Distribución por Tipo</h3>
          <div className="space-y-2">
            {['Fuerza', 'Cardio', 'CrossFit', 'Flexibilidad'].map(tipo => {
              const count = sesionesFiltradas.filter(s => s.tipo === tipo).length;
              const porcentaje = estadisticasSemana.totalSesiones > 0 
                ? Math.round((count / estadisticasSemana.totalSesiones) * 100)
                : 0;
              
              return (
                <div key={tipo} className="flex items-center justify-between">
                  <span className="text-gray-600">{tipo}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Progreso Semanal</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Objetivos Cumplidos</span>
              <span className="font-bold text-green-600">
                {Math.round((estadisticasSemana.sesionesCompletadas / Math.max(estadisticasSemana.totalSesiones, 1)) * 100)}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Adherencia</span>
              <span className="font-bold text-green-600">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Satisfacción</span>
              <span className="font-bold text-green-600">4.8/5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Progreso Físico</span>
              <span className="font-bold text-green-600">+2.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarioSemanal;




