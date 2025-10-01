import React from 'react';

interface VistaPreviaProps {
  // TODO: Define props to receive habit data for preview
  habitName?: string;
  frequency?: string;
  reminders?: string[];
}

const VistaPrevia: React.FC<VistaPreviaProps> = ({ habitName, frequency, reminders }) => {
  // TODO: Display a preview of how the habit will look to the client

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Vista Previa del Hábito</h2>
      <div className="border p-4 rounded-md bg-gray-50">
        <p className="text-lg font-bold mb-2">{habitName || 'Nombre del Hábito'}</p>
        <p className="text-gray-600">Frecuencia: {frequency || 'No definida'}</p>
        <p className="text-gray-600">Recordatorios: {reminders && reminders.length > 0 ? reminders.join(', ') : 'No configurados'}</p>
        {/* TODO: Add more detailed preview elements based on habit configuration */}
      </div>
      <p className="text-sm text-gray-500 mt-4">Así es como tu cliente verá este hábito.</p>
    </div>
  );
};

export default VistaPrevia;
