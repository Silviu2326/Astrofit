import React, { useState } from 'react';
import { exportAccountingData } from '../exportarContabilidadApi';

const FormatosCSV: React.FC = () => {
  const [period, setPeriod] = useState<string>('Q3 2024');
  const [format, setFormat] = useState<string>('standard');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const availableFormats = [
    { value: 'standard', label: 'Estándar (compatible con la mayoría)' },
    { value: 'sage', label: 'Sage Contabilidad' },
    { value: 'a3', label: 'A3 Software' },
  ];

  const handleExport = async () => {
    setLoading(true);
    setMessage(null);
    try {
      // For CSV, we might not need categories in the mock API, but keeping it for consistency if needed later
      const result = await exportAccountingData({ format: 'csv', period, categories: [] });
      setMessage(result);
    } catch (error) {
      setMessage(`Error al exportar a CSV: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Formatos CSV</h2>
      <p className="text-gray-600 mb-6">Exporta tus datos contables en formatos CSV estándar y compatibles con software contable popular.</p>

      <div className="mb-4">
        <label htmlFor="period-csv" className="block text-sm font-medium text-gray-700 mb-2">Período:</label>
        <input
          type="text"
          id="period-csv"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="Ej: Q3 2024, Septiembre 2024"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="csv-format" className="block text-sm font-medium text-gray-700 mb-2">Formato CSV:</label>
        <select
          id="csv-format"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          {availableFormats.map((fmt) => (
            <option key={fmt.value} value={fmt.value}>{fmt.label}</option>
          ))}
        </select>
      </div>

      <button
        onClick={handleExport}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Exportando...' : 'Exportar a CSV'}
      </button>

      {message && (
        <p className="mt-4 text-sm text-green-600">{message}</p>
      )}
    </div>
  );
};

export default FormatosCSV;
