import React, { useState } from 'react';
import GraficoComparativo from './components/GraficoComparativo';
import { useComparadorResultados } from './comparadorResultadosApi';
import AnalisisFortalezas from './components/AnalisisFortalezas';
import RecomendacionesEntrenamiento from './components/RecomendacionesEntrenamiento';
import SimuladorAlineacion from './components/SimuladorAlineacion';
import BenchmarksHistoricos from './components/BenchmarksHistoricos';
import CompatibilidadAtletas from './components/CompatibilidadAtletas';
import ScoringPonderado from './components/ScoringPonderado';
import PrediccionCompetencia from './components/PrediccionCompetencia';
import ReportesScouting from './components/ReportesScouting';

const ComparadorResultadosPage: React.FC = () => {
  const [selectedAthletes, setSelectedAthletes] = useState<string[]>([]);
  const { data: athleteData, isLoading, error } = useComparadorResultados(selectedAthletes);

  const availableAthletes = ['Atleta A', 'Atleta B', 'Atleta C', 'Atleta D', 'Atleta E']; // Mock data

  const handleAthleteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(event.target.options);
    const newSelectedAthletes = options.filter(option => option.selected).map(option => option.value);
    setSelectedAthletes(newSelectedAthletes);
  };

  if (isLoading) return <div className="p-4">Cargando datos...</div>;
  if (error) return <div className="p-4 text-red-500">Error al cargar datos: {error.message}</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Comparador de Rendimiento entre Atletas</h1>

      <div className="mb-6">
        <label htmlFor="athlete-select" className="block text-lg font-medium text-gray-700 mb-2">
          Selecciona 2-5 atletas para comparar:
        </label>
        <select
          id="athlete-select"
          multiple
          className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedAthletes}
          onChange={handleAthleteChange}
        >
          {availableAthletes.map(athlete => (
            <option key={athlete} value={athlete}>
              {athlete}
            </option>
          ))}
        </select>
      </div>

      {selectedAthletes.length >= 2 && selectedAthletes.length <= 5 && athleteData && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Resultados Comparativos</h2>
          <GraficoComparativo data={athleteData} />
          {/* Future: Add Radar Chart here */}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Análisis Competitivo Avanzado</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnalisisFortalezas />
              <RecomendacionesEntrenamiento />
              <SimuladorAlineacion />
              <BenchmarksHistoricos />
              <CompatibilidadAtletas />
              <ScoringPonderado />
              <PrediccionCompetencia />
              <ReportesScouting />
            </div>
          </div>
        </div>
      )}

      {selectedAthletes.length > 5 && (
        <p className="text-red-600 mt-4">Por favor, selecciona un máximo de 5 atletas.</p>
      )}
       {selectedAthletes.length < 2 && selectedAthletes.length > 0 && (
        <p className="text-yellow-600 mt-4">Por favor, selecciona al menos 2 atletas para comparar.</p>
      )}
    </div>
  );
};

export default ComparadorResultadosPage;
