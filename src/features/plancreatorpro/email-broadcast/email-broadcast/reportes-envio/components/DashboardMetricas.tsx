import React, { useEffect, useState } from 'react';
import { fetchMetricasEmail, MetricasEmail } from '../reportesEnvioApi';

const DashboardMetricas: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricasEmail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMetrics = async () => {
      const data = await fetchMetricasEmail();
      setMetrics(data);
      setLoading(false);
    };
    getMetrics();
  }, []);

  if (loading) {
    return <div className="p-4 bg-white rounded-lg shadow col-span-full">Cargando métricas...</div>;
  }

  if (!metrics) {
    return <div className="p-4 bg-white rounded-lg shadow col-span-full">No se pudieron cargar las métricas.</div>;
  }

  const metricCards = [
    { title: 'Tasa de Apertura', value: `${metrics.tasaApertura}%`, description: 'Porcentaje de emails abiertos.' },
    { title: 'Tasa de Clics', value: `${metrics.tasaClics}%`, description: 'Porcentaje de clics en enlaces.' },
    { title: 'Tasa de Bajas', value: `${metrics.tasaBajas}%`, description: 'Porcentaje de usuarios que se dieron de baja.' },
    { title: 'Emails Enviados', value: metrics.emailsEnviados.toLocaleString(), description: 'Total de emails enviados.' },
    { title: 'Emails Entregados', value: metrics.emailsEntregados.toLocaleString(), description: 'Total de emails entregados con éxito.' },
  ];

  return (
    <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {metricCards.map((card, index) => (
        <div key={index} className="bg-white p-5 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{card.title}</h3>
          <p className="text-3xl font-bold text-blue-600 mb-1">{card.value}</p>
          <p className="text-sm text-gray-500">{card.description}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardMetricas;