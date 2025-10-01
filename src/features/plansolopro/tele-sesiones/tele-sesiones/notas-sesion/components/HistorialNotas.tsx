import React, { useState, useEffect } from 'react';
import { getNotasByCliente } from '../notasSesionApi'; // Asumiendo que tenemos un clienteId

// Función debounce personalizada
const debounce = (func: (value: string) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (value: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(value), wait);
  };
};

interface Nota {
  id: string;
  clienteId: string;
  entrenadorId: string;
  fecha: string;
  contenido: string;
  categoria: string;
}

const HistorialNotas: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const clienteId = 'cliente123'; // Esto debería venir del contexto de la aplicación

  useEffect(() => {
    const fetchNotas = async () => {
      const fetchedNotas = await getNotasByCliente(clienteId);
      setNotas(fetchedNotas);
    };
    fetchNotas();
  }, [clienteId]);

  const handleSearch = debounce((term: string) => {
    setSearchTerm(term);
  }, 300);

  const filteredNotas = notas.filter(nota => {
    const matchesSearch = nota.contenido.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        nota.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? nota.categoria === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(notas.map(nota => nota.categoria)));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Historial de Notas</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar en notas..."
          className="w-full p-2 border rounded-md mb-2"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded-md"
          onChange={(e) => setFilterCategory(e.target.value)}
          value={filterCategory}
        >
          <option value="">Todas las categorías</option>
          {uniqueCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredNotas.length > 0 ? (
          filteredNotas.map((nota) => (
            <div key={nota.id} className="p-3 bg-gray-50 rounded-md border border-gray-200">
              <p className="text-sm text-gray-500">{nota.fecha} - {nota.categoria}</p>
              <p className="mt-1 text-gray-800">{nota.contenido}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No hay notas para mostrar.</p>
        )}
      </div>
    </div>
  );
};

export default HistorialNotas;
