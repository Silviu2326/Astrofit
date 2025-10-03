import React from 'react';
import { Search, Eye, AlertTriangle } from 'lucide-react';

const ScoutingEspecifico: React.FC = () => {
  const insights = [
    { tipo: 'Debilidad', descripcion: 'Lateral izquierdo vulnerable en espacios', nivel: 'Alta' },
    { tipo: 'Patrón', descripcion: 'Salida de balón por banda derecha', nivel: 'Media' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl text-white shadow-lg">
          <Search className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-600">
          Scouting Específico
        </h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200 hover:shadow-md transition-all duration-300"
          >
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-sm">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-800">{insight.tipo}</span>
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                  insight.nivel === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {insight.nivel}
                </span>
              </div>
              <p className="text-sm text-gray-600">{insight.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoutingEspecifico;
