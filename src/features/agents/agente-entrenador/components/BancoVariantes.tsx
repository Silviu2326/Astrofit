import React, { useState, useEffect } from 'react';
import { agenteEntrenadorApi, Exercise } from '../agenteEntrenadorApi';

const BancoVariantes: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const data = agenteEntrenadorApi.getExercises();
      setExercises(data);
      setIsLoading(false);
    }, 200);
  }, []);

  if (isLoading) return <div className="text-gray-600">Cargando banco de variantes...</div>;
  if (!exercises.length) return <div className="text-red-600">Error al cargar ejercicios.</div>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-medium mb-3">Banco de Variantes Sugeridas</h3>
      <div className="flex space-x-4">
        <div className="w-1/3">
          <label htmlFor="exercise-select" className="block text-sm font-medium text-gray-700">Selecciona un ejercicio:</label>
          <select
            id="exercise-select"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue=""
            onChange={(e) => {
              const exerciseId = e.target.value;
              setSelectedExercise(exercises.find(ex => ex.id === exerciseId) || null);
            }}
          >
            <option value="" disabled>-- Selecciona --</option>
            {exercises.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-2/3 p-3 border border-gray-200 rounded-md bg-gray-50">
          {selectedExercise ? (
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Variantes para {selectedExercise.name}:</h4>
              {selectedExercise.variants && selectedExercise.variants.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {selectedExercise.variants.map((variant, index) => (
                    <li key={index} className="text-gray-700">{variant}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No hay variantes sugeridas para este ejercicio.</p>
              )}
              <p className="mt-3 text-sm text-gray-600">* Sugerencias automáticas si se detectan molestias o limitaciones.</p>
            </div>
          ) : (
            <p className="text-gray-500">Selecciona un ejercicio para ver sus variantes.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BancoVariantes;
