import React, { useState } from 'react';
import { VistaGantt } from './components/VistaGantt';
import { useAnualCycles } from './calendarioPeriodizacionApi';
import EditorFases from './components/EditorFases';
import AnalisisCarga from './components/AnalisisCarga';
import SincronizadorCompetencias from './components/SincronizadorCompetencias';
import AlertasSolapamiento from './components/AlertasSolapamiento';
import PlantillasDeporte from './components/PlantillasDeporte';
import PrediccionFatiga from './components/PrediccionFatiga';
import IntegracionMeteorologica from './components/IntegracionMeteorologica';
import NotificacionesCambioFase from './components/NotificacionesCambioFase';

const CalendarioPeriodizacionPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const { data: anualCycles, isLoading, error } = useAnualCycles();

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prevYear => prevYear + 1);
    } else {
      setCurrentMonth(prevMonth => prevMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prevYear => prevYear - 1);
    } else {
      setCurrentMonth(prevMonth => prevMonth - 1);
    }
  };

  if (isLoading) return <div className="text-center py-4">Cargando calendario...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error al cargar el calendario: {error.message}</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Calendario de Periodización - Planificación Anual</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Mes Anterior
        </button>
        <h2 className="text-xl font-semibold text-gray-700">
          {new Date(currentYear, currentMonth).toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Mes Siguiente
        </button>
      </div>
      {anualCycles && anualCycles.length > 0 ? (
        <VistaGantt cycles={anualCycles} currentMonth={currentMonth} currentYear={currentYear} />
      ) : (
        <div className="text-center py-8 text-gray-600">No hay ciclos de entrenamiento disponibles.</div>
      )}

      <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Herramientas de Planificación Avanzada</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EditorFases />
          <AnalisisCarga />
          <SincronizadorCompetencias />
          <AlertasSolapamiento />
          <PlantillasDeporte />
          <PrediccionFatiga />
          <IntegracionMeteorologica />
          <NotificacionesCambioFase />
        </div>
      </div>
    </div>
  );
};

export default CalendarioPeriodizacionPage;
