export interface Order {
  id: string;
  proveedor: string;
  fecha: string;
  total: number;
  estado: 'pendiente' | 'enviado' | 'recibido';
}

const mockOrders: Order[] = [
  {
    id: '1',
    proveedor: 'Proveedor A',
    fecha: '2025-09-20',
    total: 150.75,
    estado: 'recibido',
  },
  {
    id: '2',
    proveedor: 'Proveedor B',
    fecha: '2025-09-22',
    total: 300.00,
    estado: 'enviado',
  },
  {
    id: '3',
    proveedor: 'Proveedor C',
    fecha: '2025-09-25',
    total: 75.50,
    estado: 'pendiente',
  },
];

export const getOrders = async (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 500);
  });
};

export const createOrder = async (order: Omit<Order, 'id' | 'estado'> & { id: string; estado: 'pendiente' }): Promise<Order> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder: Order = { ...order, estado: 'pendiente' };
      mockOrders.push(newOrder);
      resolve(newOrder);
    }, 500);
  });
};

export const updateOrderStatus = async (id: string, estado: Order['estado']): Promise<Order | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orderIndex = mockOrders.findIndex((order) => order.id === id);
      if (orderIndex > -1) {
        mockOrders[orderIndex] = { ...mockOrders[orderIndex], estado };
        resolve(mockOrders[orderIndex]);
      }
      resolve(undefined);
    }, 500);
  });
};

export interface SupplierPerformance {
  proveedor: string;
  tiempoEntregaPromedio: number; // en días
  fiabilidad: number; // porcentaje
}

export const getSupplierPerformance = async (): Promise<SupplierPerformance[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { proveedor: 'Proveedor A', tiempoEntregaPromedio: 5, fiabilidad: 95 },
        { proveedor: 'Proveedor B', tiempoEntregaPromedio: 7, fiabilidad: 90 },
        { proveedor: 'Proveedor C', tiempoEntregaPromedio: 4, fiabilidad: 98 },
      ]);
    }, 500);
  });
};

export interface OrderTracking {
  orderId: string;
  estadoActual: string;
  fechaEstimadaEntrega: string;
  historial: { fecha: string; estado: string; ubicacion?: string }[];
}

export const getOrderTracking = async (orderId: string): Promise<OrderTracking | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const trackingData: OrderTracking[] = [
        {
          orderId: '1',
          estadoActual: 'Entregado',
          fechaEstimadaEntrega: '2025-09-20',
          historial: [
            { fecha: '2025-09-18', estado: 'En tránsito', ubicacion: 'Almacén Central' },
            { fecha: '2025-09-20', estado: 'Entregado' },
          ],
        },
        {
          orderId: '2',
          estadoActual: 'En camino',
          fechaEstimadaEntrega: '2025-09-28',
          historial: [
            { fecha: '2025-09-22', estado: 'Procesado' },
            { fecha: '2025-09-25', estado: 'Enviado', ubicacion: 'Centro de Distribución' },
          ],
        },
      ];
      resolve(trackingData.find(t => t.orderId === orderId));
    }, 500);
  });
};
