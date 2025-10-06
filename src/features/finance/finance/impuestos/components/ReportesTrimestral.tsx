
import React from 'react';
import { useGetQuarterlyReportsQuery } from '../impuestosApi';

const ReportesTrimestral: React.FC = () => {
  const { data: reports, isLoading, error } = useGetQuarterlyReportsQuery();

  if (isLoading) return <p>Cargando reportes trimestrales...</p>;
  if (error) return <p className="text-red-500">Error al cargar reportes trimestrales.</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Reportes Trimestrales para Hacienda</h3>
      {reports && reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-md p-3 bg-gray-50">
              <p className="font-medium text-gray-800">Trimestre: {report.quarter} {report.year}</p>
              <p className="text-gray-700">Ventas Totales: {report.totalSales.toFixed(2)} €</p>
              <p className="text-gray-700">Impuestos Recaudados: {report.totalTaxCollected.toFixed(2)} €</p>
              <p className="text-gray-700">Exenciones Aplicadas: {report.totalExemptions.toFixed(2)} €</p>
              <p className="text-sm text-gray-600">Fecha del Reporte: {report.reportDate}</p>
              <p className={`text-sm font-semibold ${report.status === 'submitted' ? 'text-green-600' : 'text-yellow-600'}`}>
                Estado: {report.status === 'submitted' ? 'Presentado' : 'Borrador'}
              </p>
              <button
                onClick={() => alert(`Descargando reporte ${report.quarter}-${report.year} (mock)...`)}
                className="mt-2 inline-flex justify-center py-1 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Descargar PDF
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No hay reportes trimestrales disponibles.</p>
      )}
      <button
        onClick={() => alert('Generando nuevo reporte trimestral (mock)...')}
        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generar Nuevo Reporte
      </button>
    </div>
  );
};

export default ReportesTrimestral;
