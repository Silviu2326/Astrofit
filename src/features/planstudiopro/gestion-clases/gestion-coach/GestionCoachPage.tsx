import React, { useState, useEffect } from 'react';
import PanelEntrenadores from './components/PanelEntrenadores';
import CalendarioDisponibilidad from './components/CalendarioDisponibilidad';
import AsignacionClases from './components/AsignacionClases';
import Evaluaciones360 from './components/Evaluaciones360';
import GestorSustituciones from './components/GestorSustituciones';
import TrackingHoras from './components/TrackingHoras';
import SistemaKPIs from './components/SistemaKPIs';
import PlanificadorVacaciones from './components/PlanificadorVacaciones';
import CertificacionesLicencias from './components/CertificacionesLicencias';
import SistemaMentoring from './components/SistemaMentoring';
import IntegracionNomina from './components/IntegracionNomina';
import AnalisisRentabilidad from './components/AnalisisRentabilidad';
import SistemaBonus from './components/SistemaBonus';
import { Coach, fetchCoaches } from './gestionCoachApi';

const GestionCoachPage: React.FC = () => {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);

  useEffect(() => {
    const getCoaches = async () => {
      const data = await fetchCoaches();
      setCoaches(data);
    };
    getCoaches();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Coaches</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <PanelEntrenadores coaches={coaches} onSelectCoach={setSelectedCoach} />
        </div>
        <div>
          {selectedCoach && (
            <div className="bg-white p-4 rounded shadow mb-4">
              <h2 className="text-xl font-semibold mb-2">Detalles del Coach: {selectedCoach.name}</h2>
              <p>Especialidad: {selectedCoach.specialty}</p>
              <p>Estado: {selectedCoach.status}</p>
            </div>
          )}
          <CalendarioDisponibilidad coach={selectedCoach} />
          <AsignacionClases coach={selectedCoach} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Evaluaciones360 />
        <GestorSustituciones />
        <TrackingHoras />
        <SistemaKPIs />
        <PlanificadorVacaciones />
        <CertificacionesLicencias />
        <SistemaMentoring />
        <IntegracionNomina />
        <AnalisisRentabilidad />
        <SistemaBonus />
      </div>
    </div>
  );
};

export default GestionCoachPage;
