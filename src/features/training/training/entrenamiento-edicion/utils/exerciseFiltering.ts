import { ExerciseLibraryEntry } from '../types/exercise.types';
import { ClientProfile } from '../types/client.types';

export interface ExerciseFilters {
  search?: string;
  muscleGroups?: string[];
  equipment?: string[];
  difficulty?: string[];
  movement?: string[];
  excludeInjuries?: boolean;
  clientProfile?: ClientProfile;
}

/**
 * Filtra ejercicios basándose en múltiples criterios
 */
export const filterExercises = (
  exercises: ExerciseLibraryEntry[],
  filters: ExerciseFilters
): ExerciseLibraryEntry[] => {
  let filtered = [...exercises];

  // Búsqueda por texto
  if (filters.search && filters.search.trim()) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (ex) =>
        ex.name.toLowerCase().includes(searchLower) ||
        ex.primaryMuscle.toLowerCase().includes(searchLower) ||
        ex.secondaryMuscles?.some((m) => m.toLowerCase().includes(searchLower)) ||
        ex.tags?.some((t) => t.toLowerCase().includes(searchLower))
    );
  }

  // Filtro por grupos musculares
  if (filters.muscleGroups && filters.muscleGroups.length > 0) {
    filtered = filtered.filter((ex) => {
      const exMuscles = [ex.primaryMuscle, ...(ex.secondaryMuscles || [])];
      return filters.muscleGroups!.some((muscle) =>
        exMuscles.some((m) => m.toLowerCase().includes(muscle.toLowerCase()))
      );
    });
  }

  // Filtro por equipamiento
  if (filters.equipment && filters.equipment.length > 0) {
    filtered = filtered.filter((ex) =>
      filters.equipment!.some((eq) =>
        ex.equipment.some((e) => e.toLowerCase().includes(eq.toLowerCase()))
      )
    );
  }

  // Filtro por dificultad
  if (filters.difficulty && filters.difficulty.length > 0) {
    filtered = filtered.filter((ex) => filters.difficulty!.includes(ex.difficulty));
  }

  // Filtro por patrón de movimiento
  if (filters.movement && filters.movement.length > 0) {
    filtered = filtered.filter((ex) => filters.movement!.includes(ex.movement));
  }

  // Excluir ejercicios contraindicados para lesiones del cliente
  if (filters.excludeInjuries && filters.clientProfile) {
    const clientInjuries = filters.clientProfile.injuries
      .filter((inj) => inj.severity === 'high' || inj.severity === 'medium')
      .map((inj) => inj.area.toLowerCase());

    filtered = filtered.filter((ex) => {
      // Verificar si el ejercicio está contraindicado para alguna lesión del cliente
      const hasContraindication = ex.avoidWithInjuries?.some((injuryArea) =>
        clientInjuries.some((clientInj) => injuryArea.toLowerCase().includes(clientInj))
      );
      return !hasContraindication;
    });

    // También filtrar por contraindicaciones generales
    const clientConditions = filters.clientProfile.healthConditions || [];
    filtered = filtered.filter((ex) => {
      if (!ex.contraindications || ex.contraindications.length === 0) return true;
      return !ex.contraindications.some((contra) =>
        clientConditions.some((condition) =>
          contra.toLowerCase().includes(condition.toLowerCase())
        )
      );
    });
  }

  // Filtrar por equipamiento disponible del cliente
  if (filters.clientProfile?.equipment && filters.clientProfile.equipment.length > 0) {
    const clientEquipment = filters.clientProfile.equipment.map((eq) => eq.toLowerCase());
    filtered = filtered.filter((ex) => {
      // Si es peso corporal, siempre está disponible
      if (ex.equipment.some((eq) => eq.toLowerCase() === 'peso corporal')) return true;
      // Verificar si el cliente tiene el equipamiento necesario
      return ex.equipment.some((eq) =>
        clientEquipment.some((clientEq) => eq.toLowerCase().includes(clientEq))
      );
    });
  }

  return filtered;
};

/**
 * Agrupa ejercicios filtrados por grupo muscular
 */
export const groupExercisesByMuscle = (
  exercises: ExerciseLibraryEntry[]
): Record<string, ExerciseLibraryEntry[]> => {
  const grouped: Record<string, ExerciseLibraryEntry[]> = {};

  exercises.forEach((ex) => {
    if (!grouped[ex.primaryMuscle]) {
      grouped[ex.primaryMuscle] = [];
    }
    grouped[ex.primaryMuscle].push(ex);
  });

  return grouped;
};

/**
 * Extrae valores únicos para los filtros
 */
export const getFilterOptions = (exercises: ExerciseLibraryEntry[]) => {
  const muscleGroups = new Set<string>();
  const equipment = new Set<string>();
  const difficulties = new Set<string>();
  const movements = new Set<string>();

  exercises.forEach((ex) => {
    muscleGroups.add(ex.primaryMuscle);
    ex.secondaryMuscles?.forEach((m) => muscleGroups.add(m));
    ex.equipment.forEach((e) => equipment.add(e));
    difficulties.add(ex.difficulty);
    movements.add(ex.movement);
  });

  return {
    muscleGroups: Array.from(muscleGroups).sort(),
    equipment: Array.from(equipment).sort(),
    difficulties: Array.from(difficulties).sort(),
    movements: Array.from(movements).sort(),
  };
};

/**
 * Calcula estadísticas de los ejercicios filtrados
 */
export const getFilteredStats = (exercises: ExerciseLibraryEntry[]) => {
  const byMuscle = groupExercisesByMuscle(exercises);
  const byDifficulty = exercises.reduce((acc, ex) => {
    acc[ex.difficulty] = (acc[ex.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total: exercises.length,
    byMuscle,
    byDifficulty,
    avgDifficulty:
      exercises.reduce(
        (sum, ex) =>
          sum + (ex.difficulty === 'beginner' ? 1 : ex.difficulty === 'intermediate' ? 2 : 3),
        0
      ) / exercises.length || 0,
  };
};
