import React from 'react';
import { motion } from 'framer-motion';
import { Globe, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const fuentes = [
  { nombre: 'Orgánico (SEO)', visitantes: 12500, conversion: 4.2, revenue: 98500, roi: null, color: '#10b981' },
  { nombre: 'Directo', visitantes: 8200, conversion: 5.8, revenue: 82400, roi: null, color: '#14b8a6' },
  { nombre: 'Redes Sociales', visitantes: 6800, conversion: 3.5, revenue: 45200, roi: null, color: '#06b6d4' },
  { nombre: 'Email Marketing', visitantes: 4500, conversion: 6.2, revenue: 58900, roi: 385, color: '#0ea5e9' },
  { nombre: 'Google Ads', visitantes: 5200, conversion: 4.8, revenue: 67000, roi: 245, color: '#3b82f6' },
  { nombre: 'Facebook Ads', visitantes: 3800, conversion: 3.9, revenue: 42800, roi: 198, color: '#6366f1' },
  { nombre: 'Referidos', visitantes: 2100, conversion: 7.5, revenue: 28450, roi: null, color: '#8b5cf6' },
];

const FuentesTrafico: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Globe className="w-6 h-6" />
            </div>
            Fuentes de Tráfico y Conversión
          </h3>
          <p className="text-blue-100 text-sm mt-2">Análisis de rendimiento por canal de adquisición</p>
        </div>
      </div>

      <div className="p-6">
        {/* Gráfico de Barras Horizontales */}
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={fuentes}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="nombre" type="category" stroke="#6b7280" width={90} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Bar dataKey="visitantes" radius={[0, 8, 8, 0]}>
                {fuentes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla de métricas */}
        <div className="space-y-3">
          {fuentes.map((fuente, index) => (
            <motion.div
              key={fuente.nombre}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05, duration: 0.4 }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Nombre */}
                <div className="flex items-center gap-3 flex-1 min-w-[150px]">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: fuente.color }}></div>
                  <h4 className="font-bold text-gray-900">{fuente.nombre}</h4>
                </div>

                {/* Visitantes */}
                <div className="text-center min-w-[100px]">
                  <p className="text-sm font-bold text-gray-900">{fuente.visitantes.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">visitantes</p>
                </div>

                {/* Conversión */}
                <div className="text-center min-w-[80px]">
                  <p className="text-sm font-bold text-indigo-600">{fuente.conversion}%</p>
                  <p className="text-xs text-gray-500">conversión</p>
                </div>

                {/* Revenue */}
                <div className="text-center min-w-[100px]">
                  <p className="text-sm font-bold text-green-600">${(fuente.revenue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-500">revenue</p>
                </div>

                {/* ROI */}
                <div className="text-center min-w-[80px]">
                  {fuente.roi ? (
                    <>
                      <p className="text-sm font-bold text-emerald-600">{fuente.roi}%</p>
                      <p className="text-xs text-gray-500">ROI</p>
                    </>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Orgánico</p>
                  )}
                </div>
              </div>

              {/* Barra de progreso de conversión */}
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${fuente.conversion * 10}%` }}
                  transition={{ delay: 1 + index * 0.05, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: fuente.color }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Mejor Canal</p>
            <p className="text-lg font-bold text-green-900">Referidos (7.5%)</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
            <DollarSign className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Mayor Revenue</p>
            <p className="text-lg font-bold text-blue-900">Orgánico ($98.5k)</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
            <Globe className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">Total Visitantes</p>
            <p className="text-lg font-bold text-purple-900">{fuentes.reduce((sum, f) => sum + f.visitantes, 0).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FuentesTrafico;
