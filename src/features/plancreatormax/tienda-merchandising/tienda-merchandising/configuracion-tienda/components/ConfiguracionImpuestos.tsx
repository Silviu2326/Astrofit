import React from 'react';

const ConfiguracionImpuestos: React.FC = () => {
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-3">Configuración de Impuestos</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="regionImpuesto" className="block text-sm font-medium text-gray-700">Región</label>
          <input type="text" id="regionImpuesto" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="España" />
        </div>
        <div className="mb-4">
          <label htmlFor="tasaImpuesto" className="block text-sm font-medium text-gray-700">Tasa (%)</label>
          <input type="number" id="tasaImpuesto" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="21" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Añadir Impuesto</button>
      </form>
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Impuestos Configurados</h3>
        <ul className="border rounded-md p-3">
          <li className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>España (IVA)</span>
            <span>21%</span>
            <button className="text-red-500 hover:text-red-700">Eliminar</button>
          </li>
          {/* Más impuestos */}
        </ul>
      </div>
    </div>
  );
};

export default ConfiguracionImpuestos;
