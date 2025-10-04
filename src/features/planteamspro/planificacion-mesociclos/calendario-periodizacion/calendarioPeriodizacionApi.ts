import { useState, useEffect } from 'react';

export interface TrainingPhase {
  id: string;
  name: string;
  type: 'fuerza' | 'tecnica' | 'competicion' | 'descanso';
  startWeek: number;
  endWeek: number;
}

export interface AnualCycle {
  id: string;
  year: number;
  phases: TrainingPhase[];
}

// Simulamos una llamada a API
const fetchAnualCycles = (): Promise<AnualCycle[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'cycle-2025',
          year: 2025,
          phases: [
            { id: 'phase-1', name: 'Pretemporada Fuerza', type: 'fuerza', startWeek: 1, endWeek: 8 },
            { id: 'phase-2', name: 'Pretemporada Técnica', type: 'tecnica', startWeek: 9, endWeek: 12 },
            { id: 'phase-3', name: 'Competición Bloque 1', type: 'competicion', startWeek: 13, endWeek: 24 },
            { id: 'phase-4', name: 'Descanso Activo', type: 'descanso', startWeek: 25, endWeek: 28 },
            { id: 'phase-5', name: 'Competición Bloque 2', type: 'competicion', startWeek: 29, endWeek: 40 },
            { id: 'phase-6', name: 'Transición', type: 'descanso', startWeek: 41, endWeek: 52 },
          ],
        },
        {
          id: 'cycle-2026',
          year: 2026,
          phases: [
            { id: 'phase-a', name: 'Pretemporada', type: 'fuerza', startWeek: 1, endWeek: 10 },
            { id: 'phase-b', name: 'Competición', type: 'competicion', startWeek: 11, endWeek: 30 },
            { id: 'phase-c', name: 'Descanso', type: 'descanso', startWeek: 31, endWeek: 52 },
          ],
        },
      ]);
    }, 1000);
  });
};

export const useAnualCycles = () => {
  const [data, setData] = useState<AnualCycle[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCycles = async () => {
      try {
        const cycles = await fetchAnualCycles();
        setData(cycles);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    getCycles();
  }, []);

  return { data, isLoading, error };
};

// Nuevos endpoints para timeline y sincronización de APIs
export const fetchTimelineData = async (year: number): Promise<any[]> => {
  console.log(`Fetching timeline data for year: ${year}`);
  // Simulación de llamada a API para obtener datos del timeline
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'event-1', name: 'Evento A', week: 5, type: 'competicion' },
        { id: 'event-2', name: 'Evento B', week: 15, type: 'entrenamiento' },
      ]);
    }, 500);
  });
};

export const syncCompetitions = async (sport: string): Promise<string> => {
  console.log(`Syncing competitions for sport: ${sport}`);
  // Simulación de llamada a API para sincronizar competencias
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Competencias para ${sport} sincronizadas exitosamente.`);
    }, 700);
  });
};
