import React from 'react';
import GraficoUsos from './GraficoUsos';
import MetricasIngresos from './MetricasIngresos';

const DashboardCupones: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Uso de Cupones</h2>
        <GraficoUsos />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Métricas de Ingresos</h2>
        <MetricasIngresos />
      </div>
      {/* Add more dashboard components here */}
    </div>
  );
};

export default DashboardCupones;
