import React from 'react';
import { motion } from 'framer-motion';
import { Users, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SegmentoInactivo {
  nivel: string;
  titulo: string;
  cantidad: number;
  color: string;
}

const RadarInactivos: React.FC = () => {
  const segmentos: SegmentoInactivo[] = [
    { nivel: 'en-riesgo', titulo: 'En Riesgo', cantidad: 45, color: '#f59e0b' },
    { nivel: 'inactivo', titulo: 'Inactivos', cantidad: 82, color: '#f97316' },
    { nivel: 'casi-perdido', titulo: 'Casi Perdidos', cantidad: 53, color: '#ef4444' },
    { nivel: 'perdido', titulo: 'Perdidos', cantidad: 34, color: '#9ca3af' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden"
    >
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 mb-1">
              Radar de Clientes Inactivos
            </h3>
            <p className="text-sm text-gray-600">Visualización del estado de inactividad</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={segmentos}
              dataKey="cantidad"
              nameKey="titulo"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ titulo, cantidad }) => `${titulo}: ${cantidad}`}
            >
              {segmentos.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {segmentos.map((segmento, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segmento.color }}></div>
                <span className="text-sm font-bold text-gray-700">{segmento.titulo}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{segmento.cantidad}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <p className="font-bold text-gray-800">Total Clientes en Riesgo</p>
          </div>
          <p className="text-sm text-gray-700">
            <span className="text-3xl font-bold text-orange-600">{segmentos.reduce((acc, s) => acc + s.cantidad, 0)}</span> clientes requieren atención
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RadarInactivos;
