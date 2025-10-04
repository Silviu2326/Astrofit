import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Search,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  RefreshCcw,
  AlertTriangle,
  Eye
} from 'lucide-react';

interface Transaccion {
  id: string;
  fecha: string;
  cliente: string;
  concepto: string;
  monto: number;
  estado: 'completada' | 'pendiente' | 'fallida' | 'reembolsada';
  metodoPago: string;
  numeroTransaccion: string;
  plan: string;
}

export const HistorialTransacciones = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<'todas' | 'completada' | 'pendiente' | 'fallida' | 'reembolsada'>('todas');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');

  // Datos mockeados
  const transacciones: Transaccion[] = [
    {
      id: 'TRX-001',
      fecha: '2025-02-01 14:23',
      cliente: 'María García López',
      concepto: 'Suscripción Premium - Febrero 2025',
      monto: 99.99,
      estado: 'completada',
      metodoPago: 'Visa •••• 4242',
      numeroTransaccion: 'ch_3NXy1234567890',
      plan: 'Premium'
    },
    {
      id: 'TRX-002',
      fecha: '2025-02-01 10:15',
      cliente: 'Carlos Rodríguez Silva',
      concepto: 'Suscripción Pro - Febrero 2025',
      monto: 49.99,
      estado: 'completada',
      metodoPago: 'Mastercard •••• 5555',
      numeroTransaccion: 'ch_3NXy1234567891',
      plan: 'Pro'
    },
    {
      id: 'TRX-003',
      fecha: '2025-01-31 23:45',
      cliente: 'Ana Martínez Torres',
      concepto: 'Upgrade a Pro - Enero 2025',
      monto: 49.99,
      estado: 'pendiente',
      metodoPago: 'PayPal',
      numeroTransaccion: 'ch_3NXy1234567892',
      plan: 'Pro'
    },
    {
      id: 'TRX-004',
      fecha: '2025-01-31 18:30',
      cliente: 'Juan Pérez González',
      concepto: 'Suscripción Enterprise - Febrero 2025',
      monto: 299.99,
      estado: 'completada',
      metodoPago: 'Transferencia',
      numeroTransaccion: 'ch_3NXy1234567893',
      plan: 'Enterprise'
    },
    {
      id: 'TRX-005',
      fecha: '2025-01-30 16:20',
      cliente: 'Laura Fernández Ruiz',
      concepto: 'Suscripción Premium - Enero 2025',
      monto: 99.99,
      estado: 'fallida',
      metodoPago: 'Visa •••• 1234',
      numeroTransaccion: 'ch_3NXy1234567894',
      plan: 'Premium'
    },
    {
      id: 'TRX-006',
      fecha: '2025-01-29 12:10',
      cliente: 'Pedro Sánchez Díaz',
      concepto: 'Reembolso - Cancelación anticipada',
      monto: -49.99,
      estado: 'reembolsada',
      metodoPago: 'PayPal',
      numeroTransaccion: 'ch_3NXy1234567895',
      plan: 'Pro'
    },
    {
      id: 'TRX-007',
      fecha: '2025-01-28 09:45',
      cliente: 'Sofia López Martín',
      concepto: 'Suscripción Básica - Febrero 2025',
      monto: 19.99,
      estado: 'completada',
      metodoPago: 'Visa •••• 8888',
      numeroTransaccion: 'ch_3NXy1234567896',
      plan: 'Básico'
    },
    {
      id: 'TRX-008',
      fecha: '2025-01-27 15:30',
      cliente: 'Diego Torres Ruiz',
      concepto: 'Suscripción Pro - Enero 2025',
      monto: 49.99,
      estado: 'completada',
      metodoPago: 'Mastercard •••• 9999',
      numeroTransaccion: 'ch_3NXy1234567897',
      plan: 'Pro'
    }
  ];

  const estadoConfig = {
    completada: { color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle, badge: 'bg-green-500' },
    pendiente: { color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: Clock, badge: 'bg-yellow-500' },
    fallida: { color: 'text-red-600', bgColor: 'bg-red-50', icon: XCircle, badge: 'bg-red-500' },
    reembolsada: { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: RefreshCcw, badge: 'bg-blue-500' }
  };

  // Filtrado de transacciones
  const transaccionesFiltradas = transacciones.filter(t => {
    const matchBusqueda = t.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                          t.concepto.toLowerCase().includes(busqueda.toLowerCase()) ||
                          t.numeroTransaccion.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === 'todas' || t.estado === filtroEstado;
    return matchBusqueda && matchEstado;
  });

  // Estadísticas
  const totalCompletadas = transacciones.filter(t => t.estado === 'completada').length;
  const totalPendientes = transacciones.filter(t => t.estado === 'pendiente').length;
  const totalFallidas = transacciones.filter(t => t.estado === 'fallida').length;
  const montoTotal = transacciones
    .filter(t => t.estado === 'completada')
    .reduce((sum, t) => sum + t.monto, 0);

  const stats = [
    {
      label: 'Total Procesado',
      value: `$${montoTotal.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      change: '+12.5%'
    },
    {
      label: 'Completadas',
      value: totalCompletadas,
      icon: CheckCircle,
      color: 'from-green-600 to-teal-600',
      change: `${totalCompletadas} trans.`
    },
    {
      label: 'Pendientes',
      value: totalPendientes,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      change: `${totalPendientes} trans.`
    },
    {
      label: 'Fallidas',
      value: totalFallidas,
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500',
      change: `${totalFallidas} trans.`
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
              <p className="text-xs text-gray-600">{stat.change}</p>
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
          <CreditCard className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-bold text-gray-900">Historial de Transacciones</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Búsqueda */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por cliente, concepto o número de transacción..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Filtro de estado */}
          <div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value as any)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none"
              >
                <option value="todas">Todos los estados</option>
                <option value="completada">Completadas</option>
                <option value="pendiente">Pendientes</option>
                <option value="fallida">Fallidas</option>
                <option value="reembolsada">Reembolsadas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300">
            <Calendar className="w-4 h-4" />
            Filtrar por fecha
          </button>
        </div>
      </motion.div>

      {/* Tabla de Transacciones */}
      <div className="space-y-4">
        {transaccionesFiltradas.map((transaccion, index) => {
          const EstadoIcon = estadoConfig[transaccion.estado].icon;

          return (
            <motion.div
              key={transaccion.id}
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
                <div className={`px-4 py-2 rounded-full ${estadoConfig[transaccion.estado].bgColor}`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${estadoConfig[transaccion.estado].badge} ${transaccion.estado === 'pendiente' ? 'animate-pulse' : ''}`}></div>
                    <span className={`text-sm font-bold ${estadoConfig[transaccion.estado].color}`}>
                      {transaccion.estado.charAt(0).toUpperCase() + transaccion.estado.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-6 gap-6 items-center">
                {/* ID y Fecha */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                      <EstadoIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">{transaccion.id}</p>
                      <p className="text-sm font-semibold text-gray-700">{transaccion.fecha}</p>
                    </div>
                  </div>
                </div>

                {/* Cliente */}
                <div className="lg:col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Cliente</p>
                  <p className="text-base font-bold text-gray-900">{transaccion.cliente}</p>
                  <p className="text-sm text-gray-600 mt-1">{transaccion.concepto}</p>
                </div>

                {/* Monto */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Monto</p>
                  <p className={`text-2xl font-bold ${transaccion.monto >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaccion.monto >= 0 ? '+' : ''}${Math.abs(transaccion.monto).toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{transaccion.plan}</p>
                </div>

                {/* Método de Pago */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Método de pago</p>
                  <p className="text-sm font-semibold text-gray-700 mb-1">{transaccion.metodoPago}</p>
                  <p className="text-xs text-gray-400 font-mono">{transaccion.numeroTransaccion}</p>
                </div>

                {/* Acciones */}
                <div className="flex flex-col gap-2">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                    <Eye className="w-4 h-4" />
                    Ver
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300">
                    <Download className="w-4 h-4" />
                    Recibo
                  </button>
                  {transaccion.estado === 'fallida' && (
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 text-sm font-semibold rounded-xl hover:bg-orange-200 transition-all duration-300">
                      <RefreshCcw className="w-4 h-4" />
                      Reintentar
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {transaccionesFiltradas.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 border border-white/50 text-center"
        >
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-600">No se encontraron transacciones</p>
          <p className="text-gray-500 mt-2">Intenta ajustar los filtros de búsqueda</p>
        </motion.div>
      )}
    </div>
  );
};
