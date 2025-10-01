import React, { useEffect, useState } from 'react';
import { fetchCashFlow, CashFlowItem } from '../agenteFinancieroApi';

interface CashFlowProjection {
  month: string;
  income: number;
  expenses: number;
  netFlow: number;
  cumulativeBalance: number;
  confidence: number;
}

const FlujoCajaProjection: React.FC = () => {
  const [cashFlowData, setCashFlowData] = useState<CashFlowItem[]>([]);
  const [projections, setProjections] = useState<CashFlowProjection[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'3m' | '6m' | '12m'>('6m');

  useEffect(() => {
    fetchCashFlow().then(data => {
      setCashFlowData(data);
      generateProjections(data, timeframe);
      setLoading(false);
    });
  }, [timeframe]);

  const generateProjections = (data: CashFlowItem[], months: '3m' | '6m' | '12m') => {
    const monthCount = months === '3m' ? 3 : months === '6m' ? 6 : 12;
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    let currentBalance = 15000; // Saldo inicial
    const projectedData: CashFlowProjection[] = [];

    for (let i = 0; i < monthCount; i++) {
      const monthIndex = (new Date().getMonth() + i) % 12;
      const baseIncome = 15000 + (Math.random() * 2000 - 1000); // Variación ±1000
      const baseExpenses = 8000 + (Math.random() * 1000 - 500); // Variación ±500
      const growthFactor = 1 + (i * 0.02); // 2% crecimiento mensual

      const income = Math.round(baseIncome * growthFactor);
      const expenses = Math.round(baseExpenses * (1 + i * 0.01)); // 1% incremento gastos
      const netFlow = income - expenses;
      currentBalance += netFlow;

      // Confianza decrece con el tiempo
      const confidence = Math.max(95 - (i * 8), 40);

      projectedData.push({
        month: monthNames[monthIndex],
        income,
        expenses,
        netFlow,
        cumulativeBalance: currentBalance,
        confidence: Math.round(confidence)
      });
    }

    setProjections(projectedData);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const maxBalance = Math.max(...projections.map(p => p.cumulativeBalance));
  const minBalance = Math.min(...projections.map(p => p.cumulativeBalance));
  const range = maxBalance - minBalance;

  const getFlowColor = (netFlow: number) => {
    if (netFlow > 0) return 'text-green-600';
    if (netFlow < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-100 text-green-700';
    if (confidence >= 60) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Proyección de Flujo de Caja</h3>
        <div className="flex space-x-2">
          {(['3m', '6m', '12m'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeframe === period
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Balance Chart */}
      <div className="relative h-48 mb-6">
        <div className="flex items-end justify-between h-40 border-b border-gray-200">
          {projections.map((item, index) => {
            const height = range > 0 ? ((item.cumulativeBalance - minBalance) / range) * 100 : 50;
            const isNegative = item.cumulativeBalance < 0;

            return (
              <div key={index} className="flex flex-col items-center flex-1 relative group">
                <div className="relative">
                  <div
                    className={`rounded-t-md w-6 transition-all duration-300 ${
                      isNegative ? 'bg-gradient-to-t from-red-500 to-red-400' : 'bg-gradient-to-t from-green-500 to-green-400'
                    } hover:opacity-80 cursor-pointer`}
                    style={{ height: `${Math.max(height, 5)}%` }}
                  ></div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      <div>Balance: {item.cumulativeBalance.toLocaleString()}€</div>
                      <div className={getFlowColor(item.netFlow)}>
                        Flujo: {item.netFlow > 0 ? '+' : ''}{item.netFlow.toLocaleString()}€
                      </div>
                      <div className="text-gray-300">Confianza: {item.confidence}%</div>
                    </div>
                  </div>
                </div>

                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
              </div>
            );
          })}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-40 flex flex-col justify-between text-xs text-gray-500 -ml-16">
          <span>{maxBalance.toLocaleString()}€</span>
          <span>{((maxBalance + minBalance) / 2).toLocaleString()}€</span>
          <span>{minBalance.toLocaleString()}€</span>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-600">Mes</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Ingresos</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Gastos</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Flujo Neto</th>
              <th className="text-right py-3 px-2 font-medium text-gray-600">Balance</th>
              <th className="text-center py-3 px-2 font-medium text-gray-600">Confianza</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projections.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-2 font-medium">{item.month}</td>
                <td className="py-3 px-2 text-right text-green-600 font-medium">
                  +{item.income.toLocaleString()}€
                </td>
                <td className="py-3 px-2 text-right text-red-600 font-medium">
                  -{item.expenses.toLocaleString()}€
                </td>
                <td className={`py-3 px-2 text-right font-bold ${getFlowColor(item.netFlow)}`}>
                  {item.netFlow > 0 ? '+' : ''}{item.netFlow.toLocaleString()}€
                </td>
                <td className={`py-3 px-2 text-right font-bold ${
                  item.cumulativeBalance < 0 ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {item.cumulativeBalance.toLocaleString()}€
                </td>
                <td className="py-3 px-2 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(item.confidence)}`}>
                    {item.confidence}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {projections[projections.length - 1]?.cumulativeBalance.toLocaleString()}€
          </div>
          <div className="text-xs text-gray-500">Balance final proyectado</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            +{projections.reduce((acc, item) => acc + Math.max(0, item.netFlow), 0).toLocaleString()}€
          </div>
          <div className="text-xs text-gray-500">Flujos positivos totales</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {projections.filter(item => item.cumulativeBalance < 5000).length}
          </div>
          <div className="text-xs text-gray-500">Meses con riesgo de liquidez</div>
        </div>
      </div>

      {/* Warnings */}
      {projections.some(item => item.cumulativeBalance < 0) && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="flex items-start space-x-2">
            <span className="text-red-500 text-lg">⚠️</span>
            <div>
              <div className="font-semibold text-red-800 text-sm">Alerta de Liquidez</div>
              <div className="text-red-700 text-xs">
                Se proyecta balance negativo en los próximos meses. Considere medidas correctivas inmediatas.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlujoCajaProjection;