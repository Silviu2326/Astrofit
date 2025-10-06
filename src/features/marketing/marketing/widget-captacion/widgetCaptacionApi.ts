
import { WidgetConfig, Lead, AnalyticsData } from './types';

// Mock data
const mockWidgetConfigs: WidgetConfig[] = [
  {
    id: 'widget-1',
    type: 'reserva',
    name: 'Widget de Reserva Principal',
    embedCode: '<iframe src="https://example.com/widget/reserva/1" width="100%" height="600px"></iframe>',
    design: { primaryColor: '#4F46E5', buttonText: 'Reservar Ahora', fields: ['nombre', 'email', 'telefono', 'fecha', 'hora'] },
    analytics: { conversions: 120, clicks: 500, pageViews: { '/home': 300, '/servicios': 200 } },
  },
  {
    id: 'widget-2',
    type: 'info',
    name: 'Widget de Información de Contacto',
    embedCode: '<button id="open-info-widget">Más Información</button><script>/* widget script */</script>',
    design: { primaryColor: '#10B981', buttonText: 'Solicitar Info', fields: ['nombre', 'email'] },
    analytics: { conversions: 45, clicks: 200, pageViews: { '/contacto': 150, '/about': 50 } },
  },
  {
    id: 'widget-3',
    type: 'descarga',
    name: 'Widget Descarga Guía Fitness',
    embedCode: '<div id="fitness-guide-widget"></div><script>/* widget script */</script>',
    design: { primaryColor: '#F59E0B', buttonText: 'Descargar Guía', fields: ['email'] },
    analytics: { conversions: 80, clicks: 300, pageViews: { '/blog/fitness': 250 } },
  },
];

const mockLeads: Lead[] = [
  { id: 'lead-1', widgetId: 'widget-1', name: 'Juan Pérez', email: 'juan.perez@example.com', phone: '123-456-7890', date: '2025-10-01', time: '10:00', sourcePage: '/home', timestamp: new Date('2025-09-26T10:00:00Z') },
  { id: 'lead-2', widgetId: 'widget-2', name: 'María García', email: 'maria.garcia@example.com', phone: '', date: '', time: '', sourcePage: '/contacto', timestamp: new Date('2025-09-26T11:30:00Z') },
  { id: 'lead-3', widgetId: 'widget-1', name: 'Carlos Ruíz', email: 'carlos.ruiz@example.com', phone: '987-654-3210', date: '2025-10-02', time: '14:00', sourcePage: '/servicios', timestamp: new Date('2025-09-26T12:45:00Z') },
];

// Types
export interface WidgetConfig {
  id: string;
  type: 'reserva' | 'info' | 'descarga';
  name: string;
  embedCode: string;
  design: {
    primaryColor: string;
    buttonText: string;
    fields: string[]; // e.g., ['nombre', 'email', 'telefono']
  };
  analytics: AnalyticsData;
}

export interface Lead {
  id: string;
  widgetId: string;
  name: string;
  email: string;
  phone?: string;
  date?: string;
  time?: string;
  sourcePage: string;
  timestamp: Date;
}

export interface AnalyticsData {
  conversions: number;
  clicks: number;
  pageViews: { [key: string]: number };
}

// API functions
export const widgetCaptacionApi = {
  getWidgets: async (): Promise<WidgetConfig[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWidgetConfigs), 500);
    });
  },

  getWidgetById: async (id: string): Promise<WidgetConfig | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockWidgetConfigs.find(widget => widget.id === id)), 500);
    });
  },

  createWidget: async (newWidget: Omit<WidgetConfig, 'id' | 'embedCode' | 'analytics'>): Promise<WidgetConfig> => {
    return new Promise((resolve) => {
      const id = `widget-${mockWidgetConfigs.length + 1}`;
      const embedCode = `<iframe src="https://example.com/widget/${newWidget.type}/${id}" width="100%" height="600px"></iframe>`;
      const createdWidget: WidgetConfig = {
        ...newWidget,
        id,
        embedCode,
        analytics: { conversions: 0, clicks: 0, pageViews: {} },
      };
      mockWidgetConfigs.push(createdWidget);
      setTimeout(() => resolve(createdWidget), 500);
    });
  },

  updateWidget: async (updatedWidget: WidgetConfig): Promise<WidgetConfig> => {
    return new Promise((resolve, reject) => {
      const index = mockWidgetConfigs.findIndex(w => w.id === updatedWidget.id);
      if (index !== -1) {
        mockWidgetConfigs[index] = updatedWidget;
        setTimeout(() => resolve(updatedWidget), 500);
      } else {
        reject(new Error('Widget not found'));
      }
    });
  },

  deleteWidget: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const initialLength = mockWidgetConfigs.length;
      mockWidgetConfigs = mockWidgetConfigs.filter(widget => widget.id !== id);
      if (mockWidgetConfigs.length < initialLength) {
        setTimeout(() => resolve(), 500);
      } else {
        reject(new Error('Widget not found'));
      }
    });
  },

  getLeads: async (widgetId?: string): Promise<Lead[]> => {
    return new Promise((resolve) => {
      const filteredLeads = widgetId ? mockLeads.filter(lead => lead.widgetId === widgetId) : mockLeads;
      setTimeout(() => resolve(filteredLeads), 500);
    });
  },

  getAnalytics: async (widgetId: string): Promise<AnalyticsData | undefined> => {
    return new Promise((resolve) => {
      const widget = mockWidgetConfigs.find(w => w.id === widgetId);
      setTimeout(() => resolve(widget?.analytics), 500);
    });
  },

  // Simulate webhook notification
  simulateNewLeadWebhook: (lead: Lead) => {
    console.log('Simulating webhook for new lead:', lead);
    // In a real application, this would send data to a configured webhook URL
  },
};
