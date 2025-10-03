import React from 'react';
import { Wrench, CheckCircle } from 'lucide-react';

const TroubleshootingAutomatico: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-cyan-200 to-teal-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        {/* Icono en container backdrop blur */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white mb-4 shadow-xl">
          <Wrench className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2">Troubleshooting Auto</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Diagnósticos remotos y solución de problemas automática con IA.
        </p>

        {/* Badge de estado */}
        <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-cyan-50 rounded-full border border-cyan-200 w-fit">
          <CheckCircle className="w-4 h-4 text-cyan-600" />
          <span className="text-xs font-bold text-cyan-700">Diagnóstico IA</span>
        </div>
      </div>
    </div>
  );
};

export default TroubleshootingAutomatico;
