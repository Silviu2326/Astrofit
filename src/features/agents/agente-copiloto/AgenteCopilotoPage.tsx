import React, { useState, useEffect } from 'react';
import { Vision360 } from './components/Vision360';
import { RecomendacionSemanal } from './components/RecomendacionSemanal';
import { PrioridadesInteligentes } from './components/PrioridadesInteligentes';
import { AccionesRapidas } from './components/AccionesRapidas';
import { ImpactoEstimado } from './components/ImpactoEstimado';
import {
  fetchClient360Data,
  fetchWeeklyRecommendations,
  fetchIntelligentPriorities,
  fetchEstimatedImpact,
  Client360Data,
  Recommendation,
  Priority,
  EstimatedImpact,
} from './agenteCopilotoApi';

const AgenteCopilotoPage: React.FC = () => {
  const [client360Data, setClient360Data] = useState<Client360Data | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [estimatedImpact, setEstimatedImpact] = useState<EstimatedImpact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [
          clientData,
          weeklyRecs,
          intelligentPriorities,
          impact,
        ] = await Promise.all([
          fetchClient360Data(),
          fetchWeeklyRecommendations(),
          fetchIntelligentPriorities(),
          fetchEstimatedImpact(),
        ]);
        setClient360Data(clientData);
        setRecommendations(weeklyRecs);
        setPriorities(intelligentPriorities);
        setEstimatedImpact(impact);
      } catch (err) {
        setError('Error al cargar los datos del Agente Copiloto.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Cargando datos del Agente Copiloto...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Agente Copiloto - El Estratega Integral</h1>
      <p className="text-gray-600 mb-8">Dashboard unificado de todos los agentes. Motor de recomendaciones inteligentes y coordinación automática entre módulos.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Visión 360° del Cliente</h2>
          {client360Data && <Vision360 clientData={client360Data} />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recomendación Semanal</h2>
          {recommendations.length > 0 && <RecomendacionSemanal recommendations={recommendations} />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Prioridades Inteligentes</h2>
          {priorities.length > 0 && <PrioridadesInteligentes priorities={priorities} />}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Impacto Estimado</h2>
          {estimatedImpact && <ImpactoEstimado estimatedImpact={estimatedImpact} />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Acciones Rápidas</h2>
          <AccionesRapidas />
          <div className="mt-6 flex space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Aplicar todo
            </button>
            <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition duration-300">
              Aplicar por partes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgenteCopilotoPage;
