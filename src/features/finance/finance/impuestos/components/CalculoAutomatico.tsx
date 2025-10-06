
import React, { useState } from 'react';
import { TaxRate, TaxCalculation, useGetTaxRatesQuery } from '../impuestosApi';

const CalculoAutomatico: React.FC = () => {
  const { data: taxRates, isLoading, error } = useGetTaxRatesQuery();
  const [amount, setAmount] = useState<number>(0);
  const [selectedTaxRateId, setSelectedTaxRateId] = useState<string>('');
  const [calculatedTax, setCalculatedTax] = useState<TaxCalculation | null>(null);

  React.useEffect(() => {
    if (taxRates && taxRates.length > 0 && !selectedTaxRateId) {
      setSelectedTaxRateId(taxRates[0].id); // Select the first tax rate by default
    }
  }, [taxRates, selectedTaxRateId]);

  const handleCalculate = () => {
    const selectedRate = taxRates?.find(rate => rate.id === selectedTaxRateId);
    if (selectedRate && amount > 0) {
      const taxAmount = amount * selectedRate.rate;
      const totalAmount = amount + taxAmount;
      setCalculatedTax({
        id: `calc_${Date.now()}`,
        invoiceId: `INV-${Date.now()}`,
        amount,
        taxAmount,
        totalAmount,
        taxRatesApplied: [selectedTaxRateId],
        calculationDate: new Date().toISOString().split('T')[0],
      });
    } else {
      setCalculatedTax(null);
    }
  };

  if (isLoading) return <p>Cargando tasas de impuestos para cálculo...</p>;
  if (error) return <p className="text-red-500">Error al cargar tasas de impuestos.</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Simular Cálculo Automático</h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="baseAmount" className="block text-sm font-medium text-gray-700">Monto Base</label>
          <input
            type="number"
            id="baseAmount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Ej. 100.00"
          />
        </div>
        <div>
          <label htmlFor="taxRateSelect" className="block text-sm font-medium text-gray-700">Tasa de Impuesto</label>
          <select
            id="taxRateSelect"
            value={selectedTaxRateId}
            onChange={(e) => setSelectedTaxRateId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {taxRates?.map(rate => (
              <option key={rate.id} value={rate.id}>
                {rate.name} ({rate.rate * 100}%)
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleCalculate}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Calcular Impuesto
        </button>
      </div>

      {calculatedTax && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <h4 className="text-md font-semibold mb-2 text-gray-800">Resultado del Cálculo</h4>
          <p className="text-gray-700">Monto Base: {calculatedTax.amount.toFixed(2)} €</p>
          <p className="text-gray-700">Impuesto ({taxRates?.find(rate => rate.id === selectedTaxRateId)?.name}): {calculatedTax.taxAmount.toFixed(2)} €</p>
          <p className="text-lg font-bold text-gray-800">Monto Total: {calculatedTax.totalAmount.toFixed(2)} €</p>
          <p className="text-sm text-gray-500">Fecha de Cálculo: {calculatedTax.calculationDate}</p>
        </div>
      )}
    </div>
  );
};

export default CalculoAutomatico;
