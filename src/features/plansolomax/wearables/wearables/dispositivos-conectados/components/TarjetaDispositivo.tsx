import React from 'react';
import { Device } from '../../dispositivos-conectados/dispositivosConectadosApi';
import EstadoSincronizacion from './EstadoSincronizacion';

interface TarjetaDispositivoProps {
  device: Device;
  onConnect: (deviceId: string) => void;
  onDisconnect: (deviceId: string) => void;
  onSync: (deviceId: string) => void;
}

const TarjetaDispositivo: React.FC<TarjetaDispositivoProps> = ({ device, onConnect, onDisconnect, onSync }) => {
  const getLogo = (deviceName: string) => {
    switch (deviceName.toLowerCase()) {
      case 'fitbit': return <span className="text-green-500 text-2xl">F</span>; // Placeholder for Fitbit logo
      case 'garmin': return <span className="text-red-500 text-2xl">G</span>; // Placeholder for Garmin logo
      case 'apple watch': return <span className="text-gray-700 text-2xl"></span>; // Placeholder for Apple Watch logo
      case 'samsung health': return <span className="text-blue-500 text-2xl">S</span>; // Placeholder for Samsung Health logo
      default: return <span className="text-gray-400 text-2xl">?</span>;
    }
  };

  return (
    <div className="border rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-4">{getLogo(device.name)}</div>
        <div>
          <h3 className="font-semibold text-lg">{device.name}</h3>
          <EstadoSincronizacion connected={device.connected} lastSync={device.lastSync} />
        </div>
      </div>
      <div className="space-x-2">
        {device.connected ? (
          <>
            <button
              onClick={() => onSync(device.id)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Sincronizar
            </button>
            <button
              onClick={() => onDisconnect(device.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Desconectar
            </button>
          </>
        ) : (
          <button
            onClick={() => onConnect(device.id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Conectar
          </button>
        )}
      </div>
    </div>
  );
};

export default TarjetaDispositivo;
