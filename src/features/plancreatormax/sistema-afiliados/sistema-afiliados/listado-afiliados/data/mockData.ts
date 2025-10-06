// Mock Data para Sistema de Afiliados

export type TierLevel = 'Bronce' | 'Plata' | 'Oro' | 'Platino';
export type AffiliateStatus = 'Activo' | 'Pendiente' | 'Suspendido';

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  avatar: string;
  code: string;
  registrationDate: string;
  status: AffiliateStatus;
  tier: TierLevel;
  clicks: number;
  conversions: number;
  conversionRate: number;
  salesGenerated: number;
  commissionsEarned: number;
  phone?: string;
  location?: string;
  socialMedia?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  paymentMethod?: string;
  lastPayment?: string;
  pendingCommission?: number;
}

export interface PendingApplication {
  id: string;
  name: string;
  email: string;
  avatar: string;
  reason: string;
  platforms: string[];
  audience: string;
  applicationDate: string;
}

export interface MarketingMaterial {
  id: string;
  type: 'banner' | 'copy' | 'video' | 'email' | 'guide' | 'asset';
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  size?: string;
}

export interface LeaderboardEntry {
  position: number;
  affiliate: Affiliate;
  monthSales: number;
  monthConversions: number;
}

export const mockAffiliates: Affiliate[] = [
  {
    id: 'AFF-001',
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    avatar: 'MG',
    code: 'MARIA2024',
    registrationDate: '2024-01-15',
    status: 'Activo',
    tier: 'Platino',
    clicks: 15420,
    conversions: 287,
    conversionRate: 1.86,
    salesGenerated: 143500,
    commissionsEarned: 35875,
    phone: '+34 612 345 678',
    location: 'Madrid, España',
    socialMedia: {
      instagram: '@mariaemprendedora',
      youtube: 'María González Business',
    },
    paymentMethod: 'PayPal',
    lastPayment: '2024-09-01',
    pendingCommission: 4250,
  },
  {
    id: 'AFF-002',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@email.com',
    avatar: 'CR',
    code: 'CARLOS2024',
    registrationDate: '2024-02-20',
    status: 'Activo',
    tier: 'Oro',
    clicks: 9840,
    conversions: 156,
    conversionRate: 1.59,
    salesGenerated: 78000,
    commissionsEarned: 15600,
    phone: '+34 623 456 789',
    location: 'Barcelona, España',
    socialMedia: {
      instagram: '@carlosmarketing',
      tiktok: '@carlosruiz',
    },
    paymentMethod: 'Transferencia Bancaria',
    lastPayment: '2024-09-01',
    pendingCommission: 3120,
  },
  {
    id: 'AFF-003',
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    avatar: 'AM',
    code: 'ANA2024',
    registrationDate: '2024-03-10',
    status: 'Activo',
    tier: 'Oro',
    clicks: 8920,
    conversions: 142,
    conversionRate: 1.59,
    salesGenerated: 71000,
    commissionsEarned: 14200,
    location: 'Valencia, España',
    paymentMethod: 'PayPal',
    lastPayment: '2024-09-01',
    pendingCommission: 2840,
  },
  {
    id: 'AFF-004',
    name: 'Diego López',
    email: 'diego.lopez@email.com',
    avatar: 'DL',
    code: 'DIEGO2024',
    registrationDate: '2024-04-05',
    status: 'Activo',
    tier: 'Plata',
    clicks: 4560,
    conversions: 68,
    conversionRate: 1.49,
    salesGenerated: 34000,
    commissionsEarned: 5100,
    location: 'Sevilla, España',
    paymentMethod: 'PayPal',
    lastPayment: '2024-09-01',
    pendingCommission: 1020,
  },
  {
    id: 'AFF-005',
    name: 'Laura Fernández',
    email: 'laura.fernandez@email.com',
    avatar: 'LF',
    code: 'LAURA2024',
    registrationDate: '2024-05-12',
    status: 'Activo',
    tier: 'Plata',
    clicks: 3890,
    conversions: 54,
    conversionRate: 1.39,
    salesGenerated: 27000,
    commissionsEarned: 4050,
    location: 'Bilbao, España',
    paymentMethod: 'Transferencia Bancaria',
    lastPayment: '2024-09-01',
    pendingCommission: 810,
  },
  {
    id: 'AFF-006',
    name: 'Pablo Sánchez',
    email: 'pablo.sanchez@email.com',
    avatar: 'PS',
    code: 'PABLO2024',
    registrationDate: '2024-06-08',
    status: 'Activo',
    tier: 'Bronce',
    clicks: 1240,
    conversions: 18,
    conversionRate: 1.45,
    salesGenerated: 9000,
    commissionsEarned: 900,
    location: 'Zaragoza, España',
    paymentMethod: 'PayPal',
    lastPayment: '2024-09-01',
    pendingCommission: 180,
  },
  {
    id: 'AFF-007',
    name: 'Isabel Torres',
    email: 'isabel.torres@email.com',
    avatar: 'IT',
    code: 'ISABEL2024',
    registrationDate: '2024-07-15',
    status: 'Pendiente',
    tier: 'Bronce',
    clicks: 890,
    conversions: 0,
    conversionRate: 0,
    salesGenerated: 0,
    commissionsEarned: 0,
    location: 'Málaga, España',
    paymentMethod: 'PayPal',
    pendingCommission: 0,
  },
  {
    id: 'AFF-008',
    name: 'Javier Moreno',
    email: 'javier.moreno@email.com',
    avatar: 'JM',
    code: 'JAVIER2024',
    registrationDate: '2024-08-20',
    status: 'Suspendido',
    tier: 'Bronce',
    clicks: 2340,
    conversions: 12,
    conversionRate: 0.51,
    salesGenerated: 6000,
    commissionsEarned: 600,
    location: 'Murcia, España',
    paymentMethod: 'PayPal',
    pendingCommission: 0,
  },
  {
    id: 'AFF-009',
    name: 'Carmen Jiménez',
    email: 'carmen.jimenez@email.com',
    avatar: 'CJ',
    code: 'CARMEN2024',
    registrationDate: '2024-01-25',
    status: 'Activo',
    tier: 'Platino',
    clicks: 12890,
    conversions: 234,
    conversionRate: 1.82,
    salesGenerated: 117000,
    commissionsEarned: 29250,
    location: 'Granada, España',
    socialMedia: {
      instagram: '@carmendigital',
      youtube: 'Carmen Jiménez',
    },
    paymentMethod: 'Transferencia Bancaria',
    lastPayment: '2024-09-01',
    pendingCommission: 3900,
  },
  {
    id: 'AFF-010',
    name: 'Roberto Díaz',
    email: 'roberto.diaz@email.com',
    avatar: 'RD',
    code: 'ROBERTO2024',
    registrationDate: '2024-02-14',
    status: 'Activo',
    tier: 'Oro',
    clicks: 7650,
    conversions: 128,
    conversionRate: 1.67,
    salesGenerated: 64000,
    commissionsEarned: 12800,
    location: 'Alicante, España',
    paymentMethod: 'PayPal',
    lastPayment: '2024-09-01',
    pendingCommission: 2560,
  },
];

export const mockPendingApplications: PendingApplication[] = [
  {
    id: 'APP-001',
    name: 'Sofía Ramírez',
    email: 'sofia.ramirez@email.com',
    avatar: 'SR',
    reason: 'Tengo un canal de YouTube con 50k suscriptores enfocado en emprendimiento digital',
    platforms: ['YouTube', 'Instagram', 'TikTok'],
    audience: '50,000+ seguidores interesados en negocios online',
    applicationDate: '2024-09-15',
  },
  {
    id: 'APP-002',
    name: 'Miguel Ángel Castro',
    email: 'miguel.castro@email.com',
    avatar: 'MC',
    reason: 'Blog de marketing digital con 100k visitas mensuales',
    platforms: ['Blog', 'Newsletter', 'LinkedIn'],
    audience: '100,000 visitas mensuales + 15k suscriptores newsletter',
    applicationDate: '2024-09-18',
  },
  {
    id: 'APP-003',
    name: 'Lucía Vega',
    email: 'lucia.vega@email.com',
    avatar: 'LV',
    reason: 'Influencer en Instagram con comunidad de emprendedores',
    platforms: ['Instagram', 'Facebook'],
    audience: '75,000 seguidores en Instagram',
    applicationDate: '2024-09-20',
  },
];

export const mockMarketingMaterials: MarketingMaterial[] = [
  {
    id: 'MAT-001',
    type: 'banner',
    title: 'Banner 728x90 - Header',
    description: 'Banner horizontal para sitios web',
    url: '/materials/banner-728x90.png',
    size: '728x90px',
  },
  {
    id: 'MAT-002',
    type: 'banner',
    title: 'Banner 300x250 - Sidebar',
    description: 'Banner cuadrado para sidebar',
    url: '/materials/banner-300x250.png',
    size: '300x250px',
  },
  {
    id: 'MAT-003',
    type: 'copy',
    title: 'Textos Promocionales',
    description: 'Copys pre-escritos para redes sociales',
    url: '/materials/copy-templates.pdf',
  },
  {
    id: 'MAT-004',
    type: 'video',
    title: 'Video Promocional 30s',
    description: 'Video corto para redes sociales',
    url: '/materials/promo-video-30s.mp4',
  },
  {
    id: 'MAT-005',
    type: 'email',
    title: 'Email Template - Bienvenida',
    description: 'Plantilla de email para nuevos suscriptores',
    url: '/materials/email-welcome.html',
  },
  {
    id: 'MAT-006',
    type: 'guide',
    title: 'Guía del Afiliado',
    description: 'Manual completo para afiliados',
    url: '/materials/affiliate-guide.pdf',
  },
  {
    id: 'MAT-007',
    type: 'asset',
    title: 'Logo Pack',
    description: 'Logos en diferentes formatos',
    url: '/materials/logo-pack.zip',
  },
];

export const getTierInfo = (tier: TierLevel) => {
  const tierData = {
    Bronce: {
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-500',
      commission: 10,
      minSales: 1,
      maxSales: 10,
    },
    Plata: {
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-500',
      commission: 15,
      minSales: 11,
      maxSales: 50,
    },
    Oro: {
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      borderColor: 'border-yellow-500',
      commission: 20,
      minSales: 51,
      maxSales: 100,
    },
    Platino: {
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-500',
      commission: 25,
      minSales: 101,
      maxSales: 999999,
    },
  };

  return tierData[tier];
};

export const getStatusColor = (status: AffiliateStatus) => {
  const statusColors = {
    Activo: {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-500',
    },
    Pendiente: {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-500',
    },
    Suspendido: {
      bg: 'bg-red-50',
      text: 'text-red-700',
      border: 'border-red-500',
    },
  };

  return statusColors[status];
};

// Datos para gráficos
export const monthlyChartData = [
  { month: 'Ene', ventas: 45000, comisiones: 9000 },
  { month: 'Feb', ventas: 52000, comisiones: 10400 },
  { month: 'Mar', ventas: 61000, comisiones: 12200 },
  { month: 'Abr', ventas: 58000, comisiones: 11600 },
  { month: 'May', ventas: 71000, comisiones: 14200 },
  { month: 'Jun', ventas: 83000, comisiones: 16600 },
  { month: 'Jul', ventas: 92000, comisiones: 18400 },
  { month: 'Ago', ventas: 98000, comisiones: 19600 },
  { month: 'Sep', ventas: 105000, comisiones: 21000 },
];

export const tierDistributionData = [
  { name: 'Bronce', value: 30, color: '#f97316' },
  { name: 'Plata', value: 25, color: '#64748b' },
  { name: 'Oro', value: 25, color: '#eab308' },
  { name: 'Platino', value: 20, color: '#a855f7' },
];

export const topProductsData = [
  { product: 'Plan Premium', sales: 145, revenue: 72500 },
  { product: 'Plan Pro', sales: 98, revenue: 39200 },
  { product: 'Plan Starter', sales: 76, revenue: 15200 },
  { product: 'Plan Enterprise', sales: 34, revenue: 51000 },
  { product: 'Addon - Marketing', sales: 28, revenue: 5600 },
];
