import React from 'react';
import { Empresa } from '../conveniosCorporativosApi';

interface TarjetasEmpresasProps {
  empresa: Empresa;
}

const TarjetasEmpresas: React.FC<TarjetasEmpresasProps> = ({ empresa }) => {
  const getEstadoColor = (estado: Empresa['estado']) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'inactivo':
        return 'bg-red-100 text-red-800';
      case 'en negociacion':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
      <img src={empresa.logo} alt={`${empresa.nombre} logo`} className="w-24 h-24 object-contain mb-4 rounded-full border-2 border-gray-200" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{empresa.nombre}</h2>
      <p className="text-gray-600 text-sm mb-1">{empresa.sector}</p>
      <p className="text-gray-500 text-xs mb-3">Empleados: {empresa.numeroEmpleados}</p>
      <div className="mb-3">
        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${getEstadoColor(empresa.estado)}`}>
          {empresa.estado.charAt(0).toUpperCase() + empresa.estado.slice(1)}
        </span>
      </div>
      <p className="text-gray-700 text-sm">Contacto: {empresa.contactoPrincipal}</p>
    </div>
  );
};

export default TarjetasEmpresas;
