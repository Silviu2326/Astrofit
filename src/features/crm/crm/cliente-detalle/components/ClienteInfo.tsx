import React from 'react';
import { Mail, Phone, MapPin, Copy, ExternalLink } from 'lucide-react';
import { Cliente } from '../clienteDetalleApi';

interface ClienteInfoProps {
  cliente: Cliente;
}

const ClienteInfo: React.FC<ClienteInfoProps> = ({ cliente }) => {
  const emailLink = `mailto:${cliente.contacto.email}`;
  const phoneLink = `tel:${cliente.contacto.telefono}`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cliente.contacto.direccion)}`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('No se pudo copiar al portapapeles', err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
        <dl className="divide-y divide-gray-200">
          <div className="py-2 flex justify-between items-center text-sm font-medium text-gray-500">
            <dt className="mr-4">Email:</dt>
            <dd className="text-gray-900 flex items-center gap-2">
              <a href={emailLink} className="text-blue-600 hover:underline inline-flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {cliente.contacto.email}
              </a>
              <button
                type="button"
                onClick={() => handleCopy(cliente.contacto.email)}
                className="p-1 rounded hover:bg-gray-200 text-gray-600"
                aria-label="Copiar email"
                title="Copiar email"
              >
                <Copy className="w-4 h-4" />
              </button>
            </dd>
          </div>
          <div className="py-2 flex justify-between items-center text-sm font-medium text-gray-500">
            <dt className="mr-4">Teléfono:</dt>
            <dd className="text-gray-900 flex items-center gap-2">
              <a href={phoneLink} className="text-blue-600 hover:underline inline-flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {cliente.contacto.telefono}
              </a>
              <button
                type="button"
                onClick={() => handleCopy(cliente.contacto.telefono)}
                className="p-1 rounded hover:bg-gray-200 text-gray-600"
                aria-label="Copiar teléfono"
                title="Copiar teléfono"
              >
                <Copy className="w-4 h-4" />
              </button>
            </dd>
          </div>
          <div className="py-2 flex justify-between items-center text-sm font-medium text-gray-500">
            <dt className="mr-4">Dirección:</dt>
            <dd className="text-gray-900 flex items-center gap-2">
              <a
                href={mapsLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
                title="Abrir en Google Maps"
              >
                <MapPin className="w-4 h-4" />
                {cliente.contacto.direccion}
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(cliente.contacto.direccion)}
                className="p-1 rounded hover:bg-gray-200 text-gray-600"
                aria-label="Copiar dirección"
                title="Copiar dirección"
              >
                <Copy className="w-4 h-4" />
              </button>
            </dd>
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