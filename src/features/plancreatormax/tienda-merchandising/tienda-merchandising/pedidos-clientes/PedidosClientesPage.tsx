import React from 'react';
import ListadoPedidos from './components/ListadoPedidos';
import DetallePedido from './components/DetallePedido';
import SeguimientoEnvio from './components/SeguimientoEnvio';
import GestorEstados from './components/GestorEstados';

const PedidosClientesPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Pedidos de Clientes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <ListadoPedidos />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <DetallePedido />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <SeguimientoEnvio />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <GestorEstados />
        </div>
      </div>
    </div>
  );
};

export default PedidosClientesPage;
