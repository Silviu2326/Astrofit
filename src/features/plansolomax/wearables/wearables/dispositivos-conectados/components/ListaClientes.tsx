import React, { useEffect, useState } from 'react';
import { Client, fetchClients } from '../../dispositivos-conectados/dispositivosConectadosApi';

const ListaClientes: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetchClients().then(setClients);
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Clientes con Dispositivos Conectados</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.id} className="mb-2 p-2 border-b last:border-b-0">
            <h3 className="font-medium">{client.name}</h3>
            {client.connectedDevices.length > 0 ? (
              <ul className="list-disc list-inside ml-4 text-sm text-gray-600">
                {client.connectedDevices.map((device) => (
                  <li key={device.id}>{device.name} (Última sincronización: {device.lastSync ? new Date(device.lastSync).toLocaleString() : 'N/A'})</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Sin dispositivos conectados</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaClientes;
