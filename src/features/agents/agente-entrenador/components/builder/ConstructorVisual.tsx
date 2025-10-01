
import React, { useState, useMemo, useCallback } from 'react';
import BloquesEntrenamiento from './BloquesEntrenamiento';
import SuperseriesManager from './SuperseriesManager';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  durationMinutes?: number; // For cardio/warmup
  notes: string;
}

interface Block {
  id: string;
  type: 'Calentamiento' | 'Fuerza' | 'Cardio' | 'Cool-down' | 'Superserie';
  name: string;
  exercises: Exercise[];
  superseries?: Superseries; // Link to superseries if type is Superserie
}

interface Superseries {
  id: string;
  name: string;
  exercises: Exercise[];
  restTimeSeconds: number;
}

const ConstructorVisual: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [superseriesList, setSuperseriesList] = useState<Superseries[]>([]);

  // Dummy available exercises for SuperseriesManager
  const availableExercisesForSuperseries: Exercise[] = useMemo(() => [
    { id: 'ex-1', name: 'Flexiones', sets: 3, reps: '10-12', weight: 'Peso corporal', notes: '' },
    { id: 'ex-2', name: 'Sentadillas', sets: 3, reps: '8-10', weight: '50kg', notes: '' },
    { id: 'ex-3', name: 'Press Banca', sets: 4, reps: '6-8', weight: '60kg', notes: '' },
    { id: 'ex-4', name: 'Remo con Barra', sets: 3, reps: '10-12', weight: '40kg', notes: '' },
    { id: 'ex-5', name: 'Dominadas', sets: 3, reps: 'AMRAP', weight: 'Peso corporal', notes: '' },
  ], []);

  const handleAddSuperseries = useCallback((newSuperseries: Superseries) => {
    setSuperseriesList(prev => [...prev, newSuperseries]);
    // Optionally add the superseries as a block directly
    setBlocks(prev => [
      ...prev,
      {
        id: `block-superseries-${newSuperseries.id}`,
        type: 'Superserie',
        name: newSuperseries.name,
        exercises: newSuperseries.exercises,
        superseries: newSuperseries,
      },
    ]);
  }, []);

  const calculateEstimatedTime = useMemo(() => {
    let totalMinutes = 0;
    blocks.forEach(block => {
      if (block.type === 'Cardio' && block.exercises.length > 0 && block.exercises[0].durationMinutes) {
        totalMinutes += block.exercises[0].durationMinutes;
      } else if (block.type === 'Superserie' && block.superseries) {
        // Estimate for superseries: (exercises * sets * time_per_exercise) + (sets * rest_time)
        const setsPerSuperseries = 3; // Assuming 3 sets for a superseries for estimation
        const timePerExerciseInSuperseries = 1; // 1 minute per exercise in a superseries
        const restBetweenSuperseries = block.superseries.restTimeSeconds / 60; // Convert to minutes
        totalMinutes += (block.exercises.length * setsPerSuperseries * timePerExerciseInSuperseries) + (setsPerSuperseries * restBetweenSuperseries);
      } else {
        // For other blocks, a simple estimation per exercise
        totalMinutes += block.exercises.length * 2; // 2 minutes per exercise (warmup, strength, cooldown)
      }
    });
    return totalMinutes;
  }, [blocks]);

  const validateMuscleBalance = useMemo(() => {
    // This is a placeholder. A real implementation would map exercises to muscle groups
    // and analyze the distribution. For now, a simple check.
    const strengthExercises = blocks.filter(b => b.type === 'Fuerza' || b.type === 'Superserie').flatMap(b => b.exercises);
    if (strengthExercises.length < 3) {
      return "Pocos ejercicios de fuerza para un buen equilibrio.";
    }
    return "Equilibrio muscular aparente.";
  }, [blocks]);

  const exportToPDF = () => {
    alert("Funcionalidad de exportar a PDF no implementada aún.");
    // TODO: Implement PDF export using a library like jsPDF or html2pdf
  };

  const loadTemplate = (templateName: string) => {
    // Placeholder for loading templates
    alert(`Cargando plantilla: ${templateName}. Funcionalidad no implementada aún.`);
    // TODO: Implement logic to load predefined blocks and exercises
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Constructor de Entrenamientos</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <BloquesEntrenamiento />
        </div>
        <div>
          <SuperseriesManager
            onAddSuperseries={handleAddSuperseries}
            availableExercises={availableExercisesForSuperseries}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-3">Vista Previa y Análisis del Entrenamiento</h2>
        <div className="flex justify-between items-center mb-3">
          <p className="text-lg">Tiempo Total Estimado: <span className="font-semibold">{calculateEstimatedTime} minutos</span></p>
          <p className="text-lg">Equilibrio Muscular: <span className="font-semibold">{validateMuscleBalance}</span></p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Plantillas Predefinidas</h3>
          <div className="flex gap-2">
            <button onClick={() => loadTemplate('Fuerza')} className="bg-indigo-500 text-white px-3 py-1 rounded text-sm">
              Fuerza
            </button>
            <button onClick={() => loadTemplate('Hipertrofia')} className="bg-indigo-500 text-white px-3 py-1 rounded text-sm">
              Hipertrofia
            </button>
            <button onClick={() => loadTemplate('Resistencia')} className="bg-indigo-500 text-white px-3 py-1 rounded text-sm">
              Resistencia
            </button>
          </div>
        </div>
        <button
          onClick={exportToPDF}
          className="bg-red-600 text-white px-4 py-2 rounded-md text-lg font-semibold hover:bg-red-700"
        >
          Exportar a PDF
        </button>

        <div className="mt-4 p-3 bg-gray-50 rounded border">
          <h3 className="text-xl font-semibold mb-2">Estructura del Entrenamiento</h3>
          {blocks.length === 0 && <p className="text-gray-500">Aún no hay bloques de entrenamiento. ¡Empieza a construir!</p>}
          {blocks.map((block, index) => (
            <div key={block.id} className="mb-2 p-2 border-b last:border-b-0">
              <p className="font-medium">{index + 1}. {block.name} ({block.type})</p>
              <ul className="list-disc list-inside ml-4 text-sm">
                {block.exercises.map(ex => (
                  <li key={ex.id}>{ex.name} - {ex.sets}x{ex.reps} ({ex.weight}) {ex.notes && `[Notas: ${ex.notes}]`}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConstructorVisual;
