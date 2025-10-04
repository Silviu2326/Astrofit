import React, { useState } from 'react';
import { mockVolumeCalculations } from '../calculadorasFuerzaApi';

interface ExerciseInput {
  id: number;
  exercise: string;
  sets: number | '';
  reps: number | '';
  weight: number | '';
}

const VolumenCalculator: React.FC = () => {
  const [exercises, setExercises] = useState<ExerciseInput[]>([
    { id: 1, exercise: '', sets: '', reps: '', weight: '' },
  ]);
  const [totalSessionVolume, setTotalSessionVolume] = useState<number | null>(null);

  const handleExerciseChange = (id: number, field: keyof ExerciseInput, value: string | number) => {
    setExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    );
  };

  const addExercise = () => {
    setExercises((prevExercises) => [
      ...prevExercises,
      { id: prevExercises.length + 1, exercise: '', sets: '', reps: '', weight: '' },
    ]);
  };

  const removeExercise = (id: number) => {
    setExercises((prevExercises) => prevExercises.filter((ex) => ex.id !== id));
  };

  const calculateVolume = () => {
    let totalVolume = 0;
    exercises.forEach((ex) => {
      if (ex.sets && ex.reps && ex.weight) {
        totalVolume += (ex.sets as number) * (ex.reps as number) * (ex.weight as number);
      }
    });
    setTotalSessionVolume(totalVolume);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Calculadora de Volumen de Entrenamiento</h3>

      {exercises.map((ex) => (
        <div key={ex.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor={`exercise-${ex.id}`} className="block text-sm font-medium text-gray-700">Ejercicio</label>
            <input
              type="text"
              id={`exercise-${ex.id}`}
              value={ex.exercise}
              onChange={(e) => handleExerciseChange(ex.id, 'exercise', e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ej: Sentadilla"
            />
          </div>
          <div>
            <label htmlFor={`sets-${ex.id}`} className="block text-sm font-medium text-gray-700">Series</label>
            <input
              type="number"
              id={`sets-${ex.id}`}
              value={ex.sets}
              onChange={(e) => handleExerciseChange(ex.id, 'sets', parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ej: 3"
            />
          </div>
          <div>
            <label htmlFor={`reps-${ex.id}`} className="block text-sm font-medium text-gray-700">Reps</label>
            <input
              type="number"
              id={`reps-${ex.id}`}
              value={ex.reps}
              onChange={(e) => handleExerciseChange(ex.id, 'reps', parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ej: 8"
            />
          </div>
          <div>
            <label htmlFor={`weight-${ex.id}`} className="block text-sm font-medium text-gray-700">Peso (kg)</label>
            <input
              type="number"
              id={`weight-${ex.id}`}
              value={ex.weight}
              onChange={(e) => handleExerciseChange(ex.id, 'weight', parseFloat(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Ej: 70"
            />
          </div>
          {exercises.length > 1 && (
            <button
              onClick={() => removeExercise(ex.id)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Eliminar
            </button>
          )}
        </div>
      ))}

      <button
        onClick={addExercise}
        className="mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Añadir Ejercicio
      </button>

      <button
        onClick={calculateVolume}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Calcular Volumen Total
      </button>

      {totalSessionVolume !== null && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800">
          <p className="font-semibold">Volumen Total de la Sesión: <span className="text-xl">{totalSessionVolume} kg</span></p>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Historial de Volumen (Mock)</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ejercicio
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Series
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reps
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Peso (kg)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Volumen Total (kg)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockVolumeCalculations.map((calc) => (
              <tr key={calc.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.exercise}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.sets}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.reps}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.weight}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{calc.totalVolume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolumenCalculator;
