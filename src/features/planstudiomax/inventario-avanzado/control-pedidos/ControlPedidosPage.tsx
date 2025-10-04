import React, { useState, useEffect } from 'react';
import { ListadoOrdenes } from './components/ListadoOrdenes';
import { getOrders, createOrder, Order } from './controlPedidosApi';
import LineaTiempo from './components/LineaTiempo';
import ConfirmadorRecepcion from './components/ConfirmadorRecepcion';
import AnalisisProveedores from './components/AnalisisProveedores';
import IntegracionProveedores from './components/IntegracionProveedores';
import AlertasPedidosRetrasados from './components/AlertasPedidosRetrasados';
import GeneradorOrdenesAutomatico from './components/GeneradorOrdenesAutomatico';
import ValidacionCalidad from './components/ValidacionCalidad';
import DashboardCompras from './components/DashboardCompras';

const ControlPedidosPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState({ proveedor: '', fecha: '', total: 0 });

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    };
    fetchOrders();
  }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await createOrder({
      ...newOrder,
      id: Date.now().toString(), // Simple ID generation
      estado: 'pendiente',
    });
    setOrders((prev) => [...prev, created]);
    setNewOrder({ proveedor: '', fecha: '', total: 0 });
  };

  const handleConfirmReception = (id: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, estado: 'recibido' } : order))
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Control de Pedidos - Gestión de Compras</h1>

      <div className="mb-8 p-4 border rounded shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3">Crear Nuevo Pedido</h2>
        <form onSubmit={handleCreateOrder} className="space-y-4">
          <div>
            <label htmlFor="proveedor" className="block text-sm font-medium text-gray-700">
              Proveedor:
            </label>
            <input
              type="text"
              id="proveedor"
              value={newOrder.proveedor}
              onChange={(e) => setNewOrder({ ...newOrder, proveedor: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
              Fecha:
            </label>
            <input
              type="date"
              id="fecha"
              value={newOrder.fecha}
              onChange={(e) => setNewOrder({ ...newOrder, fecha: e.target.value })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="total" className="block text-sm font-medium text-gray-700">
              Total:
            </label>
            <input
              type="number"
              id="total"
              value={newOrder.total}
              onChange={(e) => setNewOrder({ ...newOrder, total: parseFloat(e.target.value) })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crear Pedido
          </button>
        </form>
      </div>

      <ListadoOrdenes orders={orders} onConfirmReception={handleConfirmReception} />

      <div className="mt-8 p-4 border rounded shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-3">Gestión Avanzada de Compras</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCompras />
          <LineaTiempo />
          <ConfirmadorRecepcion />
          <AnalisisProveedores />
          <IntegracionProveedores />
          <AlertasPedidosRetrasados />
          <GeneradorOrdenesAutomatico />
          <ValidacionCalidad />
        </div>
      </div>
    </div>
  );
};

export default ControlPedidosPage;
