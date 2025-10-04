export interface Credencial {
  id: string;
  clienteNombre: string;
  numeroTarjeta: string;
  estado: 'activo' | 'bloqueado' | 'inactivo';
  fotoCliente: string;
  qrCode?: string; // Added for unique QR codes
}

export interface HistorialEntry {
  timestamp: string;
  action: string;
  details: string;
}

export interface TemporaryCard {
  id: string;
  guestName: string;
  validUntil: string;
  status: 'active' | 'expired';
}

const mockCredenciales: Credencial[] = [
  {
    id: '1',
    clienteNombre: 'Juan Pérez',
    numeroTarjeta: '1234-5678-9012-3456',
    estado: 'activo',
    fotoCliente: 'https://via.placeholder.com/40/FF5733/FFFFFF?text=JP',
    qrCode: 'qr-1234',
  },
  {
    id: '2',
    clienteNombre: 'María García',
    numeroTarjeta: '9876-5432-1098-7654',
    estado: 'bloqueado',
    fotoCliente: 'https://via.placeholder.com/40/33FF57/FFFFFF?text=MG',
    qrCode: 'qr-9876',
  },
  {
    id: '3',
    clienteNombre: 'Carlos López',
    numeroTarjeta: '1122-3344-5566-7788',
    estado: 'inactivo',
    fotoCliente: 'https://via.placeholder.com/40/3357FF/FFFFFF?text=CL',
    qrCode: 'qr-1122',
  },
  {
    id: '4',
    clienteNombre: 'Ana Martínez',
    numeroTarjeta: '4455-6677-8899-0011',
    estado: 'activo',
    fotoCliente: 'https://via.placeholder.com/40/FFFF33/000000?text=AM',
    qrCode: 'qr-4455',
  },
  {
    id: '5',
    clienteNombre: 'Pedro Sánchez',
    numeroTarjeta: '0011-2233-4455-6677',
    estado: 'activo',
    fotoCliente: 'https://via.placeholder.com/40/FF33FF/FFFFFF?text=PS',
    qrCode: 'qr-0011',
  },
];

const mockHistorial: HistorialEntry[] = [
  { timestamp: new Date().toISOString(), action: 'Tarjeta 1 activada', details: 'Activada por admin' },
  { timestamp: new Date().toISOString(), action: 'Tarjeta 2 bloqueada', details: 'Bloqueada por pérdida' },
];

const mockTemporaryCards: TemporaryCard[] = [
  { id: 'temp-1', guestName: 'Invitado A', validUntil: '2025-12-31', status: 'active' },
  { id: 'temp-2', guestName: 'Invitado B', validUntil: '2024-10-15', status: 'expired' },
];

export const getCredenciales = async (searchTerm: string = ''): Promise<Credencial[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
  const lowerCaseSearchTerm = searchTerm.toLowerCase();
  return mockCredenciales.filter(
    (credencial) =>
      credencial.clienteNombre.toLowerCase().includes(lowerCaseSearchTerm) ||
      credencial.numeroTarjeta.includes(lowerCaseSearchTerm)
  );
};

export const addCredencial = async (newCredencial: Omit<Credencial, 'id'>): Promise<Credencial> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const credencialWithId = { ...newCredencial, id: String(mockCredenciales.length + 1) };
  mockCredenciales.push(credencialWithId);
  return credencialWithId;
};

export const updateCredencial = async (updatedCredencial: Credencial): Promise<Credencial> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockCredenciales.findIndex((c) => c.id === updatedCredencial.id);
  if (index !== -1) {
    mockCredenciales[index] = updatedCredencial;
    return updatedCredencial;
  }
  throw new Error('Credencial not found');
};

export const deleteCredencial = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const index = mockCredenciales.findIndex((c) => c.id === id);
  if (index !== -1) {
    mockCredenciales.splice(index, 1);
    return;
  }
  throw new Error('Credencial not found');
};

// Advanced Card Management Endpoints

export const updateCardStatus = async (
  id: string,
  status: 'activo' | 'bloqueado' | 'inactivo'
): Promise<Credencial> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const credencial = mockCredenciales.find((c) => c.id === id);
  if (credencial) {
    credencial.estado = status;
    mockHistorial.push({
      timestamp: new Date().toISOString(),
      action: `Tarjeta ${id} estado actualizado a ${status}`,
      details: `Estado cambiado por API`,
    });
    return { ...credencial };
  }
  throw new Error('Credencial not found');
};

export const assignUniqueQrCode = async (id: string, qrCode: string): Promise<Credencial> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const credencial = mockCredenciales.find((c) => c.id === id);
  if (credencial) {
    credencial.qrCode = qrCode;
    mockHistorial.push({
      timestamp: new Date().toISOString(),
      action: `Tarjeta ${id} código QR asignado`,
      details: `QR: ${qrCode}`,
    });
    return { ...credencial };
  }
  throw new Error('Credencial not found');
};

export const getCardHistory = async (id: string): Promise<HistorialEntry[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // In a real app, this would filter history by card ID
  return mockHistorial;
};

export const createTemporaryCard = async (cardDetails: Omit<TemporaryCard, 'id' | 'status'>): Promise<TemporaryCard> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newTempCard: TemporaryCard = {
    ...cardDetails,
    id: `temp-${mockTemporaryCards.length + 1}`,
    status: 'active',
  };
  mockTemporaryCards.push(newTempCard);
  mockHistorial.push({
    timestamp: new Date().toISOString(),
    action: `Tarjeta temporal creada para ${cardDetails.guestName}`,
    details: `Válida hasta: ${cardDetails.validUntil}`,
  });
  return newTempCard;
};

export const validateUniqueCode = async (code: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const isDuplicate = mockCredenciales.some(c => c.qrCode === code) || mockTemporaryCards.some(tc => tc.id === code);
  return !isDuplicate; // Returns true if code is unique
};

export const getExpiringCardAlerts = async (): Promise<Credencial[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  // Simulate some cards expiring soon
  return mockCredenciales.filter(c => c.id === '4'); // Example: Card 4 is expiring soon
};

export const exportAccessReports = async (filters: any): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log('Exporting reports with filters:', filters);
  return 'Reporte_Accesos_2025-09-28.xlsx'; // Mock file name
};
