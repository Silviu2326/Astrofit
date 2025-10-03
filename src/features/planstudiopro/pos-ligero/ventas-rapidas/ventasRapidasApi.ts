import { Producto, Transaccion, EstadisticasDia, SesionCaja } from '../../types';

// 🍹 BEBIDAS
export const productosCatalogo: Producto[] = [
  // Bebidas
  {
    id: 'beb-001',
    nombre: 'Agua Mineral',
    precio: 1.00,
    categoria: 'bebidas',
    stock: 150,
    descripcion: 'Agua purificada 500ml',
    imagen: '💧',
  },
  {
    id: 'beb-002',
    nombre: 'Gatorade',
    precio: 2.50,
    categoria: 'bebidas',
    stock: 80,
    descripcion: 'Bebida deportiva 600ml',
    imagen: '⚡',
  },
  {
    id: 'beb-003',
    nombre: 'Batido de Proteína',
    precio: 5.00,
    categoria: 'bebidas',
    stock: 45,
    descripcion: 'Batido premium de whey protein',
    imagen: '🥤',
    enOferta: true,
    descuento: 10,
  },
  {
    id: 'beb-004',
    nombre: 'Energizante Monster',
    precio: 3.50,
    categoria: 'bebidas',
    stock: 60,
    descripcion: 'Bebida energética 473ml',
    imagen: '⚡',
  },

  // 🍫 Snacks
  {
    id: 'snk-001',
    nombre: 'Barra de Proteína',
    precio: 2.50,
    categoria: 'snacks',
    stock: 120,
    descripcion: 'Quest Bar 20g proteína',
    imagen: '🍫',
  },
  {
    id: 'snk-002',
    nombre: 'Frutos Secos Mix',
    precio: 4.00,
    categoria: 'snacks',
    stock: 70,
    descripcion: 'Mix de almendras, nueces y cashews',
    imagen: '🥜',
  },
  {
    id: 'snk-003',
    nombre: 'Energy Bar',
    precio: 2.00,
    categoria: 'snacks',
    stock: 95,
    descripcion: 'Barra energética de avena',
    imagen: '🌾',
  },
  {
    id: 'snk-004',
    nombre: 'Jerky de Pavo',
    precio: 5.50,
    categoria: 'snacks',
    stock: 40,
    descripcion: 'Snack alto en proteína',
    imagen: '🥩',
    enOferta: true,
    descuento: 15,
  },

  // 👕 Merch
  {
    id: 'mer-001',
    nombre: 'Camiseta Box',
    precio: 25.00,
    categoria: 'merch',
    stock: 35,
    descripcion: 'Camiseta oficial del box',
    imagen: '👕',
  },
  {
    id: 'mer-002',
    nombre: 'Sudadera Premium',
    precio: 45.00,
    categoria: 'merch',
    stock: 20,
    descripcion: 'Hoodie con logo bordado',
    imagen: '🧥',
  },
  {
    id: 'mer-003',
    nombre: 'Gorra Snapback',
    precio: 18.00,
    categoria: 'merch',
    stock: 50,
    descripcion: 'Gorra ajustable con logo',
    imagen: '🧢',
  },
  {
    id: 'mer-004',
    nombre: 'Muñequeras',
    precio: 12.00,
    categoria: 'merch',
    stock: 60,
    descripcion: 'Par de muñequeras de compresión',
    imagen: '💪',
    enOferta: true,
    descuento: 20,
  },
  {
    id: 'mer-005',
    nombre: 'Botella Térmica',
    precio: 22.00,
    categoria: 'merch',
    stock: 30,
    descripcion: 'Botella térmica 750ml',
    imagen: '🍶',
  },
  {
    id: 'mer-006',
    nombre: 'Toalla Deportiva',
    precio: 15.00,
    categoria: 'merch',
    stock: 45,
    descripcion: 'Toalla de microfibra',
    imagen: '🏋️',
  },

  // 💊 Suplementos
  {
    id: 'sup-001',
    nombre: 'Proteína Whey 2kg',
    precio: 55.00,
    categoria: 'suplementos',
    stock: 25,
    descripcion: 'Proteína aislada sabor chocolate',
    imagen: '🥛',
  },
  {
    id: 'sup-002',
    nombre: 'Creatina Monohidrato',
    precio: 35.00,
    categoria: 'suplementos',
    stock: 30,
    descripcion: 'Creatina pura 500g',
    imagen: '💊',
  },
  {
    id: 'sup-003',
    nombre: 'Pre-Workout C4',
    precio: 40.00,
    categoria: 'suplementos',
    stock: 18,
    descripcion: 'Pre-entreno con cafeína',
    imagen: '⚡',
  },
  {
    id: 'sup-004',
    nombre: 'BCAAs 2:1:1',
    precio: 30.00,
    categoria: 'suplementos',
    stock: 22,
    descripcion: 'Aminoácidos ramificados',
    imagen: '💊',
    enOferta: true,
    descuento: 25,
  },
  {
    id: 'sup-005',
    nombre: 'Multivitamínico',
    precio: 25.00,
    categoria: 'suplementos',
    stock: 40,
    descripcion: 'Complejo vitamínico completo',
    imagen: '🌈',
  },
  {
    id: 'sup-006',
    nombre: 'Omega 3',
    precio: 28.00,
    categoria: 'suplementos',
    stock: 35,
    descripcion: 'Aceite de pescado 1000mg',
    imagen: '🐟',
  },

  // 🎟️ Pases y Servicios
  {
    id: 'pas-001',
    nombre: 'Drop-in (1 clase)',
    precio: 15.00,
    categoria: 'pases',
    stock: 999,
    descripcion: 'Clase única',
    imagen: '🎟️',
  },
  {
    id: 'pas-002',
    nombre: 'Paquete 5 Clases',
    precio: 65.00,
    categoria: 'pases',
    stock: 999,
    descripcion: 'Paquete de 5 clases',
    imagen: '📦',
  },
  {
    id: 'pas-003',
    nombre: 'Paquete 10 Clases',
    precio: 120.00,
    categoria: 'pases',
    stock: 999,
    descripcion: 'Paquete de 10 clases',
    imagen: '📦',
    enOferta: true,
    descuento: 10,
  },
  {
    id: 'ser-001',
    nombre: 'Sesión PT',
    precio: 50.00,
    categoria: 'servicios',
    stock: 999,
    descripcion: 'Sesión de entrenamiento personal 1hr',
    imagen: '🏋️',
  },
  {
    id: 'ser-002',
    nombre: 'Masaje Deportivo',
    precio: 60.00,
    categoria: 'servicios',
    stock: 999,
    descripcion: 'Masaje terapéutico 1hr',
    imagen: '💆',
  },
  {
    id: 'ser-003',
    nombre: 'Análisis Corporal',
    precio: 35.00,
    categoria: 'servicios',
    stock: 999,
    descripcion: 'InBody scan completo',
    imagen: '📊',
  },
];

// 📊 Transacciones mockeadas del día
export const transaccionesHoy: Transaccion[] = [
  {
    id: 'txn-001',
    numeroTicket: '20251003-001',
    fecha: new Date('2025-10-03T08:15:00'),
    cliente: { id: 'cli-001', nombre: 'Juan Pérez', esmiembro: true },
    items: [
      { ...productosCatalogo[0], cantidad: 2 },
      { ...productosCatalogo[2], cantidad: 1 },
    ],
    subtotal: 7.00,
    descuentos: 0.70,
    impuestos: 1.01,
    total: 7.31,
    metodoPago: 'tarjeta',
    estado: 'completada',
    cajero: 'María García',
  },
  {
    id: 'txn-002',
    numeroTicket: '20251003-002',
    fecha: new Date('2025-10-03T09:30:00'),
    items: [
      { ...productosCatalogo[8], cantidad: 1 },
      { ...productosCatalogo[10], cantidad: 2 },
    ],
    subtotal: 61.00,
    descuentos: 0,
    impuestos: 9.76,
    total: 70.76,
    metodoPago: 'efectivo',
    estado: 'completada',
    cajero: 'María García',
  },
  {
    id: 'txn-003',
    numeroTicket: '20251003-003',
    fecha: new Date('2025-10-03T10:45:00'),
    cliente: { id: 'cli-002', nombre: 'Ana López', email: 'ana@mail.com', esmiembro: true },
    items: [
      { ...productosCatalogo[16], cantidad: 1 },
      { ...productosCatalogo[19], cantidad: 1 },
    ],
    subtotal: 85.00,
    descuentos: 8.50,
    impuestos: 12.24,
    total: 88.74,
    metodoPago: 'transferencia',
    estado: 'completada',
    cajero: 'María García',
  },
];

// 📈 Estadísticas del día
export const estadisticasHoy: EstadisticasDia = {
  ventasTotal: 1247.50,
  numTransacciones: 28,
  ticketPromedio: 44.55,
  topProducto: 'Batido de Proteína',
  comparativaAyer: 12.5,
  ventasPorHora: [
    { hora: '08:00', ventas: 45.30 },
    { hora: '09:00', ventas: 87.50 },
    { hora: '10:00', ventas: 156.20 },
    { hora: '11:00', ventas: 234.80 },
    { hora: '12:00', ventas: 198.40 },
    { hora: '13:00', ventas: 167.30 },
    { hora: '14:00', ventas: 142.50 },
    { hora: '15:00', ventas: 98.70 },
    { hora: '16:00', ventas: 116.80 },
  ],
  distribucionMetodosPago: [
    { metodo: 'Tarjeta', porcentaje: 45, total: 561.38 },
    { metodo: 'Efectivo', porcentaje: 35, total: 436.63 },
    { metodo: 'Transferencia', porcentaje: 15, total: 187.13 },
    { metodo: 'Crédito', porcentaje: 5, total: 62.38 },
  ],
  topProductosVendidos: [
    { producto: 'Batido de Proteína', cantidad: 42, total: 210.00 },
    { producto: 'Agua Mineral', cantidad: 38, total: 38.00 },
    { producto: 'Drop-in (1 clase)', cantidad: 15, total: 225.00 },
    { producto: 'Barra de Proteína', cantidad: 28, total: 70.00 },
    { producto: 'Proteína Whey 2kg', cantidad: 8, total: 440.00 },
  ],
};

// 💰 Sesión de caja actual
export const sesionCajaActual: SesionCaja = {
  id: 'caja-001',
  fechaApertura: new Date('2025-10-03T08:00:00'),
  montoInicial: 200.00,
  cajero: 'María García',
  transacciones: transaccionesHoy,
  estado: 'abierta',
};

export const fetchProductos = (): Promise<Producto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productosCatalogo);
    }, 500);
  });
};

export const fetchEstadisticasHoy = (): Promise<EstadisticasDia> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(estadisticasHoy);
    }, 300);
  });
};

export const fetchTransaccionesHoy = (): Promise<Transaccion[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transaccionesHoy);
    }, 300);
  });
};

export const fetchSesionCaja = (): Promise<SesionCaja> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sesionCajaActual);
    }, 300);
  });
};

// Nuevos endpoints de e-commerce avanzado

export const fetchCatalogoOnline = (): Promise<Producto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Fetching online catalog...');
      resolve(productosCatalogo);
    }, 500);
  });
};

export const fetchInventarioTiempoReal = (productId?: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Fetching real-time inventory for ${productId || 'all products'}...`);
      resolve({ success: true, message: 'Inventario actualizado', data: { '1': 100, '2': 50 } });
    }, 500);
  });
};

export const registerAfiliado = (data: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Registering affiliate...', data);
      resolve({ success: true, message: 'Afiliado registrado con éxito' });
    }, 500);
  });
};

export const getUpsellingRecomendations = (productId: string): Promise<Producto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Getting upselling recommendations for ${productId}...`);
      resolve([productosCatalogo[0], productosCatalogo[1]]); // Mock recommendations
    }, 500);
  });
};

export const subscribeToPlan = (planId: string, userId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Subscribing user ${userId} to plan ${planId}...`);
      resolve({ success: true, message: 'Suscripción exitosa' });
    }, 500);
  });
};

export const integrateSupplier = (supplierId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Integrating supplier ${supplierId}...`);
      resolve({ success: true, message: 'Proveedor integrado' });
    }, 500);
  });
};

export const applyCashback = (userId: string, amount: number): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Applying cashback of ${amount} for user ${userId}...`);
      resolve({ success: true, message: 'Cashback aplicado', newPoints: 150 });
    }, 500);
  });
};

export const submitReview = (productId: string, review: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Submitting review for product ${productId}...`, review);
      resolve({ success: true, message: 'Review enviada' });
    }, 500);
  });
};

export const getChatbotRecommendations = (query: string): Promise<Producto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Getting chatbot recommendations for query: ${query}...`);
      resolve([productosCatalogo[2], productosCatalogo[3]]);
    }, 500);
  });
};

export const bookCoachSession = (coachId: string, userId: string, date: Date): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Booking session with coach ${coachId} for user ${userId} on ${date}...`);
      resolve({ success: true, message: 'Sesión reservada' });
    }, 500);
  });
};

export const startARSimulation = (productId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Starting AR simulation for product ${productId}...`);
      resolve({ success: true, message: 'Simulación AR iniciada' });
    }, 500);
  });
};

export const searchByImage = (imageData: string): Promise<Producto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Searching by image...');
      resolve([productosCatalogo[4], productosCatalogo[5]]);
    }, 500);
  });
};

export const addToWishlist = (userId: string, productId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Adding product ${productId} to wishlist for user ${userId}...`);
      resolve({ success: true, message: 'Producto añadido a la wishlist' });
    }, 500);
  });
};

export const oneClickCheckout = (userId: string, cart: Producto[]): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Performing one-click checkout for user ${userId}...`, cart);
      resolve({ success: true, message: 'Checkout exitoso' });
    }, 500);
  });
};

export const startLiveShoppingSession = (sessionId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Starting live shopping session ${sessionId}...`);
      resolve({ success: true, message: 'Sesión de live shopping iniciada' });
    }, 500);
  });
};

export const promoteProductByInfluencer = (productId: string, influencerId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Promoting product ${productId} by influencer ${influencerId}...`);
      resolve({ success: true, message: 'Producto promocionado por influencer' });
    }, 500);
  });
};