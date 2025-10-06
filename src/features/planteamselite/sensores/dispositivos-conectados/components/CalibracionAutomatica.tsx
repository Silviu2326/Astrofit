import React from 'react';
import { Crosshair, Zap } from 'lucide-react';

const CalibracionAutomatica: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Icono en container backdrop blur */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-xl">
          <Crosshair className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">Calibración Automática</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Calibración automática para protocolos específicos del dispositivo con ajuste inteligente.
        </p>

        {/* Badge de estado */}
        <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full border border-blue-200 w-fit">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-bold text-blue-700">Auto Config</span>
        </div>
      </div>
    </div>
  );
};

export default CalibracionAutomatica;
