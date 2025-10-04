import React, { useState } from 'react';

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
  modality: string;
  videoUrl: string;
  isFavorite: boolean;
  isCorrective: boolean;
}

const DUMMY_EXERCISES: Exercise[] = Array.from({ length: 250 }, (_, i) => ({
  id: `ex-${i + 1}`,
  name: `Ejercicio ${i + 1}`,
  muscleGroup: ['Pecho', 'Espalda', 'Pierna', 'Hombro', 'Brazo', 'Core'][i % 6],
  equipment: ['Barra', 'Mancuernas', 'Máquina', 'Peso Corporal'][i % 4],
  difficulty: ['Principiante', 'Intermedio', 'Avanzado'][i % 3],
  modality: ['Powerlifting', 'Calistenia', 'Funcional'][i % 3],
  videoUrl: `https://www.youtube.com/embed/placeholder_video_${i + 1}`, // Placeholder video
  isFavorite: i % 5 === 0,
  isCorrective: i % 10 === 0,
}));

const BibliotecaEjercicios: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>(DUMMY_EXERCISES);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<{
    muscleGroup: string;
    equipment: string;
    difficulty: string;
    modality: string;
    showFavorites: boolean;
    showCorrective: boolean;
  }>({
    muscleGroup: '',
    equipment: '',
    difficulty: '',
    modality: '',
    showFavorites: false,
    showCorrective: false,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterName: string, value: string | boolean) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.equipment.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (filters.muscleGroup === '' || exercise.muscleGroup === filters.muscleGroup) &&
      (filters.equipment === '' || exercise.equipment === filters.equipment) &&
      (filters.difficulty === '' || exercise.difficulty === filters.difficulty) &&
      (filters.modality === '' || exercise.modality === filters.modality) &&
      (!filters.showFavorites || exercise.isFavorite) &&
      (!filters.showCorrective || exercise.isCorrective);

    return matchesSearch && matchesFilters;
  });

  const toggleFavorite = (id: string) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, isFavorite: !ex.isFavorite } : ex))
    );
  };

  // Placeholder for injury substitution algorithm
  const getInjurySubstitution = (injuredMuscle: string) => {
    const alternativeExercises = DUMMY_EXERCISES.filter(
      (ex) => ex.muscleGroup !== injuredMuscle && !ex.isCorrective
    );
    return alternativeExercises[Math.floor(Math.random() * alternativeExercises.length)];
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Biblioteca de Ejercicios</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por músculo objetivo o equipamiento..."
          className="border p-2 rounded w-full"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <FiltrosAvanzados onFilterChange={handleFilterChange} currentFilters={filters} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((exercise) => (
          <div key={exercise.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{exercise.name}</h2>
            <p>Grupo Muscular: {exercise.muscleGroup}</p>
            <p>Equipamiento: {exercise.equipment}</p>
            <p>Dificultad: {exercise.difficulty}</p>
            <p>Modalidad: {exercise.modality}</p>
            <div className="mt-2">
              <iframe
                width="100%"
                height="200"
                src={exercise.videoUrl}
                title={exercise.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <button
              onClick={() => toggleFavorite(exercise.id)}
              className="mt-2 px-4 py-2 rounded bg-blue-500 text-white"
            >
              {exercise.isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
            </button>
            {exercise.isCorrective && (
              <span className="ml-2 text-sm text-green-600">Ejercicio Correctivo</span>
            )}
          </div>
        ))}
      </div>

      {/* Placeholder for BancoVariantes integration */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Banco de Variantes Automáticas</h2>
        <BancoVariantes exercises={exercises} />
      </div>

      {/* Placeholder for injury substitution example */}
      <div className="mt-8 p-4 border rounded bg-red-100">
        <h2 className="text-xl font-bold">Sustitución por Lesión (Ejemplo)</h2>
        <p>Si un usuario tiene una lesión en "Pecho", una alternativa podría ser:</p>
        <p className="font-semibold">
          {getInjurySubstitution('Pecho')?.name || 'No se encontró alternativa'}
        </p>
      </div>
    </div>
  );
};

export default BibliotecaEjercicios;

import BancoVariantes from './BancoVariantes';
import FiltrosAvanzados from './FiltrosAvanzados';