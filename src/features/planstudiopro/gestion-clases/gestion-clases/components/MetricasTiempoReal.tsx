import React, { useEffect, useState } from 'react';

interface Metrics {
  averageOccupancy: number;
  currentOccupancy: { classId: string; occupancy: number }[];
  trends: { period: string; value: number }[];
}

interface MetricasTiempoRealProps {
  // In a real app, this would likely come from a WebSocket or polling
  fetchMetrics: () => Promise<Metrics>;
}

const MetricasTiempoReal: React.FC<MetricasTiempoRealProps> = ({ fetchMetrics }) => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMetrics = async () => {
      setLoading(true);
      const data = await fetchMetrics();
      setMetrics(data);
      setLoading(false);
    };
    getMetrics();
    // Simulate real-time updates
    const interval = setInterval(getMetrics, 5000);
    return () => clearInterval(interval);
  }, [fetchMetrics]);

  if (loading) {
    return <div className="loading-skeleton">Cargando métricas...</div>;
  }

  return (
    <div className="metricas-tiempo-real">
      <h3>Métricas en Tiempo Real</h3>
      {metrics ? (
        <>
          <p>Ocupación Promedio: {metrics.averageOccupancy.toFixed(2)}%</p>
          <h4>Ocupación Actual por Clase:</h4>
          <ul>
            {metrics.currentOccupancy.map(item => (
              <li key={item.classId}>Clase {item.classId}: {item.occupancy}%</li>
            ))}
          </ul>
          <h4>Tendencias:</h4>
          <ul>
            {metrics.trends.map((trend, index) => (
              <li key={index}>{trend.period}: {trend.value.toFixed(2)}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>No hay métricas disponibles.</p>
      )}
      <p>Analytics en vivo: ocupación promedio, tendencias.</p>
    </div>
  );
};

export default MetricasTiempoReal;
