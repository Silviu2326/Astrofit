
import React from 'react';

const EditorReglas: React.FC = () => {
  return (
    <div className="border p-4 rounded-md mb-4">
      <h2 className="text-xl font-semibold mb-2">Editor de Reglas</h2>
      <p>Aquí se podrán definir múltiples reglas condicionales tipo "if/then" para cada upsell.</p>
      <div className="mt-4">
        {/* Ejemplo de regla */}
        <div className="bg-gray-100 p-3 rounded-md mb-2">
          <p className="font-medium">Regla 1: Si compra plan mensual, sugerir anual</p>
          <p className="text-sm text-gray-600">Condición: Producto = "Plan Mensual"</p>
          <p className="text-sm text-gray-600">Acción: Sugerir "Plan Anual"</p>
        </div>
        {/* Aquí se añadirán los controles para añadir, editar y eliminar reglas */}
      </div>
    </div>
  );
};

export default EditorReglas;
