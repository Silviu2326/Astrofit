interface TeamStats {
  name: string;
  metrics: {
    attack: number;
    defense: number;
    midfield: number;
    overall: number;
  };
}

interface Match {
  id: string;
  date: string;
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  winner: string;
}

interface CompetitiveAnalysisResult {
  teamA: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  teamB: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  recommendations: string[];
}

interface TacticalRecommendation {
  id: string;
  type: string;
  description: string;
  effectiveness: number;
}

interface SimulationResult {
  scenario: string;
  probabilityAWin: number;
  probabilityBWin: number;
  probabilityDraw: number;
  predictedScore: string;
}

interface PlayerMismatch {
  playerA: string;
  playerB: string;
  positionA: string;
  positionB: string;
  advantage: string;
}

interface KeyPlayerAnalysisResult {
  teamA: PlayerMismatch[];
  teamB: PlayerMismatch[];
}

interface ScoutingReport {
  opponent: string;
  keyPlayers: string[];
  tacticalTendencies: string[];
  recentForm: string[];
}

interface EnvironmentalConditions {
  location: string;
  weather: string;
  stadiumType: string;
  impact: string;
}

interface PredictedLineup {
  teamName: string;
  formation: string;
  players: string[];
}

const mockTeamStats: Record<string, TeamStats> = {
  'Equipo A': {
    name: 'Equipo A',
    metrics: {
      attack: 85,
      defense: 75,
      midfield: 70,
      overall: 80,
    },
  },
  'Equipo B': {
    name: 'Equipo B',
    metrics: {
      attack: 70,
      defense: 80,
      midfield: 85,
      overall: 78,
    },
  },
};

const mockHistoricalMatches: Match[] = [
  {
    id: '1',
    date: '2023-03-10',
    teamA: 'Equipo A',
    teamB: 'Equipo B',
    scoreA: 2,
    scoreB: 1,
    winner: 'Equipo A',
  },
  {
    id: '2',
    date: '2023-06-20',
    teamA: 'Equipo B',
    teamB: 'Equipo A',
    scoreA: 0,
    scoreB: 0,
    winner: 'Empate',
  },
  {
    id: '3',
    date: '2023-09-15',
    teamA: 'Equipo A',
    teamB: 'Equipo B',
    scoreA: 1,
    scoreB: 3,
    winner: 'Equipo B',
  },
  {
    id: '4',
    date: '2024-01-05',
    teamA: 'Equipo B',
    teamB: 'Equipo A',
    scoreA: 2,
    scoreB: 2,
    winner: 'Empate',
  },
  {
    id: '5',
    date: '2024-04-12',
    teamA: 'Equipo A',
    teamB: 'Equipo B',
    scoreA: 3,
    scoreB: 0,
    winner: 'Equipo A',
  },
];

const mockCompetitiveAnalysis: CompetitiveAnalysisResult = {
  teamA: {
    strengths: ['Ataque por bandas', 'Presión alta'],
    weaknesses: ['Defensa a bal??n parado'],
    opportunities: ['Espacios a la espalda de los laterales'],
    threats: ['Contraataques r??pidos'],
  },
  teamB: {
    strengths: ['Control del mediocampo', 'Transiciones r??pidas'],
    weaknesses: ['Fragilidad defensiva por el centro'],
    opportunities: ['Errores en la salida de bal??n del rival'],
    threats: ['Juego a??reo del oponente'],
  },
  recommendations: [
    'Explotar las bandas contra Equipo B.',
    'Reforzar la marca en bal??n parado para Equipo A.',
  ],
};

const mockTacticalRecommendations: TacticalRecommendation[] = [
  {
    id: 'rec1',
    type: 'Ofensiva',
    description: 'Ataque por las bandas con centros al ??rea.',
    effectiveness: 0.8,
  },
  {
    id: 'rec2',
    type: 'Defensiva',
    description: 'Presi??n alta en campo contrario para forzar errores.',
    effectiveness: 0.7,
  },
];

const mockSimulationResult: SimulationResult = {
  scenario: 'Normal',
  probabilityAWin: 0.45,
  probabilityBWin: 0.30,
  probabilityDraw: 0.25,
  predictedScore: '2-1',
};

const mockKeyPlayerAnalysis: KeyPlayerAnalysisResult = {
  teamA: [
    { playerA: 'Delantero A', playerB: 'Defensa Central B', positionA: 'Delantero', positionB: 'Defensa Central', advantage: 'Equipo A' },
  ],
  teamB: [
    { playerA: 'Mediocampista B', playerB: 'Mediocampista A', positionA: 'Mediocampista', positionB: 'Mediocampista', advantage: 'Equipo B' },
  ],
};

const mockScoutingReport: ScoutingReport = {
  opponent: 'Equipo B',
  keyPlayers: ['Delantero Estrella B', 'Mediocampista Creativo B'],
  tacticalTendencies: ['Juego de posesi??n', 'Contragolpes r??pidos'],
  recentForm: ['Gan?? 3, Empat?? 1, Perdi?? 1 en los ??ltimos 5 partidos'],
};

const mockEnvironmentalConditions: EnvironmentalConditions = {
  location: 'Estadio Principal',
  weather: 'Soleado, 25??C',
  stadiumType: 'Abierto',
  impact: 'Poca influencia en el juego.',
};

const mockPredictedLineups: PredictedLineup[] = [
  {
    teamName: 'Equipo A',
    formation: '4-3-3',
    players: ['Portero A', 'Lateral Izq A', 'Central A1', 'Central A2', 'Lateral Der A', 'Medio A1', 'Medio A2', 'Medio A3', 'Extremo A1', 'Extremo A2', 'Delantero A'],
  },
  {
    teamName: 'Equipo B',
    formation: '4-2-3-1',
    players: ['Portero B', 'Lateral Izq B', 'Central B1', 'Central B2', 'Lateral Der B', 'Medio B1', 'Medio B2', 'Medio Ofensivo B', 'Extremo B1', 'Extremo B2', 'Delantero B'],
  },
];

export const getTeamStats = async (teamName: string): Promise<TeamStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTeamStats[teamName]);
    }, 500);
  });
};

export const getHistoricalMatches = async (
  teamA: string,
  teamB: string
): Promise<Match[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredMatches = mockHistoricalMatches.filter(
        (match) =>
          (match.teamA === teamA && match.teamB === teamB) ||
          (match.teamA === teamB && match.teamB === teamA)
      );
      resolve(filteredMatches);
    }, 500);
  });
};

export const getCompetitiveAnalysis = async (): Promise<CompetitiveAnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCompetitiveAnalysis);
    }, 500);
  });
};

export const getTacticalRecommendations = async (): Promise<TacticalRecommendation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTacticalRecommendations);
    }, 500);
  });
};

export const runSimulation = async (teamA: string, teamB: string): Promise<SimulationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real scenario, this would run a complex simulation algorithm
      resolve(mockSimulationResult);
    }, 500);
  });
};

export const getKeyPlayerAnalysis = async (): Promise<KeyPlayerAnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockKeyPlayerAnalysis);
    }, 500);
  });
};

export const getScoutingReport = async (opponentName: string): Promise<ScoutingReport> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockScoutingReport);
    }, 500);
  });
};

export const getEnvironmentalConditions = async (): Promise<EnvironmentalConditions> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockEnvironmentalConditions);
    }, 500);
  });
};

export const getPredictedLineups = async (): Promise<PredictedLineup[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPredictedLineups);
    }, 500);
  });
};
