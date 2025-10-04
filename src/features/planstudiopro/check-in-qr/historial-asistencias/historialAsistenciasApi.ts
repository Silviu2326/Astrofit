// src/features/historial-asistencias/historialAsistenciasApi.ts
export interface AttendanceEntry {
  id: string;
  cliente: string;
  hora: string; // ISO date string
  clase: string;
}

const mockAttendanceEntries: AttendanceEntry[] = [
  { id: '1', cliente: 'Juan Perez', hora: '2025-09-28T09:00:00Z', clase: 'Yoga Principiantes' },
  { id: '2', cliente: 'Maria Garcia', hora: '2025-09-28T10:15:00Z', clase: 'Spinning Avanzado' },
  { id: '3', cliente: 'Carlos Lopez', hora: '2025-09-27T18:30:00Z', clase: 'CrossFit' },
  { id: '4', cliente: 'Ana Martinez', hora: '2025-09-27T09:45:00Z', clase: 'Pilates' },
  { id: '5', cliente: 'Pedro Sanchez', hora: '2025-09-26T11:00:00Z', clase: 'Zumba' },
  { id: '6', cliente: 'Laura Rodriguez', hora: '2025-09-26T19:00:00Z', clase: 'Yoga Principiantes' },
  { id: '7', cliente: 'Sofia Fernandez', hora: '2025-09-25T08:00:00Z', clase: 'Spinning Avanzado' },
  { id: '8', cliente: 'Diego Gomez', hora: '2025-09-25T17:00:00Z', clase: 'CrossFit' },
  { id: '9', cliente: 'Elena Diaz', hora: '2025-09-28T11:30:00Z', clase: 'Pilates' },
  { id: '10', cliente: 'Francisco Ruiz', hora: '2025-09-28T12:00:00Z', clase: 'Zumba' },
];

export const getAttendanceEntries = (): AttendanceEntry[] => {
  // In a real application, this would be an API call
  return mockAttendanceEntries.sort((a, b) => new Date(b.hora).getTime() - new Date(a.hora).getTime());
};
