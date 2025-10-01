
import React from 'react';
import { CohorteData } from '../cohortesClientesApi';

interface GraficoRetencionProps {
  data: CohorteData[];
}

const colors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
  '#FFCD56', '#C9CBCF', '#7CFC00', '#ADD8E6', '#F08080', '#20B2AA',
];

const GraficoRetencion: React.FC<GraficoRetencionProps> = ({ data }) => {
  const maxRetention = 100;
  const periods = Array.from({ length: data[0]?.retention.length || 0 }, (_, i) => i + 1);

  if (!data.length || !data[0].retention.length) {
    return <p className="text-gray-500">No hay datos de cohortes para mostrar el gráfico.</p>;
  }

  return (
    <div className="relative w-full h-80 p-4">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* X-axis (Periods) */}
        <line x1="0" y1="100" x2="100" y2="100" stroke="#e0e0e0" strokeWidth="0.5" />
        {/* Y-axis (Retention %) */}
        <line x1="0" y1="0" x2="0" y2="100" stroke="#e0e0e0" strokeWidth="0.5" />

        {/* Y-axis labels */}
        {[0, 25, 50, 75, 100].map((label) => (
          <text
            key={label}
            x="-2"
            y={100 - label}
            fontSize="3"
            fill="#6b7280"
            textAnchor="end"
            alignmentBaseline="middle"
          >
            {label}%
          </text>
        ))}

        {/* X-axis labels (simplified for periods) */}
        {periods.map((period, index) => (
          <text
            key={period}
            x={(index / (periods.length - 1)) * 100}
            y="103"
            fontSize="3"
            fill="#6b7280"
            textAnchor="middle"
          >
            M{period}
          </text>
        ))}

        {data.map((cohorte, cohorteIndex) => {
          const points = cohorte.retention.map((retencion, index) => {
            const x = (index / (periods.length - 1)) * 100;
            const y = 100 - (retencion / maxRetention) * 100;
            return `${x},${y}`;
          }).join(' ');

          return (
            <polyline
              key={cohorte.name}
              points={points}
              fill="none"
              stroke={colors[cohorteIndex % colors.length]}
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 mt-2">
        {data.map((cohorte, cohorteIndex) => (
          <div key={cohorte.name} className="flex items-center">
            <span
              className="inline-block w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: colors[cohorteIndex % colors.length] }}
            ></span>
            <span className="text-sm text-gray-700">{cohorte.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraficoRetencion;
