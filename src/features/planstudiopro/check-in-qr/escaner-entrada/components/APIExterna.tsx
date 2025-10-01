
import React from 'react';

const APIExterna: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Integraci??n con Sistemas de Terceros (API Externa)</h3>
      <p>Conectividad con bases de datos externas, sistemas de RRHH o plataformas de gesti??n.</p>
      <div className="mt-4 space-y-2">
        <div className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
          <p>Sistema de RRHH</p>
          <span className="px-2 py-1 text-xs rounded-full bg-green-500">Conectado</span>
        </div>
        <div className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
          <p>Base de Datos de Clientes</p>
          <span className="px-2 py-1 text-xs rounded-full bg-green-500">Conectado</span>
        </div>
        <div className="bg-gray-700 p-3 rounded-md flex justify-between items-center">
          <p>Plataforma de Gesti??n</p>
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-500">Sincronizando...</span>
        </div>
      </div>
    </div>
  );
};

export default APIExterna;
