import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

const ValidadorCientifico: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-300 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Validador Científico</h3>
        <div className="group relative ml-auto">
          <Info className="w-4 h-4 text-emerald-500 cursor-help" />
          <div className="absolute right-0 top-6 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl z-10">
            Valida que tu planificación cumpla con principios científicos del entrenamiento
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">Valida tu planificación con principios científicos</p>
    </div>
  );
};

export default ValidadorCientifico;
