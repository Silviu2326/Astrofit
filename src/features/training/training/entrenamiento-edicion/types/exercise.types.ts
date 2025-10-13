export type MovementPattern = 'push' | 'pull' | 'squat' | 'hinge' | 'carry' | 'rotation' | 'isolation';
export type MovementPlane = 'sagittal' | 'frontal' | 'transverse' | 'multi';
export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface ExerciseLibraryEntry {
  id: string;
  name: string;
  nameEnglish?: string;

  // Clasificación muscular
  primaryMuscle: string;
  secondaryMuscles: string[];
  muscleGroups: string[];

  // Clasificación de movimiento
  movement: MovementPattern;
  plane: MovementPlane;

  // Equipamiento
  equipment: string[];
  equipmentAlternatives?: string[];

  // Medios visuales
  image: string;
  videoUrl?: string;
  tutorialLink?: string;

  // Dificultad y nivel
  difficulty: DifficultyLevel;
  recommendedFor: ('beginner' | 'intermediate' | 'advanced')[];

  // Contraindicaciones
  contraindications: string[]; // ["Lesión de hombro", "Dolor lumbar", "Hipertensión severa"]
  avoidWithInjuries: string[]; // ["Rodilla", "Hombro"]

  // Progresiones
  progression?: string; // ID del ejercicio más difícil
  regression?: string; // ID del ejercicio más fácil

  // Tags para búsqueda
  tags: string[]; // ["unilateral", "estabilidad", "explosivo", "core"]

  // Información adicional
  instructions?: string[];
  commonMistakes?: string[];
  tips?: string[];

  // Alternativas sugeridas
  alternatives?: string[]; // IDs de ejercicios similares
}

export interface ExerciseSubstitution {
  originalExercise: ExerciseLibraryEntry;
  alternatives: Array<{
    exercise: ExerciseLibraryEntry;
    similarity: number; // 0-100%
    reason: string;
    equipmentNeeded: string[];
    difficulty: 'easier' | 'same' | 'harder';
    matchScore: number; // Para ordenar
  }>;
}
