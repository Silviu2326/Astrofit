
import React, { useState } from 'react';
import GeneradorWidget from './components/GeneradorWidget';
import FormularioReserva from './components/FormularioReserva';
import IntegracionCRM from './components/IntegracionCRM';
import PersonalizacionDiseno from './components/PersonalizacionDiseno';
import AnaliticsWidget from './components/AnaliticsWidget';

const WidgetCaptacionPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generador' | 'formulario' | 'crm' | 'diseno' | 'analytics'>('generador');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Módulo Widget de Captación - Automatización Web</h1>

      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'generador' ? 'text-blue-600 border-blue-600' : 'hover:text-gray-600 hover:border-gray-300'}`}
              onClick={() => setActiveTab('generador')}
              type="button"
              role="tab"
            >
              Generador de Widget
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'formulario' ? 'text-blue-600 border-blue-600' : 'hover:text-gray-600 hover:border-gray-300'}`}
              onClick={() => setActiveTab('formulario')}
              type="button"
              role="tab"
            >
              Formulario de Reserva
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'crm' ? 'text-blue-600 border-blue-600' : 'hover:text-gray-600 hover:border-gray-300'}`}
              onClick={() => setActiveTab('crm')}
              type="button"
              role="tab"
            >
              Integración CRM
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'diseno' ? 'text-blue-600 border-blue-600' : 'hover:text-gray-600 hover:border-gray-300'}`}
              onClick={() => setActiveTab('diseno')}
              type="button"
              role="tab"
            >
              Personalización de Diseño
            </button>
          </li>
          <li role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'analytics' ? 'text-blue-600 border-blue-600' : 'hover:text-gray-600 hover:border-gray-300'}`}
              onClick={() => setActiveTab('analytics')}
              type="button"
              role="tab"
            >
              Analytics del Widget
            </button>
          </li>
        </ul>
      </div>

      <div id="default-tab-content">
        {activeTab === 'generador' && <GeneradorWidget />}
        {activeTab === 'formulario' && <FormularioReserva />}
        {activeTab === 'crm' && <IntegracionCRM />}
        {activeTab === 'diseno' && <PersonalizacionDiseno />}
        {activeTab === 'analytics' && <AnaliticsWidget />}
      </div>
    </div>
  );
};

export default WidgetCaptacionPage;
