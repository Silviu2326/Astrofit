import { TrainingDay, Exercise } from '../types/training.types';

export interface VolumeStats {
  totalSets: number;
  totalReps: number;
  totalVolume: number; // kg total (peso × reps × series)
  byMuscleGroup: Record<string, MuscleVolume>;
  volumeLandmarks: VolumeLandmarks;
  warnings: VolumeWarning[];
}

export interface MuscleVolume {
  sets: number;
  reps: number;
  volume: number; // kg
  exercises: number;
  status: 'low' | 'optimal' | 'high' | 'excessive';
}

export interface VolumeLandmarks {
  // MEV (Minimum Effective Volume): Mínimo para crecimiento
  // MAV (Maximum Adaptive Volume): Óptimo para crecimiento
  // MRV (Maximum Recoverable Volume): Máximo antes de sobreentreno
  mev: number;
  mav: number;
  mrv: number;
  current: number;
  percentage: number; // % del MAV
  status: 'below-mev' | 'mev-to-mav' | 'mav-to-mrv' | 'above-mrv';
}

export interface VolumeWarning {
  type: 'excessive' | 'insufficient' | 'imbalance' | 'recovery';
  severity: 'low' | 'medium' | 'high';
  muscleGroup: string;
  message: string;
  recommendation: string;
}

/**
 * Volúmenes de referencia por grupo muscular (series por semana)
 * Basado en investigación de Dr. Mike Israetel
 */
const VOLUME_LANDMARKS_BY_MUSCLE: Record<
  string,
  { mev: number; mav: number; mrv: number }
> = {
  // Pecho
  Pecho: { mev: 10, mav: 16, mrv: 22 },
  'Pecho Superior': { mev: 6, mav: 10, mrv: 14 },
  'Pecho Inferior': { mev: 6, mav: 10, mrv: 14 },

  // Espalda
  Espalda: { mev: 12, mav: 18, mrv: 25 },
  Dorsales: { mev: 8, mav: 12, mrv: 18 },
  'Espalda Media': { mev: 8, mav: 12, mrv: 18 },
  Trapecios: { mev: 8, mav: 12, mrv: 20 },

  // Piernas
  Cuádriceps: { mev: 12, mav: 18, mrv: 25 },
  Isquiotibiales: { mev: 10, mav: 14, mrv: 20 },
  Glúteos: { mev: 10, mav: 16, mrv: 22 },
  Gemelos: { mev: 12, mav: 16, mrv: 25 },

  // Hombros
  Hombros: { mev: 12, mav: 18, mrv: 26 },
  'Deltoides Anterior': { mev: 6, mav: 10, mrv: 14 },
  'Deltoides Lateral': { mev: 8, mav: 12, mrv: 16 },
  'Deltoides Posterior': { mev: 8, mav: 12, mrv: 16 },

  // Brazos
  Bíceps: { mev: 8, mav: 14, mrv: 20 },
  Tríceps: { mev: 10, mav: 14, mrv: 20 },
  Antebrazos: { mev: 8, mav: 12, mrv: 18 },

  // Core
  Abdominales: { mev: 12, mav: 20, mrv: 30 },
  Oblicuos: { mev: 8, mav: 12, mrv: 18 },
};

/**
 * Normaliza nombres de grupos musculares
 */
const normalizeMuscleGroup = (muscle: string): string => {
  const normalized = muscle.toLowerCase().trim();

  // Mapeo de sinónimos
  const synonyms: Record<string, string> = {
    pectoral: 'Pecho',
    'pecho alto': 'Pecho Superior',
    'pecho bajo': 'Pecho Inferior',
    dorsal: 'Dorsales',
    'espalda alta': 'Trapecios',
    'espalda baja': 'Espalda Media',
    cuadriceps: 'Cuádriceps',
    'cuádriceps': 'Cuádriceps',
    femoral: 'Isquiotibiales',
    isquios: 'Isquiotibiales',
    gluteo: 'Glúteos',
    glúteo: 'Glúteos',
    pantorrillas: 'Gemelos',
    deltoides: 'Hombros',
    hombro: 'Hombros',
    biceps: 'Bíceps',
    bíceps: 'Bíceps',
    triceps: 'Tríceps',
    tríceps: 'Tríceps',
    abs: 'Abdominales',
    core: 'Abdominales',
  };

  return synonyms[normalized] || muscle;
};

/**
 * Calcula volumen total de un ejercicio
 */
const calculateExerciseVolume = (exercise: Exercise): number => {
  if (!exercise.weight) return 0;
  return exercise.weight * exercise.reps * exercise.sets;
};

/**
 * Calcula volumen por grupo muscular
 */
export const calculateVolumeByMuscle = (
  trainingDays: TrainingDay[]
): Record<string, MuscleVolume> => {
  const volumeByMuscle: Record<string, MuscleVolume> = {};

  trainingDays.forEach((day) => {
    day.exercises.forEach((exercise) => {
      exercise.muscleGroups.forEach((muscle) => {
        const normalizedMuscle = normalizeMuscleGroup(muscle);

        if (!volumeByMuscle[normalizedMuscle]) {
          volumeByMuscle[normalizedMuscle] = {
            sets: 0,
            reps: 0,
            volume: 0,
            exercises: 0,
            status: 'optimal',
          };
        }

        volumeByMuscle[normalizedMuscle].sets += exercise.sets;
        volumeByMuscle[normalizedMuscle].reps += exercise.reps * exercise.sets;
        volumeByMuscle[normalizedMuscle].volume += calculateExerciseVolume(exercise);
        volumeByMuscle[normalizedMuscle].exercises += 1;
      });
    });
  });

  // Determinar estado de cada músculo
  Object.entries(volumeByMuscle).forEach(([muscle, data]) => {
    const landmarks = VOLUME_LANDMARKS_BY_MUSCLE[muscle];
    if (landmarks) {
      if (data.sets < landmarks.mev) {
        data.status = 'low';
      } else if (data.sets <= landmarks.mav) {
        data.status = 'optimal';
      } else if (data.sets <= landmarks.mrv) {
        data.status = 'high';
      } else {
        data.status = 'excessive';
      }
    }
  });

  return volumeByMuscle;
};

/**
 * Calcula landmarks de volumen total
 */
export const calculateVolumeLandmarks = (
  volumeByMuscle: Record<string, MuscleVolume>
): VolumeLandmarks => {
  let mev = 0;
  let mav = 0;
  let mrv = 0;
  let current = 0;

  Object.entries(volumeByMuscle).forEach(([muscle, data]) => {
    const landmarks = VOLUME_LANDMARKS_BY_MUSCLE[muscle];
    if (landmarks) {
      mev += landmarks.mev;
      mav += landmarks.mav;
      mrv += landmarks.mrv;
      current += data.sets;
    }
  });

  const percentage = mav > 0 ? (current / mav) * 100 : 0;

  let status: VolumeLandmarks['status'];
  if (current < mev) {
    status = 'below-mev';
  } else if (current <= mav) {
    status = 'mev-to-mav';
  } else if (current <= mrv) {
    status = 'mav-to-mrv';
  } else {
    status = 'above-mrv';
  }

  return { mev, mav, mrv, current, percentage, status };
};

/**
 * Genera advertencias de volumen
 */
export const generateVolumeWarnings = (
  volumeByMuscle: Record<string, MuscleVolume>,
  landmarks: VolumeLandmarks
): VolumeWarning[] => {
  const warnings: VolumeWarning[] = [];

  // Advertencias por grupo muscular
  Object.entries(volumeByMuscle).forEach(([muscle, data]) => {
    const muscleLandmarks = VOLUME_LANDMARKS_BY_MUSCLE[muscle];
    if (!muscleLandmarks) return;

    if (data.status === 'low') {
      warnings.push({
        type: 'insufficient',
        severity: 'medium',
        muscleGroup: muscle,
        message: `${muscle}: ${data.sets} series (MEV: ${muscleLandmarks.mev})`,
        recommendation: `Agregar ${muscleLandmarks.mev - data.sets} series para alcanzar volumen mínimo efectivo`,
      });
    }

    if (data.status === 'excessive') {
      warnings.push({
        type: 'excessive',
        severity: 'high',
        muscleGroup: muscle,
        message: `${muscle}: ${data.sets} series (MRV: ${muscleLandmarks.mrv})`,
        recommendation: `Reducir ${data.sets - muscleLandmarks.mrv} series para evitar sobreentreno`,
      });
    }
  });

  // Advertencia de volumen total
  if (landmarks.status === 'below-mev') {
    warnings.push({
      type: 'insufficient',
      severity: 'high',
      muscleGroup: 'General',
      message: `Volumen total bajo el MEV (${landmarks.current}/${landmarks.mev} series)`,
      recommendation: `Incrementar volumen global en ${landmarks.mev - landmarks.current} series`,
    });
  }

  if (landmarks.status === 'above-mrv') {
    warnings.push({
      type: 'recovery',
      severity: 'high',
      muscleGroup: 'General',
      message: `Volumen total excede MRV (${landmarks.current}/${landmarks.mrv} series)`,
      recommendation: `Reducir volumen o considerar semana de descarga`,
    });
  }

  // Detectar desbalances (diferencia >50% entre grupos antagonistas)
  const chestSets = volumeByMuscle['Pecho']?.sets || 0;
  const backSets = volumeByMuscle['Espalda']?.sets || 0;
  if (Math.abs(chestSets - backSets) / Math.max(chestSets, backSets) > 0.5) {
    warnings.push({
      type: 'imbalance',
      severity: 'medium',
      muscleGroup: 'Pecho/Espalda',
      message: `Desbalance: Pecho ${chestSets} vs Espalda ${backSets} series`,
      recommendation: 'Equilibrar trabajo de empuje y tirón para prevenir lesiones',
    });
  }

  return warnings;
};

/**
 * Calcula todas las estadísticas de volumen
 */
export const calculateVolumeStats = (trainingDays: TrainingDay[]): VolumeStats => {
  const volumeByMuscle = calculateVolumeByMuscle(trainingDays);
  const volumeLandmarks = calculateVolumeLandmarks(volumeByMuscle);
  const warnings = generateVolumeWarnings(volumeByMuscle, volumeLandmarks);

  const totalSets = trainingDays.reduce(
    (sum, day) => sum + day.exercises.reduce((daySum, ex) => daySum + ex.sets, 0),
    0
  );

  const totalReps = trainingDays.reduce(
    (sum, day) => sum + day.exercises.reduce((daySum, ex) => daySum + ex.reps * ex.sets, 0),
    0
  );

  const totalVolume = trainingDays.reduce(
    (sum, day) => sum + day.exercises.reduce((daySum, ex) => daySum + calculateExerciseVolume(ex), 0),
    0
  );

  return {
    totalSets,
    totalReps,
    totalVolume,
    byMuscleGroup: volumeByMuscle,
    volumeLandmarks,
    warnings,
  };
};
