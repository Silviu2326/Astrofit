import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Trophy, Clock, Award } from 'lucide-react';
import { Quiz, QuizSubmission } from '../types';

interface QuizResultsProps {
  quiz: Quiz;
  submission: QuizSubmission;
  onRetake?: () => void;
  onClose?: () => void;
}

export function QuizResults({ quiz, submission, onRetake, onClose }: QuizResultsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { letter: 'A', color: 'green', label: 'Excelente' };
    if (percentage >= 80) return { letter: 'B', color: 'blue', label: 'Muy Bueno' };
    if (percentage >= 70) return { letter: 'C', color: 'yellow', label: 'Bueno' };
    if (percentage >= 60) return { letter: 'D', color: 'orange', label: 'Suficiente' };
    return { letter: 'F', color: 'red', label: 'Insuficiente' };
  };

  const grade = getGrade(submission.percentage);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Results Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          {submission.passed ? (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <Trophy className="w-10 h-10 text-green-600" />
            </div>
          ) : (
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-4">
              <AlertTriangle className="w-10 h-10 text-orange-600" />
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {submission.passed ? '¡Felicitaciones!' : 'Quiz Completado'}
          </h2>
          <p className="text-gray-600">
            {submission.passed
              ? 'Has aprobado el quiz exitosamente'
              : 'No alcanzaste la puntuación mínima para aprobar'}
          </p>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Puntuación</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {submission.score}/{quiz.totalPoints}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Porcentaje</p>
            <p className="text-3xl font-bold text-blue-600">
              {Math.round(submission.percentage)}%
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Calificación</p>
            <div className="flex items-center justify-center gap-2">
              <span className={`text-3xl font-bold text-${grade.color}-600`}>
                {grade.letter}
              </span>
              <Award className={`w-6 h-6 text-${grade.color}-600`} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-600 mb-1">Tiempo</p>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-xl font-bold text-purple-600">
                {formatTime(submission.timeSpent)}
              </span>
            </div>
          </div>
        </div>

        {/* Pass/Fail Indicator */}
        <div className={`rounded-xl p-4 ${
          submission.passed
            ? 'bg-green-50 border border-green-200'
            : 'bg-orange-50 border border-orange-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {submission.passed ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              )}
              <div>
                <p className={`font-semibold ${
                  submission.passed ? 'text-green-800' : 'text-orange-800'
                }`}>
                  {submission.passed ? 'Aprobado' : 'No Aprobado'}
                </p>
                <p className={`text-sm ${
                  submission.passed ? 'text-green-600' : 'text-orange-600'
                }`}>
                  Puntuación mínima requerida: {quiz.passingScore}%
                </p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg font-semibold ${
              submission.passed
                ? 'bg-green-100 text-green-700'
                : 'bg-orange-100 text-orange-700'
            }`}>
              {grade.label}
            </div>
          </div>
        </div>
      </div>

      {/* Question Review */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Revisión de Respuestas</h3>

        <div className="space-y-4">
          {quiz.questions.map((question, index) => {
            const answer = submission.answers.find(a => a.questionId === question.id);
            const isCorrect = answer?.isCorrect;
            const isOpenEnded = question.type === 'open-ended';

            return (
              <div
                key={question.id}
                className={`rounded-xl border-2 p-4 ${
                  isOpenEnded
                    ? 'border-blue-200 bg-blue-50'
                    : isCorrect
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {!isOpenEnded && (
                    isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    )
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">
                        Pregunta {index + 1}
                      </p>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isOpenEnded
                          ? 'bg-blue-100 text-blue-700'
                          : isCorrect
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {isOpenEnded
                          ? 'Revisión Pendiente'
                          : isCorrect
                          ? `+${question.points} pts`
                          : '0 pts'}
                      </span>
                    </div>
                    <p className="text-gray-800 mb-3">{question.question}</p>

                    {/* User Answer */}
                    <div className="mb-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">Tu respuesta:</p>
                      <p className={`text-sm ${
                        isOpenEnded
                          ? 'text-blue-800'
                          : isCorrect
                          ? 'text-green-800'
                          : 'text-red-800'
                      }`}>
                        {question.options && typeof answer?.answer === 'number'
                          ? question.options[answer.answer]
                          : answer?.answer || 'Sin respuesta'}
                      </p>
                    </div>

                    {/* Correct Answer (only for auto-graded questions) */}
                    {!isOpenEnded && !isCorrect && question.correctAnswer !== undefined && question.options && (
                      <div className="mb-2">
                        <p className="text-sm font-medium text-gray-700 mb-1">Respuesta correcta:</p>
                        <p className="text-sm text-green-800">
                          {question.options[question.correctAnswer]}
                        </p>
                      </div>
                    )}

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm font-medium text-gray-700 mb-1">Explicación:</p>
                        <p className="text-sm text-gray-600">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        {onRetake && (
          <button
            onClick={onRetake}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Reintentar Quiz
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cerrar
          </button>
        )}
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Estadísticas del Intento</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Preguntas correctas</p>
            <p className="text-lg font-bold text-blue-600">
              {submission.answers.filter(a => a.isCorrect === true).length} / {quiz.questions.filter(q => q.type !== 'open-ended').length}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Precisión</p>
            <p className="text-lg font-bold text-blue-600">
              {Math.round(submission.percentage)}%
            </p>
          </div>
          <div>
            <p className="text-gray-600">Fecha de envío</p>
            <p className="text-lg font-bold text-blue-600">
              {new Date(submission.submittedAt).toLocaleString('es-ES', {
                dateStyle: 'short',
                timeStyle: 'short'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
