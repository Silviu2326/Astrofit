import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Filter, Search, Copy, Archive, Eye, TrendingUp, Target, DollarSign } from 'lucide-react';
import { MOCK_CAMPANAS, EstadoCampana } from '../types';

const HistorialCampanas: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<EstadoCampana | 'Todas'>('Todas');
  const [vistaActual, setVistaActual] = useState<'grid' | 'lista'>('grid');

  const campanasOrdenadas = [...MOCK_CAMPANAS].sort((a, b) =>
    new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime()
  );

  const campanasFiltradas = campanasOrdenadas.filter(campana => {
    const matchBusqueda = campana.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          campana.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const matchEstado = filtroEstado === 'Todas' || campana.estado === filtroEstado;
    return matchBusqueda && matchEstado;
  });

  const obtenerColorEstado = (estado: EstadoCampana) => {
    switch (estado) {
      case 'Activa': return 'bg-green-500';
      case 'Programada': return 'bg-blue-500';
      case 'Completada': return 'bg-gray-500';
      case 'Pausada': return 'bg-orange-500';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-fuchsia-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl text-white shadow-lg">
            <History className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-600">
            Historial de Campañas
          </h2>
        </div>

        {/* Búsqueda y filtros */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar campañas..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            />
          </div>

          {/* Filtro por estado */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value as EstadoCampana | 'Todas')}
              className="pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
            >
              <option value="Todas">Todas</option>
              <option value="Activa">Activas</option>
              <option value="Programada">Programadas</option>
              <option value="Completada">Completadas</option>
              <option value="Pausada">Pausadas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de campañas */}
      <div className="relative z-10">
        {campanasFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No se encontraron campañas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campanasFiltradas.map((campana, idx) => (
              <motion.div
                key={campana.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden group"
              >
                {/* Imagen/Emoji */}
                <div className="relative h-32 bg-gradient-to-br from-fuchsia-100 via-purple-100 to-pink-100 flex items-center justify-center">
                  <span className="text-6xl">{campana.imagen}</span>
                  <div className={`absolute top-3 right-3 px-3 py-1 ${obtenerColorEstado(campana.estado)} text-white text-xs font-bold rounded-full`}>
                    {campana.estado}
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{campana.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{campana.descripcion}</p>

                  {/* Métricas */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2 text-center border border-green-100">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      </div>
                      <p className="text-xs font-bold text-green-700">ROI {campana.roi}%</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-2 text-center border border-blue-100">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Target className="w-3 h-3 text-blue-600" />
                      </div>
                      <p className="text-xs font-bold text-blue-700">{(campana.impresiones / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-lg p-2 text-center border border-purple-100">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <DollarSign className="w-3 h-3 text-purple-600" />
                      </div>
                      <p className="text-xs font-bold text-purple-700">${(campana.presupuesto / 1000).toFixed(0)}K</p>
                    </div>
                  </div>

                  {/* Fechas */}
                  <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
                    <span className="font-semibold">{campana.fechaInicio}</span>
                    <span>→</span>
                    <span className="font-semibold">{campana.fechaFin}</span>
                  </div>

                  {/* Acciones */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-fuchsia-500 to-pink-600 text-white rounded-xl text-sm font-semibold hover:shadow-md transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 border-2 border-gray-200 rounded-xl hover:border-fuchsia-400 hover:bg-fuchsia-50 transition-all"
                    >
                      <Copy className="w-4 h-4 text-gray-600" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 border-2 border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all"
                    >
                      <Archive className="w-4 h-4 text-gray-600" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorialCampanas;
