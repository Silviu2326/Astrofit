export interface Cliente {
  id: string;
  nombre: string;
}

export type ResultadoAcceso = 'valido' | 'no_valido' | 'error';

export interface AccesoKiosko {
  id: string;
  timestamp: string;
  cliente: Cliente;
  resultado: ResultadoAcceso;
  detalle?: string;
}

export interface EstadisticasKiosko {
  totalAccesos: number;
  accesosValidos: number;
  accesosNoValidos: number;
  accesosError: number;
  tasaExito: number;
  tasaFallo: number;
}

export interface AlertaKiosko {
  id: string;
  timestamp: string;
  tipo: 'abono_caducado' | 'cliente_bloqueado' | 'error_critico' | 'otro';
  mensaje: string;
  kioskoId: string;
  resuelto: boolean;
}

const mockAccesos: AccesoKiosko[] = [
  {
    id: '1',
    timestamp: '2025-09-27T10:00:00Z',
    cliente: { id: 'C001', nombre: 'Juan Perez' },
    resultado: 'valido',
  },
  {
    id: '2',
    timestamp: '2025-09-27T10:05:30Z',
    cliente: { id: 'C002', nombre: 'Maria Lopez' },
    resultado: 'no_valido',
    detalle: 'Credenciales incorrectas',
  },
  {
    id: '3',
    timestamp: '2025-09-27T10:15:00Z',
    cliente: { id: 'C001', nombre: 'Juan Perez' },
    resultado: 'error',
    detalle: 'Fallo de sistema en autenticación',
  },
  {
    id: '4',
    timestamp: '2025-09-28T09:30:00Z',
    cliente: { id: 'C003', nombre: 'Carlos Garcia' },
    resultado: 'valido',
  },
  {
    id: '5',
    timestamp: '2025-09-28T09:45:10Z',
    cliente: { id: 'C002', nombre: 'Maria Lopez' },
    resultado: 'valido',
  },
  {
    id: '6',
    timestamp: '2025-09-28T11:00:00Z',
    cliente: { id: 'C004', nombre: 'Ana Fernandez' },
    resultado: 'no_valido',
    detalle: 'Usuario bloqueado',
  },
];

const mockEstadisticas: EstadisticasKiosko = {
  totalAccesos: 100,
  accesosValidos: 75,
  accesosNoValidos: 15,
  accesosError: 10,
  tasaExito: 75,
  tasaFallo: 25,
};

const mockAlertas: AlertaKiosko[] = [
  {
    id: 'A001',
    timestamp: '2025-09-28T12:00:00Z',
    tipo: 'abono_caducado',
    mensaje: 'Abono del cliente C005 ha caducado.',
    kioskoId: 'K001',
    resuelto: false,
  },
  {
    id: 'A002',
    timestamp: '2025-09-28T12:30:00Z',
    tipo: 'cliente_bloqueado',
    mensaje: 'Cliente C002 intentó acceder y está bloqueado.',
    kioskoId: 'K001',
    resuelto: false,
  },
  {
    id: 'A003',
    timestamp: '2025-09-27T15:00:00Z',
    tipo: 'error_critico',
    mensaje: 'Fallo de conexión con la base de datos.',
    kioskoId: 'K002',
    resuelto: true,
  },
];

export const fetchAccesosKiosko = async (
  fecha?: string,
  estado?: ResultadoAcceso
): Promise<AccesoKiosko[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredAccesos = mockAccesos;

      if (fecha) {
        filteredAccesos = filteredAccesos.filter((acceso) =>
          acceso.timestamp.startsWith(fecha)
        );
      }

      if (estado) {
        filteredAccesos = filteredAccesos.filter(
          (acceso) => acceso.resultado === estado
        );
      }

      resolve(filteredAccesos);
    }, 500); // Simulate network delay
  });
};

export const fetchEstadisticasKiosko = async (): Promise<EstadisticasKiosko> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEstadisticas);
    }, 500);
  });
};

export const fetchAlertasKiosko = async (): Promise<AlertaKiosko[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAlertas);
    }, 500);
  });
};
