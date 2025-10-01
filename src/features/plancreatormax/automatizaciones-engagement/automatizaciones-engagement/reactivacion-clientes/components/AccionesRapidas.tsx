
import React from 'react';

const AccionesRapidas: React.FC = () => {
  const handleSendEmail = (clientId: string) => {
    console.log(`Enviando email a cliente ${clientId}`);
    // Lógica para enviar email
  };

  const handleCallClient = (clientId: string) => {
    console.log(`Llamando a cliente ${clientId}`);
    // Lógica para llamar al cliente
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-medium mb-2">Acciones Rápidas</h3>
      <div className="space-y-2">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleSendEmail('cliente-ejemplo-1')}
        >
          Enviar Email
        </button>
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleCallClient('cliente-ejemplo-1')}
        >
          Llamar
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600">Acciones sugeridas automáticamente para clientes inactivos.</p>
    </div>
  );
};

export default AccionesRapidas;
