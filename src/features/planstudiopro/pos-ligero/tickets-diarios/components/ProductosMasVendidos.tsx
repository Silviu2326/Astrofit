import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, TrendingUp, Package, Tag } from 'lucide-react';

interface ProductoVendido {
  id: string;
  nombre: string;
  emoji?: string;
  imagen?: string;
  categoria: string;
  unidadesVendidas: number;
  revenue: number;
  porcentajeTotal: number;
}

interface ProductosMasVendidosProps {
  datos: ProductoVendido[];
}

const ProductosMasVendidos: React.FC<ProductosMasVendidosProps> = ({ datos }) => {
  // Tomar solo top 10
  const top10 = datos.slice(0, 10);

  // Calcular totales
  const totalUnidades = top10.reduce((sum, p) => sum + p.unidadesVendidas, 0);
  const totalRevenue = top10.reduce((sum, p) => sum + p.revenue, 0);

  // Colores para las barras de progreso
  const coloresProgreso = [
    'from-violet-500 to-purple-600',
    'from-blue-500 to-indigo-600',
    'from-cyan-500 to-teal-600',
    'from-green-500 to-emerald-600',
    'from-yellow-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-purple-500 to-pink-600',
    'from-indigo-500 to-blue-600',
    'from-teal-500 to-cyan-600',
    'from-orange-500 to-red-600',
  ];

  const getMedalla = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}°`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden relative group"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Top 10 Productos Más Vendidos</h3>
              <p className="text-orange-100 text-sm mt-1">Los productos estrella del día</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <TrendingUp className="w-5 h-5 text-green-300" />
            <span className="text-sm font-semibold text-white">
              ${totalRevenue.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 relative z-10">
        {/* Lista de productos */}
        <div className="space-y-4">
          {top10.map((producto, index) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300 group/item"
            >
              <div className="flex items-center gap-4">
                {/* Ranking */}
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {getMedalla(index)}
                  </span>
                </div>

                {/* Imagen/Emoji del producto */}
                <div className="flex-shrink-0">
                  {producto.emoji ? (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center text-3xl border border-orange-100">
                      {producto.emoji}
                    </div>
                  ) : producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-16 h-16 rounded-2xl object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>

                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 truncate">
                        {producto.nombre}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 rounded-lg border border-purple-100">
                          <Tag className="w-3 h-3 text-purple-600" />
                          <span className="text-xs font-medium text-purple-700">{producto.categoria}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${producto.revenue.toFixed(2)}
                      </p>
                      <p className="text-xs font-semibold text-orange-600 mt-1">
                        {producto.porcentajeTotal.toFixed(1)}% del total
                      </p>
                    </div>
                  </div>

                  {/* Estadísticas */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-700">
                        {producto.unidadesVendidas} unidades
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-green-600">
                        ${(producto.revenue / producto.unidadesVendidas).toFixed(2)}/unidad
                      </span>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="relative">
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${producto.porcentajeTotal}%` }}
                        transition={{ delay: index * 0.08 + 0.3, duration: 0.8, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${coloresProgreso[index]} rounded-full relative`}
                      >
                        {/* Efecto de brillo */}
                        <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                      </motion.div>
                    </div>

                    {/* Indicador de porcentaje en la barra */}
                    <div className="absolute -top-6 right-0">
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 + 0.5 }}
                        className="px-2 py-0.5 bg-gray-900 rounded-lg"
                      >
                        <span className="text-xs font-bold text-white">
                          {producto.porcentajeTotal.toFixed(1)}%
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resumen */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-4 border border-orange-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-pink-600"></div>
              <p className="text-sm font-semibold text-gray-600">Total Unidades</p>
            </div>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600">
              {totalUnidades.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600"></div>
              <p className="text-sm font-semibold text-gray-600">Revenue Total</p>
            </div>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              ${totalRevenue.toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600"></div>
              <p className="text-sm font-semibold text-gray-600">Ticket Promedio</p>
            </div>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              ${(totalRevenue / totalUnidades).toFixed(2)}
            </p>
          </motion.div>
        </div>

        {/* Podio visual (top 3) */}
        <div className="mt-6 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
          <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span>🏆</span>
            Podio del Día
          </h4>
          <div className="flex items-end justify-center gap-4">
            {/* 2do lugar */}
            {top10[1] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl mb-2">🥈</span>
                <div className="w-20 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <p className="text-xs font-semibold text-gray-700 mt-2 text-center max-w-[80px] truncate">
                  {top10[1].nombre}
                </p>
              </motion.div>
            )}

            {/* 1er lugar */}
            {top10[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col items-center"
              >
                <span className="text-4xl mb-2">🥇</span>
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-t-2xl flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <p className="text-xs font-bold text-gray-900 mt-2 text-center max-w-[96px] truncate">
                  {top10[0].nombre}
                </p>
              </motion.div>
            )}

            {/* 3er lugar */}
            {top10[2] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="flex flex-col items-center"
              >
                <span className="text-3xl mb-2">🥉</span>
                <div className="w-20 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-t-2xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <p className="text-xs font-semibold text-gray-700 mt-2 text-center max-w-[80px] truncate">
                  {top10[2].nombre}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductosMasVendidos;
