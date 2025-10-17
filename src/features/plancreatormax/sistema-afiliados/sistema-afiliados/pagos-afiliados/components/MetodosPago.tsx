import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Settings } from 'lucide-react';

interface MetodoPago {
  id: string;
  nombre: string;
  tipo: 'transferencia' | 'paypal' | 'stripe';
  detalles: string; // Ej: número de cuenta, email de PayPal, etc.
}

interface MetodosPagoProps {
  onShowDeleteModal?: (metodo: MetodoPago) => void;
}

const MetodosPago: React.FC<MetodosPagoProps> = ({ onShowDeleteModal }) => {
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

  const handleDeleteMetodo = (metodo: MetodoPago) => {
    if (onShowDeleteModal) {
      onShowDeleteModal(metodo);
    } else {
      // Fallback si no se pasa la función
      if (window.confirm(`¿Estás seguro de que quieres eliminar el método ${metodo.nombre}?`)) {
        setMetodos(metodos.filter(m => m.id !== metodo.id));
        toast.success('Método de pago eliminado');
      }
    }
  };

  const handleAddMetodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoMetodo.nombre && nuevoMetodo.detalles) {
      setMetodos([...metodos, { ...nuevoMetodo, id: String(metodos.length + 1) as string, tipo: nuevoMetodo.tipo as 'transferencia' | 'paypal' | 'stripe' }]);
      setNuevoMetodo({ nombre: '', tipo: 'transferencia', detalles: '' });
      toast.success('Método de pago añadido correctamente');
    } else {
      toast.error('Por favor, completa todos los campos');
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
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              Métodos de Pago
            </h3>
            <p className="text-sm text-gray-500">Gestiona tus métodos de pago disponibles</p>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Tus Métodos de Pago</h4>
          <div className="space-y-4">
            {metodos.map((metodo) => (
              <div key={metodo.id} className="bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl p-4 border border-gray-200/50 hover:shadow-md transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {getMetodoIcon(metodo.tipo)}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{metodo.nombre}</p>
                      <p className="text-sm text-gray-600 font-mono bg-white/50 px-2 py-1 rounded mt-1">
                        {metodo.detalles}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        toast.success(`Método ${metodo.nombre} copiado al portapapeles`);
                        navigator.clipboard.writeText(metodo.detalles);
                      }}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors hover:shadow-sm"
                    >
                      Copiar
                    </button>
                    <button
                      onClick={() => handleDeleteMetodo(metodo)}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors hover:shadow-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-50 to-orange-50/30 rounded-2xl p-6 border border-slate-200/50">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Añadir Nuevo Método de Pago</h4>
          <form onSubmit={handleAddMetodo} className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">Nombre del Método</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={nuevoMetodo.nombre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                placeholder="Ej: Mi Cuenta Principal"
                required
              />
            </div>
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">Tipo de Método</label>
              <select
                name="tipo"
                id="tipo"
                value={nuevoMetodo.tipo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
              >
                <option value="transferencia">🏦 Transferencia Bancaria</option>
                <option value="paypal">🅿️ PayPal</option>
                <option value="stripe">💳 Stripe</option>
              </select>
            </div>
            <div>
              <label htmlFor="detalles" className="block text-sm font-medium text-gray-700 mb-2">Detalles (Ej. Número de cuenta, Email)</label>
              <input
                type="text"
                name="detalles"
                id="detalles"
                value={nuevoMetodo.detalles}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white"
                placeholder="Ej: ES12 3456 7890 1234 5678 9012"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-xl text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              <Settings className="w-4 h-4 mr-2" />
              Añadir Método
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MetodosPago;
