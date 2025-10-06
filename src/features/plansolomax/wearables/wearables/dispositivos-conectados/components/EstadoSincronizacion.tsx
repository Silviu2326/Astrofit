import React from 'react';

interface EstadoSincronizacionProps {
  connected: boolean;
  lastSync: string | null;
}

const EstadoSincronizacion: React.FC<EstadoSincronizacionProps> = ({ connected, lastSync }) => {
  if (!connected) {
    return <span className="text-red-500 text-sm">Desconectado</span>;
  }

  const formattedLastSync = lastSync ? new Date(lastSync).toLocaleString() : 'N/A';

  return (
    <div className="text-sm text-gray-600">
      <span className="text-green-500">Conectado</span>
      {lastSync && <span className="ml-2">Última sincronización: {formattedLastSync}</span>}
    </div>
  );
};

export default EstadoSincronizacion;
