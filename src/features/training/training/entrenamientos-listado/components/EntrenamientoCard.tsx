import React from 'react';
import { Entrenamiento } from '../entrenamientosListadoApi';

interface EntrenamientoCardProps {
  entrenamiento: Entrenamiento;
}

const EntrenamientoCard: React.FC<EntrenamientoCardProps> = ({ entrenamiento }) => {
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
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold mb-2">{entrenamiento.programa}</h3>
        <p className="text-gray-600 mb-1">Cliente: {entrenamiento.cliente}</p>
        <p className="text-gray-600 mb-1">Inicio: {entrenamiento.fechaInicio}</p>
        <p className="text-gray-600 mb-2">Duración: {entrenamiento.duracion}</p>
        <div className="mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(entrenamiento.estado)}`}>
            {entrenamiento.estado}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${entrenamiento.progreso}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 text-right">Progreso: {entrenamiento.progreso}%</p>
      </div>
      <div className="flex justify-end mt-4">
        <button className="text-blue-600 hover:text-blue-900 mr-2">Editar</button>
        <button className="text-purple-600 hover:text-purple-900 mr-2">Duplicar</button>
        <button className="text-yellow-600 hover:text-yellow-900 mr-2">Pausar</button>
        <button className="text-red-600 hover:text-red-900">Finalizar</button>
      </div>
    </div>
  );
};

export default EntrenamientoCard;
