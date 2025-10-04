import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, MousePointer, DollarSign, Target, Eye, Filter } from 'lucide-react';
import { MOCK_CAMPANAS } from '../types';

const MetricasCampana: React.FC = () => {
  const [campanaSeleccionada, setCampanaSeleccionada] = useState(MOCK_CAMPANAS[0].id);

  const campana = MOCK_CAMPANAS.find(c => c.id === campanaSeleccionada) || MOCK_CAMPANAS[0];

  const metricas = [
    {
      titulo: 'Impresiones',
      valor: campana.impresiones.toLocaleString(),
      icono: Eye,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50',
      cambio: '+15%'
    },
    {
      titulo: 'Clicks',
      valor: campana.clicks.toLocaleString(),
      icono: MousePointer,
      color: 'from-purple-500 to-fuchsia-600',
      bgColor: 'from-purple-50 to-fuchsia-50',
      cambio: '+22%'
    },
    {
      titulo: 'Conversiones',
      valor: campana.conversiones.toLocaleString(),
      icono: Target,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      cambio: '+18%'
    },
    {
      titulo: 'CTR',
      valor: `${campana.ctr}%`,
      icono: TrendingUp,
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
      cambio: '+5%'
    },
    {
      titulo: 'CPC',
      valor: `$${campana.cpc.toFixed(2)}`,
      icono: DollarSign,
      color: 'from-violet-500 to-purple-600',
      bgColor: 'from-violet-50 to-purple-50',
      cambio: '-8%'
    },
    {
      titulo: 'CPA',
      valor: `$${campana.cpa.toFixed(2)}`,
      icono: DollarSign,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-50',
      cambio: '-12%'
    }
  ];

  const embudoConversion = [
    { paso: 'Impresiones', valor: campana.impresiones, porcentaje: 100, color: 'bg-blue-500' },
    { paso: 'Clicks', valor: campana.clicks, porcentaje: (campana.clicks / campana.impresiones) * 100, color: 'bg-purple-500' },
    { paso: 'Conversiones', valor: campana.conversiones, porcentaje: (campana.conversiones / campana.impresiones) * 100, color: 'bg-green-500' }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-fuchsia-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl text-white shadow-lg">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-fuchsia-600">
            Métricas Detalladas
          </h2>
        </div>

        {/* Selector de campaña */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
          <select
            value={campanaSeleccionada}
            onChange={(e) => setCampanaSeleccionada(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm appearance-none cursor-pointer font-semibold"
          >
            {MOCK_CAMPANAS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.imagen} {c.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de métricas */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metricas.map((metrica, idx) => {
          const Icon = metrica.icono;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className={`bg-gradient-to-br ${metrica.bgColor} rounded-2xl p-5 border border-white shadow-lg relative overflow-hidden group`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 bg-gradient-to-br ${metrica.color} rounded-xl text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-sm font-bold ${metrica.cambio.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metrica.cambio}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-600 mb-1 uppercase tracking-wide">{metrica.titulo}</p>
              <p className="text-3xl font-bold text-gray-900">{metrica.valor}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ROI Destacado */}
      <div className="relative z-10 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-gradient-to-r from-violet-500 via-purple-600 to-fuchsia-600 rounded-3xl p-8 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-violet-100 text-sm font-bold uppercase tracking-wider mb-2">Retorno de Inversión</p>
              <p className="text-6xl font-bold mb-2">{campana.roi}%</p>
              <p className="text-violet-100">
                Presupuesto: ${campana.presupuesto.toLocaleString()} •
                Utilizado: ${campana.presupuestoUtilizado.toLocaleString()}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 rounded-full border-8 border-white/30 flex items-center justify-center">
                <TrendingUp className="w-16 h-16" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Embudo de Conversión */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Embudo de Conversión
        </h3>

        <div className="space-y-4">
          {embudoConversion.map((nivel, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-white rounded-2xl p-4 shadow-md border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">{nivel.paso}</span>
                <span className="text-sm text-gray-600">
                  {nivel.valor.toLocaleString()} ({nivel.porcentaje.toFixed(2)}%)
                </span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${nivel.porcentaje}%` }}
                  transition={{ delay: idx * 0.1 + 0.3, duration: 0.8 }}
                  className={`h-full ${nivel.color} rounded-full`}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricasCampana;
