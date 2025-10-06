// Simulación de una API para la gestión de mesociclos y microciclos
// En un entorno real, esto interactuaría con un backend.

interface BloqueEntrenamiento {
  id: string;
  nombre: string;
  volumen: number; // 0-100
  intensidad: number; // 0-100
  objetivos: {
    fuerza: number;
    resistencia: number;
    tecnica: number;
    velocidad: number;
  };
}

interface Microciclo {
  id: string;
  nombre: string;
  semanas: number[]; // Semanas del mesociclo a las que pertenece
  bloques: BloqueEntrenamiento[];
}

interface Mesociclo {
  id: string;
  nombre: string;
  duracionSemanas: number;
  microciclos: Microciclo[];
}

let mesociclos: Mesociclo[] = [
  {
    id: 'meso-1',
    nombre: 'Mesociclo Inicial',
    duracionSemanas: 4,
    microciclos: [
      {
        id: 'micro-1-1',
        nombre: 'Microciclo 1',
        semanas: [1, 2],
        bloques: [
          {
            id: 'bloque-1-1-1',
            nombre: 'Bloque Fuerza Base',
            volumen: 70,
            intensidad: 60,
            objetivos: { fuerza: 80, resistencia: 10, tecnica: 5, velocidad: 5 },
          },
        ],
      },
    ],
  },
];

export const getMesociclos = async (): Promise<Mesociclo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mesociclos), 500);
  });
};

export const getMesocicloById = async (id: string): Promise<Mesociclo | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mesociclos.find((m) => m.id === id)), 500);
  });
};

export const createMesociclo = async (newMesociclo: Omit<Mesociclo, 'id'>): Promise<Mesociclo> => {
  return new Promise((resolve) => {
    const mesociclo = { ...newMesociclo, id: `meso-${Date.now()}` };
    mesociclos.push(mesociclo);
    setTimeout(() => resolve(mesociclo), 500);
  });
};

export const updateMesociclo = async (
  id: string,
  updatedFields: Partial<Mesociclo>
): Promise<Mesociclo | undefined> => {
  return new Promise((resolve) => {
    const index = mesociclos.findIndex((m) => m.id === id);
    if (index > -1) {
      mesociclos[index] = { ...mesociclos[index], ...updatedFields };
      setTimeout(() => resolve(mesociclos[index]), 500);
    } else {
      setTimeout(() => resolve(undefined), 500);
    }
  });
};

export const deleteMesociclo = async (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const initialLength = mesociclos.length;
    mesociclos = mesociclos.filter((m) => m.id !== id);
    setTimeout(() => resolve(mesociclos.length < initialLength), 500);
  });
};

// Funciones para Microciclos y Bloques de Entrenamiento también se añadirían aquí.

// Nuevos Endpoints para Herramientas Científicas Avanzadas

export const calcularCargaOptima = async (
  intensidad: number,
  volumen: number,
  rpe: number
): Promise<{ cargaOptima: number; recomendaciones: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cargaOptima = (intensidad * volumen) / rpe; // Ejemplo de cálculo
      resolve({
        cargaOptima: parseFloat(cargaOptima.toFixed(2)),
        recomendaciones: "Ajustar la carga según la respuesta individual del atleta.",
      });
    }, 500);
  });
};

export const validarCoherenciaCientifica = async (
  mesocicloId: string
): Promise<{ esCoherente: boolean; advertencias: string[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const advertencias: string[] = [];
      if (mesocicloId === "meso-incoherente") { // Ejemplo de validación
        advertencias.push("La progresión de intensidad no es óptima.");
        advertencias.push("El volumen de entrenamiento excede los límites recomendados.");
      }
      resolve({
        esCoherente: advertencias.length === 0,
        advertencias,
      });
    }, 500);
  });
};

export const simularAdaptaciones = async (
  mesocicloId: string
): Promise<{ adaptacionesEsperadas: string[]; impactoFisiologico: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        adaptacionesEsperadas: ["Aumento de fuerza máxima", "Mejora de la resistencia muscular"],
        impactoFisiologico: "Se espera una hipertrofia moderada y una mejora neural.",
      });
    }, 500);
  });
};

export const obtenerAlertasSobreentrenamiento = async (
  atletaId: string
): Promise<{ sobreentrenamiento: boolean; subentrenamiento: boolean; mensajes: string[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mensajes: string[] = [];
      if (atletaId === "atleta-riesgo-sobre") {
        mensajes.push("Riesgo alto de sobreentrenamiento detectado. Reducir volumen.");
      } else if (atletaId === "atleta-riesgo-sub") {
        mensajes.push("Posible sub-entrenamiento. Considerar aumentar intensidad.");
      }
      resolve({
        sobreentrenamiento: atletaId === "atleta-riesgo-sobre",
        subentrenamiento: atletaId === "atleta-riesgo-sub",
        mensajes,
      });
    }, 500);
  });
};

export const integrarBaseDatosEntrenamiento = async (
  query: string
): Promise<{ resultados: any[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResults = [
        { id: "metodo-1", nombre: "Entrenamiento de Oclusión", descripcion: "..." },
        { id: "metodo-2", nombre: "Series Cluster", descripcion: "..." },
      ];
      resolve({
        resultados: mockResults.filter(m => m.nombre.toLowerCase().includes(query.toLowerCase())),
      });
    }, 500);
  });
};

export const obtenerRecomendacionesDeporte = async (
  deporte: string
): Promise<{ recomendaciones: string[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let recs: string[] = [];
      if (deporte === "futbol") {
        recs = ["Priorizar agilidad y potencia", "Incluir trabajo de resistencia intermitente"];
      } else if (deporte === "halterofilia") {
        recs = ["Foco en técnica de levantamiento", "Periodización ondulante"];
      }
      resolve({ recomendaciones: recs });
    }, 500);
  });
};

export const analizarProgresion = async (
  mesocicloId: string
): Promise<{ analisis: string; proyecciones: string[] }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        analisis: "La progresión de carga ha sido lineal, con picos en la semana 3.",
        proyecciones: ["Mantener progresión de carga", "Introducir descarga en el próximo microciclo"],
      });
    }, 500);
  });
};

export const predecirResultados = async (
  mesocicloId: string
): Promise<{ prediccion: string; probabilidadExito: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        prediccion: "Se espera un aumento del 5% en la fuerza máxima y 10% en resistencia.",
        probabilidadExito: 0.85,
      });
    }, 500);
  });
};
