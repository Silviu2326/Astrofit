import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Target,
  Package,
  Users,
  RotateCcw,
  Percent,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

// Datos para sparklines
const generateSparklineData = (trend: 'up' | 'down' | 'stable') => {
  const base = trend === 'up' ? [30, 35, 32, 40, 38, 45, 50] :
                trend === 'down' ? [50, 45, 48, 40, 42, 35, 30] :
                [40, 42, 41, 43, 42, 44, 43];
  return base.map((value, index) => ({ value, index }));
};

const MetricasPrincipales: React.FC = () => {
  const metricas = [
    {
      label: 'Ingresos Totales',
      valor: '$328,450',
      cambio: 24.5,
      positivo: true,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      sparkline: generateSparklineData('up'),
      info: 'vs período anterior',
      promedioDia: '$10,950/día'
    },
    {
      label: 'Pedidos',
      valor: '2,847',
      cambio: 18.2,
      positivo: true,
      icon: ShoppingCart,
      color: 'from-teal-500 to-cyan-600',
      sparkline: generateSparklineData('up'),
      info: 'vs período anterior',
      promedioDia: '95/día'
    },
    {
      label: 'Ticket Promedio',
      valor: '$115.32',
      cambio: 5.8,
      positivo: true,
      icon: TrendingUp,
      color: 'from-cyan-500 to-blue-600',
      sparkline: generateSparklineData('up'),
      info: 'vs período anterior',
      promedioDia: 'Rango: $45-$280'
    },
    {
      label: 'Tasa de Conversión',
      valor: '3.8%',
      cambio: 0.5,
      positivo: true,
      icon: Target,
      color: 'from-blue-500 to-indigo-600',
      sparkline: generateSparklineData('up'),
      info: 'vs período anterior',
      promedioDia: '7,484 visitantes'
    },
    {
      label: 'Productos Vendidos',
      valor: '4,521',
      cambio: 22.3,
      positivo: true,
      icon: Package,
      color: 'from-purple-500 to-pink-600',
      sparkline: generateSparklineData('up'),
      info: 'vs período anterior',
      promedioDia: 'Top: Camiseta Premium'
    },
    {
      label: 'Nuevos Clientes',
      valor: '1,248',
      cambio: 15.7,
      positivo: true,
      icon: Users,
      color: 'from-pink-500 to-rose-600',
      sparkline: generateSparklineData('up'),
      info: 'vs período anterior',
      promedioDia: '56% nuevos, 44% recurrentes'
    },
    {
      label: 'Reembolsos',
      valor: '$8,420',
      cambio: -2.8,
      positivo: false,
      icon: RotateCcw,
      color: 'from-orange-500 to-red-600',
      sparkline: generateSparklineData('down'),
      info: 'vs período anterior',
      promedioDia: '2.6% del revenue'
    },
    {
      label: 'Margen de Ganancia',
      valor: '38.5%',
      cambio: 3.2,
      positivo: true,
      icon: Percent,
      color: 'from-emerald-500 to-green-600',
      sparkline: generateSparklineData('up'),
      info: 'vs período anterior',
      promedioDia: 'Ganancia: $126,453'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metricas.map((metrica, index) => {
        const Icon = metrica.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -8 }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group"
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

            {/* Decoración de fondo */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${metrica.color} opacity-5 rounded-full blur-2xl`}></div>

            <div className="relative z-10">
              {/* Icono */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metrica.color} flex items-center justify-center text-white mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7" />
              </div>

              {/* Label */}
              <p className="text-xs font-bold text-gray-600 mb-2 tracking-wide uppercase">
                {metrica.label}
              </p>

              {/* Valor */}
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-3">
                {metrica.valor}
              </p>

              {/* Cambio */}
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-1 ${metrica.positivo ? 'bg-green-50' : 'bg-red-50'} rounded-lg`}>
                  {metrica.positivo ? (
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <span className={`text-sm font-bold ${metrica.positivo ? 'text-green-600' : 'text-red-600'}`}>
                  {metrica.positivo ? '+' : ''}{metrica.cambio}%
                </span>
                <span className="text-xs text-gray-500 font-medium">{metrica.info}</span>
              </div>

              {/* Sparkline */}
              <div className="mb-3 -mx-2">
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={metrica.sparkline}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={metrica.positivo ? '#10b981' : '#ef4444'}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Info adicional */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 font-medium">{metrica.promedioDia}</p>
              </div>

              {/* Barra decorativa */}
              <div className="mt-4 w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: metrica.positivo ? '75%' : '45%' }}
                  transition={{ delay: index * 0.05 + 0.5, duration: 1 }}
                  className={`h-full bg-gradient-to-r ${metrica.color} rounded-full`}
                ></motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MetricasPrincipales;
