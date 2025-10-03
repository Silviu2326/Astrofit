import React from 'react';
import { Activity, Info } from 'lucide-react';

const SimuladorAdaptacion: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 hover:border-purple-300 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
          <Activity className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Simulador de Adaptación</h3>
        <div className="group relative ml-auto">
          <Info className="w-4 h-4 text-purple-500 cursor-help" />
          <div className="absolute right-0 top-6 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl z-10">
            Simula las adaptaciones fisiológicas esperadas durante el mesociclo
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">Simula las adaptaciones fisiológicas esperadas</p>
    </div>
  );
};

export default SimuladorAdaptacion;
