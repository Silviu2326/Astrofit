import { useState, useEffect } from 'react';

export interface EmailMetrics {
  totalSent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
}

export interface EmailAnalytics {
  metrics: EmailMetrics;
  dailyStats: {
    date: string;
    sent: number;
    opened: number;
    clicked: number;
  }[];
  topCampaigns: {
    name: string;
    sent: number;
    openRate: number;
    clickRate: number;
  }[];
  deviceStats: {
    device: string;
    count: number;
    percentage: number;
  }[];
  geographicStats: {
    country: string;
    count: number;
    percentage: number;
  }[];
}

export const useEmailAnalytics = (dateRange: { start: Date; end: Date }) => {
  const [analytics, setAnalytics] = useState<EmailAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simular carga de datos
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Datos de ejemplo
        const mockMetrics: EmailMetrics = {
          totalSent: 15420,
          delivered: 14890,
          opened: 8934,
          clicked: 3567,
          bounced: 530,
          unsubscribed: 89,
          deliveryRate: 96.6,
          openRate: 60.0,
          clickRate: 39.9,
          bounceRate: 3.4,
        };

        const mockDailyStats = Array.from({ length: 14 }, (_, i) => {
          const date = new Date(dateRange.end);
          date.setDate(date.getDate() - (13 - i));
          return {
            date: date.toISOString().split('T')[0],
            sent: Math.floor(Math.random() * 1500) + 500,
            opened: Math.floor(Math.random() * 800) + 300,
            clicked: Math.floor(Math.random() * 400) + 100,
          };
        });

        const mockTopCampaigns = [
          { name: 'Campaña Verano 2024', sent: 3200, openRate: 68.5, clickRate: 45.2 },
          { name: 'Newsletter Mensual', sent: 2800, openRate: 62.3, clickRate: 38.7 },
          { name: 'Promoción Flash', sent: 2100, openRate: 71.2, clickRate: 52.1 },
          { name: 'Bienvenida Nuevos', sent: 1850, openRate: 58.9, clickRate: 35.4 },
          { name: 'Recuperación Carritos', sent: 1420, openRate: 55.6, clickRate: 42.3 },
        ];

        const mockDeviceStats = [
          { device: 'Mobile', count: 5360, percentage: 60.0 },
          { device: 'Desktop', count: 2680, percentage: 30.0 },
          { device: 'Tablet', count: 894, percentage: 10.0 },
        ];

        const mockGeographicStats = [
          { country: 'España', count: 4467, percentage: 50.0 },
          { country: 'México', count: 2234, percentage: 25.0 },
          { country: 'Argentina', count: 1340, percentage: 15.0 },
          { country: 'Colombia', count: 893, percentage: 10.0 },
        ];

        setAnalytics({
          metrics: mockMetrics,
          dailyStats: mockDailyStats,
          topCampaigns: mockTopCampaigns,
          deviceStats: mockDeviceStats,
          geographicStats: mockGeographicStats,
        });
      } catch (err) {
        setError('Error al cargar las analíticas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [dateRange]);

  return { analytics, loading, error };
};
