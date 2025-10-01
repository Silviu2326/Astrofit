
export interface Protocolo {
  id: string;
  nombre: string;
  descripcion: string;
  explicacion: string;
}

export interface ResumenInvestigacion {
  id: string;
  titulo: string;
  frasesClave: string[];
}

export interface RecomendacionSegura {
  id: string;
  problema: string;
  alternativaSegura: string;
  baseCientifica: string;
}

export interface ArticuloBiblioteca {
  id: string;
  titulo: string;
  descripcion: string;
  link: string;
}

// Mock Data
export const mockProtocolos: Protocolo[] = [
  {
    id: '1',
    nombre: 'Rutina de Fuerza Híbrida',
    descripcion: 'Combina entrenamiento de fuerza con acondicionamiento metabólico.',
    explicacion: 'Esta rutina optimiza la ganancia de fuerza y mejora la capacidad cardiovascular, basándose en estudios que demuestran la eficacia de la periodización concurrente para atletas recreativos.'
  },
  {
    id: '2',
    nombre: 'Protocolo de Hipertrofia Basado en RIR',
    descripcion: 'Entrenamiento de volumen moderado con enfoque en la proximidad al fallo.',
    explicacion: 'La evidencia sugiere que entrenar con 1-3 RIR (Repeticiones en Reserva) es óptimo para la hipertrofia, maximizando el estímulo sin acumular fatiga excesiva.'
  },
];

export const mockResumenesInvestigacion: ResumenInvestigacion[] = [
  {
    id: '1',
    titulo: 'Lo último sobre HIIT y pérdida de grasa',
    frasesClave: [
      'El HIIT es efectivo para la pérdida de grasa visceral.',
      'Puede mejorar la sensibilidad a la insulina en menos tiempo que el cardio tradicional.',
      'La adherencia es clave, y la variedad de protocolos HIIT es amplia.'
    ]
  },
  {
    id: '2',
    titulo: 'Impacto del sueño en la recuperación muscular',
    frasesClave: [
      'La privación del sueño afecta negativamente la síntesis de proteínas musculares.',
      'Un sueño adecuado (7-9 horas) es crucial para la recuperación hormonal.',
      'Optimizar el entorno de sueño puede mejorar el rendimiento y la adaptación.'
    ]
  },
];

export const mockRecomendacionesSeguras: RecomendacionSegura[] = [
  {
    id: '1',
    problema: 'Dolor lumbar al hacer sentadilla trasera (Back Squat)',
    alternativaSegura: 'Usar sentadilla búlgara (Split Squat) o sentadilla frontal (Front Squat).',
    baseCientifica: 'Estas alternativas reducen la carga axial sobre la columna lumbar y pueden ser más seguras para individuos con ciertas limitaciones, manteniendo un estímulo efectivo para las piernas.'
  },
  {
    id: '2',
    problema: 'Dolor de hombro en press de banca con barra',
    alternativaSegura: 'Realizar press de banca con mancuernas o press de banca con agarre neutro.',
    baseCientifica: 'Las mancuernas permiten un rango de movimiento más natural y una rotación externa del hombro, lo que puede aliviar la tensión en la articulación glenohumeral.'
  },
];

export const mockArticulosBiblioteca: ArticuloBiblioteca[] = [
  {
    id: '1',
    titulo: 'Guía completa de la periodización del entrenamiento',
    descripcion: 'Un recurso esencial para entender cómo estructurar tu entrenamiento a largo plazo.',
    link: 'https://ejemplo.com/periodizacion-guia'
  },
  {
    id: '2',
    titulo: 'Mitos y verdades sobre la suplementación deportiva',
    descripcion: 'Desmontando creencias populares con evidencia científica.',
    link: 'https://ejemplo.com/suplementacion-mitos'
  },
];

// Simulate API calls
export const fetchProtocolos = async (): Promise<Protocolo[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockProtocolos), 500));
};

export const fetchResumenesInvestigacion = async (): Promise<ResumenInvestigacion[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockResumenesInvestigacion), 500));
};

export const fetchRecomendacionesSeguras = async (): Promise<RecomendacionSegura[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockRecomendacionesSeguras), 500));
};

export const fetchArticulosBiblioteca = async (): Promise<ArticuloBiblioteca[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockArticulosBiblioteca), 500));
};
