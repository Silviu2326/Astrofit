import { PlaceholderImages } from '../../../../utils/placeholderImages';

export interface TarjetaSocio {
  id: string;
  clienteNombre: string;
  numeroTarjeta: string;
  estado: 'activo' | 'bloqueado' | 'vencido';
  fotoCliente: string;
  fechaEmision: string;
  fechaVencimiento: string;
  tipoTarjeta: 'basica' | 'premium' | 'vip';
}

export interface AccesoGimnasio {
  id: string;
  tarjetaId: string;
  fechaAcceso: string;
  horaEntrada: string;
  horaSalida?: string;
  tipoAcceso: 'entrada' | 'salida';
}

export interface Credencial {
  id: string;
  clienteNombre: string;
  numeroTarjeta: string;
  estado: 'activo' | 'bloqueado' | 'inactivo';
  fotoCliente: string;
}

const mockTarjetas: TarjetaSocio[] = [
  {
    id: '1',
    clienteNombre: 'Juan Pérez',
    numeroTarjeta: '1234-5678-9012-3456',
    estado: 'activo',
    fotoCliente: PlaceholderImages.avatar(40),
    fechaEmision: '2023-01-15',
    fechaVencimiento: '2024-01-15',
    tipoTarjeta: 'premium',
  },
  {
    id: '2',
    clienteNombre: 'María García',
    numeroTarjeta: '9876-5432-1098-7654',
    estado: 'bloqueado',
    fotoCliente: PlaceholderImages.avatar(40),
    fechaEmision: '2023-02-20',
    fechaVencimiento: '2024-02-20',
    tipoTarjeta: 'basica',
  },
  {
    id: '3',
    clienteNombre: 'Carlos López',
    numeroTarjeta: '4567-8901-2345-6789',
    estado: 'activo',
    fotoCliente: PlaceholderImages.avatar(40),
    fechaEmision: '2023-03-10',
    fechaVencimiento: '2024-03-10',
    tipoTarjeta: 'vip',
  },
  {
    id: '4',
    clienteNombre: 'Ana Martínez',
    numeroTarjeta: '7890-1234-5678-9012',
    estado: 'vencido',
    fotoCliente: PlaceholderImages.avatar(40),
    fechaEmision: '2022-12-01',
    fechaVencimiento: '2023-12-01',
    tipoTarjeta: 'premium',
  },
  {
    id: '5',
    clienteNombre: 'Pedro Sánchez',
    numeroTarjeta: '3456-7890-1234-5678',
    estado: 'activo',
    fotoCliente: PlaceholderImages.avatar(40),
    fechaEmision: '2023-04-05',
    fechaVencimiento: '2024-04-05',
    tipoTarjeta: 'basica',
  },
];

const mockAccesos: AccesoGimnasio[] = [
  {
    id: '1',
    tarjetaId: '1',
    fechaAcceso: '2024-01-15',
    horaEntrada: '08:30',
    horaSalida: '10:00',
    tipoAcceso: 'entrada',
  },
  {
    id: '2',
    tarjetaId: '2',
    fechaAcceso: '2024-01-15',
    horaEntrada: '18:00',
    tipoAcceso: 'entrada',
  },
];

export const fetchTarjetas = async (): Promise<TarjetaSocio[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTarjetas);
    }, 500);
  });
};

export const fetchTarjetaById = async (id: string): Promise<TarjetaSocio | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTarjetas.find(tarjeta => tarjeta.id === id));
    }, 500);
  });
};

export const fetchAccesos = async (tarjetaId?: string): Promise<AccesoGimnasio[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredAccesos = tarjetaId 
        ? mockAccesos.filter(acceso => acceso.tarjetaId === tarjetaId)
        : mockAccesos;
      resolve(filteredAccesos);
    }, 500);
  });
};

export const createTarjeta = async (tarjeta: Omit<TarjetaSocio, 'id'>): Promise<TarjetaSocio> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTarjeta: TarjetaSocio = {
        ...tarjeta,
        id: Date.now().toString(),
      };
      resolve(newTarjeta);
    }, 500);
  });
};

export const updateTarjeta = async (id: string, tarjeta: Partial<TarjetaSocio>): Promise<TarjetaSocio> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingTarjeta = mockTarjetas.find(t => t.id === id);
      if (existingTarjeta) {
        const updatedTarjeta = { ...existingTarjeta, ...tarjeta };
        resolve(updatedTarjeta);
      } else {
        reject(new Error('Tarjeta not found'));
      }
    }, 500);
  });
};

export const deleteTarjeta = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTarjetas.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTarjetas.splice(index, 1);
        resolve();
      } else {
        reject(new Error('Tarjeta not found'));
      }
    }, 500);
  });
};

export const bloquearTarjeta = async (id: string): Promise<TarjetaSocio> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tarjeta = mockTarjetas.find(t => t.id === id);
      if (tarjeta) {
        tarjeta.estado = 'bloqueado';
        resolve(tarjeta);
      } else {
        reject(new Error('Tarjeta not found'));
      }
    }, 500);
  });
};

export const desbloquearTarjeta = async (id: string): Promise<TarjetaSocio> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tarjeta = mockTarjetas.find(t => t.id === id);
      if (tarjeta) {
        tarjeta.estado = 'activo';
        resolve(tarjeta);
      } else {
        reject(new Error('Tarjeta not found'));
      }
    }, 500);
  });
};

export const registrarAcceso = async (tarjetaId: string, tipoAcceso: 'entrada' | 'salida'): Promise<AccesoGimnasio> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const acceso: AccesoGimnasio = {
        id: Date.now().toString(),
        tarjetaId,
        fechaAcceso: new Date().toISOString().split('T')[0],
        horaEntrada: new Date().toTimeString().split(' ')[0].substring(0, 5),
        tipoAcceso,
      };
      resolve(acceso);
    }, 500);
  });
};

export const getCredenciales = async (searchTerm?: string): Promise<Credencial[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Convert TarjetaSocio to Credencial format
      const credenciales: Credencial[] = mockTarjetas.map(tarjeta => ({
        id: tarjeta.id,
        clienteNombre: tarjeta.clienteNombre,
        numeroTarjeta: tarjeta.numeroTarjeta,
        estado: tarjeta.estado === 'vencido' ? 'inactivo' : tarjeta.estado,
        fotoCliente: tarjeta.fotoCliente,
      }));

      // Filter by search term if provided
      const filteredCredenciales = searchTerm
        ? credenciales.filter(credencial =>
            credencial.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            credencial.numeroTarjeta.includes(searchTerm)
          )
        : credenciales;

      resolve(filteredCredenciales);
    }, 500);
  });
};