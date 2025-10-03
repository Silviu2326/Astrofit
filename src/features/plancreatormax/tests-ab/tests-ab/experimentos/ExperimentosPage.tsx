import React from 'react';
import PanelExperimentos from './components/PanelExperimentos';
import CreadorTest from './components/CreadorTest';
import MonitorTiempoReal from './components/MonitorTiempoReal';

const ExperimentosPage: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tests A/B - Experimentos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PanelExperimentos />
        </div>
        <div className="lg:col-span-1">
          <CreadorTest />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
          <MonitorTiempoReal />
        </div>
      </div>
    </div>
  );
};

export default ExperimentosPage;
