import { useState, useEffect } from 'react';

export interface AthleteMetric {
  strength: number;
  speed: number;
  endurance: number;
  agility: number;
}

export interface AthleteComparisonData {
  athlete: string;
  metrics: AthleteMetric;
}

// Mock API call to simulate fetching data
const fetchAthleteData = async (athletes: string[]): Promise<AthleteComparisonData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: { [key: string]: AthleteMetric } = {
        'Atleta A': { strength: 80, speed: 75, endurance: 90, agility: 70 },
        'Atleta B': { strength: 85, speed: 80, endurance: 85, agility: 75 },
        'Atleta C': { strength: 70, speed: 90, endurance: 75, agility: 85 },
        'Atleta D': { strength: 90, speed: 70, endurance: 80, agility: 65 },
        'Atleta E': { strength: 75, speed: 85, endurance: 70, agility: 90 },
      };

      const data = athletes.map(athlete => ({
        athlete,
        metrics: mockData[athlete] || { strength: 0, speed: 0, endurance: 0, agility: 0 },
      }));
      resolve(data);
    }, 500);
  });
};

// Mock API calls for new features
const fetchFortalezasDebilidades = async (athleteId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ athleteId, strengths: ['Velocidad', 'Resistencia'], weaknesses: ['Fuerza', 'Agilidad'] });
    }, 500);
  });
};

const fetchRecomendacionesEntrenamiento = async (athleteId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ athleteId, recommendations: ['Entrenamiento de fuerza', 'Ejercicios de agilidad'] });
    }, 500);
  });
};

const fetchSimulacionAlineacion = async (teamId: string, athletes: string[]): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ teamId, athletes, optimalLineup: ['Atleta A', 'Atleta C'] });
    }, 500);
  });
};

const fetchBenchmarksHistoricos = async (teamId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ teamId, historicalData: [{ year: 2022, avgSpeed: 75 }, { year: 2023, avgSpeed: 80 }] });
    }, 500);
  });
};

const fetchCompatibilidadAtletas = async (athlete1: string, athlete2: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ athlete1, athlete2, compatibilityScore: 85, complementarySkills: ['Pase', 'Defensa'] });
    }, 500);
  });
};

const fetchScoringPonderado = async (athleteId: string, metrics: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ athleteId, overallScore: 92, metricScores: { strength: 90, speed: 95 } });
    }, 500);
  });
};

const fetchPrediccionCompetencia = async (athleteId: string, competitionId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ athleteId, competitionId, predictedPerformance: 'Top 3', confidence: 0.88 });
    }, 500);
  });
};

const fetchReportesScouting = async (scoutId: string, athleteId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ scoutId, athleteId, report: 'Atleta prometedor con gran potencial en...' });
    }, 500);
  });
};

// Hooks for new features
export const useFortalezasDebilidades = (athleteId: string) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!athleteId) {
      setData(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    fetchFortalezasDebilidades(athleteId)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [athleteId]);
  return { data, isLoading, error };
};

export const useRecomendacionesEntrenamiento = (athleteId: string) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!athleteId) {
      setData(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    fetchRecomendacionesEntrenamiento(athleteId)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [athleteId]);
  return { data, isLoading, error };
};

export const useSimulacionAlineacion = (teamId: string, athletes: string[]) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!teamId || athletes.length === 0) {
      setData(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    fetchSimulacionAlineacion(teamId, athletes)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [teamId, athletes]);
  return { data, isLoading, error };
};

export const useBenchmarksHistoricos = (teamId: string) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!teamId) {
      setData(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    fetchBenchmarksHistoricos(teamId)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [teamId]);
  return { data, isLoading, error };
};

export const useCompatibilidadAtletas = (athlete1: string, athlete2: string) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!athlete1 || !athlete2) {
      setData(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    fetchCompatibilidadAtletas(athlete1, athlete2)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [athlete1, athlete2]);
  return { data, isLoading, error };
};

export const useScoringPonderado = (athleteId: string, metrics: any) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!athleteId || !metrics) {
      setData(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    fetchScoringPonderado(athleteId, metrics)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [athleteId, metrics]);
  return { data, isLoading, error };
};

export const usePrediccionCompetencia = (athleteId: string, competitionId: string) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!athleteId || !competitionId) {
      setData(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    fetchPrediccionCompetencia(athleteId, competitionId)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [athleteId, competitionId]);
  return { data, isLoading, error };
};

export const useReportesScouting = (scoutId: string, athleteId: string) => {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!scoutId || !athleteId) {
      setData(null);
      return;
    }
    setIsLoading(true);
    setError(null);
    fetchReportesScouting(scoutId, athleteId)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [scoutId, athleteId]);
  return { data, isLoading, error };
};

export const useComparadorResultados = (athletes: string[]) => {
  const [data, setData] = useState<AthleteComparisonData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (athletes.length === 0) {
      setData(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetchAthleteData(athletes)
      .then(response => {
        setData(response);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [athletes]);

  return { data, isLoading, error };
};
