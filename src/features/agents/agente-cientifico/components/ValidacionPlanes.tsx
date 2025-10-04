import React, { useState } from 'react';

const ValidacionPlanes: React.FC = () => {
  const [volumen, setVolumen] = useState<number | ''>('');
  const [descanso, setDescanso] = useState<number | ''>('');
  const [intensidad, setIntensidad] = useState<number | ''>('');
  const [resultado, setResultado] = useState<'verde' | 'amarillo' | 'rojo' | null>(null);

  const validarPlan = () => {
    if (volumen === '' || descanso === '' || intensidad === '') {
      setResultado(null);
      return;
    }

    // Simple validation logic based on scientific standards (mock)
    const vol = Number(volumen);
    const des = Number(descanso);
    const inte = Number(intensidad);

    if (vol >= 10 && vol <= 20 && des >= 60 && des <= 180 && inte >= 70 && inte <= 90) {
      setResultado('verde'); // Cumple estándares
    } else if (vol >= 8 && vol <= 25 && des >= 30 && des <= 240 && inte >= 60 && inte <= 95) {
      setResultado('amarillo'); // Podría mejorar
    } else {
      setResultado('rojo'); // No cumple estándares
    }
  };

  const getColorClass = () => {
    switch (resultado) {
      case 'verde':
        return 'bg-green-500';
      case 'amarillo':
        return 'bg-yellow-500';
      case 'rojo':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Validación de Planes</h2>
      <p className="text-gray-600 mb-4">Semáforo de si un plan cumple estándares científicos (volumen, descanso, intensidad).</p>
      <div className="space-y-4">
        <div>
          <label htmlFor="volumen" className="block text-sm font-medium text-gray-700">Volumen Semanal (series)</label>
          <input
            type="number"
            id="volumen"
            value={volumen}
            onChange={(e) => setVolumen(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Ej: 12"
          />
        </div>
        <div>
          <label htmlFor="descanso" className="block text-sm font-medium text-gray-700">Descanso entre series (segundos)</label>
          <input
            type="number"
            id="descanso"
            value={descanso}
            onChange={(e) => setDescanso(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Ej: 90"
          />
        </div>
        <div>
          <label htmlFor="intensidad" className="block text-sm font-medium text-gray-700">Intensidad (% 1RM)</label>
          <input
            type="number"
            id="intensidad"
            value={intensidad}
            onChange={(e) => setIntensidad(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Ej: 75"
          />
        </div>
        <button
          onClick={validarPlan}
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Validar Plan
        </button>

        {resultado && (
          <div className="mt-6 flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full ${getColorClass()}`}></div>
            <p className="text-lg font-medium text-gray-800">
              {resultado === 'verde' && '¡Excelente! El plan cumple con los estándares científicos.'}
              {resultado === 'amarillo' && 'El plan podría mejorar para optimizar los resultados.'}
              {resultado === 'rojo' && 'El plan no cumple con los estándares científicos recomendados.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidacionPlanes;
