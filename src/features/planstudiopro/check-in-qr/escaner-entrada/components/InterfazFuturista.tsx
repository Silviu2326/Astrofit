
import React from 'react';

const InterfazFuturista: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-900 text-green-400 font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-blue-900 opacity-20 animate-pulse"></div>
      <h3 className="text-xl font-bold mb-4 relative z-10">Interfaz de Esc??ner Futurista</h3>
      <div className="relative z-10 space-y-2">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-green-500 rounded-full animate-ping mr-2"></span>
          <p>Estado del Sistema: <span className="text-green-300">OPERATIVO</span></p>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue-500 rounded-full animate-pulse mr-2"></span>
          <p>Modo: <span className="text-blue-300">ESCANEO ACTIVO</span></p>
        </div>
        <div className="border border-green-600 p-3 mt-4 rounded-md text-center text-lg">
          <p>ACCESO CONCEDIDO</p>
          <p className="text-sm text-green-500">Bienvenido, Usuario 734</p>
        </div>
      </div>
    </div>
  );
};

export default InterfazFuturista;
