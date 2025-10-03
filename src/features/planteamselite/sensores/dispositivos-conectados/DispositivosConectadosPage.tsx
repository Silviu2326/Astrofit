
import React, { useState, useEffect } from 'react';
import { TablaDispositivos } from './components/TablaDispositivos';
import MonitorConectividad from './components/MonitorConectividad';
import CalibracionAutomatica from './components/CalibracionAutomatica';
import AnalisisFallos from './components/AnalisisFallos';
import GestorFirmware from './components/GestorFirmware';
import TroubleshootingAutomatico from './components/TroubleshootingAutomatico';
import IntegracionMarcas from './components/IntegracionMarcas';
import DashboardUtilizacion from './components/DashboardUtilizacion';
import SistemaReservas from './components/SistemaReservas';

interface Device {
  id: string;
  name: string;
  type: 'GPS' | 'Pulsómetro' | 'Medidor de Potencia';
  status: 'conectado' | 'desconectado' | 'batería baja' | 'sincronizando';
  batteryLevel: number; // 0-100
  lastSync: string; // Date string
  assignedPlayer: string | null;
}

const DispositivosConectadosPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    // Simulate fetching devices
    const fetchDevices = async () => {
      // In a real app, this would call dispositivosConectadosApi.getDevices()
      const simulatedDevices: Device[] = [
        {
          id: 'dev-001',
          name: 'Garmin Forerunner 945',
          type: 'GPS',
          status: 'conectado',
          batteryLevel: 85,
          lastSync: '2025-09-28T10:30:00Z',
          assignedPlayer: 'Lionel Messi',
        },
        {
          id: 'dev-002',
          name: 'Polar H10',
          type: 'Pulsómetro',
          status: 'batería baja',
          batteryLevel: 15,
          lastSync: '2025-09-27T18:00:00Z',
          assignedPlayer: 'Cristiano Ronaldo',
        },
        {
          id: 'dev-003',
          name: 'Stages Power Meter',
          type: 'Medidor de Potencia',
          status: 'desconectado',
          batteryLevel: 0,
          lastSync: '2025-09-26T09:00:00Z',
          assignedPlayer: null,
        },
        {
          id: 'dev-004',
          name: 'Wahoo ELEMNT BOLT',
          type: 'GPS',
          status: 'sincronizando',
          batteryLevel: 60,
          lastSync: '2025-09-28T11:00:00Z',
          assignedPlayer: 'Serena Williams',
        },
      ];
      setDevices(simulatedDevices);
    };

    fetchDevices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inventario de Dispositivos Conectados</h1>
      <TablaDispositivos devices={devices} />
      {/* Basic alerts */}
      {devices.some(d => d.status === 'batería baja') && (
        <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded">
          ¡Alerta! Algunos dispositivos tienen batería baja.
        </div>
      )}

      <div className="mt-8 pt-4 border-t-2 border-gray-200">
        <h2 className="text-xl font-bold mb-4">Funcionalidades Avanzadas de IoT Deportivo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MonitorConectividad />
          <CalibracionAutomatica />
          <AnalisisFallos />
          <GestorFirmware />
          <TroubleshootingAutomatico />
          <IntegracionMarcas />
          <DashboardUtilizacion />
          <SistemaReservas />
        </div>
      </div>
    </div>
  );
};

export default DispositivosConectadosPage;
