import React, { useState } from 'react';
import ComparacionDirecta from './components/ComparacionDirecta';
import AnalisisComplementariedad from './components/AnalisisComplementariedad';
import SimuladorDuelos from './components/SimuladorDuelos';
import ReporteScouting from './components/ReporteScouting';
import RadarCharts from './components/RadarCharts';
import HistorialEnfrentamientos from './components/HistorialEnfrentamientos';
import ScoringPonderado from './components/ScoringPonderado';
import RecomendacionesTacticas from './components/RecomendacionesTacticas';
import PrediccionEvolucion from './components/PrediccionEvolucion';

interface Atleta {
  id: string;
  nombre: string;
}

const ComparadorAtletasPage: React.FC = () => {
  const [atleta1, setAtleta1] = useState<Atleta | null>(null);
  const [atleta2, setAtleta2] = useState<Atleta | null>(null);

  // Mock data for athlete selection
  const atletasDisponibles: Atleta[] = [
    { id: '1', nombre: 'Atleta A' },
    { id: '2', nombre: 'Atleta B' },
    { id: '3', nombre: 'Atleta C' },
    { id: '4', nombre: 'Atleta D' },
  ];

  const handleSelectAtleta = (atleta: Atleta, setter: React.Dispatch<React.SetStateAction<Atleta | null>>) => {
    setter(atleta);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Comparador de Atletas - Análisis Competitivo Profesional</h1>

      <div className="flex justify-center space-x-8 mb-8">
        <div className="w-1/3">
          <label htmlFor="atleta1-select" className="block text-lg font-medium text-gray-700 mb-2">
            Seleccionar Atleta 1:
          </label>
          <select
            id="atleta1-select"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={(e) => handleSelectAtleta(atletasDisponibles.find(a => a.id === e.target.value)!, setAtleta1)}
            value={atleta1?.id || ''}
          >
            <option value="">-- Seleccionar --</option>
            {atletasDisponibles.map((atleta) => (
              <option key={atleta.id} value={atleta.id}>
                {atleta.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="w-1/3">
          <label htmlFor="atleta2-select" className="block text-lg font-medium text-gray-700 mb-2">
            Seleccionar Atleta 2:
          </label>
          <select
            id="atleta2-select"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={(e) => handleSelectAtleta(atletasDisponibles.find(a => a.id === e.target.value)!, setAtleta2)}
            value={atleta2?.id || ''}
          >
            <option value="">-- Seleccionar --</option>
            {atletasDisponibles.map((atleta) => (
              <option key={atleta.id} value={atleta.id}>
                {atleta.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {atleta1 && atleta2 ? (
        <div className="space-y-8 mt-8">
          <ComparacionDirecta atleta1Id={atleta1.id} atleta2Id={atleta2.id} />
          <AnalisisComplementariedad />
          <SimuladorDuelos />
          <ReporteScouting />
          <RadarCharts />
          <HistorialEnfrentamientos />
          <ScoringPonderado />
          <RecomendacionesTacticas />
          <PrediccionEvolucion />
        </div>
      ) : (
        <p className="text-center text-gray-600 text-xl">Selecciona dos atletas para iniciar el análisis competitivo.</p>
      )}
    </div>
  );
};

export default ComparadorAtletasPage;

