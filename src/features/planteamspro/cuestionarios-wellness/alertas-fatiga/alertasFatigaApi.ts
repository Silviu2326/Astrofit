import { useState, useEffect } from 'react';

interface Atleta {
  id: string;
  nombre: string;
  nivelEnergia: number;
  nivelAnimo: number;
}

interface Alerta {
  atletaId: string;
  severidad: 'rojo' | 'amarillo';
  mensaje: string;
  recomendacion: string;
}

interface BiomarcadorData {
  atletaId: string;
  hrv: number; // Heart Rate Variability
  cortisol: number; // Cortisol level
  fecha: string;
}

interface PrediccionFatiga {
  atletaId: string;
  probabilidadFatiga: number; // 0-1
  tipoFatiga: 'aguda' | 'cronica' | 'overreaching' | 'ninguna';
  fechaPrediccion: string;
}

// Simula una API para la detección de sobrecarga y prevención de fatiga
export const useAlertasFatigaApi = () => {
  const [atletas, setAtletas] = useState<Atleta[]>([]);
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [biomarcadores, setBiomarcadores] = useState<BiomarcadorData[]>([]);
  const [predicciones, setPredicciones] = useState<PrediccionFatiga[]>([]);

  useEffect(() => {
    // Simula la carga inicial de atletas
    const fetchedAtletas: Atleta[] = [
      { id: '1', nombre: 'Juan Pérez', nivelEnergia: 80, nivelAnimo: 75 },
      { id: '2', nombre: 'María García', nivelEnergia: 40, nivelAnimo: 50 },
      { id: '3', nombre: 'Pedro López', nivelEnergia: 60, nivelAnimo: 65 },
      { id: '4', nombre: 'Ana Martínez', nivelEnergia: 30, nivelAnimo: 40 },
    ];
    setAtletas(fetchedAtletas);

    // Simula la detección de sobrecarga
    const detectarSobrecarga = () => {
      const nuevasAlertas: Alerta[] = [];
      fetchedAtletas.forEach(atleta => {
        if (atleta.nivelEnergia < 50 || atleta.nivelAnimo < 50) {
          let severidad: 'rojo' | 'amarillo' = 'amarillo';
          let mensaje = `El atleta ${atleta.nombre} tiene niveles bajos de energía o ánimo.`;
          let recomendacion = 'Considerar monitoreo.';

          if (atleta.nivelEnergia < 40 || atleta.nivelAnimo < 40) {
            severidad = 'rojo';
            mensaje = `¡Alerta crítica! El atleta ${atleta.nombre} presenta una fatiga significativa.`;
            recomendacion = 'Reducir carga de entrenamiento esta semana y evaluar descanso.';
          }
          nuevasAlertas.push({
            atletaId: atleta.id,
            severidad,
            mensaje,
            recomendacion,
          });
        }
      });
      setAlertas(nuevasAlertas);
    };

    // Simula la obtención de datos de biomarcadores
    const fetchBiomarcadores = () => {
      const fetchedBiomarcadores: BiomarcadorData[] = [
        { atletaId: '1', hrv: 60, cortisol: 15, fecha: '2025-09-27' },
        { atletaId: '2', hrv: 35, cortisol: 25, fecha: '2025-09-27' },
        { atletaId: '3', hrv: 50, cortisol: 18, fecha: '2025-09-27' },
        { atletaId: '4', hrv: 28, cortisol: 30, fecha: '2025-09-27' },
      ];
      setBiomarcadores(fetchedBiomarcadores);
    };

    // Simula la obtención de predicciones de fatiga
    const fetchPrediccionesFatiga = () => {
      const fetchedPredicciones: PrediccionFatiga[] = [
        { atletaId: '1', probabilidadFatiga: 0.2, tipoFatiga: 'ninguna', fechaPrediccion: '2025-09-28' },
        { atletaId: '2', probabilidadFatiga: 0.8, tipoFatiga: 'cronica', fechaPrediccion: '2025-09-28' },
        { atletaId: '3', probabilidadFatiga: 0.4, tipoFatiga: 'ninguna', fechaPrediccion: '2025-09-28' },
        { atletaId: '4', probabilidadFatiga: 0.95, tipoFatiga: 'overreaching', fechaPrediccion: '2025-09-28' },
      ];
      setPredicciones(fetchedPredicciones);
    };

    detectarSobrecarga();
    fetchBiomarcadores();
    fetchPrediccionesFatiga();
    // Podrías configurar un setInterval para la detección periódica en una aplicación real
  }, []);

  return { atletas, alertas, biomarcadores, predicciones };
};