import React from 'react';
import { TimelineEvaluaciones } from './components/TimelineEvaluaciones';
import AnalisisTendencias from './components/AnalisisTendencias';
import ComparadorEvolucion from './components/ComparadorEvolucion';
import AlertasDesarrollo from './components/AlertasDesarrollo';
import CorrelacionScouts from './components/CorrelacionScouts';
import PrediccionTransferencias from './components/PrediccionTransferencias';
import EfectividadScouts from './components/EfectividadScouts';
import EarlyWarning from './components/EarlyWarning';
import RecomendacionesOfertas from './components/RecomendacionesOfertas';

const HistorialScoutingPage: React.FC = () => {
  // Placeholder data for demonstration
  const playerData = {
    id: '1',
    name: 'Jugador Ejemplo',
    evaluations: [
      { id: 'e1', date: '2023-01-15', scout: 'Scout A', rating: 7.5, notes: 'Buen rendimiento inicial.' },
      { id: 'e2', date: '2023-03-20', scout: 'Scout B', rating: 8.0, notes: 'Mejora en pases.' },
      { id: 'e3', date: '2023-06-01', scout: 'Scout A', rating: 7.8, notes: 'Lesión menor, recuperación en curso.' },
      { id: 'e4', date: '2023-09-10', scout: 'Scout C', rating: 8.5, notes: 'Debut profesional, gran potencial.' },
    ],
    events: [
      { id: 'ev1', date: '2023-09-10', type: 'Debut', description: 'Debut profesional en liga.' },
      { id: 'ev2', date: '2023-05-15', type: 'Lesión', description: 'Esguince de tobillo.' },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Historial de Scouting - {playerData.name}</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Seguimiento Longitudinal</h2>
        <TimelineEvaluaciones evaluations={playerData.evaluations} events={playerData.events} />
      </div>

      {/* Integración de Análisis Longitudinal Avanzado */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Análisis Longitudinal Avanzado</h2>
        <AnalisisTendencias />
        <ComparadorEvolucion />
        <AlertasDesarrollo />
        <CorrelacionScouts />
        <PrediccionTransferencias />
        <EfectividadScouts />
        <EarlyWarning />
        <RecomendacionesOfertas />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Gráficos de Evolución</h2>
        <p className="text-gray-600">Aquí se mostrarán los gráficos de evolución de puntuaciones.</p>
        {/* Chart.js integration would go here */}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Comparación de Evaluaciones</h2>
        <p className="text-gray-600">Aquí se podrá comparar evaluaciones entre diferentes scouts.</p>
      </div>
    </div>
  );
};

export default HistorialScoutingPage;
