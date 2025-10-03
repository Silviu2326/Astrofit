import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, User, Calendar, Clock, ShoppingBag, DollarSign,
  CreditCard, Printer, FileText, Mail, RotateCcw,
  CheckCircle, Minus, Plus, Tag
} from 'lucide-react';

interface ItemTicket {
  id: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  precioUnitario: number;
  descuento?: number;
  subtotal: number;
}

interface EventoTicket {
  id: string;
  tipo: string;
  descripcion: string;
  usuario: string;
  hora: string;
}

interface Ticket {
  id: string;
  numeroTicket: string;
  fecha: string;
  hora: string;
  cliente: string;
  clienteEmail?: string;
  clienteTelefono?: string;
  items: ItemTicket[];
  subtotal: number;
  descuentoTotal: number;
  impuestos: number;
  total: number;
  metodoPago: string;
  cajero: string;
  estado: 'completada' | 'reembolsada' | 'parcial';
  notas?: string;
  eventos?: EventoTicket[];
}

interface ModalDetalleTicketProps {
  ticket: Ticket | null;
  onCerrar: () => void;
}

const ModalDetalleTicket: React.FC<ModalDetalleTicketProps> = ({ ticket, onCerrar }) => {
  if (!ticket) return null;

  const getBadgeEstado = (estado: string) => {
    switch (estado) {
      case 'completada':
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-bold text-green-700">Completada</span>
          </div>
        );
      case 'reembolsada':
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full">
            <RotateCcw className="w-5 h-5 text-red-600" />
            <span className="text-sm font-bold text-red-700">Reembolsada</span>
          </div>
        );
      case 'parcial':
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full">
            <Minus className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-bold text-orange-700">Parcial</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
            {/* Pattern de fondo */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Ticket #{ticket.numeroTicket}
                  </h2>
                  <p className="text-blue-100 mt-1">Detalles completos de la venta</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {getBadgeEstado(ticket.estado)}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onCerrar}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Contenido con scroll */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Información del cliente y fecha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cliente */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-xl">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Información del Cliente</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-900 font-semibold">{ticket.cliente}</p>
                  {ticket.clienteEmail && (
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {ticket.clienteEmail}
                    </p>
                  )}
                  {ticket.clienteTelefono && (
                    <p className="text-sm text-gray-600">{ticket.clienteTelefono}</p>
                  )}
                </div>
              </div>

              {/* Fecha y hora */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500 rounded-xl">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Fecha y Hora</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-900 font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    {ticket.fecha}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    {ticket.hora}
                  </p>
                  <p className="text-sm text-gray-600">Cajero: <span className="font-semibold">{ticket.cajero}</span></p>
                </div>
              </div>
            </div>

            {/* Tabla de items */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-indigo-600" />
                <h3 className="text-lg font-bold text-gray-900">Items Comprados</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Producto</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Categoría</th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase">Cantidad</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Precio Unit.</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Descuento</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticket.items.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t border-gray-100 hover:bg-indigo-50/30 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">{item.nombre}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-50 rounded-lg w-fit">
                            <Tag className="w-3.5 h-3.5 text-purple-600" />
                            <span className="text-xs font-medium text-purple-700">{item.categoria}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center px-3 py-1 bg-indigo-50 rounded-lg text-sm font-bold text-indigo-700">
                            {item.cantidad}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm text-gray-700">${item.precioUnitario.toFixed(2)}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm text-red-600 font-medium">
                            {item.descuento ? `-$${item.descuento.toFixed(2)}` : '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-bold text-gray-900">${item.subtotal.toFixed(2)}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cálculo de totales */}
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Resumen de Pago</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="text-lg font-semibold text-gray-900">${ticket.subtotal.toFixed(2)}</span>
                </div>
                {ticket.descuentoTotal > 0 && (
                  <div className="flex justify-between items-center py-2 border-t border-indigo-100">
                    <span className="text-gray-700">Descuentos:</span>
                    <span className="text-lg font-semibold text-red-600">-${ticket.descuentoTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 border-t border-indigo-100">
                  <span className="text-gray-700">Impuestos:</span>
                  <span className="text-lg font-semibold text-gray-900">${ticket.impuestos.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-t-2 border-indigo-200">
                  <span className="text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    ${ticket.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Método de pago: <span className="font-bold text-gray-900 capitalize">{ticket.metodoPago}</span></span>
                </div>
              </div>
            </div>

            {/* Timeline de eventos */}
            {ticket.eventos && ticket.eventos.length > 0 && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  Timeline de Eventos
                </h3>
                <div className="space-y-3">
                  {ticket.eventos.map((evento, index) => (
                    <motion.div
                      key={evento.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-indigo-50/50 transition-colors duration-200"
                    >
                      <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{evento.descripcion}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {evento.usuario} • {evento.hora}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Notas */}
            {ticket.notas && (
              <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Notas</h3>
                <p className="text-gray-700 leading-relaxed">{ticket.notas}</p>
              </div>
            )}
          </div>

          {/* Footer con acciones */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-3 justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 flex items-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Reimprimir
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 flex items-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Descargar PDF
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Enviar Email
              </motion.button>

              {ticket.estado === 'completada' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reembolsar
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ModalDetalleTicket;
