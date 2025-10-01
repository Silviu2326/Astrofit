import React from 'react';
import { PRRecord } from '../historialMarcasApi';

interface TablaPRsProps {
  records: PRRecord[];
}

const TablaPRs: React.FC<TablaPRsProps> = ({ records }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Fecha</th>
            <th className="py-3 px-6 text-left">Ejercicio</th>
            <th className="py-3 px-6 text-left">Marca</th>
            <th className="py-3 px-6 text-left">Unidades</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {records.map((record) => (
            <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-left whitespace-nowrap">{record.date}</td>
              <td className="py-3 px-6 text-left">{record.exercise}</td>
              <td className="py-3 px-6 text-left">{record.mark}</td>
              <td className="py-3 px-6 text-left">{record.units}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPRs;