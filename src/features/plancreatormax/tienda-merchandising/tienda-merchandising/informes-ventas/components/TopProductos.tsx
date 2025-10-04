import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Star, Package, ArrowUpRight } from 'lucide-react';

// Datos mockeados realistas
const topProductos = [
  {
    id: 1,
    nombre: 'Camiseta Premium Básica',
    categoria: 'Ropa',
    unidades: 1847,
    ingresos: 55410,
    crecimiento: 28.5,
    stock: 342,
    medalla: '🥇'
  },
  {
    id: 2,
    nombre: 'Hoodie Con Capucha Deluxe',
    categoria: 'Ropa',
    unidades: 1523,
    ingresos: 76150,
    crecimiento: 45.2,
    stock: 198,
    medalla: '🥈'
  },
  {
    id: 3,
    nombre: 'Gorra Snapback Limited',
    categoria: 'Accesorios',
    unidades: 1289,
    ingresos: 38670,
    crecimiento: 18.9,
    stock: 524,
    medalla: '🥉'
  },
  {
    id: 4,
    nombre: 'Botella Térmica Eco',
    categoria: 'Accesorios',
    unidades: 987,
    ingresos: 29610,
    crecimiento: 12.3,
    stock: 412,
    medalla: '4️⃣'
  },
  {
    id: 5,
    nombre: 'Mochila Urban Pro',
    categoria: 'Bolsos',
    unidades: 856,
    ingresos: 51360,
    crecimiento: 34.7,
    stock: 156,
    medalla: '5️⃣'
  },
];

const TopProductos: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Trophy className="w-6 h-6" />
            </div>
            Top Productos Más Vendidos
          </h3>
          <p className="text-emerald-100 text-sm mt-2">Los 5 productos con mejor rendimiento del mes</p>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="p-6">
        <div className="space-y-4">
          {topProductos.map((producto, index) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Decoración de fondo */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

              <div className="relative z-10 flex items-center justify-between gap-4">
                {/* Lado izquierdo: Posición y info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Medalla/Posición */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {producto.medalla}
                  </div>

                  {/* Info del producto */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 truncate">{producto.nombre}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-lg font-semibold">
                        {producto.categoria}
                      </span>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Package className="w-3 h-3" />
                        <span className="font-medium">Stock: {producto.stock}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lado derecho: Métricas */}
                <div className="flex-shrink-0 text-right">
                  <div className="mb-2">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                        {producto.unidades.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 font-medium">unidades vendidas</p>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <div className="px-2 py-1 bg-green-50 rounded-lg">
                      <ArrowUpRight className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm font-bold text-green-600">+{producto.crecimiento}%</span>
                  </div>
                </div>
              </div>

              {/* Barra de progreso de ingresos */}
              <div className="mt-4 relative">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-gray-600">Ingresos Generados</span>
                  <span className="font-bold text-emerald-600">${producto.ingresos.toLocaleString()}</span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(producto.unidades / topProductos[0].unidades) * 100}%` }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 relative"
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Estadística total al final */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-6 pt-6 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Total Unidades</p>
              </div>
              <p className="text-3xl font-bold text-emerald-900">
                {topProductos.reduce((sum, p) => sum + p.unidades, 0).toLocaleString()}
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-4 border border-cyan-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-cyan-600" />
                <p className="text-xs font-bold text-cyan-700 uppercase tracking-wide">Ingresos Top 5</p>
              </div>
              <p className="text-3xl font-bold text-cyan-900">
                ${topProductos.reduce((sum, p) => sum + p.ingresos, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TopProductos;
