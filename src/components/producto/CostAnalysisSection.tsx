import React from 'react';
import { AlertTriangle, DollarSign, TrendingDown, Clock, Users } from 'lucide-react';

interface CostStat {
  label: string;
  cost: string;
  icon: JSX.Element;
  highlight?: boolean;
}

export const CostAnalysisSection: React.FC = () => {
  const costStats: CostStat[] = [
    {
      label: 'Leads perdidos por desorganización',
      cost: '$3-8k/mes',
      icon: <Users className="w-6 h-6 text-red-400" />
    },
    {
      label: 'Morosos que NO cobras',
      cost: '$2-5k/mes',
      icon: <DollarSign className="w-6 h-6 text-red-400" />
    },
    {
      label: 'Tiempo en admin manual',
      cost: '15h/semana = $3k/mes',
      icon: <Clock className="w-6 h-6 text-red-400" />
    },
    {
      label: 'Clientes que cancelan (prevenible)',
      cost: '$2-6k/mes',
      icon: <TrendingDown className="w-6 h-6 text-red-400" />
    },
    {
      label: 'Total SANGRANDO promedio',
      cost: '$10-22k/mes',
      icon: <AlertTriangle className="w-6 h-6 text-yellow-300" />,
      highlight: true
    }
  ];

  return (
    <section className="bg-gradient-to-r from-red-900/40 to-orange-900/40 border-y-2 border-red-600 py-16 px-4 mb-20 animate-pulse">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6 animate-bounce" />
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Estás SANGRANDO dinero
          </h2>
          <p className="text-2xl text-gray-300 font-bold">
            Costos REALES de NO tener sistema (promedio mensual):
          </p>
        </div>

        <div className="bg-black/60 border-2 border-red-600 rounded-2xl p-8">
          <div className="space-y-4">
            {costStats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center p-4 rounded-lg transition-all duration-300 ${
                  stat.highlight
                    ? 'bg-red-600 border-2 border-red-400 hover:scale-105 hover:shadow-2xl shadow-red-500/50'
                    : 'bg-gray-800/50 border border-gray-700 hover:scale-105 hover:bg-gray-700/50'
                }`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  {stat.icon}
                  <span className={`text-lg font-bold ${stat.highlight ? 'text-white' : 'text-gray-300'}`}>
                    {stat.label}
                  </span>
                </div>
                <span className={`text-2xl font-black ${stat.highlight ? 'text-yellow-300' : 'text-red-400'}`}>
                  {stat.cost}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xl text-yellow-300 font-bold mb-6">
              Haz los cálculos. Duele, ¿verdad? Y ni te habías dado cuenta.
            </p>
            <p className="text-2xl text-white font-black mb-8">
              TrainerPro cuesta $29-599/mes.<br />
              Te ahorra $10-22k/mes.<br />
              <span className="text-green-400">ROI: 2000-7500%. Sin bullshit. Matemáticas puras.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
