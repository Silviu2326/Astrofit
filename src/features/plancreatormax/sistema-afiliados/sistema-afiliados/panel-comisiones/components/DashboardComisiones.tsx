import React from 'react';
import TarjetasResumen from './TarjetasResumen';

const DashboardComisiones: React.FC = () => {
  // Aquí se podría cargar la data del resumen de comisiones desde la API
  // y pasarla a TarjetasResumen.
  const resumenData = {
    totalGenerado: 15230.50,
    totalPendiente: 2100.75,
    totalPagado: 12000.00,
    totalProcesando: 1129.75,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Resumen General de Comisiones</h2>
      <TarjetasResumen data={resumenData} />
    </div>
  );
};

export default DashboardComisiones;
