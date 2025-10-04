import React, { useState, useEffect } from 'react';
import { Comida, Receta } from '../dietaNuevaApi';
import { dietaNuevaApi } from '../dietaNuevaApi';

interface ComidasBuilderProps {
  onNext: (data: { comidasPorDia: { [key: string]: Comida[] } }) => void;
  onBack: () => void;
  initialData: any;
}

const diasSemana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

const ComidasBuilder: React.FC<ComidasBuilderProps> = ({ onNext, onBack, initialData }) => {
  const [recetasDisponibles, setRecetasDisponibles] = useState<Receta[]>([]);
  const [comidasPorDia, setComidasPorDia] = useState<{ [key: string]: Comida[] }>(initialData.comidasPorDia || {});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecetas = async () => {
      const data = await dietaNuevaApi.getRecetas();
      setRecetasDisponibles(data);
      setLoading(false);
    };
    fetchRecetas();

    // Inicializar comidasPorDia si está vacío
    if (Object.keys(comidasPorDia).length === 0) {
      const initialComidas: { [key: string]: Comida[] } = {};
      diasSemana.forEach(dia => {
        initialComidas[dia] = [];
      });
      setComidasPorDia(initialComidas);
    }
  }, []);

  const handleAddComida = (dia: string, receta: Receta) => {
    const nuevaComida: Comida = {
      id: `${receta.id}-${Date.now()}`,
      nombre: receta.nombre,
      calorias: receta.calorias,
      macros: receta.macros,
      recetas: [receta],
    };
    setComidasPorDia(prev => ({
      ...prev,
      [dia]: [...(prev[dia] || []), nuevaComida],
    }));
  };

  const handleRemoveComida = (dia: string, comidaId: string) => {
    setComidasPorDia(prev => ({
      ...prev,
      [dia]: (prev[dia] || []).filter(comida => comida.id !== comidaId),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ comidasPorDia });
  };

  if (loading) {
    return <div className="text-center">Cargando recetas...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">3. Constructor de Comidas</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Recetas Disponibles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recetasDisponibles.map(receta => (
            <div key={receta.id} className="border p-3 rounded-md shadow-sm flex justify-between items-center">
              <div>
                <p className="font-medium">{receta.nombre}</p>
                <p className="text-sm text-gray-600">{receta.calorias} kcal</p>
              </div>
              <button
                type="button"
                onClick={() => handleAddComida(diasSemana[0], receta)} // Añadir al primer día por defecto
                className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
              >
                Añadir
              </button>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Comidas por Día</h3>
      {diasSemana.map(dia => (
        <div key={dia} className="mb-4 p-4 border rounded-md bg-gray-50">
          <h4 className="capitalize font-bold mb-2">{dia}</h4>
          {(comidasPorDia[dia] || []).length === 0 ? (
            <p className="text-gray-600">No hay comidas añadidas para este día.</p>
          ) : (
            <ul>
              {(comidasPorDia[dia] || []).map(comida => (
                <li key={comida.id} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm mb-2">
                  <span>{comida.nombre} ({comida.calorias} kcal)</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveComida(dia, comida.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md text-xs"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
          <select
            onChange={e => {
              const selectedReceta = recetasDisponibles.find(rec => rec.id === e.target.value);
              if (selectedReceta) {
                handleAddComida(dia, selectedReceta);
                e.target.value = ''; // Reset select
              }
            }}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
          >
            <option value="">Añadir receta rápida...</option>
            {recetasDisponibles.map(receta => (
              <option key={receta.id} value={receta.id}>
                {receta.nombre}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};

export default ComidasBuilder;
