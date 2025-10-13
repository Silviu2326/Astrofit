import { ExerciseConfig, TrainingPlan, VolumeAlert, ProgressIndicator } from '../types/training.types';
import { MOCK_EXERCISES, OPTIMAL_VOLUME } from '../constants/trainingData';

/**
 * Calcula el 1RM basado en peso, repeticiones y RPE
 */
export const calculate1RM = (weight: number, reps: number, rpe: number): number => {
  const repsInReserve = 10 - rpe;
  const totalReps = reps + repsInReserve;
  return weight * (1 + totalReps / 30);
};

/**
 * Calcula un porcentaje del 1RM
 */
export const calculatePercentage1RM = (oneRM: number, percentage: number): number => {
  return oneRM * (percentage / 100);
};

/**
 * Calcula el volumen de entrenamiento por grupo muscular
 */
export const calculateVolumeByMuscle = (plan: TrainingPlan): { [muscle: string]: number } => {
  const volumeMap: { [muscle: string]: number } = {};

  plan.trainingDays.forEach(day => {
    day.exercises.forEach(exercise => {
      const exerciseData = MOCK_EXERCISES.find(ex => ex.id === exercise.exerciseId);
      if (!exerciseData?.muscleGroups) return;

      const sets = exercise.sets;

      exerciseData.muscleGroups.forEach(muscle => {
        volumeMap[muscle] = (volumeMap[muscle] || 0) + sets;
      });
    });
  });

  return volumeMap;
};

/**
 * Obtiene alertas de volumen basadas en rangos óptimos
 */
export const getVolumeAlerts = (plan: TrainingPlan): VolumeAlert[] => {
  const volumeByMuscle = calculateVolumeByMuscle(plan);
  const alerts: VolumeAlert[] = [];

  Object.entries(volumeByMuscle).forEach(([muscle, sets]) => {
    const optimal = OPTIMAL_VOLUME[muscle];
    if (!optimal) return;

    const [min, max] = optimal;
    let severity: 'low' | 'high' | 'ok' = 'ok';

    if (sets < min) severity = 'low';
    if (sets > max) severity = 'high';

    if (severity !== 'ok') {
      alerts.push({
        muscle,
        current: sets,
        optimal,
        severity
      });
    }
  });

  return alerts;
};

/**
 * Obtiene el indicador de progresión para un ejercicio
 */
export const getProgressionIndicator = (exercise: ExerciseConfig): ProgressIndicator | null => {
  if (!exercise.history || exercise.history.length < 2) return null;

  const lastWeight = exercise.history[0].weight;
  const previousWeight = exercise.history[1].weight;

  if (lastWeight > previousWeight) {
    return { type: 'up', diff: lastWeight - previousWeight };
  } else if (lastWeight < previousWeight) {
    return { type: 'down', diff: previousWeight - lastWeight };
  }
  return { type: 'same', diff: 0 };
};

/**
 * Sugiere el siguiente peso para un ejercicio basado en la progresión
 */
export const suggestNextWeight = (exercise: ExerciseConfig, progressionRate: number): number | null => {
  if (!exercise.history || exercise.history.length === 0) return null;

  const lastWeight = exercise.history[0].weight;
  return lastWeight + progressionRate;
};
