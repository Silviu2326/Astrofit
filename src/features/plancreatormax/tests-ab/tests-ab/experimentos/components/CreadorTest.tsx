import React, { useState } from 'react';
import { createExperiment } from '../experimentosApi';

const CreadorTest: React.FC = () => {
  const [experimentName, setExperimentName] = useState('');
  const [duration, setDuration] = useState('');
  const [sampleSize, setSampleSize] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!experimentName || !duration || !sampleSize || !goal) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const newExperiment = {
      name: experimentName,
      status: 'active',
      duration: duration,
      sampleSize: parseInt(sampleSize),
      goal,
    };

    try {
      await createExperiment(newExperiment as any); // Type assertion for simplicity, proper typing would be better
      alert('Experimento creado con éxito!');
      setExperimentName('');
      setDuration('');
      setSampleSize('');
      setGoal('');
    } catch (error) {
      alert('Error al crear el experimento.');
      console.error(error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Crear Nuevo Experimento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="experimentName" className="block text-sm font-medium text-gray-700">Nombre del Experimento</label>
          <input
            type="text"
            id="experimentName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={experimentName}
            onChange={(e) => setExperimentName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duración (ej. '7 days')</label>
          <input
            type="text"
            id="duration"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="sampleSize" className="block text-sm font-medium text-gray-700">Tamaño de Muestra</label>
          <input
            type="number"
            id="sampleSize"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={sampleSize}
            onChange={(e) => setSampleSize(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-gray-700">Objetivo (ej. 'Conversion')</label>
          <input
            type="text"
            id="goal"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Crear Experimento
        </button>
      </form>
    </div>
  );
};

export default CreadorTest;
