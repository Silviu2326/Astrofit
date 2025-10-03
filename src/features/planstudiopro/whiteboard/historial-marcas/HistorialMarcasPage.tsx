import React from 'react';
import GraficoEvolucion from '../components/GraficoEvolucion';
import TablaPRs from '../components/TablaPRs';
import RegistroMarca from '../components/RegistroMarca';
import { useHistorialMarcas } from '../historialMarcasApi';

// Nuevos componentes
import IAPredictiva from './components/IAPredictiva';
import AnalisisBiomecanico from './components/AnalisisBiomecanico';
import ComparativasElite from './components/ComparativasElite';
import CoachingVirtual from './components/CoachingVirtual';
import TrackingLesiones from './components/TrackingLesiones';
import IntegracionNutricion from './components/IntegracionNutricion';
import PeriodizacionAutomatica from './components/PeriodizacionAutomatica';
import AnalisisFatiga from './components/AnalisisFatiga';
import MetasSMART from './components/MetasSMART';
import CorrelacionesMetricas from './components/CorrelacionesMetricas';
import GraficosMultiVariable from './components/GraficosMultiVariable';
import HeatmapsPerformance from './components/HeatmapsPerformance';
import PrediccionesVisuales from './components/PrediccionesVisuales';
import ComparadorAtletas from './components/ComparadorAtletas';
import CelebracionesPersonalizadas from './components/CelebracionesPersonalizadas';
import SharingMilestones from './components/SharingMilestones';

const HistorialMarcasPage: React.FC = () => {
  const { data, isLoading, error } = useHistorialMarcas();

  if (isLoading) return <div className="text-center py-4">Cargando historial de marcas...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error al cargar: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Historial de Marcas Personales (PRs)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Registrar Nueva Marca</h2>
          <RegistroMarca />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Evolución de Marcas por Ejercicio</h2>
          {data && <GraficoEvolucion data={data.evolutionData} />}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Registro de PRs</h2>
        {data && <TablaPRs records={data.prsRecords} />}
      </div>

      {/* Nuevas Secciones de Performance Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6"><IAPredictiva /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><AnalisisBiomecanico /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><ComparativasElite /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><CoachingVirtual /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><TrackingLesiones /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><IntegracionNutricion /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><PeriodizacionAutomatica /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><AnalisisFatiga /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><MetasSMART /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><CorrelacionesMetricas /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><GraficosMultiVariable /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><HeatmapsPerformance /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><PrediccionesVisuales /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><ComparadorAtletas /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><CelebracionesPersonalizadas /></div>
        <div className="bg-white shadow-lg rounded-lg p-6"><SharingMilestones /></div>
      </div>
    </div>
  );
};

export default HistorialMarcasPage;