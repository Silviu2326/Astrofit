import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRetentionKPIs, KPIData } from '../retencionClientesApi';

const KPIsDestacados: React.FC = () => {
  const { data: kpis, isLoading, error } = useQuery<KPIData[], Error>({
    queryKey: ['retentionKPIs'],
    queryFn: fetchRetentionKPIs,
  });

  if (isLoading) return <div>Cargando KPIs...</div>;
  if (error) return <div>Error al cargar KPIs: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {kpis?.map((kpi) => (
        <div key={kpi.name} className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg font-medium text-gray-500">{kpi.name}</p>
          <p className="text-4xl font-bold text-gray-900 mt-2">{kpi.value}</p>
          <p
            className={`text-sm mt-1 ${
              kpi.trend === 'up' ? 'text-green-500' : kpi.trend === 'down' ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {kpi.change} {kpi.trend === 'up' ? '▲' : kpi.trend === 'down' ? '▼' : ''}
          </p>
        </div>
      ))}
    </div>
  );
};

export default KPIsDestacados;
