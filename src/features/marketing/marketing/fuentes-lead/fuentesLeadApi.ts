import { LeadSource, LeadQuality, InvestmentAnalysis, ChannelTrend, Tag } from './types';

// Mock Data - Ampliado con más canales y datos realistas
const mockLeadSources: LeadSource[] = [
  { id: '1', name: 'Instagram', leads: 1200, customers: 300, conversionRate: 25, costPerLead: 2.5, costPerCustomer: 10, revenue: 15000, roi: 400 },
  { id: '2', name: 'Google Ads', leads: 850, customers: 220, conversionRate: 26, costPerLead: 3.2, costPerCustomer: 12.36, revenue: 13200, roi: 386 },
  { id: '3', name: 'Web Propia', leads: 620, customers: 195, conversionRate: 31, costPerLead: 0.8, costPerCustomer: 2.54, revenue: 9750, roi: 1318 },
  { id: '4', name: 'Recomendación', leads: 450, customers: 185, conversionRate: 41, costPerLead: 0, costPerCustomer: 0, revenue: 9250, roi: Infinity },
  { id: '5', name: 'Facebook Ads', leads: 1050, customers: 268, conversionRate: 26, costPerLead: 2.1, costPerCustomer: 8.24, revenue: 13400, roi: 516 },
  { id: '6', name: 'LinkedIn', leads: 380, customers: 118, conversionRate: 31, costPerLead: 4.5, costPerCustomer: 14.49, revenue: 5900, roi: 345 },
  { id: '7', name: 'Email Marketing', leads: 720, customers: 158, conversionRate: 22, costPerLead: 0.5, costPerCustomer: 2.28, revenue: 7900, roi: 1094 },
  { id: '8', name: 'Eventos', leads: 280, customers: 98, conversionRate: 35, costPerLead: 8.0, costPerCustomer: 22.86, revenue: 4900, roi: 119 },
];

const mockLeadQuality: LeadQuality[] = [
  { source: 'Instagram', qualityScore: 7.5, conversionToMQL: 0.42, conversionToSQL: 0.22 },
  { source: 'Google Ads', qualityScore: 8.2, conversionToMQL: 0.51, conversionToSQL: 0.27 },
  { source: 'Web Propia', qualityScore: 9.1, conversionToMQL: 0.62, conversionToSQL: 0.37 },
  { source: 'Recomendación', qualityScore: 9.6, conversionToMQL: 0.73, conversionToSQL: 0.48 },
  { source: 'Facebook Ads', qualityScore: 7.2, conversionToMQL: 0.38, conversionToSQL: 0.19 },
  { source: 'LinkedIn', qualityScore: 8.7, conversionToMQL: 0.58, conversionToSQL: 0.32 },
  { source: 'Email Marketing', qualityScore: 8.0, conversionToMQL: 0.45, conversionToSQL: 0.24 },
  { source: 'Eventos', qualityScore: 9.3, conversionToMQL: 0.68, conversionToSQL: 0.41 },
];

const mockInvestmentAnalysis: InvestmentAnalysis[] = [
  { channel: 'Instagram', investment: 3000, customersAcquired: 300, costPerCustomer: 10, roi: 400 },
  { channel: 'Google Ads', investment: 2720, customersAcquired: 220, costPerCustomer: 12.36, roi: 386 },
  { channel: 'Web Propia', investment: 496, customersAcquired: 195, costPerCustomer: 2.54, roi: 1318 },
  { channel: 'Facebook Ads', investment: 2205, customersAcquired: 268, costPerCustomer: 8.24, roi: 516 },
  { channel: 'LinkedIn', investment: 1710, customersAcquired: 118, costPerCustomer: 14.49, roi: 345 },
  { channel: 'Email Marketing', investment: 360, customersAcquired: 158, costPerCustomer: 2.28, roi: 1094 },
  { channel: 'Eventos', investment: 2240, customersAcquired: 98, costPerCustomer: 22.86, roi: 119 },
];

const mockChannelTrends: ChannelTrend[] = [
  { month: 'Ene', Instagram: 95, GoogleAds: 75, WebPropia: 58, FacebookAds: 88, LinkedIn: 28, EmailMarketing: 62, Eventos: 22 },
  { month: 'Feb', Instagram: 105, GoogleAds: 82, WebPropia: 63, FacebookAds: 92, LinkedIn: 32, EmailMarketing: 68, Eventos: 24 },
  { month: 'Mar', Instagram: 118, GoogleAds: 88, WebPropia: 68, FacebookAds: 98, LinkedIn: 38, EmailMarketing: 72, Eventos: 26 },
  { month: 'Abr', Instagram: 128, GoogleAds: 93, WebPropia: 72, FacebookAds: 102, LinkedIn: 42, EmailMarketing: 76, Eventos: 28 },
  { month: 'May', Instagram: 138, GoogleAds: 98, WebPropia: 78, FacebookAds: 108, LinkedIn: 48, EmailMarketing: 82, Eventos: 31 },
  { month: 'Jun', Instagram: 152, GoogleAds: 106, WebPropia: 85, FacebookAds: 116, LinkedIn: 56, EmailMarketing: 88, Eventos: 35 },
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
