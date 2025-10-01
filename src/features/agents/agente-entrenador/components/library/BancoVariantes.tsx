import React, { useState, useEffect } from 'react';

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

interface BancoVariantesProps {
  exercises: Exercise[];
}

const BancoVariantes: React.FC<BancoVariantesProps> = ({ exercises }) => {
  const [variantSuggestions, setVariantSuggestions] = useState<Record<string, Exercise[]>>({});

  // This is a simplified example. A real-world scenario would involve a more sophisticated algorithm
  // considering exercise type, intensity, user preferences, and avoiding direct repetition.
  const generateVariants = (baseExercise: Exercise): Exercise[] => {
    const potentialVariants = exercises.filter(
      (ex) =>
        ex.muscleGroup === baseExercise.muscleGroup &&
        ex.id !== baseExercise.id &&
        ex.difficulty === baseExercise.difficulty // Keep similar difficulty for now
    );
    // Return up to 3 random variants
    return potentialVariants.sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  useEffect(() => {
    const suggestions: Record<string, Exercise[]> = {};
    // For demonstration, let's generate variants for a few exercises
    exercises.slice(0, 5).forEach((exercise) => {
      suggestions[exercise.id] = generateVariants(exercise);
    });
    setVariantSuggestions(suggestions);
  }, [exercises]);

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h3 className="text-xl font-semibold mb-3">Sugerencias de Variantes Automáticas</h3>
      {Object.keys(variantSuggestions).length === 0 ? (
        <p>No hay ejercicios para generar variantes.</p>
      ) : (
        <div>
          {Object.entries(variantSuggestions).map(([exerciseId, variants]) => {
            const baseExercise = exercises.find(ex => ex.id === exerciseId);
            return (
              <div key={exerciseId} className="mb-4">
                <p className="font-medium">Variantes para: {baseExercise?.name}</p>
                {variants.length > 0 ? (
                  <ul className="list-disc ml-5">
                    {variants.map((variant) => (
                      <li key={variant.id}>{variant.name} ({variant.equipment})</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">No se encontraron variantes similares.</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BancoVariantes;
