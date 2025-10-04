// This file would typically contain API calls for fetching and updating lead data.
// For this exercise, we'll use mock data directly in the components.

// Example of a potential API interface
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  company: string;
  objective?: string;
  availability?: string;
  budget?: string;
  urgency?: string;
  interactions: Interaction[];
  nextActions: NextAction[];
}

export interface Interaction {
  id: string;
  type: 'Llamada' | 'Email' | 'Nota';
  date: string;
  notes: string;
}

export interface NextAction {
  id: string;
  description: string;
  date: string;
}

// Mock API functions (for demonstration purposes)
export const fetchLeadById = async (id: string): Promise<Lead> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        phone: '+34 600 123 456',
        status: 'Calificado',
        company: 'Empresa XYZ',
        objective: 'Aumentar ventas en un 20%',
        availability: 'Mañanas',
        budget: '5000-10000 EUR',
        urgency: 'Alta',
        interactions: [
          { id: 'int-001', type: 'Llamada', date: '2025-09-20', notes: 'Primera toma de contacto. Interesado en solución A.' },
          { id: 'int-002', type: 'Email', date: '2025-09-22', notes: 'Envío de propuesta inicial.' },
          { id: 'int-003', type: 'Nota', date: '2025-09-25', notes: 'El cliente ha respondido positivamente a la propuesta.' },
        ],
        nextActions: [
          { id: 'act-001', description: 'Llamar para seguimiento de propuesta', date: '2025-09-28' },
          { id: 'act-002', description: 'Enviar caso de estudio relevante', date: '2025-09-29' },
        ],
      });
    }, 500);
  });
};

export const updateLead = async (lead: Lead): Promise<Lead> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Updating lead:', lead);
      resolve(lead);
    }, 300);
  });
};

export const addInteractionToLead = async (leadId: string, interaction: Interaction): Promise<Interaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Adding interaction to lead ${leadId}:`, interaction);
      resolve(interaction);
    }, 300);
  });
};

export const convertLeadToClient = async (leadId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Converting lead ${leadId} to client.`);
      resolve(true);
    }, 500);
  });
};