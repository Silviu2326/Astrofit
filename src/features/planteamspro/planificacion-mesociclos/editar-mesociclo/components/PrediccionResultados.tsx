import React from 'react';
import { Target, Info } from 'lucide-react';

const PrediccionResultados: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 hover:border-violet-300 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl text-white">
          <Target className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Predicción de Resultados</h3>
        <div className="group relative ml-auto">
          <Info className="w-4 h-4 text-violet-500 cursor-help" />
          <div className="absolute right-0 top-6 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl z-10">
            Predice los resultados esperados basándose en la planificación actual
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">Estima los resultados esperados de tu planificación</p>
    </div>
  );
};

export default PrediccionResultados;
