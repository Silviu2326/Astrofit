import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface RMCalculation {
  id: string;
  weight: number;
  reps: number;
  estimated1RM: number;
  formula: string;
  date: string;
}

interface ProgressionPlan {
  week: number;
  sets: number;
  reps: number;
  percentage: number;
  weight: number;
}

interface VolumeCalculation {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  totalVolume: number;
  date: string;
}

export const calculadorasFuerzaApi = createApi({
  reducerPath: 'calculadorasFuerzaApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/calculadoras-fuerza/' }),
  endpoints: (builder) => ({
    getRMCalculations: builder.query<RMCalculation[], string>({
      query: (clientId) => `rm-calculations/${clientId}`,
    }),
    addRMCalculation: builder.mutation<RMCalculation, Omit<RMCalculation, 'id' | 'date'>>({
      query: (newCalculation) => ({
        url: 'rm-calculations',
        method: 'POST',
        body: newCalculation,
      }),
    }),
    getProgressionPlans: builder.query<ProgressionPlan[], string>({
      query: (clientId) => `progression-plans/${clientId}`,
    }),
    addProgressionPlan: builder.mutation<ProgressionPlan, Omit<ProgressionPlan, 'week' | 'weight'>>({
      query: (newPlan) => ({
        url: 'progression-plans',
        method: 'POST',
        body: newPlan,
      }),
    }),
    getVolumeCalculations: builder.query<VolumeCalculation[], string>({
      query: (clientId) => `volume-calculations/${clientId}`,
    }),
    addVolumeCalculation: builder.mutation<VolumeCalculation, Omit<VolumeCalculation, 'id' | 'date'>>({
      query: (newCalculation) => ({
        url: 'volume-calculations',
        method: 'POST',
        body: newCalculation,
      }),
    }),
  }),
});

export const {
  useGetRMCalculationsQuery,
  useAddRMCalculationMutation,
  useGetProgressionPlansQuery,
  useAddProgressionPlanMutation,
  useGetVolumeCalculationsQuery,
  useAddVolumeCalculationMutation,
} = calculadorasFuerzaApi;

// Mock data for demonstration
export const mockRMCalculations: RMCalculation[] = [
  { id: '1', weight: 100, reps: 5, estimated1RM: 112.5, formula: 'Epley', date: '2023-01-15' },
  { id: '2', weight: 105, reps: 3, estimated1RM: 114.75, formula: 'Brzycki', date: '2023-02-20' },
];

export const mockProgressionPlans: ProgressionPlan[] = [
  { week: 1, sets: 3, reps: 5, percentage: 70, weight: 70 },
  { week: 2, sets: 3, reps: 5, percentage: 72.5, weight: 72.5 },
  { week: 3, sets: 3, reps: 5, percentage: 75, weight: 75 },
];

export const mockVolumeCalculations: VolumeCalculation[] = [
  { id: '1', exercise: 'Squat', sets: 3, reps: 5, weight: 100, totalVolume: 1500, date: '2023-03-10' },
  { id: '2', exercise: 'Bench Press', sets: 4, reps: 8, weight: 60, totalVolume: 1920, date: '2023-03-12' },
];
