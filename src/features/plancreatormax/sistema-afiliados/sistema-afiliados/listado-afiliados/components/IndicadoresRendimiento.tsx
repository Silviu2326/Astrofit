
import React from 'react';

export const IndicadoresRendimiento: React.FC = () => {
  // Datos simulados para los indicadores
  const totalSales = 15000;
  const totalCommission = 1500;
  const activeAffiliates = 10;
  const suspendedAffiliates = 2;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-md font-medium text-gray-500">Ventas Totales</h3>
        <p className="text-2xl font-bold text-gray-900">{totalSales} ??</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-md font-medium text-gray-500">Comisi??n Pendiente</h3>
        <p className="text-2xl font-bold text-gray-900">{totalCommission} ??</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-md font-medium text-gray-500">Afiliados Activos</h3>
        <p className="text-2xl font-bold text-green-600">{activeAffiliates}</p>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-md font-medium text-gray-500">Afiliados Suspendidos</h3>
        <p className="text-2xl font-bold text-red-600">{suspendedAffiliates}</p>
      </div>
    </div>
  );
};
