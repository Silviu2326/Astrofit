import { useState, useEffect, useCallback } from 'react';

interface PersonalRecord {
  id: string;
  exerciseName: string;
  weight: number;
  reps: number;
  date: string;
}

interface WorkoutSession {
  id: string;
  date: string;
  totalVolume: number;
  exercisesPerformed: Array<{ exerciseName: string; sets: number; reps: number; weight: number; }>
}

interface ProgressData {
  prs: PersonalRecord[];
  workoutHistory: WorkoutSession[];
}

const simulateApiCall = <T>(data: T, delay = 700): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

const useProgressTracking = () => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching progress data
  useEffect(() => {
    const fetchProgress = async () => {
      setIsLoading(true);
      try {
        const mockProgress: ProgressData = {
          prs: [
            { id: 'pr-1', exerciseName: 'Bench Press', weight: 100, reps: 5, date: '2023-01-15' },
            { id: 'pr-2', exerciseName: 'Squats', weight: 120, reps: 3, date: '2023-02-20' },
          ],
          workoutHistory: [
            { id: 'ws-1', date: '2023-09-01', totalVolume: 5000, exercisesPerformed: [{ exerciseName: 'Bench Press', sets: 3, reps: 5, weight: 90 }] },
            { id: 'ws-2', date: '2023-09-05', totalVolume: 6000, exercisesPerformed: [{ exerciseName: 'Squats', sets: 3, reps: 5, weight: 110 }] },
          ],
        };
        const data = await simulateApiCall(mockProgress);
        setProgressData(data);
      } catch (err) {
        setError('Failed to load progress data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProgress();
  }, []);

  const addPersonalRecord = useCallback((newPR: Omit<PersonalRecord, 'id'>) => {
    setProgressData((prev) => {
      if (!prev) return null;
      const updatedPrs = [...prev.prs, { ...newPR, id: `pr-${Date.now()}` }];
      return { ...prev, prs: updatedPrs };
    });
  }, []);

  const addWorkoutSession = useCallback((newSession: Omit<WorkoutSession, 'id'>) => {
    setProgressData((prev) => {
      if (!prev) return null;
      const updatedHistory = [...prev.workoutHistory, { ...newSession, id: `ws-${Date.now()}` }];
      return { ...prev, workoutHistory: updatedHistory };
    });
  }, []);

  // Calculate total volume for a given exercise over time
  const getVolumeTrend = useCallback((exerciseName: string) => {
    if (!progressData) return [];
    const trend = progressData.workoutHistory
      .filter(session => session.exercisesPerformed.some(ex => ex.exerciseName === exerciseName))
      .map(session => ({
        date: session.date,
        volume: session.exercisesPerformed
          .filter(ex => ex.exerciseName === exerciseName)
          .reduce((sum, ex) => sum + (ex.sets * ex.reps * ex.weight), 0),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return trend;
  }, [progressData]);

  return {
    progressData,
    isLoading,
    error,
    addPersonalRecord,
    addWorkoutSession,
    getVolumeTrend,
  };
};

export default useProgressTracking;
