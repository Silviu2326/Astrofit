import React, { useEffect, useState } from 'react';
import { getClientMetrics, MetricasClienteData } from '../estadisticasHabitosApi';

const MetricasCliente: React.FC = () => {
  const [clientMetrics, setClientMetrics] = useState<MetricasClienteData[] | null>(null);

  useEffect(() => {
    getClientMetrics().then(data => setClientMetrics(data));
  }, []);

  if (!clientMetrics) {
    return <div className="bg-white p-4 rounded-lg shadow">Cargando m??tricas de cliente...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow col-span-full">
      <h2 className="text-xl font-semibold mb-2">M??tricas Individuales por Cliente</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total H??bitos</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">H??bitos Cumplidos</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tasa Adherencia (%)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promedio Diario</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientMetrics.map((client) => (
              <tr key={client.clientId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.clientName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.totalHabits}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.completedHabits}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.adherenceRate}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.dailyAverage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetricasCliente;
