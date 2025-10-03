import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { AtletaRendimientoData, fetchHistorialRendimiento } from '../historialRendimientoApi';

Chart.register(...registerables);

interface GraficosProgresionProps {
  timeframe: 'week' | 'month' | 'year';
}

const GraficosProgresion: React.FC<GraficosProgresionProps> = ({ timeframe }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [data, setData] = useState<AtletaRendimientoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // For demonstration, we'll use a fixed athlete ID. In a real app, this would come from context or props.
      const athleteData = await fetchHistorialRendimiento('atleta1', timeframe);
      setData(athleteData);
      setLoading(false);
    };
    loadData();
  }, [timeframe]);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Destroy existing chart before creating a new one
        }

        const labels = data.map(d => d.fecha);
        const saltoVerticalData = data.map(d => d.testsFisicos.saltoVertical);
        const velocidad10mData = data.map(d => d.testsFisicos.velocidad10m);

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Salto Vertical (cm)',
                data: saltoVerticalData,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false,
              },
              {
                label: 'Velocidad 10m (s)',
                data: velocidad10mData,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
                fill: false,
                yAxisID: 'y1', // Use a secondary Y-axis for this metric
              },
              // Add more datasets for entrenamientosRealizados, cargaAcumulada, etc.
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Salto Vertical (cm)'
                }
              },
              y1: {
                beginAtZero: true,
                position: 'right',
                grid: {
                  drawOnChartArea: false, // Only draw grid lines for the first Y-axis
                },
                title: {
                  display: true,
                  text: 'Velocidad 10m (s)'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  title: (context) => {
                    const date = new Date(context[0].label);
                    return date.toLocaleDateString();
                  },
                  label: (context) => {
                    let label = context.dataset.label || '';
                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += context.parsed.y;
                    }
                    return label;
                  },
                },
              },
              // Placeholder for event markers (e.g., using annotations plugin if installed)
              // annotations: {
              //   annotations: data.filter(d => d.eventosImportantess && d.eventosImportantes.length > 0).map(d => ({
              //     type: 'line',
              //     mode: 'vertical',
              //     scaleID: 'x',
              //     value: d.fecha,
              //     borderColor: 'red',
              //     borderWidth: 2,
              //     label: {
              //       content: d.eventosImportantes.join(', '),
              //       enabled: true,
              //       position: 'top'
              //     }
              //   }))
              // }
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

  if (loading) {
    return <div className="text-center">Cargando datos de rendimiento...</div>;
  }

  if (data.length === 0) {
    return <div className="text-center">No hay datos de rendimiento disponibles para el atleta seleccionado.</div>;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Gráficos de Progresión</h2>
      <div className="relative h-96">
        <canvas ref={chartRef}></canvas>
      </div>
      {/* Placeholder for trend lines and annual comparisons logic */}
      <p className="mt-4 text-sm text-gray-600">* Aquí se mostrarán líneas de tendencia y comparaciones anuales.</p>
      <p className="text-sm text-gray-600">* Los marcadores de eventos importantes (lesiones, competencias) se integrarían en los gráficos.</p>
    </div>
  );
};

export default GraficosProgresion;
