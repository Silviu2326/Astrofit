import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { MedioPago } from '../cajaDiariaApi';

Chart.register(...registerables);

interface GraficoMediosPagoProps {
  mediosPago: MedioPago[];
}

const GraficoMediosPago: React.FC<GraficoMediosPagoProps> = ({ mediosPago }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destruir instancia anterior si existe
      }

      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const labels = mediosPago.map(medio => medio.tipo);
        const data = mediosPago.map(medio => medio.monto);
        const backgroundColors = ['#4CAF50', '#2196F3']; // Verde para Efectivo, Azul para Tarjeta

        chartInstance.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: backgroundColors,
                hoverOffset: 4,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Ingresos por Medio de Pago',
                font: {
                  size: 16,
                },
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
  }, [mediosPago]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default GraficoMediosPago;
