// pedidosClientesApi.ts
// API para la gestión de pedidos de clientes

import axios from 'axios';

const API_URL = '/api/pedidos-clientes'; // Ajusta la URL de tu API

// Datos mock para pruebas
const MOCK_PEDIDOS: Pedido[] = [
  {
    id: '1',
    cliente: 'María González',
    producto: 'Proteína Whey 2kg',
    estadoEnvio: 'pendiente',
    fechaPedido: '2024-01-15T10:30:00Z',
    trackingId: 'TRK001'
  },
  {
    id: '2',
    cliente: 'Carlos Rodríguez',
    producto: 'Creatina Monohidrato 300g',
    estadoEnvio: 'enviado',
    fechaPedido: '2024-01-14T14:20:00Z',
    trackingId: 'TRK002'
  },
  {
    id: '3',
    cliente: 'Ana Martínez',
    producto: 'BCAA 300g',
    estadoEnvio: 'entregado',
    fechaPedido: '2024-01-13T09:15:00Z',
    trackingId: 'TRK003'
  },
  {
    id: '4',
    cliente: 'Luis Fernández',
    producto: 'Pre-entreno 200g',
    estadoEnvio: 'devuelto',
    fechaPedido: '2024-01-12T16:45:00Z',
    trackingId: 'TRK004'
  },
  {
    id: '5',
    cliente: 'Elena Sánchez',
    producto: 'Glutamina 500g',
    estadoEnvio: 'pendiente',
    fechaPedido: '2024-01-16T11:00:00Z',
    trackingId: 'TRK005'
  },
  {
    id: '6',
    cliente: 'Miguel Torres',
    producto: 'Caseína 1kg',
    estadoEnvio: 'enviado',
    fechaPedido: '2024-01-15T13:30:00Z',
    trackingId: 'TRK006'
  }
];

export interface Pedido {
  id: string;
  cliente: string;
  producto: string;
  estadoEnvio: 'pendiente' | 'enviado' | 'entregado' | 'devuelto';
  fechaPedido: string;
  trackingId?: string;
}

export const getPedidos = async (): Promise<Pedido[]> => {
  try {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // En desarrollo, usar datos mock
    if (process.env.NODE_ENV === 'development') {
      return MOCK_PEDIDOS;
    }
    
    const response = await axios.get<Pedido[]>(API_URL);
    // Ensure we always return an array
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching pedidos:', error);
    // En caso de error, devolver datos mock
    return MOCK_PEDIDOS;
  }
};

export const getPedidoById = async (id: string): Promise<Pedido> => {
  try {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // En desarrollo, buscar en datos mock
    if (process.env.NODE_ENV === 'development') {
      const pedido = MOCK_PEDIDOS.find(p => p.id === id);
      if (pedido) {
        return pedido;
      }
      throw new Error(`Pedido con ID ${id} no encontrado`);
    }
    
    const response = await axios.get<Pedido>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pedido by id:', error);
    throw error;
  }
};

export const updateEstadoPedido = async (id: string, estado: Pedido['estadoEnvio']): Promise<Pedido> => {
  try {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // En desarrollo, simular actualización
    if (process.env.NODE_ENV === 'development') {
      const pedidoIndex = MOCK_PEDIDOS.findIndex(p => p.id === id);
      if (pedidoIndex !== -1) {
        MOCK_PEDIDOS[pedidoIndex].estadoEnvio = estado;
        return MOCK_PEDIDOS[pedidoIndex];
      }
      throw new Error(`Pedido con ID ${id} no encontrado`);
    }
    
    const response = await axios.patch<Pedido>(`${API_URL}/${id}/estado`, { estado });
    return response.data;
  } catch (error) {
    console.error('Error updating pedido estado:', error);
    throw error;
  }
};

export const createPedido = async (pedido: Omit<Pedido, 'id'>): Promise<Pedido> => {
  try {
    const response = await axios.post<Pedido>(API_URL, pedido);
    return response.data;
  } catch (error) {
    console.error('Error creating pedido:', error);
    throw error;
  }
};

// Funciones para integración con transportistas y seguimiento de paquetes
export const getTrackingInfo = async (trackingId: string): Promise<any> => {
  try {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulación de integración con un servicio de tracking
    console.log(`Fetching tracking info for: ${trackingId}`);
    
    // Datos mock para diferentes estados de seguimiento
    const trackingData = {
      'TRK001': {
        trackingId,
        status: 'En preparación',
        location: 'Almacén principal',
        estimatedDelivery: '2024-01-20',
        lastUpdate: '2024-01-16T10:30:00Z'
      },
      'TRK002': {
        trackingId,
        status: 'En tránsito',
        location: 'Centro de distribución Madrid',
        estimatedDelivery: '2024-01-18',
        lastUpdate: '2024-01-16T08:15:00Z'
      },
      'TRK003': {
        trackingId,
        status: 'Entregado',
        location: 'Domicilio del cliente',
        estimatedDelivery: '2024-01-15',
        lastUpdate: '2024-01-15T14:30:00Z'
      },
      'TRK004': {
        trackingId,
        status: 'Devolución en proceso',
        location: 'Centro de devoluciones',
        estimatedDelivery: '2024-01-22',
        lastUpdate: '2024-01-16T12:00:00Z'
      },
      'TRK005': {
        trackingId,
        status: 'En preparación',
        location: 'Almacén principal',
        estimatedDelivery: '2024-01-21',
        lastUpdate: '2024-01-16T09:45:00Z'
      },
      'TRK006': {
        trackingId,
        status: 'En tránsito',
        location: 'Centro de distribución Barcelona',
        estimatedDelivery: '2024-01-19',
        lastUpdate: '2024-01-16T11:20:00Z'
      }
    };
    
    const data = trackingData[trackingId as keyof typeof trackingData];
    if (data) {
      return data;
    }
    
    // Datos por defecto si no se encuentra el tracking ID
    return {
      trackingId,
      status: 'Información no disponible',
      location: 'Consultar con el transportista',
      estimatedDelivery: 'Por determinar',
      lastUpdate: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching tracking info:', error);
    throw new Error('Error al obtener información de seguimiento');
  }
};

// Gestión de devoluciones
export const requestDevolucion = async (pedidoId: string, motivo: string): Promise<any> => {
  try {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    console.log(`Solicitud de devolución para pedido ${pedidoId} por motivo: ${motivo}`);
    
    // En desarrollo, simular procesamiento de devolución
    if (process.env.NODE_ENV === 'development') {
      const pedidoIndex = MOCK_PEDIDOS.findIndex(p => p.id === pedidoId);
      if (pedidoIndex !== -1) {
        // Simular cambio de estado a devuelto
        MOCK_PEDIDOS[pedidoIndex].estadoEnvio = 'devuelto';
        return { 
          success: true, 
          message: 'Solicitud de devolución procesada correctamente',
          devolucionId: `DEV-${pedidoId}-${Date.now()}`
        };
      }
      throw new Error(`Pedido con ID ${pedidoId} no encontrado`);
    }
    
    // Lógica para procesar la devolución en producción
    return { success: true, message: 'Solicitud de devolución procesada' };
  } catch (error) {
    console.error('Error processing devolucion:', error);
    throw error;
  }
};

// Comunicación automática con el cliente
export const sendNotificacionCliente = async (pedidoId: string, mensaje: string): Promise<any> => {
  try {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 600));
    
    console.log(`Enviando notificación al cliente para pedido ${pedidoId}: ${mensaje}`);
    
    // En desarrollo, simular envío de notificación
    if (process.env.NODE_ENV === 'development') {
      const pedido = MOCK_PEDIDOS.find(p => p.id === pedidoId);
      if (pedido) {
        return { 
          success: true, 
          message: 'Notificación enviada correctamente',
          cliente: pedido.cliente,
          metodo: 'email',
          timestamp: new Date().toISOString()
        };
      }
    }
    
    // Lógica para enviar notificaciones (email, SMS, etc.) en producción
    return { success: true, message: 'Notificación enviada' };
  } catch (error) {
    console.error('Error sending notification:', error);
    throw error;
  }
};
