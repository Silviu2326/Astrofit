import React from 'react';
import { Database, Info } from 'lucide-react';

const IntegracionBaseDatos: React.FC = () => {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 hover:border-cyan-300 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl text-white">
          <Database className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Integración con Bases de Datos</h3>
        <div className="group relative ml-auto">
          <Info className="w-4 h-4 text-cyan-500 cursor-help" />
          <div className="absolute right-0 top-6 hidden group-hover:block w-64 p-3 bg-gray-900 text-white text-xs rounded-xl shadow-xl z-10">
            Accede a bases de datos de métodos de entrenamiento validados científicamente
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">Conecta con métodos de entrenamiento validados</p>
    </div>
  );
};

export default IntegracionBaseDatos;
