// src/features/interfaz-cliente/interfazClienteApi.ts

interface CheckInResponse {
  success: boolean;
  message: string;
  memberInfo?: {
    id: string;
    name: string;
    status: string;
    membershipType?: string; // Added for advanced check-in
  };
}

export const checkIn = async (memberId: string): Promise<CheckInResponse> => {
  // In a real application, this would be an actual API call to your backend.
  // For demonstration, we'll simulate an API response.
  console.log(`Attempting check-in for member ID: ${memberId}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      if (memberId === '12345') {
        resolve({
          success: true,
          message: 'Check-in exitoso. ¡Bienvenido!',
          memberInfo: {
            id: '12345',
            name: 'Juan Pérez',
            status: 'Activo',
          },
        });
      } else if (memberId === '99999') {
        resolve({
          success: false,
          message: 'Membresía inactiva o caducada. Por favor, contacte a recepción.',
        });
      } else {
        resolve({
          success: false,
          message: 'Número de socio no encontrado. Verifique e intente de nuevo.',
        });
      }
    }, 1000); // Simulate network delay
  });
};

export const checkInAdvanced = async (memberId: string): Promise<CheckInResponse> => {
  console.log(`Attempting advanced check-in for member ID: ${memberId}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      if (memberId === '12345') {
        resolve({
          success: true,
          message: 'Check-in avanzado exitoso. ¡Bienvenido, miembro Premium!',
          memberInfo: {
            id: '12345',
            name: 'Juan Pérez',
            status: 'Activo',
            membershipType: 'Premium',
          },
        });
      } else if (memberId === '67890') {
        resolve({
          success: true,
          message: 'Check-in avanzado exitoso. ¡Bienvenido, miembro Estándar!',
          memberInfo: {
            id: '67890',
            name: 'Ana García',
            status: 'Activo',
            membershipType: 'Estándar',
          },
        });
      } else if (memberId === '99999') {
        resolve({
          success: false,
          message: 'Membresía inactiva o caducada. Por favor, contacte a recepción.',
        });
      } else {
        resolve({
          success: false,
          message: 'Número de socio no encontrado para check-in avanzado.',
        });
      }
    }, 1500); // Simulate network delay for advanced check-in
  });
};

// You can add more API functions here as needed for the client interface,
// e.g., getMemberDetails, updateMemberStatus, etc.