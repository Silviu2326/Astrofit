
import { CohorteData } from './types';

// Mock API call to simulate fetching cohortes data
export const fetchCohortesData = async (): Promise<CohorteData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: 'Enero 2025', size: 1000, retention: [100, 80, 70, 60, 55, 50, 48, 45, 42, 40, 38, 35] },
        { name: 'Febrero 2025', size: 900, retention: [100, 85, 72, 63, 58, 53, 50, 47, 44, 41, 39, 36] },
        { name: 'Marzo 2025', size: 1100, retention: [100, 78, 68, 59, 54, 49, 46, 43, 40, 37, 35, 32] },
        { name: 'Abril 2025', size: 1050, retention: [100, 82, 70, 61, 56, 51, 49, 46, 43, 41, 39, 37] },
        { name: 'Mayo 2025', size: 950, retention: [100, 88, 75, 66, 60, 55, 52, 49, 46, 43, 41, 38] },
      ]);
    }, 500);
  });
};

// Define types for cohortes data
export interface CohorteData {
  name: string;
  size: number;
  retention: number[]; // Percentage retention over periods
}
