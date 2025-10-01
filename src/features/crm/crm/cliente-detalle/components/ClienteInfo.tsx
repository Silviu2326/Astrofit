import React from 'react';
import { Cliente } from '../clienteDetalleApi';

interface ClienteInfoProps {
  cliente: Cliente;
}

const ClienteInfo: React.FC<ClienteInfoProps> = ({ cliente }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
        <dl className="divide-y divide-gray-200">
          <div className="py-2 flex justify-between text-sm font-medium text-gray-500">
            <dt>Email:</dt>
            <dd className="text-gray-900">{cliente.contacto.email}</dd>
          </div>
          <div className="py-2 flex justify-between text-sm font-medium text-gray-500">
            <dt>Teléfono:</dt>
            <dd className="text-gray-900">{cliente.contacto.telefono}</dd>
          </div>
          <div className="py-2 flex justify-between text-sm font-medium text-gray-500">
            <dt>Dirección:</dt>
            <dd className="text-gray-900">{cliente.contacto.direccion}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles Generales</h3>
        <dl className="divide-y divide-gray-200">
          <div className="py-2 flex justify-between text-sm font-medium text-gray-500">
            <dt>Fecha de Alta:</dt>
            <dd className="text-gray-900">{new Date(cliente.fechaAlta).toLocaleDateString()}</dd>
          </div>
          <div className="py-2 flex justify-between text-sm font-medium text-gray-500">
            <dt>Estado:</dt>
            <dd className={`text-gray-900 ${cliente.estado === 'Activo' ? 'text-green-600' : cliente.estado === 'Inactivo' ? 'text-red-600' : 'text-yellow-600'}`}>
              {cliente.estado}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ClienteInfo;