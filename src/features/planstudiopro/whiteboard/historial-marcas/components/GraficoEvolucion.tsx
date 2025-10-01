import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { EvolutionData } from '../historialMarcasApi';

Chart.register(...registerables);

interface GraficoEvolucionProps {
  data: EvolutionData[];
}

const GraficoEvolucion: React.FC<GraficoEvolucionProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy existing chart before creating a new one
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        // Group data by exercise
        const groupedByExercise = data.reduce((acc, item) => {
          (acc[item.exercise] = acc[item.exercise] || []).push(item);
          return acc;
        }, {} as Record<string, EvolutionData[]>);

        const datasets = Object.keys(groupedByExercise).map((exercise, index) => {
          const exerciseData = groupedByExercise[exercise].sort((a, b) => a.year - b.year);
          const colors = ['#4CAF50', '#2196F3', '#FFC107', '#F44336', '#9C27B0']; // Example colors
          const color = colors[index % colors.length];

          return {
            label: exercise,
            data: exerciseData.map(item => item.averageMark),
            borderColor: color,
            backgroundColor: color + '40', // Light shade for fill
            tension: 0.3,
            fill: false,
          };
        });

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: Array.from(new Set(data.map(item => item.year))).sort((a, b) => a - b), // Unique sorted years
            datasets: datasets,
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Evolución de Marcas Personales por Ejercicio',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Año',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Marca Media',
                },
                beginAtZero: true,
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
    <div className="relative h-80">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default GraficoEvolucion;