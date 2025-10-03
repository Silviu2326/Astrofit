import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X, Package, Calendar, User, Mail, Phone, MapPin, CreditCard,
  Truck, FileText, Printer, Download, Copy, CheckCircle, Clock,
  AlertCircle, XCircle, RotateCcw, ExternalLink, MessageCircle
} from 'lucide-react';
import type { PedidoCompleto, EstadoPedido } from '../pedidosClientesApi';
import { updateEstadoPedido, requestDevolucion, sendNotificacionCliente } from '../pedidosClientesApi';

interface DetallePedidoProps {
  pedido: PedidoCompleto;
  onClose: () => void;
}

const DetallePedido: React.FC<DetallePedidoProps> = ({ pedido, onClose }) => {
  const [activeTab, setActiveTab] = useState<'detalles' | 'timeline' | 'comunicacion'>('detalles');
  const [showUpdateEstado, setShowUpdateEstado] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState<EstadoPedido>(pedido.estado);
  const [notaEstado, setNotaEstado] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const getEstadoConfig = (estado: EstadoPedido) => {
    const configs = {
      pendiente: { color: 'yellow', icon: Clock, label: 'Pendiente', gradient: 'from-yellow-500 to-orange-500' },
      procesando: { color: 'blue', icon: Package, label: 'Procesando', gradient: 'from-blue-500 to-indigo-500' },
      enviado: { color: 'purple', icon: Truck, label: 'Enviado', gradient: 'from-purple-500 to-pink-500' },
      entregado: { color: 'green', icon: CheckCircle, label: 'Entregado', gradient: 'from-green-500 to-emerald-500' },
      cancelado: { color: 'red', icon: XCircle, label: 'Cancelado', gradient: 'from-red-500 to-orange-500' },
      reembolsado: { color: 'gray', icon: RotateCcw, label: 'Reembolsado', gradient: 'from-gray-500 to-slate-500' }
    };
    return configs[estado] || configs.pendiente;
  };

  const estadoConfig = getEstadoConfig(pedido.estado);
  const EstadoIcon = estadoConfig.icon;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUpdateEstado = async () => {
    await updateEstadoPedido(pedido.id, nuevoEstado, notaEstado);
    setShowUpdateEstado(false);
    // Aquí podrías recargar el pedido o actualizar el estado local
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* HEADER */}
        <div className={`relative overflow-hidden bg-gradient-to-r ${estadoConfig.gradient} p-6`}>
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <EstadoIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Pedido {pedido.numero}</h2>
                <p className="text-white/90 flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(pedido.fecha).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30`}>
                <span className="text-sm font-bold text-white uppercase tracking-wide">{estadoConfig.label}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Acciones rápidas */}
          <div className="mt-6 flex gap-3 relative z-10">
            <button
              onClick={() => setShowUpdateEstado(!showUpdateEstado)}
              className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Actualizar Estado
            </button>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Imprimir Factura
            </button>
            <button className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Etiqueta Envío
            </button>
          </div>
        </div>

        {/* Panel de actualización de estado */}
        {showUpdateEstado && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 border-b border-cyan-200"
          >
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nuevo Estado</label>
                <select
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value as EstadoPedido)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-cyan-500 outline-none"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="procesando">Procesando</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                  <option value="reembolsado">Reembolsado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nota Interna (Opcional)</label>
                <input
                  type="text"
                  value={notaEstado}
                  onChange={(e) => setNotaEstado(e.target.value)}
                  placeholder="Agregar nota..."
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-cyan-500 outline-none"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleUpdateEstado}
                  className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Actualizar y Notificar Cliente
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TABS */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-6">
          {[
            { id: 'detalles', label: 'Detalles del Pedido', icon: Package },
            { id: 'timeline', label: 'Timeline de Estado', icon: Clock },
            { id: 'comunicacion', label: 'Comunicación', icon: MessageCircle }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 font-semibold transition-all duration-300 flex items-center gap-2 border-b-2 ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENIDO */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-300px)]">
          {activeTab === 'detalles' && (
            <div className="space-y-6">
              {/* Grid de 2 columnas */}
              <div className="grid grid-cols-2 gap-6">
                {/* INFORMACIÓN DEL CLIENTE */}
                <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-6 border border-cyan-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Información del Cliente</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {pedido.cliente.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{pedido.cliente.nombre}</p>
                          <p className="text-sm text-gray-500">Cliente</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{pedido.cliente.email}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(pedido.cliente.email, 'email')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        {copiedField === 'email' ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>

                    <div className="p-3 bg-white rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">{pedido.cliente.telefono}</span>
                      </div>
                      <button className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm font-semibold hover:bg-green-200 transition-colors">
                        Llamar
                      </button>
                    </div>
                  </div>
                </div>

                {/* DIRECCIÓN DE ENVÍO */}
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Dirección de Envío</h3>
                  </div>

                  <div className="p-4 bg-white rounded-xl">
                    <p className="font-semibold text-gray-900 mb-2">{pedido.direccionEnvio.calle}</p>
                    <p className="text-gray-700">{pedido.direccionEnvio.ciudad}, {pedido.direccionEnvio.estado}</p>
                    <p className="text-gray-700">CP: {pedido.direccionEnvio.codigoPostal}</p>
                    <p className="text-gray-700 font-semibold mt-2">{pedido.direccionEnvio.pais}</p>

                    {pedido.notaCliente && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                        <p className="text-sm font-semibold text-yellow-800 mb-1">Nota del Cliente:</p>
                        <p className="text-sm text-yellow-700">{pedido.notaCliente}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ITEMS DEL PEDIDO */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-6 h-6 text-cyan-600" />
                  Items del Pedido
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Producto</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">SKU</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Variante</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Cantidad</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Precio Unit.</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pedido.items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                                {item.imagen}
                              </div>
                              <span className="font-semibold text-gray-900">{item.nombre}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-gray-600 font-mono text-sm">{item.sku}</td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 bg-gray-100 rounded text-sm font-semibold text-gray-700">
                              {item.variante}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right font-semibold text-gray-900">{item.cantidad}</td>
                          <td className="px-4 py-4 text-right text-gray-700">${item.precioUnitario.toFixed(2)}</td>
                          <td className="px-4 py-4 text-right font-bold text-gray-900">${item.subtotal.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* TOTALES */}
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="max-w-md ml-auto space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal:</span>
                      <span className="font-semibold">${pedido.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Envío:</span>
                      <span className="font-semibold">${pedido.envio.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Impuestos (21%):</span>
                      <span className="font-semibold">${pedido.impuestos.toFixed(2)}</span>
                    </div>
                    {pedido.descuento > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Descuento:</span>
                        <span className="font-semibold">-${pedido.descuento.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-2xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                      <span>TOTAL:</span>
                      <span className="text-cyan-600">${pedido.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid de Información de Pago y Envío */}
              <div className="grid grid-cols-2 gap-6">
                {/* INFORMACIÓN DE PAGO */}
                <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-6 border border-green-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Información de Pago</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-xl flex justify-between">
                      <span className="text-gray-600">Método:</span>
                      <span className="font-bold capitalize">{pedido.metodoPago}</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl flex justify-between">
                      <span className="text-gray-600">Estado:</span>
                      <span className={`font-bold ${pedido.estadoPago === 'pagado' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {pedido.estadoPago === 'pagado' ? '✓ Pagado' : '⏳ Pendiente'}
                      </span>
                    </div>
                    {pedido.idTransaccion && (
                      <div className="p-3 bg-white rounded-xl">
                        <p className="text-sm text-gray-600 mb-1">ID Transacción:</p>
                        <p className="font-mono text-xs text-gray-800">{pedido.idTransaccion}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* INFORMACIÓN DE ENVÍO */}
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 border border-purple-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Información de Envío</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-xl flex justify-between">
                      <span className="text-gray-600">Método:</span>
                      <span className="font-bold capitalize">{pedido.metodoEnvio}</span>
                    </div>
                    {pedido.carrier && (
                      <div className="p-3 bg-white rounded-xl flex justify-between">
                        <span className="text-gray-600">Transportista:</span>
                        <span className="font-bold">{pedido.carrier}</span>
                      </div>
                    )}
                    {pedido.trackingNumber && (
                      <div className="p-3 bg-white rounded-xl">
                        <p className="text-sm text-gray-600 mb-2">Número de Tracking:</p>
                        <div className="flex items-center justify-between">
                          <p className="font-mono text-sm text-gray-800">{pedido.trackingNumber}</p>
                          <button className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg text-sm font-semibold hover:bg-purple-200 transition-colors flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            Rastrear
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {pedido.timeline.map((evento, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 mb-8 relative"
                  >
                    {/* Línea vertical */}
                    {index < pedido.timeline.length - 1 && (
                      <div className="absolute left-[23px] top-12 w-0.5 h-full bg-gradient-to-b from-cyan-300 to-transparent"></div>
                    )}

                    {/* Icono */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg relative z-10">
                      <CheckCircle className="w-6 h-6" />
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-gray-900">{evento.estado}</h4>
                        <span className="text-sm text-gray-500">
                          {new Date(evento.fecha).toLocaleString('es-ES', {
                            day: '2-digit',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700">{evento.descripcion}</p>
                      {evento.usuario && (
                        <p className="text-sm text-gray-500 mt-2">Por: {evento.usuario}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'comunicacion' && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-white to-cyan-50 rounded-2xl p-6 border border-cyan-100 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Enviar Mensaje al Cliente</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Plantilla</label>
                    <select className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-cyan-500 outline-none">
                      <option>Seleccionar plantilla...</option>
                      <option>Confirmación de pedido</option>
                      <option>Actualización de envío</option>
                      <option>Solicitud de review</option>
                      <option>Disculpa por retraso</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-cyan-500 outline-none h-32"
                      placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <Mail className="w-5 h-5" />
                      Enviar Email
                    </button>
                    <button className="flex-1 px-6 py-3 border-2 border-green-500 text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Enviar SMS
                    </button>
                  </div>
                </div>
              </div>

              {/* Historial de comunicación (placeholder) */}
              <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Historial de Comunicación</h3>
                <p className="text-gray-500 text-center py-8">No hay mensajes previos con este cliente</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetallePedido;
