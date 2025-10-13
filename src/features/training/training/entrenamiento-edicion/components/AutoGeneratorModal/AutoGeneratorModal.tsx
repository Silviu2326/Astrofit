import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Zap, Target, Calendar, TrendingUp, Users } from 'lucide-react';
import { TrainingGoal, TrainingType, Level, TrainingDay } from '../../types/training.types';
import { PLAN_TEMPLATES, searchTemplates } from '../../constants/planTemplates';

interface AutoGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (trainingDays: TrainingDay[], config: GeneratedPlanConfig) => void;
}

export interface GeneratedPlanConfig {
  goal: TrainingGoal;
  type: TrainingType;
  level: Level;
  daysPerWeek: string[];
  duration: number;
  deloadWeeks: number;
  progressionRate: number;
}

const GOALS: { value: TrainingGoal; label: string; icon: string; description: string }[] = [
  { value: 'muscle', label: 'Hipertrofia', icon: '💪', description: 'Ganar masa muscular' },
  { value: 'strength', label: 'Fuerza', icon: '🏋️', description: 'Aumentar fuerza máxima' },
  { value: 'fat-loss', label: 'Pérdida de grasa', icon: '🔥', description: 'Reducir porcentaje graso' },
  { value: 'endurance', label: 'Resistencia', icon: '🏃', description: 'Mejorar capacidad aeróbica' },
  { value: 'performance', label: 'Rendimiento', icon: '⚡', description: 'Mejorar rendimiento deportivo' },
];

const LEVELS: { value: Level; label: string; description: string }[] = [
  { value: 'beginner', label: 'Principiante', description: '0-1 año de experiencia' },
  { value: 'intermediate', label: 'Intermedio', description: '1-3 años de experiencia' },
  { value: 'advanced', label: 'Avanzado', description: '+3 años de experiencia' },
];

const DAYS_OPTIONS = [
  { value: 3, label: '3 días/semana', days: ['L', 'X', 'V'] },
  { value: 4, label: '4 días/semana', days: ['L', 'M', 'J', 'V'] },
  { value: 5, label: '5 días/semana', days: ['L', 'M', 'X', 'J', 'V'] },
  { value: 6, label: '6 días/semana', days: ['L', 'M', 'X', 'J', 'V', 'S'] },
];

export const AutoGeneratorModal: React.FC<AutoGeneratorModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
}) => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<TrainingGoal>('muscle');
  const [level, setLevel] = useState<Level>('intermediate');
  const [daysPerWeek, setDaysPerWeek] = useState(4);
  const [selectedDays, setSelectedDays] = useState<string[]>(['L', 'M', 'J', 'V']);

  if (!isOpen) return null;

  const handleGenerate = () => {
    // Buscar template que coincida con los criterios
    const matchingTemplates = searchTemplates({ goal, level, daysPerWeek });

    if (matchingTemplates.length > 0) {
      const template = matchingTemplates[0];
      onGenerate(template.trainingDays, {
        goal: template.goal,
        type: template.type,
        level: template.level,
        daysPerWeek: template.daysPerWeek,
        duration: template.duration,
        deloadWeeks: template.deloadWeeks,
        progressionRate: template.progressionRate,
      });
    } else {
      // Si no hay template, usar el primero disponible y adaptarlo
      const fallbackTemplate = PLAN_TEMPLATES[0];
      onGenerate(fallbackTemplate.trainingDays.slice(0, daysPerWeek), {
        goal,
        type: 'hypertrophy',
        level,
        daysPerWeek: selectedDays,
        duration: 8,
        deloadWeeks: 4,
        progressionRate: 2.5,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Generador Automático de Planes</h2>
                <p className="text-blue-100 text-sm">Crea un plan completo en segundos</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? 'bg-white text-blue-600' : 'bg-white/20 text-white/50'
                  }`}
                >
                  {s}
                </div>
                <span className={`text-sm ${step >= s ? 'text-white' : 'text-white/50'}`}>
                  {s === 1 ? 'Objetivo' : s === 2 ? 'Nivel' : 'Frecuencia'}
                </span>
                {s < 3 && <div className="flex-1 h-1 bg-white/20 rounded" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Step 1: Goal */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">¿Cuál es el objetivo principal?</h3>
                <p className="text-gray-600">Selecciona el objetivo que mejor se ajuste a las necesidades del cliente</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GOALS.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGoal(g.value)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      goal === g.value
                        ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl">{g.icon}</span>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{g.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">{g.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Level */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">¿Cuál es el nivel del cliente?</h3>
                <p className="text-gray-600">Esto determinará el volumen e intensidad del plan</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {LEVELS.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLevel(l.value)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      level === l.value
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{l.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">{l.description}</p>
                      </div>
                      <Users className={`w-6 h-6 ${level === l.value ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Frequency */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">¿Cuántos días puede entrenar?</h3>
                <p className="text-gray-600">Selecciona la frecuencia de entrenamiento semanal</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DAYS_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setDaysPerWeek(option.value);
                      setSelectedDays(option.days);
                    }}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      daysPerWeek === option.value
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{option.label}</h4>
                        <div className="flex gap-2 mt-2">
                          {option.days.map((day) => (
                            <span
                              key={day}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                daysPerWeek === option.value
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-600'
                              }`}
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Calendar className={`w-6 h-6 ${daysPerWeek === option.value ? 'text-blue-600' : 'text-gray-400'}`} />
                    </div>
                  </button>
                ))}
              </div>

              {/* Preview */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-4">Resumen del plan</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Objetivo</p>
                    <p className="font-bold text-gray-900">
                      {GOALS.find((g) => g.value === goal)?.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nivel</p>
                    <p className="font-bold text-gray-900">
                      {LEVELS.find((l) => l.value === level)?.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Frecuencia</p>
                    <p className="font-bold text-gray-900">{daysPerWeek} días/semana</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-8 py-4 rounded-b-2xl border-t flex justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Anterior
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Generar Plan
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
