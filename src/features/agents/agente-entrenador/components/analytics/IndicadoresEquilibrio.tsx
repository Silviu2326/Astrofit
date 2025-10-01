
import React, { useState, useEffect } from 'react';

interface ExerciseData {
  name: string;
  muscleGroup: string;
  isAntagonist?: boolean;
  laterality?: 'left' | 'right' | 'bilateral';
  weight: number;
  reps: number;
  sets: number;
  rpe: number;
}

interface StrengthRatios {
  squat: number;
  deadlift: number;
  benchPress: number;
}

interface RecoveryMetrics {
  hrv: number; // Heart Rate Variability (simulated)
  sleepHours: number;
  stressLevel: number; // 1-10
}

const mockExerciseData: ExerciseData[] = [
  { name: 'Press Banca', muscleGroup: 'chest', weight: 100, reps: 5, sets: 3, rpe: 8, laterality: 'bilateral' },
  { name: 'Remo con Barra', muscleGroup: 'back', weight: 90, reps: 5, sets: 3, rpe: 8, laterality: 'bilateral' },
  { name: 'Press Militar', muscleGroup: 'shoulders', weight: 50, reps: 8, sets: 3, rpe: 7, laterality: 'bilateral' },
  { name: 'Dominadas', muscleGroup: 'back', weight: 0, reps: 8, sets: 3, rpe: 8, laterality: 'bilateral' }, // Bodyweight
  { name: 'Sentadilla', muscleGroup: 'quads', weight: 120, reps: 5, sets: 3, rpe: 9, laterality: 'bilateral' },
  { name: 'Peso Muerto', muscleGroup: 'hamstrings', weight: 140, reps: 3, sets: 1, rpe: 9, laterality: 'bilateral' },
  { name: 'Curl de Biceps', muscleGroup: 'biceps', weight: 25, reps: 10, sets: 3, rpe: 7, laterality: 'bilateral' },
  { name: 'Extension de Triceps', muscleGroup: 'triceps', weight: 30, reps: 10, sets: 3, rpe: 7, laterality: 'bilateral' },
  { name: 'Zancadas Derecha', muscleGroup: 'quads', weight: 30, reps: 10, sets: 3, rpe: 7, laterality: 'right' },
  { name: 'Zancadas Izquierda', muscleGroup: 'quads', weight: 30, reps: 10, sets: 3, rpe: 7, laterality: 'left' },
];

const mockStrengthRatios: StrengthRatios = {
  squat: 120, // 1RM estimate
  deadlift: 140,
  benchPress: 100,
};

const mockRecoveryMetrics: RecoveryMetrics = {
  hrv: 50, // ms
  sleepHours: 7.5,
  stressLevel: 5,
};

const IndicadoresEquilibrio: React.FC = () => {
  const [exerciseData, setExerciseData] = useState<ExerciseData[]>(mockExerciseData);
  const [strengthRatios, setStrengthRatios] = useState<StrengthRatios>(mockStrengthRatios);
  const [recoveryMetrics, setRecoveryMetrics] = useState<RecoveryMetrics>(mockRecoveryMetrics);
  const [balanceIndicators, setBalanceIndicators] = useState<{ [key: string]: string }>({});
  const [strengthRatioAnalysis, setStrengthRatioAnalysis] = useState<string[]>([]);
  const [lateralityImbalances, setLateralityImbalances] = useState<string[]>([]);
  const [correctiveRecommendations, setCorrectiveRecommendations] = useState<string[]>([]);
  const [jointHealthDashboard, setJointHealthDashboard] = useState<string[]>([]);

  useEffect(() => {
    analyzeBalance();
    analyzeStrengthRatios();
    detectLateralityImbalances();
    generateCorrectiveRecommendations();
    updateJointHealthDashboard();
  }, [exerciseData, strengthRatios, recoveryMetrics]);

  const analyzeBalance = () => {
    const agonistAntagonistPairs: { [key: string]: { agonist: number; antagonist: number } } = {
      chest_back: { agonist: 0, antagonist: 0 },
      quads_hamstrings: { agonist: 0, antagonist: 0 },
      biceps_triceps: { agonist: 0, antagonist: 0 },
      shoulders_rear_delts: { agonist: 0, antagonist: 0 }, // Simplified for shoulders
    };

    exerciseData.forEach(ex => {
      const volume = ex.sets * ex.reps * ex.weight; // Simple volume metric
      switch (ex.muscleGroup) {
        case 'chest': agonistAntagonistPairs.chest_back.agonist += volume; break;
        case 'back': agonistAntagonistPairs.chest_back.antagonist += volume; break;
        case 'quads': agonistAntagonistPairs.quads_hamstrings.agonist += volume; break;
        case 'hamstrings': agonistAntagonistPairs.quads_hamstrings.antagonist += volume; break;
        case 'biceps': agonistAntagonistPairs.biceps_triceps.agonist += volume; break;
        case 'triceps': agonistAntagonistPairs.biceps_triceps.antagonist += volume; break;
        case 'shoulders': agonistAntagonistPairs.shoulders_rear_delts.agonist += volume; break;
        // For rear delts, we'd need specific exercises, simplifying for now
      }
    });

    const indicators: { [key: string]: string } = {};
    for (const pair in agonistAntagonistPairs) {
      const { agonist, antagonist } = agonistAntagonistPairs[pair];
      if (agonist === 0 && antagonist === 0) {
        indicators[pair] = 'No data';
        continue;
      }
      if (agonist > antagonist * 1.2) {
        indicators[pair] = 'Desequilibrio: Agonista dominante';
      } else if (antagonist > agonist * 1.2) {
        indicators[pair] = 'Desequilibrio: Antagonista dominante';
      } else {
        indicators[pair] = 'Equilibrado';
      }
    }
    setBalanceIndicators(indicators);
  };

  const analyzeStrengthRatios = () => {
    const analysis: string[] = [];
    const { squat, deadlift, benchPress } = strengthRatios;

    // Standard powerlifting ratios (approximate)
    // Deadlift should be ~1.1-1.2x Squat
    // Bench Press should be ~0.7-0.8x Squat

    if (squat > 0) {
      const dlToSquatRatio = deadlift / squat;
      if (dlToSquatRatio < 1.1) {
        analysis.push(`Advertencia: Ratio Peso Muerto/Sentadilla (${dlToSquatRatio.toFixed(2)}) es bajo. Ideal: 1.1-1.2.`);
      } else if (dlToSquatRatio > 1.25) {
        analysis.push(`Advertencia: Ratio Peso Muerto/Sentadilla (${dlToSquatRatio.toFixed(2)}) es alto. Ideal: 1.1-1.2.`);
      }

      const bpToSquatRatio = benchPress / squat;
      if (bpToSquatRatio < 0.7) {
        analysis.push(`Advertencia: Ratio Press Banca/Sentadilla (${bpToSquatRatio.toFixed(2)}) es bajo. Ideal: 0.7-0.8.`);
      } else if (bpToSquatRatio > 0.85) {
        analysis.push(`Advertencia: Ratio Press Banca/Sentadilla (${bpToSquatRatio.toFixed(2)}) es alto. Ideal: 0.7-0.8.`);
      }
    }
    setStrengthRatioAnalysis(analysis);
  };

  const detectLateralityImbalances = () => {
    const imbalances: string[] = [];
    const lateralVolumes: { [key: string]: { left: number; right: number } } = {};

    exerciseData.forEach(ex => {
      if (ex.laterality && ex.laterality !== 'bilateral') {
        if (!lateralVolumes[ex.muscleGroup]) {
          lateralVolumes[ex.muscleGroup] = { left: 0, right: 0 };
        }
        const volume = ex.sets * ex.reps * ex.weight;
        if (ex.laterality === 'left') {
          lateralVolumes[ex.muscleGroup].left += volume;
        } else if (ex.laterality === 'right') {
          lateralVolumes[ex.muscleGroup].right += volume;
        }
      }
    });

    for (const group in lateralVolumes) {
      const { left, right } = lateralVolumes[group];
      const difference = Math.abs(left - right);
      const percentageDifference = (difference / Math.max(left, right)) * 100;

      if (left > 0 && right > 0 && percentageDifference > 10) { // 10% threshold for warning
        imbalances.push(`Desequilibrio de lateralidad en ${group}: Izquierda (${left.toFixed(0)}) vs Derecha (${right.toFixed(0)}) - Diferencia del ${percentageDifference.toFixed(1)}%`);
      } else if ((left > 0 && right === 0) || (right > 0 && left === 0)) {
        imbalances.push(`Desequilibrio severo: Solo se entrena un lado en ${group}.`);
      }
    }
    setLateralityImbalances(imbalances);
  };

  const generateCorrectiveRecommendations = () => {
    const recommendations: string[] = [];
    // Based on balance indicators
    if (balanceIndicators.chest_back === 'Desequilibrio: Agonista dominante') {
      recommendations.push('Considera añadir más volumen de remo o ejercicios de espalda para equilibrar el pecho.');
    }
    if (balanceIndicators.quads_hamstrings === 'Desequilibrio: Agonista dominante') {
      recommendations.push('Incorpora más peso muerto rumano, buenos días o curls femorales para fortalecer los isquiotibiales.');
    }
    if (lateralityImbalances.length > 0) {
      recommendations.push('Realiza ejercicios unilaterales adicionales en el lado más débil o reduce el volumen en el lado fuerte.');
    }
    // Based on strength ratios
    if (strengthRatioAnalysis.some(msg => msg.includes('Peso Muerto/Sentadilla') && msg.includes('bajo'))) {
      recommendations.push('Enfócate en mejorar tu técnica y fuerza en peso muerto.');
    }
    setCorrectiveRecommendations(recommendations);
  };

  const updateJointHealthDashboard = () => {
    const healthStatus: string[] = [];
    // Simulate joint health based on recovery metrics and potential imbalances
    if (recoveryMetrics.hrv < 40 || recoveryMetrics.sleepHours < 6 || recoveryMetrics.stressLevel > 7) {
      healthStatus.push('Advertencia: Indicadores de recuperación bajos. Riesgo potencial de fatiga articular.');
    }
    if (Object.values(balanceIndicators).some(status => status.includes('Desequilibrio'))) {
      healthStatus.push('Atención: Desequilibrios musculares pueden afectar la salud articular a largo plazo.');
    }
    if (lateralityImbalances.length > 0) {
      healthStatus.push('Considera abordar los desequilibrios de lateralidad para prevenir problemas articulares.');
    }
    if (healthStatus.length === 0) {
      healthStatus.push('Salud articular y movilidad general parecen adecuadas. ¡Sigue así!');
    }
    setJointHealthDashboard(healthStatus);
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Indicadores de Equilibrio y Salud Articular</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Equilibrio Agonista/Antagonista</h3>
        <ul className="list-disc pl-5 text-gray-600">
          {Object.entries(balanceIndicators).map(([pair, status]) => (
            <li key={pair}>{pair.replace('_', '/').toUpperCase()}: <span className={status.includes('Desequilibrio') ? 'text-red-600 font-medium' : 'text-green-600'}>{status}</span></li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Análisis de Ratios de Fuerza (1RM Estimado)</h3>
        <p className="text-gray-600">Sentadilla: {strengthRatios.squat}kg, Peso Muerto: {strengthRatios.deadlift}kg, Press Banca: {strengthRatios.benchPress}kg</p>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          {strengthRatioAnalysis.length > 0 ? (
            strengthRatioAnalysis.map((msg, i) => <li key={i} className="text-yellow-700">{msg}</li>)
          ) : (
            <li>Ratios de fuerza dentro de los parámetros estándar.</li>
          )}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Detector de Desequilibrios por Lateralidad</h3>
        <ul className="list-disc pl-5 text-gray-600">
          {lateralityImbalances.length > 0 ? (
            lateralityImbalances.map((msg, i) => <li key={i} className="text-red-700">{msg}</li>)
          ) : (
            <li>No se detectaron desequilibrios significativos por lateralidad.</li>
          )}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Recomendaciones de Ejercicios Correctivos</h3>
        <ul className="list-disc pl-5 text-gray-600">
          {correctiveRecommendations.length > 0 ? (
            correctiveRecommendations.map((rec, i) => <li key={i} className="text-blue-700">{rec}</li>)
          ) : (
            <li>No se requieren recomendaciones correctivas en este momento.</li>
          )}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Dashboard de Salud Articular y Movilidad</h3>
        <p className="text-gray-600">Métricas de Recuperación (Simuladas): HRV: {recoveryMetrics.hrv}ms, Sueño: {recoveryMetrics.sleepHours}h, Estrés: {recoveryMetrics.stressLevel}/10</p>
        <ul className="list-disc pl-5 text-gray-600 mt-2">
          {jointHealthDashboard.map((status, i) => <li key={i}>{status}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default IndicadoresEquilibrio;
