import React from 'react';

const EditorEmail: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-96 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Editor de Email (Drag & Drop)</h2>
      <div className="flex-grow border border-gray-300 rounded-md p-4 overflow-auto bg-gray-50">
        {/* Aquí se implementará el editor de email drag & drop */}
        <p className="text-gray-500">Arrastra y suelta bloques aquí para construir tu email.</p>
        {/* Ejemplo de un bloque de texto */}
        <div className="bg-white border border-dashed border-gray-400 p-4 mb-2 rounded-md">
          <p>Este es un bloque de texto de ejemplo.</p>
        </div>
        {/* Ejemplo de un bloque de imagen */}
        <div className="bg-white border border-dashed border-gray-400 p-4 mb-2 rounded-md flex justify-center items-center h-32">
          <p className="text-gray-500">Bloque de Imagen</p>
        </div>
        {/* Ejemplo de un bloque de botón */}
        <div className="bg-white border border-dashed border-gray-400 p-4 mb-2 rounded-md flex justify-center items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Botón de Ejemplo</button>
        </div>
      </div>
    </div>
  );
};

export default EditorEmail;
