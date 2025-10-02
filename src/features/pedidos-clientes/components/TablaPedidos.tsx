import React from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import type { Pedido, EstadoPedido } from '../types';

interface TablaPedidosProps {
  pedidos: Pedido[];
  onSeleccionar: (pedido: Pedido) => void;
  onActualizarEstado: (pedidoId: string, nuevoEstado: EstadoPedido) => void;
}

export const TablaPedidos: React.FC<TablaPedidosProps> = ({
  pedidos,
  onSeleccionar,
  onActualizarEstado
}) => {
  const obtenerIconoEstado = (estado: EstadoPedido) => {
    switch (estado) {
      case 'pendiente':
        return <Clock className="w-4 h-4" />;
      case 'procesando':
        return <Package className="w-4 h-4" />;
      case 'enviado':
      case 'en_transito':
        return <Truck className="w-4 h-4" />;
      case 'entregado':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelado':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const obtenerColorEstado = (estado: EstadoPedido) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'procesando':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'enviado':
      case 'en_transito':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'entregado':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelado':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const obtenerColorPrioridad = (prioridad: string) => {
    switch (prioridad) {
      case 'urgente':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'alta':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'normal':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'baja':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatearFecha = (fecha: Date) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatearMoneda = (cantidad: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(cantidad);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-cyan-50 to-blue-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Pedido
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Prioridad
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pedidos.map((pedido, index) => (
            <motion.tr
              key={pedido.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onSeleccionar(pedido)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {pedido.numeroPedido}
                    </div>
                    <div className="text-sm text-gray-500">
                      {pedido.productos.length} producto{pedido.productos.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  {pedido.cliente.avatar ? (
                    <img
                      src={pedido.cliente.avatar}
                      alt={pedido.cliente.nombre}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {pedido.cliente.nombre.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">
                      {pedido.cliente.nombre}
                    </div>
                    <div className="text-sm text-gray-500">
                      {pedido.cliente.email}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatearFecha(pedido.fechaPedido)}
                </div>
                {pedido.fechaEstimadaEntrega && (
                  <div className="text-xs text-gray-500 mt-1">
                    Entrega: {formatearFecha(pedido.fechaEstimadaEntrega)}
                  </div>
                )}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-semibold text-gray-900">
                  {formatearMoneda(pedido.total)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {pedido.metodoPago}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${obtenerColorEstado(pedido.estado)}`}>
                  {obtenerIconoEstado(pedido.estado)}
                  {pedido.estado.replace('_', ' ')}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${obtenerColorPrioridad(pedido.prioridad)}`}>
                  {pedido.prioridad}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSeleccionar(pedido);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  {pedido.mensajes.length > 0 && (
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSeleccionar(pedido);
                        }}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Ver mensajes"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </button>
                      {pedido.mensajes.some(m => !m.leido && m.remitente === 'cliente') && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {pedidos.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No se encontraron pedidos</p>
        </div>
      )}
    </div>
  );
};
