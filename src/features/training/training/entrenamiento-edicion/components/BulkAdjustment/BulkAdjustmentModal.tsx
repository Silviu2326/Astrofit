import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, TrendingUp, TrendingDown, Percent, Plus, Minus, Target } from 'lucide-react';
import { TrainingDay, Exercise } from '../../types/training.types';

interface BulkAdjustmentModalProps {
  show: boolean;
  trainingDays: TrainingDay[];
  onClose: () => void;
  onApply: (adjustedDays: TrainingDay[]) => void;
}

type AdjustmentType = 'sets' | 'reps' | 'weight' | 'rpe' | 'rest';
type AdjustmentMode = 'add' | 'subtract' | 'multiply' | 'set';

interface AdjustmentConfig {
  type: AdjustmentType;
  mode: AdjustmentMode;
  value: number;
  filterMuscle?: string;
  filterExercise?: string;
}

const BulkAdjustmentModal: React.FC<BulkAdjustmentModalProps> = ({
  show,
  trainingDays,
  onClose,
  onApply,
}) => {
  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>('weight');
  const [adjustmentMode, setAdjustmentMode] = useState<AdjustmentMode>('add');
  const [adjustmentValue, setAdjustmentValue] = useState<number>(0);
  const [filterMuscle, setFilterMuscle] = useState<string>('');
  const [filterExercise, setFilterExercise] = useState<string>('');

  // Extraer músculos únicos
  const uniqueMuscles = useMemo(() => {
    const muscles = new Set<string>();
    trainingDays.forEach((day) =>
      day.exercises.forEach((ex) => ex.muscleGroups.forEach((m) => muscles.add(m)))
    );
    return Array.from(muscles).sort();
  }, [trainingDays]);

  // Extraer ejercicios únicos
  const uniqueExercises = useMemo(() => {
    const exercises = new Set<string>();
    trainingDays.forEach((day) => day.exercises.forEach((ex) => exercises.add(ex.name)));
    return Array.from(exercises).sort();
  }, [trainingDays]);

  // Verificar si un ejercicio cumple los filtros
  const matchesFilters = (exercise: Exercise): boolean => {
    if (filterMuscle && !exercise.muscleGroups.includes(filterMuscle)) return false;
    if (filterExercise && exercise.name !== filterExercise) return false;
    return true;
  };

  // Aplicar ajuste a un valor
  const applyAdjustment = (currentValue: number, type: AdjustmentType): number => {
    let newValue = currentValue;

    switch (adjustmentMode) {
      case 'add':
        newValue = currentValue + adjustmentValue;
        break;
      case 'subtract':
        newValue = currentValue - adjustmentValue;
        break;
      case 'multiply':
        newValue = currentValue * adjustmentValue;
        break;
      case 'set':
        newValue = adjustmentValue;
        break;
    }

    // Redondear y limitar según tipo
    if (type === 'weight') {
      newValue = Math.max(0, Math.round(newValue * 4) / 4); // Redondear a 0.25kg
    } else if (type === 'rpe') {
      newValue = Math.max(1, Math.min(10, Math.round(newValue * 2) / 2)); // Entre 1-10, step 0.5
    } else {
      newValue = Math.max(1, Math.round(newValue)); // Enteros positivos
    }

    return newValue;
  };

  // Preview de los cambios
  const preview = useMemo(() => {
    let affected = 0;
    let exampleChanges: Array<{ before: number; after: number }> = [];

    trainingDays.forEach((day) => {
      day.exercises.forEach((exercise) => {
        if (!matchesFilters(exercise)) return;

        const currentValue =
          adjustmentType === 'sets'
            ? exercise.sets
            : adjustmentType === 'reps'
            ? exercise.reps
            : adjustmentType === 'weight'
            ? exercise.weight || 0
            : adjustmentType === 'rpe'
            ? exercise.rpe || 0
            : exercise.rest || 0;

        if (
          (adjustmentType === 'weight' && !exercise.weight) ||
          (adjustmentType === 'rpe' && !exercise.rpe)
        ) {
          return; // Skip if no value
        }

        const newValue = applyAdjustment(currentValue, adjustmentType);

        if (newValue !== currentValue) {
          affected++;
          if (exampleChanges.length < 3) {
            exampleChanges.push({ before: currentValue, after: newValue });
          }
        }
      });
    });

    return { affected, exampleChanges };
  }, [trainingDays, adjustmentType, adjustmentMode, adjustmentValue, filterMuscle, filterExercise]);

  // Aplicar ajustes
  const handleApply = () => {
    const adjustedDays = JSON.parse(JSON.stringify(trainingDays)) as TrainingDay[];

    adjustedDays.forEach((day) => {
      day.exercises.forEach((exercise) => {
        if (!matchesFilters(exercise)) return;

        switch (adjustmentType) {
          case 'sets':
            exercise.sets = applyAdjustment(exercise.sets, adjustmentType);
            break;
          case 'reps':
            exercise.reps = applyAdjustment(exercise.reps, adjustmentType);
            break;
          case 'weight':
            if (exercise.weight) {
              exercise.weight = applyAdjustment(exercise.weight, adjustmentType);
            }
            break;
          case 'rpe':
            if (exercise.rpe) {
              exercise.rpe = applyAdjustment(exercise.rpe, adjustmentType);
            }
            break;
          case 'rest':
            if (exercise.rest) {
              exercise.rest = applyAdjustment(exercise.rest, adjustmentType);
            }
            break;
        }
      });
    });

    onApply(adjustedDays);
    onClose();
  };

  const getTypeIcon = (type: AdjustmentType) => {
    switch (type) {
      case 'weight':
        return '🏋️';
      case 'sets':
        return '📊';
      case 'reps':
        return '🔢';
      case 'rpe':
        return '💪';
      case 'rest':
        return '⏱️';
    }
  };

  const getTypeUnit = (type: AdjustmentType) => {
    switch (type) {
      case 'weight':
        return 'kg';
      case 'sets':
        return 'series';
      case 'reps':
        return 'reps';
      case 'rpe':
        return 'RPE';
      case 'rest':
        return 'seg';
    }
  };

  const getModeIcon = (mode: AdjustmentMode) => {
    switch (mode) {
      case 'add':
        return <Plus className="w-4 h-4" />;
      case 'subtract':
        return <Minus className="w-4 h-4" />;
      case 'multiply':
        return <Percent className="w-4 h-4" />;
      case 'set':
        return <Target className="w-4 h-4" />;
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                <Wand2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900">Ajuste Masivo de Parámetros</h3>
                <p className="text-gray-600">Modifica múltiples ejercicios simultáneamente</p>
              </div>
            </div>

            {/* Selección de Parámetro */}
            <div className="mb-6">
              <label className="text-sm font-bold text-gray-700 mb-3 block">Parámetro a Ajustar</label>
              <div className="grid grid-cols-5 gap-2">
                {(['weight', 'sets', 'reps', 'rpe', 'rest'] as AdjustmentType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setAdjustmentType(type)}
                    className={`p-3 rounded-lg border-2 font-bold transition-all ${
                      adjustmentType === type
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">{getTypeIcon(type)}</div>
                    <div className="text-xs capitalize">{type}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Modo de Ajuste */}
            <div className="mb-6">
              <label className="text-sm font-bold text-gray-700 mb-3 block">Modo de Ajuste</label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { mode: 'add' as AdjustmentMode, label: 'Sumar', icon: <Plus className="w-4 h-4" /> },
                  {
                    mode: 'subtract' as AdjustmentMode,
                    label: 'Restar',
                    icon: <Minus className="w-4 h-4" />,
                  },
                  {
                    mode: 'multiply' as AdjustmentMode,
                    label: 'Multiplicar',
                    icon: <Percent className="w-4 h-4" />,
                  },
                  {
                    mode: 'set' as AdjustmentMode,
                    label: 'Establecer',
                    icon: <Target className="w-4 h-4" />,
                  },
                ].map(({ mode, label, icon }) => (
                  <button
                    key={mode}
                    onClick={() => setAdjustmentMode(mode)}
                    className={`p-3 rounded-lg border-2 font-bold transition-all flex items-center justify-center gap-2 ${
                      adjustmentMode === mode
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    {icon}
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Valor del Ajuste */}
            <div className="mb-6">
              <label className="text-sm font-bold text-gray-700 mb-3 block">
                Valor {adjustmentMode === 'multiply' ? '(Multiplicador)' : `(${getTypeUnit(adjustmentType)})`}
              </label>
              <input
                type="number"
                step={
                  adjustmentType === 'weight'
                    ? '0.25'
                    : adjustmentType === 'rpe'
                    ? '0.5'
                    : adjustmentMode === 'multiply'
                    ? '0.1'
                    : '1'
                }
                value={adjustmentValue}
                onChange={(e) => setAdjustmentValue(parseFloat(e.target.value) || 0)}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-3xl font-black text-center focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Filtros */}
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Filtrar por Músculo</label>
                <select
                  value={filterMuscle}
                  onChange={(e) => setFilterMuscle(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Todos los músculos</option>
                  {uniqueMuscles.map((muscle) => (
                    <option key={muscle} value={muscle}>
                      {muscle}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">
                  Filtrar por Ejercicio
                </label>
                <select
                  value={filterExercise}
                  onChange={(e) => setFilterExercise(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Todos los ejercicios</option>
                  {uniqueExercises.map((exercise) => (
                    <option key={exercise} value={exercise}>
                      {exercise}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preview */}
            <div className="mb-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                👁️ Vista Previa
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">Ejercicios afectados:</span>
                  <span className="text-lg font-black text-blue-600">{preview.affected}</span>
                </div>
                {preview.exampleChanges.length > 0 && (
                  <div>
                    <p className="text-xs text-blue-700 mb-2">Ejemplos de cambios:</p>
                    {preview.exampleChanges.map((change, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm bg-white p-2 rounded border border-blue-200"
                      >
                        <span className="font-semibold text-gray-600">
                          {change.before} {getTypeUnit(adjustmentType)}
                        </span>
                        <span className="text-blue-600">→</span>
                        <span className="font-bold text-blue-600">
                          {change.after} {getTypeUnit(adjustmentType)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Casos de Uso Rápidos */}
            <div className="mb-6 p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <p className="text-sm font-semibold text-green-900 mb-2">⚡ Casos de Uso Rápidos:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setAdjustmentType('weight');
                    setAdjustmentMode('add');
                    setAdjustmentValue(2.5);
                  }}
                  className="text-left p-2 bg-white rounded border border-green-200 hover:bg-green-50 transition-all text-xs"
                >
                  <div className="font-bold text-green-800">+2.5kg a todos los pesos</div>
                  <div className="text-gray-600">Progresión estándar</div>
                </button>
                <button
                  onClick={() => {
                    setAdjustmentType('weight');
                    setAdjustmentMode('multiply');
                    setAdjustmentValue(0.7);
                  }}
                  className="text-left p-2 bg-white rounded border border-green-200 hover:bg-green-50 transition-all text-xs"
                >
                  <div className="font-bold text-green-800">70% del peso</div>
                  <div className="text-gray-600">Semana de descarga</div>
                </button>
                <button
                  onClick={() => {
                    setAdjustmentType('rpe');
                    setAdjustmentMode('subtract');
                    setAdjustmentValue(1);
                  }}
                  className="text-left p-2 bg-white rounded border border-green-200 hover:bg-green-50 transition-all text-xs"
                >
                  <div className="font-bold text-green-800">-1 RPE a todos</div>
                  <div className="text-gray-600">Reducir intensidad</div>
                </button>
                <button
                  onClick={() => {
                    setAdjustmentType('rest');
                    setAdjustmentMode('set');
                    setAdjustmentValue(90);
                  }}
                  className="text-left p-2 bg-white rounded border border-green-200 hover:bg-green-50 transition-all text-xs"
                >
                  <div className="font-bold text-green-800">90 seg de descanso</div>
                  <div className="text-gray-600">Estandarizar descansos</div>
                </button>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={handleApply}
                disabled={preview.affected === 0}
                className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all ${
                  preview.affected > 0
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Aplicar a {preview.affected} Ejercicios
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BulkAdjustmentModal;
