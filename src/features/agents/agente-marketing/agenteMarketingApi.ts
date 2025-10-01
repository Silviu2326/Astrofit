import { Campaign, Copy, ImpactSimulation, TimingRecommendation } from './types';

// Mock data for demonstration
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Campaña de Lanzamiento Producto X',
    objective: 'Generar 1000 leads cualificados',
    targetSegment: 'Emprendedores digitales',
    status: 'Completada',
    results: { leads: 1200, conversions: 150, roi: 1.2 },
    learnings: 'Los webinars funcionaron mejor que los ebooks.',
    date: '2023-01-15',
  },
  {
    id: '2',
    name: 'Campaña de Black Friday',
    objective: 'Aumentar ventas en un 20%',
    targetSegment: 'Clientes existentes',
    status: 'Completada',
    results: { leads: 500, conversions: 200, roi: 1.5 },
    learnings: 'Las ofertas personalizadas tuvieron mayor impacto.',
    date: '2023-11-20',
  },
];

const mockCopies: Copy[] = [
  {
    channel: 'email',
    title: '¡Descubre el nuevo Producto X!',
    body: 'Hola [Nombre], te presentamos el innovador Producto X que revolucionará tu negocio...',
  },
  {
    channel: 'post',
    title: '🚀 Producto X: La herramienta que estabas esperando',
    body: '¿Cansado de las soluciones antiguas? Conoce cómo Producto X puede impulsar tu productividad. #ProductoX #Innovación',
  },
  {
    channel: 'landing_page',
    title: 'Producto X - Transforma tu Negocio',
    body: 'Obtén acceso exclusivo a la beta de Producto X y sé el primero en experimentar sus beneficios. Regístrate ahora.',
  },
];

const mockImpactSimulation: ImpactSimulation = {
  leadsProjection: 1500,
  conversionsProjection: 200,
  roiProjection: 1.3,
  confidence: 'high',
  notes: 'Basado en el rendimiento de campañas similares para productos SaaS.',
};

const mockTimingRecommendations: TimingRecommendation[] = [
  {
    segment: 'Leads "oficina"',
    bestTime: 'Lunes 9:00 AM - 11:00 AM',
    reason: 'Mayor apertura de emails y actividad en redes sociales al inicio de la semana laboral.',
  },
  {
    segment: 'Audiencia joven (18-24)',
    bestTime: 'Miércoles 7:00 PM - 9:00 PM',
    reason: 'Mayor engagement en redes sociales durante las horas de ocio.',
  },
];

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  targetSegment: string;
  status: string;
  results?: {
    leads: number;
    conversions: number;
    roi: number;
  };
  learnings?: string;
  date: string;
}

export interface Copy {
  channel: 'email' | 'post' | 'landing_page';
  title: string;
  body: string;
}

export interface ImpactSimulation {
  leadsProjection: number;
  conversionsProjection: number;
  roiProjection: number;
  confidence: 'low' | 'medium' | 'high';
  notes: string;
}

export interface TimingRecommendation {
  segment: string;
  bestTime: string;
  reason: string;
}

export const agenteMarketingApi = {
  getCampaigns: async (): Promise<Campaign[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(mockCampaigns), 500));
  },
  createCampaign: async (campaign: Omit<Campaign, 'id' | 'status' | 'date'>): Promise<Campaign> => {
    return new Promise((resolve) =>
      setTimeout(() => {
        const newCampaign = { ...campaign, id: String(mockCampaigns.length + 1), status: 'En progreso', date: new Date().toISOString().split('T')[0] };
        mockCampaigns.push(newCampaign);
        resolve(newCampaign);
      }, 500)
    );
  },
  generateCopies: async (campaignDetails: { objective: string; targetSegment: string }): Promise<Copy[]> => {
    console.log('Generating copies for:', campaignDetails);
    return new Promise((resolve) => setTimeout(() => resolve(mockCopies), 700));
  },
  simulateImpact: async (campaignId: string): Promise<ImpactSimulation> => {
    console.log('Simulating impact for campaign:', campaignId);
    return new Promise((resolve) => setTimeout(() => resolve(mockImpactSimulation), 600));
  },
  getTimingRecommendations: async (segment: string): Promise<TimingRecommendation[]> => {
    console.log('Getting timing recommendations for segment:', segment);
    return new Promise((resolve) => setTimeout(() => resolve(mockTimingRecommendations), 400));
  },
};
