import { useState, useEffect } from 'react';

interface Resultado {
  date: string;
  value: number;
}

interface ResultadosHistoricos {
  [athleteId: string]: {
    [testId: string]: Resultado[];
  };
}

const mockResultados: ResultadosHistoricos = {
  atleta1: {
    saltoVertical: [
      { date: '2025-01-01', value: 40 },
      { date: '2025-02-01', value: 42 },
      { date: '2025-03-01', value: 43 },
      { date: '2025-04-01', value: 45 },
      { date: '2025-05-01', value: 47 },
      { date: '2025-06-01', value: 48 },
    ],
    velocidad100m: [
      { date: '2025-01-01', value: 12.5 },
      { date: '2025-02-01', value: 12.3 },
      { date: '2025-03-01', value: 12.1 },
      { date: '2025-04-01', value: 12.0 },
      { date: '2025-05-01', value: 11.9 },
      { date: '2025-06-01', value: 11.8 },
    ],
  },
  atleta2: {
    saltoVertical: [
      { date: '2025-01-01', value: 35 },
      { date: '2025-02-01', value: 37 },
      { date: '2025-03-01', value: 38 },
      { date: '2025-04-01', value: 39 },
      { date: '2025-05-01', value: 40 },
      { date: '2025-06-01', value: 41 },
    ],
    velocidad100m: [
      { date: '2025-01-01', value: 13.0 },
      { date: '2025-02-01', value: 12.8 },
      { date: '2025-03-01', value: 12.7 },
      { date: '2025-04-01', value: 12.6 },
      { date: '2025-05-01', value: 12.5 },
      { date: '2025-06-01', value: 12.4 },
    ],
  },
};

export const useResultadosHistoricos = (athleteId: string, testId: string) => {
  const [data, setData] = useState<Resultado[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Simulate API call
    setTimeout(() => {
      try {
        const resultados = mockResultados[athleteId]?.[testId] || [];
        setData(resultados);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }, [athleteId, testId]);

  return { data, isLoading, error };
};

// Nuevos endpoints simulados para análisis deportivo avanzado

export const fetchTendencias = async (athleteId: string, testId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        tendencia: "mejora", // o "estancamiento", "declive"
        confianza: 0.85,
        recomendacion: "Continuar con el plan de entrenamiento actual."
      });
    }, 300);
  });
};

export const fetchPrediccionRendimiento = async (athleteId: string, testId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        prediccion: [
          { date: '2025-07-01', value: 50 },
          { date: '2025-08-01', value: 51 },
          { date: '2025-09-01', value: 52 },
        ],
        curvaProgresion: "lineal" // o "exponencial", etc.
      });
    }, 300);
  });
};

export const fetchDetectorPlateau = async (athleteId: string, testId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        plateauDetectado: false,
        fechaInicio: null,
        duracion: null,
        recomendaciones: []
      });
    }, 300);
  });
};

export const fetchCorrelacionesTests = async (athleteId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        correlaciones: [
          { test1: "saltoVertical", test2: "velocidad100m", correlacion: -0.75 },
          { test1: "saltoVertical", test2: "fuerzaPiernas", correlacion: 0.82 },
        ]
      });
    }, 300);
  });
};

export const fetchAnalisisEstacionalidad = async (athleteId: string, testId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        patronesEstacionales: [
          { estacion: "verano", impacto: "mejora" },
          { estacion: "invierno", impacto: "declive" },
        ]
      });
    }, 300);
  });
};

export const fetchComparacionNormativas = async (athleteId: string, testId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        normativa: "Nivel Nacional Sub-20",
        percentil: 75,
        comparacion: "Superior al promedio"
      });
    }, 300);
  });
};

export const fetchAlertasRegresiones = async (athleteId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        alertas: [
          { tipo: "regresion", test: "saltoVertical", fecha: "2025-06-15", magnitud: "moderada" },
        ],
        significativas: true
      });
    }, 300);
  });
};

export const fetchReportesProgreso = async (athleteId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        reporteUrl: "/api/reports/athlete1_progress_2025-09.pdf",
        resumen: "Excelente progreso en el último trimestre, especialmente en fuerza explosiva."
      });
    }, 300);
  });
};
