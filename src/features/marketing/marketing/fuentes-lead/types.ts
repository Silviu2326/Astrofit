export interface LeadSource {
  id: string;
  name: string;
  leads: number;
  customers: number;
  conversionRate: number;
  costPerLead: number;
  costPerCustomer: number;
  revenue: number;
  roi: number;
}

export interface LeadQuality {
  source: string;
  qualityScore: number;
  conversionToMQL: number; // Marketing Qualified Lead
  conversionToSQL: number; // Sales Qualified Lead
}

export interface InvestmentAnalysis {
  channel: string;
  investment: number;
  customersAcquired: number;
  costPerCustomer: number;
  roi: number;
}

export interface ChannelTrend {
  month: string;
  [key: string]: number | string; // Dynamic keys for channel names
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}
