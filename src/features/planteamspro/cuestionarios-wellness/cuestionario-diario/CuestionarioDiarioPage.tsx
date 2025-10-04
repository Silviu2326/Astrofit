import React from 'react';
import FormularioWellness from './components/FormularioWellness';
import MonitorEmocional from './components/MonitorEmocional';
import AlertasWellness from './components/AlertasWellness';
import RecomendacionesPersonalizadas from './components/RecomendacionesPersonalizadas';
import IntegracionWearables from './components/IntegracionWearables';
import CuestionariosAdaptativos from './components/CuestionariosAdaptativos';
import SistemaGamificacion from './components/SistemaGamificacion';
import AnalisisCorrelaciones from './components/AnalisisCorrelaciones';
import IntervencionesAutomaticas from './components/IntervencionesAutomaticas';

const CuestionarioDiarioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Cuestionario Diario de Wellness</h1>
        <FormularioWellness />
        <MonitorEmocional />
        <AlertasWellness />
        <RecomendacionesPersonalizadas />
        <IntegracionWearables />
        <CuestionariosAdaptativos />
        <SistemaGamificacion />
        <AnalisisCorrelaciones />
        <IntervencionesAutomaticas />
        {/* TODO: Add basic history display here */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Historial básico de respuestas (próximamente)</p>
        </div>
      </div>
    </div>
  );
};

export default CuestionarioDiarioPage;
