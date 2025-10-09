import React, { useState } from 'react';
import { updateEstadoPedido, Pedido, sendNotificacionCliente, requestDevolucion } from '../pedidosClientesApi';

interface GestorEstadosProps {
  onUpdateSuccess?: (pedidoId: string, estado: string) => void;
  onUpdateError?: (error: string) => void;
  onDevolucionSuccess?: (pedidoId: string) => void;
  onDevolucionError?: (error: string) => void;
  onConfirmAction?: (title: string, message: string, action: () => void, type?: 'danger' | 'warning' | 'info') => void;
}

const GestorEstados: React.FC<GestorEstadosProps> = ({
  onUpdateSuccess,
  onUpdateError,
  onDevolucionSuccess,
  onDevolucionError,
  onConfirmAction
}) => {
  const [pedidoId, setPedidoId] = useState<string>('');
  const [nuevoEstado, setNuevoEstado] = useState<Pedido['estadoEnvio']>('pendiente');
  const [devolucionMotivo, setDevolucionMotivo] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpdateEstado = async () => {
    if (!pedidoId.trim()) {
      const errorMsg = 'Por favor, introduce un ID de pedido válido.';
      setError(errorMsg);
      onUpdateError?.(errorMsg);
      return;
    }

    if (onConfirmAction) {
      onConfirmAction(
        'Actualizar Estado del Pedido',
        `¿Estás seguro de que deseas cambiar el estado del pedido ${pedidoId} a "${nuevoEstado}"? Esta acción notificará automáticamente al cliente.`,
        async () => {
          setLoading(true);
          setMessage(null);
          setError(null);
          try {
            await updateEstadoPedido(pedidoId, nuevoEstado);
            await sendNotificacionCliente(pedidoId, `El estado de tu pedido ha cambiado a: ${nuevoEstado}`);
            setMessage(`Estado del pedido ${pedidoId} actualizado a "${nuevoEstado}" y cliente notificado.`);
            onUpdateSuccess?.(pedidoId, nuevoEstado);
          } catch (err) {
            const errorMsg = 'Error al actualizar el estado del pedido.';
            setError(errorMsg);
            onUpdateError?.(errorMsg);
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        'info'
      );
    } else {
      // Fallback si no hay confirmación disponible
      setLoading(true);
      setMessage(null);
      setError(null);
      try {
        await updateEstadoPedido(pedidoId, nuevoEstado);
        await sendNotificacionCliente(pedidoId, `El estado de tu pedido ha cambiado a: ${nuevoEstado}`);
        setMessage(`Estado del pedido ${pedidoId} actualizado a "${nuevoEstado}" y cliente notificado.`);
        onUpdateSuccess?.(pedidoId, nuevoEstado);
      } catch (err) {
        const errorMsg = 'Error al actualizar el estado del pedido.';
        setError(errorMsg);
        onUpdateError?.(errorMsg);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRequestDevolucion = async () => {
    if (!pedidoId.trim() || !devolucionMotivo.trim()) {
      const errorMsg = 'Por favor, introduce el ID del pedido y el motivo de la devolución.';
      setError(errorMsg);
      onDevolucionError?.(errorMsg);
      return;
    }

    if (onConfirmAction) {
      onConfirmAction(
        'Solicitar Devolución',
        `¿Estás seguro de que deseas procesar la solicitud de devolución para el pedido ${pedidoId}? Motivo: "${devolucionMotivo}". Esta acción notificará automáticamente al cliente.`,
        async () => {
          setLoading(true);
          setMessage(null);
          setError(null);
          try {
            await requestDevolucion(pedidoId, devolucionMotivo);
            await sendNotificacionCliente(pedidoId, `Hemos recibido tu solicitud de devolución para el pedido. Motivo: ${devolucionMotivo}`);
            setMessage(`Solicitud de devolución para el pedido ${pedidoId} procesada y cliente notificado.`);
            onDevolucionSuccess?.(pedidoId);
            // Limpiar el formulario después del éxito
            setDevolucionMotivo('');
          } catch (err) {
            const errorMsg = 'Error al procesar la solicitud de devolución.';
            setError(errorMsg);
            onDevolucionError?.(errorMsg);
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        'warning'
      );
    } else {
      // Fallback si no hay confirmación disponible
      setLoading(true);
      setMessage(null);
      setError(null);
      try {
        await requestDevolucion(pedidoId, devolucionMotivo);
        await sendNotificacionCliente(pedidoId, `Hemos recibido tu solicitud de devolución para el pedido. Motivo: ${devolucionMotivo}`);
        setMessage(`Solicitud de devolución para el pedido ${pedidoId} procesada y cliente notificado.`);
        onDevolucionSuccess?.(pedidoId);
        setDevolucionMotivo('');
      } catch (err) {
        const errorMsg = 'Error al procesar la solicitud de devolución.';
        setError(errorMsg);
        onDevolucionError?.(errorMsg);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Gestión de Estados y Devoluciones</h2>

      <div className="mb-4">
        <label htmlFor="pedidoId" className="block text-sm font-medium text-gray-700">ID del Pedido:</label>
        <input
          type="text"
          id="pedidoId"
          className="border p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={pedidoId}
          onChange={(e) => setPedidoId(e.target.value)}
          placeholder="Ej: 12345"
        />
      </div>

      {/* Actualización de Estado */}
      <div className="mb-6 p-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Actualizar Estado del Pedido</h3>
        <div className="flex items-center mb-3">
          <label htmlFor="nuevoEstado" className="mr-2 text-sm font-medium text-gray-700">Nuevo Estado:</label>
          <select
            id="nuevoEstado"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value as Pedido['estadoEnvio'])}
          >
            <option value="pendiente">Pendiente</option>
            <option value="enviado">Enviado</option>
            <option value="entregado">Entregado</option>
            <option value="devuelto">Devuelto</option>
          </select>
          <button
            className="ml-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={handleUpdateEstado}
            disabled={loading || !pedidoId.trim()}
          >
            {loading ? 'Actualizando...' : 'Actualizar Estado'}
          </button>
        </div>
      </div>

      {/* Gestión de Devoluciones */}
      <div className="mb-6 p-4 border rounded-md bg-gray-50">
        <h3 className="text-lg font-medium mb-2">Gestionar Devolución</h3>
        <div className="mb-3">
          <label htmlFor="devolucionMotivo" className="block text-sm font-medium text-gray-700">Motivo de Devolución:</label>
          <textarea
            id="devolucionMotivo"
            className="border p-2 rounded w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={devolucionMotivo}
            onChange={(e) => setDevolucionMotivo(e.target.value)}
            placeholder="Ej: Producto defectuoso, talla incorrecta..."
          ></textarea>
        </div>
        <button
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={handleRequestDevolucion}
          disabled={loading || !pedidoId.trim() || !devolucionMotivo.trim()}
        >
          {loading ? 'Procesando...' : 'Solicitar Devolución'}
        </button>
      </div>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default GestorEstados;
