import React, { useState, useEffect } from 'react';
import { getPedidoById, Pedido } from '../pedidosClientesApi';

interface DetallePedidoProps {
  pedidoId?: string; // Prop para pasar el ID del pedido, si no se pasa, se puede usar un estado interno o un selector
}

const DetallePedido: React.FC<DetallePedidoProps> = ({ pedidoId: propPedidoId }) => {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPedidoId] = useState<string>('1'); // Ejemplo: ID de pedido por defecto

  useEffect(() => {
    const idToFetch = propPedidoId || currentPedidoId;
    if (!idToFetch) {
      setLoading(false);
      return;
    }

    const fetchPedido = async () => {
      try {
        setLoading(true);
        const data = await getPedidoById(idToFetch);
        setPedido(data);
      } catch (err) {
        setError('Error al cargar el detalle del pedido.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPedido();
  }, [propPedidoId, currentPedidoId]);

  if (loading) return <p>Cargando detalle del pedido...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!pedido) return <p>Selecciona un pedido para ver su detalle.</p>;

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'enviado':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'entregado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'devuelto':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Detalle del Pedido #{pedido.id}</h2>
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-600">Cliente</p>
                <p className="text-lg font-semibold text-gray-900">{pedido.cliente}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-600">Producto</p>
                <p className="text-lg font-semibold text-gray-900">{pedido.producto}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-600">Estado de Envío</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getEstadoColor(pedido.estadoEnvio)}`}>
                  {pedido.estadoEnvio}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-600">Fecha de Pedido</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(pedido.fechaPedido).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {pedido.trackingId && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium text-gray-600">ID de Seguimiento</p>
                <p className="text-lg font-mono bg-white px-3 py-2 rounded-lg border border-gray-300 shadow-sm">
                  {pedido.trackingId}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Pedido creado el {new Date(pedido.fechaPedido).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-500">
              ID: {pedido.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePedido;
