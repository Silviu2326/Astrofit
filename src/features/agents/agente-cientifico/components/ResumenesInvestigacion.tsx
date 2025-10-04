import React, { useEffect, useState } from 'react';
import { fetchResumenesInvestigacion, ResumenInvestigacion } from '../agenteCientificoApi';

const ResumenesInvestigacion: React.FC = () => {
  const [resumenes, setResumenes] = useState<ResumenInvestigacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getResumenes = async () => {
      const data = await fetchResumenesInvestigacion();
      setResumenes(data);
      setLoading(false);
    };
    getResumenes();
  }, []);

  if (loading) {
    return <div className="text-gray-600">Cargando resúmenes de investigación...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Resúmenes de Investigación</h2>
      <p className="text-gray-600 mb-4">"Lo último sobre HIIT y pérdida de grasa (3 frases clave)"</p>
      <div className="space-y-4">
        {resumenes.map((resumen) => (
          <div key={resumen.id} className="border border-gray-200 rounded-md p-4">
            <h3 className="text-xl font-semibold text-gray-700">{resumen.titulo}</h3>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              {resumen.frasesClave.map((frase, index) => (
                <li key={index}>{frase}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumenesInvestigacion;
