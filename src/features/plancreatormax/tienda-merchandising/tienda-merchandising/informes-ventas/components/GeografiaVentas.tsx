import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp } from 'lucide-react';

const paises = [
  { pais: 'Estados Unidos', bandera: '🇺🇸', pedidos: 1247, revenue: 145800, ticket: 117, porcentaje: 44.4 },
  { pais: 'España', bandera: '🇪🇸', pedidos: 684, revenue: 78200, ticket: 114, porcentaje: 23.8 },
  { pais: 'México', bandera: '🇲🇽', pedidos: 523, revenue: 54600, ticket: 104, porcentaje: 16.6 },
  { pais: 'Argentina', bandera: '🇦🇷', pedidos: 298, revenue: 29500, ticket: 99, porcentaje: 9.0 },
  { pais: 'Colombia', bandera: '🇨🇴', pedidos: 95, revenue: 20350, ticket: 107, porcentaje: 6.2 },
];

const GeografiaVentas: React.FC = () => {
  const totalRevenue = paises.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <MapPin className="w-6 h-6" />
            </div>
            Geografía de Ventas
          </h3>
          <p className="text-purple-100 text-sm mt-2">Distribución de ventas por país</p>
        </div>
      </div>

      <div className="p-6">
        {/* Tabla de países */}
        <div className="space-y-4">
          {paises.map((pais, index) => (
            <motion.div
              key={pais.pais}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + index * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* País y bandera */}
                <div className="flex items-center gap-3 flex-1 min-w-[150px]">
                  <div className="text-3xl">{pais.bandera}</div>
                  <div>
                    <h4 className="font-bold text-gray-900">{pais.pais}</h4>
                    <p className="text-xs text-gray-500">{pais.pedidos} pedidos</p>
                  </div>
                </div>

                {/* Revenue */}
                <div className="text-center min-w-[100px]">
                  <p className="text-lg font-bold text-purple-600">${(pais.revenue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-500">revenue</p>
                </div>

                {/* Ticket Promedio */}
                <div className="text-center min-w-[80px]">
                  <p className="text-sm font-bold text-gray-900">${pais.ticket}</p>
                  <p className="text-xs text-gray-500">ticket promedio</p>
                </div>

                {/* Porcentaje */}
                <div className="text-center min-w-[80px]">
                  <p className="text-sm font-bold text-pink-600">{pais.porcentaje}%</p>
                  <p className="text-xs text-gray-500">del total</p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="mt-4 w-full bg-purple-100 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pais.porcentaje}%` }}
                  transition={{ delay: 1 + index * 0.05, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total y estadísticas */}
        <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
            <TrendingUp className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-purple-900">${(totalRevenue / 1000).toFixed(1)}k</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 border border-pink-200">
            <MapPin className="w-5 h-5 text-pink-600 mb-2" />
            <p className="text-xs font-bold text-pink-700 uppercase tracking-wide mb-1">Países Activos</p>
            <p className="text-2xl font-bold text-pink-900">{paises.length}</p>
          </div>
          <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-4 border border-rose-200">
            <TrendingUp className="w-5 h-5 text-rose-600 mb-2" />
            <p className="text-xs font-bold text-rose-700 uppercase tracking-wide mb-1">Principal Mercado</p>
            <p className="text-lg font-bold text-rose-900">{paises[0].pais}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GeografiaVentas;
