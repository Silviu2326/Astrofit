import React from 'react';
import ModeloPredictivo from './components/ModeloPredictivo';
import SimuladorEscenariosIA from './components/SimuladorEscenariosIA';
import AnalisisFactoresExternos from './components/AnalisisFactoresExternos';
import RecomendacionesApuestas from './components/RecomendacionesApuestas';
import PrediccionesGranulares from './components/PrediccionesGranulares';
import AnalisisMomentum from './components/AnalisisMomentum';
import IntegracionMercados from './components/IntegracionMercados';
import TrackingPrecision from './components/TrackingPrecision';
import AlertasOportunidades from './components/AlertasOportunidades';
import { usePrediction } from './proyeccionPartidoApi';

const ProyeccionPartidoPage: React.FC = () => {
  // Ejemplo de uso del hook de la API
  const { data: predictionData, isLoading, error } = usePrediction('equipoA', 'equipoB');

  if (isLoading) return <div className="text-center py-4">Cargando predicción...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error al cargar la predicción: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Proyección de Partido - Predicción de Rendimiento
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Panel de Predicción de Resultados */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Predicción del Próximo Partido</h2>
          {predictionData ? (
            <div>
              <p className="text-lg mb-2">
                <span className="font-medium">{predictionData.equipoLocal}</span> vs{' '}
                <span className="font-medium">{predictionData.equipoVisitante}</span>
              </p>
              <div className="flex justify-around items-center my-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600">{Math.round(predictionData.probabilidadVictoriaLocal * 100)}%</p>
                  <p className="text-gray-500">Victoria Local</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-yellow-600">{Math.round(predictionData.probabilidadEmpate * 100)}%</p>
                  <p className="text-gray-500">Empate</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-red-600">{Math.round(predictionData.probabilidadVictoriaVisitante * 100)}%</p>
                  <p className="text-gray-500">Victoria Visitante</p>
                </div>
              </div>
              <p className="text-xl font-semibold text-gray-800 mt-4">
                Resultado más probable: <span className="text-blue-600">{predictionData.resultadoMasProbable}</span>
              </p>
            </div>
          ) : (
            <p className="text-gray-600">No hay datos de predicción disponibles.</p>
          )}
        </div>

        {/* Componente del Modelo Predictivo */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Detalles del Modelo Predictivo</h2>
          <ModeloPredictivo />
        </div>
      </div>

      {/* Sección de Métricas Clave */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Métricas Clave que Influyen en la Predicción</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Rendimiento histórico en casa y fuera.</li>
          <li>Forma reciente (últimos 5 partidos).</li>
          <li>Enfrentamientos directos previos.</li>
          <li>Goles marcados y recibidos.</li>
          <li>Lesiones y suspensiones de jugadores clave.</li>
          <li>Factores externos (clima, hora del partido, etc.).</li>
        </ul>
      </div>

      {/* Sección de Escenarios Alternativos - Integración de SimuladorEscenariosIA */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <SimuladorEscenariosIA />
      </div>

      {/* Sección de Factores Externos - Integración de AnalisisFactoresExternos */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <AnalisisFactoresExternos />
      </div>

      {/* Sección de Predicciones Granulares */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <PrediccionesGranulares />
      </div>

      {/* Sección de Análisis de Momentum */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <AnalisisMomentum />
      </div>

      {/* Sección de Apuestas y Oportunidades */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Mercados de Apuestas y Oportunidades</h2>
        <RecomendacionesApuestas />
        <IntegracionMercados />
        <AlertasOportunidades />
      </div>

      {/* Sección de Tracking de Precisión */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
        <TrackingPrecision />
      </div>
    </div>
  );
};

export default ProyeccionPartidoPage;
