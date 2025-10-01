
import React from 'react';

const Flujoventa: React.FC = () => {
  return (
    <div className="border p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-2">Vista del Flujo de Venta</h2>
      <p>Visualización del flujo de venta completo con las prioridades entre reglas.</p>
      <div className="mt-4">
        {/* Diagrama o representación visual del flujo de venta */}
        <div className="bg-green-50 p-3 rounded-md">
          <p className="font-medium">Paso 1: Cliente llega a la página de producto</p>
          <p className="font-medium">Paso 2: Regla "Plan Mensual a Anual" (Prioridad 1)</p>
          <p className="font-medium">Paso 3: Regla "Producto A a Producto B" (Prioridad 2)</p>
          <p className="font-medium">...</p>
        </div>
      </div>
    </div>
  );
};

export default Flujoventa;
