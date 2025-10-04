import React, { useState } from 'react';
import { Entrenamiento } from '../entrenamientosListadoApi';

interface EntrenamientosTableProps {
  entrenamientos: Entrenamiento[];
}

const EntrenamientosTable: React.FC<EntrenamientosTableProps> = ({ entrenamientos }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof Entrenamiento; direction: 'ascending' | 'descending' } | null>(null);

  const sortedEntrenamientos = React.useMemo(() => {
    let sortableItems = [...entrenamientos];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [entrenamientos, sortConfig]);

  const requestSort = (key: keyof Entrenamiento) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getStatusClass = (estado: Entrenamiento['estado']) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'borrador':
        return 'bg-gray-100 text-gray-800';
      case 'finalizado':
        return 'bg-blue-100 text-blue-800';
      case 'pausado':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return '';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort('cliente')}>Cliente</th>
            <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort('programa')}>Programa</th>
            <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort('estado')}>Estado</th>
            <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort('fechaInicio')}>Fecha Inicio</th>
            <th className="py-3 px-4 text-left cursor-pointer" onClick={() => requestSort('duracion')}>Duración</th>
            <th className="py-3 px-4 text-left">Progreso</th>
            <th className="py-3 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {sortedEntrenamientos.map((entrenamiento) => (
            <tr key={entrenamiento.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-4">{entrenamiento.cliente}</td>
              <td className="py-3 px-4">{entrenamiento.programa}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(entrenamiento.estado)}`}>
                  {entrenamiento.estado}
                </span>
              </td>
              <td className="py-3 px-4">{entrenamiento.fechaInicio}</td>
              <td className="py-3 px-4">{entrenamiento.duracion}</td>
              <td className="py-3 px-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${entrenamiento.progreso}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{entrenamiento.progreso}%</span>
              </td>
              <td className="py-3 px-4">
                <button className="text-blue-600 hover:text-blue-900 mr-2">Editar</button>
                <button className="text-purple-600 hover:text-purple-900 mr-2">Duplicar</button>
                <button className="text-yellow-600 hover:text-yellow-900 mr-2">Pausar</button>
                <button className="text-red-600 hover:text-red-900">Finalizar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntrenamientosTable;
