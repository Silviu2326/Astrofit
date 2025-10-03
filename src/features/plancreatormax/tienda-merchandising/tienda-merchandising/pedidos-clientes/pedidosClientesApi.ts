// pedidosClientesApi.ts
// API para la gestión de pedidos de clientes

export type EstadoPedido = 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado' | 'reembolsado';
export type MetodoPago = 'tarjeta' | 'paypal' | 'transferencia' | 'efectivo';
export type MetodoEnvio = 'standard' | 'express' | 'overnight' | 'pickup';

export interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  avatar?: string;
}

export interface ProductoPedido {
  id: string;
  nombre: string;
  imagen: string;
  variante?: string;
  sku: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Direccion {
  calle: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
  pais: string;
}

export interface TimelineEvento {
  fecha: string;
  estado: string;
  descripcion: string;
  usuario?: string;
  nota?: string;
}

export interface PedidoCompleto {
  id: string;
  numero: string;
  fecha: string;
  estado: EstadoPedido;

  // Cliente
  cliente: Cliente;

  // Productos
  items: ProductoPedido[];

  // Totales
  subtotal: number;
  envio: number;
  impuestos: number;
  descuento: number;
  total: number;

  // Pago
  metodoPago: MetodoPago;
  estadoPago: 'pagado' | 'pendiente' | 'fallido';
  idTransaccion?: string;
  fechaPago?: string;

  // Envío
  metodoEnvio: MetodoEnvio;
  direccionEnvio: Direccion;
  direccionFacturacion?: Direccion;
  carrier?: string;
  trackingNumber?: string;
  fechaEstimadaEntrega?: string;

  // Adicional
  notaCliente?: string;
  timeline: TimelineEvento[];
  tieneProblemas?: boolean;
  tipoProblema?: string;
}

// DATOS MOCKEADOS
const clientesMock: Cliente[] = [
  { id: '1', nombre: 'Ana García', email: 'ana.garcia@email.com', telefono: '+34 612 345 678', avatar: 'AG' },
  { id: '2', nombre: 'Carlos Rodríguez', email: 'carlos.r@email.com', telefono: '+34 623 456 789', avatar: 'CR' },
  { id: '3', nombre: 'María López', email: 'maria.lopez@email.com', telefono: '+34 634 567 890', avatar: 'ML' },
  { id: '4', nombre: 'Juan Martínez', email: 'juan.martinez@email.com', telefono: '+34 645 678 901', avatar: 'JM' },
  { id: '5', nombre: 'Laura Sánchez', email: 'laura.s@email.com', telefono: '+34 656 789 012', avatar: 'LS' },
  { id: '6', nombre: 'Pedro Fernández', email: 'pedro.f@email.com', telefono: '+34 667 890 123', avatar: 'PF' },
  { id: '7', nombre: 'Isabel Torres', email: 'isabel.torres@email.com', telefono: '+34 678 901 234', avatar: 'IT' },
  { id: '8', nombre: 'Miguel Ruiz', email: 'miguel.ruiz@email.com', telefono: '+34 689 012 345', avatar: 'MR' }
];

const productosMock = [
  { nombre: 'Camiseta Premium', imagen: '👕', sku: 'CAM-001' },
  { nombre: 'Sudadera con Capucha', imagen: '🧥', sku: 'SUD-002' },
  { nombre: 'Gorra Snapback', imagen: '🧢', sku: 'GOR-003' },
  { nombre: 'Taza Térmica', imagen: '☕', sku: 'TZA-004' },
  { nombre: 'Mochila Urban', imagen: '🎒', sku: 'MOC-005' },
  { nombre: 'Botella Acero', imagen: '🍶', sku: 'BOT-006' },
  { nombre: 'Calcetines Pack', imagen: '🧦', sku: 'CAL-007' },
  { nombre: 'Libreta A5', imagen: '📓', sku: 'LIB-008' }
];

const generarPedidoMock = (index: number): PedidoCompleto => {
  const estados: EstadoPedido[] = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado', 'reembolsado'];
  const metodosPago: MetodoPago[] = ['tarjeta', 'paypal', 'transferencia', 'efectivo'];
  const metodosEnvio: MetodoEnvio[] = ['standard', 'express', 'overnight', 'pickup'];

  const estado = estados[index % estados.length];
  const cliente = clientesMock[index % clientesMock.length];
  const metodoPago = metodosPago[index % metodosPago.length];
  const metodoEnvio = metodosEnvio[index % metodosEnvio.length];

  const numItems = Math.floor(Math.random() * 3) + 1;
  const items: ProductoPedido[] = [];
  let subtotal = 0;

  for (let i = 0; i < numItems; i++) {
    const producto = productosMock[Math.floor(Math.random() * productosMock.length)];
    const cantidad = Math.floor(Math.random() * 3) + 1;
    const precioUnitario = Math.floor(Math.random() * 50) + 15;
    const itemSubtotal = cantidad * precioUnitario;

    items.push({
      id: `item-${index}-${i}`,
      nombre: producto.nombre,
      imagen: producto.imagen,
      variante: ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)],
      sku: producto.sku,
      cantidad,
      precioUnitario,
      subtotal: itemSubtotal
    });

    subtotal += itemSubtotal;
  }

  const envio = metodoEnvio === 'overnight' ? 15 : metodoEnvio === 'express' ? 10 : 5;
  const impuestos = subtotal * 0.21;
  const descuento = index % 5 === 0 ? subtotal * 0.1 : 0;
  const total = subtotal + envio + impuestos - descuento;

  const fechaBase = new Date();
  fechaBase.setDate(fechaBase.getDate() - Math.floor(Math.random() * 30));

  const timeline: TimelineEvento[] = [
    { fecha: fechaBase.toISOString(), estado: 'Pedido recibido', descripcion: 'El pedido ha sido creado', usuario: 'Sistema' }
  ];

  if (estado !== 'pendiente') {
    const fecha2 = new Date(fechaBase);
    fecha2.setHours(fecha2.getHours() + 2);
    timeline.push({ fecha: fecha2.toISOString(), estado: 'Pago confirmado', descripcion: 'El pago ha sido procesado correctamente', usuario: 'Sistema' });
  }

  if (['procesando', 'enviado', 'entregado'].includes(estado)) {
    const fecha3 = new Date(fechaBase);
    fecha3.setHours(fecha3.getHours() + 5);
    timeline.push({ fecha: fecha3.toISOString(), estado: 'En preparación', descripcion: 'El pedido está siendo preparado', usuario: 'Almacén' });
  }

  if (['enviado', 'entregado'].includes(estado)) {
    const fecha4 = new Date(fechaBase);
    fecha4.setDate(fecha4.getDate() + 1);
    timeline.push({ fecha: fecha4.toISOString(), estado: 'Enviado', descripcion: 'El pedido ha sido enviado', usuario: 'Logística' });
  }

  if (estado === 'entregado') {
    const fecha5 = new Date(fechaBase);
    fecha5.setDate(fecha5.getDate() + 3);
    timeline.push({ fecha: fecha5.toISOString(), estado: 'Entregado', descripcion: 'El pedido ha sido entregado', usuario: 'Transportista' });
  }

  const tieneProblemas = index % 8 === 0;
  const tiposProblema = ['Pago fallido', 'Dirección inválida', 'Producto agotado', 'Retraso en envío'];

  return {
    id: `PED-${String(index + 1000).padStart(5, '0')}`,
    numero: `#${String(index + 1000).padStart(5, '0')}`,
    fecha: fechaBase.toISOString(),
    estado,
    cliente,
    items,
    subtotal,
    envio,
    impuestos,
    descuento,
    total,
    metodoPago,
    estadoPago: estado === 'pendiente' ? 'pendiente' : 'pagado',
    idTransaccion: estado !== 'pendiente' ? `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}` : undefined,
    fechaPago: estado !== 'pendiente' ? fechaBase.toISOString() : undefined,
    metodoEnvio,
    direccionEnvio: {
      calle: `Calle ${['Mayor', 'Gran Vía', 'Reforma', 'Independencia'][index % 4]} ${Math.floor(Math.random() * 100) + 1}`,
      ciudad: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'][index % 4],
      estado: ['Madrid', 'Cataluña', 'Valencia', 'Andalucía'][index % 4],
      codigoPostal: `${28000 + Math.floor(Math.random() * 100)}`,
      pais: 'España'
    },
    carrier: ['enviado', 'entregado'].includes(estado) ? ['FedEx', 'UPS', 'DHL', 'Correos'][index % 4] : undefined,
    trackingNumber: ['enviado', 'entregado'].includes(estado) ? `TRK${Math.random().toString(36).substr(2, 12).toUpperCase()}` : undefined,
    fechaEstimadaEntrega: estado === 'enviado' ? new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() : undefined,
    notaCliente: index % 3 === 0 ? 'Por favor, entregar por la mañana' : undefined,
    timeline,
    tieneProblemas,
    tipoProblema: tieneProblemas ? tiposProblema[index % tiposProblema.length] : undefined
  };
};

// Generar 75 pedidos mock
const pedidosMock: PedidoCompleto[] = Array.from({ length: 75 }, (_, i) => generarPedidoMock(i));

// FUNCIONES DE API
export const getPedidos = async (): Promise<PedidoCompleto[]> => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  return pedidosMock;
};

export const getPedidoById = async (id: string): Promise<PedidoCompleto | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return pedidosMock.find(p => p.id === id) || null;
};

export const updateEstadoPedido = async (id: string, nuevoEstado: EstadoPedido, nota?: string): Promise<PedidoCompleto | null> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const pedido = pedidosMock.find(p => p.id === id);
  if (pedido) {
    pedido.estado = nuevoEstado;
    pedido.timeline.push({
      fecha: new Date().toISOString(),
      estado: `Estado actualizado a ${nuevoEstado}`,
      descripcion: nota || `El estado del pedido ha cambiado a ${nuevoEstado}`,
      usuario: 'Admin'
    });
  }
  return pedido || null;
};

export const getTrackingInfo = async (trackingId: string): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return {
    trackingId,
    status: 'En tránsito',
    location: 'Centro de distribución Madrid',
    estimatedDelivery: '2025-10-05',
    events: [
      { fecha: '2025-10-01', descripcion: 'Paquete recogido', ubicacion: 'Almacén Central' },
      { fecha: '2025-10-02', descripcion: 'En tránsito', ubicacion: 'Centro Logístico' },
      { fecha: '2025-10-03', descripcion: 'En reparto', ubicacion: 'Centro de distribución Madrid' }
    ]
  };
};

export const requestDevolucion = async (pedidoId: string, motivo: string): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  const pedido = pedidosMock.find(p => p.id === pedidoId);
  if (pedido) {
    pedido.estado = 'reembolsado';
    pedido.timeline.push({
      fecha: new Date().toISOString(),
      estado: 'Reembolso solicitado',
      descripcion: `Motivo: ${motivo}`,
      usuario: 'Admin'
    });
  }
  return { success: true, message: 'Solicitud de devolución procesada' };
};

export const sendNotificacionCliente = async (pedidoId: string, mensaje: string): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  console.log(`Enviando notificación al cliente para pedido ${pedidoId}: ${mensaje}`);
  return { success: true, message: 'Notificación enviada' };
};
