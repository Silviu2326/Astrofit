
// import axios from 'axios'; // Para producción
import { PlaceholderImages } from '../../../../../utils/placeholderImages';

// const API_URL = '/api/productos'; // Para producción

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagenes: string[];
  stock: number;
  estado: 'disponible' | 'agotado' | 'preventa';
  variantes: {
    talla?: string;
    color?: string;
    stock: number;
  }[];
}

// Datos mock para demostración
const mockProductos: Producto[] = [
  {
    id: '1',
    nombre: 'Camiseta Fitness Premium',
    descripcion: 'Camiseta de alta calidad para entrenamientos intensos. Material transpirable y cómodo que se adapta a tu cuerpo durante el ejercicio.',
    precio: 29.99,
    imagenes: [
      PlaceholderImages.generic(400, 400),
      PlaceholderImages.generic(400, 400)
    ],
    stock: 50,
    estado: 'disponible',
    variantes: [
      { talla: 'S', color: 'Negro', stock: 15 },
      { talla: 'M', color: 'Negro', stock: 20 },
      { talla: 'L', color: 'Negro', stock: 15 },
      { talla: 'S', color: 'Blanco', stock: 0 },
      { talla: 'M', color: 'Blanco', stock: 0 }
    ]
  },
  {
    id: '2',
    nombre: 'Leggings Deportivos',
    descripcion: 'Leggings cómodos y elásticos ideales para yoga, pilates y entrenamientos de baja intensidad. Diseño moderno y funcional.',
    precio: 39.99,
    imagenes: [
      PlaceholderImages.generic(400, 400)
    ],
    stock: 30,
    estado: 'disponible',
    variantes: [
      { talla: 'XS', color: 'Negro', stock: 5 },
      { talla: 'S', color: 'Negro', stock: 10 },
      { talla: 'M', color: 'Negro', stock: 10 },
      { talla: 'L', color: 'Negro', stock: 5 }
    ]
  },
  {
    id: '3',
    nombre: 'Proteína Whey Isolate',
    descripcion: 'Suplemento de proteína de alta calidad, 25g de proteína por porción. Ideal para la recuperación post-entrenamiento.',
    precio: 49.99,
    imagenes: [
      PlaceholderImages.generic(400, 400),
      PlaceholderImages.generic(400, 400),
      PlaceholderImages.generic(400, 400)
    ],
    stock: 0,
    estado: 'agotado',
    variantes: [
      { color: 'Vainilla', stock: 0 },
      { color: 'Chocolate', stock: 0 },
      { color: 'Fresa', stock: 0 }
    ]
  },
  {
    id: '4',
    nombre: 'Botella Deportiva Térmica',
    descripcion: 'Botella de acero inoxidable que mantiene las bebidas frías o calientes durante horas. Perfecta para el gimnasio.',
    precio: 24.99,
    imagenes: [
      PlaceholderImages.generic(400, 400)
    ],
    stock: 25,
    estado: 'disponible',
    variantes: [
      { color: 'Azul', stock: 10 },
      { color: 'Rosa', stock: 8 },
      { color: 'Negro', stock: 7 }
    ]
  },
  {
    id: '5',
    nombre: 'Guantes de Gimnasio',
    descripcion: 'Guantes de entrenamiento con agarre mejorado. Protegen las manos y mejoran el rendimiento en levantamiento de pesas.',
    precio: 19.99,
    imagenes: [
      PlaceholderImages.generic(400, 400),
      PlaceholderImages.generic(400, 400)
    ],
    stock: 3,
    estado: 'disponible',
    variantes: [
      { talla: 'S', stock: 1 },
      { talla: 'M', stock: 1 },
      { talla: 'L', stock: 1 }
    ]
  },
  {
    id: '6',
    nombre: 'Colchoneta de Yoga Premium',
    descripcion: 'Colchoneta antideslizante de alta densidad. Perfecta para yoga, pilates y ejercicios de suelo. Material ecológico.',
    precio: 59.99,
    imagenes: [
      PlaceholderImages.generic(400, 400)
    ],
    stock: 0,
    estado: 'preventa',
    variantes: [
      { color: 'Morado', stock: 0 },
      { color: 'Verde', stock: 0 }
    ]
  },
  {
    id: '7',
    nombre: 'Cinturón de Pesas',
    descripcion: 'Cinturón de cuero genuino para levantamiento de pesas. Proporciona soporte lumbar y mejora la estabilidad.',
    precio: 34.99,
    imagenes: [
      PlaceholderImages.generic(400, 400),
      PlaceholderImages.generic(400, 400)
    ],
    stock: 12,
    estado: 'disponible',
    variantes: [
      { talla: 'S', stock: 3 },
      { talla: 'M', stock: 4 },
      { talla: 'L', stock: 3 },
      { talla: 'XL', stock: 2 }
    ]
  },
  {
    id: '8',
    nombre: 'Auriculares Inalámbricos Deportivos',
    descripcion: 'Auriculares resistentes al sudor con cancelación de ruido. Batería de 8 horas y sonido de alta calidad.',
    precio: 79.99,
    imagenes: [
      PlaceholderImages.generic(400, 400)
    ],
    stock: 18,
    estado: 'disponible',
    variantes: [
      { color: 'Negro', stock: 8 },
      { color: 'Blanco', stock: 6 },
      { color: 'Azul', stock: 4 }
    ]
  }
];

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getProductos = async (): Promise<Producto[]> => {
  try {
    // Simular llamada a API con delay
    await delay(800);
    
    // En desarrollo, usar datos mock
    // En producción, descomentar las líneas siguientes:
    // const response = await axios.get<Producto[]>(API_URL);
    // return Array.isArray(response.data) ? response.data : [];
    
    return mockProductos;
  } catch (error) {
    console.error('Error fetching productos:', error);
    // Return empty array as fallback
    return [];
  }
};

export const getProductoById = async (id: string): Promise<Producto> => {
  try {
    // Simular llamada a API con delay
    await delay(500);
    
    // En desarrollo, buscar en datos mock
    const producto = mockProductos.find(p => p.id === id);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    
    // En producción, descomentar las líneas siguientes:
    // const response = await axios.get<Producto>(`${API_URL}/${id}`);
    // return response.data;
    
    return producto;
  } catch (error) {
    console.error('Error fetching producto by id:', error);
    throw error;
  }
};

export const createProducto = async (producto: Omit<Producto, 'id'>): Promise<Producto> => {
  try {
    // Simular llamada a API con delay
    await delay(1000);
    
    // En desarrollo, crear producto mock
    const newProducto: Producto = {
      ...producto,
      id: Date.now().toString() // ID temporal
    };
    
    // Agregar a la lista mock (en una app real esto se haría en el servidor)
    mockProductos.push(newProducto);
    
    // En producción, descomentar las líneas siguientes:
    // const response = await axios.post<Producto>(API_URL, producto);
    // return response.data;
    
    return newProducto;
  } catch (error) {
    console.error('Error creating producto:', error);
    throw error;
  }
};

export const updateProducto = async (id: string, producto: Partial<Producto>): Promise<Producto> => {
  try {
    // Simular llamada a API con delay
    await delay(800);
    
    // En desarrollo, actualizar producto mock
    const index = mockProductos.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    
    const updatedProducto = { ...mockProductos[index], ...producto };
    mockProductos[index] = updatedProducto;
    
    // En producción, descomentar las líneas siguientes:
    // const response = await axios.put<Producto>(`${API_URL}/${id}`, producto);
    // return response.data;
    
    return updatedProducto;
  } catch (error) {
    console.error('Error updating producto:', error);
    throw error;
  }
};

export const deleteProducto = async (id: string): Promise<void> => {
  try {
    // Simular llamada a API con delay
    await delay(600);
    
    // En desarrollo, eliminar producto mock
    const index = mockProductos.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    
    mockProductos.splice(index, 1);
    
    // En producción, descomentar las líneas siguientes:
    // await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting producto:', error);
    throw error;
  }
};
