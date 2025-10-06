import React, { useState } from 'react';
import EditorSplash from './EditorSplash';
import EditorIcono from './EditorIcono';

const ConfiguradorApp: React.FC = () => {
  const [appName, setAppName] = useState('Mi App Personalizada');
  const [primaryColor, setPrimaryColor] = useState('#3B82F6');
  const [welcomeMessage, setWelcomeMessage] = useState('¡Bienvenido a nuestra app!');

  const handleSave = () => {
    console.log('Saving configuration:', { appName, primaryColor, welcomeMessage });
    // Here you would typically call an API to save the configuration
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Configuración de la App</h2>
      <div className="mb-4">
        <label htmlFor="appName" className="block text-sm font-medium text-gray-700">Nombre de la App</label>
        <input
          type="text"
          id="appName"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">Color Principal</label>
        <input
          type="color"
          id="primaryColor"
          className="mt-1 block w-full h-10 rounded-md shadow-sm"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="welcomeMessage" className="block text-sm font-medium text-gray-700">Mensaje de Bienvenida</label>
        <textarea
          id="welcomeMessage"
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
        ></textarea>
      </div>
      <EditorSplash />
      <EditorIcono />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Guardar Configuración
      </button>
    </div>
  );
};

export default ConfiguradorApp;
