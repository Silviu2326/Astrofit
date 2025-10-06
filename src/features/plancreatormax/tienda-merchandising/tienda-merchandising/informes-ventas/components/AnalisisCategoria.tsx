import React from 'react';
import { motion } from 'framer-motion';
import { PieChart as PieChartIcon, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const categorias = [
  { nombre: 'Ropa', ventas: 125000, productos: 2847, margen: 38.5, crecimiento: 27.5, color: '#10b981' },
  { nombre: 'Accesorios', ventas: 78000, productos: 1523, margen: 35.2, crecimiento: -4.9, color: '#14b8a6' },
  { nombre: 'Bolsos', ventas: 65000, productos: 987, margen: 32.8, crecimiento: 20.4, color: '#06b6d4' },
  { nombre: 'Calzado', ventas: 45000, productos: 654, margen: 28.5, crecimiento: 15.2, color: '#0ea5e9' },
  { nombre: 'Otros', ventas: 15450, productos: 341, margen: 25.0, crecimiento: 8.7, color: '#3b82f6' },
];

const pieData = categorias.map(c => ({
  name: c.nombre,
  value: c.ventas,
  color: c.color
}));

const AnalisisCategoria: React.FC = () => {
  const total = categorias.reduce((sum, c) => sum + c.ventas, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <PieChartIcon className="w-6 h-6" />
            </div>
            Análisis por Categoría
          </h3>
          <p className="text-cyan-100 text-sm mt-2">Distribución de ventas y rendimiento por categoría</p>
        </div>
      </div>

      <div className="p-6">
        {/* Gráfico de Pie */}
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} (${((entry.value / total) * 100).toFixed(1)}%)`}
                outerRadius={100}
                fill="#8884d8"
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
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla de categorías */}
        <div className="space-y-3">
          {categorias.map((cat, index) => (
            <motion.div
              key={cat.nombre}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.05, duration: 0.4 }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 hover:border-teal-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4">
                {/* Nombre y color */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.color }}></div>
                  <div>
                    <h4 className="font-bold text-gray-900">{cat.nombre}</h4>
                    <p className="text-xs text-gray-500">{cat.productos} productos</p>
                  </div>
                </div>

                {/* Ventas */}
                <div className="text-right">
                  <p className="font-bold text-gray-900">${(cat.ventas / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-500">{((cat.ventas / total) * 100).toFixed(1)}% del total</p>
                </div>

                {/* Margen */}
                <div className="text-right min-w-[60px]">
                  <p className="text-sm font-bold text-teal-600">{cat.margen}%</p>
                  <p className="text-xs text-gray-500">margen</p>
                </div>

                {/* Crecimiento */}
                <div className="flex items-center gap-1 min-w-[80px] justify-end">
                  {cat.crecimiento > 0 ? (
                    <>
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-green-600">+{cat.crecimiento}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-bold text-red-600">{cat.crecimiento}%</span>
                    </>
                  )}
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(cat.ventas / total) * 100}%` }}
                  transition={{ delay: 0.9 + index * 0.05, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: cat.color }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-4 border border-cyan-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-600" />
                <span className="font-bold text-cyan-700">Total General</span>
              </div>
              <span className="text-3xl font-bold text-cyan-900">${(total / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisCategoria;
