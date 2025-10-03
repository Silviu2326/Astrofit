import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, Clock, DollarSign, TrendingUp, Search, Filter,
  Eye, Printer, Download, Mail, Phone, MapPin, CreditCard,
  Truck, CheckCircle, AlertCircle, XCircle, ChevronDown,
  MoreVertical, Calendar, User, ShoppingBag, ArrowUpRight,
  FileText, RotateCcw, Ban
} from 'lucide-react';
import { getPedidos, type PedidoCompleto } from './pedidosClientesApi';
import ListadoPedidos from './components/ListadoPedidos';
import DetallePedido from './components/DetallePedido';

const PedidosClientesPage: React.FC = () => {
  const [pedidos, setPedidos] = useState<PedidoCompleto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPedido, setSelectedPedido] = useState<PedidoCompleto | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState<string>('todos');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await getPedidos();
        setPedidos(data);
      } catch (error) {
        console.error('Error al cargar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  // Estadísticas calculadas
  const stats = {
    pendientes: pedidos.filter(p => p.estado === 'pendiente').length,
    enProceso: pedidos.filter(p => ['procesando', 'enviado'].includes(p.estado)).length,
    revenueHoy: pedidos
      .filter(p => new Date(p.fecha).toDateString() === new Date().toDateString())
      .reduce((sum, p) => sum + p.total, 0),
    tiempoPromedio: '2.5 días'
  };

  const handleViewDetail = (pedido: PedidoCompleto) => {
    setSelectedPedido(pedido);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
      >
        {/* Efectos de fondo animados */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Package className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Pedidos</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl leading-relaxed">
            Procesa y entrega con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">eficiencia</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Sistema Activo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Package className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">{pedidos.length} Pedidos Totales</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Pedidos Pendientes', value: stats.pendientes, icon: Clock, gradient: 'from-yellow-500 to-orange-500', change: '+5', color: 'yellow' },
          { title: 'Pedidos en Proceso', value: stats.enProceso, icon: Truck, gradient: 'from-blue-500 to-indigo-500', change: '+8', color: 'blue' },
          { title: 'Revenue Hoy', value: `$${stats.revenueHoy.toLocaleString()}`, icon: DollarSign, gradient: 'from-green-500 to-emerald-500', change: '+12', color: 'green' },
          { title: 'Tiempo Promedio', value: stats.tiempoPromedio, icon: TrendingUp, gradient: 'from-purple-500 to-pink-500', change: '-10', color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Título */}
              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              {/* Valor */}
              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2">
                <div className={`p-1 bg-${stat.color}-50 rounded-lg`}>
                  <ArrowUpRight className={`w-4 h-4 text-${stat.color}-600`} />
                </div>
                <span className={`text-sm font-bold text-${stat.color}-600`}>{stat.change}%</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* TABLA DE PEDIDOS */}
      <ListadoPedidos
        pedidos={pedidos}
        onViewDetail={handleViewDetail}
      />

      {/* MODAL DE DETALLE */}
      <AnimatePresence>
        {showDetailModal && selectedPedido && (
          <DetallePedido
            pedido={selectedPedido}
            onClose={() => setShowDetailModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PedidosClientesPage;
