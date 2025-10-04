import React, { useEffect, useState } from 'react';
import { fetchEmbudoConversion, ConversionData } from '../reportesEnvioApi';

const EmbudoConversion: React.FC = () => {
  const [funnelData, setFunnelData] = useState<ConversionData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFunnelData = async () => {
      const data = await fetchEmbudoConversion();
      setFunnelData(data);
      setLoading(false);
    };
    getFunnelData();
  }, []);

  if (loading) {
    return <div className="p-4 bg-white rounded-lg shadow">Cargando embudo de conversión...</div>;
  }

  if (!funnelData || funnelData.length === 0) {
    return <div className="p-4 bg-white rounded-lg shadow">No hay datos para el embudo de conversión.</div>;
  }

  // Simple representation of a funnel, ideally this would be a chart
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Embudo de Conversión</h2>
      <div className="space-y-4">
        {funnelData.map((step, index) => (
          <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-md">
            <span className="font-medium text-gray-800">{step.paso}</span>
            <span className="text-blue-700 font-bold">{step.cantidad.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4">
        (Representación simplificada. Aquí iría un gráfico de embudo real.)
      </p>
    </div>
  );
};

export default EmbudoConversion;