import React, { useState } from 'react';
import { Search, Download, Filter, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/modal';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [selectedTransaccion, setSelectedTransaccion] = useState<Transaccion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const getEstadoIcon = (estado: Transaccion['estado']) => {
    switch (estado) {
      case 'pagado':
        return <CheckCircle className="w-4 h-4" />;
      case 'pendiente':
        return <Clock className="w-4 h-4" />;
      case 'procesando':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredTransacciones = mockTransacciones.filter(transaccion => {
    const matchesSearch = transaccion.nombreAfiliado.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaccion.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaccion.afiliadoId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterEstado === 'todos' || transaccion.estado === filterEstado;
    
    return matchesSearch && matchesFilter;
  });

  const handleVerDetalles = (transaccion: Transaccion) => {
    setSelectedTransaccion(transaccion);
    setIsModalOpen(true);
  };

  const handleExportar = () => {
    toast.success('Exportando transacciones...');
    // Aquí se implementaría la lógica de exportación
    setTimeout(() => {
      toast.success('Archivo exportado correctamente');
    }, 2000);
  };

  const handleCambiarEstado = (id: string, nuevoEstado: Transaccion['estado']) => {
    toast.success(`Estado de transacción ${id} cambiado a ${nuevoEstado}`);
    // Aquí se implementaría la lógica para cambiar el estado
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Transacciones Recientes</h2>
        <button
          onClick={handleExportar}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportar
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar por afiliado, ID o transacción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterEstado}
            onChange={(e) => setFilterEstado(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="todos">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="procesando">Procesando</option>
            <option value="pagado">Pagado</option>
          </select>
        </div>
      </div>

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
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransacciones.map((transaccion) => (
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
                  <span className={`px-2 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${getEstadoColor(transaccion.estado)}`}>
                    {getEstadoIcon(transaccion.estado)}
                    {transaccion.estado.charAt(0).toUpperCase() + transaccion.estado.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaccion.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVerDetalles(transaccion)}
                      className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {transaccion.estado === 'pendiente' && (
                      <button
                        onClick={() => handleCambiarEstado(transaccion.id, 'procesando')}
                        className="p-1 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded"
                        title="Marcar como procesando"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                    )}
                    {transaccion.estado === 'procesando' && (
                      <button
                        onClick={() => handleCambiarEstado(transaccion.id, 'pagado')}
                        className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                        title="Marcar como pagado"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de detalles de transacción */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detalles de Transacción"
        size="md"
      >
        {selectedTransaccion && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Transacción</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaccion.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Afiliado</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaccion.afiliadoId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Afiliado</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaccion.nombreAfiliado}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <span className={`mt-1 inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(selectedTransaccion.estado)}`}>
                  {getEstadoIcon(selectedTransaccion.estado)}
                  {selectedTransaccion.estado.charAt(0).toUpperCase() + selectedTransaccion.estado.slice(1)}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Monto de Venta</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(selectedTransaccion.montoVenta)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Porcentaje de Comisión</label>
                <p className="mt-1 text-sm text-gray-900">{(selectedTransaccion.porcentajeComision * 100).toFixed(2)}%</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Monto de Comisión</label>
                <p className="mt-1 text-lg font-semibold text-green-600">
                  {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(selectedTransaccion.montoComision)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                <p className="mt-1 text-sm text-gray-900">{selectedTransaccion.fecha}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ListaTransacciones;
