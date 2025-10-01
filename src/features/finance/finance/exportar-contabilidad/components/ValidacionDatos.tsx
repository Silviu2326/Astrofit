import React, { useState } from 'react';
import { validateAccountingData, ValidationResult } from '../exportarContabilidadApi';

const ValidacionDatos: React.FC = () => {
  const [period, setPeriod] = useState<string>('Q3 2024');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleValidate = async () => {
    setLoading(true);
    setError(null);
    setValidationResult(null);
    try {
      const result = await validateAccountingData(period);
      setValidationResult(result);
    } catch (err) {
      setError(`Error al validar datos: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Validación de Datos Antes de Exportar</h2>
      <p className="text-gray-600 mb-6">Valida tus datos contables para evitar errores antes de generar cualquier informe o envío.</p>

      <div className="mb-4">
        <label htmlFor="validation-period" className="block text-sm font-medium text-gray-700 mb-2">Período a Validar:</label>
        <input
          type="text"
          id="validation-period"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="Ej: Q3 2024, Septiembre 2024"
        />
      </div>

      <button
        onClick={handleValidate}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Validando...' : 'Validar Datos'}
      </button>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      {validationResult && (
        <div className="mt-6 p-4 rounded-md">
          {validationResult.isValid ? (
            <div className="bg-green-50 border-l-4 border-green-400 text-green-700 p-4">
              <p className="font-bold">Validación Exitosa:</p>
              <p>Los datos para el período {period} son válidos para exportar.</p>
            </div>
          ) : (
            <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4">
              <p className="font-bold">Errores de Validación:</p>
              <ul className="list-disc list-inside">
                {validationResult.errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {validationResult.warnings.length > 0 && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 mt-4">
              <p className="font-bold">Advertencias:</p>
              <ul className="list-disc list-inside">
                {validationResult.warnings.map((warn, index) => (
                  <li key={index}>{warn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ValidacionDatos;
