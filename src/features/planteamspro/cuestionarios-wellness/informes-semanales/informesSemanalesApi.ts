
export interface DailyWellnessData {
  day: string;
  sleep: number; // Hours
  fatigue: number; // Scale 1-5 (1: rested, 5: exhausted)
  mood: number; // Scale 1-5 (1: low, 5: high)
}

export interface AthleteWellnessSummary {
  id: string;
  name: string;
  averageSleep: number;
  averageFatigue: number;
  averageMood: number;
}

export interface WeeklyWellnessReport {
  week: string;
  startDate: string;
  endDate: string;
  dailyAverages: DailyWellnessData[];
  teamSummary: AthleteWellnessSummary[];
}

// Simulated API call to fetch weekly wellness data
export const fetchWeeklyWellnessReport = async (weekIdentifier: string): Promise<WeeklyWellnessReport> => {
  // In a real application, this would be an actual API call
  console.log(`Fetching wellness report for week: ${weekIdentifier}`);

  // Simulate data for current week
  if (weekIdentifier === 'current') {
    return {
      week: 'Semana Actual',
      startDate: '2025-09-23',
      endDate: '2025-09-29',
      dailyAverages: [
        { day: 'Lunes', sleep: 7.5, fatigue: 2, mood: 4 },
        { day: 'Martes', sleep: 8.0, fatigue: 1, mood: 5 },
        { day: 'Miércoles', sleep: 6.8, fatigue: 3, mood: 3 },
        { day: 'Jueves', sleep: 7.2, fatigue: 2, mood: 4 },
        { day: 'Viernes', sleep: 7.0, fatigue: 2, mood: 4 },
        { day: 'Sábado', sleep: 8.5, fatigue: 1, mood: 5 },
        { day: 'Domingo', sleep: 7.8, fatigue: 2, mood: 4 },
      ],
      teamSummary: [
        { id: 'ath1', name: 'Atleta A', averageSleep: 7.5, averageFatigue: 2.0, averageMood: 4.0 },
        { id: 'ath2', name: 'Atleta B', averageSleep: 7.0, averageFatigue: 2.5, averageMood: 3.5 },
        { id: 'ath3', name: 'Atleta C', averageSleep: 8.2, averageFatigue: 1.5, averageMood: 4.5 },
      ],
    };
  } else if (weekIdentifier === 'previous') {
    // Simulate data for previous week
    return {
      week: 'Semana Anterior',
      startDate: '2025-09-16',
      endDate: '2025-09-22',
      dailyAverages: [
        { day: 'Lunes', sleep: 7.0, fatigue: 3, mood: 3 },
        { day: 'Martes', sleep: 7.5, fatigue: 2, mood: 4 },
        { day: 'Miércoles', sleep: 6.5, fatigue: 4, mood: 2 },
        { day: 'Jueves', sleep: 7.0, fatigue: 3, mood: 3 },
        { day: 'Viernes', sleep: 6.8, fatigue: 3, mood: 3 },
        { day: 'Sábado', sleep: 8.0, fatigue: 2, mood: 4 },
        { day: 'Domingo', sleep: 7.2, fatigue: 3, mood: 3 },
      ],
      teamSummary: [
        { id: 'ath1', name: 'Atleta A', averageSleep: 7.2, averageFatigue: 2.8, averageMood: 3.5 },
        { id: 'ath2', name: 'Atleta B', averageSleep: 6.8, averageFatigue: 3.0, averageMood: 3.0 },
        { id: 'ath3', name: 'Atleta C', averageSleep: 7.9, averageFatigue: 2.0, averageMood: 4.0 },
      ],
    };
  }

  throw new Error('Weekly wellness report not found for the given identifier.');
};

export interface SeasonalPattern {
  id: string;
  name: string;
  description: string;
  patternData: any; // Placeholder for actual pattern data structure
}

export interface PredictionModel {
  id: string;
  name: string;
  modelType: string;
  predictionData: any; // Placeholder for actual prediction data structure
}

export interface CorrelationAnalysisResult {
  id: string;
  metric1: string;
  metric2: string;
  correlationCoefficient: number;
  p_value: number;
  analysisDetails: string;
}

export interface OvertrainingRisk {
  athleteId: string;
  athleteName: string;
  riskLevel: 'low' | 'medium' | 'high';
  indicators: string[];
  recommendations: string[];
}

export interface AutomaticReport {
  reportId: string;
  title: string;
  dateGenerated: string;
  summary: string;
  keyInsights: string[];
  reportContent: any; // Placeholder for detailed report content
}

export interface BenchmarkingData {
  teamId: string;
  teamName: string;
  metric: string;
  value: number;
  percentile: number;
}

export interface TrainingLoadRecommendation {
  athleteId: string;
  athleteName: string;
  recommendedLoad: string; // e.g., 'increase', 'maintain', 'decrease'
  reasoning: string;
  suggestedActivities: string[];
}

// Simulated API call for seasonal patterns
export const fetchSeasonalPatterns = async (): Promise<SeasonalPattern[]> => {
  console.log('Fetching seasonal patterns');
  return [
    { id: 'pattern1', name: 'Patrón de Bienestar Estacional', description: 'Análisis de ciclos anuales de bienestar.', patternData: {} },
    { id: 'pattern2', name: 'Patrón de Carga Semanal', description: 'Identificación de patrones de carga de entrenamiento semanales.', patternData: {} },
  ];
};

// Simulated API call for prediction models
export const fetchPredictionModels = async (): Promise<PredictionModel[]> => {
  console.log('Fetching prediction models');
  return [
    { id: 'pred1', name: 'Modelo de Predicción de Rendimiento', modelType: 'machine_learning', predictionData: {} },
    { id: 'pred2', name: 'Modelo de Predicción de Lesiones', modelType: 'statistical', predictionData: {} },
  ];
};

// Simulated API call for correlation analysis
export const fetchCorrelationAnalysis = async (): Promise<CorrelationAnalysisResult[]> => {
  console.log('Fetching correlation analysis results');
  return [
    { id: 'corr1', metric1: 'Wellness Score', metric2: 'Resultados Partido', correlationCoefficient: 0.75, p_value: 0.01, analysisDetails: 'Fuerte correlación positiva.' },
  ];
};

// Simulated API call for overtraining detection
export const fetchOvertrainingRisk = async (athleteId?: string): Promise<OvertrainingRisk[]> => {
  console.log(`Fetching overtraining risk for athlete: ${athleteId || 'all'}`);
  return [
    { athleteId: 'ath1', athleteName: 'Atleta A', riskLevel: 'medium', indicators: ['fatiga alta', 'bajo rendimiento'], recommendations: ['reducir carga', 'descanso activo'] },
    { athleteId: 'ath2', athleteName: 'Atleta B', riskLevel: 'low', indicators: [], recommendations: [] },
  ];
};

// Simulated API call for automatic reports
export const fetchAutomaticReports = async (): Promise<AutomaticReport[]> => {
  console.log('Fetching automatic reports');
  return [
    { reportId: 'rep1', title: 'Reporte Semanal de Rendimiento', dateGenerated: '2025-09-28', summary: 'Resumen de la semana.', keyInsights: ['Mejora en el sueño', 'Rendimiento consistente'], reportContent: {} },
  ];
};

// Simulated API call for benchmarking data
export const fetchBenchmarkingData = async (): Promise<BenchmarkingData[]> => {
  console.log('Fetching benchmarking data');
  return [
    { teamId: 'teamX', teamName: 'Equipo X', metric: 'Average Sleep', value: 7.8, percentile: 80 },
    { teamId: 'teamY', teamName: 'Equipo Y', metric: 'Average Fatigue', value: 2.1, percentile: 60 },
  ];
};

// Simulated API call for training load recommendations
export const fetchTrainingLoadRecommendations = async (teamId: string): Promise<TrainingLoadRecommendation[]> => {
  console.log(`Fetching training load recommendations for team: ${teamId}`);
  return [
    { athleteId: 'ath1', athleteName: 'Atleta A', recommendedLoad: 'maintain', reasoning: 'Buen estado de forma.', suggestedActivities: ['entrenamiento de fuerza'] },
    { athleteId: 'ath2', athleteName: 'Atleta B', recommendedLoad: 'decrease', reasoning: 'Signos de fatiga.', suggestedActivities: ['descanso activo', 'recuperación'] },
  ];
};
