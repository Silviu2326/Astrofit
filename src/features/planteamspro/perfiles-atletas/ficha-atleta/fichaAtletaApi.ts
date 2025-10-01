export interface Atleta {
  id: string;
  nombre: string;
  apellidos: string;
  fechaNacimiento: string;
  nacionalidad: string;
  posicion: string;
  alturaCm: number;
  pesoKg: number;
  edad: number;
  // Datos deportivos
  equipoActual: string;
  deporte: string;
  historialEquipos: { nombre: string; temporada: string }[];
  estadisticasClave: { [key: string]: any };
  // Datos médicos
  grupoSanguineo: string;
  alergias: string[];
  historialLesiones: {
    fecha: string;
    tipo: string;
    gravedad: string;
    tratamiento: string;
    tiempoRecuperacionSemanas: number;
  }[];
  revisionesMedicas: { fecha: string; resultados: string }[];
  // Nuevos datos para an??lisis biomec??nico
  analisisBiomecanico: {
    fecha: string;
    tipoEvaluacion: string;
    resultadosClave: string;
    recomendaciones: string;
  }[];
  // Nuevos datos para integraci??n de wearables
  integracionWearables: {
    dispositivo: string;
    ultimaSincronizacion: string;
    datosRecientes: {
      frecuenciaCardiaca: number;
      horasSueno: number;
      pasos: number;
    };
  }[];
}

export const fetchAtletaData = (): Promise<Atleta> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'atleta-001',
        nombre: 'Lionel',
        apellidos: 'Messi',
        fechaNacimiento: '1987-06-24',
        nacionalidad: 'Argentina',
        posicion: 'Delantero',
        alturaCm: 170,
        pesoKg: 72,
        edad: 37,
        equipoActual: 'Inter Miami CF',
        deporte: 'Fútbol',
        historialEquipos: [
          { nombre: 'FC Barcelona', temporada: '2004-2021' },
          { nombre: 'Paris Saint-Germain', temporada: '2021-2023' },
        ],
        estadisticasClave: {
          goles: 800,
          asistencias: 350,
          partidosJugados: 1000,
        },
        grupoSanguineo: 'A+',
        alergias: ['Ninguna'],
        historialLesiones: [
          {
            fecha: '2013-11-10',
            tipo: 'Rotura fibrilar bíceps femoral',
            gravedad: 'Moderada',
            tratamiento: 'Reposo y fisioterapia',
            tiempoRecuperacionSemanas: 6,
          },
          {
            fecha: '2015-09-26',
            tipo: 'Rotura ligamento colateral interno rodilla izquierda',
            gravedad: 'Grave',
            tratamiento: 'Reposo y rehabilitación',
            tiempoRecuperacionSemanas: 8,
          },
        ],
        revisionesMedicas: [
          { fecha: '2024-03-10', resultados: 'Excelente estado físico' },
        ],
        analisisBiomecanico: [
          {
            fecha: '2024-09-20',
            tipoEvaluacion: 'Análisis de la marcha',
            resultadosClave: 'Ligera pronación en pie izquierdo',
            recomendaciones: 'Uso de plantillas personalizadas y ejercicios de fortalecimiento de tobillo.',
          },
        ],
        integracionWearables: [
          {
            dispositivo: 'Garmin Forerunner 945',
            ultimaSincronizacion: '2024-09-27T10:30:00Z',
            datosRecientes: {
              frecuenciaCardiaca: 70,
              horasSueno: 7.5,
              pasos: 12000,
            },
          },
        ],
      });
    }, 500);
  });
};
