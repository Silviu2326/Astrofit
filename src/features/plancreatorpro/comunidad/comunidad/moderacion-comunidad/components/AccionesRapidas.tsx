import React from 'react';

const AccionesRapidas: React.FC = () => {
  const handleQuickAction = (action: string) => {
    alert(`Acción rápida: ${action}`);
    // Lógica para ejecutar la acción rápida
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">Acciones Rápidas</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => handleQuickAction('Bloquear Usuario')}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Bloquear Usuario
        </button>
        <button
          onClick={() => handleQuickAction('Borrar Contenido')}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Borrar Contenido
        </button>
        <button
          onClick={() => handleQuickAction('Marcar Alerta')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Marcar Alerta
        </button>
      </div>
    </div>
  );
};

export default AccionesRapidas;
