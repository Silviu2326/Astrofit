
import React, { useState } from 'react';
import { TaxExemption, useGetTaxExemptionsQuery } from '../impuestosApi';

const ExencionesEspeciales: React.FC = () => {
  const { data: exemptions, isLoading, error } = useGetTaxExemptionsQuery();
  const [newExemption, setNewExemption] = useState<Partial<TaxExemption>>({
    name: '',
    description: '',
    criteria: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExemption(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddExemption = () => {
    if (newExemption.name && newExemption.description && newExemption.criteria) {
      // In a real application, you would dispatch a mutation here
      console.log('Adding new exemption:', newExemption);
      alert(`Exención '${newExemption.name}' añadida (mock).`);
      setNewExemption({ name: '', description: '', criteria: '' });
    }
  };

  if (isLoading) return <p>Cargando exenciones especiales...</p>;
  if (error) return <p className="text-red-500">Error al cargar exenciones especiales.</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Gestión de Exenciones Especiales</h3>
      {exemptions && exemptions.length > 0 ? (
        <ul className="list-disc pl-5 mb-4 space-y-2">
          {exemptions.map((exemption) => (
            <li key={exemption.id} className="text-gray-600">
              <span className="font-medium">{exemption.name}:</span> {exemption.description} (Criterio: {exemption.criteria})
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No hay exenciones especiales configuradas.</p>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Añadir Nueva Exención</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="exemptionName" className="block text-sm font-medium text-gray-700">Nombre de la Exención</label>
            <input
              type="text"
              id="exemptionName"
              name="name"
              value={newExemption.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ej. Servicios Educativos"
            />
          </div>
          <div>
            <label htmlFor="exemptionDescription" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              id="exemptionDescription"
              name="description"
              value={newExemption.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Detalle de la exención y su aplicación."
            ></textarea>
          </div>
          <div>
            <label htmlFor="exemptionCriteria" className="block text-sm font-medium text-gray-700">Criterio de Aplicación</label>
            <input
              type="text"
              id="exemptionCriteria"
              name="criteria"
              value={newExemption.criteria}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ej. client_type:ONG, service_code:EDU001"
            />
          </div>
          <button
            onClick={handleAddExemption}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Añadir Exención
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExencionesEspeciales;
