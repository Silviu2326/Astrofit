
import React from 'react';
import { AccessEntry } from '../reportesAccesosApi';

interface HistorialEntradasProps {
  accessEntries: AccessEntry[];
  totalEntries: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
}

const HistorialEntradas: React.FC<HistorialEntradasProps> = ({
  accessEntries,
  totalEntries,
  currentPage,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 mx-1 rounded-md ${currentPage === i ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Historial de Entradas</h2>

      {accessEntries.length === 0 ? (
        <p className="text-gray-600">No hay entradas para mostrar con los filtros actuales.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hora de Acceso</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sede</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puerta</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accessEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.accessTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.door}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          {renderPaginationButtons()}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default HistorialEntradas;
