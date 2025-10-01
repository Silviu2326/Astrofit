// src/features/historial-asistencias/components/EstadisticasAcceso.tsx
import React from 'react';
import { AttendanceEntry } from '../historialAsistenciasApi';

interface EstadisticasAccesoProps {
  entries: AttendanceEntry[];
}

export const EstadisticasAcceso: React.FC<EstadisticasAccesoProps> = ({ entries }) => {
  const totalEntries = entries.length;

  const getPeakHour = () => {
    if (entries.length === 0) return 'N/A';

    const hourCounts: { [key: string]: number } = {};
    entries.forEach(entry => {
      const hour = new Date(entry.hora).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    let peakHour = '';
    let maxCount = 0;

    for (const hour in hourCounts) {
      if (hourCounts[hour] > maxCount) {
        maxCount = hourCounts[hour];
        peakHour = `${hour}:00 - ${parseInt(hour) + 1}:00`;
      }
    }
    return peakHour;
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Total Entradas</h3>
        <p className="text-3xl font-bold text-blue-600">{totalEntries}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Hora Pico de Acceso</h3>
        <p className="text-3xl font-bold text-blue-600">{getPeakHour()}</p>
      </div>
    </>
  );
};
