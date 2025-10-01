interface TeamPerformance {
  team: string;
  weeklyLoad: number;
  injuryPercentage: number;
  trainingAdherence: number;
  availability: number;
  performance: number;
}

interface ExecutiveSummary {
  totalTeams: number;
  averageWeeklyLoad: number;
  averageInjuryPercentage: number;
  overallPerformance: string;
}

export const getTeamPerformanceData = (): TeamPerformance[] => {
  // Mock data for team performance
  return [
    {
      team: 'Equipo A',
      weeklyLoad: 1200,
      injuryPercentage: 5,
      trainingAdherence: 90,
      availability: 95,
      performance: 85,
    },
    {
      team: 'Equipo B',
      weeklyLoad: 1100,
      injuryPercentage: 8,
      trainingAdherence: 85,
      availability: 92,
      performance: 80,
    },
    {
      team: 'Equipo C',
      weeklyLoad: 1300,
      injuryPercentage: 3,
      trainingAdherence: 95,
      availability: 98,
      performance: 90,
    },
    {
      team: 'Equipo D',
      weeklyLoad: 1000,
      injuryPercentage: 10,
      trainingAdherence: 80,
      availability: 90,
      performance: 75,
    },
  ];
};

export const getExecutiveSummary = (): ExecutiveSummary => {
  const teamData = getTeamPerformanceData();
  const totalTeams = teamData.length;
  const averageWeeklyLoad = teamData.reduce((sum, team) => sum + team.weeklyLoad, 0) / totalTeams;
  const averageInjuryPercentage = teamData.reduce((sum, team) => sum + team.injuryPercentage, 0) / totalTeams;
  const overallPerformance = averageInjuryPercentage < 7 ? 'Excelente' : 'Requiere Atención';

  return {
    totalTeams,
    averageWeeklyLoad,
    averageInjuryPercentage,
    overallPerformance,
  };
};

// New API functions for advanced analytics

export const connectWebSocket = (onMessage: (data: any) => void) => {
  console.log('Simulating WebSocket connection...');
  // In a real application, this would establish a WebSocket connection.
  // For now, we'll simulate real-time updates with a setInterval.
  let counter = 0;
  const interval = setInterval(() => {
    counter++;
    const realTimeData = {
      timestamp: new Date().toISOString(),
      metric1: Math.random() * 100,
      metric2: Math.random() * 50,
      updateCount: counter,
    };
    onMessage(realTimeData);
    if (counter === 10) { // Stop after 10 updates for this mock
      clearInterval(interval);
      console.log('Simulated WebSocket disconnected.');
    }
  }, 2000); // Send updates every 2 seconds

  return () => {
    clearInterval(interval);
    console.log('WebSocket connection closed (simulated).');
  };
};

interface PredictiveAnalysisResult {
  futurePerformance: number;
  trend: string;
  confidence: number;
}

export const getPredictiveAnalysis = (teamId: string): Promise<PredictiveAnalysisResult> => {
  console.log(`Fetching predictive analysis for team: ${teamId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        futurePerformance: Math.random() * 100,
        trend: Math.random() > 0.5 ? 'Upward' : 'Downward',
        confidence: parseFloat((Math.random() * (0.95 - 0.7) + 0.7).toFixed(2)), // 70-95%
      });
    }, 1500);
  });
};

interface BenchmarkingData {
  category: string;
  teamAverage: number;
  industryAverage: number;
  topPerformer: number;
}

export const getBenchmarkingData = (category: string): Promise<BenchmarkingData> => {
  console.log(`Fetching benchmarking data for category: ${category}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const teamAvg = Math.random() * 100;
      resolve({
        category,
        teamAverage: teamAvg,
        industryAverage: teamAvg * (Math.random() * (1.2 - 0.8) + 0.8), // +/- 20% of team avg
        topPerformer: teamAvg * (Math.random() * (1.5 - 1.1) + 1.1), // +10-50% of team avg
      });
    }, 1000);
  });
};
