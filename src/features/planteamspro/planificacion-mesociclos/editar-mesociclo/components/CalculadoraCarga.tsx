import React from 'react';
import { Calculator, Info } from 'lucide-react';

const CalculadoraCarga: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-300 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
          <Calculator className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Calculadora de Carga</h3>
        <div className="group relative ml-auto">
          <Info className="w-4 h-4 text-blue-500 cursor-help" />
          <div className="absolute right-0 top-6 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl z-10">
            Calcula la carga de entrenamiento basada en volumen e intensidad
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">Herramienta para calcular la carga de entrenamiento óptima</p>
    </div>
  );
};

export default CalculadoraCarga;
