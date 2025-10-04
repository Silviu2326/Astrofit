import React from 'react';
import { motion } from 'framer-motion';
import { Percent, TrendingUp, DollarSign, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// Datos mockeados realistas
const productosMargenes = [
  {
    id: 1,
    nombre: 'Hoodie Deluxe',
    costo: 50,
    precio: 85,
    margen: 41.2,
    categoria: 'Ropa',
    color: '#10b981',
    alerta: false
  },
  {
    id: 2,
    nombre: 'Camiseta Premium',
    costo: 30,
    precio: 45,
    margen: 33.3,
    categoria: 'Ropa',
    color: '#14b8a6',
    alerta: false
  },
  {
    id: 3,
    nombre: 'Gorra Limited',
    costo: 30,
    precio: 40,
    margen: 25.0,
    categoria: 'Accesorios',
    color: '#06b6d4',
    alerta: false
  },
  {
    id: 4,
    nombre: 'Mochila Urban',
    costo: 60,
    precio: 80,
    margen: 25.0,
    categoria: 'Bolsos',
    color: '#0ea5e9',
    alerta: false
  },
  {
    id: 5,
    nombre: 'Botella Eco',
    costo: 30,
    precio: 35,
    margen: 14.3,
    categoria: 'Accesorios',
    color: '#f59e0b',
    alerta: true
  },
];

// Datos para gráfico de pie
const pieData = productosMargenes.map(p => ({
  name: p.nombre,
  value: p.margen,
  color: p.color
}));

const AnalisisMargen: React.FC = () => {
  const margenPromedio = (productosMargenes.reduce((sum, p) => sum + p.margen, 0) / productosMargenes.length).toFixed(1);
  const mejorMargen = Math.max(...productosMargenes.map(p => p.margen));
  const peorMargen = Math.min(...productosMargenes.map(p => p.margen));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 p-6 relative overflow-hidden">
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
              <Percent className="w-6 h-6" />
            </div>
            Análisis de Margen Bruto
          </h3>
          <p className="text-cyan-100 text-sm mt-2">Rentabilidad por producto y categoría</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Métricas Clave */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Promedio</p>
            </div>
            <p className="text-3xl font-bold text-emerald-900">{margenPromedio}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide">Mejor</p>
            </div>
            <p className="text-3xl font-bold text-green-900">{mejorMargen}%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              <p className="text-xs font-bold text-orange-700 uppercase tracking-wide">Menor</p>
            </div>
            <p className="text-3xl font-bold text-orange-900">{peorMargen}%</p>
          </motion.div>
        </div>

        {/* Gráfico Circular */}
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla de Productos */}
        <div className="space-y-3">
          {productosMargenes.map((producto, index) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
              className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-white rounded-xl p-3 border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Info del producto */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Color indicator */}
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: producto.color }}
                  ></div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-gray-900 truncate">{producto.nombre}</h4>
                      {producto.alerta && (
                        <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{producto.categoria}</p>
                  </div>
                </div>

                {/* Precio y Margen */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Costo → Precio</p>
                    <p className="text-sm font-bold text-gray-700">
                      ${producto.costo} → ${producto.precio}
                    </p>
                  </div>

                  <div className="text-right min-w-[80px]">
                    <p className="text-xs text-gray-500 font-medium mb-1">Margen</p>
                    <div className={`px-3 py-1 rounded-lg ${
                      producto.margen >= 30 ? 'bg-green-100' :
                      producto.margen >= 20 ? 'bg-teal-100' : 'bg-orange-100'
                    }`}>
                      <span className={`text-lg font-bold ${
                        producto.margen >= 30 ? 'text-green-700' :
                        producto.margen >= 20 ? 'text-teal-700' : 'text-orange-700'
                      }`}>
                        {producto.margen}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Barra de progreso de margen */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${producto.margen}%` }}
                    transition={{ delay: 0.7 + index * 0.05, duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: producto.color }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota al pie */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-900 mb-1">Recomendación</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Productos con margen inferior al 20% requieren revisión de costos o ajuste de precio para mejorar la rentabilidad.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AnalisisMargen;
