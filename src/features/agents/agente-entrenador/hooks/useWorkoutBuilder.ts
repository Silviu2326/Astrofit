import { useState, useEffect, useCallback } from 'react';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
}

interface Block {
  id: string;
  name: string;
  exercises: Exercise[];
}

interface Superseries {
  id: string;
  name: string;
  exercises: Exercise[];
}

interface WorkoutDay {
  id: string;
  name: string;
  blocks: Block[];
  superseries: Superseries[];
}

interface WorkoutRoutine {
  id: string;
  name: string;
  days: WorkoutDay[];
}

const simulateApiCall = <T>(data: T, delay = 500): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

const useWorkoutBuilder = () => {
  const [routine, setRoutine] = useState<WorkoutRoutine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching a routine or loading a draft
  useEffect(() => {
    const loadRoutine = async () => {
      setIsLoading(true);
      try {
        // Check local storage for a draft first
        const savedDraft = localStorage.getItem('workoutDraft');
        if (savedDraft) {
          setRoutine(JSON.parse(savedDraft));
          console.log('Loaded workout draft from local storage.');
        } else {
          // Simulate fetching a default routine
          const defaultRoutine: WorkoutRoutine = {
            id: 'routine-1',
            name: 'Full Body Workout',
            days: [
              {
                id: 'day-1',
                name: 'Day 1: Upper Body',
                blocks: [
                  {
                    id: 'block-1',
                    name: 'Strength',
                    exercises: [
                      { id: 'ex-1', name: 'Bench Press', sets: 3, reps: '8-12', weight: '60kg' },
                      { id: 'ex-2', name: 'Overhead Press', sets: 3, reps: '8-12', weight: '40kg' },
                    ],
                  },
                ],
                superseries: [],
              },
              {
                id: 'day-2',
                name: 'Day 2: Lower Body',
                blocks: [
                  {
                    id: 'block-2',
                    name: 'Legs',
                    exercises: [
                      { id: 'ex-3', name: 'Squats', sets: 3, reps: '8-12', weight: '80kg' },
                      { id: 'ex-4', name: 'Deadlifts', sets: 3, reps: '5-8', weight: '100kg' },
                    ],
                  },
                ],
                superseries: [],
              },
            ],
          };
          const fetchedRoutine = await simulateApiCall(defaultRoutine);
          setRoutine(fetchedRoutine);
          console.log('Loaded default workout routine from simulated API.');
        }
      } catch (err) {
        setError('Failed to load workout routine.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadRoutine();
  }, []);

  // Persist routine drafts to local storage
  useEffect(() => {
    if (routine) {
      localStorage.setItem('workoutDraft', JSON.stringify(routine));
    }
  }, [routine]);

  const addDay = useCallback((dayName: string) => {
    setRoutine((prev) => {
      if (!prev) return null;
      const newDay: WorkoutDay = {
        id: `day-${Date.now()}`,
        name: dayName,
        blocks: [],
        superseries: [],
      };
      return { ...prev, days: [...prev.days, newDay] };
    });
  }, []);

  const addBlock = useCallback((dayId: string, blockName: string) => {
    setRoutine((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        days: prev.days.map((day) =>
          day.id === dayId
            ? {
                ...day,
                blocks: [...day.blocks, { id: `block-${Date.now()}`, name: blockName, exercises: [] }],
              }
            : day
        ),
      };
    });
  }, []);

  const addExerciseToBlock = useCallback((dayId: string, blockId: string, exercise: Omit<Exercise, 'id'>) => {
    setRoutine((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        days: prev.days.map((day) =>
          day.id === dayId
            ? {
                ...day,
                blocks: day.blocks.map((block) =>
                  block.id === blockId
                    ? { ...block, exercises: [...block.exercises, { ...exercise, id: `ex-${Date.now()}` }] }
                    : block
                ),
              }
            : day
        ),
      };
    });
  }, []);

  const addSuperseries = useCallback((dayId: string, superseriesName: string) => {
    setRoutine((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        days: prev.days.map((day) =>
          day.id === dayId
            ? {
                ...day,
                superseries: [...day.superseries, { id: `ss-${Date.now()}`, name: superseriesName, exercises: [] }],
              }
            : day
        ),
      };
    });
  }, []);

  const addExerciseToSuperseries = useCallback((dayId: string, superseriesId: string, exercise: Omit<Exercise, 'id'>) => {
    setRoutine((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        days: prev.days.map((day) =>
          day.id === dayId
            ? {
                ...day,
                superseries: day.superseries.map((ss) =>
                  ss.id === superseriesId
                    ? { ...ss, exercises: [...ss.exercises, { ...exercise, id: `ex-${Date.now()}` }] }
                    : ss
                ),
              }
            : day
        ),
      };
    });
  }, []);

  // Drag and drop functionality (simplified for brevity)
  const moveExercise = useCallback((
    dayId: string,
    sourceContainerId: string, // blockId or superseriesId
    destinationContainerId: string,
    exerciseId: string,
    newIndex: number,
    isSourceBlock: boolean,
    isDestinationBlock: boolean
  ) => {
    setRoutine((prev) => {
      if (!prev) return null;

      const newDays = prev.days.map(day => {
        if (day.id === dayId) {
          let exerciseToMove: Exercise | undefined;
          let updatedSourceExercises: Exercise[] = [];
          let updatedDestinationExercises: Exercise[] = [];

          // Remove from source
          if (isSourceBlock) {
            day.blocks = day.blocks.map(block => {
              if (block.id === sourceContainerId) {
                exerciseToMove = block.exercises.find(ex => ex.id === exerciseId);
                updatedSourceExercises = block.exercises.filter(ex => ex.id !== exerciseId);
                return { ...block, exercises: updatedSourceExercises };
              }
              return block;
            });
          } else {
            day.superseries = day.superseries.map(ss => {
              if (ss.id === sourceContainerId) {
                exerciseToMove = ss.exercises.find(ex => ex.id === exerciseId);
                updatedSourceExercises = ss.exercises.filter(ex => ex.id !== exerciseId);
                return { ...ss, exercises: updatedSourceExercises };
              }
              return ss;
            });
          }

          if (!exerciseToMove) return day; // Exercise not found

          // Add to destination
          if (isDestinationBlock) {
            day.blocks = day.blocks.map(block => {
              if (block.id === destinationContainerId) {
                updatedDestinationExercises = [...block.exercises];
                updatedDestinationExercises.splice(newIndex, 0, exerciseToMove!);
                return { ...block, exercises: updatedDestinationExercises };
              }
              return block;
            });
          } else {
            day.superseries = day.superseries.map(ss => {
              if (ss.id === destinationContainerId) {
                updatedDestinationExercises = [...ss.exercises];
                updatedDestinationExercises.splice(newIndex, 0, exerciseToMove!);
                return { ...ss, exercises: updatedDestinationExercises };
              }
              return ss;
            });
          }
        }
        return day;
      });
      return { ...prev, days: newDays };
    });
  }, []);


  return {
    routine,
    isLoading,
    error,
    addDay,
    addBlock,
    addExerciseToBlock,
    addSuperseries,
    addExerciseToSuperseries,
    moveExercise,
  };
};

export default useWorkoutBuilder;
