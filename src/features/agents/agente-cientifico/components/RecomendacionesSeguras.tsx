import React, { useEffect, useState } from 'react';
import { fetchRecomendacionesSeguras, RecomendacionSegura } from '../agenteCientificoApi';

const RecomendacionesSeguras: React.FC = () => {
  const [recomendaciones, setRecomendaciones] = useState<RecomendacionSegura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecomendaciones = async () => {
      const data = await fetchRecomendacionesSeguras();
      setRecomendaciones(data);
      setLoading(false);
    };
    getRecomendaciones();
  }, []);

  if (loading) {
    return <div className="text-gray-600">Cargando recomendaciones seguras...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recomendaciones Seguras</h2>
      <p className="text-gray-600 mb-4">Sustituciones basadas en ciencia (ej. usar split squat en vez de back squat en caso de dolor lumbar).</p>
      <div className="space-y-4">
        {recomendaciones.map((rec) => (
          <div key={rec.id} className="border border-gray-200 rounded-md p-4">
            <h3 className="text-xl font-semibold text-gray-700">Problema: {rec.problema}</h3>
            <p className="text-gray-600 mt-1">Alternativa Segura: <span className="font-medium">{rec.alternativaSegura}</span></p>
            <p className="text-sm text-gray-500 mt-2">Base Científica: {rec.baseCientifica}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecomendacionesSeguras;
