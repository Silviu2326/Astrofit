import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Activity } from 'lucide-react';
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
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 text-center">
        <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 font-medium">Cargando datos de rendimiento...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/50 text-center">
        <p className="text-gray-600">No hay datos de rendimiento disponibles para el atleta seleccionado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        {/* Dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Activity className="w-6 h-6" />
          </div>
          Gráficos de Progresión
        </h2>
      </div>

      {/* Body con glassmorphism */}
      <div className="p-6 relative z-10">
        <div className="relative h-96 bg-white/50 rounded-2xl p-4 shadow-inner">
          <canvas ref={chartRef}></canvas>
        </div>

        {/* Indicadores con badges */}
        <div className="mt-6 space-y-3">
          <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
            <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0"></div>
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-blue-700">Líneas de tendencia:</span> Análisis estadístico de la progresión a largo plazo
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
            <div className="w-2 h-2 mt-2 bg-purple-500 rounded-full flex-shrink-0"></div>
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-bold text-purple-700">Eventos importantes:</span> Marcadores de lesiones, competencias y cambios significativos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficosProgresion;
