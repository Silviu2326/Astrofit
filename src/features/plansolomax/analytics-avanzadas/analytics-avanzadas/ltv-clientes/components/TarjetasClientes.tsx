import React, { useEffect, useState } from 'react';
import { fetchLtvClientes, ClienteLTV } from '../ltvClientesApi';

const TarjetasClientes: React.FC = () => {
  const [clientes, setClientes] = useState<ClienteLTV[]>([]);

  useEffect(() => {
    const getClientes = async () => {
      const data = await fetchLtvClientes();
      setClientes(data);
    };
    getClientes();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Tarjetas de Clientes con LTV</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="border p-4 rounded-lg">
            <h3 className="font-bold">{cliente.nombre}</h3>
            <p>LTV: ${cliente.ltv.toFixed(2)}</p>
            <p>Ingresos Totales: ${cliente.ingresosTotales.toFixed(2)}</p>
            <p>Duración de Vida: {cliente.duracionVida} meses</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TarjetasClientes;
