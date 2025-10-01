import axios from 'axios';

interface UpsellData {
  id: string;
  name: string;
  offered: number;
  accepted: number;
  revenue: number;
  cost: number;
}

interface ConversionReport {
  totalUpsellsOffered: number;
  totalUpsellsAccepted: number;
  overallConversionRate: number;
  totalExtraRevenue: number;
  upsells: UpsellData[];
}

export const fetchConversionReport = async (): Promise<ConversionReport> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUpsellsOffered: 1200,
        totalUpsellsAccepted: 300,
        overallConversionRate: 25,
        totalExtraRevenue: 15000,
        upsells: [
          { id: '1', name: 'Garantía Extendida', offered: 500, accepted: 150, revenue: 7500, cost: 1000 },
          { id: '2', name: 'Servicio Premium', offered: 400, accepted: 100, revenue: 5000, cost: 800 },
          { id: '3', name: 'Producto Adicional', offered: 300, accepted: 50, revenue: 2500, cost: 500 },
        ],
      });
    }, 1000);
  });
};

export const calculateROI = (revenue: number, cost: number): number => {
  if (cost === 0) return revenue > 0 ? Infinity : 0;
  return ((revenue - cost) / cost) * 100;
};
