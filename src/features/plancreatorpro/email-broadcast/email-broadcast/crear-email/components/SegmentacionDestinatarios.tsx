import React from 'react';

const SegmentacionDestinatarios: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Segmentación de Destinatarios</h2>
      <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
        {/* Aquí se implementará el sistema de segmentación de destinatarios */}
        <p className="text-gray-500 mb-3">Define a quién se enviará este email basándote en criterios de segmentación.</p>
        <div className="mb-4">
          <label htmlFor="segment" className="block text-sm font-medium text-gray-700">Seleccionar Segmento:</label>
          <select
            id="segment"
            name="segment"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            defaultValue=""
          >
            <option value="" disabled>Selecciona un segmento</option>
            <option value="todos">Todos los suscriptores</option>
            <option value="clientes">Clientes</option>
            <option value="leads">Leads</option>
            <option value="personalizado">Segmento Personalizado</option>
          </select>
        </div>
        {/* Opciones avanzadas de segmentación */}
        <p className="text-sm text-gray-600">Se pueden añadir filtros y condiciones más avanzadas aquí.</p>
      </div>
    </div>
  );
};

export default SegmentacionDestinatarios;
