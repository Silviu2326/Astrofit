import React from 'react';

export const AccionesRapidas: React.FC = () => {
  const handleQuickAction = (action: string) => {
    alert(`Acción Rápida: ${action}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleQuickAction('Generar Informe Semanal')}
        className="bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 transition duration-300 text-sm"
      >
        Generar Informe Semanal
      </button>
      <button
        onClick={() => handleQuickAction('Ajustar Plan de Dieta')}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-yellow-600 transition duration-300 text-sm"
      >
        Ajustar Plan de Dieta
      </button>
      <button
        onClick={() => handleQuickAction('Modificar Rutina de Entrenamiento')}
        className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-purple-600 transition duration-300 text-sm"
      >
        Modificar Rutina de Entrenamiento
      </button>
      <button
        onClick={() => handleQuickAction('Enviar Notificación al Cliente')}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-600 transition duration-300 text-sm"
      >
        Enviar Notificación al Cliente
      </button>
    </div>
  );
};
