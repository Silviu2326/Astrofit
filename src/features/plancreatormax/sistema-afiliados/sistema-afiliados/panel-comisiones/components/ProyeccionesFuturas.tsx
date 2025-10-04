import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, BarChart3, Target } from 'lucide-react';

const ProyeccionesFuturas: React.FC = () => {
  const [escenario, setEscenario] = useState<'optimista' | 'realista' | 'conservador'>('realista');

  // Datos históricos (últimos 6 meses)
  const historico = [
    { mes: 'May', valor: 4800, tipo: 'histórico' },
    { mes: 'Jun', valor: 5500, tipo: 'histórico' },
    { mes: 'Jul', valor: 6100, tipo: 'histórico' },
    { mes: 'Ago', valor: 5800, tipo: 'histórico' },
    { mes: 'Sep', valor: 6500, tipo: 'histórico' },
    { mes: 'Oct', valor: 7200, tipo: 'histórico' }
  ];

  // Proyecciones según escenario
  const proyecciones = {
    optimista: [
      { mes: 'Nov', proyeccion: 8200, recurrente: 1200 },
      { mes: 'Dic', proyeccion: 9500, recurrente: 1400 },
      { mes: 'Ene', proyeccion: 10200, recurrente: 1600 },
      { mes: 'Feb', proyeccion: 11000, recurrente: 1800 },
      { mes: 'Mar', proyeccion: 12000, recurrente: 2000 },
      { mes: 'Abr', proyeccion: 13500, recurrente: 2200 }
    ],
    realista: [
      { mes: 'Nov', proyeccion: 7500, recurrente: 900 },
      { mes: 'Dic', proyeccion: 8000, recurrente: 1000 },
      { mes: 'Ene', proyeccion: 8200, recurrente: 1100 },
      { mes: 'Feb', proyeccion: 8600, recurrente: 1200 },
      { mes: 'Mar', proyeccion: 9000, recurrente: 1300 },
      { mes: 'Abr', proyeccion: 9500, recurrente: 1400 }
    ],
    conservador: [
      { mes: 'Nov', proyeccion: 7000, recurrente: 700 },
      { mes: 'Dic', proyeccion: 7100, recurrente: 750 },
      { mes: 'Ene', proyeccion: 7200, recurrente: 800 },
      { mes: 'Feb', proyeccion: 7300, recurrente: 850 },
      { mes: 'Mar', proyeccion: 7500, recurrente: 900 },
      { mes: 'Abr', proyeccion: 7700, recurrente: 950 }
    ]
  };

  // Combinar datos históricos y proyecciones
  const datosCompletos = [
    ...historico.map(d => ({ ...d, proyeccion: null, recurrente: null })),
    ...proyecciones[escenario]
  ];

  const totalProyectado = proyecciones[escenario].reduce((sum, p) => sum + p.proyeccion, 0);
  const totalRecurrente = proyecciones[escenario].reduce((sum, p) => sum + p.recurrente, 0);
  const promedioMensual = totalProyectado / proyecciones[escenario].length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 relative overflow-hidden">
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
            Proyecciones Futuras
          </h3>

          {/* Selector de escenario */}
          <div className="flex gap-2">
            {[
              { value: 'conservador', label: 'Conservador', color: 'bg-yellow-500' },
              { value: 'realista', label: 'Realista', color: 'bg-blue-500' },
              { value: 'optimista', label: 'Optimista', color: 'bg-green-500' }
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setEscenario(opt.value as any)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  escenario === opt.value
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Métricas de proyección */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Total Proyectado (6m)</p>
                <p className="text-2xl font-bold text-green-700">${totalProyectado.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Promedio Mensual</p>
                <p className="text-2xl font-bold text-blue-700">${promedioMensual.toFixed(0)}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">Comisiones Recurrentes</p>
                <p className="text-2xl font-bold text-purple-700">${totalRecurrente.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de proyección */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Tendencia y Proyección</h4>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={datosCompletos}>
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
                  formatter={(value: any) => `$${value?.toLocaleString() || 0}`}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                <Line
                  type="monotone"
                  dataKey="valor"
                  name="Histórico"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#3b82f6' }}
                />
                <Line
                  type="monotone"
                  dataKey="proyeccion"
                  name="Proyección"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ r: 5, fill: '#8b5cf6' }}
                />
                <Line
                  type="monotone"
                  dataKey="recurrente"
                  name="Recurrentes"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Descripción del escenario */}
        <div className={`p-4 rounded-2xl border-2 ${
          escenario === 'optimista' ? 'bg-green-50 border-green-300' :
          escenario === 'realista' ? 'bg-blue-50 border-blue-300' :
          'bg-yellow-50 border-yellow-300'
        }`}>
          <h4 className="font-bold text-gray-900 mb-2">Escenario {escenario.charAt(0).toUpperCase() + escenario.slice(1)}</h4>
          <p className="text-sm text-gray-700">
            {escenario === 'optimista' && 'Basado en crecimiento acelerado del 15% mensual con aumento en conversiones y nuevos afiliados activos.'}
            {escenario === 'realista' && 'Proyección basada en tendencia histórica con crecimiento moderado del 5-8% mensual.'}
            {escenario === 'conservador' && 'Estimación prudente con crecimiento mínimo del 2-3% mensual, considerando posibles fluctuaciones.'}
          </p>
        </div>

        {/* Factores clave */}
        <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200">
          <h4 className="font-bold text-gray-900 mb-3">Factores Considerados</h4>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              Tendencia histórica de los últimos 6 meses
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              Comisiones recurrentes programadas
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
              Estacionalidad y variaciones del mercado
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              Tasa de retención de afiliados activos
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ProyeccionesFuturas;
