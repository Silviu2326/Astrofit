import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, PauseCircle, CheckCircle, Timer, TrendingUp, ArrowRight, SkipForward, Clock, Award, Target } from 'lucide-react';

interface ExerciseConfig {
  exerciseId: string;
  sets: number;
  reps: string;
  rest: number;
  tempo?: string;
  rpe?: number;
  weight?: number;
  history?: any[];
}

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  image: string;
}

interface ModoEjecucionProps {
  sessionName: string;
  exercises: ExerciseConfig[];
  exerciseDatabase: Exercise[];
  onComplete: (results: SessionResult[]) => void;
  onClose: () => void;
}

interface SetResult {
  reps: number;
  weight: number;
  rpe?: number;
  completed: boolean;
}

interface ExerciseResult {
  exerciseId: string;
  sets: SetResult[];
}

interface SessionResult {
  exerciseId: string;
  sets: SetResult[];
  notes?: string;
}

const ModoEjecucion: React.FC<ModoEjecucionProps> = ({
  sessionName,
  exercises,
  exerciseDatabase,
  onComplete,
  onClose
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>(
    exercises.map(ex => ({
      exerciseId: ex.exerciseId,
      sets: Array(ex.sets).fill(null).map(() => ({
        reps: parseInt(ex.reps.split('-')[0]) || 10,
        weight: ex.weight || 0,
        rpe: ex.rpe || 7,
        completed: false
      }))
    }))
  );

  const currentExercise = exercises[currentExerciseIndex];
  const currentExerciseData = exerciseDatabase.find(e => e.id === currentExercise?.exerciseId);
  const currentResult = results[currentExerciseIndex];
  const totalExercises = exercises.length;
  const totalSets = exercises.reduce((sum, ex) => sum + ex.sets, 0);
  const completedSets = results.reduce((sum, ex) => sum + ex.sets.filter(s => s.completed).length, 0);

  // Timer for elapsed session time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  // Rest timer
  useEffect(() => {
    if (!isResting || restTimeRemaining <= 0) return;

    const interval = setInterval(() => {
      setRestTimeRemaining(prev => {
        if (prev <= 1) {
          setIsResting(false);
          // Play notification sound (could be implemented)
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isResting, restTimeRemaining]);

  const handleCompleteSet = () => {
    const newResults = [...results];
    newResults[currentExerciseIndex].sets[currentSet].completed = true;
    setResults(newResults);

    // Check if all sets for current exercise are done
    if (currentSet + 1 >= currentExercise.sets) {
      // Move to next exercise
      if (currentExerciseIndex + 1 < exercises.length) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(0);
        setIsResting(false);
      } else {
        // Session complete!
        handleFinishSession();
      }
    } else {
      // Move to next set and start rest
      setCurrentSet(currentSet + 1);
      setRestTimeRemaining(currentExercise.rest);
      setIsResting(true);
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTimeRemaining(0);
  };

  const handleUpdateSetData = (field: 'reps' | 'weight' | 'rpe', value: number) => {
    const newResults = [...results];
    newResults[currentExerciseIndex].sets[currentSet][field] = value;
    setResults(newResults);
  };

  const handleFinishSession = () => {
    const sessionResults: SessionResult[] = results.map(r => ({
      exerciseId: r.exerciseId,
      sets: r.sets,
      notes: ''
    }));
    onComplete(sessionResults);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (completedSets / totalSets) * 100;

  const getLastSessionData = () => {
    if (!currentExercise?.history || currentExercise.history.length === 0) return null;
    const last = currentExercise.history[0];
    return {
      weight: last.weight,
      reps: last.reps,
      rpe: last.rpe
    };
  };

  const lastSession = getLastSessionData();

  if (!currentExercise || !currentExerciseData) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">{sessionName}</h2>
              <p className="text-green-100 text-sm">Sesión en progreso</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progreso de la sesión</span>
              <span className="font-bold">{completedSets}/{totalSets} series</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>

          {/* Session Timer */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Tiempo: {formatTime(elapsedTime)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Ejercicio {currentExerciseIndex + 1}/{totalExercises}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {isResting ? (
              // Rest Screen
              <motion.div
                key="rest"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Timer className="w-12 h-12 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-2">Descansando</h3>
                <p className="text-gray-600 mb-8">Prepárate para la siguiente serie</p>

                <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
                  {formatTime(restTimeRemaining)}
                </div>

                <button
                  onClick={handleSkipRest}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                >
                  <SkipForward className="w-5 h-5" />
                  Saltar descanso
                </button>
              </motion.div>
            ) : (
              // Exercise Screen
              <motion.div
                key="exercise"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Exercise Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {currentExerciseData.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{currentExerciseData.name}</h3>
                    <p className="text-gray-600">{currentExerciseData.muscleGroup}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        Serie {currentSet + 1}/{currentExercise.sets}
                      </span>
                      <span className="text-sm text-gray-500">
                        Descanso: {currentExercise.rest}s
                      </span>
                    </div>
                  </div>
                </div>

                {/* Last Session Comparison */}
                {lastSession && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-900">Última sesión</span>
                    </div>
                    <div className="flex gap-4 text-sm text-blue-800">
                      <span>Peso: <strong>{lastSession.weight}kg</strong></span>
                      <span>Reps: <strong>{lastSession.reps}</strong></span>
                      {lastSession.rpe && <span>RPE: <strong>{lastSession.rpe}</strong></span>}
                    </div>
                  </div>
                )}

                {/* Set Input */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="text-xs text-gray-600 mb-2 block font-medium">Peso (kg)</label>
                    <input
                      type="number"
                      value={currentResult.sets[currentSet].weight}
                      onChange={(e) => handleUpdateSetData('weight', parseFloat(e.target.value) || 0)}
                      className="w-full text-3xl font-bold text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 p-0"
                      step="2.5"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="text-xs text-gray-600 mb-2 block font-medium">Repeticiones</label>
                    <input
                      type="number"
                      value={currentResult.sets[currentSet].reps}
                      onChange={(e) => handleUpdateSetData('reps', parseInt(e.target.value) || 0)}
                      className="w-full text-3xl font-bold text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 p-0"
                    />
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <label className="text-xs text-gray-600 mb-2 block font-medium">RPE</label>
                    <input
                      type="number"
                      value={currentResult.sets[currentSet].rpe}
                      onChange={(e) => handleUpdateSetData('rpe', parseInt(e.target.value) || 7)}
                      className="w-full text-3xl font-bold text-gray-900 bg-transparent border-0 focus:outline-none focus:ring-0 p-0"
                      min="1"
                      max="10"
                    />
                  </div>
                </div>

                {/* RPE Scale Reference */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 mb-6">
                  <p className="text-xs text-purple-900 font-medium mb-1">Escala RPE (esfuerzo percibido):</p>
                  <div className="grid grid-cols-5 gap-1 text-xs text-purple-800">
                    <span>1-3: Muy fácil</span>
                    <span>4-6: Moderado</span>
                    <span>7-8: Difícil</span>
                    <span>9: Muy difícil</span>
                    <span>10: Máximo</span>
                  </div>
                </div>

                {/* Complete Set Button */}
                <button
                  onClick={handleCompleteSet}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                >
                  <CheckCircle className="w-6 h-6" />
                  Completar Serie
                  {currentSet + 1 < currentExercise.sets ? (
                    <span className="opacity-80">(Iniciar descanso)</span>
                  ) : currentExerciseIndex + 1 < exercises.length ? (
                    <ArrowRight className="w-5 h-5" />
                  ) : (
                    <Award className="w-5 h-5" />
                  )}
                </button>

                {/* Sets Progress */}
                <div className="mt-6 flex gap-2">
                  {Array(currentExercise.sets).fill(null).map((_, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        currentResult.sets[idx].completed
                          ? 'bg-green-500'
                          : idx === currentSet
                          ? 'bg-yellow-500'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>💡 Tip: Mantén la forma correcta en cada repetición</span>
            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Cancelar sesión
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModoEjecucion;
