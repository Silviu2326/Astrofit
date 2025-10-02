import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, DollarSign } from 'lucide-react';

const ResumenFinanciero: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<'6m' | '12m' | '24m'>('12m');

  // Datos mockeados de comisiones por mes
  const data12m = [
    { mes: 'Nov 24', generadas: 3200, pagadas: 2800, pendientes: 400 },
    { mes: 'Dic 24', generadas: 3800, pagadas: 3200, pendientes: 600 },
    { mes: 'Ene 25', generadas: 4200, pagadas: 3800, pendientes: 400 },
    { mes: 'Feb 25', generadas: 3900, pagadas: 3500, pendientes: 400 },
    { mes: 'Mar 25', generadas: 4500, pagadas: 4100, pendientes: 400 },
    { mes: 'Abr 25', generadas: 5200, pagadas: 4800, pendientes: 400 },
    { mes: 'May 25', generadas: 4800, pagadas: 4400, pendientes: 400 },
    { mes: 'Jun 25', generadas: 5500, pagadas: 5100, pendientes: 400 },
    { mes: 'Jul 25', generadas: 6100, pagadas: 5700, pendientes: 400 },
    { mes: 'Ago 25', generadas: 5800, pagadas: 5400, pendientes: 400 },
    { mes: 'Sep 25', generadas: 6500, pagadas: 6100, pendientes: 400 },
    { mes: 'Oct 25', generadas: 7200, pagadas: 6000, pendientes: 1200 }
  ];

  const data6m = data12m.slice(-6);
  const data24m = [...data12m, ...data12m.map((d, i) => ({
    ...d,
    mes: `${['Nov', 'Dic', 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'][i]} 26`
  }))];

  const currentData = timeFilter === '6m' ? data6m : timeFilter === '12m' ? data12m : data24m;

  // Calcular totales
  const totalGeneradas = currentData.reduce((sum, d) => sum + d.generadas, 0);
  const totalPagadas = currentData.reduce((sum, d) => sum + d.pagadas, 0);
  const totalPendientes = currentData.reduce((sum, d) => sum + d.pendientes, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <TrendingUp className="w-6 h-6" />
            </div>
            Resumen Financiero
          </h3>

          {/* Filtros temporales */}
          <div className="flex gap-2">
            {[
              { value: '6m', label: '6 Meses' },
              { value: '12m', label: '12 Meses' },
              { value: '24m', label: '24 Meses' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setTimeFilter(filter.value as any)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  timeFilter === filter.value
                    ? 'bg-white text-green-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body con gráfico */}
      <div className="p-6">
        {/* Totales acumulados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-xl text-white">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Generadas</p>
                <p className="text-2xl font-bold text-green-700">${totalGeneradas.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-xl text-white">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Pagadas</p>
                <p className="text-2xl font-bold text-blue-700">${totalPagadas.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500 rounded-xl text-white">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Pendientes</p>
                <p className="text-2xl font-bold text-yellow-700">${totalPendientes.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de barras apiladas */}
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="mes"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#d1d5db' }}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: '#d1d5db' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px'
                }}
                formatter={(value: any) => `$${value.toLocaleString()}`}
              />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar
                dataKey="generadas"
                name="Comisiones Generadas"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="pagadas"
                name="Comisiones Pagadas"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="pendientes"
                name="Comisiones Pendientes"
                fill="#f59e0b"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leyenda adicional */}
        <div className="mt-6 flex items-center gap-6 justify-center flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Generadas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Pagadas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">Pendientes</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumenFinanciero;
