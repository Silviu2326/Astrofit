export interface IngresoDesglose {
  nombre: string;
  monto: number;
}

export interface MedioPago {
  tipo: 'Efectivo' | 'Tarjeta' | 'Transferencia' | 'Crédito';
  monto: number;
  transacciones: number;
}

export interface MovimientoEfectivo {
  id: string;
  tipo: 'entrada' | 'salida' | 'venta';
  razon: string;
  monto: number;
  saldoResultante: number;
  usuario: string;
  timestamp: string;
  notas?: string;
}

export interface Denominacion {
  valor: number;
  cantidad: number;
}

export interface TurnoActual {
  id: string;
  estado: 'abierta' | 'cerrada';
  cajero: {
    nombre: string;
    avatar: string;
  };
  horaApertura: string;
  horaCierre?: string;
  montoInicial: number;
  montoActual: number;
  denominacionesIniciales: Denominacion[];
}

export interface TurnoPasado {
  id: string;
  fecha: string;
  cajero: string;
  horaApertura: string;
  horaCierre: string;
  duracion: string;
  montoInicial: number;
  totalVendido: number;
  diferencia: number;
  estado: 'exacto' | 'con_diferencias';
}

export interface VentaDelTurno {
  totalEfectivo: number;
  transaccionesEfectivo: number;
  totalTarjeta: number;
  transaccionesTarjeta: number;
  totalTransferencia: number;
  transaccionesTransferencia: number;
  totalCredito: number;
  transaccionesCredito: number;
  ticketsTotal: number;
  ticketPromedio: number;
}

export interface CajaDiariaData {
  totalIngresos: number;
  desgloseClases: IngresoDesglose[];
  desgloseProductos: IngresoDesglose[];
  mediosPago: MedioPago[];
  turnoActual: TurnoActual;
  movimientos: MovimientoEfectivo[];
  ventasDelTurno: VentaDelTurno;
  turnosPasados: TurnoPasado[];
  efectivoEsperado: number;
  fondoFijo: number;
}

// Datos mock para simular una API
const mockCajaDiariaData: CajaDiariaData = {
  totalIngresos: 5850.75,
  desgloseClases: [
    { nombre: 'Yoga Principiantes', monto: 900.00 },
    { nombre: 'Pilates Avanzado', monto: 1350.50 },
    { nombre: 'Meditación Guiada', monto: 450.25 },
    { nombre: 'Spinning', monto: 800.00 },
  ],
  desgloseProductos: [
    { nombre: 'Agua Mineral', monto: 120.00 },
    { nombre: 'Barrita Energética', monto: 180.00 },
    { nombre: 'Toalla Alquiler', monto: 90.00 },
    { nombre: 'Clase de Prueba', monto: 1200.00 },
    { nombre: 'Membresía Mensual', monto: 760.00 },
  ],
  mediosPago: [
    { tipo: 'Efectivo', monto: 2450.75, transacciones: 15 },
    { tipo: 'Tarjeta', monto: 2800.00, transacciones: 28 },
    { tipo: 'Transferencia', monto: 400.00, transacciones: 3 },
    { tipo: 'Crédito', monto: 200.00, transacciones: 2 },
  ],
  turnoActual: {
    id: 'TURNO-2025-001',
    estado: 'abierta',
    cajero: {
      nombre: 'María González',
      avatar: 'MG',
    },
    horaApertura: '2025-10-03T08:00:00',
    montoInicial: 1000.00,
    montoActual: 3250.75,
    denominacionesIniciales: [
      { valor: 1000, cantidad: 0 },
      { valor: 500, cantidad: 1 },
      { valor: 200, cantidad: 1 },
      { valor: 100, cantidad: 2 },
      { valor: 50, cantidad: 2 },
      { valor: 20, cantidad: 5 },
    ],
  },
  movimientos: [
    {
      id: 'MOV-001',
      tipo: 'entrada',
      razon: 'Apertura de caja - Fondo inicial',
      monto: 1000.00,
      saldoResultante: 1000.00,
      usuario: 'María González',
      timestamp: '2025-10-03T08:00:00',
      notas: 'Fondo fijo diario',
    },
    {
      id: 'MOV-002',
      tipo: 'venta',
      razon: 'Venta #001 - Clase de Yoga',
      monto: 250.00,
      saldoResultante: 1250.00,
      usuario: 'Sistema POS',
      timestamp: '2025-10-03T09:15:00',
    },
    {
      id: 'MOV-003',
      tipo: 'entrada',
      razon: 'Cambio para caja',
      monto: 500.00,
      saldoResultante: 1750.00,
      usuario: 'María González',
      timestamp: '2025-10-03T10:30:00',
      notas: 'Cambio de billetes grandes',
    },
    {
      id: 'MOV-004',
      tipo: 'venta',
      razon: 'Venta #002 - Productos varios',
      monto: 450.00,
      saldoResultante: 2200.00,
      usuario: 'Sistema POS',
      timestamp: '2025-10-03T11:20:00',
    },
    {
      id: 'MOV-005',
      tipo: 'salida',
      razon: 'Depósito a banco',
      monto: 1000.00,
      saldoResultante: 1200.00,
      usuario: 'María González',
      timestamp: '2025-10-03T12:00:00',
      notas: 'Depósito de seguridad',
    },
    {
      id: 'MOV-006',
      tipo: 'venta',
      razon: 'Venta #003 - Membresía mensual',
      monto: 800.00,
      saldoResultante: 2000.00,
      usuario: 'Sistema POS',
      timestamp: '2025-10-03T13:45:00',
    },
    {
      id: 'MOV-007',
      tipo: 'venta',
      razon: 'Venta #004 - Clase de Pilates',
      monto: 350.75,
      saldoResultante: 2350.75,
      usuario: 'Sistema POS',
      timestamp: '2025-10-03T15:10:00',
    },
    {
      id: 'MOV-008',
      tipo: 'salida',
      razon: 'Gastos operativos - Insumos',
      monto: 200.00,
      saldoResultante: 2150.75,
      usuario: 'María González',
      timestamp: '2025-10-03T16:00:00',
      notas: 'Compra de materiales de limpieza',
    },
    {
      id: 'MOV-009',
      tipo: 'venta',
      razon: 'Venta #005 - Clases múltiples',
      monto: 1100.00,
      saldoResultante: 3250.75,
      usuario: 'Sistema POS',
      timestamp: '2025-10-03T17:30:00',
    },
  ],
  ventasDelTurno: {
    totalEfectivo: 2450.75,
    transaccionesEfectivo: 15,
    totalTarjeta: 2800.00,
    transaccionesTarjeta: 28,
    totalTransferencia: 400.00,
    transaccionesTransferencia: 3,
    totalCredito: 200.00,
    transaccionesCredito: 2,
    ticketsTotal: 48,
    ticketPromedio: 121.89,
  },
  turnosPasados: [
    {
      id: 'TURNO-2025-09-30',
      fecha: '2025-09-30',
      cajero: 'María González',
      horaApertura: '08:00',
      horaCierre: '20:00',
      duracion: '12h',
      montoInicial: 1000.00,
      totalVendido: 4850.50,
      diferencia: 0,
      estado: 'exacto',
    },
    {
      id: 'TURNO-2025-09-29',
      fecha: '2025-09-29',
      cajero: 'Carlos Ruiz',
      horaApertura: '08:00',
      horaCierre: '20:00',
      duracion: '12h',
      montoInicial: 1000.00,
      totalVendido: 5200.00,
      diferencia: -25.50,
      estado: 'con_diferencias',
    },
    {
      id: 'TURNO-2025-09-28',
      fecha: '2025-09-28',
      cajero: 'Ana Martínez',
      horaApertura: '08:00',
      horaCierre: '20:00',
      duracion: '12h',
      montoInicial: 1000.00,
      totalVendido: 6100.75,
      diferencia: 10.00,
      estado: 'con_diferencias',
    },
    {
      id: 'TURNO-2025-09-27',
      fecha: '2025-09-27',
      cajero: 'María González',
      horaApertura: '08:00',
      horaCierre: '20:00',
      duracion: '12h',
      montoInicial: 1000.00,
      totalVendido: 4750.00,
      diferencia: 0,
      estado: 'exacto',
    },
    {
      id: 'TURNO-2025-09-26',
      fecha: '2025-09-26',
      cajero: 'Carlos Ruiz',
      horaApertura: '08:00',
      horaCierre: '20:00',
      duracion: '12h',
      montoInicial: 1000.00,
      totalVendido: 5450.25,
      diferencia: 0,
      estado: 'exacto',
    },
    {
      id: 'TURNO-2025-09-25',
      fecha: '2025-09-25',
      cajero: 'Ana Martínez',
      horaApertura: '08:00',
      horaCierre: '20:00',
      duracion: '12h',
      montoInicial: 1000.00,
      totalVendido: 3900.50,
      diferencia: -15.00,
      estado: 'con_diferencias',
    },
  ],
  efectivoEsperado: 3250.75,
  fondoFijo: 1000.00,
};

export const getCajaDiariaData = (): Promise<CajaDiariaData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockCajaDiariaData);
    }, 500); // Simular un retardo de red
  });
};

export const closeCajaDiaria = (data: CajaDiariaData): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Aquí se simularía la lógica de cierre, validaciones, etc.
      console.log('Cerrando caja diaria con datos:', data);
      if (data.totalIngresos > 0) {
        resolve(true); // Simular cierre exitoso
      } else {
        reject(new Error('No se puede cerrar la caja con ingresos cero.'));
      }
    }, 1000);
  });
};

// Nuevos endpoints para el Financial Command Center
export const getTradingSimulatorData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos del simulador de trading cargados.');
    }, 300);
  });
};

export const getAnalisisMargenesProductoData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos de análisis de márgenes de producto cargados.');
    }, 300);
  });
};

export const getOptimizacionPreciosIAData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos de optimización de precios con IA cargados.');
    }, 300);
  });
};

export const getBudgetsForecastingData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos de budgets y forecasting cargados.');
    }, 300);
  });
};

export const getAnalisisCompetenciaData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos de análisis de competencia cargados.');
    }, 300);
  });
};

export const getROICalculatorData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos del calculador de ROI cargados.');
    }, 300);
  });
};

export const getAlertasFinancierasData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos de alertas financieras cargados.');
    }, 300);
  });
};

export const getIntegracionMercadosData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos de integración de mercados financieros cargados.');
    }, 300);
  });
};

export const getMultiCurrencyData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos de multi-currency cargados.');
    }, 300);
  });
};

export const getBlockchainTransparenciaData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos de transparencia blockchain cargados.');
    }, 300);
  });
};

export const getCommandCenterNASAData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos del command center estilo NASA cargados.');
    }, 300);
  });
};

export const getGraficosFinancierosRealData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos de gráficos financieros en tiempo real cargados.');
    }, 300);
  });
};

export const getAlertasCriticasData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos de alertas críticas cargados.');
    }, 300);
  });
};

export const getModoCEOData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos del modo CEO cargados.');
    }, 300);
  });
};

export const getAssistantVozData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos del asistente de voz cargados.');
    }, 300);
  });
};

export const getRealidadVirtualDatosData = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Datos de inmersión de datos en VR cargados.');
    }, 300);
  });
};
