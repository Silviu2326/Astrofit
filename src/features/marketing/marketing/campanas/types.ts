export interface Campaign {
  id: string;
  name: string;
  objective: string;
  startDate: string;
  endDate: string;
  status: 'planificada' | 'activa' | 'finalizada' | 'pausada';
  budget: number;
  cost: number;
  leadsGenerated: number;
  customersConverted: number;
  roi: number; // Return on Investment
  audienceSegmentation: string;
  template: string;
}
