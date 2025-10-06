import React, { useState } from 'react';
import { createMembresia } from '../listadoMembresiasApi';

const CrearMembresia: React.FC = () => {
  const [nivel, setNivel] = useState<'Bronce' | 'Plata' | 'Oro' | 'Premium'>('Bronce');
  const [miembrosActivos, setMiembrosActivos] = useState<number>(0);
  const [ingresosGenerados, setIngresosGenerados] = useState<number>(0);
  const [estado, setEstado] = useState<'activo' | 'pausado'>('activo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMembresia({
        nivel,
        miembrosActivos,
        ingresosGenerados,
        estado,
      });
      alert('Membresía creada exitosamente!');
      // Aquí podrías recargar la lista de membresías o limpiar el formulario
    } catch (error) {
      alert('Error al crear la membresía.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Crear Nueva Membresía</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nivel" className="block text-sm font-medium text-gray-700">Nivel</label>
          <select
            id="nivel"
            name="nivel"
            value={nivel}
            onChange={(e) => setNivel(e.target.value as 'Bronce' | 'Plata' | 'Oro' | 'Premium')}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>Bronce</option>
            <option>Plata</option>
            <option>Oro</option>
            <option>Premium</option>
          </select>
        </div>
        <div>
          <label htmlFor="miembrosActivos" className="block text-sm font-medium text-gray-700">Miembros Activos</label>
          <input
            type="number"
            id="miembrosActivos"
            name="miembrosActivos"
            value={miembrosActivos}
            onChange={(e) => setMiembrosActivos(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="ingresosGenerados" className="block text-sm font-medium text-gray-700">Ingresos Generados</label>
          <input
            type="number"
            id="ingresosGenerados"
            name="ingresosGenerados"
            value={ingresosGenerados}
            onChange={(e) => setIngresosGenerados(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            id="estado"
            name="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value as 'activo' | 'pausado')}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>activo</option>
            <option>pausado</option>
          </select>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear Membresía
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearMembresia;
