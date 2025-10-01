
import React, { useState, useEffect } from 'react';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  isAntagonist?: boolean;
  laterality?: 'left' | 'right' | 'bilateral';
  sets: number;
  reps: number;
  weight: number;
  rpe: number; // Rate of Perceived Exertion
}

interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
}

interface ValidationResult {
  isValid: boolean;
  messages: string[];
  warnings: string[];
  fatigue: { [key: string]: number };
  imbalances: string[];
}

const muscleGroupVolumes: { [key: string]: { min: number; max: number } } = {
  chest: { min: 12, max: 20 },
  back: { min: 12, max: 20 },
  shoulders: { min: 8, max: 15 },
  quads: { min: 10, max: 18 },
  hamstrings: { min: 8, max: 15 },
  biceps: { min: 6, max: 12 },
  triceps: { min: 6, max: 12 },
  calves: { min: 6, max: 12 },
  glutes: { min: 10, max: 18 },
};

const optimalFrequencies: { [key: string]: { min: number; max: number } } = {
  chest: { min: 2, max: 3 },
  back: { min: 2, max: 3 },
  shoulders: { min: 2, max: 3 },
  quads: { min: 2, max: 3 },
  hamstrings: { min: 2, max: 3 },
  biceps: { min: 2, max: 3 },
  triceps: { min: 2, max: 3 },
  calves: { min: 2, max: 3 },
  glutes: { min: 2, max: 3 },
};

const ValidadorRutinas: React.FC = () => {
  const [routine, setRoutine] = useState<Routine>({
    id: 'mock-routine-1',
    name: 'Rutina de Ejemplo',
    exercises: [
      { id: 'ex1', name: 'Press Banca', muscleGroup: 'chest', sets: 3, reps: 8, weight: 80, rpe: 8, laterality: 'bilateral' },
      { id: 'ex2', name: 'Remo con Barra', muscleGroup: 'back', sets: 3, reps: 10, weight: 70, rpe: 7, laterality: 'bilateral' },
      { id: 'ex3', name: 'Sentadilla', muscleGroup: 'quads', sets: 4, reps: 6, weight: 100, rpe: 9, laterality: 'bilateral' },
      { id: 'ex4', name: 'Curl de Biceps', muscleGroup: 'biceps', sets: 3, reps: 12, weight: 20, rpe: 7, laterality: 'bilateral' },
      { id: 'ex5', name: 'Extension de Triceps', muscleGroup: 'triceps', sets: 3, reps: 12, weight: 25, rpe: 7, laterality: 'bilateral' },
      { id: 'ex6', name: 'Press de Hombros Mancuernas', muscleGroup: 'shoulders', sets: 3, reps: 10, weight: 25, rpe: 8, laterality: 'bilateral' },
      { id: 'ex7', name: 'Zancadas Derecha', muscleGroup: 'quads', sets: 3, reps: 10, weight: 30, rpe: 7, laterality: 'right' },
      { id: 'ex8', name: 'Zancadas Izquierda', muscleGroup: 'quads', sets: 3, reps: 10, weight: 30, rpe: 7, laterality: 'left' },
    ],
  });
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  useEffect(() => {
    validateRoutine(routine);
  }, [routine]);

  const calculateVolume = (exercises: Exercise[]) => {
    const volume: { [key: string]: number } = {};
    exercises.forEach(ex => {
      const totalSets = ex.sets;
      volume[ex.muscleGroup] = (volume[ex.muscleGroup] || 0) + totalSets;
    });
    return volume;
  };

  const calculateFatigue = (exercises: Exercise[]) => {
    const fatigue: { [key: string]: number } = {};
    exercises.forEach(ex => {
      // Simple fatigue calculation: sets * reps * weight * RPE factor (e.g., RPE 10 = 1, RPE 5 = 0.5)
      const rpeFactor = ex.rpe / 10;
      const exerciseFatigue = ex.sets * ex.reps * ex.weight * rpeFactor;
      fatigue[ex.muscleGroup] = (fatigue[ex.muscleGroup] || 0) + exerciseFatigue;
    });
    return fatigue;
  };

  const detectLateralityImbalances = (exercises: Exercise[]) => {
    const imbalances: string[] = [];
    const lateralExercises: { [key: string]: { left: number; right: number } } = {};

    exercises.forEach(ex => {
      if (ex.laterality && ex.laterality !== 'bilateral') {
        if (!lateralExercises[ex.muscleGroup]) {
          lateralExercises[ex.muscleGroup] = { left: 0, right: 0 };
        }
        const totalVolume = ex.sets * ex.reps * ex.weight; // Simple volume for comparison
        if (ex.laterality === 'left') {
          lateralExercises[ex.muscleGroup].left += totalVolume;
        } else if (ex.laterality === 'right') {
          lateralExercises[ex.muscleGroup].right += totalVolume;
        }
      }
    });

    for (const group in lateralExercises) {
      const { left, right } = lateralExercises[group];
      const difference = Math.abs(left - right);
      const percentageDifference = (difference / Math.max(left, right)) * 100;

      if (left > 0 && right > 0 && percentageDifference > 15) { // Threshold for imbalance
        imbalances.push(`Desequilibrio de lateralidad en ${group}: Izquierda (${left.toFixed(0)}) vs Derecha (${right.toFixed(0)}) - Diferencia del ${percentageDifference.toFixed(1)}%`);
      } else if ((left > 0 && right === 0) || (right > 0 && left === 0)) {
        imbalances.push(`Desequilibrio de lateralidad severo en ${group}: Solo se entrena un lado.`);
      }
    }
    return imbalances;
  };

  const validateRoutine = (currentRoutine: Routine) => {
    const messages: string[] = [];
    const warnings: string[] = [];
    let isValid = true;

    const volumePerMuscleGroup = calculateVolume(currentRoutine.exercises);
    const accumulatedFatigue = calculateFatigue(currentRoutine.exercises);
    const lateralityImbalances = detectLateralityImbalances(currentRoutine.exercises);

    // Validate Volume
    for (const group in volumePerMuscleGroup) {
      const volume = volumePerMuscleGroup[group];
      const recommended = muscleGroupVolumes[group];

      if (recommended) {
        if (volume < recommended.min) {
          messages.push(`Subcarga detectada en ${group}: ${volume} series. Recomendado: ${recommended.min}-${recommended.max} series.`);
          isValid = false;
        } else if (volume > recommended.max) {
          messages.push(`Sobrecarga potencial en ${group}: ${volume} series. Recomendado: ${recommended.min}-${recommended.max} series.`);
          isValid = false;
        } else {
          warnings.push(`Volumen adecuado para ${group}: ${volume} series.`);
        }
      } else {
        warnings.push(`No hay recomendaciones de volumen para el grupo muscular: ${group}.`);
      }
    }

    // Validate Frequency (simplified for a single routine, assuming this routine is one session of a weekly plan)
    // For a full frequency validation, we'd need the entire weekly schedule.
    // Here, we'll just warn if a muscle group is hit only once, assuming optimal is 2-3x.
    const muscleGroupHits: { [key: string]: number } = {};
    currentRoutine.exercises.forEach(ex => {
      muscleGroupHits[ex.muscleGroup] = (muscleGroupHits[ex.muscleGroup] || 0) + 1;
    });

    for (const group in muscleGroupHits) {
      const hits = muscleGroupHits[group];
      const optimal = optimalFrequencies[group];
      if (optimal && hits < optimal.min) {
        warnings.push(`Frecuencia potencialmente baja para ${group}: ${hits} veces en esta rutina. Óptimo: ${optimal.min}-${optimal.max} veces/semana.`);
      }
    }

    // Add laterality imbalances to messages
    if (lateralityImbalances.length > 0) {
      messages.push(...lateralityImbalances);
      isValid = false;
    }

    setValidationResult({
      isValid,
      messages,
      warnings,
      fatigue: accumulatedFatigue,
      imbalances: lateralityImbalances,
    });
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Validador de Rutinas</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-700">Rutina Actual: {routine.name}</h3>
        <ul className="list-disc pl-5 text-gray-600">
          {routine.exercises.map(ex => (
            <li key={ex.id}>{ex.name} ({ex.muscleGroup}) - {ex.sets}x{ex.reps} @ {ex.weight}kg (RPE: {ex.rpe}) {ex.laterality ? `(${ex.laterality})` : ''}</li>
          ))}
        </ul>
      </div>

      {validationResult && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Resultados de Validación</h3>
          <div className={`p-3 rounded-md ${validationResult.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="font-bold">{validationResult.isValid ? 'Rutina Validada: Sin problemas críticos.' : 'Rutina con Problemas Detectados.'}</p>
          </div>

          {validationResult.messages.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <h4 className="font-semibold text-red-700">Alertas Críticas:</h4>
              <ul className="list-disc pl-5 text-red-600">
                {validationResult.messages.map((msg, i) => <li key={i}>{msg}</li>)}
              </ul>
            </div>
          )}

          {validationResult.warnings.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <h4 className="font-semibold text-yellow-700">Advertencias y Sugerencias:</h4>
              <ul className="list-disc pl-5 text-yellow-600">
                {validationResult.warnings.map((msg, i) => <li key={i}>{msg}</li>)}
              </ul>
            </div>
          )}

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-semibold text-blue-700">Fatiga Acumulada (Estimada):</h4>
            <ul className="list-disc pl-5 text-blue-600">
              {Object.entries(validationResult.fatigue).map(([group, value]) => (
                <li key={group}>{group}: {value.toFixed(2)} unidades</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidadorRutinas;
