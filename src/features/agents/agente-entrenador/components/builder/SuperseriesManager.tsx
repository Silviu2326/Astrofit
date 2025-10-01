
import React, { useState, useEffect } from 'react';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  notes: string;
}

interface Superseries {
  id: string;
  name: string;
  exercises: Exercise[];
  restTimeSeconds: number;
}

interface SuperseriesManagerProps {
  onAddSuperseries: (superseries: Superseries) => void;
  availableExercises: Exercise[];
}

const SuperseriesManager: React.FC<SuperseriesManagerProps> = ({ onAddSuperseries, availableExercises }) => {
  const [superseriesName, setSuperseriesName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [restTime, setRestTime] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && currentTimer > 0) {
      interval = setInterval(() => {
        setCurrentTimer(prevTime => prevTime - 1);
      }, 1000);
    } else if (currentTimer === 0) {
      setTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, currentTimer]);

  const handleAddExerciseToSuperseries = (exerciseId: string) => {
    const exerciseToAdd = availableExercises.find(ex => ex.id === exerciseId);
    if (exerciseToAdd && !selectedExercises.some(ex => ex.id === exerciseId)) {
      setSelectedExercises(prev => [...prev, exerciseToAdd]);
    }
  };

  const handleRemoveExerciseFromSuperseries = (exerciseId: string) => {
    setSelectedExercises(prev => prev.filter(ex => ex.id !== exerciseId));
  };

  const handleCreateSuperseries = () => {
    if (superseriesName.trim() === '' || selectedExercises.length < 2) {
      alert('Please provide a name and select at least two exercises for the superseries.');
      return;
    }

    const newSuperseries: Superseries = {
      id: `superseries-${Date.now()}`,
      name: superseriesName,
      exercises: selectedExercises,
      restTimeSeconds: restTime,
    };
    onAddSuperseries(newSuperseries);
    setSuperseriesName('');
    setSelectedExercises([]);
    setRestTime(60);
  };

  const startTimer = () => {
    setCurrentTimer(restTime);
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setCurrentTimer(restTime);
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Editor de Superseries</h2>

      <div className="mb-4">
        <label htmlFor="superseriesName" className="block text-sm font-medium text-gray-700">Nombre de la Superserie</label>
        <input
          type="text"
          id="superseriesName"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={superseriesName}
          onChange={(e) => setSuperseriesName(e.target.value)}
          placeholder="Ej: Superserie Pecho y Tríceps"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Ejercicios en Superserie</h3>
        <div className="border p-3 rounded min-h-[80px] mb-2">
          {selectedExercises.length === 0 && <p className="text-gray-400">Arrastra ejercicios aquí o selecciónalos</p>}
          {selectedExercises.map(ex => (
            <div key={ex.id} className="flex justify-between items-center bg-blue-50 p-2 mb-1 rounded">
              <span>{ex.name}</span>
              <button onClick={() => handleRemoveExerciseFromSuperseries(ex.id)} className="text-red-500 hover:text-red-700 text-sm">
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <h4 className="text-lg font-medium mb-2">Ejercicios Disponibles</h4>
        <div className="bg-gray-100 p-3 rounded shadow-inner flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {availableExercises.map(exercise => (
            <button
              key={exercise.id}
              onClick={() => handleAddExerciseToSuperseries(exercise.id)}
              className="bg-gray-200 hover:bg-gray-300 p-2 border rounded shadow-sm text-sm"
              disabled={selectedExercises.some(ex => ex.id === exercise.id)}
            >
              {exercise.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="restTime" className="block text-sm font-medium text-gray-700">Tiempo de Descanso (segundos)</label>
        <input
          type="number"
          id="restTime"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          value={restTime}
          onChange={(e) => setRestTime(Number(e.target.value))}
          min="0"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Temporizador Automático</h3>
        <div className="flex items-center space-x-4">
          <span className="text-4xl font-bold">{Math.floor(currentTimer / 60).toString().padStart(2, '0')}:{(currentTimer % 60).toString().padStart(2, '0')}</span>
          <button onClick={startTimer} disabled={timerRunning || restTime === 0} className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50">
            Iniciar
          </button>
          <button onClick={stopTimer} disabled={!timerRunning} className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50">
            Detener
          </button>
          <button onClick={resetTimer} className="bg-gray-500 text-white px-4 py-2 rounded">
            Reiniciar
          </button>
        </div>
      </div>

      <button
        onClick={handleCreateSuperseries}
        className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700"
      >
        Crear Superserie
      </button>
    </div>
  );
};

export default SuperseriesManager;
