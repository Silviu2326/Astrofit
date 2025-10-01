import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GraficosPasosProps {
  dailySteps: { date: string; steps: number }[];
}

const GraficosPasos: React.FC<GraficosPasosProps> = ({ dailySteps }) => {
  const data = {
    labels: dailySteps.map(d => d.date),
    datasets: [
      {
        label: 'Pasos Diarios',
        data: dailySteps.map(d => d.steps),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Pasos Diarios',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Gráfico de Pasos Diarios</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default GraficosPasos;
