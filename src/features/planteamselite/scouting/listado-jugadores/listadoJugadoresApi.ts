import { PlaceholderImages } from '../../../../utils/placeholderImages';
export interface Prospecto {
  id: string;
  nombre: string;
  edad: number;
  posicion: string;
  clubActual: string;
  nacionalidad: string;
  fotoUrl: string;
  nivel: 'Bajo' | 'Medio' | 'Alto';
  potencial: 'Bajo' | 'Medio' | 'Alto' | 'Estrella';
  estado: 'seguimiento activo' | 'en evaluación' | 'descartado' | 'fichado';
  caracteristicas: string[]; // Para búsqueda avanzada
}

export interface Recommendation {
  playerId: string;
  playerName: string;
  reason: string;
  fitScore: number;
}

export interface ScoutingNetworkProfile {
  agentId: string;
  agentName: string;
  specialization: string;
  contact: string;
  playersRepresented: string[];
}

export interface CompetitiveIntel {
  playerId: string;
  playerName: string;
  interestedClubs: string[];
  lastUpdated: string;
}

export interface MarketAlert {
  alertId: string;
  playerId: string;
  playerName: string;
  eventType: 'entra_mercado' | 'cambio_valor' | 'interes_club';
  date: string;
  details: string;
}

export interface AutomatedValuation {
  playerId: string;
  playerName: string;
  currentValue: number;
  potentialValue: number;
  valuationDate: string;
  metrics: { [key: string]: number };
}

export interface TransfermarktData {
  playerId: string;
  playerName: string;
  marketValue: number;
  contractUntil: string;
  clubHistory: { club: string; years: string }[];
}

export interface CollaborativeReport {
  reportId: string;
  playerId: string;
  playerName: string;
  scoutName: string;
  date: string;
  content: string;
  rating: number;
}

export interface PredictionValue {
  playerId: string;
  playerName: string;
  predictedValue: number;
  predictionDate: string;
  comparablePlayers: string[];
}

// Simulación de una API para obtener prospectos
export const fetchProspectos = async (filters?: any): Promise<Prospecto[]> => {
  // Aquí se simularía una llamada a una API real
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockProspectos: Prospecto[] = [
        {
          id: '1',
          nombre: 'Juan Pérez',
          edad: 18,
          posicion: 'Delantero',
          clubActual: 'Cantera FC',
          nacionalidad: 'Española',
          fotoUrl: PlaceholderImages.avatar(150),
          nivel: 'Medio',
          potencial: 'Estrella',
          estado: 'seguimiento activo',
          caracteristicas: ['Velocidad', 'Regate', 'Definición'],
        },
        {
          id: '2',
          nombre: 'Carlos García',
          edad: 20,
          posicion: 'Centrocampista',
          clubActual: 'Atlético Juvenil',
          nacionalidad: 'Mexicana',
          fotoUrl: PlaceholderImages.avatar(150),
          nivel: 'Alto',
          potencial: 'Alto',
          estado: 'en evaluación',
          caracteristicas: ['Pase', 'Visión', 'Recuperación'],
        },
        {
          id: '3',
          nombre: 'Pedro López',
          edad: 17,
          posicion: 'Defensa',
          clubActual: 'Jóvenes Promesas',
          nacionalidad: 'Argentina',
          fotoUrl: PlaceholderImages.avatar(150),
          nivel: 'Bajo',
          potencial: 'Medio',
          estado: 'descartado',
          caracteristicas: ['Fuerza', 'Marcaje', 'Juego aéreo'],
        },
      ];
      resolve(mockProspectos);
    }, 500);
  });
};

// Nuevos endpoints para la plataforma de scouting profesional
export const fetchRecommendations = async (teamNeeds: string[]): Promise<Recommendation[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockRecommendations: Recommendation[] = [
        { playerId: '4', playerName: 'Lucas Vázquez', reason: 'Necesidad de extremo rápido', fitScore: 8.5 },
        { playerId: '5', playerName: 'Marco Asensio', reason: 'Necesidad de mediapunta creativo', fitScore: 7.9 },
      ];
      resolve(mockRecommendations);
    }, 500);
  });
};

export const fetchScoutingNetworkProfiles = async (): Promise<ScoutingNetworkProfile[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockProfiles: ScoutingNetworkProfile[] = [
        { agentId: 'A1', agentName: 'Agente Global', specialization: 'Sudamérica', contact: 'agent@example.com', playersRepresented: ['Juan Pérez'] },
        { agentId: 'A2', agentName: 'Scout Europa', specialization: 'Europa del Este', contact: 'scout@example.com', playersRepresented: ['Carlos García'] },
      ];
      resolve(mockProfiles);
    }, 500);
  });
};

export const fetchCompetitiveIntelligence = async (playerId: string): Promise<CompetitiveIntel[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockIntel: CompetitiveIntel[] = [
        { playerId: playerId, playerName: 'Juan Pérez', interestedClubs: ['Real Madrid', 'FC Barcelona'], lastUpdated: '2025-09-27' },
      ];
      resolve(mockIntel);
    }, 500);
  });
};

export const fetchMarketAlerts = async (): Promise<MarketAlert[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockAlerts: MarketAlert[] = [
        { alertId: 'M1', playerId: '1', playerName: 'Juan Pérez', eventType: 'entra_mercado', date: '2025-09-28', details: 'Contrato finaliza en 6 meses.' },
      ];
      resolve(mockAlerts);
    }, 500);
  });
};

export const fetchAutomatedValuation = async (playerId: string): Promise<AutomatedValuation> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockValuation: AutomatedValuation = {
        playerId: playerId,
        playerName: 'Juan Pérez',
        currentValue: 15000000,
        potentialValue: 40000000,
        valuationDate: '2025-09-28',
        metrics: { goles: 10, asistencias: 5, pasesClave: 20 },
      };
      resolve(mockValuation);
    }, 500);
  });
};

export const fetchTransfermarktData = async (playerId: string): Promise<TransfermarktData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: TransfermarktData = {
        playerId: playerId,
        playerName: 'Juan Pérez',
        marketValue: 12000000,
        contractUntil: '2026-06-30',
        clubHistory: [{ club: 'Cantera FC', years: '2020-2025' }],
      };
      resolve(mockData);
    }, 500);
  });
};

export const fetchCollaborativeReports = async (playerId: string): Promise<CollaborativeReport[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockReports: CollaborativeReport[] = [
        { reportId: 'R1', playerId: playerId, playerName: 'Juan Pérez', scoutName: 'Scout A', date: '2025-09-20', content: 'Jugador con gran potencial, buena técnica.', rating: 8 },
      ];
      resolve(mockReports);
    }, 500);
  });
};

export const fetchPredictionValue = async (playerId: string): Promise<PredictionValue> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockPrediction: PredictionValue = {
        playerId: playerId,
        playerName: 'Juan Pérez',
        predictedValue: 35000000,
        predictionDate: '2025-09-28',
        comparablePlayers: ['Ansu Fati', 'Vinicius Jr.'],
      };
      resolve(mockPrediction);
    }, 500);
  });
};
