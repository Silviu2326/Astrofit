import React, { useState } from 'react';

const CalculadoraComisiones: React.FC = () => {
  const [montoVenta, setMontoVenta] = useState<number>(0);
  const [porcentajeComision, setPorcentajeComision] = useState<number>(10); // Default 10%
  const [montoComision, setMontoComision] = useState<number>(0);

  const calcularComision = () => {
    const comision = (montoVenta * (porcentajeComision / 100));
    setMontoComision(comision);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Calculadora de Comisiones</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="montoVenta" className="block text-sm font-medium text-gray-700">
            Monto de Venta (€)
          </label>
          <input
            type="number"
            id="montoVenta"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={montoVenta}
            onChange={(e) => setMontoVenta(parseFloat(e.target.value))}
            min="0"
          />
        </div>
        <div>
          <label htmlFor="porcentajeComision" className="block text-sm font-medium text-gray-700">
            Porcentaje de Comisión (%)
          </label>
          <input
            type="number"
            id="porcentajeComision"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={porcentajeComision}
            onChange={(e) => setPorcentajeComision(parseFloat(e.target.value))}
            min="0"
            max="100"
          />
        </div>
        <button
          onClick={calcularComision}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calcular Comisión
        </button>
        {montoComision > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-800">
            <p className="font-bold">Monto de Comisión Calculado:</p>
            <p className="text-xl">{formatCurrency(montoComision)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculadoraComisiones;
