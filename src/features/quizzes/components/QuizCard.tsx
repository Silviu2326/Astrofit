import React from 'react';
import { Clock, Award, CheckCircle, PlayCircle, Edit, Trash2 } from 'lucide-react';
import { Quiz } from '../types';

interface QuizCardProps {
  quiz: Quiz;
  onStart?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  lastScore?: number;
  isPassed?: boolean;
}

export function QuizCard({ quiz, onStart, onEdit, onDelete, lastScore, isPassed }: QuizCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{quiz.description}</p>
        </div>
        {isPassed !== undefined && (
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isPassed
              ? 'bg-green-100 text-green-700'
              : 'bg-orange-100 text-orange-700'
          }`}>
            {isPassed ? 'Aprobado' : 'No Aprobado'}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-cyan-50 rounded-lg">
          <p className="text-2xl font-bold text-cyan-600">{quiz.questions.length}</p>
          <p className="text-xs text-gray-600">Preguntas</p>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{quiz.totalPoints}</p>
          <p className="text-xs text-gray-600">Puntos</p>
        </div>
        <div className="text-center p-3 bg-indigo-50 rounded-lg">
          <p className="text-2xl font-bold text-indigo-600">{quiz.passingScore}%</p>
          <p className="text-xs text-gray-600">Mínimo</p>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
        {quiz.timeLimit && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{quiz.timeLimit} min</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4" />
          <span>Aprobar: {quiz.passingScore}%</span>
        </div>
      </div>

      {/* Last Score */}
      {lastScore !== undefined && (
        <div className="mb-4 p-3 bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">Último intento:</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-blue-600">{Math.round(lastScore)}%</span>
              {isPassed && <CheckCircle className="w-4 h-4 text-green-600" />}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {onStart && (
          <button
            onClick={onStart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <PlayCircle className="w-4 h-4" />
            {lastScore !== undefined ? 'Reintentar' : 'Iniciar'}
          </button>
        )}
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
