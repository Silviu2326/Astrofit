// Tipos relacionados con quizzes y evaluaciones
export interface Quiz {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: number; // en minutos
  intentosPermitidos: number;
  puntuacionMinima: number; // porcentaje 0-100
  estado: 'borrador' | 'activo' | 'archivado';
  preguntas: Pregunta[];
  fechaCreacion: string;
  cursoId: string;
  leccionId?: string;
}

export interface Pregunta {
  id: string;
  pregunta: string;
  tipo: 'opcion_multiple' | 'verdadero_falso' | 'texto_libre' | 'seleccion_multiple';
  opciones: OpcionPregunta[];
  respuestaCorrecta: string | string[];
  puntos: number;
  orden: number;
  explicacion?: string;
}

export interface OpcionPregunta {
  id: string;
  texto: string;
  esCorrecta: boolean;
  orden: number;
}

export interface QuizResult {
  id: string;
  quizId: string;
  estudianteId: string;
  estudianteNombre: string;
  puntuacion: number;
  puntuacionMaxima: number;
  porcentaje: number;
  aprobado: boolean;
  fechaCompletado: string;
  tiempoUtilizado: number; // en minutos
  respuestas: Answer[];
}

export interface Answer {
  questionId: string;
  answerText: string;
  esCorrecta: boolean;
  puntosObtenidos: number;
}

export interface QuizStatistics {
  quizId: string;
  totalIntentos: number;
  promedioGeneral: number;
  tasaAprobacion: number;
  distribucionCalificaciones: DistribucionCalificaciones;
  tiempoPromedio: number;
  preguntasMasFalladas: PreguntaMasFallada[];
}

export interface DistribucionCalificaciones {
  excelente: number; // 90-100%
  bueno: number; // 70-89%
  regular: number; // 50-69%
  deficiente: number; // 0-49%
}

export interface PreguntaMasFallada {
  preguntaId: string;
  pregunta: string;
  porcentajeFallos: number;
  totalRespuestas: number;
}
