import React from 'react';

const ConfiguracionRecordatorios: React.FC = () => {
  // TODO: Implement reminder configuration (time, days of the week)
  // TODO: Use a time picker and checkboxes for days

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Recordatorios</h2>
      <div className="mb-4">
        <label htmlFor="horaRecordatorio" className="block text-gray-700 text-sm font-bold mb-2">
          Hora del Recordatorio
        </label>
        <input
          type="time"
          id="horaRecordatorio"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <span className="block text-gray-700 text-sm font-bold mb-2">Días de la semana</span>
        <div className="flex flex-wrap">
          {[ 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do' ].map((day) => (
            <label key={day} className="inline-flex items-center mr-4 mb-2">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">{day}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionRecordatorios;
