import React from 'react';

const RadarClientes: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Radar de Clientes</h2>
      <p className="text-gray-600">Visualización del riesgo de churn y el progreso de los clientes.</p>
      {/* Aquí se integraría un componente de gráfico de radar o similar */}
      <div className="mt-4 bg-gray-50 p-4 rounded-md flex items-center justify-center h-48">
        <p className="text-gray-400">[Gráfico de Radar de Clientes aquí]</p>
      </div>
    </div>
  );
};

export default RadarClientes;
