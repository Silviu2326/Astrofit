import React, { useEffect, useState } from 'react';
import { getHabitRanking, RankingHabitosData } from '../estadisticasHabitosApi';

const RankingHabitos: React.FC = () => {
  const [ranking, setRanking] = useState<RankingHabitosData | null>(null);

  useEffect(() => {
    getHabitRanking().then(data => setRanking(data));
  }, []);

  if (!ranking) {
    return <div className="bg-white p-4 rounded-lg shadow">Cargando ranking de h??bitos...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Ranking de H??bitos M??s Cumplidos</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">H??bito</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adherencia (%)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ranking.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.habit}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.adherence}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingHabitos;
