export type Role = 'jugador' | 'capitan' | 'entrenador' | 'fisioterapeuta' | 'directivo';

export interface Person {
  id: string;
  name: string;
}

export interface AssignRolesPayload {
  personId: string;
  roles: Role[];
}

export interface ConflictValidationResult {
  hasConflicts: boolean;
  conflicts: string[];
}

export interface SuggestionResult {
  suggestedRoles: Role[];
  reason: string;
}

// Mock data for demonstration
const mockPeople: Person[] = [
  { id: '1', name: 'Juan Pérez' },
  { id: '2', name: 'María García' },
  { id: '3', name: 'Carlos Ruíz' },
];

const mockRoles: Role[] = ['jugador', 'capitan', 'entrenador', 'fisioterapeuta', 'directivo'];

export const validateConflicts = async (personId: string, roles: Role[]): Promise<ConflictValidationResult> => {
  console.log('Simulating API call to validate conflicts:', { personId, roles });
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock conflict logic
      if (personId === '1' && roles.includes('capitan') && roles.includes('directivo')) {
        resolve({ hasConflicts: true, conflicts: ['Capitán and Directivo are incompatible for Juan Pérez'] });
      } else {
        resolve({ hasConflicts: false, conflicts: [] });
      }
    }, 700);
  });
};

export const getSuggestions = async (personId: string): Promise<SuggestionResult> => {
  console.log('Simulating API call to get suggestions for:', personId);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock suggestion logic
      if (personId === '1') {
        resolve({ suggestedRoles: ['entrenador', 'fisioterapeuta'], reason: 'Based on previous experience in coaching and medical support.' });
      } else if (personId === '2') {
        resolve({ suggestedRoles: ['capitan'], reason: 'Strong leadership skills observed.' });
      } else {
        resolve({ suggestedRoles: [], reason: 'No specific suggestions at this time.' });
      }
    }, 800);
  });
};

export const getPeople = async (): Promise<Person[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockPeople), 500);
  });
};

export const getAvailableRoles = async (): Promise<Role[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockRoles), 500);
  });
};

export const assignRoles = async (payload: AssignRolesPayload): Promise<{ success: boolean; message: string }> => {
  console.log('Simulating API call to assign roles:', payload);
  return new Promise((resolve) => {
    setTimeout(() => {
      if (payload.personId && payload.roles.length > 0) {
        resolve({ success: true, message: `Roles ${payload.roles.join(', ')} assigned to person ${payload.personId}` });
      } else {
        resolve({ success: false, message: 'Failed to assign roles. Invalid payload.' });
      }
    }, 1000);
  });
};
