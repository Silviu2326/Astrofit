import { useState, useEffect } from 'react';

export interface AthleteResult {
  id: string;
  position: number;
  name: string;
  score: number;
  gender: 'male' | 'female';
  category: 'junior' | 'senior' | 'veteran';
}

export interface AdvancedCompetition {
  id: string;
  name: string;
  type: string;
  status: 'upcoming' | 'active' | 'completed';
  participants: number;
  gyms: string[];
}

const mockResults: AthleteResult[] = Array.from({ length: 20 }, (_, i) => ({
  id: `athlete-${i + 1}`,
  position: i + 1,
  name: `Atleta ${i + 1}`,
  score: Math.floor(Math.random() * 1000) + 500, // Scores between 500 and 1500
  gender: Math.random() > 0.5 ? 'male' : 'female',
  category: ['junior', 'senior', 'veteran'][Math.floor(Math.random() * 3)] as 'junior' | 'senior' | 'veteran',
})).sort((a, b) => b.score - a.score); // Sort by score descending

const mockAdvancedCompetitions: AdvancedCompetition[] = [
  {
    id: 'comp-1',
    name: 'Torneo Inter-Gyms Verano',
    type: 'Inter-Gym',
    status: 'active',
    participants: 150,
    gyms: ['Gym Alpha', 'Gym Beta', 'Gym Gamma'],
  },
  {
    id: 'comp-2',
    name: 'Liga Nacional de Fuerza',
    type: 'Liga',
    status: 'upcoming',
    participants: 300,
    gyms: ['Gym Delta', 'Gym Epsilon', 'Gym Zeta'],
  },
  {
    id: 'comp-3',
    name: 'Desafío de Resistencia Global',
    type: 'Challenge Grupal',
    status: 'completed',
    participants: 500,
    gyms: ['Gym Eta', 'Gym Theta', 'Gym Iota'],
  },
];

export const useLeaderboardData = () => {
  const [data, setData] = useState<AthleteResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setData(mockResults);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useAdvancedCompetitions = () => {
  const [data, setData] = useState<AdvancedCompetition[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 700));
        setData(mockAdvancedCompetitions);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};