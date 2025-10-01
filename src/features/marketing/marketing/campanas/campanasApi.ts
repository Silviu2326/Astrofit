import { Campaign } from './types';

// Mock data for campaigns
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Campaña Verano: Consigue 2 meses por 1',
    objective: 'Aumentar suscripciones en verano',
    startDate: '2025-07-01',
    endDate: '2025-08-31',
    status: 'activa',
    budget: 5000,
    cost: 4500,
    leadsGenerated: 1200,
    customersConverted: 300,
    roi: 150,
    audienceSegmentation: 'Nuevos usuarios, interesados en fitness',
    template: 'Oferta de descuento',
  },
  {
    id: '2',
    name: 'Campaña Navidad: Regala bienestar',
    objective: 'Promocionar bonos regalo',
    startDate: '2025-12-01',
    endDate: '2025-12-25',
    status: 'planificada',
    budget: 3000,
    cost: 0,
    leadsGenerated: 0,
    customersConverted: 0,
    roi: 0,
    audienceSegmentation: 'Clientes existentes, regalos',
    template: 'Bono regalo',
  },
  {
    id: '3',
    name: 'Campaña Fidelización: Descuento exclusivo',
    objective: 'Retener clientes actuales',
    startDate: '2025-09-01',
    endDate: '2025-09-30',
    status: 'finalizada',
    budget: 2000,
    cost: 1800,
    leadsGenerated: 500,
    customersConverted: 150,
    roi: 100,
    audienceSegmentation: 'Clientes con más de 6 meses',
    template: 'Descuento por antigüedad',
  },
];

export const getCampaigns = (): Promise<Campaign[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCampaigns), 500);
  });
};

export const createCampaign = (newCampaign: Omit<Campaign, 'id' | 'status' | 'cost' | 'leadsGenerated' | 'customersConverted' | 'roi'>): Promise<Campaign> => {
  return new Promise((resolve) => {
    const campaign: Campaign = {
      ...newCampaign,
      id: String(mockCampaigns.length + 1),
      status: 'planificada',
      cost: 0,
      leadsGenerated: 0,
      customersConverted: 0,
      roi: 0,
    };
    mockCampaigns.push(campaign);
    setTimeout(() => resolve(campaign), 500);
  });
};

export const updateCampaign = (updatedCampaign: Campaign): Promise<Campaign> => {
  return new Promise((resolve, reject) => {
    const index = mockCampaigns.findIndex(c => c.id === updatedCampaign.id);
    if (index !== -1) {
      mockCampaigns[index] = updatedCampaign;
      setTimeout(() => resolve(updatedCampaign), 500);
    } else {
      reject(new Error('Campaign not found'));
    }
  });
};
