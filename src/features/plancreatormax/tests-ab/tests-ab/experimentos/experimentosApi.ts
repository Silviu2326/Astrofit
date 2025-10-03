export interface Experiment {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  duration: string;
  winningVariant: 'A' | 'B' | null;
  conversionRateA: number;
  conversionRateB: number;
  significance: number;
}

export const fetchExperiments = async (): Promise<Experiment[]> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'exp-1',
          name: 'Landing A vs Landing B',
          status: 'active',
          duration: '7 days',
          winningVariant: null,
          conversionRateA: 0.05,
          conversionRateB: 0.06,
          significance: 0.75,
        },
        {
          id: 'exp-2',
          name: 'Button Color Test',
          status: 'paused',
          duration: '3 days',
          winningVariant: 'A',
          conversionRateA: 0.10,
          conversionRateB: 0.08,
          significance: 0.90,
        },
      ]);
    }, 500);
  });
};

export const createExperiment = async (newExperiment: Omit<Experiment, 'id' | 'conversionRateA' | 'conversionRateB' | 'significance' | 'winningVariant'>): Promise<Experiment> => {
  // Mock API call for creating an experiment
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = `exp-${Math.floor(Math.random() * 1000)}`;
      resolve({
        ...newExperiment,
        id,
        conversionRateA: 0,
        conversionRateB: 0,
        significance: 0,
        winningVariant: null,
      });
    }, 500);
  });
};
