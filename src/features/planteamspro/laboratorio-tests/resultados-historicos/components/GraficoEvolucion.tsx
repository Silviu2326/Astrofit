import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Resultado {
  date: string;
  value: number;
}

interface GraficoEvolucionProps {
  data: Resultado[];
  testUnit: string;
}

const GraficoEvolucion: React.FC<GraficoEvolucionProps> = ({ data, testUnit }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.map(res => res.date),
            datasets: [
              {
                label: `Evolución (${testUnit})`,
                data: data.map(res => res.value),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Evolución Histórica de Resultados',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Fecha',
                },
              },
              y: {
                title: {
                  display: true,
                  text: `Valor (${testUnit})`,
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
  }, [data, testUnit]);

  return (
    <div className="relative h-96">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default GraficoEvolucion;
