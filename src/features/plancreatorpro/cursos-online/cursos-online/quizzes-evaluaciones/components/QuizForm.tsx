import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Plus, 
  Trash2, 
  Clock, 
  HelpCircle, 
  FileText,
  Settings
} from 'lucide-react';

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
  duracion: number; // en minutos
  intentosPermitidos: number;
  puntuacionMinima: number;
  preguntas: QuizQuestion[];
  estado: 'borrador' | 'activo' | 'pausado';
  fechaInicio?: string;
  fechaFin?: string;
}

interface QuizFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (quizData: QuizFormData) => void;
  initialData?: QuizFormData | null;
  isLoading?: boolean;
}

const QuizForm: React.FC<QuizFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<QuizFormData>({
    titulo: '',
    descripcion: '',
    duracion: 30,
    intentosPermitidos: 3,
    puntuacionMinima: 70,
    preguntas: [],
    estado: 'borrador'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        titulo: '',
        descripcion: '',
        duracion: 30,
        intentosPermitidos: 3,
        puntuacionMinima: 70,
        preguntas: [],
        estado: 'borrador'
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es requerido';
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida';
    }

    if (formData.duracion <= 0) {
      newErrors.duracion = 'La duración debe ser mayor a 0';
    }

    if (formData.intentosPermitidos <= 0) {
      newErrors.intentosPermitidos = 'Los intentos deben ser mayor a 0';
    }

    if (formData.puntuacionMinima < 0 || formData.puntuacionMinima > 100) {
      newErrors.puntuacionMinima = 'La puntuación mínima debe estar entre 0 y 100';
    }

    if (formData.preguntas.length === 0) {
      newErrors.preguntas = 'Debe agregar al menos una pregunta';
    }

    // Validar cada pregunta
    formData.preguntas.forEach((pregunta, index) => {
      if (!pregunta.pregunta.trim()) {
        newErrors[`pregunta_${index}`] = 'La pregunta no puede estar vacía';
      }
      if (pregunta.puntos <= 0) {
        newErrors[`puntos_${index}`] = 'Los puntos deben ser mayor a 0';
      }
      if (pregunta.tipo === 'opcion-multiple' && (!pregunta.opciones || pregunta.opciones.length < 2)) {
        newErrors[`opciones_${index}`] = 'Debe agregar al menos 2 opciones';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: Date.now().toString(),
      pregunta: '',
      tipo: 'opcion-multiple',
      opciones: ['', ''],
      respuestaCorrecta: '',
      puntos: 10
    };

    setFormData(prev => ({
      ...prev,
      preguntas: [...prev.preguntas, newQuestion]
    }));
  };

  const removeQuestion = (questionId: string) => {
    setFormData(prev => ({
      ...prev,
      preguntas: prev.preguntas.filter(q => q.id !== questionId)
    }));
  };

  const updateQuestion = (questionId: string, field: keyof QuizQuestion, value: any) => {
    setFormData(prev => ({
      ...prev,
      preguntas: prev.preguntas.map(q => 
        q.id === questionId ? { ...q, [field]: value } : q
      )
    }));
  };

  const addOption = (questionId: string) => {
    setFormData(prev => ({
      ...prev,
      preguntas: prev.preguntas.map(q => 
        q.id === questionId 
          ? { ...q, opciones: [...(q.opciones || []), ''] }
          : q
      )
    }));
  };

  const removeOption = (questionId: string, optionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      preguntas: prev.preguntas.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              opciones: q.opciones?.filter((_, index) => index !== optionIndex) || []
            }
          : q
      )
    }));
  };

  const updateOption = (questionId: string, optionIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      preguntas: prev.preguntas.map(q => 
        q.id === questionId 
          ? { 
              ...q, 
              opciones: q.opciones?.map((opt, index) => 
                index === optionIndex ? value : opt
              ) || []
            }
          : q
      )
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full mx-4 max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {initialData ? 'Editar Quiz' : 'Crear Nuevo Quiz'}
              </h2>
              <p className="text-sm text-gray-600">
                {initialData ? 'Modifica los datos del quiz' : 'Configura tu nuevo quiz de evaluación'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Información Básica */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Información Básica</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del Quiz *
                  </label>
                  <input
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.titulo ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    placeholder="Ej: Quiz de React Fundamentals"
                    disabled={isLoading}
                  />
                  {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.value as any }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    disabled={isLoading}
                  >
                    <option value="borrador">Borrador</option>
                    <option value="activo">Activo</option>
                    <option value="pausado">Pausado</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.descripcion ? 'border-red-300' : 'border-gray-300'
                  } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="Describe el contenido y objetivos del quiz..."
                  disabled={isLoading}
                />
                {errors.descripcion && <p className="text-red-500 text-sm mt-1">{errors.descripcion}</p>}
              </div>
            </div>

            {/* Configuración */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-900">Configuración</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duración (minutos) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.duracion}
                    onChange={(e) => setFormData(prev => ({ ...prev, duracion: parseInt(e.target.value) || 0 }))}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.duracion ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    disabled={isLoading}
                  />
                  {errors.duracion && <p className="text-red-500 text-sm mt-1">{errors.duracion}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intentos Permitidos *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.intentosPermitidos}
                    onChange={(e) => setFormData(prev => ({ ...prev, intentosPermitidos: parseInt(e.target.value) || 0 }))}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.intentosPermitidos ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    disabled={isLoading}
                  />
                  {errors.intentosPermitidos && <p className="text-red-500 text-sm mt-1">{errors.intentosPermitidos}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Puntuación Mínima (%) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.puntuacionMinima}
                    onChange={(e) => setFormData(prev => ({ ...prev, puntuacionMinima: parseInt(e.target.value) || 0 }))}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.puntuacionMinima ? 'border-red-300' : 'border-gray-300'
                    } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                    disabled={isLoading}
                  />
                  {errors.puntuacionMinima && <p className="text-red-500 text-sm mt-1">{errors.puntuacionMinima}</p>}
                </div>
              </div>
            </div>

            {/* Preguntas */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Preguntas</h3>
                </div>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  disabled={isLoading}
                >
                  <Plus className="w-4 h-4" />
                  Agregar Pregunta
                </button>
              </div>

              {errors.preguntas && <p className="text-red-500 text-sm mb-4">{errors.preguntas}</p>}

              <div className="space-y-4">
                {formData.preguntas.map((pregunta, index) => (
                  <div key={pregunta.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Pregunta {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeQuestion(pregunta.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pregunta *
                        </label>
                        <input
                          type="text"
                          value={pregunta.pregunta}
                          onChange={(e) => updateQuestion(pregunta.id, 'pregunta', e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors[`pregunta_${index}`] ? 'border-red-300' : 'border-gray-300'
                          } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                          placeholder="Escribe tu pregunta aquí..."
                          disabled={isLoading}
                        />
                        {errors[`pregunta_${index}`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`pregunta_${index}`]}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tipo de Pregunta
                          </label>
                          <select
                            value={pregunta.tipo}
                            onChange={(e) => updateQuestion(pregunta.id, 'tipo', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            disabled={isLoading}
                          >
                            <option value="opcion-multiple">Opción Múltiple</option>
                            <option value="verdadero-falso">Verdadero/Falso</option>
                            <option value="texto-libre">Texto Libre</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Puntos *
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={pregunta.puntos}
                            onChange={(e) => updateQuestion(pregunta.id, 'puntos', parseInt(e.target.value) || 0)}
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors[`puntos_${index}`] ? 'border-red-300' : 'border-gray-300'
                            } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                            disabled={isLoading}
                          />
                          {errors[`puntos_${index}`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`puntos_${index}`]}</p>
                          )}
                        </div>
                      </div>

                      {/* Opciones para opción múltiple */}
                      {pregunta.tipo === 'opcion-multiple' && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Opciones *
                            </label>
                            <button
                              type="button"
                              onClick={() => addOption(pregunta.id)}
                              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                              disabled={isLoading}
                            >
                              + Agregar Opción
                            </button>
                          </div>
                          
                          <div className="space-y-2">
                            {pregunta.opciones?.map((opcion, optionIndex) => (
                              <div key={optionIndex} className="flex items-center gap-2">
                                <input
                                  type="radio"
                                  name={`respuesta_${pregunta.id}`}
                                  value={optionIndex}
                                  checked={pregunta.respuestaCorrecta === optionIndex.toString()}
                                  onChange={(e) => updateQuestion(pregunta.id, 'respuestaCorrecta', e.target.value)}
                                  className="text-indigo-600"
                                  disabled={isLoading}
                                />
                                <input
                                  type="text"
                                  value={opcion}
                                  onChange={(e) => updateOption(pregunta.id, optionIndex, e.target.value)}
                                  className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                  placeholder={`Opción ${optionIndex + 1}`}
                                  disabled={isLoading}
                                />
                                {pregunta.opciones && pregunta.opciones.length > 2 && (
                                  <button
                                    type="button"
                                    onClick={() => removeOption(pregunta.id, optionIndex)}
                                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                                    disabled={isLoading}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          
                          {errors[`opciones_${index}`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`opciones_${index}`]}</p>
                          )}
                        </div>
                      )}

                      {/* Respuesta para verdadero/falso */}
                      {pregunta.tipo === 'verdadero-falso' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Respuesta Correcta
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`vf_${pregunta.id}`}
                                value="true"
                                checked={pregunta.respuestaCorrecta === true}
                                onChange={() => updateQuestion(pregunta.id, 'respuestaCorrecta', true)}
                                className="text-indigo-600"
                                disabled={isLoading}
                              />
                              Verdadero
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`vf_${pregunta.id}`}
                                value="false"
                                checked={pregunta.respuestaCorrecta === false}
                                onChange={() => updateQuestion(pregunta.id, 'respuestaCorrecta', false)}
                                className="text-indigo-600"
                                disabled={isLoading}
                              />
                              Falso
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {initialData ? 'Guardar Cambios' : 'Crear Quiz'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default QuizForm;
