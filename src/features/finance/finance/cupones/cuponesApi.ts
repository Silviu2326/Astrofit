const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Tipos actualizados para coincidir con el backend
export type CouponType = 'percentage' | 'fixed' | 'free-shipping' | '2x1';
export type CouponStatus = 'active' | 'scheduled' | 'expired' | 'paused';
export type ApplicableTo = 'all' | 'products' | 'categories' | 'plans';

export interface CouponUse {
  _id?: string;
  customerName: string;
  customerId?: string;
  date: string;
  product?: string;
  discountApplied: number;
  orderTotal: number;
  channel: string;
}

export interface Coupon {
  _id?: string;
  id?: string;
  code: string;
  type: CouponType;
  value: number;
  status: CouponStatus;
  description?: string;
  startDate: string;
  endDate: string | null;
  usageLimit: number | null;
  usageCount: number;
  totalDiscount: number;
  revenue: number;
  applicableTo: ApplicableTo;
  products?: string[];
  categories?: string[];
  minPurchase?: number;
  onePerCustomer: boolean;
  campaign?: string;
  tags: string[];
  uses: CouponUse[];
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CouponStats {
  totalCoupons: number;
  activeCoupons: number;
  expiredCoupons: number;
  totalUses: number;
  totalDiscount: number;
  totalRevenue: number;
  conversionRate: string;
  couponEffectiveness: Array<{ code: string; uses: number; effectiveness: string }>;
}

// API Functions

export const fetchCoupons = async (filters?: {
  status?: CouponStatus;
  campaign?: string;
  type?: CouponType;
  search?: string;
  active?: boolean;
}): Promise<Coupon[]> => {
  try {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.campaign) params.append('campaign', filters.campaign);
    if (filters?.type) params.append('type', filters.type);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.active !== undefined) params.append('active', String(filters.active));

    const response = await fetch(`${API_URL}/cupones?${params.toString()}`);
    if (!response.ok) throw new Error('Error al obtener cupones');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching coupons:', error);
    throw error;
  }
};

export const getCoupon = async (id: string): Promise<Coupon> => {
  try {
    const response = await fetch(`${API_URL}/cupones/${id}`);
    if (!response.ok) throw new Error('Error al obtener el cupón');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching coupon:', error);
    throw error;
  }
};

export const getCouponByCode = async (code: string): Promise<Coupon> => {
  try {
    const response = await fetch(`${API_URL}/cupones/code/${code}`);
    if (!response.ok) throw new Error('Error al obtener el cupón por código');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching coupon by code:', error);
    throw error;
  }
};

export const createCoupon = async (newCoupon: Partial<Coupon>): Promise<Coupon> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cupones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newCoupon)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear el cupón');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating coupon:', error);
    throw error;
  }
};

export const updateCoupon = async (id: string, updatedCoupon: Partial<Coupon>): Promise<Coupon> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cupones/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedCoupon)
    });

    if (!response.ok) throw new Error('Error al actualizar el cupón');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating coupon:', error);
    throw error;
  }
};

export const deleteCoupon = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cupones/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al eliminar el cupón');
  } catch (error) {
    console.error('Error deleting coupon:', error);
    throw error;
  }
};

export const validateCoupon = async (code: string, purchaseAmount: number, customerId?: string): Promise<{
  success: boolean;
  data?: {
    couponId: string;
    code: string;
    type: CouponType;
    discount: number;
    finalAmount: number;
    originalAmount: number;
  };
  error?: string;
}> => {
  try {
    const response = await fetch(`${API_URL}/cupones/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code, purchaseAmount, customerId })
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error };
    }

    return await response.json();
  } catch (error) {
    console.error('Error validating coupon:', error);
    throw error;
  }
};

export const applyCoupon = async (
  id: string,
  useData: {
    customerName: string;
    customerId?: string;
    product?: string;
    discountApplied: number;
    orderTotal: number;
    channel: string;
  }
): Promise<Coupon> => {
  try {
    const response = await fetch(`${API_URL}/cupones/${id}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(useData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al aplicar el cupón');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error applying coupon:', error);
    throw error;
  }
};

export const getExpiringCoupons = async (days: number = 7): Promise<Coupon[]> => {
  try {
    const response = await fetch(`${API_URL}/cupones/expiring/soon?days=${days}`);
    if (!response.ok) throw new Error('Error al obtener cupones por expirar');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching expiring coupons:', error);
    throw error;
  }
};

export const getCouponStats = async (): Promise<CouponStats> => {
  try {
    const response = await fetch(`${API_URL}/cupones/stats`);
    if (!response.ok) throw new Error('Error al obtener estadísticas de cupones');

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching coupon stats:', error);
    throw error;
  }
};

export const getCouponsByCampaign = async (campaign: string): Promise<Coupon[]> => {
  try {
    const response = await fetch(`${API_URL}/cupones/campaign/${encodeURIComponent(campaign)}`);
    if (!response.ok) throw new Error('Error al obtener cupones por campaña');

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching coupons by campaign:', error);
    throw error;
  }
};

export const toggleCouponStatus = async (id: string): Promise<Coupon> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cupones/${id}/toggle-status`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al cambiar el estado del cupón');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error toggling coupon status:', error);
    throw error;
  }
};

export const toggleCouponActive = async (id: string): Promise<Coupon> => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cupones/${id}/toggle-active`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) throw new Error('Error al activar/desactivar el cupón');

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error toggling coupon active:', error);
    throw error;
  }
};
