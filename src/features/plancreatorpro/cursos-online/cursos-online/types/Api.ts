// Tipos para requests y responses de la API
import { Curso, Leccion, Quiz, QuizResult, QuizStatistics } from './index';

export interface CreateCursoRequest {
  titulo: string;
  descripcion: string;
  imagenPortada?: string;
  precio: number;
  categoria: string;
  duracion: number;
}

export interface UpdateCursoRequest {
  titulo?: string;
  descripcion?: string;
  imagenPortada?: string;
  precio?: number;
  categoria?: string;
  duracion?: number;
  estado?: 'borrador' | 'activo' | 'archivado' | 'pausado';
}

export interface ListCursosResponse {
  cursos: Curso[];
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
}

export interface ListCursosQuery {
  pagina?: number;
  limite?: number;
  estado?: string;
  categoria?: string;
  instructorId?: string;
  busqueda?: string;
  ordenarPor?: 'fechaCreacion' | 'titulo' | 'precio' | 'duracion';
  orden?: 'asc' | 'desc';
  precioMin?: number;
  precioMax?: number;
  fechaDesde?: string;
  fechaHasta?: string;
}

export interface UploadFileResponse {
  id: string;
  nombre: string;
  url: string;
  tipo: string;
  tamaño: number;
  fechaSubida: string;
}

export interface CreateLeccionRequest {
  titulo: string;
  descripcion: string;
  tipo: 'video' | 'texto' | 'quiz' | 'archivo' | 'enlace';
  contenido: string;
  duracion: number;
  orden: number;
  bloqueada: boolean;
}

export interface UpdateLeccionRequest {
  titulo?: string;
  descripcion?: string;
  contenido?: string;
  duracion?: number;
  orden?: number;
  bloqueada?: boolean;
}

export interface CreateQuizRequest {
  titulo: string;
  descripcion: string;
  duracion: number;
  intentosPermitidos: number;
  puntuacionMinima: number;
  preguntas: CreatePreguntaRequest[];
}

export interface CreatePreguntaRequest {
  pregunta: string;
  tipo: 'opcion_multiple' | 'verdadero_falso' | 'texto_libre' | 'seleccion_multiple';
  opciones: CreateOpcionRequest[];
  respuestaCorrecta: string | string[];
  puntos: number;
  orden: number;
  explicacion?: string;
}

export interface CreateOpcionRequest {
  texto: string;
  esCorrecta: boolean;
  orden: number;
}

export interface SubmitQuizRequest {
  respuestas: SubmitAnswerRequest[];
}

export interface SubmitAnswerRequest {
  questionId: string;
  answerText: string;
}

export interface EstadisticasCursos {
  total: number;
  activos: number;
  borradores: number;
  archivados: number;
  ingresosTotales: number;
  alumnosTotales: number;
}

export interface EstadisticasGenerales {
  totalQuizzes: number;
  totalIntentos: number;
  promedioGeneral: number;
  tasaAprobacion: number;
}
