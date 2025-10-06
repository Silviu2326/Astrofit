import React, { useEffect, useState } from 'react';
import { getSugerenciasAccion, SugerenciaAccion } from '../alertasRetencionApi';

const SugerenciasRetencion: React.FC = () => {
  const [sugerencias, setSugerencias] = useState<SugerenciaAccion[]>([]);

  useEffect(() => {
    const fetchSugerencias = async () => {
      try {
        // Aquí se podría pasar un ID de cliente específico si las sugerencias son por cliente
        const data = await getSugerenciasAccion('cliente-generico'); 
        setSugerencias(data);
      } catch (error) {
        // Manejar error
      }
    };
    fetchSugerencias();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sugerencias de Retención</h2>
      <p className="text-gray-600 mb-4">Recomendaciones automáticas para retener clientes en riesgo.</p>
      <ul className="space-y-3">
        {sugerencias.map((sugerencia) => (
          <li key={sugerencia.id} className="flex items-start">
            <span className="text-blue-500 mr-2">&#8226;</span>
            <p className="text-gray-700">{sugerencia.descripcion}</p>
          </li>
        ))}
        {/* Sugerencia de ejemplo */}
        <li className="flex items-start">
          <span className="text-blue-500 mr-2">&#8226;</span>
          <p className="text-gray-700">Ofrecer una sesión de coaching gratuita para clientes con riesgo alto.</p>
        </li>
      </ul>
    </div>
  );
};

export default SugerenciasRetencion;
