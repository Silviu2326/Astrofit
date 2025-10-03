import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Clock, TrendingUp } from 'lucide-react';

interface VentaPorHora {
  hora: string;
  monto: number;
  tickets: number;
}

interface GraficoVentasPorHoraProps {
  datos: VentaPorHora[];
}

const GraficoVentasPorHora: React.FC<GraficoVentasPorHoraProps> = ({ datos }) => {
  // Calcular total y promedio
  const totalVentas = datos.reduce((sum, item) => sum + item.monto, 0);
  const totalTickets = datos.reduce((sum, item) => sum + item.tickets, 0);
  const promedioHora = totalVentas / datos.length;

  // Encontrar la hora con más ventas
  const horaPico = datos.reduce((max, item) => item.monto > max.monto ? item : max, datos[0]);

  // Colores del gradiente
  const gradientColors = ['#6366f1', '#8b5cf6', '#a855f7', '#c084fc', '#d8b4fe'];

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-indigo-100">
          <p className="text-sm font-bold text-gray-900 mb-2">{payload[0].payload.hora}</p>
          <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            ${payload[0].value.toFixed(2)}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {payload[0].payload.tickets} tickets
          </p>
        </div>
      );
    }
    return null;
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
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
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
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Ventas por Hora</h3>
              <p className="text-blue-100 text-sm mt-1">Distribución de ventas durante el día</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
            <TrendingUp className="w-5 h-5 text-green-300" />
            <span className="text-sm font-semibold text-white">
              ${totalVentas.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="p-6 relative z-10">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={datos} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" opacity={0.3} />
              <XAxis
                dataKey="hora"
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: 600 }}
                tick={{ fill: '#6b7280' }}
              />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '12px', fontWeight: 600 }}
                tick={{ fill: '#6b7280' }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }} />
              <Bar dataKey="monto" radius={[12, 12, 0, 0]}>
                {datos.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry === horaPico ? 'url(#barGradient)' : gradientColors[index % gradientColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla resumen */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"></div>
              <p className="text-sm font-semibold text-gray-600">Total Ventas</p>
            </div>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              ${totalVentas.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">{totalTickets} tickets</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600"></div>
              <p className="text-sm font-semibold text-gray-600">Promedio/Hora</p>
            </div>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              ${promedioHora.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">{(totalTickets / datos.length).toFixed(1)} tickets/hora</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-emerald-600"></div>
              <p className="text-sm font-semibold text-gray-600">Hora Pico</p>
            </div>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              {horaPico?.hora || '-'}
            </p>
            <p className="text-xs text-gray-500 mt-1">${horaPico?.monto.toFixed(2) || '0.00'}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default GraficoVentasPorHora;
