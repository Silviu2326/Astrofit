
import React from 'react';

interface Device {
  id: string;
  name: string;
  type: 'GPS' | 'Pulsómetro' | 'Medidor de Potencia';
  status: 'conectado' | 'desconectado' | 'batería baja' | 'sincronizando';
  batteryLevel: number; // 0-100
  lastSync: string; // Date string
  assignedPlayer: string | null;
}

interface TablaDispositivosProps {
  devices: Device[];
}

const getStatusColor = (status: Device['status']) => {
  switch (status) {
    case 'conectado':
      return 'text-green-600';
    case 'desconectado':
      return 'text-red-600';
    case 'batería baja':
      return 'text-yellow-600';
    case 'sincronizando':
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

const getDeviceIcon = (type: Device['type']) => {
  switch (type) {
    case 'GPS':
      return '📡'; // Satellite dish icon
    case 'Pulsómetro':
      return '❤️'; // Heart icon
    case 'Medidor de Potencia':
      return '⚡'; // High voltage sign icon
    default:
      return '⚙️'; // Gear icon
  }
};

export const TablaDispositivos: React.FC<TablaDispositivosProps> = ({ devices }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Dispositivo</th>
            <th className="py-3 px-6 text-left">Tipo</th>
            <th className="py-3 px-6 text-left">Estado</th>
            <th className="py-3 px-6 text-left">Batería</th>
            <th className="py-3 px-6 text-left">Última Sinc.</th>
            <th className="py-3 px-6 text-left">Jugador Asignado</th>
            <th className="py-3 px-6 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {devices.map((device) => (
            <tr key={device.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <span className="mr-2 text-xl">{getDeviceIcon(device.type)}</span>
                  <span className="font-medium">{device.name}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">{device.type}</td>
              <td className="py-3 px-6 text-left">
                <span className={`font-bold ${getStatusColor(device.status)}`}>
                  {device.status}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="h-2.5 rounded-full"
                    style={{
                      width: `${device.batteryLevel}%`,
                      backgroundColor: device.batteryLevel < 20 ? '#EF4444' : '#22C55E', // Red for low, Green otherwise
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{device.batteryLevel}%</span>
              </td>
              <td className="py-3 px-6 text-left">{new Date(device.lastSync).toLocaleString()}</td>
              <td className="py-3 px-6 text-left">
                {device.assignedPlayer || 'Sin asignar'}
              </td>
              <td className="py-3 px-6 text-left">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs">
                  Gestionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
