import React, { useState } from 'react';
import PerfilDeportivo from './components/PerfilDeportivo';
import AnalisisBiomecanico from './components/AnalisisBiomecanico';
import PerfilPsicologico from './components/PerfilPsicologico';
import PlanDesarrollo from './components/PlanDesarrollo';
import IntegracionWearables from './components/IntegracionWearables';
import AlertasMedicas from './components/AlertasMedicas';
import AnalisisTalento from './components/AnalisisTalento';
import TrackingDesarrollo from './components/TrackingDesarrollo';
import RecomendacionesPersonalizadas from './components/RecomendacionesPersonalizadas';

const FichaAtletaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('perfil');

  const renderContent = () => {
    switch (activeTab) {
      case 'perfil':
        return <PerfilDeportivo />;
      case 'personal':
        return <div className="p-4">
                 <h2 className="text-xl font-bold mb-4">Datos Personales</h2>
                 <p>Aquí se mostrarán los datos personales del atleta.</p>
               </div>;
      case 'lesiones':
        return <div className="p-4">
                 <h2 className="text-xl font-bold mb-4">Historial de Lesiones</h2>
                 <ul className="list-disc pl-5">
                   <li>01/01/2023: Esguince de tobillo (Tratamiento: Reposo, fisioterapia)</li>
                   <li>15/05/2024: Distensión muscular (Tratamiento: Hielo, estiramientos)</li>
                 </ul>
               </div>;
      case 'progression':
        return <div className="p-4">
                 <h2 className="text-xl font-bold mb-4">Progresión Física</h2>
                 <p>Gráficos simples de evolución (ej. peso, altura, rendimiento).</p>
                 <div className="bg-gray-200 h-48 flex items-center justify-center text-gray-500">
                   [Gráfico de ejemplo aquí]
                 </div>
               </div>;
      case 'biomecanico':
        return <AnalisisBiomecanico />;
      case 'psicologico':
        return <PerfilPsicologico />;
      case 'desarrollo':
        return <PlanDesarrollo />;
      case 'wearables':
        return <IntegracionWearables />;
      case 'alertas':
        return <AlertasMedicas />;
      case 'talento':
        return <AnalisisTalento />;
      case 'tracking':
        return <TrackingDesarrollo />;
      case 'recomendaciones':
        return <RecomendacionesPersonalizadas />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Ficha de Atleta - Perfil Deportivo</h1>

      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'perfil'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Perfil Básico
          </button>
          <button
            onClick={() => setActiveTab('personal')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'personal'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Datos Personales
          </button>
          <button
            onClick={() => setActiveTab('lesiones')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'lesiones'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Historial de Lesiones
          </button>
          <button
            onClick={() => setActiveTab('progression')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'progression'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Progresión Física
          </button>
          <button
            onClick={() => setActiveTab('biomecanico')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'biomecanico'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Análisis Biomecánico
          </button>
          <button
            onClick={() => setActiveTab('psicologico')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'psicologico'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Perfil Psicológico
          </button>
          <button
            onClick={() => setActiveTab('desarrollo')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'desarrollo'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Plan de Desarrollo
          </button>
          <button
            onClick={() => setActiveTab('wearables')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'wearables'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Integración Wearables
          </button>
          <button
            onClick={() => setActiveTab('alertas')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'alertas'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Alertas Médicas
          </button>
          <button
            onClick={() => setActiveTab('talento')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'talento'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Análisis de Talento
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tracking'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tracking de Desarrollo
          </button>
          <button
            onClick={() => setActiveTab('recomendaciones')}
            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'recomendaciones'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Recomendaciones
          </button>
        </nav>
      </div>

      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default FichaAtletaPage;
