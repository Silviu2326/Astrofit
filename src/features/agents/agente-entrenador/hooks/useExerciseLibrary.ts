import { useState, useEffect, useCallback, useMemo } from 'react';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  description: string;
  isFavorite: boolean;
}

const simulateApiCall = <T>(data: T, delay = 600): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
};

const MOCK_EXERCISES: Exercise[] = [
  { id: 'ex1', name: 'Bench Press', muscleGroup: 'Chest', equipment: 'Barbell', description: '...', isFavorite: false },
  { id: 'ex2', name: 'Squat', muscleGroup: 'Legs', equipment: 'Barbell', description: '...', isFavorite: false },
  { id: 'ex3', name: 'Deadlift', muscleGroup: 'Full Body', equipment: 'Barbell', description: '...', isFavorite: false },
  { id: 'ex4', name: 'Overhead Press', muscleGroup: 'Shoulders', equipment: 'Barbell', description: '...', isFavorite: false },
  { id: 'ex5', name: 'Bicep Curl', muscleGroup: 'Arms', equipment: 'Dumbbells', description: '...', isFavorite: false },
  { id: 'ex6', name: 'Tricep Extension', muscleGroup: 'Arms', equipment: 'Dumbbells', description: '...', isFavorite: false },
  { id: 'ex7', name: 'Lat Pulldown', muscleGroup: 'Back', equipment: 'Machine', description: '...', isFavorite: false },
  { id: 'ex8', name: 'Leg Press', muscleGroup: 'Legs', equipment: 'Machine', description: '...', isFavorite: false },
  { id: 'ex9', name: 'Push-ups', muscleGroup: 'Chest', equipment: 'Bodyweight', description: '...', isFavorite: false },
  { id: 'ex10', name: 'Pull-ups', muscleGroup: 'Back', equipment: 'Bodyweight', description: '...', isFavorite: false },
];

const useExerciseLibrary = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMuscleGroup, setFilterMuscleGroup] = useState('All');
  const [filterEquipment, setFilterEquipment] = useState('All');

  // Simulate fetching exercises and caching
  useEffect(() => {
    const loadExercises = async () => {
      setIsLoading(true);
      try {
        const cachedExercises = localStorage.getItem('exerciseLibraryCache');
        if (cachedExercises) {
          setExercises(JSON.parse(cachedExercises));
          console.log('Loaded exercises from cache.');
        } else {
          const fetchedExercises = await simulateApiCall(MOCK_EXERCISES);
          setExercises(fetchedExercises);
          localStorage.setItem('exerciseLibraryCache', JSON.stringify(fetchedExercises));
          console.log('Loaded exercises from simulated API and cached.');
        }
      } catch (err) {
        setError('Failed to load exercise library.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadExercises();
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, isFavorite: !ex.isFavorite } : ex))
    );
  }, []);

  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    if (filterMuscleGroup !== 'All') {
      filtered = filtered.filter((ex) => ex.muscleGroup === filterMuscleGroup);
    }

    if (filterEquipment !== 'All') {
      filtered = filtered.filter((ex) => ex.equipment === filterEquipment);
    }

    if (searchTerm) {
      filtered = filtered.filter((ex) =>
        ex.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [exercises, searchTerm, filterMuscleGroup, filterEquipment]);

  const uniqueMuscleGroups = useMemo(() => {
    const groups = new Set(MOCK_EXERCISES.map(ex => ex.muscleGroup));
    return ['All', ...Array.from(groups)];
  }, []);

  const uniqueEquipment = useMemo(() => {
    const equipment = new Set(MOCK_EXERCISES.map(ex => ex.equipment));
    return ['All', ...Array.from(equipment)];
  }, []);

  return {
    exercises: filteredExercises,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    filterMuscleGroup,
    setFilterMuscleGroup,
    filterEquipment,
    setFilterEquipment,
    toggleFavorite,
    uniqueMuscleGroups,
    uniqueEquipment,
  };
};

export default useExerciseLibrary;
