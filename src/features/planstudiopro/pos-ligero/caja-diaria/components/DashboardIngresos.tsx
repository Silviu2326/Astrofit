import React from 'react';
import { IngresoDesglose } from '../cajaDiariaApi';

interface DashboardIngresosProps {
  totalIngresos: number;
  desgloseClases: IngresoDesglose[];
  desgloseProductos: IngresoDesglose[];
}

const DashboardIngresos: React.FC<DashboardIngresosProps> = ({
  totalIngresos,
  desgloseClases,
  desgloseProductos,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Resumen de Ingresos del Día</h2>

      <div className="mb-6">
        <p className="text-gray-600 text-lg">Total de Ingresos:</p>
        <p className="text-4xl font-bold text-green-600">{totalIngresos.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-medium text-gray-700 mb-3">Desglose por Clases</h3>
          {desgloseClases.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600">
              {desgloseClases.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.nombre}</span>
                  <span>{item.monto.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay ingresos por clases.</p>
          )}
        </div>

        <div>
          <h3 className="text-xl font-medium text-gray-700 mb-3">Desglose por Productos</h3>
          {desgloseProductos.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600">
              {desgloseProductos.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.nombre}</span>
                  <span>{item.monto.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No hay ingresos por productos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardIngresos;
