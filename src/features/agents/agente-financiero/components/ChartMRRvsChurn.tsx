import React, { useEffect, useState } from 'react';

interface MRRChurnData {
  month: string;
  mrr: number;
  churnRate: number;
  newCustomers: number;
  lostCustomers: number;
}

const ChartMRRvsChurn: React.FC = () => {
  const [data, setData] = useState<MRRChurnData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([
        { month: 'Sep', mrr: 11000, churnRate: 6.2, newCustomers: 8, lostCustomers: 3 },
        { month: 'Oct', mrr: 11800, churnRate: 4.8, newCustomers: 12, lostCustomers: 2 },
        { month: 'Nov', mrr: 12200, churnRate: 5.5, newCustomers: 10, lostCustomers: 3 },
        { month: 'Dic', mrr: 12800, churnRate: 3.2, newCustomers: 15, lostCustomers: 2 },
        { month: 'Ene', mrr: 12500, churnRate: 5.2, newCustomers: 8, lostCustomers: 4 },
        { month: 'Feb', mrr: 13200, churnRate: 4.1, newCustomers: 14, lostCustomers: 2 },
      ]);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const maxMRR = Math.max(...data.map(d => d.mrr));
  const minMRR = Math.min(...data.map(d => d.mrr));
  const maxChurn = Math.max(...data.map(d => d.churnRate));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">MRR vs Tasa de Cancelación</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">MRR</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Churn Rate</span>
          </div>
        </div>
      </div>

      <div className="relative h-64">
        {/* Chart container */}
        <div className="flex items-end justify-between h-48 border-b border-gray-200">
          {data.map((item, index) => {
            const mrrHeight = ((item.mrr - minMRR) / (maxMRR - minMRR)) * 80 + 10;
            const churnHeight = (item.churnRate / maxChurn) * 80 + 10;

            return (
              <div key={index} className="flex flex-col items-center flex-1 relative">
                <div className="flex items-end justify-center space-x-1 h-48">
                  {/* MRR Bar */}
                  <div className="relative group">
                    <div
                      className="bg-gradient-to-t from-green-500 to-green-400 rounded-t-md w-6 transition-all duration-300 hover:from-green-600 hover:to-green-500"
                      style={{ height: `${mrrHeight}%` }}
                    ></div>

                    {/* MRR Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-green-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        MRR: {item.mrr.toLocaleString()}€
                        <div className="text-green-200 text-xs">
                          +{item.newCustomers} / -{item.lostCustomers} clientes
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Churn Rate Bar */}
                  <div className="relative group">
                    <div
                      className="bg-gradient-to-t from-red-500 to-red-400 rounded-t-md w-6 transition-all duration-300 hover:from-red-600 hover:to-red-500"
                      style={{ height: `${churnHeight}%` }}
                    ></div>

                    {/* Churn Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-red-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        Churn: {item.churnRate}%
                        <div className="text-red-200 text-xs">
                          {item.lostCustomers} cancelaciones
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Month label */}
                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
              </div>
            );
          })}
        </div>

        {/* Y-axis labels for MRR */}
        <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-green-600 -ml-16">
          <span>{maxMRR.toLocaleString()}€</span>
          <span>{((maxMRR + minMRR) / 2).toLocaleString()}€</span>
          <span>{minMRR.toLocaleString()}€</span>
        </div>

        {/* Y-axis labels for Churn */}
        <div className="absolute right-0 top-0 h-48 flex flex-col justify-between text-xs text-red-600 -mr-12">
          <span>{maxChurn.toFixed(1)}%</span>
          <span>{(maxChurn / 2).toFixed(1)}%</span>
          <span>0%</span>
        </div>
      </div>

      {/* Analysis insights */}
      <div className="grid grid-cols-2 gap-6 mt-6 pt-4 border-t border-gray-100">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 text-sm">📈 Crecimiento MRR</h4>
          <div className="space-y-2">
            {data.slice(-3).map((item, index) => {
              const prevItem = data[data.indexOf(item) - 1];
              const growth = prevItem ? ((item.mrr - prevItem.mrr) / prevItem.mrr) * 100 : 0;
              return (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.month}:</span>
                  <span className={`font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700 text-sm">⚠️ Riesgo Churn</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Promedio:</span>
              <span className="font-medium text-orange-600">
                {(data.reduce((acc, item) => acc + item.churnRate, 0) / data.length).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Mejor mes:</span>
              <span className="font-medium text-green-600">
                {Math.min(...data.map(d => d.churnRate)).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tendencia:</span>
              <span className={`font-medium ${
                data[data.length - 1].churnRate < data[data.length - 2].churnRate
                  ? 'text-green-600' : 'text-red-600'
              }`}>
                {data[data.length - 1].churnRate < data[data.length - 2].churnRate ? '↓ Mejorando' : '↑ Atención'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Health indicator */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Salud MRR/Churn:</span>
          <div className="flex items-center">
            {data[data.length - 1].churnRate < 5 ? (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                ✅ Excelente
              </span>
            ) : data[data.length - 1].churnRate < 8 ? (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                ⚠️ Bueno
              </span>
            ) : (
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                🚨 Crítico
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartMRRvsChurn;