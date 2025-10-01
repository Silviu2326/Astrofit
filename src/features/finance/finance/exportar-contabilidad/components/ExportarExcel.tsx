import React, { useState } from 'react';
import { exportAccountingData } from '../exportarContabilidadApi';

const ExportarExcel: React.FC = () => {
  const [period, setPeriod] = useState<string>('Q3 2024');
  const [categories, setCategories] = useState<string[]>(['Ingresos', 'Gastos']);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const availableCategories = ['Ingresos', 'Gastos', 'Impuestos', 'Nóminas', 'Proveedores'];

  const handleCategoryChange = (category: string) => {
    setCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleExport = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const result = await exportAccountingData({ format: 'excel', period, categories });
      setMessage(result);
    } catch (error) {
      setMessage(`Error al exportar a Excel: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exportar a Excel</h2>
      <p className="text-gray-600 mb-6">Exporta informes completos en formato Excel, segmentando datos por categorías fiscales.</p>

      <div className="mb-4">
        <label htmlFor="period-excel" className="block text-sm font-medium text-gray-700 mb-2">Período:</label>
        <input
          type="text"
          id="period-excel"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="Ej: Q3 2024, Septiembre 2024"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Categorías a incluir:</label>
        <div className="flex flex-wrap gap-3">
          {availableCategories.map((cat) => (
            <div key={cat} className="flex items-center">
              <input
                type="checkbox"
                id={`category-excel-${cat}`}
                checked={categories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`category-excel-${cat}`} className="ml-2 text-sm text-gray-900">{cat}</label>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleExport}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Exportando...' : 'Exportar a Excel'}
      </button>

      {message && (
        <p className="mt-4 text-sm text-green-600">{message}</p>
      )}
    </div>
  );
};

export default ExportarExcel;
