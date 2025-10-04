import React from 'react';

const OpcionesEnvio: React.FC = () => {
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-3">Opciones de Envío</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="metodoEnvio" className="block text-sm font-medium text-gray-700">Método de Envío</label>
          <input type="text" id="metodoEnvio" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Envío Estándar" />
        </div>
        <div className="mb-4">
          <label htmlFor="tarifaEnvio" className="block text-sm font-medium text-gray-700">Tarifa</label>
          <input type="number" id="tarifaEnvio" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="5.00" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Añadir Método</button>
      </form>
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Métodos de Envío Configurados</h3>
        <ul className="border rounded-md p-3">
          <li className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>Envío Estándar</span>
            <span>5.00 EUR</span>
            <button className="text-red-500 hover:text-red-700">Eliminar</button>
          </li>
          {/* Más métodos de envío */}
        </ul>
      </div>
    </div>
  );
};

export default OpcionesEnvio;
