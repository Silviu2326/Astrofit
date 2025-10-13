import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Workflow, 
  Play, 
  Pause, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Zap,
  Mail,
  Phone,
  MessageCircle,
  Calendar,
  Bell,
  Target,
  Users,
  BarChart3,
  RefreshCw,
  Eye,
  Copy,
  Archive
} from 'lucide-react';

interface ClienteWorkflowsProps {
  clienteId: string;
  clienteNombre: string;
}

interface WorkflowItem {
  id: string;
  nombre: string;
  descripcion: string;
  estado: 'activo' | 'pausado' | 'inactivo';
  tipo: 'automatico' | 'manual' | 'programado';
  frecuencia: string;
  ultimaEjecucion: string;
  proximaEjecucion: string;
  ejecuciones: number;
  exito: number;
  acciones: AccionWorkflow[];
  condiciones: CondicionWorkflow[];
}

interface AccionWorkflow {
  id: string;
  tipo: 'email' | 'sms' | 'notificacion' | 'tarea' | 'recordatorio';
  titulo: string;
  descripcion: string;
  configuracion: any;
  orden: number;
}

interface CondicionWorkflow {
  id: string;
  tipo: 'fecha' | 'comportamiento' | 'metricas' | 'evento';
  descripcion: string;
  valor: any;
  operador: 'igual' | 'mayor' | 'menor' | 'contiene';
}

interface EjecucionWorkflow {
  id: string;
  workflowId: string;
  fecha: string;
  estado: 'exitoso' | 'fallido' | 'en_progreso';
  accionesEjecutadas: number;
  errores: string[];
  duracion: number;
}

const ClienteWorkflows: React.FC<ClienteWorkflowsProps> = ({ clienteId, clienteNombre }) => {
  const [activeView, setActiveView] = useState<'workflows' | 'ejecuciones' | 'plantillas' | 'configuracion'>('workflows');
  const [showCrearWorkflow, setShowCrearWorkflow] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'activo' | 'pausado' | 'inactivo'>('todos');

  // Datos mock para demostración
  const workflows: WorkflowItem[] = [
    {
      id: '1',
      nombre: 'Seguimiento Post-Entrenamiento',
      descripcion: 'Envía recordatorios y seguimiento después de cada sesión',
      estado: 'activo',
      tipo: 'automatico',
      frecuencia: 'Después de cada sesión',
      ultimaEjecucion: '2024-01-15 14:30',
      proximaEjecucion: '2024-01-17 10:00',
      ejecuciones: 24,
      exito: 95,
      acciones: [
        {
          id: '1',
          tipo: 'email',
          titulo: 'Email de seguimiento',
          descripcion: 'Envía email con resumen de la sesión y próximos pasos',
          configuracion: { template: 'post_entrenamiento', delay: 0 },
          orden: 1
        },
        {
          id: '2',
          tipo: 'notificacion',
          titulo: 'Recordatorio de hidratación',
          descripcion: 'Notifica sobre la importancia de hidratarse',
          configuracion: { delay: 2 },
          orden: 2
        }
      ],
      condiciones: [
        {
          id: '1',
          tipo: 'evento',
          descripcion: 'Sesión de entrenamiento completada',
          valor: 'entrenamiento_completado',
          operador: 'igual'
        }
      ]
    },
    {
      id: '2',
      nombre: 'Recordatorio de Citas',
      descripcion: 'Envía recordatorios automáticos antes de las citas',
      estado: 'activo',
      tipo: 'programado',
      frecuencia: '24h y 2h antes de la cita',
      ultimaEjecucion: '2024-01-15 09:00',
      proximaEjecucion: '2024-01-16 08:00',
      ejecuciones: 156,
      exito: 98,
      acciones: [
        {
          id: '3',
          tipo: 'sms',
          titulo: 'SMS de recordatorio',
          descripcion: 'Envía SMS 24h antes de la cita',
          configuracion: { template: 'recordatorio_cita', delay: 24 },
          orden: 1
        },
        {
          id: '4',
          tipo: 'notificacion',
          titulo: 'Notificación push',
          descripcion: 'Notificación 2h antes de la cita',
          configuracion: { delay: 2 },
          orden: 2
        }
      ],
      condiciones: [
        {
          id: '2',
          tipo: 'fecha',
          descripcion: 'Cita programada en las próximas 24h',
          valor: 24,
          operador: 'menor'
        }
      ]
    },
    {
      id: '3',
      nombre: 'Motivación Semanal',
      descripcion: 'Envía mensajes motivacionales y seguimiento de progreso',
      estado: 'pausado',
      tipo: 'programado',
      frecuencia: 'Cada lunes',
      ultimaEjecucion: '2024-01-08 10:00',
      proximaEjecucion: 'Pausado',
      ejecuciones: 8,
      exito: 87,
      acciones: [
        {
          id: '5',
          tipo: 'email',
          titulo: 'Email motivacional',
          descripcion: 'Email con progreso de la semana y motivación',
          configuracion: { template: 'motivacion_semanal' },
          orden: 1
        }
      ],
      condiciones: [
        {
          id: '3',
          tipo: 'fecha',
          descripcion: 'Día de la semana es lunes',
          valor: 'monday',
          operador: 'igual'
        }
      ]
    }
  ];

  const ejecuciones: EjecucionWorkflow[] = [
    {
      id: '1',
      workflowId: '1',
      fecha: '2024-01-15 14:30',
      estado: 'exitoso',
      accionesEjecutadas: 2,
      errores: [],
      duracion: 45
    },
    {
      id: '2',
      workflowId: '2',
      fecha: '2024-01-15 09:00',
      estado: 'exitoso',
      accionesEjecutadas: 1,
      errores: [],
      duracion: 30
    },
    {
      id: '3',
      workflowId: '1',
      fecha: '2024-01-14 16:45',
      estado: 'fallido',
      accionesEjecutadas: 1,
      errores: ['Error de conexión con el servicio de email'],
      duracion: 120
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'pausado': return 'bg-yellow-100 text-yellow-800';
      case 'inactivo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'automatico': return 'bg-blue-100 text-blue-800';
      case 'manual': return 'bg-purple-100 text-purple-800';
      case 'programado': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoEjecucionColor = (estado: string) => {
    switch (estado) {
      case 'exitoso': return 'bg-green-100 text-green-800';
      case 'fallido': return 'bg-red-100 text-red-800';
      case 'en_progreso': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoAccionIcon = (tipo: string) => {
    switch (tipo) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <Phone className="w-4 h-4" />;
      case 'notificacion': return <Bell className="w-4 h-4" />;
      case 'tarea': return <Target className="w-4 h-4" />;
      case 'recordatorio': return <Clock className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const WorkflowsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Workflows Automatizados</h3>
        <div className="flex items-center gap-2">
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="todos">Todos</option>
            <option value="activo">Activos</option>
            <option value="pausado">Pausados</option>
            <option value="inactivo">Inactivos</option>
          </select>
          <button
            onClick={() => setShowCrearWorkflow(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo Workflow
          </button>
        </div>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Workflows Activos</p>
              <p className="text-2xl font-bold text-green-900">
                {workflows.filter(w => w.estado === 'activo').length}
              </p>
            </div>
            <Play className="w-8 h-8 text-green-600" />
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
              <p className="text-sm font-medium text-blue-600">Total Ejecuciones</p>
              <p className="text-2xl font-bold text-blue-900">
                {workflows.reduce((acc, w) => acc + w.ejecuciones, 0)}
              </p>
            </div>
            <Zap className="w-8 h-8 text-blue-600" />
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
              <p className="text-sm font-medium text-purple-600">Tasa de Éxito</p>
              <p className="text-2xl font-bold text-purple-900">
                {Math.round(workflows.reduce((acc, w) => acc + w.exito, 0) / workflows.length)}%
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Próximas Ejecuciones</p>
              <p className="text-2xl font-bold text-orange-900">
                {workflows.filter(w => w.estado === 'activo').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </motion.div>
      </div>

      {/* Lista de workflows */}
      <div className="space-y-4">
        {workflows
          .filter(workflow => filtroEstado === 'todos' || workflow.estado === filtroEstado)
          .map((workflow) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-100 rounded-xl">
                    <Workflow className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{workflow.nombre}</h4>
                    <p className="text-sm text-gray-600">{workflow.descripcion}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Frecuencia: {workflow.frecuencia}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(workflow.estado)}`}>
                    {workflow.estado}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(workflow.tipo)}`}>
                    {workflow.tipo}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600">Ejecuciones</p>
                  <p className="text-lg font-bold text-gray-900">{workflow.ejecuciones}</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-600">Tasa de Éxito</p>
                  <p className="text-lg font-bold text-green-900">{workflow.exito}%</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-600">Última Ejecución</p>
                  <p className="text-sm font-bold text-blue-900">
                    {new Date(workflow.ultimaEjecucion).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm font-medium text-orange-600">Próxima</p>
                  <p className="text-sm font-bold text-orange-900">
                    {workflow.proximaEjecucion === 'Pausado' ? 'Pausado' : 
                     new Date(workflow.proximaEjecucion).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Acciones ({workflow.acciones.length})</h5>
                <div className="space-y-2">
                  {workflow.acciones.map((accion) => (
                    <div key={accion.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-white rounded-lg">
                        {getTipoAccionIcon(accion.tipo)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{accion.titulo}</p>
                        <p className="text-sm text-gray-600">{accion.descripcion}</p>
                      </div>
                      <span className="text-xs text-gray-500">Orden: {accion.orden}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button className={`p-2 rounded-lg transition-colors ${
                  workflow.estado === 'activo' 
                    ? 'text-yellow-600 hover:bg-yellow-50' 
                    : 'text-green-600 hover:bg-green-50'
                }`}>
                  {workflow.estado === 'activo' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
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

  const EjecucionesView = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Historial de Ejecuciones</h3>
      
      <div className="space-y-4">
        {ejecuciones.map((ejecucion) => (
          <motion.div
            key={ejecucion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Zap className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Ejecución #{ejecucion.id}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {new Date(ejecucion.fecha).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoEjecucionColor(ejecucion.estado)}`}>
                  {ejecucion.estado}
                </span>
                <span className="text-sm text-gray-600">
                  {ejecucion.duracion}s
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Acciones Ejecutadas</p>
                <p className="text-lg font-bold text-gray-900">{ejecucion.accionesEjecutadas}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">Duración</p>
                <p className="text-lg font-bold text-blue-900">{ejecucion.duracion}s</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-sm font-medium text-red-600">Errores</p>
                <p className="text-lg font-bold text-red-900">{ejecucion.errores.length}</p>
              </div>
            </div>

            {ejecucion.errores.length > 0 && (
              <div className="p-4 bg-red-50 rounded-lg">
                <h5 className="font-medium text-red-900 mb-2">Errores Encontrados</h5>
                <ul className="space-y-1">
                  {ejecucion.errores.map((error, index) => (
                    <li key={index} className="text-sm text-red-800">• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 mt-4">
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Automatización de Workflows</h2>
            <p className="text-sm text-gray-600">Automatización inteligente para {clienteNombre}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navegación de vistas */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'workflows', label: 'Workflows', icon: Workflow },
          { id: 'ejecuciones', label: 'Ejecuciones', icon: BarChart3 },
          { id: 'plantillas', label: 'Plantillas', icon: Copy },
          { id: 'configuracion', label: 'Configuración', icon: Settings },
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
      {activeView === 'workflows' && <WorkflowsView />}
      {activeView === 'ejecuciones' && <EjecucionesView />}
      {activeView === 'plantillas' && <div>Vista de Plantillas (en desarrollo)</div>}
      {activeView === 'configuracion' && <div>Vista de Configuración (en desarrollo)</div>}
    </div>
  );
};

export default ClienteWorkflows;

