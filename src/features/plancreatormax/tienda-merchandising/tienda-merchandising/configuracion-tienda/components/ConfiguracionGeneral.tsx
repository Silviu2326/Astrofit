import React from 'react';

const ConfiguracionGeneral: React.FC = () => {
  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-semibold mb-3">Configuración General</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="nombreTienda" className="block text-sm font-medium text-gray-700">Nombre de la Tienda</label>
          <input type="text" id="nombreTienda" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Mi Tienda Online" />
        </div>
        <div className="mb-4">
          <label htmlFor="divisa" className="block text-sm font-medium text-gray-700">Divisa</label>
          <select id="divisa" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option>EUR</option>
            <option>USD</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="idioma" className="block text-sm font-medium text-gray-700">Idioma</label>
          <select id="idioma" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option>Español</option>
            <option>Inglés</option>
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ConfiguracionGeneral;
