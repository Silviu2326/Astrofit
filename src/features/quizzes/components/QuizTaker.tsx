import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Quiz, QuizAnswer, QuizSubmission } from '../types';

interface QuizTakerProps {
  quiz: Quiz;
  onSubmit: (submission: QuizSubmission) => void;
}

export function QuizTaker({ quiz, onSubmit }: QuizTakerProps) {
  const [answers, setAnswers] = useState<Map<string, string | number>>(new Map());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit ? quiz.timeLimit * 60 : null);
  const [startTime] = useState(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!timeRemaining) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const handleAnswer = (questionId: string, answer: string | number) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, answer);
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    const quizAnswers: QuizAnswer[] = quiz.questions.map(q => {
      const userAnswer = answers.get(q.id);
      let isCorrect = false;

      if (q.type !== 'open-ended' && q.correctAnswer !== undefined && userAnswer !== undefined) {
        isCorrect = userAnswer === q.correctAnswer;
      }

      return {
        questionId: q.id,
        answer: userAnswer || '',
        isCorrect: q.type !== 'open-ended' ? isCorrect : undefined,
      };
    });

    const correctAnswers = quizAnswers.filter(a => a.isCorrect === true).length;
    const autoGradedQuestions = quiz.questions.filter(q => q.type !== 'open-ended');
    const score = autoGradedQuestions.reduce((sum, q) => {
      const answer = quizAnswers.find(a => a.questionId === q.id);
      return sum + (answer?.isCorrect ? q.points : 0);
    }, 0);

    const percentage = quiz.totalPoints > 0 ? (score / quiz.totalPoints) * 100 : 0;
    const passed = percentage >= quiz.passingScore;

    const submission: QuizSubmission = {
      id: `sub-${Date.now()}`,
      quizId: quiz.id,
      userId: 'current-user', // This should come from auth context
      answers: quizAnswers,
      score,
      percentage,
      passed,
      startedAt: startTime,
      submittedAt: new Date(),
      timeSpent: Math.floor((new Date().getTime() - startTime.getTime()) / 1000),
    };

    setIsSubmitted(true);
    onSubmit(submission);
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const currentQ = quiz.questions[currentQuestion];
  const userAnswer = answers.get(currentQ.id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{quiz.title}</h2>
            <p className="text-gray-600 mt-1">{quiz.description}</p>
          </div>
          {timeRemaining !== null && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
              <Clock className={`w-5 h-5 ${timeRemaining < 60 ? 'text-red-600' : 'text-blue-600'}`} />
              <span className={`font-mono font-semibold ${timeRemaining < 60 ? 'text-red-600' : 'text-blue-600'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Pregunta {currentQuestion + 1} de {quiz.questions.length}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Pregunta {currentQuestion + 1}
            </h3>
            <span className="px-3 py-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white text-sm font-medium rounded-full">
              {currentQ.points} {currentQ.points === 1 ? 'punto' : 'puntos'}
            </span>
          </div>
          <p className="text-gray-800 text-lg">{currentQ.question}</p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQ.type === 'multiple-choice' && currentQ.options && (
            currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQ.id, index)}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  userAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    userAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {userAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-700">{option}</span>
                </div>
              </button>
            ))
          )}

          {currentQ.type === 'true-false' && currentQ.options && (
            currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQ.id, index)}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  userAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    userAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {userAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-gray-700 font-medium">{option}</span>
                </div>
              </button>
            ))
          )}

          {currentQ.type === 'open-ended' && (
            <textarea
              value={(userAnswer as string) || ''}
              onChange={(e) => handleAnswer(currentQ.id, e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              rows={6}
              placeholder="Escribe tu respuesta aquí..."
            />
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <div className="flex gap-2">
          {quiz.questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`w-8 h-8 rounded-lg font-medium transition-colors ${
                index === currentQuestion
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white'
                  : answers.has(quiz.questions[index].id)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestion < quiz.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            className="px-6 py-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Siguiente
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Finalizar Quiz
          </button>
        )}
      </div>

      {/* Quiz Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Información del Quiz</p>
            <ul className="space-y-1 text-blue-700">
              <li>• Puntuación total: {quiz.totalPoints} puntos</li>
              <li>• Puntuación mínima para aprobar: {quiz.passingScore}%</li>
              <li>• Preguntas respondidas: {answers.size} de {quiz.questions.length}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
