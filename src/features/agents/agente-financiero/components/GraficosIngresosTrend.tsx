import React, { useEffect, useState } from 'react';

interface RevenueData {
  month: string;
  revenue: number;
  growth: number;
}

const GraficosIngresosTrend: React.FC = () => {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { month: 'Sep', revenue: 12000, growth: 8.5 },
        { month: 'Oct', revenue: 13200, growth: 10.0 },
        { month: 'Nov', revenue: 14100, growth: 6.8 },
        { month: 'Dic', revenue: 15800, growth: 12.1 },
        { month: 'Ene', revenue: 15000, growth: -5.1 },
        { month: 'Feb', revenue: 16200, growth: 8.0 },
      ]);
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const maxRevenue = Math.max(...data.map(d => d.revenue));
  const minRevenue = Math.min(...data.map(d => d.revenue));
  const range = maxRevenue - minRevenue;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Tendencia de Ingresos</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Ingresos</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Crecimiento</span>
          </div>
        </div>
      </div>

      <div className="relative h-64">
        {/* Revenue Chart */}
        <div className="flex items-end justify-between h-48 border-b border-gray-200">
          {data.map((item, index) => {
            const height = range > 0 ? ((item.revenue - minRevenue) / range) * 100 : 50;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="relative group">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md w-8 transition-all duration-300 hover:from-blue-600 hover:to-blue-500 cursor-pointer"
                    style={{ height: `${Math.max(height, 10)}%` }}
                  >
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      {item.revenue.toLocaleString()}€
                      {item.growth !== 0 && (
                        <div className={`text-xs ${item.growth > 0 ? 'text-green-300' : 'text-red-300'}`}>
                          {item.growth > 0 ? '+' : ''}{item.growth}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Growth indicator */}
                <div className="mt-2 flex items-center">
                  {item.growth !== 0 && (
                    <span
                      className={`text-xs px-1 py-0.5 rounded ${
                        item.growth > 0
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {item.growth > 0 ? '↗' : '↘'} {Math.abs(item.growth)}%
                    </span>
                  )}
                </div>

                {/* Month label */}
                <span className="text-xs text-gray-500 mt-1">{item.month}</span>
              </div>
            );
          })}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-500 -ml-12">
          <span>{maxRevenue.toLocaleString()}€</span>
          <span>{((maxRevenue + minRevenue) / 2).toLocaleString()}€</span>
          <span>{minRevenue.toLocaleString()}€</span>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {data[data.length - 1]?.revenue.toLocaleString()}€
          </div>
          <div className="text-xs text-gray-500">Último mes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            +{(data.reduce((acc, item) => acc + Math.max(0, item.growth), 0) / data.filter(item => item.growth > 0).length || 0).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">Crecimiento promedio</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {(data.reduce((acc, item) => acc + item.revenue, 0) / data.length).toLocaleString()}€
          </div>
          <div className="text-xs text-gray-500">Promedio mensual</div>
        </div>
      </div>
    </div>
  );
};

export default GraficosIngresosTrend;