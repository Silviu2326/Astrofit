import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { CreditCard, Banknote, DollarSign, Smartphone, TrendingUp } from 'lucide-react';

interface VentaPorMetodoPago {
  metodo: string;
  monto: number;
  tickets: number;
}

interface AnalisisPorMetodoPagoProps {
  datos: VentaPorMetodoPago[];
}

const AnalisisPorMetodoPago: React.FC<AnalisisPorMetodoPagoProps> = ({ datos }) => {
  // Calcular total
  const totalVentas = datos.reduce((sum, item) => sum + item.monto, 0);

  // Colores para cada método
  const COLORES: Record<string, string> = {
    'efectivo': '#10b981',
    'tarjeta': '#3b82f6',
    'transferencia': '#8b5cf6',
    'credito': '#f59e0b'
  };

  // Iconos para cada método
  const getIconoMetodo = (metodo: string) => {
    switch (metodo) {
      case 'efectivo':
        return <Banknote className="w-5 h-5 text-green-600" />;
      case 'tarjeta':
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case 'transferencia':
        return <DollarSign className="w-5 h-5 text-purple-600" />;
      case 'credito':
        return <Smartphone className="w-5 h-5 text-orange-600" />;
      default:
        return null;
    }
  };

  // Datos con porcentaje
  const datosConPorcentaje = datos.map(item => ({
    ...item,
    porcentaje: (item.monto / totalVentas) * 100
  }));

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            {getIconoMetodo(data.metodo)}
            <p className="text-sm font-bold text-gray-900 capitalize">{data.metodo}</p>
          </div>
          <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            ${data.monto.toFixed(2)}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {data.tickets} tickets • {data.porcentaje.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  // Label personalizado para el gráfico
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
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
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 relative overflow-hidden">
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
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Distribución por Método de Pago</h3>
              <p className="text-pink-100 text-sm mt-1">Análisis de preferencias de pago</p>
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

      {/* Contenido */}
      <div className="p-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de dona */}
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={datosConPorcentaje}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={120}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="monto"
                  paddingAngle={5}
                >
                  {datosConPorcentaje.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORES[entry.metodo] || '#6366f1'} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla complementaria */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Desglose Detallado</h4>
            {datosConPorcentaje
              .sort((a, b) => b.monto - a.monto)
              .map((item, index) => (
                <motion.div
                  key={item.metodo}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-4 border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl`} style={{ backgroundColor: `${COLORES[item.metodo]}15` }}>
                        {getIconoMetodo(item.metodo)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 capitalize">{item.metodo}</p>
                        <p className="text-xs text-gray-500">{item.tickets} transacciones</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${item.monto.toFixed(2)}
                      </p>
                      <p className="text-xs font-semibold" style={{ color: COLORES[item.metodo] }}>
                        {item.porcentaje.toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.porcentaje}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: COLORES[item.metodo] }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Estadísticas adicionales */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100"
          >
            <p className="text-sm font-semibold text-gray-600 mb-1">Total Transacciones</p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              {datos.reduce((sum, item) => sum + item.tickets, 0)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100"
          >
            <p className="text-sm font-semibold text-gray-600 mb-1">Ticket Promedio</p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
              ${(totalVentas / datos.reduce((sum, item) => sum + item.tickets, 0)).toFixed(2)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100"
          >
            <p className="text-sm font-semibold text-gray-600 mb-1">Método Preferido</p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 capitalize">
              {datosConPorcentaje.sort((a, b) => b.monto - a.monto)[0]?.metodo || '-'}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisPorMetodoPago;
