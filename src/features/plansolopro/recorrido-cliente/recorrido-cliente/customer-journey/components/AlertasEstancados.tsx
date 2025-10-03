
import React from 'react';

const AlertasEstancados: React.FC = () => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      <h3 className="font-bold text-lg mb-2">Alertas de Clientes Estancados</h3>
      <p>Aquí se mostrarán las alertas de clientes que han estado estancados en una etapa por mucho tiempo.</p>
      {/* Lógica para mostrar alertas */}
    </div>
  );
};

export default AlertasEstancados;
