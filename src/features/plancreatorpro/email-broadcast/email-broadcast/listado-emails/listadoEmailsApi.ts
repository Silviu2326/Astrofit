// src/features/email-broadcast/listado-emails/listadoEmailsApi.ts
// Aquí se definirán las funciones para interactuar con la API para obtener y gestionar las campañas de email.

import axios from 'axios';

interface Campaign {
  id: string;
  subject: string;
  date: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  status: 'sent' | 'draft' | 'scheduled';
  performance: 'good' | 'average' | 'bad'; // Para etiquetas verdes/rojas
}

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  // Simulación de llamada a API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          subject: 'Campaña de Verano 2024',
          date: '2024-07-15',
          recipients: 1500,
          openRate: 0.25,
          clickRate: 0.05,
          status: 'sent',
          performance: 'good',
        },
        {
          id: '2',
          subject: 'Ofertas Especiales Septiembre',
          date: '2024-09-01',
          recipients: 2000,
          openRate: 0.18,
          clickRate: 0.03,
          status: 'sent',
          performance: 'average',
        },
        {
          id: '3',
          subject: 'Newsletter Mensual Octubre',
          date: '2024-10-01',
          recipients: 1800,
          openRate: 0.10,
          clickRate: 0.01,
          status: 'sent',
          performance: 'bad',
        },
      ]);
    }, 500);
  });
};

// Otras funciones como duplicar, archivar, etc.
export const duplicateCampaign = async (id: string): Promise<void> => {
  console.log(`Duplicando campaña con ID: ${id}`);
  // Lógica para duplicar en la API
};

export const archiveCampaign = async (id: string): Promise<void> => {
  console.log(`Archivando campaña con ID: ${id}`);
  // Lógica para archivar en la API
};
