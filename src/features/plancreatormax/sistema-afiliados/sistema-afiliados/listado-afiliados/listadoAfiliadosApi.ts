
import { Affiliate } from './types';
import { PlaceholderImages } from '../../../../../utils/placeholderImages';

// Simulaci??n de datos de afiliados
const mockAffiliates: Affiliate[] = [
  {
    id: '1',
    name: 'Juan P??rez',
    referralCode: 'JP2023',
    salesGenerated: 1500,
    pendingCommission: 150,
    status: 'active',
    performance: 'high',
    photo: PlaceholderImages.generic(40, 40),
  },
  {
    id: '2',
    name: 'Mar??a Garc??a',
    referralCode: 'MG2023',
    salesGenerated: 800,
    pendingCommission: 80,
    status: 'active',
    performance: 'medium',
    photo: PlaceholderImages.generic(40, 40),
  },
  {
    id: '3',
    name: 'Carlos Ru??z',
    referralCode: 'CR2023',
    salesGenerated: 300,
    pendingCommission: 30,
    status: 'suspended',
    performance: 'low',
    photo: PlaceholderImages.generic(40, 40),
  },
];

export const getAffiliates = async (): Promise<Affiliate[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAffiliates);
    }, 500);
  });
};

export const payCommission = async (affiliateId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Comisi??n pagada para el afiliado ${affiliateId}`);
      resolve();
    }, 300);
  });
};

export const suspendAffiliate = async (affiliateId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Afiliado ${affiliateId} suspendido`);
      resolve();
    }, 300);
  });
};

export const contactAffiliate = async (affiliateId: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Contactando al afiliado ${affiliateId}`);
      resolve();
    }, 300);
  });
};

// Definici??n de tipos (pueden ir en un archivo separado como types.ts)
export interface Affiliate {
  id: string;
  name: string;
  referralCode: string;
  salesGenerated: number;
  pendingCommission: number;
  status: 'active' | 'suspended';
  performance: 'high' | 'medium' | 'low';
  photo: string;
}
