import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, TrendingUp, AlertTriangle, CheckCircle2, XCircle,
  Search, Filter, Plus, Download, Upload, Wifi, WifiOff,
  Shield, Clock, Users, Activity, Zap, Settings, Eye,
  Lock, Unlock, AlertOctagon, RefreshCw, QrCode, Scan
} from 'lucide-react';

import {
  tarjetas,
  socios,
  registrosAcceso,
  alertas,
  dispositivos,
  reportesPerdida,
  estadisticas,
  getSocioById,
  type Tarjeta,
  type Socio,
  type RegistroAcceso,
  type Alerta
} from './data/mockData';

const TarjetasSociosPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('Todos');
  const [filterTipo, setFilterTipo] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<string>('numeroTarjeta');
  const [showAsignarModal, setShowAsignarModal] = useState(false);
  const [showScannerModal, setShowScannerModal] = useState(false);
  const [showTarjetaModal, setShowTarjetaModal] = useState(false);
  const [selectedTarjeta, setSelectedTarjeta] = useState<Tarjeta | null>(null);
  const [scannerInput, setScannerInput] = useState('');
  const [scannerResult, setScannerResult] = useState<{ success: boolean; message: string; tarjeta?: Tarjeta } | null>(null);

  // Filtrar tarjetas
  const tarjetasFiltradas = tarjetas.filter(tarjeta => {
    const socio = getSocioById(tarjeta.socioId);
    const matchSearch = tarjeta.numeroTarjeta.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (socio && `${socio.nombre} ${socio.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchEstado = filterEstado === 'Todos' || tarjeta.estado === filterEstado;
    const matchTipo = filterTipo === 'Todos' || tarjeta.tipo === filterTipo;

    return matchSearch && matchEstado && matchTipo;
  });

  // Función para escanear tarjeta
  const handleScan = () => {
    const tarjeta = tarjetas.find(t => t.numeroTarjeta === scannerInput);

    if (!tarjeta) {
      setScannerResult({
        success: false,
        message: 'Tarjeta no encontrada en el sistema'
      });
      return;
    }

    if (tarjeta.estado === 'Bloqueada') {
      setScannerResult({
        success: false,
        message: 'Acceso DENEGADO - Tarjeta bloqueada',
        tarjeta
      });
      return;
    }

    if (tarjeta.estado === 'Perdida') {
      setScannerResult({
        success: false,
        message: 'Acceso DENEGADO - Tarjeta reportada como perdida',
        tarjeta
      });
      return;
    }

    if (tarjeta.estado === 'Sin asignar') {
      setScannerResult({
        success: false,
        message: 'Acceso DENEGADO - Tarjeta no asignada',
        tarjeta
      });
      return;
    }

    setScannerResult({
      success: true,
      message: 'Acceso PERMITIDO',
      tarjeta
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 pb-12">
      {/* HERO SECTION */}
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
              <CreditCard className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Tarjetas de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Socios</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestión de <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">tarjetas físicas</span> y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">control de acceso</span>
          </p>

          {/* Botones de acción rápida */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setShowAsignarModal(true)}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 hover:bg-white/30 transition-all duration-300 group"
            >
              <Plus className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-white">Asignar Tarjeta</span>
            </button>
            <button
              onClick={() => setShowScannerModal(true)}
              className="flex items-center gap-2 bg-green-500/20 backdrop-blur-md rounded-full px-6 py-3 border border-green-400/30 hover:bg-green-500/30 transition-all duration-300 group"
            >
              <Scan className="w-5 h-5 text-green-200 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-white">Scanner</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS RÁPIDAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: 'Tarjetas Activas',
            value: estadisticas.totalTarjetasActivas,
            icon: CheckCircle2,
            gradient: 'from-green-500 to-emerald-600',
            bgGradient: 'from-green-500/5 to-emerald-600/5',
            change: '+8.2%',
            positive: true
          },
          {
            title: 'Pendientes Asignar',
            value: estadisticas.tarjetasPendientes,
            icon: Clock,
            gradient: 'from-orange-500 to-amber-600',
            bgGradient: 'from-orange-500/5 to-amber-600/5',
            change: '-3.1%',
            positive: true
          },
          {
            title: 'Bloqueadas/Perdidas',
            value: estadisticas.tarjetasBloqueadas,
            icon: AlertTriangle,
            gradient: 'from-red-500 to-pink-600',
            bgGradient: 'from-red-500/5 to-pink-600/5',
            change: '+2',
            positive: false
          },
          {
            title: 'Accesos Hoy',
            value: estadisticas.accesosHoy,
            icon: Activity,
            gradient: 'from-blue-500 to-purple-600',
            bgGradient: 'from-blue-500/5 to-purple-600/5',
            change: '+15.3%',
            positive: true
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
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-2xl`}></div>

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
                <div className={`p-1 ${stat.positive ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                  <TrendingUp className={`w-4 h-4 ${stat.positive ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <span className={`text-sm font-bold ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
                <span className="text-xs text-gray-500 font-medium">vs anterior</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FILTROS Y BÚSQUEDA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Búsqueda */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por # tarjeta o socio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Filtro Estado */}
          <div>
            <select
              value={filterEstado}
              onChange={(e) => setFilterEstado(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            >
              <option value="Todos">Todos los estados</option>
              <option value="Activa">Activas</option>
              <option value="Bloqueada">Bloqueadas</option>
              <option value="Perdida">Perdidas</option>
              <option value="Sin asignar">Sin asignar</option>
            </select>
          </div>

          {/* Filtro Tipo */}
          <div>
            <select
              value={filterTipo}
              onChange={(e) => setFilterTipo(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            >
              <option value="Todos">Todos los tipos</option>
              <option value="RFID">RFID</option>
              <option value="NFC">NFC</option>
              <option value="Barcode">Barcode</option>
              <option value="QR">QR</option>
              <option value="Biométrica">Biométrica</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* TABLA DE TARJETAS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 mb-8"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Tarjeta</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Socio</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Tipo</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Asignación</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Expiración</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Último Acceso</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tarjetasFiltradas.map((tarjeta, index) => {
                const socio = getSocioById(tarjeta.socioId);
                return (
                  <motion.tr
                    key={tarjeta.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all duration-300"
                  >
                    {/* # Tarjeta */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                          <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-mono text-sm font-bold text-gray-900">{tarjeta.numeroTarjeta}</span>
                      </div>
                    </td>

                    {/* Socio */}
                    <td className="px-6 py-4">
                      {socio ? (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                            {socio.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{socio.nombre} {socio.apellido}</p>
                            <p className="text-xs text-gray-500">{socio.email}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">Sin asignar</span>
                      )}
                    </td>

                    {/* Tipo */}
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        tarjeta.tipo === 'RFID' ? 'bg-blue-100 text-blue-700' :
                        tarjeta.tipo === 'NFC' ? 'bg-purple-100 text-purple-700' :
                        tarjeta.tipo === 'Barcode' ? 'bg-orange-100 text-orange-700' :
                        tarjeta.tipo === 'QR' ? 'bg-green-100 text-green-700' :
                        'bg-pink-100 text-pink-700'
                      }`}>
                        {tarjeta.tipo}
                      </div>
                    </td>

                    {/* Fecha Asignación */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {tarjeta.fechaAsignacion || '-'}
                      </span>
                    </td>

                    {/* Fecha Expiración */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {tarjeta.fechaExpiracion}
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                        tarjeta.estado === 'Activa' ? 'bg-green-100 text-green-700' :
                        tarjeta.estado === 'Bloqueada' ? 'bg-red-100 text-red-700' :
                        tarjeta.estado === 'Perdida' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {tarjeta.estado === 'Activa' && <CheckCircle2 className="w-3 h-3" />}
                        {tarjeta.estado === 'Bloqueada' && <Lock className="w-3 h-3" />}
                        {tarjeta.estado === 'Perdida' && <AlertTriangle className="w-3 h-3" />}
                        {tarjeta.estado}
                      </div>
                    </td>

                    {/* Último Acceso */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {tarjeta.ultimoAcceso ? new Date(tarjeta.ultimoAcceso).toLocaleString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '-'}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedTarjeta(tarjeta);
                            setShowTarjetaModal(true);
                          }}
                          className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                          title="Ver detalles"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button
                          className="p-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
                          title="Asignar/Reasignar"
                        >
                          <RefreshCw className="w-4 h-4 text-purple-600" />
                        </button>
                        {tarjeta.estado === 'Bloqueada' ? (
                          <button
                            className="p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200"
                            title="Desbloquear"
                          >
                            <Unlock className="w-4 h-4 text-green-600" />
                          </button>
                        ) : (
                          <button
                            className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
                            title="Bloquear"
                          >
                            <Lock className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ALERTAS Y DISPOSITIVOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Alertas de Seguridad */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <AlertOctagon className="w-6 h-6" />
              </div>
              Alertas de Seguridad
            </h3>
          </div>

          <div className="p-6 space-y-4">
            {alertas.filter(a => !a.resuelto).map((alerta, index) => {
              const socio = getSocioById(alerta.socioId);
              return (
                <motion.div
                  key={alerta.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`p-4 rounded-2xl border-2 ${
                    alerta.severidad === 'Alta' ? 'bg-red-50 border-red-200' :
                    alerta.severidad === 'Media' ? 'bg-orange-50 border-orange-200' :
                    'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      alerta.severidad === 'Alta' ? 'bg-red-100' :
                      alerta.severidad === 'Media' ? 'bg-orange-100' :
                      'bg-yellow-100'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 ${
                        alerta.severidad === 'Alta' ? 'text-red-600' :
                        alerta.severidad === 'Media' ? 'text-orange-600' :
                        'text-yellow-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          alerta.severidad === 'Alta' ? 'bg-red-600 text-white' :
                          alerta.severidad === 'Media' ? 'bg-orange-600 text-white' :
                          'bg-yellow-600 text-white'
                        }`}>
                          {alerta.tipo}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(alerta.timestamp).toLocaleString('es-ES')}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{alerta.descripcion}</p>
                      {socio && (
                        <p className="text-xs text-gray-600">Socio: {socio.nombre} {socio.apellido}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Dispositivos Conectados */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Wifi className="w-6 h-6" />
              </div>
              Dispositivos Conectados
            </h3>
          </div>

          <div className="p-6 space-y-4">
            {dispositivos.map((dispositivo, index) => (
              <motion.div
                key={dispositivo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      dispositivo.estado === 'Online' ? 'bg-green-100' :
                      dispositivo.estado === 'Offline' ? 'bg-red-100' :
                      'bg-orange-100'
                    }`}>
                      {dispositivo.estado === 'Online' ? (
                        <Wifi className="w-5 h-5 text-green-600" />
                      ) : (
                        <WifiOff className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{dispositivo.nombre}</p>
                      <p className="text-xs text-gray-500">{dispositivo.ubicacion}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    dispositivo.estado === 'Online' ? 'bg-green-100 text-green-700' :
                    dispositivo.estado === 'Offline' ? 'bg-red-100 text-red-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {dispositivo.estado}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Accesos hoy: <strong>{dispositivo.accesosHoy}</strong></span>
                  <span>Sync: {new Date(dispositivo.ultimaSincronizacion).toLocaleTimeString('es-ES')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* MODAL SCANNER */}
      <AnimatePresence>
        {showScannerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowScannerModal(false);
              setScannerInput('');
              setScannerResult(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full p-8 border border-white/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                  <Scan className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Scanner de Tarjetas</h2>
                <p className="text-gray-600">Escanea o ingresa el código de la tarjeta</p>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={scannerInput}
                    onChange={(e) => setScannerInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleScan()}
                    placeholder="Ej: RFID-001-2345"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none text-center text-lg font-mono"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleScan}
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300"
                >
                  Validar Acceso
                </button>
              </div>

              {/* Resultado del escaneo */}
              {scannerResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-6 rounded-2xl ${
                    scannerResult.success
                      ? 'bg-green-50 border-2 border-green-500'
                      : 'bg-red-50 border-2 border-red-500'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-full ${
                      scannerResult.success ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {scannerResult.success ? (
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      ) : (
                        <XCircle className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${
                        scannerResult.success ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {scannerResult.message}
                      </h3>
                      {scannerResult.tarjeta && (
                        <p className="text-sm text-gray-600 mt-1">
                          {scannerResult.tarjeta.numeroTarjeta}
                        </p>
                      )}
                    </div>
                  </div>

                  {scannerResult.tarjeta && scannerResult.tarjeta.socioId && (
                    <div className="bg-white/50 rounded-xl p-4">
                      {(() => {
                        const socio = getSocioById(scannerResult.tarjeta!.socioId);
                        return socio ? (
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-2xl">
                              {socio.avatar}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{socio.nombre} {socio.apellido}</p>
                              <p className="text-sm text-gray-600">{socio.tipoMembresia}</p>
                            </div>
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL TARJETA VIRTUAL */}
      <AnimatePresence>
        {showTarjetaModal && selectedTarjeta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowTarjetaModal(false);
              setSelectedTarjeta(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full p-8 border border-white/50 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const socio = getSocioById(selectedTarjeta.socioId);
                return (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Detalles de Tarjeta</h2>

                    {/* Tarjeta Virtual */}
                    <div className="mb-8">
                      <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-3xl overflow-hidden shadow-2xl">
                        {/* Front de la tarjeta */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 flex flex-col justify-between">
                          {/* Pattern de fondo */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                              backgroundSize: '20px 20px'
                            }}></div>
                          </div>

                          <div className="relative z-10">
                            {/* Logo y Tipo */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="bg-white/20 backdrop-blur-md rounded-xl px-4 py-2">
                                <span className="text-white font-bold text-lg">GYM STUDIO</span>
                              </div>
                              <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1">
                                <span className="text-white text-sm font-bold">{selectedTarjeta.tipo}</span>
                              </div>
                            </div>

                            {/* Foto y Nombre */}
                            {socio && (
                              <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-3xl border-2 border-white/30">
                                  {socio.avatar}
                                </div>
                                <div>
                                  <p className="text-white font-bold text-xl">{socio.nombre} {socio.apellido}</p>
                                  <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold inline-block mt-1">
                                    {socio.tipoMembresia}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Número de Tarjeta */}
                            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 mb-4">
                              <p className="text-white/70 text-xs mb-1">NÚMERO DE TARJETA</p>
                              <p className="text-white font-mono font-bold text-lg tracking-wider">
                                {selectedTarjeta.numeroTarjeta}
                              </p>
                            </div>

                            {/* Fecha de Expiración */}
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white/70 text-xs">VÁLIDA HASTA</p>
                                <p className="text-white font-bold">{selectedTarjeta.fechaExpiracion}</p>
                              </div>
                              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
                                <QrCode className="w-10 h-10 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Información adicional */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-sm text-gray-600 mb-1">Estado</p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${
                          selectedTarjeta.estado === 'Activa' ? 'bg-green-100 text-green-700' :
                          selectedTarjeta.estado === 'Bloqueada' ? 'bg-red-100 text-red-700' :
                          selectedTarjeta.estado === 'Perdida' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {selectedTarjeta.estado}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-sm text-gray-600 mb-1">Último Acceso</p>
                        <p className="font-semibold text-gray-900">
                          {selectedTarjeta.ultimoAcceso
                            ? new Date(selectedTarjeta.ultimoAcceso).toLocaleString('es-ES')
                            : 'Sin registros'}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-sm text-gray-600 mb-1">Fecha de Asignación</p>
                        <p className="font-semibold text-gray-900">{selectedTarjeta.fechaAsignacion || '-'}</p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-sm text-gray-600 mb-1">Horario Permitido</p>
                        <p className="font-semibold text-gray-900">{selectedTarjeta.permisos.horario}</p>
                      </div>
                    </div>

                    {/* Permisos de Áreas */}
                    <div className="mt-6 bg-gray-50 rounded-2xl p-4">
                      <p className="text-sm text-gray-600 mb-3">Áreas Permitidas</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedTarjeta.permisos.areas.length > 0 ? (
                          selectedTarjeta.permisos.areas.map((area, idx) => (
                            <div key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                              {area}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">Sin áreas asignadas</p>
                        )}
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TarjetasSociosPage;
