
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Clock, Zap, Mail, MessageCircle, Smartphone } from 'lucide-react';

const AnalisisEfectividad: React.FC = () => {
  const metricasPorTipo = [
    { tipo: 'Bienvenida', apertura: 85.3, respuesta: 62.1, color: 'from-blue-500 to-indigo-600', engagement: 78 },
    { tipo: 'Seguimiento', apertura: 73.2, respuesta: 45.8, color: 'from-purple-500 to-pink-600', engagement: 65 },
    { tipo: 'Motivación', apertura: 78.6, respuesta: 58.4, color: 'from-orange-500 to-red-600', engagement: 72 },
    { tipo: 'Recordatorio', apertura: 92.1, respuesta: 71.3, color: 'from-yellow-500 to-amber-600', engagement: 85 },
    { tipo: 'Recuperación', apertura: 65.4, respuesta: 38.7, color: 'from-teal-500 to-cyan-600', engagement: 52 },
    { tipo: 'Felicitación', apertura: 88.7, respuesta: 76.2, color: 'from-green-500 to-emerald-600', engagement: 89 }
  ];

  const mejoresHorarios = [
    { rango: '8:00 - 10:00', porcentaje: 82 },
    { rango: '10:00 - 12:00', porcentaje: 78 },
    { rango: '12:00 - 14:00', porcentaje: 65 },
    { rango: '14:00 - 16:00', porcentaje: 72 },
    { rango: '16:00 - 18:00', porcentaje: 68 },
    { rango: '18:00 - 20:00', porcentaje: 58 }
  ];

  const rendimientoPorCanal = [
    { canal: 'Email', apertura: 68.4, respuesta: 45.2, icon: Mail, color: 'text-blue-600', bg: 'from-blue-50 to-indigo-50' },
    { canal: 'WhatsApp', apertura: 94.1, respuesta: 82.3, icon: MessageCircle, color: 'text-green-600', bg: 'from-green-50 to-emerald-50' },
    { canal: 'SMS', apertura: 78.5, respuesta: 58.7, icon: Smartphone, color: 'text-purple-600', bg: 'from-purple-50 to-pink-50' }
  ];

  const insights = [
    {
      titulo: 'Mejor Canal',
      descripcion: 'WhatsApp tiene la mayor tasa de engagement (94.1%)',
      icon: Zap,
      color: 'text-green-600',
      bg: 'from-green-50 to-emerald-50'
    },
    {
      titulo: 'Mejor Momento',
      descripcion: 'Las mañanas (8-10 AM) tienen 82% de efectividad',
      icon: Clock,
      color: 'text-orange-600',
      bg: 'from-orange-50 to-amber-50'
    },
    {
      titulo: 'Mejor Tipo',
      descripcion: 'Los recordatorios tienen 92.1% de apertura',
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'from-blue-50 to-indigo-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden"
    >
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <BarChart3 className="w-6 h-6" />
          </div>
          Análisis de Efectividad
        </h3>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Insights destacados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`bg-gradient-to-br ${insight.bg} rounded-2xl p-4 border-2 border-white/50`}
            >
              <insight.icon className={`w-8 h-8 ${insight.color} mb-2`} />
              <h4 className="font-bold text-gray-800 mb-1">{insight.titulo}</h4>
              <p className="text-sm text-gray-700">{insight.descripcion}</p>
            </motion.div>
          ))}
        </div>

        {/* Métricas por tipo de mensaje */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">Tasa de Apertura por Tipo de Mensaje</h4>
          <div className="space-y-3">
            {metricasPorTipo.map((metrica, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">{metrica.tipo}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-gray-600">
                      <span className="font-bold text-gray-900">{metrica.apertura}%</span> apertura
                    </span>
                    <span className="text-gray-600">
                      <span className="font-bold text-gray-900">{metrica.respuesta}%</span> respuesta
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* Barra de apertura */}
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metrica.apertura}%` }}
                      transition={{ delay: index * 0.08 + 0.2, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${metrica.color} rounded-full`}
                    ></motion.div>
                  </div>
                  {/* Barra de respuesta */}
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${metrica.respuesta}%` }}
                      transition={{ delay: index * 0.08 + 0.3, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${metrica.color} opacity-60 rounded-full`}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mejores horarios */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">Efectividad por Horario</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {mejoresHorarios.map((horario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
                className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-3 border border-gray-200 text-center"
              >
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <p className="text-xs font-semibold text-gray-700">{horario.rango}</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">{horario.porcentaje}%</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${horario.porcentaje}%` }}
                    transition={{ delay: index * 0.06 + 0.3, duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Rendimiento por canal */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 mb-4">Rendimiento por Canal</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rendimientoPorCanal.map((canal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`bg-gradient-to-br ${canal.bg} rounded-2xl p-5 border-2 border-white/50 shadow-md hover:shadow-lg transition-all duration-300`}
              >
                <canal.icon className={`w-10 h-10 ${canal.color} mb-3`} />
                <h5 className="font-bold text-gray-800 mb-3">{canal.canal}</h5>
                <div className="space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Apertura</span>
                      <span className="text-sm font-bold text-gray-900">{canal.apertura}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${canal.apertura}%` }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        className={`h-full ${canal.color.replace('text-', 'bg-')} rounded-full`}
                      ></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Respuesta</span>
                      <span className="text-sm font-bold text-gray-900">{canal.respuesta}%</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${canal.respuesta}%` }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 0.8 }}
                        className={`h-full ${canal.color.replace('text-', 'bg-')} opacity-60 rounded-full`}
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalisisEfectividad;
