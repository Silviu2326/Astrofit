export interface Client360Data {
  entrenamiento: {
    tipo: string;
    frecuencia: string;
    progreso: string;
  };
  dieta: {
    tipo: string;
    calorias: number;
    macronutrientes: string;
  };
  habitos: {
    sueno: string;
    hidratacion: string;
    estres: string;
  };
  progresoGeneral: {
    peso: string;
    medidas: string;
    rendimiento: string;
  };
}

export interface Recommendation {
  id: string;
  ajuste: string;
  categoria: string;
  impactoEstimado: string;
}

export interface Priority {
  id: string;
  accion: string;
  razon: string;
  impacto: string;
}

export interface EstimatedImpact {
  mejoraEsperada: string;
  tiempoEstimado: string;
  metricasClave: string[];
}

// Mock API functions
const simulateNetworkDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchClient360Data = async (): Promise<Client360Data> => {
  await simulateNetworkDelay(500);
  return {
    entrenamiento: {
      tipo: 'Fuerza y Cardio',
      frecuencia: '5 días/semana',
      progreso: 'Aumento de 10% en levantamiento de pesas',
    },
    dieta: {
      tipo: 'Flexible',
      calorias: 2500,
      macronutrientes: '40% Carbs, 30% Proteína, 30% Grasas',
    },
    habitos: {
      sueno: '7-8 horas/noche',
      hidratacion: '3 litros/día',
      estres: 'Bajo',
    },
    progresoGeneral: {
      peso: '-2 kg en el último mes',
      medidas: 'Reducción de 2cm cintura',
      rendimiento: 'Mejora en resistencia cardiovascular',
    },
  };
};

export const fetchWeeklyRecommendations = async (): Promise<Recommendation[]> => {
  await simulateNetworkDelay(700);
  return [
    {
      id: 'rec1',
      ajuste: '+200 kcal en días de entreno (añadir carbohidratos)',
      categoria: 'Dieta',
      impactoEstimado: 'Aumento de energía y recuperación',
    },
    {
      id: 'rec2',
      ajuste: 'Añadir 10 minutos de movilidad en calentamiento',
      categoria: 'Entrenamiento',
      impactoEstimado: 'Mejora de flexibilidad y prevención de lesiones',
    },
    {
      id: 'rec3',
      ajuste: 'Incrementar ingesta de agua a 3.5 litros/día',
      categoria: 'Hábitos',
      impactoEstimado: 'Mejor hidratación y rendimiento',
    },
    {
      id: 'rec4',
      ajuste: 'Realizar 15 minutos de meditación antes de dormir',
      categoria: 'Hábitos',
      impactoEstimado: 'Reducción de estrés y mejora del sueño',
    },
    {
      id: 'rec5',
      ajuste: 'Aumentar repeticiones en ejercicios de pierna en un 10%',
      categoria: 'Entrenamiento',
      impactoEstimado: 'Mayor desarrollo muscular en piernas',
    },
  ];
};

export const fetchIntelligentPriorities = async (): Promise<Priority[]> => {
  await simulateNetworkDelay(600);
  return [
    {
      id: 'prio1',
      accion: 'Ajustar dieta para superávit calórico en días de entreno',
      razon: 'Optimizar recuperación y crecimiento muscular',
      impacto: 'Rápido y significativo',
    },
    {
      id: 'prio2',
      accion: 'Implementar rutina de movilidad diaria',
      razon: 'Prevenir lesiones y mejorar rango de movimiento',
      impacto: 'Medio plazo, alta prevención',
    },
    {
      id: 'prio3',
      accion: 'Monitorizar calidad del sueño con app',
      razon: 'Identificar patrones y mejorar descanso',
      impacto: 'Largo plazo, mejora continua',
    },
  ];
};

export const fetchEstimatedImpact = async (): Promise<EstimatedImpact> => {
  await simulateNetworkDelay(400);
  return {
    mejoraEsperada: '15% de aumento en fuerza y 5% de reducción de grasa corporal',
    tiempoEstimado: '3 meses',
    metricasClave: ['Fuerza (kg)', 'Porcentaje de Grasa Corporal', 'Nivel de Energía'],
  };
};
