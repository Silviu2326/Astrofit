import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Percent, TrendingUp, Users, CreditCard } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const MetricasIngresos: React.FC = () => {
  // Datos para el gráfico de pastel
  const pieData = [
    { name: 'VERANO2024', value: 18450, color: '#0ea5e9' },
    { name: 'PRIMERACOMPRA', value: 12340, color: '#8b5cf6' },
    { name: 'PREMIUM50', value: 9820, color: '#ec4899' },
    { name: 'VIPSALE', value: 8210, color: '#10b981' },
    { name: 'Otros', value: 6410, color: '#f59e0b' },
  ];

  // Métricas financieras
  const metrics = [
    {
      icon: DollarSign,
      label: 'Ingresos Totales',
      value: '$55,230',
      change: '+28.4%',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: ShoppingBag,
      label: 'Tickets Promedio',
      value: '$156',
      change: '+15.2%',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Percent,
      label: 'Descuento Promedio',
      value: '18%',
      change: '-3.1%',
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: Users,
      label: 'Conversión',
      value: '67%',
      change: '+9.8%',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  // Custom tooltip para el pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-3 border border-gray-200">
          <p className="text-sm font-bold text-gray-900">{payload[0].name}</p>
          <p className="text-lg font-bold text-emerald-600">${payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Métricas en cards pequeñas */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-lg transition-all duration-300 group"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
              <metric.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide">
              {metric.label}
            </p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl font-bold text-gray-900">
                {metric.value}
              </p>
              <span className={`text-xs font-bold ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Gráfico de distribución */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-100 border border-gray-200"
      >
        <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Distribución de Ingresos
        </h4>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Leyenda personalizada */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-medium text-gray-700">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Comparativa rápida */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200"
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <h4 className="text-sm font-bold text-indigo-900">Rendimiento</h4>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-700">Costo inversión</span>
            <span className="text-sm font-bold text-gray-900">$12,450</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-700">Retorno total</span>
            <span className="text-sm font-bold text-emerald-600">$55,230</span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">ROI Neto</span>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              343.6%
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MetricasIngresos;
