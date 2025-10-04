import React, { useEffect, useState } from 'react';
import { fetchClientProfitability, ClientProfitability } from '../agenteFinancieroApi';

const ClientesRentabilidad: React.FC = () => {
  const [clients, setClients] = useState<ClientProfitability[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'profit' | 'margin' | 'ltv' | 'risk'>('profit');
  const [filterTier, setFilterTier] = useState<'all' | 'premium' | 'standard' | 'basic'>('all');

  useEffect(() => {
    fetchClientProfitability().then(data => {
      setClients(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'premium': return { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' };
      case 'standard': return { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' };
      case 'basic': return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore <= 3) return 'text-green-600';
    if (riskScore <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskIcon = (riskScore: number) => {
    if (riskScore <= 3) return '🟢';
    if (riskScore <= 6) return '🟡';
    return '🔴';
  };

  const sortedClients = [...clients].sort((a, b) => {
    switch (sortBy) {
      case 'profit':
        return b.profit - a.profit;
      case 'margin':
        return b.margin - a.margin;
      case 'ltv':
        return b.ltv - a.ltv;
      case 'risk':
        return a.riskScore - b.riskScore;
      default:
        return 0;
    }
  });

  const filteredClients = sortedClients.filter(client => {
    if (filterTier === 'all') return true;
    return client.tier === filterTier;
  });

  const totalRevenue = clients.reduce((acc, client) => acc + client.revenue, 0);
  const totalProfit = clients.reduce((acc, client) => acc + client.profit, 0);
  const averageMargin = clients.reduce((acc, client) => acc + client.margin, 0) / clients.length;
  const highRiskClients = clients.filter(client => client.riskScore > 6).length;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Rentabilidad por Cliente</h3>
        <div className="flex space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="profit">Ordenar por Beneficio</option>
            <option value="margin">Ordenar por Margen</option>
            <option value="ltv">Ordenar por LTV</option>
            <option value="risk">Ordenar por Riesgo</option>
          </select>
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            <option value="all">Todos los Niveles</option>
            <option value="premium">Premium</option>
            <option value="standard">Standard</option>
            <option value="basic">Básico</option>
          </select>
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
          <div className="text-sm text-green-600 font-medium">Ingresos Totales</div>
          <div className="text-2xl font-bold text-green-700">{totalRevenue.toLocaleString()}€</div>
          <div className="text-xs text-green-600">Mensual</div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">Beneficio Total</div>
          <div className="text-2xl font-bold text-blue-700">{totalProfit.toLocaleString()}€</div>
          <div className="text-xs text-blue-600">Mensual</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="text-sm text-purple-600 font-medium">Margen Promedio</div>
          <div className="text-2xl font-bold text-purple-700">{averageMargin.toFixed(1)}%</div>
          <div className="text-xs text-purple-600">Todos los clientes</div>
        </div>
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-lg">
          <div className="text-sm text-red-600 font-medium">Alto Riesgo</div>
          <div className="text-2xl font-bold text-red-700">{highRiskClients}</div>
          <div className="text-xs text-red-600">Clientes críticos</div>
        </div>
      </div>

      {/* Profitability chart */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-4">Distribución de Beneficios</h4>
        <div className="relative h-48">
          <div className="flex items-end justify-between h-40 border-b border-gray-200">
            {filteredClients.slice(0, 8).map((client, index) => {
              const maxProfit = Math.max(...filteredClients.map(c => c.profit));
              const height = (client.profit / maxProfit) * 80 + 10;
              const tierColors = getTierColor(client.tier);

              return (
                <div key={index} className="flex flex-col items-center flex-1 relative group">
                  <div className="relative">
                    <div
                      className={`rounded-t-md w-8 transition-all duration-300 cursor-pointer ${
                        client.tier === 'premium' ? 'bg-gradient-to-t from-purple-500 to-purple-400' :
                        client.tier === 'standard' ? 'bg-gradient-to-t from-blue-500 to-blue-400' :
                        'bg-gradient-to-t from-gray-500 to-gray-400'
                      } hover:opacity-80`}
                      style={{ height: `${height}%` }}
                    ></div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        <div className="font-medium">{client.name}</div>
                        <div>Beneficio: {client.profit}€</div>
                        <div>Margen: {client.margin}%</div>
                        <div>LTV: {client.ltv.toLocaleString()}€</div>
                        <div>Riesgo: {client.riskScore}/10</div>
                      </div>
                    </div>
                  </div>

                  <span className="text-xs text-gray-500 mt-2 text-center max-w-16 truncate">
                    {client.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Client details table */}
      <div className="space-y-3">
        {filteredClients.map((client) => {
          const tierColors = getTierColor(client.tier);
          const clientAge = Math.floor((new Date().getTime() - new Date(client.acquisitionDate).getTime()) / (1000 * 60 * 60 * 24 * 30));

          return (
            <div key={client.clientId} className={`border rounded-lg p-4 ${tierColors.border} ${tierColors.bg}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-lg">
                    {getRiskIcon(client.riskScore)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 flex items-center space-x-2">
                      <span>{client.name}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${tierColors.bg} ${tierColors.text}`}>
                        {client.tier.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Cliente desde: {new Date(client.acquisitionDate).toLocaleDateString()} ({clientAge} meses)
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">{client.profit}€</div>
                  <div className="text-sm text-gray-600">Beneficio mensual</div>
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="font-bold text-green-600">{client.revenue}€</div>
                  <div className="text-xs text-gray-500">Ingresos</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-red-600">{client.costs}€</div>
                  <div className="text-xs text-gray-500">Costos</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold ${client.margin >= 60 ? 'text-green-600' : client.margin >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {client.margin}%
                  </div>
                  <div className="text-xs text-gray-500">Margen</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{client.ltv.toLocaleString()}€</div>
                  <div className="text-xs text-gray-500">LTV</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold ${getRiskColor(client.riskScore)}`}>
                    {client.riskScore}/10
                  </div>
                  <div className="text-xs text-gray-500">Riesgo</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-600">
                    {(client.ltv / (client.revenue * clientAge || 1)).toFixed(1)}x
                  </div>
                  <div className="text-xs text-gray-500">ROI</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  {client.riskScore > 6 && (
                    <span className="text-red-600 font-medium">⚠️ Requiere atención</span>
                  )}
                  {client.margin > 70 && (
                    <span className="text-green-600 font-medium">⭐ Cliente estrella</span>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors">
                    📊 Ver Historial
                  </button>
                  {client.riskScore > 6 && (
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200 transition-colors">
                      🚨 Plan Retención
                    </button>
                  )}
                  {client.tier !== 'premium' && client.margin > 50 && (
                    <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md text-sm font-medium hover:bg-purple-200 transition-colors">
                      ⬆️ Proponer Upgrade
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analysis insights */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-3">📈 Insights de Rentabilidad</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-medium text-gray-700">Top Performers:</div>
            <ul className="space-y-1">
              {clients
                .sort((a, b) => b.profit - a.profit)
                .slice(0, 2)
                .map(client => (
                  <li key={client.clientId} className="text-green-600">
                    • {client.name}: {client.profit}€/mes
                  </li>
                ))}
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-700">Oportunidades:</div>
            <ul className="space-y-1 text-blue-600">
              <li>• {clients.filter(c => c.tier === 'basic' && c.margin > 50).length} clientes básicos con potencial upgrade</li>
              <li>• Margen promedio del {averageMargin.toFixed(1)}% supera objetivo (60%)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-700">Riesgos:</div>
            <ul className="space-y-1 text-red-600">
              <li>• {highRiskClients} clientes en riesgo de cancelación</li>
              <li>• {clients.filter(c => c.margin < 40).length} clientes con margen bajo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientesRentabilidad;