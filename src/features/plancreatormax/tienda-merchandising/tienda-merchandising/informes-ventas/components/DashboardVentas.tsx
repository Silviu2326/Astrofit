import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, ShoppingCart, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Datos mockeados realistas
const ventasMensuales = [
  { mes: 'Ene', ventas: 45000, costo: 28000 },
  { mes: 'Feb', ventas: 52000, costo: 31000 },
  { mes: 'Mar', ventas: 48000, costo: 29500 },
  { mes: 'Abr', ventas: 61000, costo: 35000 },
  { mes: 'May', ventas: 55000, costo: 33000 },
  { mes: 'Jun', ventas: 67000, costo: 38000 },
];

const estadisticas = [
  {
    label: 'Ventas Totales',
    valor: '$328,000',
    cambio: 24.5,
    positivo: true,
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600'
  },
  {
    label: 'Pedidos',
    valor: '2,847',
    cambio: 18.2,
    positivo: true,
    icon: ShoppingCart,
    color: 'from-teal-500 to-cyan-600'
  },
  {
    label: 'Ticket Promedio',
    valor: '$115',
    cambio: 5.8,
    positivo: true,
    icon: TrendingUp,
    color: 'from-cyan-500 to-blue-600'
  },
  {
    label: 'Clientes Activos',
    valor: '1,548',
    cambio: -3.2,
    positivo: false,
    icon: Users,
    color: 'from-emerald-500 to-teal-600'
  },
];

const DashboardVentas: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {estadisticas.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

              {/* Decoración de fondo */}
              <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-full blur-2xl`}></div>

              <div className="relative z-10">
                {/* Icono */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Label */}
                <p className="text-xs font-bold text-gray-600 mb-2 tracking-wide uppercase">
                  {stat.label}
                </p>

                {/* Valor */}
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                  {stat.valor}
                </p>

                {/* Cambio */}
                <div className="flex items-center gap-2">
                  <div className={`p-1 ${stat.positivo ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                    {stat.positivo ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <span className={`text-sm font-bold ${stat.positivo ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.positivo ? '+' : ''}{stat.cambio}%
                  </span>
                  <span className="text-xs text-gray-500 font-medium">vs mes anterior</span>
                </div>

                {/* Barra decorativa */}
                <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: stat.positivo ? '75%' : '45%' }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Gráficos de Ventas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              Ventas vs Costos Mensuales
            </h3>
          </div>

          {/* Chart */}
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ventasMensuales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="ventas" fill="url(#colorVentas)" radius={[8, 8, 0, 0]} />
                <Bar dataKey="costo" fill="url(#colorCostos)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                  <linearGradient id="colorCostos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ef4444" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>

            {/* Leyenda */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-teal-500"></div>
                <span className="text-sm font-medium text-gray-600">Ventas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-500 to-red-500"></div>
                <span className="text-sm font-medium text-gray-600">Costos</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gráfico de Líneas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 via-teal-500 to-green-500 p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>

            <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <DollarSign className="w-6 h-6" />
              </div>
              Evolución de Ingresos
            </h3>
          </div>

          {/* Chart */}
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ventasMensuales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="mes" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="url(#lineGradient)"
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 6 }}
                  activeDot={{ r: 8 }}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>

            {/* Métricas rápidas */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Mejor Mes</p>
                <p className="text-2xl font-bold text-green-900">Jun ($67k)</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-4 border border-cyan-200">
                <p className="text-xs font-bold text-cyan-700 uppercase tracking-wide mb-1">Promedio</p>
                <p className="text-2xl font-bold text-cyan-900">$54.7k</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardVentas;
