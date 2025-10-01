export interface IngresoDesglose {
  nombre: string;
  monto: number;
}

export interface MedioPago {
  tipo: 'Efectivo' | 'Tarjeta';
  monto: number;
}

export interface CajaDiariaData {
  totalIngresos: number;
  desgloseClases: IngresoDesglose[];
  desgloseProductos: IngresoDesglose[];
  mediosPago: MedioPago[];
}

// Datos mock para simular una API
const mockCajaDiariaData: CajaDiariaData = {
  totalIngresos: 1250.75,
  desgloseClases: [
    { nombre: 'Yoga Principiantes', monto: 300.00 },
    { nombre: 'Pilates Avanzado', monto: 450.50 },
    { nombre: 'Meditación Guiada', monto: 100.25 },
  ],
  desgloseProductos: [
    { nombre: 'Agua Mineral', monto: 20.00 },
    { nombre: 'Barrita Energética', monto: 30.00 },
    { nombre: 'Toalla Alquiler', monto: 15.00 },
    { nombre: 'Clase de Prueba', monto: 335.00 },
  ],
  mediosPago: [
    { tipo: 'Efectivo', monto: 500.75 },
    { tipo: 'Tarjeta', monto: 750.00 },
  ],
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
