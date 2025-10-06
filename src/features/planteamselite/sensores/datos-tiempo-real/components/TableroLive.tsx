import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  threshold: { min: number; max: number };
}

interface TableroLiveProps {
  metrics: Metric[];
}

const TableroLive: React.FC<TableroLiveProps> = ({ metrics }) => {
  const chartRefs = useRef<{ [key: string]: HTMLCanvasElement | null }>({});
  const chartInstances = useRef<{ [key: string]: Chart | null }>({});

  useEffect(() => {
    metrics.forEach(metric => {
      const ctx = chartRefs.current[metric.id]?.getContext('2d');
      if (ctx) {
        if (chartInstances.current[metric.id]) {
          chartInstances.current[metric.id]?.destroy();
        }

        chartInstances.current[metric.id] = new Chart(ctx, {
          type: 'line',
          data: {
            labels: [], // Time labels will be added dynamically
            datasets: [
              {
                label: metric.label,
                data: [], // Data will be added dynamically
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false,
              },
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
                  text: metric.unit,
                },
              },
            },
            animation: { duration: 0 }, // Disable animation for real-time updates
          },
        });
      }
    });

    return () => {
      Object.values(chartInstances.current).forEach(chart => chart?.destroy());
    };
  }, [metrics]);

  useEffect(() => {
    metrics.forEach(metric => {
      const chart = chartInstances.current[metric.id];
      if (chart) {
        const now = new Date();
        const timeLabel = now.toLocaleTimeString();

        // Add new data point
        chart.data.labels?.push(timeLabel);
        chart.data.datasets[0].data.push(metric.value);

        // Keep only the last 10 data points for better visualization
        const maxDataPoints = 10;
        if (chart.data.labels && chart.data.labels.length > maxDataPoints) {
          chart.data.labels = chart.data.labels.slice(-maxDataPoints);
          chart.data.datasets[0].data = (chart.data.datasets[0].data as number[]).slice(-maxDataPoints);
        }

        chart.update();
      }
    });
  }, [metrics]);

  const getAlertStatus = (value: number, threshold: { min: number; max: number }) => {
    const range = threshold.max - threshold.min;
    const warningMin = threshold.min + range * 0.1;
    const warningMax = threshold.max - range * 0.1;

    if (value < threshold.min || value > threshold.max) {
      return { level: 'critical', bgClass: 'bg-gradient-to-r from-red-50 to-orange-50', borderClass: 'border-red-300', textClass: 'text-red-700', badgeClass: 'bg-red-500' };
    } else if (value < warningMin || value > warningMax) {
      return { level: 'warning', bgClass: 'bg-gradient-to-r from-orange-50 to-yellow-50', borderClass: 'border-orange-300', textClass: 'text-orange-700', badgeClass: 'bg-orange-500' };
    }
    return { level: 'normal', bgClass: 'bg-gradient-to-r from-emerald-50 to-teal-50', borderClass: 'border-emerald-200', textClass: 'text-emerald-700', badgeClass: 'bg-emerald-500' };
  };

  const getProgressCircle = (value: number, threshold: { min: number; max: number }) => {
    const percentage = ((value - threshold.min) / (threshold.max - threshold.min)) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  return (
    <div className="space-y-4">
      {metrics.map((metric) => {
        const alertStatus = getAlertStatus(metric.value, metric.threshold);
        const progress = getProgressCircle(metric.value, metric.threshold);

        return (
          <div key={metric.id} className={`relative overflow-hidden p-4 border-2 ${alertStatus.borderClass} ${alertStatus.bgClass} rounded-2xl transition-all duration-300 group`}>
            {/* Decoración de fondo */}
            <div className={`absolute -right-4 -top-4 w-20 h-20 ${alertStatus.badgeClass} rounded-full blur-2xl opacity-10`}></div>

            {/* Header con métrica y valor */}
            <div className="flex justify-between items-center mb-3 relative z-10">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">{metric.label}</h3>
                {/* Badge de estado */}
                <div className={`px-2 py-1 ${alertStatus.badgeClass} text-white text-xs font-bold rounded-full ${alertStatus.level === 'critical' ? 'animate-pulse' : ''}`}>
                  {alertStatus.level === 'critical' ? 'CRÍTICO' : alertStatus.level === 'warning' ? 'ADVERTENCIA' : 'NORMAL'}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-bold ${alertStatus.textClass}`}>{metric.value} {metric.unit}</span>
                {/* Progress circle indicator */}
                <div className="relative w-12 h-12">
                  <svg className="transform -rotate-90 w-12 h-12">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                      className={`${alertStatus.textClass} transition-all duration-500`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-xs font-bold ${alertStatus.textClass}`}>{Math.round(progress)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico en tiempo real */}
            <div className="h-28 mb-3 bg-white/50 backdrop-blur-sm rounded-xl p-2 relative z-10">
              <canvas ref={el => (chartRefs.current[metric.id] = el)}></canvas>
            </div>

            {/* Alerta crítica con efecto glow */}
            {alertStatus.level === 'critical' && (
              <div className="mt-3 p-3 bg-red-100 border-2 border-red-300 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500 opacity-10 animate-pulse"></div>
                <p className="text-sm text-red-700 font-bold relative z-10 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  ¡Alerta! Valor fuera de rango ({metric.threshold.min}-{metric.threshold.max} {metric.unit})
                </p>
              </div>
            )}

            {/* Stream de datos con animación de actualización */}
            <div className={`mt-2 h-1 ${alertStatus.bgClass} rounded-full overflow-hidden relative`}>
              <div className={`h-full ${alertStatus.badgeClass} rounded-full animate-pulse`} style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableroLive;
