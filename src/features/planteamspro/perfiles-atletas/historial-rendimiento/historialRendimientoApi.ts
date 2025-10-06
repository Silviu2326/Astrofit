export interface AtletaRendimientoData {
  id: string;
  nombre: string;
  fecha: string; // YYYY-MM-DD
  testsFisicos: {
    saltoVertical: number;
    velocidad10m: number;
  };
  entrenamientosRealizados: number;
  cargaAcumulada: number;
  eventosImportantes?: string[]; // e.g., 'Lesión', 'Competencia'
}

const mockRendimientoData: AtletaRendimientoData[] = [
  {
    id: 'atleta1',
    nombre: 'Juan Perez',
    fecha: '2024-01-01',
    testsFisicos: { saltoVertical: 50, velocidad10m: 1.5 },
    entrenamientosRealizados: 5,
    cargaAcumulada: 1000,
  },
  {
    id: 'atleta1',
    nombre: 'Juan Perez',
    fecha: '2024-01-08',
    testsFisicos: { saltoVertical: 52, velocidad10m: 1.48 },
    entrenamientosRealizados: 6,
    cargaAcumulada: 1100,
    eventosImportantes: ['Competencia Local'],
  },
  {
    id: 'atleta1',
    nombre: 'Juan Perez',
    fecha: '2024-02-01',
    testsFisicos: { saltoVertical: 55, velocidad10m: 1.45 },
    entrenamientosRealizados: 4,
    cargaAcumulada: 900,
  },
  {
    id: 'atleta1',
    nombre: 'Juan Perez',
    fecha: '2024-03-01',
    testsFisicos: { saltoVertical: 53, velocidad10m: 1.47 },
    entrenamientosRealizados: 5,
    cargaAcumulada: 1050,
    eventosImportantes: ['Lesión Menor'],
  },
  {
    id: 'atleta2',
    nombre: 'Maria Garcia',
    fecha: '2024-01-01',
    testsFisicos: { saltoVertical: 45, velocidad10m: 1.6 },
    entrenamientosRealizados: 4,
    cargaAcumulada: 800,
  },
  {
    id: 'atleta2',
    nombre: 'Maria Garcia',
    fecha: '2024-01-15',
    testsFisicos: { saltoVertical: 47, velocidad10m: 1.58 },
    entrenamientosRealizados: 5,
    cargaAcumulada: 900,
  },
];

export const fetchHistorialRendimiento = (atletaId: string, timeframe: 'week' | 'month' | 'year'): Promise<AtletaRendimientoData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredData = mockRendimientoData.filter(data => data.id === atletaId);
      // In a real application, you would filter by timeframe here as well.
      resolve(filteredData);
    }, 500);
  });
};

// Nuevas interfaces y funciones para Machine Learning y Benchmarking

export interface ModeloPredictivoData {
  atletaId: string;
  fechaPrediccion: string; // YYYY-MM-DD
  rendimientoEsperado: {
    saltoVertical: number;
    velocidad10m: number;
  };
  confianza: number; // 0-1
}

export interface AnalisisCorrelacionesData {
  atletaId: string;
  variable1: string;
  variable2: string;
  coeficienteCorrelacion: number;
  significancia: string; // e.g., 'alta', 'media', 'baja'
}

export interface BenchmarkingEliteData {
  atletaId: string;
  deporte: string;
  categoria: string;
  percentilSaltoVertical: number;
  percentilVelocidad10m: number;
  comparativa: {
    atletaElite: string;
    saltoVertical: number;
    velocidad10m: number;
  }[];
}

export interface VentanasDesarrolloData {
  atletaId: string;
  edad: number;
  habilidad: string;
  estadoVentana: 'crítica' | 'óptima' | 'pasada';
  recomendaciones: string[];
}

export interface ImpactoLesionesData {
  atletaId: string;
  tipoLesion: string;
  fechaLesion: string;
  duracionRecuperacionDias: number;
  impactoRendimiento: {
    antes: { saltoVertical: number; velocidad10m: number; };
    despues: { saltoVertical: number; velocidad10m: number; };
  };
}

export interface AlertasDesviacionData {
  atletaId: string;
  fechaAlerta: string;
  tipoDesviacion: 'rendimiento' | 'carga';
  magnitud: number; // Porcentaje de desviación
  recomendacion: string;
}

export interface OptimizacionCargasData {
  atletaId: string;
  fechaAnalisis: string;
  cargaOptimaSugerida: number;
  impactoEsperado: string;
  recomendaciones: string[];
}

export interface ReportesEvolucionData {
  atletaId: string;
  periodo: string; // e.g., 'trimestral', 'anual'
  resumen: string;
  graficosGenerados: string[]; // URLs o IDs de gráficos
}

const mockModeloPredictivoData: ModeloPredictivoData[] = [
  {
    atletaId: 'atleta1',
    fechaPrediccion: '2025-01-01',
    rendimientoEsperado: { saltoVertical: 58, velocidad10m: 1.40 },
    confianza: 0.85,
  },
];

const mockAnalisisCorrelacionesData: AnalisisCorrelacionesData[] = [
  {
    atletaId: 'atleta1',
    variable1: 'cargaAcumulada',
    variable2: 'saltoVertical',
    coeficienteCorrelacion: 0.75,
    significancia: 'alta',
  },
];

const mockBenchmarkingEliteData: BenchmarkingEliteData[] = [
  {
    atletaId: 'atleta1',
    deporte: 'Atletismo',
    categoria: 'Salto de Longitud',
    percentilSaltoVertical: 85,
    percentilVelocidad10m: 90,
    comparativa: [
      { atletaElite: 'Usain Bolt', saltoVertical: 60, velocidad10m: 1.35 },
      { atletaElite: 'Carl Lewis', saltoVertical: 58, velocidad10m: 1.38 },
    ],
  },
];

const mockVentanasDesarrolloData: VentanasDesarrolloData[] = [
  {
    atletaId: 'atleta1',
    edad: 18,
    habilidad: 'Fuerza Explosiva',
    estadoVentana: 'óptima',
    recomendaciones: ['Entrenamiento de pliometría', 'Levantamiento olímpico'],
  },
];

const mockImpactoLesionesData: ImpactoLesionesData[] = [
  {
    atletaId: 'atleta1',
    tipoLesion: 'Esguince de tobillo',
    fechaLesion: '2024-03-01',
    duracionRecuperacionDias: 30,
    impactoRendimiento: {
      antes: { saltoVertical: 55, velocidad10m: 1.45 },
      despues: { saltoVertical: 50, velocidad10m: 1.50 },
    },
  },
];

const mockAlertasDesviacionData: AlertasDesviacionData[] = [
  {
    atletaId: 'atleta1',
    fechaAlerta: '2024-04-15',
    tipoDesviacion: 'rendimiento',
    magnitud: -10,
    recomendacion: 'Revisar plan de entrenamiento y descanso.',
  },
];

const mockOptimizacionCargasData: OptimizacionCargasData[] = [
  {
    atletaId: 'atleta1',
    fechaAnalisis: '2024-09-01',
    cargaOptimaSugerida: 1200,
    impactoEsperado: 'Mejora del 5% en salto vertical',
    recomendaciones: ['Incrementar volumen de entrenamiento gradualmente', 'Monitorear fatiga'],
  },
];

const mockReportesEvolucionData: ReportesEvolucionData[] = [
  {
    atletaId: 'atleta1',
    periodo: 'trimestral',
    resumen: 'El atleta ha mostrado una mejora constante en velocidad y fuerza explosiva durante el último trimestre.',
    graficosGenerados: ['url-grafico-1', 'url-grafico-2'],
  },
];

export const fetchModeloPredictivo = (atletaId: string): Promise<ModeloPredictivoData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockModeloPredictivoData.filter(data => data.atletaId === atletaId));
    }, 500);
  });
};

export const fetchAnalisisCorrelaciones = (atletaId: string): Promise<AnalisisCorrelacionesData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAnalisisCorrelacionesData.filter(data => data.atletaId === atletaId));
    }, 500);
  });
};

export const fetchBenchmarkingElite = (atletaId: string): Promise<BenchmarkingEliteData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBenchmarkingEliteData.filter(data => data.atletaId === atletaId));
    }, 500);
  });
};

export const fetchVentanasDesarrollo = (atletaId: string): Promise<VentanasDesarrolloData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockVentanasDesarrolloData.filter(data => data.atletaId === atletaId));
    }, 500);
  });
};

export const fetchImpactoLesiones = (atletaId: string): Promise<ImpactoLesionesData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockImpactoLesionesData.filter(data => data.atletaId === atletaId));
    }, 500);
  });
};

export const fetchAlertasDesviacion = (atletaId: string): Promise<AlertasDesviacionData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAlertasDesviacionData.filter(data => data.atletaId === atletaId));
    }, 500);
  });
};

export const fetchOptimizacionCargas = (atletaId: string): Promise<OptimizacionCargasData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOptimizacionCargasData.filter(data => data.atletaId === atletaId));
    }, 500);
  });
};

export const fetchReportesEvolucion = (atletaId: string): Promise<ReportesEvolucionData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReportesEvolucionData.filter(data => data.atletaId === atletaId));
    }, 500);
  });
};
