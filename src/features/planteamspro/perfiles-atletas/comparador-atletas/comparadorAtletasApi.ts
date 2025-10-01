export interface AtletaComparacionData {
  id: string;
  nombre: string;
  fuerza: number;
  resistencia: number;
  tecnica: number;
  velocidad: number;
  // Agrega más métricas según sea necesario
}

export interface ComparacionResult {
  atleta1: AtletaComparacionData;
  atleta2: AtletaComparacionData;
  resumen: {
    fortalezasAtleta1: string[];
    debilidadesAtleta1: string[];
    fortalezasAtleta2: string[];
    debilidadesAtleta2: string[];
  };
}

export interface ComplementariedadResult {
  atleta1Id: string;
  atleta2Id: string;
  scoreComplementariedad: number;
  factoresClave: string[];
}

export interface SimulacionDueloResult {
  atleta1Id: string;
  atleta2Id: string;
  probabilidadVictoriaAtleta1: number;
  probabilidadVictoriaAtleta2: number;
  prediccionResultado: string;
}

// Mock API para simular la obtención de datos de comparación
export const comparadorAtletasApi = {
  getComparacionDirecta: async (atleta1Id: string, atleta2Id: string): Promise<ComparacionResult> => {
    // Simula un retardo de red
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockData: { [key: string]: AtletaComparacionData } = {
      '1': { id: '1', nombre: 'Atleta A', fuerza: 85, resistencia: 70, tecnica: 90, velocidad: 75 },
      '2': { id: '2', nombre: 'Atleta B', fuerza: 78, resistencia: 88, tecnica: 75, velocidad: 82 },
      '3': { id: '3', nombre: 'Atleta C', fuerza: 92, resistencia: 65, tecnica: 80, velocidad: 95 },
      '4': { id: '4', nombre: 'Atleta D', fuerza: 70, resistencia: 95, tecnica: 85, velocidad: 70 },
    };

    const atleta1Data = mockData[atleta1Id];
    const atleta2Data = mockData[atleta2Id];

    if (!atleta1Data || !atleta2Data) {
      throw new Error('Uno o ambos atletas no encontrados.');
    }

    // Lógica simple para generar un resumen ejecutivo
    const generarResumen = (a1: AtletaComparacionData, a2: AtletaComparacionData) => {
      const fortalezasAtleta1: string[] = [];
      const debilidadesAtleta1: string[] = [];
      const fortalezasAtleta2: string[] = [];
      const debilidadesAtleta2: string[] = [];

      if (a1.fuerza > a2.fuerza) fortalezasAtleta1.push('Fuerza'); else if (a2.fuerza > a1.fuerza) debilidadesAtleta1.push('Fuerza');
      if (a1.resistencia > a2.resistencia) fortalezasAtleta1.push('Resistencia'); else if (a2.resistencia > a1.resistencia) debilidadesAtleta1.push('Resistencia');
      if (a1.tecnica > a2.tecnica) fortalezasAtleta1.push('Técnica'); else if (a2.tecnica > a1.tecnica) debilidadesAtleta1.push('Técnica');
      if (a1.velocidad > a2.velocidad) fortalezasAtleta1.push('Velocidad'); else if (a2.velocidad > a1.velocidad) debilidadesAtleta1.push('Velocidad');

      if (a2.fuerza > a1.fuerza) fortalezasAtleta2.push('Fuerza'); else if (a1.fuerza > a2.fuerza) debilidadesAtleta2.push('Fuerza');
      if (a2.resistencia > a1.resistencia) fortalezasAtleta2.push('Resistencia'); else if (a1.resistencia > a2.resistencia) debilidadesAtleta2.push('Resistencia');
      if (a2.tecnica > a1.tecnica) fortalezasAtleta2.push('Técnica'); else if (a1.tecnica > a2.tecnica) debilidadesAtleta2.push('Técnica');
      if (a2.velocidad > a1.velocidad) fortalezasAtleta2.push('Velocidad'); else if (a1.velocidad > a2.velocidad) debilidadesAtleta2.push('Velocidad');

      return {
        fortalezasAtleta1,
        debilidadesAtleta1,
        fortalezasAtleta2,
        debilidadesAtleta2,
      };
    };

    return {
      atleta1: atleta1Data,
      atleta2: atleta2Data,
      resumen: generarResumen(atleta1Data, atleta2Data),
    };
  },

  getAnalisisComplementariedad: async (atleta1Id: string, atleta2Id: string): Promise<ComplementariedadResult> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    // Lógica mock para el análisis de complementariedad
    const score = (parseInt(atleta1Id) + parseInt(atleta2Id)) * 10 % 100; // Ejemplo simple
    const factores = score > 70 ? ['Comunicación', 'Habilidades combinadas'] : ['Coordinación'];
    return {
      atleta1Id,
      atleta2Id,
      scoreComplementariedad: score,
      factoresClave: factores,
    };
  },

  getSimulacionDuelos: async (atleta1Id: string, atleta2Id: string): Promise<SimulacionDueloResult> => {
    await new Promise(resolve => setTimeout(resolve, 900));
    // Lógica mock para la simulación de duelos
    const prob1 = (parseInt(atleta1Id) * 10 + 50) % 100;
    const prob2 = (parseInt(atleta2Id) * 10 + 50) % 100;
    const prediccion = prob1 > prob2 ? `Victoria de Atleta ${atleta1Id}` : `Victoria de Atleta ${atleta2Id}`;
    return {
      atleta1Id,
      atleta2Id,
      probabilidadVictoriaAtleta1: prob1,
      probabilidadVictoriaAtleta2: prob2,
      prediccionResultado: prediccion,
    };
  },
};
