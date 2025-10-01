
import React from 'react';

const FiltrosAvanzados: React.FC = () => {
  return (
    <div className="filtros-avanzados">
      <h3>Filtros Avanzados</h3>
      <select>
        <option>Estado Operativo</option>
      </select>
      <select>
        <option>Zona</option>
      </select>
      <select>
        <option>Tamaño</option>
      </select>
    </div>
  );
};

export default FiltrosAvanzados;
