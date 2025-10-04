import { WellnessData } from './types';

// This is a placeholder for your API calls.
// In a real application, you would integrate with a backend service.

export const registerWellnessMetrics = async (data: WellnessData): Promise<any> => {
  console.log('Registering wellness metrics:', data);
  // Simulate an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Wellness metrics registered successfully!', data);
      resolve({ success: true, message: 'Metrics registered', data });
    }, 1000);
  });
};

// Define a type for the wellness data
export interface WellnessData {
  sleep: number;
  pain: number;
  mood: number;
  energy: number;
  date: string;
}

// New: Define a type for wearable data
export interface WearableData {
  heartRate: number;
  steps: number;
  caloriesBurned: number;
  date: string;
}

// New: Simulate sending wearable data to the backend
export const sendWearableData = async (data: WearableData): Promise<any> => {
  console.log('Sending wearable data:', data);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Wearable data sent successfully!', data);
      resolve({ success: true, message: 'Wearable data processed', data });
    }, 1000);
  });
};

// New: Simulate fetching anomalous patterns
export const getAnomalousPatterns = async (userId: string): Promise<any> => {
  console.log('Fetching anomalous patterns for user:', userId);
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockAnomalies = [
        { type: 'stress', detectedOn: '2025-09-25', severity: 'high' },
        { type: 'motivation', detectedOn: '2025-09-20', severity: 'medium' },
      ];
      console.log('Anomalous patterns fetched:', mockAnomalies);
      resolve({ success: true, patterns: mockAnomalies });
    }, 1500);
  });
};
