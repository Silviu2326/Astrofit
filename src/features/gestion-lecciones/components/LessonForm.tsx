import React, { useState, useEffect } from 'react';
import { X, Video, FileText, CheckSquare, Download, Plus, Trash2 } from 'lucide-react';
import { Lesson, LessonType, LessonFormData, QuizQuestion, QuizOption } from '../types';

interface LessonFormProps {
  lesson?: Lesson;
  courseId: string;
  onSubmit: (data: LessonFormData) => void;
  onCancel: () => void;
}

export const LessonForm: React.FC<LessonFormProps> = ({
  lesson,
  courseId,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<LessonFormData>({
    title: lesson?.title || '',
    description: lesson?.description || '',
    type: lesson?.type || 'video',
    duration: lesson?.duration,
    content: lesson?.content || {},
    isPublished: lesson?.isPublished || false,
  });

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(
    lesson?.type === 'quiz' ? lesson.content.questions : []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData: LessonFormData = {
      ...formData,
      content: getContentByType(),
    };

    onSubmit(submitData);
  };

  const getContentByType = () => {
    switch (formData.type) {
      case 'quiz':
        return {
          type: 'quiz' as const,
          questions: quizQuestions,
          passingScore: 70,
        };
      default:
        return formData.content;
    }
  };

  const addQuizQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      question: '',
      options: [
        { id: `opt-${Date.now()}-1`, text: '' },
        { id: `opt-${Date.now()}-2`, text: '' },
      ],
      correctOptionId: '',
      explanation: '',
    };
    setQuizQuestions([...quizQuestions, newQuestion]);
  };

  const updateQuestion = (questionId: string, field: keyof QuizQuestion, value: any) => {
    setQuizQuestions(
      quizQuestions.map((q) =>
        q.id === questionId ? { ...q, [field]: value } : q
      )
    );
  };

  const deleteQuestion = (questionId: string) => {
    setQuizQuestions(quizQuestions.filter((q) => q.id !== questionId));
  };

  const addOption = (questionId: string) => {
    setQuizQuestions(
      quizQuestions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...q.options,
                { id: `opt-${Date.now()}`, text: '' },
              ],
            }
          : q
      )
    );
  };

  const updateOption = (questionId: string, optionId: string, text: string) => {
    setQuizQuestions(
      quizQuestions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, text } : opt
              ),
            }
          : q
      )
    );
  };

  const deleteOption = (questionId: string, optionId: string) => {
    setQuizQuestions(
      quizQuestions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((opt) => opt.id !== optionId),
            }
          : q
      )
    );
  };

  const renderContentFields = () => {
    switch (formData.type) {
      case 'video':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL del Video
              </label>
              <input
                type="url"
                value={(formData.content as any).videoUrl || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, videoUrl: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de Miniatura (opcional)
              </label>
              <input
                type="url"
                value={(formData.content as any).thumbnailUrl || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, thumbnailUrl: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          </>
        );

      case 'texto':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido HTML
            </label>
            <textarea
              value={(formData.content as any).html || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  content: { ...formData.content, html: e.target.value },
                })
              }
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
              placeholder="<p>Contenido de la lección...</p>"
              required
            />
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Preguntas del Quiz
              </label>
              <button
                type="button"
                onClick={addQuizQuestion}
                className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Agregar Pregunta
              </button>
            </div>

            {quizQuestions.map((question, qIndex) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-900">
                    Pregunta {qIndex + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => deleteQuestion(question.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) =>
                        updateQuestion(question.id, 'question', e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Escribe la pregunta..."
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-medium text-gray-700">
                        Opciones
                      </label>
                      <button
                        type="button"
                        onClick={() => addOption(question.id)}
                        className="text-xs text-green-600 hover:text-green-700"
                      >
                        + Agregar Opción
                      </button>
                    </div>

                    {question.options.map((option) => (
                      <div key={option.id} className="flex items-center gap-2 mb-2">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctOptionId === option.id}
                          onChange={() =>
                            updateQuestion(question.id, 'correctOptionId', option.id)
                          }
                          className="text-green-600 focus:ring-green-500"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) =>
                            updateOption(question.id, option.id, e.target.value)
                          }
                          className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Texto de la opción..."
                          required
                        />
                        {question.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => deleteOption(question.id, option.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">
                      Explicación (opcional)
                    </label>
                    <textarea
                      value={question.explanation || ''}
                      onChange={(e) =>
                        updateQuestion(question.id, 'explanation', e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Explica por qué es correcta..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'descargable':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL del Archivo
              </label>
              <input
                type="url"
                value={(formData.content as any).fileUrl || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, fileUrl: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Archivo
              </label>
              <input
                type="text"
                value={(formData.content as any).fileName || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    content: { ...formData.content, fileName: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="documento.pdf"
                required
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
          <h2 className="text-2xl font-bold text-white">
            {lesson ? 'Editar Lección' : 'Nueva Lección'}
          </h2>
          <button
            onClick={onCancel}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la Lección *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Lección *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value as LessonType })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="video">Video</option>
                  <option value="texto">Texto</option>
                  <option value="quiz">Quiz</option>
                  <option value="descargable">Descargable</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración (minutos)
              </label>
              <input
                type="number"
                value={formData.duration || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: e.target.value ? parseInt(e.target.value) : undefined,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                min="0"
              />
            </div>

            {renderContentFields()}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData({ ...formData, isPublished: e.target.checked })
                }
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="isPublished" className="ml-2 text-sm font-medium text-gray-700">
                Publicar lección
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
            >
              {lesson ? 'Guardar Cambios' : 'Crear Lección'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
