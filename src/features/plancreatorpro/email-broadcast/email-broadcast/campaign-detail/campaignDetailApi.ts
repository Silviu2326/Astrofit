// src/features/email-broadcast/campaign-detail/campaignDetailApi.ts
// API functions for campaign detail management

interface CampaignDetail {
  id: string;
  subject: string;
  date: string;
  time: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  status: 'sent' | 'draft' | 'scheduled' | 'failed';
  performance: 'good' | 'average' | 'bad';
  revenue?: number;
  unsubscribeRate?: number;
  bounceRate?: number;
  segment?: string;
  template?: string;
  content?: string;
  senderName?: string;
  senderEmail?: string;
  replyTo?: string;
  tags?: string[];
  abTestVariant?: string;
  abTestWinner?: boolean;
}

interface CampaignAnalytics {
  opens: {
    total: number;
    unique: number;
    rate: number;
    timeline: Array<{ date: string; opens: number }>;
  };
  clicks: {
    total: number;
    unique: number;
    rate: number;
    timeline: Array<{ date: string; clicks: number }>;
  };
  devices: Array<{ device: string; percentage: number; opens: number }>;
  locations: Array<{ country: string; percentage: number; opens: number }>;
  links: Array<{ url: string; clicks: number; percentage: number }>;
  unsubscribes: number;
  bounces: number;
  complaints: number;
}

export const fetchCampaignDetail = async (campaignId: string): Promise<CampaignDetail> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Mock campaign data based on ID
        const campaignData: CampaignDetail = {
          id: campaignId,
          subject: 'Newsletter Semanal - Ofertas Especiales',
          date: '2024-01-15',
          time: '10:30',
          recipients: 2500,
          openRate: 0.28,
          clickRate: 0.06,
          status: 'sent',
          performance: 'good',
          revenue: 1250,
          unsubscribeRate: 0.02,
          bounceRate: 0.01,
          segment: 'Clientes Activos',
          template: 'Newsletter Template',
          content: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333; text-align: center;">¡Ofertas Especiales Esta Semana!</h1>
              <p style="color: #666; line-height: 1.6;">
                Hola [NOMBRE],<br><br>
                Tenemos increíbles ofertas esperándote esta semana. No te pierdas estas oportunidades únicas:
              </p>
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #e74c3c; margin-top: 0;">🔥 Ofertas Destacadas</h2>
                <ul style="color: #333;">
                  <li>50% de descuento en productos seleccionados</li>
                  <li>Envío gratis en compras superiores a $50</li>
                  <li>Acceso exclusivo a productos nuevos</li>
                </ul>
              </div>
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://ejemplo.com/ofertas" 
                   style="background: #3498db; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Ver Ofertas
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">
                Gracias por ser parte de nuestra comunidad.<br>
                El equipo de [EMPRESA]
              </p>
            </div>
          `,
          senderName: 'Equipo de Marketing',
          senderEmail: 'marketing@empresa.com',
          replyTo: 'noreply@empresa.com',
          tags: ['newsletter', 'ofertas', 'promocional'],
          abTestVariant: 'A',
          abTestWinner: true
        };

        resolve(campaignData);
      } catch (error) {
        reject(new Error('Error al cargar los detalles de la campaña'));
      }
    }, 600);
  });
};

export const fetchCampaignAnalytics = async (campaignId: string): Promise<CampaignAnalytics> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Use campaignId for future API calls
        console.log(`Fetching analytics for campaign: ${campaignId}`);
        const analyticsData: CampaignAnalytics = {
          opens: {
            total: 1250,
            unique: 700,
            rate: 0.28,
            timeline: [
              { date: '2024-01-15', opens: 450 },
              { date: '2024-01-16', opens: 320 },
              { date: '2024-01-17', opens: 280 },
              { date: '2024-01-18', opens: 200 }
            ]
          },
          clicks: {
            total: 180,
            unique: 150,
            rate: 0.06,
            timeline: [
              { date: '2024-01-15', clicks: 65 },
              { date: '2024-01-16', clicks: 45 },
              { date: '2024-01-17', clicks: 40 },
              { date: '2024-01-18', clicks: 30 }
            ]
          },
          devices: [
            { device: 'Móvil', percentage: 65, opens: 455 },
            { device: 'Desktop', percentage: 25, opens: 175 },
            { device: 'Tablet', percentage: 10, opens: 70 }
          ],
          locations: [
            { country: 'España', percentage: 45, opens: 315 },
            { country: 'México', percentage: 20, opens: 140 },
            { country: 'Argentina', percentage: 15, opens: 105 },
            { country: 'Colombia', percentage: 10, opens: 70 },
            { country: 'Chile', percentage: 10, opens: 70 }
          ],
          links: [
            { url: 'https://ejemplo.com/ofertas', clicks: 85, percentage: 47.2 },
            { url: 'https://ejemplo.com/productos', clicks: 45, percentage: 25.0 },
            { url: 'https://ejemplo.com/descuentos', clicks: 30, percentage: 16.7 },
            { url: 'https://ejemplo.com/contacto', clicks: 20, percentage: 11.1 }
          ],
          unsubscribes: 50,
          bounces: 25,
          complaints: 2
        };

        resolve(analyticsData);
      } catch (error) {
        reject(new Error('Error al cargar las analíticas de la campaña'));
      }
    }, 800);
  });
};

export const exportCampaignReport = async (campaignId: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Simulate PDF export
        const reportData = {
          campaignId,
          exportDate: new Date().toISOString(),
          type: 'campaign_report'
        };
        
        // Create and download file
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `campaign_report_${campaignId}_${new Date().toISOString().split('T')[0]}.json`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        resolve();
      } catch (error) {
        reject(new Error('Error al exportar el reporte de la campaña'));
      }
    }, 2000);
  });
};

export type { CampaignDetail, CampaignAnalytics };
