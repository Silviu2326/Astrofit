export interface SessionNotes {
  sessionId: string;
  date: string;

  // Notas del entrenador
  trainerNotes: {
    preSession?: string; // Notas antes de la sesión
    postSession?: string; // Notas después de la sesión
    adjustments?: string; // Ajustes realizados durante la sesión
  };

  // Feedback del cliente
  clientFeedback?: {
    difficulty: number; // 1-10
    enjoyment: number; // 1-10
    energy: number; // 1-10
    sleepQuality?: number; // 1-10
    stress?: number; // 1-10
    soreness?: number; // 1-10
    painAreas?: string[];
    comments?: string;
  };

  // Recordatorios
  reminders?: string[];

  // Metadata
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseNotes {
  exerciseId: string;
  sessionId: string;

  // Notas específicas del ejercicio
  trainerNote?: string;
  techniqueNote?: string;

  // Ejecución
  completed: boolean;
  completedSets: number;

  // Si no se completó
  substituted?: boolean;
  substitutedWith?: string; // ID del ejercicio sustituto
  reason?: string; // "Dolor", "Fatiga", "Sin equipo"

  // Registro de series
  setsLog?: Array<{
    setNumber: number;
    reps: number;
    weight: number;
    rpe: number;
    rest: number;
    notes?: string;
  }>;
}

export interface ClientSessionView {
  sessionId: string;
  clientId: string;
  planId: string;
  date: string;

  // Información de la sesión
  name: string;
  focus: string;
  estimatedDuration: number;

  // Ejercicios
  exercises: Array<{
    id: string;
    exerciseId: string;
    order: number;
    name: string;
    image: string;
    videoUrl?: string;

    // Prescripción
    sets: number;
    reps: string;
    rest: number;
    weight?: number;
    tempo?: string;
    rpe?: number;

    // Notas del entrenador
    notes?: string;
    tips?: string[];

    // Estado
    completed: boolean;
    currentSet: number;

    // Registro en tiempo real
    completedSets: Array<{
      reps: number;
      weight: number;
      rpe: number;
      timestamp: string;
    }>;

    // Agrupación
    groupType?: 'normal' | 'superset' | 'circuit' | 'cluster';
    groupId?: string;
  }>;

  // Estado de la sesión
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped';
  startedAt?: string;
  completedAt?: string;

  // Feedback post-sesión
  feedback?: SessionNotes['clientFeedback'];
}
