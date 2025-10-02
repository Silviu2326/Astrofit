import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  MapPin,
  Calendar,
  User,
  Plus,
  Edit3
} from 'lucide-react';
import type { Pedido, EstadoPedido, EventoEnvio } from '../types';

interface TimelineEnvioProps {
  pedido: Pedido;
  onActualizarEstado: (pedidoId: string, nuevoEstado: EstadoPedido) => void;
}

export const TimelineEnvio: React.FC<TimelineEnvioProps> = ({
  pedido,
  onActualizarEstado
}) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState({
    estado: pedido.estado,
    ubicacion: '',
    descripcion: '',
    responsable: ''
  });

  const estadosDisponibles: { valor: EstadoPedido; label: string; icono: any; color: string }[] = [
    { valor: 'pendiente', label: 'Pendiente', icono: Clock, color: 'yellow' },
    { valor: 'procesando', label: 'Procesando', icono: Package, color: 'blue' },
    { valor: 'enviado', label: 'Enviado', icono: Truck, color: 'indigo' },
    { valor: 'en_transito', label: 'En Tránsito', icono: Truck, color: 'purple' },
    { valor: 'entregado', label: 'Entregado', icono: CheckCircle, color: 'green' }
  ];

  const obtenerIconoEvento = (estado: EstadoPedido) => {
    const estadoConfig = estadosDisponibles.find(e => e.valor === estado);
    return estadoConfig?.icono || Clock;
  };

  const obtenerColorEvento = (estado: EstadoPedido) => {
    const estadoConfig = estadosDisponibles.find(e => e.valor === estado);
    return estadoConfig?.color || 'gray';
  };

  const formatearFecha = (fecha: Date) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAgregarEvento = () => {
    // Aquí se agregaría el evento al historial
    onActualizarEstado(pedido.id, nuevoEvento.estado as EstadoPedido);
    setMostrarFormulario(false);
    setNuevoEvento({
      estado: pedido.estado,
      ubicacion: '',
      descripcion: '',
      responsable: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Información de seguimiento */}
      {pedido.seguimiento && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Información de Seguimiento
              </h3>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Edit3 className="w-4 h-4" />
              Editar
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Número de seguimiento</p>
              <p className="font-mono font-medium text-gray-900">{pedido.seguimiento}</p>
            </div>
            {pedido.empresa && (
              <div>
                <p className="text-sm text-gray-600">Empresa de envío</p>
                <p className="font-medium text-gray-900">{pedido.empresa}</p>
              </div>
            )}
            {pedido.fechaEstimadaEntrega && (
              <div>
                <p className="text-sm text-gray-600">Fecha estimada de entrega</p>
                <p className="font-medium text-gray-900">
                  {formatearFecha(pedido.fechaEstimadaEntrega)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Botón para agregar evento */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Historial de Seguimiento
        </h3>
        <button
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          Agregar evento
        </button>
      </div>

      {/* Formulario para agregar evento */}
      {mostrarFormulario && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white border-2 border-blue-200 rounded-xl p-6"
        >
          <h4 className="font-semibold text-gray-900 mb-4">Nuevo Evento de Seguimiento</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={nuevoEvento.estado}
                onChange={(e) => setNuevoEvento({ ...nuevoEvento, estado: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {estadosDisponibles.map((estado) => (
                  <option key={estado.valor} value={estado.valor}>
                    {estado.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación
              </label>
              <input
                type="text"
                value={nuevoEvento.ubicacion}
                onChange={(e) => setNuevoEvento({ ...nuevoEvento, ubicacion: e.target.value })}
                placeholder="Ej: Centro de distribución Madrid"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={nuevoEvento.descripcion}
                onChange={(e) => setNuevoEvento({ ...nuevoEvento, descripcion: e.target.value })}
                placeholder="Descripción del evento..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Responsable
              </label>
              <input
                type="text"
                value={nuevoEvento.responsable}
                onChange={(e) => setNuevoEvento({ ...nuevoEvento, responsable: e.target.value })}
                placeholder="Nombre del responsable"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAgregarEvento}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Guardar Evento
            </button>
            <button
              onClick={() => setMostrarFormulario(false)}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
          </div>
        </motion.div>
      )}

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-200 via-blue-200 to-indigo-200"></div>

        <div className="space-y-6">
          {pedido.historialEnvio.map((evento, index) => {
            const Icono = obtenerIconoEvento(evento.estado);
            const color = obtenerColorEvento(evento.estado);
            const esUltimo = index === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Icono del evento */}
                <div className={`absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-${color}-400 to-${color}-600 flex items-center justify-center text-white shadow-lg ${
                  esUltimo ? 'ring-4 ring-' + color + '-200' : ''
                }`}>
                  <Icono className="w-6 h-6" />
                </div>

                {/* Contenido del evento */}
                <div className={`bg-white border-2 ${
                  esUltimo ? 'border-' + color + '-300' : 'border-gray-200'
                } rounded-xl p-4 hover:shadow-lg transition-all`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-lg">
                        {evento.estado.replace('_', ' ').toUpperCase()}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Calendar className="w-4 h-4" />
                        {formatearFecha(evento.fecha)}
                      </div>
                    </div>
                    {esUltimo && (
                      <span className={`px-3 py-1 bg-${color}-100 text-${color}-700 rounded-full text-xs font-medium`}>
                        Actual
                      </span>
                    )}
                  </div>

                  <p className="text-gray-700 mb-3">{evento.descripcion}</p>

                  <div className="flex items-center gap-4 text-sm">
                    {evento.ubicacion && (
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{evento.ubicacion}</span>
                      </div>
                    )}
                    {evento.responsable && (
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>{evento.responsable}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {pedido.historialEnvio.length === 0 && (
        <div className="text-center py-12">
          <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No hay eventos de seguimiento registrados</p>
        </div>
      )}
    </div>
  );
};
