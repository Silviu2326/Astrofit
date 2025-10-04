
import React from 'react';

export const AccionesRapidas: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Acciones R??pidas</h2>
      <div className="flex flex-wrap gap-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Pagar Comisiones
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Suspender Afiliado
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Contactar Afiliado
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Generar Reporte
        </button>
      </div>
    </div>
  );
};
