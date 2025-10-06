import { useState, useEffect } from 'react';

// ==================== INTERFACES PRINCIPALES ====================

export interface TicketItem {
  id: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  subtotal: number;
  imagen?: string;
}

export interface Cliente {
  id?: string;
  nombre: string;
  email?: string;
  telefono?: string;
  tipoMembresia?: string;
}

export interface MetodoPago {
  tipo: 'efectivo' | 'tarjeta' | 'transferencia' | 'credito';
  monto: number;
  cambio?: number;
  referencia?: string;
}

export interface EventoTimeline {
  id: string;
  tipo: 'creado' | 'pago_procesado' | 'enviado' | 'reembolsado';
  descripcion: string;
  timestamp: string;
  usuario?: string;
}

export interface NotaTicket {
  id: string;
  texto: string;
  tipo: 'interna' | 'descuento' | 'especial';
  timestamp: string;
  usuario: string;
}

export interface Ticket {
  id: string;
  numeroTicket: string;
  hora: string;
  fecha: string;
  cliente: Cliente;
  items: TicketItem[];
  subtotal: number;
  descuentos: number;
  impuestos: number;
  total: number;
  metodoPago: MetodoPago;
  cajero: string;
  cajeroId: string;
  estado: 'completada' | 'reembolsada' | 'parcialmente_reembolsada';
  montoReembolsado?: number;
  razonReembolso?: string;
  timeline: EventoTimeline[];
  notas: NotaTicket[];
}

export interface EstadisticasDia {
  totalVendido: number;
  numeroTickets: number;
  ticketPromedio: number;
  reembolsos: number;
  comparativoAyer: {
    totalVendido: number;
    numeroTickets: number;
    ticketPromedio: number;
  };
}

export interface VentaPorHora {
  hora: string;
  numeroTickets: number;
  totalVendido: number;
  ticketPromedio: number;
}

export interface VentaPorMetodoPago {
  metodo: string;
  numeroTransacciones: number;
  montoTotal: number;
  porcentaje: number;
  ticketPromedio: number;
}

export interface RendimientoCajero {
  id: string;
  nombre: string;
  avatar: string;
  ticketsProcesados: number;
  totalVendido: number;
  ticketPromedio: number;
  reembolsos: number;
}

export interface ProductoVendido {
  id: string;
  nombre: string;
  categoria: string;
  imagen: string;
  unidadesVendidas: number;
  revenue: number;
  porcentajeTotal: number;
}

// ==================== DATOS MOCK COMPLETOS ====================

const cajeros = [
  { id: 'CAJ001', nombre: 'María García', avatar: '👩' },
  { id: 'CAJ002', nombre: 'Carlos López', avatar: '👨' },
  { id: 'CAJ003', nombre: 'Ana Martínez', avatar: '👩‍🦰' },
  { id: 'CAJ004', nombre: 'Pedro Sánchez', avatar: '👨‍🦱' },
];

const productosDisponibles = [
  { id: 'P001', nombre: 'Café Espresso', categoria: 'Bebidas', precio: 2.50, imagen: '☕' },
  { id: 'P002', nombre: 'Café Latte', categoria: 'Bebidas', precio: 3.50, imagen: '☕' },
  { id: 'P003', nombre: 'Cappuccino', categoria: 'Bebidas', precio: 3.80, imagen: '☕' },
  { id: 'P004', nombre: 'Croissant', categoria: 'Panadería', precio: 2.50, imagen: '🥐' },
  { id: 'P005', nombre: 'Muffin Chocolate', categoria: 'Panadería', precio: 3.20, imagen: '🧁' },
  { id: 'P006', nombre: 'Tostada Aguacate', categoria: 'Desayunos', precio: 5.50, imagen: '🥑' },
  { id: 'P007', nombre: 'Bocadillo Jamón', categoria: 'Bocadillos', precio: 4.50, imagen: '🥖' },
  { id: 'P008', nombre: 'Ensalada César', categoria: 'Ensaladas', precio: 8.00, imagen: '🥗' },
  { id: 'P009', nombre: 'Zumo Naranja', categoria: 'Bebidas', precio: 3.00, imagen: '🍊' },
  { id: 'P010', nombre: 'Refresco', categoria: 'Bebidas', precio: 2.00, imagen: '🥤' },
  { id: 'P011', nombre: 'Agua Mineral', categoria: 'Bebidas', precio: 1.50, imagen: '💧' },
  { id: 'P012', nombre: 'Sandwich Vegetal', categoria: 'Bocadillos', precio: 5.00, imagen: '🥪' },
  { id: 'P013', nombre: 'Brownie', categoria: 'Postres', precio: 2.80, imagen: '🍫' },
  { id: 'P014', nombre: 'Tarta Zanahoria', categoria: 'Postres', precio: 4.20, imagen: '🍰' },
  { id: 'P015', nombre: 'Galletas Avena', categoria: 'Snacks', precio: 2.00, imagen: '🍪' },
];

const clientes = [
  { id: 'CLI001', nombre: 'Juan Pérez', email: 'juan@email.com', telefono: '666111222', tipoMembresia: 'Gold' },
  { id: 'CLI002', nombre: 'Laura Ruiz', email: 'laura@email.com', telefono: '666222333', tipoMembresia: 'Silver' },
  { id: 'CLI003', nombre: 'Miguel Torres', email: 'miguel@email.com', telefono: '666333444' },
  { id: 'CLI004', nombre: 'Carmen Díaz', email: 'carmen@email.com', telefono: '666444555', tipoMembresia: 'Platinum' },
];

// Generar tickets del día con distribución realista
const generarTicketsMock = (): Ticket[] => {
  const tickets: Ticket[] = [];
  const hoy = new Date();
  const horasOperacion = [
    { inicio: 6, fin: 9, peso: 0.15 }, // Desayuno temprano
    { inicio: 9, fin: 12, peso: 0.25 }, // Pico mañana
    { inicio: 12, fin: 15, peso: 0.30 }, // Almuerzo (pico)
    { inicio: 15, fin: 18, peso: 0.15 }, // Tarde
    { inicio: 18, fin: 22, peso: 0.15 }, // Noche
  ];

  let ticketNum = 1001;

  // Generar entre 40-50 tickets
  const numTickets = 45;

  for (let i = 0; i < numTickets; i++) {
    // Seleccionar franja horaria según peso
    const rand = Math.random();
    let acumulado = 0;
    let franja = horasOperacion[0];

    for (const f of horasOperacion) {
      acumulado += f.peso;
      if (rand <= acumulado) {
        franja = f;
        break;
      }
    }

    const hora = franja.inicio + Math.random() * (franja.fin - franja.inicio);
    const minutos = Math.floor(Math.random() * 60);
    const horaStr = `${Math.floor(hora).toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;

    // Seleccionar cajero (más peso a María y Carlos)
    const cajeroRand = Math.random();
    let cajero = cajeros[0];
    if (cajeroRand < 0.35) cajero = cajeros[0];
    else if (cajeroRand < 0.65) cajero = cajeros[1];
    else if (cajeroRand < 0.85) cajero = cajeros[2];
    else cajero = cajeros[3];

    // Cliente (70% tiene cliente registrado)
    const tieneCliente = Math.random() < 0.7;
    const cliente: Cliente = tieneCliente
      ? clientes[Math.floor(Math.random() * clientes.length)]
      : { nombre: 'Cliente Genérico' };

    // Generar items (1-5 items por ticket)
    const numItems = Math.floor(Math.random() * 5) + 1;
    const items: TicketItem[] = [];

    for (let j = 0; j < numItems; j++) {
      const producto = productosDisponibles[Math.floor(Math.random() * productosDisponibles.length)];
      const cantidad = Math.floor(Math.random() * 3) + 1;
      const descuento = Math.random() < 0.2 ? Math.random() * 0.5 : 0; // 20% chance de descuento
      const subtotal = producto.precio * cantidad * (1 - descuento);

      items.push({
        id: `ITEM${i}-${j}`,
        nombre: producto.nombre,
        categoria: producto.categoria,
        cantidad,
        precioUnitario: producto.precio,
        descuento: descuento * 100,
        subtotal,
        imagen: producto.imagen,
      });
    }

    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const descuentos = items.reduce((sum, item) => sum + (item.precioUnitario * item.cantidad * item.descuento / 100), 0);
    const impuestos = subtotal * 0.10; // 10% IVA
    const total = subtotal + impuestos;

    // Método de pago
    const metodosDisponibles: MetodoPago['tipo'][] = ['efectivo', 'tarjeta', 'transferencia', 'credito'];
    const tipoMetodo = metodosDisponibles[Math.floor(Math.random() * metodosDisponibles.length)];

    let metodoPago: MetodoPago = { tipo: tipoMetodo, monto: total };
    if (tipoMetodo === 'efectivo') {
      const pagado = Math.ceil(total / 5) * 5; // Redondear a múltiplo de 5
      metodoPago.cambio = pagado - total;
      metodoPago.monto = pagado;
    } else if (tipoMetodo === 'tarjeta') {
      metodoPago.referencia = `REF${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    }

    // Estado (95% completadas, 3% reembolsadas, 2% parcialmente reembolsadas)
    let estado: Ticket['estado'] = 'completada';
    let montoReembolsado: number | undefined;
    let razonReembolso: string | undefined;

    const estadoRand = Math.random();
    if (estadoRand < 0.03) {
      estado = 'reembolsada';
      montoReembolsado = total;
      razonReembolso = 'Producto incorrecto';
    } else if (estadoRand < 0.05) {
      estado = 'parcialmente_reembolsada';
      montoReembolsado = total * 0.5;
      razonReembolso = 'Devolución parcial';
    }

    // Timeline
    const timestamp = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), Math.floor(hora), minutos);
    const timeline: EventoTimeline[] = [
      {
        id: 'EV1',
        tipo: 'creado',
        descripcion: 'Ticket creado',
        timestamp: timestamp.toISOString(),
        usuario: cajero.nombre,
      },
      {
        id: 'EV2',
        tipo: 'pago_procesado',
        descripcion: `Pago procesado (${tipoMetodo})`,
        timestamp: new Date(timestamp.getTime() + 30000).toISOString(),
        usuario: cajero.nombre,
      },
    ];

    if (estado === 'reembolsada' || estado === 'parcialmente_reembolsada') {
      timeline.push({
        id: 'EV3',
        tipo: 'reembolsado',
        descripcion: estado === 'reembolsada' ? 'Reembolso total' : 'Reembolso parcial',
        timestamp: new Date(timestamp.getTime() + 3600000).toISOString(),
        usuario: cajero.nombre,
      });
    }

    // Notas (algunas tienen notas)
    const notas: NotaTicket[] = [];
    if (Math.random() < 0.3) {
      notas.push({
        id: 'N1',
        texto: 'Cliente habitual - aplicado descuento',
        tipo: 'descuento',
        timestamp: timestamp.toISOString(),
        usuario: cajero.nombre,
      });
    }

    tickets.push({
      id: `T${i + 1}`,
      numeroTicket: `#${ticketNum++}`,
      hora: horaStr,
      fecha: hoy.toISOString().split('T')[0],
      cliente,
      items,
      subtotal,
      descuentos,
      impuestos,
      total,
      metodoPago,
      cajero: cajero.nombre,
      cajeroId: cajero.id,
      estado,
      montoReembolsado,
      razonReembolso,
      timeline,
      notas,
    });
  }

  // Ordenar por hora
  return tickets.sort((a, b) => a.hora.localeCompare(b.hora));
};

const mockTickets = generarTicketsMock();

// ==================== HOOK PRINCIPAL ====================

export const useTicketsDiarios = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga
    setTimeout(() => {
      setTickets(mockTickets);
      setLoading(false);
    }, 500);
  }, []);

  return { tickets, loading };
};

// ==================== FUNCIONES DE CÁLCULO ====================

export const calcularEstadisticas = (tickets: Ticket[]): EstadisticasDia => {
  const ticketsCompletados = tickets.filter(t => t.estado !== 'reembolsada');
  const totalVendido = ticketsCompletados.reduce((sum, t) => sum + t.total, 0);
  const numeroTickets = ticketsCompletados.length;
  const ticketPromedio = numeroTickets > 0 ? totalVendido / numeroTickets : 0;
  const reembolsos = tickets.reduce((sum, t) => sum + (t.montoReembolsado || 0), 0);

  return {
    totalVendido,
    numeroTickets,
    ticketPromedio,
    reembolsos,
    comparativoAyer: {
      totalVendido: totalVendido * 0.92, // -8% vs ayer
      numeroTickets: Math.floor(numeroTickets * 0.95),
      ticketPromedio: ticketPromedio * 0.97,
    },
  };
};

export const calcularVentasPorHora = (tickets: Ticket[]): VentaPorHora[] => {
  const ventasPorHora: { [key: string]: VentaPorHora } = {};

  tickets.forEach(ticket => {
    const hora = ticket.hora.split(':')[0] + ':00';

    if (!ventasPorHora[hora]) {
      ventasPorHora[hora] = {
        hora,
        numeroTickets: 0,
        totalVendido: 0,
        ticketPromedio: 0,
      };
    }

    if (ticket.estado !== 'reembolsada') {
      ventasPorHora[hora].numeroTickets++;
      ventasPorHora[hora].totalVendido += ticket.total;
    }
  });

  return Object.values(ventasPorHora).map(v => ({
    ...v,
    ticketPromedio: v.numeroTickets > 0 ? v.totalVendido / v.numeroTickets : 0,
  })).sort((a, b) => a.hora.localeCompare(b.hora));
};

export const calcularVentasPorMetodoPago = (tickets: Ticket[]): VentaPorMetodoPago[] => {
  const ventasPorMetodo: { [key: string]: VentaPorMetodoPago } = {};
  const totalGeneral = tickets.reduce((sum, t) => t.estado !== 'reembolsada' ? sum + t.total : sum, 0);

  tickets.forEach(ticket => {
    if (ticket.estado === 'reembolsada') return;

    const metodo = ticket.metodoPago.tipo;

    if (!ventasPorMetodo[metodo]) {
      ventasPorMetodo[metodo] = {
        metodo,
        numeroTransacciones: 0,
        montoTotal: 0,
        porcentaje: 0,
        ticketPromedio: 0,
      };
    }

    ventasPorMetodo[metodo].numeroTransacciones++;
    ventasPorMetodo[metodo].montoTotal += ticket.total;
  });

  return Object.values(ventasPorMetodo).map(v => ({
    ...v,
    porcentaje: (v.montoTotal / totalGeneral) * 100,
    ticketPromedio: v.numeroTransacciones > 0 ? v.montoTotal / v.numeroTransacciones : 0,
  }));
};

export const calcularRendimientoCajeros = (tickets: Ticket[]): RendimientoCajero[] => {
  const rendimiento: { [key: string]: RendimientoCajero } = {};

  tickets.forEach(ticket => {
    const cajeroId = ticket.cajeroId;

    if (!rendimiento[cajeroId]) {
      const cajero = cajeros.find(c => c.id === cajeroId) || cajeros[0];
      rendimiento[cajeroId] = {
        id: cajeroId,
        nombre: ticket.cajero,
        avatar: cajero.avatar,
        ticketsProcesados: 0,
        totalVendido: 0,
        ticketPromedio: 0,
        reembolsos: 0,
      };
    }

    rendimiento[cajeroId].ticketsProcesados++;
    if (ticket.estado !== 'reembolsada') {
      rendimiento[cajeroId].totalVendido += ticket.total;
    }
    if (ticket.estado === 'reembolsada' || ticket.estado === 'parcialmente_reembolsada') {
      rendimiento[cajeroId].reembolsos++;
    }
  });

  return Object.values(rendimiento).map(r => ({
    ...r,
    ticketPromedio: r.ticketsProcesados > 0 ? r.totalVendido / r.ticketsProcesados : 0,
  })).sort((a, b) => b.totalVendido - a.totalVendido);
};

export const calcularProductosMasVendidos = (tickets: Ticket[]): ProductoVendido[] => {
  const productos: { [key: string]: ProductoVendido } = {};
  const totalGeneral = tickets.reduce((sum, t) => {
    if (t.estado === 'reembolsada') return sum;
    return sum + t.items.reduce((s, i) => s + i.subtotal, 0);
  }, 0);

  tickets.forEach(ticket => {
    if (ticket.estado === 'reembolsada') return;

    ticket.items.forEach(item => {
      if (!productos[item.nombre]) {
        productos[item.nombre] = {
          id: item.id,
          nombre: item.nombre,
          categoria: item.categoria,
          imagen: item.imagen || '📦',
          unidadesVendidas: 0,
          revenue: 0,
          porcentajeTotal: 0,
        };
      }

      productos[item.nombre].unidadesVendidas += item.cantidad;
      productos[item.nombre].revenue += item.subtotal;
    });
  });

  return Object.values(productos)
    .map(p => ({
      ...p,
      porcentajeTotal: (p.revenue / totalGeneral) * 100,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
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
