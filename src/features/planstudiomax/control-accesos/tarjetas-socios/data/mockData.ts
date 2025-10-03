// Mock data para Tarjetas de Socios

export interface Socio {
  id: string;
  nombre: string;
  apellido: string;
  avatar: string;
  email: string;
  telefono: string;
  tipoMembresia: 'VIP' | 'Premium' | 'Estándar' | 'Básico';
  estado: 'Activo' | 'Inactivo' | 'Suspendido';
}

export interface Tarjeta {
  id: string;
  numeroTarjeta: string;
  socioId: string | null;
  tipo: 'RFID' | 'NFC' | 'Barcode' | 'QR' | 'Biométrica';
  estado: 'Activa' | 'Bloqueada' | 'Perdida' | 'Sin asignar';
  fechaAsignacion: string | null;
  fechaExpiracion: string;
  ultimoAcceso: string | null;
  permisos: {
    areas: string[];
    horario: '24/7' | 'AM' | 'PM' | 'Custom';
    restricciones: string[];
  };
  costoCobrado?: number;
}

export interface RegistroAcceso {
  id: string;
  tarjetaId: string;
  socioId: string;
  timestamp: string;
  puntoAcceso: string;
  tipoAcceso: 'Entrada' | 'Salida';
  estadoAcceso: 'Permitido' | 'Denegado';
  razonDenegacion?: string;
  duracionEstancia?: number; // en minutos
}

export interface Alerta {
  id: string;
  tipo: 'Sospechoso' | 'Bloqueo' | 'Múltiples Intentos' | 'Fuera de Horario';
  tarjetaId: string;
  socioId: string;
  descripcion: string;
  timestamp: string;
  severidad: 'Alta' | 'Media' | 'Baja';
  resuelto: boolean;
}

export interface Dispositivo {
  id: string;
  nombre: string;
  tipo: 'Torniquete' | 'Puerta' | 'Scanner';
  ubicacion: string;
  estado: 'Online' | 'Offline' | 'Mantenimiento';
  ultimaSincronizacion: string;
  accesosHoy: number;
}

export interface ReportePerdida {
  id: string;
  tarjetaId: string;
  socioId: string;
  fechaReporte: string;
  razon: string;
  tarjetaReemplazo?: string;
  costoReemplazo: number;
  estado: 'Pendiente' | 'Procesado' | 'Completado';
}

// Datos mockeados
export const socios: Socio[] = [
  { id: '1', nombre: 'Carlos', apellido: 'Rodríguez', avatar: '👨', email: 'carlos@email.com', telefono: '555-0101', tipoMembresia: 'VIP', estado: 'Activo' },
  { id: '2', nombre: 'María', apellido: 'González', avatar: '👩', email: 'maria@email.com', telefono: '555-0102', tipoMembresia: 'Premium', estado: 'Activo' },
  { id: '3', nombre: 'Juan', apellido: 'Pérez', avatar: '👨', email: 'juan@email.com', telefono: '555-0103', tipoMembresia: 'Estándar', estado: 'Activo' },
  { id: '4', nombre: 'Ana', apellido: 'Martínez', avatar: '👩', email: 'ana@email.com', telefono: '555-0104', tipoMembresia: 'Premium', estado: 'Activo' },
  { id: '5', nombre: 'Luis', apellido: 'López', avatar: '👨', email: 'luis@email.com', telefono: '555-0105', tipoMembresia: 'Básico', estado: 'Suspendido' },
  { id: '6', nombre: 'Sofia', apellido: 'Ramírez', avatar: '👩', email: 'sofia@email.com', telefono: '555-0106', tipoMembresia: 'VIP', estado: 'Activo' },
  { id: '7', nombre: 'Diego', apellido: 'Torres', avatar: '👨', email: 'diego@email.com', telefono: '555-0107', tipoMembresia: 'Estándar', estado: 'Activo' },
  { id: '8', nombre: 'Laura', apellido: 'Flores', avatar: '👩', email: 'laura@email.com', telefono: '555-0108', tipoMembresia: 'Premium', estado: 'Activo' },
  { id: '9', nombre: 'Pedro', apellido: 'Sánchez', avatar: '👨', email: 'pedro@email.com', telefono: '555-0109', tipoMembresia: 'Básico', estado: 'Activo' },
  { id: '10', nombre: 'Carmen', apellido: 'Ruiz', avatar: '👩', email: 'carmen@email.com', telefono: '555-0110', tipoMembresia: 'VIP', estado: 'Activo' },
];

export const tarjetas: Tarjeta[] = [
  {
    id: '1',
    numeroTarjeta: 'RFID-001-2345',
    socioId: '1',
    tipo: 'RFID',
    estado: 'Activa',
    fechaAsignacion: '2024-01-15',
    fechaExpiracion: '2025-01-15',
    ultimoAcceso: '2024-12-15T08:30:00',
    permisos: {
      areas: ['Recepción', 'Gimnasio', 'Vestuarios', 'Zona VIP', 'Spa/Sauna'],
      horario: '24/7',
      restricciones: []
    }
  },
  {
    id: '2',
    numeroTarjeta: 'NFC-002-6789',
    socioId: '2',
    tipo: 'NFC',
    estado: 'Activa',
    fechaAsignacion: '2024-02-20',
    fechaExpiracion: '2025-02-20',
    ultimoAcceso: '2024-12-15T07:15:00',
    permisos: {
      areas: ['Recepción', 'Gimnasio', 'Salas de clase', 'Vestuarios'],
      horario: 'AM',
      restricciones: []
    }
  },
  {
    id: '3',
    numeroTarjeta: 'RFID-003-1122',
    socioId: '3',
    tipo: 'RFID',
    estado: 'Activa',
    fechaAsignacion: '2024-03-10',
    fechaExpiracion: '2025-03-10',
    ultimoAcceso: '2024-12-14T18:45:00',
    permisos: {
      areas: ['Recepción', 'Gimnasio', 'Vestuarios'],
      horario: 'PM',
      restricciones: []
    }
  },
  {
    id: '4',
    numeroTarjeta: 'NFC-004-3344',
    socioId: '4',
    tipo: 'NFC',
    estado: 'Bloqueada',
    fechaAsignacion: '2024-04-05',
    fechaExpiracion: '2025-04-05',
    ultimoAcceso: '2024-12-10T10:20:00',
    permisos: {
      areas: ['Recepción', 'Gimnasio', 'Salas de clase', 'Vestuarios'],
      horario: '24/7',
      restricciones: ['Bloqueada por pago pendiente']
    }
  },
  {
    id: '5',
    numeroTarjeta: 'QR-005-5566',
    socioId: '5',
    tipo: 'QR',
    estado: 'Perdida',
    fechaAsignacion: '2024-05-12',
    fechaExpiracion: '2025-05-12',
    ultimoAcceso: '2024-11-28T16:30:00',
    permisos: {
      areas: ['Recepción', 'Gimnasio'],
      horario: 'Custom',
      restricciones: ['Reportada como perdida']
    }
  },
  {
    id: '6',
    numeroTarjeta: 'RFID-006-7788',
    socioId: null,
    tipo: 'RFID',
    estado: 'Sin asignar',
    fechaAsignacion: null,
    fechaExpiracion: '2026-12-31',
    ultimoAcceso: null,
    permisos: {
      areas: [],
      horario: '24/7',
      restricciones: []
    }
  },
  {
    id: '7',
    numeroTarjeta: 'NFC-007-9900',
    socioId: '6',
    tipo: 'NFC',
    estado: 'Activa',
    fechaAsignacion: '2024-06-18',
    fechaExpiracion: '2025-06-18',
    ultimoAcceso: '2024-12-15T09:00:00',
    permisos: {
      areas: ['Recepción', 'Gimnasio', 'Vestuarios', 'Zona VIP', 'Spa/Sauna', 'Salas de clase'],
      horario: '24/7',
      restricciones: []
    }
  },
  {
    id: '8',
    numeroTarjeta: 'RFID-008-1234',
    socioId: '7',
    tipo: 'RFID',
    estado: 'Activa',
    fechaAsignacion: '2024-07-22',
    fechaExpiracion: '2025-07-22',
    ultimoAcceso: '2024-12-15T06:45:00',
    permisos: {
      areas: ['Recepción', 'Gimnasio', 'Vestuarios', 'Zona de entrenamiento funcional'],
      horario: 'AM',
      restricciones: []
    }
  },
  {
    id: '9',
    numeroTarjeta: 'BARCODE-009-5678',
    socioId: '8',
    tipo: 'Barcode',
    estado: 'Activa',
    fechaAsignacion: '2024-08-30',
    fechaExpiracion: '2025-08-30',
    ultimoAcceso: '2024-12-14T19:30:00',
    permisos: {
      areas: ['Recepción', 'Gimnasio', 'Salas de clase', 'Vestuarios'],
      horario: 'PM',
      restricciones: []
    }
  },
  {
    id: '10',
    numeroTarjeta: 'NFC-010-9012',
    socioId: '9',
    tipo: 'NFC',
    estado: 'Activa',
    fechaAsignacion: '2024-09-14',
    fechaExpiracion: '2025-09-14',
    ultimoAcceso: '2024-12-15T07:00:00',
    permisos: {
      areas: ['Recepción', 'Gimnasio', 'Vestuarios'],
      horario: 'AM',
      restricciones: []
    }
  },
  {
    id: '11',
    numeroTarjeta: 'RFID-011-3456',
    socioId: null,
    tipo: 'RFID',
    estado: 'Sin asignar',
    fechaAsignacion: null,
    fechaExpiracion: '2026-12-31',
    ultimoAcceso: null,
    permisos: {
      areas: [],
      horario: '24/7',
      restricciones: []
    }
  },
  {
    id: '12',
    numeroTarjeta: 'NFC-012-7890',
    socioId: null,
    tipo: 'NFC',
    estado: 'Sin asignar',
    fechaAsignacion: null,
    fechaExpiracion: '2026-12-31',
    ultimoAcceso: null,
    permisos: {
      areas: [],
      horario: '24/7',
      restricciones: []
    }
  },
  {
    id: '13',
    numeroTarjeta: 'BIOMETRIC-013-1111',
    socioId: '10',
    tipo: 'Biométrica',
    estado: 'Activa',
    fechaAsignacion: '2024-10-01',
    fechaExpiracion: '2025-10-01',
    ultimoAcceso: '2024-12-15T08:15:00',
    permisos: {
      areas: ['Recepción', 'Gimnasio', 'Vestuarios', 'Zona VIP', 'Spa/Sauna', 'Salas de clase'],
      horario: '24/7',
      restricciones: []
    }
  },
];

export const registrosAcceso: RegistroAcceso[] = [
  { id: '1', tarjetaId: '1', socioId: '1', timestamp: '2024-12-15T08:30:00', puntoAcceso: 'Torniquete Principal', tipoAcceso: 'Entrada', estadoAcceso: 'Permitido', duracionEstancia: 90 },
  { id: '2', tarjetaId: '2', socioId: '2', timestamp: '2024-12-15T07:15:00', puntoAcceso: 'Torniquete Principal', tipoAcceso: 'Entrada', estadoAcceso: 'Permitido', duracionEstancia: 120 },
  { id: '3', tarjetaId: '7', socioId: '6', timestamp: '2024-12-15T09:00:00', puntoAcceso: 'Puerta VIP', tipoAcceso: 'Entrada', estadoAcceso: 'Permitido' },
  { id: '4', tarjetaId: '8', socioId: '7', timestamp: '2024-12-15T06:45:00', puntoAcceso: 'Torniquete Principal', tipoAcceso: 'Entrada', estadoAcceso: 'Permitido', duracionEstancia: 75 },
  { id: '5', tarjetaId: '10', socioId: '9', timestamp: '2024-12-15T07:00:00', puntoAcceso: 'Torniquete Principal', tipoAcceso: 'Entrada', estadoAcceso: 'Permitido', duracionEstancia: 60 },
  { id: '6', tarjetaId: '13', socioId: '10', timestamp: '2024-12-15T08:15:00', puntoAcceso: 'Scanner Biométrico', tipoAcceso: 'Entrada', estadoAcceso: 'Permitido' },
  { id: '7', tarjetaId: '4', socioId: '4', timestamp: '2024-12-15T10:00:00', puntoAcceso: 'Torniquete Principal', tipoAcceso: 'Entrada', estadoAcceso: 'Denegado', razonDenegacion: 'Tarjeta bloqueada - Pago pendiente' },
  { id: '8', tarjetaId: '5', socioId: '5', timestamp: '2024-12-15T11:30:00', puntoAcceso: 'Torniquete Principal', tipoAcceso: 'Entrada', estadoAcceso: 'Denegado', razonDenegacion: 'Tarjeta reportada como perdida' },
  { id: '9', tarjetaId: '3', socioId: '3', timestamp: '2024-12-14T18:45:00', puntoAcceso: 'Torniquete Principal', tipoAcceso: 'Entrada', estadoAcceso: 'Permitido', duracionEstancia: 95 },
  { id: '10', tarjetaId: '9', socioId: '8', timestamp: '2024-12-14T19:30:00', puntoAcceso: 'Torniquete Principal', tipoAcceso: 'Entrada', estadoAcceso: 'Permitido', duracionEstancia: 85 },
];

export const alertas: Alerta[] = [
  {
    id: '1',
    tipo: 'Múltiples Intentos',
    tarjetaId: '4',
    socioId: '4',
    descripcion: 'Tarjeta bloqueada intentó acceder 3 veces en 5 minutos',
    timestamp: '2024-12-15T10:05:00',
    severidad: 'Alta',
    resuelto: false
  },
  {
    id: '2',
    tipo: 'Bloqueo',
    tarjetaId: '5',
    socioId: '5',
    descripcion: 'Intento de acceso con tarjeta reportada como perdida',
    timestamp: '2024-12-15T11:30:00',
    severidad: 'Alta',
    resuelto: false
  },
  {
    id: '3',
    tipo: 'Fuera de Horario',
    tarjetaId: '3',
    socioId: '3',
    descripcion: 'Acceso fuera del horario habitual del socio',
    timestamp: '2024-12-14T23:15:00',
    severidad: 'Media',
    resuelto: true
  },
  {
    id: '4',
    tipo: 'Sospechoso',
    tarjetaId: '1',
    socioId: '1',
    descripcion: 'Tarjeta usada en múltiples ubicaciones en corto periodo',
    timestamp: '2024-12-13T14:20:00',
    severidad: 'Media',
    resuelto: true
  },
];

export const dispositivos: Dispositivo[] = [
  {
    id: '1',
    nombre: 'Torniquete Principal',
    tipo: 'Torniquete',
    ubicacion: 'Entrada Principal',
    estado: 'Online',
    ultimaSincronizacion: '2024-12-15T10:00:00',
    accesosHoy: 147
  },
  {
    id: '2',
    nombre: 'Puerta VIP',
    tipo: 'Puerta',
    ubicacion: 'Zona VIP',
    estado: 'Online',
    ultimaSincronizacion: '2024-12-15T09:58:00',
    accesosHoy: 23
  },
  {
    id: '3',
    nombre: 'Scanner Biométrico',
    tipo: 'Scanner',
    ubicacion: 'Recepción',
    estado: 'Online',
    ultimaSincronizacion: '2024-12-15T09:55:00',
    accesosHoy: 12
  },
  {
    id: '4',
    nombre: 'Torniquete Vestuarios',
    tipo: 'Torniquete',
    ubicacion: 'Zona de Vestuarios',
    estado: 'Offline',
    ultimaSincronizacion: '2024-12-15T06:30:00',
    accesosHoy: 0
  },
  {
    id: '5',
    nombre: 'Puerta Clases Grupales',
    tipo: 'Puerta',
    ubicacion: 'Salas de Clase',
    estado: 'Mantenimiento',
    ultimaSincronizacion: '2024-12-14T18:00:00',
    accesosHoy: 0
  },
];

export const reportesPerdida: ReportePerdida[] = [
  {
    id: '1',
    tarjetaId: '5',
    socioId: '5',
    fechaReporte: '2024-11-28T10:15:00',
    razon: 'Tarjeta extraviada en el gimnasio',
    tarjetaReemplazo: 'QR-014-9999',
    costoReemplazo: 150,
    estado: 'Procesado'
  },
  {
    id: '2',
    tarjetaId: '4',
    socioId: '4',
    fechaReporte: '2024-12-10T14:30:00',
    razon: 'Tarjeta bloqueada por pago pendiente',
    costoReemplazo: 0,
    estado: 'Pendiente'
  },
];

// Función helper para obtener socio por ID
export const getSocioById = (id: string | null): Socio | null => {
  if (!id) return null;
  return socios.find(s => s.id === id) || null;
};

// Función helper para obtener tarjeta por ID
export const getTarjetaById = (id: string): Tarjeta | null => {
  return tarjetas.find(t => t.id === id) || null;
};

// Estadísticas generales
export const estadisticas = {
  totalTarjetasActivas: tarjetas.filter(t => t.estado === 'Activa').length,
  tarjetasPendientes: tarjetas.filter(t => t.estado === 'Sin asignar').length,
  tarjetasBloqueadas: tarjetas.filter(t => t.estado === 'Bloqueada' || t.estado === 'Perdida').length,
  accesosHoy: registrosAcceso.filter(r => r.timestamp.startsWith('2024-12-15')).length,
};
