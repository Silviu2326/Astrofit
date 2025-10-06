import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ventasPorDia = [
  { dia: 'Lun', ventas: 45000 },
  { dia: 'Mar', ventas: 52000 },
  { dia: 'Mié', ventas: 48000 },
  { dia: 'Jue', ventas: 61000 },
  { dia: 'Vie', ventas: 67000 },
  { dia: 'Sáb', ventas: 58000 },
  { dia: 'Dom', ventas: 38000 },
];

const ventasPorHora = [
  { hora: '00-02', intensidad: 5 }, { hora: '02-04', intensidad: 2 }, { hora: '04-06', intensidad: 3 },
  { hora: '06-08', intensidad: 15 }, { hora: '08-10', intensidad: 35 }, { hora: '10-12', intensidad: 65 },
  { hora: '12-14', intensidad: 85 }, { hora: '14-16', intensidad: 70 }, { hora: '16-18', intensidad: 80 },
  { hora: '18-20', intensidad: 95 }, { hora: '20-22', intensidad: 60 }, { hora: '22-24', intensidad: 20 },
];

const ventasMensuales = [
  { mes: 'Ene', ventas: 45000 }, { mes: 'Feb', ventas: 52000 }, { mes: 'Mar', ventas: 48000 },
  { mes: 'Abr', ventas: 61000 }, { mes: 'May', ventas: 55000 }, { mes: 'Jun', ventas: 67000 },
  { mes: 'Jul', ventas: 72000 }, { mes: 'Ago', ventas: 78000 }, { mes: 'Sep', ventas: 68000 },
  { mes: 'Oct', ventas: 75000 }, { mes: 'Nov', ventas: 92000 }, { mes: 'Dic', ventas: 98000 },
];

type Vista = 'dia' | 'hora' | 'mes';

const AnalisisTemporal: React.FC = () => {
  const [vista, setVista] = useState<Vista>('dia');

  const getIntensidadColor = (intensidad: number) => {
    if (intensidad >= 80) return '#10b981';
    if (intensidad >= 60) return '#14b8a6';
    if (intensidad >= 40) return '#06b6d4';
    if (intensidad >= 20) return '#0ea5e9';
    return '#3b82f6';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Clock className="w-6 h-6" />
              </div>
              Análisis Temporal
            </h3>
            <p className="text-orange-100 text-sm mt-2">Patrones de compra por día, hora y mes</p>
          </div>

          {/* Selector de vista */}
          <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-1 border border-white/20">
            <button
              onClick={() => setVista('dia')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                vista === 'dia' ? 'bg-white text-orange-600 shadow-lg' : 'text-white hover:bg-white/10'
              }`}
            >
              Por Día
            </button>
            <button
              onClick={() => setVista('hora')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                vista === 'hora' ? 'bg-white text-orange-600 shadow-lg' : 'text-white hover:bg-white/10'
              }`}
            >
              Por Hora
            </button>
            <button
              onClick={() => setVista('mes')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                vista === 'mes' ? 'bg-white text-orange-600 shadow-lg' : 'text-white hover:bg-white/10'
              }`}
            >
              Estacionalidad
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Gráfico según vista */}
        {vista === 'dia' && (
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">Ventas por Día de la Semana</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ventasPorDia}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="dia" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="ventas" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#eab308" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Mejor Día</p>
                <p className="text-2xl font-bold text-green-900">Viernes ($67k)</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200">
                <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1">Peor Día</p>
                <p className="text-2xl font-bold text-orange-900">Domingo ($38k)</p>
              </div>
            </div>
          </div>
        )}

        {vista === 'hora' && (
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">Heatmap de Actividad por Hora</h4>
            <div className="grid grid-cols-6 gap-2 mb-6">
              {ventasPorHora.map((franja, index) => (
                <motion.div
                  key={franja.hora}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="aspect-square rounded-xl flex flex-col items-center justify-center p-2 text-white font-bold"
                  style={{ backgroundColor: getIntensidadColor(franja.intensidad) }}
                >
                  <span className="text-xs mb-1">{franja.hora}</span>
                  <span className="text-lg">{franja.intensidad}%</span>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Pico de Actividad</p>
                <p className="text-2xl font-bold text-green-900">18:00 - 20:00</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Horario Óptimo</p>
                <p className="text-lg font-bold text-blue-900">12:00 - 20:00</p>
              </div>
            </div>
          </div>
        )}

        {vista === 'mes' && (
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">Estacionalidad Anual</h4>
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
                <Bar dataKey="ventas" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
                <p className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Temporada Alta</p>
                <p className="text-lg font-bold text-green-900">Nov-Dic (Navidad)</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200">
                <Calendar className="w-5 h-5 text-orange-600 mb-2" />
                <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-1">Temporada Baja</p>
                <p className="text-lg font-bold text-orange-900">Ene-Feb (Post-fiestas)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AnalisisTemporal;
