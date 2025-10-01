import React from 'react';

const MetricasIngresos: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-blue-100 p-4 rounded shadow">
        <h3 className="text-lg font-medium">Ingresos Totales</h3>
        <p className="text-2xl font-bold">$15,000</p>
      </div>
      <div className="bg-green-100 p-4 rounded shadow">
        <h3 className="text-lg font-medium">Clientes Nuevos</h3>
        <p className="text-2xl font-bold">120</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded shadow">
        <h3 className="text-lg font-medium">ROI Promedio</h3>
        <p className="text-2xl font-bold">25%</p>
      </div>
      {/* Add more financial metrics here */}
    </div>
  );
};

export default MetricasIngresos;
