
import React, { useState } from 'react';
import { mockClientes } from '../../nuevoEntrenamientoApi';

interface ClienteSelectorProps {
  onSelectCliente: (clienteId: string) => void;
}

const ClienteSelector: React.FC<ClienteSelectorProps> = ({ onSelectCliente }) => {
  const [selectedCliente, setSelectedCliente] = useState<string | null>(null);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCliente(e.target.value);
    onSelectCliente(e.target.value);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">Seleccionar Cliente</h3>
      <select
        className="w-full p-2 border rounded"
        value={selectedCliente || ''}
        onChange={handleSelect}
      >
        <option value="" disabled>Selecciona un cliente</option>
        {mockClientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClienteSelector;
