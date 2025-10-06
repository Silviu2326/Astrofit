import React from 'react';
import { BarChart2, TrendingUp, ExternalLink } from 'lucide-react';

const IntegracionMercados: React.FC = () => {
  const markets = [
    { bookmaker: 'Bet365', odds: 1.85, trend: '+2.7%', color: 'text-green-600' },
    { bookmaker: 'Betfair', odds: 1.88, trend: '+1.5%', color: 'text-green-600' },
    { bookmaker: '1xBet', odds: 1.82, trend: '-1.2%', color: 'text-red-600' },
    { bookmaker: 'William Hill', odds: 1.86, trend: '+0.5%', color: 'text-green-600' }
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <BarChart2 className="w-6 h-6 text-blue-500" />
        Comparación de Mercados
      </h3>

      <p className="text-gray-700 mb-6 leading-relaxed">
        Integración de <span className="font-bold text-blue-600">mercados en tiempo real</span> para encontrar las mejores cuotas.
      </p>

      <div className="space-y-3">
        {markets.map((market, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:border-blue-400 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <ExternalLink className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-800">{market.bookmaker}</p>
                <p className="text-sm text-gray-600">Victoria Local</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{market.odds}</p>
                <p className={`text-xs font-semibold ${market.color}`}>{market.trend}</p>
              </div>
              <div className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-gray-800 mb-1">Mejor Cuota Disponible</p>
            <p className="text-xs text-gray-700">
              <span className="font-bold text-orange-600">Betfair</span> ofrece la mejor cuota de <span className="font-bold">1.88</span> para este mercado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegracionMercados;
