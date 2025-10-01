
import { Device } from './DispositivosConectadosPage'; // Assuming Device interface is defined there for now

// This file would contain functions to interact with a backend API
// For now, we'll simulate API calls.

const simulateNetworkDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

let mockDevices: Device[] = [
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

export const dispositivosConectadosApi = {
  getDevices: async (): Promise<Device[]> => {
    await simulateNetworkDelay();
    return mockDevices;
  },

  getDeviceById: async (id: string): Promise<Device | undefined> => {
    await simulateNetworkDelay();
    return mockDevices.find(device => device.id === id);
  },

  updateDevice: async (updatedDevice: Device): Promise<Device> => {
    await simulateNetworkDelay();
    mockDevices = mockDevices.map(device =>
      device.id === updatedDevice.id ? updatedDevice : device
    );
    return updatedDevice;
  },

  // Simulate assigning a device to a player
  assignDeviceToPlayer: async (deviceId: string, playerId: string | null): Promise<Device | undefined> => {
    await simulateNetworkDelay();
    const deviceIndex = mockDevices.findIndex(d => d.id === deviceId);
    if (deviceIndex > -1) {
      mockDevices[deviceIndex] = { ...mockDevices[deviceIndex], assignedPlayer: playerId };
      return mockDevices[deviceIndex];
    }
    return undefined;
  },

  // Simulate maintenance/calibration alerts
  sendMaintenanceAlert: async (deviceId: string, message: string): Promise<boolean> => {
    await simulateNetworkDelay();
    console.log(`Maintenance alert for device ${deviceId}: ${message}`);
    // In a real app, this would trigger a notification or log an event
    return true;
  },

  // New IoT and diagnostic endpoints
  getIoTProtocols: async (deviceType: string): Promise<string[]> => {
    await simulateNetworkDelay();
    console.log(`Fetching IoT protocols for ${deviceType}`);
    // Simulate different protocols based on device type
    if (deviceType === 'GPS') {
      return ['NMEA 0183', 'RTCM3', 'UBX'];
    } else if (deviceType === 'Pulsómetro') {
      return ['ANT+', 'Bluetooth LE'];
    } else if (deviceType === 'Medidor de Potencia') {
      return ['ANT+', 'Bluetooth LE', 'Private ANT'];
    }
    return ['Generic IoT Protocol'];
  },

  runDiagnostic: async (deviceId: string): Promise<{ status: string; report: string }> => {
    await simulateNetworkDelay(1000); // Longer delay for diagnostics
    const device = mockDevices.find(d => d.id === deviceId);
    if (device) {
      const diagnosticStatus = Math.random() > 0.2 ? 'success' : 'failure';
      const diagnosticReport = diagnosticStatus === 'success'
        ? `Diagnóstico completo para ${device.name}. Estado: Óptimo.`
        : `Diagnóstico para ${device.name} fallido. Posible problema de conexión o hardware.`
      return { status: diagnosticStatus, report: diagnosticReport };
    }
    return { status: 'error', report: 'Dispositivo no encontrado.' };
  },

  updateFirmware: async (deviceId: string, version: string): Promise<{ status: string; message: string }> => {
    await simulateNetworkDelay(2000); // Longer delay for firmware update
    const device = mockDevices.find(d => d.id === deviceId);
    if (device) {
      const updateStatus = Math.random() > 0.1 ? 'success' : 'failure';
      const updateMessage = updateStatus === 'success'
        ? `Firmware de ${device.name} actualizado a la versión ${version} exitosamente.`
        : `Fallo al actualizar el firmware de ${device.name} a la versión ${version}.`
      return { status: updateStatus, message: updateMessage };
    }
    return { status: 'error', message: 'Dispositivo no encontrado.' };
  },

  getConnectivityMap: async (): Promise<any> => {
    await simulateNetworkDelay();
    console.log('Fetching connectivity map data.');
    // Simulate complex map data
    return {
      nodes: [
        { id: 'dev-001', x: 10, y: 20, connected: true },
        { id: 'dev-002', x: 50, y: 70, connected: false },
        { id: 'dev-003', x: 90, y: 30, connected: true },
      ],
      edges: [
        { from: 'dev-001', to: 'gateway-01' },
        { from: 'dev-003', to: 'gateway-01' },
      ],
      coverageAreas: [
        { id: 'area-A', shape: 'circle', center: { x: 30, y: 40 }, radius: 30, strength: 'high' },
      ]
    };
  },
};
