import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Dumbbell, 
  Play, 
  Pause, 
  CheckCircle, 
  Plus,
  Edit3,
  Trash2,
  Target,
  TrendingUp,
  Users,
  Timer,
  Award,
  BarChart3
} from 'lucide-react';
import { Cliente } from '../clienteDetalleApi';

interface ClienteEntrenamientosProps {
  cliente: Cliente;
}

interface SesionEntrenamiento {
  id: string;
  fecha: string;
  hora: string;
  tipo: 'Presencial' | 'Virtual' | 'Grupal';
  estado: 'Programada' | 'En Progreso' | 'Completada' | 'Cancelada';
  duracion: number;
  ejercicios: Ejercicio[];
  notas?: string;
  rendimiento?: number;
}

interface Ejercicio {
  id: string;
  nombre: string;
  series: number;
  repeticiones: number;
  peso: number;
  descanso: number;
  completado: boolean;
}

interface PlanEntrenamiento {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: number;
  frecuencia: string;
  ejercicios: Ejercicio[];
  activo: boolean;
}

const ClienteEntrenamientos: React.FC<ClienteEntrenamientosProps> = ({ cliente }) => {
  const [activeView, setActiveView] = useState<'sesiones' | 'planes' | 'rendimiento' | 'historial'>('sesiones');
  const [showAddSesion, setShowAddSesion] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);

  // Datos mock para demostración
  const sesiones: SesionEntrenamiento[] = [
    {
      id: '1',
      fecha: '2024-01-15',
      hora: '10:00',
      tipo: 'Presencial',
      estado: 'Completada',
      duracion: 60,
      rendimiento: 85,
      ejercicios: [
        { id: '1', nombre: 'Sentadillas', series: 3, repeticiones: 12, peso: 60, descanso: 60, completado: true },
        { id: '2', nombre: 'Press de banca', series: 3, repeticiones: 10, peso: 80, descanso: 90, completado: true },
        { id: '3', nombre: 'Remo con barra', series: 3, repeticiones: 12, peso: 50, descanso: 60, completado: true }
      ],
      notas: 'Excelente sesión, muy motivado'
    },
    {
      id: '2',
      fecha: '2024-01-17',
      hora: '10:00',
      tipo: 'Presencial',
      estado: 'Programada',
      duracion: 60,
      ejercicios: [
        { id: '4', nombre: 'Peso muerto', series: 3, repeticiones: 8, peso: 100, descanso: 120, completado: false },
        { id: '5', nombre: 'Dominadas', series: 3, repeticiones: 8, peso: 0, descanso: 60, completado: false }
      ]
    }
  ];

  const planes: PlanEntrenamiento[] = [
    {
      id: '1',
      nombre: 'Plan Fuerza Básica',
      descripcion: 'Enfoque en desarrollo de fuerza fundamental',
      duracion: 8,
      frecuencia: '3x por semana',
      activo: true,
      ejercicios: [
        { id: '1', nombre: 'Sentadillas', series: 3, repeticiones: 12, peso: 60, descanso: 60, completado: false },
        { id: '2', nombre: 'Press de banca', series: 3, repeticiones: 10, peso: 80, descanso: 90, completado: false }
      ]
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Completada': return 'bg-green-100 text-green-800';
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Programada': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'Presencial': return 'bg-indigo-100 text-indigo-800';
      case 'Virtual': return 'bg-purple-100 text-purple-800';
      case 'Grupal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const SesionesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Sesiones de Entrenamiento</h3>
        <button
          onClick={() => setShowAddSesion(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Sesión
        </button>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Sesiones Completadas</p>
              <p className="text-2xl font-bold text-green-900">12</p>
              <p className="text-xs text-green-600">Este mes</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Tiempo Total</p>
              <p className="text-2xl font-bold text-blue-900">18h</p>
              <p className="text-xs text-blue-600">Este mes</p>
            </div>
            <Timer className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Rendimiento Promedio</p>
              <p className="text-2xl font-bold text-purple-900">85%</p>
              <p className="text-xs text-purple-600">Últimas 4 sesiones</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* Lista de sesiones */}
      <div className="space-y-4">
        {sesiones.map((sesion) => (
          <motion.div
            key={sesion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {new Date(sesion.fecha).toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h4>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {sesion.hora} - {sesion.duracion} minutos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(sesion.estado)}`}>
                  {sesion.estado}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(sesion.tipo)}`}>
                  {sesion.tipo}
                </span>
              </div>
            </div>

            {sesion.rendimiento && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Rendimiento</span>
                  <span className="text-sm font-bold text-gray-900">{sesion.rendimiento}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${sesion.rendimiento}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Ejercicios ({sesion.ejercicios.length})</h5>
              <div className="space-y-2">
                {sesion.ejercicios.map((ejercicio) => (
                  <div key={ejercicio.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        ejercicio.completado ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {ejercicio.completado && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className="font-medium text-gray-900">{ejercicio.nombre}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {ejercicio.series}x{ejercicio.repeticiones} @ {ejercicio.peso}kg
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {sesion.notas && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Notas:</strong> {sesion.notas}
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 mt-4">
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const PlanesView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Planes de Entrenamiento</h3>
        <button
          onClick={() => setShowAddPlan(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {planes.map((plan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{plan.nombre}</h4>
                  <p className="text-sm text-gray-600">{plan.descripcion}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                plan.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {plan.activo ? 'Activo' : 'Inactivo'}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                Duración: {plan.duracion} semanas
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Frecuencia: {plan.frecuencia}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Dumbbell className="w-4 h-4" />
                Ejercicios: {plan.ejercicios.length}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm">
                Ver Detalles
              </button>
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Navegación de vistas */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'sesiones', label: 'Sesiones', icon: Calendar },
          { id: 'planes', label: 'Planes', icon: Target },
          { id: 'rendimiento', label: 'Rendimiento', icon: BarChart3 },
          { id: 'historial', label: 'Historial', icon: Award },
        ].map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeView === view.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <view.icon className="w-4 h-4" />
            {view.label}
          </button>
        ))}
      </div>

      {/* Contenido de la vista activa */}
      {activeView === 'sesiones' && <SesionesView />}
      {activeView === 'planes' && <PlanesView />}
      {activeView === 'rendimiento' && <div>Vista de Rendimiento (en desarrollo)</div>}
      {activeView === 'historial' && <div>Vista de Historial (en desarrollo)</div>}
    </div>
  );
};

export default ClienteEntrenamientos;

