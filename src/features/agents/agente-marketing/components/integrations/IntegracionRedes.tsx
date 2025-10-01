
import React, { useState, useEffect } from 'react';

interface SocialMediaIntegration {
  platform: string;
  connected: boolean;
  accounts: { id: string; name: string; status: string }[];
  lastSync: string;
}

const IntegracionRedes: React.FC = () => {
  const [integrations, setIntegrations] = useState<SocialMediaIntegration[]>([
    {
      platform: 'Instagram',
      connected: false,
      accounts: [],
      lastSync: '',
    },
    {
      platform: 'Facebook',
      connected: false,
      accounts: [],
      lastSync: '',
    },
    {
      platform: 'LinkedIn',
      connected: false,
      accounts: [],
      lastSync: '',
    },
  ]);

  useEffect(() => {
    // Simulate fetching initial integration status
    const fetchIntegrations = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate latency
      setIntegrations([
        {
          platform: 'Instagram',
          connected: true,
          accounts: [{ id: 'insta_user1', name: 'FitnessPro', status: 'Active' }],
          lastSync: '2025-09-27 10:00:00',
        },
        {
          platform: 'Facebook',
          connected: false,
          accounts: [],
          lastSync: '',
        },
        {
          platform: 'LinkedIn',
          connected: true,
          accounts: [{ id: 'linkedin_user1', name: 'HealthyLifeCoach', status: 'Active' }],
          lastSync: '2025-09-27 09:30:00',
        },
      ]);
    };
    fetchIntegrations();
  }, []);

  const handleConnect = async (platform: string) => {
    console.log(`Attempting to connect to ${platform} via OAuth...`);
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate OAuth redirect and callback
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.platform === platform
          ? {
              ...integration,
              connected: true,
              accounts: [...integration.accounts, { id: `${platform.toLowerCase()}_new`, name: `New ${platform} Account`, status: 'Active' }],
              lastSync: new Date().toLocaleString(),
            }
          : integration
      )
    );
    console.log(`${platform} connected successfully.`);
  };

  const handleDisconnect = (platform: string, accountId: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.platform === platform
          ? {
              ...integration,
              accounts: integration.accounts.filter((acc) => acc.id !== accountId),
              connected: integration.accounts.filter((acc) => acc.id !== accountId).length > 0,
            }
          : integration
      )
    );
  };

  const handleSync = async (platform: string) => {
    console.log(`Sincronizando métricas para ${platform}...`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate sync latency
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.platform === platform
          ? { ...integration, lastSync: new Date().toLocaleString() }
          : integration
      )
    );
    console.log(`Métricas de ${platform} sincronizadas.`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Integración con Redes Sociales</h2>
      {integrations.map((integration) => (
        <div key={integration.platform} style={styles.platformCard}>
          <h3 style={styles.platformTitle}>{integration.platform}</h3>
          {integration.connected ? (
            <div>
              <p style={styles.statusText}>Estado: <span style={{ color: 'green' }}>Conectado</span></p>
              <p style={styles.statusText}>Última Sincronización: {integration.lastSync}</p>
              <button onClick={() => handleSync(integration.platform)} style={styles.syncButton}>
                Sincronizar Métricas
              </button>
              <h4 style={styles.accountsTitle}>Cuentas Conectadas:</h4>
              {integration.accounts.map((account) => (
                <div key={account.id} style={styles.accountItem}>
                  <span>{account.name} ({account.status})</span>
                  <button onClick={() => handleDisconnect(integration.platform, account.id)} style={styles.disconnectButton}>
                    Desconectar
                  </button>
                </div>
              ))}
              <button onClick={() => handleConnect(integration.platform)} style={styles.connectButton}>
                Añadir Otra Cuenta
              </button>
            </div>
          ) : (
            <div>
              <p style={styles.statusText}>Estado: <span style={{ color: 'red' }}>Desconectado</span></p>
              <button onClick={() => handleConnect(integration.platform)} style={styles.connectButton}>
                Conectar {integration.platform} (OAuth)
              </button>
            </div>
          )}
        </div>
      ))}
      <div style={styles.dashboardStatus}>
        <h3 style={styles.dashboardTitle}>Dashboard de Estado de Integraciones</h3>
        {integrations.map(integration => (
          <p key={`dashboard-${integration.platform}`}>
            {integration.platform}: {integration.connected ? 'Activo' : 'Inactivo'} ({integration.accounts.length} cuentas)
          </p>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  heading: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
  },
  platformCard: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  platformTitle: {
    color: '#0056b3',
    marginBottom: '15px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
  },
  statusText: {
    fontSize: '1em',
    marginBottom: '10px',
  },
  connectButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    marginTop: '10px',
    marginRight: '10px',
  },
  disconnectButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.8em',
    marginLeft: '10px',
  },
  syncButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9em',
    marginTop: '10px',
    marginBottom: '15px',
  },
  accountsTitle: {
    color: '#555',
    marginTop: '20px',
    marginBottom: '10px',
    borderTop: '1px solid #eee',
    paddingTop: '15px',
  },
  accountItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px dotted #eee',
  },
  dashboardStatus: {
    backgroundColor: '#e9ecef',
    border: '1px solid #ced4da',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '30px',
  },
  dashboardTitle: {
    color: '#333',
    marginBottom: '15px',
  },
};

export default IntegracionRedes;
