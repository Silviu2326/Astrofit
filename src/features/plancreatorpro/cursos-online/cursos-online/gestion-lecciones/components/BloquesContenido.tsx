import React from 'react';

const BloquesContenido: React.FC = () => {
  return (
    <div className="border p-4 rounded-md bg-white">
      <h3 className="font-semibold mb-2">Bloques Disponibles</h3>
      <div className="flex flex-wrap gap-2">
        <div className="p-2 border rounded-md bg-blue-100 cursor-grab">Video</div>
        <div className="p-2 border rounded-md bg-green-100 cursor-grab">Texto</div>
        <div className="p-2 border rounded-md bg-yellow-100 cursor-grab">PDF</div>
        <div className="p-2 border rounded-md bg-red-100 cursor-grab">Quiz</div>
      </div>
      {/* TODO: Implementar la funcionalidad de arrastrar estos bloques */}
    </div>
  );
};

export default BloquesContenido;
