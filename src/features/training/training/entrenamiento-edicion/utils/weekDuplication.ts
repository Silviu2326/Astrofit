import { TrainingPlan, TrainingDay } from '../types/training.types';

/**
 * Duplica una semana completa aplicando progresión automática
 */
export const duplicateWeekWithProgression = (
  sourceWeek: TrainingDay[],
  progressionRate: number,
  weeksAhead: number = 1
): TrainingDay[] => {
  const duplicated = JSON.parse(JSON.stringify(sourceWeek)) as TrainingDay[];

  duplicated.forEach(day => {
    day.exercises.forEach(exercise => {
      if (exercise.weight) {
        // Aplicar progresión lineal
        exercise.weight += progressionRate * weeksAhead;
        exercise.weight = Math.round(exercise.weight * 4) / 4; // Redondear a 0.25kg
      }
    });
  });

  return duplicated;
};

/**
 * Crea un plan de múltiples semanas a partir de una semana base
 */
export const generateWeeklyProgression = (
  baseWeek: TrainingDay[],
  totalWeeks: number,
  progressionRate: number,
  deloadWeeks: number
): TrainingDay[][] => {
  const weeks: TrainingDay[][] = [];

  for (let weekNum = 0; weekNum < totalWeeks; weekNum++) {
    const isDeloadWeek = (weekNum + 1) % deloadWeeks === 0;

    if (isDeloadWeek) {
      // Semana de descarga: 70% del peso
      const deloadWeek = duplicateWeekWithProgression(baseWeek, progressionRate, weekNum);
      deloadWeek.forEach(day => {
        day.name = `${day.name} (Descarga)`;
        day.exercises.forEach(exercise => {
          if (exercise.weight) {
            exercise.weight = Math.round(exercise.weight * 0.7 * 4) / 4;
          }
          // Reducir RPE en descarga
          if (exercise.rpe) {
            exercise.rpe = Math.max(5, exercise.rpe - 2);
          }
        });
      });
      weeks.push(deloadWeek);
    } else {
      // Semana normal con progresión
      weeks.push(duplicateWeekWithProgression(baseWeek, progressionRate, weekNum));
    }
  }

  return weeks;
};

/**
 * Aplica progresión a un plan existente
 */
export const applyProgressionToPlan = (
  plan: TrainingPlan,
  weekNumber: number
): TrainingPlan => {
  const updatedPlan = { ...plan };
  const weeksToProgress = weekNumber - 1;

  if (weeksToProgress > 0) {
    updatedPlan.trainingDays = duplicateWeekWithProgression(
      plan.trainingDays,
      plan.progressionRate,
      weeksToProgress
    );
  }

  return updatedPlan;
};

/**
 * Copia una semana y la pega en otra fecha
 */
export const copyWeekToDate = (
  sourceWeek: TrainingDay[],
  targetWeekNumber: number,
  applyProgression: boolean,
  progressionRate: number
): TrainingDay[] => {
  if (applyProgression) {
    return duplicateWeekWithProgression(sourceWeek, progressionRate, targetWeekNumber - 1);
  }
  return JSON.parse(JSON.stringify(sourceWeek));
};
