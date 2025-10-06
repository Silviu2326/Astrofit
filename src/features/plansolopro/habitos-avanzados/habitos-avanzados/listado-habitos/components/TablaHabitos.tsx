import React, { useEffect, useState } from 'react';
import { Habito, getHabitos } from '../listadoHabitosApi';
import BarraProgreso from './BarraProgreso';
import EstadoHabito from './EstadoHabito';

const TablaHabitos: React.FC = () => {
  const [habitos, setHabitos] = useState<Habito[]>([]);

  useEffect(() => {
    getHabitos().then(setHabitos);
  }, []);

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Hábito</th>
            <th className="py-3 px-6 text-left">Cliente</th>
            <th className="py-3 px-6 text-left">Tipo</th>
            <th className="py-3 px-6 text-center">Cumplimiento Semanal</th>
            <th className="py-3 px-6 text-center">Estado</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {habitos.map((habito) => (
            <tr key={habito.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{habito.nombre}</td>
              <td className="py-3 px-6 text-left">{habito.cliente}</td>
              <td className="py-3 px-6 text-left">{habito.tipo}</td>
              <td className="py-3 px-6 text-center">
                <BarraProgreso porcentaje={habito.cumplimientoSemanal} />
              </td>
              <td className="py-3 px-6 text-center">
                <EstadoHabito estado={habito.estado} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaHabitos;
