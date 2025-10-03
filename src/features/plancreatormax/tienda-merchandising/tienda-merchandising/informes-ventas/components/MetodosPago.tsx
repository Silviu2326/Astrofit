import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, DollarSign, CheckCircle2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const metodosPago = [
  { metodo: 'Tarjeta de Crédito', uso: 1456, porcentaje: 51.2, revenue: 168000, tasaExito: 97.5, color: '#10b981' },
  { metodo: 'PayPal', uso: 687, porcentaje: 24.1, revenue: 79800, tasaExito: 99.2, color: '#14b8a6' },
  { metodo: 'Transferencia', uso: 542, porcentaje: 19.0, revenue: 63200, tasaExito: 94.8, color: '#06b6d4' },
  { metodo: 'Otros', uso: 162, porcentaje: 5.7, revenue: 17450, tasaExito: 96.3, color: '#3b82f6' },
];

const pieData = metodosPago.map(m => ({
  name: m.metodo,
  value: m.porcentaje,
  color: m.color
}));

const MetodosPago: React.FC = () => {
  const totalRevenue = metodosPago.reduce((sum, m) => sum + m.revenue, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <CreditCard className="w-6 h-6" />
            </div>
            Métodos de Pago
          </h3>
          <p className="text-emerald-100 text-sm mt-2">Distribución y rendimiento por método de pago</p>
        </div>
      </div>

      <div className="p-6">
        {/* Gráfico de Pie */}
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name} (${entry.value}%)`}
                outerRadius={90}
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
                formatter={(value: number) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla de métodos */}
        <div className="space-y-3">
          {metodosPago.map((metodo, index) => (
            <motion.div
              key={metodo.metodo}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.05, duration: 0.4 }}
              className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Método */}
                <div className="flex items-center gap-3 flex-1 min-w-[150px]">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: metodo.color }}
                  ></div>
                  <div>
                    <h4 className="font-bold text-gray-900">{metodo.metodo}</h4>
                    <p className="text-xs text-gray-500">{metodo.uso} transacciones</p>
                  </div>
                </div>

                {/* Porcentaje de uso */}
                <div className="text-center min-w-[80px]">
                  <p className="text-lg font-bold text-gray-900">{metodo.porcentaje}%</p>
                  <p className="text-xs text-gray-500">uso</p>
                </div>

                {/* Revenue */}
                <div className="text-center min-w-[100px]">
                  <p className="text-lg font-bold text-emerald-600">${(metodo.revenue / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-500">revenue</p>
                </div>

                {/* Tasa de éxito */}
                <div className="text-center min-w-[80px]">
                  <div className="flex items-center gap-1 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-bold text-green-600">{metodo.tasaExito}%</p>
                  </div>
                  <p className="text-xs text-gray-500">éxito</p>
                </div>
              </div>

              {/* Barra de progreso */}
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metodo.porcentaje}%` }}
                  transition={{ delay: 1.4 + index * 0.05, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: metodo.color }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Resumen */}
        <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <DollarSign className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Revenue Total</p>
            <p className="text-2xl font-bold text-green-900">${(totalRevenue / 1000).toFixed(1)}k</p>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-4 border border-teal-200">
            <CreditCard className="w-5 h-5 text-teal-600 mb-2" />
            <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-1">Método Preferido</p>
            <p className="text-lg font-bold text-teal-900">Tarjeta Crédito</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-4 border border-cyan-200">
            <CheckCircle2 className="w-5 h-5 text-cyan-600 mb-2" />
            <p className="text-xs font-bold text-cyan-700 uppercase tracking-wide mb-1">Tasa Éxito Media</p>
            <p className="text-2xl font-bold text-cyan-900">96.9%</p>
          </div>
        </div>

        {/* Recomendación */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
          <div className="flex items-start gap-3">
            <CreditCard className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1">Recomendación</p>
              <p className="text-xs text-blue-700 leading-relaxed">
                PayPal tiene la tasa de éxito más alta (99.2%). Considera promocionar este método para mejorar la conversión.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetodosPago;
