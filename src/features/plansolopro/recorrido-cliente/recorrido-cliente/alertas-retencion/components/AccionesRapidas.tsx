import React from 'react';
import { sendAccionRapida } from '../alertasRetencionApi';

const AccionesRapidas: React.FC = () => {
  const handleAccion = (clienteId: string, accion: string) => {
    sendAccionRapida(clienteId, accion);
    alert(`Acción '${accion}' ejecutada para el cliente ${clienteId}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Acciones Rápidas</h2>
      <p className="text-gray-600 mb-4">Ejecuta acciones predefinidas para clientes con riesgo.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <button
          onClick={() => handleAccion('cliente-ejemplo-1', 'Enviar mensaje motivacional')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Enviar Mensaje Motivacional
        </button>
        <button
          onClick={() => handleAccion('cliente-ejemplo-2', 'Programar llamada')}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Programar Llamada
        </button>
        <button
          onClick={() => handleAccion('cliente-ejemplo-3', 'Asignar nuevo plan')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Asignar Nuevo Plan
        </button>
        {/* Más botones de acción rápida */}
      </div>
    </div>
  );
};

export default AccionesRapidas;
