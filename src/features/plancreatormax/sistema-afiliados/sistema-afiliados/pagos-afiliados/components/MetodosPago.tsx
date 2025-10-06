import React, { useState } from 'react';

interface MetodoPago {
  id: string;
  nombre: string;
  tipo: 'transferencia' | 'paypal' | 'stripe';
  detalles: string; // Ej: número de cuenta, email de PayPal, etc.
}

const MetodosPago: React.FC = () => {
  const [metodos, setMetodos] = useState<MetodoPago[]>([
    { id: '1', nombre: 'Mi Cuenta Bancaria', tipo: 'transferencia', detalles: 'ES12 3456 7890 1234 5678 9012' },
    { id: '2', nombre: 'Mi PayPal', tipo: 'paypal', detalles: 'email@example.com' },
  ]);
  const [nuevoMetodo, setNuevoMetodo] = useState({ nombre: '', tipo: 'transferencia', detalles: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNuevoMetodo({
      ...nuevoMetodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddMetodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoMetodo.nombre && nuevoMetodo.detalles) {
      setMetodos([...metodos, { ...nuevoMetodo, id: String(metodos.length + 1) as string, tipo: nuevoMetodo.tipo as 'transferencia' | 'paypal' | 'stripe' }]);
      setNuevoMetodo({ nombre: '', tipo: 'transferencia', detalles: '' });
    }
  };

  const getMetodoIcon = (tipo: MetodoPago['tipo']) => {
    switch (tipo) {
      case 'transferencia':
        return <span className="text-blue-500">🏦</span>;
      case 'paypal':
        return <span className="text-indigo-600">🅿️</span>;
      case 'stripe':
        return <span className="text-purple-600">💳</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Tus Métodos de Pago</h3>
      <ul className="divide-y divide-gray-200 mb-6">
        {metodos.map((metodo) => (
          <li key={metodo.id} className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              {getMetodoIcon(metodo.tipo)}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{metodo.nombre}</p>
                <p className="text-sm text-gray-500">{metodo.detalles}</p>
              </div>
            </div>
            {/* Aquí podrías añadir opciones para editar o eliminar */}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold mb-4">Añadir Nuevo Método de Pago</h3>
      <form onSubmit={handleAddMetodo} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre del Método</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={nuevoMetodo.nombre}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de Método</label>
          <select
            name="tipo"
            id="tipo"
            value={nuevoMetodo.tipo}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="transferencia">Transferencia Bancaria</option>
            <option value="paypal">PayPal</option>
            <option value="stripe">Stripe</option>
          </select>
        </div>
        <div>
          <label htmlFor="detalles" className="block text-sm font-medium text-gray-700">Detalles (Ej. Número de cuenta, Email)</label>
          <input
            type="text"
            name="detalles"
            id="detalles"
            value={nuevoMetodo.detalles}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Añadir Método
        </button>
      </form>
    </div>
  );
};

export default MetodosPago;
