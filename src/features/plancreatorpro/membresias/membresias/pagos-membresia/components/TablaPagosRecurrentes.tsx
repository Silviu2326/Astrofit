
import React from 'react';

const TablaPagosRecurrentes: React.FC = () => {
  const pagos = [
    { id: 1, cliente: 'Cliente A', membresia: 'Premium', monto: 29.99, fechaProximoPago: '2025-10-01' },
    { id: 2, cliente: 'Cliente B', membresia: 'Básico', monto: 9.99, fechaProximoPago: '2025-10-05' },
    // Más pagos...
  ];

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-2">Pagos Recurrentes Activos</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membresía</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Próximo Pago</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pagos.map((pago) => (
            <tr key={pago.id}>
              <td className="px-6 py-4 whitespace-nowrap">{pago.cliente}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pago.membresia}</td>
              <td className="px-6 py-4 whitespace-nowrap">${pago.monto.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pago.fechaProximoPago}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPagosRecurrentes;
