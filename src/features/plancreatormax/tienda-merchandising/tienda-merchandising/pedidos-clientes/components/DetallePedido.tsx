import React, { useState, useEffect } from 'react';
import { getPedidoById, Pedido } from '../pedidosClientesApi';

interface DetallePedidoProps {
  pedidoId?: string; // Prop para pasar el ID del pedido, si no se pasa, se puede usar un estado interno o un selector
}

const DetallePedido: React.FC<DetallePedidoProps> = ({ pedidoId: propPedidoId }) => {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPedidoId, setCurrentPedidoId] = useState<string>('1'); // Ejemplo: ID de pedido por defecto

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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Detalle del Pedido #{pedido.id}</h2>
      <div className="bg-gray-50 p-4 rounded-md">
        <p><strong>Cliente:</strong> {pedido.cliente}</p>
        <p><strong>Producto:</strong> {pedido.producto}</p>
        <p><strong>Estado de Envío:</strong> <span className="font-bold">{pedido.estadoEnvio}</span></p>
        <p><strong>Fecha de Pedido:</strong> {new Date(pedido.fechaPedido).toLocaleDateString()}</p>
        {pedido.trackingId && <p><strong>ID de Seguimiento:</strong> {pedido.trackingId}</p>}
        {/* Aquí se podría añadir más información del pedido, como dirección de envío, etc. */}
      </div>
    </div>
  );
};

export default DetallePedido;
