import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, PieChart, Activity, Calendar,
  Download, Filter
} from 'lucide-react';
import {
  BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer
} from 'recharts';

const DashboardEstadisticas: React.FC = () => {
  const [filtroTemporal, setFiltroTemporal] = useState('hoy');

  // Datos mockeados para gráficos
  const accesosPorHora = [
    { hora: '06:00', accesos: 45 },
    { hora: '07:00', accesos: 89 },
    { hora: '08:00', accesos: 156 },
    { hora: '09:00', accesos: 198 },
    { hora: '10:00', accesos: 145 },
    { hora: '11:00', accesos: 132 },
    { hora: '12:00', accesos: 178 },
    { hora: '13:00', accesos: 201 },
    { hora: '14:00', accesos: 167 },
    { hora: '15:00', accesos: 143 },
    { hora: '16:00', accesos: 189 },
    { hora: '17:00', accesos: 234 },
    { hora: '18:00', accesos: 267 },
    { hora: '19:00', accesos: 198 },
    { hora: '20:00', accesos: 145 },
    { hora: '21:00', accesos: 89 }
  ];

  const distribucionPorTorno = [
    { torno: 'Entrada Principal', accesos: 342 },
    { torno: 'Gym', accesos: 218 },
    { torno: 'Vestuario H', accesos: 156 },
    { torno: 'Vestuario M', accesos: 178 },
    { torno: 'Clases', accesos: 312 },
    { torno: 'Cafetería', accesos: 285 },
    { torno: 'Spa VIP', accesos: 45 }
  ];

  const permitidosVsDenegados = [
    { name: 'Permitidos', value: 1536, color: '#10b981' },
    { name: 'Denegados', value: 18, color: '#ef4444' }
  ];

  const tendenciaSemanal = [
    { dia: 'Lun', accesos: 1245 },
    { dia: 'Mar', accesos: 1398 },
    { dia: 'Mié', accesos: 1521 },
    { dia: 'Jue', accesos: 1456 },
    { dia: 'Vie', accesos: 1678 },
    { dia: 'Sáb', accesos: 987 },
    { dia: 'Dom', accesos: 765 }
  ];

  const COLORS = ['#06b6d4', '#14b8a6', '#10b981', '#f59e0b', '#f97316', '#ef4444', '#8b5cf6'];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <BarChart3 className="w-6 h-6" />
              </div>
              Estadísticas de Uso
            </h3>
            <p className="text-blue-50 mt-2">Analytics de tornos y patrones de acceso</p>
          </div>

          {/* Filtros temporales */}
          <div className="flex items-center gap-2">
            {['hoy', 'semana', 'mes'].map((filtro) => (
              <motion.button
                key={filtro}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFiltroTemporal(filtro)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  filtroTemporal === filtro
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {filtro.charAt(0).toUpperCase() + filtro.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 space-y-6">
        {/* Grid de gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de accesos por hora (Heatmap) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-600" />
                Accesos por Hora
              </h4>
              <span className="text-xs font-semibold text-cyan-600 bg-cyan-100 px-3 py-1 rounded-full">
                Hoy
              </span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={accesosPorHora}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hora" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    border: '2px solid #06b6d4',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accesos"
                  stroke="url(#colorGradient)"
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div>
                <span className="text-gray-600">Hora pico:</span>
                <span className="font-bold text-cyan-600 ml-2">18:00 - 267 accesos</span>
              </div>
            </div>
          </motion.div>

          {/* Gráfico de distribución por torno */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Distribución por Torno
              </h4>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={distribucionPorTorno}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="torno" stroke="#6b7280" style={{ fontSize: '11px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    border: '2px solid #a855f7',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="accesos" radius={[8, 8, 0, 0]}>
                  {distribucionPorTorno.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm">
              <span className="text-gray-600">Torno más utilizado:</span>
              <span className="font-bold text-purple-600 ml-2">Entrada Principal - 342 accesos</span>
            </div>
          </motion.div>

          {/* Gráfico de permitidos vs denegados (Dona) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-green-600" />
                Accesos Permitidos vs Denegados
              </h4>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={permitidosVsDenegados}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {permitidosVsDenegados.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    border: '2px solid #10b981',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Permitidos</span>
                </div>
                <p className="text-2xl font-bold text-green-600">1,536</p>
                <p className="text-xs text-gray-500">98.8%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">Denegados</span>
                </div>
                <p className="text-2xl font-bold text-red-600">18</p>
                <p className="text-xs text-gray-500">1.2%</p>
              </div>
            </div>
          </motion.div>

          {/* Tendencia semanal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Tendencia Semanal
              </h4>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tendenciaSemanal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="dia" stroke="#6b7280" style={{ fontSize: '12px' }} />
                <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    border: '2px solid #f97316',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="accesos" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm">
              <span className="text-gray-600">Día con más tráfico:</span>
              <span className="font-bold text-orange-600 ml-2">Viernes - 1,678 accesos</span>
            </div>
          </motion.div>
        </div>

        {/* Botón de exportar */}
        <div className="flex items-center justify-center pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Download className="w-5 h-5" />
            Exportar Reporte (PDF/Excel)
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DashboardEstadisticas;
