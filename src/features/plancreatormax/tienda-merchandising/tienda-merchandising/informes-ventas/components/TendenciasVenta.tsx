import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Calendar, ArrowUpRight, ArrowDownRight, Sparkles, Target, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Datos históricos
const datosHistoricos = [
  { mes: 'Ene', ventas: 45000, proyeccion: null, anno: '2024' },
  { mes: 'Feb', ventas: 52000, proyeccion: null, anno: '2024' },
  { mes: 'Mar', ventas: 48000, proyeccion: null, anno: '2024' },
  { mes: 'Abr', ventas: 61000, proyeccion: null, anno: '2024' },
  { mes: 'May', ventas: 55000, proyeccion: null, anno: '2024' },
  { mes: 'Jun', ventas: 67000, proyeccion: null, anno: '2024' },
  { mes: 'Jul', ventas: null, proyeccion: 72000, anno: '2024' },
  { mes: 'Ago', ventas: null, proyeccion: 78000, anno: '2024' },
  { mes: 'Sep', ventas: null, proyeccion: 81000, anno: '2024' },
  { mes: 'Oct', ventas: null, proyeccion: 85000, anno: '2024' },
  { mes: 'Nov', ventas: null, proyeccion: 92000, anno: '2024' },
  { mes: 'Dic', ventas: null, proyeccion: 98000, anno: '2024' },
];

// Tendencias por categoría
const tendenciasCategorias = [
  {
    categoria: 'Ropa',
    actual: 125000,
    anterior: 98000,
    cambio: 27.5,
    proyeccion: 145000,
    icon: '👕',
    color: 'from-green-500 to-emerald-600'
  },
  {
    categoria: 'Accesorios',
    actual: 78000,
    anterior: 82000,
    cambio: -4.9,
    proyeccion: 85000,
    icon: '🎒',
    color: 'from-teal-500 to-cyan-600'
  },
  {
    categoria: 'Bolsos',
    actual: 65000,
    anterior: 54000,
    cambio: 20.4,
    proyeccion: 72000,
    icon: '👜',
    color: 'from-cyan-500 to-blue-600'
  },
];

// Insights y proyecciones
const insights = [
  {
    tipo: 'Tendencia Positiva',
    mensaje: 'Las ventas han crecido 24% en los últimos 6 meses',
    impacto: 'high',
    icon: TrendingUp,
    color: 'green'
  },
  {
    tipo: 'Estacionalidad',
    mensaje: 'Se proyecta un incremento del 35% en temporada navideña',
    impacto: 'medium',
    icon: Calendar,
    color: 'blue'
  },
  {
    tipo: 'Oportunidad',
    mensaje: 'La categoría Ropa muestra el mayor potencial de crecimiento',
    impacto: 'high',
    icon: Target,
    color: 'emerald'
  },
];

const TendenciasVenta: React.FC = () => {
  const [periodoActivo, setPeriodoActivo] = useState<'trimestre' | 'semestre' | 'anual'>('semestre');

  const ventaActual = datosHistoricos.filter(d => d.ventas !== null).reduce((sum, d) => sum + (d.ventas || 0), 0);
  const proyeccionTotal = datosHistoricos.filter(d => d.proyeccion !== null).reduce((sum, d) => sum + (d.proyeccion || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Activity className="w-6 h-6" />
                </div>
                Tendencias y Proyecciones de Venta
              </h3>
              <p className="text-cyan-100 text-sm mt-2">Análisis predictivo y tendencias estacionales</p>
            </div>

            {/* Selector de período */}
            <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/20">
              {(['trimestre', 'semestre', 'anual'] as const).map((periodo) => (
                <button
                  key={periodo}
                  onClick={() => setPeriodoActivo(periodo)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    periodoActivo === periodo
                      ? 'bg-white text-emerald-600 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {periodo.charAt(0).toUpperCase() + periodo.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Métricas de proyección */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-green-100 rounded-xl">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-xs font-bold text-green-700 uppercase tracking-wide">Ventas Actual</p>
            </div>
            <p className="text-4xl font-bold text-green-900 mb-2">${(ventaActual / 1000).toFixed(0)}k</p>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-600">+24.5% vs anterior</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-cyan-100 rounded-xl">
                <Sparkles className="w-5 h-5 text-cyan-600" />
              </div>
              <p className="text-xs font-bold text-cyan-700 uppercase tracking-wide">Proyección 6 meses</p>
            </div>
            <p className="text-4xl font-bold text-cyan-900 mb-2">${(proyeccionTotal / 1000).toFixed(0)}k</p>
            <div className="flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-bold text-cyan-600">+148% potencial</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-200"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-teal-100 rounded-xl">
                <Target className="w-5 h-5 text-teal-600" />
              </div>
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wide">Meta Anual</p>
            </div>
            <p className="text-4xl font-bold text-teal-900 mb-2">$850k</p>
            <div className="flex items-center gap-2">
              <div className="w-full bg-teal-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full"
                ></motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Gráfico de Tendencias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-200"
        >
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            Evolución y Proyección de Ventas
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={datosHistoricos}>
              <defs>
                <linearGradient id="colorVentasArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProyeccionArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
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
              <Area
                type="monotone"
                dataKey="ventas"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVentasArea)"
              />
              <Area
                type="monotone"
                dataKey="proyeccion"
                stroke="#06b6d4"
                strokeWidth={3}
                strokeDasharray="5 5"
                fillOpacity={1}
                fill="url(#colorProyeccionArea)"
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Leyenda */}
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-gray-600">Ventas Reales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full border-2 border-dashed border-cyan-500"></div>
              <span className="text-sm font-medium text-gray-600">Proyección</span>
            </div>
          </div>
        </motion.div>

        {/* Tendencias por Categoría */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-6"
        >
          <h4 className="text-lg font-bold text-gray-800 mb-4">Tendencias por Categoría</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tendenciasCategorias.map((cat, index) => (
              <motion.div
                key={cat.categoria}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-4 border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900">{cat.categoria}</h5>
                    <p className="text-xs text-gray-500">Trimestre actual</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Actual</span>
                    <span className="text-lg font-bold text-gray-900">${(cat.actual / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Proyección</span>
                    <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
                      ${(cat.proyeccion / 1000).toFixed(0)}k
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    {cat.cambio > 0 ? (
                      <>
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-bold text-green-600">+{cat.cambio}%</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-bold text-red-600">{cat.cambio}%</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Insights y Recomendaciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Insights y Recomendaciones
          </h4>
          <div className="space-y-3">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.4 }}
                  className={`p-4 rounded-2xl border-2 ${
                    insight.color === 'green' ? 'bg-green-50 border-green-200' :
                    insight.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                    'bg-emerald-50 border-emerald-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl ${
                      insight.color === 'green' ? 'bg-green-100' :
                      insight.color === 'blue' ? 'bg-blue-100' :
                      'bg-emerald-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        insight.color === 'green' ? 'text-green-600' :
                        insight.color === 'blue' ? 'text-blue-600' :
                        'text-emerald-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className={`font-bold ${
                          insight.color === 'green' ? 'text-green-900' :
                          insight.color === 'blue' ? 'text-blue-900' :
                          'text-emerald-900'
                        }`}>
                          {insight.tipo}
                        </h5>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          insight.impacto === 'high' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {insight.impacto === 'high' ? 'Alto Impacto' : 'Medio Impacto'}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        insight.color === 'green' ? 'text-green-700' :
                        insight.color === 'blue' ? 'text-blue-700' :
                        'text-emerald-700'
                      }`}>
                        {insight.mensaje}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TendenciasVenta;
