import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Search,
  Filter,
  Download,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Truck
} from 'lucide-react';
import { TablaPedidos } from './TablaPedidos';
import { DetallesPedido } from './DetallesPedido';
import { FiltrosPedidos } from './FiltrosPedidos';
import { EstadisticasPedidos } from './EstadisticasPedidos';
import { usePedidos } from '../hooks/usePedidos';
import type { Pedido } from '../types';

export const PedidosClientes: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);

  const { pedidos, estadisticas, filtros, setFiltros, actualizarEstado } = usePedidos();

  const pedidosFiltrados = pedidos.filter(pedido =>
    pedido.numeroPedido.toLowerCase().includes(busqueda.toLowerCase()) ||
    pedido.cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    pedido.cliente.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const tarjetasEstadisticas = [
    {
      titulo: 'Total Pedidos',
      valor: estadisticas.total,
      cambio: '+12%',
      tendenciaPositiva: true,
      icono: Package,
      color: 'from-cyan-500 to-blue-500'
    },
    {
      titulo: 'En Proceso',
      valor: estadisticas.procesando,
      cambio: '+8%',
      tendenciaPositiva: true,
      icono: Clock,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      titulo: 'Enviados',
      valor: estadisticas.enviados,
      cambio: '+15%',
      tendenciaPositiva: true,
      icono: Truck,
      color: 'from-indigo-500 to-purple-500'
    },
    {
      titulo: 'Entregados',
      valor: estadisticas.entregados,
      cambio: '+20%',
      tendenciaPositiva: true,
      icono: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl text-white">
            <Package className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Pedidos de Clientes
            </h1>
            <p className="text-gray-600 mt-1">
              Gestión completa de órdenes y seguimiento de envíos
            </p>
          </div>
        </div>
      </motion.div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {tarjetasEstadisticas.map((tarjeta, index) => (
          <motion.div
            key={tarjeta.titulo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-br ${tarjeta.color} rounded-lg text-white`}>
                <tarjeta.icono className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className={`w-4 h-4 ${
                  tarjeta.tendenciaPositiva ? 'text-green-500' : 'text-red-500'
                }`} />
                <span className={
                  tarjeta.tendenciaPositiva ? 'text-green-600' : 'text-red-600'
                }>
                  {tarjeta.cambio}
                </span>
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{tarjeta.titulo}</h3>
            <p className="text-3xl font-bold text-gray-800">{tarjeta.valor}</p>
          </motion.div>
        ))}
      </div>

      {/* Barra de búsqueda y filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por número de pedido, cliente o email..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                mostrarFiltros
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
              <Download className="w-5 h-5" />
              Exportar
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mostrarFiltros && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <FiltrosPedidos filtros={filtros} onChange={setFiltros} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tabla de pedidos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <TablaPedidos
          pedidos={pedidosFiltrados}
          onSeleccionar={setPedidoSeleccionado}
          onActualizarEstado={actualizarEstado}
        />
      </motion.div>

      {/* Modal de detalles */}
      <AnimatePresence>
        {pedidoSeleccionado && (
          <DetallesPedido
            pedido={pedidoSeleccionado}
            onCerrar={() => setPedidoSeleccionado(null)}
            onActualizarEstado={actualizarEstado}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
