
import { useState, useEffect } from 'react';

export interface Nota {
  id: string;
  title: string;
  content: string;
  clientId?: string; // Optional: associated client/lead ID
  clientName?: string; // Optional: associated client/lead name for display
  tags: string[];
  author: string;
  timestamp: string; // ISO date string
  assignedTo?: string; // Member of the team
  priority: 'alta' | 'media' | 'baja';
  isPrivate: boolean;
  comments?: string; // Additional comments/details
}

// Mock data for clients/leads and team members
const mockClients = [
  { id: 'client-1', name: 'Cliente A' },
  { id: 'client-2', name: 'Lead B' },
  { id: 'client-3', name: 'Cliente C' },
];

const mockTeamMembers = [
  { id: 'member-1', name: 'Alice' },
  { id: 'member-2', name: 'Bob' },
  { id: 'member-3', name: 'Charlie' },
];

let mockNotas: Nota[] = [
  {
    id: '1',
    title: 'Seguimiento inicial Cliente A',
    content: 'Primera llamada con Cliente A. Interesado en el plan premium. Enviar propuesta antes del viernes.',
    clientId: 'client-1',
    clientName: 'Cliente A',
    tags: ['seguimiento', 'propuesta'],
    author: 'Alice',
    timestamp: '2025-09-25T10:00:00Z',
    assignedTo: 'member-2',
    priority: 'alta',
    isPrivate: false,
    comments: 'Recordar mencionar la nueva característica X.'
  },
  {
    id: '2',
    title: 'Detalles reunión Lead B',
    content: 'Reunión con Lead B. Necesita una solución personalizada para gestión de inventario. Programar demo.',
    clientId: 'client-2',
    clientName: 'Lead B',
    tags: ['demo', 'personalizado'],
    author: 'Bob',
    timestamp: '2025-09-26T14:30:00Z',
    assignedTo: 'member-1',
    priority: 'media',
    isPrivate: false,
  },
  {
    id: '3',
    title: 'Idea para nueva funcionalidad',
    content: 'Considerar integrar un módulo de reportes avanzados para el CRM. Hablar con el equipo de desarrollo.',
    tags: ['idea', 'desarrollo'],
    author: 'Charlie',
    timestamp: '2025-09-26T09:00:00Z',
    priority: 'baja',
    isPrivate: true,
  },
  {
    id: '4',
    title: 'Nota privada sobre Cliente A',
    content: 'Cliente A mencionó problemas con el proveedor actual. No compartir esta información directamente.',
    clientId: 'client-1',
    clientName: 'Cliente A',
    tags: ['privado', 'información'],
    author: 'Alice',
    timestamp: '2025-09-27T11:15:00Z',
    priority: 'alta',
    isPrivate: true,
  },
];

// Simulate API calls
const simulateApiCall = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 300); // Simulate network delay
  });
};

export const getNotas = (): Promise<Nota[]> => {
  return simulateApiCall(mockNotas);
};

export const createNota = (newNota: Omit<Nota, 'id' | 'timestamp'>): Promise<Nota> => {
  const notaWithId: Nota = {
    ...newNota,
    id: String(mockNotas.length + 1),
    timestamp: new Date().toISOString(),
  };
  mockNotas.push(notaWithId);
  return simulateApiCall(notaWithId);
};

export const updateNota = (updatedNota: Nota): Promise<Nota> => {
  mockNotas = mockNotas.map((nota) =>
    nota.id === updatedNota.id ? { ...updatedNota, timestamp: new Date().toISOString() } : nota
  );
  return simulateApiCall(updatedNota);
};

export const deleteNota = (id: string): Promise<void> => {
  mockNotas = mockNotas.filter((nota) => nota.id !== id);
  return simulateApiCall(undefined);
};

export const getClients = () => simulateApiCall(mockClients);
export const getTeamMembers = () => simulateApiCall(mockTeamMembers);
