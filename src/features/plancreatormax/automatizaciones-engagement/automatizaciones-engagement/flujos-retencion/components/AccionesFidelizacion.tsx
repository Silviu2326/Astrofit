
import React from 'react';

const AccionesFidelizacion: React.FC = () => {
  return (
    <div className="border border-gray-200 p-6 rounded-lg bg-white">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Definición de Acciones de Fidelización</h3>
      <p className="text-gray-600 mb-4">
        Configura las acciones que se ejecutarán como parte de tus flujos de retención.
      </p>
      <div className="space-y-3">
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-600" />
          <span className="ml-2 text-gray-700">Enviar Email</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-600" />
          <span className="ml-2 text-gray-700">Enviar Notificación Push</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-600" />
          <span className="ml-2 text-gray-700">Ofrecer Descuento</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="form-checkbox text-blue-600" />
          <span className="ml-2 text-gray-700">Programar Llamada</span>
        </label>
        {/* Más opciones de acciones */}
      </div>
      <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
        Guardar Acciones
      </button>
    </div>
  );
};

export default AccionesFidelizacion;
