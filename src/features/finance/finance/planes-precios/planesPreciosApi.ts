
// C:/Users/usuario/Documents/project-bolt-sb1-qekdxfwt/project/src/features/planes-precios/planesPreciosApi.ts

export interface Plan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceQuarterly?: number;
  priceAnnually?: number;
  features: string[];
  type: 'online' | 'presencial' | 'mixto';
}

export interface PackagePromotion {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  validUntil: string;
  plansIncluded: string[]; // IDs of plans included
}

export interface PriceHistoryEntry {
  planId: string;
  oldPrice: number;
  newPrice: number;
  changeDate: string;
  changedBy: string;
}

// Mock Data
const mockPlans: Plan[] = [
  {
    id: 'plan-1',
    name: 'Básico Online',
    description: 'Acceso completo a todas las funcionalidades online.',
    priceMonthly: 29.99,
    priceAnnually: 299.99,
    features: ['Clases online', 'Material didáctico', 'Soporte básico'],
    type: 'online',
  },
  {
    id: 'plan-2',
    name: 'Premium Presencial',
    description: 'Clases presenciales con acceso a recursos premium.',
    priceMonthly: 59.99,
    priceQuarterly: 159.99,
    features: ['Clases presenciales', 'Material premium', 'Soporte prioritario', 'Acceso a eventos'],
    type: 'presencial',
  },
  {
    id: 'plan-3',
    name: 'Mixto Pro',
    description: 'Lo mejor de ambos mundos: online y presencial.',
    priceMonthly: 79.99,
    priceAnnually: 799.99,
    features: ['Clases online y presenciales', 'Todos los materiales', 'Soporte 24/7', 'Mentoría personalizada'],
    type: 'mixto',
  },
];

const mockPackagePromotions: PackagePromotion[] = [
  {
    id: 'promo-1',
    name: 'Pack Verano Online',
    description: '3 meses de plan Básico Online con descuento.',
    originalPrice: 89.97,
    discountedPrice: 69.99,
    validUntil: '2025-09-30',
    plansIncluded: ['plan-1'],
  },
  {
    id: 'promo-2',
    name: 'Oferta Anual Mixta',
    description: 'Plan Mixto Pro anual con un 20% de descuento.',
    originalPrice: 959.88,
    discountedPrice: 767.90,
    validUntil: '2025-12-31',
    plansIncluded: ['plan-3'],
  },
];

const mockPriceHistory: PriceHistoryEntry[] = [
  {
    planId: 'plan-1',
    oldPrice: 24.99,
    newPrice: 29.99,
    changeDate: '2024-01-15',
    changedBy: 'Admin User',
  },
  {
    planId: 'plan-3',
    oldPrice: 74.99,
    newPrice: 79.99,
    changeDate: '2024-03-01',
    changedBy: 'System',
  },
];

export const planesPreciosApi = {
  getPlans: async (): Promise<Plan[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPlans), 500);
    });
  },
  getPackagePromotions: async (): Promise<PackagePromotion[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPackagePromotions), 500);
    });
  },
  getPriceHistory: async (): Promise<PriceHistoryEntry[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPriceHistory), 500);
    });
  },
  // Add more API functions as needed for CRUD operations
};
