import React, { useState } from 'react';
import GraficoEvolucion from './components/GraficoEvolucion';
import AnalisisTendencias from './components/AnalisisTendencias';
import PrediccionRendimiento from './components/PrediccionRendimiento';
import DetectorPlateau from './components/DetectorPlateau';
import CorrelacionesTests from './components/CorrelacionesTests';
import AnalisisEstacionalidad from './components/AnalisisEstacionalidad';
import ComparacionNormativas from './components/ComparacionNormativas';
import AlertasRegresiones from './components/AlertasRegresiones';
import ReportesProgreso from './components/ReportesProgreso';
import { useResultadosHistoricos } from './resultadosHistoricosApi';

const ResultadosHistoricosPage: React.FC = () => {
  const [selectedAthlete, setSelectedAthlete] = useState<string>('atleta1');
  const [selectedTest, setSelectedTest] = useState<string>('saltoVertical');

  const { data: resultados, isLoading, error } = useResultadosHistoricos(selectedAthlete, selectedTest);

  if (isLoading) return <div className="text-center py-4">Cargando resultados...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error al cargar los resultados: {error.message}</div>;

  const athleteOptions = [
    { value: 'atleta1', label: 'Atleta 1' },
    { value: 'atleta2', label: 'Atleta 2' },
  ];

  const testOptions = [
    { value: 'saltoVertical', label: 'Salto Vertical' },
    { value: 'velocidad100m', label: 'Velocidad 100m' },
  ];

  const bestMark = resultados?.reduce((prev, current) => (prev.value > current.value ? prev : current), resultados[0]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Resultados Históricos - Evolución por Atleta</h1>

      <div className="flex space-x-4 mb-6">
        <div className="flex flex-col">
          <label htmlFor="athlete-select" className="text-sm font-medium text-gray-700 mb-1">Seleccionar Atleta:</label>
          <select
            id="athlete-select"
            className="block w-48 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedAthlete}
            onChange={(e) => setSelectedAthlete(e.target.value)}
          >
            {athleteOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="test-select" className="text-sm font-medium text-gray-700 mb-1">Seleccionar Prueba:</label>
          <select
            id="test-select"
            className="block w-48 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={selectedTest}
            onChange={(e) => setSelectedTest(e.target.value)}
          >
            {testOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {resultados && resultados.length > 0 ? (
        <>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Resumen de la Prueba</h2>
            <p className="text-gray-700">
              Mejor marca personal: <span className="font-bold">{bestMark?.value} {selectedTest === 'saltoVertical' ? 'cm' : 's'}</span> (Fecha: {bestMark?.date})
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <GraficoEvolucion data={resultados} testUnit={selectedTest === 'saltoVertical' ? 'cm' : 's'} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-md"><AnalisisTendencias /></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><PrediccionRendimiento /></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><DetectorPlateau /></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><CorrelacionesTests /></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><AnalisisEstacionalidad /></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><ComparacionNormativas /></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><AlertasRegresiones /></div>
            <div className="bg-white p-6 rounded-lg shadow-md"><ReportesProgreso /></div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-600">No hay datos disponibles para la selección actual.</div>
      )}
    </div>
  );
};

export default ResultadosHistoricosPage;
