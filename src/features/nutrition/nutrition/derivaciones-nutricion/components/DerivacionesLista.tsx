import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardList, Filter, ChevronDown, Clock, User, AlertCircle,
  CheckCircle, X, Eye, Calendar, FileText, Activity
} from 'lucide-react';
import { getDerivaciones, updateDerivacionStatus, DerivacionExtendida } from '../derivacionesNutricionApi';

const DerivacionesLista: React.FC = () => {
  const [derivaciones, setDerivaciones] = useState<DerivacionExtendida[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDerivacion, setSelectedDerivacion] = useState<DerivacionExtendida | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroUrgencia, setFiltroUrgencia] = useState<string>('todas');
  const [vistaActual, setVistaActual] = useState<'cards' | 'tabla'>('cards');

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

  const derivacionesFiltradas = derivaciones.filter(d => {
    const cumpleEstado = filtroEstado === 'todos' || d.estado === filtroEstado;
    const cumpleUrgencia = filtroUrgencia === 'todas' || d.urgencia === filtroUrgencia;
    return cumpleEstado && cumpleUrgencia;
  });

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

  const getUrgenciaColor = (urgencia: string) => {
    switch (urgencia) {
      case 'Urgente':
        return 'bg-gradient-to-r from-red-500 to-orange-500 text-white';
      case 'Alta':
        return 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white';
      case 'Normal':
        return 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white';
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
        return <X className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const handleStatusChange = async (id: string, newStatus: DerivacionExtendida['estado']) => {
    try {
      await updateDerivacionStatus(id, newStatus);
      setDerivaciones(prev =>
        prev.map(derivacion =>
          derivacion.id === id ? { ...derivacion, estado: newStatus } : derivacion
        )
      );
    } catch (err) {
      console.error('Error al actualizar estado:', err);
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
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg font-semibold text-gray-700">Cargando derivaciones...</p>
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

        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <ClipboardList className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Historial de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Derivaciones</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona y monitorea todas las <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">derivaciones nutricionales</span> en un solo lugar
          </p>

          {/* Stats Pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <ClipboardList className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{derivaciones.length} Derivaciones</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Activity className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-white">{derivaciones.filter(d => d.estado === 'En Proceso').length} En Proceso</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filtros y Vista */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
          </div>

          {/* Toggle Vista */}
          <div className="flex gap-2 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setVistaActual('cards')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                vistaActual === 'cards' ? 'bg-white shadow-md text-indigo-600' : 'text-gray-600'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setVistaActual('tabla')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                vistaActual === 'tabla' ? 'bg-white shadow-md text-indigo-600' : 'text-gray-600'
              }`}
            >
              Tabla
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Filtro Estado */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
            <div className="relative">
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none pr-10"
              >
                <option value="todos">Todos los estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aceptada">Aceptada</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Completada">Completada</option>
                <option value="Rechazada">Rechazada</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Filtro Urgencia */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Urgencia</label>
            <div className="relative">
              <select
                value={filtroUrgencia}
                onChange={(e) => setFiltroUrgencia(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none pr-10"
              >
                <option value="todas">Todas las urgencias</option>
                <option value="Normal">Normal</option>
                <option value="Alta">Alta</option>
                <option value="Urgente">Urgente</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Contador resultados */}
        <div className="mt-4 text-sm text-gray-600">
          Mostrando <span className="font-bold text-indigo-600">{derivacionesFiltradas.length}</span> de {derivaciones.length} derivaciones
        </div>
      </motion.div>

      {/* Vista de Cards */}
      {vistaActual === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {derivacionesFiltradas.map((derivacion, index) => (
            <motion.div
              key={derivacion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                {/* Header con Avatar y Estado */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl shadow-lg">
                      {derivacion.clienteAvatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{derivacion.clienteNombre}</h3>
                      <p className="text-sm text-gray-600">{derivacion.nutricionistaNombre}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 ${getEstadoColor(derivacion.estado)} text-xs font-bold rounded-full flex items-center gap-1`}>
                    {getEstadoIcon(derivacion.estado)}
                    <span className="hidden sm:inline">{derivacion.estado}</span>
                  </div>
                </div>

                {/* Info Urgencia y Fecha */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{derivacion.fechaDerivacion}</span>
                    </div>
                    <div className={`px-3 py-1 ${getUrgenciaColor(derivacion.urgencia)} text-xs font-bold rounded-full`}>
                      {derivacion.urgencia}
                    </div>
                  </div>
                </div>

                {/* Motivo */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Motivo</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{derivacion.motivo}</p>
                </div>

                {/* Botones de Acción */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedDerivacion(derivacion)}
                    className="px-4 py-2 border-2 border-indigo-500 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Ver
                  </button>
                  <select
                    value={derivacion.estado}
                    onChange={(e) => handleStatusChange(derivacion.id, e.target.value as DerivacionExtendida['estado'])}
                    className="px-3 py-2 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-purple-500 transition-colors duration-300 outline-none appearance-none bg-white"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aceptada">Aceptada</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Completada">Completada</option>
                    <option value="Rechazada">Rechazada</option>
                  </select>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Vista de Tabla */}
      {vistaActual === 'tabla' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Nutricionista</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Fecha</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Urgencia</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {derivacionesFiltradas.map((derivacion, index) => (
                  <motion.tr
                    key={derivacion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-colors duration-300"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg">
                          {derivacion.clienteAvatar}
                        </div>
                        <span className="font-semibold text-gray-900">{derivacion.clienteNombre}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{derivacion.nutricionistaNombre}</td>
                    <td className="px-6 py-4 text-gray-600">{derivacion.fechaDerivacion}</td>
                    <td className="px-6 py-4">
                      <div className={`px-3 py-1 ${getUrgenciaColor(derivacion.urgencia)} text-xs font-bold rounded-full inline-block`}>
                        {derivacion.urgencia}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`px-3 py-1 ${getEstadoColor(derivacion.estado)} text-xs font-bold rounded-full inline-flex items-center gap-1`}>
                        {getEstadoIcon(derivacion.estado)}
                        {derivacion.estado}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedDerivacion(derivacion)}
                          className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors duration-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <select
                          value={derivacion.estado}
                          onChange={(e) => handleStatusChange(derivacion.id, e.target.value as DerivacionExtendida['estado'])}
                          className="px-3 py-1 border-2 border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:border-purple-500 transition-colors duration-300 outline-none bg-white"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Aceptada">Aceptada</option>
                          <option value="En Proceso">En Proceso</option>
                          <option value="Completada">Completada</option>
                          <option value="Rechazada">Rechazada</option>
                        </select>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Modal de Detalles */}
      <AnimatePresence>
        {selectedDerivacion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDerivacion(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del Modal */}
              <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                      {selectedDerivacion.clienteAvatar}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-1">Derivación: {selectedDerivacion.clienteNombre}</h2>
                      <p className="text-blue-100">A {selectedDerivacion.nutricionistaNombre}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedDerivacion(null)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors duration-300"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* Contenido del Modal */}
              <div className="p-8 space-y-6">
                {/* Info Principal */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Estado</p>
                    <div className={`px-3 py-2 ${getEstadoColor(selectedDerivacion.estado)} text-sm font-bold rounded-xl inline-flex items-center gap-2`}>
                      {getEstadoIcon(selectedDerivacion.estado)}
                      {selectedDerivacion.estado}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Urgencia</p>
                    <div className={`px-3 py-2 ${getUrgenciaColor(selectedDerivacion.urgencia)} text-sm font-bold rounded-xl inline-block`}>
                      {selectedDerivacion.urgencia}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Fecha</p>
                    <p className="text-lg font-bold text-gray-900">{selectedDerivacion.fechaDerivacion}</p>
                  </div>
                </div>

                {/* Detalles */}
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-4 border border-gray-200">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Motivo</p>
                    <p className="text-gray-700">{selectedDerivacion.motivo}</p>
                  </div>

                  {selectedDerivacion.objetivo && (
                    <div className="bg-white rounded-2xl p-4 border border-gray-200">
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Objetivo</p>
                      <p className="text-gray-700">{selectedDerivacion.objetivo}</p>
                    </div>
                  )}

                  {selectedDerivacion.restricciones && (
                    <div className="bg-white rounded-2xl p-4 border border-gray-200">
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Restricciones</p>
                      <p className="text-gray-700">{selectedDerivacion.restricciones}</p>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Activity className="w-5 h-5 text-indigo-600" />
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
                        transition={{ delay: index * 0.1, duration: 0.4 }}
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DerivacionesLista;
