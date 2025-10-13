import { ExerciseLibraryEntry, ExerciseSubstitution } from '../types/exercise.types';
import { ClientProfile } from '../types/client.types';

interface SubstitutionFilters {
  avoidEquipment?: string[];
  avoidBodyParts?: string[]; // Lesiones
  difficulty?: 'easier' | 'same' | 'harder';
  availableEquipment?: string[];
}

/**
 * Calcula qué tan similar es un ejercicio alternativo al original
 */
const calculateSimilarity = (
  original: ExerciseLibraryEntry,
  alternative: ExerciseLibraryEntry
): number => {
  let score = 0;
  let maxScore = 0;

  // Mismo músculo primario (40 puntos)
  maxScore += 40;
  if (original.primaryMuscle === alternative.primaryMuscle) {
    score += 40;
  }

  // Músculos secundarios compartidos (20 puntos)
  maxScore += 20;
  const sharedSecondary = original.secondaryMuscles.filter(m =>
    alternative.secondaryMuscles.includes(m)
  ).length;
  score += (sharedSecondary / Math.max(original.secondaryMuscles.length, 1)) * 20;

  // Mismo patrón de movimiento (30 puntos)
  maxScore += 30;
  if (original.movement === alternative.movement) {
    score += 30;
  }

  // Mismo plano de movimiento (10 puntos)
  maxScore += 10;
  if (original.plane === alternative.plane) {
    score += 10;
  }

  return Math.round((score / maxScore) * 100);
};

/**
 * Calcula un match score considerando todos los factores
 */
const calculateMatchScore = (
  original: ExerciseLibraryEntry,
  alternative: ExerciseLibraryEntry,
  filters: SubstitutionFilters
): number => {
  let score = calculateSimilarity(original, alternative);

  // Penalizar si la dificultad no coincide con el filtro
  if (filters.difficulty) {
    if (filters.difficulty === 'easier' && alternative.difficulty >= original.difficulty) {
      score -= 20;
    } else if (filters.difficulty === 'harder' && alternative.difficulty <= original.difficulty) {
      score -= 20;
    } else if (filters.difficulty === 'same' && Math.abs(alternative.difficulty - original.difficulty) > 1) {
      score -= 15;
    }
  }

  // Bonificar si usa equipamiento disponible
  if (filters.availableEquipment) {
    const hasAllEquipment = alternative.equipment.every(eq =>
      filters.availableEquipment?.includes(eq)
    );
    if (hasAllEquipment) {
      score += 10;
    } else {
      score -= 30; // Penalizar fuertemente si no tiene el equipo
    }
  }

  return Math.max(0, Math.min(100, score));
};

/**
 * Encuentra ejercicios alternativos para un ejercicio dado
 */
export const findExerciseAlternatives = (
  originalExercise: ExerciseLibraryEntry,
  allExercises: ExerciseLibraryEntry[],
  filters?: SubstitutionFilters
): ExerciseSubstitution => {
  const alternatives = allExercises
    .filter(ex => {
      // No incluir el ejercicio original
      if (ex.id === originalExercise.id) return false;

      // Filtrar por equipamiento a evitar
      if (filters?.avoidEquipment) {
        const hasAvoidedEquipment = ex.equipment.some(eq =>
          filters.avoidEquipment?.includes(eq)
        );
        if (hasAvoidedEquipment) return false;
      }

      // Filtrar por partes del cuerpo a evitar (lesiones)
      if (filters?.avoidBodyParts) {
        const affectsInjuredPart = filters.avoidBodyParts.some(part =>
          ex.avoidWithInjuries.includes(part)
        );
        if (affectsInjuredPart) return false;
      }

      // Filtrar por equipamiento disponible
      if (filters?.availableEquipment) {
        const hasAllEquipment = ex.equipment.every(eq =>
          filters.availableEquipment?.includes(eq)
        );
        if (!hasAllEquipment) return false;
      }

      return true;
    })
    .map(ex => {
      const similarity = calculateSimilarity(originalExercise, ex);
      const matchScore = calculateMatchScore(originalExercise, ex, filters || {});

      let difficultyLevel: 'easier' | 'same' | 'harder' = 'same';
      if (ex.difficulty < originalExercise.difficulty) difficultyLevel = 'easier';
      else if (ex.difficulty > originalExercise.difficulty) difficultyLevel = 'harder';

      // Generar razón de sustitución
      let reason = '';
      if (similarity >= 90) {
        reason = 'Muy similar en músculo y movimiento';
      } else if (similarity >= 70) {
        reason = 'Similar - trabaja los mismos músculos principales';
      } else if (ex.movement === originalExercise.movement) {
        reason = 'Mismo patrón de movimiento';
      } else {
        reason = 'Alternativa viable para el músculo objetivo';
      }

      return {
        exercise: ex,
        similarity,
        reason,
        equipmentNeeded: ex.equipment,
        difficulty: difficultyLevel,
        matchScore,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore) // Ordenar por mejor match
    .slice(0, 5); // Top 5 alternativas

  return {
    originalExercise,
    alternatives,
  };
};

/**
 * Sugiere alternativas basadas en el perfil del cliente
 */
export const suggestAlternativesForClient = (
  exerciseId: string,
  allExercises: ExerciseLibraryEntry[],
  client: ClientProfile
): ExerciseSubstitution | null => {
  const exercise = allExercises.find(ex => ex.id === exerciseId);
  if (!exercise) return null;

  // Construir filtros basados en el cliente
  const filters: SubstitutionFilters = {
    availableEquipment: client.equipment,
    avoidBodyParts: client.injuries
      .filter(injury => injury.isActive)
      .map(injury => injury.bodyPart),
  };

  // Agregar ejercicios específicos a evitar por lesiones
  const avoidExercises = client.injuries
    .filter(injury => injury.isActive)
    .flatMap(injury => injury.restrictions);

  // Filtrar ejercicios que no estén en la lista de evitar
  const safeExercises = allExercises.filter(ex => !avoidExercises.includes(ex.id));

  return findExerciseAlternatives(exercise, safeExercises, filters);
};

/**
 * Genera un reporte de por qué se recomienda una sustitución
 */
export const generateSubstitutionReport = (
  substitution: ExerciseSubstitution,
  client: ClientProfile
): string => {
  const reasons: string[] = [];

  // Lesiones activas
  const activeInjuries = client.injuries.filter(i => i.isActive);
  if (activeInjuries.length > 0) {
    reasons.push(`⚠️ Lesiones activas: ${activeInjuries.map(i => i.bodyPart).join(', ')}`);
  }

  // Equipamiento faltante
  const requiredEquipment = substitution.originalExercise.equipment;
  const missingEquipment = requiredEquipment.filter(eq => !client.equipment.includes(eq));
  if (missingEquipment.length > 0) {
    reasons.push(`🏋️ Equipo no disponible: ${missingEquipment.join(', ')}`);
  }

  // Mejores alternativas
  if (substitution.alternatives.length > 0) {
    const best = substitution.alternatives[0];
    reasons.push(`✅ Mejor alternativa: ${best.exercise.name} (${best.similarity}% similar)`);
  }

  return reasons.join('\n');
};
