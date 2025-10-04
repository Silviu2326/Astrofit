
import React from 'react';

const CondicionesLogicas: React.FC = () => {
  return (
    <div className="border p-4 rounded-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Condiciones Lógicas</h2>
      <p>Este componente permitirá construir la lógica visual de las condiciones (ej. AND, OR, NOT).</p>
      <div className="mt-4">
        {/* Representación visual de las condiciones lógicas */}
        <div className="bg-blue-50 p-3 rounded-md">
          <p className="font-medium">IF (Producto = "Plan Mensual" AND Cantidad > 1)</p>
          <p className="font-medium">THEN Sugerir "Plan Anual"</p>
        </div>
      </div>
    </div>
  );
};

export default CondicionesLogicas;
