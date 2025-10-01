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

interface GraficoMultiAnualProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
}

const GraficoMultiAnual: React.FC<GraficoMultiAnualProps> = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Rendimiento a lo largo de las Temporadas',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Valor de Rendimiento',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Temporada/Año',
        },
      },
    },
  };

  return (
    <div className="relative h-96">
      <Line options={options} data={data} />
    </div>
  );
};

export default GraficoMultiAnual;
