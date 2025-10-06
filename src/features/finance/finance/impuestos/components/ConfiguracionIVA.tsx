
import React, { useState } from 'react';
import { TaxRate, useGetTaxRatesQuery } from '../impuestosApi';

const ConfiguracionIVA: React.FC = () => {
  const { data: taxRates, isLoading, error } = useGetTaxRatesQuery();
  const [newRate, setNewRate] = useState<Partial<TaxRate>>({
    name: '',
    rate: 0,
    type: 'IVA',
    appliesTo: 'both',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewRate(prev => ({
      ...prev,
      [name]: name === 'rate' ? parseFloat(value) : value,
    }));
  };

  const handleAddRate = () => {
    if (newRate.name && newRate.rate !== undefined) {
      // In a real application, you would dispatch a mutation here
      console.log('Adding new tax rate:', newRate);
      alert(`Tasa de ${newRate.name} (${newRate.rate * 100}%) añadida (mock).`);
      setNewRate({ name: '', rate: 0, type: 'IVA', appliesTo: 'both' });
    }
  };

  if (isLoading) return <p>Cargando configuración de IVA...</p>;
  if (error) return <p className="text-red-500">Error al cargar la configuración de IVA.</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Tasas de IVA Actuales</h3>
      <ul className="list-disc pl-5 mb-4">
        {taxRates?.filter(rate => rate.type === 'IVA').map((rate) => (
          <li key={rate.id} className="text-gray-600">
            {rate.name}: {rate.rate * 100}% (Aplica a: {rate.appliesTo === 'both' ? 'Servicios y Productos' : rate.appliesTo === 'services' ? 'Servicios' : 'Productos'})
          </li>
        ))}
      </ul>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Añadir Nueva Tasa de IVA</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="rateName" className="block text-sm font-medium text-gray-700">Nombre de la Tasa</label>
            <input
              type="text"
              id="rateName"
              name="name"
              value={newRate.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ej. IVA Reducido"
            />
          </div>
          <div>
            <label htmlFor="rateValue" className="block text-sm font-medium text-gray-700">Valor de la Tasa (%)</label>
            <input
              type="number"
              id="rateValue"
              name="rate"
              value={newRate.rate ? newRate.rate * 100 : ''}
              onChange={(e) => setNewRate(prev => ({ ...prev, rate: parseFloat(e.target.value) / 100 }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Ej. 10 (para 10%)"
            />
          </div>
          <div>
            <label htmlFor="appliesTo" className="block text-sm font-medium text-gray-700">Aplica a</label>
            <select
              id="appliesTo"
              name="appliesTo"
              value={newRate.appliesTo}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="both">Servicios y Productos</option>
              <option value="services">Servicios</option>
              <option value="products">Productos</option>
            </select>
          </div>
          <button
            onClick={handleAddRate}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Añadir Tasa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfiguracionIVA;
