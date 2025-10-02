import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Table, Filter, Download, Eye, CheckCircle, XCircle, RotateCcw, Search,
  ChevronLeft, ChevronRight, Calendar, DollarSign, User
} from 'lucide-react';
import { mockComisiones, Comision } from '../mockData';

const TablaComisiones: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState<string>('todos');
  const [tierFilter, setTierFilter] = useState<string>('todos');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [montoMin, setMontoMin] = useState('');
  const [montoMax, setMontoMax] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrar comisiones
  const comisionesFiltradas = useMemo(() => {
    return mockComisiones.filter(comision => {
      // Búsqueda por texto
      if (searchTerm) {
        const search = searchTerm.toLowerCase();
        const matchText =
          comision.id.toLowerCase().includes(search) ||
          comision.afiliadoNombre.toLowerCase().includes(search) ||
          comision.clienteReferido.toLowerCase().includes(search) ||
          comision.productoVendido.toLowerCase().includes(search);
        if (!matchText) return false;
      }

      // Filtro por estado
      if (estadoFilter !== 'todos' && comision.estado !== estadoFilter) {
        return false;
      }

      // Filtro por tier
      if (tierFilter !== 'todos' && comision.tier !== tierFilter) {
        return false;
      }

      // Filtro por fecha
      if (fechaDesde && comision.fechaVenta < fechaDesde) return false;
      if (fechaHasta && comision.fechaVenta > fechaHasta) return false;

      // Filtro por monto
      if (montoMin && comision.montoComision < parseFloat(montoMin)) return false;
      if (montoMax && comision.montoComision > parseFloat(montoMax)) return false;

      return true;
    });
  }, [searchTerm, estadoFilter, tierFilter, fechaDesde, fechaHasta, montoMin, montoMax]);

  // Paginación
  const totalPages = Math.ceil(comisionesFiltradas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const comisionesPaginadas = comisionesFiltradas.slice(startIndex, startIndex + itemsPerPage);

  // Función para exportar a CSV
  const exportarCSV = () => {
    const headers = [
      'ID', 'Afiliado', 'Fecha Venta', 'Cliente', 'Producto',
      'Valor Venta', '% Comisión', 'Monto Comisión', 'Estado', 'Fecha Pago'
    ];

    const rows = comisionesFiltradas.map(c => [
      c.id,
      c.afiliadoNombre,
      c.fechaVenta,
      c.clienteReferido,
      c.productoVendido,
      c.valorVenta,
      (c.porcentajeComision * 100).toFixed(2) + '%',
      c.montoComision,
      c.estado,
      c.fechaPago || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `comisiones_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Badge de estado
  const EstadoBadge: React.FC<{ estado: Comision['estado'] }> = ({ estado }) => {
    const configs = {
      pendiente_validacion: {
        color: 'from-yellow-500 to-orange-500',
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        label: 'Pendiente Validación'
      },
      aprobada: {
        color: 'from-green-500 to-emerald-500',
        bg: 'bg-green-50',
        text: 'text-green-700',
        label: 'Aprobada'
      },
      pagada: {
        color: 'from-blue-500 to-indigo-500',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        label: 'Pagada'
      },
      revertida: {
        color: 'from-red-500 to-pink-500',
        bg: 'bg-red-50',
        text: 'text-red-700',
        label: 'Revertida'
      }
    };

    const config = configs[estado];
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${config.bg} ${config.text} border border-current/20`}>
        {config.label}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Table className="w-6 h-6" />
            </div>
            Tabla de Comisiones
          </h3>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            {/* Filtro por estado */}
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="todos" className="text-gray-900">Todos los Estados</option>
              <option value="pendiente_validacion" className="text-gray-900">Pendiente Validación</option>
              <option value="aprobada" className="text-gray-900">Aprobada</option>
              <option value="pagada" className="text-gray-900">Pagada</option>
              <option value="revertida" className="text-gray-900">Revertida</option>
            </select>

            {/* Filtro por tier */}
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="todos" className="text-gray-900">Todos los Tiers</option>
              <option value="bronce" className="text-gray-900">Bronce</option>
              <option value="plata" className="text-gray-900">Plata</option>
              <option value="oro" className="text-gray-900">Oro</option>
              <option value="platino" className="text-gray-900">Platino</option>
            </select>

            {/* Botón exportar */}
            <button
              onClick={exportarCSV}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg"
            >
              <Download className="w-4 h-4" />
              Exportar CSV
            </button>
          </div>

          {/* Filtros adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
            <input
              type="date"
              placeholder="Fecha desde"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="date"
              placeholder="Fecha hasta"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="number"
              placeholder="Monto mínimo"
              value={montoMin}
              onChange={(e) => setMontoMin(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <input
              type="number"
              placeholder="Monto máximo"
              value={montoMax}
              onChange={(e) => setMontoMax(e.target.value)}
              className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="p-6">
        <div className="mb-4 text-sm text-gray-600">
          Mostrando {comisionesPaginadas.length} de {comisionesFiltradas.length} comisiones
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Afiliado</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Fecha Venta</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Cliente</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Producto</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Venta</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">%</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Comisión</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comisionesPaginadas.map((comision, index) => (
                <motion.tr
                  key={comision.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-colors duration-200"
                >
                  <td className="px-4 py-3 text-sm font-bold text-indigo-600">{comision.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={comision.afiliadoAvatar}
                        alt={comision.afiliadoNombre}
                        className="w-8 h-8 rounded-full border-2 border-purple-200"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{comision.afiliadoNombre}</p>
                        <p className="text-xs text-gray-500 capitalize">{comision.tier}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{comision.fechaVenta}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{comision.clienteReferido}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{comision.productoVendido}</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                    ${comision.valorVenta.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-center font-bold text-purple-600">
                    {(comision.porcentajeComision * 100).toFixed(0)}%
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                      ${comision.montoComision.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <EstadoBadge estado={comision.estado} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      {comision.estado === 'pendiente_validacion' && (
                        <>
                          <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {comision.estado === 'aprobada' && (
                        <button className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                          <DollarSign className="w-4 h-4" />
                        </button>
                      )}
                      {comision.estado === 'pagada' && (
                        <button className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors duration-200">
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TablaComisiones;
