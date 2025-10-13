import React, { useState, useEffect } from 'react';
import { Play, Pause, CheckCircle, X, ChevronLeft, ChevronRight, Timer, Video, AlertCircle } from 'lucide-react';
import { ClientSessionView } from '../../types/session.types';

interface ClientWorkoutViewProps {
  session: ClientSessionView;
  onComplete: () => void;
  onCancel: () => void;
  onUpdateExercise: (exerciseId: string, setData: any) => void;
}

const ClientWorkoutView: React.FC<ClientWorkoutViewProps> = ({
  session,
  onComplete,
  onCancel,
  onUpdateExercise,
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [completedSets, setCompletedSets] = useState<any[]>([]);

  const currentExercise = session.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / session.exercises.length) * 100;

  // Rest Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const handleCompleteSet = (reps: number, weight: number, rpe: number) => {
    const setData = {
      setNumber: currentSet,
      reps,
      weight,
      rpe,
      timestamp: new Date().toISOString(),
    };

    setCompletedSets([...completedSets, setData]);
    onUpdateExercise(currentExercise.id, setData);

    // Si completó todas las series, pasar al siguiente ejercicio
    if (currentSet >= currentExercise.sets) {
      if (currentExerciseIndex < session.exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSet(1);
        setCompletedSets([]);
      } else {
        // Sesión completada
        onComplete();
      }
    } else {
      // Iniciar descanso
      setCurrentSet(currentSet + 1);
      setRestTimer(currentExercise.rest);
      setIsResting(true);
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTimer(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onCancel}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <X className="w-5 h-5" />
              Salir
            </button>
            <h1 className="text-xl font-black text-gray-900">{session.name}</h1>
            <div className="text-sm text-gray-600">
              {currentExerciseIndex + 1}/{session.exercises.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-orange-500 to-pink-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Rest Timer Overlay */}
        {isResting && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-4 text-center">
            <Timer className="w-16 h-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-4xl font-black text-gray-900 mb-2">Descansando</h2>
            <div className="text-6xl font-black text-orange-600 mb-6">{formatTime(restTimer)}</div>
            <button
              onClick={handleSkipRest}
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Saltar Descanso
            </button>
          </div>
        )}

        {/* Current Exercise */}
        {!isResting && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            {/* Exercise Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl">{currentExercise.image}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-black text-gray-900">{currentExercise.name}</h2>
                <p className="text-gray-600">
                  Serie {currentSet} de {currentExercise.sets}
                </p>
              </div>
            </div>

            {/* Video/Tutorial */}
            {currentExercise.videoUrl && (
              <div className="mb-4">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all font-bold">
                  <Video className="w-5 h-5" />
                  Ver Demostración
                </button>
              </div>
            )}

            {/* Prescription */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                <div className="text-3xl font-black text-orange-600">{currentExercise.sets}</div>
                <div className="text-sm text-gray-600 font-semibold">Series</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div className="text-3xl font-black text-blue-600">{currentExercise.reps}</div>
                <div className="text-sm text-gray-600 font-semibold">Reps</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="text-3xl font-black text-green-600">{currentExercise.weight || '—'}</div>
                <div className="text-sm text-gray-600 font-semibold">kg</div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Descanso</div>
                <div className="font-bold text-gray-900">{currentExercise.rest}s</div>
              </div>
              {currentExercise.rpe && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">RPE Objetivo</div>
                  <div className="font-bold text-gray-900">{currentExercise.rpe}/10</div>
                </div>
              )}
            </div>

            {/* Trainer Notes */}
            {currentExercise.notes && (
              <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200 mb-6">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-yellow-900 mb-1">Nota del entrenador:</p>
                    <p className="text-sm text-yellow-800">{currentExercise.notes}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Entry Form */}
            <QuickSetEntry
              targetReps={currentExercise.reps}
              targetWeight={currentExercise.weight}
              targetRpe={currentExercise.rpe}
              onComplete={handleCompleteSet}
            />

            {/* Completed Sets */}
            {completedSets.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-bold text-gray-700 mb-3">Series Completadas</h3>
                <div className="space-y-2">
                  {completedSets.map((set, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-bold text-gray-900">Serie {set.setNumber}</span>
                      </div>
                      <div className="text-sm text-gray-700">
                        {set.reps} reps × {set.weight}kg @ RPE {set.rpe}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              if (currentExerciseIndex > 0) {
                setCurrentExerciseIndex(currentExerciseIndex - 1);
                setCurrentSet(1);
                setCompletedSets([]);
              }
            }}
            disabled={currentExerciseIndex === 0}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold ${
              currentExerciseIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Anterior
          </button>
          <button
            onClick={() => {
              if (currentExerciseIndex < session.exercises.length - 1) {
                setCurrentExerciseIndex(currentExerciseIndex + 1);
                setCurrentSet(1);
                setCompletedSets([]);
              }
            }}
            disabled={currentExerciseIndex === session.exercises.length - 1}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold ${
              currentExerciseIndex === session.exercises.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Siguiente
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Quick Set Entry Component
interface QuickSetEntryProps {
  targetReps: string;
  targetWeight?: number;
  targetRpe?: number;
  onComplete: (reps: number, weight: number, rpe: number) => void;
}

const QuickSetEntry: React.FC<QuickSetEntryProps> = ({
  targetReps,
  targetWeight,
  targetRpe,
  onComplete,
}) => {
  const [reps, setReps] = useState(parseInt(targetReps) || 10);
  const [weight, setWeight] = useState(targetWeight || 0);
  const [rpe, setRpe] = useState(targetRpe || 7);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-700">Registrar Serie</h3>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs text-gray-600 font-semibold">Reps</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-3 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 font-semibold">Peso (kg)</label>
          <input
            type="number"
            step="0.5"
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-3 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600 font-semibold">RPE</label>
          <input
            type="number"
            min="1"
            max="10"
            value={rpe}
            onChange={(e) => setRpe(parseInt(e.target.value) || 7)}
            className="w-full px-3 py-3 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={() => onComplete(reps, weight, rpe)}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all font-bold text-lg"
      >
        <CheckCircle className="w-6 h-6" />
        Completar Serie
      </button>
    </div>
  );
};

export default ClientWorkoutView;
