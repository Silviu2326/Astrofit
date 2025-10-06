import { ChartData } from 'chart.js';

export interface HabitAdherenceData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export interface RankingHabitosData {
  habit: string;
  adherence: number;
}[];

export interface MetricasClienteData {
  clientId: string;
  clientName: string;
  totalHabits: number;
  completedHabits: number;
  adherenceRate: number;
  dailyAverage: number;
}

// Mock Data
const mockAdherenceData: HabitAdherenceData = {
  labels: ['Cumplido', 'No Cumplido'],
  datasets: [
    {
      label: 'Adherencia',
      data: [75, 25],
      backgroundColor: ['#4CAF50', '#FF6384'],
      borderColor: ['#4CAF50', '#FF6384'],
      borderWidth: 1,
    },
  ],
};

const mockRankingData: RankingHabitosData = [
  { habit: 'Beber agua', adherence: 90 },
  { habit: 'Hacer ejercicio', adherence: 85 },
  { habit: 'Leer 30 min', adherence: 70 },
  { habit: 'Meditar', adherence: 60 },
  { habit: 'Estudiar', adherence: 50 },
];

const mockMetricasCliente: MetricasClienteData[] = [
  {
    clientId: 'client1',
    clientName: 'Ana Garc??a',
    totalHabits: 5,
    completedHabits: 4,
    adherenceRate: 80,
    dailyAverage: 4.2,
  },
  {
    clientId: 'client2',
    clientName: 'Juan P??rez',
    totalHabits: 4,
    completedHabits: 3,
    adherenceRate: 75,
    dailyAverage: 3.5,
  },
  {
    clientId: 'client3',
    clientName: 'Mar??a L??pez',
    totalHabits: 6,
    completedHabits: 5,
    adherenceRate: 83,
    dailyAverage: 5.1,
  },
];

export const getHabitAdherence = (): Promise<HabitAdherenceData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAdherenceData), 500);
  });
};

export const getHabitRanking = (): Promise<RankingHabitosData> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRankingData), 500);
  });
};

export const getClientMetrics = (): Promise<MetricasClienteData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMetricasCliente), 500);
  });
};
