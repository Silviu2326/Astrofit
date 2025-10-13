import { useState, useEffect } from 'react';
import { TrainingPlan, SessionTemplate, ExerciseConfig, ExerciseGroupType } from '../types/training.types';
import { MOCK_HISTORY } from '../constants/trainingData';

export const useTrainingPlan = (id: string | undefined) => {
  const [isLoading, setIsLoading] = useState(true);
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [sessionTemplates, setSessionTemplates] = useState<SessionTemplate[]>([]);

  useEffect(() => {
    const loadTrainingPlan = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock plan - TODO: Reemplazar con llamada a API
      const mockPlan: TrainingPlan = {
        id: id || '1',
        clientId: '1',
        name: 'Plan de Fuerza - Juan Pérez',
        description: 'Programa de fuerza para nivel intermedio',
        goal: 'strength',
        type: 'strength',
        level: 'intermediate',
        startDate: '2025-10-01',
        endDate: '2025-11-26',
        duration: 8,
        daysPerWeek: ['L', 'M', 'V'],
        trainingDays: [
          {
            day: 'L',
            name: 'Día 1 - Empuje',
            focus: 'strength',
            duration: 90,
            exercises: [
              {
                exerciseId: 'e2',
                sets: 4,
                reps: '8',
                rest: 120,
                rpe: 8,
                weight: 80,
                history: MOCK_HISTORY['e2']
              },
              {
                exerciseId: 'e4',
                sets: 3,
                reps: '10-12',
                rest: 90,
                rpe: 7,
                weight: 40,
                groupType: 'superset',
                groupId: 'ss1'
              },
              {
                exerciseId: 'e10',
                sets: 3,
                reps: '10-12',
                rest: 90,
                rpe: 7,
                weight: 12,
                groupType: 'superset',
                groupId: 'ss1'
              },
            ]
          },
          {
            day: 'M',
            name: 'Día 2 - Piernas',
            focus: 'strength',
            duration: 90,
            exercises: [
              {
                exerciseId: 'e1',
                sets: 5,
                reps: '5',
                rest: 180,
                rpe: 9,
                weight: 100,
                history: MOCK_HISTORY['e1']
              },
              {
                exerciseId: 'e3',
                sets: 4,
                reps: '6',
                rest: 180,
                rpe: 8,
                weight: 120
              },
            ]
          },
          {
            day: 'V',
            name: 'Día 3 - Tirón',
            focus: 'strength',
            duration: 90,
            exercises: [
              { exerciseId: 'e5', sets: 4, reps: '8-10', rest: 120, rpe: 8, weight: 60 },
              { exerciseId: 'e6', sets: 3, reps: '8', rest: 150, rpe: 7 },
            ]
          },
        ],
        progressionMethod: 'linear',
        progressionRate: 2.5,
        deloadWeeks: 4,
        totalSessions: 24,
        completedSessions: 8,
        status: 'active'
      };

      setPlan(mockPlan);

      setSessionTemplates([
        {
          id: 't1',
          name: 'Upper Body Power',
          duration: 90,
          exercises: [
            { exerciseId: 'e2', sets: 5, reps: '5', rest: 180, rpe: 9 },
            { exerciseId: 'e5', sets: 4, reps: '6', rest: 150, rpe: 8 },
          ]
        },
        {
          id: 't2',
          name: 'Lower Body Hypertrophy',
          duration: 90,
          exercises: [
            { exerciseId: 'e1', sets: 4, reps: '8-10', rest: 120, rpe: 8 },
            { exerciseId: 'e3', sets: 3, reps: '10-12', rest: 90, rpe: 7 },
          ]
        }
      ]);

      setIsLoading(false);
    };

    loadTrainingPlan();
  }, [id]);

  const handleSave = () => {
    console.log('Guardando plan:', plan);
    setLastSaved(new Date());
  };

  const handleUpdatePlanInfo = (field: keyof TrainingPlan, value: any) => {
    if (!plan) return;
    setPlan({ ...plan, [field]: value });
  };

  const handleUpdateExercise = (dayIndex: number, exerciseIndex: number, field: keyof ExerciseConfig, value: any) => {
    if (!plan) return;

    const newPlan = { ...plan };
    (newPlan.trainingDays[dayIndex].exercises[exerciseIndex] as any)[field] = value;
    setPlan(newPlan);
  };

  const handleAddExercise = (dayIndex: number, exerciseId: string) => {
    if (!plan) return;

    const newPlan = { ...plan };
    newPlan.trainingDays[dayIndex].exercises.push({
      exerciseId,
      sets: 3,
      reps: '10',
      rest: 90,
    });
    setPlan(newPlan);
  };

  const handleRemoveExercise = (dayIndex: number, exerciseIndex: number) => {
    if (!plan) return;

    const newPlan = { ...plan };
    newPlan.trainingDays[dayIndex].exercises.splice(exerciseIndex, 1);
    setPlan(newPlan);
  };

  const handleDuplicateExercise = (dayIndex: number, exerciseIndex: number) => {
    if (!plan) return;

    const newPlan = { ...plan };
    const exercise = { ...newPlan.trainingDays[dayIndex].exercises[exerciseIndex] };
    delete exercise.history;
    newPlan.trainingDays[dayIndex].exercises.splice(exerciseIndex + 1, 0, exercise);
    setPlan(newPlan);
  };

  const handleApplyProgression = (dayIndex: number, exerciseIndex: number) => {
    if (!plan) return;

    const exercise = plan.trainingDays[dayIndex].exercises[exerciseIndex];
    if (!exercise.weight) return;

    const newWeight = exercise.weight + plan.progressionRate;
    handleUpdateExercise(dayIndex, exerciseIndex, 'weight', newWeight);
  };

  const handleAddDay = (dayId: string) => {
    if (!plan) return;

    const newPlan = { ...plan };
    newPlan.daysPerWeek.push(dayId);
    newPlan.trainingDays.push({
      day: dayId,
      name: `Día ${newPlan.trainingDays.length + 1}`,
      focus: 'strength',
      duration: 60,
      exercises: []
    });
    setPlan(newPlan);
  };

  const handleRemoveDay = (dayIndex: number, selectedDayIndex: number, setSelectedDayIndex: (index: number) => void) => {
    if (!plan) return;

    const newPlan = { ...plan };
    const dayId = newPlan.trainingDays[dayIndex].day;
    newPlan.trainingDays.splice(dayIndex, 1);
    newPlan.daysPerWeek = newPlan.daysPerWeek.filter(d => d !== dayId);
    setPlan(newPlan);
    if (selectedDayIndex >= newPlan.trainingDays.length) {
      setSelectedDayIndex(Math.max(0, newPlan.trainingDays.length - 1));
    }
  };

  const handleDuplicateSession = (dayIndex: number) => {
    if (!plan) return;

    const newPlan = { ...plan };
    const sessionCopy = JSON.parse(JSON.stringify(newPlan.trainingDays[dayIndex]));
    sessionCopy.name = `${sessionCopy.name} (Copia)`;
    newPlan.trainingDays.push(sessionCopy);
    setPlan(newPlan);
  };

  const handleSaveAsTemplate = (dayIndex: number) => {
    if (!plan) return;

    const session = plan.trainingDays[dayIndex];
    const newTemplate: SessionTemplate = {
      id: `t${Date.now()}`,
      name: session.name,
      duration: session.duration,
      exercises: JSON.parse(JSON.stringify(session.exercises))
    };
    setSessionTemplates([...sessionTemplates, newTemplate]);
    alert(`Plantilla "${newTemplate.name}" guardada correctamente`);
  };

  const handleApplyTemplate = (templateId: string, selectedDayIndex: number) => {
    if (!plan) return;

    const template = sessionTemplates.find(t => t.id === templateId);
    if (!template) return;

    const newPlan = { ...plan };
    newPlan.trainingDays[selectedDayIndex].exercises = JSON.parse(JSON.stringify(template.exercises));
    newPlan.trainingDays[selectedDayIndex].duration = template.duration;
    setPlan(newPlan);
  };

  const handleAddBlock = (blockId: string, selectedDayIndex: number) => {
    if (!plan) return;

    const { EXERCISE_BLOCKS } = require('../constants/trainingData');
    const block = EXERCISE_BLOCKS.find((b: any) => b.id === blockId);
    if (!block) return;

    const newPlan = { ...plan };
    block.exercises.forEach((ex: any) => {
      newPlan.trainingDays[selectedDayIndex].exercises.push({ ...ex });
    });
    setPlan(newPlan);
  };

  const handleCreateSuperset = (
    selectedDayIndex: number,
    selectedExercisesForGroup: number[],
    groupingMode: ExerciseGroupType
  ) => {
    if (!plan || selectedExercisesForGroup.length < 2) return;

    const newPlan = { ...plan };
    const groupId = `group-${Date.now()}`;

    selectedExercisesForGroup.forEach(index => {
      newPlan.trainingDays[selectedDayIndex].exercises[index].groupType = groupingMode;
      newPlan.trainingDays[selectedDayIndex].exercises[index].groupId = groupId;
    });

    setPlan(newPlan);
  };

  return {
    isLoading,
    plan,
    setPlan,
    lastSaved,
    sessionTemplates,
    handleSave,
    handleUpdatePlanInfo,
    handleUpdateExercise,
    handleAddExercise,
    handleRemoveExercise,
    handleDuplicateExercise,
    handleApplyProgression,
    handleAddDay,
    handleRemoveDay,
    handleDuplicateSession,
    handleSaveAsTemplate,
    handleApplyTemplate,
    handleAddBlock,
    handleCreateSuperset,
  };
};
