import { Producto } from '../../types'; // Assuming types.ts is in src/

export const productosCatalogo: Producto[] = [
  {
    id: '1',
    nombre: 'Agua Mineral',
    precio: 1.50,
    imagen: 'https://via.placeholder.com/100x100?text=Agua',
  },
  {
    id: '2',
    nombre: 'Batido de Proteínas',
    precio: 4.00,
    imagen: 'https://via.placeholder.com/100x100?text=Batido',
  },
  {
    id: '3',
    nombre: 'Camiseta Deportiva',
    precio: 25.00,
    imagen: 'https://via.placeholder.com/100x100?text=Camiseta',
  },
  {
    id: '4',
    nombre: 'Suplemento Multivitamínico',
    precio: 18.75,
    imagen: 'https://via.placeholder.com/100x100?text=Suplemento',
  },
  {
    id: '5',
    nombre: 'Barrita Energética',
    precio: 2.20,
    imagen: 'https://via.placeholder.com/100x100?text=Barrita',
  },
  {
    id: '6',
    nombre: 'Guantes de Entrenamiento',
    precio: 15.00,
    imagen: 'https://via.placeholder.com/100x100?text=Guantes',
  },
  {
    id: '7',
    nombre: 'Bebida Isotónica',
    precio: 2.75,
    imagen: 'https://via.placeholder.com/100x100?text=Isotonica',
  },
  {
    id: '8',
    nombre: 'Mochila Deportiva',
    precio: 35.00,
    imagen: 'https://via.placeholder.com/100x100?text=Mochila',
  },
];

export const fetchProductos = (): Promise<Producto[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productosCatalogo);
    }, 500);
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