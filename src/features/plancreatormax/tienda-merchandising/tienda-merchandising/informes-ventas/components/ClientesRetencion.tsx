import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, TrendingUp, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const datosClientes = [
  { mes: 'Ene', nuevos: 420, recurrentes: 680 },
  { mes: 'Feb', nuevos: 520, recurrentes: 780 },
  { mes: 'Mar', nuevos: 480, recurrentes: 820 },
  { mes: 'Abr', nuevos: 610, recurrentes: 950 },
  { mes: 'May', nuevos: 550, recurrentes: 1020 },
  { mes: 'Jun', nuevos: 670, recurrentes: 1180 },
];

const segmentosRFM = [
  { segmento: 'Champions', clientes: 342, valor: 98500, color: '#10b981', descripcion: 'Compran frecuentemente, alto valor' },
  { segmento: 'Leales', clientes: 487, valor: 72400, color: '#14b8a6', descripcion: 'Compran regularmente' },
  { segmento: 'Potenciales', clientes: 256, valor: 45200, color: '#06b6d4', descripcion: 'Alto potencial, nuevos' },
  { segmento: 'En Riesgo', clientes: 198, valor: 28900, color: '#f59e0b', descripcion: 'No compran hace tiempo' },
  { segmento: 'Perdidos', clientes: 85, valor: 12450, color: '#ef4444', descripcion: 'Churn, inactivos' },
];

const ClientesRetencion: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Users className="w-6 h-6" />
            </div>
            Clientes y Retención
          </h3>
          <p className="text-pink-100 text-sm mt-2">Análisis RFM y comportamiento de clientes</p>
        </div>
      </div>

      <div className="p-6">
        {/* Métricas principales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <Users className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">CLV Promedio</p>
            <p className="text-2xl font-bold text-green-900">$285</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
            <TrendingUp className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Tasa Retorno</p>
            <p className="text-2xl font-bold text-blue-900">42%</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
            <Heart className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-xs font-bold text-purple-700 uppercase tracking-wide mb-1">Días entre compras</p>
            <p className="text-2xl font-bold text-purple-900">28</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200">
            <ArrowUpRight className="w-5 h-5 text-orange-600 mb-2" />
            <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1">Churn Rate</p>
            <p className="text-2xl font-bold text-orange-900">6.2%</p>
          </div>
        </div>

        {/* Gráfico nuevos vs recurrentes */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Clientes Nuevos vs Recurrentes</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={datosClientes}>
              <defs>
                <linearGradient id="colorNuevos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorRecurrentes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
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
              <Area type="monotone" dataKey="nuevos" stackId="1" stroke="#06b6d4" fill="url(#colorNuevos)" />
              <Area type="monotone" dataKey="recurrentes" stackId="1" stroke="#10b981" fill="url(#colorRecurrentes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Segmentación RFM */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">Segmentación RFM</h4>
          <div className="space-y-3">
            {segmentosRFM.map((segmento, index) => (
              <motion.div
                key={segmento.segmento}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.05, duration: 0.4 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 hover:border-pink-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  {/* Segmento */}
                  <div className="flex items-center gap-3 flex-1 min-w-[180px]">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: segmento.color }}
                    ></div>
                    <div>
                      <h5 className="font-bold text-gray-900">{segmento.segmento}</h5>
                      <p className="text-xs text-gray-500">{segmento.descripcion}</p>
                    </div>
                  </div>

                  {/* Clientes */}
                  <div className="text-center min-w-[80px]">
                    <p className="text-lg font-bold text-gray-900">{segmento.clientes}</p>
                    <p className="text-xs text-gray-500">clientes</p>
                  </div>

                  {/* Valor */}
                  <div className="text-center min-w-[100px]">
                    <p className="text-lg font-bold text-pink-600">${(segmento.valor / 1000).toFixed(1)}k</p>
                    <p className="text-xs text-gray-500">valor total</p>
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(segmento.clientes / segmentosRFM[0].clientes) * 100}%` }}
                    transition={{ delay: 1.3 + index * 0.05, duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: segmento.color }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Top 3 Clientes VIP */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Top 3 Clientes VIP</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { nombre: 'Cliente #1', compras: 24, valor: 12400, posicion: '🥇' },
              { nombre: 'Cliente #2', compras: 21, valor: 10800, posicion: '🥈' },
              { nombre: 'Cliente #3', compras: 18, valor: 9500, posicion: '🥉' },
            ].map((cliente, index) => (
              <div key={index} className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-4 border border-yellow-200">
                <div className="text-3xl mb-2">{cliente.posicion}</div>
                <h5 className="font-bold text-gray-900 mb-1">{cliente.nombre}</h5>
                <p className="text-sm text-gray-600">{cliente.compras} compras</p>
                <p className="text-lg font-bold text-amber-600 mt-2">${cliente.valor.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientesRetencion;
