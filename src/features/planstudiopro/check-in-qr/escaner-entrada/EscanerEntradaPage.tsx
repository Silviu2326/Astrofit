import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  QrCode, Users, Clock, Zap, TrendingUp, CheckCircle, XCircle,
  AlertTriangle, Search, Camera, CameraOff, Maximize2, User,
  Calendar, CreditCard, MapPin, Activity, ArrowUpRight, Sparkles
} from 'lucide-react';
import {
  simularEscaneoQR,
  obtenerEstadisticasHoy,
  obtenerClaseActual,
  obtenerCheckInsRecientes,
  buscarMiembro,
  confirmarCheckIn,
  type MiembroInfo,
  type EscaneoResultado,
  type EstadisticasHoy,
  type ClaseActual,
  type CheckInRegistro
} from './escanerEntradaApi';

const EscanerEntradaPage: React.FC = () => {
  // Estados principales
  const [estadisticas, setEstadisticas] = useState<EstadisticasHoy | null>(null);
  const [claseActual, setClaseActual] = useState<ClaseActual | null>(null);
  const [checkInsRecientes, setCheckInsRecientes] = useState<Array<CheckInRegistro & { miembro: MiembroInfo }>>([]);
  const [escaneando, setEscaneando] = useState(false);
  const [resultadoEscaneo, setResultadoEscaneo] = useState<EscaneoResultado | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [camaraActiva, setCamaraActiva] = useState(true);
  const [modoManual, setModoManual] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [resultadosBusqueda, setResultadosBusqueda] = useState<MiembroInfo[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    setEstadisticas(obtenerEstadisticasHoy());
    setClaseActual(obtenerClaseActual());
    setCheckInsRecientes(obtenerCheckInsRecientes(20));
  }, []);

  // Buscar miembros
  useEffect(() => {
    if (busqueda.length >= 2) {
      buscarMiembro(busqueda).then(setResultadosBusqueda);
    } else {
      setResultadosBusqueda([]);
    }
  }, [busqueda]);

  // Simular escaneo QR
  const handleEscanear = async () => {
    setEscaneando(true);
    setResultadoEscaneo(null);
    setMostrarResultado(false);

    try {
      const resultado = await simularEscaneoQR();
      setResultadoEscaneo(resultado);
      setMostrarResultado(true);

      // Auto-cerrar si es exitoso sin alertas
      if (resultado.exitoso && !resultado.alerta) {
        setTimeout(() => {
          setMostrarResultado(false);
          // Actualizar datos
          setEstadisticas(obtenerEstadisticasHoy());
          setCheckInsRecientes(obtenerCheckInsRecientes(20));
        }, 3000);
      }
    } catch (error) {
      console.error('Error al escanear:', error);
    } finally {
      setEscaneando(false);
    }
  };

  // Check-in manual
  const handleCheckInManual = async (miembro: MiembroInfo) => {
    setResultadoEscaneo({ exitoso: true, miembro });
    setMostrarResultado(true);
    setBusqueda('');
    setResultadosBusqueda([]);
  };

  // Confirmar check-in
  const handleConfirmarCheckIn = async () => {
    if (!resultadoEscaneo?.miembro) return;

    await confirmarCheckIn(resultadoEscaneo.miembro.id, resultadoEscaneo.miembro.clase?.nombre);
    setMostrarResultado(false);
    setEstadisticas(obtenerEstadisticasHoy());
    setCheckInsRecientes(obtenerCheckInsRecientes(20));
  };

  // Calcular tiempo relativo
  const tiempoRelativo = (fecha: Date): string => {
    const ahora = new Date();
    const diffMs = ahora.getTime() - fecha.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins === 1) return 'Hace 1 min';
    if (diffMins < 60) return `Hace ${diffMins} min`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return 'Hace 1 hora';
    return `Hace ${diffHours} horas`;
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
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <QrCode className="w-10 h-10 text-cyan-200 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-cyan-200 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Check-in <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-200">QR</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Escanea y registra <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">asistencia al instante</span>
          </p>
        </div>
      </motion.div>

      {/* ESTADÍSTICAS DE HOY */}
      {estadisticas && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              titulo: 'Check-ins Hoy',
              valor: estadisticas.checkInsHoy,
              icono: Users,
              gradiente: 'from-blue-500 to-cyan-600',
              cambio: '+12%'
            },
            {
              titulo: 'Última Hora',
              valor: estadisticas.checkInsUltimaHora,
              icono: Clock,
              gradiente: 'from-purple-500 to-indigo-600',
              cambio: '+8%'
            },
            {
              titulo: 'Promedio Check-in',
              valor: estadisticas.promedioCheckIn,
              icono: Zap,
              gradiente: 'from-emerald-500 to-teal-600',
              cambio: '-0.2s'
            },
            {
              titulo: 'Capacidad Actual',
              valor: `${estadisticas.capacidadActual}/${estadisticas.capacidadMaxima}`,
              icono: Activity,
              gradiente: 'from-orange-500 to-red-600',
              cambio: `${Math.round((estadisticas.capacidadActual / estadisticas.capacidadMaxima) * 100)}%`
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
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.gradiente} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradiente} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icono className="w-8 h-8" />
                </div>

                <p className="text-sm font-semibold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.titulo}
                </p>

                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {stat.valor}
                </p>

                <div className="flex items-center gap-2">
                  <div className="p-1 bg-green-50 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-bold text-green-600">{stat.cambio}</span>
                  <span className="text-xs text-gray-500 font-medium">vs anterior</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMNA IZQUIERDA - Escáner y Clase Actual */}
        <div className="lg:col-span-2 space-y-6">
          {/* ESCÁNER QR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Camera className="w-6 h-6" />
                  </div>
                  Escáner QR
                </h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => setModoManual(!modoManual)}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                      modoManual
                        ? 'bg-white text-blue-600'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {modoManual ? 'Modo QR' : 'Modo Manual'}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8">
              {!modoManual ? (
                <>
                  {/* Área de escaneo */}
                  <div className="relative mb-6">
                    <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden relative">
                      {camaraActiva ? (
                        <>
                          {/* Simulación de cámara */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 h-64 border-4 border-cyan-400 rounded-2xl relative animate-pulse">
                              {/* Corners */}
                              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-2xl"></div>
                              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-2xl"></div>
                              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-2xl"></div>
                              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-2xl"></div>

                              {/* Scanning line */}
                              {escaneando && (
                                <motion.div
                                  animate={{ y: [0, 256, 0] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-x-0 h-1 bg-cyan-400 shadow-lg shadow-cyan-400/50"
                                />
                              )}
                            </div>
                          </div>

                          {/* Instrucciones */}
                          <div className="absolute bottom-4 left-0 right-0 text-center">
                            <p className="text-white font-semibold bg-black/50 backdrop-blur-sm py-2 px-4 rounded-full inline-block">
                              {escaneando ? 'Procesando...' : 'Coloca el código QR dentro del recuadro'}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <CameraOff className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 font-semibold">Cámara desactivada</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Controles de cámara */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button
                        onClick={() => setCamaraActiva(!camaraActiva)}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-all duration-300 shadow-lg"
                      >
                        {camaraActiva ? <Camera className="w-5 h-5 text-gray-700" /> : <CameraOff className="w-5 h-5 text-gray-700" />}
                      </button>
                      <button className="p-3 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-all duration-300 shadow-lg">
                        <Maximize2 className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  </div>

                  {/* Botón de escaneo */}
                  <button
                    onClick={handleEscanear}
                    disabled={escaneando || !camaraActiva}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {escaneando ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Procesando...
                        </>
                      ) : (
                        <>
                          <QrCode className="w-6 h-6" />
                          Simular Escaneo QR
                        </>
                      )}
                    </span>
                  </button>
                </>
              ) : (
                <>
                  {/* CHECK-IN MANUAL */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar por nombre, email, teléfono o ID..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm text-lg"
                      />
                    </div>

                    {/* Resultados de búsqueda */}
                    {resultadosBusqueda.length > 0 && (
                      <div className="max-h-96 overflow-y-auto space-y-2">
                        {resultadosBusqueda.map((miembro) => (
                          <button
                            key={miembro.id}
                            onClick={() => handleCheckInManual(miembro)}
                            className="w-full p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-2xl transition-all duration-300 text-left border-2 border-transparent hover:border-blue-300"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg">
                                {miembro.avatar ? (
                                  <img src={miembro.avatar} alt={miembro.nombre} className="w-full h-full rounded-xl object-cover" />
                                ) : (
                                  <span className="text-lg">{miembro.nombre.charAt(0)}</span>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-gray-900">{miembro.nombre}</p>
                                <p className="text-sm text-gray-600">{miembro.email}</p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                miembro.membresia.estado === 'activo'
                                  ? 'bg-green-100 text-green-700'
                                  : miembro.membresia.estado === 'por-vencer'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {miembro.membresia.tipo}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* CLASE ACTUAL */}
          {claseActual && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Activity className="w-6 h-6" />
                  </div>
                  Clase en Curso
                </h3>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{claseActual.nombre}</h4>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4" />
                      {claseActual.horario}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Coach</p>
                    <p className="font-bold text-gray-900">{claseActual.coach}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-gray-600">Asistencia</span>
                    <span className="text-gray-900">
                      {claseActual.checkedIn} / {claseActual.inscritos} inscritos
                    </span>
                  </div>

                  <div className="w-full bg-purple-100 rounded-full h-4 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(claseActual.checkedIn / claseActual.inscritos) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                    </motion.div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Capacidad: {claseActual.inscritos}/{claseActual.capacidadTotal}
                    </span>
                    <span className={`font-bold ${
                      claseActual.inscritos < claseActual.capacidadTotal * 0.8
                        ? 'text-green-600'
                        : 'text-orange-600'
                    }`}>
                      {claseActual.capacidadTotal - claseActual.inscritos} cupos
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* COLUMNA DERECHA - Check-ins Recientes */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden sticky top-4"
          >
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="w-6 h-6" />
                </div>
                Actividad en Vivo
              </h3>
            </div>

            <div className="p-6 max-h-[600px] overflow-y-auto">
              <div className="space-y-3">
                {checkInsRecientes.map((checkIn, index) => (
                  <motion.div
                    key={checkIn.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300 border border-transparent hover:border-cyan-100 hover:shadow-md group relative"
                  >
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br from-cyan-400 to-blue-600">
                      {checkIn.miembro.avatar ? (
                        <img src={checkIn.miembro.avatar} alt={checkIn.miembro.nombre} className="w-full h-full rounded-xl object-cover" />
                      ) : (
                        <span className="text-sm">{checkIn.miembro.nombre.charAt(0)}</span>
                      )}
                    </div>

                    {/* Contenido */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {checkIn.miembro.nombre}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {checkIn.miembro.clase?.nombre || 'General'}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 font-medium">
                          {tiempoRelativo(checkIn.timestamp)}
                        </span>
                        {checkIn.exitoso ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 text-orange-500" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MODAL DE RESULTADO */}
      <AnimatePresence>
        {mostrarResultado && resultadoEscaneo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setMostrarResultado(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {resultadoEscaneo.exitoso ? (
                <>
                  {/* Resultado Exitoso */}
                  <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                      className="relative z-10"
                    >
                      <CheckCircle className="w-20 h-20 text-white mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-white mb-2">
                        ¡Bienvenido!
                      </h3>
                      <p className="text-green-50 text-lg">Check-in exitoso</p>
                    </motion.div>
                  </div>

                  <div className="p-8">
                    {resultadoEscaneo.miembro && (
                      <>
                        {/* Avatar y nombre */}
                        <div className="text-center mb-6">
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center text-white font-bold shadow-xl mx-auto mb-4">
                            {resultadoEscaneo.miembro.avatar ? (
                              <img src={resultadoEscaneo.miembro.avatar} alt={resultadoEscaneo.miembro.nombre} className="w-full h-full rounded-2xl object-cover" />
                            ) : (
                              <span className="text-4xl">{resultadoEscaneo.miembro.nombre.charAt(0)}</span>
                            )}
                          </div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-1">
                            {resultadoEscaneo.miembro.nombre}
                          </h4>
                          <p className="text-gray-600">{resultadoEscaneo.miembro.email}</p>
                        </div>

                        {/* Información de membresía */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm text-gray-600 flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              Membresía
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              resultadoEscaneo.miembro.membresia.estado === 'activo'
                                ? 'bg-green-100 text-green-700'
                                : resultadoEscaneo.miembro.membresia.estado === 'por-vencer'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {resultadoEscaneo.miembro.membresia.tipo}
                            </span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <span className="text-sm text-gray-600 flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Vencimiento
                            </span>
                            <span className="font-bold text-gray-900">
                              {resultadoEscaneo.miembro.membresia.fechaVencimiento}
                            </span>
                          </div>

                          {resultadoEscaneo.miembro.membresia.creditos !== undefined && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                              <span className="text-sm text-gray-600 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Créditos
                              </span>
                              <span className="font-bold text-gray-900">
                                {resultadoEscaneo.miembro.membresia.creditos} / {resultadoEscaneo.miembro.membresia.creditosTotales}
                              </span>
                            </div>
                          )}

                          {resultadoEscaneo.miembro.clase && (
                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                              <span className="text-sm text-blue-600 flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Clase
                              </span>
                              <div className="text-right">
                                <p className="font-bold text-blue-900">{resultadoEscaneo.miembro.clase.nombre}</p>
                                <p className="text-xs text-blue-600">{resultadoEscaneo.miembro.clase.horario}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3">
                          <button
                            onClick={handleConfirmarCheckIn}
                            className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <CheckCircle className="w-5 h-5" />
                            Confirmar
                          </button>
                          <button
                            onClick={() => setMostrarResultado(false)}
                            className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all duration-300"
                          >
                            Cancelar
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Resultado con Alerta */}
                  <div className={`p-8 text-center relative overflow-hidden ${
                    resultadoEscaneo.alerta?.tipo === 'membresia-vencida'
                      ? 'bg-gradient-to-r from-red-500 via-orange-500 to-pink-500'
                      : resultadoEscaneo.alerta?.tipo === 'sin-creditos'
                      ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500'
                      : 'bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800'
                  }`}>
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                      className="relative z-10"
                    >
                      {resultadoEscaneo.alerta?.tipo === 'codigo-invalido' ? (
                        <XCircle className="w-20 h-20 text-white mx-auto mb-4" />
                      ) : (
                        <AlertTriangle className="w-20 h-20 text-white mx-auto mb-4" />
                      )}
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {resultadoEscaneo.alerta?.tipo === 'codigo-invalido' ? 'Código Inválido' : 'Alerta'}
                      </h3>
                      <p className="text-white/90 text-lg">
                        {resultadoEscaneo.alerta?.mensaje}
                      </p>
                    </motion.div>
                  </div>

                  <div className="p-8">
                    {resultadoEscaneo.miembro && (
                      <>
                        {/* Información del miembro */}
                        <div className="text-center mb-6">
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold shadow-xl mx-auto mb-4">
                            {resultadoEscaneo.miembro.avatar ? (
                              <img src={resultadoEscaneo.miembro.avatar} alt={resultadoEscaneo.miembro.nombre} className="w-full h-full rounded-2xl object-cover" />
                            ) : (
                              <span className="text-4xl">{resultadoEscaneo.miembro.nombre.charAt(0)}</span>
                            )}
                          </div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-1">
                            {resultadoEscaneo.miembro.nombre}
                          </h4>
                          <p className="text-gray-600">{resultadoEscaneo.miembro.email}</p>
                        </div>

                        {/* Sugerencia */}
                        {resultadoEscaneo.alerta?.sugerencia && (
                          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl mb-6">
                            <p className="text-sm text-blue-800">
                              <span className="font-bold">Sugerencia:</span> {resultadoEscaneo.alerta.sugerencia}
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {/* Botones */}
                    <div className="flex gap-3">
                      {resultadoEscaneo.miembro && (
                        <button
                          onClick={handleConfirmarCheckIn}
                          className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                          Permitir esta vez
                        </button>
                      )}
                      <button
                        onClick={() => setMostrarResultado(false)}
                        className="flex-1 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-5 h-5" />
                        Denegar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EscanerEntradaPage;
