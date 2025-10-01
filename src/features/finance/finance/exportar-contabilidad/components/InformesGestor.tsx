import React, { useState, useEffect } from 'react';
import { getGestorReports, ReportData } from '../exportarContabilidadApi';

const InformesGestor: React.FC = () => {
  const [period, setPeriod] = useState<string>('Q3 2024');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, [period]);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGestorReports(period);
      setReportData(data);
    } catch (err) {
      setError(`Error al cargar informes: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informes Específicos para Gestores</h2>
      <p className="text-gray-600 mb-6">Genera informes detallados de ingresos, gastos e impuestos por período para tu gestor o asesoría.</p>

      <div className="mb-4">
        <label htmlFor="report-period" className="block text-sm font-medium text-gray-700 mb-2">Período del Informe:</label>
        <input
          type="text"
          id="report-period"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="Ej: Q3 2024, Anual 2023"
        />
      </div>

      <button
        onClick={fetchReports}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Cargando Informes...' : 'Cargar Informes'}
      </button>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {reportData && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Ingresos</h3>
            <ul className="list-disc list-inside text-gray-700">
              {reportData.income.map((item, index) => (
                <li key={index}>{item.month}: {item.amount}€</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Gastos</h3>
            <ul className="list-disc list-inside text-gray-700">
              {reportData.expenses.map((item, index) => (
                <li key={index}>{item.month}: {item.amount}€</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Impuestos</h3>
            <ul className="list-disc list-inside text-gray-700">
              {reportData.taxes.map((item, index) => (
                <li key={index}>{item.month}: {item.amount}€</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InformesGestor;
