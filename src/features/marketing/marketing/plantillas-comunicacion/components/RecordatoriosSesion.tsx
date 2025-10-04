import React, { useState, useEffect } from 'react';
import { Template, DynamicVariable, getTemplates, getDynamicVariables, ClientType, getClientTypes } from '../plantillasComunicacionApi';

const RecordatoriosSesion: React.FC = () => {
  const [sessionReminders, setSessionReminders] = useState<Template[]>([]);
  const [dynamicVariables, setDynamicVariables] = useState<DynamicVariable[]>([]);
  const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
  const [selectedClientType, setSelectedClientType] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const reminders = await getTemplates();
      setSessionReminders(reminders.filter(t => t.name.includes('Recordatorio')));
      const vars = await getDynamicVariables();
      setDynamicVariables(vars);
      const types = await getClientTypes();
      setClientTypes(types);
    };
    fetchData();
  }, []);

  const handleClientTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = e.target.value;
    setSelectedClientType(typeId);
    const reminders = await getTemplates(typeId);
    setSessionReminders(reminders.filter(t => t.name.includes('Recordatorio')));
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recordatorios de Sesión</h2>
      <p className="text-gray-600 mb-6">Recordatorios de sesión automáticos con detalles del entrenamiento.</p>

      <div className="mb-4">
        <label htmlFor="clientType" className="block text-sm font-medium text-gray-700">Filtrar por Tipo de Cliente:</label>
        <select
          id="clientType"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedClientType}
          onChange={handleClientTypeChange}
        >
          <option value="">Todos</option>
          {clientTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessionReminders.map((reminder) => (
          <div key={reminder.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{reminder.name}</h3>
            <p className="text-sm text-gray-500 mb-2">Tipo: {clientTypes.find(ct => ct.id === reminder.clientTypeId)?.name}</p>
            <p className="text-gray-700 text-sm line-clamp-3">{reminder.content}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {reminder.dynamicVariables.map(varId => {
                const variable = dynamicVariables.find(v => v.id === varId);
                return variable ? (
                  <span key={varId} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {variable.name}
                  </span>
                ) : null;
              })}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button className="px-3 py-1 text-sm font-medium text-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Editar</button>
              <button className="px-3 py-1 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Configurar Nuevo Recordatorio
      </button>
    </div>
  );
};

export default RecordatoriosSesion;
