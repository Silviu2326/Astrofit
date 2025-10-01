import React, { useState, useEffect } from 'react';
import { updateAutomationSettings, AutomationSettings } from '../exportarContabilidadApi';

const AutomatizacionEnvios: React.FC = () => {
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly'>('monthly');
  const [recipients, setRecipients] = useState<string>('gestor@ejemplo.com');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Mock initial settings (could be fetched from an API in a real app)
  useEffect(() => {
    // Simulate fetching existing settings
    const storedSettings: AutomationSettings = {
      frequency: 'monthly',
      recipients: ['gestor@ejemplo.com', 'asesoria@ejemplo.com'],
      lastSent: '2024-08-31',
    };
    setFrequency(storedSettings.frequency);
    setRecipients(storedSettings.recipients.join(', '));
  }, []);

  const handleSaveSettings = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const recipientsArray = recipients.split(',').map(email => email.trim()).filter(email => email);
      const result = await updateAutomationSettings({ frequency, recipients: recipientsArray });
      setMessage(result);
    } catch (error) {
      setMessage(`Error al guardar la configuración: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Automatización de Envíos a Contabilidad</h2>
      <p className="text-gray-600 mb-6">Configura envíos automáticos mensuales o trimestrales de tus informes a tu asesoría.</p>

      <div className="mb-4">
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-2">Frecuencia de Envío:</label>
        <select
          id="frequency"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value as 'monthly' | 'quarterly')}
        >
          <option value="monthly">Mensual</option>
          <option value="quarterly">Trimestral</option>
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-2">Destinatarios (separados por coma):</label>
        <input
          type="text"
          id="recipients"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          placeholder="ejemplo@gestor.com, otro@asesoria.com"
        />
      </div>

      <button
        onClick={handleSaveSettings}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Guardando...' : 'Guardar Configuración'}
      </button>

      {message && (
        <p className="mt-4 text-sm text-green-600">{message}</p>
      )}
    </div>
  );
};

export default AutomatizacionEnvios;
