import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useGetNpsScoresQuery } from '../encuestasNpsApi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TendenciasSatisfaccion: React.FC = () => {
  const { data: npsScores, isLoading } = useGetNpsScoresQuery();

  if (isLoading) return <div className="p-4 bg-white rounded-lg shadow">Cargando tendencias...</div>;

  const chartData = {
    labels: npsScores?.map((score) => score.date) || [],
    datasets: [
      {
        label: 'NPS Score',
        data: npsScores?.map((score) => score.score) || [],
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Evolución del NPS a lo largo del tiempo',
      },
    },
    scales: {
      y: {
        min: -100,
        max: 100,
        title: {
          display: true,
          text: 'NPS Score (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Fecha',
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tendencias de Satisfacción</h2>
      <p className="text-gray-600 mb-4">
        Visualiza la evolución del Net Promoter Score (NPS) para identificar patrones y mejoras.
      </p>
      <div className="h-80">
        {npsScores && npsScores.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p className="text-gray-500 text-center mt-10">No hay datos de NPS para mostrar tendencias.</p>
        )}
      </div>
    </div>
  );
};

export default TendenciasSatisfaccion;