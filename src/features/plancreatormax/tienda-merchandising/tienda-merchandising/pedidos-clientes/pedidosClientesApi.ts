// pedidosClientesApi.ts
// API para la gestión de pedidos de clientes

import axios from 'axios';

const API_URL = '/api/pedidos-clientes'; // Ajusta la URL de tu API

export interface Pedido {
  id: string;
  cliente: string;
  producto: string;
  estadoEnvio: 'pendiente' | 'enviado' | 'entregado' | 'devuelto';
  fechaPedido: string;
  trackingId?: string;
}

export const getPedidos = async (): Promise<Pedido[]> => {
  const response = await axios.get<Pedido[]>(API_URL);
  return response.data;
};

export const getPedidoById = async (id: string): Promise<Pedido> => {
  const response = await axios.get<Pedido>(`${API_URL}/${id}`);
  return response.data;
};

export const updateEstadoPedido = async (id: string, estado: Pedido['estadoEnvio']): Promise<Pedido> => {
  const response = await axios.patch<Pedido>(`${API_URL}/${id}/estado`, { estado });
  return response.data;
};

export const createPedido = async (pedido: Omit<Pedido, 'id'>): Promise<Pedido> => {
  const response = await axios.post<Pedido>(API_URL, pedido);
  return response.data;
};

// Funciones para integración con transportistas y seguimiento de paquetes
export const getTrackingInfo = async (trackingId: string): Promise<any> => {
  // Simulación de integración con un servicio de tracking
  console.log(`Fetching tracking info for: ${trackingId}`);
  return {
    trackingId,
    status: 'En tránsito',
    location: 'Centro de distribución X',
    estimatedDelivery: '2025-10-05',
  };
};

// Gestión de devoluciones
export const requestDevolucion = async (pedidoId: string, motivo: string): Promise<any> => {
  console.log(`Solicitud de devolución para pedido ${pedidoId} por motivo: ${motivo}`);
  // Lógica para procesar la devolución
  return { success: true, message: 'Solicitud de devolución procesada' };
};

// Comunicación automática con el cliente
export const sendNotificacionCliente = async (pedidoId: string, mensaje: string): Promise<any> => {
  console.log(`Enviando notificación al cliente para pedido ${pedidoId}: ${mensaje}`);
  // Lógica para enviar notificaciones (email, SMS, etc.)
  return { success: true, message: 'Notificación enviada' };
};
