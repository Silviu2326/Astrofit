import React from 'react';

const IntegracionesTransporte: React.FC = () => {
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-3">Integraciones con Transportistas</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="transportista" className="block text-sm font-medium text-gray-700">Transportista</label>
          <select id="transportista" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option>Correos</option>
            <option>DHL</option>
            <option>FedEx</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">API Key</label>
          <input type="text" id="apiKey" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Introduce la API Key" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Guardar Integración</button>
      </form>
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Transportistas Integrados</h3>
        <ul className="border rounded-md p-3">
          <li className="flex justify-between items-center py-2 border-b last:border-b-0">
            <span>Correos</span>
            <button className="text-red-500 hover:text-red-700">Desconectar</button>
          </li>
          {/* Más integraciones */}
        </ul>
      </div>
    </div>
  );
};

export default IntegracionesTransporte;
