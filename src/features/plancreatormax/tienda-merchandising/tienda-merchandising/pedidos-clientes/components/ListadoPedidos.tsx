import React, { useEffect, useState } from 'react';
import { getPedidos, Pedido } from '../pedidosClientesApi';

interface ListadoPedidosProps {
  onPedidoSelect?: (pedido: Pedido) => void;
}

const ListadoPedidos: React.FC<ListadoPedidosProps> = ({ onPedidoSelect }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const data = await getPedidos();
        setPedidos(data);
      } catch (err) {
        setError('Error al cargar los pedidos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  const getEstadoColor = (estado: Pedido['estadoEnvio']) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-200 text-yellow-800';
      case 'enviado':
        return 'bg-blue-200 text-blue-800';
      case 'entregado':
        return 'bg-green-200 text-green-800';
      case 'devuelto':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-600">Cargando pedidos...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 text-red-500">⚠️</div>
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Listado Completo de Pedidos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">ID Pedido</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Cliente</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Producto</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Estado Envío</th>
              <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">Fecha Pedido</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(pedidos) && pedidos.length > 0 ? (
              pedidos.map((pedido) => (
                <tr 
                  key={pedido.id} 
                  className="hover:bg-blue-50 cursor-pointer transition-all duration-200 border-b border-gray-100"
                  onClick={() => onPedidoSelect?.(pedido)}
                >
                  <td className="py-3 px-4 font-mono text-sm font-semibold text-gray-900">#{pedido.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{pedido.cliente}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{pedido.producto}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getEstadoColor(pedido.estadoEnvio)}`}>
                      {pedido.estadoEnvio}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(pedido.fechaPedido).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📦</span>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium">No hay pedidos disponibles</p>
                      <p className="text-gray-400 text-sm">Los pedidos aparecerán aquí cuando estén disponibles</p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListadoPedidos;