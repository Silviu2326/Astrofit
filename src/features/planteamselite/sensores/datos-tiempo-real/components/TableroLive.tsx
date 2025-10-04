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

  const getAlertClass = (value: number, threshold: { min: number; max: number }) => {
    if (value < threshold.min || value > threshold.max) {
      return 'bg-red-100 text-red-800';
    }
    return '';
  };

  return (
    <div className="space-y-4">
      {metrics.map((metric) => (
        <div key={metric.id} className={`p-4 border rounded-lg ${getAlertClass(metric.value, metric.threshold)}`}>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-900">{metric.label}</h3>
            <span className="text-2xl font-bold text-gray-700">{metric.value} {metric.unit}</span>
          </div>
          <div className="h-24">
            <canvas ref={el => (chartRefs.current[metric.id] = el)}></canvas>
          </div>
          {getAlertClass(metric.value, metric.threshold) && (
            <p className="text-sm text-red-600 mt-2">¡Alerta! Valor fuera de rango ({metric.threshold.min}-{metric.threshold.max} {metric.unit})</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TableroLive;
