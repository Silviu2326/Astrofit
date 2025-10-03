import React from 'react';
import { TrendingUp, Info } from 'lucide-react';

const AnalisisProgresion: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 hover:border-green-300 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl text-white">
          <TrendingUp className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Análisis de Progresión</h3>
        <div className="group relative ml-auto">
          <Info className="w-4 h-4 text-green-500 cursor-help" />
          <div className="absolute right-0 top-6 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl z-10">
            Analiza la progresión óptima de cargas a lo largo del mesociclo
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">Optimiza la progresión de cargas del mesociclo</p>
    </div>
  );
};

export default AnalisisProgresion;
