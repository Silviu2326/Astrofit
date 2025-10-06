import React from 'react';

const DashboardFinanciero: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Resumen Financiero</h2>
      <div className="space-y-2">
        <p className="text-gray-600">Ingresos Totales: <span className="font-medium text-green-600">$120,000</span></p>
        <p className="text-gray-600">Margen de Beneficio: <span className="font-medium text-green-600">25%</span></p>
        <p className="text-gray-600">Crecimiento Mensual: <span className="font-medium text-green-600">+5%</span></p>
        {/* Add more financial metrics */}
      </div>
    </div>
  );
};

export default DashboardFinanciero;
