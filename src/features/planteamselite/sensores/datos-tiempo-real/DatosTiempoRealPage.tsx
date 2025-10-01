import React, { useState, useEffect } from 'react';
import TableroLive from './components/TableroLive';
import SistemaAlertas from './components/SistemaAlertas';
import GrabadorSesion from './components/GrabadorSesion';
import TransmisionLive from './components/TransmisionLive';
import AnalisisZonasIntensidad from './components/AnalisisZonasIntensidad';
import ComparacionHistorica from './components/ComparacionHistorica';
import CoachingAutomatico from './components/CoachingAutomatico';
import IntegracionVideoSincronizado from './components/IntegracionVideoSincronizado';
import DashboardComando from './components/DashboardComando';
import { useGetAlertasQuery } from './datosTiempoRealApi';

interface Metric {
  id: string;
  label: string;
  value: number;
  unit: string;
  threshold: { min: number; max: number };
}

const DatosTiempoRealPage: React.FC = () => {
  const { data, isLoading: loading, error } = useGetAlertasQuery();
  const [teamMetrics, setTeamMetrics] = useState<Metric[][]>([]);

  useEffect(() => {
    if (data) {
      // Simulate processing data for multiple team members
      const processedMetrics: Metric[][] = data.map((memberData: any, index: number) => [
        { id: `speed-${index}`, label: 'Velocidad', value: memberData.speed, unit: 'km/h', threshold: { min: 0, max: 30 } },
        { id: `load-${index}`, label: 'Carga', value: memberData.load, unit: '%', threshold: { min: 0, max: 100 } },
        { id: `heartRate-${index}`, label: 'Pulsaciones', value: memberData.heartRate, unit: 'bpm', threshold: { min: 60, max: 180 } },
      ]);
      setTeamMetrics(processedMetrics);
    }
  }, [data]);

  if (loading) return <div className="text-center p-4">Cargando datos en tiempo real...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error al cargar datos: {error.message}</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Monitorización Live de Entrenamientos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {teamMetrics.length > 0 ? (
          teamMetrics.map((metrics, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Atleta {index + 1}</h2>
              <TableroLive metrics={metrics} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">Esperando datos de los atletas...</p>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Monitorización Profesional Avanzada</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6"><SistemaAlertas /></div>
        <div className="bg-white rounded-lg shadow-md p-6"><GrabadorSesion /></div>
        <div className="bg-white rounded-lg shadow-md p-6"><TransmisionLive /></div>
        <div className="bg-white rounded-lg shadow-md p-6"><AnalisisZonasIntensidad /></div>
        <div className="bg-white rounded-lg shadow-md p-6"><ComparacionHistorica /></div>
        <div className="bg-white rounded-lg shadow-md p-6"><CoachingAutomatico /></div>
        <div className="bg-white rounded-lg shadow-md p-6"><IntegracionVideoSincronizado /></div>
        <div className="bg-white rounded-lg shadow-md p-6"><DashboardComando /></div>
      </div>
    </div>
  );
};

export default DatosTiempoRealPage;
