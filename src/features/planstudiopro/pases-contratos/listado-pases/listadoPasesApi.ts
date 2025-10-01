export interface Pase {
  id: string;
  cliente: string;
  tipo: string;
  progreso: number;
  total: number;
  estado: 'activo' | 'vencido' | 'pausado';
}

export interface ClienteCRM {
  id: string;
  nombre: string;
  email: string;
  scoreML: number;
  segmento: string;
  lastContact: string;
}

export interface CampanaMarketing {
  id: string;
  nombre: string;
  estado: 'activa' | 'finalizada' | 'programada';
  tipo: string;
  conversionRate: number;
}

export interface TicketSoporte {
  id: string;
  clienteId: string;
  asunto: string;
  estado: 'abierto' | 'cerrado' | 'en progreso';
  prioridad: 'alta' | 'media' | 'baja';
  fechaCreacion: string;
}

export interface NPSScore {
  id: string;
  clienteId: string;
  score: number;
  comentario: string;
  fecha: string;
}

export interface SentimentAnalysis {
  id: string;
  comunicacionId: string;
  sentimiento: 'positivo' | 'negativo' | 'neutral';
  score: number;
  texto: string;
}

export interface CustomerJourney {
  id: string;
  clienteId: string;
  etapa: string;
  fecha: string;
  accion: string;
}

export interface CustomerView360Data {
  cliente: ClienteCRM;
  interacciones: any[]; // Simplified for mock
  compras: any[]; // Simplified for mock
  tickets: TicketSoporte[];
}

export interface ComunicacionOmnicanalData {
  id: string;
  clienteId: string;
  canal: string;
  mensaje: string;
  fecha: string;
}

export interface AutomationWorkflow {
  id: string;
  nombre: string;
  estado: 'activo' | 'inactivo';
  pasos: number;
}

export interface DashboardData {
  id: string;
  nombre: string;
  rol: string;
  widgets: any[]; // Simplified for mock
}

export interface MobileCRMInfo {
  id: string;
  staffId: string;
  lastSync: string;
  offlineAccess: boolean;
}

export interface VoiceNote {
  id: string;
  clienteId: string;
  transcripcion: string;
  fecha: string;
}

export interface Embajador {
  id: string;
  clienteId: string;
  nivel: string;
  referencias: number;
}

export interface IntegracionMarketingTool {
  id: string;
  nombre: string;
  conectado: boolean;
  tipo: string;
}

export const getPases = (): Pase[] => {
  return [
    {
      id: '1',
      cliente: 'Juan Pérez',
      tipo: '10 Sesiones',
      progreso: 7,
      total: 10,
      estado: 'activo',
    },
    {
      id: '2',
      cliente: 'María García',
      tipo: 'Mensual',
      progreso: 20,
      total: 30,
      estado: 'activo',
    },
    {
      id: '3',
      cliente: 'Carlos López',
      tipo: 'Trimestral',
      progreso: 60,
      total: 90,
      estado: 'vencido',
    },
    {
      id: '4',
      cliente: 'Ana Martínez',
      tipo: '10 Sesiones',
      progreso: 3,
      total: 10,
      estado: 'pausado',
    },
    {
      id: '5',
      cliente: 'Pedro Sánchez',
      tipo: 'Mensual',
      progreso: 15,
      total: 30,
      estado: 'activo',
    },
  ];
};

export const getScoringClientesML = (): ClienteCRM[] => {
  return [
    { id: 'c1', nombre: 'Cliente A', email: 'a@example.com', scoreML: 85, segmento: 'VIP', lastContact: '2025-09-20' },
    { id: 'c2', nombre: 'Cliente B', email: 'b@example.com', scoreML: 60, segmento: 'Estándar', lastContact: '2025-09-25' },
  ];
};

export const getCampanasMarketingAutomatizadas = (): CampanaMarketing[] => {
  return [
    { id: 'm1', nombre: 'Campaña Verano', estado: 'activa', tipo: 'Email', conversionRate: 0.15 },
    { id: 'm2', nombre: 'Campaña Fidelización', estado: 'finalizada', tipo: 'SMS', conversionRate: 0.10 },
  ];
};

export const getSegmentacionDinamica = (): string[] => {
  return ['VIP', 'Estándar', 'Potencial', 'Inactivo'];
};

export const getCustomerJourneyMapping = (): CustomerJourney[] => {
  return [
    { id: 'cj1', clienteId: 'c1', etapa: 'Conocimiento', fecha: '2025-01-10', accion: 'Visita Web' },
    { id: 'cj2', clienteId: 'c1', etapa: 'Consideración', fecha: '2025-01-15', accion: 'Descarga Ebook' },
  ];
};

export const getTicketsSoporte = (): TicketSoporte[] => {
  return [
    { id: 't1', clienteId: 'c1', asunto: 'Problema de acceso', estado: 'abierto', prioridad: 'alta', fechaCreacion: '2025-09-27' },
    { id: 't2', clienteId: 'c2', asunto: 'Consulta de factura', estado: 'cerrado', prioridad: 'media', fechaCreacion: '2025-09-20' },
  ];
};

export const getNetPromoterScore = (): NPSScore[] => {
  return [
    { id: 'nps1', clienteId: 'c1', score: 9, comentario: 'Excelente servicio', fecha: '2025-09-26' },
    { id: 'nps2', clienteId: 'c2', score: 6, comentario: 'Podría mejorar', fecha: '2025-09-22' },
  ];
};

export const getSistemaWinBack = (): ClienteCRM[] => {
  return [
    { id: 'ex1', nombre: 'Ex-Cliente X', email: 'x@example.com', scoreML: 40, segmento: 'Inactivo', lastContact: '2024-12-01' },
  ];
};

export const getAnalisisSentiment = (): SentimentAnalysis[] => {
  return [
    { id: 's1', comunicacionId: 'comm1', sentimiento: 'positivo', score: 0.9, texto: 'Me encanta el producto!' },
    { id: 's2', comunicacionId: 'comm2', sentimiento: 'negativo', score: 0.2, texto: 'El soporte fue lento.' },
  ];
};

export const getIntegracionMarketing = (): IntegracionMarketingTool[] => {
  return [
    { id: 'im1', nombre: 'Mailchimp', conectado: true, tipo: 'Email Marketing' },
    { id: 'im2', nombre: 'Salesforce', conectado: false, tipo: 'CRM' },
  ];
};

export const getProgramaEmbajadores = (): Embajador[] => {
  return [
    { id: 'emb1', clienteId: 'c1', nivel: 'Oro', referencias: 10 },
    { id: 'emb2', clienteId: 'c2', nivel: 'Plata', referencias: 3 },
  ];
};

export const getCustomerView360 = (clienteId: string): CustomerView360Data | undefined => {
  if (clienteId === 'c1') {
    return {
      cliente: { id: 'c1', nombre: 'Cliente A', email: 'a@example.com', scoreML: 85, segmento: 'VIP', lastContact: '2025-09-20' },
      interacciones: [{ tipo: 'email', fecha: '2025-09-20', asunto: 'Consulta de producto' }],
      compras: [{ id: 'p1', producto: 'Producto X', fecha: '2025-08-10', monto: 100 }],
      tickets: [{ id: 't1', clienteId: 'c1', asunto: 'Problema de acceso', estado: 'abierto', prioridad: 'alta', fechaCreacion: '2025-09-27' }],
    };
  }
  return undefined;
};

export const getComunicacionOmnicanal = (clienteId: string): ComunicacionOmnicanalData[] => {
  return [
    { id: 'oc1', clienteId: 'c1', canal: 'Email', mensaje: 'Hola Cliente A...', fecha: '2025-09-20' },
    { id: 'oc2', clienteId: 'c1', canal: 'SMS', mensaje: 'Tu pedido ha sido enviado.', fecha: '2025-09-21' },
  ];
};

export const getAutomationBuilder = (): AutomationWorkflow[] => {
  return [
    { id: 'aw1', nombre: 'Onboarding Clientes', estado: 'activo', pasos: 5 },
    { id: 'aw2', nombre: 'Recuperación Carrito', estado: 'inactivo', pasos: 3 },
  ];
};

export const getDashboardsPersonalizados = (rol: string): DashboardData[] => {
  if (rol === 'admin') {
    return [{ id: 'd1', nombre: 'Dashboard Admin', rol: 'admin', widgets: ['ventas', 'clientes'] }];
  }
  return [{ id: 'd2', nombre: 'Dashboard Ventas', rol: 'ventas', widgets: ['oportunidades', 'progreso'] }];
};

export const getMobileCRM = (): MobileCRMInfo => {
  return { id: 'mcr1', staffId: 's1', lastSync: '2025-09-28T10:00:00Z', offlineAccess: true };
};

export const getVoiceNotesTranscripcion = (): VoiceNote[] => {
  return [
    { id: 'vn1', clienteId: 'c1', transcripcion: 'El cliente llamó para preguntar sobre el nuevo producto.', fecha: '2025-09-27' },
  ];
};
