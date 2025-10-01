import React from 'react';

interface PreviewTiempoRealProps {
  appConfig: any;
  onConfigChange: (key: string, value: any) => void;
}

const PreviewTiempoReal: React.FC<PreviewTiempoRealProps> = ({ appConfig, onConfigChange }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Configuración de la App</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="appName" className="block text-sm font-medium text-gray-700">Nombre de la App</label>
          <input
            type="text"
            id="appName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={appConfig.appName}
            onChange={(e) => onConfigChange('appName', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700">Color Primario</label>
          <input
            type="color"
            id="primaryColor"
            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
            value={appConfig.primaryColor}
            onChange={(e) => onConfigChange('primaryColor', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700">Color Secundario</label>
          <input
            type="color"
            id="secondaryColor"
            className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm"
            value={appConfig.secondaryColor}
            onChange={(e) => onConfigChange('secondaryColor', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icono (URL)</label>
          <input
            type="text"
            id="icon"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={appConfig.icon}
            onChange={(e) => onConfigChange('icon', e.target.value)}
          />
        </div>
        {/* Add more configuration options as needed */}
      </div>
    </div>
  );
};

export default PreviewTiempoReal;
