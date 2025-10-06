import React from 'react';
import { Lightbulb, Info } from 'lucide-react';

const RecomendacionesDeporte: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 hover:border-amber-300 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl text-white">
          <Lightbulb className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Recomendaciones por Deporte</h3>
        <div className="group relative ml-auto">
          <Info className="w-4 h-4 text-amber-500 cursor-help" />
          <div className="absolute right-0 top-6 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl z-10">
            Recibe sugerencias específicas según el deporte seleccionado
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">Sugerencias automáticas basadas en tu deporte</p>
    </div>
  );
};

export default RecomendacionesDeporte;
