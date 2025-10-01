
import React from 'react';

const ConstructorFlujos: React.FC = () => {
  return (
    <div className="border border-dashed border-gray-400 p-8 rounded-lg text-center bg-gray-50">
      <p className="text-gray-500 text-lg">
        Aquí se implementar�� el constructor visual de flujos estilo flowchart (drag & drop).
      </p>
      <p className="text-gray-400 text-sm mt-2">
        (Ej: Disparador → Acción → Condición → Acción)
      </p>
      {/* Placeholder para la lógica del constructor drag & drop */}
      <div className="mt-4 h-48 bg-white border border-gray-200 rounded-md flex items-center justify-center">
        <span className="text-gray-300">Área de diseño de flujos</span>
      </div>
    </div>
  );
};

export default ConstructorFlujos;
