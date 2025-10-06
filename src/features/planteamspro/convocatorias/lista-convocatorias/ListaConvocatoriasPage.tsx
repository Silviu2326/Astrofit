import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles, Filter, CheckCircle, Clock, XCircle, Search } from 'lucide-react';
import { fetchConvocatorias, Convocatoria } from './listaConvocatoriasApi';
import { TablaEventos } from './components/TablaEventos';
import GeneradorConvocatorias from './components/GeneradorConvocatorias';
import AnalisisRival from './components/AnalisisRival';
import LogisticaEvento from './components/LogisticaEvento';
import ComunicacionMulticanal from './components/ComunicacionMulticanal';
import TrackingConfirmaciones from './components/TrackingConfirmaciones';
import IntegracionCalendarios from './components/IntegracionCalendarios';
import GestionDocumentacion from './components/GestionDocumentacion';
import SistemaBackup from './components/SistemaBackup';

const ListaConvocatoriasPage: React.FC = () => {
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [busqueda, setBusqueda] = useState<string>('');

  useEffect(() => {
    const getConvocatorias = async () => {
      try {
        const data = await fetchConvocatorias();
        setConvocatorias(data);
      } catch (err) {
        setError('Error al cargar las convocatorias.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getConvocatorias();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg font-semibold text-gray-700">Cargando convocatorias...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/30 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-red-200 max-w-md"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-2xl">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-red-600">Error</h3>
          </div>
          <p className="text-gray-700">{error}</p>
        </motion.div>
      </div>
    );
  }

  const convocatoriasFiltradas = convocatorias.filter(conv => {
    const coincideBusqueda = busqueda === '' ||
      conv.evento?.toLowerCase().includes(busqueda.toLowerCase()) ||
      conv.rival?.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstado = filtroEstado === 'todos' || conv.estado === filtroEstado;

    return coincideBusqueda && coincideEstado;
  });

  const estadisticas = {
    total: convocatorias.length,
    confirmadas: convocatorias.filter(c => c.estado === 'confirmado').length,
    pendientes: convocatorias.filter(c => c.estado === 'pendiente').length,
    rechazadas: convocatorias.filter(c => c.estado === 'rechazado').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pb-12">
      {/* Hero Section */}
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
          {/* Título con icono animado */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Calendar className="w-10 h-10 text-yellow-300 animate-pulse" />
              <div className="absolute inset-0 w-10 h-10 bg-yellow-300 rounded-full blur-lg opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Lista de <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">Convocatorias</span>
            </h1>
          </div>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed">
            Gestiona tus eventos y competencias con <span className="font-bold text-white px-2 py-1 bg-white/20 rounded-lg backdrop-blur-sm">total control</span>
          </p>

          {/* Indicadores pills */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-white">{estadisticas.confirmadas} Confirmadas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Clock className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-semibold text-white">{estadisticas.pendientes} Pendientes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <XCircle className="w-5 h-5 text-red-300" />
              <span className="text-sm font-semibold text-white">{estadisticas.rechazadas} Rechazadas</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 mb-8 border border-white/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-indigo-100 rounded-xl">
            <Filter className="w-6 h-6 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Filtros y Búsqueda</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Búsqueda */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar evento o rival..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Filtro de estado */}
          <div className="flex gap-2">
            {['todos', 'confirmado', 'pendiente', 'rechazado'].map((estado) => (
              <button
                key={estado}
                onClick={() => setFiltroEstado(estado)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  filtroEstado === estado
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lista de convocatorias */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {convocatoriasFiltradas.length > 0 ? (
          <TablaEventos convocatorias={convocatoriasFiltradas} />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-12 text-center border border-white/50"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-gray-100 rounded-3xl">
                <Calendar className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700">No hay convocatorias</h3>
              <p className="text-gray-500">No se encontraron convocatorias con los filtros seleccionados.</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Gestión Avanzada */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-12"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-indigo-600 animate-pulse" />
            <div className="absolute inset-0 w-8 h-8 bg-indigo-600 rounded-full blur-lg opacity-30"></div>
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            Gestión Avanzada de Competencias
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GeneradorConvocatorias />
          <AnalisisRival />
          <LogisticaEvento />
          <ComunicacionMulticanal />
          <TrackingConfirmaciones />
          <IntegracionCalendarios />
          <GestionDocumentacion />
          <SistemaBackup />
        </div>
      </motion.div>
    </div>
  );
};

export default ListaConvocatoriasPage;
