import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Vault, Clock, DollarSign, TrendingUp, CreditCard, Banknote,
  ArrowUpRight, ArrowDownRight, User, Calendar, CheckCircle,
  AlertCircle, XCircle, Download, Printer, Plus, Minus, Lock,
  Unlock, Timer, History, FileText, BarChart3
} from 'lucide-react';
import { getCajaDiariaData, CajaDiariaData } from './cajaDiariaApi';

const CajaDiariaPage: React.FC = () => {
  const [data, setData] = useState<CajaDiariaData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showMovementModal, setShowMovementModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCajaDiariaData();
        setData(result);
      } catch (err) {
        setError('Error al cargar los datos de la caja diaria.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Cargando datos de caja...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 text-center max-w-md">
        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 font-semibold text-lg">{error}</p>
      </div>
    </div>
  );

  if (!data) return null;

  const getTiempoTranscurrido = () => {
    const inicio = new Date(data.turnoActual.horaApertura);
    const ahora = new Date();
    const diff = ahora.getTime() - inicio.getTime();
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${horas}h ${minutos}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-MX', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/30 to-red-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Vault className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Caja <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Diaria</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl leading-relaxed">
            Control de efectivo y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">cierre de turno</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Calendar className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">
                {new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <User className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Cajero: {data.turnoActual.cajero.nombre}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ESTADO DE CAJA - Card destacado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden mb-8"
      >
        {/* Decoración de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Estado de Caja</h2>
            {data.turnoActual.estado === 'abierta' ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border-2 border-green-500">
                <Unlock className="w-5 h-5 text-green-600" />
                <span className="text-sm font-bold text-green-700 uppercase">Abierta</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border-2 border-gray-400">
                <Lock className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-bold text-gray-700 uppercase">Cerrada</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Cajero responsable */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200">
              <p className="text-sm font-semibold text-gray-600 mb-2">Cajero Responsable</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {data.turnoActual.cajero.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{data.turnoActual.cajero.nombre}</p>
                  <p className="text-xs text-gray-600">ID: {data.turnoActual.id}</p>
                </div>
              </div>
            </div>

            {/* Hora de apertura */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
              <p className="text-sm font-semibold text-gray-600 mb-2">Hora de Apertura</p>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <p className="text-2xl font-bold text-gray-900">{formatTime(data.turnoActual.horaApertura)}</p>
              </div>
              <div className="mt-2 flex items-center gap-1">
                <Timer className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-blue-700 font-medium">Tiempo: {getTiempoTranscurrido()}</p>
              </div>
            </div>

            {/* Monto inicial y actual */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
              <p className="text-sm font-semibold text-gray-600 mb-2">Efectivo en Caja</p>
              <p className="text-xs text-gray-500 mb-1">Inicial: {formatCurrency(data.turnoActual.montoInicial)}</p>
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-orange-600">
                {formatCurrency(data.turnoActual.montoActual)}
              </p>
            </div>
          </div>

          {/* Botones principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.turnoActual.estado === 'cerrada' ? (
              <button
                onClick={() => setShowOpenModal(true)}
                className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white group border border-white/20"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Unlock className="w-5 h-5" />
                  <span className="font-bold">Abrir Caja</span>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setShowCloseModal(true)}
                className="relative overflow-hidden bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white group border border-white/20"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5" />
                  <span className="font-bold">Cerrar Caja</span>
                </div>
              </button>
            )}

            <button
              onClick={() => setShowMovementModal(true)}
              className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white group border border-white/20"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                <span className="font-bold">Movimiento de Efectivo</span>
              </div>
            </button>

            <button
              onClick={() => setShowHistoryModal(true)}
              className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 text-white group border border-white/20"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center justify-center gap-2">
                <History className="w-5 h-5" />
                <span className="font-bold">Historial de Turnos</span>
              </div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* RESUMEN FINANCIERO - 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Efectivo en Caja */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

          {/* Decoración de fondo */}
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-yellow-500 to-orange-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <Banknote className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">Efectivo en Caja</p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {formatCurrency(data.turnoActual.montoActual)}
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-green-50 rounded-lg">
                <ArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">En tiempo real</span>
            </div>
          </div>
        </motion.div>

        {/* Ventas en Efectivo Hoy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">Ventas en Efectivo</p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {formatCurrency(data.ventasDelTurno.totalEfectivo)}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{data.ventasDelTurno.transaccionesEfectivo} transacciones</span>
            </div>
          </div>
        </motion.div>

        {/* Ventas con Tarjeta Hoy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <CreditCard className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">Ventas con Tarjeta</p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {formatCurrency(data.ventasDelTurno.totalTarjeta)}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{data.ventasDelTurno.transaccionesTarjeta} transacciones</span>
            </div>
          </div>
        </motion.div>

        {/* Total Vendido Hoy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.03, y: -8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 opacity-5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-8 h-8" />
            </div>
            <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">Total Vendido</p>
            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
              {formatCurrency(data.totalIngresos)}
            </p>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-purple-50 rounded-lg">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm font-bold text-purple-600">{data.ventasDelTurno.ticketsTotal} tickets</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* HISTORIAL DE MOVIMIENTOS - Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Historial de Movimientos</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {data.movimientos.slice().reverse().map((mov, index) => (
            <motion.div
              key={mov.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className={`flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 border ${
                mov.tipo === 'entrada'
                  ? 'hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-200'
                  : mov.tipo === 'salida'
                  ? 'hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:border-red-200'
                  : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:border-blue-200'
              } border-transparent hover:shadow-md group`}
            >
              {/* Icono */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                mov.tipo === 'entrada'
                  ? 'bg-gradient-to-br from-green-400 to-emerald-600'
                  : mov.tipo === 'salida'
                  ? 'bg-gradient-to-br from-red-400 to-pink-600'
                  : 'bg-gradient-to-br from-blue-400 to-indigo-600'
              }`}>
                {mov.tipo === 'entrada' ? (
                  <ArrowUpRight className="w-6 h-6" />
                ) : mov.tipo === 'salida' ? (
                  <ArrowDownRight className="w-6 h-6" />
                ) : (
                  <DollarSign className="w-6 h-6" />
                )}
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-900">{mov.razon}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {mov.usuario} • {formatTime(mov.timestamp)}
                    </p>
                    {mov.notas && (
                      <p className="text-xs text-gray-500 mt-1 italic">{mov.notas}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      mov.tipo === 'entrada' ? 'text-green-600' : mov.tipo === 'salida' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {mov.tipo === 'entrada' ? '+' : mov.tipo === 'salida' ? '-' : ''}{formatCurrency(mov.monto)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Saldo: {formatCurrency(mov.saldoResultante)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* VENTAS DEL TURNO Y TURNOS PASADOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ventas del Turno */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ventas del Turno</h2>

          <div className="space-y-4">
            {/* Efectivo */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-gray-900">Efectivo</span>
                </div>
                <span className="text-sm text-gray-600">{data.ventasDelTurno.transaccionesEfectivo} transacciones</span>
              </div>
              <p className="text-2xl font-bold text-green-700">{formatCurrency(data.ventasDelTurno.totalEfectivo)}</p>
              <p className="text-xs text-green-600 mt-1">Debería estar en caja</p>
            </div>

            {/* Tarjeta */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-gray-900">Tarjeta</span>
                </div>
                <span className="text-sm text-gray-600">{data.ventasDelTurno.transaccionesTarjeta} transacciones</span>
              </div>
              <p className="text-2xl font-bold text-blue-700">{formatCurrency(data.ventasDelTurno.totalTarjeta)}</p>
              <p className="text-xs text-blue-600 mt-1">A depositar por terminal</p>
            </div>

            {/* Transferencia */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-gray-900">Transferencia</span>
                </div>
                <span className="text-sm text-gray-600">{data.ventasDelTurno.transaccionesTransferencia} transacciones</span>
              </div>
              <p className="text-2xl font-bold text-purple-700">{formatCurrency(data.ventasDelTurno.totalTransferencia)}</p>
            </div>

            {/* Crédito */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  <span className="font-bold text-gray-900">Crédito de Cuenta</span>
                </div>
                <span className="text-sm text-gray-600">{data.ventasDelTurno.transaccionesCredito} transacciones</span>
              </div>
              <p className="text-2xl font-bold text-orange-700">{formatCurrency(data.ventasDelTurno.totalCredito)}</p>
            </div>

            {/* Total General */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">TOTAL GENERAL</span>
                <span className="text-sm">{data.ventasDelTurno.ticketsTotal} tickets</span>
              </div>
              <p className="text-3xl font-bold">{formatCurrency(data.totalIngresos)}</p>
              <p className="text-sm text-gray-300 mt-1">Ticket promedio: {formatCurrency(data.ventasDelTurno.ticketPromedio)}</p>
            </div>
          </div>
        </motion.div>

        {/* Turnos Pasados */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Turnos Recientes</h2>
            <button
              onClick={() => setShowHistoryModal(true)}
              className="text-sm text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Ver todos
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {data.turnosPasados.slice(0, 6).map((turno) => (
              <div
                key={turno.id}
                className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-4 border border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-bold text-gray-900">{turno.fecha}</p>
                    <p className="text-sm text-gray-600">{turno.cajero}</p>
                  </div>
                  {turno.estado === 'exacto' ? (
                    <div className="flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-bold text-green-700">Exacto</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-3 py-1 bg-orange-100 rounded-full">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <span className="text-xs font-bold text-orange-700">Con diferencias</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Horario</p>
                    <p className="font-semibold text-gray-900">{turno.horaApertura} - {turno.horaCierre}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duración</p>
                    <p className="font-semibold text-gray-900">{turno.duracion}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total Vendido</p>
                    <p className="font-bold text-green-600">{formatCurrency(turno.totalVendido)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Diferencia</p>
                    <p className={`font-bold ${turno.diferencia === 0 ? 'text-green-600' : turno.diferencia > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                      {turno.diferencia === 0 ? '✓ $0.00' : formatCurrency(Math.abs(turno.diferencia))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modals (placeholders for now - you can implement these separately) */}
      {showOpenModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-4">Abrir Caja</h3>
            <p className="text-gray-600 mb-6">Funcionalidad de apertura de caja en desarrollo...</p>
            <button
              onClick={() => setShowOpenModal(false)}
              className="px-6 py-3 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showCloseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-4">Cerrar Caja</h3>
            <p className="text-gray-600 mb-6">Funcionalidad de cierre de caja en desarrollo...</p>
            <button
              onClick={() => setShowCloseModal(false)}
              className="px-6 py-3 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showMovementModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-4">Movimiento de Efectivo</h3>
            <p className="text-gray-600 mb-6">Funcionalidad de movimientos en desarrollo...</p>
            <button
              onClick={() => setShowMovementModal(false)}
              className="px-6 py-3 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">Historial de Turnos</h3>
            <p className="text-gray-600 mb-6">Vista completa de historial en desarrollo...</p>
            <button
              onClick={() => setShowHistoryModal(false)}
              className="px-6 py-3 bg-gray-200 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CajaDiariaPage;
