import React, { useEffect, useState } from 'react';
import { getSalesTrends, SalesTrend } from '../panelFinancieroApi';

const EvolucionVentas: React.FC = () => {
  const [trends, setTrends] = useState<SalesTrend[]>([]);

  useEffect(() => {
    const fetchTrends = async () => {
      const data = await getSalesTrends();
      setTrends(data);
    };
    fetchTrends();
  }, []);

  if (trends.length === 0) {
    return <div className="bg-white p-4 rounded-lg shadow animate-pulse h-48"></div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Evolución de Ventas</h2>
      <div className="space-y-2">
        {trends.map((trend, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{trend.month}:</span>
            <span className="font-bold text-gray-800">${trend.sales.toLocaleString()}</span>
            <span className={`text-sm ${trend.growthRate >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend.growthRate >= 0 ? '↑' : '↓'}{Math.abs(trend.growthRate)}%
            </span>
          </div>
        ))}
      </div>
      <p className="text-gray-600 text-sm mt-4">Tendencias mensuales y anuales de crecimiento de ventas.</p>
    </div>
  );
};

export default EvolucionVentas;
