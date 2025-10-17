// src/features/cursos-online/quizzes-evaluaciones/quizzesEvaluacionesApi.ts

// Tipos para los quizzes (coinciden con el frontend)
interface QuizQuestion {
  id: string;
  pregunta: string;
  tipo: 'opcion-multiple' | 'verdadero-falso' | 'texto-libre';
  opciones?: string[];
  respuestaCorrecta?: string | boolean;
  puntos: number;
}

interface QuizFormData {
  titulo: string;
  descripcion: string;
  duracion: number;
  intentosPermitidos: number;
  puntuacionMinima: number;
  preguntas: QuizQuestion[];
  estado: 'borrador' | 'activo' | 'pausado';
  fechaInicio?: string;
  fechaFin?: string;
}

interface Quiz extends QuizFormData {
  id: string;
  intentos: number;
  promedio: number;
  fechaCreacion: string;
}

interface QuizResult {
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

interface Answer {
  questionId: string;
  answerText: string | boolean;
  esCorrecta: boolean;
  puntosObtenidos: number;
}

interface QuizStatistics {
  quizId: string;
  totalIntentos: number;
  promedioGeneral: number;
  tasaAprobacion: number;
  distribucionCalificaciones: {
    rango: string;
    cantidad: number;
    porcentaje: number;
  }[];
  tiempoPromedio: number;
  preguntasMasFalladas: {
    preguntaId: string;
    pregunta: string;
    porcentajeFallos: number;
  }[];
}

// Simulación de una API para quizzes y evaluaciones
const quizzes: Quiz[] = [
  {
    id: '1',
    titulo: 'Quiz de React Fundamentals',
    descripcion: 'Evaluación básica de conceptos de React',
    duracion: 30,
    intentosPermitidos: 3,
    puntuacionMinima: 70,
    estado: 'activo',
    intentos: 45,
    promedio: 85,
    fechaCreacion: '2024-01-15',
    preguntas: [
      {
        id: '1',
        pregunta: '¿Qué es JSX?',
        tipo: 'opcion-multiple',
        opciones: ['Una extensión de JavaScript', 'Un framework', 'Una librería', 'Un lenguaje de programación'],
        respuestaCorrecta: '0',
        puntos: 10
      },
      {
        id: '2',
        pregunta: 'React usa un Virtual DOM',
        tipo: 'verdadero-falso',
        respuestaCorrecta: true,
        puntos: 10
      },
      {
        id: '3',
        pregunta: 'Explica el concepto de props en React',
        tipo: 'texto-libre',
        puntos: 20
      }
    ]
  },
  {
    id: '2',
    titulo: 'Evaluación de TypeScript',
    descripcion: 'Test de conocimientos en TypeScript',
    duracion: 45,
    intentosPermitidos: 2,
    puntuacionMinima: 80,
    estado: 'borrador',
    intentos: 32,
    promedio: 78,
    fechaCreacion: '2024-01-20',
    preguntas: [
      {
        id: '4',
        pregunta: 'TypeScript es un superset de JavaScript',
        tipo: 'verdadero-falso',
        respuestaCorrecta: true,
        puntos: 15
      },
      {
        id: '5',
        pregunta: '¿Cuál es la diferencia entre interface y type en TypeScript?',
        tipo: 'opcion-multiple',
        opciones: [
          'No hay diferencia',
          'interface es para objetos, type para primitivos',
          'interface puede ser extendida, type no',
          'Ambas son iguales'
        ],
        respuestaCorrecta: '2',
        puntos: 25
      }
    ]
  },
  {
    id: '3',
    titulo: 'Test de Node.js',
    descripcion: 'Evaluación de conceptos de Node.js',
    duracion: 60,
    intentosPermitidos: 1,
    puntuacionMinima: 75,
    estado: 'activo',
    intentos: 28,
    promedio: 92,
    fechaCreacion: '2024-01-25',
    preguntas: [
      {
        id: '6',
        pregunta: 'Describe el concepto de event loop en Node.js',
        tipo: 'texto-libre',
        puntos: 30
      },
      {
        id: '7',
        pregunta: 'Node.js es single-threaded',
        tipo: 'verdadero-falso',
        respuestaCorrecta: true,
        puntos: 20
      }
    ]
  }
];

const quizResults: QuizResult[] = [
  // Resultados para Quiz de React (ID: 1)
  {
    id: '1',
    quizId: '1',
    estudianteId: 'est1',
    estudianteNombre: 'Juan Pérez',
    puntuacion: 35,
    puntuacionMaxima: 40,
    porcentaje: 87.5,
    aprobado: true,
    fechaCompletado: '2024-01-16T10:30:00Z',
    tiempoUtilizado: 25,
    respuestas: [
      {
        questionId: '1',
        answerText: '0',
        esCorrecta: true,
        puntosObtenidos: 10
      },
      {
        questionId: '2',
        answerText: true,
        esCorrecta: true,
        puntosObtenidos: 10
      },
      {
        questionId: '3',
        answerText: 'Props son propiedades que se pasan a componentes React',
        esCorrecta: true,
        puntosObtenidos: 15
      }
    ]
  },
  {
    id: '2',
    quizId: '1',
    estudianteId: 'est2',
    estudianteNombre: 'María García',
    puntuacion: 28,
    puntuacionMaxima: 40,
    porcentaje: 70,
    aprobado: true,
    fechaCompletado: '2024-01-16T14:15:00Z',
    tiempoUtilizado: 28,
    respuestas: [
      {
        questionId: '1',
        answerText: '1',
        esCorrecta: false,
        puntosObtenidos: 0
      },
      {
        questionId: '2',
        answerText: true,
        esCorrecta: true,
        puntosObtenidos: 10
      },
      {
        questionId: '3',
        answerText: 'Props son datos que se pasan entre componentes',
        esCorrecta: true,
        puntosObtenidos: 18
      }
    ]
  },
  {
    id: '3',
    quizId: '1',
    estudianteId: 'est3',
    estudianteNombre: 'Carlos López',
    puntuacion: 38,
    puntuacionMaxima: 40,
    porcentaje: 95,
    aprobado: true,
    fechaCompletado: '2024-01-17T09:45:00Z',
    tiempoUtilizado: 22,
    respuestas: [
      {
        questionId: '1',
        answerText: '0',
        esCorrecta: true,
        puntosObtenidos: 10
      },
      {
        questionId: '2',
        answerText: true,
        esCorrecta: true,
        puntosObtenidos: 10
      },
      {
        questionId: '3',
        answerText: 'Props son propiedades que permiten pasar datos de componentes padre a hijos en React',
        esCorrecta: true,
        puntosObtenidos: 18
      }
    ]
  },
  {
    id: '4',
    quizId: '1',
    estudianteId: 'est4',
    estudianteNombre: 'Ana Martínez',
    puntuacion: 24,
    puntuacionMaxima: 40,
    porcentaje: 60,
    aprobado: false,
    fechaCompletado: '2024-01-17T16:20:00Z',
    tiempoUtilizado: 35,
    respuestas: [
      {
        questionId: '1',
        answerText: '2',
        esCorrecta: false,
        puntosObtenidos: 0
      },
      {
        questionId: '2',
        answerText: false,
        esCorrecta: false,
        puntosObtenidos: 0
      },
      {
        questionId: '3',
        answerText: 'Props son funciones en React',
        esCorrecta: true,
        puntosObtenidos: 24
      }
    ]
  },
  {
    id: '5',
    quizId: '1',
    estudianteId: 'est5',
    estudianteNombre: 'Luis Rodríguez',
    puntuacion: 32,
    puntuacionMaxima: 40,
    porcentaje: 80,
    aprobado: true,
    fechaCompletado: '2024-01-18T11:10:00Z',
    tiempoUtilizado: 26,
    respuestas: [
      {
        questionId: '1',
        answerText: '0',
        esCorrecta: true,
        puntosObtenidos: 10
      },
      {
        questionId: '2',
        answerText: true,
        esCorrecta: true,
        puntosObtenidos: 10
      },
      {
        questionId: '3',
        answerText: 'Props son parámetros que se pasan a componentes',
        esCorrecta: true,
        puntosObtenidos: 12
      }
    ]
  },
  // Resultados para Quiz de TypeScript (ID: 2)
  {
    id: '6',
    quizId: '2',
    estudianteId: 'est6',
    estudianteNombre: 'Elena Sánchez',
    puntuacion: 35,
    puntuacionMaxima: 40,
    porcentaje: 87.5,
    aprobado: true,
    fechaCompletado: '2024-01-20T13:30:00Z',
    tiempoUtilizado: 38,
    respuestas: [
      {
        questionId: '4',
        answerText: true,
        esCorrecta: true,
        puntosObtenidos: 15
      },
      {
        questionId: '5',
        answerText: '2',
        esCorrecta: true,
        puntosObtenidos: 25
      }
    ]
  },
  {
    id: '7',
    quizId: '2',
    estudianteId: 'est7',
    estudianteNombre: 'Roberto Jiménez',
    puntuacion: 30,
    puntuacionMaxima: 40,
    porcentaje: 75,
    aprobado: false,
    fechaCompletado: '2024-01-21T10:15:00Z',
    tiempoUtilizado: 42,
    respuestas: [
      {
        questionId: '4',
        answerText: true,
        esCorrecta: true,
        puntosObtenidos: 15
      },
      {
        questionId: '5',
        answerText: '1',
        esCorrecta: false,
        puntosObtenidos: 0
      }
    ]
  },
  // Resultados para Quiz de Node.js (ID: 3)
  {
    id: '8',
    quizId: '3',
    estudianteId: 'est8',
    estudianteNombre: 'Isabel Torres',
    puntuacion: 45,
    puntuacionMaxima: 50,
    porcentaje: 90,
    aprobado: true,
    fechaCompletado: '2024-01-25T15:45:00Z',
    tiempoUtilizado: 52,
    respuestas: [
      {
        questionId: '6',
        answerText: 'El event loop es el mecanismo que permite a Node.js realizar operaciones no bloqueantes',
        esCorrecta: true,
        puntosObtenidos: 30
      },
      {
        questionId: '7',
        answerText: true,
        esCorrecta: true,
        puntosObtenidos: 20
      }
    ]
  },
  {
    id: '9',
    quizId: '3',
    estudianteId: 'est9',
    estudianteNombre: 'Miguel Herrera',
    puntuacion: 42,
    puntuacionMaxima: 50,
    porcentaje: 84,
    aprobado: true,
    fechaCompletado: '2024-01-26T09:30:00Z',
    tiempoUtilizado: 58,
    respuestas: [
      {
        questionId: '6',
        answerText: 'Event loop maneja las operaciones asíncronas en Node.js',
        esCorrecta: true,
        puntosObtenidos: 22
      },
      {
        questionId: '7',
        answerText: true,
        esCorrecta: true,
        puntosObtenidos: 20
      }
    ]
  },
  {
    id: '10',
    quizId: '3',
    estudianteId: 'est10',
    estudianteNombre: 'Patricia Morales',
    puntuacion: 38,
    puntuacionMaxima: 50,
    porcentaje: 76,
    aprobado: true,
    fechaCompletado: '2024-01-26T14:20:00Z',
    tiempoUtilizado: 55,
    respuestas: [
      {
        questionId: '6',
        answerText: 'El event loop es un patrón de diseño para manejar eventos',
        esCorrecta: true,
        puntosObtenidos: 18
      },
      {
        questionId: '7',
        answerText: true,
        esCorrecta: true,
        puntosObtenidos: 20
      }
    ]
  }
];

export const quizzesEvaluacionesApi = {
  // Métodos para quizzes
  getQuizzes: async (): Promise<Quiz[]> => {
    return Promise.resolve(quizzes);
  },

  getQuizById: async (id: string): Promise<Quiz | undefined> => {
    return Promise.resolve(quizzes.find(q => q.id === id));
  },

  createQuiz: async (quizData: QuizFormData): Promise<Quiz> => {
    const newQuiz: Quiz = {
      ...quizData,
      id: Date.now().toString(),
      intentos: 0,
      promedio: 0,
      fechaCreacion: new Date().toISOString().split('T')[0]
    };
    quizzes.push(newQuiz);
    return Promise.resolve(newQuiz);
  },

  updateQuiz: async (id: string, quizData: QuizFormData): Promise<Quiz | undefined> => {
    const quizIndex = quizzes.findIndex(q => q.id === id);
    if (quizIndex === -1) return undefined;
    
    quizzes[quizIndex] = { ...quizzes[quizIndex], ...quizData };
    return Promise.resolve(quizzes[quizIndex]);
  },

  deleteQuiz: async (id: string): Promise<boolean> => {
    const quizIndex = quizzes.findIndex(q => q.id === id);
    if (quizIndex === -1) return false;
    
    quizzes.splice(quizIndex, 1);
    // También eliminar resultados relacionados
    const resultIndex = quizResults.findIndex(r => r.quizId === id);
    if (resultIndex !== -1) {
      quizResults.splice(resultIndex, 1);
    }
    return Promise.resolve(true);
  },

  // Métodos para resultados
  getQuizResults: async (quizId: string): Promise<QuizResult[]> => {
    return Promise.resolve(quizResults.filter(r => r.quizId === quizId));
  },

  getAllResults: async (): Promise<QuizResult[]> => {
    return Promise.resolve(quizResults);
  },

  submitQuiz: async (quizId: string, answers: Answer[]): Promise<QuizResult> => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    let puntuacionTotal = 0;
    let puntuacionMaxima = 0;
    const respuestasEvaluadas: Answer[] = [];

    quiz.preguntas.forEach(pregunta => {
      puntuacionMaxima += pregunta.puntos;
      const userAnswer = answers.find(a => a.questionId === pregunta.id);
      
      if (userAnswer) {
        let esCorrecta = false;
        let puntosObtenidos = 0;

        if (pregunta.tipo === 'opcion-multiple') {
          esCorrecta = userAnswer.answerText === pregunta.respuestaCorrecta;
        } else if (pregunta.tipo === 'verdadero-falso') {
          esCorrecta = userAnswer.answerText === pregunta.respuestaCorrecta;
        } else if (pregunta.tipo === 'texto-libre') {
          // Para texto libre, asumimos que siempre es correcto (en un caso real se evaluaría manualmente)
          esCorrecta = true;
        }

        puntosObtenidos = esCorrecta ? pregunta.puntos : 0;
        puntuacionTotal += puntosObtenidos;

        respuestasEvaluadas.push({
          ...userAnswer,
          esCorrecta,
          puntosObtenidos
        });
      }
    });

    const porcentaje = (puntuacionTotal / puntuacionMaxima) * 100;
    const aprobado = porcentaje >= quiz.puntuacionMinima;

    const result: QuizResult = {
      id: Date.now().toString(),
      quizId,
      estudianteId: 'current-user',
      estudianteNombre: 'Usuario Actual',
      puntuacion: puntuacionTotal,
      puntuacionMaxima,
      porcentaje,
      aprobado,
      fechaCompletado: new Date().toISOString(),
      tiempoUtilizado: quiz.duracion,
      respuestas: respuestasEvaluadas
    };

    quizResults.push(result);
    
    // Actualizar estadísticas del quiz
    const quizIndex = quizzes.findIndex(q => q.id === quizId);
    if (quizIndex !== -1) {
      const quizResultsForQuiz = quizResults.filter(r => r.quizId === quizId);
      quizzes[quizIndex].intentos = quizResultsForQuiz.length;
      quizzes[quizIndex].promedio = quizResultsForQuiz.reduce((sum, r) => sum + r.porcentaje, 0) / quizResultsForQuiz.length;
    }

    return Promise.resolve(result);
  },

  // Métodos para estadísticas
  getQuizStatistics: async (quizId: string): Promise<QuizStatistics> => {
    const quiz = quizzes.find(q => q.id === quizId);
    const results = quizResults.filter(r => r.quizId === quizId);
    
    if (!quiz || results.length === 0) {
      return {
        quizId,
        totalIntentos: 0,
        promedioGeneral: 0,
        tasaAprobacion: 0,
        distribucionCalificaciones: [],
        tiempoPromedio: 0,
        preguntasMasFalladas: []
      };
    }

    const totalIntentos = results.length;
    const promedioGeneral = results.reduce((sum, r) => sum + r.porcentaje, 0) / totalIntentos;
    const tasaAprobacion = (results.filter(r => r.aprobado).length / totalIntentos) * 100;
    const tiempoPromedio = results.reduce((sum, r) => sum + r.tiempoUtilizado, 0) / totalIntentos;

    // Distribución de calificaciones
    const distribucionCalificaciones = [
      { rango: '90-100%', cantidad: results.filter(r => r.porcentaje >= 90).length, porcentaje: 0 },
      { rango: '80-89%', cantidad: results.filter(r => r.porcentaje >= 80 && r.porcentaje < 90).length, porcentaje: 0 },
      { rango: '70-79%', cantidad: results.filter(r => r.porcentaje >= 70 && r.porcentaje < 80).length, porcentaje: 0 },
      { rango: '60-69%', cantidad: results.filter(r => r.porcentaje >= 60 && r.porcentaje < 70).length, porcentaje: 0 },
      { rango: '0-59%', cantidad: results.filter(r => r.porcentaje < 60).length, porcentaje: 0 }
    ];

    distribucionCalificaciones.forEach(item => {
      item.porcentaje = (item.cantidad / totalIntentos) * 100;
    });

    // Preguntas más falladas
    const preguntasMasFalladas = quiz.preguntas.map(pregunta => {
      const respuestasPregunta = results.flatMap(r => 
        r.respuestas.filter(resp => resp.questionId === pregunta.id)
      );
      const totalRespuestas = respuestasPregunta.length;
      const respuestasIncorrectas = respuestasPregunta.filter(r => !r.esCorrecta).length;
      const porcentajeFallos = totalRespuestas > 0 ? (respuestasIncorrectas / totalRespuestas) * 100 : 0;

      return {
        preguntaId: pregunta.id,
        pregunta: pregunta.pregunta,
        porcentajeFallos
      };
    }).sort((a, b) => b.porcentajeFallos - a.porcentajeFallos);

    return {
      quizId,
      totalIntentos,
      promedioGeneral,
      tasaAprobacion,
      distribucionCalificaciones,
      tiempoPromedio,
      preguntasMasFalladas
    };
  },

  getGeneralStatistics: async () => {
    const totalQuizzes = quizzes.length;
    const totalIntentos = quizResults.length;
    const promedioGeneral = quizResults.length > 0 
      ? quizResults.reduce((sum, r) => sum + r.porcentaje, 0) / quizResults.length
      : 0;
    const tasaAprobacion = quizResults.length > 0 
      ? (quizResults.filter(r => r.aprobado).length / quizResults.length) * 100
      : 0;

    return {
      totalQuizzes,
      totalIntentos,
      promedioGeneral,
      tasaAprobacion
    };
  }
};

// Exportar tipos para uso en otros archivos
export type { Quiz, QuizFormData, QuizQuestion, QuizResult, Answer, QuizStatistics };
