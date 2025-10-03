import React from 'react';
import { Zap, TrendingUp, Activity, Percent } from 'lucide-react';

const SimuladorEncuentro: React.FC = () => {
  const escenarios = [
    { resultado: 'Victoria Equipo A', probabilidad: 45, color: 'from-red-500 to-pink-600' },
    { resultado: 'Empate', probabilidad: 30, color: 'from-gray-500 to-gray-600' },
    { resultado: 'Victoria Equipo B', probabilidad: 25, color: 'from-blue-500 to-indigo-600' },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl text-white shadow-lg">
          <Zap className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
          Simulador de Encuentro
        </h3>
      </div>

      <div className="space-y-4">
        {escenarios.map((escenario, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                {escenario.resultado}
              </span>
              <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-200">
                <Percent className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-blue-700">{escenario.probabilidad}%</span>
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className={`h-full bg-gradient-to-r ${escenario.color} rounded-full flex items-center justify-end pr-2 transition-all duration-1000`}
                style={{ width: `${escenario.probabilidad}%` }}
              >
                <span className="text-xs font-bold text-white">{escenario.probabilidad}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            <span className="font-bold text-cyan-700">Predicción IA:</span> Simulación basada en estadísticas históricas, forma actual y condiciones del encuentro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimuladorEncuentro;
