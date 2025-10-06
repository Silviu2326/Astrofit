import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, TrendingUp, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const datosProyeccion = [
  { mes: 'Jun', actual: 67000, conservador: null, realista: null, optimista: null },
  { mes: 'Jul', actual: null, conservador: 64800, realista: 72000, optimista: 82800 },
  { mes: 'Ago', actual: null, conservador: 70200, realista: 78000, optimista: 89700 },
  { mes: 'Sep', actual: null, conservador: 72900, realista: 81000, optimista: 93150 },
  { mes: 'Oct', actual: null, conservador: 76500, realista: 85000, optimista: 97750 },
  { mes: 'Nov', actual: null, conservador: 82800, realista: 92000, optimista: 105800 },
  { mes: 'Dic', actual: null, conservador: 88200, realista: 98000, optimista: 112700 },
];

const ProyeccionesForecasting: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            Proyecciones y Forecasting
          </h3>
          <p className="text-purple-100 text-sm mt-2">Predicción de ventas basada en IA y tendencias históricas</p>
        </div>
      </div>

      <div className="p-6">
        {/* Escenarios de proyección */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.4 }}
            className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <p className="text-xs font-bold text-orange-700 uppercase tracking-wide">Conservador</p>
            </div>
            <p className="text-4xl font-bold text-orange-900 mb-2">$455k</p>
            <div className="flex items-center gap-1 text-sm text-orange-600">
              <span className="font-semibold">-10% tendencia</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 ring-2 ring-blue-400"
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-blue-600" />
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">Realista</p>
            </div>
            <p className="text-4xl font-bold text-blue-900 mb-2">$506k</p>
            <div className="flex items-center gap-1 text-sm text-blue-600">
              <span className="font-semibold">Tendencia actual</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide">Optimista</p>
            </div>
            <p className="text-4xl font-bold text-green-900 mb-2">$582k</p>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <span className="font-semibold">+15% crecimiento</span>
            </div>
          </motion.div>
        </div>

        {/* Gráfico de proyección */}
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Proyección de Ventas (Jul-Dic 2024)</h4>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={datosProyeccion}>
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
                formatter={(value: number) => `$${(value / 1000).toFixed(1)}k`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="conservador"
                name="Conservador"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#f59e0b', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="realista"
                name="Realista"
                stroke="#3b82f6"
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: '#3b82f6', r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="optimista"
                name="Optimista"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Objetivos y progreso */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-gray-800">Objetivos y Progreso</h4>

          {/* Meta mensual */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Meta Mensual Diciembre</p>
                <p className="text-3xl font-bold text-gray-900">$95,000</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-600 mb-1">Proyección Actual</p>
                <p className="text-3xl font-bold text-blue-600">$98,000</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '103%' }}
                transition={{ delay: 1.6, duration: 1.2 }}
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </motion.div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progreso</span>
              <span className="font-bold text-green-600">103% - Meta superada 🎉</span>
            </div>
          </div>

          {/* Meta anual */}
          <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Meta Anual 2024</p>
                <p className="text-3xl font-bold text-gray-900">$850,000</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-600 mb-1">Proyección Total</p>
                <p className="text-3xl font-bold text-indigo-600">$834,450</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '98%' }}
                transition={{ delay: 1.7, duration: 1.2 }}
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </motion.div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progreso</span>
              <span className="font-bold text-blue-600">98% - $15.5k para alcanzar meta</span>
            </div>
          </div>
        </div>

        {/* Insights de IA */}
        <div className="mt-6 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5 animate-pulse" />
            <div>
              <p className="text-sm font-bold text-indigo-900 mb-2">Insights con IA</p>
              <ul className="space-y-2 text-sm text-indigo-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>La tendencia actual indica un crecimiento del 24.5% respecto al período anterior.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Se espera un pico de ventas en temporada navideña (Nov-Dic) con incremento del 35%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Con el ritmo actual, se alcanzará el 98% de la meta anual, faltando solo $15.5k.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 mt-1">•</span>
                  <span>Recomendación: Aumentar inventario en categoría "Ropa" para capitalizar la demanda proyectada.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProyeccionesForecasting;
