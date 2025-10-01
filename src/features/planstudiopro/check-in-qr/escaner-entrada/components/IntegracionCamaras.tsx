
import React from 'react';

const IntegracionCamaras: React.FC = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-gray-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Integraci??n de C??maras de Seguridad</h3>
      <p>Monitoreo visual en tiempo real y grabaci??n de eventos.</p>
      {/* Aqu?? ir??a la l??gica de integraci??n con feeds de c??maras */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="h-32 bg-gray-700 flex items-center justify-center rounded-md">
          <p className="text-gray-400">C??mara 1</p>
        </div>
        <div className="h-32 bg-gray-700 flex items-center justify-center rounded-md">
          <p className="text-gray-400">C??mara 2</p>
        </div>
      </div>
    </div>
  );
};

export default IntegracionCamaras;
