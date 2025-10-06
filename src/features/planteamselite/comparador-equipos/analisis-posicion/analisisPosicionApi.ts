
// src/features/analisis-posicion/analisisPosicionApi.ts

export interface PosicionEstadisticas {
  posicion: string;
  promedioGoles: number;
  promedioAsistencias: number;
  // Añadir más métricas específicas por posición
  paradasPorGol?: number; // Para porteros
  pasesCompletados?: number; // Para medios
}

export interface MapaCalorData {
  x: number;
  y: number;
  intensidad: number;
}

export interface RotacionData {
  jugadorId: string;
  movimientos: { x: number; y: number; timestamp: number }[];
}

export interface OptimizacionData {
  sugerencia: string;
  impactoRendimiento: number;
}

export interface CompatibilidadData {
  jugador1Id: string;
  jugador2Id: string;
  compatibilidadScore: number;
  descripcion: string;
}

export interface BenchmarkingData {
  liga: string;
  posicion: string;
  metrica: string;
  valor: number;
}

export interface GapsData {
  gapId: string;
  descripcion: string;
  oportunidad: string;
  posicionAfectada: string;
}

export interface AnalisisPredictivoData {
  escenario: string;
  rendimientoEsperado: number;
  cambiosPosicionales: string[];
}

export interface RecomendacionFichajeData {
  jugadorId: string;
  nombre: string;
  posicion: string;
  razon: string;
  gapsCubiertos: string[];
}


export const fetchAnalisisPosicional = async (): Promise<PosicionEstadisticas[]> => {
  // Simular una llamada a una API real
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          posicion: 'Portero',
          promedioGoles: 0,
          promedioAsistencias: 0,
          paradasPorGol: 3.5,
        },
        {
          posicion: 'Defensa',
          promedioGoles: 0.1,
          promedioAsistencias: 0.2,
        },
        {
          posicion: 'Medio',
          promedioGoles: 0.3,
          promedioAsistencias: 0.5,
          pasesCompletados: 85,
        },
        {
          posicion: 'Delantero',
          promedioGoles: 0.7,
          promedioAsistencias: 0.3,
        },
      ]);
    }, 500);
  });
};

export const fetchMapaCalor = async (posicion: string): Promise<MapaCalorData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { x: 10, y: 20, intensidad: 0.8 },
        { x: 30, y: 40, intensidad: 0.6 },
        { x: 50, y: 10, intensidad: 0.9 },
      ]);
    }, 500);
  });
};

export const fetchAnalisisRotaciones = async (jugadorId: string): Promise<RotacionData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        jugadorId: jugadorId,
        movimientos: [
          { x: 10, y: 10, timestamp: Date.now() - 30000 },
          { x: 15, y: 12, timestamp: Date.now() - 20000 },
          { x: 20, y: 18, timestamp: Date.now() - 10000 },
        ],
      });
    }, 500);
  });
};

export const fetchOptimizacionPosicional = async (equipoId: string): Promise<OptimizacionData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { sugerencia: 'Cambiar delantero a banda izquierda', impactoRendimiento: 0.15 },
        { sugerencia: 'Reforzar medio campo con un pivote defensivo', impactoRendimiento: 0.10 },
      ]);
    }, 500);
  });
};

export const fetchCompatibilidadJugadores = async (posicion: string): Promise<CompatibilidadData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { jugador1Id: 'jugadorA', jugador2Id: 'jugadorB', compatibilidadScore: 0.85, descripcion: 'Alta sinergia en pases cortos.' },
        { jugador1Id: 'jugadorC', jugador2Id: 'jugadorD', compatibilidadScore: 0.60, descripcion: 'Necesitan mejorar comunicación defensiva.' },
      ]);
    }, 500);
  });
};

export const fetchBenchmarkingLigas = async (posicion: string): Promise<BenchmarkingData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { liga: 'La Liga', posicion: 'Delantero', metrica: 'Goles por partido', valor: 0.75 },
        { liga: 'Premier League', posicion: 'Delantero', metrica: 'Goles por partido', valor: 0.82 },
      ]);
    }, 500);
  });
};

export const fetchIdentificacionGaps = async (equipoId: string): Promise<GapsData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { gapId: 'gap-001', descripcion: 'Falta de cobertura en banda derecha', oportunidad: 'Fichaje de lateral ofensivo', posicionAfectada: 'Defensa' },
        { gapId: 'gap-002', descripcion: 'Baja efectividad en remates de cabeza', oportunidad: 'Entrenamiento específico', posicionAfectada: 'Delantero' },
      ]);
    }, 500);
  });
};

export const fetchAnalisisPredictivo = async (jugadorId: string, escenario: string): Promise<AnalisisPredictivoData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        escenario: escenario,
        rendimientoEsperado: 0.92,
        cambiosPosicionales: ['Más libertad en ataque', 'Menos responsabilidades defensivas'],
      });
    }, 500);
  });
};

export const fetchRecomendacionesFichajes = async (equipoId: string): Promise<RecomendacionFichajeData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { jugadorId: 'jugadorX', nombre: 'Leo Messi', posicion: 'Delantero', razon: 'Gran capacidad goleadora y asistencias', gapsCubiertos: ['Falta de gol'] },
        { jugadorId: 'jugadorY', nombre: 'Sergio Ramos', posicion: 'Defensa', razon: 'Liderazgo y solidez defensiva', gapsCubiertos: ['Liderazgo defensivo'] },
      ]);
    }, 500);
  });
};
