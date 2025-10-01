import React from 'react';
import AlertasVencimiento from './components/AlertasVencimiento';
import ProcesoRenovacion from './components/ProcesoRenovacion';
import HistorialRenovaciones from './components/HistorialRenovaciones';
import HealthScoresAutomaticos from './components/HealthScoresAutomaticos';
import PlaybooksRetencion from './components/PlaybooksRetencion';
import PrediccionChurn from './components/PrediccionChurn';
import OfertasPersonalizadas from './components/OfertasPersonalizadas';
import EscalacionAutomatica from './components/EscalacionAutomatica';
import CustomerAdvocacy from './components/CustomerAdvocacy';
import AnalisisTouchpoints from './components/AnalisisTouchpoints';
import SistemaRewards from './components/SistemaRewards';
import IntegracionExternalData from './components/IntegracionExternalData';
import RetentionOptimization from './components/RetentionOptimization';
import CustomerSuccessCockpit from './components/CustomerSuccessCockpit';
import AutomatedWorkflowBuilder from './components/AutomatedWorkflowBuilder';
import PredictiveAnalyticsDashboard from './components/PredictiveAnalyticsDashboard';
import CommunicationTimeline from './components/CommunicationTimeline';
import SuccessMilestoneCelebrations from './components/SuccessMilestoneCelebrations';
import MobileFirstExperience from './components/MobileFirstExperience';

const RenovacionesPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Renovaciones</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AlertasVencimiento />
        </div>
        <div className="lg:col-span-1">
          <ProcesoRenovacion />
        </div>
      </div>

      <div className="mt-8">
        <HistorialRenovaciones />
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Customer Success Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HealthScoresAutomaticos />
          <PlaybooksRetencion />
          <PrediccionChurn />
          <OfertasPersonalizadas />
          <EscalacionAutomatica />
          <CustomerAdvocacy />
          <AnalisisTouchpoints />
          <SistemaRewards />
          <IntegracionExternalData />
          <RetentionOptimization />
          <CustomerSuccessCockpit />
          <AutomatedWorkflowBuilder />
          <PredictiveAnalyticsDashboard />
          <CommunicationTimeline />
          <SuccessMilestoneCelebrations />
          <MobileFirstExperience />
        </div>
      </div>
    </div>
  );
};

export default RenovacionesPage;
