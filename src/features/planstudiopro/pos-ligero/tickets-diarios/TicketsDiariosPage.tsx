import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Receipt, TrendingUp, DollarSign, RefreshCcw, Users,
  CreditCard, Clock, Filter, Download, Search, ChevronDown,
  BarChart3, PieChart, TrendingDown, FileText, Settings
} from 'lucide-react';
import {
  useTicketsDiarios,
  calcularEstadisticas,
  calcularVentasPorHora,
  calcularVentasPorMetodoPago,
  calcularRendimientoCajeros,
  calcularProductosMasVendidos,
  Ticket
} from './ticketsDiariosApi';

// Componentes mejorados
import TablaTicketsModerna from './components/TablaTicketsModerna';
import ModalDetalleTicket from './components/ModalDetalleTicket';
import FiltrosAvanzados from './components/FiltrosAvanzados';
import GraficoVentasPorHora from './components/GraficoVentasPorHora';
import AnalisisPorMetodoPago from './components/AnalisisPorMetodoPago';
import AnalisisPorCajero from './components/AnalisisPorCajero';
import ProductosMasVendidos from './components/ProductosMasVendidos';

const TicketsDiariosPage: React.FC = () => {
  const { tickets, loading } = useTicketsDiarios();
  const [ticketSeleccionado, setTicketSeleccionado] = useState<Ticket | null>(null);
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [ticketsFiltrados, setTicketsFiltrados] = useState<Ticket[]>(tickets);

  // Calcular todas las estadísticas
  const estadisticas = useMemo(() => calcularEstadisticas(ticketsFiltrados || tickets), [ticketsFiltrados, tickets]);
  const ventasPorHora = useMemo(() => calcularVentasPorHora(ticketsFiltrados || tickets), [ticketsFiltrados, tickets]);
  const ventasPorMetodo = useMemo(() => calcularVentasPorMetodoPago(ticketsFiltrados || tickets), [ticketsFiltrados, tickets]);
  const rendimientoCajeros = useMemo(() => calcularRendimientoCajeros(ticketsFiltrados || tickets), [ticketsFiltrados, tickets]);
  const productosMasVendidos = useMemo(() => calcularProductosMasVendidos(ticketsFiltrados || tickets), [ticketsFiltrados, tickets]);

  React.useEffect(() => {
    if (!loading) {
      setTicketsFiltrados(tickets);
    }
  }, [tickets, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Cargando tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pb-12">
      {/* ==================== HERO SECTION ==================== */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Receipt className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Tickets del <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Día</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Registro completo de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">transacciones</span> del día
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Clock className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Actualizado en tiempo real</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">{estadisticas.numeroTickets} tickets procesados</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==================== ESTADÍSTICAS DEL DÍA ==================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Vendido */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            {/* Icono */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="w-8 h-8" />
            </div>

            {/* Título */}
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Total Vendido
            </p>

            {/* Valor */}
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              €{estadisticas.totalVendido.toFixed(2)}
            </p>

            {/* Cambio */}
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">
                +{((estadisticas.totalVendido - estadisticas.comparativoAyer.totalVendido) / estadisticas.comparativoAyer.totalVendido * 100).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500 font-medium">vs ayer</span>
            </div>
          </div>
        </motion.div>

        {/* Número de Tickets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Receipt className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Número de Tickets
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {estadisticas.numeroTickets}
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-blue-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-bold text-blue-600">
                +{estadisticas.numeroTickets - estadisticas.comparativoAyer.numeroTickets}
              </span>
              <span className="text-xs text-gray-500 font-medium">vs ayer</span>
            </div>
          </div>
        </motion.div>

        {/* Ticket Promedio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Ticket Promedio
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              €{estadisticas.ticketPromedio.toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-purple-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-bold text-purple-600">
                +{((estadisticas.ticketPromedio - estadisticas.comparativoAyer.ticketPromedio) / estadisticas.comparativoAyer.ticketPromedio * 100).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500 font-medium">vs ayer</span>
            </div>
          </div>
        </motion.div>

        {/* Reembolsos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-red-500 to-orange-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <RefreshCcw className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
              Reembolsos del Día
            </p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              €{estadisticas.reembolsos.toFixed(2)}
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-red-50 rounded-lg">
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-sm font-bold text-red-600">
                {((estadisticas.reembolsos / estadisticas.totalVendido) * 100).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500 font-medium">del total</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ==================== TABLA DE TICKETS ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-8"
      >
        <TablaTicketsModerna
          tickets={ticketsFiltrados}
          onSeleccionarTicket={setTicketSeleccionado}
          onToggleFiltros={() => setFiltrosAbiertos(!filtrosAbiertos)}
        />
      </motion.div>

      {/* ==================== ANÁLISIS Y GRÁFICOS ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Ventas por Hora */}
        <GraficoVentasPorHora datos={ventasPorHora} />

        {/* Métodos de Pago */}
        <AnalisisPorMetodoPago datos={ventasPorMetodo} />
      </div>

      {/* ==================== ANÁLISIS POR CAJERO Y PRODUCTOS ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Análisis por Cajero */}
        <AnalisisPorCajero datos={rendimientoCajeros} />

        {/* Productos Más Vendidos */}
        <ProductosMasVendidos datos={productosMasVendidos} />
      </div>

      {/* ==================== MODAL DETALLE TICKET ==================== */}
      {ticketSeleccionado && (
        <ModalDetalleTicket
          ticket={ticketSeleccionado}
          onCerrar={() => setTicketSeleccionado(null)}
        />
      )}

      {/* ==================== PANEL FILTROS ==================== */}
      {filtrosAbiertos && (
        <FiltrosAvanzados
          tickets={tickets}
          onFiltrar={setTicketsFiltrados}
          onCerrar={() => setFiltrosAbiertos(false)}
        />
      )}
    </div>
  );
};

export default TicketsDiariosPage;
