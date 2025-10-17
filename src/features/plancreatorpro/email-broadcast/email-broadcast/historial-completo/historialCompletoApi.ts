// src/features/email-broadcast/historial-completo/historialCompletoApi.ts
// API functions for complete campaign history management

interface Campaign {
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
}

export const fetchAllCampaigns = async (): Promise<Campaign[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          subject: 'Newsletter Semanal - Ofertas Especiales',
          date: '2024-10-15',
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
          template: 'Newsletter Template'
        },
        {
          id: '2',
          subject: 'Recordatorio: Webinar Gratuito',
          date: '2024-10-14',
          time: '14:15',
          recipients: 1800,
          openRate: 0.22,
          clickRate: 0.08,
          status: 'sent',
          performance: 'average',
          revenue: 0,
          unsubscribeRate: 0.01,
          bounceRate: 0.02,
          segment: 'Leads Calientes',
          template: 'Webinar Template'
        },
        {
          id: '3',
          subject: 'Nuevos Productos en Stock',
          date: '2024-10-10',
          time: '09:45',
          recipients: 3200,
          openRate: 0.31,
          clickRate: 0.12,
          status: 'sent',
          performance: 'good',
          revenue: 3200,
          unsubscribeRate: 0.03,
          bounceRate: 0.01,
          segment: 'Todos los Segmentos',
          template: 'Product Launch Template'
        },
        {
          id: '4',
          subject: 'Encuesta de Satisfacción',
          date: '2024-10-05',
          time: '16:20',
          recipients: 1500,
          openRate: 0.19,
          clickRate: 0.04,
          status: 'sent',
          performance: 'bad',
          revenue: 0,
          unsubscribeRate: 0.05,
          bounceRate: 0.03,
          segment: 'Clientes Recientes',
          template: 'Survey Template'
        },
        {
          id: '5',
          subject: 'Black Friday - Descuentos Exclusivos',
          date: '2024-10-01',
          time: '08:00',
          recipients: 5000,
          openRate: 0.35,
          clickRate: 0.15,
          status: 'sent',
          performance: 'good',
          revenue: 15000,
          unsubscribeRate: 0.02,
          bounceRate: 0.01,
          segment: 'Todos los Segmentos',
          template: 'Promotion Template'
        },
        {
          id: '6',
          subject: 'Bienvenida a Nuevos Suscriptores',
          date: '2024-10-18',
          time: '12:00',
          recipients: 800,
          openRate: 0.45,
          clickRate: 0.18,
          status: 'sent',
          performance: 'good',
          revenue: 400,
          unsubscribeRate: 0.01,
          bounceRate: 0.01,
          segment: 'Nuevos Suscriptores',
          template: 'Welcome Template'
        },
        {
          id: '7',
          subject: 'Recordatorio de Carrito Abandonado',
          date: '2024-10-17',
          time: '15:30',
          recipients: 1200,
          openRate: 0.25,
          clickRate: 0.10,
          status: 'sent',
          performance: 'average',
          revenue: 600,
          unsubscribeRate: 0.02,
          bounceRate: 0.02,
          segment: 'Carrito Abandonado',
          template: 'Abandoned Cart Template'
        },
        {
          id: '8',
          subject: 'Newsletter de Octubre - Tendencias 2024',
          date: '2024-10-16',
          time: '11:00',
          recipients: 2800,
          openRate: 0.20,
          clickRate: 0.05,
          status: 'sent',
          performance: 'average',
          revenue: 0,
          unsubscribeRate: 0.03,
          bounceRate: 0.02,
          segment: 'Suscriptores Newsletter',
          template: 'Newsletter Template'
        },
        {
          id: '9',
          subject: 'Campaña de Re-engagement',
          date: '2024-10-19',
          time: '13:45',
          recipients: 900,
          openRate: 0.15,
          clickRate: 0.03,
          status: 'sent',
          performance: 'bad',
          revenue: 0,
          unsubscribeRate: 0.08,
          bounceRate: 0.05,
          segment: 'Usuarios Inactivos',
          template: 'Re-engagement Template'
        },
        {
          id: '10',
          subject: 'Ofertas de Fin de Semana',
          date: '2024-01-06',
          time: '17:00',
          recipients: 2200,
          openRate: 0.30,
          clickRate: 0.12,
          status: 'sent',
          performance: 'good',
          revenue: 1100,
          unsubscribeRate: 0.02,
          bounceRate: 0.01,
          segment: 'Clientes Frecuentes',
          template: 'Weekend Offers Template'
        },
        {
          id: '11',
          subject: 'Campaña de Seguimiento Post-Compra',
          date: '2024-01-05',
          time: '10:15',
          recipients: 600,
          openRate: 0.40,
          clickRate: 0.20,
          status: 'sent',
          performance: 'good',
          revenue: 300,
          unsubscribeRate: 0.01,
          bounceRate: 0.01,
          segment: 'Clientes Recientes',
          template: 'Post-Purchase Template'
        },
        {
          id: '12',
          subject: 'Newsletter de Diciembre - Resumen del Año',
          date: '2024-01-04',
          time: '14:30',
          recipients: 3500,
          openRate: 0.18,
          clickRate: 0.04,
          status: 'sent',
          performance: 'bad',
          revenue: 0,
          unsubscribeRate: 0.04,
          bounceRate: 0.03,
          segment: 'Todos los Segmentos',
          template: 'Year End Template'
        },
        {
          id: '13',
          subject: 'Campaña de Lanzamiento de Producto',
          date: '2024-01-03',
          time: '09:00',
          recipients: 4000,
          openRate: 0.32,
          clickRate: 0.14,
          status: 'sent',
          performance: 'good',
          revenue: 4000,
          unsubscribeRate: 0.02,
          bounceRate: 0.01,
          segment: 'Early Adopters',
          template: 'Product Launch Template'
        },
        {
          id: '14',
          subject: 'Recordatorio de Evento Próximo',
          date: '2024-01-02',
          time: '16:00',
          recipients: 1500,
          openRate: 0.26,
          clickRate: 0.09,
          status: 'sent',
          performance: 'average',
          revenue: 0,
          unsubscribeRate: 0.02,
          bounceRate: 0.02,
          segment: 'Asistentes Eventos',
          template: 'Event Reminder Template'
        },
        {
          id: '15',
          subject: 'Campaña de Feedback de Producto',
          date: '2024-01-01',
          time: '12:00',
          recipients: 2000,
          openRate: 0.24,
          clickRate: 0.07,
          status: 'sent',
          performance: 'average',
          revenue: 0,
          unsubscribeRate: 0.03,
          bounceRate: 0.02,
          segment: 'Compradores Recientes',
          template: 'Feedback Template'
        },
        {
          id: '16',
          subject: 'Borrador: Campaña de Marzo',
          date: '2024-01-15',
          time: '10:00',
          recipients: 0,
          openRate: 0,
          clickRate: 0,
          status: 'draft',
          performance: 'average',
          segment: 'Todos los Segmentos',
          template: 'Draft Template'
        },
        {
          id: '17',
          subject: 'Programado: Campaña de San Valentín',
          date: '2024-02-14',
          time: '09:00',
          recipients: 3000,
          openRate: 0,
          clickRate: 0,
          status: 'scheduled',
          performance: 'average',
          segment: 'Parejas',
          template: 'Valentine Template'
        },
        {
          id: '18',
          subject: 'Campaña Fallida - Error de Envío',
          date: '2024-01-10',
          time: '11:30',
          recipients: 0,
          openRate: 0,
          clickRate: 0,
          status: 'failed',
          performance: 'bad',
          segment: 'Test Segment',
          template: 'Test Template'
        }
      ]);
    }, 800);
  });
};

export const exportCampaigns = async (campaigns: Campaign[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Simulate CSV export
        const csvContent = [
          'ID,Asunto,Fecha,Hora,Destinatarios,Tasa Apertura,Tasa Clics,Estado,Rendimiento,Ingresos,Segmento',
          ...campaigns.map(c => 
            `${c.id},"${c.subject}",${c.date},${c.time},${c.recipients},${(c.openRate * 100).toFixed(2)}%,${(c.clickRate * 100).toFixed(2)}%,${c.status},${c.performance},${c.revenue || 0},"${c.segment || ''}"`
          )
        ].join('\n');
        
        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `campaigns_export_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        resolve();
      } catch (error) {
        reject(new Error('Error al exportar las campañas'));
      }
    }, 1500);
  });
};

export const deleteCampaign = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log(`Eliminando campaña con ID: ${id}`);
        // Simulate successful deletion
        resolve();
      } catch (error) {
        reject(new Error('Error al eliminar la campaña'));
      }
    }, 1000);
  });
};

export const duplicateCampaign = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        console.log(`Duplicando campaña con ID: ${id}`);
        // Simulate successful duplication
        resolve();
      } catch (error) {
        reject(new Error('Error al duplicar la campaña'));
      }
    }, 1200);
  });
};

export type { Campaign };
