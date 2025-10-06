import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  MessageSquare,
  Calendar,
  FileText,
  Download,
  Printer,
  Mail
} from 'lucide-react';
import type { Pedido, EstadoPedido } from '../types';
import { TimelineEnvio } from './TimelineEnvio';
import { ChatCliente } from './ChatCliente';

interface DetallesPedidoProps {
  pedido: Pedido;
  onCerrar: () => void;
  onActualizarEstado: (pedidoId: string, nuevoEstado: EstadoPedido) => void;
}

export const DetallesPedido: React.FC<DetallesPedidoProps> = ({
  pedido,
  onCerrar,
  onActualizarEstado
}) => {
  const [tabActiva, setTabActiva] = useState<'detalles' | 'envio' | 'mensajes'>('detalles');

  const formatearFecha = (fecha: Date) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatearMoneda = (cantidad: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(cantidad);
  };

  const tabs = [
    { id: 'detalles' as const, label: 'Detalles', icono: FileText },
    { id: 'envio' as const, label: 'Seguimiento', icono: Truck },
    { id: 'mensajes' as const, label: 'Mensajes', icono: MessageSquare, badge: pedido.mensajes.filter(m => !m.leido && m.remitente === 'cliente').length }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCerrar}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Package className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Pedido {pedido.numeroPedido}</h2>
                <p className="text-blue-100">
                  Realizado el {formatearFecha(pedido.fechaPedido)}
                </p>
              </div>
            </div>
            <button
              onClick={onCerrar}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTabActiva(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  tabActiva === tab.id
                    ? 'bg-white text-blue-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <tab.icono className="w-4 h-4" />
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tabActiva === 'detalles' && (
            <div className="space-y-6">
              {/* Información del cliente */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Información del Cliente
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Nombre</p>
                    <p className="font-medium text-gray-900">{pedido.cliente.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{pedido.cliente.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Teléfono</p>
                    <p className="font-medium text-gray-900">{pedido.cliente.telefono}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Método de pago</p>
                    <p className="font-medium text-gray-900">{pedido.metodoPago}</p>
                  </div>
                </div>
              </div>

              {/* Dirección de envío */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Dirección de Envío
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900">{pedido.direccionEnvio.nombre}</p>
                  <p className="text-gray-700">{pedido.direccionEnvio.direccion}</p>
                  <p className="text-gray-700">
                    {pedido.direccionEnvio.codigoPostal} - {pedido.direccionEnvio.ciudad}
                  </p>
                  <p className="text-gray-700">{pedido.direccionEnvio.pais}</p>
                  <p className="text-gray-700">Tel: {pedido.direccionEnvio.telefono}</p>
                  {pedido.direccionEnvio.notas && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Notas:</span> {pedido.direccionEnvio.notas}
                    </p>
                  )}
                </div>
              </div>

              {/* Productos */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Productos ({pedido.productos.length})
                  </h3>
                </div>
                <div className="space-y-4">
                  {pedido.productos.map((producto) => (
                    <div
                      key={producto.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      {producto.imagen && (
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{producto.nombre}</h4>
                        <p className="text-sm text-gray-600">SKU: {producto.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {producto.cantidad} x {formatearMoneda(producto.precioUnitario)}
                        </p>
                        <p className="font-semibold text-gray-900">
                          {formatearMoneda(producto.subtotal)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumen de pago */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>{formatearMoneda(pedido.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Envío:</span>
                    <span>{formatearMoneda(pedido.envio)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Impuestos:</span>
                    <span>{formatearMoneda(pedido.impuestos)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-300">
                    <span>Total:</span>
                    <span>{formatearMoneda(pedido.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tabActiva === 'envio' && (
            <TimelineEnvio
              pedido={pedido}
              onActualizarEstado={onActualizarEstado}
            />
          )}

          {tabActiva === 'mensajes' && (
            <ChatCliente pedido={pedido} />
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                Descargar PDF
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Printer className="w-4 h-4" />
                Imprimir
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-4 h-4" />
                Enviar por email
              </button>
            </div>
            <button
              onClick={onCerrar}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
