import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Activity, Users,
  MapPin, Package, Calendar, BarChart3
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useGetNpsScoresQuery } from '../encuestasNpsApi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const TendenciasSatisfaccion: React.FC = () => {
  const { data: npsScores, isLoading } = useGetNpsScoresQuery();
  const [timeRange, setTimeRange] = useState<'monthly' | 'quarterly'>('monthly');
  const [segmentation, setSegmentation] = useState<'all' | 'client' | 'product' | 'location'>('all');

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded-lg mb-4 w-3/4"></div>
          <div className="h-64 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: npsScores?.map((score) => score.date) || [],
    datasets: [
      {
        label: 'NPS Score',
        data: npsScores?.map((score) => score.score) || [],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 6,
        pointBackgroundColor: 'rgb(99, 102, 241)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderColor: 'rgb(99, 102, 241)',
        borderWidth: 1,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          label: (context: any) => `NPS: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        min: -100,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: '500' as const,
          },
          color: '#6B7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: '500' as const,
          },
          color: '#6B7280',
        },
      },
    },
  };

  // Identificación de picos y caídas (mock)
  const insights = [
    { type: 'peak', date: 'Marzo 2024', value: 62, reason: 'Nuevo programa de fidelización' },
    { type: 'drop', date: 'Enero 2024', value: 48, reason: 'Problemas técnicos reportados' },
  ];

  const segmentOptions = [
    { id: 'all', label: 'Todos', icon: Activity },
    { id: 'client', label: 'Tipo Cliente', icon: Users },
    { id: 'product', label: 'Producto', icon: Package },
    { id: 'location', label: 'Ubicación', icon: MapPin },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 relative">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10 mb-2">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <BarChart3 className="w-6 h-6" />
          </div>
          Tendencias de Satisfacción
        </h3>
        <p className="text-blue-100 text-sm relative z-10">
          Evolución del NPS con análisis de patrones y segmentación
        </p>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Controles de vista */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Rango temporal */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setTimeRange('monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                  timeRange === 'monthly'
                    ? 'bg-white text-indigo-600 shadow-md'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Mensual
              </button>
              <button
                onClick={() => setTimeRange('quarterly')}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${
                  timeRange === 'quarterly'
                    ? 'bg-white text-indigo-600 shadow-md'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Trimestral
              </button>
            </div>
          </div>

          {/* Segmentación */}
          <div className="flex gap-2">
            {segmentOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSegmentation(option.id as any)}
                className={`px-3 py-2 rounded-xl border-2 transition-all duration-300 flex items-center gap-2 ${
                  segmentation === option.id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-indigo-300'
                }`}
              >
                <option.icon className="w-4 h-4" />
                <span className="text-sm font-bold hidden sm:inline">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gráfico */}
        <div className="mb-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
          <div className="h-80">
            {npsScores && npsScores.length > 0 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No hay datos de NPS para mostrar tendencias.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Picos y caídas identificados */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Insights Detectados
          </h4>

          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-2xl border-2 ${
                insight.type === 'peak'
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
                  : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl ${
                  insight.type === 'peak'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                }`}>
                  {insight.type === 'peak' ? (
                    <TrendingUp className="w-5 h-5 text-white" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      insight.type === 'peak'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                      {insight.type === 'peak' ? 'Pico' : 'Caída'}
                    </span>
                    <span className="text-sm font-bold text-gray-700">{insight.date}</span>
                    <span className={`text-sm font-bold ${
                      insight.type === 'peak' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      NPS: {insight.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Razón:</span> {insight.reason}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Estadísticas de comparativa */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-blue-500 rounded-lg">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold text-gray-700 uppercase">Mejor Periodo</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">Marzo '24</p>
            <p className="text-xs text-gray-600 mt-1">NPS: 62</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-purple-500 rounded-lg">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-bold text-gray-700 uppercase">Promedio 6 Meses</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">54</p>
            <p className="text-xs text-gray-600 mt-1">Tendencia: +8%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TendenciasSatisfaccion;