import { useState, useEffect } from 'react';

export interface FitofficeCharge {
  id: string;
  amount: number;
  currency: string;
  date: string;
  description: string;
}

export interface StripePayout {
  id: string;
  amount: number;
  currency: string;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  fees: number;
}

export interface Discrepancy {
  id: string;
  type: 'missing_fitoffice' | 'missing_stripe' | 'amount_mismatch' | 'date_mismatch';  fitofficeId?: string;
  stripeId?: string;
  expectedAmount?: number;
  actualAmount?: number;
  expectedDate?: string;
  actualDate?: string;
  resolved: boolean;
}

// Mock data for Fitoffice charges
const mockFitofficeCharges: FitofficeCharge[] = [
  { id: 'FO-001', amount: 10000, currency: 'EUR', date: '2025-09-20', description: 'Consulta dental' },
  { id: 'FO-002', amount: 15000, currency: 'EUR', date: '2025-09-21', description: 'Blanqueamiento' },
  { id: 'FO-003', amount: 5000, currency: 'EUR', date: '2025-09-22', description: 'Revisión' },
  { id: 'FO-004', amount: 20000, currency: 'EUR', date: '2025-09-23', description: 'Ortodoncia' },
  { id: 'FO-005', amount: 7500, currency: 'EUR', date: '2025-09-24', description: 'Limpieza' },
];

// Mock data for Stripe payouts
const mockStripePayouts: StripePayout[] = [
  { id: 'SP-001', amount: 9800, currency: 'EUR', date: '2025-09-20', status: 'paid', fees: 200 }, // Matches FO-001 with fees
  { id: 'SP-002', amount: 14700, currency: 'EUR', date: '2025-09-21', status: 'paid', fees: 300 }, // Matches FO-002 with fees
  { id: 'SP-003', amount: 4900, currency: 'EUR', date: '2025-09-22', status: 'paid', fees: 100 }, // Matches FO-003 with fees
  { id: 'SP-004', amount: 19600, currency: 'EUR', date: '2025-09-23', status: 'paid', fees: 400 }, // Matches FO-004 with fees
  { id: 'SP-006', amount: 8000, currency: 'EUR', date: '2025-09-25', status: 'paid', fees: 150 }, // Discrepancy: missing FO-005, new payout
];

// Mock data for discrepancies
const mockDiscrepancies: Discrepancy[] = [
  {
    id: 'D-001',
    type: 'missing_stripe',
    fitofficeId: 'FO-005',
    expectedAmount: 7500,
    expectedDate: '2025-09-24',
    resolved: false,
  },
  {
    id: 'D-002',
    type: 'amount_mismatch',
    fitofficeId: 'FO-004',
    stripeId: 'SP-004',
    expectedAmount: 20000,
    actualAmount: 19600,
    resolved: false,
  },
];

export const useConciliacionPagosData = () => {
  const [fitofficeCharges, setFitofficeCharges] = useState<FitofficeCharge[]>([]);
  const [stripePayouts, setStripePayouts] = useState<StripePayout[]>([]);
  const [discrepancies, setDiscrepancies] = useState<Discrepancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setFitofficeCharges(mockFitofficeCharges);
        setStripePayouts(mockStripePayouts);
        setDiscrepancies(mockDiscrepancies);
      } catch (err) {
        setError('Error al cargar los datos de conciliación.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const resolveDiscrepancy = (id: string) => {
    setDiscrepancies(prev =>
      prev.map(d => (d.id === id ? { ...d, resolved: true } : d))
    );
  };

  return {
    fitofficeCharges,
    stripePayouts,
    discrepancies,
    loading,
    error,
    resolveDiscrepancy,
  };
};