import React, { useEffect, useState } from 'react';
import { getPedidos, Pedido } from '../pedidosClientesApi';

const ListadoPedidos: React.FC = () => {
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

  if (loading) return <p>Cargando pedidos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Listado Completo de Pedidos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID Pedido</th>
              <th className="py-2 px-4 border-b">Cliente</th>
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b">Estado Envío</th>
              <th className="py-2 px-4 border-b">Fecha Pedido</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{pedido.id}</td>
                <td className="py-2 px-4 border-b">{pedido.cliente}</td>
                <td className="py-2 px-4 border-b">{pedido.producto}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getEstadoColor(pedido.estadoEnvio)}`}>
                    {pedido.estadoEnvio}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{new Date(pedido.fechaPedido).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListadoPedidos;