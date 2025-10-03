import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getHabitAdherence, HabitAdherenceData } from '../estadisticasHabitosApi';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoAdherencia: React.FC = () => {
  const [chartData, setChartData] = useState<HabitAdherenceData | null>(null);

  useEffect(() => {
    getHabitAdherence().then(data => setChartData(data));
  }, []);

  if (!chartData) {
    return <div className="bg-white p-4 rounded-lg shadow">Cargando gr??fico de adherencia...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Adherencia General de H??bitos</h2>
      <div className="relative h-64">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
};

export default GraficoAdherencia;
