import React from 'react';

interface EstadoDominioProps {
  status: 'active' | 'pending' | 'error';
  domain: string;
}

const EstadoDominio: React.FC<EstadoDominioProps> = ({ status, domain }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-700 border-green-500',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-500',
    error: 'bg-red-100 text-red-700 border-red-500',
  };

  const statusMessages = {
    active: 'Tu dominio está activo y funcionando correctamente.',
    pending: 'La verificación de tu dominio está en curso. Esto puede tardar unas horas.',
    error: 'Hubo un problema al verificar tu dominio. Por favor, revisa la guía de configuración.',
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${statusColors[status]}`}>
      <h2 className="text-xl font-semibold mb-3">Estado del Dominio: <span className="capitalize">{status}</span></h2>
      <p className="text-gray-700 mb-2">Dominio configurado: <span className="font-medium">{domain}</span></p>
      <p className="text-gray-600">{statusMessages[status]}</p>
      {status === 'error' && (
        <p className="text-sm text-red-600 mt-2">Detalles: Registro CNAME incorrecto o no encontrado. Consulta la guía paso a paso.</p>
      )}
    </div>
  );
};

export default EstadoDominio;
