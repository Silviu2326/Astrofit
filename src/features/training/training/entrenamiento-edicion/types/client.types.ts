export type InjurySeverity = 'leve' | 'moderada' | 'grave';
export type FitnessLevel = 1 | 2 | 3 | 4 | 5;
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type TrainingLocation = 'gym' | 'home' | 'hybrid';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export interface Injury {
  id: string;
  bodyPart: string;
  description: string;
  severity: InjurySeverity;
  restrictions: string[]; // IDs de ejercicios a evitar
  date: string;
  isActive: boolean;
}

export interface PhysicalMetrics {
  weight: number; // kg
  height: number; // cm
  bodyFat?: number; // porcentaje
  measurements?: {
    chest?: number; // cm
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
  };
  lastUpdated: string;
}

export interface FitnessAssessment {
  cardiovascular: FitnessLevel;
  strength: FitnessLevel;
  flexibility: FitnessLevel;
  experience: ExperienceLevel;
  assessmentDate: string;
}

export interface Availability {
  daysPerWeek: number;
  timePerSession: number; // minutos
  preferredDays: string[]; // ['L', 'M', 'V']
  timeOfDay: TimeOfDay;
}

export interface ClientProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;

  // Información médica y física
  injuries: Injury[];
  healthConditions: string[]; // ["Hipertensión", "Diabetes tipo 2"]
  medications?: string[];

  // Métricas físicas
  physicalMetrics: PhysicalMetrics;

  // Nivel de fitness
  fitnessLevel: FitnessAssessment;

  // Disponibilidad
  availability: Availability;

  // Equipamiento y ubicación
  equipment: string[]; // ["Barra", "Mancuernas", "Rack"]
  location: TrainingLocation;

  // Objetivos y notas
  goals: string[];
  preferences?: string[];
  trainerNotes?: string;

  // Metadata
  joinDate: string;
  lastSession?: string;
  status: 'active' | 'inactive' | 'paused';
}
