import React, { useEffect, useState } from 'react';
import TarjetaDispositivo from './TarjetaDispositivo';
import { Device, fetchDevices, connectDevice, disconnectDevice, simulateSync } from '../../dispositivos-conectados/dispositivosConectadosApi';

const PanelConexion: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetchDevices().then(setDevices);
  }, []);

  const handleConnect = async (deviceId: string) => {
    await connectDevice(deviceId);
    fetchDevices().then(setDevices); // Refresh devices
  };

  const handleDisconnect = async (deviceId: string) => {
    await disconnectDevice(deviceId);
    fetchDevices().then(setDevices); // Refresh devices
  };

  const handleSync = async (deviceId: string) => {
    await simulateSync(deviceId);
    fetchDevices().then(setDevices); // Refresh devices
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Panel de Conexión con Wearables</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((device) => (
          <TarjetaDispositivo
            key={device.id}
            device={device}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            onSync={handleSync}
          />
        ))}
      </div>
    </div>
  );
};

export default PanelConexion;
