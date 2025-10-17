import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { createExperiment } from '../experimentosApi';

const CreadorTest: React.FC = () => {
  const [experimentName, setExperimentName] = useState('');
  const [duration, setDuration] = useState('');
  const [sampleSize, setSampleSize] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!experimentName || !duration || !sampleSize || !goal) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    const newExperiment = {
      name: experimentName,
      status: 'active',
      duration: duration,
      sampleSize: parseInt(sampleSize),
      goal,
    };

    const loadingToast = toast.loading('Creando experimento...');

    try {
      await createExperiment(newExperiment as any); // Type assertion for simplicity, proper typing would be better
      toast.success('¡Experimento creado con éxito!', { id: loadingToast });
      setExperimentName('');
      setDuration('');
      setSampleSize('');
      setGoal('');
    } catch (error) {
      toast.error('Error al crear el experimento.', { id: loadingToast });
      console.error(error);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Crear Experimento</h2>
          <p className="text-sm text-gray-600">Configura una nueva prueba A/B</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="experimentName" className="block text-sm font-semibold text-gray-700">
            Nombre del Experimento
          </label>
          <input
            type="text"
            id="experimentName"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Ej: Test de botón CTA"
            value={experimentName}
            onChange={(e) => setExperimentName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="duration" className="block text-sm font-semibold text-gray-700">
            Duración
          </label>
          <select
            id="duration"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          >
            <option value="">Selecciona la duración</option>
            <option value="3 days">3 días</option>
            <option value="7 days">7 días</option>
            <option value="14 days">14 días</option>
            <option value="30 days">30 días</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="sampleSize" className="block text-sm font-semibold text-gray-700">
            Tamaño de Muestra
          </label>
          <input
            type="number"
            id="sampleSize"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="1000"
            min="100"
            value={sampleSize}
            onChange={(e) => setSampleSize(e.target.value)}
            required
          />
          <p className="text-xs text-gray-500">Mínimo recomendado: 100 usuarios</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="goal" className="block text-sm font-semibold text-gray-700">
            Objetivo Principal
          </label>
          <select
            id="goal"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            required
          >
            <option value="">Selecciona el objetivo</option>
            <option value="conversion">Tasa de Conversión</option>
            <option value="click-through">Click-through Rate</option>
            <option value="engagement">Engagement</option>
            <option value="revenue">Ingresos</option>
            <option value="signup">Registros</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Crear Experimento
          </div>
        </button>
      </form>
    </div>
  );
};

export default CreadorTest;
