import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Target, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Star, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Tag,
  BarChart3,
  Settings,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';

interface SegmentacionClientesProps {
  onSegmentSelect: (segmento: Segmento) => void;
  onSegmentCreate: (segmento: Partial<Segmento>) => void;
  onSegmentUpdate: (id: string, segmento: Partial<Segmento>) => void;
  onSegmentDelete: (id: string) => void;
}

interface Segmento {
  id: string;
  nombre: string;
  descripcion: string;
  criterios: CriterioSegmento[];
  color: string;
  activo: boolean;
  clientes: number;
  ultimaActualizacion: string;
  tipo: 'manual' | 'automatico' | 'dinamico';
  metricas: {
    ltvPromedio: number;
    satisfaccionPromedio: number;
    retencion: number;
    crecimiento: number;
  };
}

interface CriterioSegmento {
  id: string;
  campo: string;
  operador: 'igual' | 'contiene' | 'mayor' | 'menor' | 'entre' | 'en' | 'no_en';
  valor: any;
  valor2?: any;
  logica: 'Y' | 'O';
}

const SegmentacionClientes: React.FC<SegmentacionClientesProps> = ({
  onSegmentSelect,
  onSegmentCreate,
  onSegmentUpdate,
  onSegmentDelete
}) => {
  const [activeView, setActiveView] = useState<'segmentos' | 'crear' | 'editar'>('segmentos');
  const [selectedSegment, setSelectedSegment] = useState<Segmento | null>(null);
  const [showCrearModal, setShowCrearModal] = useState(false);

  // Datos mock para demostración
  const segmentos: Segmento[] = [
    {
      id: '1',
      nombre: 'Clientes Premium',
      descripcion: 'Clientes con alto valor y satisfacción',
      criterios: [
        { id: '1', campo: 'ltv', operador: 'mayor', valor: 2000, logica: 'Y' },
        { id: '2', campo: 'satisfaccion', operador: 'mayor', valor: 4.5, logica: 'Y' },
        { id: '3', campo: 'estado', operador: 'igual', valor: 'premium', logica: 'Y' }
      ],
      color: 'purple',
      activo: true,
      clientes: 45,
      ultimaActualizacion: '2024-01-15 10:30',
      tipo: 'dinamico',
      metricas: {
        ltvPromedio: 3200,
        satisfaccionPromedio: 4.8,
        retencion: 92,
        crecimiento: 15
      }
    },
    {
      id: '2',
      nombre: 'Clientes en Riesgo',
      descripcion: 'Clientes con baja adherencia o satisfacción',
      criterios: [
        { id: '1', campo: 'satisfaccion', operador: 'menor', valor: 3.5, logica: 'O' },
        { id: '2', campo: 'adherencia', operador: 'menor', valor: 50, logica: 'O' },
        { id: '3', campo: 'ultimaActividad', operador: 'menor', valor: 30, logica: 'O' }
      ],
      color: 'red',
      activo: true,
      clientes: 12,
      ultimaActualizacion: '2024-01-15 09:15',
      tipo: 'dinamico',
      metricas: {
        ltvPromedio: 800,
        satisfaccionPromedio: 3.1,
        retencion: 45,
        crecimiento: -8
      }
    },
    {
      id: '3',
      nombre: 'Nuevos Clientes',
      descripcion: 'Clientes registrados en los últimos 30 días',
      criterios: [
        { id: '1', campo: 'fechaAlta', operador: 'mayor', valor: 30, logica: 'Y' }
      ],
      color: 'green',
      activo: true,
      clientes: 28,
      ultimaActualizacion: '2024-01-15 08:45',
      tipo: 'dinamico',
      metricas: {
        ltvPromedio: 1200,
        satisfaccionPromedio: 4.2,
        retencion: 78,
        crecimiento: 25
      }
    },
    {
      id: '4',
      nombre: 'Clientes Regulares',
      descripcion: 'Clientes con plan estándar y buena adherencia',
      criterios: [
        { id: '1', campo: 'plan', operador: 'igual', valor: 'estandar', logica: 'Y' },
        { id: '2', campo: 'adherencia', operador: 'mayor', valor: 70, logica: 'Y' }
      ],
      color: 'blue',
      activo: true,
      clientes: 156,
      ultimaActualizacion: '2024-01-15 07:20',
      tipo: 'dinamico',
      metricas: {
        ltvPromedio: 1800,
        satisfaccionPromedio: 4.2,
        retencion: 78,
        crecimiento: 5
      }
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'manual': return <Users className="w-4 h-4" />;
      case 'automatico': return <RefreshCw className="w-4 h-4" />;
      case 'dinamico': return <Target className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'manual': return 'bg-gray-100 text-gray-800';
      case 'automatico': return 'bg-blue-100 text-blue-800';
      case 'dinamico': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const SegmentosView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Segmentos de Clientes</h3>
        <button
          onClick={() => setShowCrearModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Segmento
        </button>
      </div>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Segmentos</p>
              <p className="text-2xl font-bold text-purple-900">{segmentos.length}</p>
            </div>
            <Target className="w-8 h-8 text-purple-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Clientes Segmentados</p>
              <p className="text-2xl font-bold text-green-900">
                {segmentos.reduce((acc, s) => acc + s.clientes, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Segmentos Activos</p>
              <p className="text-2xl font-bold text-blue-900">
                {segmentos.filter(s => s.activo).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-blue-600" />
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
              <p className="text-sm font-medium text-orange-600">Crecimiento Promedio</p>
              <p className="text-2xl font-bold text-orange-900">
                {Math.round(segmentos.reduce((acc, s) => acc + s.metricas.crecimiento, 0) / segmentos.length)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
        </motion.div>
      </div>

      {/* Lista de segmentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {segmentos.map((segmento) => (
          <motion.div
            key={segmento.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${getColorClasses(segmento.color)}`}>
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{segmento.nombre}</h4>
                  <p className="text-sm text-gray-600">{segmento.descripcion}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTipoColor(segmento.tipo)}`}>
                  {segmento.tipo}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  segmento.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {segmento.activo ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Clientes</p>
                <p className="text-lg font-bold text-gray-900">{segmento.clientes}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-600">LTV Promedio</p>
                <p className="text-lg font-bold text-blue-900">€{segmento.metricas.ltvPromedio}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-600">Satisfacción</p>
                <p className="text-lg font-bold text-green-900">{segmento.metricas.satisfaccionPromedio}/5</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm font-medium text-purple-600">Retención</p>
                <p className="text-lg font-bold text-purple-900">{segmento.metricas.retencion}%</p>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Criterios de Segmentación</h5>
              <div className="space-y-2">
                {segmento.criterios.map((criterio, index) => (
                  <div key={criterio.id} className="flex items-center gap-2 text-sm">
                    {index > 0 && (
                      <span className="text-gray-400 font-medium">{criterio.logica}</span>
                    )}
                    <span className="font-medium text-gray-900">{criterio.campo}</span>
                    <span className="text-gray-600">{criterio.operador}</span>
                    <span className="text-gray-900">{criterio.valor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Actualizado: {new Date(segmento.ultimaActualizacion).toLocaleString()}
                </span>
                {segmento.metricas.crecimiento > 0 ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+{segmento.metricas.crecimiento}%</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-600">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-medium">{segmento.metricas.crecimiento}%</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSegmentSelect(segmento)}
                  className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedSegment(segmento)}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Play className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedSegment(segmento)}
                  className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSegmentDelete(segmento.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
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
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Segmentación de Clientes</h2>
            <p className="text-sm text-gray-600">Crea y gestiona segmentos inteligentes de clientes</p>
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

      {/* Contenido */}
      <SegmentosView />

      {/* Modal de creación */}
      <AnimatePresence>
        {showCrearModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Crear Nuevo Segmento</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del segmento</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ej: Clientes Premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows={3}
                      placeholder="Describe el segmento..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <div className="flex gap-2">
                      {['purple', 'red', 'green', 'blue', 'orange', 'indigo'].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full border-2 ${
                            color === 'purple' ? 'bg-purple-500 border-purple-500' : `bg-${color}-500 border-${color}-500`
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowCrearModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowCrearModal(false)}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Crear Segmento
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SegmentacionClientes;

