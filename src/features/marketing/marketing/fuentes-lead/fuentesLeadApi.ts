import { LeadSource, LeadQuality, InvestmentAnalysis, ChannelTrend, Tag } from './types';

// Mock Data
const mockLeadSources: LeadSource[] = [
  { id: '1', name: 'Instagram', leads: 1200, customers: 300, conversionRate: 25, costPerLead: 2.5, costPerCustomer: 10, revenue: 12000, roi: 400 },
  { id: '2', name: 'Google Ads', leads: 800, customers: 200, conversionRate: 25, costPerLead: 3, costPerCustomer: 12, revenue: 10000, roi: 333 },
  { id: '3', name: 'Web Propia', leads: 600, customers: 180, conversionRate: 30, costPerLead: 1, costPerCustomer: 3.33, revenue: 9000, roi: 900 },
  { id: '4', name: 'Recomendación', leads: 400, customers: 160, conversionRate: 40, costPerLead: 0, costPerCustomer: 0, revenue: 8000, roi: Infinity },
  { id: '5', name: 'Facebook Ads', leads: 1000, customers: 250, conversionRate: 25, costPerLead: 2, costPerCustomer: 8, revenue: 11000, roi: 550 },
  { id: '6', name: 'LinkedIn', leads: 300, customers: 90, conversionRate: 30, costPerLead: 4, costPerCustomer: 13.33, revenue: 5000, roi: 416 },
];

const mockLeadQuality: LeadQuality[] = [
  { source: 'Instagram', qualityScore: 7.5, conversionToMQL: 0.4, conversionToSQL: 0.2 },
  { source: 'Google Ads', qualityScore: 8.0, conversionToMQL: 0.5, conversionToSQL: 0.25 },
  { source: 'Web Propia', qualityScore: 9.0, conversionToMQL: 0.6, conversionToSQL: 0.35 },
  { source: 'Recomendación', qualityScore: 9.5, conversionToMQL: 0.7, conversionToSQL: 0.45 },
  { source: 'Facebook Ads', qualityScore: 7.0, conversionToMQL: 0.35, conversionToSQL: 0.18 },
  { source: 'LinkedIn', qualityScore: 8.5, conversionToMQL: 0.55, conversionToSQL: 0.3 },
];

const mockInvestmentAnalysis: InvestmentAnalysis[] = [
  { channel: 'Instagram', investment: 3000, customersAcquired: 300, costPerCustomer: 10, roi: 400 },
  { channel: 'Google Ads', investment: 2400, customersAcquired: 200, costPerCustomer: 12, roi: 333 },
  { channel: 'Web Propia', investment: 600, customersAcquired: 180, costPerCustomer: 3.33, roi: 900 },
  { channel: 'Facebook Ads', investment: 2000, customersAcquired: 250, costPerCustomer: 8, roi: 550 },
  { channel: 'LinkedIn', investment: 1200, customersAcquired: 90, costPerCustomer: 13.33, roi: 416 },
];

const mockChannelTrends: ChannelTrend[] = [
  { month: 'Ene', Instagram: 100, GoogleAds: 80, WebPropia: 60, FacebookAds: 90, LinkedIn: 30 },
  { month: 'Feb', Instagram: 110, GoogleAds: 85, WebPropia: 65, FacebookAds: 95, LinkedIn: 35 },
  { month: 'Mar', Instagram: 120, GoogleAds: 90, WebPropia: 70, FacebookAds: 100, LinkedIn: 40 },
  { month: 'Abr', Instagram: 130, GoogleAds: 95, WebPropia: 75, FacebookAds: 105, LinkedIn: 45 },
  { month: 'May', Instagram: 140, GoogleAds: 100, WebPropia: 80, FacebookAds: 110, LinkedIn: 50 },
  { month: 'Jun', Instagram: 150, GoogleAds: 105, WebPropia: 85, FacebookAds: 115, LinkedIn: 55 },
];

const mockTags: Tag[] = [
  { id: 't1', name: 'Red Social', color: '#EF4444' },
  { id: 't2', name: 'Buscador', color: '#3B82F6' },
  { id: 't3', name: 'Orgánico', color: '#22C55E' },
  { id: 't4', name: 'Referido', color: '#F59E0B' },
  { id: 't5', name: 'Pagado', color: '#8B5CF6' },
];

// Types
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

// API Functions
export const getLeadSources = async (): Promise<LeadSource[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockLeadSources), 500);
  });
};

export const getLeadQuality = async (): Promise<LeadQuality[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockLeadQuality), 500);
  });
};

export const getInvestmentAnalysis = async (): Promise<InvestmentAnalysis[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockInvestmentAnalysis), 500);
  });
};

export const getChannelTrends = async (): Promise<ChannelTrend[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockChannelTrends), 500);
  });
};

export const getTags = async (): Promise<Tag[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockTags), 500);
  });
};

export const addTag = async (name: string, color: string): Promise<Tag> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTag: Tag = { id: `t${mockTags.length + 1}`, name, color };
      mockTags.push(newTag);
      resolve(newTag);
    }, 500);
  });
};

export const updateTag = async (id: string, name: string, color: string): Promise<Tag | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tagIndex = mockTags.findIndex(tag => tag.id === id);
      if (tagIndex > -1) {
        mockTags[tagIndex] = { ...mockTags[tagIndex], name, color };
        resolve(mockTags[tagIndex]);
      }
      resolve(undefined);
    }, 500);
  });
};

export const deleteTag = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const initialLength = mockTags.length;
      mockTags = mockTags.filter(tag => tag.id !== id);
      resolve(mockTags.length < initialLength);
    }, 500);
  });
};
