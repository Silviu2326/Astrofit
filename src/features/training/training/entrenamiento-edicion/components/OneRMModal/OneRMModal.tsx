import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Target, TrendingUp, Calculator, Save, Edit2 } from 'lucide-react';
import { ExerciseConfig } from '../../types/training.types';

interface OneRMData {
  exerciseId: string;
  exerciseName: string;
  oneRM: number;
  testedDate: string;
  method: 'tested' | 'calculated';
}

interface OneRMModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercises: { id: string; name: string }[];
  existingData: Record<string, OneRMData>;
  onSave: (data: Record<string, OneRMData>) => void;
  onApplyPercentages: (exerciseId: string, percentage: number) => void;
}

// Fórmulas para calcular 1RM
const calculate1RM = (weight: number, reps: number, formula: 'epley' | 'brzycki' | 'lander'): number => {
  switch (formula) {
    case 'epley':
      return weight * (1 + reps / 30);
    case 'brzycki':
      return weight * (36 / (37 - reps));
    case 'lander':
      return (100 * weight) / (101.3 - 2.67123 * reps);
    default:
      return weight;
  }
};

// Porcentajes comunes de entrenamiento
const COMMON_PERCENTAGES = [
  { label: '50% - Calentamiento', value: 50 },
  { label: '60% - Técnica', value: 60 },
  { label: '70% - Volumen', value: 70 },
  { label: '75% - Hipertrofia', value: 75 },
  { label: '80% - Fuerza', value: 80 },
  { label: '85% - Fuerza Alta', value: 85 },
  { label: '90% - Peaking', value: 90 },
  { label: '95% - Máximos', value: 95 },
];

export const OneRMModal: React.FC<OneRMModalProps> = ({
  isOpen,
  onClose,
  exercises,
  existingData,
  onSave,
  onApplyPercentages,
}) => {
  const [rmData, setRMData] = useState<Record<string, OneRMData>>(existingData);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [calculatorMode, setCalculatorMode] = useState<'test' | 'calculate'>('test');

  // Calculator state
  const [calcWeight, setCalcWeight] = useState(100);
  const [calcReps, setCalcReps] = useState(5);
  const [calcFormula, setCalcFormula] = useState<'epley' | 'brzycki' | 'lander'>('epley');

  // Test mode state
  const [testWeight, setTestWeight] = useState(100);

  if (!isOpen) return null;

  const handleCalculate = () => {
    if (!selectedExercise) return;

    const oneRM = calculate1RM(calcWeight, calcReps, calcFormula);
    const exercise = exercises.find(e => e.id === selectedExercise);

    setRMData({
      ...rmData,
      [selectedExercise]: {
        exerciseId: selectedExercise,
        exerciseName: exercise?.name || '',
        oneRM: Math.round(oneRM * 10) / 10,
        testedDate: new Date().toISOString(),
        method: 'calculated',
      },
    });
  };

  const handleTest = () => {
    if (!selectedExercise) return;

    const exercise = exercises.find(e => e.id === selectedExercise);

    setRMData({
      ...rmData,
      [selectedExercise]: {
        exerciseId: selectedExercise,
        exerciseName: exercise?.name || '',
        oneRM: testWeight,
        testedDate: new Date().toISOString(),
        method: 'tested',
      },
    });
  };

  const handleSave = () => {
    onSave(rmData);
    onClose();
  };

  const getPercentageWeight = (exerciseId: string, percentage: number): number => {
    const data = rmData[exerciseId];
    if (!data) return 0;
    return Math.round((data.oneRM * percentage / 100) * 4) / 4; // Round to 0.25kg
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Test de 1RM y Programación</h2>
                <p className="text-orange-100 text-sm">Registra tus máximos y programa por porcentajes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-12 gap-6 p-6">
            {/* Left: Exercise List */}
            <div className="col-span-4 space-y-3">
              <h3 className="font-bold text-gray-900 mb-3">Ejercicios</h3>
              <div className="space-y-2">
                {exercises.map((exercise) => {
                  const hasData = rmData[exercise.id];
                  return (
                    <button
                      key={exercise.id}
                      onClick={() => setSelectedExercise(exercise.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        selectedExercise === exercise.id
                          ? 'border-orange-500 bg-orange-50'
                          : hasData
                          ? 'border-green-200 bg-green-50 hover:border-green-300'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{exercise.name}</div>
                          {hasData && (
                            <div className="text-xs text-gray-600 mt-1">
                              1RM: {rmData[exercise.id].oneRM}kg
                            </div>
                          )}
                        </div>
                        {hasData && (
                          <div className="text-green-600">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Calculator/Display */}
            <div className="col-span-8">
              {selectedExercise ? (
                <div className="space-y-6">
                  {/* Current 1RM Display */}
                  {rmData[selectedExercise] && (
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {exercises.find(e => e.id === selectedExercise)?.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {rmData[selectedExercise].method === 'tested' ? 'Test directo' : 'Calculado'} -
                            {' '}{new Date(rmData[selectedExercise].testedDate).toLocaleDateString('es-ES')}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-4xl font-bold text-orange-600">
                            {rmData[selectedExercise].oneRM}kg
                          </div>
                          <div className="text-sm text-gray-600">1 RM</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mode Selector */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCalculatorMode('test')}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                        calculatorMode === 'test'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Target className="w-5 h-5" />
                        Test Directo
                      </div>
                    </button>
                    <button
                      onClick={() => setCalculatorMode('calculate')}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all font-medium ${
                        calculatorMode === 'calculate'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Calculator className="w-5 h-5" />
                        Calcular de Reps
                      </div>
                    </button>
                  </div>

                  {/* Test Mode */}
                  {calculatorMode === 'test' && (
                    <div className="border-2 border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Registrar Test de 1RM</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Peso máximo levantado (kg)
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            value={testWeight}
                            onChange={(e) => setTestWeight(parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-2xl font-bold text-center focus:border-orange-500 focus:outline-none"
                          />
                        </div>
                        <button
                          onClick={handleTest}
                          className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Save className="w-5 h-5" />
                          Guardar 1RM
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Calculate Mode */}
                  {calculatorMode === 'calculate' && (
                    <div className="border-2 border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Calcular 1RM desde Repeticiones</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Peso (kg)
                            </label>
                            <input
                              type="number"
                              step="0.5"
                              value={calcWeight}
                              onChange={(e) => setCalcWeight(parseFloat(e.target.value) || 0)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-xl font-bold text-center focus:border-orange-500 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                              Repeticiones
                            </label>
                            <input
                              type="number"
                              min="1"
                              max="12"
                              value={calcReps}
                              onChange={(e) => setCalcReps(parseInt(e.target.value) || 1)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-xl font-bold text-center focus:border-orange-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">
                            Fórmula
                          </label>
                          <select
                            value={calcFormula}
                            onChange={(e) => setCalcFormula(e.target.value as any)}
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                          >
                            <option value="epley">Epley (más común)</option>
                            <option value="brzycki">Brzycki</option>
                            <option value="lander">Lander</option>
                          </select>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">1RM Estimado:</div>
                          <div className="text-3xl font-bold text-orange-600">
                            {calculate1RM(calcWeight, calcReps, calcFormula).toFixed(1)}kg
                          </div>
                        </div>

                        <button
                          onClick={handleCalculate}
                          className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                          <Save className="w-5 h-5" />
                          Guardar 1RM Calculado
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Percentage Table */}
                  {rmData[selectedExercise] && (
                    <div className="border-2 border-gray-200 rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">Tabla de Porcentajes</h4>
                      <div className="space-y-2">
                        {COMMON_PERCENTAGES.map((item) => {
                          const weight = getPercentageWeight(selectedExercise, item.value);
                          return (
                            <div
                              key={item.value}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
                            >
                              <div>
                                <div className="font-bold text-gray-900">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.value}% de 1RM</div>
                              </div>
                              <div className="text-xl font-bold text-orange-600">{weight}kg</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <div className="text-center">
                    <Target className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>Selecciona un ejercicio para registrar su 1RM</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Guardar Todo
          </button>
        </div>
      </motion.div>
    </div>
  );
};
