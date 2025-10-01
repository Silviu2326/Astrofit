import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GraficosSuenoProps {
  sleepQuality: { date: string; quality: number }[];
}

const GraficosSueno: React.FC<GraficosSuenoProps> = ({ sleepQuality }) => {
  const data = {
    labels: sleepQuality.map(d => d.date),
    datasets: [
      {
        label: 'Calidad del Sueño (1-10)',
        data: sleepQuality.map(d => d.quality),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
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
        text: 'Calidad del Sueño por Noche',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Gráfico de Calidad del Sueño</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficosSueno;
