import React from 'react';

interface Beneficio {
  id: string;
  nombre: string;
  activo: boolean;
}

interface VistaPreviaMembresiaProps {
  nivelMembresia: string;
  beneficiosActivos: Beneficio[];
}

const VistaPreviaMembresia: React.FC<VistaPreviaMembresiaProps> = ({
  nivelMembresia,
  beneficiosActivos,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-blue-50 bg-opacity-20">
      <h2 className="text-xl font-semibold mb-3">Vista Previa: Membresía {nivelMembresia}</h2>
      <p className="text-gray-700 mb-2">Beneficios incluidos:</p>
      <ul className="list-disc list-inside">
        {beneficiosActivos.length > 0 ? (
          beneficiosActivos.map((beneficio) => (
            <li key={beneficio.id} className="text-gray-800">{beneficio.nombre}</li>
          ))
        ) : (
          <li className="text-gray-500">No hay beneficios activos para este nivel.</li>
        )}
      </ul>
      {/* Aquí se podría añadir la comparativa entre niveles si se pasan más datos */}
    </div>
  );
};

export default VistaPreviaMembresia;
