import React, { useState } from 'react';
import { createCampaign } from '../campanasApi';
import { Campaign } from '../types';

const CrearCampana: React.FC = () => {
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState(0);
  const [audienceSegmentation, setAudienceSegmentation] = useState('');
  const [template, setTemplate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign: Omit<Campaign, 'id' | 'status' | 'cost' | 'leadsGenerated' | 'customersConverted' | 'roi'> = {
      name,
      objective,
      startDate,
      endDate,
      budget,
      audienceSegmentation,
      template,
    };
    await createCampaign(newCampaign);
    alert('Campaña creada exitosamente!');
    // Reset form
    setName('');
    setObjective('');
    setStartDate('');
    setEndDate('');
    setBudget(0);
    setAudienceSegmentation('');
    setTemplate('');
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-4">Crear Nueva Campaña</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre de la Campaña</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="objective" className="block text-sm font-medium text-gray-700">Objetivo</label>
          <input
            type="text"
            id="objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Presupuesto</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="audienceSegmentation" className="block text-sm font-medium text-gray-700">Segmentación de Audiencia</label>
          <input
            type="text"
            id="audienceSegmentation"
            value={audienceSegmentation}
            onChange={(e) => setAudienceSegmentation(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label htmlFor="template" className="block text-sm font-medium text-gray-700">Template de Campaña</label>
          <input
            type="text"
            id="template"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Crear Campaña
        </button>
      </form>
    </div>
  );
};

export default CrearCampana;
