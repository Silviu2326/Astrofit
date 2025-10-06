import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DataPoint {
  fecha: string;
  valor: number;
}

interface GraficoEvolucionProps {
  data: DataPoint[];
  titulo?: string;
  unidad?: string;
}

const GraficoEvolucion: React.FC<GraficoEvolucionProps> = ({
  data,
  titulo = 'Evolución',
  unidad = 'kg'
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">{titulo}</h3>
        <p className="text-gray-500 text-center py-8">No hay datos disponibles</p>
      </div>
    );
  }

  // Calculate statistics
  const valores = data.map(d => d.valor);
  const maxValor = Math.max(...valores);
  const minValor = Math.min(...valores);
  const promedio = valores.reduce((a, b) => a + b, 0) / valores.length;

  // Calculate trend
  const primerValor = valores[0];
  const ultimoValor = valores[valores.length - 1];
  const cambio = ultimoValor - primerValor;
  const porcentajeCambio = primerValor !== 0 ? (cambio / primerValor) * 100 : 0;

  // Normalize data for visualization (0-100 scale)
  const normalize = (value: number) => {
    if (maxValor === minValor) return 50;
    return ((value - minValor) / (maxValor - minValor)) * 100;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{titulo}</h3>
        <div className="flex items-center gap-2">
          {cambio > 0 ? (
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">+{porcentajeCambio.toFixed(1)}%</span>
            </div>
          ) : cambio < 0 ? (
            <div className="flex items-center text-red-600">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">{porcentajeCambio.toFixed(1)}%</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-600">
              <Minus className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">0%</span>
            </div>
          )}
        </div>
      </div>

      {/* Simple line chart */}
      <div className="relative h-48 mb-4">
        <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y * 2}
              x2="800"
              y2={y * 2}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Data line */}
          <polyline
            points={data
              .map((point, index) => {
                const x = (index / (data.length - 1)) * 800;
                const y = 200 - normalize(point.valor) * 2;
                return `${x},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 800;
            const y = 200 - normalize(point.valor) * 2;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="5"
                fill="#3b82f6"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {/* Y-axis labels */}
        <div className="absolute top-0 -left-12 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>{maxValor.toFixed(1)}</span>
          <span>{((maxValor + minValor) / 2).toFixed(1)}</span>
          <span>{minValor.toFixed(1)}</span>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        {data.length > 0 && (
          <>
            <span>{new Date(data[0].fecha).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
            {data.length > 2 && (
              <span>{new Date(data[Math.floor(data.length / 2)].fecha).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
            )}
            <span>{new Date(data[data.length - 1].fecha).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}</span>
          </>
        )}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div>
          <p className="text-xs text-gray-500">Máximo</p>
          <p className="text-lg font-semibold text-gray-900">{maxValor.toFixed(1)} {unidad}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Promedio</p>
          <p className="text-lg font-semibold text-gray-900">{promedio.toFixed(1)} {unidad}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Mínimo</p>
          <p className="text-lg font-semibold text-gray-900">{minValor.toFixed(1)} {unidad}</p>
        </div>
      </div>
    </div>
  );
};

export default GraficoEvolucion;
