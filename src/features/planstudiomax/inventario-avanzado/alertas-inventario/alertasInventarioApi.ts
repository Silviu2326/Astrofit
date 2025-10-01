interface AlertaInventario {
  id: string;
  producto: string;
  stockActual: number;
  stockMinimo: number;
  nivel: 'amarillo' | 'rojo';
  leida: boolean;
}

interface Notificacion {
  id: string;
  alertaId: string;
  tipo: 'push' | 'email';
  mensaje: string;
  fechaEnvio: string;
}

interface Escalamiento {
  id: string;
  alertaId: string;
  nivelEscalamiento: number;
  fechaEscalamiento: string;
  responsable: string;
}

const mockAlertas: AlertaInventario[] = [
  {
    id: '1',
    producto: 'Laptop Dell XPS 15',
    stockActual: 5,
    stockMinimo: 10,
    nivel: 'amarillo',
    leida: false,
  },
  {
    id: '2',
    producto: 'Monitor curvo Samsung',
    stockActual: 2,
    stockMinimo: 5,
    nivel: 'rojo',
    leida: false,
  },
  {
    id: '3',
    producto: 'Teclado mecánico Razer',
    stockActual: 12,
    stockMinimo: 15,
    nivel: 'amarillo',
    leida: true,
  },
];

const mockNotificaciones: Notificacion[] = [];
const mockEscalamientos: Escalamiento[] = [];

export const getAlertasInventario = (): Promise<AlertaInventario[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAlertas);
    }, 500);
  });
};

export const marcarAlertaLeida = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const alerta = mockAlertas.find((a) => a.id === id);
      if (alerta) {
        alerta.leida = true;
        resolve(true);
      } else {
        resolve(false);
      }
    }, 300);
  });
};

export const sendNotification = (alertaId: string, tipo: 'push' | 'email', mensaje: string): Promise<Notificacion> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newNotification: Notificacion = {
        id: `notif-${mockNotificaciones.length + 1}`,
        alertaId,
        tipo,
        mensaje,
        fechaEnvio: new Date().toISOString(),
      };
      mockNotificaciones.push(newNotification);
      resolve(newNotification);
    }, 300);
  });
};

export const escalateAlert = (alertaId: string, nivelEscalamiento: number, responsable: string): Promise<Escalamiento> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEscalamiento: Escalamiento = {
        id: `escal-${mockEscalamientos.length + 1}`,
        alertaId,
        nivelEscalamiento,
        fechaEscalamiento: new Date().toISOString(),
        responsable,
      };
      mockEscalamientos.push(newEscalamiento);
      resolve(newEscalamiento);
    }, 300);
  });
};
