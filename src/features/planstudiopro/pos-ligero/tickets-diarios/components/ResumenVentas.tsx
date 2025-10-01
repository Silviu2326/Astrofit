import React from 'react';

interface ResumenVentasProps {
  totalVentas: number;
}

const ResumenVentas: React.FC<ResumenVentasProps> = ({ totalVentas }) => {
  return (
    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mt-4 shadow-md" role="alert">
      <p className="font-bold">Resumen del Día</p>
      <p>Total de Ventas: <span className="font-bold text-xl">{totalVentas.toFixed(2)} €</span></p>
    </div>
  );
};

export default ResumenVentas;
