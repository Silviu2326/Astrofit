// src/features/cursos-online/quizzes-evaluaciones/quizzesEvaluacionesApi.ts

import { Quiz, Question, Answer, Result } from './types';

// Simulaci??n de una API para quizzes y evaluaciones

const quizzes: Quiz[] = [];

export const quizzesEvaluacionesApi = {
  getQuizzes: async (): Promise<Quiz[]> => {
    // L??gica para obtener quizzes
    return Promise.resolve(quizzes);
  },

  getQuizById: async (id: string): Promise<Quiz | undefined> => {
    // L??gica para obtener un quiz por ID
    return Promise.resolve(quizzes.find(q => q.id === id));
  },

  createQuiz: async (quiz: Quiz): Promise<Quiz> => {
    // L??gica para crear un nuevo quiz
    quizzes.push(quiz);
    return Promise.resolve(quiz);
  },

  submitQuiz: async (quizId: string, answers: Answer[]): Promise<Result> => {
    // L??gica para enviar respuestas y obtener resultados
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    let score = 0;
    quiz.questions.forEach(q => {
      const userAnswer = answers.find(a => a.questionId === q.id);
      if (userAnswer && q.correctAnswer === userAnswer.answerText) {
        score++;
      }
    });

    const result: Result = {
      quizId,
      score,
      totalQuestions: quiz.questions.length,
      feedback: 'Feedback instant??neo basado en las respuestas.',
      passed: score >= quiz.questions.length / 2, // Ejemplo simple de aprobaci??n
    };
    return Promise.resolve(result);
  },

  // Otros m??todos para gestionar preguntas, calificaciones, etc.
};

// Definiciones de tipos (pueden ir en un archivo separado como types.ts)
interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  multipleAttempts: boolean;
  maxAttempts: number;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string; // Para preguntas de opci??n m??ltiple
}

interface Answer {
  questionId: string;
  answerText: string;
}

interface Result {
  quizId: string;
  score: number;
  totalQuestions: number;
  feedback: string;
  passed: boolean;
}
