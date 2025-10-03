import React from 'react';

const ConfiguracionAppPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Configuración de la Aplicación</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Componentes de configuración */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-2">Personalización Visual</h2>
          {/* Aquí se integrarían los componentes de EditorVisualApp, UploaderLogo, SelectorColoresApp, etc. */}
        </div>
        <div className="md:col-span-1 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Vista Previa en Vivo</h2>
          {/* Aquí se renderizaría el live preview del móvil */}
          <div className="w-full h-96 bg-white border border-gray-300 flex items-center justify-center text-gray-500">
            Vista previa del móvil
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Exportar Configuración
        </button>
      </div>
    </div>
  );
};

export default ConfiguracionAppPage;
