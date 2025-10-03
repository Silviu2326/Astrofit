import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { mockExperiments } from '../data/mockData';

const GraficosComparativos: React.FC = () => {
  // Usar el primer experimento como ejemplo
  const experiment = mockExperiments[0];

  const data = experiment.variants.map(variant => ({
    name: variant.name,
    'Tasa de Conversión': variant.conversionRate,
    'Revenue (miles)': variant.revenue / 1000,
    'Visitantes (miles)': variant.visitors / 1000
  }));

  const COLORS = ['#6366f1', '#10b981', '#f59e0b'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-emerald-600" />
        Comparación de Métricas - {experiment.name}
      </h3>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}
          />
          <Legend />
          <Bar dataKey="Tasa de Conversión" fill="#10b981" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
          <Bar dataKey="Revenue (miles)" fill="#6366f1" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.7} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Métricas rápidas */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {experiment.variants.map((variant, index) => (
          <div key={variant.id} className="text-center p-3 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-1">{variant.name}</p>
            <p className="text-2xl font-bold text-gray-900">{variant.conversionRate}%</p>
            <p className="text-xs text-gray-500 mt-1">{variant.visitors.toLocaleString()} visitantes</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default GraficosComparativos;
