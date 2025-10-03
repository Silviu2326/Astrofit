
import React, { useState, useEffect } from 'react';
import { widgetCaptacionApi, Lead } from '../widgetCaptacionApi';

interface CRMIntegration {
  id: string;
  name: string;
  status: 'Conectado' | 'Desconectado';
  lastSync: string;
  leadsSynced: number;
}

const mockCRMIntegrations: CRMIntegration[] = [
  {
    id: 'crm-1',
    name: 'Salesforce',
    status: 'Conectado',
    lastSync: '2025-09-26 14:30',
    leadsSynced: 150,
  },
  {
    id: 'crm-2',
    name: 'HubSpot',
    status: 'Desconectado',
    lastSync: 'N/A',
    leadsSynced: 0,
  },
  {
    id: 'crm-3',
    name: 'Pipedrive',
    status: 'Conectado',
    lastSync: '2025-09-26 10:00',
    leadsSynced: 80,
  },
];

const IntegracionCRM: React.FC = () => {
  const [integrations, setIntegrations] = useState<CRMIntegration[]>(mockCRMIntegrations);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<CRMIntegration | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const data = await widgetCaptacionApi.getLeads();
    setLeads(data);
  };

  const handleConnectCRM = (id: string) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id ? { ...integration, status: 'Conectado', lastSync: new Date().toLocaleString() } : integration
      )
    );
    alert(`Conectando con CRM ${id}... (Simulado)`);
  };

  const handleDisconnectCRM = (id: string) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id ? { ...integration, status: 'Desconectado', lastSync: 'N/A' } : integration
      )
    );
    alert(`Desconectando de CRM ${id}... (Simulado)`);
  };

  const handleSyncLeads = (id: string) => {
    const integrationIndex = integrations.findIndex(int => int.id === id);
    if (integrationIndex !== -1) {
      const updatedIntegrations = [...integrations];
      updatedIntegrations[integrationIndex] = {
        ...updatedIntegrations[integrationIndex],
        leadsSynced: updatedIntegrations[integrationIndex].leadsSynced + leads.length, // Simulate syncing all current leads
        lastSync: new Date().toLocaleString(),
      };
      setIntegrations(updatedIntegrations);
      alert(`Sincronizando ${leads.length} leads con CRM ${id}... (Simulado)`);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Integración Automática con CRM</h2>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">CRMs Conectados</h3>
        {integrations.length === 0 ? (
          <p>No hay integraciones de CRM configuradas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="border p-4 rounded-md shadow-sm">
                <h4 className="font-semibold text-lg mb-2">{integration.name}</h4>
                <p className="text-gray-600">Estado: <span className={`font-medium ${integration.status === 'Conectado' ? 'text-green-600' : 'text-red-600'}`}>{integration.status}</span></p>
                <p className="text-gray-600">Última Sincronización: {integration.lastSync}</p>
                <p className="text-gray-600">Leads Sincronizados: {integration.leadsSynced}</p>
                <div className="mt-4 space-x-2">
                  {integration.status === 'Desconectado' ? (
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                      onClick={() => handleConnectCRM(integration.id)}
                    >
                      Conectar
                    </button>
                  ) : (
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                      onClick={() => handleDisconnectCRM(integration.id)}
                    >
                      Desconectar
                    </button>
                  )}
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                    onClick={() => handleSyncLeads(integration.id)}
                    disabled={integration.status === 'Desconectado'}
                  >
                    Sincronizar Leads
                  </button>
                  <button
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
                    onClick={() => setSelectedIntegration(integration)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-medium mb-2">Leads Recibidos (Pendientes de Sincronizar)</h3>
        {leads.length === 0 ? (
          <p>No hay leads nuevos.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Lead</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Widget ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Página Origen</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.widgetId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.sourcePage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lead.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedIntegration && (
        <div className="mt-8 p-4 border-t border-gray-200">
          <h3 className="text-xl font-medium mb-4">Detalles de Integración: {selectedIntegration.name}</h3>
          <p><strong>ID:</strong> {selectedIntegration.id}</p>
          <p><strong>Estado:</strong> {selectedIntegration.status}</p>
          <p><strong>Última Sincronización:</strong> {selectedIntegration.lastSync}</p>
          <p><strong>Leads Sincronizados:</strong> {selectedIntegration.leadsSynced}</p>
          <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={() => setSelectedIntegration(null)}
          >
            Cerrar Detalles
          </button>
        </div>
      )}
    </div>
  );
};

export default IntegracionCRM;
