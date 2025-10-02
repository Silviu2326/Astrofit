import React, { useEffect, useState } from 'react';
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
  Filler
} from 'chart.js';
import { TrendingUp, Loader } from 'lucide-react';

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

const DashboardAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => setLoading(false), 500);
  }, []);

  // Datos de ejemplo para el gráfico de línea de progreso
  const lineChartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Esta Semana',
        data: [65, 78, 72, 85, 90, 88, 92],
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#f97316',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Semana Pasada',
        data: [55, 68, 62, 75, 70, 72, 78],
        borderColor: '#ec4899',
        backgroundColor: 'rgba(236, 72, 153, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ec4899',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderDash: [5, 5]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
            weight: '600' as const
          },
          color: '#374151',
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: '#f97316',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        titleFont: {
          size: 14,
          weight: 'bold' as const
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context: any) {
            return context.dataset.label + ': ' + context.parsed.y + '% cumplimiento';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value: any) {
            return value + '%';
          },
          color: '#6b7280',
          font: {
            size: 11
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
            weight: '500' as const
          }
        },
        grid: {
          display: false
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 text-orange-500 animate-spin" />
          <span className="ml-3 text-gray-600">Cargando gráfico...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-red-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Progreso Semanal</h2>
        </div>

        {/* Chart */}
        <div className="relative h-72 mb-4">
          <Line data={lineChartData} options={chartOptions} />
        </div>

        {/* Stats comparison */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-orange-50 to-red-50">
            <p className="text-xs font-semibold text-gray-600 mb-1">Mejor Día</p>
            <p className="text-lg font-bold text-orange-600">Dom</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-red-50 to-pink-50">
            <p className="text-xs font-semibold text-gray-600 mb-1">Promedio</p>
            <p className="text-lg font-bold text-red-600">81%</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-pink-50 to-orange-50">
            <p className="text-xs font-semibold text-gray-600 mb-1">Mejora</p>
            <p className="text-lg font-bold text-pink-600">+14%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAnalytics;
