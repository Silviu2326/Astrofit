import React, { useState, useEffect } from 'react';
import { fetchLifestyleTrends, LifestyleTrend } from '../agenteBienestarApi';

const TendenciasEstiloVida: React.FC = () => {
  const [trends, setTrends] = useState<LifestyleTrend[]>([]);

  useEffect(() => {
    const getTrends = async () => {
      const data = await fetchLifestyleTrends();
      setTrends(data);
    };
    getTrends();
  }, []);

  const maxHabits = Math.max(...trends.map(t => t.completed + t.missed));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tendencias de Estilo de Vida</h2>
      <div className="space-y-4">
        {trends.map((trend) => (
          <div key={trend.date} className="flex items-center">
            <span className="w-24 text-sm text-gray-600">{trend.date}</span>
            <div className="flex-1 h-6 bg-gray-200 rounded-full flex overflow-hidden ml-4">
              <div
                className="bg-green-500 h-full"
                style={{ width: `${(trend.completed / maxHabits) * 100}%` }}
                title={`Completados: ${trend.completed}`}
              ></div>
              <div
                className="bg-red-500 h-full"
                style={{ width: `${(trend.missed / maxHabits) * 100}%` }}
                title={`Fallidos: ${trend.missed}`}
              ></div>
            </div>
            <span className="ml-4 text-sm text-gray-700">{trend.completed} / {trend.completed + trend.missed}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4 text-sm text-gray-500">
        <span className="flex items-center mr-4"><span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span> Completados</span>
        <span className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span> Fallidos</span>
      </div>
    </div>
  );
};

export default TendenciasEstiloVida;
