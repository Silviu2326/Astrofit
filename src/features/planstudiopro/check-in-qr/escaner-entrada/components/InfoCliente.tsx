import React from 'react';

interface ClienteInfo {
  nombre: string;
  membresia: string;
  estado: 'activo' | 'vencida';
}

interface InfoClienteProps {
  cliente: ClienteInfo;
}

const InfoCliente: React.FC<InfoClienteProps> = ({ cliente }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Información del Cliente</h3>
      <p className="text-gray-600"><strong>Nombre:</strong> {cliente.nombre}</p>
      <p className="text-gray-600"><strong>Membresía:</strong> {cliente.membresia}</p>
      <p className="text-gray-600"><strong>Estado:</strong>
        <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium
          ${cliente.estado === 'activo' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
          {cliente.estado === 'activo' ? 'Activa' : 'Vencida'}
        </span>
      </p>
    </div>
  );
};

export default InfoCliente;
