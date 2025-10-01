import React from 'react';

const MetricasRapidas: React.FC = () => {
  // Datos de ejemplo para métricas rápidas
  const totalCampaigns = 10;
  const avgOpenRate = '22.5%';
  const avgClickRate = '4.8%';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium text-gray-500">Total Campañas</h3>
        <p className="text-3xl font-bold text-gray-900">{totalCampaigns}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium text-gray-500">Tasa Apertura Media</h3>
        <p className="text-3xl font-bold text-gray-900">{avgOpenRate}</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-medium text-gray-500">Tasa Clics Media</h3>
        <p className="text-3xl font-bold text-gray-900">{avgClickRate}</p>
      </div>
    </div>
  );
};

export default MetricasRapidas;
