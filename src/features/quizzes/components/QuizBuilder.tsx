import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Save, Eye } from 'lucide-react';
import { Quiz, QuizQuestion, QuestionType } from '../types';

interface QuizBuilderProps {
  onSave: (quiz: Quiz) => void;
  initialQuiz?: Quiz;
}

export function QuizBuilder({ onSave, initialQuiz }: QuizBuilderProps) {
  const [title, setTitle] = useState(initialQuiz?.title || '');
  const [description, setDescription] = useState(initialQuiz?.description || '');
  const [timeLimit, setTimeLimit] = useState(initialQuiz?.timeLimit || 30);
  const [passingScore, setPassingScore] = useState(initialQuiz?.passingScore || 70);
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuiz?.questions || []);
  const [showPreview, setShowPreview] = useState(false);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      type,
      question: '',
      points: 1,
      options: type !== 'open-ended' ? ['', ''] : undefined,
      correctAnswer: type === 'true-false' ? 0 : undefined,
    };

    if (type === 'true-false') {
      newQuestion.options = ['Verdadero', 'Falso'];
    }

    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, updates: Partial<QuizQuestion>) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const addOption = (questionId: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.options) {
      updateQuestion(questionId, {
        options: [...question.options, '']
      });
    }
  };

  const updateOption = (questionId: string, index: number, value: string) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.options) {
      const newOptions = [...question.options];
      newOptions[index] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const deleteOption = (questionId: string, index: number) => {
    const question = questions.find(q => q.id === questionId);
    if (question?.options && question.options.length > 2) {
      const newOptions = question.options.filter((_, i) => i !== index);
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const handleSave = () => {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

    const quiz: Quiz = {
      id: initialQuiz?.id || `quiz-${Date.now()}`,
      title,
      description,
      questions,
      totalPoints,
      timeLimit,
      passingScore,
      createdAt: initialQuiz?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    onSave(quiz);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Constructor de Quiz
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Editar' : 'Vista Previa'}
            </button>
            <button
              onClick={handleSave}
              disabled={!title || questions.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              Guardar Quiz
            </button>
          </div>
        </div>

        {/* Quiz Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título del Quiz *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Evaluación Módulo 1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiempo Límite (minutos)
            </label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={2}
              placeholder="Describe el objetivo del quiz..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Puntuación para Aprobar (%)
            </label>
            <input
              type="number"
              value={passingScore}
              onChange={(e) => setPassingScore(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              max="100"
            />
          </div>
        </div>
      </div>

      {/* Add Question Buttons */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Agregar Pregunta</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => addQuestion('multiple-choice')}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-cyan-50 text-cyan-700 rounded-lg hover:bg-cyan-100 transition-colors border-2 border-cyan-200"
          >
            <Plus className="w-5 h-5" />
            Opción Múltiple
          </button>
          <button
            onClick={() => addQuestion('true-false')}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors border-2 border-blue-200"
          >
            <Plus className="w-5 h-5" />
            Verdadero/Falso
          </button>
          <button
            onClick={() => addQuestion('open-ended')}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors border-2 border-indigo-200"
          >
            <Plus className="w-5 h-5" />
            Pregunta Abierta
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start gap-4">
              <div className="mt-2 cursor-move text-gray-400">
                <GripVertical className="w-5 h-5" />
              </div>

              <div className="flex-1 space-y-4">
                {/* Question Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white text-sm font-medium rounded-full">
                      Pregunta {index + 1}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-lg">
                      {question.type === 'multiple-choice' && 'Opción Múltiple'}
                      {question.type === 'true-false' && 'Verdadero/Falso'}
                      {question.type === 'open-ended' && 'Abierta'}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteQuestion(question.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Question Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pregunta *
                  </label>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Escribe tu pregunta..."
                  />
                </div>

                {/* Points */}
                <div className="w-32">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Puntos
                  </label>
                  <input
                    type="number"
                    value={question.points}
                    onChange={(e) => updateQuestion(question.id, { points: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                  />
                </div>

                {/* Options (for multiple-choice and true-false) */}
                {question.type !== 'open-ended' && question.options && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opciones
                    </label>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctAnswer === optIndex}
                            onChange={() => updateQuestion(question.id, { correctAnswer: optIndex })}
                            className="w-4 h-4 text-blue-600"
                          />
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(question.id, optIndex, e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Opción ${optIndex + 1}`}
                            disabled={question.type === 'true-false'}
                          />
                          {question.type === 'multiple-choice' && question.options!.length > 2 && (
                            <button
                              onClick={() => deleteOption(question.id, optIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {question.type === 'multiple-choice' && (
                      <button
                        onClick={() => addOption(question.id)}
                        className="mt-2 flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Agregar Opción
                      </button>
                    )}
                  </div>
                )}

                {/* Explanation */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Explicación (opcional)
                  </label>
                  <textarea
                    value={question.explanation || ''}
                    onChange={(e) => updateQuestion(question.id, { explanation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    placeholder="Explica la respuesta correcta..."
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {questions.length === 0 && (
        <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-600">
            No hay preguntas aún. Agrega preguntas usando los botones de arriba.
          </p>
        </div>
      )}
    </div>
  );
}
