import { useState, useEffect } from 'react';

export interface PRRecord {
  id: string;
  date: string; // YYYY-MM-DD
  exercise: string;
  mark: number;
  units: string; // e.g., 'kg', 'reps', 'min'
}

export interface EvolutionData {
  year: number;
  exercise: string;
  averageMark: number;
}

// Nuevas interfaces para el Performance Tracker
export interface PredictionData {
  exercise: string;
  predictedPR: number;
  confidenceInterval: [number, number];
  date: string;
}

export interface BiomechanicAnalysisData {
  exercise: string;
  analysisDate: string;
  feedback: string;
  score: number;
}

export interface EliteComparisonData {
  exercise: string;
  athleteName: string;
  athletePR: number;
  userPR: number;
  comparison: string;
}

export interface CoachingRecommendation {
  id: string;
  date: string;
  recommendation: string;
  status: 'pending' | 'completed';
}

export interface InjuryTrackingData {
  id: string;
  injuryType: string;
  startDate: string;
  recoveryDate: string | null;
  status: 'active' | 'recovered';
}

export interface NutritionSleepData {
  date: string;
  calories: number;
  sleepHours: number;
  quality: 'good' | 'average' | 'poor';
}

export interface PeriodizationPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  phase: string;
}

export interface FatigueAnalysisData {
  date: string;
  rpe: number; // Rate of perceived exertion
  hrv: number; // Heart Rate Variability
  status: 'fresh' | 'fatigued' | 'overtrained';
}

export interface SMARTGoal {
  id: string;
  goal: string;
  targetDate: string;
  isAchieved: boolean;
}

export interface MetricCorrelation {
  metricA: string;
  metricB: string;
  correlation: number;
  description: string;
}

export interface MultiVariableChartData {
  date: string;
  [key: string]: number | string; // Dynamic keys for different metrics
}

export interface HeatmapData {
  date: string;
  exercise: string;
  intensity: number; // e.g., 1-10
}

export interface AthleteComparison {
  id: string;
  athlete1: string;
  athlete2: string;
  exercise: string;
  metrics: { name: string; value1: number; value2: number }[];
}

interface HistorialMarcasData {
  prsRecords: PRRecord[];
  evolutionData: EvolutionData[];
  // Nuevos datos para el Performance Tracker
  predictions: PredictionData[];
  biomechanicAnalysis: BiomechanicAnalysisData[];
  eliteComparisons: EliteComparisonData[];
  coachingRecommendations: CoachingRecommendation[];
  injuryTracking: InjuryTrackingData[];
  nutritionSleep: NutritionSleepData[];
  periodizationPlans: PeriodizationPlan[];
  fatigueAnalysis: FatigueAnalysisData[];
  smartGoals: SMARTGoal[];
  metricCorrelations: MetricCorrelation[];
  multiVariableCharts: MultiVariableChartData[];
  heatmaps: HeatmapData[];
  athleteComparisons: AthleteComparison[];
}

// Mock data for demonstration
const mockPRs: PRRecord[] = [
  { id: '1', date: '2023-01-15', exercise: 'Sentadilla', mark: 100, units: 'kg' },
  { id: '2', date: '2023-03-20', exercise: 'Press Banca', mark: 80, units: 'kg' },
  { id: '3', date: '2023-06-10', exercise: 'Peso Muerto', mark: 120, units: 'kg' },
  { id: '4', date: '2024-01-22', exercise: 'Sentadilla', mark: 105, units: 'kg' },
  { id: '5', date: '2024-04-01', exercise: 'Press Banca', mark: 85, units: 'kg' },
  { id: '6', date: '2024-07-15', exercise: 'Peso Muerto', mark: 125, units: 'kg' },
  { id: '7', date: '2025-02-01', exercise: 'Sentadilla', mark: 110, units: 'kg' },
  { id: '8', date: '2025-05-10', exercise: 'Press Banca', mark: 90, units: 'kg' },
  { id: '9', date: '2025-08-20', exercise: 'Peso Muerto', mark: 130, units: 'kg' },
];

const mockEvolution: EvolutionData[] = [
  { year: 2023, exercise: 'Sentadilla', averageMark: 95 },
  { year: 2023, exercise: 'Press Banca', averageMark: 75 },
  { year: 2023, exercise: 'Peso Muerto', averageMark: 115 },
  { year: 2024, exercise: 'Sentadilla', averageMark: 102 },
  { year: 2024, exercise: 'Press Banca', averageMark: 82 },
  { year: 2024, exercise: 'Peso Muerto', averageMark: 122 },
  { year: 2025, exercise: 'Sentadilla', averageMark: 108 },
  { year: 2025, exercise: 'Press Banca', averageMark: 88 },
  { year: 2025, exercise: 'Peso Muerto', averageMark: 128 },
];

// Mock data for new features
const mockPredictions: PredictionData[] = [
  { exercise: 'Sentadilla', predictedPR: 115, confidenceInterval: [112, 118], date: '2025-12-01' },
  { exercise: 'Press Banca', predictedPR: 95, confidenceInterval: [92, 98], date: '2025-12-01' },
];

const mockBiomechanicAnalysis: BiomechanicAnalysisData[] = [
  { exercise: 'Sentadilla', analysisDate: '2025-09-20', feedback: 'Mejora la profundidad.', score: 7.5 },
];

const mockEliteComparisons: EliteComparisonData[] = [
  { exercise: 'Sentadilla', athleteName: 'John Doe', athletePR: 200, userPR: 110, comparison: 'Necesitas más volumen.' },
];

const mockCoachingRecommendations: CoachingRecommendation[] = [
  { id: 'rec1', date: '2025-09-25', recommendation: 'Aumenta la frecuencia de sentadilla.', status: 'pending' },
];

const mockInjuryTracking: InjuryTrackingData[] = [
  { id: 'inj1', injuryType: 'Dolor de rodilla', startDate: '2025-08-01', recoveryDate: null, status: 'active' },
];

const mockNutritionSleep: NutritionSleepData[] = [
  { date: '2025-09-27', calories: 2500, sleepHours: 7.5, quality: 'good' },
];

const mockPeriodizationPlans: PeriodizationPlan[] = [
  { id: 'plan1', name: 'Fuerza Máxima', startDate: '2025-10-01', endDate: '2025-12-31', phase: 'Bloque 1' },
];

const mockFatigueAnalysis: FatigueAnalysisData[] = [
  { date: '2025-09-27', rpe: 8, hrv: 45, status: 'fatigued' },
];

const mockSMARTGoals: SMARTGoal[] = [
  { id: 'goal1', goal: 'Alcanzar 120kg en sentadilla', targetDate: '2026-03-01', isAchieved: false },
];

const mockMetricCorrelations: MetricCorrelation[] = [
  { metricA: 'Sentadilla PR', metricB: 'Peso Muerto PR', correlation: 0.7, description: 'Correlación positiva fuerte.' },
];

const mockMultiVariableCharts: MultiVariableChartData[] = [
  { date: '2025-09-01', sentadilla: 108, pressBanca: 88, pesoMuerto: 128 },
  { date: '2025-09-15', sentadilla: 109, pressBanca: 89, pesoMuerto: 129 },
  { date: '2025-09-27', sentadilla: 110, pressBanca: 90, pesoMuerto: 130 },
];

const mockHeatmaps: HeatmapData[] = [
  { date: '2025-09-01', exercise: 'Sentadilla', intensity: 7 },
  { date: '2025-09-05', exercise: 'Sentadilla', intensity: 8 },
  { date: '2025-09-10', exercise: 'Press Banca', intensity: 6 },
];

const mockAthleteComparisons: AthleteComparison[] = [
  { id: 'comp1', athlete1: 'Usuario', athlete2: 'Atleta Elite', exercise: 'Sentadilla', metrics: [{ name: 'PR', value1: 110, value2: 200 }] },
];

export const useHistorialMarcas = () => {
  const [data, setData] = useState<HistorialMarcasData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setData({
          prsRecords: mockPRs,
          evolutionData: mockEvolution,
          predictions: mockPredictions,
          biomechanicAnalysis: mockBiomechanicAnalysis,
          eliteComparisons: mockEliteComparisons,
          coachingRecommendations: mockCoachingRecommendations,
          injuryTracking: mockInjuryTracking,
          nutritionSleep: mockNutritionSleep,
          periodizationPlans: mockPeriodizationPlans,
          fatigueAnalysis: mockFatigueAnalysis,
          smartGoals: mockSMARTGoals,
          metricCorrelations: mockMetricCorrelations,
          multiVariableCharts: mockMultiVariableCharts,
          heatmaps: mockHeatmaps,
          athleteComparisons: mockAthleteComparisons,
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export const addPRRecord = async (newRecord: Omit<PRRecord, 'id'>): Promise<PRRecord> => {
  // Simulate API call to add a new record
  return new Promise(resolve => {
    setTimeout(() => {
      const recordWithId = { ...newRecord, id: String(mockPRs.length + 1) };
      mockPRs.push(recordWithId); // In a real app, this would update a backend
      // For simplicity, we don't update mockEvolution here
      resolve(recordWithId);
    }, 300);
  });
};

// Nuevos endpoints simulados para el Performance Tracker
export const fetchIAPredictiva = async (): Promise<PredictionData[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockPredictions), 300));
};

export const fetchAnalisisBiomecanico = async (): Promise<BiomechanicAnalysisData[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockBiomechanicAnalysis), 300));
};

export const fetchComparativasElite = async (): Promise<EliteComparisonData[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockEliteComparisons), 300));
};

export const fetchCoachingVirtual = async (): Promise<CoachingRecommendation[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockCoachingRecommendations), 300));
};

export const fetchTrackingLesiones = async (): Promise<InjuryTrackingData[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockInjuryTracking), 300));
};

export const fetchIntegracionNutricion = async (): Promise<NutritionSleepData[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockNutritionSleep), 300));
};

export const fetchPeriodizacionAutomatica = async (): Promise<PeriodizationPlan[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockPeriodizationPlans), 300));
};

export const fetchAnalisisFatiga = async (): Promise<FatigueAnalysisData[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockFatigueAnalysis), 300));
};

export const fetchMetasSMART = async (): Promise<SMARTGoal[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockSMARTGoals), 300));
};

export const fetchCorrelacionesMetricas = async (): Promise<MetricCorrelation[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockMetricCorrelations), 300));
};

export const fetchGraficosMultiVariable = async (): Promise<MultiVariableChartData[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockMultiVariableCharts), 300));
};

export const fetchHeatmapsPerformance = async (): Promise<HeatmapData[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockHeatmaps), 300));
};

export const fetchPrediccionesVisuales = async (): Promise<PredictionData[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockPredictions), 300));
};

export const fetchComparadorAtletas = async (): Promise<AthleteComparison[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockAthleteComparisons), 300));
};

export const addCoachingRecommendation = async (newRecommendation: Omit<CoachingRecommendation, 'id'>): Promise<CoachingRecommendation> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const recWithId = { ...newRecommendation, id: `rec${mockCoachingRecommendations.length + 1}` };
      mockCoachingRecommendations.push(recWithId);
      resolve(recWithId);
    }, 300);
  });
};

export const updateInjuryStatus = async (id: string, status: 'active' | 'recovered', recoveryDate: string | null = null): Promise<InjuryTrackingData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const injuryIndex = mockInjuryTracking.findIndex(inj => inj.id === id);
      if (injuryIndex > -1) {
        mockInjuryTracking[injuryIndex] = { ...mockInjuryTracking[injuryIndex], status, recoveryDate };
        resolve(mockInjuryTracking[injuryIndex]);
      } else {
        reject(new Error('Injury not found'));
      }
    }, 300);
  });
};

export const addSMARTGoal = async (newGoal: Omit<SMARTGoal, 'id'>): Promise<SMARTGoal> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const goalWithId = { ...newGoal, id: `goal${mockSMARTGoals.length + 1}` };
      mockSMARTGoals.push(goalWithId);
      resolve(goalWithId);
    }, 300);
  });
};

export const updateSMARTGoalStatus = async (id: string, isAchieved: boolean): Promise<SMARTGoal> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const goalIndex = mockSMARTGoals.findIndex(goal => goal.id === id);
      if (goalIndex > -1) {
        mockSMARTGoals[goalIndex] = { ...mockSMARTGoals[goalIndex], isAchieved };
        resolve(mockSMARTGoals[goalIndex]);
      } else {
        reject(new Error('Goal not found'));
      }
    }, 300);
  });
};