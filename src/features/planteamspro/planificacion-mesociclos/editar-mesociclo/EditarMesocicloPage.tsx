import React, { useState } from 'react';
import EditorModular from './components/EditorModular';
import CalculadoraCarga from './components/CalculadoraCarga';
import ValidadorCientifico from './components/ValidadorCientifico';
import SimuladorAdaptacion from './components/SimuladorAdaptacion';
import AlertasSobreentrenamiento from './components/AlertasSobreentrenamiento';
import IntegracionBaseDatos from './components/IntegracionBaseDatos';
import RecomendacionesDeporte from './components/RecomendacionesDeporte';
import AnalisisProgresion from './components/AnalisisProgresion';
import PrediccionResultados from './components/PrediccionResultados';

const EditarMesocicloPage: React.FC = () => {
  const [mesocicloDuration, setMesocicloDuration] = useState<number>(4); // Default 4 weeks
  const [objetivos, setObjetivos] = useState<{ [key: string]: number }>({
    fuerza: 25,
    resistencia: 25,
    tecnica: 25,
    velocidad: 25,
  });

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const duration = Math.max(2, Math.min(6, Number(e.target.value)));
    setMesocicloDuration(duration);
  };

  const handleObjetivoChange = (objetivo: string, value: number) => {
    setObjetivos((prev) => {
      const newObjetivos = { ...prev, [objetivo]: value };
      const total = Object.values(newObjetivos).reduce((sum, val) => sum + val, 0);
      // Normalize to 100% if total exceeds 100
      if (total > 100) {
        const scale = 100 / total;
        for (const key in newObjetivos) {
          newObjetivos[key] = Math.round(newObjetivos[key] * scale);
        }
      }
      return newObjetivos;
    });
  };

  const totalObjetivos = Object.values(objetivos).reduce((sum, val) => sum + val, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Editor de Mesociclo - Bloques de Entrenamiento</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Configuración General</h2>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">
            Duración del Mesociclo (semanas): {mesocicloDuration}
          </label>
          <input
            type="range"
            id="duration"
            min="2"
            max="6"
            value={mesocicloDuration}
            onChange={handleDurationChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Objetivos del Entrenamiento</h2>
        {Object.entries(objetivos).map(([objetivo, value]) => (
          <div key={objetivo} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2 capitalize">
              {objetivo}: {value}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => handleObjetivoChange(objetivo, Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        ))}
        <div className="mt-4 text-right text-gray-600">
          Total asignado: {totalObjetivos}% (debería ser 100%)
        </div>
      </div>

      <EditorModular />

      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Herramientas Científicas Avanzadas</h2>
        <CalculadoraCarga />
        <ValidadorCientifico />
        <SimuladorAdaptacion />
        <AlertasSobreentrenamiento />
        <IntegracionBaseDatos />
        <RecomendacionesDeporte />
        <AnalisisProgresion />
        <PrediccionResultados />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Resumen del Mesociclo</h2>
        {totalObjetivos === 100 ? (
          <ul>
            {Object.entries(objetivos).map(([objetivo, value]) => (
              <li key={objetivo} className="text-gray-700">
                <span className="font-semibold capitalize">{objetivo}:</span> {value}%
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-500">Ajusta los objetivos para que sumen 100% para ver el resumen.</p>
        )}
      </div>
    </div>
  );
};

export default EditarMesocicloPage;