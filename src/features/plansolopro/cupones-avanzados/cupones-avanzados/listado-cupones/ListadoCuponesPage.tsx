import React from 'react';
import { TablaCupones } from './components/TablaCupones';
import { FiltrosCupones } from './components/FiltrosCupones';

const ListadoCuponesPage: React.FC = () => {
  // Mock data for demonstration
  const cupones = [
    {
      id: '1',
      codigo: 'VERANO20',
      tipo: 'porcentaje',
      valor: 20,
      fechaInicio: '2023-06-01',
      fechaFin: '2023-08-31',
      usosActuales: 150,
      limiteUsos: 500,
      estado: 'activo',
    },
    {
      id: '2',
      codigo: 'ENVIOFREE',
      tipo: 'fijo',
      valor: 5,
      fechaInicio: '2023-01-01',
      fechaFin: '2023-12-31',
      usosActuales: 1000,
      limiteUsos: 1000,
      estado: 'agotado',
    },
    {
      id: '3',
      codigo: 'NAVIDAD10',
      tipo: 'porcentaje',
      valor: 10,
      fechaInicio: '2022-12-01',
      fechaFin: '2022-12-25',
      usosActuales: 300,
      limiteUsos: 300,
      estado: 'caducado',
    },
    {
      id: '4',
      codigo: 'NUEVOCLIENTE',
      tipo: 'porcentaje',
      valor: 15,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
      usosActuales: 50,
      limiteUsos: 200,
      estado: 'activo',
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Cupones Avanzados</h1>
      <FiltrosCupones />
      <TablaCupones cupones={cupones} />
    </div>
  );
};

export default ListadoCuponesPage;