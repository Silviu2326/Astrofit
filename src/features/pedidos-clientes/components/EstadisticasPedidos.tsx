import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { EstadisticasPedidos as EstadisticasPedidosType } from '../types';

interface EstadisticasPedidosProps {
  estadisticas: EstadisticasPedidosType;
}

export const EstadisticasPedidos: React.FC<EstadisticasPedidosProps> = ({ estadisticas }) => {
  const formatearMoneda = (cantidad: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(cantidad);
  };

  const tarjetas = [
    {
      titulo: 'Ingresos Totales',
      valor: formatearMoneda(estadisticas.ingresosTotales),
      cambio: '+15%',
      tendenciaPositiva: true
    },
    {
      titulo: 'Ticket Promedio',
      valor: formatearMoneda(estadisticas.ticketPromedio),
      cambio: '+8%',
      tendenciaPositiva: true
    },
    {
      titulo: 'Tasa de Entrega',
      valor: `${Math.round((estadisticas.entregados / estadisticas.total) * 100)}%`,
      cambio: '+3%',
      tendenciaPositiva: true
    },
    {
      titulo: 'Tasa de Cancelación',
      valor: `${Math.round((estadisticas.cancelados / estadisticas.total) * 100)}%`,
      cambio: '-2%',
      tendenciaPositiva: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tarjetas.map((tarjeta, index) => (
        <motion.div
          key={tarjeta.titulo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{tarjeta.titulo}</h3>
            <div className="flex items-center gap-1">
              {tarjeta.tendenciaPositiva ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                tarjeta.tendenciaPositiva ? 'text-green-600' : 'text-red-600'
              }`}>
                {tarjeta.cambio}
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{tarjeta.valor}</p>
        </motion.div>
      ))}
    </div>
  );
};
