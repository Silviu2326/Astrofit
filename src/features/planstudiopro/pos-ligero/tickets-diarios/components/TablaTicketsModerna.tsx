import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, Eye, Download, DollarSign,
  CreditCard, Banknote, Smartphone, CheckCircle,
  XCircle, AlertCircle, ChevronLeft, ChevronRight
} from 'lucide-react';

interface Ticket {
  id: string;
  numeroTicket: string;
  hora: string;
  cliente: string;
  cantidadItems: number;
  total: number;
  metodoPago: 'efectivo' | 'tarjeta' | 'transferencia' | 'credito';
  cajero: string;
  estado: 'completada' | 'reembolsada' | 'parcial';
}

interface TablaTicketsModernaProps {
  tickets: Ticket[];
  onSeleccionarTicket: (ticket: Ticket) => void;
  onToggleFiltros: () => void;
}

const ITEMS_POR_PAGINA = 10;

const TablaTicketsModerna: React.FC<TablaTicketsModernaProps> = ({
  tickets,
  onSeleccionarTicket,
  onToggleFiltros,
}) => {
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);

  // Filtrar tickets por búsqueda
  const ticketsFiltrados = tickets.filter(ticket =>
    ticket.numeroTicket.toLowerCase().includes(busqueda.toLowerCase()) ||
    ticket.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
    ticket.cajero.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Paginación
  const totalPaginas = Math.ceil(ticketsFiltrados.length / ITEMS_POR_PAGINA);
  const indiceInicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const ticketsPaginados = ticketsFiltrados.slice(indiceInicio, indiceInicio + ITEMS_POR_PAGINA);

  // Iconos de métodos de pago
  const getIconoMetodoPago = (metodo: string) => {
    switch (metodo) {
      case 'efectivo': return <Banknote className="w-5 h-5 text-green-600" />;
      case 'tarjeta': return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'transferencia': return <DollarSign className="w-5 h-5 text-purple-600" />;
      case 'credito': return <Smartphone className="w-5 h-5 text-orange-600" />;
      default: return null;
    }
  };

  // Badge de estado
  const getBadgeEstado = (estado: string) => {
    switch (estado) {
      case 'completada':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-xs font-bold text-green-700">Completada</span>
          </div>
        );
      case 'reembolsada':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
            <XCircle className="w-4 h-4 text-red-600" />
            <span className="text-xs font-bold text-red-700">Reembolsada</span>
          </div>
        );
      case 'parcial':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-bold text-orange-700">Parcial</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
      {/* Header con búsqueda y filtros */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Búsqueda rápida */}
          <div className="flex-1 w-full md:max-w-md relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1);
              }}
              placeholder="Buscar por ticket, cliente o cajero..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 text-white placeholder-white/60 focus:border-white focus:ring-4 focus:ring-white/20 transition-all duration-300 outline-none"
            />
          </div>

          {/* Botón de filtros avanzados */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleFiltros}
            className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-xl border-2 border-white/30 text-white font-semibold hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filtros Avanzados
          </motion.button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                # Ticket
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Hora
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                Método de Pago
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Cajero
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {ticketsPaginados.map((ticket, index) => (
              <motion.tr
                key={ticket.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 border-b border-gray-100 group"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-indigo-600">
                    #{ticket.numeroTicket}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">
                    {ticket.hora}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {ticket.cliente}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="inline-flex items-center justify-center px-2.5 py-1 bg-purple-50 rounded-lg">
                    <span className="text-sm font-bold text-purple-700">
                      {ticket.cantidadItems}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-gray-900">
                    ${ticket.total.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    {getIconoMetodoPago(ticket.metodoPago)}
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {ticket.metodoPago}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">
                    {ticket.cajero}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    {getBadgeEstado(ticket.estado)}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onSeleccionarTicket(ticket)}
                      className="p-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200 group/btn"
                      title="Ver detalles"
                    >
                      <Eye className="w-5 h-5 text-indigo-600 group-hover/btn:text-indigo-700" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200 group/btn"
                      title="Descargar PDF"
                    >
                      <Download className="w-5 h-5 text-purple-600 group-hover/btn:text-purple-700" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {ticketsPaginados.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-lg">No se encontraron tickets</p>
          </div>
        )}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-bold">{indiceInicio + 1}</span> - <span className="font-bold">{Math.min(indiceInicio + ITEMS_POR_PAGINA, ticketsFiltrados.length)}</span> de <span className="font-bold">{ticketsFiltrados.length}</span> tickets
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPaginaActual(prev => Math.max(1, prev - 1))}
              disabled={paginaActual === 1}
              className="p-2 rounded-lg bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </motion.button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(pagina => (
                <motion.button
                  key={pagina}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPaginaActual(pagina)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                    paginaActual === pagina
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-300 hover:bg-indigo-50'
                  }`}
                >
                  {pagina}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPaginaActual(prev => Math.min(totalPaginas, prev + 1))}
              disabled={paginaActual === totalPaginas}
              className="p-2 rounded-lg bg-white border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaTicketsModerna;
