import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ticket, Calendar, UserX, TrendingDown, Filter, Download, Plus,
  Search, X, ChevronDown, Clock, Users, CheckCircle, AlertCircle,
  XCircle, Eye, Mail, Phone, CreditCard, MapPin, MoreVertical,
  ArrowUpRight, ArrowDownRight, Sparkles
} from 'lucide-react';
import { getReservas, getEstadisticasReservas, Reserva, EstadoReserva, Miembro, getMiembrosMock, getClasesMock } from './reservasClaseApi';

const ReservasClasePage: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [reservasFiltradas, setReservasFiltradas] = useState<Reserva[]>([]);
  const [estadisticas, setEstadisticas] = useState<any>(null);
  const [reservaSeleccionada, setReservaSeleccionada] = useState<Reserva | null>(null);
  const [mostrarModalDetalle, setMostrarModalDetalle] = useState(false);
  const [mostrarCrearReserva, setMostrarCrearReserva] = useState(false);
  const [mostrarCancelar, setMostrarCancelar] = useState(false);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarCheckIn, setMostrarCheckIn] = useState(false);

  // Filtros
  const [filtroEstado, setFiltroEstado] = useState<EstadoReserva[]>([]);
  const [filtroTipoClase, setFiltroTipoClase] = useState<string[]>([]);
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [ordenarPor, setOrdenarPor] = useState<'fecha' | 'clase' | 'miembro'>('fecha');

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const reservasPorPagina = 20;

  useEffect(() => {
    const fetchedReservas = getReservas();
    setReservas(fetchedReservas);
    setReservasFiltradas(fetchedReservas);
    setEstadisticas(getEstadisticasReservas());
  }, []);

  useEffect(() => {
    let filtered = [...reservas];

    // Filtrar por estado
    if (filtroEstado.length > 0) {
      filtered = filtered.filter(r => filtroEstado.includes(r.estado));
    }

    // Filtrar por tipo de clase
    if (filtroTipoClase.length > 0) {
      filtered = filtered.filter(r => filtroTipoClase.includes(r.clase.tipo));
    }

    // Filtrar por búsqueda
    if (filtroBusqueda) {
      filtered = filtered.filter(r =>
        r.miembro.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
        r.clase.nombre.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
        r.numeroReserva.toLowerCase().includes(filtroBusqueda.toLowerCase())
      );
    }

    // Ordenar
    filtered.sort((a, b) => {
      if (ordenarPor === 'fecha') {
        return b.clase.fechaHora.getTime() - a.clase.fechaHora.getTime();
      } else if (ordenarPor === 'clase') {
        return a.clase.nombre.localeCompare(b.clase.nombre);
      } else {
        return a.miembro.nombre.localeCompare(b.miembro.nombre);
      }
    });

    setReservasFiltradas(filtered);
    setPaginaActual(1);
  }, [filtroEstado, filtroTipoClase, filtroBusqueda, ordenarPor, reservas]);

  const limpiarFiltros = () => {
    setFiltroEstado([]);
    setFiltroTipoClase([]);
    setFiltroBusqueda('');
  };

  const indexUltimaReserva = paginaActual * reservasPorPagina;
  const indexPrimeraReserva = indexUltimaReserva - reservasPorPagina;
  const reservasActuales = reservasFiltradas.slice(indexPrimeraReserva, indexUltimaReserva);
  const totalPaginas = Math.ceil(reservasFiltradas.length / reservasPorPagina);

  const getBadgeEstado = (estado: EstadoReserva) => {
    switch (estado) {
      case 'confirmada':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'espera':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'cancelada':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'completada':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'no-show':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getIconoEstado = (estado: EstadoReserva) => {
    switch (estado) {
      case 'confirmada':
        return <CheckCircle className="w-4 h-4" />;
      case 'espera':
        return <Clock className="w-4 h-4" />;
      case 'cancelada':
        return <XCircle className="w-4 h-4" />;
      case 'completada':
        return <CheckCircle className="w-4 h-4" />;
      case 'no-show':
        return <UserX className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatearFecha = (fecha: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(fecha);
  };

  if (!estadisticas) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 pb-12">
      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Ticket className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Gestión de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Reservas</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl leading-relaxed">
            Administra las inscripciones a tus clases con un{' '}
            <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">sistema completo</span>
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMostrarCrearReserva(true)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 hover:bg-white/30 transition-all duration-300"
            >
              <Plus className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">Nueva Reserva</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMostrarCheckIn(true)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 hover:bg-white/30 transition-all duration-300"
            >
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Check-in Rápido</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Reservas Hoy',
            value: estadisticas.reservasHoy,
            icon: Calendar,
            color: 'from-blue-500 to-indigo-600',
            change: '+12.5',
            isPositive: true
          },
          {
            title: 'Reservas Pendientes',
            value: estadisticas.reservasPendientes,
            icon: Clock,
            color: 'from-yellow-500 to-orange-600',
            change: '+8.3',
            isPositive: true
          },
          {
            title: 'Cancelaciones Hoy',
            value: estadisticas.cancelacionesHoy,
            icon: XCircle,
            color: 'from-red-500 to-pink-600',
            change: '-5.2',
            isPositive: false
          },
          {
            title: 'Tasa de No-Show',
            value: estadisticas.tasaNoShow,
            icon: UserX,
            color: 'from-gray-500 to-slate-600',
            change: '-2.1',
            isPositive: false
          }
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>

              <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                {stat.title}
              </p>

              <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {stat.value}
              </p>

              <div className="flex items-center gap-2">
                <div className={`p-1 rounded-lg ${stat.isPositive ? 'bg-green-50' : 'bg-red-50'}`}>
                  {stat.isPositive ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <span className={`text-sm font-bold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}%
                </span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* BARRA DE ACCIONES Y FILTROS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 mb-6"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Búsqueda */}
          <div className="flex-1 w-full lg:w-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por miembro, clase o número de reserva..."
                value={filtroBusqueda}
                onChange={(e) => setFiltroBusqueda(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
              {(filtroEstado.length > 0 || filtroTipoClase.length > 0) && (
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {filtroEstado.length + filtroTipoClase.length}
                </span>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 border-2 border-purple-500 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors duration-300"
            >
              <Download className="w-5 h-5" />
              <span>Exportar</span>
            </motion.button>
          </div>
        </div>

        {/* Filtros activos */}
        {(filtroEstado.length > 0 || filtroTipoClase.length > 0) && (
          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <span className="text-sm font-semibold text-gray-600">Filtros activos:</span>
            {filtroEstado.map(estado => (
              <motion.div
                key={estado}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                {estado}
                <button
                  onClick={() => setFiltroEstado(filtroEstado.filter(e => e !== estado))}
                  className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
            {filtroTipoClase.map(tipo => (
              <motion.div
                key={tipo}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
              >
                {tipo}
                <button
                  onClick={() => setFiltroTipoClase(filtroTipoClase.filter(t => t !== tipo))}
                  className="ml-1 hover:bg-pink-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
            <button
              onClick={limpiarFiltros}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Limpiar todos
            </button>
          </div>
        )}

        {/* Panel de filtros expandido */}
        <AnimatePresence>
          {mostrarFiltros && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-gray-200 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filtro por estado */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                  <div className="space-y-2">
                    {(['confirmada', 'espera', 'cancelada', 'completada', 'no-show'] as EstadoReserva[]).map(estado => (
                      <label key={estado} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filtroEstado.includes(estado)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFiltroEstado([...filtroEstado, estado]);
                            } else {
                              setFiltroEstado(filtroEstado.filter(e => e !== estado));
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{estado}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filtro por tipo de clase */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Clase</label>
                  <div className="space-y-2">
                    {['Yoga', 'Pilates', 'Spinning', 'HIIT', 'Funcional', 'Boxeo'].map(tipo => (
                      <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filtroTipoClase.includes(tipo)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFiltroTipoClase([...filtroTipoClase, tipo]);
                            } else {
                              setFiltroTipoClase(filtroTipoClase.filter(t => t !== tipo));
                            }
                          }}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{tipo}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Ordenar por */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ordenar por</label>
                  <select
                    value={ordenarPor}
                    onChange={(e) => setOrdenarPor(e.target.value as any)}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white"
                  >
                    <option value="fecha">Fecha</option>
                    <option value="clase">Clase</option>
                    <option value="miembro">Miembro</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* TABLA DE RESERVAS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Reserva</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Fecha y Hora</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Clase</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Miembro</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Coach</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Método</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reservasActuales.map((reserva, index) => (
                <motion.tr
                  key={reserva.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 cursor-pointer ${
                    reserva.estado === 'confirmada' ? 'bg-green-50/30' :
                    reserva.estado === 'espera' ? 'bg-yellow-50/30' :
                    reserva.estado === 'cancelada' ? 'bg-red-50/30' :
                    reserva.estado === 'completada' ? 'bg-blue-50/30' :
                    'bg-gray-50/30'
                  }`}
                  onClick={() => {
                    setReservaSeleccionada(reserva);
                    setMostrarModalDetalle(true);
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{reserva.numeroReserva}</div>
                    <div className="text-xs text-gray-500">{formatearFecha(reserva.fechaReserva)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          {formatearFecha(reserva.clase.fechaHora)}
                        </div>
                        <div className="text-xs text-gray-500">{reserva.clase.duracion} min</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-gray-900">{reserva.clase.nombre}</div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                      reserva.clase.tipo === 'Yoga' ? 'bg-purple-100 text-purple-700' :
                      reserva.clase.tipo === 'Pilates' ? 'bg-pink-100 text-pink-700' :
                      reserva.clase.tipo === 'Spinning' ? 'bg-orange-100 text-orange-700' :
                      reserva.clase.tipo === 'HIIT' ? 'bg-red-100 text-red-700' :
                      reserva.clase.tipo === 'Funcional' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {reserva.clase.tipo}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                        {reserva.miembro.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{reserva.miembro.nombre}</div>
                        <div className="text-xs text-gray-500">{reserva.miembro.tipoPase}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                        {reserva.clase.coachAvatar}
                      </div>
                      <span className="text-sm text-gray-700">{reserva.clase.coach}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getBadgeEstado(reserva.estado)}`}>
                      {getIconoEstado(reserva.estado)}
                      <span className="capitalize">{reserva.estado}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 capitalize">{reserva.metodoReserva}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setReservaSeleccionada(reserva);
                          setMostrarModalDetalle(true);
                        }}
                        className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-purple-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="bg-gray-50/50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Mostrando <span className="font-semibold">{indexPrimeraReserva + 1}</span> a{' '}
              <span className="font-semibold">{Math.min(indexUltimaReserva, reservasFiltradas.length)}</span> de{' '}
              <span className="font-semibold">{reservasFiltradas.length}</span> reservas
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={paginaActual === 1}
                onClick={() => setPaginaActual(paginaActual - 1)}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Anterior
              </motion.button>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                .filter(page => page === 1 || page === totalPaginas || (page >= paginaActual - 1 && page <= paginaActual + 1))
                .map((page, index, array) => (
                  <React.Fragment key={page}>
                    {index > 0 && array[index - 1] !== page - 1 && (
                      <span className="px-2 py-2 text-gray-400">...</span>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPaginaActual(page)}
                      className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                        paginaActual === page
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </motion.button>
                  </React.Fragment>
                ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={paginaActual === totalPaginas}
                onClick={() => setPaginaActual(paginaActual + 1)}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Siguiente
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MODAL DETALLE DE RESERVA */}
      <AnimatePresence>
        {mostrarModalDetalle && reservaSeleccionada && (
          <ModalDetalleReserva
            reserva={reservaSeleccionada}
            onClose={() => {
              setMostrarModalDetalle(false);
              setReservaSeleccionada(null);
            }}
            onCancelar={(reserva) => {
              setReservaSeleccionada(reserva);
              setMostrarCancelar(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* MODAL CREAR RESERVA */}
      <AnimatePresence>
        {mostrarCrearReserva && (
          <ModalCrearReserva
            onClose={() => setMostrarCrearReserva(false)}
            onCrear={(nuevaReserva) => {
              setReservas([...reservas, nuevaReserva]);
              setMostrarCrearReserva(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* MODAL CHECK-IN RÁPIDO */}
      <AnimatePresence>
        {mostrarCheckIn && (
          <ModalCheckInRapido
            reservasHoy={reservas.filter(r => {
              const hoy = new Date();
              hoy.setHours(0, 0, 0, 0);
              const manana = new Date(hoy);
              manana.setDate(manana.getDate() + 1);
              return r.clase.fechaHora >= hoy && r.clase.fechaHora < manana;
            })}
            onClose={() => setMostrarCheckIn(false)}
          />
        )}
      </AnimatePresence>

      {/* MODAL CANCELAR RESERVA */}
      <AnimatePresence>
        {mostrarCancelar && reservaSeleccionada && (
          <ModalCancelarReserva
            reserva={reservaSeleccionada}
            onClose={() => {
              setMostrarCancelar(false);
              setReservaSeleccionada(null);
            }}
            onConfirmar={() => {
              // Actualizar estado
              const reservasActualizadas = reservas.map(r =>
                r.id === reservaSeleccionada.id ? { ...r, estado: 'cancelada' as EstadoReserva } : r
              );
              setReservas(reservasActualizadas);
              setMostrarCancelar(false);
              setMostrarModalDetalle(false);
              setReservaSeleccionada(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// COMPONENTE: Modal Detalle de Reserva
const ModalDetalleReserva: React.FC<{ reserva: Reserva; onClose: () => void; onCancelar: (reserva: Reserva) => void }> = ({ reserva, onClose, onCancelar }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Detalles de Reserva</h2>
              <p className="text-purple-100">{reserva.numeroReserva}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Información de la Reserva */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-purple-600" />
              Información de la Reserva
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Estado</p>
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border mt-1 ${
                  reserva.estado === 'confirmada' ? 'bg-green-100 text-green-700 border-green-300' :
                  reserva.estado === 'espera' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                  reserva.estado === 'cancelada' ? 'bg-red-100 text-red-700 border-red-300' :
                  reserva.estado === 'completada' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                  'bg-gray-100 text-gray-700 border-gray-300'
                }`}>
                  <span className="capitalize">{reserva.estado}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Método de Reserva</p>
                <p className="text-base font-semibold text-gray-900 capitalize">{reserva.metodoReserva}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha de Creación</p>
                <p className="text-base font-semibold text-gray-900">
                  {new Intl.DateTimeFormat('es-ES', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }).format(reserva.fechaReserva)}
                </p>
              </div>
              {reserva.posicionEspera && (
                <div>
                  <p className="text-sm text-gray-600">Posición en Espera</p>
                  <p className="text-base font-semibold text-gray-900">#{reserva.posicionEspera}</p>
                </div>
              )}
            </div>
          </div>

          {/* Información de la Clase */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Información de la Clase
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Clase</p>
                <p className="text-base font-semibold text-gray-900">{reserva.clase.nombre}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                  reserva.clase.tipo === 'Yoga' ? 'bg-purple-100 text-purple-700' :
                  reserva.clase.tipo === 'Pilates' ? 'bg-pink-100 text-pink-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {reserva.clase.tipo}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Coach</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {reserva.clase.coachAvatar}
                  </div>
                  <span className="text-base font-semibold text-gray-900">{reserva.clase.coach}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fecha y Hora</p>
                <p className="text-base font-semibold text-gray-900">
                  {new Intl.DateTimeFormat('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }).format(reserva.clase.fechaHora)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duración</p>
                <p className="text-base font-semibold text-gray-900">{reserva.clase.duracion} minutos</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ubicación</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-base font-semibold text-gray-900">{reserva.clase.sala}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Capacidad</p>
                <p className="text-base font-semibold text-gray-900">
                  {reserva.clase.reservasActuales} / {reserva.clase.capacidadMaxima}
                </p>
              </div>
            </div>
          </div>

          {/* Información del Miembro */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Información del Miembro
            </h3>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {reserva.miembro.avatar}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-gray-900">{reserva.miembro.nombre}</h4>
                <p className="text-sm text-gray-600">{reserva.miembro.tipoPase}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </p>
                <p className="text-sm font-semibold text-gray-900">{reserva.miembro.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Teléfono
                </p>
                <p className="text-sm font-semibold text-gray-900">{reserva.miembro.telefono}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Créditos Restantes
                </p>
                <p className="text-sm font-semibold text-gray-900">{reserva.miembro.creditosRestantes}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tasa de Asistencia</p>
                <p className="text-sm font-semibold text-gray-900">{reserva.miembro.tasaAsistencia}%</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              Timeline de Eventos
            </h3>
            <div className="space-y-4 relative pl-8">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-200 to-transparent"></div>
              {reserva.timeline.map((evento, index) => (
                <div key={index} className="relative">
                  <div className={`absolute -left-8 w-6 h-6 rounded-full flex items-center justify-center ${
                    evento.tipo === 'creada' ? 'bg-blue-500' :
                    evento.tipo === 'recordatorio' ? 'bg-yellow-500' :
                    evento.tipo === 'asistencia' ? 'bg-green-500' :
                    evento.tipo === 'cancelada' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-gray-900">{evento.descripcion}</p>
                    <p className="text-xs text-gray-500">
                      {new Intl.DateTimeFormat('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(evento.fechaHora)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-3xl border-t border-gray-200 flex justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Cerrar
          </motion.button>
          {reserva.estado === 'confirmada' && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Marcar Asistencia
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCancelar(reserva)}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Cancelar Reserva
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// COMPONENTE: Modal Crear Reserva
const ModalCrearReserva: React.FC<{ onClose: () => void; onCrear: (reserva: Reserva) => void }> = ({ onClose, onCrear }) => {
  const [paso, setPaso] = useState(1);
  const [miembroSeleccionado, setMiembroSeleccionado] = useState<Miembro | null>(null);
  const [claseSeleccionada, setClaseSeleccionada] = useState<any>(null);
  const [busquedaMiembro, setBusquedaMiembro] = useState('');

  const miembros = getMiembrosMock();
  const clases = getClasesMock();

  const miembrosFiltrados = miembros.filter(m =>
    m.nombre.toLowerCase().includes(busquedaMiembro.toLowerCase()) ||
    m.email.toLowerCase().includes(busquedaMiembro.toLowerCase())
  );

  const handleCrear = () => {
    if (!miembroSeleccionado || !claseSeleccionada) return;

    const nuevaReserva: Reserva = {
      id: `r${Date.now()}`,
      numeroReserva: `#${String(Math.floor(Math.random() * 100000) + 10000).padStart(6, '0')}`,
      miembro: miembroSeleccionado,
      clase: claseSeleccionada,
      estado: 'confirmada',
      fechaReserva: new Date(),
      metodoReserva: 'presencial',
      timeline: [{
        tipo: 'creada',
        descripcion: 'Reserva creada manualmente',
        fechaHora: new Date()
      }]
    };

    onCrear(nuevaReserva);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Crear Nueva Reserva</h2>
              <p className="text-purple-100">Paso {paso} de 3</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4 w-full bg-purple-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${(paso / 3) * 100}%` }}
              className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full"
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {paso === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Seleccionar Miembro</h3>
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar miembro por nombre o email..."
                  value={busquedaMiembro}
                  onChange={(e) => setBusquedaMiembro(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none"
                />
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {miembrosFiltrados.map(miembro => (
                  <motion.div
                    key={miembro.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setMiembroSeleccionado(miembro)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      miembroSeleccionado?.id === miembro.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                        {miembro.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{miembro.nombre}</h4>
                        <p className="text-sm text-gray-600">{miembro.email}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-500">{miembro.tipoPase}</span>
                          <span className="text-xs text-gray-500">Créditos: {miembro.creditosRestantes}</span>
                        </div>
                      </div>
                      {miembroSeleccionado?.id === miembro.id && (
                        <CheckCircle className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {paso === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Seleccionar Clase</h3>
              <div className="space-y-2">
                {clases.map(clase => (
                  <motion.div
                    key={clase.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setClaseSeleccionada(clase)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      claseSeleccionada?.id === clase.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{clase.nombre}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            clase.tipo === 'Yoga' ? 'bg-purple-100 text-purple-700' :
                            clase.tipo === 'Pilates' ? 'bg-pink-100 text-pink-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {clase.tipo}
                          </span>
                          <span className="text-sm text-gray-600">{clase.coach}</span>
                          <span className="text-sm text-gray-600">
                            {new Intl.DateTimeFormat('es-ES', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            }).format(clase.fechaHora)}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Disponibilidad</span>
                            <span>{clase.reservasActuales} / {clase.capacidadMaxima}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                              style={{ width: `${(clase.reservasActuales / clase.capacidadMaxima) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      {claseSeleccionada?.id === clase.id && (
                        <CheckCircle className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {paso === 3 && miembroSeleccionado && claseSeleccionada && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Confirmar Reserva</h3>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Resumen</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Miembro</p>
                    <p className="font-semibold text-gray-900">{miembroSeleccionado.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Clase</p>
                    <p className="font-semibold text-gray-900">{claseSeleccionada.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fecha y Hora</p>
                    <p className="font-semibold text-gray-900">
                      {new Intl.DateTimeFormat('es-ES', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }).format(claseSeleccionada.fechaHora)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Créditos Restantes</p>
                    <p className="font-semibold text-gray-900">{miembroSeleccionado.creditosRestantes} → {miembroSeleccionado.creditosRestantes - 1}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enviar-confirmacion"
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  defaultChecked
                />
                <label htmlFor="enviar-confirmacion" className="text-sm text-gray-700">
                  Enviar confirmación por email
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-3xl border-t border-gray-200 flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (paso > 1) setPaso(paso - 1);
              else onClose();
            }}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            {paso === 1 ? 'Cancelar' : 'Atrás'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={paso === 1 && !miembroSeleccionado || paso === 2 && !claseSeleccionada}
            onClick={() => {
              if (paso < 3) setPaso(paso + 1);
              else handleCrear();
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {paso === 3 ? 'Crear Reserva' : 'Siguiente'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// COMPONENTE: Modal Check-in Rápido
const ModalCheckInRapido: React.FC<{ reservasHoy: Reserva[]; onClose: () => void }> = ({ reservasHoy, onClose }) => {
  const [checkedIn, setCheckedIn] = useState<Set<string>>(new Set());

  const handleCheckIn = (reservaId: string) => {
    const newSet = new Set(checkedIn);
    if (newSet.has(reservaId)) {
      newSet.delete(reservaId);
    } else {
      newSet.add(reservaId);
    }
    setCheckedIn(newSet);
  };

  const stats = {
    total: reservasHoy.length,
    checkedIn: checkedIn.size,
    pendientes: reservasHoy.length - checkedIn.size
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Check-in Rápido</h2>
              <p className="text-green-100">Clases de hoy</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{stats.checkedIn}</p>
              <p className="text-sm text-gray-600">Check-in</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-orange-600">{stats.pendientes}</p>
              <p className="text-sm text-gray-600">Pendientes</p>
            </div>
          </div>
        </div>

        {/* Lista */}
        <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
          {reservasHoy.map(reserva => (
            <motion.div
              key={reserva.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-2xl border-2 transition-all ${
                checkedIn.has(reserva.id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                  {reserva.miembro.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{reserva.miembro.nombre}</h4>
                  <p className="text-sm text-gray-600">{reserva.clase.nombre}</p>
                  <p className="text-xs text-gray-500">
                    {new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(reserva.clase.fechaHora)}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleCheckIn(reserva.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    checkedIn.has(reserva.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {checkedIn.has(reserva.id) ? 'Presente' : 'Check-in'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-3xl border-t border-gray-200 flex justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Cerrar
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Guardar Check-ins
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// COMPONENTE: Modal Cancelar Reserva
const ModalCancelarReserva: React.FC<{ reserva: Reserva; onClose: () => void; onConfirmar: () => void }> = ({ reserva, onClose, onConfirmar }) => {
  const [razon, setRazon] = useState('');
  const [devolverCredito, setDevolverCredito] = useState(true);
  const [notificarMiembro, setNotificarMiembro] = useState(true);

  const tiempoRestante = reserva.clase.fechaHora.getTime() - new Date().getTime();
  const horasRestantes = Math.floor(tiempoRestante / (1000 * 60 * 60));
  const dentroDeLimite = horasRestantes >= 12;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Cancelar Reserva</h2>
              <p className="text-red-100">{reserva.numeroReserva}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Política de cancelación */}
          <div className={`p-4 rounded-2xl ${dentroDeLimite ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center gap-3 mb-2">
              <Clock className={`w-5 h-5 ${dentroDeLimite ? 'text-green-600' : 'text-red-600'}`} />
              <h3 className={`font-semibold ${dentroDeLimite ? 'text-green-900' : 'text-red-900'}`}>
                Política de Cancelación
              </h3>
            </div>
            <p className={`text-sm ${dentroDeLimite ? 'text-green-700' : 'text-red-700'}`}>
              {dentroDeLimite ? (
                `Quedan ${horasRestantes} horas para la clase. Cancelación dentro del límite: se devolverá el crédito.`
              ) : (
                `Quedan ${horasRestantes} horas para la clase. Cancelación fuera del límite: no se devolverá el crédito.`
              )}
            </p>
            {dentroDeLimite && (
              <div className="mt-2 w-full bg-green-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${Math.min((horasRestantes / 24) * 100, 100)}%` }}
                ></div>
              </div>
            )}
          </div>

          {/* Razón */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Razón de Cancelación</label>
            <select
              value={razon}
              onChange={(e) => setRazon(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
            >
              <option value="">Seleccionar razón...</option>
              <option value="miembro">Miembro solicitó</option>
              <option value="clase-cancelada">Clase cancelada</option>
              <option value="no-show">No-show</option>
              <option value="cambio-horario">Cambio de horario</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Opciones */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={devolverCredito}
                onChange={(e) => setDevolverCredito(e.target.checked)}
                disabled={!dentroDeLimite}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Devolver crédito al miembro</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notificarMiembro}
                onChange={(e) => setNotificarMiembro(e.target.checked)}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Notificar al miembro</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-3xl border-t border-gray-200 flex justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Volver
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!razon}
            onClick={onConfirmar}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Cancelación
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReservasClasePage;
