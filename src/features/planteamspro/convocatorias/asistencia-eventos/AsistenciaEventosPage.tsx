import React, { useState, useEffect } from 'react';
import { ListaConfirmaciones } from './components/ListaConfirmaciones';
import { fetchEventConfirmations, updateAthleteAvailability } from './asistenciaEventosApi';

// Import new components
import PredictorAsistencia from './components/PredictorAsistencia';
import GestorConflictos from './components/GestorConflictos';
import ComunicacionAutomatica from './components/ComunicacionAutomatica';
import IntegracionCalendarios from './components/IntegracionCalendarios';
import AnalisisMotivos from './components/AnalisisMotivos';
import SistemaIncentivos from './components/SistemaIncentivos';
import EscalamientoRecordatorios from './components/EscalamientoRecordatorios';
import DashboardTendencias from './components/DashboardTendencias';

interface AthleteConfirmation {
  id: string;
  name: string;
  status: 'confirmado' | 'rechazado' | 'pendiente' | 'dudoso';
}

interface EventData {
  id: string;
  name: string;
  confirmations: AthleteConfirmation[];
}

const AsistenciaEventosPage: React.FC = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // This would typically come from a route parameter or a global state
  const currentEventId = 'event-123'; // Placeholder for a specific event

  useEffect(() => {
    const getEventData = async () => {
      try {
        setLoading(true);
        const data = await fetchEventConfirmations(currentEventId);
        setEventData(data);
      } catch (err) {
        setError('Error al cargar los datos del evento.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getEventData();
  }, [currentEventId]);

  const handleUpdateAvailability = async (athleteId: string, status: 'confirmado' | 'rechazado' | 'pendiente' | 'dudoso') => {
    if (!eventData) return;

    try {
      await updateAthleteAvailability(currentEventId, athleteId, status);
      setEventData(prevData => {
        if (!prevData) return null;
        const updatedConfirmations = prevData.confirmations.map(conf =>
          conf.id === athleteId ? { ...conf, status } : conf
        );
        return { ...prevData, confirmations: updatedConfirmations };
      });
    } catch (err) {
      setError('Error al actualizar la disponibilidad del atleta.');
      console.error(err);
    }
  };

  const calculateConfirmationPercentage = (confirmations: AthleteConfirmation[]): string => {
    if (confirmations.length === 0) return '0%';
    const confirmedCount = confirmations.filter(c => c.status === 'confirmado').length;
    return `${((confirmedCount / confirmations.length) * 100).toFixed(0)}%`;
  };

  if (loading) return <div className="p-4 text-center">Cargando confirmaciones del evento...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
  if (!eventData) return <div className="p-4 text-center">No se encontraron datos para el evento.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Asistencia a Eventos: {eventData.name}</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Resumen de Confirmaciones</h2>
        <p className="text-lg text-gray-600">
          Porcentaje global de confirmaciones: <span className="font-bold text-blue-600">{calculateConfirmationPercentage(eventData.confirmations)}</span>
        </p>
        {/* Add more summary details here if needed */}
      </div>

      <ListaConfirmaciones
        confirmations={eventData.confirmations}
        onUpdateAvailability={handleUpdateAvailability}
      />

      {/* New Intelligent System for Availability */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PredictorAsistencia />
        <GestorConflictos />
        <ComunicacionAutomatica />
        <IntegracionCalendarios />
        <AnalisisMotivos />
        <SistemaIncentivos />
        <EscalamientoRecordatorios />
        <DashboardTendencias />
      </div>

      {/* Future: Add functionality for automatic reminders */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg text-blue-700">
        <p className="font-semibold">Recordatorios automáticos:</p>
        <p>Se enviarán recordatorios a los atletas con estado 'pendiente' o 'dudoso' que no hayan respondido en un tiempo determinado.</p>
      </div>
    </div>
  );
};

export default AsistenciaEventosPage;
