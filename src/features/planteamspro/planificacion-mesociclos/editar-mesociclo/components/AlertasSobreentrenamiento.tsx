import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const AlertasSobreentrenamiento: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 hover:border-orange-300 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl text-white">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Alertas de Sobreentrenamiento</h3>
        <div className="group relative ml-auto">
          <Info className="w-4 h-4 text-orange-500 cursor-help" />
          <div className="absolute right-0 top-6 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl z-10">
            Detecta riesgos de sobreentrenamiento o sub-entrenamiento en tu planificación
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">Sistema de alertas para prevenir sobrecarga o falta de estímulo</p>
    </div>
  );
};

export default AlertasSobreentrenamiento;
