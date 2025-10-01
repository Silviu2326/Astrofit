export interface Torno {
  id: string;
  name: string;
  status: 'activo' | 'inactivo' | 'mantenimiento';
}

const tornos: Torno[] = [
  { id: '1', name: 'Torno Principal Entrada', status: 'activo' },
  { id: '2', name: 'Torno Secundario Entrada', status: 'inactivo' },
  { id: '3', name: 'Torno Principal Salida', status: 'activo' },
  { id: '4', name: 'Torno Secundario Salida', status: 'mantenimiento' },
];

export const getTornos = (): Promise<Torno[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(tornos), 500);
  });
};

export const updateTornoStatus = (id: string, status: Torno['status']): Promise<Torno> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const tornoIndex = tornos.findIndex((t) => t.id === id);
      if (tornoIndex > -1) {
        tornos[tornoIndex] = { ...tornos[tornoIndex], status };
        resolve(tornos[tornoIndex]);
      } else {
        reject(new Error('Torno no encontrado'));
      }
    }, 500);
  });
};

// Nuevos endpoints para control avanzado

export const configureSchedules = (tornoId: string, schedules: any): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log(`Configurando horarios para torno ${tornoId}:`, schedules);
    setTimeout(() => resolve(true), 500);
  });
};

export const getRealtimeStatus = (tornoId: string): Promise<any> => {
  return new Promise((resolve) => {
    console.log(`Obteniendo estado en tiempo real para torno ${tornoId}`);
    setTimeout(() => resolve({ status: 'activo', lastAccess: new Date().toISOString() }), 500);
  });
};

export const getSecurityAlerts = (): Promise<any[]> => {
  return new Promise((resolve) => {
    console.log('Obteniendo alertas de seguridad');
    setTimeout(() => resolve([
      { id: '1', type: 'Acceso no autorizado', timestamp: new Date().toISOString() },
      { id: '2', type: 'Fallo de sensor', timestamp: new Date().toISOString() },
    ]), 500);
  });
};

export const remoteControlDoor = (tornoId: string, action: 'open' | 'close'): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log(`Control remoto de puerta para torno ${tornoId}: ${action}`);
    setTimeout(() => resolve(true), 500);
  });
};

export const getEventLog = (): Promise<any[]> => {
  return new Promise((resolve) => {
    console.log('Obteniendo registro de eventos');
    setTimeout(() => resolve([
      { id: '1', event: 'Puerta abierta', timestamp: new Date().toISOString() },
      { id: '2', event: 'Acceso concedido', timestamp: new Date().toISOString() },
    ]), 500);
  });
};

export const configureSpecialAccess = (tornoId: string, accessConfig: any): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log(`Configurando acceso especial para torno ${tornoId}:`, accessConfig);
    setTimeout(() => resolve(true), 500);
  });
};

export const getUsageStatistics = (tornoId: string): Promise<any> => {
  return new Promise((resolve) => {
    console.log(`Obteniendo estadísticas de uso para torno ${tornoId}`);
    setTimeout(() => resolve({ totalAccesses: 150, uniqueUsers: 75, lastHour: 10 }), 500);
  });
};
