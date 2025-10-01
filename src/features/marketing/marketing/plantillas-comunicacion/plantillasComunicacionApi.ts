
export interface DynamicVariable {
  id: string;
  name: string;
  description: string;
  example: string;
}

export interface ClientType {
  id: string;
  name: string;
  description: string;
}

export interface Template {
  id: string;
  name: string;
  type: 'email' | 'sms';
  clientTypeId: string;
  subject?: string; // For emails
  content: string;
  dynamicVariables: string[]; // IDs of DynamicVariable
  lastModified: string;
  version: number;
  isArchived: boolean;
}

// Mock Data
const mockDynamicVariables: DynamicVariable[] = [
  { id: 'var-name', name: '{{nombre_cliente}}', description: 'Nombre del cliente', example: 'Juan Pérez' },
  { id: 'var-next-appointment', name: '{{proxima_cita}}', description: 'Fecha y hora de la próxima cita', example: '27/09/2025 a las 10:00' },
  { id: 'var-personal-goals', name: '{{objetivos_personales}}', description: 'Objetivos de entrenamiento del cliente', example: 'perder 5kg y aumentar masa muscular' },
  { id: 'var-training-details', name: '{{detalles_entrenamiento}}', description: 'Detalles específicos de la sesión de entrenamiento', example: 'entrenamiento de fuerza, 3 series de 10 repeticiones' },
  { id: 'var-coach-name', name: '{{nombre_entrenador}}', description: 'Nombre del entrenador asignado', example: 'María García' },
];

const mockClientTypes: ClientType[] = [
  { id: 'client-principiante', name: 'Principiante', description: 'Clientes nuevos o con poca experiencia' },
  { id: 'client-avanzado', name: 'Avanzado', description: 'Clientes con experiencia y objetivos específicos' },
  { id: 'client-rehabilitacion', name: 'Rehabilitación', description: 'Clientes en proceso de recuperación o con necesidades especiales' },
];

let mockTemplates: Template[] = [
  {
    id: 'email-bienvenida-1',
    name: 'Email de Bienvenida - Principiante',
    type: 'email',
    clientTypeId: 'client-principiante',
    subject: '¡Bienvenido a nuestro equipo, {{nombre_cliente}}!',
    content: `Hola {{nombre_cliente}},

¡Te damos la bienvenida! Estamos emocionados de ayudarte a alcanzar tus {{objetivos_personales}}. Tu próxima cita es el {{proxima_cita}}.

Saludos,
El equipo.`,
    dynamicVariables: ['var-name', 'var-personal-goals', 'var-next-appointment'],
    lastModified: '2025-09-20T10:00:00Z',
    version: 1,
    isArchived: false,
  },
  {
    id: 'sms-recordatorio-1',
    name: 'SMS Recordatorio de Sesión',
    type: 'sms',
    clientTypeId: 'client-avanzado',
    content: 'Hola {{nombre_cliente}}, tu sesión de entrenamiento ({{detalles_entrenamiento}}) es mañana a las {{proxima_cita}}. ¡Te esperamos!',
    dynamicVariables: ['var-name', 'var-training-details', 'var-next-appointment'],
    lastModified: '2025-09-22T14:30:00Z',
    version: 1,
    isArchived: false,
  },
  {
    id: 'email-motivacion-1',
    name: 'Email de Motivación - Hito Alcanzado',
    type: 'email',
    clientTypeId: 'client-avanzado',
    subject: '¡Felicidades por tu progreso, {{nombre_cliente}}!',
    content: `Hola {{nombre_cliente}},

Queremos felicitarte por tu increíble progreso en tus {{objetivos_personales}}. ¡Sigue así!

Saludos,
Tu entrenador {{nombre_entrenador}}.`,
    dynamicVariables: ['var-name', 'var-personal-goals', 'var-coach-name'],
    lastModified: '2025-09-25T09:00:00Z',
    version: 1,
    isArchived: false,
  },
  {
    id: 'sms-urgente-1',
    name: 'SMS Contacto Urgente',
    type: 'sms',
    clientTypeId: 'client-rehabilitacion',
    content: 'URGENTE: {{nombre_cliente}}, por favor contacta a tu entrenador {{nombre_entrenador}} lo antes posible. Motivo: [Motivo aquí].',
    dynamicVariables: ['var-name', 'var-coach-name'],
    lastModified: '2025-09-26T11:00:00Z',
    version: 1,
    isArchived: false,
  },
];

// API Functions (Mocked)
export const getTemplates = async (clientTypeId?: string): Promise<Template[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (clientTypeId) {
        resolve(mockTemplates.filter(t => t.clientTypeId === clientTypeId && !t.isArchived));
      } else {
        resolve(mockTemplates.filter(t => !t.isArchived));
      }
    }, 500);
  });
};

export const getTemplateById = async (id: string): Promise<Template | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTemplates.find(t => t.id === id));
    }, 300);
  });
};

export const createTemplate = async (newTemplate: Omit<Template, 'id' | 'lastModified' | 'version' | 'isArchived'>): Promise<Template> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const template: Template = {
        ...newTemplate,
        id: `temp-${Date.now()}`,
        lastModified: new Date().toISOString(),
        version: 1,
        isArchived: false,
      };
      mockTemplates.push(template);
      resolve(template);
    }, 500);
  });
};

export const updateTemplate = async (updatedTemplate: Template): Promise<Template> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTemplates.findIndex(t => t.id === updatedTemplate.id);
      if (index !== -1) {
        mockTemplates[index] = {
          ...updatedTemplate,
          lastModified: new Date().toISOString(),
          version: mockTemplates[index].version + 1,
        };
        resolve(mockTemplates[index]);
      } else {
        reject(new Error('Template not found'));
      }
    }, 500);
  });
};

export const archiveTemplate = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockTemplates.findIndex(t => t.id === id);
      if (index !== -1) {
        mockTemplates[index].isArchived = true;
        mockTemplates[index].lastModified = new Date().toISOString();
        resolve();
      } else {
        reject(new Error('Template not found'));
      }
    }, 300);
  });
};

export const getDynamicVariables = async (): Promise<DynamicVariable[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDynamicVariables);
    }, 200);
  });
};

export const getClientTypes = async (): Promise<ClientType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClientTypes);
    }, 200);
  });
};

export const runABTest = async (templateIdA: string, templateIdB: string): Promise<{ winner: string; conversionRateA: number; conversionRateB: number }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const templateA = mockTemplates.find(t => t.id === templateIdA);
      const templateB = mockTemplates.find(t => t.id === templateIdB);

      if (!templateA || !templateB) {
        reject(new Error('One or both templates not found for A/B testing.'));
        return;
      }

      const conversionRateA = parseFloat((Math.random() * 0.1 + 0.05).toFixed(4)); // 5-15%
      const conversionRateB = parseFloat((Math.random() * 0.1 + 0.05).toFixed(4)); // 5-15%
      const winner = conversionRateA > conversionRateB ? templateIdA : templateIdB;

      resolve({ winner, conversionRateA, conversionRateB });
    }, 1000);
  });
};

export const getSuccessfulMessagesLibrary = async (): Promise<Template[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a subset of templates as "successful" examples
      resolve(mockTemplates.filter(t => t.type === 'email' && t.name.includes('Bienvenida')));
    }, 400);
  });
};
