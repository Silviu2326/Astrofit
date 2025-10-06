
import { Coupon } from '../../types'; // Assuming a types file exists at this path

// Mock data for coupons
let mockCoupons: Coupon[] = [
  {
    id: 'c1',
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    expiresAt: '2025-12-31',
    maxUses: 100,
    currentUses: 10,
    reusable: true,
    restrictions: { products: [], clients: [], minPurchase: 50 },
    campaign: 'Captación Nuevos Clientes',
    status: 'active',
  },
  {
    id: 'c2',
    code: 'SAVE10',
    type: 'fixed',
    value: 10,
    expiresAt: '2025-11-15',
    maxUses: 50,
    currentUses: 45,
    reusable: false,
    restrictions: { products: ['prod1'], clients: [], minPurchase: 0 },
    campaign: 'Premios Fidelidad',
    status: 'active',
  },
  {
    id: 'c3',
    code: 'FREESHIP',
    type: 'shipping',
    value: 0,
    expiresAt: '2025-10-31',
    maxUses: 200,
    currentUses: 180,
    reusable: true,
    restrictions: { products: [], clients: [], minPurchase: 30 },
    campaign: 'Promoción Otoño',
    status: 'expiring',
  },
];

// Mock API functions

export const fetchCoupons = async (): Promise<Coupon[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCoupons);
    }, 500);
  });
};

export const createCoupon = async (newCoupon: Omit<Coupon, 'id' | 'currentUses' | 'status'>): Promise<Coupon> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const coupon: Coupon = {
        id: `c${mockCoupons.length + 1}`,
        currentUses: 0,
        status: 'active',
        ...newCoupon,
      };
      mockCoupons.push(coupon);
      resolve(coupon);
    }, 500);
  });
};

export const updateCoupon = async (updatedCoupon: Coupon): Promise<Coupon> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockCoupons.findIndex((c) => c.id === updatedCoupon.id);
      if (index !== -1) {
        mockCoupons[index] = updatedCoupon;
        resolve(updatedCoupon);
      } else {
        reject(new Error('Coupon not found'));
      }
    }, 500);
  });
};

export const deleteCoupon = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = mockCoupons.length;
      mockCoupons = mockCoupons.filter((c) => c.id !== id);
      if (mockCoupons.length < initialLength) {
        resolve();
      } else {
        reject(new Error('Coupon not found'));
      }
    }, 500);
  });
};

export const getExpiringCoupons = async (): Promise<Coupon[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const today = new Date();
      const expiringSoon = mockCoupons.filter(coupon => {
        if (coupon.expiresAt) {
          const expiryDate = new Date(coupon.expiresAt);
          const diffTime = Math.abs(expiryDate.getTime() - today.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7 && expiryDate >= today; // Expiring within 7 days
        }
        return false;
      });
      resolve(expiringSoon);
    }, 500);
  });
};

export const getCouponStats = async (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalCoupons = mockCoupons.length;
      const activeCoupons = mockCoupons.filter(c => c.status === 'active').length;
      const expiredCoupons = mockCoupons.filter(c => c.expiresAt && new Date(c.expiresAt) < new Date()).length;
      const totalUses = mockCoupons.reduce((sum, c) => sum + c.currentUses, 0);

      const conversionRate = (totalUses / (totalCoupons * 100)) * 100; // Mock conversion rate

      resolve({
        totalCoupons,
        activeCoupons,
        expiredCoupons,
        totalUses,
        conversionRate: conversionRate.toFixed(2) + '%',
        couponEffectiveness: mockCoupons.map(c => ({
          code: c.code,
          uses: c.currentUses,
          effectiveness: ((c.currentUses / (c.maxUses || 100)) * 100).toFixed(2) + '%',
        })),
      });
    }, 500);
  });
};
