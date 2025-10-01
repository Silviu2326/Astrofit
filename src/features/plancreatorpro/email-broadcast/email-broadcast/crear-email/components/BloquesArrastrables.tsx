import React from 'react';

const BloquesArrastrables: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-96 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Bloques Arrastrables</h2>
      <div className="flex-grow border border-gray-300 rounded-md p-4 overflow-auto bg-gray-50">
        {/* Aquí se implementarán los bloques arrastrables (texto, imagen, botón) */}
        <div className="p-3 mb-3 bg-blue-100 border border-blue-300 rounded-md cursor-grab">
          <p className="font-medium">Bloque de Texto</p>
          <p className="text-sm text-gray-600">Arrastra para añadir texto.</p>
        </div>
        <div className="p-3 mb-3 bg-green-100 border border-green-300 rounded-md cursor-grab">
          <p className="font-medium">Bloque de Imagen</p>
          <p className="text-sm text-gray-600">Arrastra para añadir una imagen.</p>
        </div>
        <div className="p-3 mb-3 bg-purple-100 border border-purple-300 rounded-md cursor-grab">
          <p className="font-medium">Bloque de Botón</p>
          <p className="text-sm text-gray-600">Arrastra para añadir un botón de llamada a la acción.</p>
        </div>
        {/* Más bloques arrastrables aquí */}
      </div>
    </div>
  );
};

export default BloquesArrastrables;
