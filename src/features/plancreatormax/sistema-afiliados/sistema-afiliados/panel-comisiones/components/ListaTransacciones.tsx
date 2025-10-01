import React from 'react';

interface Transaccion {
  id: string;
  afiliadoId: string;
  nombreAfiliado: string;
  montoVenta: number;
  porcentajeComision: number;
  montoComision: number;
  estado: 'pendiente' | 'pagado' | 'procesando';
  fecha: string;
}

const mockTransacciones: Transaccion[] = [
  {
    id: '1',
    afiliadoId: 'aff001',
    nombreAfiliado: 'Juan Pérez',
    montoVenta: 100.00,
    porcentajeComision: 0.10,
    montoComision: 10.00,
    estado: 'pagado',
    fecha: '2023-01-15',
  },
  {
    id: '2',
    afiliadoId: 'aff002',
    nombreAfiliado: 'María García',
    montoVenta: 250.00,
    porcentajeComision: 0.12,
    montoComision: 30.00,
    estado: 'pendiente',
    fecha: '2023-01-20',
  },
  {
    id: '3',
    afiliadoId: 'aff001',
    nombreAfiliado: 'Juan Pérez',
    montoVenta: 50.00,
    porcentajeComision: 0.10,
    montoComision: 5.00,
    estado: 'procesando',
    fecha: '2023-01-22',
  },
  {
    id: '4',
    afiliadoId: 'aff003',
    nombreAfiliado: 'Carlos Ruiz',
    montoVenta: 120.00,
    porcentajeComision: 0.15,
    montoComision: 18.00,
    estado: 'pendiente',
    fecha: '2023-01-25',
  },
];

const ListaTransacciones: React.FC = () => {
  const getEstadoColor = (estado: Transaccion['estado']) => {
    switch (estado) {
      case 'pagado':
        return 'bg-green-200 text-green-800';
      case 'pendiente':
        return 'bg-yellow-200 text-yellow-800';
      case 'procesando':
        return 'bg-blue-200 text-blue-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Transacciones Recientes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID Transacción
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Afiliado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monto Venta
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comisión (%)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Monto Comisión
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockTransacciones.map((transaccion) => (
              <tr key={transaccion.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {transaccion.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaccion.nombreAfiliado} ({transaccion.afiliadoId})
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(transaccion.montoVenta)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(transaccion.porcentajeComision * 100).toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(transaccion.montoComision)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(transaccion.estado)}`}>
                    {transaccion.estado.charAt(0).toUpperCase() + transaccion.estado.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaccion.fecha}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaTransacciones;
