import { useState, useEffect } from 'react';

export interface Ticket {
  id: string;
  hora: string;
  producto: string;
  cantidad: number;
  total: number;
  estado: 'pagado' | 'pendiente' | 'cancelado';
}

const mockTicketsHoy: Ticket[] = [
  { id: '1', hora: '10:00', producto: 'Café Latte', cantidad: 2, total: 7.00, estado: 'pagado' },
  { id: '2', hora: '10:15', producto: 'Croissant', cantidad: 1, total: 2.50, estado: 'pendiente' },
  { id: '3', hora: '10:30', producto: 'Zumo Naranja', cantidad: 1, total: 3.00, estado: 'pagado' },
  { id: '4', hora: '11:00', producto: 'Bocadillo Jamón', cantidad: 1, total: 4.50, estado: 'cancelado' },
];

const mockTicketsAyer: Ticket[] = [
  { id: '5', hora: '09:30', producto: 'Tostada Aguacate', cantidad: 1, total: 5.00, estado: 'pagado' },
  { id: '6', hora: '12:00', producto: 'Ensalada César', cantidad: 1, total: 8.00, estado: 'pagado' },
];

const mockTicketsSemana: Ticket[] = [
  ...mockTicketsHoy,
  ...mockTicketsAyer,
  { id: '7', hora: '14:00', producto: 'Pasta Carbonara', cantidad: 1, total: 10.00, estado: 'pagado' },
  { id: '8', hora: '16:00', producto: 'Refresco', cantidad: 2, total: 4.00, estado: 'pendiente' },
];

export const useTicketsDiarios = (periodo: 'hoy' | 'ayer' | 'semana') => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [totalVentas, setTotalVentas] = useState<number>(0);

  useEffect(() => {
    let currentTickets: Ticket[] = [];
    switch (periodo) {
      case 'hoy':
        currentTickets = mockTicketsHoy;
        break;
      case 'ayer':
        currentTickets = mockTicketsAyer;
        break;
      case 'semana':
        currentTickets = mockTicketsSemana;
        break;
      default:
        currentTickets = [];
    }
    setTickets(currentTickets);
    setTotalVentas(currentTickets.reduce((sum, ticket) => sum + ticket.total, 0));
  }, [periodo]);

  return { tickets, totalVentas };
};

// Nuevas interfaces y funciones para Contabilidad Inteligente

export interface ContableIntegrationStatus {
  software: string;
  status: 'conectado' | 'desconectado' | 'error';
  lastSync: string;
}

export interface FacturaElectronica {
  id: string;
  cliente: string;
  monto: number;
  fecha: string;
  estado: 'emitida' | 'pagada' | 'vencida';
}

export interface ConciliacionBancariaResult {
  fecha: string;
  transaccionesConciliadas: number;
  diferencias: number;
}

export interface GastoCategorizado {
  id: string;
  descripcion: string;
  categoriaSugerida: string;
  monto: number;
}

export interface ReporteFiscal {
  id: string;
  tipo: string;
  periodo: string;
  estado: 'generado' | 'pendiente' | 'enviado';
  linkDescarga: string;
}

export interface FraudeDetectado {
  id: string;
  transaccionId: string;
  descripcion: string;
  severidad: 'baja' | 'media' | 'alta';
  fecha: string;
}

export interface Aprobacion {
  id: string;
  solicitud: string;
  solicitante: string;
  aprobador: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
}

export interface AuditoriaEntry {
  id: string;
  usuario: string;
  accion: string;
  fecha: string;
  detalle: string;
}

export interface CashFlowForecast {
  mes: string;
  ingresosEsperados: number;
  gastosEsperados: number;
  flujoNeto: number;
}

export interface BancoIntegrado {
  nombre: string;
  status: 'conectado' | 'desconectado';
  ultimoAcceso: string;
}

export interface KpiFinanciero {
  nombre: string;
  valor: number;
  tendencia: 'sube' | 'baja' | 'estable';
}

export interface AnomaliaAlerta {
  id: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  severidad: 'baja' | 'media' | 'alta';
}

export interface StakeholderReport {
  id: string;
  titulo: string;
  destinatario: string;
  fechaGeneracion: string;
  linkDescarga: string;
}

export interface ConfiguracionFiscal {
  impuestoIVA: number;
  regimenFiscal: string;
  ultimaActualizacion: string;
}

// Mock data para las nuevas funcionalidades
const mockIntegracionContable: ContableIntegrationStatus[] = [
  { software: 'Sage', status: 'conectado', lastSync: '2025-09-27T10:30:00Z' },
  { software: 'Contaplus', status: 'desconectado', lastSync: '2025-09-20T15:00:00Z' },
];

const mockFacturasElectronicas: FacturaElectronica[] = [
  { id: 'FE001', cliente: 'Cliente A', monto: 150.75, fecha: '2025-09-25', estado: 'emitida' },
  { id: 'FE002', cliente: 'Cliente B', monto: 200.00, fecha: '2025-09-20', estado: 'pagada' },
];

const mockConciliacionBancaria: ConciliacionBancariaResult[] = [
  { fecha: '2025-09-26', transaccionesConciliadas: 120, diferencias: 2 },
  { fecha: '2025-08-31', transaccionesConciliadas: 300, diferencias: 0 },
];

const mockGastosCategorizados: GastoCategorizado[] = [
  { id: 'G001', descripcion: 'Compra de oficina', categoriaSugerida: 'Material de Oficina', monto: 50.00 },
  { id: 'G002', descripcion: 'Almuerzo equipo', categoriaSugerida: 'Gastos de Representación', monto: 75.00 },
];

const mockReportesFiscales: ReporteFiscal[] = [
  { id: 'RF001', tipo: 'IVA Trimestral', periodo: 'Q3 2025', estado: 'generado', linkDescarga: '/reports/RF001.pdf' },
  { id: 'RF002', tipo: 'Impuesto Sociedades', periodo: '2024', estado: 'pendiente', linkDescarga: '' },
];

const mockFraudesDetectados: FraudeDetectado[] = [
  { id: 'FD001', transaccionId: 'TX987', descripcion: 'Transacción duplicada', severidad: 'media', fecha: '2025-09-26' },
];

const mockAprobaciones: Aprobacion[] = [
  { id: 'AP001', solicitud: 'Gasto de viaje', solicitante: 'Juan P.', aprobador: 'Maria G.', estado: 'pendiente' },
];

const mockAuditoriaTrail: AuditoriaEntry[] = [
  { id: 'AU001', usuario: 'admin', accion: 'Creación factura FE001', fecha: '2025-09-25T14:00:00Z', detalle: 'Factura FE001 creada para Cliente A' },
];

const mockCashFlowForecast: CashFlowForecast[] = [
  { mes: 'Oct 2025', ingresosEsperados: 15000, gastosEsperados: 8000, flujoNeto: 7000 },
  { mes: 'Nov 2025', ingresosEsperados: 16000, gastosEsperados: 8500, flujoNeto: 7500 },
];

const mockBancosIntegrados: BancoIntegrado[] = [
  { nombre: 'Banco Santander', status: 'conectado', ultimoAcceso: '2025-09-27T11:00:00Z' },
  { nombre: 'BBVA', status: 'conectado', ultimoAcceso: '2025-09-27T10:45:00Z' },
];

const mockDashboardCFO: KpiFinanciero[] = [
  { nombre: 'Margen Bruto', valor: 45, tendencia: 'sube' },
  { nombre: 'Liquidez Actual', valor: 1.8, tendencia: 'estable' },
];

const mockAlertasAnomalias: AnomaliaAlerta[] = [
  { id: 'AL001', tipo: 'Gasto Inusual', descripcion: 'Gasto de 500€ en categoría no habitual', fecha: '2025-09-26', severidad: 'alta' },
];

const mockReportesStakeholders: StakeholderReport[] = [
  { id: 'RS001', titulo: 'Informe Mensual Inversores', destinatario: 'Inversores', fechaGeneracion: '2025-09-01', linkDescarga: '/reports/RS001.pdf' },
];

const mockModoContadorData = {
  vistaActual: 'Libro Mayor',
  filtrosAplicados: ['Mes: Septiembre', 'Cuenta: 430'],
};

const mockExportacionFormatos = [
  { nombre: 'Facturas Q3', formato: 'CSV', estado: 'listo' },
  { nombre: 'Movimientos Bancarios', formato: 'XML', estado: 'procesando' },
];

const mockWizardsConfiguracion: ConfiguracionFiscal = {
  impuestoIVA: 21,
  regimenFiscal: 'General',
  ultimaActualizacion: '2025-01-01',
};

// Funciones que simulan endpoints de API
export const getContableIntegrationStatus = (): Promise<ContableIntegrationStatus[]> => {
  return Promise.resolve(mockIntegracionContable);
};

export const getFacturasElectronicas = (): Promise<FacturaElectronica[]> => {
  return Promise.resolve(mockFacturasElectronicas);
};

export const getConciliacionBancariaResults = (): Promise<ConciliacionBancariaResult[]> => {
  return Promise.resolve(mockConciliacionBancaria);
};

export const getGastosCategorizados = (): Promise<GastoCategorizado[]> => {
  return Promise.resolve(mockGastosCategorizados);
};

export const getReportesFiscales = (): Promise<ReporteFiscal[]> => {
  return Promise.resolve(mockReportesFiscales);
};

export const getFraudesDetectados = (): Promise<FraudeDetectado[]> => {
  return Promise.resolve(mockFraudesDetectados);
};

export const getAprobaciones = (): Promise<Aprobacion[]> => {
  return Promise.resolve(mockAprobaciones);
};

export const getAuditoriaTrail = (): Promise<AuditoriaEntry[]> => {
  return Promise.resolve(mockAuditoriaTrail);
};

export const getCashFlowForecast = (): Promise<CashFlowForecast[]> => {
  return Promise.resolve(mockCashFlowForecast);
};

export const getBancosIntegrados = (): Promise<BancoIntegrado[]> => {
  return Promise.resolve(mockBancosIntegrados);
};

export const getDashboardCFOkpis = (): Promise<KpiFinanciero[]> => {
  return Promise.resolve(mockDashboardCFO);
};

export const getAlertasAnomalias = (): Promise<AnomaliaAlerta[]> => {
  return Promise.resolve(mockAlertasAnomalias);
};

export const getReportesStakeholders = (): Promise<StakeholderReport[]> => {
  return Promise.resolve(mockReportesStakeholders);
};

export const getModoContadorData = () => {
  return Promise.resolve(mockModoContadorData);
};

export const getExportacionFormatos = () => {
  return Promise.resolve(mockExportacionFormatos);
};

export const getConfiguracionFiscal = (): Promise<ConfiguracionFiscal> => {
  return Promise.resolve(mockWizardsConfiguracion);
};
