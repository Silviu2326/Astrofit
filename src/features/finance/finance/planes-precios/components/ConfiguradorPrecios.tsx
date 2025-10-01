
// C:/Users/usuario/Documents/project-bolt-sb1-qekdxfwt/project/src/features/planes-precios/components/ConfiguradorPrecios.tsx

import React, { useState, useEffect } from 'react';
import { Plan, planesPreciosApi, PriceHistoryEntry } from '../planesPreciosApi';

const ConfiguradorPrecios: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [newMonthlyPrice, setNewMonthlyPrice] = useState<number | string>('');
  const [priceHistory, setPriceHistory] = useState<PriceHistoryEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPlans = await planesPreciosApi.getPlans();
      const fetchedHistory = await planesPreciosApi.getPriceHistory();
      setPlans(fetchedPlans);
      setPriceHistory(fetchedHistory);
      if (fetchedPlans.length > 0) {
        setSelectedPlanId(fetchedPlans[0].id);
        setNewMonthlyPrice(fetchedPlans[0].priceMonthly);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedPlanId(id);
    const plan = plans.find(p => p.id === id);
    if (plan) {
      setNewMonthlyPrice(plan.priceMonthly);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMonthlyPrice(parseFloat(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlanId && typeof newMonthlyPrice === 'number') {
      const oldPlan = plans.find(p => p.id === selectedPlanId);
      if (oldPlan && oldPlan.priceMonthly !== newMonthlyPrice) {
        // In a real application, you would call an API to update the price
        // and then refetch plans and history.
        console.log(`Updating plan ${selectedPlanId} to new monthly price: ${newMonthlyPrice}€`);
        const updatedPlans = plans.map(plan =>
          plan.id === selectedPlanId ? { ...plan, priceMonthly: newMonthlyPrice } : plan
        );
        setPlans(updatedPlans);

        const newHistoryEntry: PriceHistoryEntry = {
          planId: selectedPlanId,
          oldPrice: oldPlan.priceMonthly,
          newPrice: newMonthlyPrice,
          changeDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
          changedBy: 'Admin User (Mock)',
        };
        setPriceHistory(prev => [newHistoryEntry, ...prev]);
        alert(`Precio del plan ${oldPlan.name} actualizado a ${newMonthlyPrice}€.`);
      } else {
        alert('El nuevo precio es el mismo que el actual o no es válido.');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4">Cargando configurador...</div>;
  }

  const selectedPlan = plans.find(p => p.id === selectedPlanId);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Configurador de Precios Dinámico</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="plan-select" className="block text-sm font-medium text-gray-700">Seleccionar Plan:</label>
          <select
            id="plan-select"
            value={selectedPlanId}
            onChange={handlePlanChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {plans.map(plan => (
              <option key={plan.id} value={plan.id}>{plan.name}</option>
            ))}
          </select>
        </div>

        {selectedPlan && (
          <div>
            <label htmlFor="new-price" className="block text-sm font-medium text-gray-700">Nuevo Precio Mensual ({selectedPlan.name}):</label>
            <input
              type="number"
              id="new-price"
              value={newMonthlyPrice}
              onChange={handlePriceChange}
              step="0.01"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Actualizar Precio
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">Historial de Cambios de Precios</h3>
        {priceHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 border-b text-left text-xs font-semibold text-gray-600">Plan</th>
                  <th className="py-2 px-3 border-b text-left text-xs font-semibold text-gray-600">Precio Anterior</th>
                  <th className="py-2 px-3 border-b text-left text-xs font-semibold text-gray-600">Nuevo Precio</th>
                  <th className="py-2 px-3 border-b text-left text-xs font-semibold text-gray-600">Fecha Cambio</th>
                  <th className="py-2 px-3 border-b text-left text-xs font-semibold text-gray-600">Cambiado Por</th>
                </tr>
              </thead>
              <tbody>
                {priceHistory.map((entry, index) => {
                  const planName = plans.find(p => p.id === entry.planId)?.name || 'Desconocido';
                  return (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-2 px-3 text-sm text-gray-800">{planName}</td>
                      <td className="py-2 px-3 text-sm text-gray-700">{entry.oldPrice}€</td>
                      <td className="py-2 px-3 text-sm text-green-600 font-medium">{entry.newPrice}€</td>
                      <td className="py-2 px-3 text-sm text-gray-500">{entry.changeDate}</td>
                      <td className="py-2 px-3 text-sm text-gray-500">{entry.changedBy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No hay historial de cambios de precios disponible.</p>
        )}
      </div>
    </div>
  );
};

export default ConfiguradorPrecios;
