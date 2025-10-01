import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CalculationResult {
  id: string;
  clientId: string;
  date: string;
  type: string;
  data: any;
  recommendations: string[];
}

// Mock data for demonstration
const mockCalculationResults: CalculationResult[] = [
  {
    id: 'calc1',
    clientId: 'client123',
    date: new Date().toISOString(),
    type: 'TDEE',
    data: { weight: 70, height: 175, age: 30, gender: 'male', activityLevel: 'moderate', tdee: 2500 },
    recommendations: ['Maintain a balanced diet.', 'Increase protein intake.'],
  },
  {
    id: 'calc2',
    clientId: 'client123',
    date: new Date().toISOString(),
    type: 'Macros',
    data: { tdee: 2500, protein: 175, carbs: 250, fat: 83 },
    recommendations: ['Focus on complex carbohydrates.'],
  },
];

export const calculadorasNutricionalesApi = createApi({
  reducerPath: 'calculadorasNutricionalesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // Base URL can be adjusted
  endpoints: (builder) => ({
    getCalculationHistory: builder.query<CalculationResult[], string>({
      queryFn: async (clientId) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const filteredResults = mockCalculationResults.filter(calc => calc.clientId === clientId);
        return { data: filteredResults };
      },
    }),
    saveCalculation: builder.mutation<CalculationResult, Partial<CalculationResult>>({
      queryFn: async (newCalculation) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        const savedCalculation = { ...newCalculation, id: `calc${mockCalculationResults.length + 1}`, date: new Date().toISOString() } as CalculationResult;
        mockCalculationResults.push(savedCalculation);
        return { data: savedCalculation };
      },
    }),
  }),
});

export const { useGetCalculationHistoryQuery, useSaveCalculationMutation } = calculadorasNutricionalesApi;
