
export enum CampaignStatus {
  Active = 'Active',
  Paused = 'Paused',
  Completed = 'Completed',
  Draft = 'Draft',
}

export enum CampaignType {
  SocialMedia = 'SocialMedia',
  EmailMarketing = 'EmailMarketing',
  ContentMarketing = 'ContentMarketing',
  SEM = 'SEM',
  Influencer = 'Influencer',
}

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  startDate: Date;
  endDate: Date;
  budget: number;
  targetAudience: string;
  goals: string[];
  creatives: string[]; // URLs or content IDs
  notes?: string;
}

export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-001',
    name: 'Lanzamiento Reto Fitness 30 Días',
    type: CampaignType.SocialMedia,
    status: CampaignStatus.Active,
    startDate: new Date('2025-10-01'),
    endDate: new Date('2025-10-31'),
    budget: 1500,
    targetAudience: 'Hombres y mujeres 25-45 interesados en fitness y pérdida de peso',
    goals: ['Aumentar inscripciones en un 20%', 'Generar 500 leads cualificados'],
    creatives: ['url_imagen_reto1.jpg', 'url_video_motivacional.mp4'],
    notes: 'Campaña enfocada en Instagram y Facebook con anuncios de video cortos.'
  },
  {
    id: 'camp-002',
    name: 'Promoción Suplementos Proteicos',
    type: CampaignType.EmailMarketing,
    status: CampaignStatus.Paused,
    startDate: new Date('2025-09-15'),
    endDate: new Date('2025-09-30'),
    budget: 800,
    targetAudience: 'Clientes existentes que han comprado suplementos antes',
    goals: ['Incrementar ventas de proteínas en un 15%', 'Reactivar clientes inactivos'],
    creatives: ['email_template_proteinas.html'],
    notes: 'Segmentación por historial de compras. Se pausó por falta de stock.'
  },
  {
    id: 'camp-003',
    name: 'Blog Post: "Guía de Entrenamiento en Casa"',
    type: CampaignType.ContentMarketing,
    status: CampaignStatus.Completed,
    startDate: new Date('2025-08-01'),
    endDate: new Date('2025-08-15'),
    budget: 300,
    targetAudience: 'Principiantes en fitness buscando rutinas caseras',
    goals: ['Aumentar tráfico web en un 10%', 'Mejorar SEO para "entrenamiento en casa"'],
    creatives: ['url_blog_post_guia.html', 'url_infografia_ejercicios.png'],
    notes: 'Contenido evergreen, se promocionó en redes sociales orgánicamente.'
  },
];
