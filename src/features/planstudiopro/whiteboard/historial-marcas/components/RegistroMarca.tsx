import React, { useState } from 'react';
import { addPRRecord } from '../historialMarcasApi';

const RegistroMarca: React.FC = () => {
  const [date, setDate] = useState('');
  const [exercise, setExercise] = useState('');
  const [mark, setMark] = useState('');
  const [units, setUnits] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!date || !exercise || !mark || !units) {
      setMessage('Todos los campos son obligatorios.');
      return;
    }

    try {
      await addPRRecord({
        date,
        exercise,
        mark: parseFloat(mark),
        units,
      });
      setMessage('Marca registrada con éxito!');
      setDate('');
      setExercise('');
      setMark('');
      setUnits('');
    } catch (error) {
      setMessage('Error al registrar la marca.');
      console.error('Error adding PR record:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="exercise" className="block text-sm font-medium text-gray-700">Ejercicio</label>
        <input
          type="text"
          id="exercise"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="Ej: Sentadilla"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="mark" className="block text-sm font-medium text-gray-700">Marca</label>
        <input
          type="number"
          id="mark"
          value={mark}
          onChange={(e) => setMark(e.target.value)}
          placeholder="Ej: 100"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="units" className="block text-sm font-medium text-gray-700">Unidades</label>
        <input
          type="text"
          id="units"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          placeholder="Ej: kg, reps, min"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Registrar
      </button>
      {message && (
        <p className={`mt-2 text-center text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
};

export default RegistroMarca;