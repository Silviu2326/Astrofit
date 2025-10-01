import React, { useState } from 'react';

interface ProcesadorPagoProps {
  total: number;
  onPagoExitoso: () => void;
  onCancelar: () => void;
}

const ProcesadorPago: React.FC<ProcesadorPagoProps> = ({ total, onPagoExitoso, onCancelar }) => {
  const [procesando, setProcesando] = useState(false);

  const simularPago = () => {
    setProcesando(true);
    setTimeout(() => {
      setProcesando(false);
      onPagoExitoso();
    }, 2000); // Simula un retraso de 2 segundos para el pago
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Procesar Pago</h2>
        <p className="text-lg mb-4">Total a pagar: <span className="font-semibold">${total.toFixed(2)}</span></p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Número de tarjeta (simulado)"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Fecha de caducidad (MM/AA)"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="CVC"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onCancelar}
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
            disabled={procesando}
          >
            Cancelar
          </button>
          <button
            onClick={simularPago}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            disabled={procesando}
          >
            {procesando ? 'Procesando...' : 'Pagar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProcesadorPago;
