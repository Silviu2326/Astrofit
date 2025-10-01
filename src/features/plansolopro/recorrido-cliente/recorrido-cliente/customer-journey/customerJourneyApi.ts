
// src/features/recorrido-cliente/customer-journey/customerJourneyApi.ts

export interface Customer {
  id: string;
  name: string;
  stage: 'Lead' | 'Cliente nuevo' | 'Activo' | 'Fiel';
  timeInStage: number; // in days
}

// Placeholder API functions
export const fetchCustomers = async (): Promise<Customer[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'Ana Garc??a', stage: 'Lead', timeInStage: 5 },
        { id: '2', name: 'Luis Fern??ndez', stage: 'Cliente nuevo', timeInStage: 10 },
        { id: '3', name: 'Marta L??pez', stage: 'Activo', timeInStage: 30 },
        { id: '4', name: 'Pedro Ru??z', stage: 'Fiel', timeInStage: 90 },
        { id: '5', name: 'Sof??a Mart??n', stage: 'Lead', timeInStage: 15 },
      ]);
    }, 500);
  });
};

export const updateCustomerStage = async (customerId: string, newStage: Customer['stage']): Promise<void> => {
  // Simulate API call for updating customer stage
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Updating customer ${customerId} to stage ${newStage}`);
      resolve();
    }, 300);
  });
};
