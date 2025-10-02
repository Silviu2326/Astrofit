import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Eye,
  Send,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Filter,
  Printer,
  Mail,
  Share2,
  AlertCircle,
  FileDown,
  Building
} from 'lucide-react';

interface Factura {
  id: string;
  numero: string;
  fecha: string;
  cliente: string;
  concepto: string;
  subtotal: number;
  impuestos: number;
  total: number;
  estado: 'pagada' | 'pendiente' | 'vencida' | 'cancelada';
  fechaVencimiento: string;
  metodoPago?: string;
  plan: string;
}

export const FacturasManager = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<'todas' | 'pagada' | 'pendiente' | 'vencida' | 'cancelada'>('todas');

  // Datos mockeados
  const facturas: Factura[] = [
    {
      id: '1',
      numero: 'FAC-2025-001',
      fecha: '2025-02-01',
      cliente: 'María García López',
      concepto: 'Suscripción Premium - Febrero 2025',
      subtotal: 84.74,
      impuestos: 15.25,
      total: 99.99,
      estado: 'pagada',
      fechaVencimiento: '2025-02-15',
      metodoPago: 'Visa •••• 4242',
      plan: 'Premium'
    },
    {
      id: '2',
      numero: 'FAC-2025-002',
      fecha: '2025-02-01',
      cliente: 'Carlos Rodríguez Silva',
      concepto: 'Suscripción Pro - Febrero 2025',
      subtotal: 42.36,
      impuestos: 7.63,
      total: 49.99,
      estado: 'pagada',
      fechaVencimiento: '2025-02-15',
      metodoPago: 'Mastercard •••• 5555',
      plan: 'Pro'
    },
    {
      id: '3',
      numero: 'FAC-2025-003',
      fecha: '2025-01-31',
      cliente: 'Ana Martínez Torres',
      concepto: 'Upgrade a Pro - Enero 2025',
      subtotal: 42.36,
      impuestos: 7.63,
      total: 49.99,
      estado: 'pendiente',
      fechaVencimiento: '2025-02-10',
      plan: 'Pro'
    },
    {
      id: '4',
      numero: 'FAC-2025-004',
      fecha: '2025-01-31',
      cliente: 'Juan Pérez González',
      concepto: 'Suscripción Enterprise - Febrero 2025',
      subtotal: 254.23,
      impuestos: 45.76,
      total: 299.99,
      estado: 'pagada',
      fechaVencimiento: '2025-02-10',
      metodoPago: 'Transferencia',
      plan: 'Enterprise'
    },
    {
      id: '5',
      numero: 'FAC-2025-005',
      fecha: '2025-01-25',
      cliente: 'Laura Fernández Ruiz',
      concepto: 'Suscripción Premium - Enero 2025',
      subtotal: 84.74,
      impuestos: 15.25,
      total: 99.99,
      estado: 'vencida',
      fechaVencimiento: '2025-02-01',
      plan: 'Premium'
    },
    {
      id: '6',
      numero: 'FAC-2025-006',
      fecha: '2025-01-20',
      cliente: 'Pedro Sánchez Díaz',
      concepto: 'Suscripción Pro - Enero 2025',
      subtotal: 42.36,
      impuestos: 7.63,
      total: 49.99,
      estado: 'cancelada',
      fechaVencimiento: '2025-02-05',
      plan: 'Pro'
    }
  ];

  const estadoConfig = {
    pagada: { color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle, badge: 'bg-green-500' },
    pendiente: { color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: Clock, badge: 'bg-yellow-500' },
    vencida: { color: 'text-red-600', bgColor: 'bg-red-50', icon: AlertCircle, badge: 'bg-red-500' },
    cancelada: { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: XCircle, badge: 'bg-gray-500' }
  };

  // Filtrado
  const facturasFiltradas = facturas.filter(f => {
    const matchBusqueda = f.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                          f.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
                          f.concepto.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === 'todas' || f.estado === filtroEstado;
    return matchBusqueda && matchEstado;
  });

  // Estadísticas
  const totalPagadas = facturas.filter(f => f.estado === 'pagada').reduce((sum, f) => sum + f.total, 0);
  const totalPendientes = facturas.filter(f => f.estado === 'pendiente').reduce((sum, f) => sum + f.total, 0);
  const totalVencidas = facturas.filter(f => f.estado === 'vencida').reduce((sum, f) => sum + f.total, 0);
  const cantidadPagadas = facturas.filter(f => f.estado === 'pagada').length;
  const cantidadPendientes = facturas.filter(f => f.estado === 'pendiente').length;
  const cantidadVencidas = facturas.filter(f => f.estado === 'vencida').length;

  const stats = [
    {
      label: 'Total Facturado',
      value: `$${totalPagadas.toFixed(2)}`,
      count: cantidadPagadas,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Pendientes de Pago',
      value: `$${totalPendientes.toFixed(2)}`,
      count: cantidadPendientes,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      label: 'Vencidas',
      value: `$${totalVencidas.toFixed(2)}`,
      count: cantidadVencidas,
      icon: AlertCircle,
      color: 'from-red-500 to-pink-500'
    },
    {
      label: 'Total Facturas',
      value: facturas.length,
      count: facturas.length,
      icon: FileText,
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
          >
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>

              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.count} facturas</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filtros y Búsqueda */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
      >
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900">Gestión de Facturas</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Búsqueda */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por cliente, número o concepto..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Filtro estado */}
          <div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value as any)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none"
              >
                <option value="todas">Todos los estados</option>
                <option value="pagada">Pagadas</option>
                <option value="pendiente">Pendientes</option>
                <option value="vencida">Vencidas</option>
                <option value="cancelada">Canceladas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            <Download className="w-4 h-4" />
            Exportar Excel
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
            <Mail className="w-4 h-4" />
            Enviar por Email
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
            <Calendar className="w-4 h-4" />
            Filtrar por fecha
          </button>
        </div>
      </motion.div>

      {/* Lista de Facturas */}
      <div className="space-y-4">
        {facturasFiltradas.map((factura, index) => {
          const EstadoIcon = estadoConfig[factura.estado].icon;

          return (
            <motion.div
              key={factura.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01, x: 8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Badge de estado */}
              <div className="absolute top-4 right-4">
                <div className={`px-4 py-2 rounded-full ${estadoConfig[factura.estado].bgColor}`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${estadoConfig[factura.estado].badge} ${factura.estado === 'pendiente' ? 'animate-pulse' : ''}`}></div>
                    <span className={`text-sm font-bold ${estadoConfig[factura.estado].color}`}>
                      {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
                {/* Número y Fecha */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">{factura.numero}</p>
                      <p className="text-sm font-semibold text-gray-700">
                        {new Date(factura.fecha).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cliente y Concepto */}
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Cliente</p>
                  <p className="text-base font-bold text-gray-900 mb-1">{factura.cliente}</p>
                  <p className="text-sm text-gray-600">{factura.concepto}</p>
                  <div className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
                    <span className="text-xs font-bold text-blue-700">{factura.plan}</span>
                  </div>
                </div>

                {/* Desglose de montos */}
                <div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal:</span>
                      <span className="font-semibold text-gray-700">${factura.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Impuestos:</span>
                      <span className="font-semibold text-gray-700">${factura.impuestos.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-gray-200">
                      <span className="text-sm font-bold text-gray-900">Total:</span>
                      <span className="text-lg font-bold text-green-600">${factura.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Fechas y Método */}
                <div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Vencimiento</p>
                        <p className="text-sm font-semibold text-gray-700">
                          {new Date(factura.fechaVencimiento).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                    {factura.metodoPago && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="text-xs text-gray-500">Método</p>
                          <p className="text-sm font-semibold text-gray-700">{factura.metodoPago}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col gap-2">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                    <Eye className="w-4 h-4" />
                    Ver
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 text-sm font-semibold rounded-xl hover:bg-blue-200 transition-all duration-300">
                    <Download className="w-4 h-4" />
                    PDF
                  </button>
                  {factura.estado === 'pendiente' && (
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 text-sm font-semibold rounded-xl hover:bg-purple-200 transition-all duration-300">
                      <Send className="w-4 h-4" />
                      Enviar
                    </button>
                  )}
                  {factura.estado === 'vencida' && (
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 text-sm font-semibold rounded-xl hover:bg-orange-200 transition-all duration-300">
                      <AlertCircle className="w-4 h-4" />
                      Recordar
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {facturasFiltradas.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
        >
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600">No se encontraron facturas</p>
          <p className="text-gray-500 mt-2">Intenta ajustar los filtros de búsqueda</p>
        </motion.div>
      )}
    </div>
  );
};
