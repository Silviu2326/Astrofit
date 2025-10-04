import React, { useEffect, useState } from 'react';
import { fetchRevenueBySource, RevenueBySource } from '../agenteFinancieroApi';

const DistribucionIngresos: React.FC = () => {
  const [revenueData, setRevenueData] = useState<RevenueBySource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueBySource().then(data => {
      setRevenueData(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const total = revenueData.reduce((acc, item) => acc + item.amount, 0);
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500'
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Distribución de Ingresos</h3>
        <div className="text-sm text-gray-500">
          Total: <span className="font-bold text-gray-800">{total.toLocaleString()}€</span>
        </div>
      </div>

      {/* Horizontal bar chart */}
      <div className="space-y-4 mb-6">
        {revenueData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                <span className="text-sm font-medium text-gray-700">{item.source}</span>
                <span className={`text-xs ${getTrendColor(item.trend)}`}>
                  {getTrendIcon(item.trend)}
                </span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">{item.amount.toLocaleString()}€</div>
                <div className="text-xs text-gray-500">{item.percentage}%</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-700 ease-out ${colors[index % colors.length]}`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Donut chart visualization */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 h-48">
          {/* Donut segments */}
          <svg viewBox="0 0 42 42" className="w-48 h-48 transform -rotate-90">
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#f3f4f6"
              strokeWidth="3"
            />
            {revenueData.map((item, index) => {
              const previousPercentage = revenueData
                .slice(0, index)
                .reduce((acc, prev) => acc + prev.percentage, 0);

              const strokeDasharray = `${item.percentage} ${100 - item.percentage}`;
              const strokeDashoffset = 100 - previousPercentage;
              const colorClass = colors[index % colors.length].replace('bg-', '');

              const strokeColor = {
                'blue-500': '#3b82f6',
                'green-500': '#10b981',
                'purple-500': '#8b5cf6',
                'orange-500': '#f59e0b',
                'pink-500': '#ec4899',
                'indigo-500': '#6366f1'
              }[colorClass] || '#3b82f6';

              return (
                <circle
                  key={index}
                  cx="21"
                  cy="21"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke={strokeColor}
                  strokeWidth="3"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-700 ease-out"
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{total.toLocaleString()}€</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis section */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700 text-sm">💰 Fuente Principal</h4>
          <div className="text-sm">
            <div className="font-medium text-gray-900">{revenueData[0]?.source}</div>
            <div className="text-gray-600">
              {revenueData[0]?.amount.toLocaleString()}€ ({revenueData[0]?.percentage}%)
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700 text-sm">📊 Diversificación</h4>
          <div className="text-sm">
            {revenueData[0]?.percentage > 70 ? (
              <div className="text-orange-600">⚠️ Alta concentración</div>
            ) : revenueData[0]?.percentage > 50 ? (
              <div className="text-yellow-600">✓ Concentración moderada</div>
            ) : (
              <div className="text-green-600">✅ Bien diversificado</div>
            )}
            <div className="text-gray-600 text-xs">
              {revenueData.length} fuentes activas
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 text-sm mb-2">💡 Recomendaciones</h4>
        <div className="space-y-1 text-xs text-blue-700">
          {revenueData[0]?.percentage > 60 && (
            <p>• Considera diversificar para reducir dependencia de {revenueData[0].source}</p>
          )}
          {revenueData.some(item => item.trend === 'down') && (
            <p>• Analiza las fuentes con tendencia negativa para planes de mejora</p>
          )}
          {revenueData.some(item => item.trend === 'up') && (
            <p>• Potencia las fuentes con crecimiento positivo</p>
          )}
          <p>• Revisa precios de servicios con menor margen de contribución</p>
        </div>
      </div>
    </div>
  );
};

export default DistribucionIngresos;