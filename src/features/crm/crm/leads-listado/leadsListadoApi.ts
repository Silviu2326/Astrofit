import { useState, useEffect } from 'react';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  origin: string;
  contactDate: string;
  objective: string;
  status: 'Nuevo contacto' | 'Contactado' | 'Cita agendada' | 'Ganado' | 'Perdido';
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    phone: '+34 611-222-333',
    email: 'juan.perez@example.com',
    origin: 'Web',
    contactDate: '2025-09-20',
    objective: 'Comprar software de gestión empresarial',
    status: 'Nuevo contacto',
  },
  {
    id: '2',
    name: 'María García',
    phone: '+34 644-555-666',
    email: 'maria.garcia@example.com',
    origin: 'Referido',
    contactDate: '2025-09-18',
    objective: 'Servicio de consultoría estratégica',
    status: 'Contactado',
  },
  {
    id: '3',
    name: 'Carlos López',
    phone: '+34 677-888-999',
    email: 'carlos.lopez@example.com',
    origin: 'Campaña Email',
    contactDate: '2025-09-15',
    objective: 'Renovar suscripción anual',
    status: 'Cita agendada',
  },
  {
    id: '4',
    name: 'Ana Martínez',
    phone: '+34 623-456-789',
    email: 'ana.martinez@example.com',
    origin: 'Web',
    contactDate: '2025-09-22',
    objective: 'Información sobre planes premium',
    status: 'Nuevo contacto',
  },
  {
    id: '5',
    name: 'Pedro Sánchez',
    phone: '+34 687-654-321',
    email: 'pedro.sanchez@example.com',
    origin: 'Referido',
    contactDate: '2025-09-10',
    objective: 'Implementación de sistema ERP',
    status: 'Ganado',
  },
  {
    id: '6',
    name: 'Laura Fernández',
    phone: '+34 655-111-222',
    email: 'laura.fernandez@example.com',
    origin: 'Campaña Email',
    contactDate: '2025-09-05',
    objective: 'Soporte técnico especializado',
    status: 'Perdido',
  },
  {
    id: '7',
    name: 'Roberto Díaz',
    phone: '+34 699-333-444',
    email: 'roberto.diaz@techcorp.com',
    origin: 'Redes Sociales',
    contactDate: '2025-09-25',
    objective: 'Integración con sistemas existentes',
    status: 'Nuevo contacto',
  },
  {
    id: '8',
    name: 'Isabel Torres',
    phone: '+34 612-777-888',
    email: 'isabel.torres@innovatech.es',
    origin: 'Web',
    contactDate: '2025-09-24',
    objective: 'Migración a la nube',
    status: 'Contactado',
  },
  {
    id: '9',
    name: 'Miguel Romero',
    phone: '+34 633-999-111',
    email: 'miguel.romero@startup.io',
    origin: 'Evento',
    contactDate: '2025-09-23',
    objective: 'Automatización de procesos',
    status: 'Contactado',
  },
  {
    id: '10',
    name: 'Carmen Ruiz',
    phone: '+34 688-222-555',
    email: 'carmen.ruiz@pyme.com',
    origin: 'Referido',
    contactDate: '2025-09-21',
    objective: 'Plan para pequeña empresa',
    status: 'Cita agendada',
  },
  {
    id: '11',
    name: 'Francisco Moreno',
    phone: '+34 645-666-777',
    email: 'francisco.moreno@gmail.com',
    origin: 'Campaña Email',
    contactDate: '2025-09-19',
    objective: 'CRM personalizado',
    status: 'Cita agendada',
  },
  {
    id: '12',
    name: 'Lucía Navarro',
    phone: '+34 621-444-333',
    email: 'lucia.navarro@consultora.es',
    origin: 'Web',
    contactDate: '2025-09-17',
    objective: 'Análisis de datos e informes',
    status: 'Ganado',
  },
  {
    id: '13',
    name: 'Antonio Jiménez',
    phone: '+34 654-888-222',
    email: 'antonio.jimenez@empresa.com',
    origin: 'Redes Sociales',
    contactDate: '2025-09-16',
    objective: 'Sistema de facturación',
    status: 'Contactado',
  },
  {
    id: '14',
    name: 'Sofía Herrera',
    phone: '+34 677-555-999',
    email: 'sofia.herrera@digital.net',
    origin: 'Evento',
    contactDate: '2025-09-14',
    objective: 'Marketing automation',
    status: 'Nuevo contacto',
  },
  {
    id: '15',
    name: 'David Castillo',
    phone: '+34 698-123-456',
    email: 'david.castillo@ventures.com',
    origin: 'Web',
    contactDate: '2025-09-12',
    objective: 'Escalabilidad empresarial',
    status: 'Perdido',
  },
  {
    id: '16',
    name: 'Elena Ortega',
    phone: '+34 632-789-654',
    email: 'elena.ortega@solutions.es',
    origin: 'Referido',
    contactDate: '2025-09-11',
    objective: 'Integración con Shopify',
    status: 'Cita agendada',
  },
  {
    id: '17',
    name: 'Javier Ramos',
    phone: '+34 619-321-987',
    email: 'javier.ramos@agency.com',
    origin: 'Campaña Email',
    contactDate: '2025-09-09',
    objective: 'Gestión de proyectos',
    status: 'Perdido',
  },
  {
    id: '18',
    name: 'Patricia Vega',
    phone: '+34 667-456-123',
    email: 'patricia.vega@biztech.io',
    origin: 'Redes Sociales',
    contactDate: '2025-09-08',
    objective: 'Portal de clientes',
    status: 'Ganado',
  },
];

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLeads = () => {
      return new Promise<Lead[]>((resolve) => {
        setTimeout(() => {
          resolve(mockLeads);
        }, 500); // Simulate network delay
      });
    };

    fetchLeads()
      .then((data) => {
        setLeads(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { leads, loading, error };
};

export const updateLeadStatus = async (leadId: string, newStatus: Lead['status']): Promise<Lead | undefined> => {
  // Simulate API call to update lead status
  return new Promise((resolve) => {
    setTimeout(() => {
      const leadToUpdate = mockLeads.find(lead => lead.id === leadId);
      if (leadToUpdate) {
        leadToUpdate.status = newStatus;
        resolve(leadToUpdate);
      } else {
        resolve(undefined);
      }
    }, 200);
  });
};
