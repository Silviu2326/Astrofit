import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Trash2, HelpCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../../../../../../../components/ui/modal';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface AddQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quizData: { title: string; description?: string; questions: Question[] }) => void;
}

const AddQuizModal: React.FC<AddQuizModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: `question_${Date.now()}`,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const updateQuestion = (questionId: string, field: keyof Question, value: any) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, [field]: value } : q
    ));
  };

  const addOption = (questionId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: [...q.options, ''] }
        : q
    ));
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            options: q.options.filter((_, index) => index !== optionIndex),
            correctAnswer: q.correctAnswer >= optionIndex ? Math.max(0, q.correctAnswer - 1) : q.correctAnswer
          }
        : q
    ));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            options: q.options.map((option, index) => 
              index === optionIndex ? value : option
            )
          }
        : q
    ));
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Por favor ingresa un título para el quiz');
      return;
    }

    if (questions.length === 0) {
      toast.error('Por favor agrega al menos una pregunta');
      return;
    }

    // Validar que todas las preguntas estén completas
    for (const question of questions) {
      if (!question.question.trim()) {
        toast.error('Todas las preguntas deben tener un texto');
        return;
      }
      
      const validOptions = question.options.filter(opt => opt.trim());
      if (validOptions.length < 2) {
        toast.error('Cada pregunta debe tener al menos 2 opciones');
        return;
      }
    }

    setIsSaving(true);
    const saveToast = toast.loading('Guardando quiz...');
    
    try {
      // Simular delay de guardado
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const quizData = {
        title: title.trim(),
        description: description.trim() || undefined,
        questions: questions.map(q => ({
          ...q,
          options: q.options.filter(opt => opt.trim()) // Remover opciones vacías
        }))
      };
      
      onSave(quizData);
      toast.success('Quiz guardado exitosamente', { id: saveToast });
      handleClose();
    } catch (error) {
      toast.error('Error al guardar el quiz', { id: saveToast });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setQuestions([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Crear Quiz" size="xl">
      <div className="space-y-6">
        {/* Quiz Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Título del Quiz *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Quiz sobre Fundamentos de Nutrición"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Descripción (Opcional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descripción del quiz"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Preguntas ({questions.length})
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addQuestion}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agregar Pregunta
            </motion.button>
          </div>

          <AnimatePresence>
            {questions.map((question, questionIndex) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Pregunta {questionIndex + 1}
                  </h4>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeQuestion(question.id)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </motion.button>
                </div>

                {/* Question Text */}
                <div className="space-y-2 mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Pregunta *
                  </label>
                  <textarea
                    value={question.question}
                    onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                    placeholder="Escribe tu pregunta aquí..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Opciones de Respuesta
                    </label>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addOption(question.id)}
                      className="flex items-center gap-1 px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Agregar
                    </motion.button>
                  </div>

                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`correct_${question.id}`}
                        checked={question.correctAnswer === optionIndex}
                        onChange={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                        placeholder={`Opción ${optionIndex + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {question.options.length > 2 && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeOption(question.id, optionIndex)}
                          className="p-1 hover:bg-red-100 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-red-600" />
                        </motion.button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Explanation */}
                <div className="space-y-2 mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Explicación (Opcional)
                  </label>
                  <textarea
                    value={question.explanation || ''}
                    onChange={(e) => updateQuestion(question.id, 'explanation', e.target.value)}
                    placeholder="Explica por qué esta es la respuesta correcta..."
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {questions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No hay preguntas agregadas</p>
              <p className="text-sm">Haz clic en "Agregar Pregunta" para comenzar</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={isSaving || !title.trim() || questions.length === 0}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            {isSaving ? 'Guardando...' : 'Crear Quiz'}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default AddQuizModal;
