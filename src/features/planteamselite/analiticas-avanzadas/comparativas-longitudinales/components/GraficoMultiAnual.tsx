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
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
          font: {
            size: 13,
            weight: '600' as const,
            family: "'Inter', sans-serif",
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(99, 102, 241, 0.08)',
          lineWidth: 1,
        },
        ticks: {
          font: {
            size: 12,
            weight: '500' as const,
          },
          color: '#6b7280',
        },
        title: {
          display: true,
          text: 'Valor de Rendimiento',
          font: {
            size: 13,
            weight: 'bold' as const,
          },
          color: '#4b5563',
        },
      },
      x: {
        grid: {
          color: 'rgba(168, 85, 247, 0.05)',
          lineWidth: 1,
        },
        ticks: {
          font: {
            size: 12,
            weight: '600' as const,
          },
          color: '#6b7280',
        },
        title: {
          display: true,
          text: 'Temporada/Año',
          font: {
            size: 13,
            weight: 'bold' as const,
          },
          color: '#4b5563',
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
      point: {
        radius: 5,
        hoverRadius: 7,
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    },
  };

  // Mejorar los datasets con fill
  const enhancedData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      fill: true,
      tension: 0.4,
    })),
  };

  return (
    <div className="relative">
      {/* Contenedor con backdrop blur */}
      <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-indigo-100">
        {/* Decoración de fondo */}
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-2xl opacity-40"></div>
        <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full blur-2xl opacity-40"></div>

        <div className="relative z-10 h-96">
          <Line options={options} data={enhancedData} />
        </div>
      </div>
    </div>
  );
};

export default GraficoMultiAnual;
