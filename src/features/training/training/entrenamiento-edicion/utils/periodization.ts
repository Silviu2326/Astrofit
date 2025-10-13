import { TrainingPlan, WeekPlan } from '../types/training.types';

/**
 * Genera el calendario semanal del plan de entrenamiento
 */
export const generateWeeklyCalendar = (plan: TrainingPlan): WeekPlan[] => {
  const weeks: WeekPlan[] = [];
  const startDate = new Date(plan.startDate);

  for (let week = 0; week < plan.duration; week++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (week * 7));

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const isDeload = (week + 1) % plan.deloadWeeks === 0;

    const sessions = plan.daysPerWeek.map((dayId, idx) => ({
      day: dayId,
      sessionIndex: idx,
      completed: Math.random() > 0.5 // TODO: Reemplazar con datos reales
    }));

    weeks.push({
      weekNumber: week + 1,
      startDate: weekStart.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      endDate: weekEnd.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      isDeload,
      sessions
    });
  }

  return weeks;
};

/**
 * Genera datos de timeline para visualización de periodización
 */
export const generateTimelineData = (plan: TrainingPlan) => {
  const weeks = [];
  const startDate = new Date(plan.startDate);

  for (let week = 0; week < plan.duration; week++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (week * 7));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    const isDeload = (week + 1) % plan.deloadWeeks === 0;

    // Progresión lineal con descarga
    const volumePercentage = isDeload ? 50 : 70 + (week * 3);
    const intensityPercentage = isDeload ? 60 : 75 + (week * 2);

    weeks.push({
      weekNumber: week + 1,
      volumePercentage: Math.min(volumePercentage, 100),
      intensityPercentage: Math.min(intensityPercentage, 95),
      isDeload,
      startDate: weekStart.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      endDate: weekEnd.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }),
      phase: week < 3 ? 'Acumulación' : week < 6 ? 'Intensificación' : 'Pico'
    });
  }

  return weeks;
};

/**
 * Genera comparación de progreso entre semanas
 */
export const generateProgressComparison = (plan: TrainingPlan, selectedDayIndex: number) => {
  const comparisons = [];
  const selectedDay = plan.trainingDays[selectedDayIndex];

  selectedDay.exercises.forEach(exercise => {
    const exerciseData = require('../constants/trainingData').MOCK_EXERCISES.find((ex: any) => ex.id === exercise.exerciseId);
    if (!exerciseData) return;

    // Mock data para comparación - TODO: Reemplazar con datos reales
    const week1Weight = exercise.weight || 50;
    const week8Weight = week1Weight * 1.15; // 15% de mejora
    const week1Volume = exercise.sets * parseInt(exercise.reps) * week1Weight;
    const week8Volume = exercise.sets * parseInt(exercise.reps) * week8Weight;
    const improvement = ((week8Volume - week1Volume) / week1Volume) * 100;

    comparisons.push({
      exerciseName: exerciseData.name,
      exerciseImage: exerciseData.image,
      week1: {
        sets: exercise.sets,
        reps: exercise.reps,
        weight: week1Weight,
        volume: week1Volume
      },
      week8: {
        sets: exercise.sets,
        reps: exercise.reps,
        weight: week8Weight,
        volume: week8Volume
      },
      improvement,
      isPR: improvement > 20
    });
  });

  return comparisons;
};
