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

export interface Progreso {
  peso: Metrica[];
  perimetroCintura: Metrica[];
  entrenosCompletados: Metrica[];
  adherenciaNutricional: Metrica[];
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
