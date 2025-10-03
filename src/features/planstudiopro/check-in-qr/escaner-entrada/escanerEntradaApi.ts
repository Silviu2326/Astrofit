interface ClienteInfo {
  nombre: string;
  membresia: string;
  estado: 'activo' | 'vencida';
}

interface EscaneoResultado {
  acceso: 'permitido' | 'denegado' | 'membresia-vencida';
  clienteInfo?: ClienteInfo;
}

const clientesSimulados: ClienteInfo[] = [
  { nombre: 'Alice Smith', membresia: 'Premium', estado: 'activo' },
  { nombre: 'Bob Johnson', membresia: 'Básica', estado: 'activo' },
  { nombre: 'Charlie Brown', membresia: 'Estándar', estado: 'vencida' },
  { nombre: 'Diana Prince', membresia: 'VIP', estado: 'activo' },
];

export const simularEscaneoQR = (): Promise<EscaneoResultado> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const random = Math.random();
      if (random < 0.7) { // 70% chance of valid QR
        const cliente = clientesSimulados[Math.floor(Math.random() * clientesSimulados.length)];
        if (cliente.estado === 'vencida') {
          resolve({ acceso: 'membresia-vencida', clienteInfo: cliente });
        } else {
          resolve({ acceso: 'permitido', clienteInfo: cliente });
        }
      } else if (random < 0.9) { // 20% chance of invalid QR
        resolve({ acceso: 'denegado' });
      } else { // 10% chance of unknown QR (also denied)
        resolve({ acceso: 'denegado' });
      }
    }, 1500); // Simulate network delay
  });
};
