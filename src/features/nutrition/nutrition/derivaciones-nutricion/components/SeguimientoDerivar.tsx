import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, ChevronDown, User, MessageCircle, Clock, FileText,
  Send, Paperclip, CheckCircle, AlertCircle, TrendingUp, Users
} from 'lucide-react';
import { getDerivaciones, addMensaje, DerivacionExtendida, Mensaje } from '../derivacionesNutricionApi';

const SeguimientoDerivar: React.FC = () => {
  const [derivaciones, setDerivaciones] = useState<DerivacionExtendida[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDerivacionId, setSelectedDerivacionId] = useState<string | null>(null);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [enviandoMensaje, setEnviandoMensaje] = useState(false);

  const selectedDerivacion = derivaciones.find(d => d.id === selectedDerivacionId);

  useEffect(() => {
    const fetchDerivaciones = async () => {
      try {
        const data = await getDerivaciones();
        setDerivaciones(data);
      } catch (err) {
        console.error('Error al cargar derivaciones:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDerivaciones();
  }, []);

  const handleEnviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !selectedDerivacionId) return;

    setEnviandoMensaje(true);
    try {
      const mensaje: Omit<Mensaje, 'id'> = {
        remitente: 'entrenador',
        nombre: 'Coach López',
        avatar: '🏋️',
        mensaje: nuevoMensaje,
        fecha: new Date().toLocaleString('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const derivacionActualizada = await addMensaje(selectedDerivacionId, mensaje);

      if (derivacionActualizada) {
        setDerivaciones(prev =>
          prev.map(d => d.id === selectedDerivacionId ? derivacionActualizada : d)
        );
        setNuevoMensaje('');
      }
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
    } finally {
      setEnviandoMensaje(false);
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Completada':
        return 'bg-green-500 text-white';
      case 'En Proceso':
        return 'bg-blue-500 text-white';
      case 'Aceptada':
        return 'bg-indigo-500 text-white';
      case 'Pendiente':
        return 'bg-yellow-500 text-white';
      case 'Rechazada':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getEstadoIcon = (estado: string) => {
    switch (estado) {
      case 'Completada':
        return <CheckCircle className="w-5 h-5" />;
      case 'En Proceso':
        return <Activity className="w-5 h-5" />;
      case 'Aceptada':
        return <CheckCircle className="w-5 h-5" />;
      case 'Pendiente':
        return <Clock className="w-5 h-5" />;
      case 'Rechazada':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg font-semibold text-gray-700">Cargando seguimiento...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl mb-8 p-8 md:p-12"
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
              <Activity className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Seguimiento de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Derivaciones</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Monitorea el progreso y <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">comunícate</span> con los nutricionistas
          </p>

          {/* Stats Pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">Seguimiento Activo</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <MessageCircle className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">Comunicación Directa</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Selector de Derivación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
            <Users className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Seleccionar Derivación</h2>
        </div>

        <div className="relative">
          <select
            value={selectedDerivacionId || ''}
            onChange={(e) => setSelectedDerivacionId(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none pr-10 font-semibold text-gray-700"
          >
            <option value="">-- Seleccione una derivación --</option>
            {derivaciones.map((derivacion) => (
              <option key={derivacion.id} value={derivacion.id}>
                {derivacion.clienteNombre} → {derivacion.nutricionistaNombre} ({derivacion.fechaDerivacion})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {selectedDerivacionId && (
          <div className="mt-4 text-sm text-gray-600">
            Derivación seleccionada: <span className="font-bold text-indigo-600">{selectedDerivacion?.clienteNombre}</span>
          </div>
        )}
      </motion.div>

      {/* Panel de Seguimiento */}
      <AnimatePresence mode="wait">
        {selectedDerivacion ? (
          <motion.div
            key={selectedDerivacion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Columna Izquierda - Info y Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* Info del Cliente y Nutricionista */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
              >
                {/* Decoración de fondo */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-5 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                    Información de la Derivación
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cliente */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Cliente</p>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl shadow-lg">
                          {selectedDerivacion.clienteAvatar}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{selectedDerivacion.clienteNombre}</p>
                          <p className="text-sm text-gray-600">ID: {selectedDerivacion.clienteId}</p>
                        </div>
                      </div>
                    </div>

                    {/* Nutricionista */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Nutricionista</p>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl shadow-lg">
                          👨‍⚕️
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{selectedDerivacion.nutricionistaNombre}</p>
                          <p className="text-sm text-gray-600">Profesional</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Estado y Progreso */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-2xl p-4 border border-gray-200">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Estado</p>
                      <div className={`px-3 py-2 ${getEstadoColor(selectedDerivacion.estado)} text-sm font-bold rounded-xl inline-flex items-center gap-2`}>
                        {getEstadoIcon(selectedDerivacion.estado)}
                        {selectedDerivacion.estado}
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-gray-200">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Fecha</p>
                      <p className="text-lg font-bold text-gray-900">{selectedDerivacion.fechaDerivacion}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 border border-gray-200">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Última Actualización</p>
                      <p className="text-lg font-bold text-gray-900">{selectedDerivacion.ultimaActualizacion}</p>
                    </div>
                  </div>

                  {/* Motivo */}
                  <div className="mt-4 bg-white rounded-2xl p-4 border border-gray-200">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Motivo</p>
                    <p className="text-gray-700">{selectedDerivacion.motivo}</p>
                  </div>
                </div>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
              >
                {/* Decoración de fondo */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Activity className="w-5 h-5 text-purple-600" />
                    </div>
                    Timeline de Eventos
                  </h3>

                  <div className="space-y-4 relative">
                    {/* Línea vertical */}
                    <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200"></div>

                    {selectedDerivacion.timeline.map((evento, index) => (
                      <motion.div
                        key={evento.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        className="flex items-start gap-4 relative"
                      >
                        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl shadow-lg z-10">
                          {evento.icono}
                        </div>
                        <div className="flex-1 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-gray-900">{evento.titulo}</h4>
                            <span className="text-xs text-gray-500 font-medium">{evento.fecha}</span>
                          </div>
                          <p className="text-sm text-gray-700">{evento.descripcion}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Columna Derecha - Chat */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden h-full flex flex-col"
              >
                {/* Header del Chat */}
                <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  <div className="relative z-10 flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Chat Colaborativo</h3>
                      <p className="text-sm text-blue-100">Comunicación directa</p>
                    </div>
                  </div>
                </div>

                {/* Mensajes */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-96">
                  {selectedDerivacion.mensajes && selectedDerivacion.mensajes.length > 0 ? (
                    selectedDerivacion.mensajes.map((mensaje, index) => (
                      <motion.div
                        key={mensaje.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                        className={`flex items-start gap-3 ${
                          mensaje.remitente === 'entrenador' ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-lg ${
                          mensaje.remitente === 'entrenador'
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                            : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                        }`}>
                          {mensaje.avatar}
                        </div>
                        <div className={`flex-1 ${mensaje.remitente === 'entrenador' ? 'text-right' : ''}`}>
                          <div className={`inline-block rounded-2xl p-4 max-w-[85%] ${
                            mensaje.remitente === 'entrenador'
                              ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200'
                              : 'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200'
                          }`}>
                            <p className="text-xs font-bold text-gray-500 mb-1">{mensaje.nombre}</p>
                            <p className="text-sm text-gray-700 leading-relaxed">{mensaje.mensaje}</p>
                            <p className="text-xs text-gray-500 mt-2">{mensaje.fecha}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">No hay mensajes aún</p>
                      <p className="text-sm text-gray-400 mt-1">Inicia la conversación</p>
                    </div>
                  )}
                </div>

                {/* Input de Mensaje */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-end gap-3">
                    <div className="flex-1">
                      <textarea
                        value={nuevoMensaje}
                        onChange={(e) => setNuevoMensaje(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleEnviarMensaje();
                          }
                        }}
                        placeholder="Escribe un mensaje..."
                        rows={2}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none text-sm"
                      />
                    </div>
                    <button
                      onClick={handleEnviarMensaje}
                      disabled={!nuevoMensaje.trim() || enviandoMensaje}
                      className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {enviandoMensaje ? (
                        <Clock className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Presiona <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd> para enviar
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full flex items-center justify-center">
              <Activity className="w-12 h-12 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Selecciona una Derivación</h3>
            <p className="text-gray-600">Elige una derivación del selector para ver su seguimiento y chat</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SeguimientoDerivar;
