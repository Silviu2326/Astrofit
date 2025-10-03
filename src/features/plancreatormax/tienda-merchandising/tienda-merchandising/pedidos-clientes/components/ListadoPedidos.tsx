import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, Eye, Printer, Download, Mail, MoreVertical,
  ChevronLeft, ChevronRight, CreditCard, Truck, Calendar,
  AlertCircle, CheckCircle, Clock, XCircle, Package, RotateCcw
} from 'lucide-react';
import type { PedidoCompleto, EstadoPedido } from '../pedidosClientesApi';

interface ListadoPedidosProps {
  pedidos: PedidoCompleto[];
  onViewDetail: (pedido: PedidoCompleto) => void;
}

const ListadoPedidos: React.FC<ListadoPedidosProps> = ({ pedidos, onViewDetail }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState<string>('todos');
  const [metodoPagoFilter, setMetodoPagoFilter] = useState<string>('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;

  // Filtrar y buscar pedidos
  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter(pedido => {
      const matchSearch = searchTerm === '' ||
        pedido.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pedido.cliente.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchEstado = estadoFilter === 'todos' || pedido.estado === estadoFilter;
      const matchMetodoPago = metodoPagoFilter === 'todos' || pedido.metodoPago === metodoPagoFilter;

      return matchSearch && matchEstado && matchMetodoPago;
    });
  }, [pedidos, searchTerm, estadoFilter, metodoPagoFilter]);

  // Paginación
  const totalPages = Math.ceil(pedidosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pedidosPaginados = pedidosFiltrados.slice(startIndex, startIndex + itemsPerPage);

  const getEstadoConfig = (estado: EstadoPedido) => {
    const configs = {
      pendiente: { color: 'yellow', icon: Clock, label: 'Pendiente', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
      procesando: { color: 'blue', icon: Package, label: 'Procesando', bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
      enviado: { color: 'purple', icon: Truck, label: 'Enviado', bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
      entregado: { color: 'green', icon: CheckCircle, label: 'Entregado', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
      cancelado: { color: 'red', icon: XCircle, label: 'Cancelado', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
      reembolsado: { color: 'gray', icon: RotateCcw, label: 'Reembolsado', bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' }
    };
    return configs[estado] || configs.pendiente;
  };

  const getMetodoPagoIcon = (metodo: string) => {
    switch (metodo) {
      case 'tarjeta': return '💳';
      case 'paypal': return '🅿️';
      case 'transferencia': return '🏦';
      case 'efectivo': return '💵';
      default: return '💰';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
              Tabla de Pedidos
            </h2>
            <p className="text-gray-600 mt-1">{pedidosFiltrados.length} pedidos encontrados</p>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="mb-6 space-y-4">
          {/* Barra de búsqueda */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por # pedido, cliente, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                showFilters
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'border-2 border-gray-200 text-gray-700 hover:border-cyan-500'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>
          </div>

          {/* Panel de filtros expandible */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Estado del Pedido</label>
                <select
                  value={estadoFilter}
                  onChange={(e) => setEstadoFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-cyan-500 outline-none transition-all duration-300"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="procesando">Procesando</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                  <option value="reembolsado">Reembolsado</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Método de Pago</label>
                <select
                  value={metodoPagoFilter}
                  onChange={(e) => setMetodoPagoFilter(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-cyan-500 outline-none transition-all duration-300"
                >
                  <option value="todos">Todos los métodos</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="paypal">PayPal</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="efectivo">Efectivo</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setEstadoFilter('todos');
                    setMetodoPagoFilter('todos');
                    setSearchTerm('');
                  }}
                  className="w-full px-4 py-2 border-2 border-red-300 text-red-600 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300"
                >
                  Limpiar Filtros
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <tr>
                <th className="px-4 py-4 text-left font-semibold">Pedido</th>
                <th className="px-4 py-4 text-left font-semibold">Cliente</th>
                <th className="px-4 py-4 text-left font-semibold">Items</th>
                <th className="px-4 py-4 text-left font-semibold">Total</th>
                <th className="px-4 py-4 text-left font-semibold">Pago</th>
                <th className="px-4 py-4 text-left font-semibold">Estado</th>
                <th className="px-4 py-4 text-left font-semibold">Envío</th>
                <th className="px-4 py-4 text-center font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pedidosPaginados.map((pedido, index) => {
                const estadoConfig = getEstadoConfig(pedido.estado);
                const EstadoIcon = estadoConfig.icon;

                return (
                  <motion.tr
                    key={pedido.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300 ${
                      pedido.tieneProblemas ? 'bg-red-50/50' : ''
                    }`}
                  >
                    <td className="px-4 py-4">
                      <button
                        onClick={() => onViewDetail(pedido)}
                        className="text-cyan-600 hover:text-cyan-800 font-semibold hover:underline"
                      >
                        {pedido.numero}
                      </button>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(pedido.fecha).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      {pedido.tieneProblemas && (
                        <div className="mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-red-600" />
                          <span className="text-xs text-red-600 font-semibold">{pedido.tipoProblema}</span>
                        </div>
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                          {pedido.cliente.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{pedido.cliente.nombre}</p>
                          <p className="text-xs text-gray-500">{pedido.cliente.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {pedido.items.slice(0, 3).map((item, i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-lg bg-white border-2 border-white shadow flex items-center justify-center text-lg"
                              title={item.nombre}
                            >
                              {item.imagen}
                            </div>
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {pedido.items.length} {pedido.items.length === 1 ? 'producto' : 'productos'}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-lg font-bold text-gray-900">${pedido.total.toFixed(2)}</p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getMetodoPagoIcon(pedido.metodoPago)}</span>
                        <div>
                          <p className="text-sm font-semibold capitalize">{pedido.metodoPago}</p>
                          <span className={`text-xs font-semibold ${
                            pedido.estadoPago === 'pagado' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {pedido.estadoPago === 'pagado' ? '✓ Pagado' : '⏳ Pendiente'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full ${estadoConfig.bg} ${estadoConfig.text} border ${estadoConfig.border}`}>
                        <EstadoIcon className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wide">{estadoConfig.label}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm font-semibold capitalize">{pedido.metodoEnvio}</p>
                        {pedido.carrier && (
                          <p className="text-xs text-gray-500">{pedido.carrier}</p>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onViewDetail(pedido)}
                          className="p-2 bg-cyan-100 text-cyan-600 rounded-lg hover:bg-cyan-200 transition-colors duration-300"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                          title="Más acciones"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, pedidosFiltrados.length)} de {pedidosFiltrados.length}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-500 transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                      : 'border-2 border-gray-200 text-gray-700 hover:border-cyan-500'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:border-cyan-500 transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ListadoPedidos;