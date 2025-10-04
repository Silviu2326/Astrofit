export interface Sede {
  id: string;
  nombre: string;
  direccion: string;
  responsable: string;
  estado: 'abierto' | 'cerrado' | 'mantenimiento';
  contacto: {
    telefono: string;
    email: string;
  };
  aforoActual?: number;
  aforoMaximo?: number;
  ocupacionPorcentaje?: number;
}

export interface SedeMetrics {
  id: string;
  aforoActual: number;
  aforoMaximo: number;
  ocupacionPorcentaje: number;
  incidenciasAbiertas: number;
  mantenimientosPendientes: number;
}

export interface UpdateSedePayload {
  nombre?: string;
  direccion?: string;
  responsable?: string;
  estado?: 'abierto' | 'cerrado' | 'mantenimiento';
  contacto?: {
    telefono?: string;
    email?: string;
  };
}

const mockSedes: Sede[] = [
  {
    id: '1',
    nombre: 'Sede Central Madrid',
    direccion: 'Calle Mayor 1, Madrid',
    responsable: 'Ana García',
    estado: 'abierto',
    contacto: {
      telefono: '912345678',
      email: 'madrid@example.com',
    },
    aforoActual: 150,
    aforoMaximo: 200,
    ocupacionPorcentaje: 75,
  },
  {
    id: '2',
    nombre: 'Sede Barcelona Eixample',
    direccion: 'Passeig de Gràcia 123, Barcelona',
    responsable: 'Carlos Ruiz',
    estado: 'cerrado',
    contacto: {
      telefono: '931234567',
      email: 'barcelona@example.com',
    },
    aforoActual: 0,
    aforoMaximo: 180,
    ocupacionPorcentaje: 0,
  },
  {
    id: '3',
    nombre: 'Sede Valencia Centro',
    direccion: 'Plaza del Ayuntamiento 5, Valencia',
    responsable: 'Laura Pérez',
    estado: 'mantenimiento',
    contacto: {
      telefono: '961234567',
      email: 'valencia@example.com',
    },
    aforoActual: 20,
    aforoMaximo: 100,
    ocupacionPorcentaje: 20,
  },
  {
    id: '4',
    nombre: 'Sede Sevilla Triana',
    direccion: 'Calle Betis 20, Sevilla',
    responsable: 'Miguel Ángel Jiménez',
    estado: 'abierto',
    contacto: {
      telefono: '951234567',
      email: 'sevilla@example.com',
    },
    aforoActual: 80,
    aforoMaximo: 120,
    ocupacionPorcentaje: 66,
  },
];

const mockSedeMetrics: { [key: string]: SedeMetrics } = {
  '1': {
    id: '1',
    aforoActual: 150,
    aforoMaximo: 200,
    ocupacionPorcentaje: 75,
    incidenciasAbiertas: 2,
    mantenimientosPendientes: 1,
  },
  '2': {
    id: '2',
    aforoActual: 0,
    aforoMaximo: 180,
    ocupacionPorcentaje: 0,
    incidenciasAbiertas: 0,
    mantenimientosPendientes: 3,
  },
  '3': {
    id: '3',
    aforoActual: 20,
    aforoMaximo: 100,
    ocupacionPorcentaje: 20,
    incidenciasAbiertas: 1,
    mantenimientosPendientes: 2,
  },
  '4': {
    id: '4',
    aforoActual: 80,
    aforoMaximo: 120,
    ocupacionPorcentaje: 66,
    incidenciasAbiertas: 0,
    mantenimientosPendientes: 0,
  },
};

export const fetchSedes = (): Promise<Sede[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSedes);
    }, 500);
  });
};

export const fetchSedeMetrics = (sedeId: string): Promise<SedeMetrics> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const metrics = mockSedeMetrics[sedeId];
      if (metrics) {
        resolve(metrics);
      } else {
        reject(new Error('Métricas de sede no encontradas.'));
      }
    }, 500);
  });
};

export const updateSede = (sedeId: string, payload: UpdateSedePayload): Promise<Sede> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sedeIndex = mockSedes.findIndex(sede => sede.id === sedeId);
      if (sedeIndex > -1) {
        mockSedes[sedeIndex] = { ...mockSedes[sedeIndex], ...payload };
        resolve(mockSedes[sedeIndex]);
      } else {
        reject(new Error('Sede no encontrada para actualizar.'));
      }
    }, 500);
  });
};

export const toggleSedeStatus = (sedeId: string, status: 'abierto' | 'cerrado' | 'mantenimiento'): Promise<Sede> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sedeIndex = mockSedes.findIndex(sede => sede.id === sedeId);
      if (sedeIndex > -1) {
        mockSedes[sedeIndex].estado = status;
        resolve(mockSedes[sedeIndex]);
      } else {
        reject(new Error('Sede no encontrada para cambiar estado.'));
      }
    }, 500);
  });
};
