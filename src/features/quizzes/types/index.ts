export type QuestionType = 'multiple-choice' | 'true-false' | 'open-ended';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  points: number;
  options?: string[]; // Para multiple-choice y true-false
  correctAnswer?: string | number; // Para multiple-choice y true-false
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  totalPoints: number;
  timeLimit?: number; // en minutos
  passingScore: number; // porcentaje
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | number;
  isCorrect?: boolean;
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  userId: string;
  answers: QuizAnswer[];
  score: number;
  percentage: number;
  passed: boolean;
  startedAt: Date;
  submittedAt: Date;
  timeSpent: number; // en segundos
}

export interface QuizStats {
  totalAttempts: number;
  averageScore: number;
  passRate: number;
  averageTime: number;
}
