import React from 'react';

interface TarjetasBonosProps {
  cliente: string;
  tipo: string;
}

const TarjetasBonos: React.FC<TarjetasBonosProps> = ({ cliente, tipo }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">Cliente: {cliente}</h2>
      <p className="text-gray-700">Tipo de Pase: {tipo}</p>
    </div>
  );
};

export default TarjetasBonos;
