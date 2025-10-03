// src/features/historial-asistencias/components/TablaEntradas.tsx
import React from 'react';
import { AttendanceEntry } from '../historialAsistenciasApi';

interface TablaEntradasProps {
  entries: AttendanceEntry[];
}

export const TablaEntradas: React.FC<TablaEntradasProps> = ({ entries }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
              Cliente
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
              Hora
            </th>
            <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-600">
              Clase
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No hay entradas para mostrar.
              </td>
            </tr>
          ) : (
            entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-900">
                  {entry.cliente}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-900">
                  {new Date(entry.hora).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 text-sm text-gray-900">
                  {entry.clase}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
