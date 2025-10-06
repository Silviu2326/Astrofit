import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Calendar, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { mockAfiliados, mockComisiones } from '../mockData';

const ComisionesPorAfiliado: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [ordenarPor, setOrdenarPor] = useState<'pendiente' | 'total' | 'nombre'>('pendiente');

  // Ordenar afiliados
  const afiliadosOrdenados = [...mockAfiliados].sort((a, b) => {
    switch (ordenarPor) {
      case 'pendiente':
        return b.pendientePago - a.pendientePago;
      case 'total':
        return b.totalGenerado - a.totalGenerado;
      case 'nombre':
        return a.nombre.localeCompare(b.nombre);
      default:
        return 0;
    }
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platino':
        return 'from-purple-500 to-pink-600';
      case 'oro':
        return 'from-yellow-500 to-orange-600';
      case 'plata':
        return 'from-gray-400 to-gray-600';
      case 'bronce':
        return 'from-orange-600 to-red-700';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getMetodoPagoIcon = (metodo: string) => {
    const labels: Record<string, string> = {
      transferencia: '🏦',
      paypal: '💳',
      stripe: '💰',
      wire: '🌐'
    };
    return labels[metodo] || '💵';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Comisiones por Afiliado</h2>
              <p className="text-blue-100 text-lg">{mockAfiliados.length} afiliados activos</p>
            </div>
          </div>

          {/* Ordenar por */}
          <select
            value={ordenarPor}
            onChange={(e) => setOrdenarPor(e.target.value as any)}
            className="px-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="pendiente" className="text-gray-900">Ordenar por Pendientes</option>
            <option value="total" className="text-gray-900">Ordenar por Total</option>
            <option value="nombre" className="text-gray-900">Ordenar por Nombre</option>
          </select>
        </div>
      </motion.div>

      {/* Grid de afiliados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {afiliadosOrdenados.map((afiliado, index) => {
          const comisionesAfiliado = mockComisiones.filter(c => c.afiliadoId === afiliado.id);
          const isExpanded = expandedId === afiliado.id;

          return (
            <motion.div
              key={afiliado.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-300"
            >
              {/* Header del afiliado */}
              <div className={`bg-gradient-to-r ${getTierColor(afiliado.tier)} p-6 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                    backgroundSize: '15px 15px'
                  }}></div>
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <img
                    src={afiliado.avatar}
                    alt={afiliado.nombre}
                    className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{afiliado.nombre}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-white/30 backdrop-blur-sm rounded-full text-sm font-bold text-white uppercase">
                        {afiliado.tier}
                      </span>
                      <span className="text-sm text-white/90">{afiliado.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estadísticas */}
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">Total Generado</p>
                    <p className="text-lg font-bold text-gray-900">${afiliado.totalGenerado.toLocaleString()}</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">Pendiente</p>
                    <p className="text-lg font-bold text-yellow-700">${afiliado.pendientePago.toFixed(2)}</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs text-gray-600 mb-1">Último Pago</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {afiliado.ultimoPago ? new Date(afiliado.ultimoPago).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Método de pago preferido */}
                <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <p className="text-sm text-gray-600 mb-1">Método de Pago Preferido</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getMetodoPagoIcon(afiliado.metodoPagoPreferido)}</span>
                    <span className="font-bold text-purple-700 capitalize">{afiliado.metodoPagoPreferido}</span>
                  </div>
                </div>

                {/* Botón expandir/contraer */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : afiliado.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300"
                >
                  <Eye className="w-5 h-5" />
                  {isExpanded ? 'Ocultar Detalles' : 'Ver Detalles'}
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {/* Detalles expandidos */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t-2 border-gray-200"
                  >
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Comisiones Recientes</h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {comisionesAfiliado.slice(0, 10).map((comision) => (
                        <div
                          key={comision.id}
                          className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:border-indigo-300 transition-colors duration-200"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-indigo-600">{comision.id}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              comision.estado === 'pagada' ? 'bg-green-100 text-green-700' :
                              comision.estado === 'aprobada' ? 'bg-blue-100 text-blue-700' :
                              comision.estado === 'pendiente_validacion' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {comision.estado === 'pagada' ? 'Pagada' :
                               comision.estado === 'aprobada' ? 'Aprobada' :
                               comision.estado === 'pendiente_validacion' ? 'Pendiente' : 'Revertida'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{comision.productoVendido}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{comision.fechaVenta}</span>
                            <span className="text-lg font-bold text-green-600">${comision.montoComision.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {comisionesAfiliado.length > 10 && (
                      <p className="text-sm text-gray-500 text-center mt-3">
                        +{comisionesAfiliado.length - 10} comisiones más
                      </p>
                    )}

                    {/* Estadísticas adicionales */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                        <p className="text-xs text-gray-600">Total Comisiones</p>
                        <p className="text-2xl font-bold text-blue-700">{comisionesAfiliado.length}</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
                        <p className="text-xs text-gray-600">Tasa Éxito</p>
                        <p className="text-2xl font-bold text-purple-700">
                          {((comisionesAfiliado.filter(c => c.estado === 'pagada').length / comisionesAfiliado.length) * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ComisionesPorAfiliado;
