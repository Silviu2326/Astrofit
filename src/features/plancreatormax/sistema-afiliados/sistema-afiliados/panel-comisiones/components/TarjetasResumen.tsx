import React from 'react';

interface TarjetasResumenProps {
  data: {
    totalGenerado: number;
    totalPendiente: number;
    totalPagado: number;
    totalProcesando: number;
  };
}

const TarjetasResumen: React.FC<TarjetasResumenProps> = ({ data }) => {
  const { totalGenerado, totalPendiente, totalPagado, totalProcesando } = data;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-blue-500 text-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <p className="text-sm font-medium">Total Generado</p>
        <p className="text-3xl font-bold">{formatCurrency(totalGenerado)}</p>
      </div>
      <div className="bg-yellow-500 text-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <p className="text-sm font-medium">Pendiente de Pago</p>
        <p className="text-3xl font-bold">{formatCurrency(totalPendiente)}</p>
      </div>
      <div className="bg-green-500 text-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <p className="text-sm font-medium">Total Pagado</p>
        <p className="text-3xl font-bold">{formatCurrency(totalPagado)}</p>
      </div>
      <div className="bg-purple-500 text-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center">
        <p className="text-sm font-medium">En Procesamiento</p>
        <p className="text-3xl font-bold">{formatCurrency(totalProcesando)}</p>
      </div>
    </div>
  );
};

export default TarjetasResumen;
