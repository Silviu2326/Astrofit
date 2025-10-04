import React, { useEffect, useState } from 'react';
import { fetchArticulosBiblioteca, ArticuloBiblioteca } from '../agenteCientificoApi';

const MiniBiblioteca: React.FC = () => {
  const [articulos, setArticulos] = useState<ArticuloBiblioteca[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticulos = async () => {
      const data = await fetchArticulosBiblioteca();
      setArticulos(data);
      setLoading(false);
    };
    getArticulos();
  }, []);

  if (loading) {
    return <div className="text-gray-600">Cargando mini biblioteca...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Mini Biblioteca</h2>
      <p className="text-gray-600 mb-4">Artículos o guías recomendadas para profundizar.</p>
      <div className="space-y-4">
        {articulos.map((articulo) => (
          <div key={articulo.id} className="border border-gray-200 rounded-md p-4">
            <h3 className="text-xl font-semibold text-gray-700">{articulo.titulo}</h3>
            <p className="text-gray-600 mt-1">{articulo.descripcion}</p>
            <a
              href={articulo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm mt-2 block"
            >
              Leer más
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniBiblioteca;
