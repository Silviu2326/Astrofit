export interface JugadorDetalle {
  id: string;
  nombre: string;
  apellido: string;
  posicion: string;
  fechaNacimiento: string;
  // Datos técnicos
  tecnico: {
    controlBalon: number;
    pase: number;
    regate: number;
    tiro: number;
    cabeceo: number;
  };
  // Datos físicos
  fisico: {
    velocidad: number;
    resistencia: number;
    fuerza: number;
    agilidad: number;
    salto: number;
  };
  // Datos tácticos
  tactico: {
    visionJuego: number;
    tomaDecisiones: number;
    posicionamiento: number;
    lecturaJuego: number;
  };
  // Datos mentales
  mental: {
    liderazgo: number;
    concentracion: number;
    agresividad: number;
    comunicacion: number;
    presion: number;
  };
  notasScouts: string[];
  videosDestacados: string[];
}

export const fetchJugadorDetalle = async (id: string): Promise<JugadorDetalle> => {
  // Simulación de una llamada a API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        nombre: 'Lionel',
        apellido: 'Messi',
        posicion: 'Delantero',
        fechaNacimiento: '1987-06-24',
        tecnico: {
          controlBalon: 95,
          pase: 90,
          regate: 98,
          tiro: 92,
          cabeceo: 70,
        },
        fisico: {
          velocidad: 88,
          resistencia: 85,
          fuerza: 75,
          agilidad: 94,
          salto: 68,
        },
        tactico: {
          visionJuego: 96,
          tomaDecisiones: 95,
          posicionamiento: 90,
          lecturaJuego: 93,
        },
        mental: {
          liderazgo: 90,
          concentracion: 92,
          agresividad: 70,
          comunicacion: 85,
          presion: 97,
        },
        notasScouts: [
          'Visión de juego excepcional y capacidad para desequilibrar.',
          'Necesita mejorar en el juego aéreo.',
        ],
        videosDestacados: [
          'https://www.youtube.com/watch?v=example1',
          'https://www.youtube.com/watch?v=example2',
        ],
      });
    }, 500);
  });
};

// Nuevas interfaces y funciones para los módulos adicionales

export interface AnalisisVideoIAData {
  id: string;
  movimientosClave: string[];
  decisionesJuego: string[];
  efectividadAcciones: number;
}

export const fetchAnalisisVideoIA = async (id: string): Promise<AnalisisVideoIAData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        movimientosClave: ['Regate exitoso', 'Pase clave', 'Tiro a puerta'],
        decisionesJuego: ['Pase al espacio', 'Retención de balón', 'Cambio de ritmo'],
        efectividadAcciones: 85,
      });
    }, 600);
  });
};

export interface PerfilPsicologicoData {
  id: string;
  resiliencia: number;
  motivacion: number;
  manejoEstres: number;
  personalidad: string;
}

export const fetchPerfilPsicologico = async (id: string): Promise<PerfilPsicologicoData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        resiliencia: 8,
        motivacion: 9,
        manejoEstres: 7,
        personalidad: 'Extrovertido, líder natural',
      });
    }, 700);
  });
};

export interface ProyeccionCarreraData {
  id: string;
  potencialCrecimiento: string;
  atletasComparables: string[];
  valorMercadoEstimado: number;
}

export const fetchProyeccionCarrera = async (id: string): Promise<ProyeccionCarreraData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        potencialCrecimiento: 'Alto',
        atletasComparables: ['Jugador A', 'Jugador B'],
        valorMercadoEstimado: 50000000,
      });
    }, 800);
  });
};

export interface AnalisisBiomecanicoData {
  id: string;
  eficienciaCarrera: number;
  tecnicaTiro: string;
  rangoMovimiento: string;
}

export const fetchAnalisisBiomecanico = async (id: string): Promise<AnalisisBiomecanicoData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        eficienciaCarrera: 90,
        tecnicaTiro: 'Excelente',
        rangoMovimiento: 'Amplio',
      });
    }, 900);
  });
};

export interface RiskAssessmentData {
  id: string;
  probabilidadLesion: number;
  lesionesPrevias: string[];
  recomendacionesPrevencion: string[];
}

export const fetchRiskAssessment = async (id: string): Promise<RiskAssessmentData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        probabilidadLesion: 15,
        lesionesPrevias: ['Esguince de tobillo (2023)'],
        recomendacionesPrevencion: ['Fortalecimiento de isquiotibiales', 'Descanso activo'],
      });
    }, 1000);
  });
};

export interface AdaptabilidadCulturalData {
  id: string;
  idiomas: string[];
  experienciaInternacional: boolean;
  puntuacionAdaptabilidad: number;
}

export const fetchAdaptabilidadCultural = async (id: string): Promise<AdaptabilidadCulturalData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        idiomas: ['Español', 'Inglés'],
        experienciaInternacional: true,
        puntuacionAdaptabilidad: 8.5,
      });
    }, 1100);
  });
};

export interface CompatibilidadSistemaData {
  id: string;
  estiloJuegoClub: string;
  rolRecomendado: string;
  puntuacionCompatibilidad: number;
}

export const fetchCompatibilidadSistema = async (id: string): Promise<CompatibilidadSistemaData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        estiloJuegoClub: 'Posesión y ataque',
        rolRecomendado: 'Mediocentro ofensivo',
        puntuacionCompatibilidad: 9,
      });
    }, 1200);
  });
};

export interface ValoracionEconomicaData {
  id: string;
  valorActualMercado: number;
  potencialRevalorizacion: number;
  contratoActual: string;
}

export const fetchValoracionEconomica = async (id: string): Promise<ValoracionEconomicaData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        valorActualMercado: 75000000,
        potencialRevalorizacion: 20, // en porcentaje
        contratoActual: 'Hasta 2027',
      });
    }, 1300);
  });
};
