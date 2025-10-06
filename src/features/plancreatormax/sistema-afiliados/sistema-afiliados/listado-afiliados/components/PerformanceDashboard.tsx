import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { TrendingUp, PieChart as PieChartIcon, BarChart3, Package } from 'lucide-react';
import { monthlyChartData, tierDistributionData, topProductsData } from '../data/mockData';

export const PerformanceDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Análisis de Rendimiento</h3>
              <p className="text-sm text-emerald-100">Métricas y tendencias del programa de afiliados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de ventas mensuales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Evolución de Ventas</h4>
              <p className="text-sm text-gray-600">Ventas y comisiones mensuales</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="ventas"
                stroke="#6366f1"
                strokeWidth={3}
                name="Ventas ($)"
                dot={{ fill: '#6366f1', r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="comisiones"
                stroke="#10b981"
                strokeWidth={3}
                name="Comisiones ($)"
                dot={{ fill: '#10b981', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Stats rápidas */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Ventas</p>
              <p className="text-2xl font-bold text-blue-700">
                ${monthlyChartData.reduce((sum, d) => sum + d.ventas, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
              <p className="text-sm font-semibold text-gray-600 mb-1">Total Comisiones</p>
              <p className="text-2xl font-bold text-green-700">
                ${monthlyChartData.reduce((sum, d) => sum + d.comisiones, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Distribución por tier */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
              <PieChartIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Distribución por Tier</h4>
              <p className="text-sm text-gray-600">Afiliados por nivel</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tierDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {tierDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Leyenda personalizada */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {tierDistributionData.map((tier) => (
              <div key={tier.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: tier.color }}></div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">{tier.name}</p>
                  <p className="text-xs text-gray-600">{tier.value}% del total</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Productos más vendidos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Productos Más Referidos</h4>
            <p className="text-sm text-gray-600">Top 5 productos por afiliados</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProductsData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#6b7280" />
            <YAxis dataKey="product" type="category" stroke="#6b7280" width={150} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '12px'
              }}
            />
            <Bar dataKey="sales" fill="#6366f1" radius={[0, 8, 8, 0]} name="Ventas">
              {topProductsData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${index})`}
                />
              ))}
            </Bar>
            <defs>
              <linearGradient id="gradient-0" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="gradient-1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <linearGradient id="gradient-2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#c026d3" />
              </linearGradient>
              <linearGradient id="gradient-3" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c026d3" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
              <linearGradient id="gradient-4" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#e879f9" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>

        {/* Detalles de ingresos */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-200">
            <p className="text-sm font-semibold text-gray-600 mb-1">Producto Top</p>
            <p className="text-lg font-bold text-indigo-700">{topProductsData[0].product}</p>
            <p className="text-sm text-indigo-600">{topProductsData[0].sales} ventas</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
            <p className="text-sm font-semibold text-gray-600 mb-1">Ingresos Top</p>
            <p className="text-lg font-bold text-purple-700">
              ${topProductsData[0].revenue.toLocaleString()}
            </p>
            <p className="text-sm text-purple-600">del producto líder</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-4 border border-pink-200">
            <p className="text-sm font-semibold text-gray-600 mb-1">Total Productos</p>
            <p className="text-lg font-bold text-pink-700">
              {topProductsData.reduce((sum, p) => sum + p.sales, 0)}
            </p>
            <p className="text-sm text-pink-600">ventas totales</p>
          </div>
        </div>
      </motion.div>

      {/* Comparativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-200"
        >
          <h4 className="font-bold text-gray-900 mb-4">Comparativa Mensual</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Mes actual vs anterior</span>
                <span className="text-sm font-bold text-green-600">+23.4%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Conversiones</span>
                <span className="text-sm font-bold text-green-600">+18.2%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Nuevos afiliados</span>
                <span className="text-sm font-bold text-green-600">+31.5%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-200"
        >
          <h4 className="font-bold text-gray-900 mb-4">Top Afiliados vs Promedio</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Tasa de conversión Top 10</span>
                <span className="text-sm font-bold text-blue-600">1.82%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Promedio general</span>
                <span className="text-sm font-bold text-blue-600">1.35%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div className="h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">Diferencia</span>
                <span className="text-sm font-bold text-blue-600">+34.8%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-3">
                <div className="h-3 bg-gradient-to-r from-blue-300 to-indigo-400 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
