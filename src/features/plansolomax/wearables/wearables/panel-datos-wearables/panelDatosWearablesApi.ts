// Aquí se definirán las funciones para interactuar con la API de datos de wearables
// Por ahora, usaremos datos mock.

export const fetchWearableData = async () => {
  // Simulación de una llamada a la API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        dailySteps: [
          { date: '2025-09-22', steps: 8500 },
          { date: '2025-09-23', steps: 10200 },
          { date: '2025-09-24', steps: 7800 },
          { date: '2025-09-25', steps: 11500 },
          { date: '2025-09-26', steps: 9300 },
          { date: '2025-09-27', steps: 12000 },
          { date: '2025-09-28', steps: 9800 },
        ],
        sleepQuality: [
          { date: '2025-09-22', quality: 7.5 },
          { date: '2025-09-23', quality: 8.1 },
          { date: '2025-09-24', quality: 6.9 },
          { date: '2025-09-25', quality: 7.8 },
          { date: '2025-09-26', quality: 7.2 },
          { date: '2025-09-27', quality: 8.5 },
          { date: '2025-09-28', quality: 7.0 },
        ],
        heartRate: [
          { date: '2025-09-22', resting: 60, exercise: 140 },
          { date: '2025-09-23', resting: 58, exercise: 150 },
          { date: '2025-09-24', resting: 62, exercise: 135 },
          { date: '2025-09-25', resting: 59, exercise: 145 },
          { date: '2025-09-26', resting: 61, exercise: 138 },
          { date: '2025-09-27', resting: 57, exercise: 155 },
          { date: '2025-09-28', resting: 63, exercise: 130 },
        ],
        caloriesBurned: [
          { date: '2025-09-22', calories: 2500 },
          { date: '2025-09-23', calories: 2800 },
          { date: '2025-09-24', calories: 2300 },
          { date: '2025-09-25', calories: 3000 },
          { date: '2025-09-26', calories: 2600 },
          { date: '2025-09-27', calories: 3200 },
          { date: '2025-09-28', calories: 2400 },
        ],
        workouts: [
          { date: '2025-09-23', type: 'Running', duration: 45, calories: 400 },
          { date: '2025-09-25', type: 'Weightlifting', duration: 60, calories: 350 },
          { date: '2025-09-27', type: 'Cycling', duration: 75, calories: 600 },
        ],
      });
    }, 500);
  });
};
