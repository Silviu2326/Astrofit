import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getHabitAdherence, HabitAdherenceData } from '../estadisticasHabitosApi';
import { PieChart, Loader } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoAdherencia: React.FC = () => {
  const [chartData, setChartData] = useState<HabitAdherenceData | null>(null);

  useEffect(() => {
    getHabitAdherence().then(data => {
      // Actualizamos los colores al esquema orange-red-pink
      const updatedData = {
        ...data,
        datasets: data.datasets.map(dataset => ({
          ...dataset,
          backgroundColor: ['#f97316', '#ef4444', '#ec4899'],
          borderColor: ['#ea580c', '#dc2626', '#db2777'],
          borderWidth: 2
        }))
      };
      setChartData(updatedData);
    });
  }, []);

  if (!chartData) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden">
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 text-orange-500 animate-spin" />
          <span className="ml-3 text-gray-600">Cargando gráfico...</span>
        </div>
      </div>
    );
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
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
        }
      }
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/50 relative overflow-hidden group">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
            <PieChart className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Adherencia por Categoría</h2>
        </div>

        {/* Chart */}
        <div className="relative h-72 mb-4">
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-orange-50 to-red-50">
            <p className="text-sm font-semibold text-gray-600 mb-1">Total Hábitos</p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              {chartData.labels.length}
            </p>
          </div>
          <div className="text-center p-3 rounded-xl bg-gradient-to-br from-red-50 to-pink-50">
            <p className="text-sm font-semibold text-gray-600 mb-1">Promedio</p>
            <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
              {chartData.datasets[0]?.data[0] || 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficoAdherencia;
