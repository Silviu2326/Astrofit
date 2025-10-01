import { useState, useEffect } from 'react';

export interface Device {
  id: string;
  name: string;
  logo: string;
  connected: boolean;
  lastSync: string | null;
}

export interface Client {
  id: string;
  name: string;
  connectedDevices: Device[];
}

const mockDevices: Device[] = [
  { id: '1', name: 'Fitbit', logo: 'fitbit-logo.png', connected: false, lastSync: null },
  { id: '2', name: 'Garmin', logo: 'garmin-logo.png', connected: true, lastSync: '2025-09-27T10:30:00Z' },
  { id: '3', name: 'Apple Watch', logo: 'apple-watch-logo.png', connected: false, lastSync: null },
  { id: '4', name: 'Samsung Health', logo: 'samsung-health-logo.png', connected: true, lastSync: '2025-09-27T11:00:00Z' },
];

const mockClients: Client[] = [
  { id: 'c1', name: 'Cliente A', connectedDevices: [mockDevices[1]] },
  { id: 'c2', name: 'Cliente B', connectedDevices: [mockDevices[3]] },
  { id: 'c3', name: 'Cliente C', connectedDevices: [] },
];

export const fetchDevices = (): Promise<Device[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDevices), 500);
  });
};

export const fetchClients = (): Promise<Client[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockClients), 700);
  });
};

export const connectDevice = (deviceId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const device = mockDevices.find(d => d.id === deviceId);
      if (device) {
        device.connected = true;
        device.lastSync = new Date().toISOString();
        resolve(true);
      }
      resolve(false);
    }, 300);
  });
};

export const disconnectDevice = (deviceId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const device = mockDevices.find(d => d.id === deviceId);
      if (device) {
        device.connected = false;
        device.lastSync = null;
        resolve(true);
      }
      resolve(false);
    }, 300);
  });
};

export const simulateSync = (deviceId: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const device = mockDevices.find(d => d.id === deviceId);
      if (device && device.connected) {
        device.lastSync = new Date().toISOString();
        resolve(device.lastSync);
      }
      resolve('Failed');
    }, 1000);
  });
};
