import { Cliente, Metrica, Progreso, Insight } from './types';

// Datos mock de clientes
const mockClientes: Cliente[] = [
  {
    id: '1',
    nombre: 'Ana Garc??a',
    email: 'ana.garcia@example.com',
    lastActivity: '2025-09-25',
    progreso: {
      peso: [{ date: '2025-08-01', value: 70 }, { date: '2025-09-01', value: 69 }, { date: '2025-09-20', value: 69.5 }],
      perimetroCintura: [{ date: '2025-08-01', value: 80 }, { date: '2025-09-01', value: 79 }, { date: '2025-09-20', value: 79.2 }],
      entrenosCompletados: [{ date: '2025-09-01', value: 12 }, { date: '2025-09-20', value: 8 }],
      adherenciaNutricional: [{ date: '2025-09-01', value: 90 }, { date: '2025-09-20', value: 85 }],
    },
  },
  {
    id: '2',
    nombre: 'Luis Fern??ndez',
    email: 'luis.fernandez@example.com',
    lastActivity: '2025-09-10',
    progreso: {
      peso: [{ date: '2025-08-01', value: 85 }, { date: '2025-09-01', value: 84 }, { date: '2025-09-20', value: 84 }],
      perimetroCintura: [{ date: '2025-08-01', value: 95 }, { date: '2025-09-01', value: 94 }, { date: '2025-09-20', value: 94 }],
      entrenosCompletados: [{ date: '2025-09-01', value: 10 }, { date: '2025-09-20', value: 5 }],
      adherenciaNutricional: [{ date: '2025-09-01', value: 70 }, { date: '2025-09-20', value: 65 }],
    },
  },
  {
    id: '3',
    nombre: 'Marta P??rez',
    email: 'marta.perez@example.com',
    lastActivity: '2025-09-27',
    progreso: {
      peso: [{ date: '2025-08-01', value: 60 }, { date: '2025-09-01', value: 59 }, { date: '2025-09-20', value: 58.5 }],
      perimetroCintura: [{ date: '2025-08-01', value: 70 }, { date: '2025-09-01', value: 69 }, { date: '2025-09-20', value: 68 }],
      entrenosCompletados: [{ date: '2025-09-01', value: 15 }, { date: '2025-09-20', value: 10 }],
      adherenciaNutricional: [{ date: '2025-09-01', value: 95 }, { date: '2025-09-20', value: 98 }],
    },
  },
];

// Definiciones de tipos
export interface Cliente {
  id: string;
  nombre: string;
  email: string;
  lastActivity: string;
  progreso: {
    peso: Metrica[];
    perimetroCintura: Metrica[];
    entrenosCompletados: Metrica[];
    adherenciaNutricional: Metrica[];
  };
}

export interface Metrica {
  date: string;
  value: number;
}

export interface ProgresoData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

export interface Insight {
  id: string;
  clienteId: string;
  tipo: 'calorico' | 'descanso' | 'entrenamiento';
  recomendacion: string;
  fechaGeneracion: string;
}

// Simulaci??n de llamadas a la API
export const agenteProgresoApi = {
  getClientes: (): Promise<Cliente[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockClientes), 500);
    });
  },

  getProgresoCliente: (clienteId: string): Promise<Progreso | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cliente = mockClientes.find((c) => c.id === clienteId);
        resolve(cliente?.progreso);
      }, 500);
    });
  },

  getInsightsCliente: (clienteId: string): Promise<Insight[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const insights: Insight[] = [
          {
            id: 'i1',
            clienteId: '1',
            tipo: 'calorico',
            recomendacion: 'Sugerir ajuste cal??rico: Reducir 200 kcal diarias para optimizar la p??rdida de peso.',
            fechaGeneracion: '2025-09-26',
          },
          {
            id: 'i2',
            clienteId: '1',
            tipo: 'descanso',
            recomendacion: 'Proponer descanso activo: Incluir 2 d??as de caminata ligera a la semana.',
            fechaGeneracion: '2025-09-26',
          },
          {
            id: 'i3',
            clienteId: '2',
            tipo: 'entrenamiento',
            recomendacion: 'Revisar rutina de entrenamiento: Aumentar la intensidad en ejercicios de fuerza.',
            fechaGeneracion: '2025-09-25',
          },
        ];
        resolve(insights.filter(i => i.clienteId === clienteId));
      }, 500);
    });
  },

  generarInformeCliente: (clienteId: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cliente = mockClientes.find((c) => c.id === clienteId);
        if (cliente) {
          const ultimoPeso = cliente.progreso.peso[cliente.progreso.peso.length - 1]?.value || 'N/A';
          const ultimoPerimetro = cliente.progreso.perimetroCintura[cliente.progreso.perimetroCintura.length - 1]?.value || 'N/A';
          const entrenosMes = cliente.progreso.entrenosCompletados[cliente.progreso.entrenosCompletados.length - 1]?.value || 'N/A';
          const adherenciaMes = cliente.progreso.adherenciaNutricional[cliente.progreso.adherenciaNutricional.length - 1]?.value || 'N/A';

          const informe = `
            **Informe de Progreso para ${cliente.nombre}**

            Hola ${cliente.nombre},

            Aqu?? tienes un resumen de tu progreso reciente:

            - **Peso actual:** ${ultimoPeso} kg
            - **Per??metro de cintura:** ${ultimoPerimetro} cm
            - **Entrenamientos completados este mes:** ${entrenosMes}
            - **Adherencia nutricional:** ${adherenciaMes}%

            ??Sigue as??! Estamos aqu?? para apoyarte en cada paso.
          `;
          resolve(informe);
        } else {
          resolve('Cliente no encontrado.');
        }
      }, 500);
    });
  },
};
