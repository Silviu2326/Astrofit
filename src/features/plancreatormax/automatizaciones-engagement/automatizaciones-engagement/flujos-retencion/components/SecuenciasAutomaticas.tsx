
import React from 'react';

interface SecuenciasAutomaticasProps {
  onCreateRequest?: () => void;
}

const SecuenciasAutomaticas: React.FC<SecuenciasAutomaticasProps> = ({ onCreateRequest }) => {
  return (
    <div className="border border-gray-200 p-6 rounded-lg bg-white">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Gestión de Secuencias Automáticas</h3>
      <p className="text-gray-600 mb-4">
        Define y gestiona las secuencias de mensajes automáticos para diferentes segmentos de clientes.
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>Secuencia "Te echamos de menos": Descuento de reactivación.</li>
        <li>Secuencia de bienvenida: Serie de emails para nuevos usuarios.</li>
        <li>Secuencia de cumpleaños: Oferta especial en su día.</li>
      </ul>
      {/* Acciones */}
      <button
        onClick={onCreateRequest}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Crear Nueva Secuencia
      </button>
    </div>
  );
};

export default SecuenciasAutomaticas;
