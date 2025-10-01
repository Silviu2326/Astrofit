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

interface GraficosFrecuenciaProps {
  heartRate: { date: string; resting: number; exercise: number }[];
}

const GraficosFrecuencia: React.FC<GraficosFrecuenciaProps> = ({ heartRate }) => {
  const data = {
    labels: heartRate.map(d => d.date),
    datasets: [
      {
        label: 'Frecuencia Cardíaca en Reposo',
        data: heartRate.map(d => d.resting),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Frecuencia Cardíaca en Ejercicio',
        data: heartRate.map(d => d.exercise),
        fill: false,
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
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
        text: 'Frecuencia Cardíaca (Reposo vs. Ejercicio)',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Gráfico de Frecuencia Cardíaca</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default GraficosFrecuencia;
