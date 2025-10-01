
import React from 'react';

const DisparadoresInactividad: React.FC = () => {
  return (
    <div className="border border-gray-200 p-6 rounded-lg bg-white">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Configuración de Disparadores por Inactividad</h3>
      <p className="text-gray-600 mb-4">
        Establece las condiciones que activarán los flujos de retención basados en el comportamiento del usuario.
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>30 días sin iniciar sesión: Activar secuencia "Te echamos de menos".</li>
        <li>60 días sin compras: Ofrecer descuento especial.</li>
        <li>90 días sin interacción: Considerar como cliente inactivo profundo.</li>
      </ul>
      {/* Interfaz para añadir/editar disparadores */}
      <div className="mt-4">
        <label htmlFor="inactivityDays" className="block text-sm font-medium text-gray-700">Días de inactividad:</label>
        <input
          type="number"
          id="inactivityDays"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ej: 30"
        />
        <button className="mt-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          Añadir Disparador
        </button>
      </div>
    </div>
  );
};

export default DisparadoresInactividad;
