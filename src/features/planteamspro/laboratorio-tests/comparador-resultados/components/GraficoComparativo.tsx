import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { AthleteComparisonData } from '../comparadorResultadosApi';

Chart.register(...registerables);

interface GraficoComparativoProps {
  data: AthleteComparisonData[];
}

const GraficoComparativo: React.FC<GraficoComparativoProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const labels = ['Fuerza', 'Velocidad', 'Resistencia', 'Agilidad'];
        const datasets = data.map((athleteData, index) => ({
          label: athleteData.athlete,
          data: [
            athleteData.metrics.strength,
            athleteData.metrics.speed,
            athleteData.metrics.endurance,
            athleteData.metrics.agility,
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ][index % 5], // Cycle through 5 colors
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ][index % 5],
          borderWidth: 1,
        }));

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-2xl opacity-20"></div>
      <div className="relative h-96 w-full">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default GraficoComparativo;
