
export interface Atleta {
  id: string;
  nombre: string;
}

export type EstadoPrueba = 'programada' | 'en curso' | 'completada' | 'cancelada';

export interface PruebaFisica {
  id: string;
  tipo: 'vertical jump' | 'velocidad' | 'resistencia' | '1RM' | 'VO2';
  fecha: string;
  atletasParticipantes: Atleta[];
  estado: EstadoPrueba;
  resultados?: {
    [atletaId: string]: number | string; // Ejemplo: { 'atleta1': 50 (cm), 'atleta2': '10.5s' }
  };
}

export interface HardwareStatus {
  sensorId: string;
  status: 'online' | 'offline' | 'error';
  lastReading: string;
}

export interface StatisticalAnalysisResult {
  testType: string;
  average: number;
  median: number;
  stdDev: number;
  percentiles: { [percentile: string]: number };
}

export interface NormativeData {
  ageGroup: string;
  gender: 'male' | 'female' | 'other';
  sport: string;
  testType: string;
  min: number;
  max: number;
  average: number;
}

const MOCK_ATLETAS: Atleta[] = [
  { id: 'atl1', nombre: 'Juan Pérez' },
  { id: 'atl2', nombre: 'María García' },
  { id: 'atl3', nombre: 'Carlos Ruíz' },
  { id: 'atl4', nombre: 'Laura Fernández' },
];

const MOCK_PRUEBAS: PruebaFisica[] = [
  {
    id: 'pru1',
    tipo: 'vertical jump',
    fecha: '2025-10-01',
    atletasParticipantes: [MOCK_ATLETAS[0], MOCK_ATLETAS[1]],
    estado: 'programada',
  },
  {
    id: 'pru2',
    tipo: 'velocidad',
    fecha: '2025-09-28',
    atletasParticipantes: [MOCK_ATLETAS[2]],
    estado: 'en curso',
  },
  {
    id: 'pru3',
    tipo: 'resistencia',
    fecha: '2025-09-25',
    atletasParticipantes: [MOCK_ATLETAS[0], MOCK_ATLETAS[3]],
    estado: 'completada',
    resultados: {
      'atl1': '12 min',
      'atl3': '11.5 min',
    },
  },
  {
    id: 'pru4',
    tipo: '1RM',
    fecha: '2025-10-05',
    atletasParticipantes: [MOCK_ATLETAS[1], MOCK_ATLETAS[2]],
    estado: 'cancelada',
  },
  {
    id: 'pru5',
    tipo: 'VO2',
    fecha: '2025-10-10',
    atletasParticipantes: [MOCK_ATLETAS[3]],
    estado: 'programada',
  },
];

const MOCK_HARDWARE_STATUS: HardwareStatus[] = [
  { sensorId: 'sensor-001', status: 'online', lastReading: '2025-09-28T10:00:00Z' },
  { sensorId: 'sensor-002', status: 'offline', lastReading: '2025-09-27T15:30:00Z' },
];

const MOCK_NORMATIVE_DATA: NormativeData[] = [
  { ageGroup: '18-25', gender: 'male', sport: 'running', testType: 'velocidad', min: 10, max: 13, average: 11.5 },
  { ageGroup: '18-25', gender: 'female', sport: 'running', testType: 'velocidad', min: 11, max: 14, average: 12.5 },
];

export const getPruebasFisicas = (): Promise<PruebaFisica[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PRUEBAS), 500);
  });
};

export const getAtletas = (): Promise<Atleta[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_ATLETAS), 300);
  });
};

export const addPruebaFisica = (nuevaPrueba: Omit<PruebaFisica, 'id' | 'estado'>): Promise<PruebaFisica> => {
  return new Promise((resolve) => {
    const id = `pru${MOCK_PRUEBAS.length + 1}`;
    const pruebaConId: PruebaFisica = { ...nuevaPrueba, id, estado: 'programada' };
    MOCK_PRUEBAS.push(pruebaConId);
    setTimeout(() => resolve(pruebaConId), 500);
  });
};

export const getHardwareStatus = (): Promise<HardwareStatus[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_HARDWARE_STATUS), 400);
  });
};

export const performStatisticalAnalysis = (testId: string): Promise<StatisticalAnalysisResult> => {
  return new Promise((resolve, reject) => {
    const prueba = MOCK_PRUEBAS.find(p => p.id === testId);
    if (!prueba || !prueba.resultados) {
      return reject(new Error('Prueba no encontrada o sin resultados para análisis.'));
    }

    // Simulación de cálculo estadístico
    const results = Object.values(prueba.resultados).map(r => parseFloat(String(r)));
    const average = results.reduce((sum, val) => sum + val, 0) / results.length;
    const median = results.sort((a, b) => a - b)[Math.floor(results.length / 2)];
    const stdDev = Math.sqrt(results.map(x => Math.pow(x - average, 2)).reduce((a, b) => a + b) / results.length);

    setTimeout(() => resolve({
      testType: prueba.tipo,
      average,
      median,
      stdDev,
      percentiles: { '25': average * 0.8, '50': average, '75': average * 1.2 }, // Valores de ejemplo
    }), 700);
  });
};

export const getNormativeData = (ageGroup?: string, gender?: 'male' | 'female' | 'other', sport?: string, testType?: string): Promise<NormativeData[]> => {
  return new Promise((resolve) => {
    let filteredData = MOCK_NORMATIVE_DATA;
    if (ageGroup) filteredData = filteredData.filter(d => d.ageGroup === ageGroup);
    if (gender) filteredData = filteredData.filter(d => d.gender === gender);
    if (sport) filteredData = filteredData.filter(d => d.sport === sport);
    if (testType) filteredData = filteredData.filter(d => d.testType === testType);

    setTimeout(() => resolve(filteredData), 300);
  });
};
